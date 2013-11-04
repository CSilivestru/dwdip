define([
  'baseview',
  'text!templates/partials/FindView.html'
], function(Baseview, findTemplate){

  var FindView = Baseview.extend({
    initialize: function() {
    },

    template: _.template(findTemplate),

    events: {
        "tap #findButton": "showFind",
        "tap .backToHome": "backToNeutral"
    },

    showFind: function(e) {
        $("#findText").addClass("find-top")
            .removeClass("action-top");

        $("#findButton").addClass("full");

        $("#home").addClass("find-visible");

        $(".backToHome").addClass("opaque")
            .removeClass("invisible");
    },

    backToNeutral: function(e) {
        if ($("#home").hasClass("find-visible")) {
            $("#home").addClass("both-visible")
                .removeClass("find-visible");

            $("#findText").removeClass("find-top")
                .addClass("action-top");

            $("#findButton").removeClass("full");

            $("#findArrow .icon-arrow-up").removeClass("icon-arrow-up")
                .addClass("icon-arrow-down");

            $(".backToHome").addClass("invisible")
                .removeClass("opaque");

        }
    },

    render: function(){
      this.fadeInViewElements(findTemplate);
      this.$el.hammer();
    }

  });

  return FindView;
});

