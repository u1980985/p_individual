function start_game(){
	name = prompt("User name");
	loadpage("./html/game.html");
}
function openIndexGame(){
	loadpage("./pi_2/index.html");
}

function openIndexGamePI_3(){
	loadpage("./pi_3/index.html");
}

function exitPI_2 (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	loadpage("../index.html");
}

function exitPI_3 (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	loadpage("../index.html");
}

function options(){
	// TODO: Open options menu
	console.log("Options menu button");
}

function openIndexGamePhaser(){
	loadpage("./PracticaIndividual/index.html");
}


