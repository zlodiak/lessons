(function($, w, d) {
	// приватные методы
	function getIEVersion() {
		var rv = -1; // не IE
		
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re  = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
	
			if (re.exec(ua) != null) {
	  			rv = parseFloat(RegExp.$1);
	  		}
		}
		
		return rv;
	}

	function getScrollPos(elem, track, bar) {
		var px, py, x, y;

		px = elem.scrollLeft() / (elem[0].scrollWidth - elem.innerWidth());
		py = elem.scrollTop() / (elem[0].scrollHeight - elem.innerHeight());

		x = (track.width() - bar.width()) * px;
		y = (track.height() - bar.height()) * py;

		return {
			px: px,
			py: py,
			x: x,
			y: y
		};
	}

	function scrollV(pos, step, elem, track, bar) {
		var p;

		pos += step;

		if (pos < 0) {
			pos = 0;
		} else if (pos + bar.height() >= track.height()) {
			pos = track.height() - bar.height();
		}
						
		p = pos / (track.height() - bar.height());
						
		elem.scrollTop((elem[0].scrollHeight - elem.innerHeight()) * p);
		bar.css('top', pos + 'px');
	}

	function scrollH(pos, step, elem, track, bar) {
		var p;

		pos += step;

		if (pos < 0) {
			pos = 0;
		} else if (pos + bar.width() >= track.width()) {
			pos = track.width() - bar.width();
		}
						
		p = pos / (track.width() - bar.width());
						
		elem.scrollLeft((elem[0].scrollWidth - elem.innerWidth()) * p);
		bar.css('left', pos + 'px');
	}

	// публичные методы
	var methods = {
		init: function(options) {
			var defaults = $.extend(true, {
				classPrefix: 'rScrollbar',

				trackV: {
					container: null,
					scrollDelta: 20,
					scrollInterval: 100,
					
					track: {
						html: '',
						mouseOver: function() {},
						mouseOut: function() {},
						mouseDown: function() {},
						mouseUp: function() {},
						mouseClick: function() {}
					},

					butUp: {
						html: '',
						mouseOver: function() {},
						mouseOut: function() {},
						mouseDown: function() {},
						mouseUp: function() {},
						mouseClick: function() {}
					},

					butDown: {
						html: '',
						mouseOver: function() {},
						mouseOut: function() {},
						mouseDown: function() {},
						mouseUp: function() {},
						mouseClick: function() {}
					},

					bar: {
						size: {
							min: 10,
							max: 'auto'
						},

						html: '',
						mouseOver: function() {},
						mouseOut: function() {},
						mouseDown: function() {},
						mouseUp: function() {},
						mouseClick: function() {},
						beforeDrag: function() {},
						afterDrag: function() {}
					}
				},

				trackH: {
					container: null,
					scrollDelta: 20,
					scrollInterval: 100,
					
					track: {
						html: '',
						mouseOver: function() {},
						mouseOut: function() {},
						mouseDown: function() {},
						mouseUp: function() {},
						mouseClick: function() {}
					},

					butUp: {
						html: '',
						mouseOver: function() {},
						mouseOut: function() {},
						mouseDown: function() {},
						mouseUp: function() {},
						mouseClick: function() {}
					},

					butDown: {
						html: '',
						mouseOver: function() {},
						mouseOut: function() {},
						mouseDown: function() {},
						mouseUp: function() {},
						mouseClick: function() {}
					},

					bar: {
						size: {
							min: 10,
							max: 'auto'
						},

						html: '',
						mouseOver: function() {},
						mouseOut: function() {},
						mouseDown: function() {},
						mouseUp: function() {},
						mouseClick: function() {},
						beforeDrag: function() {},
						afterDrag: function() {}
					}
				},

				afterInit: function() {}
			}, options);

			return this.each(function() {
				var $self = $(this),
					$viewport,
					trackV = {},
					trackH = {},
					timer = null,
					ie = getIEVersion();

				// self

				$self
					.css('overflow', 'hidden')
					.addClass(defaults.classPrefix);

				if ($self.css('position') !== 'absolute') {
					$self.css('position', 'relative');
				}

				// ======


				// viewport

				$self.wrapInner('<div class="' + defaults.classPrefix + '__viewport" />');
				$viewport = $self.find('.' + defaults.classPrefix + '__viewport');

				$viewport.css('overflow', 'hidden');

				// ======


				// trackV

				if (defaults.trackV.container) {
					$(defaults.trackV.container).append('<div class="' + defaults.classPrefix + '__track-v" />');
					trackV.cont = $(defaults.trackV.container).find('.' + defaults.classPrefix + '__track-v');
				} else {
					$self.append('<div class="' + defaults.classPrefix + '__track-v" />');
					trackV.cont = $self.find('.' + defaults.classPrefix + '__track-v');
				}

				trackV.cont.append('<div class="track" />');
				trackV.track = trackV.cont.find('.track');

				if (defaults.trackV.track.html && (typeof defaults.trackV.track.html === 'string')) {
					trackV.track.append(defaults.trackV.track.html);
				}

				trackV.track.append('<div class="bar" />');
				trackV.bar = trackV.track.find('.bar');

				if (defaults.trackV.bar.html && (typeof defaults.trackV.bar.html === 'string')) {
					trackV.bar.append(defaults.trackV.bar.html);
				}

				trackV.cont.append('<div class="but-up" />');
				trackV.butUp = trackV.cont.find('.but-up');

				if (defaults.trackV.butUp.html && (typeof defaults.trackV.butUp.html === 'string')) {
					trackV.butUp.append(defaults.trackV.butUp.html);
				}

				trackV.cont.append('<div class="but-down" />');
				trackV.butDown = trackV.cont.find('.but-down');

				if (defaults.trackV.butDown.html && (typeof defaults.trackV.butDown.html === 'string')) {
					trackV.butDown.append(defaults.trackV.butDown.html);
				}

				// ======


				// trackH

				if (defaults.trackH.container) {
					$(defaults.trackH.container).append('<div class="' + defaults.classPrefix + '__track-h" />');
					trackH.cont = $(defaults.trackH.container).find('.' + defaults.classPrefix + '__track-h');
				} else {
					$self.append('<div class="' + defaults.classPrefix + '__track-h" />');
					trackH.cont = $self.find('.' + defaults.classPrefix + '__track-h');
				}

				trackH.cont.append('<div class="track" />');
				trackH.track = trackH.cont.find('.track');

				if (defaults.trackH.track.html && (typeof defaults.trackH.track.html === 'string')) {
					trackH.track.append(defaults.trackH.track.html);
				}

				trackH.track.append('<div class="bar" />');
				trackH.bar = trackH.track.find('.bar');

				if (defaults.trackH.bar.html && (typeof defaults.trackH.bar.html === 'string')) {
					trackH.bar.append(defaults.trackH.bar.html);
				}

				trackH.cont.append('<div class="but-up" />');
				trackH.butUp = trackH.cont.find('.but-up');

				if (defaults.trackH.butUp.html && (typeof defaults.trackH.butUp.html === 'string')) {
					trackH.butUp.append(defaults.trackH.butUp.html);
				}

				trackH.cont.append('<div class="but-down" />');
				trackH.butDown = trackH.cont.find('.but-down');

				if (defaults.trackH.butDown.html && (typeof defaults.trackH.butDown.html === 'string')) {
					trackH.butDown.append(defaults.trackH.butDown.html);
				}

				// ======


				// triggers

				$self.on('getDefaults', function() {
					return defaults;
				}).on('getViewport', function() {
					return $viewport;
				}).on('getTracks', function() {
					return {
						v: trackV,
						h: trackH
					};
				});

				// ======


				// update scrollbars

				methods.update.call($self);

				$(w).on('load resize', function() {
					methods.update.call($self);
				});

				// ======


				// self events

				$self.on('mousewheel DOMMouseScroll', function(e) {
					var E = e.originalEvent,
						delta = 0, sp;

					// detail = -3
					// wheelDelta = 120
					if (E.detail) {
						delta = E.detail * -40;
					} else {
						delta = E.wheelDelta;
					}

					if (trackV.cont.is(':visible') && !e.shiftKey) {
						$viewport.scrollTop($viewport.scrollTop() - delta);

						sp = getScrollPos($viewport, trackV.track, trackV.bar);

						if (sp.py > 0 && sp.py < 1) {
							e.preventDefault();
							e.stopPropagation();
						}

						trackV.bar.css('top', sp.y + 'px');
					}

					if (trackH.cont.is(':visible')) {
						if (!trackV.cont.is(':visible') || e.shiftKey) {
							$viewport.scrollLeft($viewport.scrollLeft() - delta);

							sp = getScrollPos($viewport, trackH.track, trackH.bar);

							if (sp.px > 0 && sp.px < 1) {
								e.preventDefault();
								e.stopPropagation();
							}

							trackH.bar.css('left', sp.x + 'px');
						}
					}
				});

				// ======

				// trackV events
				
				trackV.track.on('click', function(e) {
					scrollV(e.pageY - trackV.track.offset().top, -trackV.bar.height() / 2, $viewport, trackV.track, trackV.bar);

					defaults.trackV.track.mouseClick.call($self);
				}).on('mouseenter', function() {
					trackV.track.addClass('hover');
					
					defaults.trackV.track.mouseOver.call($self);
				}).on('mouseleave', function() {
					trackV.track.removeClass('hover');

					defaults.trackV.track.mouseOut.call($self);
				}).on('mousedown', function() {
					trackV.track.addClass('active');

					defaults.trackV.track.mouseDown.call($self);
				}).on('mouseup', function() {
					trackV.track.removeClass('active');

					defaults.trackV.track.mouseUp.call($self);
				});

				trackV.bar.on('mousedown', function(e) {
					e.stopPropagation();

					$(document).on('selectstart', false);

					trackV.drag = true;

					trackV.bar.data('shift', e.pageY - trackV.bar.position().top);
					defaults.trackV.bar.beforeDrag.call($self);

					trackV.bar.addClass('active');

					defaults.trackV.bar.mouseDown.call($self);
				}).on('mouseup', function(e) {
					trackV.bar.removeClass('active');

					defaults.trackV.bar.mouseUp.call($self);
				}).on('mouseenter', function(e) {
					trackV.bar.addClass('hover');

					defaults.trackV.bar.mouseOver.call($self);
				}).on('mouseleave', function(e) {
					trackV.bar.removeClass('hover');

					defaults.trackV.bar.mouseOut.call($self);
				}).on('dragstart', function(e) {
					e.preventDefault();
					e.stopPropagation();
				}).on('click', function(e) {
					e.stopPropagation();

					defaults.trackV.bar.mouseClick.call($self);
				});

				trackV.butUp.on('mousedown', function(e) {
					e.stopPropagation();

					trackV.butUp.addClass('active');

					w.clearInterval(timer);

					timer = w.setInterval(function() {
						scrollV(trackV.bar.position().top, -defaults.trackV.scrollDelta, $viewport, trackV.track, trackV.bar);
					}, defaults.trackV.scrollInterval);

					defaults.trackV.butUp.mouseDown.call($self);
				}).on('mouseup', function(e) {
					e.stopPropagation();

					trackV.butUp.removeClass('active');

					defaults.trackV.butUp.mouseUp.call($self);
				}).on('mouseenter', function(e) {
					trackV.butUp.addClass('hover');

					defaults.trackV.butUp.mouseOver.call($self);
				}).on('mouseleave', function(e) {
					trackV.butUp.removeClass('hover');

					defaults.trackV.butUp.mouseOut.call($self);
				}).on('click', function(e) {
					e.stopPropagation();

					w.clearInterval(timer);

					scrollV(trackV.bar.position().top, -defaults.trackV.scrollDelta, $viewport, trackV.track, trackV.bar);

					defaults.trackV.butUp.mouseClick.call($self);
				});

				trackV.butDown.on('mousedown', function(e) {
					e.stopPropagation();

					trackV.butDown.addClass('active');

					w.clearInterval(timer);

					timer = w.setInterval(function() {
						scrollV(trackV.bar.position().top, defaults.trackV.scrollDelta, $viewport, trackV.track, trackV.bar);
					}, defaults.trackV.scrollInterval);

					defaults.trackV.butDown.mouseDown.call($self);
				}).on('mouseup', function(e) {
					e.stopPropagation();

					trackV.butDown.removeClass('active');

					defaults.trackV.butDown.mouseUp.call($self);
				}).on('mouseenter', function(e) {
					trackV.butDown.addClass('hover');

					defaults.trackV.butDown.mouseOver.call($self);
				}).on('mouseleave', function(e) {
					trackV.butDown.removeClass('hover');

					defaults.trackV.butDown.mouseOut.call($self);
				}).on('click', function(e) {
					e.stopPropagation();

					w.clearInterval(timer);

					scrollV(trackV.bar.position().top, defaults.trackV.scrollDelta, $viewport, trackV.track, trackV.bar);

					defaults.trackV.butDown.mouseClick.call($self);
				});

				// ======

				// trackH events

				trackH.track.on('click', function(e) {
					scrollH(e.pageX - trackH.track.offset().left, -trackH.bar.width() / 2, $viewport, trackH.track, trackH.bar);

					defaults.trackH.track.mouseClick.call($self);
				}).on('mouseenter', function() {
					trackH.track.addClass('hover');

					defaults.trackH.track.mouseOver.call($self);
				}).on('mouseleave', function() {
					trackH.track.removeClass('hover');

					defaults.trackH.track.mouseOut.call($self);
				}).on('mousedown', function() {
					trackH.track.addClass('active');

					defaults.trackH.track.mouseDown.call($self);
				}).on('mouseup', function() {
					trackH.track.removeClass('active');

					defaults.trackH.track.mouseUp.call($self);
				});

				trackH.bar.on('mousedown', function(e) {
					e.stopPropagation();

					$(document).on('selectstart', false);

					trackH.drag = true;

					trackH.bar.data('shift', e.pageX - trackH.bar.position().left);
					defaults.trackH.bar.beforeDrag.call($self);

					trackH.bar.addClass('active');

					defaults.trackH.bar.mouseDown.call($self);
				}).on('mouseup', function(e) {
					trackH.bar.removeClass('active');

					defaults.trackH.bar.mouseUp.call($self);
				}).on('mouseenter', function(e) {
					trackH.bar.addClass('hover');

					defaults.trackH.bar.mouseOver.call($self);
				}).on('mouseleave', function(e) {
					trackH.bar.removeClass('hover');

					defaults.trackH.bar.mouseOut.call($self);
				}).on('dragstart', function(e) {
					e.preventDefault();
					e.stopPropagation();
				}).on('click', function(e) {
					e.stopPropagation();

					defaults.trackH.bar.mouseClick.call($self);
				});

				trackH.butUp.on('mousedown', function(e) {
					e.stopPropagation();

					trackH.butUp.addClass('active');

					w.clearInterval(timer);

					timer = w.setInterval(function() {
						scrollH(trackH.bar.position().left, -defaults.trackH.scrollDelta, $viewport, trackH.track, trackH.bar);
					}, defaults.trackH.scrollInterval);

					defaults.trackH.butUp.mouseDown.call($self);
				}).on('mouseup', function(e) {
					e.stopPropagation();

					trackH.butUp.removeClass('active');

					defaults.trackH.butUp.mouseUp.call($self);
				}).on('mouseenter', function(e) {
					trackH.butUp.addClass('hover');

					defaults.trackH.butUp.mouseOver.call($self);
				}).on('mouseleave', function(e) {
					trackH.butUp.removeClass('hover');

					defaults.trackH.butUp.mouseOut.call($self);
				}).on('click', function(e) {
					e.stopPropagation();

					w.clearInterval(timer);

					scrollH(trackH.bar.position().left, -defaults.trackH.scrollDelta, $viewport, trackH.track, trackH.bar);

					defaults.trackH.butUp.mouseClick.call($self);
				});

				trackH.butDown.on('mousedown', function(e) {
					e.stopPropagation();

					trackH.butDown.addClass('active');

					w.clearInterval(timer);

					timer = w.setInterval(function() {
						scrollH(trackH.bar.position().left, defaults.trackH.scrollDelta, $viewport, trackH.track, trackH.bar);
					}, defaults.trackH.scrollInterval);

					defaults.trackH.butDown.mouseDown.call($self);
				}).on('mouseup', function(e) {
					e.stopPropagation();

					trackH.butDown.removeClass('active');

					defaults.trackH.butDown.mouseUp.call($self);
				}).on('mouseenter', function(e) {
					trackH.butDown.addClass('hover');

					defaults.trackH.butDown.mouseOver.call($self);
				}).on('mouseleave', function(e) {
					trackH.butDown.removeClass('hover');

					defaults.trackH.butDown.mouseOut.call($self);
				}).on('click', function(e) {
					e.stopPropagation();

					w.clearInterval(timer);

					scrollH(trackH.bar.position().left, defaults.trackH.scrollDelta, $viewport, trackH.track, trackH.bar);

					defaults.trackH.butDown.mouseClick.call($self);
				});

				// ======

				$(document).on('mouseup', function() {
					$(this).off('selectstart');
					
					if (trackV.drag) {
						defaults.trackV.bar.afterDrag.call($self);
					}
					
					if (trackH.drag) {
						defaults.trackH.bar.afterDrag.call($self);
					}

					trackV.drag = false;
					trackH.drag = false;

					$viewport.data('sizeX', $viewport.outerWidth());
					$viewport.data('sizeY', $viewport.outerHeight());

					w.clearInterval(timer);
				}).on('mousemove', function(e) {
					if (trackV.drag) {
						scrollV(e.pageY - trackV.bar.data('shift'), 0, $viewport, trackV.track, trackV.bar);
					}
					
					if (trackH.drag) {
						scrollH(e.pageX - trackH.bar.data('shift'), 0, $viewport, trackH.track, trackH.bar);
					}

					if ($viewport.outerWidth() !== $viewport.data('sizeX')) {
						//methods.update.call($self);
					}
				});
			});
		},

		update: function() {
			var $self = this,
				$viewport = $self.triggerHandler('getViewport'),
				trackV = $self.triggerHandler('getTracks').v,
				trackH = $self.triggerHandler('getTracks').h,
				defaults = $self.triggerHandler('getDefaults'),
				sp, py, px, diffW, diffH;

			if (parseInt($self.css('padding')) > 0) {
				$viewport.css('padding', $self.css('padding'));
				$self.css('padding', 0);
			}

			diffW = $viewport.innerWidth() - $viewport.width();
			diffH = $viewport.innerHeight() - $viewport.height();

			$viewport.css({
				'height': $self.height() - diffH + 'px',
				'width': $self.width() - diffW + 'px'
			});

			trackV.cont.hide();
			trackH.cont.hide();

			if ($viewport[0].scrollHeight > $self.innerHeight()) {
				trackV.cont.show();
			}

			if ($viewport[0].scrollWidth > $self.innerWidth()) {
				trackH.cont.show();
			}

			if (trackV.cont.is(':visible')) {
				if (trackV.cont.css('left') === 'auto') {
					if (!defaults.trackV.container) {
						$viewport.css({
							'width': $self.width() - trackV.cont.width() - diffW + 'px',
							'margin-right': trackV.cont.width() + 'px'
						});
					}
					
					trackH.cont.css('right', trackV.cont.width());
				} else if (trackV.cont.css('right') === 'auto') {
					if (!defaults.trackV.container) {
						$viewport.css({
							'width': $self.width() - trackV.cont.width() - diffW + 'px',
							'margin-left': trackV.cont.width() + 'px'
						});
					}
					
					trackH.cont.css('left', trackV.cont.width());
				}

				sp = getScrollPos($viewport, trackV.track, trackV.bar);
				trackV.bar.css('top', sp.y + 'px');
			} else {
				if (!trackH.cont.is(':visible')) {
					$viewport.css('width', 'auto');
				}
			}

			if (trackH.cont.is(':visible')) {
				if (trackH.cont.css('top') === 'auto') {
					if (!defaults.trackH.container) {
						$viewport.css({
							'height': $self.height() - trackH.cont.height() - diffH + 'px',
							'margin-bottom': trackH.cont.height() + 'px'
						});
					}
					
					trackV.cont.css('bottom', trackH.cont.height());
				} else if (trackH.cont.css('bottom') === 'auto') {
					if (!defaults.trackH.container) {
						$viewport.css({
							'height': $self.height() - trackH.cont.height() - diffH + 'px',
							'margin-top': trackH.cont.height() + 'px'
						});
					}

					trackV.cont.css('top', trackH.cont.height());
				}

				sp = getScrollPos($viewport, trackH.track, trackH.bar);
				trackH.bar.css('left', sp.x + 'px');
			} else {
				if (!trackV.cont.is(':visible')) {
					$viewport.css('height', 'auto');
				}
			}

			px = $self.innerWidth() / $viewport[0].scrollWidth;
			py = $self.innerHeight() / $viewport[0].scrollHeight;

			trackV.bar.css('height', Math.round(trackV.track.outerHeight() * py) + 'px');
			trackH.bar.css('width', Math.round(trackH.track.outerWidth() * px) + 'px');

			if (defaults.trackV.bar.size.min && defaults.trackV.bar.size.min !== 'auto') {
				defaults.trackV.bar.size.min = parseInt(defaults.trackV.bar.size.min);

				if (trackV.bar.height() < defaults.trackV.bar.size.min) {
					trackV.bar.css('height', defaults.trackV.bar.size.min + 'px');
				}
			}

			if (defaults.trackV.bar.size.max && defaults.trackV.bar.size.max !== 'auto') {
				defaults.trackV.bar.size.max = parseInt(defaults.trackV.bar.size.max);

				if (trackV.bar.height() > defaults.trackV.bar.size.max) {
					trackV.bar.css('height', defaults.trackV.bar.size.max + 'px');
				}
			}

			if (defaults.trackH.bar.size.min && defaults.trackH.bar.size.min !== 'auto') {
				defaults.trackH.bar.size.min = parseInt(defaults.trackH.bar.size.min);

				if (trackH.bar.width() < defaults.trackH.bar.size.min) {
					trackH.bar.css('width', defaults.trackH.bar.size.min + 'px');
				}
			}

			if (defaults.trackH.bar.size.max && defaults.trackH.bar.size.max !== 'auto') {
				defaults.trackH.bar.size.max = parseInt(defaults.trackH.bar.size.max);

				if (trackH.bar.width() > defaults.trackH.bar.size.max) {
					trackH.bar.css('width', defaults.trackH.bar.size.max + 'px');
				}
			}
		}
	};
	
	$.fn.rScrollbar = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.rScrollbar');
		} 
	};
})(jQuery, window, document);

// юзаем плагин
/*
$(function() {
  $('.b-scroll-test').rScrollbar({
				trackV: {
					container: '#trackV',
					
					track: {
						html: '<div class="track-t" /><div class="track-b" />'
					},

					bar: {
						html: '<div class="bar-t" /><div class="bar-b" />'
					}
				},

				trackH: {
					track: {
						html: '<div class="track-l" /><div class="track-r" />'
					},

					bar: {
						html: '<div class="bar-l" /><div class="bar-r" />'
					}
				}
			});
});
*/
$(function () {
    $('.b-scroll-test').rScrollbar({
        trackV: {
            container: '#trackV'
        }
    });
});