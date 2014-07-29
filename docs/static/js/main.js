
/**
 * Main documentation
 */

;(function(window, $) {
	'use strict';

	var marka;
	var markaValue = {
		set: 'circle',
		color: null,
		size: 50,
		rotate: '',
	};

	var markaSet = [
		'circle',
    	'square',
    	'triangle',
    	'minus',
    	'plus',
    	'times',
    	'asterisk',
    	'two-bars',
    	'three-bars',
    	'chevron',
    	'arrow'
	];

	var markaRotate = [
		'up',
		'right',
		'down',
		'left'
	];

	function initLanding() {

		// Set primary icon for landing page
		markaValue.size = 250;
		markaValue.color = '#FF6600';

		marka = new Marka('#icon');
		marka.set(markaValue.set).size(markaValue.size).color(markaValue.color);
		generateCode();

		// Set navigation icon
		var prev = new Marka('#prevIcon');
		prev.set('triangle').size(40).rotate('left');
		var next = new Marka('#nextIcon');
		next.set('triangle').size(40).rotate('right');
	}

	function generateCode() {

		var str = 'm.set(<span class="string">\''+markaValue.set+'\'</span>)';
		
		if (markaValue.color) {
			str += '.color(<span class="string">\''+markaValue.color+'\'</span>)';
		}

		if (markaValue.size) {
			str += '.size(<span class="string">\''+markaValue.size+'\'</span>)';
		}

		if (markaValue.rotate) {
			str += '.rotate(<span class="string">\''+markaValue.rotate+'\'</span>)';
		}

		str += ';';

		$('#code .line')
			.empty()
			.append(str);
	}

	function navIcon(type) {

		var currPos = markaSet.indexOf($('#icon').data('icon'));
		var newPos = 0;

		if (type === 'prev') {
			newPos = currPos - 1;
			if (newPos < 0) {
				newPos = markaSet.length - 1;
			}
		} 

		if (type === 'next') {
			newPos = currPos + 1;
			if (newPos > (markaSet.length - 1)) {
				newPos = 0;
			}
		}

		var set = markaSet[newPos];
		markaValue.set = set;

		marka.set(set);
		$('#icon').data('icon', set);

		generateCode();
	}


	$(document).on('ready', function() {

		// Init preview
		if ($('#landing')) {
			initLanding();
		}

		$('#prevIcon').on('click', function() {
			return navIcon('prev');
		});
		$('#nextIcon').on('click', function() {
			return navIcon('next');
		});

		$('#setForm').on('change', updateSet);
		$('#colorForm').on('change', updateColor);
		$('#sizeForm').on('change', updateSize);
		$('#rotateForm').on('change', updateRotation);

	});

})(window, jQuery);