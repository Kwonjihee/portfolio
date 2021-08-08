(function (global, factory) {
    global = global;
    global.KVComponent = factory();
}(window, function () {
    'use strict';
    var KVComponent = (function (isUndefined) {
        var win = window;

        function KVComponent (container, args) {
            var defParams = {
                obj : container,
                titleName : '.title-name',
                titleEyebrow : '.title-eyebrow',
                customEvent : '.main' + (new Date()).getTime() + Math.random(),
            };
            this.opts = $.extend(defParams, args || {});
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        };
        KVComponent.prototype = {
            init : function () {
                this.setElements();
                this.initOption();
                this.bindEvents(true);
            },
            setElements : function () {
                this.objParent = this.obj.parent();
                this.titleName = this.obj.find(this.opts.titleName);
                this.titleEyebrow = this.obj.find(this.opts.titleEyebrow);
            },
            initOption : function () {
                var nameText = this.titleName.text(),
                    nameArr = [],
                    nameResult = '';

                nameArr = nameText.split('');
                for (var text in nameArr) {
                    nameResult += '<span>' + nameArr[text] + '</span>'
                }
                this.titleName.html(nameResult);;
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
                    this.objParent.on('activeSection', this.textAnimation.bind(this));
                } else {
                    this.objParent.off('activeSection');
                }
            },
            textAnimation : function () {
                var nameText = this.titleName.children();
                
                for (var i = 0, max = nameText.length ; i < max ; i++) {
                    TweenMax.fromTo(nameText[i], 1 , {
                        opacity : 0 
                    }, {
                        opacity : 1,
                        delay : Math.random() * 1,
                        ease : Power2.easeOut
                    });
                }

                // TweenMax.fromTo(this.titleEyebrow, 0.8 , {
                //     y : 20,
                //     opacity : 0,
                // }, {
                //     y : 0,
                //     opacity : 1,
                //     delay : 1.2,
                //     ease : Power3.easeInOut
                // });
            }
        };
        return KVComponent;
    })();
    return KVComponent;
}));
(function (global, factory) {
    global = global;
    $(function () {
        factory();
    })
}(window, function () {
    'use strict';
    var KVComponent = (function () {
        var win = window;

        function KVComponent (args) {
            var defParams = {
                obj : '.kv'
            };
            this.opts = $.extend(defParams, args || {});
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        };
        KVComponent.prototype = {
            init : function () {
                this.callComponent();
            },
            callComponent : function () {
                var _this = this;
                for (var i = 0, max = this.obj.length; i < max; i++) {
                    (function (index) {
                        var instance = new win.KVComponent(_this.obj.eq(index));
                    })(i);
                }
            }
        };
        return new KVComponent();
    })();
    return KVComponent;
}));