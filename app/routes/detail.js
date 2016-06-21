import Ember from 'ember';


export default Ember.Route.extend({

	model: function(params){
		var movieID = params.detail_id;
		return $.getJSON('http://api.themoviedb.org/3/movie/'+movieID+'?language=ru&api_key=72b56103e43843412a992a8d64bf96e9').then(function(json){
			console.log(json);
			return json;
		});
	}
});
