$(function() {
	var CONSTANTS = Object.freeze({
		SLIDE_DELAY: 4000,
		SLIDE_ANIMATION_TIME: 1000,
		RIGHT_DIRECTION: 'right',
		LEFT_DIRECTION: 'left'
	});

	var $carouselList = $('#carousel-list'),
		$carousel = $('#carousel'),
		$slideIndicatorsCarousel = $('#carousel-nav');

	function addIndicatorsToDOM() {
		var liElementsSize = $carouselList.find('li').length;

		for (var i = 0; i < liElementsSize; i++) {
			var $result = $("<li>").data('id', i);
			$slideIndicatorsCarousel.append($result);
		}
	}

	function addDataIdToSlides() {
		$carouselList.find('li').each(function(index, item) {
			$(item).attr('data-id', index);
		});
	}

	addIndicatorsToDOM();
	addDataIdToSlides();

	var slideChangeInterval = setInterval(function() { changeSlide(CONSTANTS.RIGHT_DIRECTION); }, CONSTANTS.SLIDE_DELAY);

	function changeSlide(slideDirection) {
		var activeSlide = $carouselList.find('li.active'),
			indexOfActiveSlide = activeSlide.attr('data-id'),
			indexOfNextSlide = indexOfActiveSlide;

		switch (slideDirection) {
			case CONSTANTS.LEFT_DIRECTION:
				if (indexOfActiveSlide == 0) {
					indexOfNextSlide = $carouselList.find('li').length-1;
				} else {
					indexOfNextSlide--;
				}

				moveLastSlide();
				$carouselList.animate({'marginLeft':0}, CONSTANTS.SLIDE_ANIMATION_TIME, function() { $carouselList.css({marginLeft:0}); });
				break;
			case CONSTANTS.RIGHT_DIRECTION:
				if (indexOfActiveSlide == $carouselList.find('li').length-1) {
					indexOfNextSlide = 0;
				} else {
					indexOfNextSlide++;
				}

				$carouselList.animate({'marginLeft':-1000}, CONSTANTS.SLIDE_ANIMATION_TIME, moveFirstSlide);
				break;
		}

		activeSlide.removeClass('active');
		var addClassToNextSlide = $carouselList.find('li[data-id='+indexOfNextSlide+']');
		addClassToNextSlide.addClass('active');
		$slideIndicatorsCarousel.find('li').removeClass('active').eq(indexOfNextSlide).addClass('active');
	}

	function moveLastSlide() {
		var firstItem = $carouselList.find('li:first');
		var lastItem = $carouselList.find('li:last');

		firstItem.before(lastItem);
		$carouselList.css({marginLeft:-1000});
	}

	function moveFirstSlide() {
		var firstItem = $carouselList.find('li:first');
		var lastItem = $carouselList.find('li:last');

		lastItem.after(firstItem);
		$carouselList.css({marginLeft:0});
	}

	$carousel.hover(
		function() {
			clearInterval(slideChangeInterval);
		}, 
		function() {
			slideChangeInterval = setInterval(function() { changeSlide(CONSTANTS.RIGHT_DIRECTION); }, CONSTANTS.SLIDE_DELAY);
		}
	);

	function toPrevSlide() {
		$('#js-prevBtn').prop('disabled', true);	
		changeSlide(CONSTANTS.LEFT_DIRECTION);
		setTimeout(function() { $('#js-prevBtn').prop('disabled', false); }, CONSTANTS.SLIDE_ANIMATION_TIME);
	}

	function toNextSlide() {
		$('#js-nextBtn').prop('disabled', true);	
		changeSlide(CONSTANTS.RIGHT_DIRECTION);
		setTimeout(function() { $('#js-nextBtn').prop('disabled', false); }, CONSTANTS.SLIDE_ANIMATION_TIME);
	}

	$('#js-prevBtn').on('click', toPrevSlide);

	$('#js-nextBtn').on('click', toNextSlide);

	function addListenersToIndicators() {
		for (var i=0; i <= $carouselList.find('li').length; i++) {
			$(`#carousel-nav li:nth-child(${i})`).on('click', function() {
				var $currentActiveIndex = $slideIndicatorsCarousel.find(".active").data('id'),
					$clickedIndex = $(this).data('id');

				if ($currentActiveIndex != null && $clickedIndex != $currentActiveIndex) {
					var difference = $clickedIndex - $currentActiveIndex;
					var toPrev = false;
					if (difference < 0) { 
						toPrev = true;
						difference *= -1;
					}
					for (var j = 0; j < difference; j++) {
						if (toPrev) {
							toPrevSlide();
						} else {
							toNextSlide();
						}
					}
				}
			});
		}
	}

	addListenersToIndicators();

});