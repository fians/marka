
;(function(window) {
	'use strict';

    // Blocks needed to create the icon
    var blockList = {

    	'circle': 2,
    	'circle-o': 3,
    	'circle-o-filled': 3,

    	'square': 1,
    	'triangle': 3,

    	'asterisk': 3,
    	'minus': 1,
    	'plus': 2,
    	'times': 2,

    	'check': 2,
    	'sort': 6,
    	'sort-half': 3,

    	'signal-three-one': 3,
    	'signal-three-two': 3,
    	'signal-three': 3,
    	'signal-five-one': 5,
    	'signal-five-two': 5,
    	'signal-five-three': 5,
    	'signal-five-four': 5,
    	'signal-five': 5,

    	'pause': 2,

    	'angle': 2,
    	'angle-double': 4,
    	'arrow': 3,
    	'bars': 3,
    	'chevron': 2
    };

    var invertedIndex = {
    	'circle-o': 1,
    	'circle-o-filled': 1,
    };

    function applyFunc(el, callback) {
    	return Array.prototype.forEach.call(el, callback);
    }

    function isElement(o){
		return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
			o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
		);
	}

	function Marka(el) {
		
		this.elements = [];

		if (typeof el === 'string') {
			this.elements = document.querySelectorAll(el);
		}

		if (isElement(el)) {
			this.elements.push(el);
		}

		if (el instanceof Array) {

			for (var a = 0; a < el.length; a++) {
				if (isElement(el[a])) {
					this.elements.push(el[a]);
				}
			}
		}

		if (!this.elements.length) {
			throw Error('No element is selected.');
		}

		applyFunc(this.elements, function(i) {

			// Set background color
			var parent = i.parentNode, 
				backgroundColor = 'rgba(0, 0, 0, 0)';

			do {
				backgroundColor = window.getComputedStyle(parent)['background-color'];
				parent = parent.parentNode;
				if (backgroundColor !== 'rgba(0, 0, 0, 0)') {
					break;
				}

			} while ('tagName' in parent);

			if (backgroundColor === 'rgba(0, 0, 0, 0)') {
				backgroundColor = 'rgb(255, 255, 255)';
			}

			i.setAttribute('data-bg', backgroundColor);

			if (i.className.indexOf('marka') === -1) {
				i.className += ' marka ';
			}
		});

		return this;

	}

	Marka.prototype.set = function(icon) {

		var el = this;

		applyFunc(this.elements, function(i) {

			// Set icon name
			i.setAttribute('data-icon', icon);

			// Get data-color
			var color = i.getAttribute('data-color');

			if (!color) {
				color = 'rgb(0, 0, 0)';
				i.setAttribute('data-color', color);
			}

			var blockCount = i.children.length;

			// Append blocks
			if (blockList[icon] > blockCount) {
				for (var a = 0; a < (blockList[icon] - blockCount); a++) {

					var span = document.createElement('i');

					i.appendChild(span);
				}
			}

			// Reset total block count
			blockCount = i.children.length;

			// Check inverted color block position
			var invertedBlock = [];

			if (invertedIndex.hasOwnProperty(icon)) {
				if (invertedIndex[icon] === 'last') {
					invertedBlock.push((blockCount-1));
				} else {
					invertedBlock.push(invertedIndex[icon]);
				}
			}

			for (var b = 0; b < blockCount; b++) {

				var currentColor = color;

				if (invertedBlock.indexOf(b) !== -1) {
					currentColor = i.getAttribute('data-bg');
				}

				i.children[b].setAttribute('style', 'background-color:'+currentColor);
			}

			// Prevent blink transition
			setTimeout(function() {

				// Change class			
				i.className = i.className.replace('  ', ' ').replace(/marka-icon-[\w]+/, '');
				i.className += 'marka-icon-'+icon+' ';

				if ('sizeValue' in el) {
					i.setAttribute('style', 'width:'+el.sizeValue+'px;height:'+el.sizeValue+'px;');
				}

				// Show icon if it's not shown
				if (i.className.indexOf('marka-set') === -1) {
					setTimeout(function() {
						i.className += 'marka-set ';
					}, 200);
				}

			}, 10);

		});

		return this;
	};

	Marka.prototype.color = function(color) {

		applyFunc(this.elements, function(i) {

			i.setAttribute('data-color', color);

			for (var a = 0; a < i.children.length; a++) {
				i.children[a].setAttribute('style', 'background-color:'+color);
			}
		});	

		return this;
	};

	Marka.prototype.size = function(size) {

		this.sizeValue = size;

		applyFunc(this.elements, function(i) {
			i.setAttribute('style', 'width:'+size+'px;height:'+size+'px;');
		});	

		return this;
	};

	Marka.prototype.rotate = function(direction) {

		applyFunc(this.elements, function(i) {
			i.className = i.className.replace('  ', ' ').replace(/marka-rotate-[\w]+/, '');
			i.className += 'marka-rotate-'+direction+' ';
		});	

		return this;
	};

	window.Marka = Marka;

})(window);