/* Initialise FlexSlider for Carousels

$(window).load(function() {
    $('.flexslider').flexslider({
    animation: "fade",
    controlNav: false,
    directionNav: true,
    slideshowSpeed: 5000,
    animationSpeed: 600,
    touch: true
    });
});

*/


document.addEventListener( 'DOMContentLoaded', function () {
    new Splide( '.splide', {
        'cover'      : true,
        'heightRatio': 0.5,
        video: {
            autoplay: true,
            mute    : true,
        },
    } ).mount(window.splide.Extensions);
});


