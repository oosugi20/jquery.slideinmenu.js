;(function ($, window, undefiend) {
'use script';

var MODULE_NAME = 'Slideinmenu';
var PLUGIN_NAME = 'slideinmenu';
var Module;


/**
 * Module
 */
Module = function (element, options) {
	this.el = element;
	this.$el = $(element);
	this.options = $.extend({
	}, options);
};

(function (fn) {
	/**
	 * init
	 */
	fn.init = function () {
		this._prepareElms();
		this._eventify();

		this.$content.hide();
	};

	/**
	 * _prepareElms
	 */
	fn._prepareElms = function () {
		this.$page = this.$el.find('[data-slideinmenu-page]');
		this.$content = this.$el.find('[data-slideinmenu-content]');
	};

	/**
	 * _eventify
	 */
	fn._eventify = function () {
		var _this = this;

		this.$el.on('click', '[data-slideinmenu-nav]', function (e) {
			var content_name = $(this).attr('data-slideinmenu-nav');
			_this.moveContentTo(content_name);
			_this.movePageTo(_this._getPageIndex(content_name));
			e.preventDefault();
		});

		this.$el.on('click', '[data-slideinmenu-back]', function (e) {
			var current = _this.$el.attr('data-slideinmenu-currentpage');
			_this.movePageTo(current - 1);
			e.preventDefault();
		});
	};


	/**
	 * moveContentTo
	 * @param {String} content_name
	 */
	fn.moveContentTo = function (content_name) {
		var $target = this._getContent(content_name);
		this.$content.hide();
		$target.show();
	};


	/**
	 * movePageTo
	 * @param {Number} target_page_index
	 */
	fn.movePageTo = function (target_page_index) {
		var current_page = this.$el.attr('data-slideinmenu-currentpage') || 0;
		var context = (current_page < target_page_index) ? 'forward' : 'back';

		this._animate(context, target_page_index);

		this.$el.attr('data-slideinmenu-currentpage', target_page_index);
	};

	/**
	 * _animate
	 * @param {String} context 'forward' | 'back'
	 */
	fn._animate = function (context, target_page_index) {
		switch (context) {
			case 'forward':
				this._animateForward(target_page_index);
				break;
			case 'back':
				this._animateBack(target_page_index);
				break;
		}
	};

	/**
	 * _animateForward
	 */
	fn._animateForward = function (target_page_index) {
		var $target = this.$page.filter('[data-slideinmenu-page="' + target_page_index + '"]');

		this.$el.height($target.innerHeight());

		$target.animate({
			left: 0
		}, {
		});
	};

	/**
	 * _animateBack
	 */
	fn._animateBack = function (target_page_index) {
		var current_page = this.$el.attr('data-slideinmenu-currentpage');
		var $current = this.$page.filter('[data-slideinmenu-page="' + current_page + '"]');
		var $target = this.$page.filter('[data-slideinmenu-page="' + target_page_index + '"]');

		this.$el.animate({
			height: $target.innerHeight()
		}, {
		});

		$current.animate({
			left: '100%'
		}, {
		});
	};

	/**
	 * _getContent
	 * @param {String} content_name
	 */
	fn._getContent = function (content_name) {
		return this.$content.filter('[data-slideinmenu-content="' + content_name + '"]');
	};


	/**
	 * _getPageIndex
	 * コンテンツ名からそのコンテンツを含むページのインデックスを返す。
	 * @param {String} content_name
	 */
	fn._getPageIndex = function (content_name) {
		var $target = this._getContent(content_name);
		return this.$page.has($target).attr('data-slideinmenu-page');
	};

	/**
	 * _getPageHeight
	 */
	fn._getPageHeight = function (target_content_name) {
	};

})(Module.prototype);


// set jquery.fn
$.fn[PLUGIN_NAME] = function (options) {
	return this.each(function () {
		var module;
		if (!$.data(this, PLUGIN_NAME)) {
			module = new Module(this, options);
			$.data(this, PLUGIN_NAME, module);
			module.init();
		}
	});
};

// set global
$[MODULE_NAME] = Module;

})(jQuery, this);
