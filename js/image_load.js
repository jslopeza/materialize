$( document ).ready(function() {
                $('.image-off').click(function(){

                  $(this).velocity({opacity: 1}, {
                        duration: 750,
                        queue: false,
                        easing: 'easeOutSine'
                    });
                  $(this).animate({opacity: 1}, {
                        duration: 1000,
                        queue: false,
                        easing: 'swing', // or "linear"
                                         // use jQuery UI or Easing plugin for more options
                        step: function(now, fx) {
                            fx.start = 100;
                            var grayscale_setting = now/100;
                            var brightness_setting = 150 - (100 - now)/1.75;

                            if (brightness_setting < 100)
                              brightness_setting = 100;

                            console.log(grayscale_setting);
                            if (now >= 0) {
                              $(this).css({
                                  "-webkit-filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)",
                                  "filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)"
                              });
                            }
                        }
                    });


                });
            });