
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

    // Styles
    var styles = {

    	// Core style
    	'.marka': {
    		'position': 'relative',
    		'display': 'inline-block',
    		'vertical-align': 'bottom',
    		'transition': 'all 500ms'
    	},

    	'.marka span': {
    		'position': 'absolute',
    		'display': 'block',
    		'width': '100%',
    		'height': '100%',
    		'background': '#000000',
    		'transition': 'all 500ms'
    	},

    	// Rotation
    	'.marka.marka-rotate-right': {
    		'transform': 'rotate(90deg)'
    	},

    	'.marka.marka-rotate-left': {
    		'transform': 'rotate(-90deg)'
    	},

    	'.marka.marka-rotate-down': {
    		'transform': 'rotate(180deg)'
    	},

    	// Basic Shape
    	'.marka.marka-icon-circle span': {
    		'transform': 'scale(0.8)',
  			'border-radius': '50%'
    	},

		'.marka.marka-icon-square span': {
		  'transform': 'scale(0.8)',
		  'border-radius': '10%'
		},

		'.marka.marka-icon-triangle span': {
			'border-radius': '0% 30% 0 30%',
		    'transform': 'rotate(-60deg) skewX(-30deg) scale(0.5,.433) translate(2%, -5%)'
		},

		'.marka.marka-icon-triangle span:nth-child(2)': {
		    'transform': 'rotate(-0deg) skewX(-30deg) scale(0.5) translate(-5%, 30%)'
		},

		'.marka.marka-icon-triangle span:nth-child(3)': {
		    'transform': 'rotate(90deg) skewY(-30deg) scale(0.5) translate(30%, -2%)'
		},

    	// Math
    	'.marka.marka-icon-minus span': {
		  	'transform': 'scale(0.8, 0.2)'
		},

		'.marka.marka-icon-plus span': {
		  	'transform': 'scale(0.8, 0.2)'
		},

		'.marka.marka-icon-plus span:nth-child(2)': {
		  	'transform': 'rotate(90deg) scale(0.8, 0.2)'
		},

		'.marka.marka-icon-times span': {
		  	'transform': 'rotate(45deg) scale(0.8, 0.2)'
		},

		'.marka.marka-icon-times span:nth-child(2)': {
		  	'transform': 'rotate(-45deg) scale(0.8, 0.2)'
		},

		'.marka.marka-icon-asterisk span': {
		  	'transform': 'rotate(90deg) scale(0.8, 0.2)'
		},

		'.marka.marka-icon-asterisk span:nth-child(2)': {
		  	'transform': 'rotate(-30deg) scale(0.8, 0.2) translate(0%, 0%)'
		},

		'.marka.marka-icon-asterisk span:nth-child(3)': {
		  	'transform': 'rotate(30deg) scale(0.8, 0.2) translate(0%, 0%)'
		},

    	// Bars
    	'.marka.marka-icon-two-bars span': {
  			'transform': 'scale(0.8, 0.35) translate(0%, 65%)'
		},

		'.marka.marka-icon-two-bars span:nth-child(2)': {
  			'transform': 'scale(0.8, 0.35) translate(0%, -65%)'
		},

		'.marka.marka-icon-three-bars span': {
		  	'transform': 'scale(0.8, 0.2)'
		},

		'.marka.marka-icon-three-bars span:nth-child(2)': {
		  	'transform': 'scale(0.8, 0.2) translate(0%, -140%)'
		},

		'.marka.marka-icon-three-bars span:nth-child(3)': {
		  	'transform': 'scale(0.8, 0.2) translate(0%, 140%)'
		},

    	// Navigation
		'.marka.marka-icon-chevron span': {
		  	'transform': 'rotate(45deg) scale(0.6, 0.2) translate(17%, -50%)'
		},

		'.marka.marka-icon-chevron span:nth-child(2)': {
		  	'transform': 'rotate(134deg) scale(0.6, 0.2) translate(17%, 50%)'
		},

		/* Arrow */
		'.marka.marka-icon-arrow span': {
		  	'transform': 'rotate(45deg) scale(0.55, 0.2) translate(0%, -90%)'
		},

		'.marka.marka-icon-arrow span:nth-child(2)': {
		  	'transform': 'rotate(134deg) scale(0.55, 0.2) translate(0%, 90%)'
		},

		'.marka.marka-icon-arrow span:nth-child(3)': {
		  	'transform': 'rotate(90deg) scale(0.6, 0.2) translate(17%, 0%)'
		}

    };

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

    function appendStyle(css) {

	    var head = document.head || document.getElementsByTagName('head')[0],
		    style = document.createElement('style');

		style.type = 'text/css';

		if (style.styleSheet){
		  	style.styleSheet.cssText = css;
		} else {
		  	style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
	}

	function convertStyle(obj) {

		var str = '';

		for (var a in obj) {
			if (obj.hasOwnProperty(a)) {
				str += a + ' {';

				for (var b in obj[a]) {
					if (obj[a].hasOwnProperty(b)) {

						// Add vendor prefix
						if (b === 'transition' || b === 'transform') {
							str += '-webkit-' + b + ':' + obj[a][b] + ';';
							str += '-moz-' + b + ':' + obj[a][b] + ';';
							str += '-ms-' + b + ':' + obj[a][b] + ';';
							str += '-o-' + b + ':' + obj[a][b] + ';';
							str += b + ':' + obj[a][b] + ';';
						} else {
							str += b + ':' + obj[a][b] + ';';
						}
						
					}
				}

				str += '} ';
			}
		}

		return str;
	}

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

	appendStyle(convertStyle(styles));
	window.Marka = Marka;

})(window);