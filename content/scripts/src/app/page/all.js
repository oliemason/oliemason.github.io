/* app/page/all */
define( 
	[
		'jquery',
		'app/ui/rotator/rotator',
		'app/ui/nav/load',
		'util/lazyload',
		'app/ui/project/project'
	],
	function ( $, Rotator, NavLoad, LazyLoad, Projects ) {

		NavLoad.init();
		//Rotator.init();
		LazyLoad.init();
		Projects.init();

		//$('.header__menu').on('click', function(event) {
		//	event.preventDefault();
		//	var $this = $(this);
		//	$($this.attr('href')).slideToggle();
		//});
	}
);