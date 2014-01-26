/* app/ui/project/project */
define(
	[
		'jquery',
		'util/mediaqueries',
		'pubsub'
	],
	function ( $, MediaQueries ) {

		var Projects;
		var $container;
		var $content;
		var $projects;
		
		return {

			init: function () {
				Projects = this;
				Projects.initVars();
				
				Projects._setContentRelations();
				Projects._bindEvents();
				Projects._initMediaQueries();

			},
			
			_initMediaQueries: function () {
				var large = {
					queries: MediaQueries.queries.large,
					shouldDegrade: false,
					match: function() {
						Projects._moveContent(3);
					},
					unmatch: function() {}
				};

				var medium = {
					queries: MediaQueries.queries.medium,
					shouldDegrade: true,
					match: function () {
						Projects._moveContent(2);
					},
					unmatch: function () {}
				};

				var small = {
					queries: MediaQueries.queries.small,
					shouldDegrade: true,
					match: function () {
						Projects._moveContent(1);
					},
					unmatch: function () {}
				};

				MediaQueries.register( [small, medium, large] );
			},

			initVars: function () {
				$container = $('.js-projects-container');
				$projects = $container.find('.pod--project');
			},

			_setContentRelations: function () {
				var count = 0;
				$content = $('<div id="project-content-copy"/>');
				$content.hide();
				$projects.each(function () {
					var $proj = $(this);
					$proj.attr('data-id', count);
					var $info = $proj.find('.project-info');
					$info.attr('data-id', count)
						.append('<a class="js-proj-close iconf-close" href="#"><span class="iconf__text">close</span></a>');
					$content.append($info);
					count++;
				});
				$container.append($content);
			},

			_bindEvents: function () {
				$container.on('click', '.pod--project__thumbnail', Projects._setSelection);
				$container.on('click', '.js-proj-close', Projects._closeProject);
			},
			
			_closeProject: function (event) {
				event.preventDefault();
				$container.find('.is-selected .pod--project__thumbnail').trigger('click');
			},

			_moveContent: function ( rowCount ) {
				$container.find('.content-collapse').empty().remove();
				$container.find('.is-selected').removeClass('is-selected');
				$projects.filter(':nth-child(' + rowCount + 'n)').after('<div class="content-collapse grid__item one-whole"/>');
				if($projects.length % 3 !== 0) {
					$projects.last().after('<div class="content-collapse grid__item one-whole"/>');
				}
				var currentRowIndex = 0;
				var $contentItems = $content.children();
				var $rows = $container.find('.content-collapse');
				var $row = $rows.first();
				for(var i=0, l=$contentItems.length; i<l; i++) {
					var container = $('<div/>');
					container.append($contentItems.eq(i).clone());
					if (i % rowCount === 0 && i > 0) {
						currentRowIndex++;
						$row = $rows.eq(currentRowIndex);
					}
					$row.append(container);
				}
				$.publish( '/content/updated', [] );
			},

			_setSelection: function (event) {
				var $project = $(this).parent();
				$container.find('.pod--project.is-selected:not([data-id="' + $project.attr('data-id') + '"]) .pod--project__thumbnail').trigger('click');
				$project.toggleClass('is-selected');
				var $target = $container.find('.content-collapse [data-id=' + $project.attr('data-id') + ']');
				$target.parent().toggleClass('is-selected');
			}
		};

	}
);