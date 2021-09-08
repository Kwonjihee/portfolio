(function (global, factory) {
    global = global;
    global.SkillComponent = factory();
}(window, function () {
    'use strict';
    var SkillComponent = (function (isUndefined) {
        var win = window;

        function SkillComponent (container, args) {
            var defParams = {
                obj : container,
                skillList : '.skill__list',
                skillGraph : '.skill-graph',
                skillGraphInner : '.skill-graph-inner',
                skillPercent : '.percent span',
                activeClass : 'swiper-slide-active',
                customEvent : '.main' + (new Date()).getTime() + Math.random(),
                currIdx : 0,
                duration : 600
            };
            this.opts = $.extend(defParams, args || {});
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        };
        SkillComponent.prototype = {
            init : function () {
                this.setElements();
                this.initOpts();
                this.bindEvents(true);
            },
            setElements : function () {
                this.objParent = this.obj.parent();
                this.skillList = this.obj.find(this.opts.skillList);
                this.skillItem = this.skillList.children();
                this.skillGraph = this.skillItem.find(this.opts.skillGraph);
                this.skillGraphInner = this.skillGraph.find(this.opts.skillGraphInner);
                this.skillPercent = this.skillGraphInner.find(this.opts.skillPercent);
            },
            initOpts : function () {
                this.graphInit();
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
                    this.objParent.on('activeSection', this.activeSection.bind(this));
                } else {
                    this.objParent.off('activeSection');
                }
            },
            activeSection : function () {
                this.graphInit();
                this.graphAnimation();
            },
            graphInit : function () {
                var _this = this;

                this.opts.currIdx = 0;
                TweenMax.set(_this.skillGraphInner, {
                    width : 0
                });
                _this.skillPercent.text(0);
            },
            graphAnimation : function () {
                if (this.opts.currIdx === this.skillItem.length) return;

                var _this = this,
                    target = this.skillGraph.eq(this.opts.currIdx),
                    targetValue = target.data('value') ? target.data('value') : 0,
                    value = 0;

                TweenMax.to(_this.skillGraphInner.eq(this.opts.currIdx), this.opts.duration/1000, {
                    width : targetValue+'%',
                    onUpdate : function () {
                        value = Math.round(this.progress() * targetValue);
                        _this.skillPercent.eq(_this.opts.currIdx).text(value);
                    },
                    onComplete: function () {
                        _this.opts.currIdx += 1;
                        _this.graphAnimation();
                    },
                    delay : this.opts.currIdx === 0 ? 1 : 0
                });
            }
        };
        return SkillComponent;
    })();
    return SkillComponent;
}));
(function (global, factory) {
    global = global;
    $(function () {
        factory();
    })
}(window, function () {
    'use strict';
    var SkillComponent = (function () {
        var win = window;

        function SkillComponent (args) {
            var defParams = {
                obj : '.skill'
            };
            this.opts = $.extend(defParams, args || {});
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        };
        SkillComponent.prototype = {
            init : function () {
                this.callComponent();
            },
            callComponent : function () {
                var _this = this;
                for (var i = 0, max = this.obj.length; i < max; i++) {
                    (function (index) {
                        var instance = new win.SkillComponent(_this.obj.eq(index));
                    })(i);
                }
            }
        };
        return new SkillComponent();
    })();
    return SkillComponent;
}));