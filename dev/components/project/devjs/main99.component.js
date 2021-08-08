(function (global, factory) {
    global = global;
    global.ProjectComponent = factory();
}(window, function () {
    'use strict';
    var ProjectComponent = (function (isUndefined) {
        var win = window;

        function ProjectComponent (container, args) {
            var defParams = {
                obj : container,
                carLink : '.project__card-link',
                popupClose : '.popup-close',
                customEvent : '.main' + (new Date()).getTime() + Math.random(),
                targetPopup : null
            };
            this.opts = $.extend(defParams, args || {});
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        };
        ProjectComponent.prototype = {
            init : function () {
                this.setElements();
                this.bindEvents(true);
            },
            setElements : function () {
                this.carLink = this.obj.find(this.opts.carLink);
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
                    this.carLink.on('click', this.clickOpenPopup.bind(this));
                } else {
                    this.carLink.off('click');
                }
            },
            clickOpenPopup : function (e) {
                e.preventDefault();
                
                if (this.opts.targetPopup !== null) return;

                var target = $(e.currentTarget),
                    targetOpen = target.data('popup-open');
                this.opts.targetPopup = $('html, body').find('#project-popup');

                if (!this.opts.targetPopup) return;
                this.opts.targetPopup.css('display', 'block');
                this.opts.closePopup = this.opts.targetPopup.find(this.opts.popupClose);
                
                if (!this.opts.closePopup) return;
                this.popupBindEvents(true);
            },
            popupBindEvents : function (type) {
                if (type) {
                    this.opts.closePopup.on('click', this.clickClose.bind(this));
                } else {
                    this.opts.closePopup.off('click');
                }
            },
            clickClose : function (e) {
                e.preventDefault();

                if (!this.opts.closePopup) return;

                this.opts.targetPopup.css('display', 'none');
                this.popupBindEvents(false);
                this.opts.targetPopup = null;
                this.opts.closePopup = null;
            }
        };
        return ProjectComponent;
    })();
    return ProjectComponent;
}));
(function (global, factory) {
    global = global;
    $(function () {
        factory();
    })
}(window, function () {
    'use strict';
    var ProjectComponent = (function () {
        var win = window;

        function ProjectComponent (args) {
            var defParams = {
                obj : '.project'
            };
            this.opts = $.extend(defParams, args || {});
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        };
        ProjectComponent.prototype = {
            init : function () {
                this.callComponent();
            },
            callComponent : function () {
                var _this = this;
                for (var i = 0, max = this.obj.length; i < max; i++) {
                    (function (index) {
                        var instance = new win.ProjectComponent(_this.obj.eq(index));
                    })(i);
                }
            }
        };
        return new ProjectComponent();
    })();
    return ProjectComponent;
}));