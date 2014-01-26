/* app/ui/lightbox/common */

define( 
	[
		'jquery',
		'throttledebounce',
		'colorbox'
	],

	function ( $ ) {

		var Lightbox;
		var $cboxContent;
		var $colorbox;
		var $cboxWrapper;
		var $cboxClose;
		var $cboxTitle;
		var $cboxLoadedContent;
		var $cboxDescription;

		return {


			init: function () {
				Lightbox = this;
				this._setVars();
				this._initEvents();
			},

			_initEvents: function () {
				$( window ).on( 'resize', $.throttle( 250, function () {
					$.colorbox.close();
				} ) );
				$colorbox.on( 'click', '.btn-block, btn-icon', this._lightboxButtonClick );
			},

			onLoadProcessing: function () {
				Lightbox._addDescription.call( this );
			},

			onCompleteProcessing: function () {
				Lightbox._addButtons.call( this );
				Lightbox._adjustContent.call( this );
				Lightbox._adjustWindow.call( this );
			},

			_lightboxButtonClick: function ( e ) {

				e.preventDefault();
				var $thisButton = $( this );

				if ( $thisButton.is( '.btn-next' ) ) {
					$( '#cboxNext' ).trigger( 'click' );
					return;
				}

				if ( $thisButton.is( '.btn-previous' ) ) {
					$( '#cboxPrevious' ).trigger( 'click' );
					return;
				}

				$( '#cboxClose' ).trigger( 'click' );
			},

			setTitle: function () {
				return $( this ).nextAll( '.figure-caption' ).text();
			},

			_addDescription: function () {
				var descriptionHtml;
				var description = $( this ).find( 'img' ).first().attr( 'alt' );
				if ( description ) {
					$cboxDescription = $( '#cboxDescription' );
					descriptionHtml = '<p id="cboxDescription">' + description + '</span>';
					if ( $cboxDescription.length ) {
						$cboxDescription.remove();
					}
					$cboxContent.append( descriptionHtml );
				}
				$cboxDescription = $( "#cboxDescription" );
			},

			_adjustContent: function () {

				var $loadedContent = $( '#cboxContent' );
				var height = $loadedContent.outerHeight() + 20;
				$cboxWrapper = $( '#cboxWrapper' );

				$cboxLoadedContent = $( "#cboxLoadedContent" );

				$cboxWrapper.css( {
					'height': height
				} );

			},

			_adjustWindow: function () {

				var heightLoadedContent = $cboxLoadedContent.outerHeight();
				var heightTitle = $cboxTitle.outerHeight();
				var heightDescription = $cboxDescription.outerHeight( true );
				var heightTotal = heightLoadedContent + heightTitle + heightDescription;
				var heightColorbox = $colorbox.height();
				var topColorbox = $colorbox.css( 'top' );
				var topAdjust = ( heightTotal - heightColorbox ) / 2;
				var topTotal = parseFloat( topColorbox ) - topAdjust;

				$colorbox.css( { 'top': topTotal + "px" } );

			},

			_addButtons: function () {
				var width = 94;
				var $currentItem = $( this ).parent( 'li' ).length ? $( this ).closest( 'li' ) : $( this );
				var $nextLi = Lightbox._getItem( $currentItem, 'next' );
				var $prevLi = Lightbox._getItem( $currentItem, 'previous' );
				var nextImg = Lightbox._getImage( $nextLi );
				var prevImg = Lightbox._getImage( $prevLi );
				var $cboxContent = $( '#cboxContent' );
				var buttonNext = '<div class="btn-block btn-next"><div class="cboxBtnViewport"></div><span aria-hidden="true" class="iconf-arrow-right"></span><span class="visuallyhidden">Next</span></div>';
				var buttonPrevious = '<div class="btn-block btn-previous"><div class="cboxBtnViewport"></div><span aria-hidden="true" class="iconf-arrow-left"></span><span class="visuallyhidden">Previous</span></div>';
				var buttonClose = '<div class="btn-block btn-icon btn-close"><span aria-hidden="true" class="iconf-close"></span><span class="visuallyhidden">Next</span></div>';

				nextImg.height = 94;
				prevImg.height = 94;
				nextImg.width = width;
				prevImg.width = width;

				if ( !$cboxContent.find( '.btn-icon' ).length ) {
					$cboxContent.append( buttonClose );
				}

				if ( !$cboxContent.find( '.btn-next' ).length ) {
					$cboxContent.append( buttonNext );
				}
				$cboxContent.find( '.btn-next' )
					.find( '.cboxBtnViewport' )
						.html( nextImg );

				if ( !$cboxContent.find( '.btn-previous' ).length ) {
					$cboxContent.append( buttonPrevious );
				}
				$cboxContent.find( '.btn-previous' )
					.find( '.cboxBtnViewport' )
						.html( prevImg );
			},

			/* Get the next/previous <li> in the gallery list. If current item is last, next becomes first and vice versa for previous */
			_getItem: function ( $currentItem /* jQuery object */, direction /* string */ ) {

				var $item;

				if ( direction === 'next' ) {

					if ( $currentItem.is( 'li' ) ) {
						$item = $currentItem.next().length ? $currentItem.next() : $currentItem.closest( '.js-lightbox-gallery' ).find( 'a:first' );
						return $item;
					}

					$item = $currentItem.closest( '.js-lightbox-gallery' ).find( 'li:first' );
					return $item;

				}

				if ( $currentItem.is( 'li' ) ) {
					$item = $currentItem.prev().length ? $currentItem.prev() : $currentItem.closest( '.js-lightbox-gallery' ).find( 'a:first' );
					return $item;
				}

				$item = $currentItem.closest( '.js-lightbox-gallery' ).find( 'li:last' );
				return $item;

			},

			_getImage: function ( $item /* jQuery Object */ ) {

				var thumbnailSrc;
				var image;
				var href;

				var $image = $item.find( 'img' );

				if ( $image.length ) {
					return $image.clone().attr( 'class', '' );
				}

				href = $item.find( 'a:first' )[0].href;
				thumbnailSrc = href.toLowerCase().indexOf( 'flickr' ) === -1 ? this._generateCropUrl( href, '_SquareCrop' ) : this._generateFlickrThumbUrl( href );
				image = document.createElement( 'img' );
				image.src = thumbnailSrc;

				return $( image );

			},

			_generateCropUrl: function ( href, crop ) {

				// FROM THIS:
				//http://localhost:18756/vBgs5NA/media/43262/800x600_4.jpg
				// TO THIS:
				//http://localhost:18756/vBgs5NA/media/43262/800x600_4_SquareCrop.width.107.ashx.jpg

				href = href.toLowerCase();

				var extension;
				var thumbnailSrc;
				var reFile = /\.(gif|bmp|png|jpg|jpeg)/;
				var match = href.match( reFile );

				if ( !match ) {
					return '';
				}

				extension = match[0];
				thumbnailSrc = href.substring( 0, href.indexOf( extension ) ) + crop + extension + '.width.107.ashx';

				return thumbnailSrc;
			},

			_generateFlickrThumbUrl: function ( href ) {

				// FROM THIS:
				//http://farm9.staticflickr.com/8518/8516100691_632c7fdc64_b.jpg
				// TO THIS:
				//http://farm9.staticflickr.com/8518/8516100691_632c7fdc64_m.jpg

				href = href.toLowerCase();

				var extension;
				var filetype;
				var thumbnailSrc;
				var reFile = /_b\.(gif|bmp|png|jpg|jpeg)/;
				var match = href.match( reFile );

				if ( !match ) {
					return '';
				}

				extension = match[0];
				filetype = extension.substring( 2 );
				thumbnailSrc = href.substring( 0, href.indexOf( extension ) ) + '_m' + filetype;

				return thumbnailSrc;
			},

			_setVars: function () {
				$cboxContent = $cboxContent || $( '#cboxContent' );
				$colorbox = $colorbox || $( '#colorbox' );
				$cboxWrapper = $cboxWrapper || $( '#cboxWrapper' );
				$cboxClose = $cboxClose || $( '#cboxClose' );
				$cboxTitle = $cboxTitle || $( '#cboxTitle' );
				$cboxLoadedContent = $cboxLoadedContent || $( '#cboxLoadedContent' );
			}
		};
	}
);