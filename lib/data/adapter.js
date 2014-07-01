import DS from "ember-data/lib/main";

var Adapter = DS.RESTAdapter.extend({
  defaultSerializer: '-app',
  host: 'https://api.loadimpact.com/v2',

  auth: undefined,

  ajaxOptions: function(url, type, hash) {

    hash = hash || {};

    // TODO: optimize to encode authentication only when the value is
    // changed 
    var auth = this.get('auth');
    if (auth) {
      hash.beforeSend = function (xhr) {
        xhr.setRequestHeader('Authorization', 'Basic '+Base64.encode(auth));
      };
    }

    return this._super(url, type, hash);

  }

});

export default Adapter;
