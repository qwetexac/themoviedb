import Ember from 'ember';

export default Ember.Route.extend({
	movies: {
		page: 1,
		results: []
	},

	model: function(){
		return this.movies.results;
	},

	onScroll: function(){
		var page = this.get('movies.page') + 1;
		this.set('movies.page', page);
		this.findMovies(page);
	},

	findMovies: function(page){
		var page = (page > 1) ? page : 1;
		var movies = this.get('movies.results');
		$.getJSON('http://api.themoviedb.org/3/movie/top_rated?api_key=72b56103e43843412a992a8d64bf96e9&language=ru&page='+page).then(function(json){
			if (json.results.length > 0) {
				json.results.map(function(movie) {
					movies.pushObject({
						'name' : movie.title,
						'poster_path' : movie.poster_path,
						'id' : movie.id
					});
				});
			}
		});
	},

	init: function(){
		self = this;
		$(window).on('scroll', function() {
	    	var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
	    	if (scrollBottom < 100) {
	    		self.onScroll();
	    	}
	    });
	    this.findMovies();
	},
});
