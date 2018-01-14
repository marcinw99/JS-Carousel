$(function() {
	var CONSTANTS = Object.freeze({
		SLIDE_DELAY: 2000,
		SLIDE_ANIMATION_TIME: 1000,
		LEFT_DIRECTION: 'left',
		RIGHT_DIRECTION: 'right'
	});

	var carouselList = $('#carousel-list'),
		$carousel = $('#carousel'),
		$dotsCarousel = $('#carousel-nav');

	var slideChangeOnTime = setInterval(function() { changeSlides(CONSTANTS.RIGHT_DIRECTION); }, CONSTANTS.SLIDE_DELAY);

	$('#js-prevBtn').on('click', function() {		
		changeSlides(CONSTANTS.LEFT_DIRECTION);
	});

	$('#js-nextBtn').on('click', function() {
		changeSlides(CONSTANTS.RIGHT_DIRECTION);
	});

	function changeSlides(directionNext) {
		var activeElement = carouselList.find('li.active'),
			activeIndex = +activeElement.attr('data-id'),
			nextIndex = activeIndex;

		carouselList.find('li').removeClass('active');

		switch (directionNext) {
			case CONSTANTS.LEFT_DIRECTION:				
				if (activeIndex === 0) {
					nextIndex = carouselList.find('li').length - 1;
				} else {
					nextIndex--;
				}

				moveLastSlide();
				carouselList.animate( { 'marginLeft': 0 }, CONSTANTS.SLIDE_ANIMATION_TIME);
				break;
			case CONSTANTS.RIGHT_DIRECTION:	
				if ((activeIndex + 1) === carouselList.find('li').length) {
					nextIndex = 0;
				} else {
					nextIndex++;
				}

				carouselList.animate( { 'marginLeft': -1000 }, CONSTANTS.SLIDE_ANIMATION_TIME, function() {moveFirstSlide(); } );
				break;
		}	
		
		carouselList.find('li').eq(nextIndex).addClass('active');
		$dotsCarousel.find('li').removeClass('active').eq(nextIndex).addClass('active');
	}

	function moveFirstSlide() {
		var firstItem = carouselList.find('li:first');
		var lastItem = carouselList.find('li:last');

		lastItem.after(firstItem);
		carouselList.css('margin-left', '0');	
	}

	function moveLastSlide() {
		var firstItem = carouselList.find('li:first');
		var lastItem = carouselList.find('li:last');

		firstItem.before(lastItem);
		carouselList.css('margin-left', -1000)
	}

	function generateDots() {
		var result = '', 
			liElementsSize = carouselList.find('li').length;

		for (var i = 0; i < liElementsSize; i++) {
			result += '<li></li>';
		}

		return $(result);
	}

	function createDots() {
		var $dots = generateDots();

		$dotsCarousel.append($dots);
	}

	function addDataIdToSlides() {
		carouselList.find('li').each(function(index, item) {
			$(item).attr('data-id', index)
		});
	}

	$carousel.hover(
		function() {
			clearInterval(slideChangeOnTime);
		},
		function() {
			slideChangeOnTime = setInterval(function() { changeSlides(CONSTANTS.RIGHT_DIRECTION); }, CONSTANTS.SLIDE_DELAY);
		}
	);

	createDots();
	addDataIdToSlides();
});