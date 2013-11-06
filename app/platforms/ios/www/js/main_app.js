
/*
 RequireJS text 0.27.0 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
(function(){var k=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],n=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,o=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,i=typeof location!=="undefined"&&location.href,p=i&&location.protocol&&location.protocol.replace(/\:/,""),q=i&&location.hostname,r=i&&(location.port||void 0),j=[];define('text',[],function(){var g,h,l;typeof window!=="undefined"&&window.navigator&&window.document?h=function(a,b){var c=g.createXhr();c.open("GET",a,!0);c.onreadystatechange=
function(){c.readyState===4&&b(c.responseText)};c.send(null)}:typeof process!=="undefined"&&process.versions&&process.versions.node?(l=require.nodeRequire("fs"),h=function(a,b){b(l.readFileSync(a,"utf8"))}):typeof Packages!=="undefined"&&(h=function(a,b){var c=new java.io.File(a),e=java.lang.System.getProperty("line.separator"),c=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(c),"utf-8")),d,f,g="";try{d=new java.lang.StringBuffer;(f=c.readLine())&&f.length()&&
f.charAt(0)===65279&&(f=f.substring(1));for(d.append(f);(f=c.readLine())!==null;)d.append(e),d.append(f);g=String(d.toString())}finally{c.close()}b(g)});return g={version:"0.27.0",strip:function(a){if(a){var a=a.replace(n,""),b=a.match(o);b&&(a=b[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var a,b,c;if(typeof XMLHttpRequest!==
"undefined")return new XMLHttpRequest;else for(b=0;b<3;b++){c=k[b];try{a=new ActiveXObject(c)}catch(e){}if(a){k=[c];break}}if(!a)throw Error("createXhr(): XMLHttpRequest not available");return a},get:h,parseName:function(a){var b=!1,c=a.indexOf("."),e=a.substring(0,c),a=a.substring(c+1,a.length),c=a.indexOf("!");c!==-1&&(b=a.substring(c+1,a.length),b=b==="strip",a=a.substring(0,c));return{moduleName:e,ext:a,strip:b}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,b,c,e){var d=g.xdRegExp.exec(a),
f;if(!d)return!0;a=d[2];d=d[3];d=d.split(":");f=d[1];d=d[0];return(!a||a===b)&&(!d||d===c)&&(!f&&!d||f===e)},finishLoad:function(a,b,c,e,d){c=b?g.strip(c):c;d.isBuild&&d.inlineText&&(j[a]=c);e(c)},load:function(a,b,c,e){var d=g.parseName(a),f=d.moduleName+"."+d.ext,m=b.toUrl(f),h=e&&e.text&&e.text.useXhr||g.useXhr;!i||h(m,p,q,r)?g.get(m,function(b){g.finishLoad(a,d.strip,b,c,e)}):b([f],function(a){g.finishLoad(d.moduleName+"."+d.ext,d.strip,a,c,e)})},write:function(a,b,c){if(b in j){var e=g.jsEscape(j[b]);
c.asModule(a+"!"+b,"define(function () { return '"+e+"';});\n")}},writeFile:function(a,b,c,e,d){var b=g.parseName(b),f=b.moduleName+"."+b.ext,h=c.toUrl(b.moduleName+"."+b.ext)+".js";g.load(f,c,function(){var b=function(a){return e(h,a)};b.asModule=function(a,b){return e.asModule(a,h,b)};g.write(a,f,b,d)},d)}}})})();

define('text!templates/partials/loading.html',[],function () { return '<div class="loading">\n    <img src="../../img/loader-big.gif" />\n</div>\n\n';});

define('baseview',[
   'text!templates/partials/loading.html',
], function(loadingTemplate){
    var BaseView = Backbone.View.extend({

        initArgs: function(args) {
            var view = this;
            this.loaderTemplate = _.template(loadingTemplate);
            this.startLoad();

            if (args) {
                for (var attribute in args) {
                    view[attribute] = args[attribute];
                }
            }

            if (this.restoreState)
                this.restoreState();

            //Events are "inherited" through the prototype chain so we need to re-delegate 
            //them in order for this particular view to only respond to it's own events.
            this.delegateEvents()
        },

        startLoad: function() {
            this.$el.css("height", "100%");
            this.$el.html(this.loaderTemplate());
        },

        fadeInViewElements: function(template) {
            this.$el.addClass("invisible").removeClass("opaque");
            if (template)
                this.$el.html(template);

            this.$el.addClass("opaque")
                .removeClass("invisible");
        },
        
        close: function() {
            this.trigger("close", this);
            this.closeSubviews();
            this.unbindFromAll();
            this.unbindFromAllControls();
            this.undelegateEvents();
            this.off();
            if (this.$el.prop("id") == "main-content")
                this.$el.empty();
            else
                this.$el.remove();

            if (this.saveState)
                this.saveState();
            
            if (this.onClose) 
                this.onClose();
        },
        
        //We'll use the view events delegator for "in-house" events.
        //But we'll bindTo global events so we can undelegate them upon closing the view
        bindTo: function(object, e, callback, context) {
            context || (context = this);
            
            object.on(e, callback, context);
            
            this.bindings || (this.bindings = []);
            this.bindings.push({ object: object, event: e, callback: callback });
        },

        unBindFrom: function(object, e) {
            object.off(e);
            this.bindings = _.reject(this.bindings, function(binding) {
                return (binding.object == object && binding.e == e);
            });
        },

        bindToControl: function(control, e, callback, context) {
            context || (context = this);
            
            control.events.register(e, context, callback);
            
            this.controlBindings || (this.controlBindings = []);
            this.controlBindings.push({ control: control, event: e, callback: callback, view: this });
        },

        eachSubview: function(iterator) {
            _.each(this.subviews, iterator);
        },

        unbindEventsToView: function(view) {
            var self = this;
            var bindingsToRemove = _.where(this.bindings, {object: view});
            _.each(bindingsToRemove, function(binding, index, list) {
                binding.object.off(binding.event, binding.callback, self);
            });

            this.bindings = _.difference(this.bindings, bindingsToRemove);
        },

        unbindControlEventsFromView: function(view) {
            var self = this;
            var bindingsToRemove = _.where(this.controlBindings, {view: view});
            _.each(bindingsToRemove, function(binding, index, list) {
                binding.control.events.unregister(binding.event, self, binding.callback);
            });

            this.controlBindings = _.difference(this.controlBindings, bindingsToRemove);
        },
        
        unbindFromAll: function() {
            var self = this;
            
            _.each(this.bindings, function(binding, index, list) {
                binding.object.off(binding.event, binding.callback, self);
            });

            //Here, I can just reset the array and the garbarge collection will take care of the rest
            //Remember, I switched the event off so we should be ok
            this.bindings = [];
        },

        unbindFromAllControls: function() {
            var self = this;
            
            _.each(this.controlBindings, function(binding, index, list) {
                binding.control.events.unregister(binding.event, self, binding.callback);
            });

            //Here, I can just reset the array and the garbarge collection will take care of the rest
            //Remember, I switched the event off so we should be ok
            this.controlBindings = [];
        },
        
        addSubView: function(view) {
            this.subviews || (this.subviews = {});
            this.subviews[view.cid] = view;

            //We're binding to the child's close action
            //That way we can unbind any (other) events we're listening for on the child
            //as well as remove it from our subviews
            //Normally I don't like coupling like this but, here, it makes a lot of sense
            this.bindTo(view, "close", this.removeSubView, this);
        },

        removeSubView: function(view) {
            this.unbindEventsToView(view);
            //I want to free up the memory so I'm deleting
            delete this.subviews[view.cid];
        },

        reRender: function(args) {
            if (this.preRender)
                this.preRender.apply(this, args);
            this.render.apply(this, args);
        },
        
        closeSubviews: function() {
            this.eachSubview(function(subview) {
                subview.close();
            });
            
            this.subviews = {};
        }
    });

    return BaseView;
});


define('text!templates/pages/HomeView.html',[],function () { return '<div id="home" class="height-100 relative top-transition">\n    <div id="findContainer" class="centered height-49 swipeableDown relative">\n        <button class="main-button pure-button pure-button-secondary half-font-size button">\n            Find \n        </button>\n    </div>\n    <div class="separator" />\n    <div id="parkContainer" class="centered height-49 swipeableDown relative">\n        <button class="main-button pure-button pure-button-secondary half-font-size button">\n            Park \n        </button>\n    </div>\n</div>\n\n';});

define('views/pages/HomeView',[
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

define('utils',[], function() {
    return {
        getGeoDistance: function(currentLocation, destination) {
            //Following the haversine formula
            console.log("Calculating distance between");
            console.log(currentLocation);
            console.log(destination);

            var EARTHRADIUS = 6371; //in KM
            var distanceLat = (destination.latitude - currentLocation.latitude).toRad();
            var distanceLon = (destination.longitude - currentLocation.longitude).toRad();
            var currentLat = currentLocation.latitude.toRad();
            var destinationLat = destination.latitude.toRad();

            var a = Math.sin(distanceLat/2) * Math.sin(distanceLat/2) +
                    Math.sin(distanceLon/2) * Math.sin(distanceLon/2) * Math.cos(currentLat) * Math.cos(destinationLat);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            return EARTHRADIUS * c;
        },

        getGeoBearing: function(currentLocation, destination) {
            //Following the Forward Azimuth formula
            var EARTHRADIUS = 6371; //in KM
            var distanceLat = (destination.latitude - currentLocation.latitude).toRad();
            var distanceLon = (destination.longitude - currentLocation.longitude).toRad();
            var currentLat = currentLocation.latitude.toRad();
            var destinationLat = destination.latitude.toRad();

            var y = Math.sin(distanceLon) * Math.cos(destinationLat);
            var x = Math.cos(currentLat)*Math.sin(destinationLat) -
                    Math.sin(currentLat)*Math.cos(destinationLat)*Math.cos(distanceLon);
            return Math.atan2(y, x).toDeg();
        }
    };
});


define('text!templates/pages/FindView.html',[],function () { return '<div class="width-100 header">\n    <div id="back" class="inline">\n        <span class="icon-back back-button" />\n    </div>\n</div>\n\n<div class="title">\n    <h2> Find Your Car! </h2>\n</div>\n\n<div id="findInfoContainer" class="main-80">\n</div>\n';});

define('text!templates/partials/FindCar.html',[],function () { return '<div id="direction" class="padding-15 height-80">\n    <div> Just Follow the arrow to your car! </div>\n    <div id="arrowContainer">\n        <div class="arrow-heading transition-enabled"> </div>\n    </div>\n</div>\n\n<div id="distance" class="bottom">\n    <span id="distanceLeft"> </span> m\n</div>\n\n';});

define('views/pages/FindView',[
  'baseview',
  '../../utils',
  'text!templates/pages/FindView.html',
  'text!templates/partials/FindCar.html',
  'text!templates/partials/loading.html'
], function(Baseview, Utils, findTemplate, locationFoundTemplate, loadingTemplate){

  var FindView = Baseview.extend({
    initialize: function(args) {
        this.initArgs(args);
        this.continuousBearingRefresh = null;
    },

    template: _.template(findTemplate),

    events: {
        "tap    #back": "goBack"
    },

    goBack: function(e) {
        this.router.navigate("", true);
    },

    getParkLocation: function(callback) {
        console.log("Getting park location");
        callback.call(this, {latitude: 80, longitude: -10});
    },

    calculateHeading: function(bearing) {
        var view = this;

        navigator.geolocation.getCurrentPosition(function(location) {
            var template = _.template(locationFoundTemplate);
            this.$("#findInfoContainer").html(_.template(template({location: location})));

            try {
                var distance = Utils.getGeoDistance(location.coords, view.parkLocation);
                var bearingToCar = Utils.getGeoBearing(location.coords, view.parkLocation);
            } catch (e) {
                alert("Error: " + e.message);
            }
            console.log("bearing: ", bearing);
            console.log("bearing to car: ", bearingToCar);

            var str = "latitude: " + location.coords.latitude + "\n";
            str += "longitude: " + location.coords.longitude + "\n";

            var directionToGo = bearingToCar - bearing;
            view.$(".arrow-heading").css("-webkit-transform", "rotate(" + directionToGo + "deg)");
            view.$("#distanceLeft").html(distance);
        }, function(err) {
            console.log("ERROR GETTING LOCATION: ", err);
        });
    },

    onClose: function() {
        navigator.geolocation.clearWatch(this.geoWatchID);
    },

    render: function(){
        var view = this;
        var geoOptions = { maximumAge: 1000, timeout: 20000, enableHighAccuracy: true }
        this.fadeInViewElements(findTemplate);
        this.$("#findInfoContainer").html(loadingTemplate);
        this.$("#findInfoContainer").append("Getting Position...");

        this.getParkLocation(function(parkLocation) {
            view.parkLocation = parkLocation;

            navigator.compass.watchHeading(function(heading) {
                view.calculateHeading(heading.magneticHeading);
            }, function(err) {
                alert("ERROR: ", err.message);
                console.log("Error: ", err);
            }, {frequency: 1000});
        });
    }

  });

  return FindView;
});


define('text!templates/pages/ParkView.html',[],function () { return '<div class="backToHome top back invisible centered">\n    <span class="icon-back vcentered-icon" />\n</div>\n<div id="parkText" class="action absolute action-bottom width-100 top-transition center bpadding-10">\n    <button id="parkButton" class="pure-button pure-button-secondary half-font-size">\n        Park\n    </button>\n</div>\n\n';});

define('views/pages/ParkView',[
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


define('router',[
       'views/pages/HomeView',
       'views/pages/FindView',
       'views/pages/ParkView',
], function(HomeView, FindView, ParkView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'find': 'find'
        },

        initialize: function() {
            this.mainEl = $("#main-content");
        },

        home: function() {
            var homeView = new HomeView({el: this.mainEl, router: this});
            AppView.showView(homeView);
        },

        find: function() {
            var findView = new FindView({el: this.mainEl, router: this});
            AppView.showView(findView);
        }
    });

    var AppView = {
        currentView: null,
        previousView: null,
        showView: function(view) {
            if (this.currentView)
                this.previousView = this.currentView;

            this.currentView = view;

            if (this.previousView){
                this.previousView.close();
            }
            //This uses the el set in the view when we initialize it. AppView is here only to swap entire views.
            this.currentView.render();
        }
    }

    var initialize = function() {
        var router = new AppRouter();
        Backbone.history.start();

        router.navigate("", true);
    };

    return { 
        initialize: initialize
    };
});

define('app',[
  'router'
], function(Router) {
    var app = {
        // Application Constructor
        initialize: function() {
            Router.initialize();
        }
    }

    return app;
});

requirejs.config({
    paths: {
        baseview: 'base/BaseView',
        templates: '../templates'
    },

    waitSeconds: 0 //disable timeout
});

    define('main',['app'], function(App){
        //Overrides:

        //Converts numeric degrees to radians
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        }

        // Converts radians to numeric (signed) degrees
        Number.prototype.toDeg = function() {
            return this * 180 / Math.PI;
        }

        // The "app" dependency is passed in as "App"
        // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
        App.initialize();
    })

;
require(["main"]);
