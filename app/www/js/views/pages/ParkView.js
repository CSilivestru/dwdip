define([
  'baseview',
  'text!templates/pages/ParkView.html'
], function(Baseview, parkTemplate){

  var ParkView = Baseview.extend({
    initialize: function() {
    },

    template: _.template(parkTemplate),

    events: {
        "tap #parkButton": "showPark",
        "tap .backToHome": "backToNeutral",
    },

    showPark: function(e) {
        $("#home").addClass("park-visible")
            .removeClass("both-visible");

        $("#findButton").addClass("offscreen");

        $("#parkText").addClass("park-bottom")
            .removeClass("action-bottom");

        $("#parkArrow .icon-arrow-up").removeClass("icon-arrow-up")
            .addClass("icon-arrow-down");

        this.$(".backToHome").addClass("opaque")
            .removeClass("invisible");

        this.activatePark();
    },

    backToNeutral: function(e) {
        if ($("#home").hasClass("park-visible")) {
            $("#findButton").removeClass("offscreen");
            $("#home").addClass("both-visible")
                .removeClass("park-visible");
            $("#parkText").removeClass("park-bottom")
                .addClass("action-bottom");
        } 

        $("#parkArrow .icon-arrow-down").removeClass("icon-arrow-down")
            .addClass("icon-arrow-up");

        this.$(".backToHome").addClass("invisible")
            .removeClass("opaque");
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

