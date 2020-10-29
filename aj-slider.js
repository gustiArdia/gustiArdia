$(function() {
    AjSlider = {
        setup: function() {
            var self = this;
            $('.aj-slider').each(function() {
                // slider
                var $slider = $(this);
                var itemWidth = $slider.find('>li:eq(0)').width();
                var width = $slider.find('>li').length * itemWidth;
                $slider.width(width);
                
                // slider buttons
                var $prevButton = $slider.closest('.aj-slider-wrapper').find('.aj-slider-button-prev');
                $prevButton.click(function(e) {
                    e.preventDefault();
                    self.showPreviousItem($slider);
                });
                var $nextButton = $slider.closest('.aj-slider-wrapper').find('.aj-slider-button-next');
                $nextButton.click(function(e) {
                    e.preventDefault();
                    self.showNextItem($slider);
                });
                
                // gestures
                if ('undefined' !== typeof $slider.hammer) {
                    $slider.hammer({
                    }).bind('swipeleft', function() {
                        self.showNextItem($slider);
                    }).bind('swiperight', function() {
                        self.showPreviousItem($slider);
                    });
                }
                
                // autoplay?
                if ('true' == $slider.attr('data-autoplay')) {
                    self.enableAutoplay($slider);
                }
            });
        },
        showPreviousItem: function($slider) {
            var itemWidth = $slider.find('>li:eq(0)').width();
            var $firstItem = $slider.find('>li:eq(0)');
            $firstItem.stop().animate({
                marginLeft: -1 * itemWidth
            }, function() {
                $firstItem.appendTo($slider).css({
                    marginLeft: 0
                });
            });
        },
        showNextItem: function($slider) {
            var itemWidth = $slider.find('>li:eq(0)').width();
            var $lastItem = $slider.find('>li:last-child');
            $lastItem.css({
                marginLeft: -1 * itemWidth
            }).prependTo($slider);
            $lastItem.stop().animate({
                marginLeft: 0
            });
        },
        enableAutoplay: function($slider) {
            var self = this;
            var autoplayIntervalTime = $slider.attr('data-autoplayduration');
            if (! autoplayIntervalTime || '' == autoplayIntervalTime) {
                autoplayIntervalTime = 2000;
            }
            var autoplayIntervalId = setInterval(function() {
                self.showNextItem($slider);
            }, autoplayIntervalTime);
            $slider.data('autoplayIntervalId', autoplayIntervalId);
            
            // stop on mouse enter
            $slider.closest('.aj-slider-wrapper').on('mouseenter mousemove', function() {
                self.disableAutoplay($slider);
            }).on('mouseleave', function() {
                self.disableAutoplay($slider);
                var autoplayIntervalId = setInterval(function() {
                    self.showNextItem($slider);
                }, autoplayIntervalTime);
                $slider.data('autoplayIntervalId', autoplayIntervalId);
            });
            $('.icon-navigate-left, .icon-navigate-right').on('click', function() {
                self.disableAutoplay($slider);
            });
        },
        disableAutoplay: function($slider) {
            clearInterval($slider.data('autoplayIntervalId'));
        }
    };
    AjSlider.setup();
});