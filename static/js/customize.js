
/**
 * Custom marka.css generator
 */

;(function(w, $) {
	'use strict';

	// Define variable
	var choosenIcons = [];
	var version = 'v0.3.1';

	// Make sure ajax request is not cached
	$.ajaxSetup({ cache: false });

	function updateIconCount() {
		var total = choosenIcons.length;

		var text = total + ' icons';

		if (total == 1) {
			text = total + ' icon';
		}

		if (total == 0) {
			text = 'No icon';
		}

		$('#iconsCount').text(text);
	}

	function toggleIcon() {

		var el = $(this);
		var type = el.data('type');
		var m = new Marka($(this).find('i')[0]);

		// Remove selected
		if (el.hasClass('selected')) {

			var index = choosenIcons.indexOf(type);
			if (index > -1) {
			    choosenIcons.splice(index, 1);
			}
			
			updateIconCount();
			el.removeClass('selected');
			return m.color('#000');

		}

		// Add selected
		choosenIcons.push(type);
		updateIconCount();
		el.addClass('selected');
		return m.color('#fff');
		
	}

	function getHeader() {
		return  '/*! Generated at '+Date()
				+ '. Included icons: '+choosenIcons.join(', ')+' */\n'
				+ '/*! \n' 
                +' * Marka - '+version+' \n' 
                +' * http://fian.my.id/marka \n' 
                +' * \n' 
                +' * Copyright 2014 Alfiana E. Sibuea and other contributors \n' 
                +' * Released under the MIT license \n' 
                +' * https://github.com/fians/marka/blob/master/LICENSE \n' 
                +' */ \n';
	}

	/**
	 * Generate customize download
	 */
	function download() {

		var btn = $(this);
		var loading = $('#custom #generate');

		// Prevent action while generating file
		if (!loading.hasClass('hide')) {
			return false;
		}

		// Set header and core css
		var core = $.ajax({
			type: 'GET',
			url: './static/marka/css/src/marka-core.css',
			async: false
		}).responseText + '\n';

		var content = getHeader() + core;

		// Get other css icon
		for (var a = 0; a < choosenIcons.length; a++) {
			content += $.ajax({
				type: 'GET',
				url: './static/marka/css/src/icons/icon-'+choosenIcons[a]+'.css',
				async: false
			}).responseText + '\n';
		}

		var minified = YAHOO.compressor.cssmin(content);

		$('#compilePopup textarea.normal').text(content);
		$('#compilePopup textarea.minified').text(minified);
		$('#compilePopup').removeClass('hide');
	}

	/**
	 * Choose custom compilation
	 */
	function chooseCustom() {
		$('#compilePopup textarea').addClass('hide');
		$('#compilePopup .choose').removeClass('selected');

		$('#compilePopup textarea.'+$(this).data('type'))
			.removeClass('hide');

		$(this).addClass('selected');
	}

	/**
	 * Close popup
	 */
	function closePopup() {
		$('#compilePopup').addClass('hide');
	}

	$(document).on('ready', function() {

		// Init icon
		$('.iconList .icons').each(function(i, el) {
			var m = new Marka(el);
			m.set($(el).parent().data('type'));
		});

		// Toggle selected icon
		$('.iconList .item').on('click', toggleIcon);

		// Generate file
		$('.generateCSS').on('click', generateCSS);

		$('#download').on('click', download);
		$('#compilePopup .choose').on('click', chooseCustom);
		$('#compilePopup .wrapper').on('click', closePopup);
		$('#compilePopup .close').on('click', closePopup);
	});

})(window, jQuery);