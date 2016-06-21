import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route('index', { path: '/' });
  	this.route('movies', function() {
      this.route('all');
    });
    this.route('detail', { path: '/detail/:detail_id' });
});

export default Router;
