(function (global, factory) {
    global = global;
    global.Parallax = factory();
}(this, function () { 'use strict';
    var Parallax = (function (isUndefined) {
        var win = window,
            $ = win.jQuery;
            
        function Parallax (container, args) {
            if (!(this instanceof Parallax)) {
                return new Parallax(container, args);
            }
            var defParams = {
                container : container,
                props : {
                    x : 0,
                    y : 0,
                    speed : 0.09
                },
                REVERSE_TYPE : null, //X or Y
                reverseY : 1,
                customEvent : '.Parallax' + (new Date()).getTime() + Math.random()
            };
            this.opts = $.extend(defParams, args || {});
            if (!(this.obj = $(this.opts.container)).length) return;
            this.init();
        }
        Parallax.prototype = {
            init : function () {
                this.bindEvents(true);
            },
            changeEvents : function (event) {
                var events = [],
                    eventNames = event.split(' ');
                for (var key in eventNames) {
                    events.push(eventNames[key] + this.opts.customEvent);
                }
                return events.join(' ');
            },
            bindEvents : function (type) {
                if (type) {
                    $(win).on(this.changeEvents('mousemove'), this.mousemoveFunc.bind(this));
                } else {
                    $(win).off(this.changeEvents('mousemove'));
                }
            },
            mousemoveFunc : function (e) {
                var x = e.clientX - win.innerWidth / 2,
                    y = e.clientY - win.innerHeight / 2;
                    
                this.opts.props.x += (x - this.opts.props.x) * this.opts.props.speed;
                this.opts.props.y+= (y - this.opts.props.y) * this.opts.props.speed;
                
                this.parallaxAnimation();
            },
            parallaxAnimation : function () {
                var _this = this,
                    x = (_this.opts.props.x / 100) * (this.opts.REVERSE_TYPE=='X' ? -1 : 1),
                    y = (_this.opts.props.y / 60) * (this.opts.REVERSE_TYPE=='Y' ? -1 : 1);

                TweenMax.to(_this.obj, 1, {
                    x : x,
                    y : y,
                });
            },
            parallaxAnimationDestroy : function () {
                var _this = this;
                this.opts.props.x = null;
                this.opts.props.y = null;

                TweenMax.set(_this.obj, {
                    x : 0,
                    y : 0,
                    onComplete : function () {
                        _this.obj.css('transform', '');
                    }
                });
            },
            destroy : function () {
                this.bindEvents(false);
                this.parallaxAnimationDestroy();
            }
        };
        return Parallax;
    })();
    return Parallax;
}));
