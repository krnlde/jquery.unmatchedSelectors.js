/**
 * jQuery Unmatched Selectors Plugin
 *
 * @version 1.0.0
 * @author Kai Dorschner <the-kernel32@web.de>
 * @todo Use an option to enable different logger callbacks like jquery ui badges or something.
 */
(function ($) {
	"use strict";
	var UnmatchedSelector;
	if ($) {
		UnmatchedSelector = function (selector, context) {
			this.stack = (new Error()).stack.split('\n');
			this.message = '$("' + selector + '"); didn\'t match any content' + (context ? ' in context ' + context : '') + ' - ' + $.trim(this.stack[this.stack.length - 1]);
			this.selector = selector;
			this.context = context;
		};
		UnmatchedSelector.prototype = new Error();
		UnmatchedSelector.prototype.constructor = UnmatchedSelector;
		UnmatchedSelector.prototype.name = 'UnmatchedSelector';

		$.fn._init = $.fn.init;
		$.fn.init = function (selector, context) {
			var result = new $.fn._init(selector, context),
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
}(jQuery));