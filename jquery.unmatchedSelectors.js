/**
 * jQuery Unmatched Selectors Plugin
 *
 * @version 1.0.0
 * @author Kai Dorschner <the-kernel32@web.de>
 * @todo Use an option to enable different logger callbacks like jquery ui badges or something.
 */
(function () {
	"use strict";

	var UnmatchedSelector = function (selector, context) {
		this.stack = (new Error()).stack.split('\n');
		this.message = '$("' + selector + '"); didn\'t match any content' + (context ? ' in context ' + context : '') + ' in ' + $.trim(this.stack[this.stack.length - 1]);
		this.selector = selector;
		this.context = context;
	};
	UnmatchedSelector.prototype = new Error();
	UnmatchedSelector.prototype.constructor = UnmatchedSelector;
	UnmatchedSelector.prototype.name = 'UnmatchedSelector';

	if (window.jQuery) {
		jQuery.fn._init = jQuery.fn.init;
		jQuery.fn.init = function (selector, context) {
			var result = new jQuery.fn._init(selector, context),
				error = null;
			if (selector !== undefined && !result.length) {
				error = new UnmatchedSelector(selector, context);
				if (console.warn) {
					console.warn(error);
				} else if (console.log) {
					console.log(error);
				}
			}
			return result;
		};
	}
}());