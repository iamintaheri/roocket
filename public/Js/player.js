! function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Plyr", t) : e.Plyr = t()
}(this, function () {
	"use strict";
	var e, t = {
			html5: "html5",
			youtube: "youtube",
			vimeo: "vimeo"
		},
		i = {
			audio: "audio",
			video: "video"
		},
		n = {
			enabled: !0,
			title: "",
			debug: !1,
			autoplay: !1,
			autopause: !0,
			seekTime: 10,
			volume: 1,
			muted: !1,
			duration: null,
			displayDuration: !0,
			invertTime: !0,
			toggleInvert: !0,
			ratio: "16:9",
			clickToPlay: !0,
			hideControls: !0,
			showPosterOnEnd: !1,
			disableContextMenu: !0,
			loadSprite: !0,
			iconPrefix: "plyr",
			iconUrl: "https://cdn.plyr.io/3.0.1/plyr.svg",
			blankVideo: "https://cdn.plyr.io/static/blank.mp4",
			quality: {
				default: "default",
				options: ["hd2160", "hd1440", "hd1080", "hd720", "large", "medium", "small", "tiny", "default"]
			},
			loop: {
				active: !1
			},
			speed: {
				selected: 1,
				options: [.5, .75, 1, 1.25, 1.5, 1.75, 2]
			},
			keyboard: {
				focused: !0,
				global: !1
			},
			tooltips: {
				controls: !1,
				seek: !0
			},
			captions: {
				active: !1,
				language: window.navigator.language.split("-")[0]
			},
			fullscreen: {
				enabled: !0,
				fallback: !0,
				iosNative: !1
			},
			storage: {
				enabled: !0,
				key: "plyr"
			},
			controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
			settings: ["captions", "quality", "speed"],
			i18n: {
				restart: "Restart",
				rewind: "Rewind {seektime} secs",
				play: "Play",
				pause: "Pause",
				forward: "Forward {seektime} secs",
				seek: "Seek",
				played: "Played",
				buffered: "Buffered",
				currentTime: "Current time",
				duration: "Duration",
				volume: "Volume",
				mute: "Mute",
				unmute: "Unmute",
				enableCaptions: "Enable captions",
				disableCaptions: "Disable captions",
				enterFullscreen: "Enter fullscreen",
				exitFullscreen: "Exit fullscreen",
				frameTitle: "Player for {title}",
				captions: "Captions",
				settings: "Settings",
				speed: "Speed",
				quality: "Quality",
				loop: "Loop",
				start: "Start",
				end: "End",
				all: "All",
				reset: "Reset",
				none: "None",
				disabled: "Disabled",
				advertisement: "Ad"
			},
			urls: {
				vimeo: {
					api: "https://player.vimeo.com/api/player.js"
				},
				youtube: {
					api: "https://www.youtube.com/iframe_api"
				},
				googleIMA: {
					api: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
				}
			},
			listeners: {
				seek: null,
				play: null,
				pause: null,
				restart: null,
				rewind: null,
				forward: null,
				mute: null,
				volume: null,
				captions: null,
				fullscreen: null,
				pip: null,
				airplay: null,
				speed: null,
				quality: null,
				loop: null,
				language: null
			},
			events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "qualityrequested", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
			selectors: {
				editable: "input, textarea, select, [contenteditable]",
				container: ".plyr",
				controls: {
					container: null,
					wrapper: ".plyr__controls"
				},
				labels: "[data-plyr]",
				buttons: {
					play: '[data-plyr="play"]',
					pause: '[data-plyr="pause"]',
					restart: '[data-plyr="restart"]',
					rewind: '[data-plyr="rewind"]',
					forward: '[data-plyr="fast-forward"]',
					mute: '[data-plyr="mute"]',
					captions: '[data-plyr="captions"]',
					fullscreen: '[data-plyr="fullscreen"]',
					pip: '[data-plyr="pip"]',
					airplay: '[data-plyr="airplay"]',
					settings: '[data-plyr="settings"]',
					loop: '[data-plyr="loop"]'
				},
				inputs: {
					seek: '[data-plyr="seek"]',
					volume: '[data-plyr="volume"]',
					speed: '[data-plyr="speed"]',
					language: '[data-plyr="language"]',
					quality: '[data-plyr="quality"]'
				},
				display: {
					currentTime: ".plyr__time--current",
					duration: ".plyr__time--duration",
					buffer: ".plyr__progress--buffer",
					played: ".plyr__progress--played",
					loop: ".plyr__progress--loop",
					volume: ".plyr__volume--display"
				},
				progress: ".plyr__progress",
				captions: ".plyr__captions",
				menu: {
					quality: ".js-plyr__menu__list--quality"
				}
			},
			classNames: {
				video: "plyr__video-wrapper",
				embed: "plyr__video-embed",
				ads: "plyr__ads",
				control: "plyr__control",
				type: "plyr--{0}",
				provider: "plyr--{0}",
				stopped: "plyr--stopped",
				playing: "plyr--playing",
				loading: "plyr--loading",
				error: "plyr--has-error",
				hover: "plyr--hover",
				tooltip: "plyr__tooltip",
				cues: "plyr__cues",
				hidden: "plyr__sr-only",
				hideControls: "plyr--hide-controls",
				isIos: "plyr--is-ios",
				isTouch: "plyr--is-touch",
				uiSupported: "plyr--full-ui",
				noTransition: "plyr--no-transition",
				menu: {
					value: "plyr__menu__value",
					badge: "plyr__badge",
					open: "plyr--menu-open"
				},
				captions: {
					enabled: "plyr--captions-enabled",
					active: "plyr--captions-active"
				},
				fullscreen: {
					enabled: "plyr--fullscreen-enabled",
					fallback: "plyr--fullscreen-fallback"
				},
				pip: {
					supported: "plyr--pip-supported",
					active: "plyr--pip-active"
				},
				airplay: {
					supported: "plyr--airplay-supported",
					active: "plyr--airplay-active"
				},
				tabFocus: "plyr__tab-focus"
			},
			attributes: {
				embed: {
					provider: "data-plyr-provider",
					id: "data-plyr-embed-id"
				}
			},
			keys: {
				google: null
			},
			ads: {
				enabled: !1,
				publisherId: ""
			}
		},
		s = (function () {
			function e(e) {
				this.value = e
			}

			function t(t) {
				var i, n;

				function s(i, n) {
					try {
						var l = t[i](n),
							r = l.value;
						r instanceof e ? Promise.resolve(r.value).then(function (e) {
							s("next", e)
						}, function (e) {
							s("throw", e)
						}) : a(l.done ? "return" : "normal", l.value)
					} catch (e) {
						a("throw", e)
					}
				}

				function a(e, t) {
					switch (e) {
						case "return":
							i.resolve({
								value: t,
								done: !0
							});
							break;
						case "throw":
							i.reject(t);
							break;
						default:
							i.resolve({
								value: t,
								done: !1
							})
					}(i = i.next) ? s(i.key, i.arg): n = null
				}
				this._invoke = function (e, t) {
					return new Promise(function (a, l) {
						var r = {
							key: e,
							arg: t,
							resolve: a,
							reject: l,
							next: null
						};
						n ? n = n.next = r : (i = n = r, s(e, t))
					})
				}, "function" != typeof t.return && (this.return = void 0)
			}
			"function" == typeof Symbol && Symbol.asyncIterator && (t.prototype[Symbol.asyncIterator] = function () {
				return this
			}), t.prototype.next = function (e) {
				return this._invoke("next", e)
			}, t.prototype.throw = function (e) {
				return this._invoke("throw", e)
			}, t.prototype.return = function (e) {
				return this._invoke("return", e)
			}
		}(), function (e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}),
		a = function () {
			function e(e, t) {
				for (var i = 0; i < t.length; i++) {
					var n = t[i];
					n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
				}
			}
			return function (t, i, n) {
				return i && e(t.prototype, i), n && e(t, n), t
			}
		}(),
		l = function (e, t, i) {
			return t in e ? Object.defineProperty(e, t, {
				value: i,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = i, e
		},
		r = function () {
			return function (e, t) {
				if (Array.isArray(e)) return e;
				if (Symbol.iterator in Object(e)) return function (e, t) {
					var i = [],
						n = !0,
						s = !1,
						a = void 0;
					try {
						for (var l, r = e[Symbol.iterator](); !(n = (l = r.next()).done) && (i.push(l.value), !t || i.length !== t); n = !0);
					} catch (e) {
						s = !0, a = e
					} finally {
						try {
							!n && r.return && r.return()
						} finally {
							if (s) throw a
						}
					}
					return i
				}(e, t);
				throw new TypeError("Invalid attempt to destructure non-iterable instance")
			}
		}(),
		o = {
			is: {
				plyr: function (e) {
					return this.instanceof(e, window.Plyr)
				},
				object: function (e) {
					return this.getConstructor(e) === Object
				},
				number: function (e) {
					return this.getConstructor(e) === Number && !Number.isNaN(e)
				},
				string: function (e) {
					return this.getConstructor(e) === String
				},
				boolean: function (e) {
					return this.getConstructor(e) === Boolean
				},
				function: function (e) {
					return this.getConstructor(e) === Function
				},
				array: function (e) {
					return !this.nullOrUndefined(e) && Array.isArray(e)
				},
				weakMap: function (e) {
					return this.instanceof(e, window.WeakMap)
				},
				nodeList: function (e) {
					return this.instanceof(e, window.NodeList)
				},
				element: function (e) {
					return this.instanceof(e, window.Element)
				},
				textNode: function (e) {
					return this.getConstructor(e) === Text
				},
				event: function (e) {
					return this.instanceof(e, window.Event)
				},
				cue: function (e) {
					return this.instanceof(e, window.TextTrackCue) || this.instanceof(e, window.VTTCue)
				},
				track: function (e) {
					return this.instanceof(e, TextTrack) || !this.nullOrUndefined(e) && this.string(e.kind)
				},
				url: function (e) {
					return !this.nullOrUndefined(e) && /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(e)
				},
				nullOrUndefined: function (e) {
					return null === e || void 0 === e
				},
				empty: function (e) {
					return this.nullOrUndefined(e) || (this.string(e) || this.array(e) || this.nodeList(e)) && !e.length || this.object(e) && !Object.keys(e).length
				},
				instanceof: function (e, t) {
					return Boolean(e && t && e instanceof t)
				},
				getConstructor: function (e) {
					return this.nullOrUndefined(e) ? null : e.constructor
				}
			},
			getBrowser: function () {
				return {
					isIE: !!document.documentMode,
					isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
					isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
					isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
				}
			},
			fetch: function (e) {
				var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
				return new Promise(function (i, n) {
					try {
						var s = new XMLHttpRequest;
						if (!("withCredentials" in s)) return;
						s.addEventListener("load", function () {
							if ("text" === t) try {
								i(JSON.parse(s.responseText))
							} catch (e) {
								i(s.responseText)
							} else i(s.response)
						}), s.addEventListener("error", function () {
							throw new Error(s.statusText)
						}), s.open("GET", e, !0), s.responseType = t, s.send()
					} catch (e) {
						n(e)
					}
				})
			},
			loadScript: function (e) {
				return new Promise(function (t, i) {
					var n = document.querySelector('script[src="' + e + '"]');
					if (null !== n) return n.callbacks = n.callbacks || [], void n.callbacks.push(t);
					var s = document.createElement("script");
					s.callbacks = s.callbacks || [], s.callbacks.push(t), s.errors = s.errors || [], s.errors.push(i), s.addEventListener("load", function (e) {
						s.callbacks.forEach(function (t) {
							return t.call(null, e)
						}), s.callbacks = null
					}, !1), s.addEventListener("error", function (e) {
						s.errors.forEach(function (t) {
							return t.call(null, e)
						}), s.errors = null
					}, !1), s.src = e;
					var a = document.getElementsByTagName("script")[0];
					a.parentNode.insertBefore(s, a)
				})
			},
			loadSprite: function (e, t) {
				if (o.is.string(e)) {
					var i = o.is.string(t);
					if (!i || !document.querySelectorAll("#" + t).length) {
						var n = document.createElement("div");
						if (o.toggleHidden(n, !0), i && n.setAttribute("id", t), c.storage) {
							var s = window.localStorage.getItem("cache-" + t);
							if (null !== s) {
								var a = JSON.parse(s);
								return void l.call(n, a.content)
							}
						}
						o.fetch(e).then(function (e) {
							o.is.empty(e) || (c.storage && window.localStorage.setItem("cache-" + t, JSON.stringify({
								content: e
							})), l.call(n, e))
						}).catch(function () {})
					}
				}

				function l(e) {
					this.innerHTML = e, document.body.insertBefore(this, document.body.childNodes[0])
				}
			},
			generateId: function (e) {
				return e + "-" + Math.floor(1e4 * Math.random())
			},
			inFrame: function () {
				try {
					return window.self !== window.top
				} catch (e) {
					return !0
				}
			},
			wrap: function (e, t) {
				var i = e.length ? e : [e];
				Array.from(i).reverse().forEach(function (e, i) {
					var n = i > 0 ? t.cloneNode(!0) : t,
						s = e.parentNode,
						a = e.nextSibling;
					n.appendChild(e), a ? s.insertBefore(n, a) : s.appendChild(n)
				})
			},
			createElement: function (e, t, i) {
				var n = document.createElement(e);
				return o.is.object(t) && o.setAttributes(n, t), o.is.string(i) && (n.textContent = i), n
			},
			insertAfter: function (e, t) {
				t.parentNode.insertBefore(e, t.nextSibling)
			},
			insertElement: function (e, t, i, n) {
				t.appendChild(o.createElement(e, i, n))
			},
			removeElement: function (e) {
				o.is.element(e) && o.is.element(e.parentNode) && (o.is.nodeList(e) || o.is.array(e) ? Array.from(e).forEach(o.removeElement) : e.parentNode.removeChild(e))
			},
			emptyElement: function (e) {
				for (var t = e.childNodes.length; t > 0;) e.removeChild(e.lastChild), t -= 1
			},
			replaceElement: function (e, t) {
				return o.is.element(t) && o.is.element(t.parentNode) && o.is.element(e) ? (t.parentNode.replaceChild(e, t), e) : null
			},
			setAttributes: function (e, t) {
				o.is.element(e) && !o.is.empty(t) && Object.keys(t).forEach(function (i) {
					e.setAttribute(i, t[i])
				})
			},
			getAttributesFromSelector: function (e, t) {
				if (!o.is.string(e) || o.is.empty(e)) return {};
				var i = {},
					n = t;
				return e.split(",").forEach(function (e) {
					var t = e.trim(),
						s = t.replace(".", ""),
						a = t.replace(/[[\]]/g, "").split("="),
						l = a[0],
						r = a.length > 1 ? a[1].replace(/["']/g, "") : "";
					switch (t.charAt(0)) {
						case ".":
							o.is.object(n) && o.is.string(n.class) && (n.class += " " + s), i.class = s;
							break;
						case "#":
							i.id = t.replace("#", "");
							break;
						case "[":
							i[l] = r
					}
				}), i
			},
			toggleClass: function (e, t, i) {
				if (o.is.element(e)) {
					var n = e.classList.contains(t);
					return e.classList[i ? "add" : "remove"](t), i && !n || !i && n
				}
				return null
			},
			hasClass: function (e, t) {
				return o.is.element(e) && e.classList.contains(t)
			},
			toggleHidden: function (e, t) {
				o.is.element(e) && (t ? e.setAttribute("hidden", "") : e.removeAttribute("hidden"))
			},
			matches: function (e, t) {
				var i = {
					Element: Element
				};
				var n = i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function () {
					return Array.from(document.querySelectorAll(t)).includes(this)
				};
				return n.call(e, t)
			},
			getElements: function (e) {
				return this.elements.container.querySelectorAll(e)
			},
			getElement: function (e) {
				return this.elements.container.querySelector(e)
			},
			findElements: function () {
				try {
					return this.elements.controls = o.getElement.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
						play: o.getElements.call(this, this.config.selectors.buttons.play),
						pause: o.getElement.call(this, this.config.selectors.buttons.pause),
						restart: o.getElement.call(this, this.config.selectors.buttons.restart),
						rewind: o.getElement.call(this, this.config.selectors.buttons.rewind),
						forward: o.getElement.call(this, this.config.selectors.buttons.forward),
						mute: o.getElement.call(this, this.config.selectors.buttons.mute),
						pip: o.getElement.call(this, this.config.selectors.buttons.pip),
						airplay: o.getElement.call(this, this.config.selectors.buttons.airplay),
						settings: o.getElement.call(this, this.config.selectors.buttons.settings),
						captions: o.getElement.call(this, this.config.selectors.buttons.captions),
						fullscreen: o.getElement.call(this, this.config.selectors.buttons.fullscreen)
					}, this.elements.progress = o.getElement.call(this, this.config.selectors.progress), this.elements.inputs = {
						seek: o.getElement.call(this, this.config.selectors.inputs.seek),
						volume: o.getElement.call(this, this.config.selectors.inputs.volume)
					}, this.elements.display = {
						buffer: o.getElement.call(this, this.config.selectors.display.buffer),
						duration: o.getElement.call(this, this.config.selectors.display.duration),
						currentTime: o.getElement.call(this, this.config.selectors.display.currentTime)
					}, o.is.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector("." + this.config.classNames.tooltip)), !0
				} catch (e) {
					return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1
				}
			},
			getFocusElement: function () {
				var e = document.activeElement;
				return e = e && e !== document.body ? document.querySelector(":focus") : null
			},
			trapFocus: function () {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
					t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
				if (o.is.element(e)) {
					var i = o.getElements.call(this, "button:not(:disabled), input:not(:disabled), [tabindex]"),
						n = i[0],
						s = i[i.length - 1],
						a = function (e) {
							if ("Tab" === e.key && 9 === e.keyCode) {
								var t = o.getFocusElement();
								t !== s || e.shiftKey ? t === n && e.shiftKey && (s.focus(), e.preventDefault()) : (n.focus(), e.preventDefault())
							}
						};
					t ? o.on(this.elements.container, "keydown", a, !1) : o.off(this.elements.container, "keydown", a, !1)
				}
			},
			toggleListener: function (e, t, i, n, s, a) {
				if (!o.is.empty(e) && !o.is.empty(t) && o.is.function(i))
					if (o.is.nodeList(e) || o.is.array(e)) Array.from(e).forEach(function (e) {
						e instanceof Node && o.toggleListener.call(null, e, t, i, n, s, a)
					});
					else {
						var l = t.split(" "),
							r = !!o.is.boolean(a) && a;
						c.passiveListeners && (r = {
							passive: !o.is.boolean(s) || s,
							capture: !!o.is.boolean(a) && a
						}), l.forEach(function (t) {
							e[n ? "addEventListener" : "removeEventListener"](t, i, r)
						})
					}
			},
			on: function (e, t, i, n, s) {
				o.toggleListener(e, t, i, !0, n, s)
			},
			off: function (e, t, i, n, s) {
				o.toggleListener(e, t, i, !1, n, s)
			},
			dispatchEvent: function (e, t, i, n) {
				if (o.is.element(e) && o.is.string(t)) {
					var s = new CustomEvent(t, {
						bubbles: !!o.is.boolean(i) && i,
						detail: Object.assign({}, n, {
							plyr: o.is.plyr(this) ? this : null
						})
					});
					e.dispatchEvent(s)
				}
			},
			toggleState: function (e, t) {
				if (o.is.array(e) || o.is.nodeList(e)) Array.from(e).forEach(function (e) {
					return o.toggleState(e, t)
				});
				else if (o.is.element(e)) {
					var i = "true" === e.getAttribute("aria-pressed"),
						n = o.is.boolean(t) ? t : !i;
					e.setAttribute("aria-pressed", n)
				}
			},
			getPercentage: function (e, t) {
				return 0 === e || 0 === t || Number.isNaN(e) || Number.isNaN(t) ? 0 : (e / t * 100).toFixed(2)
			},
			getHours: function (e) {
				return parseInt(e / 60 / 60 % 60, 10)
			},
			getMinutes: function (e) {
				return parseInt(e / 60 % 60, 10)
			},
			getSeconds: function (e) {
				return parseInt(e % 60, 10)
			},
			formatTime: function () {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
					t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
					i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
				if (!o.is.number(e)) return this.formatTime(null, t, i);
				var n = function (e) {
						return ("0" + e).slice(-2)
					},
					s = this.getHours(e),
					a = this.getMinutes(e),
					l = this.getSeconds(e);
				return t || s > 0 ? s += ":" : s = "", (i ? "-" : "") + s + n(a) + ":" + n(l)
			},
			extend: function () {
				for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
				if (!i.length) return e;
				var s = i.shift();
				return o.is.object(s) ? (Object.keys(s).forEach(function (t) {
					o.is.object(s[t]) ? (Object.keys(e).includes(t) || Object.assign(e, l({}, t, {})), o.extend(e[t], s[t])) : Object.assign(e, l({}, t, s[t]))
				}), o.extend.apply(o, [e].concat(function (e) {
					if (Array.isArray(e)) {
						for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
						return i
					}
					return Array.from(e)
				}(i)))) : e
			},
			getProviderByUrl: function (e) {
				return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(e) ? t.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{8,}(?=\b|\/)/.test(e) ? t.vimeo : null
			},
			parseYouTubeId: function (e) {
				if (o.is.empty(e)) return null;
				return e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : e
			},
			parseVimeoId: function (e) {
				if (o.is.empty(e)) return null;
				if (o.is.number(Number(e))) return e;
				return e.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : e
			},
			parseUrl: function (e) {
				var t = document.createElement("a");
				return t.href = e, t
			},
			getUrlParams: function (e) {
				var t = e;
				(e.startsWith("http://") || e.startsWith("https://")) && (t = this.parseUrl(e).search);
				return this.is.empty(t) ? null : t.slice(t.indexOf("?") + 1).split("&").reduce(function (e, t) {
					var i = t.split("="),
						n = r(i, 2),
						s = n[0],
						a = n[1];
					return Object.assign(e, l({}, s, decodeURIComponent(a)))
				}, {})
			},
			buildUrlParams: function (e) {
				return o.is.object(e) ? Object.keys(e).map(function (t) {
					return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
				}).join("&") : ""
			},
			stripHTML: function (e) {
				var t = document.createDocumentFragment(),
					i = document.createElement("div");
				return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText
			},
			getAspectRatio: function (e, t) {
				var i = function e(t, i) {
					return 0 === i ? t : e(i, t % i)
				}(e, t);
				return e / i + ":" + t / i
			},
			get transitionEndEvent() {
				var e = document.createElement("span"),
					t = {
						WebkitTransition: "webkitTransitionEnd",
						MozTransition: "transitionend",
						OTransition: "oTransitionEnd otransitionend",
						transition: "transitionend"
					},
					i = Object.keys(t).find(function (t) {
						return void 0 !== e.style[t]
					});
				return !!o.is.string(i) && t[i]
			},
			repaint: function (e) {
				setTimeout(function () {
					o.toggleHidden(e, !0), e.offsetHeight, o.toggleHidden(e, !1)
				}, 0)
			}
		},
		c = {
			audio: "canPlayType" in document.createElement("audio"),
			video: "canPlayType" in document.createElement("video"),
			check: function (e, t, i) {
				var n = !1,
					s = !1,
					a = o.getBrowser(),
					l = a.isIPhone && i && c.inline;
				switch (t + ":" + e) {
					case "html5:video":
						s = (n = c.video) && c.rangeInput && (!a.isIPhone || l);
						break;
					case "html5:audio":
						s = (n = c.audio) && c.rangeInput;
						break;
					case "youtube:video":
					case "vimeo:video":
						n = !0, s = c.rangeInput && (!a.isIPhone || l);
						break;
					default:
						s = (n = c.audio && c.video) && c.rangeInput
				}
				return {
					api: n,
					ui: s
				}
			},
			pip: !o.getBrowser().isIPhone && o.is.function(o.createElement("video").webkitSetPresentationMode),
			airplay: o.is.function(window.WebKitPlaybackTargetAvailabilityEvent),
			inline: "playsInline" in document.createElement("video"),
			mime: function (e) {
				var t = this.media;
				try {
					if (!this.isHTML5 || !o.is.function(t.canPlayType)) return !1;
					if (this.isVideo) switch (e) {
						case "video/webm":
							return t.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, "");
						case "video/mp4":
							return t.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/, "");
						case "video/ogg":
							return t.canPlayType('video/ogg; codecs="theora"').replace(/no/, "");
						default:
							return !1
					} else if (this.isAudio) switch (e) {
						case "audio/mpeg":
							return t.canPlayType("audio/mpeg;").replace(/no/, "");
						case "audio/ogg":
							return t.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, "");
						case "audio/wav":
							return t.canPlayType('audio/wav; codecs="1"').replace(/no/, "");
						default:
							return !1
					}
				} catch (e) {
					return !1
				}
				return !1
			},
			textTracks: "textTracks" in document.createElement("video"),
			passiveListeners: function () {
				var e = !1;
				try {
					var t = Object.defineProperty({}, "passive", {
						get: function () {
							return e = !0, null
						}
					});
					window.addEventListener("test", null, t)
				} catch (e) {}
				return e
			}(),
			rangeInput: (e = document.createElement("input"), e.type = "range", "range" === e.type),
			touch: "ontouchstart" in document.documentElement,
			transitions: !1 !== o.transitionEndEvent,
			reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
		},
		u = function () {},
		d = function () {
			function e() {
				var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
				s(this, e), this.enabled = window.console && t, this.enabled && this.log("Debugging enabled")
			}
			return a(e, [{
				key: "log",
				get: function () {
					return this.enabled ? Function.prototype.bind.call(console.log, console) : u
				}
			}, {
				key: "warn",
				get: function () {
					return this.enabled ? Function.prototype.bind.call(console.warn, console) : u
				}
			}, {
				key: "error",
				get: function () {
					return this.enabled ? Function.prototype.bind.call(console.error, console) : u
				}
			}]), e
		}(),
		p = o.getBrowser();

	function h() {
		if (this.enabled) {
			var e = this.player.elements.buttons.fullscreen;
			o.is.element(e) && o.toggleState(e, this.active), o.dispatchEvent(this.target, this.active ? "enterfullscreen" : "exitfullscreen", !0), p.isIos || o.trapFocus.call(this.player, this.target, this.active)
		}
	}

	function m() {
		var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
		e ? this.scrollPosition = {
			x: window.scrollX || 0,
			y: window.scrollY || 0
		} : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", o.toggleClass(this.target, this.player.config.classNames.fullscreen.fallback, e), h.call(this)
	}
	var g = function () {
			function e(t) {
				var i = this;
				s(this, e), this.player = t, this.prefix = e.prefix, this.scrollPosition = {
					x: 0,
					y: 0
				}, o.on(document, "ms" === this.prefix ? "MSFullscreenChange" : this.prefix + "fullscreenchange", function () {
					h.call(i)
				}), o.on(this.player.elements.container, "dblclick", function () {
					i.toggle()
				}), o.on(this.player.elements.controls, "dblclick", function (e) {
					return e.stopPropagation()
				}), this.update()
			}
			return a(e, [{
				key: "update",
				value: function () {
					this.enabled ? this.player.debug.log((e.native ? "Native" : "Fallback") + " fullscreen enabled") : this.player.debug.log("Fullscreen not supported and fallback disabled"), o.toggleClass(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled)
				}
			}, {
				key: "enter",
				value: function () {
					this.enabled && (p.isIos && this.player.config.fullscreen.iosNative ? this.player.playing && this.target.webkitEnterFullscreen() : e.native ? this.prefix ? o.is.empty(this.prefix) || this.target[this.prefix + ("ms" === this.prefix ? "RequestFullscreen" : "RequestFullScreen")]() : this.target.requestFullScreen() : m.call(this, !0))
				}
			}, {
				key: "exit",
				value: function () {
					this.enabled && (p.isIos && this.player.config.fullscreen.iosNative ? (this.target.webkitExitFullscreen(), this.player.play()) : e.native ? this.prefix ? o.is.empty(this.prefix) || document[this.prefix + ("ms" === this.prefix ? "ExitFullscreen" : "CancelFullScreen")]() : document.cancelFullScreen() : m.call(this, !1))
				}
			}, {
				key: "toggle",
				value: function () {
					this.active ? this.exit() : this.enter()
				}
			}, {
				key: "enabled",
				get: function () {
					var t = this.player.config.fullscreen.fallback && !o.inFrame();
					return (e.native || t) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo
				}
			}, {
				key: "active",
				get: function () {
					return !!this.enabled && (e.native ? (this.prefix ? document[this.prefix + "FullscreenElement"] : document.fullscreenElement) === this.target : o.hasClass(this.target, this.player.config.classNames.fullscreen.fallback))
				}
			}, {
				key: "target",
				get: function () {
					return p.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.container
				}
			}], [{
				key: "native",
				get: function () {
					return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
				}
			}, {
				key: "prefix",
				get: function () {
					if (o.is.function(document.cancelFullScreen)) return !1;
					var e = "";
					return ["webkit", "moz", "ms"].some(function (t) {
						return o.is.function(document[t + "CancelFullScreen"]) ? (e = t, !0) : !!o.is.function(document.msExitFullscreen) && (e = "ms", !0)
					}), e
				}
			}]), e
		}(),
		f = {
			setup: function () {
				if (this.supported.ui) {
					var e = this.storage.get("language");
					if (o.is.empty(e) || (this.captions.language = e), o.is.empty(this.captions.language) && (this.captions.language = this.config.captions.language.toLowerCase()), !o.is.boolean(this.captions.active)) {
						var t = this.storage.get("captions");
						o.is.boolean(t) ? this.captions.active = t : this.captions.active = this.config.captions.active
					}
					if (!this.isVideo || this.isYouTube || this.isHTML5 && !c.textTracks) o.is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && b.setCaptionsMenu.call(this);
					else {
						o.is.element(this.elements.captions) || (this.elements.captions = o.createElement("div", o.getAttributesFromSelector(this.config.selectors.captions)), o.insertAfter(this.elements.captions, this.elements.wrapper)), o.toggleClass(this.elements.container, this.config.classNames.captions.enabled, !o.is.empty(f.getTracks.call(this)));
						var i = f.getTracks.call(this);
						if (!o.is.empty(i)) {
							if (o.getBrowser().isIE && window.URL) {
								var n = this.media.querySelectorAll("track");
								Array.from(n).forEach(function (e) {
									var t = e.getAttribute("src"),
										i = o.parseUrl(t);
									i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && o.fetch(t, "blob").then(function (t) {
										e.setAttribute("src", window.URL.createObjectURL(t))
									}).catch(function () {
										o.removeElement(e)
									})
								})
							}
							f.setLanguage.call(this), f.show.call(this), o.is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && b.setCaptionsMenu.call(this)
						}
					}
				}
			},
			setLanguage: function () {
				var e = this;
				if (this.isHTML5 && this.isVideo) {
					f.getTracks.call(this).forEach(function (t) {
						o.on(t, "cuechange", function (t) {
							return f.setCue.call(e, t)
						}), t.mode = "hidden"
					});
					var t = f.getCurrentTrack.call(this);
					o.is.track(t) && Array.from(t.activeCues || []).length && f.setCue.call(this, t)
				} else this.isVimeo && this.captions.active && this.embed.enableTextTrack(this.language)
			},
			getTracks: function () {
				return o.is.nullOrUndefined(this.media) ? [] : Array.from(this.media.textTracks || []).filter(function (e) {
					return ["captions", "subtitles"].includes(e.kind)
				})
			},
			getCurrentTrack: function () {
				var e = this;
				return f.getTracks.call(this).find(function (t) {
					return t.language.toLowerCase() === e.language
				})
			},
			setCue: function (e) {
				var t = o.is.event(e) ? e.target : e,
					i = t.activeCues,
					n = i.length && i[0];
				t === f.getCurrentTrack.call(this) && (o.is.cue(n) ? f.setText.call(this, n.getCueAsHTML()) : f.setText.call(this, null), o.dispatchEvent.call(this, this.media, "cuechange"))
			},
			setText: function (e) {
				if (this.supported.ui)
					if (o.is.element(this.elements.captions)) {
						var t = o.createElement("span");
						o.emptyElement(this.elements.captions);
						var i = o.is.nullOrUndefined(e) ? "" : e;
						o.is.string(i) ? t.textContent = i.trim() : t.appendChild(i), this.elements.captions.appendChild(t)
					} else this.debug.warn("No captions element to render to")
			},
			show: function () {
				if (o.is.element(this.elements.buttons.captions)) {
					var e = this.storage.get("captions");
					o.is.boolean(e) ? this.captions.active = e : e = this.config.captions.active, e && (o.toggleClass(this.elements.container, this.config.classNames.captions.active, !0), o.toggleState(this.elements.buttons.captions, !0))
				}
			}
		},
		y = {
			addStyleHook: function () {
				o.toggleClass(this.elements.container, this.config.selectors.container.replace(".", ""), !0), o.toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui)
			},
			toggleNativeControls: function () {
				arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls")
			},
			build: function () {
				var e = this;
				if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for " + this.provider + " " + this.type), void y.toggleNativeControls.call(this, !0);
				o.is.element(this.elements.controls) || (b.inject.call(this), this.listeners.controls()), o.is.element(this.elements.controls) && (y.toggleNativeControls.call(this), f.setup.call(this), this.volume = null, this.muted = null, this.speed = null, this.loop = null, this.options.quality = [], y.timeUpdate.call(this), y.checkPlaying.call(this), this.ready = !0, setTimeout(function () {
					o.dispatchEvent.call(e, e.media, "ready")
				}, 0), y.setTitle.call(this))
			},
			setTitle: function () {
				var e = this.config.i18n.play;
				if (o.is.string(this.config.title) && !o.is.empty(this.config.title) && (e += ", " + this.config.title, this.elements.container.setAttribute("aria-label", this.config.title)), o.is.nodeList(this.elements.buttons.play) && Array.from(this.elements.buttons.play).forEach(function (t) {
						t.setAttribute("aria-label", e)
					}), this.isEmbed) {
					var t = o.getElement.call(this, "iframe");
					if (!o.is.element(t)) return;
					var i = o.is.empty(this.config.title) ? "video" : this.config.title;
					t.setAttribute("title", this.config.i18n.frameTitle.replace("{title}", i))
				}
			},
			checkPlaying: function () {
				o.toggleClass(this.elements.container, this.config.classNames.playing, this.playing), o.toggleClass(this.elements.container, this.config.classNames.stopped, this.paused), o.toggleState(this.elements.buttons.play, this.playing), this.toggleControls(!this.playing)
			},
			checkLoading: function (e) {
				var t = this;
				this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(function () {
					o.toggleClass(t.elements.container, t.config.classNames.loading, t.loading), t.toggleControls(t.loading)
				}, this.loading ? 250 : 0)
			},
			checkFailed: function () {
				var e = this;
				this.failed = 3 === this.media.networkState, this.failed && (o.toggleClass(this.elements.container, this.config.classNames.loading, !1), o.toggleClass(this.elements.container, this.config.classNames.error, !0)), clearTimeout(this.timers.failed), this.timers.loading = setTimeout(function () {
					o.toggleClass(e.elements.container, e.config.classNames.loading, e.loading), e.toggleControls(e.loading)
				}, this.loading ? 250 : 0)
			},
			updateVolume: function () {
				this.supported.ui && (o.is.element(this.elements.inputs.volume) && y.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), o.is.element(this.elements.buttons.mute) && o.toggleState(this.elements.buttons.mute, this.muted || 0 === this.volume))
			},
			setRange: function (e) {
				var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
				o.is.element(e) && (e.value = t, b.updateRangeFill.call(this, e))
			},
			setProgress: function (e, t) {
				var i = o.is.number(t) ? t : 0,
					n = o.is.element(e) ? e : this.elements.display.buffer;
				if (o.is.element(n)) {
					n.value = i;
					var s = n.getElementsByTagName("span")[0];
					o.is.element(s) && (s.childNodes[0].nodeValue = i)
				}
			},
			updateProgress: function (e) {
				if (this.supported.ui && o.is.event(e)) {
					var t = 0;
					if (e) switch (e.type) {
						case "timeupdate":
						case "seeking":
							t = o.getPercentage(this.currentTime, this.duration), "timeupdate" === e.type && y.setRange.call(this, this.elements.inputs.seek, t);
							break;
						case "playing":
						case "progress":
							y.setProgress.call(this, this.elements.display.buffer, 100 * this.buffered)
					}
				}
			},
			updateTimeDisplay: function () {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
					t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
					i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
				if (o.is.element(e) && o.is.number(t)) {
					var n = o.getHours(this.duration) > 0;
					e.textContent = o.formatTime(t, n, i)
				}
			},
			timeUpdate: function (e) {
				var t = !o.is.element(this.elements.display.duration) && this.config.invertTime;
				y.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || y.updateProgress.call(this, e)
			},
			durationUpdate: function () {
				if (this.supported.ui) {
					var e = o.is.element(this.elements.display.duration);
					!e && this.config.displayDuration && this.paused && y.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && y.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), b.updateSeekTooltip.call(this)
				}
			}
		},
		v = o.getBrowser(),
		b = {
			updateRangeFill: function (e) {
				if (v.isWebkit) {
					var t = o.is.event(e) ? e.target : e;
					o.is.element(t) && "range" === t.getAttribute("type") && t.style.setProperty("--value", t.value / t.max * 100 + "%")
				}
			},
			getIconUrl: function () {
				return {
					url: this.config.iconUrl,
					absolute: 0 === this.config.iconUrl.indexOf("http") || v.isIE && !window.svg4everybody
				}
			},
			createIcon: function (e, t) {
				var i = b.getIconUrl.call(this),
					n = (i.absolute ? "" : i.url) + "#" + this.config.iconPrefix,
					s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				o.setAttributes(s, o.extend(t, {
					role: "presentation"
				}));
				var a = document.createElementNS("http://www.w3.org/2000/svg", "use"),
					l = n + "-" + e;
				return "href" in a ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", l) : a.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l), s.appendChild(a), s
			},
			createLabel: function (e, t) {
				var i = this.config.i18n[e],
					n = Object.assign({}, t);
				switch (e) {
					case "pip":
						i = "PIP";
						break;
					case "airplay":
						i = "AirPlay"
				}
				return "class" in n ? n.class += " " + this.config.classNames.hidden : n.class = this.config.classNames.hidden, o.createElement("span", n, i)
			},
			createBadge: function (e) {
				if (o.is.empty(e)) return null;
				var t = o.createElement("span", {
					class: this.config.classNames.menu.value
				});
				return t.appendChild(o.createElement("span", {
					class: this.config.classNames.menu.badge
				}, e)), t
			},
			createButton: function (e, t) {
				var i = o.createElement("button"),
					n = Object.assign({}, t),
					s = e,
					a = !1,
					l = void 0,
					r = void 0,
					c = void 0,
					u = void 0;
				switch ("type" in n || (n.type = "button"), "class" in n ? n.class.includes(this.config.classNames.control) && (n.class += " " + this.config.classNames.control) : n.class = this.config.classNames.control, s) {
					case "play":
						a = !0, l = "play", c = "pause", r = "play", u = "pause";
						break;
					case "mute":
						a = !0, l = "mute", c = "unmute", r = "volume", u = "muted";
						break;
					case "captions":
						a = !0, l = "enableCaptions", c = "disableCaptions", r = "captions-off", u = "captions-on";
						break;
					case "fullscreen":
						a = !0, l = "enterFullscreen", c = "exitFullscreen", r = "enter-fullscreen", u = "exit-fullscreen";
						break;
					case "play-large":
						n.class += " " + this.config.classNames.control + "--overlaid", s = "play", l = "play", r = "play";
						break;
					default:
						l = s, r = s
				}
				return a ? (i.appendChild(b.createIcon.call(this, u, {
					class: "icon--pressed"
				})), i.appendChild(b.createIcon.call(this, r, {
					class: "icon--not-pressed"
				})), i.appendChild(b.createLabel.call(this, c, {
					class: "label--pressed"
				})), i.appendChild(b.createLabel.call(this, l, {
					class: "label--not-pressed"
				})), n["aria-pressed"] = !1, n["aria-label"] = this.config.i18n[l]) : (i.appendChild(b.createIcon.call(this, r)), i.appendChild(b.createLabel.call(this, l))), o.extend(n, o.getAttributesFromSelector(this.config.selectors.buttons[s], n)), o.setAttributes(i, n), "play" === s ? (o.is.array(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(i)) : this.elements.buttons[s] = i, i
			},
			createRange: function (e, t) {
				var i = o.createElement("label", {
						for: t.id,
						class: this.config.classNames.hidden
					}, this.config.i18n[e]),
					n = o.createElement("input", o.extend(o.getAttributesFromSelector(this.config.selectors.inputs[e]), {
						type: "range",
						min: 0,
						max: 100,
						step: .01,
						value: 0,
						autocomplete: "off"
					}, t));
				return this.elements.inputs[e] = n, b.updateRangeFill.call(this, n), {
					label: i,
					input: n
				}
			},
			createProgress: function (e, t) {
				var i = o.createElement("progress", o.extend(o.getAttributesFromSelector(this.config.selectors.display[e]), {
					min: 0,
					max: 100,
					value: 0
				}, t));
				if ("volume" !== e) {
					i.appendChild(o.createElement("span", null, "0"));
					var n = "";
					switch (e) {
						case "played":
							n = this.config.i18n.played;
							break;
						case "buffer":
							n = this.config.i18n.buffered
					}
					i.textContent = "% " + n.toLowerCase()
				}
				return this.elements.display[e] = i, i
			},
			createTime: function (e) {
				var t = o.createElement("div", {
					class: "plyr__time"
				});
				return t.appendChild(o.createElement("span", {
					class: this.config.classNames.hidden
				}, this.config.i18n[e])), t.appendChild(o.createElement("span", o.getAttributesFromSelector(this.config.selectors.display[e]), "00:00")), this.elements.display[e] = t, t
			},
			createMenuItem: function (e, t, i, n) {
				var s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null,
					a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5],
					l = o.createElement("li"),
					r = o.createElement("label", {
						class: this.config.classNames.control
					}),
					c = o.createElement("input", o.extend(o.getAttributesFromSelector(this.config.selectors.inputs[i]), {
						type: "radio",
						name: "plyr-" + i,
						value: e,
						checked: a,
						class: "plyr__sr-only"
					})),
					u = o.createElement("span", {
						"aria-hidden": !0
					});
				r.appendChild(c), r.appendChild(u), r.insertAdjacentHTML("beforeend", n), o.is.element(s) && r.appendChild(s), l.appendChild(r), t.appendChild(l)
			},
			updateSeekTooltip: function (e) {
				if (this.config.tooltips.seek && o.is.element(this.elements.inputs.seek) && o.is.element(this.elements.display.seekTooltip) && 0 !== this.duration) {
					var t = 0,
						i = this.elements.inputs.seek.getBoundingClientRect(),
						n = this.config.classNames.tooltip + "--visible";
					if (o.is.event(e)) t = 100 / i.width * (e.pageX - i.left);
					else {
						if (!o.hasClass(this.elements.display.seekTooltip, n)) return;
						t = parseFloat(this.elements.display.seekTooltip.style.left, 10)
					}
					t < 0 ? t = 0 : t > 100 && (t = 100), y.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * t), this.elements.display.seekTooltip.style.left = t + "%", o.is.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && o.toggleClass(this.elements.display.seekTooltip, n, "mouseenter" === e.type)
				}
			},
			toggleTab: function (e, t) {
				var i = this.elements.settings.tabs[e],
					n = this.elements.settings.panes[e];
				o.toggleHidden(i, !t), o.toggleHidden(n, !t)
			},
			setQualityMenu: function (e) {
				var t = this;
				if (o.is.element(this.elements.settings.panes.quality)) {
					var i = this.elements.settings.panes.quality.querySelector("ul");
					o.is.array(e) ? this.options.quality = e.filter(function (e) {
						return t.config.quality.options.includes(e)
					}) : this.options.quality = this.config.quality.options;
					var n = !o.is.empty(this.options.quality) && this.isYouTube;
					if (b.toggleTab.call(this, "quality", n), n) {
						o.emptyElement(i);
						this.options.quality.forEach(function (e) {
							return b.createMenuItem.call(t, e, i, "quality", b.getLabel.call(t, "quality", e), function (e) {
								var i = "";
								switch (e) {
									case "hd2160":
										i = "4K";
										break;
									case "hd1440":
										i = "WQHD";
										break;
									case "hd1080":
									case "hd720":
										i = "HD"
								}
								return i.length ? b.createBadge.call(t, i) : null
							}(e))
						}), b.updateSetting.call(this, "quality", i)
					}
				}
			},
			getLabel: function (e, t) {
				switch (e) {
					case "speed":
						return 1 === t ? "Normal" : t + "×";
					case "quality":
						switch (t) {
							case "hd2160":
								return "2160P";
							case "hd1440":
								return "1440P";
							case "hd1080":
								return "1080P";
							case "hd720":
								return "720P";
							case "large":
								return "480P";
							case "medium":
								return "360P";
							case "small":
								return "240P";
							case "tiny":
								return "Tiny";
							case "default":
								return "Auto";
							default:
								return t
						}
					case "captions":
						return b.getLanguage.call(this);
					default:
						return null
				}
			},
			updateSetting: function (e, t) {
				var i = this.elements.settings.panes[e],
					n = null,
					s = t;
				switch (e) {
					case "captions":
						n = this.captions.active ? this.captions.language : "";
						break;
					default:
						if (n = this[e], o.is.empty(n) && (n = this.config[e].default), !this.options[e].includes(n)) return void this.debug.warn("Unsupported value of '" + n + "' for " + e);
						if (!this.config[e].options.includes(n)) return void this.debug.warn("Disabled value of '" + n + "' for " + e)
				}(o.is.element(s) || (s = i && i.querySelector("ul")), o.is.empty(n)) || (this.elements.settings.tabs[e].querySelector("." + this.config.classNames.menu.value).innerHTML = b.getLabel.call(this, e, n));
				var a = s && s.querySelector('input[value="' + n + '"]');
				o.is.element(a) && (a.checked = !0)
			},
			getLanguage: function () {
				if (!this.supported.ui) return null;
				if (!c.textTracks || !f.getTracks.call(this).length) return this.config.i18n.none;
				if (this.captions.active) {
					var e = f.getCurrentTrack.call(this);
					if (o.is.track(e)) return e.label
				}
				return this.config.i18n.disabled
			},
			setCaptionsMenu: function () {
				var e = this,
					t = this.elements.settings.panes.captions.querySelector("ul"),
					i = f.getTracks.call(this).length;
				if (b.toggleTab.call(this, "captions", i), o.emptyElement(t), i) {
					var n = f.getTracks.call(this).map(function (e) {
						return {
							language: e.language,
							label: o.is.empty(e.label) ? e.language.toUpperCase() : e.label
						}
					});
					n.unshift({
						language: "",
						label: this.config.i18n.none
					}), n.forEach(function (i) {
						b.createMenuItem.call(e, i.language, t, "language", i.label || i.language, b.createBadge.call(e, i.language.toUpperCase()), i.language.toLowerCase() === e.captions.language.toLowerCase())
					}), b.updateSetting.call(this, "captions", t)
				}
			},
			setSpeedMenu: function () {
				var e = this;
				if (o.is.element(this.elements.settings.panes.speed)) {
					o.is.object(this.options.speed) && Object.keys(this.options.speed).length || (this.options.speed = [.5, .75, 1, 1.25, 1.5, 1.75, 2]), this.options.speed = this.options.speed.filter(function (t) {
						return e.config.speed.options.includes(t)
					});
					var t = !o.is.empty(this.options.speed);
					if (b.toggleTab.call(this, "speed", t), t) {
						var i = this.elements.settings.panes.speed.querySelector("ul");
						o.toggleHidden(this.elements.settings.tabs.speed, !1), o.toggleHidden(this.elements.settings.panes.speed, !1), o.emptyElement(i), this.options.speed.forEach(function (t) {
							return b.createMenuItem.call(e, t, i, "speed", b.getLabel.call(e, "speed", t))
						}), b.updateSetting.call(this, "speed", i)
					}
				}
			},
			toggleMenu: function (e) {
				var t = this.elements.settings.form,
					i = this.elements.buttons.settings;
				if (o.is.element(t) && o.is.element(i)) {
					var n = o.is.boolean(e) ? e : o.is.element(t) && "true" === t.getAttribute("aria-hidden");
					if (o.is.event(e)) {
						var s = o.is.element(t) && t.contains(e.target),
							a = e.target === this.elements.buttons.settings;
						if (s || !s && !a && n) return;
						a && e.stopPropagation()
					}
					o.is.element(i) && i.setAttribute("aria-expanded", n), o.is.element(t) && (t.setAttribute("aria-hidden", !n), o.toggleClass(this.elements.container, this.config.classNames.menu.open, n), n ? t.removeAttribute("tabindex") : t.setAttribute("tabindex", -1))
				}
			},
			getTabSize: function (e) {
				var t = e.cloneNode(!0);
				t.style.position = "absolute", t.style.opacity = 0, t.setAttribute("aria-hidden", !1), Array.from(t.querySelectorAll("input[name]")).forEach(function (e) {
					var t = e.getAttribute("name");
					e.setAttribute("name", t + "-clone")
				}), e.parentNode.appendChild(t);
				var i = t.scrollWidth,
					n = t.scrollHeight;
				return o.removeElement(t), {
					width: i,
					height: n
				}
			},
			showTab: function (e) {
				var t = this.elements.settings.menu,
					i = e.target,
					n = "false" === i.getAttribute("aria-expanded"),
					s = document.getElementById(i.getAttribute("aria-controls"));
				if (o.is.element(s) && "tabpanel" === s.getAttribute("role")) {
					var a = t.querySelector('[role="tabpanel"][aria-hidden="false"]'),
						l = a.parentNode;
					if (Array.from(t.querySelectorAll('[aria-controls="' + a.getAttribute("id") + '"]')).forEach(function (e) {
							e.setAttribute("aria-expanded", !1)
						}), c.transitions && !c.reducedMotion) {
						l.style.width = a.scrollWidth + "px", l.style.height = a.scrollHeight + "px";
						var r = b.getTabSize.call(this, s);
						o.on(l, o.transitionEndEvent, function e(t) {
							t.target === l && ["width", "height"].includes(t.propertyName) && (l.style.width = "", l.style.height = "", o.off(l, o.transitionEndEvent, e))
						}), l.style.width = r.width + "px", l.style.height = r.height + "px"
					}
					a.setAttribute("aria-hidden", !0), a.setAttribute("tabindex", -1), s.setAttribute("aria-hidden", !n), i.setAttribute("aria-expanded", n), s.removeAttribute("tabindex"), s.querySelectorAll("button:not(:disabled), input:not(:disabled), [tabindex]")[0].focus()
				}
			},
			create: function (e) {
				var t = this;
				if (o.is.empty(this.config.controls)) return null;
				var i = o.createElement("div", o.getAttributesFromSelector(this.config.selectors.controls.wrapper));
				if (this.config.controls.includes("restart") && i.appendChild(b.createButton.call(this, "restart")), this.config.controls.includes("rewind") && i.appendChild(b.createButton.call(this, "rewind")), this.config.controls.includes("play") && i.appendChild(b.createButton.call(this, "play")), this.config.controls.includes("fast-forward") && i.appendChild(b.createButton.call(this, "fast-forward")), this.config.controls.includes("progress")) {
					var n = o.createElement("div", o.getAttributesFromSelector(this.config.selectors.progress)),
						s = b.createRange.call(this, "seek", {
							id: "plyr-seek-" + e.id
						});
					if (n.appendChild(s.label), n.appendChild(s.input), n.appendChild(b.createProgress.call(this, "buffer")), this.config.tooltips.seek) {
						var a = o.createElement("span", {
							role: "tooltip",
							class: this.config.classNames.tooltip
						}, "00:00");
						n.appendChild(a), this.elements.display.seekTooltip = a
					}
					this.elements.progress = n, i.appendChild(this.elements.progress)
				}
				if (this.config.controls.includes("current-time") && i.appendChild(b.createTime.call(this, "currentTime")), this.config.controls.includes("duration") && i.appendChild(b.createTime.call(this, "duration")), this.config.controls.includes("mute") && i.appendChild(b.createButton.call(this, "mute")), this.config.controls.includes("volume")) {
					var l = o.createElement("div", {
							class: "plyr__volume"
						}),
						r = {
							max: 1,
							step: .05,
							value: this.config.volume
						},
						u = b.createRange.call(this, "volume", o.extend(r, {
							id: "plyr-volume-" + e.id
						}));
					l.appendChild(u.label), l.appendChild(u.input), this.elements.volume = l, i.appendChild(l)
				}
				if (this.config.controls.includes("captions") && i.appendChild(b.createButton.call(this, "captions")), this.config.controls.includes("settings") && !o.is.empty(this.config.settings)) {
					var d = o.createElement("div", {
						class: "plyr__menu"
					});
					d.appendChild(b.createButton.call(this, "settings", {
						id: "plyr-settings-toggle-" + e.id,
						"aria-haspopup": !0,
						"aria-controls": "plyr-settings-" + e.id,
						"aria-expanded": !1
					}));
					var p = o.createElement("form", {
							class: "plyr__menu__container",
							id: "plyr-settings-" + e.id,
							"aria-hidden": !0,
							"aria-labelled-by": "plyr-settings-toggle-" + e.id,
							role: "tablist",
							tabindex: -1
						}),
						h = o.createElement("div"),
						m = o.createElement("div", {
							id: "plyr-settings-" + e.id + "-home",
							"aria-hidden": !1,
							"aria-labelled-by": "plyr-settings-toggle-" + e.id,
							role: "tabpanel"
						}),
						g = o.createElement("ul", {
							role: "tablist"
						});
					this.config.settings.forEach(function (i) {
						var n = o.createElement("li", {
								role: "tab",
								hidden: ""
							}),
							s = o.createElement("button", o.extend(o.getAttributesFromSelector(t.config.selectors.buttons.settings), {
								type: "button",
								class: t.config.classNames.control + " " + t.config.classNames.control + "--forward",
								id: "plyr-settings-" + e.id + "-" + i + "-tab",
								"aria-haspopup": !0,
								"aria-controls": "plyr-settings-" + e.id + "-" + i,
								"aria-expanded": !1
							}), t.config.i18n[i]),
							a = o.createElement("span", {
								class: t.config.classNames.menu.value
							});
						a.innerHTML = e[i], s.appendChild(a), n.appendChild(s), g.appendChild(n), t.elements.settings.tabs[i] = n
					}), m.appendChild(g), h.appendChild(m), this.config.settings.forEach(function (i) {
						var n = o.createElement("div", {
								id: "plyr-settings-" + e.id + "-" + i,
								"aria-hidden": !0,
								"aria-labelled-by": "plyr-settings-" + e.id + "-" + i + "-tab",
								role: "tabpanel",
								tabindex: -1,
								hidden: ""
							}),
							s = o.createElement("button", {
								type: "button",
								class: t.config.classNames.control + " " + t.config.classNames.control + "--back",
								"aria-haspopup": !0,
								"aria-controls": "plyr-settings-" + e.id + "-home",
								"aria-expanded": !1
							}, t.config.i18n[i]);
						n.appendChild(s);
						var a = o.createElement("ul");
						n.appendChild(a), h.appendChild(n), t.elements.settings.panes[i] = n
					}), p.appendChild(h), d.appendChild(p), i.appendChild(d), this.elements.settings.form = p, this.elements.settings.menu = d
				}
				return this.config.controls.includes("pip") && c.pip && i.appendChild(b.createButton.call(this, "pip")), this.config.controls.includes("airplay") && c.airplay && i.appendChild(b.createButton.call(this, "airplay")), this.config.controls.includes("fullscreen") && i.appendChild(b.createButton.call(this, "fullscreen")), this.config.controls.includes("play-large") && this.elements.container.appendChild(b.createButton.call(this, "play-large")), this.elements.controls = i, this.config.controls.includes("settings") && this.config.settings.includes("speed") && b.setSpeedMenu.call(this), i
			},
			inject: function () {
				var e = this;
				if (this.config.loadSprite) {
					var t = b.getIconUrl.call(this);
					t.absolute && o.loadSprite(t.url, "sprite-plyr")
				}
				this.id = Math.floor(1e4 * Math.random());
				var i = null;
				this.elements.controls = null, i = o.is.string(this.config.controls) || o.is.element(this.config.controls) ? this.config.controls : o.is.function(this.config.controls) ? this.config.controls({
					id: this.id,
					seektime: this.config.seekTime,
					title: this.config.title
				}) : b.create.call(this, {
					id: this.id,
					seektime: this.config.seekTime,
					speed: this.speed,
					quality: this.quality,
					captions: b.getLanguage.call(this)
				});
				var n = void 0;
				if (o.is.string(this.config.selectors.controls.container) && (n = document.querySelector(this.config.selectors.controls.container)), o.is.element(n) || (n = this.elements.container), o.is.element(i) ? n.appendChild(i) : n.insertAdjacentHTML("beforeend", i), o.is.element(this.elements.controls) || o.findElements.call(this), window.navigator.userAgent.includes("Edge") && o.repaint(n), this.config.tooltips.controls) {
					var s = o.getElements.call(this, [this.config.selectors.controls.wrapper, " ", this.config.selectors.labels, " .", this.config.classNames.hidden].join(""));
					Array.from(s).forEach(function (t) {
						o.toggleClass(t, e.config.classNames.hidden, !1), o.toggleClass(t, e.config.classNames.tooltip, !0), t.setAttribute("role", "tooltip")
					})
				}
			}
		},
		k = o.getBrowser(),
		w = function () {
			function e(t) {
				s(this, e), this.player = t, this.lastKey = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this)
			}
			return a(e, [{
				key: "handleKey",
				value: function (e) {
					var t = this,
						i = e.keyCode ? e.keyCode : e.which,
						n = "keydown" === e.type,
						s = n && i === this.lastKey;
					if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && o.is.number(i)) {
						if (n) {
							var a = o.getFocusElement();
							if (o.is.element(a) && o.matches(a, this.player.config.selectors.editable)) return;
							switch ([48, 49, 50, 51, 52, 53, 54, 56, 57, 32, 75, 38, 40, 77, 39, 37, 70, 67, 73, 76, 79].includes(i) && (e.preventDefault(), e.stopPropagation()), i) {
								case 48:
								case 49:
								case 50:
								case 51:
								case 52:
								case 53:
								case 54:
								case 55:
								case 56:
								case 57:
									s || (t.player.currentTime = t.player.duration / 10 * (i - 48));
									break;
								case 32:
								case 75:
									s || this.player.togglePlay();
									break;
								case 38:
									this.player.increaseVolume(.1);
									break;
								case 40:
									this.player.decreaseVolume(.1);
									break;
								case 77:
									s || (this.player.muted = !this.player.muted);
									break;
								case 39:
									this.player.forward();
									break;
								case 37:
									this.player.rewind();
									break;
								case 70:
									this.player.fullscreen.toggle();
									break;
								case 67:
									s || this.player.toggleCaptions();
									break;
								case 76:
									this.player.loop = !this.player.loop
							}!this.player.fullscreen.enabled && this.player.fullscreen.active && 27 === i && this.player.fullscreen.toggle(), this.lastKey = i
						} else this.lastKey = null
					}
				}
			}, {
				key: "toggleMenu",
				value: function (e) {
					b.toggleMenu.call(this.player, e)
				}
			}, {
				key: "global",
				value: function () {
					var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
					this.player.config.keyboard.global && o.toggleListener(window, "keydown keyup", this.handleKey, e, !1), o.toggleListener(document.body, "click", this.toggleMenu, e)
				}
			}, {
				key: "container",
				value: function () {
					var e = this;
					!this.player.config.keyboard.global && this.player.config.keyboard.focused && o.on(this.player.elements.container, "keydown keyup", this.handleKey, !1), o.on(this.player.elements.container, "focusout", function (t) {
						o.toggleClass(t.target, e.player.config.classNames.tabFocus, !1)
					}), o.on(this.player.elements.container, "keydown", function (t) {
						9 === t.keyCode && setTimeout(function () {
							o.toggleClass(o.getFocusElement(), e.player.config.classNames.tabFocus, !0)
						}, 0)
					}), this.player.config.hideControls && o.on(this.player.elements.container, "mouseenter mouseleave mousemove touchstart touchend touchmove enterfullscreen exitfullscreen", function (t) {
						e.player.toggleControls(t)
					})
				}
			}, {
				key: "media",
				value: function () {
					var e = this;
					if (o.on(this.player.media, "timeupdate seeking", function (t) {
							return y.timeUpdate.call(e.player, t)
						}), o.on(this.player.media, "durationchange loadedmetadata", function (t) {
							return y.durationUpdate.call(e.player, t)
						}), o.on(this.player.media, "loadeddata", function () {
							o.toggleHidden(e.player.elements.volume, !e.player.hasAudio), o.toggleHidden(e.player.elements.buttons.mute, !e.player.hasAudio)
						}), o.on(this.player.media, "ended", function () {
							e.player.isHTML5 && e.player.isVideo && e.player.config.showPosterOnEnd && (e.player.restart(), e.player.media.load())
						}), o.on(this.player.media, "progress playing", function (t) {
							return y.updateProgress.call(e.player, t)
						}), o.on(this.player.media, "volumechange", function (t) {
							return y.updateVolume.call(e.player, t)
						}), o.on(this.player.media, "playing play pause ended", function (t) {
							return y.checkPlaying.call(e.player, t)
						}), o.on(this.player.media, "waiting canplay seeked playing", function (t) {
							return y.checkLoading.call(e.player, t)
						}), this.player.supported.ui && this.player.config.clickToPlay && !this.player.isAudio) {
						var t = o.getElement.call(this.player, "." + this.player.config.classNames.video);
						if (!o.is.element(t)) return;
						o.on(t, "click", function () {
							e.player.config.hideControls && c.touch && !e.player.paused || (e.player.paused ? e.player.play() : e.player.ended ? (e.player.restart(), e.player.play()) : e.player.pause())
						})
					}
					this.player.supported.ui && this.player.config.disableContextMenu && o.on(this.player.media, "contextmenu", function (e) {
						e.preventDefault()
					}, !1), o.on(this.player.media, "volumechange", function () {
						e.player.storage.set({
							volume: e.player.volume,
							muted: e.player.muted
						})
					}), o.on(this.player.media, "ratechange", function () {
						b.updateSetting.call(e.player, "speed"), e.player.storage.set({
							speed: e.player.speed
						})
					}), o.on(this.player.media, "qualitychange", function () {
						b.updateSetting.call(e.player, "quality"), e.player.storage.set({
							quality: e.player.quality
						})
					}), o.on(this.player.media, "languagechange", function () {
						b.updateSetting.call(e.player, "captions"), e.player.storage.set({
							language: e.player.language
						})
					}), o.on(this.player.media, "captionsenabled captionsdisabled", function () {
						b.updateSetting.call(e.player, "captions"), e.player.storage.set({
							captions: e.player.captions.active
						})
					}), o.on(this.player.media, this.player.config.events.concat(["keyup", "keydown"]).join(" "), function (t) {
						var i = {};
						"error" === t.type && (i = e.player.media.error), o.dispatchEvent.call(e.player, e.player.elements.container, t.type, !0, i)
					})
				}
			}, {
				key: "controls",
				value: function () {
					var e = this,
						t = k.isIE ? "change" : "input",
						i = function (t, i, n) {
							var s = e.player.config.listeners[i];
							o.is.function(s) && s.call(e.player, t), !t.defaultPrevented && o.is.function(n) && n.call(e.player, t)
						};
					o.on(this.player.elements.buttons.play, "click", function (t) {
						return i(t, "play", function () {
							e.player.togglePlay()
						})
					}), o.on(this.player.elements.buttons.restart, "click", function (t) {
						return i(t, "restart", function () {
							e.player.restart()
						})
					}), o.on(this.player.elements.buttons.rewind, "click", function (t) {
						return i(t, "rewind", function () {
							e.player.rewind()
						})
					}), o.on(this.player.elements.buttons.forward, "click", function (t) {
						return i(t, "forward", function () {
							e.player.forward()
						})
					}), o.on(this.player.elements.buttons.mute, "click", function (t) {
						return i(t, "mute", function () {
							e.player.muted = !e.player.muted
						})
					}), o.on(this.player.elements.buttons.captions, "click", function (t) {
						return i(t, "captions", function () {
							e.player.toggleCaptions()
						})
					}), o.on(this.player.elements.buttons.fullscreen, "click", function (t) {
						return i(t, "fullscreen", function () {
							e.player.fullscreen.toggle()
						})
					}), o.on(this.player.elements.buttons.pip, "click", function (t) {
						return i(t, "pip", function () {
							e.player.pip = "toggle"
						})
					}), o.on(this.player.elements.buttons.airplay, "click", function (t) {
						return i(t, "airplay", function () {
							e.player.airplay()
						})
					}), o.on(this.player.elements.buttons.settings, "click", function (t) {
						b.toggleMenu.call(e.player, t)
					}), o.on(this.player.elements.settings.form, "click", function (t) {
						t.stopPropagation(), o.matches(t.target, e.player.config.selectors.inputs.language) ? i(t, "language", function () {
							e.player.language = t.target.value
						}) : o.matches(t.target, e.player.config.selectors.inputs.quality) ? i(t, "quality", function () {
							e.player.quality = t.target.value
						}) : o.matches(t.target, e.player.config.selectors.inputs.speed) ? i(t, "speed", function () {
							e.player.speed = parseFloat(t.target.value)
						}) : b.showTab.call(e.player, t)
					}), o.on(this.player.elements.inputs.seek, t, function (t) {
						return i(t, "seek", function () {
							e.player.currentTime = t.target.value / t.target.max * e.player.duration
						})
					}), this.player.config.toggleInvert && !o.is.element(this.player.elements.display.duration) && o.on(this.player.elements.display.currentTime, "click", function () {
						0 !== e.player.currentTime && (e.player.config.invertTime = !e.player.config.invertTime, y.timeUpdate.call(e.player))
					}), o.on(this.player.elements.inputs.volume, t, function (t) {
						return i(t, "volume", function () {
							e.player.volume = t.target.value
						})
					}), k.isWebkit && o.on(o.getElements.call(this.player, 'input[type="range"]'), "input", function (t) {
						b.updateRangeFill.call(e.player, t.target)
					}), o.on(this.player.elements.progress, "mouseenter mouseleave mousemove", function (t) {
						return b.updateSeekTooltip.call(e.player, t)
					}), this.player.config.hideControls && (o.on(this.player.elements.controls, "mouseenter mouseleave", function (t) {
						e.player.elements.controls.hover = "mouseenter" === t.type
					}), o.on(this.player.elements.controls, "mousedown mouseup touchstart touchend touchcancel", function (t) {
						e.player.elements.controls.pressed = ["mousedown", "touchstart"].includes(t.type)
					}), o.on(this.player.elements.controls, "focusin focusout", function (t) {
						e.player.toggleControls(t)
					})), o.on(this.player.elements.inputs.volume, "wheel", function (t) {
						return i(t, "volume", function () {
							var i = t.webkitDirectionInvertedFromDevice,
								n = 0;
							(t.deltaY < 0 || t.deltaX > 0) && (i ? (e.player.decreaseVolume(.02), n = -1) : (e.player.increaseVolume(.02), n = 1)), (t.deltaY > 0 || t.deltaX < 0) && (i ? (e.player.increaseVolume(.02), n = 1) : (e.player.decreaseVolume(.02), n = -1)), (1 === n && e.player.media.volume < 1 || -1 === n && e.player.media.volume > 0) && t.preventDefault()
						})
					}, !1)
				}
			}, {
				key: "clear",
				value: function () {
					this.global(!1)
				}
			}]), e
		}(),
		E = function () {
			function e(t) {
				s(this, e), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key
			}
			return a(e, [{
				key: "get",
				value: function (t) {
					if (!e.supported) return null;
					var i = window.localStorage.getItem(this.key);
					if (o.is.empty(i)) return null;
					var n = JSON.parse(i);
					return o.is.string(t) && t.length ? n[t] : n
				}
			}, {
				key: "set",
				value: function (t) {
					if (e.supported && this.enabled && o.is.object(t)) {
						var i = this.get();
						o.is.empty(i) && (i = {}), o.extend(i, t), window.localStorage.setItem(this.key, JSON.stringify(i))
					}
				}
			}], [{
				key: "supported",
				get: function () {
					try {
						if (!("localStorage" in window)) return !1;
						return window.localStorage.setItem("___test", "___test"), window.localStorage.removeItem("___test"), !0
					} catch (e) {
						return !1
					}
				}
			}]), e
		}(),
		T = function () {
			function e(t) {
				var i = this;
				s(this, e), this.player = t, this.publisherId = t.config.ads.publisherId, this.enabled = t.isHTML5 && t.isVideo && t.config.ads.enabled && o.is.string(this.publisherId) && this.publisherId.length, this.playing = !1, this.initialized = !1, this.elements = {
					container: null,
					displayContainer: null
				}, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(function (e, t) {
					i.on("loaded", e), i.on("error", t)
				}), this.load()
			}
			return a(e, [{
				key: "load",
				value: function () {
					var e = this;
					this.enabled && (o.is.object(window.google) && o.is.object(window.google.ima) ? this.ready() : o.loadScript(this.player.config.urls.googleIMA.api).then(function () {
						e.ready()
					}).catch(function () {
						e.trigger("error", new Error("Google IMA SDK failed to load"))
					}))
				}
			}, {
				key: "ready",
				value: function () {
					var e = this;
					this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(function () {
						e.clearSafetyTimer("onAdsManagerLoaded()")
					}), this.listeners(), this.setupIMA()
				}
			}, {
				key: "setupIMA",
				value: function () {
					this.elements.container = o.createElement("div", {
						class: this.player.config.classNames.ads
					}), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container), this.requestAds()
				}
			}, {
				key: "requestAds",
				value: function () {
					var e = this,
						t = this.player.elements.container;
					try {
						this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (t) {
							return e.onAdsManagerLoaded(t)
						}, !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (t) {
							return e.onAdError(t)
						}, !1);
						var i = new google.ima.AdsRequest;
						i.adTagUrl = this.tagUrl, i.linearAdSlotWidth = t.offsetWidth, i.linearAdSlotHeight = t.offsetHeight, i.nonLinearAdSlotWidth = t.offsetWidth, i.nonLinearAdSlotHeight = t.offsetHeight, i.forceNonLinearFullSlot = !1, this.loader.requestAds(i)
					} catch (e) {
						this.onAdError(e)
					}
				}
			}, {
				key: "pollCountdown",
				value: function () {
					var e = this;
					if (!(arguments.length > 0 && void 0 !== arguments[0] && arguments[0])) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
					this.countdownTimer = setInterval(function () {
						var t = o.formatTime(Math.max(e.manager.getRemainingTime(), 0)),
							i = e.player.config.i18n.advertisement + " - " + t;
						e.elements.container.setAttribute("data-badge-text", i)
					}, 100)
				}
			}, {
				key: "onAdsManagerLoaded",
				value: function (e) {
					var t = this,
						i = new google.ima.AdsRenderingSettings;
					i.restoreCustomPlaybackStateOnAdBreakComplete = !0, i.enablePreloading = !0, this.manager = e.getAdsManager(this.player, i), this.cuePoints = this.manager.getCuePoints(), this.cuePoints.forEach(function (e) {
						if (0 !== e && -1 !== e && e < t.player.duration) {
							var i = t.player.elements.progress;
							if (i) {
								var n = 100 / t.player.duration * e,
									s = o.createElement("span", {
										class: t.player.config.classNames.cues
									});
								s.style.left = n.toString() + "%", i.appendChild(s)
							}
						}
					}), this.manager.setVolume(this.player.volume), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
						return t.onAdError(e)
					}), Object.keys(google.ima.AdEvent.Type).forEach(function (e) {
						t.manager.addEventListener(google.ima.AdEvent.Type[e], function (e) {
							return t.onAdEvent(e)
						})
					}), this.trigger("loaded")
				}
			}, {
				key: "onAdEvent",
				value: function (e) {
					var t = this,
						i = this.player.elements.container,
						n = e.getAd(),
						s = function (e) {
							var i = "ads" + e.replace(/_/g, "").toLowerCase();
							o.dispatchEvent.call(t.player, t.player.media, i)
						};
					switch (e.type) {
						case google.ima.AdEvent.Type.LOADED:
							this.trigger("loaded"), s(e.type), this.pollCountdown(!0), n.isLinear() || (n.width = i.offsetWidth, n.height = i.offsetHeight);
							break;
						case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
							s(e.type), this.loadAds();
							break;
						case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
							s(e.type), this.pauseContent();
							break;
						case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
							s(e.type), this.pollCountdown(), this.resumeContent();
							break;
						case google.ima.AdEvent.Type.STARTED:
						case google.ima.AdEvent.Type.MIDPOINT:
						case google.ima.AdEvent.Type.COMPLETE:
						case google.ima.AdEvent.Type.IMPRESSION:
						case google.ima.AdEvent.Type.CLICK:
							s(e.type)
					}
				}
			}, {
				key: "onAdError",
				value: function (e) {
					this.cancel(), this.player.debug.warn("Ads error", e)
				}
			}, {
				key: "listeners",
				value: function () {
					var e = this,
						t = this.player.elements.container,
						i = void 0;
					this.player.on("ended", function () {
						e.loader.contentComplete()
					}), this.player.on("seeking", function () {
						return i = e.player.currentTime
					}), this.player.on("seeked", function () {
						var t = e.player.currentTime;
						e.cuePoints.forEach(function (n, s) {
							i < n && n < t && (e.manager.discardAdBreak(), e.cuePoints.splice(s, 1))
						})
					}), window.addEventListener("resize", function () {
						e.manager.resize(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL)
					})
				}
			}, {
				key: "play",
				value: function () {
					var e = this,
						t = this.player.elements.container;
					this.managerPromise || this.resumeContent(), this.managerPromise.then(function () {
						e.elements.displayContainer.initialize();
						try {
							e.initialized || (e.manager.init(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL), e.manager.start()), e.initialized = !0
						} catch (t) {
							e.onAdError(t)
						}
					}).catch(function () {})
				}
			}, {
				key: "resumeContent",
				value: function () {
					this.elements.container.style.zIndex = "", this.playing = !1, this.player.currentTime < this.player.duration && this.player.play()
				}
			}, {
				key: "pauseContent",
				value: function () {
					this.elements.container.style.zIndex = 3, this.playing = !0, this.player.pause()
				}
			}, {
				key: "cancel",
				value: function () {
					this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds()
				}
			}, {
				key: "loadAds",
				value: function () {
					var e = this;
					this.managerPromise.then(function () {
						e.manager && e.manager.destroy(), e.managerPromise = new Promise(function (t) {
							e.on("loaded", t), e.player.debug.log(e.manager)
						}), e.requestAds()
					}).catch(function () {})
				}
			}, {
				key: "trigger",
				value: function (e) {
					for (var t = this, i = arguments.length, n = Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) n[s - 1] = arguments[s];
					var a = this.events[e];
					o.is.array(a) && a.forEach(function (e) {
						o.is.function(e) && e.apply(t, n)
					})
				}
			}, {
				key: "on",
				value: function (e, t) {
					return o.is.array(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this
				}
			}, {
				key: "startSafetyTimer",
				value: function (e, t) {
					var i = this;
					this.player.debug.log("Safety timer invoked from: " + t), this.safetyTimer = setTimeout(function () {
						i.cancel(), i.clearSafetyTimer("startSafetyTimer()")
					}, e)
				}
			}, {
				key: "clearSafetyTimer",
				value: function (e) {
					o.is.nullOrUndefined(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: " + e), clearTimeout(this.safetyTimer), this.safetyTimer = null)
				}
			}, {
				key: "tagUrl",
				get: function () {
					var e = {
						AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
						AV_CHANNELID: "5a0458dc28a06145e4519d21",
						AV_URL: location.hostname,
						cb: Date.now(),
						AV_WIDTH: 640,
						AV_HEIGHT: 480,
						AV_CDIM2: this.publisherId
					};
					return "https://go.aniview.com/api/adserver6/vast/?" + o.buildUrlParams(e)
				}
			}]), e
		}(),
		C = {
			setup: function () {
				var e = this;
				o.toggleClass(this.elements.wrapper, this.config.classNames.embed, !0), C.setAspectRatio.call(this), o.is.object(window.YT) && o.is.function(window.YT.Player) ? C.ready.call(this) : (o.loadScript(this.config.urls.youtube.api).catch(function (t) {
					e.debug.warn("YouTube API failed to load", t)
				}), window.onYouTubeReadyCallbacks = window.onYouTubeReadyCallbacks || [], window.onYouTubeReadyCallbacks.push(function () {
					C.ready.call(e)
				}), window.onYouTubeIframeAPIReady = function () {
					window.onYouTubeReadyCallbacks.forEach(function (e) {
						e()
					})
				})
			},
			getTitle: function (e) {
				var t = this;
				if (o.is.function(this.embed.getVideoData)) {
					var i = this.embed.getVideoData().title;
					if (o.is.empty(i)) return this.config.title = i, void y.setTitle.call(this)
				}
				var n = this.config.keys.google;
				if (o.is.string(n) && !o.is.empty(n)) {
					var s = "https://www.googleapis.com/youtube/v3/videos?id=" + e + "&key=" + n + "&fields=items(snippet(title))&part=snippet";
					o.fetch(s).then(function (e) {
						o.is.object(e) && (t.config.title = e.items[0].snippet.title, y.setTitle.call(t))
					}).catch(function () {})
				}
			},
			setAspectRatio: function () {
				var e = this.config.ratio.split(":");
				this.elements.wrapper.style.paddingBottom = 100 / e[0] * e[1] + "%"
			},
			ready: function () {
				var e = this,
					t = e.media.getAttribute("id");
				if (o.is.empty(t) || !t.startsWith("youtube-")) {
					var i = e.media.getAttribute("src");
					o.is.empty(i) && (i = e.media.getAttribute(this.config.attributes.embed.id));
					var n = o.parseYouTubeId(i),
						s = o.generateId(e.provider),
						a = o.createElement("div", {
							id: s
						});
					e.media = o.replaceElement(a, e.media), e.embed = new window.YT.Player(s, {
						videoId: n,
						playerVars: {
							autoplay: e.config.autoplay ? 1 : 0,
							controls: e.supported.ui ? 0 : 1,
							rel: 0,
							showinfo: 0,
							iv_load_policy: 3,
							modestbranding: 1,
							disablekb: 1,
							playsinline: 1,
							widget_referrer: window ? window.location.href : null,
							cc_load_policy: e.captions.active ? 1 : 0,
							cc_lang_pref: e.config.captions.language
						},
						events: {
							onError: function (t) {
								if (!o.is.object(e.media.error)) {
									var i = {
										code: t.data
									};
									switch (t.data) {
										case 2:
											i.message = "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.";
											break;
										case 5:
											i.message = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.";
											break;
										case 100:
											i.message = "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.";
											break;
										case 101:
										case 150:
											i.message = "The owner of the requested video does not allow it to be played in embedded players.";
											break;
										default:
											i.message = "An unknown error occured"
									}
									e.media.error = i, o.dispatchEvent.call(e, e.media, "error")
								}
							},
							onPlaybackQualityChange: function (t) {
								var i = t.target;
								e.media.quality = i.getPlaybackQuality(), o.dispatchEvent.call(e, e.media, "qualitychange")
							},
							onPlaybackRateChange: function (t) {
								var i = t.target;
								e.media.playbackRate = i.getPlaybackRate(), o.dispatchEvent.call(e, e.media, "ratechange")
							},
							onReady: function (t) {
								var i = t.target;
								C.getTitle.call(e, n), e.media.play = function () {
									i.playVideo()
								}, e.media.pause = function () {
									i.pauseVideo()
								}, e.media.stop = function () {
									i.stopVideo()
								}, e.media.duration = i.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
									get: function () {
										return Number(i.getCurrentTime())
									},
									set: function (t) {
										e.media.seeking = !0, o.dispatchEvent.call(e, e.media, "seeking"), i.seekTo(t)
									}
								}), Object.defineProperty(e.media, "playbackRate", {
									get: function () {
										return i.getPlaybackRate()
									},
									set: function (e) {
										i.setPlaybackRate(e)
									}
								}), Object.defineProperty(e.media, "quality", {
									get: function () {
										return i.getPlaybackQuality()
									},
									set: function (t) {
										o.dispatchEvent.call(e, e.media, "qualityrequested", !1, {
											quality: t
										}), i.setPlaybackQuality(t)
									}
								});
								var s = e.config.volume;
								Object.defineProperty(e.media, "volume", {
									get: function () {
										return s
									},
									set: function (t) {
										s = t, i.setVolume(100 * s), o.dispatchEvent.call(e, e.media, "volumechange")
									}
								});
								var a = e.config.muted;
								Object.defineProperty(e.media, "muted", {
									get: function () {
										return a
									},
									set: function (t) {
										var n = o.is.boolean(t) ? t : a;
										a = n, i[n ? "mute" : "unMute"](), o.dispatchEvent.call(e, e.media, "volumechange")
									}
								}), Object.defineProperty(e.media, "currentSrc", {
									get: function () {
										return i.getVideoUrl()
									}
								}), Object.defineProperty(e.media, "ended", {
									get: function () {
										return e.currentTime === e.duration
									}
								}), e.options.speed = i.getAvailablePlaybackRates(), e.supported.ui && e.media.setAttribute("tabindex", -1), o.dispatchEvent.call(e, e.media, "timeupdate"), o.dispatchEvent.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(function () {
									e.media.buffered = i.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && o.dispatchEvent.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), o.dispatchEvent.call(e, e.media, "canplaythrough"))
								}, 200), setTimeout(function () {
									return y.build.call(e)
								}, 50)
							},
							onStateChange: function (t) {
								var i = t.target;
								switch (clearInterval(e.timers.playing), t.data) {
									case 0:
										e.media.paused = !0, e.media.loop ? (i.stopVideo(), i.playVideo()) : o.dispatchEvent.call(e, e.media, "ended");
										break;
									case 1:
										e.media.seeking && o.dispatchEvent.call(e, e.media, "seeked"), e.media.seeking = !1, e.media.paused && o.dispatchEvent.call(e, e.media, "play"), e.media.paused = !1, o.dispatchEvent.call(e, e.media, "playing"), e.timers.playing = setInterval(function () {
											o.dispatchEvent.call(e, e.media, "timeupdate")
										}, 50), e.media.duration !== i.getDuration() && (e.media.duration = i.getDuration(), o.dispatchEvent.call(e, e.media, "durationchange")), b.setQualityMenu.call(e, i.getAvailableQualityLevels());
										break;
									case 2:
										e.media.paused = !0, o.dispatchEvent.call(e, e.media, "pause")
								}
								o.dispatchEvent.call(e, e.elements.container, "statechange", !1, {
									code: t.data
								})
							}
						}
					})
				}
			}
		},
		A = {
			setup: function () {
				var e = this;
				o.toggleClass(this.elements.wrapper, this.config.classNames.embed, !0), A.setAspectRatio.call(this), o.is.object(window.Vimeo) ? A.ready.call(this) : o.loadScript(this.config.urls.vimeo.api).then(function () {
					A.ready.call(e)
				}).catch(function (t) {
					e.debug.warn("Vimeo API failed to load", t)
				})
			},
			setAspectRatio: function (e) {
				var t = o.is.string(e) ? e.split(":") : this.config.ratio.split(":"),
					i = 100 / t[0] * t[1],
					n = (200 - i) / 4;
				this.elements.wrapper.style.paddingBottom = i + "%", this.media.style.transform = "translateY(-" + n + "%)"
			},
			ready: function () {
				var e = this,
					t = this,
					i = {
						loop: t.config.loop.active,
						autoplay: t.autoplay,
						byline: !1,
						portrait: !1,
						title: !1,
						speed: !0,
						transparent: 0,
						gesture: "media"
					},
					n = o.buildUrlParams(i),
					s = t.media.getAttribute("src");
				o.is.empty(s) && (s = t.media.getAttribute(this.config.attributes.embed.id));
				var a = o.parseVimeoId(s),
					l = o.createElement("iframe"),
					r = "https://player.vimeo.com/video/" + a + "?" + n;
				l.setAttribute("src", r), l.setAttribute("allowfullscreen", ""), l.setAttribute("allowtransparency", ""), l.setAttribute("allow", "autoplay");
				var c = o.createElement("div");
				c.appendChild(l), t.media = o.replaceElement(c, t.media), t.embed = new window.Vimeo.Player(l), t.media.paused = !0, t.media.currentTime = 0, t.media.play = function () {
					t.embed.play().then(function () {
						t.media.paused = !1
					})
				}, t.media.pause = function () {
					t.embed.pause().then(function () {
						t.media.paused = !0
					})
				}, t.media.stop = function () {
					t.embed.stop().then(function () {
						t.media.paused = !0, t.currentTime = 0
					})
				};
				var u = t.media.currentTime;
				Object.defineProperty(t.media, "currentTime", {
					get: function () {
						return u
					},
					set: function (e) {
						var i = t.media.paused;
						t.media.seeking = !0, o.dispatchEvent.call(t, t.media, "seeking"), t.embed.setCurrentTime(e), i && t.pause()
					}
				});
				var d = t.config.speed.selected;
				Object.defineProperty(t.media, "playbackRate", {
					get: function () {
						return d
					},
					set: function (e) {
						t.embed.setPlaybackRate(e).then(function () {
							d = e, o.dispatchEvent.call(t, t.media, "ratechange")
						})
					}
				});
				var p = t.config.volume;
				Object.defineProperty(t.media, "volume", {
					get: function () {
						return p
					},
					set: function (e) {
						t.embed.setVolume(e).then(function () {
							p = e, o.dispatchEvent.call(t, t.media, "volumechange")
						})
					}
				});
				var h = t.config.muted;
				Object.defineProperty(t.media, "muted", {
					get: function () {
						return h
					},
					set: function (e) {
						var i = !!o.is.boolean(e) && e;
						t.embed.setVolume(i ? 0 : t.config.volume).then(function () {
							h = i, o.dispatchEvent.call(t, t.media, "volumechange")
						})
					}
				});
				var m = t.config.loop;
				Object.defineProperty(t.media, "loop", {
					get: function () {
						return m
					},
					set: function (e) {
						var i = o.is.boolean(e) ? e : t.config.loop.active;
						t.embed.setLoop(i).then(function () {
							m = i
						})
					}
				});
				var g = void 0;
				t.embed.getVideoUrl().then(function (e) {
					g = e
				}), Object.defineProperty(t.media, "currentSrc", {
					get: function () {
						return g
					}
				}), Object.defineProperty(t.media, "ended", {
					get: function () {
						return t.currentTime === t.duration
					}
				}), Promise.all([t.embed.getVideoWidth(), t.embed.getVideoHeight()]).then(function (t) {
					var i = o.getAspectRatio(t[0], t[1]);
					A.setAspectRatio.call(e, i)
				}), t.embed.setAutopause(t.config.autopause).then(function (e) {
					t.config.autopause = e
				}), t.embed.getVideoTitle().then(function (i) {
					t.config.title = i, y.setTitle.call(e)
				}), t.embed.getCurrentTime().then(function (e) {
					u = e, o.dispatchEvent.call(t, t.media, "timeupdate")
				}), t.embed.getDuration().then(function (e) {
					t.media.duration = e, o.dispatchEvent.call(t, t.media, "durationchange")
				}), t.embed.getTextTracks().then(function (e) {
					t.media.textTracks = e, f.setup.call(t)
				}), t.embed.on("cuechange", function (e) {
					var i = null;
					e.cues.length && (i = o.stripHTML(e.cues[0].text)), f.setText.call(t, i)
				}), t.embed.on("loaded", function () {
					o.is.element(t.embed.element) && t.supported.ui && t.embed.element.setAttribute("tabindex", -1)
				}), t.embed.on("play", function () {
					t.media.paused && o.dispatchEvent.call(t, t.media, "play"), t.media.paused = !1, o.dispatchEvent.call(t, t.media, "playing")
				}), t.embed.on("pause", function () {
					t.media.paused = !0, o.dispatchEvent.call(t, t.media, "pause")
				}), t.embed.on("timeupdate", function (e) {
					t.media.seeking = !1, u = e.seconds, o.dispatchEvent.call(t, t.media, "timeupdate")
				}), t.embed.on("progress", function (e) {
					t.media.buffered = e.percent, o.dispatchEvent.call(t, t.media, "progress"), 1 === parseInt(e.percent, 10) && o.dispatchEvent.call(t, t.media, "canplaythrough")
				}), t.embed.on("seeked", function () {
					t.media.seeking = !1, o.dispatchEvent.call(t, t.media, "seeked"), o.dispatchEvent.call(t, t.media, "play")
				}), t.embed.on("ended", function () {
					t.media.paused = !0, o.dispatchEvent.call(t, t.media, "ended")
				}), t.embed.on("error", function (e) {
					t.media.error = e, o.dispatchEvent.call(t, t.media, "error")
				}), setTimeout(function () {
					return y.build.call(t)
				}, 0)
			}
		},
		S = o.getBrowser(),
		N = {
			setup: function () {
				if (this.media)
					if (o.toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), o.toggleClass(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && o.toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.supported.ui && (o.toggleClass(this.elements.container, this.config.classNames.pip.supported, c.pip && this.isHTML5 && this.isVideo), o.toggleClass(this.elements.container, this.config.classNames.airplay.supported, c.airplay && this.isHTML5), o.toggleClass(this.elements.container, this.config.classNames.stopped, this.config.autoplay), o.toggleClass(this.elements.container, this.config.classNames.isIos, S.isIos), o.toggleClass(this.elements.container, this.config.classNames.isTouch, c.touch)), this.isVideo && (this.elements.wrapper = o.createElement("div", {
							class: this.config.classNames.video
						}), o.wrap(this.media, this.elements.wrapper)), this.isEmbed) switch (this.provider) {
						case "youtube":
							C.setup.call(this);
							break;
						case "vimeo":
							A.setup.call(this)
					} else this.isHTML5 && y.setTitle.call(this);
					else this.debug.warn("No media element found!")
			},
			cancelRequests: function () {
				this.isHTML5 && (o.removeElement(this.media.querySelectorAll("source")), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"))
			}
		},
		P = {
			insertElements: function (e, t) {
				var i = this;
				o.is.string(t) ? o.insertElement(e, this.media, {
					src: t
				}) : o.is.array(t) && t.forEach(function (t) {
					o.insertElement(e, i.media, t)
				})
			},
			change: function (e) {
				var i = this;
				o.is.object(e) && "sources" in e && e.sources.length ? (N.cancelRequests.call(this), this.destroy.call(this, function () {
					switch (o.removeElement(i.media), i.media = null, o.is.element(i.elements.container) && i.elements.container.removeAttribute("class"), i.type = e.type, i.provider = o.is.empty(e.sources[0].provider) ? t.html5 : e.sources[0].provider, i.supported = c.check(i.type, i.provider, i.config.inline), i.provider + ":" + i.type) {
						case "html5:video":
							i.media = o.createElement("video");
							break;
						case "html5:audio":
							i.media = o.createElement("audio");
							break;
						case "youtube:video":
						case "vimeo:video":
							i.media = o.createElement("div", {
								src: e.sources[0].src
							})
					}
					i.elements.container.appendChild(i.media), o.is.boolean(e.autoplay) && (i.config.autoplay = e.autoplay), i.isHTML5 && (i.config.crossorigin && i.media.setAttribute("crossorigin", ""), i.config.autoplay && i.media.setAttribute("autoplay", ""), "poster" in e && i.media.setAttribute("poster", e.poster), i.config.loop.active && i.media.setAttribute("loop", ""), i.config.muted && i.media.setAttribute("muted", ""), i.config.inline && i.media.setAttribute("playsinline", "")), y.addStyleHook.call(i), i.isHTML5 && P.insertElements.call(i, "source", e.sources), i.config.title = e.title, N.setup.call(i), i.isHTML5 && ("tracks" in e && P.insertElements.call(i, "track", e.tracks), i.media.load()), (i.isHTML5 || i.isEmbed && !i.supported.ui) && y.build.call(i), i.fullscreen.update()
				}, !0)) : this.debug.warn("Invalid source format")
			}
		};
	return function () {
		function e(a, l) {
			var r = this;
			if (s(this, e), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.media = a, o.is.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || o.is.nodeList(this.media) || o.is.array(this.media)) && (this.media = this.media[0]), this.config = o.extend({}, n, l, function () {
					try {
						return JSON.parse(r.media.getAttribute("data-plyr-config"))
					} catch (e) {
						return {}
					}
				}()), this.elements = {
					container: null,
					buttons: {},
					display: {},
					progress: {},
					inputs: {},
					settings: {
						menu: null,
						panes: {},
						tabs: {}
					},
					captions: null
				}, this.captions = {
					active: null,
					currentTrack: null
				}, this.fullscreen = {
					active: !1
				}, this.options = {
					speed: [],
					quality: []
				}, this.debug = new d(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", c), !o.is.nullOrUndefined(this.media) && o.is.element(this.media))
				if (this.media.plyr) this.debug.warn("Target already setup");
				else if (this.config.enabled)
				if (c.check().api) {
					this.elements.original = this.media.cloneNode(!0);
					var u = this.media.tagName.toLowerCase(),
						p = null,
						h = null,
						m = null;
					switch (u) {
						case "div":
							if (p = this.media.querySelector("iframe"), o.is.element(p)) {
								if (h = p.getAttribute("src"), this.provider = o.getProviderByUrl(h), this.elements.container = this.media, this.media = p, this.elements.container.className = "", m = o.getUrlParams(h), !o.is.empty(m)) {
									var f = ["1", "true"];
									f.includes(m.autoplay) && (this.config.autoplay = !0), f.includes(m.playsinline) && (this.config.inline = !0), f.includes(m.loop) && (this.config.loop.active = !0)
								}
							} else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
							if (o.is.empty(this.provider) || !Object.keys(t).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
							this.type = i.video;
							break;
						case "video":
						case "audio":
							this.type = u, this.provider = t.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), this.media.hasAttribute("playsinline") && (this.config.inline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
							break;
						default:
							return void this.debug.error("Setup failed: unsupported type")
					}
					this.supported = c.check(this.type, this.provider, this.config.inline), this.supported.api ? (this.listeners = new w(this), this.storage = new E(this), this.media.plyr = this, o.is.element(this.elements.container) || (this.elements.container = o.createElement("div"), o.wrap(this.media, this.elements.container)), this.elements.container.setAttribute("tabindex", 0), y.addStyleHook.call(this), N.setup.call(this), this.config.debug && o.on(this.elements.container, this.config.events.join(" "), function (e) {
						r.debug.log("event: " + e.type)
					}), (this.isHTML5 || this.isEmbed && !this.supported.ui) && y.build.call(this), this.listeners.container(), this.listeners.global(), this.fullscreen = new g(this), this.ads = new T(this)) : this.debug.error("Setup failed: no support")
				} else this.debug.error("Setup failed: no support");
			else this.debug.error("Setup failed: disabled by config");
			else this.debug.error("Setup failed: no suitable element passed")
		}
		return a(e, [{
			key: "play",
			value: function () {
				var e = this;
				return o.is.function(this.media.play) ? this.ads.enabled && !this.ads.initialized ? this.ads.managerPromise.then(function () {
					return e.ads.play()
				}).catch(function () {
					return e.media.play()
				}) : this.media.play() : null
			}
		}, {
			key: "pause",
			value: function () {
				this.playing && o.is.function(this.media.pause) && this.media.pause()
			}
		}, {
			key: "togglePlay",
			value: function (e) {
				(o.is.boolean(e) ? e : !this.playing) ? this.play(): this.pause()
			}
		}, {
			key: "stop",
			value: function () {
				this.restart(), this.pause()
			}
		}, {
			key: "restart",
			value: function () {
				this.currentTime = 0
			}
		}, {
			key: "rewind",
			value: function (e) {
				this.currentTime = this.currentTime - (o.is.number(e) ? e : this.config.seekTime)
			}
		}, {
			key: "forward",
			value: function (e) {
				this.currentTime = this.currentTime + (o.is.number(e) ? e : this.config.seekTime)
			}
		}, {
			key: "increaseVolume",
			value: function (e) {
				var t = this.media.muted ? 0 : this.volume;
				this.volume = t + (o.is.number(e) ? e : 1)
			}
		}, {
			key: "decreaseVolume",
			value: function (e) {
				var t = this.media.muted ? 0 : this.volume;
				this.volume = t - (o.is.number(e) ? e : 1)
			}
		}, {
			key: "toggleCaptions",
			value: function (e) {
				if (this.supported.ui && o.is.element(this.elements.buttons.captions)) {
					var t = o.is.boolean(e) ? e : -1 === this.elements.container.className.indexOf(this.config.classNames.captions.active);
					this.captions.active !== t && (this.captions.active = t, o.toggleState(this.elements.buttons.captions, this.captions.active), o.toggleClass(this.elements.container, this.config.classNames.captions.active, this.captions.active), o.dispatchEvent.call(this, this.media, this.captions.active ? "captionsenabled" : "captionsdisabled"))
				}
			}
		}, {
			key: "airplay",
			value: function () {
				c.airplay && this.media.webkitShowPlaybackTargetPicker()
			}
		}, {
			key: "toggleControls",
			value: function (e) {
				var t = this;
				if (o.is.element(this.elements.controls) && this.supported.ui && !this.isAudio) {
					var i = 0,
						n = e,
						s = !1;
					if (o.is.boolean(e) || (o.is.event(e) ? (s = "enterfullscreen" === e.type, n = ["mouseenter", "mousemove", "touchstart", "touchmove", "focusin"].includes(e.type), ["mousemove", "touchmove", "touchend"].includes(e.type) && (i = 2e3), "focusin" === e.type && (i = 3e3, o.toggleClass(this.elements.controls, this.config.classNames.noTransition, !0))) : n = o.hasClass(this.elements.container, this.config.classNames.hideControls)), clearTimeout(this.timers.controls), n || this.paused || this.loading) {
						if (o.toggleClass(this.elements.container, this.config.classNames.hideControls, !1) && o.dispatchEvent.call(this, this.media, "controlsshown"), this.paused || this.loading) return;
						c.touch && (i = 3e3)
					}
					n && !this.playing || (this.timers.controls = setTimeout(function () {
						(!t.elements.controls.pressed && !t.elements.controls.hover || s) && (o.hasClass(t.elements.container, t.config.classNames.hideControls) || o.toggleClass(t.elements.controls, t.config.classNames.noTransition, !1), o.toggleClass(t.elements.container, t.config.classNames.hideControls, !0) && (o.dispatchEvent.call(t, t.media, "controlshidden"), t.config.controls.includes("settings") && !o.is.empty(t.config.settings) && b.toggleMenu.call(t, !1)))
					}, i))
				}
			}
		}, {
			key: "on",
			value: function (e, t) {
				o.on(this.elements.container, e, t)
			}
		}, {
			key: "off",
			value: function (e, t) {
				o.off(this.elements.container, e, t)
			}
		}, {
			key: "destroy",
			value: function (e) {
				var t = this,
					i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
				if (this.ready) {
					var n = function () {
						document.body.style.overflow = "", t.embed = null, i ? (Object.keys(t.elements).length && (o.removeElement(t.elements.buttons.play), o.removeElement(t.elements.captions), o.removeElement(t.elements.controls), o.removeElement(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), o.is.function(e) && e()) : (t.listeners.clear(), o.replaceElement(t.elements.original, t.elements.container), o.dispatchEvent.call(t, t.elements.original, "destroyed", !0), o.is.function(e) && e.call(t.elements.original), t.ready = !1, setTimeout(function () {
							t.elements = null, t.media = null
						}, 200))
					};
					switch (this.stop(), this.provider + ":" + this.type) {
						case "html5:video":
						case "html5:audio":
							clearTimeout(this.timers.loading), y.toggleNativeControls.call(this, !0), n();
							break;
						case "youtube:video":
							clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && this.embed.destroy(), n();
							break;
						case "vimeo:video":
							null !== this.embed && this.embed.unload().then(n), setTimeout(n, 200)
					}
				}
			}
		}, {
			key: "supports",
			value: function (e) {
				return c.mime.call(this, e)
			}
		}, {
			key: "isHTML5",
			get: function () {
				return Boolean(this.provider === t.html5)
			}
		}, {
			key: "isEmbed",
			get: function () {
				return Boolean(this.isYouTube || this.isVimeo)
			}
		}, {
			key: "isYouTube",
			get: function () {
				return Boolean(this.provider === t.youtube)
			}
		}, {
			key: "isVimeo",
			get: function () {
				return Boolean(this.provider === t.vimeo)
			}
		}, {
			key: "isVideo",
			get: function () {
				return Boolean(this.type === i.video)
			}
		}, {
			key: "isAudio",
			get: function () {
				return Boolean(this.type === i.audio)
			}
		}, {
			key: "paused",
			get: function () {
				return Boolean(this.media.paused)
			}
		}, {
			key: "playing",
			get: function () {
				return Boolean(!this.paused && !this.ended && (!this.isHTML5 || this.media.readyState > 2))
			}
		}, {
			key: "ended",
			get: function () {
				return Boolean(this.media.ended)
			}
		}, {
			key: "currentTime",
			set: function (e) {
				var t = 0;
				o.is.number(e) && (t = e), t < 0 ? t = 0 : t > this.duration && (t = this.duration), this.media.currentTime = t.toFixed(4), this.debug.log("Seeking to " + this.currentTime + " seconds")
			},
			get: function () {
				return Number(this.media.currentTime)
			}
		}, {
			key: "buffered",
			get: function () {
				var e = this.media.buffered;
				return o.is.number(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0
			}
		}, {
			key: "seeking",
			get: function () {
				return Boolean(this.media.seeking)
			}
		}, {
			key: "duration",
			get: function () {
				var e = parseInt(this.config.duration, 10),
					t = Number(this.media.duration);
				return Number.isNaN(e) ? t : e
			}
		}, {
			key: "volume",
			set: function (e) {
				var t = e;
				o.is.string(t) && (t = Number(t)), o.is.number(t) || (t = this.storage.get("volume")), o.is.number(t) || (t = this.config.volume), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, this.muted && t > 0 && (this.muted = !1)
			},
			get: function () {
				return Number(this.media.volume)
			}
		}, {
			key: "muted",
			set: function (e) {
				var t = e;
				o.is.boolean(t) || (t = this.storage.get("muted")), o.is.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t
			},
			get: function () {
				return Boolean(this.media.muted)
			}
		}, {
			key: "hasAudio",
			get: function () {
				return !this.isHTML5 || (!!this.isAudio || (Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)))
			}
		}, {
			key: "speed",
			set: function (e) {
				var t = null;
				o.is.number(e) && (t = e), o.is.number(t) || (t = this.storage.get("speed")), o.is.number(t) || (t = this.config.speed.selected), t < .1 && (t = .1), t > 2 && (t = 2), this.config.speed.options.includes(t) ? (this.config.speed.selected = t, this.media.playbackRate = t) : this.debug.warn("Unsupported speed (" + t + ")")
			},
			get: function () {
				return Number(this.media.playbackRate)
			}
		}, {
			key: "quality",
			set: function (e) {
				var t = null;
				o.is.string(e) && (t = e), o.is.string(t) || (t = this.storage.get("quality")), o.is.string(t) || (t = this.config.quality.selected), this.options.quality.includes(t) ? (this.config.quality.selected = t, this.media.quality = t) : this.debug.warn("Unsupported quality option (" + t + ")")
			},
			get: function () {
				return this.media.quality
			}
		}, {
			key: "loop",
			set: function (e) {
				var t = o.is.boolean(e) ? e : this.config.loop.active;
				this.config.loop.active = t, this.media.loop = t
			},
			get: function () {
				return Boolean(this.media.loop)
			}
		}, {
			key: "source",
			set: function (e) {
				P.change.call(this, e)
			},
			get: function () {
				return this.media.currentSrc
			}
		}, {
			key: "poster",
			set: function (e) {
				this.isHTML5 && this.isVideo ? o.is.string(e) && this.media.setAttribute("poster", e) : this.debug.warn("Poster can only be set on HTML5 video")
			},
			get: function () {
				return this.isHTML5 && this.isVideo ? this.media.getAttribute("poster") : null
			}
		}, {
			key: "autoplay",
			set: function (e) {
				var t = o.is.boolean(e) ? e : this.config.autoplay;
				this.config.autoplay = t
			},
			get: function () {
				return Boolean(this.config.autoplay)
			}
		}, {
			key: "language",
			set: function (e) {
				if (o.is.string(e) && (this.toggleCaptions(!o.is.empty(e)), !o.is.empty(e))) {
					var t = e.toLowerCase();
					this.language !== t && (this.captions.language = t, f.setText.call(this, null), f.setLanguage.call(this), o.dispatchEvent.call(this, this.media, "languagechange"))
				}
			},
			get: function () {
				return this.captions.language
			}
		}, {
			key: "pip",
			set: function (e) {
				var t = "picture-in-picture",
					i = "inline";
				if (c.pip) {
					var n = o.is.boolean(e) ? e : this.pip === i;
					this.media.webkitSetPresentationMode(n ? t : i)
				}
			},
			get: function () {
				return c.pip ? this.media.webkitPresentationMode : null
			}
		}], [{
			key: "supported",
			value: function (e, t, i) {
				return c.check(e, t, i)
			}
		}, {
			key: "loadSprite",
			value: function (e, t) {
				return o.loadSprite(e, t)
			}
		}]), e
	}()
});
//# sourceMappingURL=plyr.js.map