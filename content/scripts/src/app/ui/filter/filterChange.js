/* app/ui/filter/filterChange */

define(
	[
		'jquery'
	],

	function ($) {

		var FilterChange;
		var $filters;

		return {

			init: function () {
				FilterChange = this;
				$filters = $('.js-filter-single');
				this._initEvents();
			},

			_initEvents: function () {
				$filters.on('change', this._onFilterChange);
			},

			_onFilterChange: function () {
				var $filter = $(this);
				var selectedValue = $filter.find( 'option:selected' ).val();
				window.location = selectedValue;
			}

		};

	}
);