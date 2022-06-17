(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
})(jQuery);

/* PARALLAX */

const scene = $('#scene').get(0);
const parallaxInstance = new Parallax(scene);

/* TABS */

$('.nav-item').on('click',function(){
  let currTab = $(this).index();

  $('.nav-item').removeClass('active');
  $(this).addClass('active');

  $('.tab-pane').removeClass('show active');
  $('.tab-pane').eq(currTab).addClass('show active');
});

/* HAMBURGER */

$('.slicknav_btn').on('click',function(){
  $('.main-menu').removeClass('d-none f-right');
  $('.menu-main').removeClass('justify-content-end');
  $('.menu-main').addClass('justify-content-center');
  $('.main').removeClass('d-none');
  $('.main').toggle();
})

/* slider */

const swiper = new Swiper('.swiper', {
  speed: 400,
  slidesPerView: 1,
  spaceBetween: 200,
  loop: true,
  autoplay: {
    delay: 3000
  }
});

/* Modal */

$('#modal-btn-open').click( function() { 
  $('#wrapper-modal').addClass('active');
});

$('#modal-overlay').click( function() { 
  $('#wrapper-modal').removeClass('active');
});

/* Validate */

$(document).ready(function() {
  $('[data-submit]').on('click', function(e) {
    e.preventDefault();
    $(this).parent('form').submit();
  });
  
  function valEl(el) {
    el.validate({
      rules: {
        name: {
            required: true,
        },
        email: {
          required: true,
          email: true,
        },
        phone: {
            digits : true,
            required: true,
        }
      },
      messages: {
        name: {
          required: 'Заполните поле',
        },
        email: {
          required: 'Заполните поле',
          email: 'Неверный формат почты'
        },
        phone: {
          required: 'Заполните поле',
          digits: 'Неверный формат телефона'
        }
      },
      
      submitHandler: function(form) {
        const $form = $(form);
        const $formId = $(form).attr('id');
        switch ($formId) {
          case 'modal-form' : 
            $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
              .always(function() {
                $('#preloader-active').fadeIn();
                setTimeout(function() {
                  $form.trigger('reset');
                  $('#wrapper-modal').removeClass('active');
                  $('#preloader-active').fadeOut();
                }, 1500);
              });
            break;
            case 'form-book' : 
            $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
              .always(function() {
                $('#preloader-active').fadeIn();
                setTimeout(function() {
                  $form.trigger('reset');
                  $('#preloader-active').fadeOut();
                }, 1500);
              });
            break; 
        }
        return false;
      },
    });
  }
  $('form').each(function () {
    valEl($(this));
  })
})