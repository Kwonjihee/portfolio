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
                popupWrap : '.project-popup__wrap',
                popupClose : '.popup-close',
                customEvent : '.main' + (new Date()).getTime() + Math.random(),
                targetPopup : null,
                currTarget : null
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

                var _this = this,
                    target = $(e.currentTarget),
                    targetOpen = target.data('popup-open');
                this.opts.targetPopup = $('html, body').find('#'+targetOpen);

                if (!this.opts.targetPopup) return;
                this.opts.currTarget = target;
                this.popupWrap = this.opts.targetPopup.find(this.opts.popupWrap);
                var focusHTML = '<span style="width:1px;height:1px;" tabindex="0">';

                this.popupWrap.before(focusHTML);
                this.popupWrap.after(focusHTML);
                this.popupWrap.attr('tabindex', '0');
                win.setTimeout(function() {
                    _this.popupWrap.focus();
                });
                this.popupPrevFocus = this.popupWrap.prev();
                this.popupNextFocus = this.popupWrap.next();

                this.opts.targetPopup.css('display', 'block');
                this.opts.closePopup = this.opts.targetPopup.find(this.opts.popupClose);
                
                if (!this.opts.closePopup) return;
                this.popupBindEvents(true);
            },
            popupBindEvents : function (type) {
                if (type) {
                    this.popupPrevFocus.on('focusin', this.onPrevFocusFunc.bind(this));
                    this.popupNextFocus.on('focusin', this.onNextFocusFunc.bind(this));
                    this.opts.closePopup.on('click', this.clickClose.bind(this));
                } else {
                    this.popupPrevFocus.off('focusin');
                    this.popupNextFocus.off('focusin');
                    this.opts.closePopup.off('click');
                }
            },
            onPrevFocusFunc : function () {
                this.popupWrap.find('a, button, input').filter(':visible').last().focus();
            },
            onNextFocusFunc : function () {
                this.popupWrap.focus()
            },
            clickClose : function (e) {
                e.preventDefault();

                if (!this.opts.closePopup) return;

                this.opts.targetPopup.css('display', 'none');
                this.popupBindEvents(false);
                this.opts.targetPopup = null;
                this.opts.closePopup = null;
                
                this.popupPrevFocus.remove();
                this.popupNextFocus.remove();
                this.popupPrevFocus = null;
                this.popupNextFocus = null;
                this.popupWrap = null;

                this.opts.currTarget.focus();
                this.opts.currTarget = null;
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