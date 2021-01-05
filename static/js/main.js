/*
	Highlights by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// Always load external links in new tab
$(function() {
	$('a[href^="//"], a[href^="http"]').not('a[href*="' + location.hostname + '"]').attr({
		target: "_blank",
		rel: "noopener"
	});

	// The removal of 'is-loading' often fails in some browsers. Brute-force!
	var loading_html = document.querySelector("html");
	window.setTimeout(function() {
		loading_html.classList.remove("is-loading");
	}, 500);


	// $(window).width(); // returns width of browser viewport
	// $(document).width(); // returns width of HTML document
	// $(window).height(); // returns height of browser viewport
	// $(document).height(); // returns height of HTML document

	// Set up screen sizes. Twitter Bootstrap viewports used.
	function getBootstrapBreakpoint() {
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		return (w < 768) ? 'xs' : ((w < 992) ? 'sm' : ((w < 1200) ? 'md' : 'lg'));
	}

	var $window = $(window),
		$body = $('body'),
		$html = $('html');

	// Disable animations/transitions until the page has loaded.
	$html.addClass('is-loading');

	$window.on('load', function() {
		$html.removeClass('is-loading');
	});

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1500
	});

	// // Create wrapper.
	// $body.wrapInner('<div id="wrapper" />');
	// $wrapper = $('#wrapper');

	// Header.
	var $header = $('#header'),
		$headerTitle = $header.find('header'),
		$headerContainer = $header.find('.container');

	// Main sections.
	$('.main').each(function() {

		var $this = $(this),
			$primaryImg = $this.find('.image.primary > img'),
			$bg,
			options;

		// No primary image? Bail.
		if ($primaryImg.length == 0)
			return;

		// Create bg and append it to body.
		$bg = $('<div class="main-bg" id="' + $this.attr('id') + '-bg"></div>')
			.css('background-image', (
				'url("css/images/overlay.png"), url("' + $primaryImg.attr('src') + '")'
			))
			.appendTo($body);

		// Scrollex.
		$header.scrollex({
			terminate: function() {
				$headerTitle.css('opacity', '');
			},
			scroll: function(progress) {
				// Fade out title as user scrolls down.
				if (progress > 0.5)
					x = 1 - progress;
				else
					x = progress;
				$headerTitle.css('opacity', Math.max(0, Math.min(1, x * 2)));
			}
		});

		options = {
			mode: 'middle',
			delay: 200,
			top: '-10vh',
			bottom: '-10vh'
		};

		options.init = function() {
			$bg.removeClass('active');
		};
		options.enter = function() {
			$bg.addClass('active');
		};
		options.leave = function() {
			$bg.removeClass('active');
		};

		$this.scrollex(options);

	});

});
