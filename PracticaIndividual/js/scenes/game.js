class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.username= ' ';
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.arraycards=[];
		this.num_cards=2;
		this.dificultad=0;
		this.tiempoEspera=0;
		this.tiempoEspera=2000;
		this.restaPunts=5;
		this.items=['co', 'cb', 'sb', 'so','tb','to'];
		this.l_partida=NULL;
		
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){
		if (sessionStorage.idPartida && localStorage.partides){
			let arrayPartides = JSON.parse(localStorage.partides);
			if (sessionStorage.idPartida < arrayPartides.length)
				l_partida = arrayPartides[sessionStorage.idPartida];
		}
		if (this.l_partida){
			this.username = this.l_partida.username;
			this.current_card = this.l_partida.current_card;
			this.items = this.l_partida.items;
			this.num_cards = this.l_partida.num_cards;
			this.score = this.l_partida.score;
		}
		else {
			let x=150, y=300;
			transformacionJson();
			cambiarDificultad();
			mezclarYMostrar(x,y);
			/*this.time.delayedCall(tiempoEspera, () => {
				for (var i = 0; i < this.items.length; i++) {
				  this.current_card[i] = ;
				}
				continueGame = true;
			  }, null, this);*/
		}
		
		this.cameras.main.setBackgroundColor(0xBFFCFF);
		this.cards = this.physics.add.staticGroup();
		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= 10;
						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);
						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= this.num_cards){
							alert("You Win with " + this.score + " points.");
							loadpage("../");
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}
	
	update(){	}
	
	save(){
		let partida = {
			username: this.username,
			current_card: this.current_card,
			items: this.items,
			num_cards: this.num_cards,
			score: this.score
		}
		let arrayPartides = [];
		if(localStorage.partides){
			arrayPartides = JSON.parse(localStorage.partides);
			if(!Array.isArray(arrayPartides)) arrayPartides = [];
		}
		arrayPartides.push(partida);
		localStorage.partides = JSON.stringify(arrayPartides);
		loadpage("../");
	}
	cambiarDificultad(){
		switch(this.dificultad) {
			case 'normal':
			  this.tiempoEspera/=1.8;
			  this.restaPunts=10;	
			  break;
			case 'hard':
				this.tiempoEspera/=2.7;
				this.restaPunts=20;
			  break;
		  }
	}
	transformacionJson(){
		this.username = sessionStorage.getItem("username","unknown");
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var game_data = JSON.parse(json);
		this.num_cards = game_data.cards;
		this.dificultad= game_data.dificulty;
	}
	mezclarYMostrar(x,y){
		this.items = items.slice(); // Copiem l'array
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		this.items = this.items.slice(0, this.num_cards); // Agafem els primers numCards elements
		this.items = this.items.concat(this.items); // Dupliquem els elements
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		for (let m = 0; m < this.items.length; m++) {
			this.arraycards.push(this.items[m]);
		}	
		for(let k=0; k<this.arraycards.length; k++){
			this.add.image(x, y, this.arraycards[k]);
			this.cards.create(x, y, this.arraycards[k]);
			x+=100;
			if(x>=800){
				x=250;
				y=400;
			}
		}
	}
}

