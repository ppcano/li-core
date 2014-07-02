import TargetActionSupport from "ember-runtime/mixins/target_action_support";

var TestResult = Ember.View.extend(TargetActionSupport, {
  classNames: ['result-view'],


  target: Ember.computed.alias('controller'),
  action: 'closeChart',

  click: function() {

    // this could be differently done  based on other UI or view panels
    
    this.triggerAction();


  }

});

export default TestResult;
