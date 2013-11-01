define([
  'baseview',
  'text!templates/partials/FindView.html'
], function(Baseview, findTemplate){

  var FindView = Baseview.extend({
    initialize: function() {
    },

    template: _.template(findTemplate),

    events: {
        "swipedown": "handleSwipeDown",
        "swipeup": "handleSwipeUp",
    },

    handleSwipeDown: function(e) {
        $("#home").addClass("find-visible");
        $("#findText").addClass("find-top")
            .removeClass("action-top");

        $("#findArrow .icon-arrow-down").removeClass("icon-arrow-down")
            .addClass("icon-arrow-up");
    },

    handleSwipeUp: function(e) {
        if ($("#home").hasClass("find-visible")) {
            $("#home").addClass("both-visible")
                .removeClass("find-visible");

            $("#findText").removeClass("find-top")
                .addClass("action-top");

            $("#findArrow .icon-arrow-up").removeClass("icon-arrow-up")
                .addClass("icon-arrow-down");
        }
    },

    render: function(){
      this.fadeInViewElements(findTemplate);
      this.$el.hammer();
    }

  });

  return FindView;
});

