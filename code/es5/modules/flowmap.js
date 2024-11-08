/*
 Highcharts JS v11.1.0 (2023-06-05)

 (c) 2009-2022

 License: www.highcharts.com/license
*/
'use strict';
(function (f) {
    "object" === typeof module && module.exports ? (f["default"] = f, module.exports = f) : "function" === typeof define && define.amd ? define("highcharts/modules/flowmap", ["highcharts"], function (u) {
        f(u);
        f.Highcharts = u;
        return f
    }) : f("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (f) {
    function u(g, e, k, d) {
        g.hasOwnProperty(e) || (g[e] = d.apply(null, k), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: e,
                module: g[e]
            }
        })))
    }

    f = f ? f._modules :
        {};
    u(f, "Series/FlowMap/FlowMapPoint.js", [f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (g, e) {
        var k = this && this.__extends || function () {
            var a = function (d, c) {
                a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, n) {
                    a.__proto__ = n
                } || function (a, n) {
                    for (var b in n) Object.prototype.hasOwnProperty.call(n, b) && (a[b] = n[b])
                };
                return a(d, c)
            };
            return function (d, c) {
                function l() {
                    this.constructor = d
                }

                if ("function" !== typeof c && null !== c) throw new TypeError("Class extends value " + String(c) +
                    " is not a constructor or null");
                a(d, c);
                d.prototype = null === c ? Object.create(c) : (l.prototype = c.prototype, new l)
            }
        }(), d = e.pick, a = e.isString, c = e.isNumber;
        return function (l) {
            function e() {
                var a = null !== l && l.apply(this, arguments) || this;
                a.options = void 0;
                a.series = void 0;
                return a
            }

            k(e, l);
            e.prototype.isValid = function () {
                var l = !(!this.options.to || !this.options.from);
                [this.options.to, this.options.from].forEach(function (e) {
                    l = !!(l && e && (a(e) || c(d(e[0], e.lat)) && c(d(e[1], e.lon))))
                });
                return l
            };
            return e
        }(g.seriesTypes.mapline.prototype.pointClass)
    });
    u(f, "Series/ColorMapComposition.js", [f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (g, e) {
        var k = g.seriesTypes.column.prototype, d = e.addEvent, a = e.defined, c;
        (function (c) {
            function l(a) {
                this.moveToTopOnHover && this.graphic && this.graphic.attr({zIndex: a && "hover" === a.state ? 1 : 0})
            }

            var g = [];
            c.pointMembers = {
                dataLabelOnNull: !0, moveToTopOnHover: !0, isValid: function () {
                    return null !== this.value && Infinity !== this.value && -Infinity !== this.value && (void 0 === this.value || !isNaN(this.value))
                }
            };
            c.seriesMembers =
                {
                    colorKey: "value",
                    axisTypes: ["xAxis", "yAxis", "colorAxis"],
                    parallelArrays: ["x", "y", "value"],
                    pointArrayMap: ["value"],
                    trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                    colorAttribs: function (c) {
                        var d = {};
                        !a(c.color) || c.state && "normal" !== c.state || (d[this.colorProp || "fill"] = c.color);
                        return d
                    },
                    pointAttribs: k.pointAttribs
                };
            c.compose = function (a) {
                var c = a.prototype.pointClass;
                e.pushUnique(g, c) && d(c, "afterSetState", l);
                return a
            }
        })(c || (c = {}));
        return c
    });
    u(f, "Maps/MapSymbols.js", [f["Core/Renderer/SVG/SVGRenderer.js"]],
        function (g) {
            var e = g.prototype.symbols;
            e.bottombutton = function (k, d, a, c, l) {
                if (l) {
                    var g = (null === l || void 0 === l ? void 0 : l.r) || 0;
                    l.brBoxY = d - g;
                    l.brBoxHeight = c + g
                }
                return e.roundedRect(k, d, a, c, l)
            };
            e.topbutton = function (k, d, a, c, l) {
                l && (l.brBoxHeight = c + ((null === l || void 0 === l ? void 0 : l.r) || 0));
                return e.roundedRect(k, d, a, c, l)
            };
            return e
        });
    u(f, "Core/Chart/MapChart.js", [f["Core/Chart/Chart.js"], f["Core/Defaults.js"], f["Core/Renderer/SVG/SVGRenderer.js"], f["Core/Utilities.js"]], function (g, e, k, d) {
        var a = this && this.__extends ||
            function () {
                var a = function (c, d) {
                    a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, h) {
                        b.__proto__ = h
                    } || function (b, h) {
                        for (var a in h) Object.prototype.hasOwnProperty.call(h, a) && (b[a] = h[a])
                    };
                    return a(c, d)
                };
                return function (c, d) {
                    function b() {
                        this.constructor = c
                    }

                    if ("function" !== typeof d && null !== d) throw new TypeError("Class extends value " + String(d) + " is not a constructor or null");
                    a(c, d);
                    c.prototype = null === d ? Object.create(d) : (b.prototype = d.prototype, new b)
                }
            }(), c = e.getOptions, l = d.merge, f = d.pick;
        g = function (d) {
            function e() {
                return null !== d && d.apply(this, arguments) || this
            }

            a(e, d);
            e.prototype.init = function (a, b) {
                var h = c().credits;
                a = l({
                    chart: {panning: {enabled: !0, type: "xy"}, type: "map"},
                    credits: {
                        mapText: f(h.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),
                        mapTextFull: f(h.mapTextFull, "{geojson.copyright}")
                    },
                    mapView: {},
                    tooltip: {followTouchMove: !1}
                }, a);
                d.prototype.init.call(this, a, b)
            };
            return e
        }(g);
        (function (a) {
            a.maps = {};
            a.mapChart = function (c, d, b) {
                return new a(c, d, b)
            };
            a.splitPath =
                function (a) {
                    "string" === typeof a && (a = a.replace(/([A-Za-z])/g, " $1 ").replace(/^\s*/, "").replace(/\s*$/, ""), a = a.split(/[ ,;]+/).map(function (a) {
                        return /[A-za-z]/.test(a) ? a : parseFloat(a)
                    }));
                    return k.prototype.pathToSegments(a)
                }
        })(g || (g = {}));
        return g
    });
    u(f, "Maps/MapUtilities.js", [], function () {
        return {
            boundsFromPath: function (g) {
                var e = -Number.MAX_VALUE, k = Number.MAX_VALUE, d = -Number.MAX_VALUE, a = Number.MAX_VALUE, c;
                g.forEach(function (l) {
                    var g = l[l.length - 2];
                    l = l[l.length - 1];
                    "number" === typeof g && "number" === typeof l &&
                    (k = Math.min(k, g), e = Math.max(e, g), a = Math.min(a, l), d = Math.max(d, l), c = !0)
                });
                if (c) return {x1: k, y1: a, x2: e, y2: d}
            }, pointInPolygon: function (g, e) {
                var k, d = !1, a = g.x, c = g.y;
                g = 0;
                for (k = e.length - 1; g < e.length; k = g++) {
                    var l = e[g][1] > c;
                    var f = e[k][1] > c;
                    l !== f && a < (e[k][0] - e[g][0]) * (c - e[g][1]) / (e[k][1] - e[g][1]) + e[g][0] && (d = !d)
                }
                return d
            }
        }
    });
    u(f, "Series/Map/MapPoint.js", [f["Series/ColorMapComposition.js"], f["Maps/MapUtilities.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (g, e, k, d) {
        var a = this && this.__extends ||
                function () {
                    var a = function (c, b) {
                        a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, a) {
                            b.__proto__ = a
                        } || function (b, a) {
                            for (var h in a) Object.prototype.hasOwnProperty.call(a, h) && (b[h] = a[h])
                        };
                        return a(c, b)
                    };
                    return function (c, b) {
                        function h() {
                            this.constructor = c
                        }

                        if ("function" !== typeof b && null !== b) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                        a(c, b);
                        c.prototype = null === b ? Object.create(b) : (h.prototype = b.prototype, new h)
                    }
                }(), c = e.boundsFromPath, l = d.extend,
            f = d.isNumber, r = d.pick;
        e = function (e) {
            function g() {
                var b = null !== e && e.apply(this, arguments) || this;
                b.options = void 0;
                b.path = void 0;
                b.series = void 0;
                return b
            }

            a(g, e);
            g.getProjectedPath = function (b, h) {
                b.projectedPath || (h && b.geometry ? (h.hasCoordinates = !0, b.projectedPath = h.path(b.geometry)) : b.projectedPath = b.path);
                return b.projectedPath || []
            };
            g.prototype.applyOptions = function (b, h) {
                var a = this.series;
                b = e.prototype.applyOptions.call(this, b, h);
                h = a.joinBy;
                a.mapData && a.mapMap && (h = e.prototype.getNestedProperty.call(b,
                    h[1]), (h = "undefined" !== typeof h && a.mapMap[h]) ? l(b, h) : -1 !== a.pointArrayMap.indexOf("value") && (b.value = b.value || null));
                return b
            };
            g.prototype.getProjectedBounds = function (b) {
                var h = g.getProjectedPath(this, b);
                h = c(h);
                var a = this.properties, d = this.series.chart.mapView;
                if (h) {
                    var e = a && a["hc-middle-lon"], z = a && a["hc-middle-lat"];
                    d && f(e) && f(z) ? (b = b.forward([e, z]), h.midX = b[0], h.midY = b[1]) : (b = a && a["hc-middle-x"], a = a && a["hc-middle-y"], h.midX = h.x1 + (h.x2 - h.x1) * r(this.middleX, f(b) ? b : .5), b = r(this.middleY, f(a) ? a : .5), this.geometry ||
                    (b = 1 - b), h.midY = h.y2 - (h.y2 - h.y1) * b);
                    return h
                }
            };
            g.prototype.onMouseOver = function (b) {
                d.clearTimeout(this.colorInterval);
                if (!this.isNull && this.visible || this.series.options.nullInteraction) e.prototype.onMouseOver.call(this, b); else this.series.onMouseOut(b)
            };
            g.prototype.setVisible = function (b) {
                var a = b ? "show" : "hide";
                this.visible = this.options.visible = !!b;
                if (this.dataLabel) this.dataLabel[a]();
                this.graphic && this.graphic.attr(this.series.pointAttribs(this))
            };
            g.prototype.zoomTo = function (b) {
                var a = this.series.chart,
                    c = a.mapView, d = this.bounds;
                if (c && d) {
                    var e = f(this.insetIndex) && c.insets[this.insetIndex];
                    if (e) {
                        var z = e.projectedUnitsToPixels({x: d.x1, y: d.y1});
                        d = e.projectedUnitsToPixels({x: d.x2, y: d.y2});
                        z = c.pixelsToProjectedUnits({x: z.x, y: z.y});
                        d = c.pixelsToProjectedUnits({x: d.x, y: d.y});
                        d = {x1: z.x, y1: z.y, x2: d.x, y2: d.y}
                    }
                    c.fitToBounds(d, void 0, !1);
                    this.series.isDirty = !0;
                    a.redraw(b)
                }
            };
            return g
        }(k.seriesTypes.scatter.prototype.pointClass);
        l(e.prototype, {
            dataLabelOnNull: g.pointMembers.dataLabelOnNull, moveToTopOnHover: g.pointMembers.moveToTopOnHover,
            isValid: g.pointMembers.isValid
        });
        return e
    });
    u(f, "Maps/MapViewOptionsDefault.js", [], function () {
        return {
            center: [0, 0],
            fitToGeometry: void 0,
            maxZoom: void 0,
            padding: 0,
            projection: {name: void 0, parallels: void 0, rotation: void 0},
            zoom: void 0
        }
    });
    u(f, "Maps/MapViewInsetsOptionsDefault.js", [], function () {
        return {
            borderColor: "#cccccc",
            borderWidth: 1,
            center: [0, 0],
            padding: "10%",
            relativeTo: "mapBoundingBox",
            units: "percent"
        }
    });
    u(f, "Extensions/GeoJSON.js", [f["Core/Chart/Chart.js"], f["Core/Templating.js"], f["Core/Globals.js"],
        f["Core/Utilities.js"]], function (g, e, f, d) {
        function a(b, a) {
            a || (a = Object.keys(b.objects)[0]);
            a = b.objects[a];
            if (a["hc-decoded-geojson"]) return a["hc-decoded-geojson"];
            var h = b.arcs;
            if (b.transform) {
                var d = b.transform, c = d.scale, e = d.translate;
                h = b.arcs.map(function (b) {
                    var a = 0, h = 0;
                    return b.map(function (b) {
                        b = b.slice();
                        b[0] = (a += b[0]) * c[0] + e[0];
                        b[1] = (h += b[1]) * c[1] + e[1];
                        return b
                    })
                })
            }
            var l = function (b) {
                return "number" === typeof b[0] ? b.reduce(function (b, a, d) {
                    var c = 0 > a ? h[~a] : h[a];
                    0 > a ? (c = c.slice(0, 0 === d ? c.length : c.length -
                        1), c.reverse()) : d && (c = c.slice(1));
                    return b.concat(c)
                }, []) : b.map(l)
            };
            d = a.geometries.map(function (b) {
                return {
                    type: "Feature",
                    properties: b.properties,
                    geometry: {type: b.type, coordinates: b.coordinates || l(b.arcs)}
                }
            });
            b = {
                type: "FeatureCollection",
                copyright: b.copyright,
                copyrightShort: b.copyrightShort,
                copyrightUrl: b.copyrightUrl,
                features: d,
                "hc-recommended-mapview": a["hc-recommended-mapview"],
                bbox: b.bbox,
                title: b.title
            };
            return a["hc-decoded-geojson"] = b
        }

        function c(b, h, c) {
            void 0 === h && (h = "map");
            var d = [];
            b = "Topology" ===
            b.type ? a(b) : b;
            b.features.forEach(function (b) {
                var a = b.geometry || {}, c = a.type;
                a = a.coordinates;
                b = b.properties;
                var e;
                "map" !== h && "mapbubble" !== h || "Polygon" !== c && "MultiPolygon" !== c ? "mapline" !== h || "LineString" !== c && "MultiLineString" !== c ? "mappoint" === h && "Point" === c && a.length && (e = {
                    geometry: {
                        coordinates: a,
                        type: c
                    }
                }) : a.length && (e = {
                    geometry: {
                        coordinates: a,
                        type: c
                    }
                }) : a.length && (e = {geometry: {coordinates: a, type: c}});
                if (e) {
                    c = b && (b.name || b.NAME);
                    a = b && b.lon;
                    var l = b && b.lat;
                    d.push(v(e, {
                        lat: "number" === typeof l ? l : void 0,
                        lon: "number" === typeof a ? a : void 0, name: "string" === typeof c ? c : void 0, properties: b
                    }))
                }
            });
            c && b.copyrightShort && (c.chart.mapCredits = l(c.chart.options.credits.mapText, {geojson: b}), c.chart.mapCreditsFull = l(c.chart.options.credits.mapTextFull, {geojson: b}));
            return d
        }

        var l = e.format, k = f.win, r = d.error, v = d.extend, n = d.merge;
        e = d.wrap;
        "";
        g.prototype.transformFromLatLon = function (b, a) {
            var c = this.options.chart.proj4 || k.proj4;
            if (c) {
                var d = a.jsonmarginX;
                d = void 0 === d ? 0 : d;
                var h = a.jsonmarginY;
                h = void 0 === h ? 0 : h;
                var e = a.jsonres;
                e = void 0 === e ? 1 : e;
                var l = a.scale;
                l = void 0 === l ? 1 : l;
                var g = a.xoffset;
                g = void 0 === g ? 0 : g;
                var f = a.xpan;
                f = void 0 === f ? 0 : f;
                var m = a.yoffset;
                m = void 0 === m ? 0 : m;
                var q = a.ypan;
                q = void 0 === q ? 0 : q;
                b = c(a.crs, [b.lon, b.lat]);
                c = a.cosAngle || a.rotation && Math.cos(a.rotation);
                var t = a.sinAngle || a.rotation && Math.sin(a.rotation);
                a = a.rotation ? [b[0] * c + b[1] * t, -b[0] * t + b[1] * c] : b;
                return {x: ((a[0] - g) * l + f) * e + d, y: -(((m - a[1]) * l + q) * e - h)}
            }
            r(21, !1, this)
        };
        g.prototype.transformToLatLon = function (b, a) {
            var c = this.options.chart.proj4 || k.proj4;
            if (!c) r(21,
                !1, this); else if (null !== b.y) {
                var d = a.jsonmarginX, h = a.jsonmarginY, e = a.jsonres;
                e = void 0 === e ? 1 : e;
                var l = a.scale;
                l = void 0 === l ? 1 : l;
                var g = a.xoffset, f = a.xpan, m = a.yoffset, q = a.ypan;
                b = {
                    x: ((b.x - (void 0 === d ? 0 : d)) / e - (void 0 === f ? 0 : f)) / l + (void 0 === g ? 0 : g),
                    y: ((b.y - (void 0 === h ? 0 : h)) / e + (void 0 === q ? 0 : q)) / l + (void 0 === m ? 0 : m)
                };
                d = a.cosAngle || a.rotation && Math.cos(a.rotation);
                h = a.sinAngle || a.rotation && Math.sin(a.rotation);
                a = c(a.crs, "WGS84", a.rotation ? {x: b.x * d + b.y * -h, y: b.x * h + b.y * d} : b);
                return {lat: a.y, lon: a.x}
            }
        };
        g.prototype.fromPointToLatLon =
            function (a) {
                return this.mapView && this.mapView.projectedUnitsToLonLat(a)
            };
        g.prototype.fromLatLonToPoint = function (a) {
            return this.mapView && this.mapView.lonLatToProjectedUnits(a)
        };
        e(g.prototype, "addCredits", function (a, c) {
            c = n(!0, this.options.credits, c);
            this.mapCredits && (c.href = null);
            a.call(this, c);
            this.credits && this.mapCreditsFull && this.credits.attr({title: this.mapCreditsFull})
        });
        f.geojson = c;
        f.topo2geo = a;
        return {geojson: c, topo2geo: a}
    });
    u(f, "Core/Geometry/PolygonClip.js", [], function () {
        var g = function (d, a,
                          c) {
            return (a[0] - d[0]) * (c[1] - d[1]) > (a[1] - d[1]) * (c[0] - d[0])
        }, e = function (d, a, c, e) {
            var l = [d[0] - a[0], d[1] - a[1]], g = [c[0] - e[0], c[1] - e[1]];
            d = d[0] * a[1] - d[1] * a[0];
            c = c[0] * e[1] - c[1] * e[0];
            e = 1 / (l[0] * g[1] - l[1] * g[0]);
            l = [(d * g[0] - c * l[0]) * e, (d * g[1] - c * l[1]) * e];
            l.isIntersection = !0;
            return l
        }, f;
        (function (d) {
            d.clipLineString = function (a, c) {
                var e = [];
                a = d.clipPolygon(a, c, !1);
                for (c = 1; c < a.length; c++) a[c].isIntersection && a[c - 1].isIntersection && (e.push(a.splice(0, c)), c = 0), c === a.length - 1 && e.push(a);
                return e
            };
            d.clipPolygon = function (a,
                                      c, d) {
                void 0 === d && (d = !0);
                for (var l = c[c.length - 1], f, k, n = a, b = 0; b < c.length; b++) {
                    var h = n;
                    a = c[b];
                    n = [];
                    f = d ? h[h.length - 1] : h[0];
                    for (var C = 0; C < h.length; C++) k = h[C], g(l, a, k) ? (g(l, a, f) || n.push(e(l, a, f, k)), n.push(k)) : g(l, a, f) && n.push(e(l, a, f, k)), f = k;
                    l = a
                }
                return n
            }
        })(f || (f = {}));
        return f
    });
    u(f, "Maps/Projections/LambertConformalConic.js", [], function () {
        var g = Math.sign || function (d) {
            return 0 === d ? 0 : 0 < d ? 1 : -1
        }, e = Math.PI / 180, f = Math.PI / 2;
        return function () {
            function d(a) {
                var c, d = (a.parallels || []).map(function (a) {
                        return a * e
                    }),
                    k = d[0] || 0;
                d = null !== (c = d[1]) && void 0 !== c ? c : k;
                c = Math.cos(k);
                "object" === typeof a.projectedBounds && (this.projectedBounds = a.projectedBounds);
                a = k === d ? Math.sin(k) : Math.log(c / Math.cos(d)) / Math.log(Math.tan((f + d) / 2) / Math.tan((f + k) / 2));
                1e-10 > Math.abs(a) && (a = 1e-10 * (g(a) || 1));
                this.n = a;
                this.c = c * Math.pow(Math.tan((f + k) / 2), a) / a
            }

            d.prototype.forward = function (a) {
                var c = a[0] * e, d = this.c, g = this.n, k = this.projectedBounds;
                a = a[1] * e;
                0 < d ? a < -f + .000001 && (a = -f + .000001) : a > f - .000001 && (a = f - .000001);
                var v = d / Math.pow(Math.tan((f + a) /
                    2), g);
                a = v * Math.sin(g * c) * 63.78137;
                c = 63.78137 * (d - v * Math.cos(g * c));
                d = [a, c];
                k && (a < k.x1 || a > k.x2 || c < k.y1 || c > k.y2) && (d.outside = !0);
                return d
            };
            d.prototype.inverse = function (a) {
                var c = a[0] / 63.78137, d = this.c, k = this.n;
                a = d - a[1] / 63.78137;
                var r = g(k) * Math.sqrt(c * c + a * a), v = Math.atan2(c, Math.abs(a)) * g(a);
                0 > a * k && (v -= Math.PI * g(c) * g(a));
                return [v / k / e, (2 * Math.atan(Math.pow(d / r, 1 / k)) - f) / e]
            };
            return d
        }()
    });
    u(f, "Maps/Projections/EqualEarth.js", [], function () {
        var f = Math.sqrt(3) / 2;
        return function () {
            function e() {
                this.bounds = {
                    x1: -200.37508342789243,
                    x2: 200.37508342789243, y1: -97.52595454902263, y2: 97.52595454902263
                }
            }

            e.prototype.forward = function (e) {
                var d = Math.PI / 180, a = Math.asin(f * Math.sin(e[1] * d)), c = a * a, g = c * c * c;
                return [e[0] * d * Math.cos(a) * 74.03120656864502 / (f * (1.340264 + 3 * -.081106 * c + g * (7 * .000893 + .034164 * c))), 74.03120656864502 * a * (1.340264 + -.081106 * c + g * (.000893 + .003796 * c))]
            };
            e.prototype.inverse = function (e) {
                var d = e[0] / 74.03120656864502;
                e = e[1] / 74.03120656864502;
                var a = 180 / Math.PI, c = e, g;
                for (g = 0; 12 > g; ++g) {
                    var k = c * c;
                    var r = k * k * k;
                    var v = c * (1.340264 + -.081106 *
                        k + r * (.000893 + .003796 * k)) - e;
                    k = 1.340264 + 3 * -.081106 * k + r * (7 * .000893 + .034164 * k);
                    c -= v /= k;
                    if (1e-9 > Math.abs(v)) break
                }
                k = c * c;
                return [a * f * d * (1.340264 + 3 * -.081106 * k + k * k * k * (7 * .000893 + .034164 * k)) / Math.cos(c), a * Math.asin(Math.sin(c) / f)]
            };
            return e
        }()
    });
    u(f, "Maps/Projections/Miller.js", [], function () {
        var f = Math.PI / 4, e = Math.PI / 180;
        return function () {
            function g() {
                this.bounds = {
                    x1: -200.37508342789243,
                    x2: 200.37508342789243,
                    y1: -146.91480769173063,
                    y2: 146.91480769173063
                }
            }

            g.prototype.forward = function (d) {
                return [d[0] * e * 63.78137,
                    79.7267125 * Math.log(Math.tan(f + .4 * d[1] * e))]
            };
            g.prototype.inverse = function (d) {
                return [d[0] / 63.78137 / e, 2.5 * (Math.atan(Math.exp(d[1] / 63.78137 * .8)) - f) / e]
            };
            return g
        }()
    });
    u(f, "Maps/Projections/Orthographic.js", [], function () {
        var f = Math.PI / 180;
        return function () {
            function e() {
                this.antimeridianCutting = !1;
                this.bounds = {
                    x1: -63.78460826781007,
                    x2: 63.78460826781007,
                    y1: -63.78460826781007,
                    y2: 63.78460826781007
                }
            }

            e.prototype.forward = function (e) {
                var d = e[0];
                e = e[1] * f;
                e = [Math.cos(e) * Math.sin(d * f) * 63.78460826781007, 63.78460826781007 *
                Math.sin(e)];
                if (-90 > d || 90 < d) e.outside = !0;
                return e
            };
            e.prototype.inverse = function (e) {
                var d = e[0] / 63.78460826781007;
                e = e[1] / 63.78460826781007;
                var a = Math.sqrt(d * d + e * e), c = Math.asin(a), g = Math.sin(c);
                return [Math.atan2(d * g, a * Math.cos(c)) / f, Math.asin(a && e * g / a) / f]
            };
            return e
        }()
    });
    u(f, "Maps/Projections/WebMercator.js", [], function () {
        var f = Math.PI / 180;
        return function () {
            function e() {
                this.bounds = {
                    x1: -200.37508342789243,
                    x2: 200.37508342789243,
                    y1: -200.3750834278071,
                    y2: 200.3750834278071
                };
                this.maxLatitude = 85.0511287798
            }

            e.prototype.forward = function (e) {
                var d = Math.sin(e[1] * f);
                d = [63.78137 * e[0] * f, 63.78137 * Math.log((1 + d) / (1 - d)) / 2];
                85.0511287798 < Math.abs(e[1]) && (d.outside = !0);
                return d
            };
            e.prototype.inverse = function (e) {
                return [e[0] / (63.78137 * f), (2 * Math.atan(Math.exp(e[1] / 63.78137)) - Math.PI / 2) / f]
            };
            return e
        }()
    });
    u(f, "Maps/Projections/ProjectionRegistry.js", [f["Maps/Projections/LambertConformalConic.js"], f["Maps/Projections/EqualEarth.js"], f["Maps/Projections/Miller.js"], f["Maps/Projections/Orthographic.js"], f["Maps/Projections/WebMercator.js"]],
        function (f, e, k, d, a) {
            return {EqualEarth: e, LambertConformalConic: f, Miller: k, Orthographic: d, WebMercator: a}
        });
    u(f, "Maps/Projection.js", [f["Core/Geometry/PolygonClip.js"], f["Maps/Projections/ProjectionRegistry.js"], f["Core/Utilities.js"]], function (f, e, k) {
        var d = this && this.__spreadArray || function (a, b, d) {
                if (d || 2 === arguments.length) for (var c = 0, e = b.length, f; c < e; c++) !f && c in b || (f || (f = Array.prototype.slice.call(b, 0, c)), f[c] = b[c]);
                return a.concat(f || Array.prototype.slice.call(b))
            }, a = f.clipLineString, c = f.clipPolygon,
            g = k.clamp, u = k.erase, r = 2 * Math.PI / 360, v = function (a) {
                -180 > a && (a += 360);
                180 < a && (a -= 360);
                return a
            };
        return function () {
            function f(a) {
                void 0 === a && (a = {});
                this.hasGeoProjection = this.hasCoordinates = !1;
                this.maxLatitude = 90;
                this.options = a;
                var b = a.name, c = a.projectedBounds, d = a.rotation;
                this.rotator = d ? this.getRotator(d) : void 0;
                if (b = b ? f.registry[b] : void 0) this.def = new b(a);
                var e = this.def, g = this.rotator;
                e && (this.maxLatitude = e.maxLatitude || 90, this.hasGeoProjection = !0);
                g && e ? (this.forward = function (a) {
                    return e.forward(g.forward(a))
                },
                    this.inverse = function (a) {
                        return g.inverse(e.inverse(a))
                    }) : e ? (this.forward = function (a) {
                    return e.forward(a)
                }, this.inverse = function (a) {
                    return e.inverse(a)
                }) : g && (this.forward = g.forward, this.inverse = g.inverse);
                this.bounds = "world" === c ? e && e.bounds : c
            }

            f.add = function (a, c) {
                f.registry[a] = c
            };
            f.greatCircle = function (a, c, d) {
                var b = Math.atan2, e = Math.cos, f = Math.sin, h = Math.sqrt, g = a[1] * r, l = a[0] * r, m = c[1] * r,
                    q = c[0] * r, t = m - g, k = q - l;
                t = f(t / 2) * f(t / 2) + e(g) * e(m) * f(k / 2) * f(k / 2);
                t = 2 * b(h(t), h(1 - t));
                var y = Math.round(6371E3 * t / 5E5);
                k =
                    [];
                d && k.push(a);
                if (1 < y) for (y = a = 1 / y; .999 > y; y += a) {
                    var F = f((1 - y) * t) / f(t), G = f(y * t) / f(t), p = F * e(g) * e(l) + G * e(m) * e(q),
                        L = F * e(g) * f(l) + G * e(m) * f(q);
                    F = F * f(g) + G * f(m);
                    F = b(F, h(p * p + L * L));
                    p = b(L, p);
                    k.push([p / r, F / r])
                }
                d && k.push(c);
                return k
            };
            f.insertGreatCircles = function (a) {
                for (var b = a.length - 1; b--;) if (10 < Math.max(Math.abs(a[b][0] - a[b + 1][0]), Math.abs(a[b][1] - a[b + 1][1]))) {
                    var c = f.greatCircle(a[b], a[b + 1]);
                    c.length && a.splice.apply(a, d([b + 1, 0], c, !1))
                }
            };
            f.toString = function (a) {
                a = a || {};
                var b = a.rotation;
                return [a.name, b && b.join(",")].join(";")
            };
            f.prototype.lineIntersectsBounds = function (a) {
                var b = this.bounds || {}, c = b.x2, e = b.y1, d = b.y2, f = function (a, b, c) {
                    var e = a[0];
                    a = a[1];
                    var d = b ? 0 : 1;
                    if ("number" === typeof c && e[b] >= c !== a[b] >= c) return e = e[d] + (c - e[b]) / (a[b] - e[b]) * (a[d] - e[d]), b ? [e, c] : [c, e]
                }, g = a[0];
                if (b = f(a, 0, b.x1)) g = b, a[1] = b; else if (b = f(a, 0, c)) g = b, a[1] = b;
                if (b = f(a, 1, e)) g = b; else if (b = f(a, 1, d)) g = b;
                return g
            };
            f.prototype.getRotator = function (a) {
                var b = a[0] * r, c = (a[1] || 0) * r;
                a = (a[2] || 0) * r;
                var e = Math.cos(c), d = Math.sin(c), f = Math.cos(a), g = Math.sin(a);
                if (0 !== b ||
                    0 !== c || 0 !== a) return {
                    forward: function (a) {
                        var c = a[0] * r + b, m = a[1] * r, q = Math.cos(m);
                        a = Math.cos(c) * q;
                        c = Math.sin(c) * q;
                        m = Math.sin(m);
                        q = m * e + a * d;
                        return [Math.atan2(c * f - q * g, a * e - m * d) / r, Math.asin(q * f + c * g) / r]
                    }, inverse: function (a) {
                        var c = a[0] * r, m = a[1] * r, q = Math.cos(m);
                        a = Math.cos(c) * q;
                        c = Math.sin(c) * q;
                        m = Math.sin(m);
                        q = m * f - c * g;
                        return [(Math.atan2(c * f + m * g, a * e + q * d) - b) / r, Math.asin(q * e - a * d) / r]
                    }
                }
            };
            f.prototype.forward = function (a) {
                return a
            };
            f.prototype.inverse = function (a) {
                return a
            };
            f.prototype.cutOnAntimeridian = function (a, c) {
                var b =
                    [], e = [a];
                a.forEach(function (e, d) {
                    var f = a[d - 1];
                    if (!d) {
                        if (!c) return;
                        f = a[a.length - 1]
                    }
                    var m = f[0], p = e[0];
                    (-90 > m || 90 < m) && (-90 > p || 90 < p) && 0 < m !== 0 < p && (p = g((180 - (m + 360) % 360) / ((p + 360) % 360 - (m + 360) % 360), 0, 1), b.push({
                        i: d,
                        lat: f[1] + p * (e[1] - f[1]),
                        direction: 0 > m ? 1 : -1,
                        previousLonLat: f,
                        lonLat: e
                    }))
                });
                if (b.length) if (c) {
                    if (1 === b.length % 2) {
                        var l = b.slice().sort(function (a, b) {
                            return Math.abs(b.lat) - Math.abs(a.lat)
                        })[0];
                        u(b, l)
                    }
                    for (var h = b.length - 2; 0 <= h;) {
                        var k = b[h].i, n = v(180 + .000001 * b[h].direction), x = v(180 - .000001 * b[h].direction);
                        k = a.splice.apply(a, d([k, b[h + 1].i - k], f.greatCircle([n, b[h].lat], [n, b[h + 1].lat], !0), !1));
                        k.push.apply(k, f.greatCircle([x, b[h + 1].lat], [x, b[h].lat], !0));
                        e.push(k);
                        h -= 2
                    }
                    if (l) for (n = 0; n < e.length; n++) {
                        h = l.direction;
                        var m = l.lat;
                        x = e[n];
                        k = x.indexOf(l.lonLat);
                        if (-1 < k) {
                            n = (0 > m ? -1 : 1) * this.maxLatitude;
                            var q = v(180 + .000001 * h), t = v(180 - .000001 * h);
                            m = f.greatCircle([q, m], [q, n], !0);
                            for (q += 120 * h; -180 < q && 180 > q; q += 120 * h) m.push([q, n]);
                            m.push.apply(m, f.greatCircle([t, n], [t, l.lat], !0));
                            x.splice.apply(x, d([k, 0], m, !1));
                            break
                        }
                    }
                } else for (h =
                                b.length; h--;) k = b[h].i, k = a.splice(k, a.length, [v(180 + .000001 * b[h].direction), b[h].lat]), k.unshift([v(180 - .000001 * b[h].direction), b[h].lat]), e.push(k);
                return e
            };
            f.prototype.path = function (b) {
                var e = this, d = this.bounds, g = this.def, l = this.rotator, k = [],
                    n = "Polygon" === b.type || "MultiPolygon" === b.type, r = this.hasGeoProjection,
                    x = !g || !1 !== g.antimeridianCutting, m = x ? l : void 0, q = x ? g || this : this, t;
                d && (t = [[d.x1, d.y1], [d.x2, d.y1], [d.x2, d.y2], [d.x1, d.y2]]);
                var I = function (b) {
                    b = b.map(function (a) {
                        if (x) {
                            m && (a = m.forward(a));
                            var b =
                                a[0];
                            .000001 > Math.abs(b - 180) && (b = 180 > b ? 179.999999 : 180.000001);
                            a = [b, a[1]]
                        }
                        return a
                    });
                    var g = [b];
                    r && (f.insertGreatCircles(b), x && (g = e.cutOnAntimeridian(b, n)));
                    g.forEach(function (b) {
                        if (!(2 > b.length)) {
                            var p = !1, e = !1, N = function (a) {
                                p ? k.push(["L", a[0], a[1]]) : (k.push(["M", a[0], a[1]]), p = !0)
                            }, B = !1, A = !1, g = b.map(function (a) {
                                a = q.forward(a);
                                a.outside ? B = !0 : A = !0;
                                Infinity === a[1] ? a[1] = 1E10 : -Infinity === a[1] && (a[1] = -1E10);
                                return a
                            });
                            if (x) {
                                n && g.push(g[0]);
                                if (B) {
                                    if (!A) return;
                                    if (t) if (n) g = c(g, t); else if (d) {
                                        a(g, t).forEach(function (a) {
                                            p =
                                                !1;
                                            a.forEach(N)
                                        });
                                        return
                                    }
                                }
                                g.forEach(N)
                            } else for (var m = 0; m < g.length; m++) {
                                var w = b[m], h = g[m];
                                if (h.outside) e = !0; else {
                                    if (n && !l) {
                                        var l = w;
                                        b.push(w);
                                        g.push(h)
                                    }
                                    e && G && (n && r ? f.greatCircle(G, w).forEach(function (a) {
                                        return N(q.forward(a))
                                    }) : p = !1);
                                    N(h);
                                    var G = w;
                                    e = !1
                                }
                            }
                        }
                    })
                };
                "LineString" === b.type ? I(b.coordinates) : "MultiLineString" === b.type ? b.coordinates.forEach(function (a) {
                    return I(a)
                }) : "Polygon" === b.type ? (b.coordinates.forEach(function (a) {
                    return I(a)
                }), k.length && k.push(["Z"])) : "MultiPolygon" === b.type && (b.coordinates.forEach(function (a) {
                    a.forEach(function (a) {
                        return I(a)
                    })
                }),
                k.length && k.push(["Z"]));
                return k
            };
            f.registry = e;
            return f
        }()
    });
    u(f, "Maps/MapView.js", [f["Maps/MapViewOptionsDefault.js"], f["Maps/MapViewInsetsOptionsDefault.js"], f["Extensions/GeoJSON.js"], f["Core/Chart/MapChart.js"], f["Maps/MapUtilities.js"], f["Maps/Projection.js"], f["Core/Utilities.js"]], function (f, e, k, d, a, c, l) {
        var g = this && this.__extends || function () {
                var a = function (b, c) {
                    a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                        a.__proto__ = b
                    } || function (a, b) {
                        for (var p in b) Object.prototype.hasOwnProperty.call(b,
                            p) && (a[p] = b[p])
                    };
                    return a(b, c)
                };
                return function (b, c) {
                    function p() {
                        this.constructor = b
                    }

                    if ("function" !== typeof c && null !== c) throw new TypeError("Class extends value " + String(c) + " is not a constructor or null");
                    a(b, c);
                    b.prototype = null === c ? Object.create(c) : (p.prototype = c.prototype, new p)
                }
            }(), r = this && this.__spreadArray || function (a, b, c) {
                if (c || 2 === arguments.length) for (var p = 0, e = b.length, d; p < e; p++) !d && p in b || (d || (d = Array.prototype.slice.call(b, 0, p)), d[p] = b[p]);
                return a.concat(d || Array.prototype.slice.call(b))
            },
            u = k.topo2geo, n = d.maps, b = a.boundsFromPath, h = a.pointInPolygon, C = l.addEvent, D = l.clamp,
            J = l.fireEvent, z = l.isArray, E = l.isNumber, O = l.isObject, x = l.isString, m = l.merge, q = l.pick,
            t = l.relativeLength, I = function (a, b) {
                return Math.log(400.979322 / Math.max((a.x2 - a.x1) / (b.width / 256), (a.y2 - a.y1) / (b.height / 256))) / Math.log(2)
            }, y = function () {
                function a(b, e) {
                    var d = this;
                    this.allowTransformAnimation = !0;
                    this.insets = [];
                    this.padding = [0, 0, 0, 0];
                    this.eventsToUnbind = [];
                    var p;
                    if (!(this instanceof F)) {
                        var A = r([b.options.chart.map], (b.options.series ||
                            []).map(function (a) {
                            return a.mapData
                        }), !0).map(function (a) {
                            return d.getGeoMap(a)
                        }), L = [];
                        A.forEach(function (a) {
                            a && (w || (w = a["hc-recommended-mapview"]), a.bbox && (a = a.bbox, L.push({
                                x1: a[0],
                                y1: a[1],
                                x2: a[2],
                                y2: a[3]
                            })))
                        });
                        var g = L.length && a.compositeBounds(L);
                        J(b, "beforeMapViewInit", {geoBounds: g}, function () {
                            if (g) {
                                var a = g.x1, b = g.y1, c = g.x2, d = g.y2;
                                p = 180 < c - a && 90 < d - b ? {name: "EqualEarth"} : {
                                    name: "LambertConformalConic",
                                    parallels: [b, d],
                                    rotation: [-(a + c) / 2]
                                }
                            }
                        });
                        this.geoMap = A[0]
                    }
                    this.userOptions = e || {};
                    if (b.options.mapView &&
                        b.options.mapView.recommendedMapView) var w = b.options.mapView.recommendedMapView;
                    A = m(f, {projection: p}, w, e);
                    var h = w && w.insets;
                    e = e && e.insets;
                    h && e && (A.insets = a.mergeInsets(h, e));
                    this.chart = b;
                    this.center = A.center;
                    this.options = A;
                    this.projection = new c(A.projection);
                    this.playingField = b.plotBox;
                    this.zoom = A.zoom || 0;
                    this.minZoom = A.minZoom;
                    this.createInsets();
                    this.eventsToUnbind.push(C(b, "afterSetChartSize", function () {
                        d.playingField = d.getField();
                        if (void 0 === d.minZoom || d.minZoom === d.zoom) d.fitToBounds(void 0,
                            void 0, !1), !d.chart.hasRendered && E(d.userOptions.zoom) && (d.zoom = d.userOptions.zoom), d.userOptions.center && m(!0, d.center, d.userOptions.center)
                    }));
                    this.setUpEvents()
                }

                a.mergeInsets = function (a, b) {
                    var c = function (a) {
                        var b = {};
                        a.forEach(function (a, c) {
                            b[a && a.id || "i".concat(c)] = a
                        });
                        return b
                    }, d = m(c(a), c(b));
                    return Object.keys(d).map(function (a) {
                        return d[a]
                    })
                };
                a.prototype.createInsets = function () {
                    var a = this, b = this.options, c = b.insets;
                    c && c.forEach(function (c) {
                        c = new F(a, m(b.insetOptions, c));
                        a.insets.push(c)
                    })
                };
                a.prototype.fitToBounds =
                    function (a, b, c, d) {
                        void 0 === c && (c = !0);
                        var e = a || this.getProjectedBounds();
                        if (e) {
                            var p = q(b, a ? 0 : this.options.padding);
                            b = this.getField(!1);
                            p = z(p) ? p : [p, p, p, p];
                            this.padding = [t(p[0], b.height), t(p[1], b.width), t(p[2], b.height), t(p[3], b.width)];
                            this.playingField = this.getField();
                            b = I(e, this.playingField);
                            a || (this.minZoom = b);
                            a = this.projection.inverse([(e.x2 + e.x1) / 2, (e.y2 + e.y1) / 2]);
                            this.setView(a, b, c, d)
                        }
                    };
                a.prototype.getField = function (a) {
                    void 0 === a && (a = !0);
                    a = a ? this.padding : [0, 0, 0, 0];
                    return {
                        x: a[3], y: a[0], width: this.chart.plotWidth -
                            a[1] - a[3], height: this.chart.plotHeight - a[0] - a[2]
                    }
                };
                a.prototype.getGeoMap = function (a) {
                    if (x(a)) return n[a] && "Topology" === n[a].type ? u(n[a]) : n[a];
                    if (O(a, !0)) {
                        if ("FeatureCollection" === a.type) return a;
                        if ("Topology" === a.type) return u(a)
                    }
                };
                a.prototype.getMapBBox = function () {
                    var a = this.getProjectedBounds(), b = this.getScale();
                    if (a) {
                        var c = this.padding, d = this.projectedUnitsToPixels({x: a.x1, y: a.y2});
                        return {
                            width: (a.x2 - a.x1) * b + c[1] + c[3],
                            height: (a.y2 - a.y1) * b + c[0] + c[2],
                            x: d.x - c[3],
                            y: d.y - c[0]
                        }
                    }
                };
                a.prototype.getProjectedBounds =
                    function () {
                        var c = this.projection, d = this.chart.series.reduce(function (a, b) {
                            var c = b.getProjectedBounds && b.getProjectedBounds();
                            c && !1 !== b.options.affectsMapView && a.push(c);
                            return a
                        }, []), e = this.options.fitToGeometry;
                        return e ? (this.fitToGeometryCache || ("MultiPoint" === e.type ? (e = e.coordinates.map(function (a) {
                            return c.forward(a)
                        }), d = e.map(function (a) {
                            return a[0]
                        }), e = e.map(function (a) {
                            return a[1]
                        }), this.fitToGeometryCache = {
                            x1: Math.min.apply(0, d),
                            x2: Math.max.apply(0, d),
                            y1: Math.min.apply(0, e),
                            y2: Math.max.apply(0,
                                e)
                        }) : this.fitToGeometryCache = b(c.path(e))), this.fitToGeometryCache) : this.projection.bounds || a.compositeBounds(d)
                    };
                a.prototype.getScale = function () {
                    return 256 / 400.979322 * Math.pow(2, this.zoom)
                };
                a.prototype.getSVGTransform = function () {
                    var a = this.playingField, b = a.x, c = a.y, d = a.width;
                    a = a.height;
                    var e = this.projection.forward(this.center), f = this.projection.hasCoordinates ? -1 : 1,
                        g = this.getScale();
                    f *= g;
                    return {scaleX: g, scaleY: f, translateX: b + d / 2 - e[0] * g, translateY: c + a / 2 - e[1] * f}
                };
                a.prototype.lonLatToPixels = function (a) {
                    if (a =
                        this.lonLatToProjectedUnits(a)) return this.projectedUnitsToPixels(a)
                };
                a.prototype.lonLatToProjectedUnits = function (a) {
                    var b = this.chart, c = b.mapTransforms;
                    if (c) {
                        for (var e in c) if (Object.hasOwnProperty.call(c, e) && c[e].hitZone) {
                            var d = b.transformFromLatLon(a, c[e]);
                            if (d && h(d, c[e].hitZone.coordinates[0])) return d
                        }
                        return b.transformFromLatLon(a, c["default"])
                    }
                    c = 0;
                    for (e = this.insets; c < e.length; c++) if (b = e[c], b.options.geoBounds && h({
                        x: a.lon,
                        y: a.lat
                    }, b.options.geoBounds.coordinates[0])) return a = b.projection.forward([a.lon,
                        a.lat]), a = b.projectedUnitsToPixels({x: a[0], y: a[1]}), this.pixelsToProjectedUnits(a);
                    a = this.projection.forward([a.lon, a.lat]);
                    if (!a.outside) return {x: a[0], y: a[1]}
                };
                a.prototype.projectedUnitsToLonLat = function (a) {
                    var b = this.chart, c = b.mapTransforms;
                    if (c) {
                        for (var e in c) if (Object.hasOwnProperty.call(c, e) && c[e].hitZone && h(a, c[e].hitZone.coordinates[0])) return b.transformToLatLon(a, c[e]);
                        return b.transformToLatLon(a, c["default"])
                    }
                    c = this.projectedUnitsToPixels(a);
                    e = 0;
                    for (var d = this.insets; e < d.length; e++) if (b =
                        d[e], b.hitZone && h(c, b.hitZone.coordinates[0])) return a = b.pixelsToProjectedUnits(c), a = b.projection.inverse([a.x, a.y]), {
                        lon: a[0],
                        lat: a[1]
                    };
                    a = this.projection.inverse([a.x, a.y]);
                    return {lon: a[0], lat: a[1]}
                };
                a.prototype.redraw = function (a) {
                    this.chart.series.forEach(function (a) {
                        a.useMapGeometry && (a.isDirty = !0)
                    });
                    this.chart.redraw(a)
                };
                a.prototype.setView = function (a, b, c, e) {
                    void 0 === c && (c = !0);
                    a && (this.center = a);
                    "number" === typeof b && ("number" === typeof this.minZoom && (b = Math.max(b, this.minZoom)), "number" === typeof this.options.maxZoom &&
                    (b = Math.min(b, this.options.maxZoom)), E(b) && (this.zoom = b));
                    var d = this.getProjectedBounds();
                    if (d) {
                        a = this.projection.forward(this.center);
                        var f = this.playingField;
                        b = f.x;
                        var g = f.y, p = f.width;
                        f = f.height;
                        var m = this.getScale(), B = this.projectedUnitsToPixels({x: d.x1, y: d.y1}),
                            h = this.projectedUnitsToPixels({x: d.x2, y: d.y2});
                        d = [(d.x1 + d.x2) / 2, (d.y1 + d.y2) / 2];
                        if (!this.chart.series.some(function (a) {
                            return a.isDrilling
                        })) {
                            var k = B.x, l = h.y;
                            h = h.x;
                            B = B.y;
                            h - k < p ? a[0] = d[0] : k < b && h < b + p ? a[0] += Math.max(k - b, h - p - b) / m : h > b + p && k > b &&
                                (a[0] += Math.min(h - p - b, k - b) / m);
                            B - l < f ? a[1] = d[1] : l < g && B < g + f ? a[1] -= Math.max(l - g, B - f - g) / m : B > g + f && l > g && (a[1] -= Math.min(B - f - g, l - g) / m);
                            this.center = this.projection.inverse(a)
                        }
                        this.insets.forEach(function (a) {
                            a.options.field && (a.hitZone = a.getHitZone(), a.playingField = a.getField())
                        });
                        this.render()
                    }
                    J(this, "afterSetView");
                    c && this.redraw(e)
                };
                a.prototype.projectedUnitsToPixels = function (a) {
                    var b = this.getScale(), c = this.projection.forward(this.center), d = this.playingField;
                    return {
                        x: d.x + d.width / 2 - b * (c[0] - a.x), y: d.y + d.height /
                            2 + b * (c[1] - a.y)
                    }
                };
                a.prototype.pixelsToLonLat = function (a) {
                    return this.projectedUnitsToLonLat(this.pixelsToProjectedUnits(a))
                };
                a.prototype.pixelsToProjectedUnits = function (a) {
                    var b = a.x;
                    a = a.y;
                    var c = this.getScale(), d = this.projection.forward(this.center), e = this.playingField;
                    return {x: d[0] + (b - (e.x + e.width / 2)) / c, y: d[1] - (a - (e.y + e.height / 2)) / c}
                };
                a.prototype.setUpEvents = function () {
                    var a = this, b = this.chart, c, d, e, f = function (f) {
                        var g = b.pointer.pinchDown, m = a.projection, B = b.mouseDownX, h = b.mouseDownY;
                        1 === g.length && (B =
                            g[0].chartX, h = g[0].chartY);
                        if ("number" === typeof B && "number" === typeof h) {
                            var A = "".concat(B, ",").concat(h), k = f.originalEvent;
                            g = k.chartX;
                            k = k.chartY;
                            A !== d && (d = A, c = a.projection.forward(a.center), e = (a.projection.options.rotation || [0, 0]).slice());
                            A = (A = m.def && m.def.bounds) && I(A, a.playingField) || -Infinity;
                            "Orthographic" === m.options.name && (a.minZoom || Infinity) < 1.3 * A ? (m = 440 / (a.getScale() * Math.min(b.plotWidth, b.plotHeight)), e && (B = (B - g) * m - e[0], h = D(-e[1] - (h - k) * m, -80, 80), g = a.zoom, a.update({
                                projection: {
                                    rotation: [-B,
                                        -h]
                                }
                            }, !1), a.fitToBounds(void 0, void 0, !1), a.zoom = g, b.redraw(!1))) : E(g) && E(k) && (m = a.getScale(), h = a.projection.inverse([c[0] + (B - g) / m, c[1] - (h - k) / m * (a.projection.hasCoordinates ? 1 : -1)]), a.setView(h, void 0, !0, !1));
                            f.preventDefault()
                        }
                    };
                    C(b, "pan", f);
                    C(b, "touchpan", f);
                    C(b, "selection", function (c) {
                        if (c.resetSelection) a.zoomBy(); else {
                            var d = c.x - b.plotLeft, e = c.y - b.plotTop, f = a.pixelsToProjectedUnits({x: d, y: e}),
                                g = f.y;
                            f = f.x;
                            d = a.pixelsToProjectedUnits({x: d + c.width, y: e + c.height});
                            a.fitToBounds({x1: f, y1: g, x2: d.x, y2: d.y},
                                void 0, !0, c.originalEvent.touches ? !1 : void 0);
                            /^touch/.test(c.originalEvent.type) || b.showResetZoom();
                            c.preventDefault()
                        }
                    })
                };
                a.prototype.render = function () {
                    this.group || (this.group = this.chart.renderer.g("map-view").attr({zIndex: 4}).add())
                };
                a.prototype.update = function (a, b, d) {
                    void 0 === b && (b = !0);
                    var e = a.projection;
                    e = e && c.toString(e) !== c.toString(this.options.projection);
                    var f = !1;
                    m(!0, this.userOptions, a);
                    m(!0, this.options, a);
                    "insets" in a && (this.insets.forEach(function (a) {
                        return a.destroy()
                    }), this.insets.length =
                        0, f = !0);
                    (e || "fitToGeometry" in a) && delete this.fitToGeometryCache;
                    if (e || f) this.chart.series.forEach(function (a) {
                        var b = a.transformGroups;
                        a.clearBounds && a.clearBounds();
                        a.isDirty = !0;
                        a.isDirtyData = !0;
                        if (f && b) for (; 1 < b.length;) (a = b.pop()) && a.destroy()
                    }), e && (this.projection = new c(this.options.projection)), f && this.createInsets(), a.center || !Object.hasOwnProperty.call(a, "zoom") || E(a.zoom) || this.fitToBounds(void 0, void 0, !1);
                    a.center || E(a.zoom) ? this.setView(this.options.center, a.zoom, !1) : "fitToGeometry" in a &&
                        this.fitToBounds(void 0, void 0, !1);
                    b && this.chart.redraw(d)
                };
                a.prototype.zoomBy = function (a, b, c, e) {
                    var d = this.chart, f = this.projection.forward(this.center);
                    b = b ? this.projection.forward(b) : [];
                    var g = b[0], m = b[1];
                    "number" === typeof a ? (a = this.zoom + a, b = void 0, c && (g = c[0], m = c[1], c = this.getScale(), g = g - d.plotLeft - d.plotWidth / 2, d = m - d.plotTop - d.plotHeight / 2, g = f[0] + g / c, m = f[1] + d / c), "number" === typeof g && "number" === typeof m && (c = 1 - Math.pow(2, this.zoom) / Math.pow(2, a), g = f[0] - g, d = f[1] - m, f[0] -= g * c, f[1] += d * c, b = this.projection.inverse(f)),
                        this.setView(b, a, void 0, e)) : this.fitToBounds(void 0, void 0, void 0, e)
                };
                a.compositeBounds = function (a) {
                    if (a.length) return a.slice(1).reduce(function (a, b) {
                        a.x1 = Math.min(a.x1, b.x1);
                        a.y1 = Math.min(a.y1, b.y1);
                        a.x2 = Math.max(a.x2, b.x2);
                        a.y2 = Math.max(a.y2, b.y2);
                        return a
                    }, m(a[0]))
                };
                return a
            }(), F = function (a) {
                function c(c, d) {
                    var f = a.call(this, c.chart, d) || this;
                    f.id = d.id;
                    f.mapView = c;
                    f.options = m(e, d);
                    f.allBounds = [];
                    f.options.geoBounds && (c = c.projection.path(f.options.geoBounds), f.geoBoundsProjectedBox = b(c), f.geoBoundsProjectedPolygon =
                        c.map(function (a) {
                            return [a[1] || 0, a[2] || 0]
                        }));
                    return f
                }

                g(c, a);
                c.prototype.getField = function (b) {
                    void 0 === b && (b = !0);
                    var c = this.hitZone;
                    if (c) {
                        var d = b ? this.padding : [0, 0, 0, 0];
                        c = c.coordinates[0];
                        var e = c.map(function (a) {
                            return a[0]
                        }), f = c.map(function (a) {
                            return a[1]
                        });
                        c = Math.min.apply(0, e) + d[3];
                        e = Math.max.apply(0, e) - d[1];
                        var g = Math.min.apply(0, f) + d[0];
                        d = Math.max.apply(0, f) - d[2];
                        if (E(c) && E(g)) return {x: c, y: g, width: e - c, height: d - g}
                    }
                    return a.prototype.getField.call(this, b)
                };
                c.prototype.getHitZone = function () {
                    var a =
                        this.chart, b = this.mapView, c = this.options, d = (c.field || {}).coordinates;
                    if (d) {
                        d = d[0];
                        if ("percent" === c.units) {
                            var e = "mapBoundingBox" === c.relativeTo && b.getMapBBox() || m(a.plotBox, {x: 0, y: 0});
                            d = d.map(function (a) {
                                return [t("".concat(a[0], "%"), e.width, e.x), t("".concat(a[1], "%"), e.height, e.y)]
                            })
                        }
                        return {type: "Polygon", coordinates: [d]}
                    }
                };
                c.prototype.getProjectedBounds = function () {
                    return y.compositeBounds(this.allBounds)
                };
                c.prototype.isInside = function (a) {
                    var b = this.geoBoundsProjectedBox, c = this.geoBoundsProjectedPolygon;
                    return !!(b && a.x >= b.x1 && a.x <= b.x2 && a.y >= b.y1 && a.y <= b.y2 && c && h(a, c))
                };
                c.prototype.render = function () {
                    var a = this.chart, b = this.mapView, c = this.options, d = c.borderPath || c.field;
                    if (d && b.group) {
                        var e = !0;
                        this.border || (this.border = a.renderer.path().addClass("highcharts-mapview-inset-border").add(b.group), e = !1);
                        a.styledMode || this.border.attr({stroke: c.borderColor, "stroke-width": c.borderWidth});
                        var f = Math.round(this.border.strokeWidth()) % 2 / 2,
                            g = "mapBoundingBox" === c.relativeTo && b.getMapBBox() || b.playingField;
                        b = (d.coordinates ||
                            []).reduce(function (b, d) {
                            return d.reduce(function (b, d, e) {
                                var m = d[0];
                                d = d[1];
                                "percent" === c.units && (m = a.plotLeft + t("".concat(m, "%"), g.width, g.x), d = a.plotTop + t("".concat(d, "%"), g.height, g.y));
                                m = Math.floor(m) + f;
                                d = Math.floor(d) + f;
                                b.push(0 === e ? ["M", m, d] : ["L", m, d]);
                                return b
                            }, b)
                        }, []);
                        this.border[e ? "animate" : "attr"]({d: b})
                    }
                };
                c.prototype.destroy = function () {
                    this.border && (this.border = this.border.destroy());
                    this.eventsToUnbind.forEach(function (a) {
                        return a()
                    })
                };
                c.prototype.setUpEvents = function () {
                };
                return c
            }(y);
        C(d, "afterInit", function () {
            this.mapView = new y(this, this.options.mapView)
        });
        return y
    });
    u(f, "Series/Map/MapSeries.js", [f["Core/Animation/AnimationUtilities.js"], f["Series/ColorMapComposition.js"], f["Series/CenteredUtilities.js"], f["Core/Globals.js"], f["Core/Chart/MapChart.js"], f["Series/Map/MapPoint.js"], f["Maps/MapView.js"], f["Core/Series/Series.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Renderer/SVG/SVGRenderer.js"], f["Core/Utilities.js"]], function (f, e, k, d, a, c, l, u, r, v, n) {
        var b = this && this.__extends ||
            function () {
                var a = function (b, c) {
                    a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                        a.__proto__ = b
                    } || function (a, b) {
                        for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
                    };
                    return a(b, c)
                };
                return function (b, c) {
                    function d() {
                        this.constructor = b
                    }

                    if ("function" !== typeof c && null !== c) throw new TypeError("Class extends value " + String(c) + " is not a constructor or null");
                    a(b, c);
                    b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d)
                }
            }(), g = f.animObject, C = f.stop;
        f = d.noop;
        var D = a.splitPath;
        a = r.seriesTypes;
        var J = a.column, z = a.scatter;
        a = n.extend;
        var E = n.find, O = n.fireEvent, x = n.getNestedProperty, m = n.isArray, q = n.defined, t = n.isNumber,
            I = n.isObject, y = n.merge, F = n.objectEach, G = n.pick, p = n.splat;
        n = function (a) {
            function e() {
                var b = null !== a && a.apply(this, arguments) || this;
                b.chart = void 0;
                b.data = void 0;
                b.group = void 0;
                b.joinBy = void 0;
                b.options = void 0;
                b.points = void 0;
                b.processedData = [];
                return b
            }

            b(e, a);
            e.prototype.animate = function (a) {
                var b = this.chart, c = this.group, d = g(this.options.animation);
                a ? c.attr({
                    translateX: b.plotLeft + b.plotWidth / 2,
                    translateY: b.plotTop + b.plotHeight / 2,
                    scaleX: .001,
                    scaleY: .001
                }) : c.animate({translateX: b.plotLeft, translateY: b.plotTop, scaleX: 1, scaleY: 1}, d)
            };
            e.prototype.clearBounds = function () {
                this.points.forEach(function (a) {
                    delete a.bounds;
                    delete a.insetIndex;
                    delete a.projectedPath
                });
                delete this.bounds
            };
            e.prototype.doFullTranslate = function () {
                return !(!this.isDirtyData && !this.chart.isResizing && this.hasRendered)
            };
            e.prototype.drawMapDataLabels = function () {
                u.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            };
            e.prototype.drawPoints = function () {
                var a = this, b = this, c = this.chart, d = this.group, e = this.transformGroups,
                    f = void 0 === e ? [] : e, m = c.mapView, h = c.renderer;
                m && (this.transformGroups = f, f[0] || (f[0] = h.g().add(d)), m.insets.forEach(function (a, b) {
                    f[b + 1] || f.push(h.g().add(d))
                }), this.doFullTranslate() && (this.points.forEach(function (b) {
                    var d = b.graphic, e = b.shapeArgs;
                    b.group = f["number" === typeof b.insetIndex ? b.insetIndex + 1 : 0];
                    d && d.parentGroup !== b.group &&
                    d.add(b.group);
                    e && c.hasRendered && !c.styledMode && (e.fill = a.pointAttribs(b, b.state).fill)
                }), J.prototype.drawPoints.apply(this), this.points.forEach(function (d) {
                    var e = d.graphic;
                    if (e) {
                        var f = e.animate, g = "";
                        d.name && (g += "highcharts-name-" + d.name.replace(/ /g, "-").toLowerCase());
                        d.properties && d.properties["hc-key"] && (g += " highcharts-key-" + d.properties["hc-key"].toString().toLowerCase());
                        g && e.addClass(g);
                        c.styledMode && e.css(a.pointAttribs(d, d.selected && "select" || void 0));
                        e.animate = function (a, d, g) {
                            var m = t(a["stroke-width"]) &&
                                !t(e["stroke-width"]), h = t(e["stroke-width"]) && !t(a["stroke-width"]);
                            if (m || h) {
                                var k = G(b.getStrokeWidth(b.options), 1) / (c.mapView && c.mapView.getScale() || 1);
                                m && (e["stroke-width"] = k);
                                h && (a["stroke-width"] = k)
                            }
                            return f.call(e, a, d, h ? function () {
                                e.element.removeAttribute("stroke-width");
                                delete e["stroke-width"];
                                g && g.apply(this, arguments)
                            } : g)
                        }
                    }
                })), f.forEach(function (d, e) {
                    var f = (0 === e ? m : m.insets[e - 1]).getSVGTransform(), k = G(a.getStrokeWidth(a.options), 1),
                        l = f.scaleX, q = 0 < f.scaleY ? 1 : -1, t = function (c) {
                            (b.points || []).forEach(function (b) {
                                var d =
                                    b.graphic, e;
                                d && d["stroke-width"] && (e = a.getStrokeWidth(b.options)) && d.attr({"stroke-width": e / c})
                            })
                        };
                    if (h.globalAnimation && c.hasRendered && m.allowTransformAnimation) {
                        var p = Number(d.attr("translateX")), A = Number(d.attr("translateY")),
                            w = Number(d.attr("scaleX")), B = function (a, b) {
                                a = w + (l - w) * b.pos;
                                d.attr({
                                    translateX: p + (f.translateX - p) * b.pos,
                                    translateY: A + (f.translateY - A) * b.pos,
                                    scaleX: a,
                                    scaleY: a * q,
                                    "stroke-width": k / a
                                });
                                t(a)
                            };
                        e = y(g(h.globalAnimation));
                        var P = e.step;
                        e.step = function (a) {
                            P && P.apply(this, arguments);
                            B.apply(this,
                                arguments)
                        };
                        d.attr({animator: 0}).animate({animator: 1}, e, function () {
                            "boolean" !== typeof h.globalAnimation && h.globalAnimation.complete && h.globalAnimation.complete({applyDrilldown: !0})
                        })
                    } else C(d), d.attr(y(f, {"stroke-width": k / l})), t(l)
                }), this.isDrilling || this.drawMapDataLabels())
            };
            e.prototype.getProjectedBounds = function () {
                if (!this.bounds && this.chart.mapView) {
                    var a = this.chart.mapView, b = a.insets, c = a.projection, d = [];
                    (this.points || []).forEach(function (a) {
                        if (a.path || a.geometry) {
                            "string" === typeof a.path ? a.path =
                                D(a.path) : m(a.path) && "M" === a.path[0] && (a.path = v.prototype.pathToSegments(a.path));
                            if (!a.bounds) {
                                var e = a.getProjectedBounds(c);
                                if (e) {
                                    a.labelrank = G(a.labelrank, (e.x2 - e.x1) * (e.y2 - e.y1));
                                    var f = e.midX, g = e.midY;
                                    if (b && t(f) && t(g)) {
                                        var h = E(b, function (a) {
                                            return a.isInside({x: f, y: g})
                                        });
                                        h && (delete a.projectedPath, (e = a.getProjectedBounds(h.projection)) && h.allBounds.push(e), a.insetIndex = b.indexOf(h))
                                    }
                                    a.bounds = e
                                }
                            }
                            a.bounds && void 0 === a.insetIndex && d.push(a.bounds)
                        }
                    });
                    this.bounds = l.compositeBounds(d)
                }
                return this.bounds
            };
            e.prototype.getStrokeWidth = function (a) {
                var b = this.pointAttrToOptions;
                return a[b && b["stroke-width"] || "borderWidth"]
            };
            e.prototype.hasData = function () {
                return !!this.processedXData.length
            };
            e.prototype.pointAttribs = function (a, b) {
                var c, d = a.series.chart, e = d.mapView;
                d = d.styledMode ? this.colorAttribs(a) : J.prototype.pointAttribs.call(this, a, b);
                var f = this.getStrokeWidth(a.options);
                if (b) {
                    b = y(this.options.states[b], a.options.states && a.options.states[b] || {});
                    var g = this.getStrokeWidth(b);
                    q(g) && (f = g);
                    d.stroke = null !==
                    (c = b.borderColor) && void 0 !== c ? c : a.color
                }
                f && e && (f /= e.getScale());
                c = this.getStrokeWidth(this.options);
                d.dashstyle && e && t(c) && (f = c / e.getScale());
                a.visible || (d.fill = this.options.nullColor);
                q(f) ? d["stroke-width"] = f : delete d["stroke-width"];
                d["stroke-linecap"] = d["stroke-linejoin"] = this.options.linecap;
                return d
            };
            e.prototype.updateData = function () {
                return this.processedData ? !1 : a.prototype.updateData.apply(this, arguments)
            };
            e.prototype.setData = function (b, c, d, e) {
                void 0 === c && (c = !0);
                delete this.bounds;
                a.prototype.setData.call(this,
                    b, !1, void 0, e);
                this.processData();
                this.generatePoints();
                c && this.chart.redraw(d)
            };
            e.prototype.processData = function () {
                var a = this.options, b = a.data, e = this.chart.options.chart, f = this.joinBy,
                    g = a.keys || this.pointArrayMap, h = [], k = {}, l = this.chart.mapView;
                l = l && (I(a.mapData, !0) ? l.getGeoMap(a.mapData) : l.geoMap);
                var q = this.chart.mapTransforms;
                (this.chart.mapTransforms = q = e.mapTransforms || l && l["hc-transform"] || q) && F(q, function (a) {
                    a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation))
                });
                if (m(a.mapData)) var p =
                    a.mapData; else l && "FeatureCollection" === l.type && (this.mapTitle = l.title, p = d.geojson(l, this.type, this));
                var n = this.processedData = [];
                b && b.forEach(function (d, e) {
                    var h = 0;
                    if (t(d)) n[e] = {value: d}; else if (m(d)) {
                        n[e] = {};
                        !a.keys && d.length > g.length && "string" === typeof d[0] && (n[e]["hc-key"] = d[0], ++h);
                        for (var k = 0; k < g.length; ++k, ++h) g[k] && "undefined" !== typeof d[h] && (0 < g[k].indexOf(".") ? c.prototype.setNestedProperty(n[e], d[h], g[k]) : n[e][g[k]] = d[h])
                    } else n[e] = b[e];
                    f && "_i" === f[0] && (n[e]._i = e)
                });
                if (p) {
                    this.mapData = p;
                    this.mapMap = {};
                    for (q = 0; q < p.length; q++) e = p[q], l = e.properties, e._i = q, f[0] && l && l[f[0]] && (e[f[0]] = l[f[0]]), k[e[f[0]]] = e;
                    this.mapMap = k;
                    if (f[1]) {
                        var G = f[1];
                        n.forEach(function (a) {
                            a = x(G, a);
                            k[a] && h.push(k[a])
                        })
                    }
                    if (a.allAreas) {
                        if (f[1]) {
                            var r = f[1];
                            n.forEach(function (a) {
                                h.push(x(r, a))
                            })
                        }
                        var u = "|" + h.map(function (a) {
                            return a && a[f[0]]
                        }).join("|") + "|";
                        p.forEach(function (a) {
                            f[0] && -1 !== u.indexOf("|" + a[f[0]] + "|") || n.push(y(a, {value: null}))
                        })
                    }
                }
                this.processedXData = Array(n.length)
            };
            e.prototype.setOptions = function (a) {
                a =
                    u.prototype.setOptions.call(this, a);
                var b = a.joinBy;
                null === b && (b = "_i");
                b = this.joinBy = p(b);
                b[1] || (b[1] = b[0]);
                return a
            };
            e.prototype.translate = function () {
                var a = this.doFullTranslate(), b = this.chart.mapView, d = b && b.projection;
                !this.chart.hasRendered || !this.isDirtyData && this.hasRendered || (this.processData(), this.generatePoints(), delete this.bounds, !b || b.userOptions.center || t(b.userOptions.zoom) || b.zoom !== b.minZoom ? this.getProjectedBounds() : b.fitToBounds(void 0, void 0, !1));
                if (b) {
                    var e = b.getSVGTransform();
                    this.points.forEach(function (f) {
                        var g =
                            t(f.insetIndex) && b.insets[f.insetIndex].getSVGTransform() || e;
                        g && f.bounds && t(f.bounds.midX) && t(f.bounds.midY) && (f.plotX = f.bounds.midX * g.scaleX + g.translateX, f.plotY = f.bounds.midY * g.scaleY + g.translateY);
                        a && (f.shapeType = "path", f.shapeArgs = {d: c.getProjectedPath(f, d)});
                        f.projectedPath && !f.projectedPath.length ? f.setVisible(!1) : f.setVisible(!0)
                    })
                }
                O(this, "afterTranslate")
            };
            e.defaultOptions = y(z.defaultOptions, {
                affectsMapView: !0,
                animation: !1,
                dataLabels: {
                    crop: !1, formatter: function () {
                        var a = this.series.chart.numberFormatter,
                            b = this.point.value;
                        return t(b) ? a(b, -1) : ""
                    }, inside: !0, overflow: !1, padding: 0, verticalAlign: "middle"
                },
                linecap: "round",
                marker: null,
                nullColor: "#f7f7f7",
                stickyTracking: !1,
                tooltip: {followPointer: !0, pointFormat: "{point.name}: {point.value}<br/>"},
                turboThreshold: 0,
                allAreas: !0,
                borderColor: "#e6e6e6",
                borderWidth: 1,
                joinBy: "hc-key",
                states: {
                    hover: {halo: void 0, borderColor: "#666666", borderWidth: 2},
                    normal: {animation: !0},
                    select: {color: "#cccccc"}
                },
                legendSymbol: "rectangle"
            });
            return e
        }(z);
        a(n.prototype, {
            type: "map",
            axisTypes: e.seriesMembers.axisTypes,
            colorAttribs: e.seriesMembers.colorAttribs,
            colorKey: e.seriesMembers.colorKey,
            directTouch: !0,
            drawDataLabels: f,
            drawGraph: f,
            forceDL: !0,
            getCenter: k.getCenter,
            getExtremesFromAll: !0,
            getSymbol: f,
            isCartesian: !1,
            parallelArrays: e.seriesMembers.parallelArrays,
            pointArrayMap: e.seriesMembers.pointArrayMap,
            pointClass: c,
            preserveAspectRatio: !0,
            searchPoint: f,
            trackerGroups: e.seriesMembers.trackerGroups,
            useMapGeometry: !0
        });
        e.compose(n);
        r.registerSeriesType("map", n);
        "";
        return n
    });
    u(f, "Series/FlowMap/FlowMapSeries.js",
        [f["Series/FlowMap/FlowMapPoint.js"], f["Series/Map/MapSeries.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, e, k, d) {
            var a = this && this.__extends || function () {
                    var a = function (b, c) {
                        a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                            a.__proto__ = b
                        } || function (a, b) {
                            for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
                        };
                        return a(b, c)
                    };
                    return function (b, c) {
                        function d() {
                            this.constructor = b
                        }

                        if ("function" !== typeof c && null !== c) throw new TypeError("Class extends value " +
                            String(c) + " is not a constructor or null");
                        a(b, c);
                        b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d)
                    }
                }(), c = this && this.__spreadArray || function (a, b, c) {
                    if (c || 2 === arguments.length) for (var d = 0, e = b.length, f; d < e; d++) !f && d in b || (f || (f = Array.prototype.slice.call(b, 0, d)), f[d] = b[d]);
                    return a.concat(f || Array.prototype.slice.call(b))
                }, g = k.series.prototype.pointClass, u = k.seriesTypes, r = u.column, v = u.mapline, n = d.addEvent,
                b = d.arrayMax, h = d.arrayMin, C = d.defined;
            u = d.extend;
            var D = d.isArray, J = d.merge,
                z = d.pick, E = d.relativeLength;
            d = function (d) {
                function f() {
                    var a = null !== d && d.apply(this, arguments) || this;
                    a.data = void 0;
                    a.options = void 0;
                    a.points = void 0;
                    a.smallestWeight = void 0;
                    a.greatestWeight = void 0;
                    a.centerOfPoints = void 0;
                    return a
                }

                a(f, d);
                f.getLength = function (a, b) {
                    return Math.sqrt(a * a + b * b)
                };
                f.normalize = function (a, b) {
                    var c = this.getLength(a, b);
                    return [a / c, b / c]
                };
                f.markerEndPath = function (a, b, c, d) {
                    var e = E(d.width || 0, this.getLength(b[0] - a[0], b[1] - a[1])), f = d.markerType || "arrow",
                        g = this.normalize(b[0] - a[0], b[1] -
                            a[1]);
                    d = g[0];
                    g = g[1];
                    var h = [];
                    if ("arrow" === f) {
                        var k = a[0], m = a[1];
                        h.push(["L", k - d * e, m - g * e]);
                        h.push(["L", c[0], c[1]]);
                        k = b[0];
                        m = b[1];
                        h.push(["L", k + d * e, m + g * e])
                    }
                    if ("mushroom" === f) {
                        f = a[0];
                        a = a[1];
                        k = b[0];
                        b = b[1];
                        var l = (k - f) / 2 + f;
                        m = (b - a) / 2 + a;
                        l = 2 * (c[0] - l) + l;
                        c = 2 * (c[1] - m) + m;
                        h.push(["L", f - d * e, a - g * e]);
                        h.push(["Q", l, c, k + d * e, b + g * e])
                    }
                    return h
                };
                f.prototype.animate = function (a) {
                    var b = this.points;
                    a || b.forEach(function (a) {
                        if (a.shapeArgs && D(a.shapeArgs.d) && a.shapeArgs.d.length) {
                            var b = a.shapeArgs.d, d = b[0][1], e = b[0][2];
                            if (d &&
                                e) {
                                for (var f = [], g = 0; g < b.length; g++) {
                                    f.push(c([], b[g], !0));
                                    for (var h = 1; h < b[g].length; h++) f[g][h] = h % 2 ? d : e
                                }
                                a.graphic && (a.graphic.attr({d: f}), a.graphic.animate({d: b}))
                            }
                        }
                    })
                };
                f.prototype.getLinkWidth = function (a) {
                    var b = this.options.width, c = a.options.weight || this.options.weight;
                    a.options.weight = c;
                    if (b && !c) return b;
                    a = this.smallestWeight;
                    b = this.greatestWeight;
                    if (!C(c) || !a || !b) return 0;
                    var d = this.options.minWidth;
                    return (c - a) * (this.options.maxWidth - d) / (b - a || 1) + d
                };
                f.prototype.autoCurve = function (a, b, c, d, e, f) {
                    var g =
                        c - a, h = d - b;
                    a = (c - a) / 2 + a - e;
                    b = (d - b) / 2 + b - f;
                    g = Math.atan2(g * b - h * a, g * a + h * b);
                    g = 180 * g / Math.PI;
                    0 > g && (g = 360 + g);
                    g = g * Math.PI / 180;
                    return .7 * -Math.sin(g)
                };
                f.prototype.pointAttribs = function (a, b) {
                    b = e.prototype.pointAttribs.call(this, a, b);
                    b.fill = z(a.options.fillColor, a.options.color, "none" === this.options.fillColor ? null : this.options.fillColor, this.color);
                    b["fill-opacity"] = z(a.options.fillOpacity, this.options.fillOpacity);
                    b["stroke-width"] = z(a.options.lineWidth, this.options.lineWidth, 1);
                    a.options.opacity && (b.opacity = a.options.opacity);
                    return b
                };
                f.prototype.translate = function () {
                    var a = this;
                    !this.chart.hasRendered || !this.isDirtyData && this.hasRendered || (this.processData(), this.generatePoints());
                    var c = [], d = 0, e = 0;
                    this.points.forEach(function (b) {
                        var f = a.chart, h = f.mapView, k = b.options, l = function () {
                            b.series.isDirty = !0
                        }, m = function (a) {
                            a = f.get(a);
                            if (a instanceof g && a.plotX && a.plotY) return n(a, "update", l), {x: a.plotX, y: a.plotY}
                        }, t = function (a) {
                            return D(a) ? {lon: a[0], lat: a[1]} : a
                        }, q, y;
                        "string" === typeof k.from ? q = m(k.from) : "object" === typeof k.from &&
                            h && (q = h.lonLatToPixels(t(k.from)));
                        "string" === typeof k.to ? y = m(k.to) : "object" === typeof k.to && h && (y = h.lonLatToPixels(t(k.to)));
                        b.fromPos = q;
                        b.toPos = y;
                        q && y && (d += (q.x + y.x) / 2, e += (q.y + y.y) / 2);
                        z(b.options.weight, a.options.weight) && c.push(z(b.options.weight, a.options.weight))
                    });
                    this.smallestWeight = h(c);
                    this.greatestWeight = b(c);
                    this.centerOfPoints = {x: d / this.points.length, y: e / this.points.length};
                    this.points.forEach(function (b) {
                        a.getLinkWidth(b) ? (b.fromPos && (b.plotX = b.fromPos.x, b.plotY = b.fromPos.y), b.shapeType =
                            "path", b.shapeArgs = a.getPointShapeArgs(b), b.color = z(b.options.color, b.series.color)) : b.shapeArgs = {d: []}
                    })
                };
                f.prototype.getPointShapeArgs = function (a) {
                    var b, d = a.fromPos, e = a.toPos;
                    if (!d || !e) return {};
                    var g = this.getLinkWidth(a) / 2, h = a.options, k = J(this.options.markerEnd, h.markerEnd),
                        l = z(h.growTowards, this.options.growTowards), m = d.x || 0, n = d.y || 0;
                    d = e.x || 0;
                    var r = e.y || 0;
                    h = z(h.curveFactor, this.options.curveFactor);
                    var u = k && k.enabled && k.height || 0;
                    C(h) || (h = this.autoCurve(m, n, d, r, this.centerOfPoints.x, this.centerOfPoints.y));
                    if (u) {
                        u = E(u, 4 * g);
                        var v = .5 * (d - m);
                        var x = .5 * (r - n);
                        var w = m + v;
                        x = f.normalize(w + x * h - d, n + x + -v * h - r);
                        w = x[1];
                        d += x[0] * u;
                        r += w * u
                    }
                    v = .5 * (d - m);
                    var H = .5 * (r - n);
                    var M = m + v, K = n + H;
                    w = v;
                    v = H;
                    H = -w;
                    x = f.normalize(v, H);
                    u = x[0];
                    x = x[1];
                    w = 1 + .25 * Math.sqrt(h * h);
                    u *= g * w;
                    x *= g * w;
                    v = M + v * h;
                    h = K + H * h;
                    w = f.normalize(v - m, h - n);
                    H = w[0];
                    M = w[1];
                    w = H;
                    H = M * g;
                    M = -w * g;
                    w = f.normalize(v - d, h - r);
                    K = w[0];
                    var D = w[1];
                    w = K;
                    K = -D * g;
                    D = w * g;
                    l && (H /= g, M /= g, u /= 4, x /= 4);
                    g = {d: [["M", m - H, n - M], ["Q", v - u, h - x, d - K, r - D], ["L", d + K, r + D], ["Q", v + u, h + x, m + H, n + M], ["Z"]]};
                    k && k.enabled && g.d && (e =
                        f.markerEndPath([d - K, r - D], [d + K, r + D], [e.x, e.y], k), (b = g.d).splice.apply(b, c([2, 0], e, !1)));
                    k = a.options.from;
                    e = a.options.to;
                    b = k.lat;
                    k = k.lon;
                    l = e.lat;
                    e = e.lon;
                    b && k && (a.options.from = "".concat(+b, ", ").concat(+k));
                    l && e && (a.options.to = "".concat(+l, ", ").concat(+e));
                    return g
                };
                f.defaultOptions = J(v.defaultOptions, {
                    animation: !0,
                    dataLabels: {enabled: !1},
                    fillOpacity: .5,
                    markerEnd: {enabled: !0, height: "40%", width: "40%", markerType: "arrow"},
                    width: 1,
                    maxWidth: 25,
                    minWidth: 5,
                    lineWidth: void 0,
                    tooltip: {
                        headerFormat: '<span style="font-size: 0.8em">{series.name}</span><br/>',
                        pointFormat: "{point.options.from} \u2192 {point.options.to}: <b>{point.options.weight}</b>"
                    }
                });
                return f
            }(v);
            u(d.prototype, {
                pointClass: f,
                pointArrayMap: ["from", "to", "weight"],
                drawPoints: r.prototype.drawPoints,
                useMapGeometry: !0
            });
            k.registerSeriesType("flowmap", d);
            "";
            return d
        });
    u(f, "masters/modules/flowmap.src.js", [], function () {
    })
});
//# sourceMappingURL=flowmap.js.map