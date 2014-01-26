/* app/util/lazyload */

define( 
	[
		'jquery',
		'pubsub',
		'lazyload',
		'lazyscroll'
	],

	function ( $ ) {

		'use strict';

		var LazyLoad;
		var contentClass = '.js-lazy-content';
		var imagesClass = '.js-lazy-auto';
		var $lazyLoadContent;
		var $lazyLoadImages;

		return {

			init: function () {
				LazyLoad = this;

				$lazyLoadContent = $( contentClass );
				$lazyLoadImages = $( imagesClass );

				if ( $lazyLoadImages.length ) {
					LazyLoad.loadImages( $lazyLoadImages );
				}
				if ( $lazyLoadContent.length ) {
					LazyLoad.loadContent();
				}

				this._initSubscriptions();
			},

			initLazyFunction: function ( config ) {
				config.elems.lazyScroll( {
					callback: config.callback
				} );
			},

			_initSubscriptions: function () {
				$.subscribe( '/lazyload/image', this.loadImages );
				$.subscribe( '/content/updated', LazyLoad._reInit );
			},

			_reInit: function() {
				LazyLoad.init();
			},

			_loadAjaxedImages: function ( data ) {

				if ( data.html ) {
					LazyLoad.loadImagesInHtml( data.html );
				}
				LazyLoad.loadImages( data.images );
			},

			loadContent: function ( $html ) {
				$html = $html instanceof jQuery ? $html : $( $.trim( $html ) );
				if ( $html.length ) {
					var $content = $html.find( contentClass );
					LazyLoad.content( $content );
					return;
				}
				LazyLoad.content( $lazyLoadContent );
			},

			loadImages: function ( $images ) {
				LazyLoad._getImages( $images );
			},

			loadImagesInHtml: function ( $html ) {
				$html = $html instanceof jQuery ? $html : $( $.trim( $html ) );
				if ( $html.length ) {
					var $images = $html.find( imagesClass );
					if ( !$images.length ) {
						return;
					}
					LazyLoad._getImages( $images );
					return;
				}
				this._getImages( $lazyLoadImages );
			},

			_getImages: function ( $images ) {

				var effect = !$( '.oldie' ).length ? 'fadeIn' : 'show';
				if ( !$images || !$images.length ) {
					return;
				}

				$images.filter( function () {
					var $thisImg = $( this );
					return this.src.indexOf( $thisImg.attr( 'data-original' ) ) === -1;
				} ).lazyload( {
					effect: effect,
					failure_limit: 99999,
					threshold: 300
				} );
			},

			content: function ( $elms ) {
				$elms.lazyScroll( {
					callback: function () {
						this.$element.ajaxInclude();
					}
				} );
			}

		};

	}
);