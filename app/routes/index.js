import Ember from 'ember';

// var movies = [1,2];

export default Ember.Route.extend({
	movies: {
		state: true,
		error: 'Не найдено ни одного фильма :(',
		results: [],
		history: []
	},

	query : null,

	actions: {
		changeQuery: function(){
			var query = this.controller.query;
			this.set('query', query);
			console.log(this.get('query'));
		},

		findMovie: function(){
			var self = this;
			var movies = this.get('controller.model');
			$('#movies_search_wrap .movie_wrap').remove();
			this.set('movies.results', []);

			var title = this.query;
			$.getJSON('http://api.themoviedb.org/3/search/movie?language=ru&api_key=72b56103e43843412a992a8d64bf96e9&query='+title).then(function(json){
				if (json.results.length > 0) {
					json.results.map(function(movie) {
						movies.results.pushObject({
							'name' : movie.title,
							'poster_path' : movie.poster_path,
							'id' : movie.id
						});
					});
					self.set('movies.state', true);
					var history = self.get('controller.model.history');
					if ($.inArray(title, history) == -1 ) {
						history.pushObject(title);
						$('.find_film').trigger('reset');
					}
				}else self.set('movies.state', false);
			});
		}
	},

	model: function(){
		return this.movies;
	}
});
