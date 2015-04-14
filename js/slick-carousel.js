$(document).ready(function() {
    $('.masthead-slider-navigation>.masthead-slider').slick({
    dots: false,
    autoplay: true,    
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,    
  });
    $('.masthead-slider-full-width>.masthead-slider').slick({
    dots: true,
    autoplay: true,    
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,    
  });
  $('.feat-academy-events').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  responsive: [
	 {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
	    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  });
  $('.social-media-box').slick({
    slidesToShow: 1,
    slidesToScroll: 1,    
    autoplay: true,    
    autoplaySpeed: 10000,
    speed: 400,
  
  });
   $('.text-slicker-box').slick({
    dots: false,
    autoplay: true,    
    autoplaySpeed: 10000,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,    
  });
     $('.navy-images').slick({
    dots: true,
    autoplay: true,    
    autoplaySpeed: 10000,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
	arrows: false,    
  });  
});