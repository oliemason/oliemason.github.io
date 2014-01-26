define( 
	[
		'jquery',
		'tabbery'
	],

	function ( $ ) {

		var Tab;
		var $tabs;

		return {

			init: function () {
				Tab = this;
				$tabs = $( '.js-tabbery' );
				$tabs.tabbery( {
					showClass: '.is-selected',
					tabMenu: '.js-tabbery__menu',
					tabMenuItem: 'a',
					tabContent: '.js-tabbery__body'
				} );
			}

		};

	}
);