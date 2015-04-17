$(document).ready(function() {

	$('.wrapper').click(function() {
		$(this).children('.details-container').slideToggle({duration: 400});
		/*$('html, body').animate({
      scrollTop: $('.details-container').offset().top + $('window').height()
    }, 800);*/
	});

});