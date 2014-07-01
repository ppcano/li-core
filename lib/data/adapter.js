import DS from "ember-data/lib/main";

var Adapter = DS.RESTAdapter.extend({
  defaultSerializer: '-app',
  host: 'https://api.loadimpact.com/v2'

});

export default Adapter;
