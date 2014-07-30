
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
    	'pause',
    	'bars',
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
		markaValue.color = '#FF6600';

		marka = new Marka('#icon');
		marka.set(markaValue.set).color(markaValue.color);
		generateCode();

		// Set navigation icon
		var prev = new Marka('#prevIcon');
		prev.set('triangle').rotate('left');
		var next = new Marka('#nextIcon');
		next.set('triangle').rotate('right');
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

	function rotateIcon() {

		var currPos = markaRotate.indexOf($('#icon').data('rotate'));
		var newPos = 0;

		newPos = currPos + 1;
		if (newPos > (markaRotate.length - 1)) {
			newPos = 0;
		}

		var direction = markaRotate[newPos];
		markaValue.rotate = direction;

		marka.rotate(direction);
		$('#icon').data('rotate', direction);

		generateCode();
	}

	function initIconList() {

		$('.iconList .icons').each(function(i, el) {
			var m = new Marka(el);
			m.set($(el).data('type'));
		});
	}

	function rotateIconList() {
		var currPos = markaRotate.indexOf($(this).data('rotate'));
		var newPos = 0;

		newPos = currPos + 1;
		if (newPos > (markaRotate.length - 1)) {
			newPos = 0;
		}

		var direction = markaRotate[newPos];
		console.log(direction);
		var m = new Marka(this);
		m.rotate(direction);
		$(this).data('rotate', direction);
	}


	$(document).on('ready', function() {

		// Init preview
		if ($('#preview').length) {
			initLanding();
		}

		// Init icon list
		if ($('.iconList').length) {
			initIconList();
			$('.iconList .icons').on('click', rotateIconList);
		}

		$('#prevIcon').on('click', function() {
			return navIcon('prev');
		});
		$('#nextIcon').on('click', function() {
			return navIcon('next');
		});
		$('#icon').on('click', rotateIcon);

	});

})(window, jQuery);