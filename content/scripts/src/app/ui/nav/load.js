/* app/ui/nav/load */

define( 
	[
		'jquery',
		'util/mediaqueries'
	],

	function ( $, MediaQueries ) {

		var NavLoad;
		
		return {

			init: function () {
				NavLoad = this;
				this._initMediaQueries();
			},
			
			_initMediaQueries: function () {
				MediaQueries.register( [{
					//Bind Small Nav
					queries: MediaQueries.queries["nav-small"],
					shouldDegrade: false,
					match: function () {
						require( ['app/ui/nav/small'], function ( NavSmall ) {
							NavSmall.init();
						} );
					},
					unmatch: function () {
						require( ['app/ui/nav/small'], function ( NavSmall ) {
							NavSmall.unbind();
						} );
					}
				}, {
					//Bind Large Nav
					queries: MediaQueries.queries["nav-large"],
					shouldDegrade: true,
					match: function () {
						require( ['app/ui/nav/large'], function ( NavLarge ) {
							NavLarge.init();
						} );
					},
					unmatch: function () {
						require( ['app/ui/nav/large'], function( NavLarge ) {
							NavLarge.unbind();
						} );
					}
				}] );
			}
		};
	}
);