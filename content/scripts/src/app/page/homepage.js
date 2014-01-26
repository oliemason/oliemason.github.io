/* app/page/homepage */

define( 
	[
		'jquery',
		'app/ui/rotator/rotator'
	],

	function ( $, Rotator) {

		//Rotator
		if ( $( '#js-rotator' ).length ) {
			Rotator.init();
		}
		
	}
);