$(function() {
		var carouselList = $('#carousel ul');

		setInterval(changeSlides, 3000);

	function changeSlides() {
		carouselList.animate( { 'marginLeft': -1000 }, 1000, moveFirstSlide );
	}

	function moveFirstSlide() {
		var firstItem = carouselList.find('li:first');
		var lastItem = carouselList.find('li:last');
		lastItem.after(firstItem);
		carouselList.css('margin-left', '0');
	}
});