/* app/ui/rotator/rotator */

define(
	[
		'jquery',
		'brotator'
	],

	function ($) {

		var Rotator;
		var $items;
		var $featureRotator = null;
		var $content = null;

		return {
			init: function() {
				Rotator = this;
				$featureRotator = $( '.js-rotator' );
				$content = $featureRotator.find( '.js-rotator__content' );
				$items = $content.find( 'li' );
				if ( $items.length > 1 ) {
					$featureRotator.brotator( {
						content: '.js-rotator__content',
						timeout: 6000,
						easing: 'easeInOutSine',
						hasMenu: true,
						hasButtons: true,
						next: '.js-rotator__next',
						previous: '.js-rotator__prev',
						menu: '.js-rotator__menu',
						menuItem: '.js-rotator__menu-item',
						animationSpeed: 300,
						lazyloader: true,
						namespace: '/rotator',
						autorotate: true
					} );
				}
			}
		};
	}
);