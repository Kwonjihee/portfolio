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