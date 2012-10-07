/**
 * jQuery Unmatched Selectors Plugin
 *
 * @version 1.0.1
 * @author Kai Dorschner <the-kernel32@web.de>
 */
(function ($) {
	"use strict";
	var UnmatchedSelector;
	$.extend($, {
		unmatchedSelectorLogger: function (e) {
			if (!console) return;
			if (console.warn) {
				console.warn(e);
			} else if (console.log) {
				console.log(e);
			}
		}
	});

	if ($) {
		UnmatchedSelector = function (selector, context) {
			this.stack = (new Error()).stack.split('\n');
			this.file = $.trim(this.stack[this.stack.length - 1]);
			this.selector = selector;
			this.context = context;
			this.message = '$("' + this.selector + '"); didn\'t match any content' + (this.context ? ' in context ' + this.context : '') + ' - ' + this.file;
		};
		UnmatchedSelector.prototype = new Error();
		UnmatchedSelector.prototype.constructor = UnmatchedSelector;
		UnmatchedSelector.prototype.name = 'UnmatchedSelector';

		$.fn._init = $.fn.init; // Preserve the original init method
		$.fn.init = function (selector, context, rootQuery) { // overwrite / extend the original init method
			var result = new $.fn._init(selector, context, rootQuery || window.document);
			if (selector !== undefined && !result.length) {
				$.unmatchedSelectorLogger.call(null, new UnmatchedSelector(selector, context));
			}
			return result;
		};
	}
}(jQuery));