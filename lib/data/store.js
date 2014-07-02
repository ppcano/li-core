import DS from "ember-data/lib/main";
var fmt = Ember.String.fmt;

var Store = DS.Store.extend({
  adapter: '-app',

  findResults: function(id) {

    // could be a model method
    
    var adapter = this.get('defaultAdapter');
    var url = fmt("%@/tests/%@/results", adapter.get('host'), id);

    return new Ember.RSVP.Promise(function(resolve, reject) {

      adapter.ajax(url, "GET").then(function(response) {
        var result = {
          clientsActive: response.__li_clients_active,
          userLoadTime: response.__li_user_load_time
        }
        resolve(result);
      }, function(response) {
        reject(response);
      });

    });


  }

});

export default Store;
