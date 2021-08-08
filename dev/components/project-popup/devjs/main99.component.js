// (function (global, factory) {
//     global = global;
//     global.ProjectComponent = factory();
// }(window, function () {
//     'use strict';
//     var ProjectComponent = (function (isUndefined) {
//         var win = window;

//         function ProjectComponent (container, args) {
//             var defParams = {
//                 obj : container,
//                 carLink : '.project__card-link',
//                 customEvent : '.main' + (new Date()).getTime() + Math.random()
//             };
//             this.opts = $.extend(defParams, args || {});
//             if (!(this.obj = $(this.opts.obj)).length) return;
//             this.init();
//         };
//         ProjectComponent.prototype = {
//             init : function () {
//                 this.setElements();
//                 this.bindEvents(true);
//             },
//             setElements : function () {
//                 this.carLink = this.obj.find(this.opts.carLink);
//             },
//             changeEvents : function (event) {
//                 var events = [],
//                     eventNames = event.split(' ');
//                 for (var key in eventNames) {
//                     events.push(eventNames[key] + this.opts.customEvent);
//                 }
//                 return events.join(' ');
//             },
//             bindEvents : function (type) {
//                 if (type) {
//                     this.carLink.on('click', this.clickEvent.bind(this));
//                 } else {
//                     this.carLink.off('click');
//                 }
//             },
//             clickEvent : function (e) {
//                 e.preventDefault();
//                 console.log('d');
//             },
//         };
//         return ProjectComponent;
//     })();
//     return ProjectComponent;
// }));
// (function (global, factory) {
//     global = global;
//     $(function () {
//         factory();
//     })
// }(window, function () {
//     'use strict';
//     var ProjectComponent = (function () {
//         var win = window;

//         function ProjectComponent (args) {
//             var defParams = {
//                 obj : '.project'
//             };
//             this.opts = $.extend(defParams, args || {});
//             if (!(this.obj = $(this.opts.obj)).length) return;
//             this.init();
//         };
//         ProjectComponent.prototype = {
//             init : function () {
//                 this.callComponent();
//             },
//             callComponent : function () {
//                 var _this = this;
//                 for (var i = 0, max = this.obj.length; i < max; i++) {
//                     (function (index) {
//                         var instance = new win.ProjectComponent(_this.obj.eq(index));
//                     })(i);
//                 }
//             }
//         };
//         return new ProjectComponent();
//     })();
//     return ProjectComponent;
// }));