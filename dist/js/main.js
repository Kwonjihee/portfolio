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

(function (global, factory) {
    global = global;
    global.mainComponent = factory();
}(window, function () {
    'use strict';
    var mainComponent = (function (isUndefined) {
        var win = window;

        function mainComponent (container, args) {
            var defParams = {
                obj : container,
                objWrap : '.main-container__wrapper',
                objItem : '.main-container__item',
                progressBar : '.slide_progress-bar',
                swiperOpts : {
                    autoplay: {
                        delay: 30000,
                        disableOnInteraction: false
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    mousewheel : true
                },
                customEvent : '.main' + (new Date()).getTime() + Math.random(),
                swiperInstance : null,
                currIdx : null,
                parallaxInstance : null,
            };
            this.opts = $.extend(defParams, args || {});
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        };
        mainComponent.prototype = {
            init : function () {
                this.setElements();
                this.buildSwiper();
            },
            setElements : function () {
                this.objWrap = this.obj.find(this.opts.objWrap);
                this.objItem = this.objWrap.find(this.opts.objItem);
                this.progressBar = this.obj.find(this.opts.progressBar);
            },
            buildSwiper : function () {
                var _this = this;
                if (this.opts.swiperInstance === null) {
                    this.opts.swiperInstance = new Swiper(this.obj, this.opts.swiperOpts);
                    this.opts.currIdx = this.opts.swiperInstance.realIndex;
                    _this.objItem.eq(_this.opts.currIdx).triggerHandler('activeSection')
                    _this.swiperProgress();
                    _this.parallaxInit();
                    this.opts.swiperInstance.on('slideChangeTransitionStart', function () {
                       _this.opts.currIdx  = _this.opts.swiperInstance.realIndex;
                       _this.objItem.eq(_this.opts.currIdx).triggerHandler('activeSection')
                        _this.swiperProgress();
                        _this.parallaxDestroy();
                        _this.parallaxInit();
                    })
                }
            },
            swiperProgress : function () {
                if (this.opts.swiperInstance === null) return;

                if (!this.opts.swiperInstance.params.autoplay.enabled) {
                    this.progressBar.parent().remove();
                    return;
                }
                
                var duration = this.opts.swiperInstance.params.autoplay.delay/1000;
                TweenMax.fromTo(this.progressBar, duration, {
                    width: '0%'
                }, {
                    ease : Linear.easeNone,
                    width: '100%'
                });
            },
            parallaxInit : function () {
                var target = this.objItem.eq(this.opts.currIdx),
                    parallaxItem = target.find('[data-parallax]');
                    
                if (parallaxItem.length === 0) return;
                    
                this.opts.parallaxInstance = [];
                var parallaxItemOpts = {};
                for (var i = 0, max = parallaxItem.length ; i < max ; i++) {
                    parallaxItemOpts = $(parallaxItem[i]).data('parallax');
                    this.opts.parallaxInstance[i] = new Parallax(parallaxItem[i], parallaxItemOpts);
                }
            },
            parallaxDestroy : function () {
                if (this.opts.parallaxInstance == null) return;
                for (var i = 0, max = this.opts.parallaxInstance.length ; i < max ; i++) {
                    this.opts.parallaxInstance[i].destroy();
                }
                this.opts.parallaxInstance = null;
            }
        };
        return mainComponent;
    })();
    return mainComponent;
}));
(function (global, factory) {
    global = global;
    $(function () {
        factory();
    })
}(window, function () {
    'use strict';
    var mainComponent = (function () {
        var win = window;

        function mainComponent (args) {
            var defParams = {
                obj : '.main-container'
            };
            this.opts = $.extend(defParams, args || {});
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        };
        mainComponent.prototype = {
            init : function () {
                this.callComponent();
            },
            callComponent : function () {
                var _this = this;
                for (var i = 0, max = this.obj.length; i < max; i++) {
                    (function (index) {
                        var instance = new win.mainComponent(_this.obj.eq(index));
                    })(i);
                }
            }
        };
        return new mainComponent();
    })();
    return mainComponent;
}));
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
                duration : 1200
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
            graphAnimation : function () {
                if (this.opts.currIdx === this.skillItem.length) return;

                var _this = this,
                    target = this.skillGraph.eq(this.opts.currIdx),
                    targetValue = target.data('value') ? target.data('value') : 0,
                    valueHalf = targetValue / 2,
                    value = 0;

                TweenMax.to(_this.skillGraphInner.eq(this.opts.currIdx), this.opts.duration/1000, {
                    width : targetValue+'%',
                    onUpdate : function () {
                        value = Math.round(this._time * valueHalf);
                        _this.skillPercent.eq(_this.opts.currIdx).text(value);
                    },
                    onComplete: function () {
                        _this.opts.currIdx += 1;
                        _this.graphAnimation();
                    },
                    delay : this.opts.currIdx === 0 ? 1.5 : 0
                });
            },
            graphInit : function () {
                var _this = this;

                this.opts.currIdx = 0;
                TweenMax.set(_this.skillGraphInner, {
                    width : 0
                });
                _this.skillPercent.text(0);
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