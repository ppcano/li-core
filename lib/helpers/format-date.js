
/*
 We need to export the helper if it ( or Ember.Handlebars.helper ) is not imported at main.js.
*/

export default Ember.Handlebars.makeBoundHelper(function(val, options) {
  var format = options.hash.format || 'MMM DD h:mmA';
  return moment(val).format(format);
});
