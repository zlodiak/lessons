/**
 * Скрипты для левой навигационной панели
 */

$(function(){

  
  var navbar = $('#navbar');
  var navbar_overlay = $('#navbar_overlay');

  // клик по кнопке в левом меню
  $(document).on('click', '#navbar .tab', function(){
    var tab = $(this).data('tab')
    
    if( typeof(tab) != 'undefined' ){
      if( navbar_overlay.hasClass('show') && $(this).hasClass('open')){
        
        navbar_overlay.removeClass('show');
        //navbar.find('.tab.open').removeClass('open');
        navbar.find('.nav_tabs_content.open').removeClass('open');
        navbar.find('.nav_tab').addClass('hidden');

      }else{
        
        navbar.find('.tab.open').removeClass('open');
        navbar.find('.nav_tab').addClass('hidden');
        navbar_overlay.addClass('show');
        $('#'+tab).removeClass('hidden')
        $(this).addClass('open')
        navbar.find('.nav_tabs_content').addClass('open');
      }
      return false;
    }
    
  })

  // клик по оверлею
  $(document).on('click touchstart', '#navbar_overlay', function(){
    navbar_overlay.removeClass('show');
    //navbar.find('.tab.open').removeClass('open');
    navbar.find('.nav_tabs_content.open').removeClass('open');
    navbar.find('.nav_tab').addClass('hidden');
  })

  // клик по кнопке "разделы"
  $(document).on('click', '.tab_menu', function(){
    $('.global_search_form input').focus();
  })

  /**
   * Кнопка "наверх" в левой навигационной панели
   */
  window.last_scroll_position = 0;
  var show = false
  var scroll_to_top = $('#scroll_to_top');
  
  scroll_to_top.on('click', function(){
    if(scroll_to_top.hasClass('has_position')){ 
      scroll_to_top.removeClass('has_position');    
      $.scrollTo( window.last_scroll_position , 100,  { axis: 'y' } );
      window.last_scroll_position = 0;
      scroll_to_top.attr('title', 'Наверх')
    }else{
      scroll_to_top.addClass('has_position');
      window.last_scroll_position = window.pageYOffset;
      $.scrollTo( 0 , 100,  { axis: 'y' } );
      scroll_to_top.attr('title', 'Вниз')
    }
    return false;
  })

  var last_position = 0;
  var is_show = false;
          
  $(window).scroll(function () {   

    if(window.pageYOffset > 40){
      if( !is_show ){
        scroll_to_top.removeClass('hidden'); 
        is_show = true;
      }
    }else{
      if( is_show ){
        scroll_to_top.addClass('hidden');
        is_show = false;
      }
    }

    if( last_position < window.pageYOffset){
      //console.log('скролл вниз', last_position , window.pageYOffset);
      if( scroll_to_top.hasClass('has_position') ){
        scroll_to_top.removeClass('has_position');
      }

    }else{
      //console.log('скролл вверх', last_position , window.pageYOffset);
    }
    last_position = window.pageYOffset;
  })


})



