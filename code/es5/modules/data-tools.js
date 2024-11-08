/*
 Highcharts JS v11.1.0 (2023-06-05)

 Highcharts

 (c) 2010-2023 Highsoft AS

 License: www.highcharts.com/license
*/
'use strict';
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (e) {
    var n = 0;
    return function () {
        return n < e.length ? {done: !1, value: e[n++]} : {done: !0}
    }
};
$jscomp.arrayIterator = function (e) {
    return {next: $jscomp.arrayIteratorImpl(e)}
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, n, h) {
    if (e == Array.prototype || e == Object.prototype) return e;
    e[n] = h.value;
    return e
};
$jscomp.getGlobal = function (e) {
    e = ["object" == typeof globalThis && globalThis, e, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var n = 0; n < e.length; ++n) {
        var h = e[n];
        if (h && h.Math == Math) return h
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
$jscomp.SymbolClass = function (e, n) {
    this.$jscomp$symbol$id_ = e;
    $jscomp.defineProperty(this, "description", {configurable: !0, writable: !0, value: n})
};
$jscomp.SymbolClass.prototype.toString = function () {
    return this.$jscomp$symbol$id_
};
$jscomp.Symbol = function () {
    function e(h) {
        if (this instanceof e) throw new TypeError("Symbol is not a constructor");
        return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (h || "") + "_" + n++, h)
    }

    var n = 0;
    return e
}();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var e = $jscomp.global.Symbol.iterator;
    e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {
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
    var e = $jscomp.global.Symbol.asyncIterator;
    e || (e = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function () {
    }
};
$jscomp.iteratorPrototype = function (e) {
    $jscomp.initSymbolIterator();
    e = {next: e};
    e[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return e
};
$jscomp.iteratorFromArray = function (e, n) {
    $jscomp.initSymbolIterator();
    e instanceof String && (e += "");
    var h = 0, c = {
        next: function () {
            if (h < e.length) {
                var m = h++;
                return {value: n(m, e[m]), done: !1}
            }
            c.next = function () {
                return {done: !0, value: void 0}
            };
            return c.next()
        }
    };
    c[Symbol.iterator] = function () {
        return c
    };
    return c
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function (e, n) {
    var h = $jscomp.propertyToPolyfillSymbol[n];
    if (null == h) return e[n];
    h = e[h];
    return void 0 !== h ? h : e[n]
};
$jscomp.polyfill = function (e, n, h, c) {
    n && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(e, n, h, c) : $jscomp.polyfillUnisolated(e, n, h, c))
};
$jscomp.polyfillUnisolated = function (e, n, h, c) {
    h = $jscomp.global;
    e = e.split(".");
    for (c = 0; c < e.length - 1; c++) {
        var m = e[c];
        m in h || (h[m] = {});
        h = h[m]
    }
    e = e[e.length - 1];
    c = h[e];
    n = n(c);
    n != c && null != n && $jscomp.defineProperty(h, e, {configurable: !0, writable: !0, value: n})
};
$jscomp.polyfillIsolated = function (e, n, h, c) {
    var m = e.split(".");
    e = 1 === m.length;
    c = m[0];
    c = !e && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var k = 0; k < m.length - 1; k++) {
        var g = m[k];
        g in c || (c[g] = {});
        c = c[g]
    }
    m = m[m.length - 1];
    h = $jscomp.IS_SYMBOL_NATIVE && "es6" === h ? c[m] : null;
    n = n(h);
    null != n && (e ? $jscomp.defineProperty($jscomp.polyfills, m, {
        configurable: !0,
        writable: !0,
        value: n
    }) : n !== h && ($jscomp.propertyToPolyfillSymbol[m] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(m) : $jscomp.POLYFILL_PREFIX + m, m = $jscomp.propertyToPolyfillSymbol[m],
        $jscomp.defineProperty(c, m, {configurable: !0, writable: !0, value: n})))
};
$jscomp.polyfill("Array.prototype.values", function (e) {
    return e ? e : function () {
        return $jscomp.iteratorFromArray(this, function (e, h) {
            return h
        })
    }
}, "es8", "es3");
(function (e) {
    "object" === typeof module && module.exports ? (e["default"] = e, module.exports = e) : "function" === typeof define && define.amd ? define("highcharts/modules/data-tools", ["highcharts"], function (n) {
        e(n);
        e.Highcharts = n;
        return e
    }) : e("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (e) {
    function n(e, c, m, k) {
        e.hasOwnProperty(c) || (e[c] = k.apply(null, m), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: c,
                module: e[c]
            }
        })))
    }

    e = e ? e._modules : {};
    n(e,
        "Data/DataTable.js", [e["Core/Utilities.js"]], function (e) {
            var c = e.addEvent, m = e.fireEvent, k = e.uniqueKey;
            e = function () {
                function g(d) {
                    void 0 === d && (d = {});
                    this.aliases = {};
                    this.autoId = !d.id;
                    this.columns = {};
                    this.id = d.id || k();
                    this.modified = this;
                    this.rowCount = 0;
                    this.versionTag = k();
                    for (var b = d.columns || {}, a = Object.keys(b), f = this.columns, l = 0, p = 0, g = a.length, c, e; p < g; ++p) e = a[p], c = b[e].slice(), f[e] = c, l = Math.max(l, c.length);
                    p = 0;
                    for (g = a.length; p < g; ++p) f[a[p]].length = l;
                    this.rowCount = l;
                    d = d.aliases || {};
                    b = Object.keys(d);
                    a = this.aliases;
                    p = 0;
                    for (g = b.length; p < g; ++p) f = b[p], a[f] = d[f]
                }

                g.isNull = function (d) {
                    if (d === g.NULL) return !0;
                    if (d instanceof Array) {
                        if (!d.length) return !1;
                        for (var b = 0, a = d.length; b < a; ++b) if (null !== d[b]) return !1
                    } else {
                        var f = Object.keys(d);
                        if (!f.length) return !1;
                        b = 0;
                        for (a = f.length; b < a; ++b) if (null !== d[f[b]]) return !1
                    }
                    return !0
                };
                g.prototype.clone = function (d, b) {
                    var a = {};
                    this.emit({type: "cloneTable", detail: b});
                    d || (a.aliases = this.aliases, a.columns = this.columns);
                    this.autoId || (a.id = this.id);
                    a = new g(a);
                    d || (a.versionTag =
                        this.versionTag);
                    this.emit({type: "afterCloneTable", detail: b, tableClone: a});
                    return a
                };
                g.prototype.deleteColumnAlias = function (d) {
                    var b, a = this.aliases[d], f = this.modifier;
                    a && (delete this.aliases[d], f && f.modifyColumns(this, (b = {}, b[a] = Array(this.rowCount), b), 0));
                    return a
                };
                g.prototype.deleteColumns = function (d, b) {
                    var a = this.columns, f = {}, l = {}, p = this.modifier, g = this.rowCount;
                    d = d || Object.keys(a);
                    if (d.length) {
                        this.emit({type: "deleteColumns", columnNames: d, detail: b});
                        for (var k = 0, c = d.length, e, m; k < c; ++k) {
                            m = d[k];
                            if (e = a[m]) f[m] = e, l[m] = Array(g);
                            delete a[m]
                        }
                        Object.keys(a).length || (this.rowCount = 0);
                        p && p.modifyColumns(this, l, 0, b);
                        this.emit({type: "afterDeleteColumns", columns: f, columnNames: d, detail: b});
                        return f
                    }
                };
                g.prototype.deleteRows = function (d, b, a) {
                    void 0 === b && (b = 1);
                    var f = [], l = [], p = this.modifier;
                    this.emit({type: "deleteRows", detail: a, rowCount: b, rowIndex: d || 0});
                    "undefined" === typeof d && (d = 0, b = this.rowCount);
                    if (0 < b && d < this.rowCount) for (var g = this.columns, k = Object.keys(g), c = 0, e = k.length, m, h; c < e; ++c) {
                        m = g[k[c]];
                        h = m.splice(d,
                            b);
                        c || (this.rowCount = m.length);
                        m = 0;
                        for (var t = h.length; m < t; ++m) f[m] = f[m] || [], f[m][c] = h[m];
                        l.push(Array(e))
                    }
                    p && p.modifyRows(this, l, d || 0, a);
                    this.emit({type: "afterDeleteRows", detail: a, rowCount: b, rowIndex: d || 0, rows: f});
                    return f
                };
                g.prototype.emit = function (d) {
                    switch (d.type) {
                        case "afterDeleteColumns":
                        case "afterDeleteRows":
                        case "afterSetCell":
                        case "afterSetColumns":
                        case "afterSetRows":
                            this.versionTag = k()
                    }
                    m(this, d.type, d)
                };
                g.prototype.getCell = function (d, b) {
                    d = this.aliases[d] || d;
                    if (d = this.columns[d]) return d[b]
                };
                g.prototype.getCellAsBoolean = function (d, b) {
                    d = this.aliases[d] || d;
                    d = this.columns[d];
                    return !(!d || !d[b])
                };
                g.prototype.getCellAsNumber = function (d, b, a) {
                    d = this.aliases[d] || d;
                    b = (d = this.columns[d]) && d[b];
                    switch (typeof b) {
                        case "boolean":
                            return b ? 1 : 0;
                        case "number":
                            return isNaN(b) && !a ? null : b
                    }
                    b = parseFloat("".concat(b));
                    return isNaN(b) && !a ? null : b
                };
                g.prototype.getCellAsString = function (d, b) {
                    d = this.aliases[d] || d;
                    d = this.columns[d];
                    return "".concat(d && d[b])
                };
                g.prototype.getColumn = function (d, b) {
                    return this.getColumns([d],
                        b)[d]
                };
                g.prototype.getColumnAliases = function () {
                    for (var d = this.aliases, b = Object.keys(d), a = {}, f = 0, l = b.length, p; f < l; ++f) p = b[f], a[p] = d[p];
                    return a
                };
                g.prototype.getColumnAsNumbers = function (d, b) {
                    var a = this.columns;
                    d = this.aliases[d] || d;
                    a = a[d];
                    var f = [];
                    if (a) {
                        var l = a.length;
                        if (b) for (b = 0; b < l; ++b) f.push(this.getCellAsNumber(d, b, !0)); else {
                            b = 0;
                            for (var p; b < l; ++b) {
                                p = a[b];
                                if ("number" === typeof p) return a.slice();
                                if (null !== p && "undefined" !== typeof p) break
                            }
                            for (b = 0; b < l; ++b) f.push(this.getCellAsNumber(d, b))
                        }
                    }
                    return f
                };
                g.prototype.getColumnNames = function () {
                    return Object.keys(this.columns)
                };
                g.prototype.getColumns = function (d, b) {
                    var a = this.aliases, f = this.columns, l = {};
                    d = d || Object.keys(f);
                    for (var p = 0, g = d.length, k, c; p < g; ++p) c = d[p], (k = f[a[c] || c]) && (l[c] = b ? k : k.slice());
                    return l
                };
                g.prototype.getModifier = function () {
                    return this.modifier
                };
                g.prototype.getRow = function (d, b) {
                    return this.getRows(d, 1, b)[0]
                };
                g.prototype.getRowCount = function () {
                    return this.rowCount
                };
                g.prototype.getRowIndexBy = function (d, b, a) {
                    d = this.aliases[d] || d;
                    if (d =
                        this.columns[d]) if (b = d.indexOf(b, a), -1 !== b) return b
                };
                g.prototype.getRowObject = function (d, b) {
                    return this.getRowObjects(d, 1, b)[0]
                };
                g.prototype.getRowObjects = function (d, b, a) {
                    void 0 === d && (d = 0);
                    void 0 === b && (b = this.rowCount - d);
                    var f = this.aliases, l = this.columns, p = Array(b);
                    a = a || Object.keys(l);
                    var g = d, k = 0;
                    d = Math.min(this.rowCount, d + b);
                    for (var c; g < d; ++g, ++k) {
                        c = p[k] = {};
                        for (var m = 0, e = a; m < e.length; m++) {
                            var h = e[m];
                            b = l[f[h] || h];
                            c[h] = b ? b[g] : void 0
                        }
                    }
                    return p
                };
                g.prototype.getRows = function (d, b, a) {
                    void 0 === d && (d = 0);
                    void 0 === b && (b = this.rowCount - d);
                    var f = this.aliases, l = this.columns, p = Array(b);
                    a = a || Object.keys(l);
                    var g = d, k = 0;
                    d = Math.min(this.rowCount, d + b);
                    for (var c; g < d; ++g, ++k) {
                        b = p[k] = [];
                        for (var m = 0, e = a; m < e.length; m++) c = e[m], c = l[f[c] || c], b.push(c ? c[g] : void 0)
                    }
                    return p
                };
                g.prototype.getVersionTag = function () {
                    return this.versionTag
                };
                g.prototype.hasColumns = function (d) {
                    for (var b = this.aliases, a = this.columns, f = 0, l = d.length, p; f < l; ++f) if (p = d[f], !a[p] && !b[p]) return !1;
                    return !0
                };
                g.prototype.hasRowWith = function (d, b) {
                    d = this.aliases[d] ||
                        d;
                    return (d = this.columns[d]) ? -1 !== d.indexOf(b) : !1
                };
                g.prototype.on = function (d, b) {
                    return c(this, d, b)
                };
                g.prototype.renameColumn = function (d, b) {
                    var a = this.columns;
                    if (a[d]) {
                        if (d !== b) {
                            var f = this.aliases;
                            f[b] && delete f[b];
                            a[b] = a[d];
                            delete a[d]
                        }
                        return !0
                    }
                    return !1
                };
                g.prototype.setCell = function (d, b, a, f) {
                    var l = this.columns, p = this.modifier;
                    d = this.aliases[d] || d;
                    var g = l[d];
                    g && g[b] === a || (this.emit({
                        type: "setCell",
                        cellValue: a,
                        columnName: d,
                        detail: f,
                        rowIndex: b
                    }), g || (g = l[d] = Array(this.rowCount)), b >= this.rowCount && (this.rowCount =
                        b + 1), g[b] = a, p && p.modifyCell(this, d, b, a), this.emit({
                        type: "afterSetCell",
                        cellValue: a,
                        columnName: d,
                        detail: f,
                        rowIndex: b
                    }))
                };
                g.prototype.setColumn = function (d, b, a, f) {
                    var l;
                    void 0 === b && (b = []);
                    void 0 === a && (a = 0);
                    this.setColumns((l = {}, l[d] = b, l), a, f)
                };
                g.prototype.setColumnAlias = function (d, b) {
                    var a = this.aliases;
                    return a[d] ? !1 : (a[d] = b, !0)
                };
                g.prototype.setColumns = function (d, b, a) {
                    var f = this.columns, l = this.modifier, p = "undefined" === typeof b, g = Object.keys(d);
                    this.emit({
                        type: "setColumns", columns: d, columnNames: g, detail: a,
                        rowIndex: b
                    });
                    for (var k = 0, c = g.length, m, e; k < c; ++k) if (e = g[k], m = d[e], e = this.aliases[e] || e, p) f[e] = m.slice(), this.rowCount = m.length; else {
                        e = f[e] ? f[e] : f[e] = Array(this.rowCount);
                        for (var h = b || 0, t = m.length; h < t; ++h) e[h] = m[h];
                        this.rowCount = Math.max(this.rowCount, e.length)
                    }
                    p = Object.keys(f);
                    k = 0;
                    for (c = p.length; k < c; ++k) f[p[k]].length = this.rowCount;
                    l && l.modifyColumns(this, d, b || 0);
                    this.emit({type: "afterSetColumns", columns: d, columnNames: g, detail: a, rowIndex: b})
                };
                g.prototype.setModifier = function (d, b) {
                    var a = this;
                    a.emit({
                        type: "setModifier",
                        detail: b, modifier: d, modified: a.modified
                    });
                    a.modified = a;
                    a.modifier = d;
                    return (d ? d.modify(a) : Promise.resolve(a)).then(function (a) {
                        a.emit({type: "afterSetModifier", detail: b, modifier: d, modified: a.modified});
                        return a
                    })["catch"](function (f) {
                        a.emit({type: "setModifierError", error: f, modifier: d, modified: a.modified});
                        throw f;
                    })
                };
                g.prototype.setRow = function (d, b, a) {
                    this.setRows([d], b, a)
                };
                g.prototype.setRows = function (d, b, a) {
                    void 0 === b && (b = this.rowCount);
                    var f = this.aliases, l = this.columns, p = Object.keys(l), k = this.modifier,
                        c = d.length;
                    this.emit({type: "setRows", detail: a, rowCount: c, rowIndex: b, rows: d});
                    for (var e = 0, m = b, h; e < c; ++e, ++m) if (h = d[e], h === g.NULL) for (var u = 0, t = p.length; u < t; ++u) l[p[u]][m] = null; else if (h instanceof Array) for (u = 0, t = p.length; u < t; ++u) l[p[u]][m] = h[u]; else {
                        var n = Object.keys(h);
                        u = 0;
                        t = n.length;
                        for (var w; u < t; ++u) w = n[u], w = f[w] || w, l[w] || (l[w] = Array(m + 1)), l[w][m] = h[w]
                    }
                    f = b + c;
                    if (f > this.rowCount) for (this.rowCount = f, e = 0, m = p.length; e < m; ++e) l[p[e]].length = f;
                    k && k.modifyRows(this, d, b);
                    this.emit({
                        type: "afterSetRows", detail: a,
                        rowCount: c, rowIndex: b, rows: d
                    })
                };
                g.NULL = {};
                return g
            }();
            "";
            return e
        });
    n(e, "Data/Connectors/DataConnector.js", [e["Data/DataTable.js"], e["Core/Utilities.js"]], function (e, c) {
        var m = c.addEvent, k = c.fireEvent, g = c.merge, d = c.pick;
        c = function () {
            function b(a) {
                void 0 === a && (a = {});
                this.table = new e(a.dataTable);
                this.metadata = a.metadata || {columns: {}}
            }

            Object.defineProperty(b.prototype, "polling", {
                get: function () {
                    return !!this.polling
                }, enumerable: !1, configurable: !0
            });
            b.prototype.describeColumn = function (a, f) {
                var b = this.metadata.columns;
                b[a] = g(b[a] || {}, f)
            };
            b.prototype.describeColumns = function (a) {
                for (var f = Object.keys(a), b; "string" === typeof (b = f.pop());) this.describeColumn(b, a[b])
            };
            b.prototype.emit = function (a) {
                k(this, a.type, a)
            };
            b.prototype.getColumnOrder = function (a) {
                var f = this.metadata.columns;
                a = Object.keys(f || {});
                if (a.length) return a.sort(function (a, b) {
                    return d(f[a].index, 0) - d(f[b].index, 0)
                })
            };
            b.prototype.getSortedColumns = function (a) {
                return this.table.getColumns(this.getColumnOrder(a))
            };
            b.prototype.load = function () {
                k(this, "afterLoad",
                    {table: this.table});
                return Promise.resolve(this)
            };
            b.prototype.on = function (a, b) {
                return m(this, a, b)
            };
            b.prototype.save = function () {
                k(this, "saveError", {table: this.table});
                return Promise.reject(Error("Not implemented"))
            };
            b.prototype.setColumnOrder = function (a) {
                for (var b = 0, d = a.length; b < d; ++b) this.describeColumn(a[b], {index: b})
            };
            b.prototype.startPolling = function (a) {
                void 0 === a && (a = 1E3);
                var b = this;
                window.clearTimeout(b._polling);
                b._polling = window.setTimeout(function () {
                    return b.load()["catch"](function (a) {
                        return b.emit({
                            type: "loadError",
                            error: a, table: b.table
                        })
                    }).then(function () {
                        b._polling && b.startPolling(a)
                    })
                }, a)
            };
            b.prototype.stopPolling = function () {
                window.clearTimeout(this._polling);
                delete this._polling
            };
            b.prototype.whatIs = function (a) {
                return this.metadata.columns[a]
            };
            return b
        }();
        (function (b) {
            b.types = {};
            b.registerType = function (a, f) {
                return !!a && !b.types[a] && !!(b.types[a] = f)
            }
        })(c || (c = {}));
        return c
    });
    n(e, "Data/Converters/DataConverter.js", [e["Data/DataTable.js"], e["Core/Utilities.js"]], function (e, c) {
        var m = c.addEvent, k = c.fireEvent, g = c.isNumber,
            d = c.merge;
        c = function () {
            function b(a) {
                this.dateFormats = {
                    "YYYY/mm/dd": {
                        regex: /^([0-9]{4})([\-\.\/])([0-9]{1,2})\2([0-9]{1,2})$/, parser: function (a) {
                            return a ? Date.UTC(+a[1], a[3] - 1, +a[4]) : NaN
                        }
                    }, "dd/mm/YYYY": {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/, parser: function (a) {
                            return a ? Date.UTC(+a[4], a[3] - 1, +a[1]) : NaN
                        }, alternative: "mm/dd/YYYY"
                    }, "mm/dd/YYYY": {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/, parser: function (a) {
                            return a ? Date.UTC(+a[4], a[1] - 1, +a[3]) : NaN
                        }
                    }, "dd/mm/YY": {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/,
                        parser: function (a) {
                            if (!a) return NaN;
                            var b = +a[4];
                            b = b > (new Date).getFullYear() - 2E3 ? b + 1900 : b + 2E3;
                            return Date.UTC(b, a[3] - 1, +a[1])
                        }, alternative: "mm/dd/YY"
                    }, "mm/dd/YY": {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/, parser: function (a) {
                            return a ? Date.UTC(+a[4] + 2E3, a[1] - 1, +a[3]) : NaN
                        }
                    }
                };
                a = d(b.defaultOptions, a);
                var f = a.decimalPoint;
                if ("." === f || "," === f) this.decimalRegExp = new RegExp("^(-?[0-9]+)" + ("." === f ? "\\." : ",") + "([0-9]+)$");
                this.options = a
            }

            b.prototype.asBoolean = function (a) {
                return "boolean" === typeof a ?
                    a : "string" === typeof a ? "" !== a && "0" !== a && "false" !== a : !!this.asNumber(a)
            };
            b.prototype.asDate = function (a) {
                if ("string" === typeof a) a = this.parseDate(a); else if ("number" !== typeof a) {
                    if (a instanceof Date) return a;
                    a = this.parseDate(this.asString(a))
                }
                return new Date(a)
            };
            b.prototype.asGuessedType = function (a) {
                return {
                    number: this.asNumber,
                    Date: this.asDate,
                    string: this.asString
                }[this.guessType(a)].call(this, a)
            };
            b.prototype.asNumber = function (a) {
                if ("number" === typeof a) return a;
                if ("boolean" === typeof a) return a ? 1 : 0;
                if ("string" ===
                    typeof a) {
                    var b = this.decimalRegExp;
                    -1 < a.indexOf(" ") && (a = a.replace(/\s+/g, ""));
                    if (b) {
                        if (!b.test(a)) return NaN;
                        a = a.replace(b, "$1.$2")
                    }
                    return parseFloat(a)
                }
                return a instanceof Date ? a.getDate() : a ? a.getRowCount() : NaN
            };
            b.prototype.asString = function (a) {
                return "" + a
            };
            b.prototype.deduceDateFormat = function (a, b, d) {
                var f = [], l = [], g = "YYYY/mm/dd", k = [], c = 0, e = !1, m, h;
                if (!b || b > a.length) b = a.length;
                for (; c < b; c++) if ("undefined" !== typeof a[c] && a[c] && a[c].length) {
                    var n = a[c].trim().replace(/[-\.\/]/g, " ").split(" ");
                    k = ["",
                        "", ""];
                    for (h = 0; h < n.length; h++) h < k.length && (m = parseInt(n[h], 10)) && (l[h] = !l[h] || l[h] < m ? m : l[h], "undefined" !== typeof f[h] ? f[h] !== m && (f[h] = !1) : f[h] = m, 31 < m ? k[h] = 100 > m ? "YY" : "YYYY" : 12 < m && 31 >= m ? (k[h] = "dd", e = !0) : k[h].length || (k[h] = "mm"))
                }
                if (e) {
                    for (h = 0; h < f.length; h++) !1 !== f[h] ? 12 < l[h] && "YY" !== k[h] && "YYYY" !== k[h] && (k[h] = "YY") : 12 < l[h] && "mm" === k[h] && (k[h] = "dd");
                    3 === k.length && "dd" === k[1] && "dd" === k[2] && (k[2] = "YY");
                    g = k.join("/")
                }
                d && (this.options.dateFormat = g);
                return g
            };
            b.prototype.emit = function (a) {
                k(this, a.type, a)
            };
            b.prototype.export = function (a, b) {
                this.emit({type: "exportError", columns: [], headers: []});
                throw Error("Not implemented");
            };
            b.prototype.getTable = function () {
                throw Error("Not implemented");
            };
            b.prototype.guessType = function (a) {
                var b = "string";
                if ("string" === typeof a) {
                    var d = this.trim("".concat(a)), p = this.decimalRegExp;
                    d = this.trim(d, !0);
                    p && (d = p.test(d) ? d.replace(p, "$1.$2") : "");
                    p = parseFloat(d);
                    +d === p ? a = p : (b = this.parseDate(a), b = g(b) ? "Date" : "string")
                }
                "number" === typeof a && (b = 31536E6 < a ? "Date" : "number");
                return b
            };
            b.prototype.on = function (a, b) {
                return m(this, a, b)
            };
            b.prototype.parse = function (a) {
                this.emit({type: "parseError", columns: [], headers: []});
                throw Error("Not implemented");
            };
            b.prototype.parseDate = function (a, b) {
                var f = this.options, d = b || f.dateFormat;
                b = NaN;
                var k, c;
                if (f.parseDate) b = f.parseDate(a); else {
                    if (d) (f = this.dateFormats[d]) || (f = this.dateFormats["YYYY/mm/dd"]), (c = a.match(f.regex)) && (b = f.parser(c)); else for (k in this.dateFormats) if (f = this.dateFormats[k], c = a.match(f.regex)) {
                        b = f.parser(c);
                        break
                    }
                    c || (c = Date.parse(a),
                        "object" === typeof c && null !== c && c.getTime ? b = c.getTime() - 6E4 * c.getTimezoneOffset() : g(c) && (b = c - 6E4 * (new Date(c)).getTimezoneOffset(), -1 === a.indexOf("2001") && 2001 === (new Date(b)).getFullYear() && (b = NaN)))
                }
                return b
            };
            b.prototype.trim = function (a, b) {
                "string" === typeof a && (a = a.replace(/^\s+|\s+$/g, ""), b && /^[0-9\s]+$/.test(a) && (a = a.replace(/\s/g, "")));
                return a
            };
            b.defaultOptions = {
                dateFormat: "",
                alternativeFormat: "",
                startColumn: 0,
                endColumn: Number.MAX_VALUE,
                startRow: 0,
                endRow: Number.MAX_VALUE,
                firstRowAsNames: !0,
                switchRowsAndColumns: !1
            };
            return b
        }();
        (function (b) {
            b.getTableFromColumns = function (a, b) {
                void 0 === a && (a = []);
                void 0 === b && (b = []);
                for (var f = new e, d = 0, g = Math.max(b.length, a.length); d < g; ++d) f.setColumn(b[d] || "".concat(d), a[d]);
                return f
            }
        })(c || (c = {}));
        return c
    });
    n(e, "Data/DataCursor.js", [], function () {
        var e = function () {
            function c(c) {
                void 0 === c && (c = {});
                this.emittingRegister = [];
                this.listenerMap = {};
                this.stateMap = c
            }

            c.prototype.addListener = function (c, k, g) {
                c = this.listenerMap[c] = this.listenerMap[c] || {};
                (c[k] = c[k] || []).push(g);
                return this
            };
            c.prototype.buildEmittingTag = function (c) {
                return ("position" === c.cursor.type ? [c.table.id, c.cursor.column, c.cursor.row, c.cursor.state, c.cursor.type] : [c.table.id, c.cursor.columns, c.cursor.firstRow, c.cursor.lastRow, c.cursor.state, c.cursor.type]).join("\x00")
            };
            c.prototype.emitCursor = function (e, k, g, d) {
                var b = e.id, a = k.state;
                if (a = this.listenerMap[b] && this.listenerMap[b][a]) {
                    b = this.stateMap[b] = this.stateMap[b] || {};
                    var f = b[k.state];
                    d && (f || (f = b[k.state] = []), -1 === c.getIndex(k, f) && f.push(k));
                    e = {
                        cursor: k, cursors: f ||
                            [], table: e
                    };
                    g && (e.event = g);
                    k = this.emittingRegister;
                    g = this.buildEmittingTag(e);
                    if (0 <= k.indexOf(g)) return this;
                    try {
                        this.emittingRegister.push(g);
                        k = 0;
                        for (var l = a.length; k < l; ++k) a[k].call(this, e)
                    } finally {
                        l = this.emittingRegister.indexOf(g), 0 <= l && this.emittingRegister.splice(l, 1)
                    }
                }
                return this
            };
            c.prototype.remitCursor = function (e, k) {
                if (e = this.stateMap[e] && this.stateMap[e][k.state]) k = c.getIndex(k, e), 0 <= k && e.splice(k, 1);
                return this
            };
            c.prototype.removeListener = function (c, k, g) {
                (c = this.listenerMap[c] && this.listenerMap[c][k]) &&
                (g = c.indexOf(g)) && c.splice(g, 1);
                return this
            };
            return c
        }();
        (function (c) {
            function e(c, g) {
                var d, b, a, f;
                if ("range" === c.type) return c;
                g = {
                    type: "range",
                    firstRow: null !== (b = null !== (d = c.row) && void 0 !== d ? d : g && g.firstRow) && void 0 !== b ? b : 0,
                    lastRow: null !== (f = null !== (a = c.row) && void 0 !== a ? a : g && g.lastRow) && void 0 !== f ? f : Number.MAX_VALUE,
                    state: c.state
                };
                "undefined" !== typeof c.column && (g.columns = [c.column]);
                return g
            }

            c.getIndex = function (c, g) {
                if ("position" === c.type) for (var d, b = 0, a = g.length; b < a; ++b) {
                    if (d = g[b], "position" ===
                    d.type && d.state === c.state && d.column === c.column && d.row === c.row) return b
                } else {
                    var f = JSON.stringify(c.columns);
                    b = 0;
                    for (a = g.length; b < a; ++b) if (d = g[b], "range" === d.type && d.state === c.state && d.firstRow === c.firstRow && d.lastRow === c.lastRow && JSON.stringify(d.columns) === f) return b
                }
                return -1
            };
            c.isEqual = function (c, g) {
                return "position" === c.type && "position" === g.type ? c.column === g.column && c.row === g.row && c.state === g.state : "range" === c.type && "range" === g.type ? c.firstRow === g.firstRow && c.lastRow === g.lastRow && JSON.stringify(c.columns) ===
                    JSON.stringify(g.columns) : !1
            };
            c.isInRange = function (c, g) {
                "position" === g.type && (g = e(g));
                "position" === c.type && (c = e(c, g));
                var d = c.columns, b = g.columns;
                return c.firstRow >= g.firstRow && c.lastRow <= g.lastRow && (!d || !b || d.every(function (a) {
                    return 0 <= b.indexOf(a)
                }))
            };
            c.toPositions = function (c) {
                if ("position" === c.type) return [c];
                var g = c.columns || [], d = [], b = c.state, a = c.firstRow;
                for (c = c.lastRow; a < c; ++a) if (g.length) for (var f = 0, l = g.length; f < l; ++f) d.push({
                    type: "position",
                    column: g[f],
                    row: a,
                    state: b
                }); else d.push({
                    type: "position",
                    row: a, state: b
                });
                return d
            };
            c.toRange = e
        })(e || (e = {}));
        "";
        return e
    });
    n(e, "Data/Modifiers/DataModifier.js", [e["Core/Utilities.js"]], function (e) {
        var c = e.addEvent, h = e.fireEvent, k = e.merge;
        e = function () {
            function g() {
            }

            g.prototype.benchmark = function (d, b) {
                var a = [], f = this, l = function () {
                    f.modifyTable(d);
                    f.emit({type: "afterBenchmarkIteration"})
                }, p = k({iterations: 1}, b).iterations;
                f.on("afterBenchmarkIteration", function () {
                    a.length === p ? f.emit({type: "afterBenchmark", results: a}) : l()
                });
                var c = 0, g = 0;
                f.on("modify", function () {
                    c =
                        window.performance.now()
                });
                f.on("afterModify", function () {
                    g = window.performance.now();
                    a.push(g - c)
                });
                l();
                return a
            };
            g.prototype.emit = function (d) {
                h(this, d.type, d)
            };
            g.prototype.modify = function (d, b) {
                var a = this;
                return new Promise(function (f, l) {
                    d.modified === d && (d.modified = d.clone(!1, b));
                    try {
                        f(a.modifyTable(d, b))
                    } catch (p) {
                        a.emit({type: "error", detail: b, table: d}), l(p)
                    }
                })
            };
            g.prototype.modifyCell = function (d, b, a, f, l) {
                return this.modifyTable(d)
            };
            g.prototype.modifyColumns = function (d, b, a, f) {
                return this.modifyTable(d)
            };
            g.prototype.modifyRows = function (d, b, a, f) {
                return this.modifyTable(d)
            };
            g.prototype.on = function (d, b) {
                return c(this, d, b)
            };
            return g
        }();
        (function (c) {
            c.types = {};
            c.registerType = function (d, b) {
                return !!d && !c.types[d] && !!(c.types[d] = b)
            }
        })(e || (e = {}));
        return e
    });
    n(e, "Data/DataPoolDefaults.js", [], function () {
        return {connectors: []}
    });
    n(e, "Data/DataPool.js", [e["Data/Connectors/DataConnector.js"], e["Data/DataPoolDefaults.js"], e["Core/Utilities.js"]], function (e, c, m) {
        return function () {
            function k(g) {
                void 0 === g && (g = c);
                g.connectors =
                    g.connectors || [];
                this.options = g;
                this.connectors = {}
            }

            k.prototype.emit = function (c) {
                m.fireEvent(this, c.type, c)
            };
            k.prototype.getConnector = function (c) {
                var d = this.connectors[c];
                if (d) return Promise.resolve(d);
                if (d = this.getConnectorOptions(c)) return this.loadConnector(d);
                throw Error("Connector not found. (".concat(c, ")"));
            };
            k.prototype.getConnectorOptions = function (c) {
                for (var d = this.options.connectors, b = 0, a = d.length; b < a; ++b) if (d[b].name === c) return d[b]
            };
            k.prototype.getConnectorTable = function (c) {
                return this.getConnector(c).then(function (d) {
                    return d.table
                })
            };
            k.prototype.loadConnector = function (c) {
                var d = this;
                return new Promise(function (b, a) {
                    d.emit({type: "load", options: c});
                    var f = e.types[c.type];
                    if (!f) throw Error("Connector type not found. (".concat(c.type, ")"));
                    f = new f(c.options);
                    d.connectors[c.name] = f;
                    f.load().then(function (a) {
                        d.emit({type: "afterLoad", options: c});
                        b(a)
                    })["catch"](a)
                })
            };
            k.prototype.on = function (c, d) {
                return m.addEvent(this, c, d)
            };
            k.prototype.setConnectorOptions = function (c) {
                var d = this.options.connectors;
                this.emit({
                    type: "setConnectorOptions",
                    options: c
                });
                for (var b = 0, a = d.length; b < a; ++b) if (d[b].name === c.name) {
                    d.splice(b, 1);
                    break
                }
                d.push(c);
                this.emit({type: "afterSetConnectorOptions", options: c})
            };
            return k
        }()
    });
    n(e, "Data/Formula/FormulaParser.js", [], function () {
        function e(a) {
            for (var b = 0, f = 0, d = a.length, c, l = 1; f < d; ++f) if (c = a[f], "(" === c) b || (l = f + 1), ++b; else if (")" === c && (--b, !b)) return a.substring(l, f);
            if (0 < b) throw a = Error("Incomplete parantheses."), a.name = "FormulaParseError", a;
            return ""
        }

        function c(a) {
            for (var b = -1, f = 0, d = a.length, c, l = !1; f < d; ++f) if (c =
                a[f], "\\" === c) l = !l; else if (l) l = !1; else if ('"' === c) if (0 > b) b = f; else return a.substring(b + 1, f);
            a = Error("Incomplete string.");
            a.name = "FormulaParseError";
            throw a;
        }

        function m(a, b) {
            var f;
            if (f = a.match(z)) {
                a = "" === f[2] || "[" === f[2][0];
                b = "" === f[1] || "[" === f[1][0];
                var c = "" === f[4] || "[" === f[4][0], l = "" === f[3] || "[" === f[3][0];
                f = {
                    type: "range",
                    beginColumn: a ? parseInt(f[2].substring(1, -1) || "0", 10) : parseInt(f[2], 10) - 1,
                    beginRow: b ? parseInt(f[1].substring(1, -1) || "0", 10) : parseInt(f[1], 10) - 1,
                    endColumn: c ? parseInt(f[4].substring(1,
                        -1) || "0", 10) : parseInt(f[4], 10) - 1,
                    endRow: l ? parseInt(f[3].substring(1, -1) || "0", 10) : parseInt(f[3], 10) - 1
                };
                a && (f.beginColumnRelative = !0);
                b && (f.beginRowRelative = !0);
                c && (f.endColumnRelative = !0);
                l && (f.endRowRelative = !0);
                return f
            }
            if (f = a.match(A)) return a = "$" !== f[1][0], b = "$" !== f[2][0], c = "$" !== f[3][0], l = "$" !== f[4][0], f = {
                type: "range",
                beginColumn: d(a ? f[1] : f[1].substring(1)) - 1,
                beginRow: parseInt(b ? f[2] : f[2].substring(1), 10) - 1,
                endColumn: d(c ? f[3] : f[3].substring(1)) - 1,
                endRow: parseInt(l ? f[4] : f[4].substring(1), 10) - 1
            },
            a && (f.beginColumnRelative = !0), b && (f.beginRowRelative = !0), c && (f.endColumnRelative = !0), l && (f.endRowRelative = !0), f;
            f = g(a, b);
            return 1 === f.length && "string" !== typeof f[0] ? f[0] : f
        }

        function k(a, b) {
            for (var f = [], d = b ? ";" : ",", l = 0, p = "", g = 0, e = a.length, k; g < e; ++g) (k = a[g], k === d && !l && p) ? (f.push(m(p, b)), p = "") : '"' !== k || l || p ? " " !== k && (p += k, "(" === k ? ++l : ")" === k && --l) : (k = c(a.substring(g)), f.push(k), g += k.length + 1);
            !l && p && f.push(m(p, b));
            return f
        }

        function g(A, h) {
            for (var m = h ? f : a, z = [], r, n = ("=" === A[0] ? A.substring(1) : A).trim(); n;) if (r =
                n.match(F)) {
                var u = "" === r[2] || "[" === r[2][0], y = "" === r[1] || "[" === r[1][0], B = {
                    type: "reference",
                    column: u ? parseInt(r[2].substring(1, -1) || "0", 10) : parseInt(r[2], 10) - 1,
                    row: y ? parseInt(r[1].substring(1, -1) || "0", 10) : parseInt(r[1], 10) - 1
                };
                u && (B.columnRelative = !0);
                y && (B.rowRelative = !0);
                z.push(B);
                n = n.substring(r[0].length).trim()
            } else if (r = n.match(C)) u = "$" !== r[1][0], y = "$" !== r[2][0], B = {
                type: "reference",
                column: d(u ? r[1] : r[1].substring(1)) - 1,
                row: parseInt(y ? r[2] : r[2].substring(1), 10) - 1
            }, u && (B.columnRelative = !0), y && (B.rowRelative =
                !0), z.push(B), n = n.substring(r[0].length).trim(); else if (r = n.match(p)) z.push(r[0]), n = n.substring(r[0].length).trim(); else if (r = n.match(b)) z.push("TRUE" === r[0]), n = n.substring(r[0].length).trim(); else if (r = n.match(m)) z.push(parseFloat(r[0])), n = n.substring(r[0].length).trim(); else if ('"' === n[0]) r = c(n), z.push(r.substring(1, -1)), n = n.substring(r.length + 2).trim(); else if (r = n.match(l)) n = n.substring(r[1].length).trim(), u = e(n), z.push({
                type: "function",
                name: r[1],
                args: k(u, h)
            }), n = n.substring(u.length + 2).trim();
            else {
                if ("(" === n[0] && (r = e(n))) {
                    z.push(g(r, h));
                    n = n.substring(r.length + 2).trim();
                    continue
                }
                h = A.length - n.length;
                A = Error("Unexpected character `" + A.substring(h, h + 1) + "` at position " + (h + 1) + ". (`..." + A.substring(h - 5, h + 6) + "...`)");
                A.name = "FormulaParseError";
                throw A;
            }
            return z
        }

        function d(a) {
            for (var b = 0, f = 0, d = a.length, c, l = a.length - 1; f < d; ++f) c = a.charCodeAt(f), 65 <= c && 90 >= c && (b += (c - 64) * Math.pow(26, l)), --l;
            return b
        }

        var b = /^(?:FALSE|TRUE)/, a = /^[+-]?\d+(?:\.\d+)?(?:e[+-]\d+)?/, f = /^[+-]?\d+(?:,\d+)?(?:e[+-]\d+)?/, l =
                /^([A-Z][A-Z\d\.]*)\(/, p = /^(?:[+\-*\/^<=>]|<=|=>)/, A = /^(\$?[A-Z]+)(\$?\d+):(\$?[A-Z]+)(\$?\d+)/,
            z = /^R(\d*|\[\d+\])C(\d*|\[\d+\]):R(\d*|\[\d+\])C(\d*|\[\d+\])/, C = /^(\$?[A-Z]+)(\$?\d+)(?![:C])/,
            F = /^R(\d*|\[\d+\])C(\d*|\[\d+\])(?!:)/;
        return {parseFormula: g}
    });
    n(e, "Data/Formula/FormulaTypes.js", [], function () {
        var e = "+ - * / ^ = < <= > >=".split(" ");
        return {
            isFormula: function (c) {
                return c instanceof Array
            }, isFunction: function (c) {
                return "object" === typeof c && !(c instanceof Array) && "function" === c.type
            }, isOperator: function (c) {
                return "string" ===
                    typeof c && 0 <= e.indexOf(c)
            }, isRange: function (c) {
                return "object" === typeof c && !(c instanceof Array) && "range" === c.type
            }, isReference: function (c) {
                return "object" === typeof c && !(c instanceof Array) && "reference" === c.type
            }, isValue: function (c) {
                return "boolean" === typeof c || "number" === typeof c || "string" === typeof c
            }
        }
    });
    n(e, "Data/Formula/FormulaProcessor.js", [e["Data/Formula/FormulaTypes.js"]], function (e) {
        function c(a) {
            switch (typeof a) {
                case "boolean":
                    return a ? q : v;
                case "string":
                    return w;
                case "number":
                    return a;
                default:
                    return NaN
            }
        }

        function h(a) {
            return "string" === typeof a ? a.toLowerCase().replace(t, "\x00") : a
        }

        function k(a) {
            switch (typeof a) {
                case "boolean":
                    return a ? 1 : 0;
                case "string":
                    return parseFloat(a.replace(",", "."));
                case "number":
                    return a;
                default:
                    return NaN
            }
        }

        function g(a, b, f) {
            switch (a) {
                case "=":
                    return h(b) === h(f);
                case "<":
                    return typeof b === typeof f ? h(b) < h(f) : c(b) < c(f);
                case "<=":
                    return typeof b === typeof f ? h(b) <= h(f) : c(b) <= c(f);
                case ">":
                    return typeof b === typeof f ? h(b) > h(f) : c(b) > c(f);
                case ">=":
                    return typeof b === typeof f ? h(b) >= h(f) :
                        c(b) >= c(f)
            }
            b = k(b);
            f = k(f);
            switch (a) {
                case "+":
                    a = b + f;
                    break;
                case "-":
                    a = b - f;
                    break;
                case "*":
                    a = b * f;
                    break;
                case "/":
                    a = b / f;
                    break;
                case "^":
                    a = Math.pow(b, f);
                    break;
                default:
                    return NaN
            }
            return a % 1 ? Math.round(1E9 * a) / 1E9 : a
        }

        function d(a, d) {
            return u(a) ? a : n(a) ? d && b(a, d) || [] : z(a) ? l(a, d) : f(A(a) ? a : [a], d)
        }

        function b(a, b) {
            for (var f = b.getColumnNames().slice(a.beginColumn, a.endColumn + 1), d = [], c = 0, l = f.length, p; c < l; ++c) for (var g = b.getColumn(f[c], !0) || [], e = a.beginRow, k = a.endRow + 1; e < k; ++e) p = g[e], "string" === typeof p && "=" === p[0] && b !==
            b.modified && (p = b.modified.getCell(f[c], e)), d.push(u(p) ? p : NaN);
            return d
        }

        function a(a, b) {
            var f = b.getColumnNames()[a.column];
            if (f) {
                var d = b.getCell(f, a.row);
                return "string" === typeof d && "=" === d[0] && b !== b.modified ? (a = b.modified.getCell(f, a.row), u(a) ? a : NaN) : u(d) ? d : NaN
            }
            return NaN
        }

        function f(b, d) {
            var c = 0, p = b.length, e = void 0, k;
            for (k = void 0; c < p; ++c) {
                var h = b[c];
                if (C(h)) e = h; else if (u(h) ? k = h : A(h) ? k = f(b, d) : z(h) ? (k = l(h, d), k = u(k) ? k : NaN) : r(h) && (k = d && a(h, d)), "undefined" !== typeof k) {
                    if ("undefined" === typeof m) var m = e ?
                        g(e, 0, k) : k; else if (e) h = b[c + 1], C(h) && x[h] > x[e] && (k = g(h, k, f(b.slice(c + 2))), c = p), m = g(e, m, k); else return NaN;
                    k = e = void 0
                }
            }
            return u(m) ? m : NaN
        }

        function l(a, b, f) {
            if (f = y[a.name]) try {
                return f(a.args, b)
            } catch (G) {
                return NaN
            }
            a = Error('Function "'.concat(a.name, '" not found.'));
            a.name = "FormulaProcessError";
            throw a;
        }

        function p(a, b, f) {
            void 0 === b && (b = 0);
            void 0 === f && (f = 0);
            for (var d = 0, c = a.length, l; d < c; ++d) l = a[d], l instanceof Array ? p(l) : z(l) ? p(l.args) : n(l) ? (l.beginColumnRelative && (l.beginColumn += b), l.beginRowRelative &&
            (l.beginRow += f), l.endColumnRelative && (l.endColumn += b), l.endRowRelative && (l.endRow += f)) : r(l) && (l.columnRelative && (l.column += b), l.rowRelative && (l.row += f));
            return a
        }

        var A = e.isFormula, z = e.isFunction, C = e.isOperator, n = e.isRange, r = e.isReference, u = e.isValue,
            t = / */, v = Number.MAX_VALUE / 1.000000000001, w = Number.MAX_VALUE / 1.000000000002,
            q = Number.MAX_VALUE,
            x = {"^": 3, "*": 2, "/": 2, "+": 1, "-": 1, "=": 0, "<": 0, "<=": 0, ">": 0, ">=": 0}, y = {},
            B = /^[A-Z][A-Z\.]*$/;
        return {
            asNumber: k,
            getArgumentValue: d,
            getArgumentsValues: function (a,
                                          b) {
                for (var f = [], l = 0, c = a.length; l < c; ++l) f.push(d(a[l], b));
                return f
            },
            getRangeValues: b,
            getReferenceValue: a,
            processFormula: f,
            processorFunctions: y,
            registerProcessorFunction: function (a, b) {
                return B.test(a) && !y[a] && !!(y[a] = b)
            },
            translateReferences: p
        }
    });
    n(e, "Data/Formula/Functions/ABS.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(c, g) {
            c = h(c[0], g);
            switch (typeof c) {
                case "number":
                    return Math.abs(c);
                case "object":
                    g = [];
                    for (var d = 0, b = c.length, a; d < b; ++d) {
                        a = c[d];
                        if ("number" !== typeof a) return NaN;
                        g.push(Math.abs(a))
                    }
                    return g;
                default:
                    return NaN
            }
        }

        var h = e.getArgumentValue;
        e.registerProcessorFunction("ABS", c);
        return c
    });
    n(e, "Data/Formula/Functions/AND.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(e, g) {
            for (var d = 0, b = e.length, a; d < b; ++d) if (a = h(e[d], g), !a || "object" === typeof a && !c(a, g)) return !1;
            return !0
        }

        var h = e.getArgumentValue;
        e.registerProcessorFunction("AND", c);
        return c
    });
    n(e, "Data/Formula/Functions/AVERAGE.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(c,
                   e) {
            c = h(c, e);
            for (var d = e = 0, b = 0, a = c.length, f; b < a; ++b) switch (f = c[b], typeof f) {
                case "number":
                    isNaN(f) || (++e, d += f);
                    break;
                case "object":
                    for (var l = 0, p = f.length, g; l < p; ++l) g = f[l], "number" !== typeof g || isNaN(g) || (++e, d += g)
            }
            return e ? d / e : 0
        }

        var h = e.getArgumentsValues;
        e.registerProcessorFunction("AVERAGE", c);
        return c
    });
    n(e, "Data/Formula/Functions/AVERAGEA.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(c, e) {
            for (var d = 0, b = 0, a = 0, f = c.length, l; a < f; ++a) switch (l = h(c[a], e), typeof l) {
                case "boolean":
                    ++d;
                    b += l ? 1 : 0;
                    continue;
                case "number":
                    isNaN(l) || (++d, b += l);
                    continue;
                case "string":
                    ++d;
                    continue;
                default:
                    for (var p = 0, g = l.length, k; p < g; ++p) switch (k = l[p], typeof k) {
                        case "boolean":
                            ++d;
                            b += k ? 1 : 0;
                            continue;
                        case "number":
                            isNaN(k) || (++d, b += k);
                            continue;
                        case "string":
                            ++d
                    }
            }
            return d ? b / d : 0
        }

        var h = e.getArgumentValue;
        e.registerProcessorFunction("AVERAGEA", c);
        return c
    });
    n(e, "Data/Formula/Functions/COUNT.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(h, k) {
            h = e.getArgumentsValues(h, k);
            for (var g = 0, d = 0, b = h.length,
                     a; d < b; ++d) switch (a = h[d], typeof a) {
                case "number":
                    isNaN(a) || ++g;
                    break;
                case "object":
                    g += c(a, k)
            }
            return g
        }

        e.registerProcessorFunction("COUNT", c);
        return c
    });
    n(e, "Data/Formula/Functions/COUNTA.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(h, k) {
            h = e.getArgumentsValues(h, k);
            for (var g = 0, d = 0, b = h.length, a; d < b; ++d) {
                a = h[d];
                switch (typeof a) {
                    case "number":
                        if (isNaN(a)) continue;
                        break;
                    case "object":
                        g += c(a, k);
                        continue;
                    case "string":
                        if (!a) continue
                }
                ++g
            }
            return g
        }

        e.registerProcessorFunction("COUNTA",
            c);
        return c
    });
    n(e, "Data/Formula/Functions/IF.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(c, e) {
            return h(c[0], e) ? h(c[1], e) : h(c[2], e)
        }

        var h = e.getArgumentValue;
        e.registerProcessorFunction("IF", c);
        return c
    });
    n(e, "Data/Formula/Functions/ISNA.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(c, e) {
            c = h(c[0], e);
            return "number" !== typeof c || isNaN(c)
        }

        var h = e.getArgumentValue;
        e.registerProcessorFunction("ISNA", c);
        return c
    });
    n(e, "Data/Formula/Functions/MAX.js", [e["Data/Formula/FormulaProcessor.js"]],
        function (e) {
            function c(e, g) {
                e = h(e, g);
                g = Number.NEGATIVE_INFINITY;
                for (var d = 0, b = e.length, a; d < b; ++d) switch (a = e[d], typeof a) {
                    case "number":
                        a > g && (g = a);
                        break;
                    case "object":
                        a = c(a), a > g && (g = a)
                }
                return isFinite(g) ? g : 0
            }

            var h = e.getArgumentsValues;
            e.registerProcessorFunction("MAX", c);
            return c
        });
    n(e, "Data/Formula/Functions/MEDIAN.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(c, k) {
            var g = [];
            c = e.getArgumentsValues(c, k);
            k = 0;
            for (var d = c.length, b; k < d; ++k) switch (b = c[k], typeof b) {
                case "number":
                    isNaN(b) ||
                    g.push(b);
                    break;
                case "object":
                    for (var a = 0, f = b.length, l; a < f; ++a) l = b[a], "number" !== typeof l || isNaN(l) || g.push(l)
            }
            c = g.length;
            if (!c) return NaN;
            k = Math.floor(c / 2);
            return c % 2 ? g[k] : (g[k - 1] + g[k]) / 2
        }

        e.registerProcessorFunction("MEDIAN", c);
        return c
    });
    n(e, "Data/Formula/Functions/MIN.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(e, g) {
            e = h(e, g);
            g = Number.POSITIVE_INFINITY;
            for (var d = 0, b = e.length, a; d < b; ++d) switch (a = e[d], typeof a) {
                case "number":
                    a < g && (g = a);
                    break;
                case "object":
                    a = c(a), a < g && (g = a)
            }
            return isFinite(g) ?
                g : 0
        }

        var h = e.getArgumentsValues;
        e.registerProcessorFunction("MIN", c);
        return c
    });
    n(e, "Data/Formula/Functions/MOD.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(c, e) {
            var d = h(c[0], e);
            c = h(c[1], e);
            "object" === typeof d && (d = d[0]);
            "object" === typeof c && (c = c[0]);
            return "number" !== typeof d || "number" !== typeof c || 0 === c ? NaN : d % c
        }

        var h = e.getArgumentValue;
        e.registerProcessorFunction("MOD", c);
        return c
    });
    n(e, "Data/Formula/Functions/MODE.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(c,
                   d) {
            var b = {};
            c = e.getArgumentsValues(c, d);
            d = 0;
            for (var a = c.length, f; d < a; ++d) switch (f = c[d], typeof f) {
                case "number":
                    isNaN(f) || (b[f] = (b[f] || 0) + 1);
                    break;
                case "object":
                    for (var l = 0, p = f.length, g; l < p; ++l) g = f[l], "number" !== typeof g || isNaN(g) || (b[g] = (b[g] || 0) + 1)
            }
            return b
        }

        function h(e, d) {
            e = c(e, d);
            d = Object.keys(e);
            if (!d.length) return NaN;
            for (var b = [parseFloat(d[0])], a = e[d[0]], f = 1, l = d.length, p, g; f < l; ++f) p = d[f], g = e[p], a < g ? (b = [parseFloat(p)], a = g) : a === g && b.push(parseFloat(p));
            return 1 < a ? b : NaN
        }

        function k(e, d) {
            e = c(e,
                d);
            d = Object.keys(e);
            if (!d.length) return NaN;
            for (var b = parseFloat(d[0]), a = e[d[0]], f = 1, l = d.length, p, g; f < l; ++f) p = d[f], g = e[p], a < g ? (b = parseFloat(p), a = g) : a === g && (p = parseFloat(p), b > p && (b = p, a = g));
            return 1 < a ? b : NaN
        }

        e.registerProcessorFunction("MODE", k);
        e.registerProcessorFunction("MODE.MULT", h);
        e.registerProcessorFunction("MODE.SNGL", k);
        return {MULT: h, SNGL: k}
    });
    n(e, "Data/Formula/Functions/NOT.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(c, e) {
            c = h(c[0], e);
            "object" === typeof c && (c = c[0]);
            switch (typeof c) {
                case "boolean":
                case "number":
                    return !c
            }
            return NaN
        }

        var h = e.getArgumentValue;
        e.registerProcessorFunction("NOT", c);
        return c
    });
    n(e, "Data/Formula/Functions/OR.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(e, g) {
            for (var d = 0, b = e.length, a; d < b; ++d) if (a = h(e[d], g), "object" === typeof a) {
                if (c(a, g)) return !0
            } else if (a) return !0;
            return !1
        }

        var h = e.getArgumentValue;
        e.registerProcessorFunction("OR", c);
        return c
    });
    n(e, "Data/Formula/Functions/PRODUCT.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(e, g) {
            e = h(e, g);
            for (var d = 1, b = !1, a = 0,
                     f = e.length, l; a < f; ++a) switch (l = e[a], typeof l) {
                case "number":
                    isNaN(l) || (b = !0, d *= l);
                    break;
                case "object":
                    b = !0, d *= c(l, g)
            }
            return b ? d : 0
        }

        var h = e.getArgumentsValues;
        e.registerProcessorFunction("PRODUCT", c);
        return c
    });
    n(e, "Data/Formula/Functions/SUM.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(h, k) {
            h = e.getArgumentsValues(h, k);
            for (var g = 0, d = 0, b = h.length, a; d < b; ++d) switch (a = h[d], typeof a) {
                case "number":
                    isNaN(a) || (g += a);
                    break;
                case "object":
                    g += c(a, k)
            }
            return g
        }

        e.registerProcessorFunction("SUM",
            c);
        return c
    });
    n(e, "Data/Formula/Functions/XOR.js", [e["Data/Formula/FormulaProcessor.js"]], function (e) {
        function c(c, e) {
            for (var d = 0, b = c.length, a = void 0, f; d < b; ++d) switch (f = h(c[d], e), typeof f) {
                case "boolean":
                case "number":
                    if ("undefined" === typeof a) a = !!f; else if (!!f !== a) return !0;
                    break;
                case "object":
                    for (var l = 0, p = f.length, g; l < p; ++l) switch (g = f[l], typeof g) {
                        case "boolean":
                        case "number":
                            if ("undefined" === typeof a) a = !!g; else if (!!g !== a) return !0
                    }
            }
            return !1
        }

        var h = e.getArgumentValue;
        e.registerProcessorFunction("XOR",
            c);
        return c
    });
    n(e, "Data/Formula/Formula.js", [e["Data/Formula/FormulaParser.js"], e["Data/Formula/FormulaProcessor.js"], e["Data/Formula/FormulaTypes.js"]], function (e, c, m) {
        var h = this && this.__assign || function () {
            h = Object.assign || function (c) {
                for (var d, b = 1, a = arguments.length; b < a; b++) {
                    d = arguments[b];
                    for (var f in d) Object.prototype.hasOwnProperty.call(d, f) && (c[f] = d[f])
                }
                return c
            };
            return h.apply(this, arguments)
        };
        return h(h(h({}, e), c), m)
    });
    n(e, "Data/Converters/CSVConverter.js", [e["Data/Converters/DataConverter.js"],
        e["Core/Utilities.js"]], function (e, c) {
        var h = this && this.__extends || function () {
            var d = function (b, a) {
                d = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                    a.__proto__ = b
                } || function (a, b) {
                    for (var f in b) Object.prototype.hasOwnProperty.call(b, f) && (a[f] = b[f])
                };
                return d(b, a)
            };
            return function (b, a) {
                function f() {
                    this.constructor = b
                }

                if ("function" !== typeof a && null !== a) throw new TypeError("Class extends value " + String(a) + " is not a constructor or null");
                d(b, a);
                b.prototype = null === a ? Object.create(a) :
                    (f.prototype = a.prototype, new f)
            }
        }(), k = this && this.__assign || function () {
            k = Object.assign || function (d) {
                for (var b, a = 1, f = arguments.length; a < f; a++) {
                    b = arguments[a];
                    for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (d[c] = b[c])
                }
                return d
            };
            return k.apply(this, arguments)
        }, g = c.merge;
        return function (d) {
            function b(a) {
                var f = g(b.defaultOptions, a);
                a = d.call(this, f) || this;
                a.columns = [];
                a.headers = [];
                a.dataTypes = [];
                a.options = f;
                return a
            }

            h(b, d);
            b.prototype.export = function (a, b) {
                void 0 === b && (b = this.options);
                var f = b.useLocalDecimalPoint,
                    d = b.lineDelimiter, c = !1 !== this.options.firstRowAsNames, e = b.decimalPoint,
                    g = b.itemDelimiter;
                e || (e = "," !== g && f ? (1.1).toLocaleString()[1] : ".");
                g || (g = "," === e ? ";" : ",");
                b = a.getSortedColumns(b.usePresentationOrder);
                f = Object.keys(b);
                var h = [], k = f.length, m = [];
                c && h.push(f.map(function (a) {
                    return '"'.concat(a, '"')
                }).join(g));
                for (c = 0; c < k; c++) {
                    var n = f[c], v = b[n], w = v.length, q = a.whatIs(n);
                    n = void 0;
                    q && (n = q.dataType);
                    for (q = 0; q < w; q++) {
                        var x = v[q];
                        m[q] || (m[q] = []);
                        "string" === n ? x = '"' + x + '"' : "number" === typeof x ? x = String(x).replace(".",
                            e) : "string" === typeof x && (x = '"'.concat(x, '"'));
                        m[q][c] = x;
                        if (c === k - 1) {
                            for (x = c; 2 < m[q].length && void 0 === m[q][x];) m[q].pop(), x--;
                            h.push(m[q].join(g))
                        }
                    }
                }
                return h.join(d)
            };
            b.prototype.parse = function (a, b) {
                var f = this.dataTypes, d = g(this.options, a), c = d.beforeParse, e = d.lineDelimiter,
                    h = d.firstRowAsNames, k = d.itemDelimiter, m = d.csv;
                a = d.startRow;
                d = d.endRow;
                this.columns = [];
                this.emit({type: "parse", columns: this.columns, detail: b, headers: this.headers});
                m && c && (m = c(m));
                if (m) {
                    c = m.replace(/\r\n|\r/g, "\n").split(e || "\n");
                    if (!a ||
                        0 > a) a = 0;
                    if (!d || d >= c.length) d = c.length - 1;
                    k || (this.guessedItemDelimiter = this.guessDelimiter(c));
                    if (h) {
                        k = c[0].split(k || this.guessedItemDelimiter || ",");
                        for (h = 0; h < k.length; h++) k[h] = k[h].replace(/^["']|["']$/g, "");
                        this.headers = k;
                        a++
                    }
                    k = 0;
                    for (h = a; h <= d; h++) "#" === c[h][0] ? k++ : this.parseCSVRow(c[h], h - a - k);
                    f.length && f[0].length && "date" === f[0][1] && !this.options.dateFormat && this.deduceDateFormat(this.columns[0], null, !0);
                    h = 0;
                    for (a = this.columns.length; h < a; ++h) for (f = this.columns[h], d = 0, k = f.length; d < k; ++d) f[d] && "string" ===
                    typeof f[d] && (c = this.asGuessedType(f[d]), c instanceof Date && (c = c.getTime()), this.columns[h][d] = c)
                }
                this.emit({type: "afterParse", columns: this.columns, detail: b, headers: this.headers})
            };
            b.prototype.parseCSVRow = function (a, b) {
                var f = this, d = f.columns || [], c = f.dataTypes, e = f.options, g = e.startColumn, h = e.endColumn;
                e = f.options.itemDelimiter || f.guessedItemDelimiter;
                var k = f.options.decimalPoint;
                k && k !== e || (k = f.guessedDecimalPoint || ".");
                var m = 0, n = "", v = "", w = "", q = "", x = 0, y = 0, B = function (b) {
                    n = a[b];
                    v = a[b - 1];
                    w = a[b + 1]
                }, D = function (a) {
                    c.length <
                    y + 1 && c.push([a]);
                    c[y][c[y].length - 1] !== a && c[y].push(a)
                }, E = function () {
                    if (g > x || x > h) ++x, q = ""; else {
                        "string" === typeof q ? !isNaN(parseFloat(q)) && isFinite(q) ? (q = parseFloat(q), D("number")) : isNaN(Date.parse(q)) ? D("string") : (q = q.replace(/\//g, "-"), D("date")) : D("number");
                        d.length < y + 1 && d.push([]);
                        if ("number" !== typeof q && "number" !== f.guessType(q) && k) {
                            var a = q;
                            q = q.replace(k, ".");
                            "number" !== f.guessType(q) && (q = a)
                        }
                        d[y][b] = q;
                        q = "";
                        ++y;
                        ++x
                    }
                };
                if (a.trim().length && "#" !== a.trim()[0]) {
                    for (; m < a.length; m++) {
                        B(m);
                        if ("#" === n &&
                            !/^#[0-F]{3,3}|[0-F]{6,6}/i.test(a.substring(m))) {
                            E();
                            return
                        }
                        if ('"' === n) for (B(++m); m < a.length && ('"' !== n || '"' === v || '"' === w);) {
                            if ('"' !== n || '"' === n && '"' !== v) q += n;
                            B(++m)
                        } else n === e ? E() : q += n
                    }
                    E()
                }
            };
            b.prototype.guessDelimiter = function (a) {
                for (var b = 0, d = 0, c = {",": 0, ";": 0, "\t": 0}, e = a.length, g = 0; g < e; g++) {
                    var h = !1, k = "";
                    if (13 < g) break;
                    for (var m = a[g], n = 0; n < m.length; n++) {
                        var t = m[n];
                        var v = m[n + 1];
                        var w = m[n - 1];
                        if ("#" === t) break;
                        if ('"' === t) if (h) {
                            if ('"' !== w && '"' !== v) {
                                for (; " " === v && n < m.length;) v = m[++n];
                                "undefined" !== typeof c[v] &&
                                c[v]++;
                                h = !1
                            }
                        } else h = !0; else "undefined" !== typeof c[t] ? (k = k.trim(), isNaN(Date.parse(k)) ? !isNaN(Number(k)) && isFinite(Number(k)) || c[t]++ : c[t]++, k = "") : k += t;
                        "," === t && d++;
                        "." === t && b++
                    }
                }
                a = c[";"] > c[","] ? ";" : ",";
                this.guessedDecimalPoint = b > d ? "." : ",";
                return a
            };
            b.prototype.getTable = function () {
                return e.getTableFromColumns(this.columns, this.headers)
            };
            b.defaultOptions = k(k({}, e.defaultOptions), {lineDelimiter: "\n"});
            return b
        }(e)
    });
    n(e, "Data/Connectors/CSVConnector.js", [e["Data/Converters/CSVConverter.js"], e["Data/Connectors/DataConnector.js"],
        e["Core/Utilities.js"]], function (e, c, m) {
        var h = this && this.__extends || function () {
            var d = function (b, a) {
                d = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                    a.__proto__ = b
                } || function (a, b) {
                    for (var f in b) Object.prototype.hasOwnProperty.call(b, f) && (a[f] = b[f])
                };
                return d(b, a)
            };
            return function (b, a) {
                function f() {
                    this.constructor = b
                }

                if ("function" !== typeof a && null !== a) throw new TypeError("Class extends value " + String(a) + " is not a constructor or null");
                d(b, a);
                b.prototype = null === a ? Object.create(a) :
                    (f.prototype = a.prototype, new f)
            }
        }(), g = m.merge;
        m = function (d) {
            function b(a) {
                var f = g(b.defaultOptions, a);
                a = d.call(this, f) || this;
                a.converter = new e(f);
                a.options = f;
                f.enablePolling && a.startPolling(1E3 * Math.max(f.dataRefreshRate || 0, 1));
                return a
            }

            h(b, d);
            b.prototype.load = function (a) {
                var b = this, d = b.converter, c = b.table, e = b.options, g = e.csv;
                e = e.csvURL;
                if (g) c.deleteRows(), b.emit({
                    type: "load",
                    csv: g,
                    detail: a,
                    table: c
                }), d.parse({csv: g}), c.setColumns(d.getTable().getColumns()), b.emit({
                    type: "afterLoad", csv: g, detail: a,
                    table: c
                }); else {
                    if (e) return b.table.deleteColumns(), b.emit({
                        type: "load",
                        detail: a,
                        table: b.table
                    }), fetch(e || "").then(function (f) {
                        return f.text().then(function (f) {
                            b.converter.parse({csv: f});
                            b.table.setColumns(b.converter.getTable().getColumns());
                            b.emit({type: "afterLoad", csv: f, detail: a, table: b.table})
                        })
                    })["catch"](function (f) {
                        b.emit({type: "loadError", detail: a, error: f, table: b.table});
                        return Promise.reject(f)
                    }).then(function () {
                        return b
                    });
                    b.emit({
                        type: "loadError", detail: a, error: "Unable to load: no CSV string or URL was provided",
                        table: c
                    })
                }
                return Promise.resolve(b)
            };
            b.defaultOptions = {csv: "", csvURL: "", enablePolling: !1, dataRefreshRate: 1};
            return b
        }(c);
        c.registerType("CSV", m);
        return m
    });
    n(e, "Data/Converters/GoogleSheetsConverter.js", [e["Data/Converters/DataConverter.js"], e["Core/Utilities.js"]], function (e, c) {
        var h = this && this.__extends || function () {
                var b = function (a, f) {
                    b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                        a.__proto__ = b
                    } || function (a, b) {
                        for (var f in b) Object.prototype.hasOwnProperty.call(b, f) && (a[f] =
                            b[f])
                    };
                    return b(a, f)
                };
                return function (a, f) {
                    function c() {
                        this.constructor = a
                    }

                    if ("function" !== typeof f && null !== f) throw new TypeError("Class extends value " + String(f) + " is not a constructor or null");
                    b(a, f);
                    a.prototype = null === f ? Object.create(f) : (c.prototype = f.prototype, new c)
                }
            }(), k = this && this.__assign || function () {
                k = Object.assign || function (b) {
                    for (var a, f = 1, c = arguments.length; f < c; f++) {
                        a = arguments[f];
                        for (var d in a) Object.prototype.hasOwnProperty.call(a, d) && (b[d] = a[d])
                    }
                    return b
                };
                return k.apply(this, arguments)
            },
            g = c.merge, d = c.uniqueKey;
        return function (b) {
            function a(f) {
                var c = g(a.defaultOptions, f);
                f = b.call(this, c) || this;
                f.columns = [];
                f.header = [];
                f.options = c;
                return f
            }

            h(a, b);
            a.prototype.parse = function (a, b) {
                a = g(this.options, a);
                var f = (a.json && a.json.values || []).map(function (a) {
                    return a.slice()
                });
                if (0 === f.length) return !1;
                this.header = [];
                this.columns = [];
                this.emit({type: "parse", columns: this.columns, detail: b, headers: this.header});
                this.columns = f;
                for (var c, e = 0, l = f.length; e < l; e++) {
                    c = f[e];
                    this.header[e] = a.firstRowAsNames ?
                        "".concat(c.shift()) : d();
                    for (var h = 0, k = c.length; h < k; ++h) if (c[h] && "string" === typeof c[h]) {
                        var m = this.asGuessedType(c[h]);
                        m instanceof Date && (m = m.getTime());
                        this.columns[e][h] = m
                    }
                }
                this.emit({type: "afterParse", columns: this.columns, detail: b, headers: this.header})
            };
            a.prototype.getTable = function () {
                return e.getTableFromColumns(this.columns, this.header)
            };
            a.defaultOptions = k({}, e.defaultOptions);
            return a
        }(e)
    });
    n(e, "Data/Connectors/GoogleSheetsConnector.js", [e["Data/Connectors/DataConnector.js"], e["Data/Converters/GoogleSheetsConverter.js"],
        e["Core/Utilities.js"]], function (e, c, m) {
        var h = this && this.__extends || function () {
            var b = function (a, f) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                    a.__proto__ = b
                } || function (a, b) {
                    for (var f in b) Object.prototype.hasOwnProperty.call(b, f) && (a[f] = b[f])
                };
                return b(a, f)
            };
            return function (a, f) {
                function c() {
                    this.constructor = a
                }

                if ("function" !== typeof f && null !== f) throw new TypeError("Class extends value " + String(f) + " is not a constructor or null");
                b(a, f);
                a.prototype = null === f ? Object.create(f) :
                    (c.prototype = f.prototype, new c)
            }
        }(), g = m.merge, d = m.pick;
        m = function (b) {
            function a(f) {
                var d = g(a.defaultOptions, f);
                f = b.call(this, d) || this;
                f.converter = new c(d);
                f.options = d;
                return f
            }

            h(a, b);
            a.prototype.load = function (b) {
                var f = this, c = f.options, d = c.dataRefreshRate, e = c.enablePolling, g = c.firstRowAsNames,
                    h = a.buildFetchURL(c.googleAPIKey, c.googleSpreadsheetKey, f.options);
                f.table.deleteColumns();
                f.emit({type: "load", detail: b, table: f.table, url: h});
                return fetch(h).then(function (a) {
                    return a.json().then(function (a) {
                        if ("object" ===
                            typeof a && a && "object" === typeof a.error && a.error && "number" === typeof a.error.code && "string" === typeof a.error.message && "string" === typeof a.error.status) throw Error(a.error.message);
                        f.converter.parse({firstRowAsNames: g, json: a});
                        f.table.setColumns(f.converter.getTable().getColumns());
                        f.emit({type: "afterLoad", detail: b, table: f.table, url: h});
                        e && setTimeout(function () {
                            return f.load()
                        }, 1E3 * Math.max(d || 0, 1))
                    })
                })["catch"](function (a) {
                    f.emit({type: "loadError", detail: b, error: a, table: f.table});
                    return Promise.reject(a)
                }).then(function () {
                    return f
                })
            };
            a.defaultOptions = {
                googleAPIKey: "",
                googleSpreadsheetKey: "",
                worksheet: 1,
                enablePolling: !1,
                dataRefreshRate: 2,
                firstRowAsNames: !0
            };
            return a
        }(e);
        (function (b) {
            function a(a) {
                void 0 === a && (a = {});
                var b = a.endColumn, f = a.endRow, c = a.startColumn, e = a.startRow;
                return a.googleSpreadsheetRange || ("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[c || 0] || "A") + (Math.max(e || 0, 0) + 1) + ":" + ("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[d(b, 25)] || "Z") + (f ? Math.max(f, 0) : "Z")
            }

            b.buildFetchURL = function (b, c, d) {
                void 0 === d && (d = {});
                return "https://sheets.googleapis.com/v4/spreadsheets/".concat(c,
                    "/values/") + (d.onlyColumnNames ? "A1:Z1" : a(d)) + "?alt=json" + (d.onlyColumnNames ? "" : "&dateTimeRenderOption=FORMATTED_STRING&majorDimension=COLUMNS&valueRenderOption=UNFORMATTED_VALUE") + "&prettyPrint=false" + "&key=".concat(b)
            };
            b.buildQueryRange = a
        })(m || (m = {}));
        e.registerType("GoogleSheets", m);
        return m
    });
    n(e, "Data/Converters/HTMLTableConverter.js", [e["Data/Converters/DataConverter.js"], e["Core/Utilities.js"]], function (e, c) {
        var h = this && this.__extends || function () {
            var c = function (b, a) {
                c = Object.setPrototypeOf ||
                    {__proto__: []} instanceof Array && function (a, b) {
                        a.__proto__ = b
                    } || function (a, b) {
                        for (var f in b) Object.prototype.hasOwnProperty.call(b, f) && (a[f] = b[f])
                    };
                return c(b, a)
            };
            return function (b, a) {
                function f() {
                    this.constructor = b
                }

                if ("function" !== typeof a && null !== a) throw new TypeError("Class extends value " + String(a) + " is not a constructor or null");
                c(b, a);
                b.prototype = null === a ? Object.create(a) : (f.prototype = a.prototype, new f)
            }
        }(), k = this && this.__assign || function () {
            k = Object.assign || function (c) {
                for (var b, a = 1, f = arguments.length; a <
                f; a++) {
                    b = arguments[a];
                    for (var d in b) Object.prototype.hasOwnProperty.call(b, d) && (c[d] = b[d])
                }
                return c
            };
            return k.apply(this, arguments)
        }, g = c.merge;
        return function (c) {
            function b(a) {
                var f = g(b.defaultOptions, a);
                a = c.call(this, f) || this;
                a.columns = [];
                a.headers = [];
                a.options = f;
                f.tableElement && (a.tableElement = f.tableElement, a.tableElementID = f.tableElement.id);
                return a
            }

            h(b, c);
            b.prototype.export = function (a, b) {
                void 0 === b && (b = this.options);
                var f = !1 !== b.firstRowAsNames, c = b.useMultiLevelHeaders,
                    d = a.getSortedColumns(b.usePresentationOrder),
                    e = Object.keys(d);
                a = [];
                var g = e.length, h = [], k = "";
                if (f) if (k = [], c) {
                    for (c = 0; c < e.length; c++) f = (d[e[c]].shift() || "").toString(), k.push(f);
                    k = this.getTableHeaderHTML(e, k, b)
                } else k = this.getTableHeaderHTML(void 0, e, b);
                for (c = 0; c < g; c++) {
                    f = d[e[c]];
                    for (var m = f.length, n = 0; n < m; n++) {
                        var v = f[n];
                        h[n] || (h[n] = []);
                        "string" !== typeof v && "number" !== typeof v && "undefined" !== typeof v && (v = (v || "").toString());
                        h[n][c] = this.getCellHTMLFromValue(c ? "td" : "th", null, c ? "" : 'scope="row"', v);
                        c === g - 1 && a.push("<tr>" + h[n].join("") + "</tr>")
                    }
                }
                d =
                    "";
                b.tableCaption && (d = '<caption class="highcharts-table-caption">' + b.tableCaption + "</caption>");
                return "<table>" + d + k + "<tbody>" + a.join("") + "</tbody></table>"
            };
            b.prototype.getCellHTMLFromValue = function (a, b, c, d, e) {
                var f = d;
                b = "text" + (b ? " " + b : "");
                "number" === typeof f ? (f = f.toString(), "," === e && (f = f.replace(".", e)), b = "number") : d || (f = "", b = "empty");
                return "<" + a + (c ? " " + c : "") + ' class="' + b + '">' + f + "</" + a + ">"
            };
            b.prototype.getTableHeaderHTML = function (a, b, c) {
                void 0 === a && (a = []);
                void 0 === b && (b = []);
                void 0 === c && (c = this.options);
                var f = c.useMultiLevelHeaders, d = c.useRowspanHeaders;
                c.useLocalDecimalPoint && (1.1).toLocaleString();
                c = "<thead>";
                var e = 0, g = b && b.length, l = 0;
                if (f = f && a && b) {
                    a:if (f = a.length, b.length === f) {
                        for (; --f;) if (a[f] !== b[f]) {
                            f = !1;
                            break a
                        }
                        f = !0
                    } else f = !1;
                    f = !f
                }
                if (f) {
                    for (c += "<tr>"; e < g; ++e) {
                        f = a[e];
                        var h = a[e + 1];
                        f === h ? ++l : l ? (c += this.getCellHTMLFromValue("th", "highcharts-table-topheading", 'scope="col" colspan="' + (l + 1) + '"', f), l = 0) : (f === b[e] ? d ? (h = 2, delete b[e]) : (h = 1, b[e] = "") : h = 1, c += this.getCellHTMLFromValue("th", "highcharts-table-topheading",
                            'scope="col"' + (1 < h ? ' valign="top" rowspan="' + h + '"' : ""), f))
                    }
                    c += "</tr>"
                }
                if (b) {
                    c += "<tr>";
                    e = 0;
                    for (g = b.length; e < g; ++e) "undefined" !== typeof b[e] && (c += this.getCellHTMLFromValue("th", null, 'scope="col"', b[e]));
                    c += "</tr>"
                }
                return c + "</thead>"
            };
            b.prototype.parse = function (a, b) {
                var f = [], c = [], d = g(this.options, a);
                a = d.endRow;
                var e = d.startColumn, h = d.endColumn, k = d.firstRowAsNames, m = d.tableElement || this.tableElement;
                if (m instanceof HTMLElement) {
                    this.tableElement = m;
                    this.tableElementID = m.id;
                    this.emit({
                        type: "parse", columns: this.columns,
                        detail: b, headers: this.headers
                    });
                    m = m.getElementsByTagName("tr");
                    var n = m.length, t = 0;
                    d = d.startRow;
                    if (k && n) {
                        for (var v = m[0].children, w = v.length, q = e; q < w && !(q > h); q++) k = v[q], "TD" !== k.tagName && "TH" !== k.tagName || c.push(k.innerHTML);
                        d++
                    }
                    for (; t < n;) {
                        if (t >= d && t <= a) {
                            v = m[t].children;
                            w = v.length;
                            for (var x = 0; x < w;) {
                                q = x - e;
                                var y = f[q];
                                k = v[x];
                                if (("TD" === k.tagName || "TH" === k.tagName) && x >= e && x <= h) for (f[q] || (f[q] = []), k = this.asGuessedType(k.innerHTML), k instanceof Date && (k = k.getTime()), f[q][t - d] = k, q = 1; t - d >= q && void 0 === y[t - d -
                                q];) y[t - d - q] = null, q++;
                                x++
                            }
                        }
                        t++
                    }
                    this.columns = f;
                    this.headers = c;
                    this.emit({type: "afterParse", columns: f, detail: b, headers: c})
                } else this.emit({
                    type: "parseError",
                    columns: f,
                    detail: b,
                    headers: c,
                    error: "Not a valid HTML Table"
                })
            };
            b.prototype.getTable = function () {
                return e.getTableFromColumns(this.columns, this.headers)
            };
            b.defaultOptions = k(k({}, e.defaultOptions), {useRowspanHeaders: !0, useMultiLevelHeaders: !0});
            return b
        }(e)
    });
    n(e, "Data/Connectors/HTMLTableConnector.js", [e["Data/Connectors/DataConnector.js"], e["Core/Globals.js"],
        e["Data/Converters/HTMLTableConverter.js"], e["Core/Utilities.js"]], function (e, c, m, k) {
        var g = this && this.__extends || function () {
            var a = function (b, c) {
                a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                    a.__proto__ = b
                } || function (a, b) {
                    for (var f in b) Object.prototype.hasOwnProperty.call(b, f) && (a[f] = b[f])
                };
                return a(b, c)
            };
            return function (b, c) {
                function f() {
                    this.constructor = b
                }

                if ("function" !== typeof c && null !== c) throw new TypeError("Class extends value " + String(c) + " is not a constructor or null");
                a(b, c);
                b.prototype = null === c ? Object.create(c) : (f.prototype = c.prototype, new f)
            }
        }(), d = c.win, b = k.merge;
        c = function (a) {
            function f(c) {
                var d = b(f.defaultOptions, c);
                c = a.call(this, d) || this;
                c.converter = new m(d);
                c.options = d;
                return c
            }

            g(f, a);
            f.prototype.load = function (a) {
                this.table.deleteColumns();
                this.emit({type: "load", detail: a, table: this.table, tableElement: this.tableElement});
                var f = this.options.table;
                "string" === typeof f ? (this.tableID = f, f = d.document.getElementById(f)) : this.tableID = f.id;
                this.tableElement = f || void 0;
                if (!this.tableElement) return this.emit({
                    type: "loadError",
                    detail: a,
                    error: "HTML table not provided, or element with ID not found",
                    table: this.table
                }), Promise.reject(Error("HTML table not provided, or element with ID not found"));
                this.converter.parse(b({tableElement: this.tableElement}, this.options), a);
                this.table.setColumns(this.converter.getTable().getColumns());
                this.emit({type: "afterLoad", detail: a, table: this.table, tableElement: this.tableElement});
                return Promise.resolve(this)
            };
            f.defaultOptions = {table: ""};
            return f
        }(e);
        e.registerType("HTMLTable", c);
        return c
    });
    n(e, "Data/Modifiers/ChainModifier.js", [e["Data/Modifiers/DataModifier.js"], e["Core/Utilities.js"]], function (e, c) {
        var h = this && this.__extends || function () {
            var c = function (d, b) {
                c = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                    a.__proto__ = b
                } || function (a, b) {
                    for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
                };
                return c(d, b)
            };
            return function (d, b) {
                function a() {
                    this.constructor = d
                }

                if ("function" !== typeof b && null !== b) throw new TypeError("Class extends value " +
                    String(b) + " is not a constructor or null");
                c(d, b);
                d.prototype = null === b ? Object.create(b) : (a.prototype = b.prototype, new a)
            }
        }(), k = c.merge;
        c = function (c) {
            function d(b) {
                for (var a = [], f = 1; f < arguments.length; f++) a[f - 1] = arguments[f];
                f = c.call(this) || this;
                f.chain = a;
                f.options = k(d.defaultOptions, b);
                for (var g = f.options.chain || [], h = 0, m = g.length, n; h < m; ++h) (n = e.types[g[h].modifier]) && a.unshift(new n(g[h]));
                return f
            }

            h(d, c);
            d.prototype.add = function (b, a) {
                this.emit({type: "addModifier", detail: a, modifier: b});
                this.chain.push(b);
                this.emit({type: "addModifier", detail: a, modifier: b})
            };
            d.prototype.clear = function (b) {
                this.emit({type: "clearChain", detail: b});
                this.chain.length = 0;
                this.emit({type: "afterClearChain", detail: b})
            };
            d.prototype.modify = function (b, a) {
                for (var c = this, d = this.options.reverse ? this.chain.slice().reverse() : this.chain.slice(), e = Promise.resolve(b), g = function (b, c) {
                    var f = d[b];
                    e = e.then(function (b) {
                        return f.modify(b.modified, a)
                    })
                }, h = 0, k = d.length; h < k; ++h) g(h, k);
                e = e.then(function (a) {
                    b.modified = a.modified;
                    return b
                });
                return e =
                    e["catch"](function (f) {
                        c.emit({type: "error", detail: a, table: b});
                        throw f;
                    })
            };
            d.prototype.modifyCell = function (b, a, c, d, e) {
                var f = this.options.reverse ? this.chain.reverse() : this.chain;
                if (f.length) {
                    for (var g = b.clone(), h = 0, l = f.length; h < l; ++h) f[h].modifyCell(g, a, c, d, e), g = g.modified;
                    b.modified = g
                }
                return b
            };
            d.prototype.modifyColumns = function (b, a, c, d) {
                var f = this.options.reverse ? this.chain.reverse() : this.chain.slice();
                if (f.length) {
                    for (var e = b.clone(), g = 0, h = f.length; g < h; ++g) f[g].modifyColumns(e, a, c, d), e = e.modified;
                    b.modified = e
                }
                return b
            };
            d.prototype.modifyRows = function (b, a, c, d) {
                var f = this.options.reverse ? this.chain.reverse() : this.chain.slice();
                if (f.length) {
                    for (var e = b.clone(), g = 0, h = f.length; g < h; ++g) f[g].modifyRows(e, a, c, d), e = e.modified;
                    b.modified = e
                }
                return b
            };
            d.prototype.modifyTable = function (b, a) {
                this.emit({type: "modify", detail: a, table: b});
                for (var c = this.options.reverse ? this.chain.reverse() : this.chain.slice(), d = b.modified, e = 0, g = c.length, h; e < g; ++e) h = c[e], d = h.modifyTable(d, a).modified;
                b.modified = d;
                this.emit({
                    type: "afterModify",
                    detail: a, table: b
                });
                return b
            };
            d.prototype.remove = function (b, a) {
                var c = this.chain;
                this.emit({type: "removeModifier", detail: a, modifier: b});
                c.splice(c.indexOf(b), 1);
                this.emit({type: "afterRemoveModifier", detail: a, modifier: b})
            };
            d.defaultOptions = {modifier: "Chain"};
            return d
        }(e);
        e.registerType("Chain", c);
        return c
    });
    n(e, "Data/Modifiers/InvertModifier.js", [e["Data/Modifiers/DataModifier.js"], e["Core/Utilities.js"]], function (e, c) {
        var h = this && this.__extends || function () {
            var c = function (d, b) {
                c = Object.setPrototypeOf ||
                    {__proto__: []} instanceof Array && function (a, b) {
                        a.__proto__ = b
                    } || function (a, b) {
                        for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
                    };
                return c(d, b)
            };
            return function (d, b) {
                function a() {
                    this.constructor = d
                }

                if ("function" !== typeof b && null !== b) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                c(d, b);
                d.prototype = null === b ? Object.create(b) : (a.prototype = b.prototype, new a)
            }
        }(), k = c.merge;
        c = function (c) {
            function d(b) {
                var a = c.call(this) || this;
                a.options = k(d.defaultOptions,
                    b);
                return a
            }

            h(d, c);
            d.prototype.modifyCell = function (b, a, c, d, e) {
                var f = b.modified;
                a = f.getRowIndexBy("columnNames", a);
                "undefined" === typeof a ? f.setColumns(this.modifyTable(b.clone()).getColumns(), void 0, e) : f.setCell("".concat(c), a, d, e);
                return b
            };
            d.prototype.modifyColumns = function (b, a, c, d) {
                var f = b.modified, e = f.getColumn("columnNames") || [], g = b.getColumnNames(),
                    h = b.getRowCount() !== e.length;
                if (!h) for (var k = 0, l = g.length; k < l; ++k) if (g[k] !== e[k]) {
                    h = !0;
                    break
                }
                if (h) return this.modifyTable(b, d);
                g = Object.keys(a);
                k =
                    0;
                for (l = g.length; k < l; ++k) {
                    h = g[k];
                    e = a[h];
                    h = f.getRowIndexBy("columnNames", h) || f.getRowCount();
                    for (var m = 0, n = c, v = e.length; m < v; ++m, ++n) f.setCell("".concat(n), h, e[m], d)
                }
                return b
            };
            d.prototype.modifyRows = function (b, a, c, d) {
                var f = b.getColumnNames(), e = b.modified, g = e.getColumn("columnNames") || [],
                    h = b.getRowCount() !== g.length;
                if (!h) for (var k = 0, l = f.length; k < l; ++k) if (f[k] !== g[k]) {
                    h = !0;
                    break
                }
                if (h) return this.modifyTable(b, d);
                k = 0;
                for (l = a.length; k < l; ++k, ++c) if (g = a[k], g instanceof Array) e.setColumn("".concat(c), g);
                else {
                    h = 0;
                    for (var m = f.length; h < m; ++h) e.setCell("".concat(c), h, g[f[h]], d)
                }
                return b
            };
            d.prototype.modifyTable = function (b, a) {
                this.emit({type: "modify", detail: a, table: b});
                var c = b.modified;
                if (b.hasColumns(["columnNames"])) for (var d = ((b.deleteColumns(["columnNames"]) || {}).columnNames || []).map(function (a) {
                    return "".concat(a)
                }), e = {}, g = 0, h = b.getRowCount(), k = void 0; g < h; ++g) (k = b.getRow(g)) && (e[d[g]] = k); else {
                    e = {};
                    g = 0;
                    h = b.getRowCount();
                    for (k = void 0; g < h; ++g) (k = b.getRow(g)) && (e["".concat(g)] = k);
                    e.columnNames = b.getColumnNames()
                }
                c.deleteColumns();
                c.setColumns(e);
                this.emit({type: "afterModify", detail: a, table: b});
                return b
            };
            d.defaultOptions = {modifier: "Invert"};
            return d
        }(e);
        e.registerType("Invert", c);
        return c
    });
    n(e, "Data/Modifiers/MathModifier.js", [e["Data/Modifiers/DataModifier.js"], e["Data/Formula/FormulaParser.js"], e["Data/Formula/FormulaProcessor.js"]], function (e, c, m) {
        var h = this && this.__extends || function () {
            var b = function (a, c) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                    a.__proto__ = b
                } || function (a, b) {
                    for (var c in b) Object.prototype.hasOwnProperty.call(b,
                        c) && (a[c] = b[c])
                };
                return b(a, c)
            };
            return function (a, c) {
                function f() {
                    this.constructor = a
                }

                if ("function" !== typeof c && null !== c) throw new TypeError("Class extends value " + String(c) + " is not a constructor or null");
                b(a, c);
                a.prototype = null === c ? Object.create(c) : (f.prototype = c.prototype, new f)
            }
        }(), g = this && this.__assign || function () {
            g = Object.assign || function (b) {
                for (var a, c = 1, d = arguments.length; c < d; c++) {
                    a = arguments[c];
                    for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (b[e] = a[e])
                }
                return b
            };
            return g.apply(this,
                arguments)
        }, d = function (b) {
            function a(c) {
                var f = b.call(this) || this;
                f.options = g(g({}, a.defaultOptions), c);
                return f
            }

            h(a, b);
            a.prototype.modifyTable = function (a, b) {
                this.emit({type: "modify", detail: b, table: a});
                for (var f = this.options.alternativeSeparators, d = this.options.formulaColumns || a.getColumnNames(), e = a.modified, g = 0, h = d.length, k; g < h; ++g) k = d[g], 0 <= d.indexOf(k) && e.setColumn(k, this.processColumn(a, k));
                d = this.options.columnFormulas || [];
                g = 0;
                h = d.length;
                for (var l; g < h; ++g) k = d[g], l = c.parseFormula(k.formula, f),
                    e.setColumn(k.column, this.processColumnFormula(l, a, k.rowStart, k.rowEnd));
                this.emit({type: "afterModify", detail: b, table: a});
                return a
            };
            a.prototype.processColumn = function (a, b, d) {
                void 0 === d && (d = 0);
                var f = this.options.alternativeSeparators;
                b = (a.getColumn(b, !0) || []).slice(0 < d ? d : 0);
                d = 0;
                for (var e = b.length, g = [], h; d < e; ++d) if (h = b[d], "string" === typeof h && "=" === h[0]) try {
                    g = "" === h ? g : c.parseFormula(h.substring(1), f), b[d] = m.processFormula(g, a)
                } catch (r) {
                    b[d] = NaN
                }
                return b
            };
            a.prototype.processColumnFormula = function (a,
                                                         b, c, d) {
                void 0 === c && (c = 0);
                void 0 === d && (d = b.getRowCount());
                c = 0 <= c ? c : 0;
                d = 0 <= d ? d : b.getRowCount() + d;
                var f = [];
                b = b.modified;
                var e = 0;
                for (c = d - c; e < c; ++e) try {
                    f[e] = m.processFormula(a, b)
                } catch (F) {
                    f[e] = NaN
                } finally {
                    a = m.translateReferences(a, 0, 1)
                }
                return f
            };
            a.defaultOptions = {alternativeSeparators: !1, modifier: "Math"};
            return a
        }(e);
        e.registerType("Math", d);
        return d
    });
    n(e, "Data/Modifiers/RangeModifier.js", [e["Data/Modifiers/DataModifier.js"], e["Core/Utilities.js"]], function (e, c) {
        var h = this && this.__extends || function () {
            var c =
                function (d, b) {
                    c = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                        a.__proto__ = b
                    } || function (a, b) {
                        for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
                    };
                    return c(d, b)
                };
            return function (d, b) {
                function a() {
                    this.constructor = d
                }

                if ("function" !== typeof b && null !== b) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                c(d, b);
                d.prototype = null === b ? Object.create(b) : (a.prototype = b.prototype, new a)
            }
        }(), k = c.merge;
        c = function (c) {
            function d(b) {
                var a = c.call(this) ||
                    this;
                a.options = k(d.defaultOptions, b);
                return a
            }

            h(d, c);
            d.prototype.modifyTable = function (b, a) {
                this.emit({type: "modify", detail: a, table: b});
                var c = this.options, d = c.ranges;
                c = c.strict;
                if (d.length) {
                    for (var e = b.getColumns(), g = [], h = b.modified, k = 0, m = d.length, n, u; k < m; ++k) if (n = d[k], !c || typeof n.minValue === typeof n.maxValue) {
                        u = e[n.column] || [];
                        for (var t = 0, v = u.length, w; t < v; ++t) {
                            w = u[t];
                            switch (typeof w) {
                                default:
                                    continue;
                                case "boolean":
                                case "number":
                                case "string":
                            }
                            (!c || typeof w === typeof n.minValue) && w >= n.minValue && w <=
                            n.maxValue && (w = b.getRow(t)) && g.push(w)
                        }
                    }
                    h.deleteRows();
                    h.setRows(g)
                }
                this.emit({type: "afterModify", detail: a, table: b});
                return b
            };
            d.defaultOptions = {modifier: "Range", strict: !1, ranges: []};
            return d
        }(e);
        e.registerType("Range", c);
        return c
    });
    n(e, "Data/Modifiers/SortModifier.js", [e["Data/Modifiers/DataModifier.js"], e["Data/DataTable.js"], e["Core/Utilities.js"]], function (e, c, m) {
        var h = this && this.__extends || function () {
            var c = function (b, a) {
                c = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                    a.__proto__ =
                        b
                } || function (a, b) {
                    for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
                };
                return c(b, a)
            };
            return function (b, a) {
                function d() {
                    this.constructor = b
                }

                if ("function" !== typeof a && null !== a) throw new TypeError("Class extends value " + String(a) + " is not a constructor or null");
                c(b, a);
                b.prototype = null === a ? Object.create(a) : (d.prototype = a.prototype, new d)
            }
        }(), g = m.merge;
        m = function (d) {
            function b(a) {
                var c = d.call(this) || this;
                c.options = g(b.defaultOptions, a);
                return c
            }

            h(b, d);
            b.ascending = function (a, b) {
                return (a ||
                    0) < (b || 0) ? -1 : (a || 0) > (b || 0) ? 1 : 0
            };
            b.descending = function (a, b) {
                return (b || 0) < (a || 0) ? -1 : (b || 0) > (a || 0) ? 1 : 0
            };
            b.prototype.getRowReferences = function (a) {
                a = a.getRows();
                for (var b = [], c = 0, d = a.length; c < d; ++c) b.push({index: c, row: a[c]});
                return b
            };
            b.prototype.modifyCell = function (a, b, d, e, g) {
                var f = this.options, h = f.orderByColumn;
                f = f.orderInColumn;
                b === h && (f ? (a.modified.setCell(b, d, e), a.modified.setColumn(f, this.modifyTable(new c({columns: a.getColumns([h, f])})).modified.getColumn(f))) : this.modifyTable(a, g));
                return a
            };
            b.prototype.modifyColumns =
                function (a, b, d, e) {
                    var f = this.options, g = f.orderByColumn;
                    f = f.orderInColumn;
                    var h = Object.keys(b);
                    -1 < h.indexOf(g) && (f && b[h[0]].length ? (a.modified.setColumns(b, d), a.modified.setColumn(f, this.modifyTable(new c({columns: a.getColumns([g, f])})).modified.getColumn(f))) : this.modifyTable(a, e));
                    return a
                };
            b.prototype.modifyRows = function (a, b, d, e) {
                var f = this.options, g = f.orderByColumn;
                (f = f.orderInColumn) && b.length ? (a.modified.setRows(b, d), a.modified.setColumn(f, this.modifyTable(new c({columns: a.getColumns([g, f])})).modified.getColumn(f))) :
                    this.modifyTable(a, e);
                return a
            };
            b.prototype.modifyTable = function (a, c) {
                var d;
                this.emit({type: "modify", detail: c, table: a});
                var f = a.getColumnNames(), e = a.getRowCount(), g = this.getRowReferences(a), h = this.options,
                    k = h.orderInColumn, m = "asc" === h.direction ? b.ascending : b.descending,
                    n = f.indexOf(h.orderByColumn);
                f = a.modified;
                -1 !== n && g.sort(function (a, b) {
                    return m(a.row[n], b.row[n])
                });
                if (k) {
                    var t = [];
                    for (h = 0; h < e; ++h) t[g[h].index] = h;
                    f.setColumns((d = {}, d[k] = t, d))
                } else {
                    d = [];
                    for (h = 0; h < e; ++h) d.push(g[h].row);
                    f.setRows(d,
                        0)
                }
                this.emit({type: "afterModify", detail: c, table: a});
                return a
            };
            b.defaultOptions = {modifier: "Sort", direction: "desc", orderByColumn: "y"};
            return b
        }(e);
        e.registerType("Sort", m);
        return m
    });
    n(e, "masters/modules/data-tools.src.js", [e["Core/Globals.js"], e["Data/Connectors/DataConnector.js"], e["Data/Converters/DataConverter.js"], e["Data/DataCursor.js"], e["Data/Modifiers/DataModifier.js"], e["Data/DataPool.js"], e["Data/DataTable.js"], e["Data/Formula/Formula.js"]], function (e, c, m, k, g, d, b, a) {
        e.DataConnector = c;
        e.DataConverter =
            m;
        e.DataCursor = k;
        e.DataModifier = g;
        e.DataPool = d;
        e.DataTable = b;
        e.Formula = a
    })
});
//# sourceMappingURL=data-tools.js.map