
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

	function initPreview() {

		marka = new Marka('#icon');
		marka.set(markaValue.set).size(50);
		resetPosition();
		generateCode();

		$('.icons').each(function(i, el) {
			var m = new Marka(el);
			m.set($(el).data('type')).size(25);
		});
	}

	function resetPosition() {
		$('#icon').css({
			'margin-top': '-'+(markaValue.size/2)+'px', 
			'margin-left': '-'+(markaValue.size/2)+'px'
		});
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

	function updateSet() {
		markaValue.set = $(this).val();
		marka.set(markaValue.set);
		resetPosition();
		generateCode();
	}

	function updateColor() {

		markaValue.color = $(this).val();
		marka.color(markaValue.color);
		resetPosition();
		generateCode();
	}

	function updateSize() {

		markaValue.size = $(this).val();
		marka.size(markaValue.size);
		resetPosition();
		generateCode();
	}

	function updateRotation() {

		markaValue.rotate = $(this).val();

		if (marka.rotate.length > 0) {
			marka.rotate(markaValue.rotate);
			resetPosition();
		}
		
		generateCode();
	}

	$(document).on('ready', function() {

		// Init preview
		initPreview();

		$('#setForm').on('change', updateSet);
		$('#colorForm').on('change', updateColor);
		$('#sizeForm').on('change', updateSize);
		$('#rotateForm').on('change', updateRotation);

	});

})(window, jQuery);