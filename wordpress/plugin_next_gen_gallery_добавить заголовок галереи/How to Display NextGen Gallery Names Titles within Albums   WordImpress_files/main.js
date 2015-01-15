/* Author:

*/



jQuery.noConflict();

//Fit Text
(function( $ ){
  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize', resizer);

    });

  };

})( jQuery );

//ON DOM load
(function($){

    $('#homepage-slider').delay(4000).queue(function( nxt ) {
        $(this).removeClass('loading');
        nxt();
    });
    $('.layerSlider-wrap').delay(3000).queue(function( nxt ) {
        $(this).removeClass('loading');
        nxt();
    });

    jQuery(".fit-text-regular").fitText(3, { minFontSize: 24, maxFontSize: '40px' });
    jQuery('.fit-text-big').fitText(2.2, { minFontSize: 24, maxFontSize: '54px' });
    jQuery('.fit-text-large').fitText(1.8, { minFontSize: 24, maxFontSize: '60px' });
    jQuery('.fit-text-super-large').fitText(1.8, { minFontSize: 28, maxFontSize: '72px' });
    jQuery('.fit-text-split').fitText(1.8, { minFontSize: 24, maxFontSize: '31px' });


    jQuery('.service-link, .introduction-symbol').popover({
        placement: 'top',
        trigger: 'hover',
        delay: 200

    });

    //Enable tooltips
    jQuery('.tipsy').tooltip();


     //add default values to Gravity Forms name inputs
    $('.name-field .ginput_left input').attr('value','First Name');
    $('.name-field .ginput_right input').attr('value','Last Name');

    //Clear default values in Gravity Forms and place them back in on blur if they are empty
    //https://gist.github.com/BronsonQuick/3495318
    jQuery.fn.cleardefault = function() {
       	return this.focus(function() {
       		if( this.value == this.defaultValue ) {
       			this.value = "";
       		}
       	}).blur(function() {
       		if( !this.value.length ) {
       			this.value = this.defaultValue;
       		}
       	});
       };
       jQuery(".gform_wrapper input[type='text'], .gform_wrapper input[type='email'], .gform_wrapper input[type='tel'], .gform_wrapper textarea").cleardefault();


})(jQuery);


if( jQuery().isotope ) {

  jQuery(function() {
      var container = jQuery('.portfolio-wrap'),
          optionFilter = jQuery('#filters'),
          optionFilterLinks = optionFilter.find('option');

      container.isotope({
          // options...
          resizable: false, // disable normal resizing
          // set columnWidth to a percentage of container width
          masonry: { columnWidth: container.width() / 3 }
      });

//      optionFilter.change(function(e){
//           e.preventDefault();
//          var selector = jQuery("#filters option:selected").attr('data-filter');
//          container.isotope({
//              filter : '.' + selector,
//              itemSelector : '.portfolio-item',
//              layoutMode : 'masonry',
//              animationEngine : 'best-available'
//          });
//          return false;
//      });

      // update columnWidth on window resize
      jQuery(window).smartresize(function(){
          container.isotope({
          // update columnWidth to a percentage of container width
          masonry: { columnWidth: container.width() / 3 }
        });
      });

  });


}

