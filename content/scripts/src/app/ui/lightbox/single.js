/* app/ui/lightbox/single */

define( 
	[
		'jquery',
		'app/ui/lightbox/common',
		'colorbox'
	],

	function ( $, LightoxCommon ) {

		var LightboxSingle;

		return {

			init: function () {
				LightboxSingle = this;
				LightoxCommon.init();
				var config = {
					transition: 'none',
					maxWidth: '90%',
					title: LightoxCommon.setTitle,
					onLoad: LightoxCommon.onLoadProcessing,
					onComplete: LightoxCommon.onCompleteProcessing,
					photo: true
				};
				$( '.no-touch .js-lightbox-single' ).find( 'a' ).not( '.figure-caption' ).colorbox( config );
			},

			open: function () {
				$( this ).trigger( 'click' );
			}
		};

	}
);