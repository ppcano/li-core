//http://nvd3.org/examples/linePlusBar.html
var LineBarChartComponent = Ember.Component.extend({
  classNames: ['line-bar-chart'],


  content: null,

  // chart config properties
  clientsActiveConf: {key: 'Clients Active', color: '#333', bar: true},
  userLoadTimeConf: {key: 'User Load Time', color: '#ccf'},
  
  // transform li-result content to chart format
  transformedContent: Em.computed(function() {
    var content = this.get('content'),
        result = [];

    if ( content ) {

      result.push(this.get('userLoadTimeConf')); 
      result.push(this.get('clientsActiveConf')); 


      // ES5-map should be supported for NVD3 browsers 
      
      result[0].values = content.userLoadTime.map(function(item) {
        return [item.timestamp, item.value];
      });

      result[1].values = content.clientsActive.map(function(item) {
        return [item.timestamp, item.value];
      });


    }

    return result; 
  }).property('content'),

  _addChart: function() {

    var data = this.get('transformedContent');

    if ( data && !this.chart) {

      var selector = '#'+this.get('elementId') + ' > svg';
      var this$ = this.$();

      nv.addGraph(function() {
          var chart = nv.models.linePlusBarChart()
                .margin({top: 30, right: 60, bottom: 50, left: 70})
                //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
                .x(function(d,i) { return i })
                .y(function(d,i) {return d[1] });

          chart.xAxis.tickFormat(function(d) {
            var dx = data[0].values[d] && data[0].values[d][0] || 0;
            // local as current LI version
            return moment.utc(dx/1000).local().format('HH:mm:ss');
          });

          // TODO: do not find the way to split Axis
          chart.y1Axis.tickFormat(function(d) {
             return d; 
          });

          chart.y2Axis.tickFormat(function(d) { 

            // TODO: check if can be improved on D3-way + localize
            if ( d >= 1000 ) {
              return (Math.round((d/1000) * 100) / 100) + 's';
            } else {
              return d+'ms';
            }

          });

          chart.bars.forceY([0]);

          d3.select(selector)
            .datum(data)
            .transition()
            .duration(0)
            .call(chart);

          nv.utils.windowResize( function() {
            chart.update();
          });


          var window$ = $(window);
          this$.css({
            "top": Math.max(0, ((window$.height() - this$.outerHeight()) / 2) +window$.scrollTop()) + "px",
            "left": Math.max(0, ((window$.width() - this$.outerWidth()) / 2) + window$.scrollLeft()) + "px"
          });

          this.chart = chart;
      });

    }

  }.on('didInsertElement')

});

export default LineBarChartComponent;
