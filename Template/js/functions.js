;(function($) {

  'use strict'; // Using strict mode

  var $body = $('body');
  $body.imagesLoaded( { background: '.item, .slide' }, function() {

    // Remove preload class after every image has been loaded
    $body.removeClass('preload'); // Class holds "display:none"

    // You can use anchor links, using the .anchor class
    $('.anchor').on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      var href = $(this).attr('href');
      $('html,body').animate({
        scrollTop : $(href).offset().top+'px'
      });
    });

    // Initialize functions on scroll
    $(window).on('scroll', function(){
      window.requestAnimationFrame(parallax); // Parallax
    });

    // Parallax background script, use the ".parallax" class.
    var parallaxSpeed = 0.15;

    function parallax(){
      var $parallax = $('.parallax');
      // Parallax scrolling function
      $parallax.each(function(){
        var el = $(this);
        var yOffset = $(window).scrollTop(),
            parallaxOffset = yOffset * parallaxSpeed,
            parallaxOffset = +parallaxOffset.toFixed(2);
        if(el.hasClass('fs')){
          el.css('transform','translate3d(-50%,-'+(50-parallaxOffset*.15)+'%,0)');
        } else {
          el.css('transform','translate3d(0,'+parallaxOffset+'px,0)');
        }

      });
    }

    // Fix for some browsers with a broken back button
    $(window).on("pageshow", function(event) {
        if (event.originalEvent.persisted) {
            window.location.reload()
        }
    });

    // Start animation
    var startTimeline = new TimelineLite,
        nav = $('.main-nav li'),
        logo = $('.brand img');
    startTimeline.staggerFrom(nav, 0.8, {opacity:0, scale:0, y:20, rotationX:100, transformOrigin:"0% 50% -50",  ease:Power2.easeOut}, 0.05, "+=0");
    startTimeline.from(logo, 0.6, {opacity:0, scale: 0, ease:Power2.easeOut});

    // Set a controller for the elements that need to scroll into view
    var controller = new ScrollMagic.Controller({
          globalSceneOptions: {
              triggerHook: 'onEnter'
          }
        });

    // Use the .fadein class for elements that need to be faded in after scrolled into the viewport
    $('.fadein').each(function(){
        var curItem = this;

        var curTween = new TimelineMax()
            .from(curItem, 2.5, {opacity: 0, ease: Power2.easeOut}, 0.15);

        var scene = new ScrollMagic.Scene({triggerElement: curItem})
            .setTween(curTween)
            .addTo(controller);
    });

    // Fullscreen portfolio functions - as seen on the homepage (Work)
    var fsContainer = $('.fs-portfolio');
    var fsInterval;

    // Smooth transition links
    $body.on('click', 'a[href!="#"][data-toggle!=tab][data-toggle!=collapse][target!=_blank][class!=anchor]', function(e){

      var href = $(this).attr('href');
      startTimeline.reverse(0).timeScale(2);

      if(fsContainer.length){
        clearInterval(fsInterval);
        TweenMax.to(".fs-portfolio", 1, {opacity: 0}, .5);
      }

      var rolloutTween = new TimelineMax()
          .to('.item, .fadein', .5, {opacity: 0, ease: Power2.easeOut,onComplete:nextPage}, .5);

      function nextPage(){
        window.location = href;
      }

      e.preventDefault();
    });

    // Only trigger the fullscreen portfolio function when it's available
    if(fsContainer.length){
      TweenMax.from(".fs-portfolio", 1, {opacity: 0}, 2);
      var curTitle = $('.fs-images li:first-child h1');
      animateFsTitle(curTitle);

      function fsSlide(curItem){
        if(curItem){
          curItem.addClass('active');
          curItem.siblings().removeClass('active');
        }
        else if($body.find('.fs-navigation li.active').next('li').length) {
          $body.find('.fs-navigation li.active').removeClass('active').next('li').addClass('active');
        }
        else {
          $body.find('.fs-navigation li.active').removeClass('active');
          $body.find('.fs-navigation li:first-child').addClass('active');
        }
        var newIndex = $('.fs-navigation li.active').index();
        var newImage = $('.fs-images li:eq('+newIndex+')');
        curTitle = newImage.find('h1');
        newImage.siblings().stop().fadeOut(900).removeClass('active');
        newImage.stop().fadeIn(900).css('display', 'flex').addClass('active');
        animateFsTitle(curTitle);
      }

      fsInterval = setInterval(function(){ fsSlide(false) }, 3000);

      // Animation of the title
      function animateFsTitle(curTitle){
        var fsTitle = new TimelineLite,
            fsTitleSplit = new SplitText(curTitle, {type:"words,chars"}),
            chars = fsTitleSplit.chars; //an array of all the divs that wrap each character

        TweenLite.set(curTitle, {perspective:400});
        fsTitle.staggerFrom(chars, 0.8, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Power2.easeOut}, 0.05, "+=0");
      }

      // Change of image after hovering the title
      $('.fs-navigation li').on('mouseenter',function(){
          fsSlide($(this));
          clearInterval(fsInterval);
      }).on('mouseleave', function(){
        fsInterval = setInterval(function(){ fsSlide(false) }, 3000);
      });
    }

    var titleClass = '.animated-text';

    function animateTitle(){
      if($(titleClass).length){
        var theTitleTL = new TimelineLite,
            theTitleSplit = new SplitText(titleClass, {type:"words,chars"}),
            chars = theTitleSplit.chars; //an array of all the divs that wrap each character

        TweenLite.set(titleClass, {perspective:400});
        theTitleTL.staggerFrom(chars, 0.4, {opacity:0, y:10, transformOrigin:"0% 50% -50",  ease:Power2.easeOut}, 0.01, "+=0");
      }
    }

    animateTitle(titleClass);

    // Set sticky element after load - or it will break
    if($(window).width() > 992 && $('#sticky').length){
      new ScrollMagic.Scene({
          duration: ($('#sticky-holder').height() - $('#sticky').height()),    // the scene should last for a scroll distance of 100px
          offset: $('#sticky').offset().top        // start this scene after scrolling for 50px
      })
      .setPin("#sticky") // pins the element for the the scene's duration
      .addTo(controller); // assign the scene to the controller
    }

    var $grid = $('.grid-images');
    // Masonry grid
    $grid.masonry({
      columnWidth: '.item-sizer',
      percentPosition: true
    });
    $grid.masonry('layout');
  });

  })(jQuery);
