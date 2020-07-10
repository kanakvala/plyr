! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Plyr", t) : e.Plyr = t()
}(this, function() {
    "use strict";
    var e = {
            html5: "html5",
            youtube: "youtube",
            vimeo: "vimeo"
        },
        t = {
            audio: "audio",
            video: "video"
        },
        i = {
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
            iconUrl: "https://cdn.plyr.io/3.0.6/plyr.svg",
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
                fastForward: "Forward {seektime} secs",
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
                fastForward: null,
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
                    fastForward: '[data-plyr="fast-forward"]',
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
        };
    "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    var n, s, a = (function(e, t) {
            var i;
            i = function() {
                var e = function() {},
                    t = {},
                    i = {},
                    n = {};

                function s(e, t) {
                    if (e) {
                        var s = n[e];
                        if (i[e] = t, s)
                            for (; s.length;) s[0](e, t), s.splice(0, 1)
                    }
                }

                function a(t, i) {
                    t.call && (t = {
                        success: t
                    }), i.length ? (t.error || e)(i) : (t.success || e)(t)
                }

                function l(t, i, n, s) {
                    var a, r, o = document,
                        c = n.async,
                        u = (n.numRetries || 0) + 1,
                        d = n.before || e;
                    s = s || 0, /(^css!|\.css$)/.test(t) ? (a = !0, (r = o.createElement("link")).rel = "stylesheet", r.href = t.replace(/^css!/, "")) : ((r = o.createElement("script")).src = t, r.async = void 0 === c || c), r.onload = r.onerror = r.onbeforeload = function(e) {
                        var o = e.type[0];
                        if (a && "hideFocus" in r) try {
                            r.sheet.cssText.length || (o = "e")
                        } catch (e) {
                            o = "e"
                        }
                        if ("e" == o && (s += 1) < u) return l(t, i, n, s);
                        i(t, o, e.defaultPrevented)
                    }, !1 !== d(t, r) && o.head.appendChild(r)
                }

                function r(e, i, n) {
                    var r, o;
                    if (i && i.trim && (r = i), o = (r ? n : i) || {}, r) {
                        if (r in t) throw "LoadJS";
                        t[r] = !0
                    }! function(e, t, i) {
                        var n, s, a = (e = e.push ? e : [e]).length,
                            r = a,
                            o = [];
                        for (n = function(e, i, n) {
                                if ("e" == i && o.push(e), "b" == i) {
                                    if (!n) return;
                                    o.push(e)
                                }--a || t(o)
                            }, s = 0; s < r; s++) l(e[s], n, i)
                    }(e, function(e) {
                        a(o, e), s(r, e)
                    }, o)
                }
                return r.ready = function(e, t) {
                    return function(e, t) {
                        var s, a, l, r = [],
                            o = (e = e.push ? e : [e]).length,
                            c = o;
                        for (s = function(e, i) {
                                i.length && r.push(e), --c || t(r)
                            }; o--;) a = e[o], (l = i[a]) ? s(a, l) : (n[a] = n[a] || []).push(s)
                    }(e, function(e) {
                        a(t, e)
                    }), r
                }, r.done = function(e) {
                    s(e, [])
                }, r.reset = function() {
                    t = {}, i = {}, n = {}
                }, r.isDefined = function(e) {
                    return e in t
                }, r
            }, e.exports = i()
        }(n = {
            exports: {}
        }, n.exports), n.exports),
        l = (function() {
            function e(e) {
                this.value = e
            }

            function t(t) {
                var i, n;

                function s(i, n) {
                    try {
                        var l = t[i](n),
                            r = l.value;
                        r instanceof e ? Promise.resolve(r.value).then(function(e) {
                            s("next", e)
                        }, function(e) {
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
                this._invoke = function(e, t) {
                    return new Promise(function(a, l) {
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
            "function" == typeof Symbol && Symbol.asyncIterator && (t.prototype[Symbol.asyncIterator] = function() {
                return this
            }), t.prototype.next = function(e) {
                return this._invoke("next", e)
            }, t.prototype.throw = function(e) {
                return this._invoke("throw", e)
            }, t.prototype.return = function(e) {
                return this._invoke("return", e)
            }
        }(), function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }),
        r = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(),
        o = function(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        },
        c = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
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
        u = {
            is: {
                plyr: function(e) {
                    return this.instanceof(e, window.Plyr)
                },
                object: function(e) {
                    return this.getConstructor(e) === Object
                },
                number: function(e) {
                    return this.getConstructor(e) === Number && !Number.isNaN(e)
                },
                string: function(e) {
                    return this.getConstructor(e) === String
                },
                boolean: function(e) {
                    return this.getConstructor(e) === Boolean
                },
                function: function(e) {
                    return this.getConstructor(e) === Function
                },
                array: function(e) {
                    return !this.nullOrUndefined(e) && Array.isArray(e)
                },
                weakMap: function(e) {
                    return this.instanceof(e, window.WeakMap)
                },
                nodeList: function(e) {
                    return this.instanceof(e, window.NodeList)
                },
                element: function(e) {
                    return this.instanceof(e, window.Element)
                },
                textNode: function(e) {
                    return this.getConstructor(e) === Text
                },
                event: function(e) {
                    return this.instanceof(e, window.Event)
                },
                cue: function(e) {
                    return this.instanceof(e, window.TextTrackCue) || this.instanceof(e, window.VTTCue)
                },
                track: function(e) {
                    return this.instanceof(e, TextTrack) || !this.nullOrUndefined(e) && this.string(e.kind)
                },
                url: function(e) {
                    return !this.nullOrUndefined(e) && /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(e)
                },
                nullOrUndefined: function(e) {
                    return null === e || void 0 === e
                },
                empty: function(e) {
                    return this.nullOrUndefined(e) || (this.string(e) || this.array(e) || this.nodeList(e)) && !e.length || this.object(e) && !Object.keys(e).length
                },
                instanceof: function(e, t) {
                    return Boolean(e && t && e instanceof t)
                },
                getConstructor: function(e) {
                    return this.nullOrUndefined(e) ? null : e.constructor
                }
            },
            getBrowser: function() {
                return {
                    isIE: !!document.documentMode,
                    isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
                    isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
                    isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
                }
            },
            fetch: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
                return new Promise(function(i, n) {
                    try {
                        var s = new XMLHttpRequest;
                        if (!("withCredentials" in s)) return;
                        s.addEventListener("load", function() {
                            if ("text" === t) try {
                                i(JSON.parse(s.responseText))
                            } catch (e) {
                                i(s.responseText)
                            } else i(s.response)
                        }), s.addEventListener("error", function() {
                            throw new Error(s.statusText)
                        }), s.open("GET", e, !0), s.responseType = t, s.send()
                    } catch (e) {
                        n(e)
                    }
                })
            },
            loadScript: function(e) {
                return new Promise(function(t, i) {
                    a(e, {
                        success: t,
                        error: i
                    })
                })
            },
            loadSprite: function(e, t) {
                if (u.is.string(e)) {
                    var i = u.is.string(t),
                        n = function() {
                            return document.querySelectorAll("#" + t).length
                        };
                    if (!i || !n()) {
                        var s = document.createElement("div");
                        if (u.toggleHidden(s, !0), i && s.setAttribute("id", t), d.storage) {
                            var a = window.localStorage.getItem("cache-" + t);
                            if (null !== a) {
                                var l = JSON.parse(a);
                                return void r.call(s, l.content)
                            }
                        }
                        u.fetch(e).then(function(e) {
                            u.is.empty(e) || (d.storage && window.localStorage.setItem("cache-" + t, JSON.stringify({
                                content: e
                            })), r.call(s, e))
                        }).catch(function() {})
                    }
                }

                function r(e) {
                    i && n() || (this.innerHTML = e, document.body.insertBefore(this, document.body.childNodes[0]))
                }
            },
            generateId: function(e) {
                return e + "-" + Math.floor(1e4 * Math.random())
            },
            wrap: function(e, t) {
                var i = e.length ? e : [e];
                Array.from(i).reverse().forEach(function(e, i) {
                    var n = i > 0 ? t.cloneNode(!0) : t,
                        s = e.parentNode,
                        a = e.nextSibling;
                    n.appendChild(e), a ? s.insertBefore(n, a) : s.appendChild(n)
                })
            },
            createElement: function(e, t, i) {
                var n = document.createElement(e);
                return u.is.object(t) && u.setAttributes(n, t), u.is.string(i) && (n.textContent = i), n
            },
            insertAfter: function(e, t) {
                t.parentNode.insertBefore(e, t.nextSibling)
            },
            insertElement: function(e, t, i, n) {
                t.appendChild(u.createElement(e, i, n))
            },
            removeElement: function(e) {
                u.is.element(e) && u.is.element(e.parentNode) && (u.is.nodeList(e) || u.is.array(e) ? Array.from(e).forEach(u.removeElement) : e.parentNode.removeChild(e))
            },
            emptyElement: function(e) {
                for (var t = e.childNodes.length; t > 0;) e.removeChild(e.lastChild), t -= 1
            },
            replaceElement: function(e, t) {
                return u.is.element(t) && u.is.element(t.parentNode) && u.is.element(e) ? (t.parentNode.replaceChild(e, t), e) : null
            },
            setAttributes: function(e, t) {
                u.is.element(e) && !u.is.empty(t) && Object.entries(t).forEach(function(t) {
                    var i = c(t, 2),
                        n = i[0],
                        s = i[1];
                    e.setAttribute(n, s)
                })
            },
            getAttributesFromSelector: function(e, t) {
                if (!u.is.string(e) || u.is.empty(e)) return {};
                var i = {},
                    n = t;
                return e.split(",").forEach(function(e) {
                    var t = e.trim(),
                        s = t.replace(".", ""),
                        a = t.replace(/[[\]]/g, "").split("="),
                        l = a[0],
                        r = a.length > 1 ? a[1].replace(/["']/g, "") : "";
                    switch (t.charAt(0)) {
                        case ".":
                            u.is.object(n) && u.is.string(n.class) && (n.class += " " + s), i.class = s;
                            break;
                        case "#":
                            i.id = t.replace("#", "");
                            break;
                        case "[":
                            i[l] = r
                    }
                }), i
            },
            toggleClass: function(e, t, i) {
                if (u.is.element(e)) {
                    var n = e.classList.contains(t);
                    return e.classList[i ? "add" : "remove"](t), i && !n || !i && n
                }
                return null
            },
            hasClass: function(e, t) {
                return u.is.element(e) && e.classList.contains(t)
            },
            toggleHidden: function(e, t) {
                u.is.element(e) && (t ? e.setAttribute("hidden", "") : e.removeAttribute("hidden"))
            },
            matches: function(e, t) {
                var i = {
                    Element: Element
                };
                var n = i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function() {
                    return Array.from(document.querySelectorAll(t)).includes(this)
                };
                return n.call(e, t)
            },
            getElements: function(e) {
                return this.elements.container.querySelectorAll(e)
            },
            getElement: function(e) {
                return this.elements.container.querySelector(e)
            },
            findElements: function() {
                try {
                    return this.elements.controls = u.getElement.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
                        play: u.getElements.call(this, this.config.selectors.buttons.play),
                        pause: u.getElement.call(this, this.config.selectors.buttons.pause),
                        restart: u.getElement.call(this, this.config.selectors.buttons.restart),
                        rewind: u.getElement.call(this, this.config.selectors.buttons.rewind),
                        fastForward: u.getElement.call(this, this.config.selectors.buttons.fastForward),
                        mute: u.getElement.call(this, this.config.selectors.buttons.mute),
                        pip: u.getElement.call(this, this.config.selectors.buttons.pip),
                        airplay: u.getElement.call(this, this.config.selectors.buttons.airplay),
                        settings: u.getElement.call(this, this.config.selectors.buttons.settings),
                        captions: u.getElement.call(this, this.config.selectors.buttons.captions),
                        fullscreen: u.getElement.call(this, this.config.selectors.buttons.fullscreen)
                    }, this.elements.progress = u.getElement.call(this, this.config.selectors.progress), this.elements.inputs = {
                        seek: u.getElement.call(this, this.config.selectors.inputs.seek),
                        volume: u.getElement.call(this, this.config.selectors.inputs.volume)
                    }, this.elements.display = {
                        buffer: u.getElement.call(this, this.config.selectors.display.buffer),
                        duration: u.getElement.call(this, this.config.selectors.display.duration),
                        currentTime: u.getElement.call(this, this.config.selectors.display.currentTime)
                    }, u.is.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector("." + this.config.classNames.tooltip)), !0
                } catch (e) {
                    return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1
                }
            },
            getFocusElement: function() {
                var e = document.activeElement;
                return e = e && e !== document.body ? document.querySelector(":focus") : null
            },
            trapFocus: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (u.is.element(e)) {
                    var i = u.getElements.call(this, "button:not(:disabled), input:not(:disabled), [tabindex]"),
                        n = i[0],
                        s = i[i.length - 1],
                        a = function(e) {
                            if ("Tab" === e.key && 9 === e.keyCode) {
                                var t = u.getFocusElement();
                                t !== s || e.shiftKey ? t === n && e.shiftKey && (s.focus(), e.preventDefault()) : (n.focus(), e.preventDefault())
                            }
                        };
                    t ? u.on(this.elements.container, "keydown", a, !1) : u.off(this.elements.container, "keydown", a, !1)
                }
            },
            toggleListener: function(e, t, i) {
                var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                    s = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                    a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
                if (!u.is.empty(e) && !u.is.empty(t) && u.is.function(i))
                    if (u.is.nodeList(e) || u.is.array(e)) Array.from(e).forEach(function(e) {
                        e instanceof Node && u.toggleListener.call(null, e, t, i, n, s, a)
                    });
                    else {
                        var l = t.split(" "),
                            r = a;
                        d.passiveListeners && (r = {
                            passive: s,
                            capture: a
                        }), l.forEach(function(t) {
                            e[n ? "addEventListener" : "removeEventListener"](t, i, r)
                        })
                    }
            },
            on: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    i = arguments[2],
                    n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                    s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                u.toggleListener(e, t, i, !0, n, s)
            },
            off: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    i = arguments[2],
                    n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                    s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                u.toggleListener(e, t, i, !1, n, s)
            },
            dispatchEvent: function(e, t, i, n) {
                if (u.is.element(e) && u.is.string(t)) {
                    var s = new CustomEvent(t, {
                        bubbles: !!u.is.boolean(i) && i,
                        detail: Object.assign({}, n, {
                            plyr: u.is.plyr(this) ? this : null
                        })
                    });
                    e.dispatchEvent(s)
                }
            },
            toggleState: function(e, t) {
                if (u.is.array(e) || u.is.nodeList(e)) Array.from(e).forEach(function(e) {
                    return u.toggleState(e, t)
                });
                else if (u.is.element(e)) {
                    var i = "true" === e.getAttribute("aria-pressed"),
                        n = u.is.boolean(t) ? t : !i;
                    e.setAttribute("aria-pressed", n)
                }
            },
            getPercentage: function(e, t) {
                return 0 === e || 0 === t || Number.isNaN(e) || Number.isNaN(t) ? 0 : (e / t * 100).toFixed(2)
            },
            getHours: function(e) {
                return parseInt(e / 60 / 60 % 60, 10)
            },
            getMinutes: function(e) {
                return parseInt(e / 60 % 60, 10)
            },
            getSeconds: function(e) {
                return parseInt(e % 60, 10)
            },
            formatTime: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                if (!u.is.number(e)) return this.formatTime(null, t, i);
                var n = function(e) {
                        return ("0" + e).slice(-2)
                    },
                    s = this.getHours(e),
                    a = this.getMinutes(e),
                    l = this.getSeconds(e);
                return t || s > 0 ? s += ":" : s = "", (i ? "-" : "") + s + n(a) + ":" + n(l)
            },
            replaceAll: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString())
            },
            toTitleCase: function() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/\w\S*/g, function(e) {
                    return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
                })
            },
            toPascalCase: function() {
                var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();
                return e = u.replaceAll(e, "-", " "), e = u.replaceAll(e, "_", " "), e = u.toTitleCase(e), u.replaceAll(e, " ", "")
            },
            toCamelCase: function() {
                var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();
                return (e = u.toPascalCase(e)).charAt(0).toLowerCase() + e.slice(1)
            },
            extend: function() {
                for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
                if (!i.length) return e;
                var s = i.shift();
                return u.is.object(s) ? (Object.keys(s).forEach(function(t) {
                    u.is.object(s[t]) ? (Object.keys(e).includes(t) || Object.assign(e, o({}, t, {})), u.extend(e[t], s[t])) : Object.assign(e, o({}, t, s[t]))
                }), u.extend.apply(u, [e].concat(function(e) {
                    if (Array.isArray(e)) {
                        for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                        return i
                    }
                    return Array.from(e)
                }(i)))) : e
            },
            getProviderByUrl: function(t) {
                return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(t) ? e.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{8,}(?=\b|\/)/.test(t) ? e.vimeo : null
            },
            parseYouTubeId: function(e) {
                if (u.is.empty(e)) return null;
                return e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : e
            },
            parseVimeoId: function(e) {
                if (u.is.empty(e)) return null;
                if (u.is.number(Number(e))) return e;
                return e.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : e
            },
            parseUrl: function(e) {
                var t = document.createElement("a");
                return t.href = e, t
            },
            getUrlParams: function(e) {
                var t = e;
                (e.startsWith("http://") || e.startsWith("https://")) && (t = this.parseUrl(e).search);
                return this.is.empty(t) ? null : t.slice(t.indexOf("?") + 1).split("&").reduce(function(e, t) {
                    var i = t.split("="),
                        n = c(i, 2),
                        s = n[0],
                        a = n[1];
                    return Object.assign(e, o({}, s, decodeURIComponent(a)))
                }, {})
            },
            buildUrlParams: function(e) {
                return u.is.object(e) ? Object.keys(e).map(function(t) {
                    return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
                }).join("&") : ""
            },
            stripHTML: function(e) {
                var t = document.createDocumentFragment(),
                    i = document.createElement("div");
                return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText
            },
            getAspectRatio: function(e, t) {
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
                    i = Object.keys(t).find(function(t) {
                        return void 0 !== e.style[t]
                    });
                return !!u.is.string(i) && t[i]
            },
            repaint: function(e) {
                setTimeout(function() {
                    u.toggleHidden(e, !0), e.offsetHeight, u.toggleHidden(e, !1)
                }, 0)
            }
        },
        d = {
            audio: "canPlayType" in document.createElement("audio"),
            video: "canPlayType" in document.createElement("video"),
            check: function(e, t, i) {
                var n = !1,
                    s = !1,
                    a = u.getBrowser(),
                    l = a.isIPhone && i && d.inline;
                switch (t + ":" + e) {
                    case "html5:video":
                        s = (n = d.video) && d.rangeInput && (!a.isIPhone || l);
                        break;
                    case "html5:audio":
                        s = (n = d.audio) && d.rangeInput;
                        break;
                    case "youtube:video":
                    case "vimeo:video":
                        n = !0, s = d.rangeInput && (!a.isIPhone || l);
                        break;
                    default:
                        s = (n = d.audio && d.video) && d.rangeInput
                }
                return {
                    api: n,
                    ui: s
                }
            },
            pip: !u.getBrowser().isIPhone && u.is.function(u.createElement("video").webkitSetPresentationMode),
            airplay: u.is.function(window.WebKitPlaybackTargetAvailabilityEvent),
            inline: "playsInline" in document.createElement("video"),
            mime: function(e) {
                var t = this.media;
                try {
                    if (!this.isHTML5 || !u.is.function(t.canPlayType)) return !1;
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
            passiveListeners: function() {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function() {
                            return e = !0, null
                        }
                    });
                    window.addEventListener("test", null, t)
                } catch (e) {}
                return e
            }(),
            rangeInput: (s = document.createElement("input"), s.type = "range", "range" === s.type),
            touch: "ontouchstart" in document.documentElement,
            transitions: !1 !== u.transitionEndEvent,
            reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
        },
        p = function() {},
        h = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                l(this, e), this.enabled = window.console && t, this.enabled && this.log("Debugging enabled")
            }
            return r(e, [{
                key: "log",
                get: function() {
                    return this.enabled ? Function.prototype.bind.call(console.log, console) : p
                }
            }, {
                key: "warn",
                get: function() {
                    return this.enabled ? Function.prototype.bind.call(console.warn, console) : p
                }
            }, {
                key: "error",
                get: function() {
                    return this.enabled ? Function.prototype.bind.call(console.error, console) : p
                }
            }]), e
        }(),
        m = u.getBrowser();

    function g() {
        if (this.enabled) {
            var e = this.player.elements.buttons.fullscreen;
            u.is.element(e) && u.toggleState(e, this.active), u.dispatchEvent(this.target, this.active ? "enterfullscreen" : "exitfullscreen", !0), m.isIos || u.trapFocus.call(this.player, this.target, this.active)
        }
    }

    function f() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        e ? this.scrollPosition = {
            x: window.scrollX || 0,
            y: window.scrollY || 0
        } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", u.toggleClass(this.target, this.player.config.classNames.fullscreen.fallback, e), g.call(this)
    }
    var y = function() {
            function e(t) {
                var i = this;
                l(this, e), this.player = t, this.prefix = e.prefix, this.name = e.name, this.scrollPosition = {
                    x: 0,
                    y: 0
                }, u.on(document, "ms" === this.prefix ? "MSFullscreenChange" : this.prefix + "fullscreenchange", function() {
                    g.call(i)
                }), u.on(this.player.elements.container, "dblclick", function() {
                    i.toggle()
                }), u.on(this.player.elements.controls, "dblclick", function(e) {
                    return e.stopPropagation()
                }), this.update()
            }
            return r(e, [{
                key: "update",
                value: function() {
                    this.enabled ? this.player.debug.log((e.native ? "Native" : "Fallback") + " fullscreen enabled") : this.player.debug.log("Fullscreen not supported and fallback disabled"), u.toggleClass(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled)
                }
            }, {
                key: "enter",
                value: function() {
                    this.enabled && (m.isIos && this.player.config.fullscreen.iosNative ? this.player.playing && this.target.webkitEnterFullscreen() : e.native ? this.prefix ? u.is.empty(this.prefix) || this.target[this.prefix + "Request" + this.name]() : this.target.requestFullscreen() : f.call(this, !0))
                }
            }, {
                key: "exit",
                value: function() {
                    if (this.enabled)
                        if (m.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), this.player.play();
                        else if (e.native)
                        if (this.prefix) {
                            if (!u.is.empty(this.prefix)) {
                                var t = "moz" === this.prefix ? "Cancel" : "Exit";
                                document["" + this.prefix + t + this.name]()
                            }
                        } else document.cancelFullScreen();
                    else f.call(this, !1)
                }
            }, {
                key: "toggle",
                value: function() {
                    this.active ? this.exit() : this.enter()
                }
            }, {
                key: "enabled",
                get: function() {
                    return (e.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo
                }
            }, {
                key: "active",
                get: function() {
                    return !!this.enabled && (e.native ? (this.prefix ? document["" + this.prefix + this.name + "Element"] : document.fullscreenElement) === this.target : u.hasClass(this.target, this.player.config.classNames.fullscreen.fallback))
                }
            }, {
                key: "target",
                get: function() {
                    return m.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.container
                }
            }], [{
                key: "native",
                get: function() {
                    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
                }
            }, {
                key: "prefix",
                get: function() {
                    if (u.is.function(document.exitFullscreen)) return !1;
                    var e = "";
                    return ["webkit", "moz", "ms"].some(function(t) {
                        return !(!u.is.function(document[t + "ExitFullscreen"]) && !u.is.function(document[t + "CancelFullScreen"])) && (e = t, !0)
                    }), e
                }
            }, {
                key: "name",
                get: function() {
                    return "moz" === this.prefix ? "FullScreen" : "Fullscreen"
                }
            }]), e
        }(),
        v = {
            setup: function() {
                if (this.supported.ui) {
                    var e = this.storage.get("language");
                    if (u.is.empty(e) || (this.captions.language = e), u.is.empty(this.captions.language) && (this.captions.language = this.config.captions.language.toLowerCase()), !u.is.boolean(this.captions.active)) {
                        var t = this.storage.get("captions");
                        u.is.boolean(t) ? this.captions.active = t : this.captions.active = this.config.captions.active
                    }
                    if (!this.isVideo || this.isYouTube || this.isHTML5 && !d.textTracks) u.is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && E.setCaptionsMenu.call(this);
                    else {
                        u.is.element(this.elements.captions) || (this.elements.captions = u.createElement("div", u.getAttributesFromSelector(this.config.selectors.captions)), u.insertAfter(this.elements.captions, this.elements.wrapper)), u.toggleClass(this.elements.container, this.config.classNames.captions.enabled, !u.is.empty(v.getTracks.call(this)));
                        var i = v.getTracks.call(this);
                        if (!u.is.empty(i)) {
                            if (u.getBrowser().isIE && window.URL) {
                                var n = this.media.querySelectorAll("track");
                                Array.from(n).forEach(function(e) {
                                    var t = e.getAttribute("src"),
                                        i = u.parseUrl(t);
                                    i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && u.fetch(t, "blob").then(function(t) {
                                        e.setAttribute("src", window.URL.createObjectURL(t))
                                    }).catch(function() {
                                        u.removeElement(e)
                                    })
                                })
                            }
                            v.setLanguage.call(this), v.show.call(this), u.is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && E.setCaptionsMenu.call(this)
                        }
                    }
                }
            },
            setLanguage: function() {
                var e = this;
                if (this.isHTML5 && this.isVideo) {
                    v.getTracks.call(this).forEach(function(t) {
                        u.on(t, "cuechange", function(t) {
                            return v.setCue.call(e, t)
                        }), t.mode = "hidden"
                    });
                    var t = v.getCurrentTrack.call(this);
                    u.is.track(t) && Array.from(t.activeCues || []).length && v.setCue.call(this, t)
                } else this.isVimeo && this.captions.active && this.embed.enableTextTrack(this.language)
            },
            getTracks: function() {
                return u.is.nullOrUndefined(this.media) ? [] : Array.from(this.media.textTracks || []).filter(function(e) {
                    return ["captions", "subtitles"].includes(e.kind)
                })
            },
            getCurrentTrack: function() {
                var e = this;
                return v.getTracks.call(this).find(function(t) {
                    return t.language.toLowerCase() === e.language
                })
            },
            setCue: function(e) {
                var t = u.is.event(e) ? e.target : e,
                    i = t.activeCues,
                    n = i.length && i[0];
                t === v.getCurrentTrack.call(this) && (u.is.cue(n) ? v.setText.call(this, n.getCueAsHTML()) : v.setText.call(this, null), u.dispatchEvent.call(this, this.media, "cuechange"))
            },
            setText: function(e) {
                if (this.supported.ui)
                    if (u.is.element(this.elements.captions)) {
                        var t = u.createElement("span");
                        u.emptyElement(this.elements.captions);
                        var i = u.is.nullOrUndefined(e) ? "" : e;
                        u.is.string(i) ? t.textContent = i.trim() : t.appendChild(i), this.elements.captions.appendChild(t)
                    } else this.debug.warn("No captions element to render to")
            },
            show: function() {
                if (u.is.element(this.elements.buttons.captions)) {
                    var e = this.storage.get("captions");
                    u.is.boolean(e) ? this.captions.active = e : e = this.config.captions.active, e && (u.toggleClass(this.elements.container, this.config.classNames.captions.active, !0), u.toggleState(this.elements.buttons.captions, !0))
                }
            }
        },
        b = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (u.is.empty(e) || u.is.empty(t) || !Object.keys(t.i18n).includes(e)) return "";
            var i = t.i18n[e],
                n = {
                    "{seektime}": t.seekTime,
                    "{title}": t.title
                };
            return Object.entries(n).forEach(function(e) {
                var t = c(e, 2),
                    n = t[0],
                    s = t[1];
                i = u.replaceAll(i, n, s)
            }), i
        },
        k = {
            addStyleHook: function() {
                u.toggleClass(this.elements.container, this.config.selectors.container.replace(".", ""), !0), u.toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui)
            },
            toggleNativeControls: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls")
            },
            build: function() {
                var e = this;
                if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for " + this.provider + " " + this.type), void k.toggleNativeControls.call(this, !0);
                u.is.element(this.elements.controls) || (E.inject.call(this), this.listeners.controls()), u.is.element(this.elements.controls) && (k.toggleNativeControls.call(this), v.setup.call(this), this.volume = null, this.muted = null, this.speed = null, this.loop = null, this.options.quality = [], k.timeUpdate.call(this), k.checkPlaying.call(this), this.ready = !0, setTimeout(function() {
                    u.dispatchEvent.call(e, e.media, "ready")
                }, 0), k.setTitle.call(this))
            },
            setTitle: function() {
                var e = b("play", this.config);
                if (u.is.string(this.config.title) && !u.is.empty(this.config.title) && (e += ", " + this.config.title, this.elements.container.setAttribute("aria-label", this.config.title)), u.is.nodeList(this.elements.buttons.play) && Array.from(this.elements.buttons.play).forEach(function(t) {
                        t.setAttribute("aria-label", e)
                    }), this.isEmbed) {
                    var t = u.getElement.call(this, "iframe");
                    if (!u.is.element(t)) return;
                    u.is.empty(this.config.title) || this.config.title;
                    t.setAttribute("title", b("frameTitle", this.config))
                }
            },
            checkPlaying: function() {
                u.toggleClass(this.elements.container, this.config.classNames.playing, this.playing), u.toggleClass(this.elements.container, this.config.classNames.stopped, this.paused), u.toggleState(this.elements.buttons.play, this.playing), this.toggleControls(!this.playing)
            },
            checkLoading: function(e) {
                var t = this;
                this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(function() {
                    u.toggleClass(t.elements.container, t.config.classNames.loading, t.loading), t.toggleControls(t.loading)
                }, this.loading ? 250 : 0)
            },
            checkFailed: function() {
                var e = this;
                this.failed = 3 === this.media.networkState, this.failed && (u.toggleClass(this.elements.container, this.config.classNames.loading, !1), u.toggleClass(this.elements.container, this.config.classNames.error, !0)), clearTimeout(this.timers.failed), this.timers.loading = setTimeout(function() {
                    u.toggleClass(e.elements.container, e.config.classNames.loading, e.loading), e.toggleControls(e.loading)
                }, this.loading ? 250 : 0)
            },
            updateVolume: function() {
                this.supported.ui && (u.is.element(this.elements.inputs.volume) && k.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), u.is.element(this.elements.buttons.mute) && u.toggleState(this.elements.buttons.mute, this.muted || 0 === this.volume))
            },
            setRange: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                u.is.element(e) && (e.value = t, E.updateRangeFill.call(this, e))
            },
            setProgress: function(e, t) {
                var i = u.is.number(t) ? t : 0,
                    n = u.is.element(e) ? e : this.elements.display.buffer;
                if (u.is.element(n)) {
                    n.value = i;
                    var s = n.getElementsByTagName("span")[0];
                    u.is.element(s) && (s.childNodes[0].nodeValue = i)
                }
            },
            updateProgress: function(e) {
                if (this.supported.ui && u.is.event(e)) {
                    var t = 0;
                    if (e) switch (e.type) {
                        case "timeupdate":
                        case "seeking":
                            t = u.getPercentage(this.currentTime, this.duration), "timeupdate" === e.type && k.setRange.call(this, this.elements.inputs.seek, t);
                            break;
                        case "playing":
                        case "progress":
                            k.setProgress.call(this, this.elements.display.buffer, 100 * this.buffered)
                    }
                }
            },
            updateTimeDisplay: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                if (u.is.element(e) && u.is.number(t)) {
                    var n = u.getHours(this.duration) > 0;
                    e.textContent = u.formatTime(t, n, i)
                }
            },
            timeUpdate: function(e) {
                var t = !u.is.element(this.elements.display.duration) && this.config.invertTime;
                k.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || k.updateProgress.call(this, e)
            },
            durationUpdate: function() {
                if (this.supported.ui) {
                    var e = u.is.element(this.elements.display.duration);
                    !e && this.config.displayDuration && this.paused && k.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && k.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), E.updateSeekTooltip.call(this)
                }
            }
        },
        w = u.getBrowser(),
        E = {
            updateRangeFill: function(e) {
                if (w.isWebkit) {
                    var t = u.is.event(e) ? e.target : e;
                    u.is.element(t) && "range" === t.getAttribute("type") && t.style.setProperty("--value", t.value / t.max * 100 + "%")
                }
            },
            getIconUrl: function() {
                return {
                    url: this.config.iconUrl,
                    absolute: 0 === this.config.iconUrl.indexOf("http") || w.isIE && !window.svg4everybody
                }
            },
            createIcon: function(e, t) {
                var i = E.getIconUrl.call(this),
                    n = (i.absolute ? "" : i.url) + "#" + this.config.iconPrefix,
                    s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                u.setAttributes(s, u.extend(t, {
                    role: "presentation"
                }));
                var a = document.createElementNS("http://www.w3.org/2000/svg", "use"),
                    l = n + "-" + e;
                return "href" in a ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", l) : a.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l), s.appendChild(a), s
            },
            createLabel: function(e, t) {
                var i = b(e, this.config),
                    n = Object.assign({}, t);
                switch (e) {
                    case "pip":
                        i = "PIP";
                        break;
                    case "airplay":
                        i = "AirPlay"
                }
                return "class" in n ? n.class += " " + this.config.classNames.hidden : n.class = this.config.classNames.hidden, u.createElement("span", n, i)
            },
            createBadge: function(e) {
                if (u.is.empty(e)) return null;
                var t = u.createElement("span", {
                    class: this.config.classNames.menu.value
                });
                return t.appendChild(u.createElement("span", {
                    class: this.config.classNames.menu.badge
                }, e)), t
            },
            createButton: function(e, t) {
                var i = u.createElement("button"),
                    n = Object.assign({}, t),
                    s = u.toCamelCase(e),
                    a = !1,
                    l = void 0,
                    r = void 0,
                    o = void 0,
                    c = void 0;
                switch ("type" in n || (n.type = "button"), "class" in n ? n.class.includes(this.config.classNames.control) && (n.class += " " + this.config.classNames.control) : n.class = this.config.classNames.control, e) {
                    case "play":
                        a = !0, l = "play", o = "pause", r = "play", c = "pause";
                        break;
                    case "mute":
                        a = !0, l = "mute", o = "unmute", r = "volume", c = "muted";
                        break;
                    case "captions":
                        a = !0, l = "enableCaptions", o = "disableCaptions", r = "captions-off", c = "captions-on";
                        break;
                    case "fullscreen":
                        a = !0, l = "enterFullscreen", o = "exitFullscreen", r = "enter-fullscreen", c = "exit-fullscreen";
                        break;
                    case "play-large":
                        n.class += " " + this.config.classNames.control + "--overlaid", s = "play", l = "play", r = "play";
                        break;
                    default:
                        l = s, r = e
                }
                return a ? (i.appendChild(E.createIcon.call(this, c, {
                    class: "icon--pressed"
                })), i.appendChild(E.createIcon.call(this, r, {
                    class: "icon--not-pressed"
                })), i.appendChild(E.createLabel.call(this, o, {
                    class: "label--pressed"
                })), i.appendChild(E.createLabel.call(this, l, {
                    class: "label--not-pressed"
                })), n["aria-pressed"] = !1, n["aria-label"] = b(l, this.config)) : (i.appendChild(E.createIcon.call(this, r)), i.appendChild(E.createLabel.call(this, l))), u.extend(n, u.getAttributesFromSelector(this.config.selectors.buttons[s], n)), u.setAttributes(i, n), "play" === s ? (u.is.array(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(i)) : this.elements.buttons[s] = i, i
            },
            createRange: function(e, t) {
                var i = u.createElement("label", {
                        for: t.id,
                        class: this.config.classNames.hidden
                    }, b(e, this.config)),
                    n = u.createElement("input", u.extend(u.getAttributesFromSelector(this.config.selectors.inputs[e]), {
                        type: "range",
                        min: 0,
                        max: 100,
                        step: .01,
                        value: 0,
                        autocomplete: "off"
                    }, t));
                return this.elements.inputs[e] = n, E.updateRangeFill.call(this, n), {
                    label: i,
                    input: n
                }
            },
            createProgress: function(e, t) {
                var i = u.createElement("progress", u.extend(u.getAttributesFromSelector(this.config.selectors.display[e]), {
                    min: 0,
                    max: 100,
                    value: 0
                }, t));
                if ("volume" !== e) {
                    i.appendChild(u.createElement("span", null, "0"));
                    var n = "";
                    switch (e) {
                        case "played":
                            n = b("played", this.config);
                            break;
                        case "buffer":
                            n = b("buffered", this.config)
                    }
                    i.textContent = "% " + n.toLowerCase()
                }
                return this.elements.display[e] = i, i
            },
            createTime: function(e) {
                var t = u.createElement("div", {
                    class: "plyr__time"
                });
                return t.appendChild(u.createElement("span", {
                    class: this.config.classNames.hidden
                }, b(e, this.config))), t.appendChild(u.createElement("span", u.getAttributesFromSelector(this.config.selectors.display[e]), "00:00")), this.elements.display[e] = t, t
            },
            createMenuItem: function(e, t, i, n) {
                var s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null,
                    a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5],
                    l = u.createElement("li"),
                    r = u.createElement("label", {
                        class: this.config.classNames.control
                    }),
                    o = u.createElement("input", u.extend(u.getAttributesFromSelector(this.config.selectors.inputs[i]), {
                        type: "radio",
                        name: "plyr-" + i,
                        value: e,
                        checked: a,
                        class: "plyr__sr-only"
                    })),
                    c = u.createElement("span", {
                        "aria-hidden": !0
                    });
                r.appendChild(o), r.appendChild(c), r.insertAdjacentHTML("beforeend", n), u.is.element(s) && r.appendChild(s), l.appendChild(r), t.appendChild(l)
            },
            updateSeekTooltip: function(e) {
                var t = this;
                if (this.config.tooltips.seek && u.is.element(this.elements.inputs.seek) && u.is.element(this.elements.display.seekTooltip) && 0 !== this.duration) {
                    var i = 0,
                        n = this.elements.inputs.seek.getBoundingClientRect(),
                        s = this.config.classNames.tooltip + "--visible",
                        a = function(e) {
                            u.toggleClass(t.elements.display.seekTooltip, s, e)
                        };
                    if (this.touch) a(!1);
                    else {
                        if (u.is.event(e)) i = 100 / n.width * (e.pageX - n.left);
                        else {
                            if (!u.hasClass(this.elements.display.seekTooltip, s)) return;
                            i = parseFloat(this.elements.display.seekTooltip.style.left, 10)
                        }
                        i < 0 ? i = 0 : i > 100 && (i = 100), k.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * i), this.elements.display.seekTooltip.style.left = i + "%", u.is.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && a("mouseenter" === e.type)
                    }
                }
            },
            toggleTab: function(e, t) {
                var i = this.elements.settings.tabs[e],
                    n = this.elements.settings.panes[e];
                u.toggleHidden(i, !t), u.toggleHidden(n, !t)
            },
            setQualityMenu: function(e) {
                var t = this;
                if (u.is.element(this.elements.settings.panes.quality)) {
                    var i = this.elements.settings.panes.quality.querySelector("ul");
                    u.is.array(e) ? this.options.quality = e.filter(function(e) {
                        return t.config.quality.options.includes(e)
                    }) : this.options.quality = this.config.quality.options;
                    var n = !u.is.empty(this.options.quality) && this.isYouTube;
                    if (E.toggleTab.call(this, "quality", n), n) {
                        u.emptyElement(i);
                        this.options.quality.forEach(function(e) {
                            return E.createMenuItem.call(t, e, i, "quality", E.getLabel.call(t, "quality", e), function(e) {
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
                                return i.length ? E.createBadge.call(t, i) : null
                            }(e))
                        }), E.updateSetting.call(this, "quality", i)
                    }
                }
            },
            getLabel: function(e, t) {
                switch (e) {
                    case "speed":
                        return 1 === t ? "Normal" : t + "&times;";
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
                        return E.getLanguage.call(this);
                    default:
                        return null
                }
            },
            updateSetting: function(e, t) {
                var i = this.elements.settings.panes[e],
                    n = null,
                    s = t;
                switch (e) {
                    case "captions":
                        n = this.captions.active ? this.captions.language : b("disabled", this.config);
                        break;
                    default:
                        if (n = this[e], u.is.empty(n) && (n = this.config[e].default), !this.options[e].includes(n)) return void this.debug.warn("Unsupported value of '" + n + "' for " + e);
                        if (!this.config[e].options.includes(n)) return void this.debug.warn("Disabled value of '" + n + "' for " + e)
                }(u.is.element(s) || (s = i && i.querySelector("ul")), u.is.empty(n)) || (this.elements.settings.tabs[e].querySelector("." + this.config.classNames.menu.value).innerHTML = E.getLabel.call(this, e, n));
                var a = s && s.querySelector('input[value="' + n + '"]');
                u.is.element(a) && (a.checked = !0)
            },
            getLanguage: function() {
                if (!this.supported.ui) return null;
                if (d.textTracks && v.getTracks.call(this).length && this.captions.active) {
                    var e = v.getCurrentTrack.call(this);
                    if (u.is.track(e)) return e.label
                }
                return b("disabled", this.config)
            },
            setCaptionsMenu: function() {
                var e = this,
                    t = this.elements.settings.panes.captions.querySelector("ul"),
                    i = v.getTracks.call(this).length;
                if (E.toggleTab.call(this, "captions", i), u.emptyElement(t), i) {
                    var n = v.getTracks.call(this).map(function(e) {
                        return {
                            language: e.language,
                            label: u.is.empty(e.label) ? e.language.toUpperCase() : e.label
                        }
                    });
                    n.unshift({
                        language: "",
                        label: b("disabled", this.config)
                    }), n.forEach(function(i) {
                        E.createMenuItem.call(e, i.language, t, "language", i.label || i.language, E.createBadge.call(e, i.language.toUpperCase()), i.language.toLowerCase() === e.captions.language.toLowerCase())
                    }), E.updateSetting.call(this, "captions", t)
                }
            },
            setSpeedMenu: function(e) {
                var t = this;
                if (this.config.controls.includes("settings") && this.config.settings.includes("speed") && u.is.element(this.elements.settings.panes.speed)) {
                    u.is.array(e) ? this.options.speed = e : this.options.speed = [.5, .75, 1, 1.25, 1.5, 1.75, 2], this.options.speed = this.options.speed.filter(function(e) {
                        return t.config.speed.options.includes(e)
                    });
                    var i = !u.is.empty(this.options.speed);
                    if (E.toggleTab.call(this, "speed", i), E.checkMenu.call(this), i) {
                        var n = this.elements.settings.panes.speed.querySelector("ul");
                        u.toggleHidden(this.elements.settings.tabs.speed, !1), u.toggleHidden(this.elements.settings.panes.speed, !1), u.emptyElement(n), this.options.speed.forEach(function(e) {
                            return E.createMenuItem.call(t, e, n, "speed", E.getLabel.call(t, "speed", e))
                        }), E.updateSetting.call(this, "speed", n)
                    }
                }
            },
            checkMenu: function() {
                var e = null !== this.elements.settings.tabs.speed.getAttribute("hidden"),
                    t = null !== this.elements.settings.tabs.captions.getAttribute("hidden");
                u.toggleHidden(this.elements.settings.menu, e && t)
            },
            toggleMenu: function(e) {
                var t = this.elements.settings.form,
                    i = this.elements.buttons.settings;
                if (u.is.element(t) && u.is.element(i)) {
                    var n = u.is.boolean(e) ? e : u.is.element(t) && "true" === t.getAttribute("aria-hidden");
                    if (u.is.event(e)) {
                        var s = u.is.element(t) && t.contains(e.target),
                            a = e.target === this.elements.buttons.settings;
                        if (s || !s && !a && n) return;
                        a && e.stopPropagation()
                    }
                    u.is.element(i) && i.setAttribute("aria-expanded", n), u.is.element(t) && (t.setAttribute("aria-hidden", !n), u.toggleClass(this.elements.container, this.config.classNames.menu.open, n), n ? t.removeAttribute("tabindex") : t.setAttribute("tabindex", -1))
                }
            },
            getTabSize: function(e) {
                var t = e.cloneNode(!0);
                t.style.position = "absolute", t.style.opacity = 0, t.setAttribute("aria-hidden", !1), Array.from(t.querySelectorAll("input[name]")).forEach(function(e) {
                    var t = e.getAttribute("name");
                    e.setAttribute("name", t + "-clone")
                }), e.parentNode.appendChild(t);
                var i = t.scrollWidth,
                    n = t.scrollHeight;
                return u.removeElement(t), {
                    width: i,
                    height: n
                }
            },
            showTab: function(e) {
                var t = this.elements.settings.menu,
                    i = e.target,
                    n = "false" === i.getAttribute("aria-expanded"),
                    s = document.getElementById(i.getAttribute("aria-controls"));
                if (u.is.element(s) && "tabpanel" === s.getAttribute("role")) {
                    var a = t.querySelector('[role="tabpanel"][aria-hidden="false"]'),
                        l = a.parentNode;
                    if (Array.from(t.querySelectorAll('[aria-controls="' + a.getAttribute("id") + '"]')).forEach(function(e) {
                            e.setAttribute("aria-expanded", !1)
                        }), d.transitions && !d.reducedMotion) {
                        l.style.width = a.scrollWidth + "px", l.style.height = a.scrollHeight + "px";
                        var r = E.getTabSize.call(this, s);
                        u.on(l, u.transitionEndEvent, function e(t) {
                            t.target === l && ["width", "height"].includes(t.propertyName) && (l.style.width = "", l.style.height = "", u.off(l, u.transitionEndEvent, e))
                        }), l.style.width = r.width + "px", l.style.height = r.height + "px"
                    }
                    a.setAttribute("aria-hidden", !0), a.setAttribute("tabindex", -1), s.setAttribute("aria-hidden", !n), i.setAttribute("aria-expanded", n), s.removeAttribute("tabindex"), s.querySelectorAll("button:not(:disabled), input:not(:disabled), [tabindex]")[0].focus()
                }
            },
            create: function(e) {
                var t = this;
                if (u.is.empty(this.config.controls)) return null;
                var i = u.createElement("div", u.getAttributesFromSelector(this.config.selectors.controls.wrapper));
                if (this.config.controls.includes("restart") && i.appendChild(E.createButton.call(this, "restart")), this.config.controls.includes("rewind") && i.appendChild(E.createButton.call(this, "rewind")), this.config.controls.includes("play") && i.appendChild(E.createButton.call(this, "play")), this.config.controls.includes("fast-forward") && i.appendChild(E.createButton.call(this, "fast-forward")), this.config.controls.includes("progress")) {
                    var n = u.createElement("div", u.getAttributesFromSelector(this.config.selectors.progress)),
                        s = E.createRange.call(this, "seek", {
                            id: "plyr-seek-" + e.id
                        });
                    if (n.appendChild(s.label), n.appendChild(s.input), n.appendChild(E.createProgress.call(this, "buffer")), this.config.tooltips.seek) {
                        var a = u.createElement("span", {
                            role: "tooltip",
                            class: this.config.classNames.tooltip
                        }, "00:00");
                        n.appendChild(a), this.elements.display.seekTooltip = a
                    }
                    this.elements.progress = n, i.appendChild(this.elements.progress)
                }
                if (this.config.controls.includes("current-time") && i.appendChild(E.createTime.call(this, "currentTime")), this.config.controls.includes("duration") && i.appendChild(E.createTime.call(this, "duration")), this.config.controls.includes("mute") && i.appendChild(E.createButton.call(this, "mute")), this.config.controls.includes("volume")) {
                    var l = u.createElement("div", {
                            class: "plyr__volume"
                        }),
                        r = {
                            max: 1,
                            step: .05,
                            value: this.config.volume
                        },
                        o = E.createRange.call(this, "volume", u.extend(r, {
                            id: "plyr-volume-" + e.id
                        }));
                    l.appendChild(o.label), l.appendChild(o.input), this.elements.volume = l, i.appendChild(l)
                }
                if (this.config.controls.includes("captions") && i.appendChild(E.createButton.call(this, "captions")), this.config.controls.includes("settings") && !u.is.empty(this.config.settings)) {
                    var c = u.createElement("div", {
                        class: "plyr__menu"
                    });
                    c.appendChild(E.createButton.call(this, "settings", {
                        id: "plyr-settings-toggle-" + e.id,
                        "aria-haspopup": !0,
                        "aria-controls": "plyr-settings-" + e.id,
                        "aria-expanded": !1
                    }));
                    var p = u.createElement("form", {
                            class: "plyr__menu__container",
                            id: "plyr-settings-" + e.id,
                            "aria-hidden": !0,
                            "aria-labelled-by": "plyr-settings-toggle-" + e.id,
                            role: "tablist",
                            tabindex: -1
                        }),
                        h = u.createElement("div"),
                        m = u.createElement("div", {
                            id: "plyr-settings-" + e.id + "-home",
                            "aria-hidden": !1,
                            "aria-labelled-by": "plyr-settings-toggle-" + e.id,
                            role: "tabpanel"
                        }),
                        g = u.createElement("ul", {
                            role: "tablist"
                        });
                    this.config.settings.forEach(function(i) {
                        var n = u.createElement("li", {
                                role: "tab",
                                hidden: ""
                            }),
                            s = u.createElement("button", u.extend(u.getAttributesFromSelector(t.config.selectors.buttons.settings), {
                                type: "button",
                                class: t.config.classNames.control + " " + t.config.classNames.control + "--forward",
                                id: "plyr-settings-" + e.id + "-" + i + "-tab",
                                "aria-haspopup": !0,
                                "aria-controls": "plyr-settings-" + e.id + "-" + i,
                                "aria-expanded": !1
                            }), b(i, t.config)),
                            a = u.createElement("span", {
                                class: t.config.classNames.menu.value
                            });
                        a.innerHTML = e[i], s.appendChild(a), n.appendChild(s), g.appendChild(n), t.elements.settings.tabs[i] = n
                    }), m.appendChild(g), h.appendChild(m), this.config.settings.forEach(function(i) {
                        var n = u.createElement("div", {
                                id: "plyr-settings-" + e.id + "-" + i,
                                "aria-hidden": !0,
                                "aria-labelled-by": "plyr-settings-" + e.id + "-" + i + "-tab",
                                role: "tabpanel",
                                tabindex: -1,
                                hidden: ""
                            }),
                            s = u.createElement("button", {
                                type: "button",
                                class: t.config.classNames.control + " " + t.config.classNames.control + "--back",
                                "aria-haspopup": !0,
                                "aria-controls": "plyr-settings-" + e.id + "-home",
                                "aria-expanded": !1
                            }, b(i, t.config));
                        n.appendChild(s);
                        var a = u.createElement("ul");
                        n.appendChild(a), h.appendChild(n), t.elements.settings.panes[i] = n
                    }), p.appendChild(h), c.appendChild(p), i.appendChild(c), this.elements.settings.form = p, this.elements.settings.menu = c
                }
                return this.config.controls.includes("pip") && d.pip && i.appendChild(E.createButton.call(this, "pip")), this.config.controls.includes("airplay") && d.airplay && i.appendChild(E.createButton.call(this, "airplay")), this.config.controls.includes("fullscreen") && i.appendChild(E.createButton.call(this, "fullscreen")), this.config.controls.includes("play-large") && this.elements.container.appendChild(E.createButton.call(this, "play-large")), this.elements.controls = i, this.isHTML5 && E.setSpeedMenu.call(this), i
            },
            inject: function() {
                var e = this;
                if (this.config.loadSprite) {
                    var t = E.getIconUrl.call(this);
                    t.absolute && u.loadSprite(t.url, "sprite-plyr")
                }
                this.id = Math.floor(1e4 * Math.random());
                var i = null;
                this.elements.controls = null, i = u.is.string(this.config.controls) || u.is.element(this.config.controls) ? this.config.controls : u.is.function(this.config.controls) ? this.config.controls({
                    id: this.id,
                    seektime: this.config.seekTime,
                    title: this.config.title
                }) : E.create.call(this, {
                    id: this.id,
                    seektime: this.config.seekTime,
                    speed: this.speed,
                    quality: this.quality,
                    captions: E.getLanguage.call(this)
                });
                var n = void 0;
                if (u.is.string(this.config.selectors.controls.container) && (n = document.querySelector(this.config.selectors.controls.container)), u.is.element(n) || (n = this.elements.container), u.is.element(i) ? n.appendChild(i) : n.insertAdjacentHTML("beforeend", i), u.is.element(this.elements.controls) || u.findElements.call(this), window.navigator.userAgent.includes("Edge") && u.repaint(n), this.config.tooltips.controls) {
                    var s = u.getElements.call(this, [this.config.selectors.controls.wrapper, " ", this.config.selectors.labels, " .", this.config.classNames.hidden].join(""));
                    Array.from(s).forEach(function(t) {
                        u.toggleClass(t, e.config.classNames.hidden, !1), u.toggleClass(t, e.config.classNames.tooltip, !0), t.setAttribute("role", "tooltip")
                    })
                }
            }
        },
        T = u.getBrowser(),
        C = function() {
            function e(t) {
                l(this, e), this.player = t, this.lastKey = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.firstTouch = this.firstTouch.bind(this)
            }
            return r(e, [{
                key: "handleKey",
                value: function(e) {
                    var t = this,
                        i = e.keyCode ? e.keyCode : e.which,
                        n = "keydown" === e.type,
                        s = n && i === this.lastKey;
                    if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && u.is.number(i)) {
                        if (n) {
                            var a = u.getFocusElement();
                            if (u.is.element(a) && u.matches(a, this.player.config.selectors.editable)) return;
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
                value: function(e) {
                    E.toggleMenu.call(this.player, e)
                }
            }, {
                key: "firstTouch",
                value: function() {
                    this.player.touch = !0, u.toggleClass(this.player.elements.container, this.player.config.classNames.isTouch, !0), u.off(document.body, "touchstart", this.firstTouch)
                }
            }, {
                key: "global",
                value: function() {
                    var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                    this.player.config.keyboard.global && u.toggleListener(window, "keydown keyup", this.handleKey, e, !1), u.toggleListener(document.body, "click", this.toggleMenu, e), u.on(document.body, "touchstart", this.firstTouch)
                }
            }, {
                key: "container",
                value: function() {
                    var e = this;
                    !this.player.config.keyboard.global && this.player.config.keyboard.focused && u.on(this.player.elements.container, "keydown keyup", this.handleKey, !1), u.on(this.player.elements.container, "focusout", function(t) {
                        u.toggleClass(t.target, e.player.config.classNames.tabFocus, !1)
                    }), u.on(this.player.elements.container, "keydown", function(t) {
                        9 === t.keyCode && setTimeout(function() {
                            u.toggleClass(u.getFocusElement(), e.player.config.classNames.tabFocus, !0)
                        }, 0)
                    }), this.player.config.hideControls && u.on(this.player.elements.container, "mouseenter mouseleave mousemove touchstart touchend touchmove enterfullscreen exitfullscreen", function(t) {
                        e.player.toggleControls(t)
                    })
                }
            }, {
                key: "media",
                value: function() {
                    var e = this;
                    if (u.on(this.player.media, "timeupdate seeking", function(t) {
                            return k.timeUpdate.call(e.player, t)
                        }), u.on(this.player.media, "durationchange loadedmetadata", function(t) {
                            return k.durationUpdate.call(e.player, t)
                        }), u.on(this.player.media, "loadeddata", function() {
                            u.toggleHidden(e.player.elements.volume, !e.player.hasAudio), u.toggleHidden(e.player.elements.buttons.mute, !e.player.hasAudio)
                        }), u.on(this.player.media, "ended", function() {
                            e.player.isHTML5 && e.player.isVideo && e.player.config.showPosterOnEnd && (e.player.restart(), e.player.media.load())
                        }), u.on(this.player.media, "progress playing", function(t) {
                            return k.updateProgress.call(e.player, t)
                        }), u.on(this.player.media, "volumechange", function(t) {
                            return k.updateVolume.call(e.player, t)
                        }), u.on(this.player.media, "playing play pause ended emptied", function(t) {
                            return k.checkPlaying.call(e.player, t)
                        }), u.on(this.player.media, "waiting canplay seeked playing", function(t) {
                            return k.checkLoading.call(e.player, t)
                        }), this.player.supported.ui && this.player.config.clickToPlay && !this.player.isAudio) {
                        var t = u.getElement.call(this.player, "." + this.player.config.classNames.video);
                        if (!u.is.element(t)) return;
                        u.on(t, "click", function() {
                            e.player.config.hideControls && e.player.touch && !e.player.paused || (e.player.paused ? e.player.play() : e.player.ended ? (e.player.restart(), e.player.play()) : e.player.pause())
                        })
                    }
                    this.player.supported.ui && this.player.config.disableContextMenu && u.on(this.player.media, "contextmenu", function(e) {
                        e.preventDefault()
                    }, !1), u.on(this.player.media, "volumechange", function() {
                        e.player.storage.set({
                            volume: e.player.volume,
                            muted: e.player.muted
                        })
                    }), u.on(this.player.media, "ratechange", function() {
                        E.updateSetting.call(e.player, "speed"), e.player.storage.set({
                            speed: e.player.speed
                        })
                    }), u.on(this.player.media, "qualitychange", function() {
                        E.updateSetting.call(e.player, "quality"), e.player.storage.set({
                            quality: e.player.quality
                        })
                    }), u.on(this.player.media, "languagechange", function() {
                        E.updateSetting.call(e.player, "captions"), e.player.storage.set({
                            language: e.player.language
                        })
                    }), u.on(this.player.media, "captionsenabled captionsdisabled", function() {
                        E.updateSetting.call(e.player, "captions"), e.player.storage.set({
                            captions: e.player.captions.active
                        })
                    }), u.on(this.player.media, this.player.config.events.concat(["keyup", "keydown"]).join(" "), function(t) {
                        var i = {};
                        "error" === t.type && (i = e.player.media.error), u.dispatchEvent.call(e.player, e.player.elements.container, t.type, !0, i)
                    })
                }
            }, {
                key: "controls",
                value: function() {
                    var e = this,
                        t = T.isIE ? "change" : "input",
                        i = function(t, i, n) {
                            var s = e.player.config.listeners[n],
                                a = !0;
                            u.is.function(s) && (a = s.call(e.player, t)), a && u.is.function(i) && i.call(e.player, t)
                        },
                        n = function(t, n, s, a) {
                            var l = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                                r = e.player.config.listeners[a],
                                o = u.is.function(r);
                            u.on(t, n, function(e) {
                                return i(e, s, a)
                            }, l && !o)
                        };
                    n(this.player.elements.buttons.play, "click", this.player.togglePlay, "play"), n(this.player.elements.buttons.restart, "click", this.player.restart, "restart"), n(this.player.elements.buttons.rewind, "click", this.player.rewind, "rewind"), n(this.player.elements.buttons.fastForward, "click", this.player.forward, "fastForward"), n(this.player.elements.buttons.mute, "click", function() {
                        e.player.muted = !e.player.muted
                    }, "mute"), n(this.player.elements.buttons.captions, "click", this.player.toggleCaptions), n(this.player.elements.buttons.fullscreen, "click", function() {
                        e.player.fullscreen.toggle()
                    }, "fullscreen"), n(this.player.elements.buttons.pip, "click", function() {
                        e.player.pip = "toggle"
                    }, "pip"), n(this.player.elements.buttons.airplay, "click", this.player.airplay, "airplay"), n(this.player.elements.buttons.settings, "click", function(t) {
                        E.toggleMenu.call(e.player, t)
                    }), n(this.player.elements.settings.form, "click", function(t) {
                        t.stopPropagation(), u.matches(t.target, e.player.config.selectors.inputs.language) ? i(t, function() {
                            e.player.language = t.target.value
                        }, "language") : u.matches(t.target, e.player.config.selectors.inputs.quality) ? i(t, function() {
                            e.player.quality = t.target.value
                        }, "quality") : u.matches(t.target, e.player.config.selectors.inputs.speed) ? i(t, function() {
                            e.player.speed = parseFloat(t.target.value)
                        }, "speed") : E.showTab.call(e.player, t)
                    }), n(this.player.elements.inputs.seek, t, function(t) {
                        e.player.currentTime = t.target.value / t.target.max * e.player.duration
                    }, "seek"), this.player.config.toggleInvert && !u.is.element(this.player.elements.display.duration) && n(this.player.elements.display.currentTime, "click", function() {
                        0 !== e.player.currentTime && (e.player.config.invertTime = !e.player.config.invertTime, k.timeUpdate.call(e.player))
                    }), n(this.player.elements.inputs.volume, t, function(t) {
                        e.player.volume = t.target.value
                    }, "volume"), T.isWebkit && n(u.getElements.call(this.player, 'input[type="range"]'), "input", function(t) {
                        E.updateRangeFill.call(e.player, t.target)
                    }), n(this.player.elements.progress, "mouseenter mouseleave mousemove", function(t) {
                        return E.updateSeekTooltip.call(e.player, t)
                    }), this.player.config.hideControls && (n(this.player.elements.controls, "mouseenter mouseleave", function(t) {
                        e.player.elements.controls.hover = !e.player.touch && "mouseenter" === t.type
                    }), n(this.player.elements.controls, "mousedown mouseup touchstart touchend touchcancel", function(t) {
                        e.player.elements.controls.pressed = ["mousedown", "touchstart"].includes(t.type)
                    }), n(this.player.elements.controls, "focusin focusout", function(t) {
                        e.player.toggleControls(t)
                    })), n(this.player.elements.inputs.volume, "wheel", function(t) {
                        var i = t.webkitDirectionInvertedFromDevice,
                            n = 0;
                        (t.deltaY < 0 || t.deltaX > 0) && (i ? (e.player.decreaseVolume(.02), n = -1) : (e.player.increaseVolume(.02), n = 1)), (t.deltaY > 0 || t.deltaX < 0) && (i ? (e.player.increaseVolume(.02), n = 1) : (e.player.decreaseVolume(.02), n = -1)), (1 === n && e.player.media.volume < 1 || -1 === n && e.player.media.volume > 0) && t.preventDefault()
                    }, "volume", !1)
                }
            }, {
                key: "clear",
                value: function() {
                    this.global(!1)
                }
            }]), e
        }(),
        A = function() {
            function e(t) {
                l(this, e), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key
            }
            return r(e, [{
                key: "get",
                value: function(t) {
                    if (!e.supported) return null;
                    var i = window.localStorage.getItem(this.key);
                    if (u.is.empty(i)) return null;
                    var n = JSON.parse(i);
                    return u.is.string(t) && t.length ? n[t] : n
                }
            }, {
                key: "set",
                value: function(t) {
                    if (e.supported && this.enabled && u.is.object(t)) {
                        var i = this.get();
                        u.is.empty(i) && (i = {}), u.extend(i, t), window.localStorage.setItem(this.key, JSON.stringify(i))
                    }
                }
            }], [{
                key: "supported",
                get: function() {
                    try {
                        if (!("localStorage" in window)) return !1;
                        return window.localStorage.setItem("___test", "___test"), window.localStorage.removeItem("___test"), !0
                    } catch (e) {
                        return !1
                    }
                }
            }]), e
        }(),
        S = function() {
            function e(t) {
                var i = this;
                l(this, e), this.player = t, this.publisherId = t.config.ads.publisherId, this.enabled = t.isHTML5 && t.isVideo && t.config.ads.enabled && u.is.string(this.publisherId) && this.publisherId.length, this.playing = !1, this.initialized = !1, this.elements = {
                    container: null,
                    displayContainer: null
                }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(function(e, t) {
                    i.on("loaded", e), i.on("error", t)
                }), this.load()
            }
            return r(e, [{
                key: "load",
                value: function() {
                    var e = this;
                    this.enabled && (u.is.object(window.google) && u.is.object(window.google.ima) ? this.ready() : u.loadScript(this.player.config.urls.googleIMA.api).then(function() {
                        e.ready()
                    }).catch(function() {
                        e.trigger("error", new Error("Google IMA SDK failed to load"))
                    }))
                }
            }, {
                key: "ready",
                value: function() {
                    var e = this;
                    this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(function() {
                        e.clearSafetyTimer("onAdsManagerLoaded()")
                    }), this.listeners(), this.setupIMA()
                }
            }, {
                key: "setupIMA",
                value: function() {
                    this.elements.container = u.createElement("div", {
                        class: this.player.config.classNames.ads
                    }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container), this.requestAds()
                }
            }, {
                key: "requestAds",
                value: function() {
                    var e = this,
                        t = this.player.elements.container;
                    try {
                        this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function(t) {
                            return e.onAdsManagerLoaded(t)
                        }, !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(t) {
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
                value: function() {
                    var e = this;
                    if (!(arguments.length > 0 && void 0 !== arguments[0] && arguments[0])) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
                    this.countdownTimer = setInterval(function() {
                        var t = u.formatTime(Math.max(e.manager.getRemainingTime(), 0)),
                            i = b("advertisement", e.player.config) + " - " + t;
                        e.elements.container.setAttribute("data-badge-text", i)
                    }, 100)
                }
            }, {
                key: "onAdsManagerLoaded",
                value: function(e) {
                    var t = this,
                        i = new google.ima.AdsRenderingSettings;
                    i.restoreCustomPlaybackStateOnAdBreakComplete = !0, i.enablePreloading = !0, this.manager = e.getAdsManager(this.player, i), this.cuePoints = this.manager.getCuePoints(), this.cuePoints.forEach(function(e) {
                        if (0 !== e && -1 !== e && e < t.player.duration) {
                            var i = t.player.elements.progress;
                            if (i) {
                                var n = 100 / t.player.duration * e,
                                    s = u.createElement("span", {
                                        class: t.player.config.classNames.cues
                                    });
                                s.style.left = n.toString() + "%", i.appendChild(s)
                            }
                        }
                    }), this.manager.setVolume(this.player.volume), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(e) {
                        return t.onAdError(e)
                    }), Object.keys(google.ima.AdEvent.Type).forEach(function(e) {
                        t.manager.addEventListener(google.ima.AdEvent.Type[e], function(e) {
                            return t.onAdEvent(e)
                        })
                    }), this.trigger("loaded")
                }
            }, {
                key: "onAdEvent",
                value: function(e) {
                    var t = this,
                        i = this.player.elements.container,
                        n = e.getAd(),
                        s = function(e) {
                            var i = "ads" + e.replace(/_/g, "").toLowerCase();
                            u.dispatchEvent.call(t.player, t.player.media, i)
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
                value: function(e) {
                    this.cancel(), this.player.debug.warn("Ads error", e)
                }
            }, {
                key: "listeners",
                value: function() {
                    var e = this,
                        t = this.player.elements.container,
                        i = void 0;
                    this.player.on("ended", function() {
                        e.loader.contentComplete()
                    }), this.player.on("seeking", function() {
                        return i = e.player.currentTime
                    }), this.player.on("seeked", function() {
                        var t = e.player.currentTime;
                        e.cuePoints.forEach(function(n, s) {
                            i < n && n < t && (e.manager.discardAdBreak(), e.cuePoints.splice(s, 1))
                        })
                    }), window.addEventListener("resize", function() {
                        e.manager.resize(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL)
                    })
                }
            }, {
                key: "play",
                value: function() {
                    var e = this,
                        t = this.player.elements.container;
                    this.managerPromise || this.resumeContent(), this.managerPromise.then(function() {
                        e.elements.displayContainer.initialize();
                        try {
                            e.initialized || (e.manager.init(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL), e.manager.start()), e.initialized = !0
                        } catch (t) {
                            e.onAdError(t)
                        }
                    }).catch(function() {})
                }
            }, {
                key: "resumeContent",
                value: function() {
                    this.elements.container.style.zIndex = "", this.playing = !1, this.player.currentTime < this.player.duration && this.player.play()
                }
            }, {
                key: "pauseContent",
                value: function() {
                    this.elements.container.style.zIndex = 3, this.playing = !0, this.player.pause()
                }
            }, {
                key: "cancel",
                value: function() {
                    this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds()
                }
            }, {
                key: "loadAds",
                value: function() {
                    var e = this;
                    this.managerPromise.then(function() {
                        e.manager && e.manager.destroy(), e.managerPromise = new Promise(function(t) {
                            e.on("loaded", t), e.player.debug.log(e.manager)
                        }), e.requestAds()
                    }).catch(function() {})
                }
            }, {
                key: "trigger",
                value: function(e) {
                    for (var t = this, i = arguments.length, n = Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) n[s - 1] = arguments[s];
                    var a = this.events[e];
                    u.is.array(a) && a.forEach(function(e) {
                        u.is.function(e) && e.apply(t, n)
                    })
                }
            }, {
                key: "on",
                value: function(e, t) {
                    return u.is.array(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this
                }
            }, {
                key: "startSafetyTimer",
                value: function(e, t) {
                    var i = this;
                    this.player.debug.log("Safety timer invoked from: " + t), this.safetyTimer = setTimeout(function() {
                        i.cancel(), i.clearSafetyTimer("startSafetyTimer()")
                    }, e)
                }
            }, {
                key: "clearSafetyTimer",
                value: function(e) {
                    u.is.nullOrUndefined(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: " + e), clearTimeout(this.safetyTimer), this.safetyTimer = null)
                }
            }, {
                key: "tagUrl",
                get: function() {
                    var e = {
                        AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
                        AV_CHANNELID: "5a0458dc28a06145e4519d21",
                        AV_URL: location.hostname,
                        cb: Date.now(),
                        AV_WIDTH: 640,
                        AV_HEIGHT: 480,
                        AV_CDIM2: this.publisherId
                    };
                    return "https://go.aniview.com/api/adserver6/vast/?" + u.buildUrlParams(e)
                }
            }]), e
        }(),
        P = {
            setup: function() {
                var e = this;
                u.toggleClass(this.elements.wrapper, this.config.classNames.embed, !0), P.setAspectRatio.call(this), u.is.object(window.YT) && u.is.function(window.YT.Player) ? P.ready.call(this) : (u.loadScript(this.config.urls.youtube.api).catch(function(t) {
                    e.debug.warn("YouTube API failed to load", t)
                }), window.onYouTubeReadyCallbacks = window.onYouTubeReadyCallbacks || [], window.onYouTubeReadyCallbacks.push(function() {
                    P.ready.call(e)
                }), window.onYouTubeIframeAPIReady = function() {
                    window.onYouTubeReadyCallbacks.forEach(function(e) {
                        e()
                    })
                })
            },
            getTitle: function(e) {
                var t = this;
                if (u.is.function(this.embed.getVideoData)) {
                    var i = this.embed.getVideoData().title;
                    if (u.is.empty(i)) return this.config.title = i, void k.setTitle.call(this)
                }
                var n = this.config.keys.google;
                if (u.is.string(n) && !u.is.empty(n)) {
                    var s = "https://www.googleapis.com/youtube/v3/videos?id=" + e + "&key=" + n + "&fields=items(snippet(title))&part=snippet";
                    u.fetch(s).then(function(e) {
                        u.is.object(e) && (t.config.title = e.items[0].snippet.title, k.setTitle.call(t))
                    }).catch(function() {})
                }
            },
            setAspectRatio: function() {
                var e = this.config.ratio.split(":");
                this.elements.wrapper.style.paddingBottom = 100 / e[0] * e[1] + "%"
            },
            ready: function() {
                var e = this,
                    t = e.media.getAttribute("id");
                if (u.is.empty(t) || !t.startsWith("youtube-")) {
                    var i = e.media.getAttribute("src");
                    u.is.empty(i) && (i = e.media.getAttribute(this.config.attributes.embed.id));
                    var n = u.parseYouTubeId(i),
                        s = u.generateId(e.provider),
                        a = u.createElement("div", {
                            id: s
                        });
                    e.media = u.replaceElement(a, e.media), e.embed = new window.YT.Player(s, {
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
                            onError: function(t) {
                                if (!u.is.object(e.media.error)) {
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
                                    e.media.error = i, u.dispatchEvent.call(e, e.media, "error")
                                }
                            },
                            onPlaybackQualityChange: function(t) {
                                var i = t.target;
                                e.media.quality = i.getPlaybackQuality(), u.dispatchEvent.call(e, e.media, "qualitychange")
                            },
                            onPlaybackRateChange: function(t) {
                                var i = t.target;
                                e.media.playbackRate = i.getPlaybackRate(), u.dispatchEvent.call(e, e.media, "ratechange")
                            },
                            onReady: function(t) {
                                var i = t.target;
                                P.getTitle.call(e, n), e.media.play = function() {
                                    i.playVideo()
                                }, e.media.pause = function() {
                                    i.pauseVideo()
                                }, e.media.stop = function() {
                                    i.stopVideo()
                                }, e.media.duration = i.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
                                    get: function() {
                                        return Number(i.getCurrentTime())
                                    },
                                    set: function(t) {
                                        e.media.seeking = !0, u.dispatchEvent.call(e, e.media, "seeking"), i.seekTo(t)
                                    }
                                }), Object.defineProperty(e.media, "playbackRate", {
                                    get: function() {
                                        return i.getPlaybackRate()
                                    },
                                    set: function(e) {
                                        i.setPlaybackRate(e)
                                    }
                                }), Object.defineProperty(e.media, "quality", {
                                    get: function() {
                                        return i.getPlaybackQuality()
                                    },
                                    set: function(t) {
                                        u.dispatchEvent.call(e, e.media, "qualityrequested", !1, {
                                            quality: t
                                        }), i.setPlaybackQuality(t)
                                    }
                                });
                                var s = e.config.volume;
                                Object.defineProperty(e.media, "volume", {
                                    get: function() {
                                        return s
                                    },
                                    set: function(t) {
                                        s = t, i.setVolume(100 * s), u.dispatchEvent.call(e, e.media, "volumechange")
                                    }
                                });
                                var a = e.config.muted;
                                Object.defineProperty(e.media, "muted", {
                                    get: function() {
                                        return a
                                    },
                                    set: function(t) {
                                        var n = u.is.boolean(t) ? t : a;
                                        a = n, i[n ? "mute" : "unMute"](), u.dispatchEvent.call(e, e.media, "volumechange")
                                    }
                                }), Object.defineProperty(e.media, "currentSrc", {
                                    get: function() {
                                        return i.getVideoUrl()
                                    }
                                }), Object.defineProperty(e.media, "ended", {
                                    get: function() {
                                        return e.currentTime === e.duration
                                    }
                                });
                                var l = i.getAvailablePlaybackRates();
                                E.setSpeedMenu.call(e, l), e.supported.ui && e.media.setAttribute("tabindex", -1), u.dispatchEvent.call(e, e.media, "timeupdate"), u.dispatchEvent.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(function() {
                                    e.media.buffered = i.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && u.dispatchEvent.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), u.dispatchEvent.call(e, e.media, "canplaythrough"))
                                }, 200), setTimeout(function() {
                                    return k.build.call(e)
                                }, 50)
                            },
                            onStateChange: function(t) {
                                var i = t.target;
                                switch (clearInterval(e.timers.playing), t.data) {
                                    case -1:
                                        u.dispatchEvent.call(e, e.media, "timeupdate"), e.media.buffered = i.getVideoLoadedFraction(), u.dispatchEvent.call(e, e.media, "progress");
                                        break;
                                    case 0:
                                        e.media.paused = !0, e.media.loop ? (i.stopVideo(), i.playVideo()) : u.dispatchEvent.call(e, e.media, "ended");
                                        break;
                                    case 1:
                                        e.media.seeking && u.dispatchEvent.call(e, e.media, "seeked"), e.media.seeking = !1, e.media.paused && u.dispatchEvent.call(e, e.media, "play"), e.media.paused = !1, u.dispatchEvent.call(e, e.media, "playing"), e.timers.playing = setInterval(function() {
                                            u.dispatchEvent.call(e, e.media, "timeupdate")
                                        }, 50), e.media.duration !== i.getDuration() && (e.media.duration = i.getDuration(), u.dispatchEvent.call(e, e.media, "durationchange")), E.setQualityMenu.call(e, i.getAvailableQualityLevels());
                                        break;
                                    case 2:
                                        e.media.paused = !0, u.dispatchEvent.call(e, e.media, "pause")
                                }
                                u.dispatchEvent.call(e, e.elements.container, "statechange", !1, {
                                    code: t.data
                                })
                            }
                        }
                    })
                }
            }
        },
        N = {
            setup: function() {
                var e = this;
                u.toggleClass(this.elements.wrapper, this.config.classNames.embed, !0), N.setAspectRatio.call(this), u.is.object(window.Vimeo) ? N.ready.call(this) : u.loadScript(this.config.urls.vimeo.api).then(function() {
                    N.ready.call(e)
                }).catch(function(t) {
                    e.debug.warn("Vimeo API failed to load", t)
                })
            },
            setAspectRatio: function(e) {
                var t = u.is.string(e) ? e.split(":") : this.config.ratio.split(":"),
                    i = 100 / t[0] * t[1],
                    n = (240 - i) / 4.8;
                this.elements.wrapper.style.paddingBottom = i + "%", this.media.style.transform = "translateY(-" + n + "%)"
            },
            ready: function() {
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
                    n = u.buildUrlParams(i),
                    s = t.media.getAttribute("src");
                u.is.empty(s) && (s = t.media.getAttribute(this.config.attributes.embed.id));
                var a = u.parseVimeoId(s),
                    l = u.createElement("iframe"),
                    r = "https://player.vimeo.com/video/" + a + "?" + n;
                l.setAttribute("src", r), l.setAttribute("allowfullscreen", ""), l.setAttribute("allowtransparency", ""), l.setAttribute("allow", "autoplay");
                var o = u.createElement("div");
                o.appendChild(l), t.media = u.replaceElement(o, t.media), t.embed = new window.Vimeo.Player(l), t.media.paused = !0, t.media.currentTime = 0, t.media.play = function() {
                    t.embed.play().then(function() {
                        t.media.paused = !1
                    })
                }, t.media.pause = function() {
                    t.embed.pause().then(function() {
                        t.media.paused = !0
                    })
                }, t.media.stop = function() {
                    t.pause(), t.currentTime = 0
                };
                var c = t.media.currentTime;
                Object.defineProperty(t.media, "currentTime", {
                    get: function() {
                        return c
                    },
                    set: function(e) {
                        var i = t.media.paused;
                        t.media.seeking = !0, u.dispatchEvent.call(t, t.media, "seeking"), t.embed.setCurrentTime(e), i && t.pause()
                    }
                });
                var d = t.config.speed.selected;
                Object.defineProperty(t.media, "playbackRate", {
                    get: function() {
                        return d
                    },
                    set: function(e) {
                        t.embed.setPlaybackRate(e).then(function() {
                            d = e, u.dispatchEvent.call(t, t.media, "ratechange")
                        }).catch(function(e) {
                            "Error" === e.name && E.setSpeedMenu.call(t, [])
                        })
                    }
                });
                var p = t.config.volume;
                Object.defineProperty(t.media, "volume", {
                    get: function() {
                        return p
                    },
                    set: function(e) {
                        t.embed.setVolume(e).then(function() {
                            p = e, u.dispatchEvent.call(t, t.media, "volumechange")
                        })
                    }
                });
                var h = t.config.muted;
                Object.defineProperty(t.media, "muted", {
                    get: function() {
                        return h
                    },
                    set: function(e) {
                        var i = !!u.is.boolean(e) && e;
                        t.embed.setVolume(i ? 0 : t.config.volume).then(function() {
                            h = i, u.dispatchEvent.call(t, t.media, "volumechange")
                        })
                    }
                });
                var m = t.config.loop;
                Object.defineProperty(t.media, "loop", {
                    get: function() {
                        return m
                    },
                    set: function(e) {
                        var i = u.is.boolean(e) ? e : t.config.loop.active;
                        t.embed.setLoop(i).then(function() {
                            m = i
                        })
                    }
                });
                var g = void 0;
                t.embed.getVideoUrl().then(function(e) {
                    g = e
                }), Object.defineProperty(t.media, "currentSrc", {
                    get: function() {
                        return g
                    }
                }), Object.defineProperty(t.media, "ended", {
                    get: function() {
                        return t.currentTime === t.duration
                    }
                }), Promise.all([t.embed.getVideoWidth(), t.embed.getVideoHeight()]).then(function(t) {
                    var i = u.getAspectRatio(t[0], t[1]);
                    N.setAspectRatio.call(e, i)
                }), t.embed.setAutopause(t.config.autopause).then(function(e) {
                    t.config.autopause = e
                }), t.embed.getVideoTitle().then(function(i) {
                    t.config.title = i, k.setTitle.call(e)
                }), t.embed.getCurrentTime().then(function(e) {
                    c = e, u.dispatchEvent.call(t, t.media, "timeupdate")
                }), t.embed.getDuration().then(function(e) {
                    t.media.duration = e, u.dispatchEvent.call(t, t.media, "durationchange")
                }), t.embed.getTextTracks().then(function(e) {
                    t.media.textTracks = e, v.setup.call(t)
                }), t.embed.on("cuechange", function(e) {
                    var i = null;
                    e.cues.length && (i = u.stripHTML(e.cues[0].text)), v.setText.call(t, i)
                }), t.embed.on("loaded", function() {
                    u.is.element(t.embed.element) && t.supported.ui && t.embed.element.setAttribute("tabindex", -1)
                }), t.embed.on("play", function() {
                    t.media.paused && u.dispatchEvent.call(t, t.media, "play"), t.media.paused = !1, u.dispatchEvent.call(t, t.media, "playing")
                }), t.embed.on("pause", function() {
                    t.media.paused = !0, u.dispatchEvent.call(t, t.media, "pause")
                }), t.embed.on("timeupdate", function(e) {
                    t.media.seeking = !1, c = e.seconds, u.dispatchEvent.call(t, t.media, "timeupdate")
                }), t.embed.on("progress", function(e) {
                    t.media.buffered = e.percent, u.dispatchEvent.call(t, t.media, "progress"), 1 === parseInt(e.percent, 10) && u.dispatchEvent.call(t, t.media, "canplaythrough")
                }), t.embed.on("seeked", function() {
                    t.media.seeking = !1, u.dispatchEvent.call(t, t.media, "seeked"), u.dispatchEvent.call(t, t.media, "play")
                }), t.embed.on("ended", function() {
                    t.media.paused = !0, u.dispatchEvent.call(t, t.media, "ended")
                }), t.embed.on("error", function(e) {
                    t.media.error = e, u.dispatchEvent.call(t, t.media, "error")
                }), setTimeout(function() {
                    return k.build.call(t)
                }, 0)
            }
        },
        x = u.getBrowser(),
        L = {
            setup: function() {
                if (this.media)
                    if (u.toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), u.toggleClass(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && u.toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.supported.ui && (u.toggleClass(this.elements.container, this.config.classNames.pip.supported, d.pip && this.isHTML5 && this.isVideo), u.toggleClass(this.elements.container, this.config.classNames.airplay.supported, d.airplay && this.isHTML5), u.toggleClass(this.elements.container, this.config.classNames.stopped, this.config.autoplay), u.toggleClass(this.elements.container, this.config.classNames.isIos, x.isIos), u.toggleClass(this.elements.container, this.config.classNames.isTouch, this.touch)), this.isVideo && (this.elements.wrapper = u.createElement("div", {
                            class: this.config.classNames.video
                        }), u.wrap(this.media, this.elements.wrapper)), this.isEmbed) switch (this.provider) {
                        case "youtube":
                            P.setup.call(this);
                            break;
                        case "vimeo":
                            N.setup.call(this)
                    } else this.isHTML5 && k.setTitle.call(this);
                    else this.debug.warn("No media element found!")
            },
            cancelRequests: function() {
                this.isHTML5 && (u.removeElement(this.media.querySelectorAll("source")), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"))
            }
        },
        M = {
            insertElements: function(e, t) {
                var i = this;
                u.is.string(t) ? u.insertElement(e, this.media, {
                    src: t
                }) : u.is.array(t) && t.forEach(function(t) {
                    u.insertElement(e, i.media, t)
                })
            },
            change: function(t) {
                var i = this;
                u.is.object(t) && "sources" in t && t.sources.length ? (L.cancelRequests.call(this), this.destroy.call(this, function() {
                    switch (u.removeElement(i.media), i.media = null, u.is.element(i.elements.container) && i.elements.container.removeAttribute("class"), i.type = t.type, i.provider = u.is.empty(t.sources[0].provider) ? e.html5 : t.sources[0].provider, i.supported = d.check(i.type, i.provider, i.config.inline), i.provider + ":" + i.type) {
                        case "html5:video":
                            i.media = u.createElement("video");
                            break;
                        case "html5:audio":
                            i.media = u.createElement("audio");
                            break;
                        case "youtube:video":
                        case "vimeo:video":
                            i.media = u.createElement("div", {
                                src: t.sources[0].src
                            })
                    }
                    i.elements.container.appendChild(i.media), u.is.boolean(t.autoplay) && (i.config.autoplay = t.autoplay), i.isHTML5 && (i.config.crossorigin && i.media.setAttribute("crossorigin", ""), i.config.autoplay && i.media.setAttribute("autoplay", ""), "poster" in t && i.media.setAttribute("poster", t.poster), i.config.loop.active && i.media.setAttribute("loop", ""), i.config.muted && i.media.setAttribute("muted", ""), i.config.inline && i.media.setAttribute("playsinline", "")), k.addStyleHook.call(i), i.isHTML5 && M.insertElements.call(i, "source", t.sources), i.config.title = t.title, L.setup.call(i), i.isHTML5 && ("tracks" in t && M.insertElements.call(i, "track", t.tracks), i.media.load()), (i.isHTML5 || i.isEmbed && !i.supported.ui) && k.build.call(i), i.fullscreen.update()
                }, !0)) : this.debug.warn("Invalid source format")
            }
        };
    return function() {
        function n(s, a) {
            var r = this;
            if (l(this, n), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = d.touch, this.media = s, u.is.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || u.is.nodeList(this.media) || u.is.array(this.media)) && (this.media = this.media[0]), this.config = u.extend({}, i, a, function() {
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
                }, this.debug = new h(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", d), !u.is.nullOrUndefined(this.media) && u.is.element(this.media))
                if (this.media.plyr) this.debug.warn("Target already setup");
                else if (this.config.enabled)
                if (d.check().api) {
                    this.elements.original = this.media.cloneNode(!0);
                    var o = this.media.tagName.toLowerCase(),
                        c = null,
                        p = null,
                        m = null;
                    switch (o) {
                        case "div":
                            if (c = this.media.querySelector("iframe"), u.is.element(c)) {
                                if (p = c.getAttribute("src"), this.provider = u.getProviderByUrl(p), this.elements.container = this.media, this.media = c, this.elements.container.className = "", m = u.getUrlParams(p), !u.is.empty(m)) {
                                    var g = ["1", "true"];
                                    g.includes(m.autoplay) && (this.config.autoplay = !0), g.includes(m.playsinline) && (this.config.inline = !0), g.includes(m.loop) && (this.config.loop.active = !0)
                                }
                            } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
                            if (u.is.empty(this.provider) || !Object.keys(e).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
                            this.type = t.video;
                            break;
                        case "video":
                        case "audio":
                            this.type = o, this.provider = e.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), this.media.hasAttribute("playsinline") && (this.config.inline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
                            break;
                        default:
                            return void this.debug.error("Setup failed: unsupported type")
                    }
                    this.supported = d.check(this.type, this.provider, this.config.inline), this.supported.api ? (this.listeners = new C(this), this.storage = new A(this), this.media.plyr = this, u.is.element(this.elements.container) || (this.elements.container = u.createElement("div"), u.wrap(this.media, this.elements.container)), this.elements.container.setAttribute("tabindex", 0), k.addStyleHook.call(this), L.setup.call(this), this.config.debug && u.on(this.elements.container, this.config.events.join(" "), function(e) {
                        r.debug.log("event: " + e.type)
                    }), (this.isHTML5 || this.isEmbed && !this.supported.ui) && k.build.call(this), this.listeners.container(), this.listeners.global(), this.fullscreen = new y(this), this.ads = new S(this)) : this.debug.error("Setup failed: no support")
                } else this.debug.error("Setup failed: no support");
            else this.debug.error("Setup failed: disabled by config");
            else this.debug.error("Setup failed: no suitable element passed")
        }
        return r(n, [{
            key: "play",
            value: function() {
                var e = this;
                return u.is.function(this.media.play) ? this.ads.enabled && !this.ads.initialized ? this.ads.managerPromise.then(function() {
                    return e.ads.play()
                }).catch(function() {
                    return e.media.play()
                }) : this.media.play() : null
            }
        }, {
            key: "pause",
            value: function() {
                this.playing && u.is.function(this.media.pause) && this.media.pause()
            }
        }, {
            key: "togglePlay",
            value: function(e) {
                (u.is.boolean(e) ? e : !this.playing) ? this.play(): this.pause()
            }
        }, {
            key: "stop",
            value: function() {
                this.isHTML5 ? this.media.load() : this.media.stop()
            }
        }, {
            key: "restart",
            value: function() {
                this.currentTime = 0
            }
        }, {
            key: "rewind",
            value: function(e) {
                this.currentTime = this.currentTime - (u.is.number(e) ? e : this.config.seekTime)
            }
        }, {
            key: "forward",
            value: function(e) {
                this.currentTime = this.currentTime + (u.is.number(e) ? e : this.config.seekTime)
            }
        }, {
            key: "increaseVolume",
            value: function(e) {
                var t = this.media.muted ? 0 : this.volume;
                this.volume = t + (u.is.number(e) ? e : 1)
            }
        }, {
            key: "decreaseVolume",
            value: function(e) {
                var t = this.media.muted ? 0 : this.volume;
                this.volume = t - (u.is.number(e) ? e : 1)
            }
        }, {
            key: "toggleCaptions",
            value: function(e) {
                if (this.supported.ui && u.is.element(this.elements.buttons.captions)) {
                    var t = u.is.boolean(e) ? e : -1 === this.elements.container.className.indexOf(this.config.classNames.captions.active);
                    this.captions.active !== t && (this.captions.active = t, u.toggleState(this.elements.buttons.captions, this.captions.active), u.toggleClass(this.elements.container, this.config.classNames.captions.active, this.captions.active), u.dispatchEvent.call(this, this.media, this.captions.active ? "captionsenabled" : "captionsdisabled"))
                }
            }
        }, {
            key: "airplay",
            value: function() {
                d.airplay && this.media.webkitShowPlaybackTargetPicker()
            }
        }, {
            key: "toggleControls",
            value: function(e) {
                var t = this;
                if (u.is.element(this.elements.controls) && this.supported.ui && !this.isAudio) {
                    var i = 0,
                        n = e,
                        s = !1;
                    if (!u.is.boolean(e))
                        if (u.is.event(e)) {
                            s = "enterfullscreen" === e.type;
                            n = ["touchstart", "touchmove", "mouseenter", "mousemove", "focusin"].includes(e.type), ["touchmove", "touchend", "mousemove"].includes(e.type) && (i = 2e3), this.touch || "focusin" !== e.type || (i = 3e3, u.toggleClass(this.elements.controls, this.config.classNames.noTransition, !0))
                        } else n = u.hasClass(this.elements.container, this.config.classNames.hideControls);
                    if (clearTimeout(this.timers.controls), n || this.paused || this.loading) {
                        if (u.toggleClass(this.elements.container, this.config.classNames.hideControls, !1) && u.dispatchEvent.call(this, this.media, "controlsshown"), this.paused || this.loading) return;
                        this.touch && (i = 3e3)
                    }
                    n && !this.playing || (this.timers.controls = setTimeout(function() {
                        (!t.elements.controls.pressed && !t.elements.controls.hover || s) && (u.hasClass(t.elements.container, t.config.classNames.hideControls) || u.toggleClass(t.elements.controls, t.config.classNames.noTransition, !1), u.toggleClass(t.elements.container, t.config.classNames.hideControls, !0) && (u.dispatchEvent.call(t, t.media, "controlshidden"), t.config.controls.includes("settings") && !u.is.empty(t.config.settings) && E.toggleMenu.call(t, !1)))
                    }, i))
                }
            }
        }, {
            key: "on",
            value: function(e, t) {
                u.on(this.elements.container, e, t)
            }
        }, {
            key: "off",
            value: function(e, t) {
                u.off(this.elements.container, e, t)
            }
        }, {
            key: "destroy",
            value: function(e) {
                var t = this,
                    i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (this.ready) {
                    var n = function() {
                        document.body.style.overflow = "", t.embed = null, i ? (Object.keys(t.elements).length && (u.removeElement(t.elements.buttons.play), u.removeElement(t.elements.captions), u.removeElement(t.elements.controls), u.removeElement(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), u.is.function(e) && e()) : (t.listeners.clear(), u.replaceElement(t.elements.original, t.elements.container), u.dispatchEvent.call(t, t.elements.original, "destroyed", !0), u.is.function(e) && e.call(t.elements.original), t.ready = !1, setTimeout(function() {
                            t.elements = null, t.media = null
                        }, 200))
                    };
                    switch (this.stop(), this.provider + ":" + this.type) {
                        case "html5:video":
                        case "html5:audio":
                            clearTimeout(this.timers.loading), k.toggleNativeControls.call(this, !0), n();
                            break;
                        case "youtube:video":
                            clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && u.is.function(this.embed.destroy) && this.embed.destroy(), n();
                            break;
                        case "vimeo:video":
                            null !== this.embed && this.embed.unload().then(n), setTimeout(n, 200)
                    }
                }
            }
        }, {
            key: "supports",
            value: function(e) {
                return d.mime.call(this, e)
            }
        }, {
            key: "isHTML5",
            get: function() {
                return Boolean(this.provider === e.html5)
            }
        }, {
            key: "isEmbed",
            get: function() {
                return Boolean(this.isYouTube || this.isVimeo)
            }
        }, {
            key: "isYouTube",
            get: function() {
                return Boolean(this.provider === e.youtube)
            }
        }, {
            key: "isVimeo",
            get: function() {
                return Boolean(this.provider === e.vimeo)
            }
        }, {
            key: "isVideo",
            get: function() {
                return Boolean(this.type === t.video)
            }
        }, {
            key: "isAudio",
            get: function() {
                return Boolean(this.type === t.audio)
            }
        }, {
            key: "paused",
            get: function() {
                return Boolean(this.media.paused)
            }
        }, {
            key: "playing",
            get: function() {
                return Boolean(!this.paused && !this.ended && (!this.isHTML5 || this.media.readyState > 2))
            }
        }, {
            key: "ended",
            get: function() {
                return Boolean(this.media.ended)
            }
        }, {
            key: "currentTime",
            set: function(e) {
                var t = 0;
                u.is.number(e) && (t = e), t < 0 ? t = 0 : t > this.duration && (t = this.duration), this.media.currentTime = parseFloat(t.toFixed(4)), this.debug.log("Seeking to " + this.currentTime + " seconds")
            },
            get: function() {
                return Number(this.media.currentTime)
            }
        }, {
            key: "buffered",
            get: function() {
                var e = this.media.buffered;
                return u.is.number(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0
            }
        }, {
            key: "seeking",
            get: function() {
                return Boolean(this.media.seeking)
            }
        }, {
            key: "duration",
            get: function() {
                var e = parseInt(this.config.duration, 10),
                    t = this.media ? Number(this.media.duration) : 0;
                return Number.isNaN(e) ? t : e
            }
        }, {
            key: "volume",
            set: function(e) {
                var t = e;
                u.is.string(t) && (t = Number(t)), u.is.number(t) || (t = this.storage.get("volume")), u.is.number(t) || (t = this.config.volume), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, this.muted && t > 0 && (this.muted = !1)
            },
            get: function() {
                return Number(this.media.volume)
            }
        }, {
            key: "muted",
            set: function(e) {
                var t = e;
                u.is.boolean(t) || (t = this.storage.get("muted")), u.is.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t
            },
            get: function() {
                return Boolean(this.media.muted)
            }
        }, {
            key: "hasAudio",
            get: function() {
                return !this.isHTML5 || (!!this.isAudio || (Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)))
            }
        }, {
            key: "speed",
            set: function(e) {
                var t = null;
                u.is.number(e) && (t = e), u.is.number(t) || (t = this.storage.get("speed")), u.is.number(t) || (t = this.config.speed.selected), t < .1 && (t = .1), t > 2 && (t = 2), this.config.speed.options.includes(t) ? (this.config.speed.selected = t, this.media.playbackRate = t) : this.debug.warn("Unsupported speed (" + t + ")")
            },
            get: function() {
                return Number(this.media.playbackRate)
            }
        }, {
            key: "quality",
            set: function(e) {
                var t = null;
                u.is.string(e) && (t = e), u.is.string(t) || (t = this.storage.get("quality")), u.is.string(t) || (t = this.config.quality.selected), this.options.quality.includes(t) ? (this.config.quality.selected = t, this.media.quality = t) : this.debug.warn("Unsupported quality option (" + t + ")")
            },
            get: function() {
                return this.media.quality
            }
        }, {
            key: "loop",
            set: function(e) {
                var t = u.is.boolean(e) ? e : this.config.loop.active;
                this.config.loop.active = t, this.media.loop = t
            },
            get: function() {
                return Boolean(this.media.loop)
            }
        }, {
            key: "source",
            set: function(e) {
                M.change.call(this, e)
            },
            get: function() {
                return this.media.currentSrc
            }
        }, {
            key: "poster",
            set: function(e) {
                this.isHTML5 && this.isVideo ? u.is.string(e) && this.media.setAttribute("poster", e) : this.debug.warn("Poster can only be set on HTML5 video")
            },
            get: function() {
                return this.isHTML5 && this.isVideo ? this.media.getAttribute("poster") : null
            }
        }, {
            key: "autoplay",
            set: function(e) {
                var t = u.is.boolean(e) ? e : this.config.autoplay;
                this.config.autoplay = t
            },
            get: function() {
                return Boolean(this.config.autoplay)
            }
        }, {
            key: "language",
            set: function(e) {
                if (u.is.string(e) && (this.toggleCaptions(!u.is.empty(e)), !u.is.empty(e))) {
                    var t = e.toLowerCase();
                    this.language !== t && (this.captions.language = t, v.setText.call(this, null), v.setLanguage.call(this), u.dispatchEvent.call(this, this.media, "languagechange"))
                }
            },
            get: function() {
                return this.captions.language
            }
        }, {
            key: "pip",
            set: function(e) {
                var t = "picture-in-picture",
                    i = "inline";
                if (d.pip) {
                    var n = u.is.boolean(e) ? e : this.pip === i;
                    this.media.webkitSetPresentationMode(n ? t : i)
                }
            },
            get: function() {
                return d.pip ? this.media.webkitPresentationMode : null
            }
        }], [{
            key: "supported",
            value: function(e, t, i) {
                return d.check(e, t, i)
            }
        }, {
            key: "loadSprite",
            value: function(e, t) {
                return u.loadSprite(e, t)
            }
        }]), n
    }()
});
//# sourceMappingURL=plyr.js.map