define([
  'baseview',
  'text!templates/pages/HomeView.html'
], function(Baseview, homeTemplate){

  var HomeView = Baseview.extend({
    initialize: function(args) {
        this.initArgs(args);
        
    },

    events: {
        "tap    #findContainer":    "showFind",
        "tap    #parkContainer":    "showPark"
    },

    showFind: function() {
        this.router.navigate("find", true);
        console.log("find");
    },

    showPark: function() {
        this.router.navigate("park", true);
        console.log("park");
    },

    render: function(){
        this.fadeInViewElements(homeTemplate);
        this.$el.hammer();
    }

  });

  return HomeView;
});
