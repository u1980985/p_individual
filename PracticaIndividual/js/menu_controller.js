function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/infiniteMode.html");
}

function phaser_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	loadpage("./html/phasergame.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	loadpage("../index.html");
}

function options(){
	loadpage("./html/options.html");
}

function load(){
	loadpage("./html/load.html");
}
function load2(){
	loadpage("./html/loadRushMode.html");
}

