import EmberApp from "ember-application/system/application";
import Resolver from 'app/system/resolver';



var App = EmberApp.extend({
  modulePrefix: 'app',
  Resolver: Resolver
});


App.reopenClass({

  initializeAll: function() {
    
    var self = this;
    var initializersRegExp = new RegExp('app/initializers/application/');
    Ember.keys(requirejs._eak_seen).filter(function(key) {
      return initializersRegExp.test(key);
    }).forEach(function(moduleName) {
      self.initializeModule(moduleName);
    });

  },

  initializeModule: function(moduleName) {

    var module = require(moduleName, null, null, true);
    if (!module) { throw new Error(moduleName + ' must export an initializer.'); }
    this.initializer(module['default']);

  }

});
export default App;
