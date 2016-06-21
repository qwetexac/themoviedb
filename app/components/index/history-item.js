import Ember from 'ember';

export default Ember.Component.extend({

	classNames: ['history-item'],

	didInsertElement: function(){
		this._super();
		var container = this.element;
		$(container).slideDown();
	},

	actions:{
		deleteItem: function(){
			var container = this.element;
			$(container).slideUp(function(){
				this.remove();
			});
		},

		findMovie: function(){
			var container = this.element;
			var text = $(container).find('span').data('value');
			$('.find_film').find('input').val(text).trigger('keyup');
			$('.find_film').find('button').click();
		}
	}
});
