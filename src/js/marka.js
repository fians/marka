
;(function(window) {
	'use strict';

    // Blocks needed to create the icon
    var blockList = {

    	/* Circle Icons */
    	'circle': {
    		block: 2
    	},
    	'circle-o': {
    		block: 3,
    		invert: [1]
    	},
    	'circle-o-filled': {
    		block: 3,
    		invert: [1]
    	},

    	'circle-minus': {
    		block: 3,
    		invert: 'last'
    	},
    	'circle-plus': {
    		block: 3,
    		invert: 'last-two'
    	},
    	'circle-times': {
    		block: 3,
    		invert: 'last-two'
    	},

    	'circle-o-minus': {
    		block: 4,
    		invert: [1]
    	},
    	'circle-o-plus': {
    		block: 4,
    		invert: [1]
    	},
    	'circle-o-times': {
    		block: 4,
    		invert: [1]
    	},

    	'square': {
    		block: 2
    	},
    	'square-o': {
    		block: 3,
    		invert: [1]
    	},
    	'square-o-filled': {
    		block: 3,
    		invert: [1]
    	},

    	'square-minus': {
    		block: 3,
    		invert: 'last'
    	},
    	'square-plus': {
    		block: 3,
    		invert: 'last-two'
    	},
    	'square-times': {
    		block: 3,
    		invert: 'last-two'
    	},
    	'square-check': {
    		block: 3,
    		invert: 'last-two'
    	},

    	'square-o-minus': {
    		block: 4,
    		invert: [1]
    	},
    	'square-o-plus': {
    		block: 4,
    		invert: [1]
    	},
    	'square-o-times': {
    		block: 4,
    		invert: [1]
    	},
    	'square-o-check': {
    		block: 4,
    		invert: [1]
    	},

    	'triangle': {
    		block: 3
    	},

    	'asterisk': {
    		block: 3
    	},
    	'minus': {
    		block: 1
    	},
    	'plus': {
    		block: 2
    	},
    	'times': {
    		block: 2
    	},

    	'check': {
    		block: 2
    	},
    	'sort': {
    		block: 6
    	},
    	'sort-half': {
    		block: 3
    	},

    	'signal-three-one': {
    		block: 3
    	},
    	'signal-three-two': {
    		block: 3
    	},
    	'signal-three': {
    		block: 3
    	},
    	'signal-five-one': {
    		block: 5
    	},
    	'signal-five-two': {
    		block: 5
    	},
    	'signal-five-three': {
    		block: 5
    	},
    	'signal-five-four': {
    		block: 5
    	},
    	'signal-five': {
    		block: 5
    	},

    	'pause': {
    		block: 2
    	},

    	'angle': {
    		block: 2
    	},
    	'angle-double': {
    		block: 4
    	},
    	'arrow': {
    		block: 3
    	},
    	'bars': {
    		block: 3
    	},
    	'chevron': {
    		block: 2
    	},
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

    function changeColor(el, color) {

        // Set color
        el.setAttribute('data-color', color);

        // Total block count
        var icon = el.getAttribute('data-icon');
        var blockCount = el.children.length;

        // Check inverted color block position
        var invertedBlock = [];

        if (blockList[icon].hasOwnProperty('invert')) {

            switch (blockList[icon].invert) {
                case 'last':
                    invertedBlock = [(blockCount-1)];
                    break;
                case 'last-two':
                    invertedBlock = [(blockCount-2), (blockCount-1)];
                    break;
                default:
                    invertedBlock = blockList[icon].invert;
            }
        }

        for (var b = 0; b < blockCount; b++) {

            var currentColor = color;

            if (invertedBlock.indexOf(b) !== -1) {
                currentColor = el.getAttribute('data-bg');
            }

            el.children[b].setAttribute('style', 'background-color:'+currentColor);
        }
    }

    function setBackground(el) {

        var parent = el.parentNode, 
            backgroundColor = 'rgba(0, 0, 0, 0)';

        do {
            backgroundColor = window.getComputedStyle(parent).backgroundColor;
            parent = parent.parentNode;
            
            if (backgroundColor !== 'rgba(0, 0, 0, 0)') {
                break;
            }

        } while ('tagName' in parent);

        if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
            backgroundColor = 'rgb(255, 255, 255)';
        }

        el.setAttribute('data-bg', backgroundColor);
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
            setBackground(i);

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
			if (blockList[icon].block > blockCount) {
				for (var a = 0; a < (blockList[icon].block - blockCount); a++) {

					var span = document.createElement('i');

					i.appendChild(span);
				}
			}

            // Change color
            setBackground(i);
            changeColor(i, color);

			// Prevent blink transition
			setTimeout(function() {

				// Change class			
				i.className = i.className.replace('  ', ' ').replace(/marka-icon-[\w-]+/, '');
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
            setBackground(i);
            changeColor(i, color);
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