var load_obj = function(){
	var vue_instance = new Vue({
		el: "#saves_id",
		data: {
			saves: []
		},
		created: function(){
			let arrayPartides = [];
			if(localStorage.partidesInfinitas){
				arrayPartides = JSON.parse(localStorage.partidesInfinitas);
				if(!Array.isArray(arrayPartides)) arrayPartides = [];
			}
			this.saves = arrayPartides;
		},
		methods: { 
			load: function(i){
				sessionStorage.idPartida = i;
				loadpage("../html/infiniteMode.html");
			},
			eliminar: function(){
				localStorage.clear();
			}
		}
	});
	return {}; 
}();