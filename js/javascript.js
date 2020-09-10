
$(document).ready(function(){
  
    $('.fixed-action-btn').floatingActionButton();
    $('.tooltipped').tooltip();
    // $('.modal').modal();
    $('.carousel').carousel({
      indicators: true
    });
    $('.slider').slider();
    $('.materialboxed').materialbox();
    $(".dropdown-trigger").dropdown();
   


     
  });

  let menuIcon = document.querySelector('.menuIcon');
  let nav = document.querySelector('.overlay-menu');

  menuIcon.addEventListener('click', () => {
      if (nav.style.transform != 'translateX(0%)') {
          nav.style.transform = 'translateX(0%)';
          nav.style.transition = 'transform 0.2s ease-out';
      } else { 
          nav.style.transform = 'translateX(-100%)';
          nav.style.transition = 'transform 0.2s ease-out';
      }
  });


  // Toggle Menu Icon ========================================
  let toggleIcon = document.querySelector('.menuIcon');

  toggleIcon.addEventListener('click', () => {
      if (toggleIcon.className != 'menuIcon toggle') {
          toggleIcon.className += ' toggle';
      } else {
          toggleIcon.className = 'menuIcon';
      }
  });

  $('.tile')
    // tile mouse actions
    .on('mouseover', function(){
      $(this).children('.photo').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
    })
    .on('mouseout', function(){
      $(this).children('.photo').css({'transform': 'scale(1)'});
    })
    .on('mousemove', function(e){
      $(this).children('.photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
    })
    // tiles set up
    .each(function(){
      $(this)
        // add a photo container
        .append('<div class="photo"></div>')
        // some text just to show zoom level on current item in this example
        .append('<div class="txt"><div class="x">'+ $(this).attr('data-scale') +'x</div>ZOOM ON<br>HOVER</div>')
        // set up a background image for each tile based on data-image attribute
        .children('.photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
    })



    var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function slideTimer(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" dotty", "");
    }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " dotty";
}

function slideshow() {
  window.setInterval("plusSlides(1)", 10000);
};

$(document).ready(slideshow);

