
/*!
 * Marka v0.1.0
 * https://fian.my.id/marka
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/marka/blob/master/LICENSE
 */

;(function(window) {
	'use strict';

    // Blocks needed to create the icon
    var blockList = {
    	'circle': 1,
    	'square': 1,
    	'triangle': 3,
    	'minus': 1,
    	'plus': 2,
    	'times': 1,
    	'asterisk': 3,
    	'two-bars': 2,
    	'three-bars': 3,
    	'chevron': 2,
    	'arrow': 3
    };

    function apply(el, callback) {
    	return Array.prototype.forEach.call(el, callback);
    }

	function Marka(el) {

		if (typeof el === 'string') {
			this.elements = document.querySelectorAll(el);
		}

		if (el instanceof Object) {
			this.elements = [el];
		}

		this.colorValue = '#000000';
		this.sizeValue = 14;

		apply(this.elements, function(i) {
			if (i.className.indexOf('marka') === -1) {
				i.className += ' marka ';
			}
		});

		return this;

	}

	Marka.prototype.set = function(icon) {

		var el = this;

		apply(this.elements, function(i) {

			// Change class			
			i.className = i.className.replace('  ', ' ').replace(/marka-icon-[\w]+/, '');
			i.className += 'marka-icon-'+icon+' ';
			i.setAttribute('style', 'width:'+el.sizeValue+'px;height:'+el.sizeValue+'px;');

			// Append span blocks
			if (blockList[icon] > i.childNodes.length) {
				for (var a = 0; a < (blockList[icon] - i.childNodes.length + 2); a++) {
					var span = document.createElement('span');
					span.setAttribute('style', 'background-color:'+el.colorValue);
					i.appendChild(span);
				}
			}

		});

		return this;
	};

	Marka.prototype.color = function(color) {

		this.colorValue = color;

		apply(this.elements, function(i) {
			for (var a = 0; a < i.childNodes.length; a++) {
				i.childNodes[a].setAttribute('style', 'background-color:'+color);
			}
		});	

		return this;
	};

	Marka.prototype.size = function(size) {

		this.sizeValue = size;

		apply(this.elements, function(i) {
			i.setAttribute('style', 'width:'+size+'px;height:'+size+'px;');
		});	

		return this;
	};

	Marka.prototype.rotate = function(direction) {

		apply(this.elements, function(i) {
			i.className = i.className.replace('  ', ' ').replace(/marka-rotate-[\w]+/, '');
			i.className += 'marka-rotate-'+direction+' ';
		});	

		return this;
	};

	window.Marka = Marka;

})(window);