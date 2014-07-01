
var Test = DS.Model.extend({

  title: DS.attr('string'),
  started: DS.attr('date'),
  ended: DS.attr('date'),
  status: DS.attr('number'),
  statusText: DS.attr('string'),
  url: DS.attr('string'),
  publicUrl: DS.attr('string')

});

export default Test;
