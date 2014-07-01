import DS from "ember-data/lib/main";
import { pluralize } from "ember-inflector/lib/system/string";

var decamelize = Ember.String.decamelize;

var Serializer = DS.RESTSerializer.extend({

  keyForAttribute: function(attr) {
    return decamelize(attr);
  },

  keyForRelationship: function(attr) {
    return decamelize(attr);
  },

  extractArray: function(store, primaryType, rawPayload) {
    
    // array response does not return REST format

    var rootKey = pluralize(primaryType.typeKey);
    var payload = {};
    payload[rootKey] = rawPayload;
    
    return this._super(store, primaryType, payload);
  }

});

export default Serializer;
