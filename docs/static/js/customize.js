
/**
 * Custom marka.css generator
 */

;(function(w, $) {
	'use strict';

	// Define variable
	var choosenIcons = [];
	var version = 'v0.2.0-dev';

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

		// Remove selected
		if (el.hasClass('selected')) {

			var index = choosenIcons.indexOf(type);
			if (index > -1) {
			    choosenIcons.splice(index, 1);
			}
			
			updateIconCount();
			return el.removeClass('selected');
		}

		// Add selected
		choosenIcons.push(type);
		updateIconCount();
		return el.addClass('selected');
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

	function generateCSS() {

		var btn = $(this);
		var loading = $('#custom #generate');

		// Prevent action while generating file
		if (!loading.hasClass('hide')) {
			return false;
		}

		// Disable button and start loading state
		btn.attr('disabled', 'disabled');
		loading.removeClass('hide');

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

		// Minified files if needed
		if (btn.data('type') === 'min') {
			content = YAHOO.compressor.cssmin(content);
		}

		// Convert to data-URI
		var dataURI = 'data:text/css;charset=UTF-8,' + encodeURIComponent(content);

  		// Remove loading state
		btn.removeAttr('disabled');
		loading.addClass('hide');

		// Open in new tab
		var win = window.open(dataURI, '_blank');
  		win.focus();

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
	});

})(window, jQuery);