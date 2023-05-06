class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.username= ' ';
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.bad_clicks=0;
		this.correct = 0;
		this.arraycards=[];
		this.num_cards=2;
		this.dificultad= ' ';
		this.tiempoEspera=2000;
		this.restaPunts=5;
		this.items=['co', 'cb', 'sb', 'so','tb','to'];
		this.l_partida=null;
		this.continueGame=false;
		this.arrayCartes=[];
		this.username=' '; //aa
		
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
		//let maximCartas=this.num_cards*2;
		this.cameras.main.setBackgroundColor(0xBFFCFF);
		this.cards = this.physics.add.staticGroup();
		var x=70, y=200;
		if (sessionStorage.idPartida && localStorage.partides){
			var arrayPartides = JSON.parse(localStorage.partides);
			if (sessionStorage.idPartida < arrayPartides.length)
				this.l_partida = arrayPartides[sessionStorage.idPartida];
		}
		if (this.l_partida){
			console.log(this.l_partida);
			console.log(arrayPartides);
			console.log(sessionStorage.idPartida);
			this.username = this.l_partida.username;
			this.arrayCartes=this.l_partida.arrayCartes;
			this.items = this.l_partida.items;
			this.num_cards = this.l_partida.num_cards;
			this.score = this.l_partida.score;
			this.correct=this.l_partida.correct;
			this.restaPunts=this.l_partida.restaPunts;
			this.tiempoEspera=this.l_partida.tiempoEspera;
			this.bad_clicks=this.l_partida.bad_clicks;
			this.arraycards=this.l_partida.arraycards;

			for(let k=0; k<this.arraycards.length; k++){
				this.add.image(x, y, this.arraycards[k]);
				x+=110;
				if(x>=800){
					x=70;
					y+=150;
				}
			}
		}
		else {
			this.transformacionJson();
			this.cambiarDificultad();
			this.mezclarYMostrar(x,y);
		}
		//localStorage.clear();
		setTimeout(() =>{
			//ese setTimeout sirve para que cuando empieza la partida se muestren unos segundos las cartas. Tambien ponemos el "back" de las cartas
			y=200; x=70;
			for(let j=0; j < this.arraycards.length; j++){
				if (this.arrayCartes[j]==0)
					this.cards.create(x, y, 'back');
				else if(! this.l_partida ) this.cards.create(x, y, 'back');
				x+=110;
				if(x>=800){
					x=70;
					y+=150;
				}
			}
			this.continueGame=true;
			let i = 0;
			this.cards.children.iterate((card)=>{
				card.card_id = this.arraycards[i];
				card.id = i;
				i++;
				card.setInteractive();
				card.on('pointerup', () => {
					card.disableBody(true,true);
					this.arrayCartes[card.id]=1;
					if (this.firstClick){
						if (this.firstClick.card_id !== card.card_id){
							this.bad_clicks ++;
							this.score =100-this.bad_clicks*this.restaPunts; console.log(this.score);
							setTimeout(() => {
								this.firstClick.enableBody(false, 0, 0, true, true);
								card.enableBody(false, 0, 0, true, true);
								this.arrayCartes[card.id]=0;
								this.arrayCartes[this.firstClick.id]=0;
								this.firstClick = null;
							},250);
							if (this.score <= 0){
								alert("Game Over");
								loadpage("../");
							}
						}
						else{
							this.correct++;
							this.arrayCartes[card.id]=1;
							if (this.correct >= this.num_cards){
								alert("You Win with " + this.score + " points.");
								loadpage("../");
							}
							this.firstClick = null;
						}
					}
					else{
						this.firstClick = card;
					}
				}, card);
			});
		}, this.tiempoEspera);
		//añadimos texto en pantalla y el texto "guardar" lo hacemos interactivo con pointerup, para que se pueda llamar siempre que se clique.
		let text= this.add.text(10,10,this.username,{ font: '32px Arial', fill: 'black' });
		this.button=this.add.text(150,10, "GUARDAR", {font: '32px Arial', fill: 'black' })
		this.button.setInteractive();
		this.button.on('pointerup', () => {
			this.button.setBackgroundColor('#FFA07A')
			this.save();
		});
		sessionStorage.clear();
	}	
	save(){
		let partida = { //guardamos los datos correspondientes.
			username: this.username,
			arrayCartes: this.arrayCartes,
			items: this.items,
			num_cards: this.num_cards,
			score: this.score,
			restaPunts: this.restaPunts,
			correct: this.correct,
			tiempoEspera: this.tiempoEspera,
			bad_clicks: this.bad_clicks,
			arraycards: this.arraycards,
		}
		let arrayPartides = []; //comprobamos si hay partidas en el local storage y lo guardamos en el mismo.
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
				this.restaPunts=14;
			  break;
		  }
	}
	transformacionJson(){
		//obtenemos los datos necesarios del menu opciones para ajustar el numero de cartas.
		this.username = sessionStorage.getItem("username","unknown");
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var game_data = JSON.parse(json);
		this.num_cards = game_data.cards;
		this.dificultad= game_data.dificulty;
	}
	mezclarYMostrar(x,y){
		this.items = this.items.slice(); // Copiem l'array
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		this.items = this.items.slice(0, this.num_cards); // Agafem els primers numCards elements
		this.items = this.items.concat(this.items); // Dupliquem els elements
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		for (let m = 0; m < this.items.length; m++) {
			this.arraycards.push(this.items[m]);
		}	
		//en el array lo unico que hacemos es añadir en una posicion X,Y las imagenes.
		for(let k=0; k<this.arraycards.length; k++){
			this.add.image(x, y, this.arraycards[k]);
			this.arrayCartes[k]=0;
			x+=110;
			if(x>=800){
				x=70;
				y+=150;
			}
		}
	}
}

