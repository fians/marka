
;(function(window) {
	'use strict';

    // Blocks needed to create the icon
    var blockList = {

    	'circle': 1,
    	'square': 1,
    	'triangle': 3,

    	'minus': 1,
    	'times': 1,
    	'plus': 2,
    	'asterisk': 3,

    	'sort': 6,
    	'sort-half': 3,

    	'pause': 2,
    	'chevron': 2,
    	'bars': 3,
    	'arrow': 3
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
			if (i.className.indexOf('marka') === -1) {
				i.className += ' marka ';
			}
		});

		return this;

	}

	Marka.prototype.set = function(icon) {

		var el = this;

		applyFunc(this.elements, function(i) {

			// Change class			
			i.className = i.className.replace('  ', ' ').replace(/marka-icon-[\w]+/, '');
			i.className += 'marka-icon-'+icon+' ';

			if ('sizeValue' in el) {
				i.setAttribute('style', 'width:'+el.sizeValue+'px;height:'+el.sizeValue+'px;');
			}

			var blockCount = i.childNodes.length;

			// Append blocks
			if (blockList[icon] > blockCount) {
				for (var a = 0; a < (blockList[icon] - blockCount); a++) {
					var span = document.createElement('i');
					if ('colorValue' in el) {
						span.setAttribute('style', 'background-color:'+el.colorValue);
					}
					i.appendChild(span);
				}
			}

		});

		return this;
	};

	Marka.prototype.color = function(color) {

		this.colorValue = color;

		applyFunc(this.elements, function(i) {
			for (var a = 0; a < i.childNodes.length; a++) {
				i.childNodes[a].setAttribute('style', 'background-color:'+color);
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