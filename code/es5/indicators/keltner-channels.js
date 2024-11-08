/*
 Highstock JS v11.1.0 (2023-06-05)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Daniel Studencki

 License: www.highcharts.com/license
*/
'use strict';
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (a) {
    var b = 0;
    return function () {
        return b < a.length ? {done: !1, value: a[b++]} : {done: !0}
    }
};
$jscomp.arrayIterator = function (a) {
    return {next: $jscomp.arrayIteratorImpl(a)}
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};
$jscomp.getGlobal = function (a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {
    };
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.SymbolClass = function (a, b) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {configurable: !0, writable: !0, value: b})
};
$jscomp.SymbolClass.prototype.toString = function () {
    return this.$jscomp$symbol$id_
};
$jscomp.Symbol = function () {
    function a(c) {
        if (this instanceof a) throw new TypeError("Symbol is not a constructor");
        return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (c || "") + "_" + b++, c)
    }

    var b = 0;
    return a
}();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        }
    });
    $jscomp.initSymbolIterator = function () {
    }
};
$jscomp.initSymbolAsyncIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.asyncIterator;
    a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function () {
    }
};
$jscomp.iteratorPrototype = function (a) {
    $jscomp.initSymbolIterator();
    a = {next: a};
    a[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return a
};
$jscomp.iteratorFromArray = function (a, b) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var c = 0, e = {
        next: function () {
            if (c < a.length) {
                var d = c++;
                return {value: b(d, a[d]), done: !1}
            }
            e.next = function () {
                return {done: !0, value: void 0}
            };
            return e.next()
        }
    };
    e[Symbol.iterator] = function () {
        return e
    };
    return e
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function (a, b) {
    var c = $jscomp.propertyToPolyfillSymbol[b];
    if (null == c) return a[b];
    c = a[c];
    return void 0 !== c ? c : a[b]
};
$jscomp.polyfill = function (a, b, c, e) {
    b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, e) : $jscomp.polyfillUnisolated(a, b, c, e))
};
$jscomp.polyfillUnisolated = function (a, b, c, e) {
    c = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
        var d = a[e];
        d in c || (c[d] = {});
        c = c[d]
    }
    a = a[a.length - 1];
    e = c[a];
    b = b(e);
    b != e && null != b && $jscomp.defineProperty(c, a, {configurable: !0, writable: !0, value: b})
};
$jscomp.polyfillIsolated = function (a, b, c, e) {
    var d = a.split(".");
    a = 1 === d.length;
    e = d[0];
    e = !a && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var k = 0; k < d.length - 1; k++) {
        var f = d[k];
        f in e || (e[f] = {});
        e = e[f]
    }
    d = d[d.length - 1];
    c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? e[d] : null;
    b = b(c);
    null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, d, {
        configurable: !0,
        writable: !0,
        value: b
    }) : b !== c && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d, d = $jscomp.propertyToPolyfillSymbol[d],
        $jscomp.defineProperty(e, d, {configurable: !0, writable: !0, value: b})))
};
$jscomp.polyfill("Array.prototype.values", function (a) {
    return a ? a : function () {
        return $jscomp.iteratorFromArray(this, function (a, c) {
            return c
        })
    }
}, "es8", "es3");
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/indicators/keltner-channels", ["highcharts", "highcharts/modules/stock"], function (b) {
        a(b);
        a.Highcharts = b;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function b(a, b, d, k) {
        a.hasOwnProperty(b) || (a[b] = k.apply(null, d), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: b,
                module: a[b]
            }
        })))
    }

    a = a ? a._modules : {};
    b(a, "Stock/Indicators/MultipleLinesComposition.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, b) {
        var d = a.seriesTypes.sma.prototype, c = b.defined, e = b.error, r = b.merge, g;
        (function (a) {
            function q(a) {
                return "plot" + a.charAt(0).toUpperCase() + a.slice(1)
            }

            function y(a, b) {
                var x = [];
                (a.pointArrayMap || []).forEach(function (a) {
                    a !== b && x.push(q(a))
                });
                return x
            }

            function l() {
                var a = this, b = a.linesApiNames, h = a.areaLinesNames, l = a.points, n = a.options, w = a.graph,
                    k = {options: {gapSize: n.gapSize}},
                    f = [], p = y(a, a.pointValKey), g = l.length, m;
                p.forEach(function (a, b) {
                    for (f[b] = []; g--;) m = l[g], f[b].push({x: m.x, plotX: m.plotX, plotY: m[a], isNull: !c(m[a])});
                    g = l.length
                });
                if (a.userOptions.fillColor && h.length) {
                    var v = p.indexOf(q(h[0]));
                    v = f[v];
                    h = 1 === h.length ? l : f[p.indexOf(q(h[1]))];
                    p = a.color;
                    a.points = h;
                    a.nextPoints = v;
                    a.color = a.userOptions.fillColor;
                    a.options = r(l, k);
                    a.graph = a.area;
                    a.fillGraph = !0;
                    d.drawGraph.call(a);
                    a.area = a.graph;
                    delete a.nextPoints;
                    delete a.fillGraph;
                    a.color = p
                }
                b.forEach(function (b, c) {
                    f[c] ? (a.points =
                        f[c], n[b] ? a.options = r(n[b].styles, k) : e('Error: "There is no ' + b + ' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names."'), a.graph = a["graph" + b], d.drawGraph.call(a), a["graph" + b] = a.graph) : e('Error: "' + b + " doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")
                });
                a.points = l;
                a.options = n;
                a.graph = w;
                d.drawGraph.call(a)
            }

            function n(a) {
                var b, c = [];
                a = a || this.points;
                if (this.fillGraph && this.nextPoints) {
                    if ((b = d.getGraphPath.call(this,
                        this.nextPoints)) && b.length) {
                        b[0][0] = "L";
                        c = d.getGraphPath.call(this, a);
                        b = b.slice(0, c.length);
                        for (var e = b.length - 1; 0 <= e; e--) c.push(b[e])
                    }
                } else c = d.getGraphPath.apply(this, arguments);
                return c
            }

            function w(a) {
                var b = [];
                (this.pointArrayMap || []).forEach(function (c) {
                    b.push(a[c])
                });
                return b
            }

            function p() {
                var a = this, b = this.pointArrayMap, c = [], e;
                c = y(this);
                d.translate.apply(this, arguments);
                this.points.forEach(function (d) {
                    b.forEach(function (b, l) {
                        e = d[b];
                        a.dataModify && (e = a.dataModify.modifyValue(e));
                        null !== e && (d[c[l]] =
                            a.yAxis.toPixels(e, !0))
                    })
                })
            }

            var k = [], m = ["bottomLine"], f = ["top", "bottom"], g = ["top"];
            a.compose = function (a) {
                if (b.pushUnique(k, a)) {
                    var c = a.prototype;
                    c.linesApiNames = c.linesApiNames || m.slice();
                    c.pointArrayMap = c.pointArrayMap || f.slice();
                    c.pointValKey = c.pointValKey || "top";
                    c.areaLinesNames = c.areaLinesNames || g.slice();
                    c.drawGraph = l;
                    c.getGraphPath = n;
                    c.toYData = w;
                    c.translate = p
                }
                return a
            }
        })(g || (g = {}));
        return g
    });
    b(a, "Stock/Indicators/KeltnerChannels/KeltnerChannelsIndicator.js", [a["Stock/Indicators/MultipleLinesComposition.js"],
        a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, b, d) {
        var c = this && this.__extends || function () {
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
        }(), e = b.seriesTypes.sma, r = d.correctFloat, g = d.extend, t = d.merge;
        d = function (a) {
            function d() {
                var b = null !== a && a.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }

            c(d, a);
            d.prototype.init = function () {
                b.seriesTypes.sma.prototype.init.apply(this, arguments);
                this.options = t({
                    topLine: {styles: {lineColor: this.color}},
                    bottomLine: {styles: {lineColor: this.color}}
                }, this.options)
            };
            d.prototype.getValues = function (a, c) {
                var d =
                    c.period, e = c.periodATR, f = c.multiplierATR, m = a.yData;
                m = m ? m.length : 0;
                var g = [];
                c = b.seriesTypes.ema.prototype.getValues(a, {period: d, index: c.index});
                a = b.seriesTypes.atr.prototype.getValues(a, {period: e});
                var k = [], l = [], n;
                if (!(m < d)) {
                    for (n = d; n <= m; n++) {
                        var h = c.values[n - d];
                        var u = a.values[n - e];
                        var q = h[0];
                        var t = r(h[1] + f * u[1]);
                        u = r(h[1] - f * u[1]);
                        h = h[1];
                        g.push([q, t, h, u]);
                        k.push(q);
                        l.push([t, h, u])
                    }
                    return {values: g, xData: k, yData: l}
                }
            };
            d.defaultOptions = t(e.defaultOptions, {
                params: {index: 0, period: 20, periodATR: 10, multiplierATR: 2},
                bottomLine: {styles: {lineWidth: 1, lineColor: void 0}},
                topLine: {styles: {lineWidth: 1, lineColor: void 0}},
                tooltip: {pointFormat: '<span style="color:{point.color}">\u25cf</span><b> {series.name}</b><br/>Upper Channel: {point.top}<br/>EMA({series.options.params.period}): {point.middle}<br/>Lower Channel: {point.bottom}<br/>'},
                marker: {enabled: !1},
                dataGrouping: {approximation: "averages"},
                lineWidth: 1
            });
            return d
        }(e);
        g(d.prototype, {
            nameBase: "Keltner Channels",
            areaLinesNames: ["top", "bottom"],
            nameComponents: ["period",
                "periodATR", "multiplierATR"],
            linesApiNames: ["topLine", "bottomLine"],
            pointArrayMap: ["top", "middle", "bottom"],
            pointValKey: "middle"
        });
        a.compose(d);
        b.registerSeriesType("keltnerchannels", d);
        "";
        return d
    });
    b(a, "masters/indicators/keltner-channels.src.js", [], function () {
    })
});
//# sourceMappingURL=keltner-channels.js.map