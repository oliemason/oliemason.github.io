/* app/ui/video/load */

define(
	[
		'jquery',
		'pubsub'
	],

	function ($) {

		var VideoLoad;

		return {

			init: function () {

				VideoLoad = this;
				this._initVideoEvent();
			},

			loadVideo: function (e) {
				e.preventDefault();
				var thisVid = this;
				require(['app/ui/video/common', 'app/ui/video/youtube'], function (VideoCommon, YouTube) {
					VideoCommon.init( thisVid );
					YouTube.init( thisVid );
				});
			},

			_initVideoEvent: function () {
				$('.js-video-player').on('click', '.js-video', VideoLoad.loadVideo);
			}

		};
	}
);