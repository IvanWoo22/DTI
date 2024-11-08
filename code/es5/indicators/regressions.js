/*
 Highstock JS v11.1.0 (2023-06-05)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Kamil Kulig

 License: www.highcharts.com/license
*/
'use strict';
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (a) {
    var c = 0;
    return function () {
        return c < a.length ? {done: !1, value: a[c++]} : {done: !0}
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, e) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[c] = e.value;
    return a
};
$jscomp.getGlobal = function (a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var c = 0; c < a.length; ++c) {
        var e = a[c];
        if (e && e.Math == Math) return e
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
$jscomp.SymbolClass = function (a, c) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {configurable: !0, writable: !0, value: c})
};
$jscomp.SymbolClass.prototype.toString = function () {
    return this.$jscomp$symbol$id_
};
$jscomp.Symbol = function () {
    function a(e) {
        if (this instanceof a) throw new TypeError("Symbol is not a constructor");
        return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (e || "") + "_" + c++, e)
    }

    var c = 0;
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
$jscomp.iteratorFromArray = function (a, c) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var e = 0, b = {
        next: function () {
            if (e < a.length) {
                var f = e++;
                return {value: c(f, a[f]), done: !1}
            }
            b.next = function () {
                return {done: !0, value: void 0}
            };
            return b.next()
        }
    };
    b[Symbol.iterator] = function () {
        return b
    };
    return b
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function (a, c) {
    var e = $jscomp.propertyToPolyfillSymbol[c];
    if (null == e) return a[c];
    e = a[e];
    return void 0 !== e ? e : a[c]
};
$jscomp.polyfill = function (a, c, e, b) {
    c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, e, b) : $jscomp.polyfillUnisolated(a, c, e, b))
};
$jscomp.polyfillUnisolated = function (a, c, e, b) {
    e = $jscomp.global;
    a = a.split(".");
    for (b = 0; b < a.length - 1; b++) {
        var f = a[b];
        f in e || (e[f] = {});
        e = e[f]
    }
    a = a[a.length - 1];
    b = e[a];
    c = c(b);
    c != b && null != c && $jscomp.defineProperty(e, a, {configurable: !0, writable: !0, value: c})
};
$jscomp.polyfillIsolated = function (a, c, e, b) {
    var f = a.split(".");
    a = 1 === f.length;
    b = f[0];
    b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var l = 0; l < f.length - 1; l++) {
        var h = f[l];
        h in b || (b[h] = {});
        b = b[h]
    }
    f = f[f.length - 1];
    e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? b[f] : null;
    c = c(e);
    null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, f, {
        configurable: !0,
        writable: !0,
        value: c
    }) : c !== e && ($jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + f, f = $jscomp.propertyToPolyfillSymbol[f],
        $jscomp.defineProperty(b, f, {configurable: !0, writable: !0, value: c})))
};
$jscomp.polyfill("Array.prototype.values", function (a) {
    return a ? a : function () {
        return $jscomp.iteratorFromArray(this, function (a, e) {
            return e
        })
    }
}, "es8", "es3");
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/indicators/regressions", ["highcharts", "highcharts/modules/stock"], function (c) {
        a(c);
        a.Highcharts = c;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function c(a, b, c, l) {
        a.hasOwnProperty(b) || (a[b] = l.apply(null, c), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: b,
                module: a[b]
            }
        })))
    }

    a = a ? a._modules : {};
    c(a, "Stock/Indicators/LinearRegression/LinearRegressionIndicator.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, b) {
        var c = this && this.__extends || function () {
            var a = function (d, b) {
                a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, d) {
                    a.__proto__ = d
                } || function (a, d) {
                    for (var b in d) Object.prototype.hasOwnProperty.call(d, b) && (a[b] = d[b])
                };
                return a(d, b)
            };
            return function (d, b) {
                function c() {
                    this.constructor = d
                }

                if ("function" !== typeof b && null !== b) throw new TypeError("Class extends value " +
                    String(b) + " is not a constructor or null");
                a(d, b);
                d.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
            }
        }(), e = a.seriesTypes.sma, h = b.isArray, n = b.extend, k = b.merge;
        b = function (a) {
            function b() {
                var b = null !== a && a.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }

            c(b, a);
            b.prototype.getRegressionLineParameters = function (a, b) {
                var d = this.options.params.index, c = function (a, b) {
                    return h(a) ? a[b] : a
                }, e = a.reduce(function (a, b) {
                    return b + a
                }, 0), p = b.reduce(function (a, b) {
                    return c(b,
                        d) + a
                }, 0);
                e /= a.length;
                p /= b.length;
                var g, m = 0, f = 0;
                for (g = 0; g < a.length; g++) {
                    var k = a[g] - e;
                    var l = c(b[g], d) - p;
                    m += k * l;
                    f += Math.pow(k, 2)
                }
                a = f ? m / f : 0;
                return {slope: a, intercept: p - a * e}
            };
            b.prototype.getEndPointY = function (a, b) {
                return a.slope * b + a.intercept
            };
            b.prototype.transformXData = function (a, b) {
                var d = a[0];
                return a.map(function (a) {
                    return (a - d) / b
                })
            };
            b.prototype.findClosestDistance = function (a) {
                var b, d;
                for (d = 1; d < a.length - 1; d++) {
                    var c = a[d] - a[d - 1];
                    0 < c && ("undefined" === typeof b || c < b) && (b = c)
                }
                return b
            };
            b.prototype.getValues =
                function (a, b) {
                    var d = a.xData;
                    a = a.yData;
                    b = b.period;
                    var c = {xData: [], yData: [], values: []},
                        e = this.options.params.xAxisUnit || this.findClosestDistance(d), g;
                    for (g = b - 1; g <= d.length - 1; g++) {
                        var f = g - b + 1;
                        var k = g + 1;
                        var p = d[g];
                        var m = d.slice(f, k);
                        f = a.slice(f, k);
                        k = this.transformXData(m, e);
                        m = this.getRegressionLineParameters(k, f);
                        f = this.getEndPointY(m, k[k.length - 1]);
                        c.values.push({regressionLineParameters: m, x: p, y: f});
                        c.xData.push(p);
                        c.yData.push(f)
                    }
                    return c
                };
            b.defaultOptions = k(e.defaultOptions, {
                params: {xAxisUnit: null},
                tooltip: {valueDecimals: 4}
            });
            return b
        }(e);
        n(b.prototype, {nameBase: "Linear Regression Indicator"});
        a.registerSeriesType("linearRegression", b);
        "";
        return b
    });
    c(a, "Stock/Indicators/LinearRegressionSlopes/LinearRegressionSlopesIndicator.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, b) {
        var c = this && this.__extends || function () {
            var a = function (b, d) {
                a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                    a.__proto__ = b
                } || function (a, b) {
                    for (var d in b) Object.prototype.hasOwnProperty.call(b,
                        d) && (a[d] = b[d])
                };
                return a(b, d)
            };
            return function (b, d) {
                function c() {
                    this.constructor = b
                }

                if ("function" !== typeof d && null !== d) throw new TypeError("Class extends value " + String(d) + " is not a constructor or null");
                a(b, d);
                b.prototype = null === d ? Object.create(d) : (c.prototype = d.prototype, new c)
            }
        }(), e = a.seriesTypes.linearRegression, h = b.extend, n = b.merge;
        b = function (a) {
            function b() {
                var b = null !== a && a.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }

            c(b, a);
            b.prototype.getEndPointY =
                function (a) {
                    return a.slope
                };
            b.defaultOptions = n(e.defaultOptions);
            return b
        }(e);
        h(b.prototype, {nameBase: "Linear Regression Slope Indicator"});
        a.registerSeriesType("linearRegressionSlope", b);
        "";
        return b
    });
    c(a, "Stock/Indicators/LinearRegressionIntercept/LinearRegressionInterceptIndicator.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, b) {
        var c = this && this.__extends || function () {
            var a = function (b, d) {
                a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                    a.__proto__ =
                        b
                } || function (a, b) {
                    for (var d in b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d])
                };
                return a(b, d)
            };
            return function (b, d) {
                function c() {
                    this.constructor = b
                }

                if ("function" !== typeof d && null !== d) throw new TypeError("Class extends value " + String(d) + " is not a constructor or null");
                a(b, d);
                b.prototype = null === d ? Object.create(d) : (c.prototype = d.prototype, new c)
            }
        }(), e = a.seriesTypes.linearRegression, h = b.extend, n = b.merge;
        b = function (a) {
            function b() {
                var b = null !== a && a.apply(this, arguments) || this;
                b.data = void 0;
                b.options =
                    void 0;
                b.points = void 0;
                return b
            }

            c(b, a);
            b.prototype.getEndPointY = function (a) {
                return a.intercept
            };
            b.defaultOptions = n(e.defaultOptions);
            return b
        }(e);
        h(b.prototype, {nameBase: "Linear Regression Intercept Indicator"});
        a.registerSeriesType("linearRegressionIntercept", b);
        "";
        return b
    });
    c(a, "Stock/Indicators/LinearRegressionAngle/LinearRegressionAngleIndicator.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, b) {
        var c = this && this.__extends || function () {
            var a = function (b, c) {
                a = Object.setPrototypeOf ||
                    {__proto__: []} instanceof Array && function (a, b) {
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
        }(), e = a.seriesTypes.linearRegression, h = b.extend, n = b.merge;
        b = function (a) {
            function b() {
                var b =
                    null !== a && a.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }

            c(b, a);
            b.prototype.slopeToAngle = function (a) {
                return 180 / Math.PI * Math.atan(a)
            };
            b.prototype.getEndPointY = function (a) {
                return this.slopeToAngle(a.slope)
            };
            b.defaultOptions = n(e.defaultOptions, {tooltip: {pointFormat: '<span style="color:{point.color}">\u25cf</span>{series.name}: <b>{point.y}\u00b0</b><br/>'}});
            return b
        }(e);
        h(b.prototype, {nameBase: "Linear Regression Angle Indicator"});
        a.registerSeriesType("linearRegressionAngle",
            b);
        "";
        return b
    });
    c(a, "masters/indicators/regressions.src.js", [], function () {
    })
});
//# sourceMappingURL=regressions.js.map