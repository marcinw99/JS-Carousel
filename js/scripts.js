$(function() {
	var carouselList = $('#carousel-list');

	var slideChangeOnTime = setInterval(function() { changeSlides(true); }, 5000);

	$('#carousel #js-prevBtn').on('click', function() {
		clearInterval(slideChangeOnTime);
		changeSlides(false);
		slideChangeOnTime = setInterval(function() { changeSlides(true); }, 5000);
	});
	$('#carousel #js-nextBtn').on('click', function() {
		clearInterval(slideChangeOnTime);
		changeSlides(true);
		slideChangeOnTime = setInterval(function() { changeSlides(true); }, 5000);
	});

	var carouselSize = $('#carousel-list > li').length;
	//for (var i = carouselSize; i > 0; i--) {
		var navMarker = $('<li>');
		$(navMarker).attr('id', 'marker').text('cosik');
		$('#carousel-nav').append(navMarker);
	//}

	function changeSlides(directionNext) {
		if (directionNext) {
			carouselList.animate( { 'marginLeft': -1000 }, 1000, function() {moveFirstSlide(true); } );
		} else {
			carouselList.animate( { 'marginLeft': 1000 }, 1000, function() {moveFirstSlide(false); } );
		}
	}

	function moveFirstSlide(NextSlide) {
		var firstItem = carouselList.find('li:first');
		var lastItem = carouselList.find('li:last');

		if (NextSlide) {
			lastItem.after(firstItem);
			carouselList.css('margin-left', '0');
		} else {
			firstItem.before(lastItem);
			carouselList.css('margin-left', '0');
		}
	}
});