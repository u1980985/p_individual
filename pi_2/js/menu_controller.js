function start_game(){
	name = prompt("User name");
	loadpage("./html/game.html");
}
function openIndexGame(){
	loadpage("./pi_2/index.html");
}

function exit (){
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


