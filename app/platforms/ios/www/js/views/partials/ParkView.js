define([
  'baseview',
  'text!templates/partials/ParkView.html'
], function(Baseview, parkTemplate){

  var ParkView = Baseview.extend({
    initialize: function() {
    },

    template: _.template(parkTemplate),

    events: {
        "swipeup": "showPark",
        "swipedown": "backToNeutral",
    },

    showPark: function(e) {
        $("#home").addClass("park-visible")
            .removeClass("both-visible");

        $("#parkText").addClass("park-bottom")
            .removeClass("action-bottom");

        $("#parkArrow .icon-arrow-up").removeClass("icon-arrow-up")
            .addClass("icon-arrow-down");

        this.activatePark();
    },

    backToNeutral: function(e) {
        if ($("#home").hasClass("park-visible")) {
            $("#home").addClass("both-visible")
                .removeClass("park-visible");
            $("#parkText").removeClass("park-bottom")
                .addClass("action-bottom");
        } 

        $("#parkArrow .icon-arrow-down").removeClass("icon-arrow-down")
            .addClass("icon-arrow-up");
    },

    activatePark: function() {
        
    },

    render: function(){
      this.fadeInViewElements(parkTemplate);
      this.$el.hammer();
    }

  });

  return ParkView;
});

