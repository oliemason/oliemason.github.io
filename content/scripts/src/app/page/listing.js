/* app/page/listing */

define(
	[
		'jquery',
		'app/ui/accordion/accordion',
		'app/ui/filter/filterChange'
	],

	function ($, Accordion, FilterChange) {

		// Expander
		if ( $('.js-accordion').length ) {
			Accordion.init();
		}

		// FilterChange
		if ( $( '.js-filter-single' ).length ) {
			FilterChange.init();
		}
	}
);