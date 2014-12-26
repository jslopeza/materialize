(function ($) {

  $.fn.dropdown = function (options) {
    var defaults = {
      constrain_width: true, // Constrains width of dropdown to the activator
      hover: true
    }

    options = $.extend(defaults, options);
    this.each(function(){
    var origin = $(this);
    
    // Dropdown menu
    var temp_activates = $("#"+ origin.attr('data-activates'));
    temp_activates.hide(0);

    // Move Dropdown menu to body. This allows for absolute positioning to work
    var activates = temp_activates.clone();
    $('body').append(activates);
    temp_activates.remove();


    /*    
      Helper function to position and resize dropdown.
      Used in hover and click handler.
    */    
    function placeDropdown() {
      if (options.constrain_width === true) {
        activates.css('width', origin.outerWidth());
      }
      activates.css('top', origin.offset().top);
      activates.css('left', origin.offset().left);
      activates.show({duration: 250, easing: 'easeOutCubic'});
    }


    // Hover
    if (options.hover) {
      // Hover handler to show dropdown
      origin.on('mouseover', function(e){ // Mouse over
        placeDropdown();
      });
      
      // Document click handler        
      activates.on('mouseleave', function(e){ // Mouse out
        activates.hide({duration: 175, easing: 'easeOutCubic'});
      });

    // Click
    } else {
      var open = false;

      // Click handler yo show dropdown
      origin.click( function(e){ // Click
        e.stopPropagation();
        placeDropdown();
        $(document).bind('click.'+ activates.attr('id'), function (e) {
          if (!activates.is(e.target) && (!origin.is(e.target))) {
            activates.hide({duration: 175, easing: 'easeOutCubic'});
            $(document).unbind('click.' + activates.attr('id'));
          }
        });
      });

    } // End else

    // Window Resize Reposition
    $(document).on('resize', function(){
      if (origin.is(':visible')) {
        activates.css('top', origin.offset().top);
        activates.css('left', origin.offset().left);
      }
    });
   });
  }; // End dropdown plugin
}( jQuery ));