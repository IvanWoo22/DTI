/*
 Highcharts JS v11.1.0 (2023-06-05)

 Highcharts

 (c) 2010-2023 Highsoft AS

 License: www.highcharts.com/license
*/
'use strict';
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (d) {
    var k = 0;
    return function () {
        return k < d.length ? {done: !1, value: d[k++]} : {done: !0}
    }
};
$jscomp.arrayIterator = function (d) {
    return {next: $jscomp.arrayIteratorImpl(d)}
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (d, k, m) {
    if (d == Array.prototype || d == Object.prototype) return d;
    d[k] = m.value;
    return d
};
$jscomp.getGlobal = function (d) {
    d = ["object" == typeof globalThis && globalThis, d, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var k = 0; k < d.length; ++k) {
        var m = d[k];
        if (m && m.Math == Math) return m
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
$jscomp.SymbolClass = function (d, k) {
    this.$jscomp$symbol$id_ = d;
    $jscomp.defineProperty(this, "description", {configurable: !0, writable: !0, value: k})
};
$jscomp.SymbolClass.prototype.toString = function () {
    return this.$jscomp$symbol$id_
};
$jscomp.Symbol = function () {
    function d(m) {
        if (this instanceof d) throw new TypeError("Symbol is not a constructor");
        return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (m || "") + "_" + k++, m)
    }

    var k = 0;
    return d
}();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var d = $jscomp.global.Symbol.iterator;
    d || (d = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[d] && $jscomp.defineProperty(Array.prototype, d, {
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
    var d = $jscomp.global.Symbol.asyncIterator;
    d || (d = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function () {
    }
};
$jscomp.iteratorPrototype = function (d) {
    $jscomp.initSymbolIterator();
    d = {next: d};
    d[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return d
};
$jscomp.iteratorFromArray = function (d, k) {
    $jscomp.initSymbolIterator();
    d instanceof String && (d += "");
    var m = 0, c = {
        next: function () {
            if (m < d.length) {
                var h = m++;
                return {value: k(h, d[h]), done: !1}
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
var $jscomp$lookupPolyfilledValue = function (d, k) {
    var m = $jscomp.propertyToPolyfillSymbol[k];
    if (null == m) return d[k];
    m = d[m];
    return void 0 !== m ? m : d[k]
};
$jscomp.polyfill = function (d, k, m, c) {
    k && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(d, k, m, c) : $jscomp.polyfillUnisolated(d, k, m, c))
};
$jscomp.polyfillUnisolated = function (d, k, m, c) {
    m = $jscomp.global;
    d = d.split(".");
    for (c = 0; c < d.length - 1; c++) {
        var h = d[c];
        h in m || (m[h] = {});
        m = m[h]
    }
    d = d[d.length - 1];
    c = m[d];
    k = k(c);
    k != c && null != k && $jscomp.defineProperty(m, d, {configurable: !0, writable: !0, value: k})
};
$jscomp.polyfillIsolated = function (d, k, m, c) {
    var h = d.split(".");
    d = 1 === h.length;
    c = h[0];
    c = !d && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var g = 0; g < h.length - 1; g++) {
        var b = h[g];
        b in c || (c[b] = {});
        c = c[b]
    }
    h = h[h.length - 1];
    m = $jscomp.IS_SYMBOL_NATIVE && "es6" === m ? c[h] : null;
    k = k(m);
    null != k && (d ? $jscomp.defineProperty($jscomp.polyfills, h, {
        configurable: !0,
        writable: !0,
        value: k
    }) : k !== m && ($jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + h, h = $jscomp.propertyToPolyfillSymbol[h],
        $jscomp.defineProperty(c, h, {configurable: !0, writable: !0, value: k})))
};
$jscomp.polyfill("Array.prototype.values", function (d) {
    return d ? d : function () {
        return $jscomp.iteratorFromArray(this, function (d, m) {
            return m
        })
    }
}, "es8", "es3");
(function (d) {
    "object" === typeof module && module.exports ? (d["default"] = d, module.exports = d) : "function" === typeof define && define.amd ? define("highcharts/modules/data-tools", ["highcharts"], function (k) {
        d(k);
        d.Highcharts = k;
        return d
    }) : d("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (d) {
    function k(d, c, h, g) {
        d.hasOwnProperty(c) || (d[c] = g.apply(null, h), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: c,
                module: d[c]
            }
        })))
    }

    d = d ? d._modules : {};
    k(d,
        "Data/DataTable.js", [d["Core/Utilities.js"]], function (d) {
            const {addEvent: c, fireEvent: h, uniqueKey: g} = d;

            class b {
                static isNull(a) {
                    if (a === b.NULL) return !0;
                    if (a instanceof Array) {
                        if (!a.length) return !1;
                        for (let f = 0, e = a.length; f < e; ++f) if (null !== a[f]) return !1
                    } else {
                        const f = Object.keys(a);
                        if (!f.length) return !1;
                        for (let e = 0, b = f.length; e < b; ++e) if (null !== a[f[e]]) return !1
                    }
                    return !0
                }

                constructor(a = {}) {
                    this.aliases = {};
                    this.autoId = !a.id;
                    this.columns = {};
                    this.id = a.id || g();
                    this.modified = this;
                    this.rowCount = 0;
                    this.versionTag =
                        g();
                    var f = a.columns || {}, e = Object.keys(f);
                    const b = this.columns;
                    let n = 0;
                    for (let a = 0, l = e.length, c, g; a < l; ++a) g = e[a], c = f[g].slice(), b[g] = c, n = Math.max(n, c.length);
                    for (let a = 0, f = e.length; a < f; ++a) b[e[a]].length = n;
                    this.rowCount = n;
                    a = a.aliases || {};
                    f = Object.keys(a);
                    e = this.aliases;
                    for (let b = 0, l = f.length, n; b < l; ++b) n = f[b], e[n] = a[n]
                }

                clone(a, f) {
                    var e = {};
                    this.emit({type: "cloneTable", detail: f});
                    a || (e.aliases = this.aliases, e.columns = this.columns);
                    this.autoId || (e.id = this.id);
                    e = new b(e);
                    a || (e.versionTag = this.versionTag);
                    this.emit({type: "afterCloneTable", detail: f, tableClone: e});
                    return e
                }

                deleteColumnAlias(a) {
                    const f = this.aliases[a], e = this.modifier;
                    f && (delete this.aliases[a], e && e.modifyColumns(this, {[f]: Array(this.rowCount)}, 0));
                    return f
                }

                deleteColumns(a, f) {
                    const e = this.columns, b = {}, n = {}, c = this.modifier, g = this.rowCount;
                    a = a || Object.keys(e);
                    if (a.length) {
                        this.emit({type: "deleteColumns", columnNames: a, detail: f});
                        for (let f = 0, l = a.length, c, t; f < l; ++f) {
                            t = a[f];
                            if (c = e[t]) b[t] = c, n[t] = Array(g);
                            delete e[t]
                        }
                        Object.keys(e).length || (this.rowCount =
                            0);
                        c && c.modifyColumns(this, n, 0, f);
                        this.emit({type: "afterDeleteColumns", columns: b, columnNames: a, detail: f});
                        return b
                    }
                }

                deleteRows(a, f = 1, e) {
                    const b = [], n = [], c = this.modifier;
                    this.emit({type: "deleteRows", detail: e, rowCount: f, rowIndex: a || 0});
                    "undefined" === typeof a && (a = 0, f = this.rowCount);
                    if (0 < f && a < this.rowCount) {
                        const e = this.columns, l = Object.keys(e);
                        for (let c = 0, t = l.length, g, d; c < t; ++c) {
                            g = e[l[c]];
                            d = g.splice(a, f);
                            c || (this.rowCount = g.length);
                            for (let a = 0, e = d.length; a < e; ++a) b[a] = b[a] || [], b[a][c] = d[a];
                            n.push(Array(t))
                        }
                    }
                    c &&
                    c.modifyRows(this, n, a || 0, e);
                    this.emit({type: "afterDeleteRows", detail: e, rowCount: f, rowIndex: a || 0, rows: b});
                    return b
                }

                emit(a) {
                    switch (a.type) {
                        case "afterDeleteColumns":
                        case "afterDeleteRows":
                        case "afterSetCell":
                        case "afterSetColumns":
                        case "afterSetRows":
                            this.versionTag = g()
                    }
                    h(this, a.type, a)
                }

                getCell(a, f) {
                    a = this.aliases[a] || a;
                    if (a = this.columns[a]) return a[f]
                }

                getCellAsBoolean(a, f) {
                    a = this.aliases[a] || a;
                    a = this.columns[a];
                    return !(!a || !a[f])
                }

                getCellAsNumber(a, f, e) {
                    a = this.aliases[a] || a;
                    f = (a = this.columns[a]) && a[f];
                    switch (typeof f) {
                        case "boolean":
                            return f ? 1 : 0;
                        case "number":
                            return isNaN(f) && !e ? null : f
                    }
                    f = parseFloat(`${f}`);
                    return isNaN(f) && !e ? null : f
                }

                getCellAsString(a, f) {
                    a = this.aliases[a] || a;
                    a = this.columns[a];
                    return `${a && a[f]}`
                }

                getColumn(a, f) {
                    return this.getColumns([a], f)[a]
                }

                getColumnAliases() {
                    const a = this.aliases, f = Object.keys(a), e = {};
                    for (let b = 0, n = f.length, c; b < n; ++b) c = f[b], e[c] = a[c];
                    return e
                }

                getColumnAsNumbers(a, f) {
                    var e = this.columns;
                    a = this.aliases[a] || a;
                    const b = e[a];
                    e = [];
                    if (b) {
                        const l = b.length;
                        if (f) for (f = 0; f <
                        l; ++f) e.push(this.getCellAsNumber(a, f, !0)); else {
                            for (let a = 0, e; a < l; ++a) {
                                e = b[a];
                                if ("number" === typeof e) return b.slice();
                                if (null !== e && "undefined" !== typeof e) break
                            }
                            for (f = 0; f < l; ++f) e.push(this.getCellAsNumber(a, f))
                        }
                    }
                    return e
                }

                getColumnNames() {
                    return Object.keys(this.columns)
                }

                getColumns(a, f) {
                    const e = this.aliases, b = this.columns, n = {};
                    a = a || Object.keys(b);
                    for (let l = 0, c = a.length, g, d; l < c; ++l) d = a[l], (g = b[e[d] || d]) && (n[d] = f ? g : g.slice());
                    return n
                }

                getModifier() {
                    return this.modifier
                }

                getRow(a, f) {
                    return this.getRows(a,
                        1, f)[0]
                }

                getRowCount() {
                    return this.rowCount
                }

                getRowIndexBy(a, f, e) {
                    a = this.aliases[a] || a;
                    if (a = this.columns[a]) if (f = a.indexOf(f, e), -1 !== f) return f
                }

                getRowObject(a, f) {
                    return this.getRowObjects(a, 1, f)[0]
                }

                getRowObjects(a = 0, f = this.rowCount - a, e) {
                    const b = this.aliases, n = this.columns, c = Array(f);
                    e = e || Object.keys(n);
                    for (let l = a, g = 0, d = Math.min(this.rowCount, a + f), t, h; l < d; ++l, ++g) {
                        h = c[g] = {};
                        for (const a of e) t = n[b[a] || a], h[a] = t ? t[l] : void 0
                    }
                    return c
                }

                getRows(a = 0, f = this.rowCount - a, e) {
                    const b = this.aliases, n = this.columns,
                        c = Array(f);
                    e = e || Object.keys(n);
                    for (let l = a, g = 0, d = Math.min(this.rowCount, a + f), t, h; l < d; ++l, ++g) {
                        h = c[g] = [];
                        for (const a of e) t = n[b[a] || a], h.push(t ? t[l] : void 0)
                    }
                    return c
                }

                getVersionTag() {
                    return this.versionTag
                }

                hasColumns(a) {
                    const b = this.aliases, e = this.columns;
                    for (let f = 0, n = a.length, c; f < n; ++f) if (c = a[f], !e[c] && !b[c]) return !1;
                    return !0
                }

                hasRowWith(a, b) {
                    a = this.aliases[a] || a;
                    return (a = this.columns[a]) ? -1 !== a.indexOf(b) : !1
                }

                on(a, b) {
                    return c(this, a, b)
                }

                renameColumn(a, b) {
                    const e = this.columns;
                    if (e[a]) {
                        if (a !== b) {
                            const f =
                                this.aliases;
                            f[b] && delete f[b];
                            e[b] = e[a];
                            delete e[a]
                        }
                        return !0
                    }
                    return !1
                }

                setCell(a, b, e, l) {
                    const f = this.columns, c = this.modifier;
                    a = this.aliases[a] || a;
                    let g = f[a];
                    g && g[b] === e || (this.emit({
                        type: "setCell",
                        cellValue: e,
                        columnName: a,
                        detail: l,
                        rowIndex: b
                    }), g || (g = f[a] = Array(this.rowCount)), b >= this.rowCount && (this.rowCount = b + 1), g[b] = e, c && c.modifyCell(this, a, b, e), this.emit({
                        type: "afterSetCell",
                        cellValue: e,
                        columnName: a,
                        detail: l,
                        rowIndex: b
                    }))
                }

                setColumn(a, b = [], e = 0, l) {
                    this.setColumns({[a]: b}, e, l)
                }

                setColumnAlias(a, b) {
                    const e =
                        this.aliases;
                    return e[a] ? !1 : (e[a] = b, !0)
                }

                setColumns(a, b, e) {
                    const f = this.columns, n = this.modifier;
                    var c = "undefined" === typeof b;
                    const g = Object.keys(a);
                    this.emit({type: "setColumns", columns: a, columnNames: g, detail: e, rowIndex: b});
                    for (let e = 0, l = g.length, n, d; e < l; ++e) if (d = g[e], n = a[d], d = this.aliases[d] || d, c) f[d] = n.slice(), this.rowCount = n.length; else {
                        const a = f[d] ? f[d] : f[d] = Array(this.rowCount);
                        for (let e = b || 0, f = n.length; e < f; ++e) a[e] = n[e];
                        this.rowCount = Math.max(this.rowCount, a.length)
                    }
                    c = Object.keys(f);
                    for (let a =
                        0, e = c.length; a < e; ++a) f[c[a]].length = this.rowCount;
                    n && n.modifyColumns(this, a, b || 0);
                    this.emit({type: "afterSetColumns", columns: a, columnNames: g, detail: e, rowIndex: b})
                }

                setModifier(a, b) {
                    const e = this;
                    e.emit({type: "setModifier", detail: b, modifier: a, modified: e.modified});
                    e.modified = e;
                    e.modifier = a;
                    return (a ? a.modify(e) : Promise.resolve(e)).then(e => {
                        e.emit({type: "afterSetModifier", detail: b, modifier: a, modified: e.modified});
                        return e
                    })["catch"](b => {
                        e.emit({type: "setModifierError", error: b, modifier: a, modified: e.modified});
                        throw b;
                    })
                }

                setRow(a, b, e) {
                    this.setRows([a], b, e)
                }

                setRows(a, f = this.rowCount, e) {
                    var l = this.aliases;
                    const n = this.columns, c = Object.keys(n), g = this.modifier, d = a.length;
                    this.emit({type: "setRows", detail: e, rowCount: d, rowIndex: f, rows: a});
                    for (let e = 0, g = f, t; e < d; ++e, ++g) if (t = a[e], t === b.NULL) for (let a = 0, e = c.length; a < e; ++a) n[c[a]][g] = null; else if (t instanceof Array) for (let a = 0, e = c.length; a < e; ++a) n[c[a]][g] = t[a]; else {
                        const a = Object.keys(t);
                        for (let e = 0, b = a.length, f; e < b; ++e) f = a[e], f = l[f] || f, n[f] || (n[f] = Array(g + 1)), n[f][g] =
                            t[f]
                    }
                    l = f + d;
                    if (l > this.rowCount) {
                        this.rowCount = l;
                        for (let a = 0, e = c.length; a < e; ++a) n[c[a]].length = l
                    }
                    g && g.modifyRows(this, a, f);
                    this.emit({type: "afterSetRows", detail: e, rowCount: d, rowIndex: f, rows: a})
                }
            }

            b.NULL = {};
            "";
            return b
        });
    k(d, "Data/Connectors/DataConnector.js", [d["Data/DataTable.js"], d["Core/Utilities.js"]], function (d, c) {
        const {addEvent: h, fireEvent: g, merge: b, pick: a} = c;

        class f {
            constructor(a = {}) {
                this.table = new d(a.dataTable);
                this.metadata = a.metadata || {columns: {}}
            }

            get polling() {
                return !!this.polling
            }

            describeColumn(a,
                           f) {
                const e = this.metadata.columns;
                e[a] = b(e[a] || {}, f)
            }

            describeColumns(a) {
                const e = Object.keys(a);
                let b;
                for (; "string" === typeof (b = e.pop());) this.describeColumn(b, a[b])
            }

            emit(a) {
                g(this, a.type, a)
            }

            getColumnOrder(e) {
                const b = this.metadata.columns;
                e = Object.keys(b || {});
                if (e.length) return e.sort((e, f) => a(b[e].index, 0) - a(b[f].index, 0))
            }

            getSortedColumns(a) {
                return this.table.getColumns(this.getColumnOrder(a))
            }

            load() {
                g(this, "afterLoad", {table: this.table});
                return Promise.resolve(this)
            }

            on(a, b) {
                return h(this, a, b)
            }

            save() {
                g(this,
                    "saveError", {table: this.table});
                return Promise.reject(Error("Not implemented"))
            }

            setColumnOrder(a) {
                for (let e = 0, b = a.length; e < b; ++e) this.describeColumn(a[e], {index: e})
            }

            startPolling(a = 1E3) {
                const e = this;
                window.clearTimeout(e._polling);
                e._polling = window.setTimeout(() => e.load()["catch"](a => e.emit({
                    type: "loadError",
                    error: a,
                    table: e.table
                })).then(() => {
                    e._polling && e.startPolling(a)
                }), a)
            }

            stopPolling() {
                window.clearTimeout(this._polling);
                delete this._polling
            }

            whatIs(a) {
                return this.metadata.columns[a]
            }
        }

        (function (a) {
            a.types =
                {};
            a.registerType = function (e, b) {
                return !!e && !a.types[e] && !!(a.types[e] = b)
            }
        })(f || (f = {}));
        return f
    });
    k(d, "Data/Converters/DataConverter.js", [d["Data/DataTable.js"], d["Core/Utilities.js"]], function (d, c) {
        const {addEvent: h, fireEvent: g, isNumber: b, merge: a} = c;

        class f {
            constructor(e) {
                this.dateFormats = {
                    "YYYY/mm/dd": {
                        regex: /^([0-9]{4})([\-\.\/])([0-9]{1,2})\2([0-9]{1,2})$/, parser: function (a) {
                            return a ? Date.UTC(+a[1], a[3] - 1, +a[4]) : NaN
                        }
                    }, "dd/mm/YYYY": {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/, parser: function (a) {
                            return a ?
                                Date.UTC(+a[4], a[3] - 1, +a[1]) : NaN
                        }, alternative: "mm/dd/YYYY"
                    }, "mm/dd/YYYY": {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/, parser: function (a) {
                            return a ? Date.UTC(+a[4], a[1] - 1, +a[3]) : NaN
                        }
                    }, "dd/mm/YY": {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/, parser: function (a) {
                            if (!a) return NaN;
                            let e = +a[4];
                            e = e > (new Date).getFullYear() - 2E3 ? e + 1900 : e + 2E3;
                            return Date.UTC(e, a[3] - 1, +a[1])
                        }, alternative: "mm/dd/YY"
                    }, "mm/dd/YY": {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/, parser: function (a) {
                            return a ?
                                Date.UTC(+a[4] + 2E3, a[1] - 1, +a[3]) : NaN
                        }
                    }
                };
                e = a(f.defaultOptions, e);
                let b = e.decimalPoint;
                if ("." === b || "," === b) this.decimalRegExp = new RegExp("^(-?[0-9]+)" + ("." === b ? "\\." : ",") + "([0-9]+)$");
                this.options = e
            }

            asBoolean(a) {
                return "boolean" === typeof a ? a : "string" === typeof a ? "" !== a && "0" !== a && "false" !== a : !!this.asNumber(a)
            }

            asDate(a) {
                if ("string" === typeof a) a = this.parseDate(a); else if ("number" !== typeof a) {
                    if (a instanceof Date) return a;
                    a = this.parseDate(this.asString(a))
                }
                return new Date(a)
            }

            asGuessedType(a) {
                return {
                    number: this.asNumber,
                    Date: this.asDate, string: this.asString
                }[this.guessType(a)].call(this, a)
            }

            asNumber(a) {
                if ("number" === typeof a) return a;
                if ("boolean" === typeof a) return a ? 1 : 0;
                if ("string" === typeof a) {
                    const e = this.decimalRegExp;
                    -1 < a.indexOf(" ") && (a = a.replace(/\s+/g, ""));
                    if (e) {
                        if (!e.test(a)) return NaN;
                        a = a.replace(e, "$1.$2")
                    }
                    return parseFloat(a)
                }
                return a instanceof Date ? a.getDate() : a ? a.getRowCount() : NaN
            }

            asString(a) {
                return "" + a
            }

            deduceDateFormat(a, b, f) {
                const e = [], l = [];
                let c = "YYYY/mm/dd", n, g = [], d = 0, h = !1, m, q;
                if (!b || b > a.length) b =
                    a.length;
                for (; d < b; d++) if ("undefined" !== typeof a[d] && a[d] && a[d].length) for (n = a[d].trim().replace(/[-\.\/]/g, " ").split(" "), g = ["", "", ""], q = 0; q < n.length; q++) q < g.length && (m = parseInt(n[q], 10)) && (l[q] = !l[q] || l[q] < m ? m : l[q], "undefined" !== typeof e[q] ? e[q] !== m && (e[q] = !1) : e[q] = m, 31 < m ? g[q] = 100 > m ? "YY" : "YYYY" : 12 < m && 31 >= m ? (g[q] = "dd", h = !0) : g[q].length || (g[q] = "mm"));
                if (h) {
                    for (q = 0; q < e.length; q++) !1 !== e[q] ? 12 < l[q] && "YY" !== g[q] && "YYYY" !== g[q] && (g[q] = "YY") : 12 < l[q] && "mm" === g[q] && (g[q] = "dd");
                    3 === g.length && "dd" === g[1] &&
                    "dd" === g[2] && (g[2] = "YY");
                    c = g.join("/")
                }
                f && (this.options.dateFormat = c);
                return c
            }

            emit(a) {
                g(this, a.type, a)
            }

            export(a, b) {
                this.emit({type: "exportError", columns: [], headers: []});
                throw Error("Not implemented");
            }

            getTable() {
                throw Error("Not implemented");
            }

            guessType(a) {
                var e = "string";
                if ("string" === typeof a) {
                    var f = this.trim(`${a}`), c = this.decimalRegExp;
                    f = this.trim(f, !0);
                    c && (f = c.test(f) ? f.replace(c, "$1.$2") : "");
                    c = parseFloat(f);
                    +f === c ? a = c : (e = this.parseDate(a), e = b(e) ? "Date" : "string")
                }
                "number" === typeof a && (e = 31536E6 <
                a ? "Date" : "number");
                return e
            }

            on(a, b) {
                return h(this, a, b)
            }

            parse(a) {
                this.emit({type: "parseError", columns: [], headers: []});
                throw Error("Not implemented");
            }

            parseDate(a, f) {
                var e = this.options;
                let c = f || e.dateFormat;
                f = NaN;
                let g, l;
                if (e.parseDate) f = e.parseDate(a); else {
                    if (c) (e = this.dateFormats[c]) || (e = this.dateFormats["YYYY/mm/dd"]), (l = a.match(e.regex)) && (f = e.parser(l)); else for (g in this.dateFormats) if (e = this.dateFormats[g], l = a.match(e.regex)) {
                        f = e.parser(l);
                        break
                    }
                    l || (l = Date.parse(a), "object" === typeof l && null !==
                    l && l.getTime ? f = l.getTime() - 6E4 * l.getTimezoneOffset() : b(l) && (f = l - 6E4 * (new Date(l)).getTimezoneOffset(), -1 === a.indexOf("2001") && 2001 === (new Date(f)).getFullYear() && (f = NaN)))
                }
                return f
            }

            trim(a, b) {
                "string" === typeof a && (a = a.replace(/^\s+|\s+$/g, ""), b && /^[0-9\s]+$/.test(a) && (a = a.replace(/\s/g, "")));
                return a
            }
        }

        f.defaultOptions = {
            dateFormat: "",
            alternativeFormat: "",
            startColumn: 0,
            endColumn: Number.MAX_VALUE,
            startRow: 0,
            endRow: Number.MAX_VALUE,
            firstRowAsNames: !0,
            switchRowsAndColumns: !1
        };
        (function (a) {
            a.getTableFromColumns =
                function (a = [], e = []) {
                    const b = new d;
                    for (let f = 0, c = Math.max(e.length, a.length); f < c; ++f) b.setColumn(e[f] || `${f}`, a[f]);
                    return b
                }
        })(f || (f = {}));
        return f
    });
    k(d, "Data/DataCursor.js", [], function () {
        class d {
            constructor(c = {}) {
                this.emittingRegister = [];
                this.listenerMap = {};
                this.stateMap = c
            }

            addListener(c, d, g) {
                c = this.listenerMap[c] = this.listenerMap[c] || {};
                (c[d] = c[d] || []).push(g);
                return this
            }

            buildEmittingTag(c) {
                return ("position" === c.cursor.type ? [c.table.id, c.cursor.column, c.cursor.row, c.cursor.state, c.cursor.type] :
                    [c.table.id, c.cursor.columns, c.cursor.firstRow, c.cursor.lastRow, c.cursor.state, c.cursor.type]).join("\x00")
            }

            emitCursor(c, h, g, b) {
                var a = c.id, f = h.state;
                if (f = this.listenerMap[a] && this.listenerMap[a][f]) {
                    a = this.stateMap[a] = this.stateMap[a] || {};
                    let e = a[h.state];
                    b && (e || (e = a[h.state] = []), -1 === d.getIndex(h, e) && e.push(h));
                    c = {cursor: h, cursors: e || [], table: c};
                    g && (c.event = g);
                    g = this.emittingRegister;
                    h = this.buildEmittingTag(c);
                    if (0 <= g.indexOf(h)) return this;
                    try {
                        this.emittingRegister.push(h);
                        for (let a = 0, e = f.length; a <
                        e; ++a) f[a].call(this, c)
                    } finally {
                        f = this.emittingRegister.indexOf(h), 0 <= f && this.emittingRegister.splice(f, 1)
                    }
                }
                return this
            }

            remitCursor(c, h) {
                if (c = this.stateMap[c] && this.stateMap[c][h.state]) h = d.getIndex(h, c), 0 <= h && c.splice(h, 1);
                return this
            }

            removeListener(c, d, g) {
                (c = this.listenerMap[c] && this.listenerMap[c][d]) && (g = c.indexOf(g)) && c.splice(g, 1);
                return this
            }
        }

        (function (c) {
            function d(c, b) {
                var a, f, e, l;
                if ("range" === c.type) return c;
                b = {
                    type: "range",
                    firstRow: null !== (f = null !== (a = c.row) && void 0 !== a ? a : b && b.firstRow) &&
                    void 0 !== f ? f : 0,
                    lastRow: null !== (l = null !== (e = c.row) && void 0 !== e ? e : b && b.lastRow) && void 0 !== l ? l : Number.MAX_VALUE,
                    state: c.state
                };
                "undefined" !== typeof c.column && (b.columns = [c.column]);
                return b
            }

            c.getIndex = function (c, b) {
                if ("position" === c.type) for (let a, f = 0, e = b.length; f < e; ++f) {
                    if (a = b[f], "position" === a.type && a.state === c.state && a.column === c.column && a.row === c.row) return f
                } else {
                    const a = JSON.stringify(c.columns);
                    for (let f, e = 0, l = b.length; e < l; ++e) if (f = b[e], "range" === f.type && f.state === c.state && f.firstRow === c.firstRow &&
                    f.lastRow === c.lastRow && JSON.stringify(f.columns) === a) return e
                }
                return -1
            };
            c.isEqual = function (c, b) {
                return "position" === c.type && "position" === b.type ? c.column === b.column && c.row === b.row && c.state === b.state : "range" === c.type && "range" === b.type ? c.firstRow === b.firstRow && c.lastRow === b.lastRow && JSON.stringify(c.columns) === JSON.stringify(b.columns) : !1
            };
            c.isInRange = function (c, b) {
                "position" === b.type && (b = d(b));
                "position" === c.type && (c = d(c, b));
                const a = c.columns, f = b.columns;
                return c.firstRow >= b.firstRow && c.lastRow <= b.lastRow &&
                    (!a || !f || a.every(a => 0 <= f.indexOf(a)))
            };
            c.toPositions = function (c) {
                if ("position" === c.type) return [c];
                const b = c.columns || [], a = [], f = c.state;
                for (let e = c.firstRow, l = c.lastRow; e < l; ++e) if (b.length) for (let c = 0, l = b.length; c < l; ++c) a.push({
                    type: "position",
                    column: b[c],
                    row: e,
                    state: f
                }); else a.push({type: "position", row: e, state: f});
                return a
            };
            c.toRange = d
        })(d || (d = {}));
        "";
        return d
    });
    k(d, "Data/Modifiers/DataModifier.js", [d["Core/Utilities.js"]], function (d) {
        const {addEvent: c, fireEvent: h, merge: g} = d;

        class b {
            benchmark(a, b) {
                const e =
                    [], f = this, c = () => {
                    f.modifyTable(a);
                    f.emit({type: "afterBenchmarkIteration"})
                }, {iterations: d} = g({iterations: 1}, b);
                f.on("afterBenchmarkIteration", () => {
                    e.length === d ? f.emit({type: "afterBenchmark", results: e}) : c()
                });
                var h = 0, m = 0;
                f.on("modify", () => {
                    h = window.performance.now()
                });
                f.on("afterModify", () => {
                    m = window.performance.now();
                    e.push(m - h)
                });
                c();
                return e
            }

            emit(a) {
                h(this, a.type, a)
            }

            modify(a, b) {
                const e = this;
                return new Promise((f, c) => {
                    a.modified === a && (a.modified = a.clone(!1, b));
                    try {
                        f(e.modifyTable(a, b))
                    } catch (t) {
                        e.emit({
                            type: "error",
                            detail: b, table: a
                        }), c(t)
                    }
                })
            }

            modifyCell(a, b, e, c, d) {
                return this.modifyTable(a)
            }

            modifyColumns(a, b, e, c) {
                return this.modifyTable(a)
            }

            modifyRows(a, b, e, c) {
                return this.modifyTable(a)
            }

            on(a, b) {
                return c(this, a, b)
            }
        }

        (function (a) {
            a.types = {};
            a.registerType = function (b, e) {
                return !!b && !a.types[b] && !!(a.types[b] = e)
            }
        })(b || (b = {}));
        return b
    });
    k(d, "Data/DataPoolDefaults.js", [], function () {
        return {connectors: []}
    });
    k(d, "Data/DataPool.js", [d["Data/Connectors/DataConnector.js"], d["Data/DataPoolDefaults.js"], d["Core/Utilities.js"]],
        function (d, c, h) {
            class g {
                constructor(b = c) {
                    b.connectors = b.connectors || [];
                    this.options = b;
                    this.connectors = {}
                }

                emit(b) {
                    h.fireEvent(this, b.type, b)
                }

                getConnector(b) {
                    var a = this.connectors[b];
                    if (a) return Promise.resolve(a);
                    if (a = this.getConnectorOptions(b)) return this.loadConnector(a);
                    throw Error(`Connector not found. (${b})`);
                }

                getConnectorOptions(b) {
                    const a = this.options.connectors;
                    for (let f = 0, e = a.length; f < e; ++f) if (a[f].name === b) return a[f]
                }

                getConnectorTable(b) {
                    return this.getConnector(b).then(a => a.table)
                }

                loadConnector(b) {
                    return new Promise((a,
                                        f) => {
                        this.emit({type: "load", options: b});
                        var e = d.types[b.type];
                        if (!e) throw Error(`Connector type not found. (${b.type})`);
                        e = new e(b.options);
                        this.connectors[b.name] = e;
                        e.load().then(e => {
                            this.emit({type: "afterLoad", options: b});
                            a(e)
                        })["catch"](f)
                    })
                }

                on(b, a) {
                    return h.addEvent(this, b, a)
                }

                setConnectorOptions(b) {
                    const a = this.options.connectors;
                    this.emit({type: "setConnectorOptions", options: b});
                    for (let f = 0, e = a.length; f < e; ++f) if (a[f].name === b.name) {
                        a.splice(f, 1);
                        break
                    }
                    a.push(b);
                    this.emit({
                        type: "afterSetConnectorOptions",
                        options: b
                    })
                }
            }

            return g
        });
    k(d, "Data/Formula/FormulaParser.js", [], function () {
        function d(a) {
            let b = 0;
            for (let e = 0, f = a.length, c, d = 1; e < f; ++e) if (c = a[e], "(" === c) b || (d = e + 1), ++b; else if (")" === c && (--b, !b)) return a.substring(d, e);
            if (0 < b) throw a = Error("Incomplete parantheses."), a.name = "FormulaParseError", a;
            return ""
        }

        function c(a) {
            let b = -1;
            for (let e = 0, f = a.length, c, d = !1; e < f; ++e) if (c = a[e], "\\" === c) d = !d; else if (d) d = !1; else if ('"' === c) if (0 > b) b = e; else return a.substring(b + 1, e);
            a = Error("Incomplete string.");
            a.name = "FormulaParseError";
            throw a;
        }

        function h(e, f) {
            var c;
            if (c = e.match(x)) {
                e = "" === c[2] || "[" === c[2][0];
                f = "" === c[1] || "[" === c[1][0];
                var d = "" === c[4] || "[" === c[4][0], l = "" === c[3] || "[" === c[3][0];
                c = {
                    type: "range",
                    beginColumn: e ? parseInt(c[2].substring(1, -1) || "0", 10) : parseInt(c[2], 10) - 1,
                    beginRow: f ? parseInt(c[1].substring(1, -1) || "0", 10) : parseInt(c[1], 10) - 1,
                    endColumn: d ? parseInt(c[4].substring(1, -1) || "0", 10) : parseInt(c[4], 10) - 1,
                    endRow: l ? parseInt(c[3].substring(1, -1) || "0", 10) : parseInt(c[3], 10) - 1
                };
                e && (c.beginColumnRelative = !0);
                f && (c.beginRowRelative =
                    !0);
                d && (c.endColumnRelative = !0);
                l && (c.endRowRelative = !0);
                return c
            }
            if (c = e.match(y)) return e = "$" !== c[1][0], f = "$" !== c[2][0], d = "$" !== c[3][0], l = "$" !== c[4][0], c = {
                type: "range",
                beginColumn: a(e ? c[1] : c[1].substring(1)) - 1,
                beginRow: parseInt(f ? c[2] : c[2].substring(1), 10) - 1,
                endColumn: a(d ? c[3] : c[3].substring(1)) - 1,
                endRow: parseInt(l ? c[4] : c[4].substring(1), 10) - 1
            }, e && (c.beginColumnRelative = !0), f && (c.beginRowRelative = !0), d && (c.endColumnRelative = !0), l && (c.endRowRelative = !0), c;
            c = b(e, f);
            return 1 === c.length && "string" !==
            typeof c[0] ? c[0] : c
        }

        function g(a, e) {
            const b = [], f = e ? ";" : ",";
            let d = 0, l = "";
            for (let g = 0, n = a.length, t; g < n; ++g) if (t = a[g], t === f && !d && l) b.push(h(l, e)), l = ""; else if ('"' !== t || d || l) " " !== t && (l += t, "(" === t ? ++d : ")" === t && --d); else {
                const e = c(a.substring(g));
                b.push(e);
                g += e.length + 1
            }
            !d && l && b.push(h(l, e));
            return b
        }

        function b(h, m) {
            const y = m ? l : e, x = [];
            var p;
            let r = ("=" === h[0] ? h.substring(1) : h).trim();
            for (; r;) if (p = r.match(v)) {
                var u = "" === p[2] || "[" === p[2][0], z = "" === p[1] || "[" === p[1][0], B = {
                    type: "reference",
                    column: u ? parseInt(p[2].substring(1,
                        -1) || "0", 10) : parseInt(p[2], 10) - 1,
                    row: z ? parseInt(p[1].substring(1, -1) || "0", 10) : parseInt(p[1], 10) - 1
                };
                u && (B.columnRelative = !0);
                z && (B.rowRelative = !0);
                x.push(B);
                r = r.substring(p[0].length).trim()
            } else if (p = r.match(k)) u = "$" !== p[1][0], z = "$" !== p[2][0], B = {
                type: "reference",
                column: a(u ? p[1] : p[1].substring(1)) - 1,
                row: parseInt(z ? p[2] : p[2].substring(1), 10) - 1
            }, u && (B.columnRelative = !0), z && (B.rowRelative = !0), x.push(B), r = r.substring(p[0].length).trim(); else if (p = r.match(t)) x.push(p[0]), r = r.substring(p[0].length).trim();
            else if (p = r.match(f)) x.push("TRUE" === p[0]), r = r.substring(p[0].length).trim(); else if (p = r.match(y)) x.push(parseFloat(p[0])), r = r.substring(p[0].length).trim(); else if ('"' === r[0]) p = c(r), x.push(p.substring(1, -1)), r = r.substring(p.length + 2).trim(); else if (p = r.match(n)) r = r.substring(p[1].length).trim(), u = d(r), x.push({
                type: "function",
                name: p[1],
                args: g(u, m)
            }), r = r.substring(u.length + 2).trim(); else {
                if ("(" === r[0] && (p = d(r))) {
                    x.push(b(p, m));
                    r = r.substring(p.length + 2).trim();
                    continue
                }
                m = h.length - r.length;
                h = Error("Unexpected character `" +
                    h.substring(m, m + 1) + "` at position " + (m + 1) + ". (`..." + h.substring(m - 5, m + 6) + "...`)");
                h.name = "FormulaParseError";
                throw h;
            }
            return x
        }

        function a(a) {
            let e = 0;
            for (let b = 0, f = a.length, c, d = a.length - 1; b < f; ++b) c = a.charCodeAt(b), 65 <= c && 90 >= c && (e += (c - 64) * Math.pow(26, d)), --d;
            return e
        }

        const f = /^(?:FALSE|TRUE)/, e = /^[+-]?\d+(?:\.\d+)?(?:e[+-]\d+)?/, l = /^[+-]?\d+(?:,\d+)?(?:e[+-]\d+)?/,
            n = /^([A-Z][A-Z\d\.]*)\(/, t = /^(?:[+\-*\/^<=>]|<=|=>)/, y = /^(\$?[A-Z]+)(\$?\d+):(\$?[A-Z]+)(\$?\d+)/,
            x = /^R(\d*|\[\d+\])C(\d*|\[\d+\]):R(\d*|\[\d+\])C(\d*|\[\d+\])/,
            k = /^(\$?[A-Z]+)(\$?\d+)(?![:C])/, v = /^R(\d*|\[\d+\])C(\d*|\[\d+\])(?!:)/;
        return {parseFormula: b}
    });
    k(d, "Data/Formula/FormulaTypes.js", [], function () {
        const d = "+ - * / ^ = < <= > >=".split(" ");
        return {
            isFormula: function (c) {
                return c instanceof Array
            }, isFunction: function (c) {
                return "object" === typeof c && !(c instanceof Array) && "function" === c.type
            }, isOperator: function (c) {
                return "string" === typeof c && 0 <= d.indexOf(c)
            }, isRange: function (c) {
                return "object" === typeof c && !(c instanceof Array) && "range" === c.type
            }, isReference: function (c) {
                return "object" ===
                    typeof c && !(c instanceof Array) && "reference" === c.type
            }, isValue: function (c) {
                return "boolean" === typeof c || "number" === typeof c || "string" === typeof c
            }
        }
    });
    k(d, "Data/Formula/FormulaProcessor.js", [d["Data/Formula/FormulaTypes.js"]], function (d) {
        function c(a) {
            switch (typeof a) {
                case "boolean":
                    return a ? D : q;
                case "string":
                    return A;
                case "number":
                    return a;
                default:
                    return NaN
            }
        }

        function h(a) {
            return "string" === typeof a ? a.toLowerCase().replace(w, "\x00") : a
        }

        function g(a) {
            switch (typeof a) {
                case "boolean":
                    return a ? 1 : 0;
                case "string":
                    return parseFloat(a.replace(",",
                        "."));
                case "number":
                    return a;
                default:
                    return NaN
            }
        }

        function b(a, e, b) {
            switch (a) {
                case "=":
                    return h(e) === h(b);
                case "<":
                    return typeof e === typeof b ? h(e) < h(b) : c(e) < c(b);
                case "<=":
                    return typeof e === typeof b ? h(e) <= h(b) : c(e) <= c(b);
                case ">":
                    return typeof e === typeof b ? h(e) > h(b) : c(e) > c(b);
                case ">=":
                    return typeof e === typeof b ? h(e) >= h(b) : c(e) >= c(b)
            }
            e = g(e);
            b = g(b);
            switch (a) {
                case "+":
                    a = e + b;
                    break;
                case "-":
                    a = e - b;
                    break;
                case "*":
                    a = e * b;
                    break;
                case "/":
                    a = e / b;
                    break;
                case "^":
                    a = Math.pow(e, b);
                    break;
                default:
                    return NaN
            }
            return a %
            1 ? Math.round(1E9 * a) / 1E9 : a
        }

        function a(a, e) {
            return u(a) ? a : k(a) ? e && f(a, e) || [] : x(a) ? n(a, e) : l(m(a) ? a : [a], e)
        }

        function f(a, e) {
            const b = e.getColumnNames().slice(a.beginColumn, a.endColumn + 1), f = [];
            for (let c = 0, d = b.length, l; c < d; ++c) {
                const d = e.getColumn(b[c], !0) || [];
                for (let g = a.beginRow, n = a.endRow + 1; g < n; ++g) l = d[g], "string" === typeof l && "=" === l[0] && e !== e.modified && (l = e.modified.getCell(b[c], g)), f.push(u(l) ? l : NaN)
            }
            return f
        }

        function e(a, e) {
            const b = e.getColumnNames()[a.column];
            if (b) {
                const f = e.getCell(b, a.row);
                return "string" ===
                typeof f && "=" === f[0] && e !== e.modified ? (a = e.modified.getCell(b, a.row), u(a) ? a : NaN) : u(f) ? f : NaN
            }
            return NaN
        }

        function l(a, f) {
            let c;
            for (let d = 0, g = a.length, h, t, y, k; d < g; ++d) if (h = a[d], r(h)) t = h; else if (u(h) ? k = h : m(h) ? k = l(a, f) : x(h) ? (y = n(h, f), k = u(y) ? y : NaN) : p(h) && (k = f && e(h, f)), "undefined" !== typeof k) {
                if ("undefined" === typeof c) c = t ? b(t, 0, k) : k; else if (t) {
                    const e = a[d + 1];
                    r(e) && C[e] > C[t] && (k = b(e, k, l(a.slice(d + 2))), d = g);
                    c = b(t, c, k)
                } else return NaN;
                k = t = void 0
            }
            return u(c) ? c : NaN
        }

        function n(a, e, b) {
            if (b = z[a.name]) try {
                return b(a.args,
                    e)
            } catch (E) {
                return NaN
            }
            a = Error(`Function "${a.name}" not found.`);
            a.name = "FormulaProcessError";
            throw a;
        }

        function t(a, e = 0, b = 0) {
            for (let f = 0, c = a.length, d; f < c; ++f) d = a[f], d instanceof Array ? t(d) : x(d) ? t(d.args) : k(d) ? (d.beginColumnRelative && (d.beginColumn += e), d.beginRowRelative && (d.beginRow += b), d.endColumnRelative && (d.endColumn += e), d.endRowRelative && (d.endRow += b)) : p(d) && (d.columnRelative && (d.column += e), d.rowRelative && (d.row += b));
            return a
        }

        const {
                isFormula: m, isFunction: x, isOperator: r, isRange: k, isReference: p,
                isValue: u
            } = d, w = / */, q = Number.MAX_VALUE / 1.000000000001, A = Number.MAX_VALUE / 1.000000000002,
            D = Number.MAX_VALUE,
            C = {"^": 3, "*": 2, "/": 2, "+": 1, "-": 1, "=": 0, "<": 0, "<=": 0, ">": 0, ">=": 0}, z = {},
            B = /^[A-Z][A-Z\.]*$/;
        return {
            asNumber: g,
            getArgumentValue: a,
            getArgumentsValues: function (e, b) {
                const f = [];
                for (let c = 0, d = e.length; c < d; ++c) f.push(a(e[c], b));
                return f
            },
            getRangeValues: f,
            getReferenceValue: e,
            processFormula: l,
            processorFunctions: z,
            registerProcessorFunction: function (a, e) {
                return B.test(a) && !z[a] && !!(z[a] = e)
            },
            translateReferences: t
        }
    });
    k(d, "Data/Formula/Functions/ABS.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(c, b) {
            c = h(c[0], b);
            switch (typeof c) {
                case "number":
                    return Math.abs(c);
                case "object":
                    b = [];
                    for (let a = 0, f = c.length, e; a < f; ++a) {
                        e = c[a];
                        if ("number" !== typeof e) return NaN;
                        b.push(Math.abs(e))
                    }
                    return b;
                default:
                    return NaN
            }
        }

        const {getArgumentValue: h} = d;
        d.registerProcessorFunction("ABS", c);
        return c
    });
    k(d, "Data/Formula/Functions/AND.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(d, b) {
            for (let a = 0,
                     f = d.length, e; a < f; ++a) if (e = h(d[a], b), !e || "object" === typeof e && !c(e, b)) return !1;
            return !0
        }

        const {getArgumentValue: h} = d;
        d.registerProcessorFunction("AND", c);
        return c
    });
    k(d, "Data/Formula/Functions/AVERAGE.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(c, b) {
            c = h(c, b);
            let a = b = 0;
            for (let f = 0, e = c.length, d; f < e; ++f) switch (d = c[f], typeof d) {
                case "number":
                    isNaN(d) || (++b, a += d);
                    break;
                case "object":
                    for (let e = 0, f = d.length, c; e < f; ++e) c = d[e], "number" !== typeof c || isNaN(c) || (++b, a += c)
            }
            return b ? a / b : 0
        }

        const {getArgumentsValues: h} =
            d;
        d.registerProcessorFunction("AVERAGE", c);
        return c
    });
    k(d, "Data/Formula/Functions/AVERAGEA.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(c, b) {
            let a = 0, f = 0;
            for (let e = 0, d = c.length, n; e < d; ++e) switch (n = h(c[e], b), typeof n) {
                case "boolean":
                    ++a;
                    f += n ? 1 : 0;
                    continue;
                case "number":
                    isNaN(n) || (++a, f += n);
                    continue;
                case "string":
                    ++a;
                    continue;
                default:
                    for (let e = 0, b = n.length, c; e < b; ++e) switch (c = n[e], typeof c) {
                        case "boolean":
                            ++a;
                            f += c ? 1 : 0;
                            continue;
                        case "number":
                            isNaN(c) || (++a, f += c);
                            continue;
                        case "string":
                            ++a
                    }
            }
            return a ?
                f / a : 0
        }

        const {getArgumentValue: h} = d;
        d.registerProcessorFunction("AVERAGEA", c);
        return c
    });
    k(d, "Data/Formula/Functions/COUNT.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(h, g) {
            h = d.getArgumentsValues(h, g);
            let b = 0;
            for (let a = 0, f = h.length, e; a < f; ++a) switch (e = h[a], typeof e) {
                case "number":
                    isNaN(e) || ++b;
                    break;
                case "object":
                    b += c(e, g)
            }
            return b
        }

        d.registerProcessorFunction("COUNT", c);
        return c
    });
    k(d, "Data/Formula/Functions/COUNTA.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(h,
                   g) {
            h = d.getArgumentsValues(h, g);
            let b = 0;
            for (let a = 0, f = h.length, e; a < f; ++a) {
                e = h[a];
                switch (typeof e) {
                    case "number":
                        if (isNaN(e)) continue;
                        break;
                    case "object":
                        b += c(e, g);
                        continue;
                    case "string":
                        if (!e) continue
                }
                ++b
            }
            return b
        }

        d.registerProcessorFunction("COUNTA", c);
        return c
    });
    k(d, "Data/Formula/Functions/IF.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(c, b) {
            return h(c[0], b) ? h(c[1], b) : h(c[2], b)
        }

        const {getArgumentValue: h} = d;
        d.registerProcessorFunction("IF", c);
        return c
    });
    k(d, "Data/Formula/Functions/ISNA.js",
        [d["Data/Formula/FormulaProcessor.js"]], function (d) {
            function c(c, b) {
                c = h(c[0], b);
                return "number" !== typeof c || isNaN(c)
            }

            const {getArgumentValue: h} = d;
            d.registerProcessorFunction("ISNA", c);
            return c
        });
    k(d, "Data/Formula/Functions/MAX.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(d, b) {
            d = h(d, b);
            b = Number.NEGATIVE_INFINITY;
            for (let a = 0, f = d.length, e; a < f; ++a) switch (e = d[a], typeof e) {
                case "number":
                    e > b && (b = e);
                    break;
                case "object":
                    e = c(e), e > b && (b = e)
            }
            return isFinite(b) ? b : 0
        }

        const {getArgumentsValues: h} =
            d;
        d.registerProcessorFunction("MAX", c);
        return c
    });
    k(d, "Data/Formula/Functions/MEDIAN.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(c, g) {
            const b = [];
            c = d.getArgumentsValues(c, g);
            for (let a = 0, f = c.length, e; a < f; ++a) switch (e = c[a], typeof e) {
                case "number":
                    isNaN(e) || b.push(e);
                    break;
                case "object":
                    for (let a = 0, f = e.length, c; a < f; ++a) c = e[a], "number" !== typeof c || isNaN(c) || b.push(c)
            }
            c = b.length;
            if (!c) return NaN;
            g = Math.floor(c / 2);
            return c % 2 ? b[g] : (b[g - 1] + b[g]) / 2
        }

        d.registerProcessorFunction("MEDIAN",
            c);
        return c
    });
    k(d, "Data/Formula/Functions/MIN.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(d, b) {
            d = h(d, b);
            b = Number.POSITIVE_INFINITY;
            for (let a = 0, f = d.length, e; a < f; ++a) switch (e = d[a], typeof e) {
                case "number":
                    e < b && (b = e);
                    break;
                case "object":
                    e = c(e), e < b && (b = e)
            }
            return isFinite(b) ? b : 0
        }

        const {getArgumentsValues: h} = d;
        d.registerProcessorFunction("MIN", c);
        return c
    });
    k(d, "Data/Formula/Functions/MOD.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(c, b) {
            let a = h(c[0], b);
            c = h(c[1],
                b);
            "object" === typeof a && (a = a[0]);
            "object" === typeof c && (c = c[0]);
            return "number" !== typeof a || "number" !== typeof c || 0 === c ? NaN : a % c
        }

        const {getArgumentValue: h} = d;
        d.registerProcessorFunction("MOD", c);
        return c
    });
    k(d, "Data/Formula/Functions/MODE.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(b, a) {
            const c = {};
            b = d.getArgumentsValues(b, a);
            for (let a = 0, f = b.length, d; a < f; ++a) switch (d = b[a], typeof d) {
                case "number":
                    isNaN(d) || (c[d] = (c[d] || 0) + 1);
                    break;
                case "object":
                    for (let a = 0, e = d.length, b; a < e; ++a) b =
                        d[a], "number" !== typeof b || isNaN(b) || (c[b] = (c[b] || 0) + 1)
            }
            return c
        }

        function h(b, a) {
            b = c(b, a);
            a = Object.keys(b);
            if (!a.length) return NaN;
            let f = [parseFloat(a[0])], e = b[a[0]];
            for (let c = 1, d = a.length, g, h; c < d; ++c) g = a[c], h = b[g], e < h ? (f = [parseFloat(g)], e = h) : e === h && f.push(parseFloat(g));
            return 1 < e ? f : NaN
        }

        function g(b, a) {
            b = c(b, a);
            a = Object.keys(b);
            if (!a.length) return NaN;
            let f = parseFloat(a[0]), e = b[a[0]];
            for (let c = 1, d = a.length, g, h, m; c < d; ++c) g = a[c], m = b[g], e < m ? (f = parseFloat(g), e = m) : e === m && (h = parseFloat(g), f > h && (f = h, e = m));
            return 1 < e ? f : NaN
        }

        d.registerProcessorFunction("MODE", g);
        d.registerProcessorFunction("MODE.MULT", h);
        d.registerProcessorFunction("MODE.SNGL", g);
        return {MULT: h, SNGL: g}
    });
    k(d, "Data/Formula/Functions/NOT.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(c, b) {
            c = h(c[0], b);
            "object" === typeof c && (c = c[0]);
            switch (typeof c) {
                case "boolean":
                case "number":
                    return !c
            }
            return NaN
        }

        const {getArgumentValue: h} = d;
        d.registerProcessorFunction("NOT", c);
        return c
    });
    k(d, "Data/Formula/Functions/OR.js", [d["Data/Formula/FormulaProcessor.js"]],
        function (d) {
            function c(d, b) {
                for (let a = 0, f = d.length, e; a < f; ++a) if (e = h(d[a], b), "object" === typeof e) {
                    if (c(e, b)) return !0
                } else if (e) return !0;
                return !1
            }

            const {getArgumentValue: h} = d;
            d.registerProcessorFunction("OR", c);
            return c
        });
    k(d, "Data/Formula/Functions/PRODUCT.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(d, b) {
            d = h(d, b);
            let a = 1, f = !1;
            for (let e = 0, l = d.length, n; e < l; ++e) switch (n = d[e], typeof n) {
                case "number":
                    isNaN(n) || (f = !0, a *= n);
                    break;
                case "object":
                    f = !0, a *= c(n, b)
            }
            return f ? a : 0
        }

        const {getArgumentsValues: h} =
            d;
        d.registerProcessorFunction("PRODUCT", c);
        return c
    });
    k(d, "Data/Formula/Functions/SUM.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(h, g) {
            h = d.getArgumentsValues(h, g);
            let b = 0;
            for (let a = 0, f = h.length, e; a < f; ++a) switch (e = h[a], typeof e) {
                case "number":
                    isNaN(e) || (b += e);
                    break;
                case "object":
                    b += c(e, g)
            }
            return b
        }

        d.registerProcessorFunction("SUM", c);
        return c
    });
    k(d, "Data/Formula/Functions/XOR.js", [d["Data/Formula/FormulaProcessor.js"]], function (d) {
        function c(c, b) {
            for (let a = 0, f = c.length, e, d; a <
            f; ++a) switch (d = h(c[a], b), typeof d) {
                case "boolean":
                case "number":
                    if ("undefined" === typeof e) e = !!d; else if (!!d !== e) return !0;
                    break;
                case "object":
                    for (let a = 0, b = d.length, c; a < b; ++a) switch (c = d[a], typeof c) {
                        case "boolean":
                        case "number":
                            if ("undefined" === typeof e) e = !!c; else if (!!c !== e) return !0
                    }
            }
            return !1
        }

        const {getArgumentValue: h} = d;
        d.registerProcessorFunction("XOR", c);
        return c
    });
    k(d, "Data/Formula/Formula.js", [d["Data/Formula/FormulaParser.js"], d["Data/Formula/FormulaProcessor.js"], d["Data/Formula/FormulaTypes.js"]],
        function (d, c, h) {
            return Object.assign(Object.assign(Object.assign({}, d), c), h)
        });
    k(d, "Data/Converters/CSVConverter.js", [d["Data/Converters/DataConverter.js"], d["Core/Utilities.js"]], function (d, c) {
        const {merge: h} = c;

        class g extends d {
            constructor(b) {
                b = h(g.defaultOptions, b);
                super(b);
                this.columns = [];
                this.headers = [];
                this.dataTypes = [];
                this.options = b
            }

            export(b, a = this.options) {
                const {useLocalDecimalPoint: c, lineDelimiter: e} = a;
                var d = !1 !== this.options.firstRowAsNames;
                let {decimalPoint: n, itemDelimiter: h} = a;
                n || (n =
                    "," !== h && c ? (1.1).toLocaleString()[1] : ".");
                h || (h = "," === n ? ";" : ",");
                a = b.getSortedColumns(a.usePresentationOrder);
                const g = Object.keys(a), m = [], r = g.length, k = [];
                d && m.push(g.map(a => `"${a}"`).join(h));
                for (d = 0; d < r; d++) {
                    var p = g[d];
                    const e = a[p], c = e.length;
                    p = b.whatIs(p);
                    let f;
                    p && (f = p.dataType);
                    for (p = 0; p < c; p++) {
                        var u = e[p];
                        k[p] || (k[p] = []);
                        "string" === f ? u = '"' + u + '"' : "number" === typeof u ? u = String(u).replace(".", n) : "string" === typeof u && (u = `"${u}"`);
                        k[p][d] = u;
                        if (d === r - 1) {
                            for (u = d; 2 < k[p].length && void 0 === k[p][u];) k[p].pop(),
                                u--;
                            m.push(k[p].join(h))
                        }
                    }
                }
                return m.join(e)
            }

            parse(b, a) {
                var c = this.dataTypes;
                b = h(this.options, b);
                const {beforeParse: e, lineDelimiter: d, firstRowAsNames: n, itemDelimiter: g} = b;
                let {csv: y, startRow: m, endRow: k} = b;
                this.columns = [];
                this.emit({type: "parse", columns: this.columns, detail: a, headers: this.headers});
                y && e && (y = e(y));
                if (y) {
                    b = y.replace(/\r\n|\r/g, "\n").split(d || "\n");
                    if (!m || 0 > m) m = 0;
                    if (!k || k >= b.length) k = b.length - 1;
                    g || (this.guessedItemDelimiter = this.guessDelimiter(b));
                    if (n) {
                        var v = b[0].split(g || this.guessedItemDelimiter ||
                            ",");
                        for (var p = 0; p < v.length; p++) v[p] = v[p].replace(/^["']|["']$/g, "");
                        this.headers = v;
                        m++
                    }
                    p = 0;
                    for (v = m; v <= k; v++) "#" === b[v][0] ? p++ : this.parseCSVRow(b[v], v - m - p);
                    c.length && c[0].length && "date" === c[0][1] && !this.options.dateFormat && this.deduceDateFormat(this.columns[0], null, !0);
                    for (let a = 0, e = this.columns.length; a < e; ++a) {
                        c = this.columns[a];
                        for (let e = 0, f = c.length; e < f; ++e) c[e] && "string" === typeof c[e] && (b = this.asGuessedType(c[e]), b instanceof Date && (b = b.getTime()), this.columns[a][e] = b)
                    }
                }
                this.emit({
                    type: "afterParse",
                    columns: this.columns, detail: a, headers: this.headers
                })
            }

            parseCSVRow(b, a) {
                const c = this, e = c.columns || [], d = c.dataTypes, {startColumn: n, endColumn: h} = c.options,
                    g = c.options.itemDelimiter || c.guessedItemDelimiter;
                let {decimalPoint: m} = c.options;
                m && m !== g || (m = c.guessedDecimalPoint || ".");
                let k = 0, v = "", p = "", u = "", w = "", q = 0, A = 0;
                const D = a => {
                    v = b[a];
                    p = b[a - 1];
                    u = b[a + 1]
                }, C = a => {
                    d.length < A + 1 && d.push([a]);
                    d[A][d[A].length - 1] !== a && d[A].push(a)
                }, z = () => {
                    if (n > q || q > h) ++q, w = ""; else {
                        "string" === typeof w ? !isNaN(parseFloat(w)) && isFinite(w) ?
                            (w = parseFloat(w), C("number")) : isNaN(Date.parse(w)) ? C("string") : (w = w.replace(/\//g, "-"), C("date")) : C("number");
                        e.length < A + 1 && e.push([]);
                        if ("number" !== typeof w && "number" !== c.guessType(w) && m) {
                            const a = w;
                            w = w.replace(m, ".");
                            "number" !== c.guessType(w) && (w = a)
                        }
                        e[A][a] = w;
                        w = "";
                        ++A;
                        ++q
                    }
                };
                if (b.trim().length && "#" !== b.trim()[0]) {
                    for (; k < b.length; k++) {
                        D(k);
                        if ("#" === v && !/^#[0-F]{3,3}|[0-F]{6,6}/i.test(b.substring(k))) {
                            z();
                            return
                        }
                        if ('"' === v) for (D(++k); k < b.length && ('"' !== v || '"' === p || '"' === u);) {
                            if ('"' !== v || '"' === v && '"' !==
                                p) w += v;
                            D(++k)
                        } else v === g ? z() : w += v
                    }
                    z()
                }
            }

            guessDelimiter(b) {
                let a = 0, c = 0;
                const e = {",": 0, ";": 0, "\t": 0}, d = b.length;
                for (let f = 0; f < d; f++) {
                    let d = !1, l, n, h, g = "";
                    if (13 < f) break;
                    const m = b[f];
                    for (let b = 0; b < m.length; b++) {
                        l = m[b];
                        n = m[b + 1];
                        h = m[b - 1];
                        if ("#" === l) break;
                        if ('"' === l) if (d) {
                            if ('"' !== h && '"' !== n) {
                                for (; " " === n && b < m.length;) n = m[++b];
                                "undefined" !== typeof e[n] && e[n]++;
                                d = !1
                            }
                        } else d = !0; else "undefined" !== typeof e[l] ? (g = g.trim(), isNaN(Date.parse(g)) ? !isNaN(Number(g)) && isFinite(Number(g)) || e[l]++ : e[l]++, g = "") : g += l;
                        "," ===
                        l && c++;
                        "." === l && a++
                    }
                }
                b = e[";"] > e[","] ? ";" : ",";
                this.guessedDecimalPoint = a > c ? "." : ",";
                return b
            }

            getTable() {
                return d.getTableFromColumns(this.columns, this.headers)
            }
        }

        g.defaultOptions = Object.assign(Object.assign({}, d.defaultOptions), {lineDelimiter: "\n"});
        return g
    });
    k(d, "Data/Connectors/CSVConnector.js", [d["Data/Converters/CSVConverter.js"], d["Data/Connectors/DataConnector.js"], d["Core/Utilities.js"]], function (d, c, h) {
        const {merge: g} = h;

        class b extends c {
            constructor(a) {
                a = g(b.defaultOptions, a);
                super(a);
                this.converter =
                    new d(a);
                this.options = a;
                a.enablePolling && this.startPolling(1E3 * Math.max(a.dataRefreshRate || 0, 1))
            }

            load(a) {
                const b = this, e = b.converter, c = b.table, {csv: d, csvURL: h} = b.options;
                if (d) c.deleteRows(), b.emit({
                    type: "load",
                    csv: d,
                    detail: a,
                    table: c
                }), e.parse({csv: d}), c.setColumns(e.getTable().getColumns()), b.emit({
                    type: "afterLoad",
                    csv: d,
                    detail: a,
                    table: c
                }); else {
                    if (h) return b.table.deleteColumns(), b.emit({
                        type: "load",
                        detail: a,
                        table: b.table
                    }), fetch(h || "").then(e => e.text().then(e => {
                        b.converter.parse({csv: e});
                        b.table.setColumns(b.converter.getTable().getColumns());
                        b.emit({type: "afterLoad", csv: e, detail: a, table: b.table})
                    }))["catch"](e => {
                        b.emit({type: "loadError", detail: a, error: e, table: b.table});
                        return Promise.reject(e)
                    }).then(() => b);
                    b.emit({
                        type: "loadError",
                        detail: a,
                        error: "Unable to load: no CSV string or URL was provided",
                        table: c
                    })
                }
                return Promise.resolve(b)
            }
        }

        b.defaultOptions = {csv: "", csvURL: "", enablePolling: !1, dataRefreshRate: 1};
        c.registerType("CSV", b);
        return b
    });
    k(d, "Data/Converters/GoogleSheetsConverter.js", [d["Data/Converters/DataConverter.js"], d["Core/Utilities.js"]],
        function (d, c) {
            const {merge: h, uniqueKey: g} = c;

            class b extends d {
                constructor(a) {
                    a = h(b.defaultOptions, a);
                    super(a);
                    this.columns = [];
                    this.header = [];
                    this.options = a
                }

                parse(a, b) {
                    a = h(this.options, a);
                    const e = (a.json && a.json.values || []).map(a => a.slice());
                    if (0 === e.length) return !1;
                    this.header = [];
                    this.columns = [];
                    this.emit({type: "parse", columns: this.columns, detail: b, headers: this.header});
                    this.columns = e;
                    let c;
                    for (let b = 0, d = e.length; b < d; b++) {
                        c = e[b];
                        this.header[b] = a.firstRowAsNames ? `${c.shift()}` : g();
                        for (let a = 0, e = c.length; a <
                        e; ++a) if (c[a] && "string" === typeof c[a]) {
                            let e = this.asGuessedType(c[a]);
                            e instanceof Date && (e = e.getTime());
                            this.columns[b][a] = e
                        }
                    }
                    this.emit({type: "afterParse", columns: this.columns, detail: b, headers: this.header})
                }

                getTable() {
                    return d.getTableFromColumns(this.columns, this.header)
                }
            }

            b.defaultOptions = Object.assign({}, d.defaultOptions);
            return b
        });
    k(d, "Data/Connectors/GoogleSheetsConnector.js", [d["Data/Connectors/DataConnector.js"], d["Data/Converters/GoogleSheetsConverter.js"], d["Core/Utilities.js"]], function (d,
                                                                                                                                                                               c, h) {
        const {merge: g, pick: b} = h;

        class a extends d {
            constructor(b) {
                b = g(a.defaultOptions, b);
                super(b);
                this.converter = new c(b);
                this.options = b
            }

            load(b) {
                const e = this, {
                    dataRefreshRate: c,
                    enablePolling: d,
                    firstRowAsNames: f,
                    googleAPIKey: h,
                    googleSpreadsheetKey: g
                } = e.options, m = a.buildFetchURL(h, g, e.options);
                e.table.deleteColumns();
                e.emit({type: "load", detail: b, table: e.table, url: m});
                return fetch(m).then(a => a.json().then(a => {
                    if ("object" === typeof a && a && "object" === typeof a.error && a.error && "number" === typeof a.error.code &&
                        "string" === typeof a.error.message && "string" === typeof a.error.status) throw Error(a.error.message);
                    e.converter.parse({firstRowAsNames: f, json: a});
                    e.table.setColumns(e.converter.getTable().getColumns());
                    e.emit({type: "afterLoad", detail: b, table: e.table, url: m});
                    d && setTimeout(() => e.load(), 1E3 * Math.max(c || 0, 1))
                }))["catch"](a => {
                    e.emit({type: "loadError", detail: b, error: a, table: e.table});
                    return Promise.reject(a)
                }).then(() => e)
            }
        }

        a.defaultOptions = {
            googleAPIKey: "", googleSpreadsheetKey: "", worksheet: 1, enablePolling: !1,
            dataRefreshRate: 2, firstRowAsNames: !0
        };
        (function (a) {
            function e(a = {}) {
                const {endColumn: e, endRow: c, googleSpreadsheetRange: d, startColumn: f, startRow: l} = a;
                return d || ("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[f || 0] || "A") + (Math.max(l || 0, 0) + 1) + ":" + ("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[b(e, 25)] || "Z") + (c ? Math.max(c, 0) : "Z")
            }

            a.buildFetchURL = function (a, b, c = {}) {
                return `https://sheets.googleapis.com/v4/spreadsheets/${b}/values/` + (c.onlyColumnNames ? "A1:Z1" : e(c)) + "?alt=json" + (c.onlyColumnNames ? "" : "&dateTimeRenderOption=FORMATTED_STRING&majorDimension=COLUMNS&valueRenderOption=UNFORMATTED_VALUE") +
                    "&prettyPrint=false" + `&key=${a}`
            };
            a.buildQueryRange = e
        })(a || (a = {}));
        d.registerType("GoogleSheets", a);
        return a
    });
    k(d, "Data/Converters/HTMLTableConverter.js", [d["Data/Converters/DataConverter.js"], d["Core/Utilities.js"]], function (d, c) {
        const {merge: h} = c;

        class g extends d {
            constructor(b) {
                b = h(g.defaultOptions, b);
                super(b);
                this.columns = [];
                this.headers = [];
                this.options = b;
                b.tableElement && (this.tableElement = b.tableElement, this.tableElementID = b.tableElement.id)
            }

            export(b, a = this.options) {
                var c = !1 !== a.firstRowAsNames,
                    e = a.useMultiLevelHeaders, d = b.getSortedColumns(a.usePresentationOrder);
                const h = Object.keys(d);
                b = [];
                const g = h.length, m = [];
                var k = "";
                if (c) if (k = [], e) {
                    for (var r of h) e = (d[r].shift() || "").toString(), k.push(e);
                    k = this.getTableHeaderHTML(h, k, a)
                } else k = this.getTableHeaderHTML(void 0, h, a);
                for (r = 0; r < g; r++) {
                    e = d[h[r]];
                    c = e.length;
                    for (let a = 0; a < c; a++) {
                        let c = e[a];
                        m[a] || (m[a] = []);
                        "string" !== typeof c && "number" !== typeof c && "undefined" !== typeof c && (c = (c || "").toString());
                        m[a][r] = this.getCellHTMLFromValue(r ? "td" : "th", null,
                            r ? "" : 'scope="row"', c);
                        r === g - 1 && b.push("<tr>" + m[a].join("") + "</tr>")
                    }
                }
                d = "";
                a.tableCaption && (d = '<caption class="highcharts-table-caption">' + a.tableCaption + "</caption>");
                return "<table>" + d + k + "<tbody>" + b.join("") + "</tbody></table>"
            }

            getCellHTMLFromValue(b, a, c, e, d) {
                let f = e;
                a = "text" + (a ? " " + a : "");
                "number" === typeof f ? (f = f.toString(), "," === d && (f = f.replace(".", d)), a = "number") : e || (f = "", a = "empty");
                return "<" + b + (c ? " " + c : "") + ' class="' + a + '">' + f + "</" + b + ">"
            }

            getTableHeaderHTML(b = [], a = [], c = this.options) {
                const {
                    useMultiLevelHeaders: e,
                    useRowspanHeaders: d
                } = c;
                c.useLocalDecimalPoint && (1.1).toLocaleString();
                c = "<thead>";
                let f = 0, h = a && a.length;
                var g;
                let m = 0;
                if (g = e && b && a) {
                    a:if (g = b.length, a.length === g) {
                        for (; --g;) if (b[g] !== a[g]) {
                            g = !1;
                            break a
                        }
                        g = !0
                    } else g = !1;
                    g = !g
                }
                if (g) {
                    for (c += "<tr>"; f < h; ++f) {
                        g = b[f];
                        var k = b[f + 1];
                        g === k ? ++m : m ? (c += this.getCellHTMLFromValue("th", "highcharts-table-topheading", 'scope="col" colspan="' + (m + 1) + '"', g), m = 0) : (g === a[f] ? d ? (k = 2, delete a[f]) : (k = 1, a[f] = "") : k = 1, c += this.getCellHTMLFromValue("th", "highcharts-table-topheading",
                            'scope="col"' + (1 < k ? ' valign="top" rowspan="' + k + '"' : ""), g))
                    }
                    c += "</tr>"
                }
                if (a) {
                    c += "<tr>";
                    f = 0;
                    for (h = a.length; f < h; ++f) "undefined" !== typeof a[f] && (c += this.getCellHTMLFromValue("th", null, 'scope="col"', a[f]));
                    c += "</tr>"
                }
                return c + "</thead>"
            }

            parse(b, a) {
                const c = [], e = [];
                var d = h(this.options, b);
                const {endRow: g, startColumn: k, endColumn: m, firstRowAsNames: x} = d;
                b = d.tableElement || this.tableElement;
                if (b instanceof HTMLElement) {
                    this.tableElement = b;
                    this.tableElementID = b.id;
                    this.emit({
                        type: "parse", columns: this.columns,
                        detail: a, headers: this.headers
                    });
                    b = b.getElementsByTagName("tr");
                    var r = b.length, v = 0;
                    ({startRow: d} = d);
                    if (x && r) {
                        var p = b[0].children, u = p.length;
                        for (var w = k; w < u && !(w > m); w++) {
                            var q = p[w];
                            "TD" !== q.tagName && "TH" !== q.tagName || e.push(q.innerHTML)
                        }
                        d++
                    }
                    for (; v < r;) {
                        if (v >= d && v <= g) for (p = b[v].children, u = p.length, w = 0; w < u;) {
                            const a = w - k, b = c[a];
                            q = p[w];
                            if (("TD" === q.tagName || "TH" === q.tagName) && w >= k && w <= m) for (c[a] || (c[a] = []), q = this.asGuessedType(q.innerHTML), q instanceof Date && (q = q.getTime()), c[a][v - d] = q, q = 1; v - d >= q && void 0 ===
                            b[v - d - q];) b[v - d - q] = null, q++;
                            w++
                        }
                        v++
                    }
                    this.columns = c;
                    this.headers = e;
                    this.emit({type: "afterParse", columns: c, detail: a, headers: e})
                } else this.emit({
                    type: "parseError",
                    columns: c,
                    detail: a,
                    headers: e,
                    error: "Not a valid HTML Table"
                })
            }

            getTable() {
                return d.getTableFromColumns(this.columns, this.headers)
            }
        }

        g.defaultOptions = Object.assign(Object.assign({}, d.defaultOptions), {
            useRowspanHeaders: !0,
            useMultiLevelHeaders: !0
        });
        return g
    });
    k(d, "Data/Connectors/HTMLTableConnector.js", [d["Data/Connectors/DataConnector.js"], d["Core/Globals.js"],
        d["Data/Converters/HTMLTableConverter.js"], d["Core/Utilities.js"]], function (d, c, h, g) {
        const {win: b} = c, {merge: a} = g;

        class f extends d {
            constructor(b) {
                b = a(f.defaultOptions, b);
                super(b);
                this.converter = new h(b);
                this.options = b
            }

            load(e) {
                this.table.deleteColumns();
                this.emit({type: "load", detail: e, table: this.table, tableElement: this.tableElement});
                var {table: c} = this.options;
                "string" === typeof c ? (this.tableID = c, c = b.document.getElementById(c)) : this.tableID = c.id;
                this.tableElement = c || void 0;
                if (!this.tableElement) return this.emit({
                    type: "loadError",
                    detail: e, error: "HTML table not provided, or element with ID not found", table: this.table
                }), Promise.reject(Error("HTML table not provided, or element with ID not found"));
                this.converter.parse(a({tableElement: this.tableElement}, this.options), e);
                this.table.setColumns(this.converter.getTable().getColumns());
                this.emit({type: "afterLoad", detail: e, table: this.table, tableElement: this.tableElement});
                return Promise.resolve(this)
            }
        }

        f.defaultOptions = {table: ""};
        d.registerType("HTMLTable", f);
        return f
    });
    k(d, "Data/Modifiers/ChainModifier.js",
        [d["Data/Modifiers/DataModifier.js"], d["Core/Utilities.js"]], function (d, c) {
            const {merge: h} = c;

            class g extends d {
                constructor(b, ...a) {
                    super();
                    this.chain = a;
                    this.options = h(g.defaultOptions, b);
                    b = this.options.chain || [];
                    for (let c = 0, e = b.length, g; c < e; ++c) (g = d.types[b[c].modifier]) && a.unshift(new g(b[c]))
                }

                add(b, a) {
                    this.emit({type: "addModifier", detail: a, modifier: b});
                    this.chain.push(b);
                    this.emit({type: "addModifier", detail: a, modifier: b})
                }

                clear(b) {
                    this.emit({type: "clearChain", detail: b});
                    this.chain.length = 0;
                    this.emit({
                        type: "afterClearChain",
                        detail: b
                    })
                }

                modify(b, a) {
                    const c = this.options.reverse ? this.chain.slice().reverse() : this.chain.slice();
                    let e = Promise.resolve(b);
                    for (let b = 0, d = c.length; b < d; ++b) {
                        const d = c[b];
                        e = e.then(b => d.modify(b.modified, a))
                    }
                    e = e.then(a => {
                        b.modified = a.modified;
                        return b
                    });
                    return e = e["catch"](e => {
                        this.emit({type: "error", detail: a, table: b});
                        throw e;
                    })
                }

                modifyCell(b, a, c, e, d) {
                    const f = this.options.reverse ? this.chain.reverse() : this.chain;
                    if (f.length) {
                        let g = b.clone();
                        for (let b = 0, h = f.length; b < h; ++b) f[b].modifyCell(g, a, c, e, d), g =
                            g.modified;
                        b.modified = g
                    }
                    return b
                }

                modifyColumns(b, a, c, e) {
                    const d = this.options.reverse ? this.chain.reverse() : this.chain.slice();
                    if (d.length) {
                        let f = b.clone();
                        for (let b = 0, g = d.length; b < g; ++b) d[b].modifyColumns(f, a, c, e), f = f.modified;
                        b.modified = f
                    }
                    return b
                }

                modifyRows(b, a, c, e) {
                    const d = this.options.reverse ? this.chain.reverse() : this.chain.slice();
                    if (d.length) {
                        let f = b.clone();
                        for (let b = 0, g = d.length; b < g; ++b) d[b].modifyRows(f, a, c, e), f = f.modified;
                        b.modified = f
                    }
                    return b
                }

                modifyTable(b, a) {
                    this.emit({
                        type: "modify", detail: a,
                        table: b
                    });
                    const c = this.options.reverse ? this.chain.reverse() : this.chain.slice();
                    let e = b.modified;
                    for (let b = 0, d = c.length, f; b < d; ++b) f = c[b], e = f.modifyTable(e, a).modified;
                    b.modified = e;
                    this.emit({type: "afterModify", detail: a, table: b});
                    return b
                }

                remove(b, a) {
                    const c = this.chain;
                    this.emit({type: "removeModifier", detail: a, modifier: b});
                    c.splice(c.indexOf(b), 1);
                    this.emit({type: "afterRemoveModifier", detail: a, modifier: b})
                }
            }

            g.defaultOptions = {modifier: "Chain"};
            d.registerType("Chain", g);
            return g
        });
    k(d, "Data/Modifiers/InvertModifier.js",
        [d["Data/Modifiers/DataModifier.js"], d["Core/Utilities.js"]], function (d, c) {
            const {merge: h} = c;

            class g extends d {
                constructor(b) {
                    super();
                    this.options = h(g.defaultOptions, b)
                }

                modifyCell(b, a, c, e, d) {
                    const f = b.modified;
                    a = f.getRowIndexBy("columnNames", a);
                    "undefined" === typeof a ? f.setColumns(this.modifyTable(b.clone()).getColumns(), void 0, d) : f.setCell(`${c}`, a, e, d);
                    return b
                }

                modifyColumns(b, a, c, e) {
                    const d = b.modified, f = d.getColumn("columnNames") || [];
                    let g = b.getColumnNames(), h = b.getRowCount() !== f.length;
                    if (!h) for (let a =
                        0, b = g.length; a < b; ++a) if (g[a] !== f[a]) {
                        h = !0;
                        break
                    }
                    if (h) return this.modifyTable(b, e);
                    g = Object.keys(a);
                    for (let b = 0, f = g.length, h, l, k; b < f; ++b) {
                        l = g[b];
                        h = a[l];
                        k = d.getRowIndexBy("columnNames", l) || d.getRowCount();
                        for (let a = 0, b = c, f = h.length; a < f; ++a, ++b) d.setCell(`${b}`, k, h[a], e)
                    }
                    return b
                }

                modifyRows(b, a, c, e) {
                    const d = b.getColumnNames(), f = b.modified, g = f.getColumn("columnNames") || [];
                    let h = b.getRowCount() !== g.length;
                    if (!h) for (let a = 0, b = d.length; a < b; ++a) if (d[a] !== g[a]) {
                        h = !0;
                        break
                    }
                    if (h) return this.modifyTable(b, e);
                    for (let b = 0, g = c, h = a.length, l; b < h; ++b, ++g) if (l = a[b], l instanceof Array) f.setColumn(`${g}`, l); else for (let a = 0, b = d.length; a < b; ++a) f.setCell(`${g}`, a, l[d[a]], e);
                    return b
                }

                modifyTable(b, a) {
                    this.emit({type: "modify", detail: a, table: b});
                    const c = b.modified;
                    if (b.hasColumns(["columnNames"])) {
                        var e = ((b.deleteColumns(["columnNames"]) || {}).columnNames || []).map(a => `${a}`);
                        const a = {};
                        for (let c = 0, d = b.getRowCount(), f; c < d; ++c) (f = b.getRow(c)) && (a[e[c]] = f);
                        c.deleteColumns();
                        c.setColumns(a)
                    } else {
                        e = {};
                        for (let a = 0, c = b.getRowCount(),
                                 d; a < c; ++a) (d = b.getRow(a)) && (e[`${a}`] = d);
                        e.columnNames = b.getColumnNames();
                        c.deleteColumns();
                        c.setColumns(e)
                    }
                    this.emit({type: "afterModify", detail: a, table: b});
                    return b
                }
            }

            g.defaultOptions = {modifier: "Invert"};
            d.registerType("Invert", g);
            return g
        });
    k(d, "Data/Modifiers/MathModifier.js", [d["Data/Modifiers/DataModifier.js"], d["Data/Formula/FormulaParser.js"], d["Data/Formula/FormulaProcessor.js"]], function (d, c, h) {
        class g extends d {
            constructor(b) {
                super();
                this.options = Object.assign(Object.assign({}, g.defaultOptions),
                    b)
            }

            modifyTable(b, a) {
                this.emit({type: "modify", detail: a, table: b});
                const d = this.options.alternativeSeparators;
                var e = this.options.formulaColumns || b.getColumnNames();
                const g = b.modified;
                for (let a = 0, c = e.length, d; a < c; ++a) d = e[a], 0 <= e.indexOf(d) && g.setColumn(d, this.processColumn(b, d));
                e = this.options.columnFormulas || [];
                for (let a = 0, f = e.length, h, l; a < f; ++a) h = e[a], l = c.parseFormula(h.formula, d), g.setColumn(h.column, this.processColumnFormula(l, b, h.rowStart, h.rowEnd));
                this.emit({type: "afterModify", detail: a, table: b});
                return b
            }

            processColumn(b, a, d = 0) {
                const e = this.options.alternativeSeparators;
                a = (b.getColumn(a, !0) || []).slice(0 < d ? d : 0);
                for (let d = 0, f = a.length, g = [], k = "", m; d < f; ++d) if (m = a[d], "string" === typeof m && "=" === m[0]) try {
                    g = k === m ? g : c.parseFormula(m.substring(1), e), a[d] = h.processFormula(g, b)
                } catch (r) {
                    a[d] = NaN
                }
                return a
            }

            processColumnFormula(b, a, c = 0, e = a.getRowCount()) {
                c = 0 <= c ? c : 0;
                e = 0 <= e ? e : a.getRowCount() + e;
                const d = [];
                a = a.modified;
                for (let f = 0, g = e - c; f < g; ++f) try {
                    d[f] = h.processFormula(b, a)
                } catch (y) {
                    d[f] = NaN
                } finally {
                    b = h.translateReferences(b,
                        0, 1)
                }
                return d
            }
        }

        g.defaultOptions = {alternativeSeparators: !1, modifier: "Math"};
        d.registerType("Math", g);
        return g
    });
    k(d, "Data/Modifiers/RangeModifier.js", [d["Data/Modifiers/DataModifier.js"], d["Core/Utilities.js"]], function (d, c) {
        const {merge: h} = c;

        class g extends d {
            constructor(b) {
                super();
                this.options = h(g.defaultOptions, b)
            }

            modifyTable(b, a) {
                this.emit({type: "modify", detail: a, table: b});
                const {ranges: c, strict: e} = this.options;
                if (c.length) {
                    const a = b.getColumns(), d = [], f = b.modified;
                    for (let f = 0, g = c.length, h, k; f <
                    g; ++f) if (h = c[f], !e || typeof h.minValue === typeof h.maxValue) {
                        k = a[h.column] || [];
                        for (let a = 0, c = k.length, f, g; a < c; ++a) {
                            f = k[a];
                            switch (typeof f) {
                                default:
                                    continue;
                                case "boolean":
                                case "number":
                                case "string":
                            }
                            (!e || typeof f === typeof h.minValue) && f >= h.minValue && f <= h.maxValue && (g = b.getRow(a)) && d.push(g)
                        }
                    }
                    f.deleteRows();
                    f.setRows(d)
                }
                this.emit({type: "afterModify", detail: a, table: b});
                return b
            }
        }

        g.defaultOptions = {modifier: "Range", strict: !1, ranges: []};
        d.registerType("Range", g);
        return g
    });
    k(d, "Data/Modifiers/SortModifier.js",
        [d["Data/Modifiers/DataModifier.js"], d["Data/DataTable.js"], d["Core/Utilities.js"]], function (d, c, h) {
            const {merge: g} = h;

            class b extends d {
                static ascending(a, b) {
                    return (a || 0) < (b || 0) ? -1 : (a || 0) > (b || 0) ? 1 : 0
                }

                static descending(a, b) {
                    return (b || 0) < (a || 0) ? -1 : (b || 0) > (a || 0) ? 1 : 0
                }

                constructor(a) {
                    super();
                    this.options = g(b.defaultOptions, a)
                }

                getRowReferences(a) {
                    a = a.getRows();
                    const b = [];
                    for (let c = 0, d = a.length; c < d; ++c) b.push({index: c, row: a[c]});
                    return b
                }

                modifyCell(a, b, e, d, g) {
                    const {orderByColumn: f, orderInColumn: h} = this.options;
                    b === f && (h ? (a.modified.setCell(b, e, d), a.modified.setColumn(h, this.modifyTable(new c({columns: a.getColumns([f, h])})).modified.getColumn(h))) : this.modifyTable(a, g));
                    return a
                }

                modifyColumns(a, b, e, d) {
                    const {orderByColumn: f, orderInColumn: g} = this.options, h = Object.keys(b);
                    -1 < h.indexOf(f) && (g && b[h[0]].length ? (a.modified.setColumns(b, e), a.modified.setColumn(g, this.modifyTable(new c({columns: a.getColumns([f, g])})).modified.getColumn(g))) : this.modifyTable(a, d));
                    return a
                }

                modifyRows(a, b, e, d) {
                    const {
                        orderByColumn: f,
                        orderInColumn: g
                    } = this.options;
                    g && b.length ? (a.modified.setRows(b, e), a.modified.setColumn(g, this.modifyTable(new c({columns: a.getColumns([f, g])})).modified.getColumn(g))) : this.modifyTable(a, d);
                    return a
                }

                modifyTable(a, c) {
                    this.emit({type: "modify", detail: c, table: a});
                    var e = a.getColumnNames();
                    const d = a.getRowCount(), f = this.getRowReferences(a), {
                        direction: g,
                        orderByColumn: h,
                        orderInColumn: k
                    } = this.options, m = "asc" === g ? b.ascending : b.descending, v = e.indexOf(h);
                    e = a.modified;
                    -1 !== v && f.sort((a, b) => m(a.row[v], b.row[v]));
                    if (k) {
                        var p = [];
                        for (var u = 0; u < d; ++u) p[f[u].index] = u;
                        e.setColumns({[k]: p})
                    } else {
                        p = [];
                        for (u = 0; u < d; ++u) p.push(f[u].row);
                        e.setRows(p, 0)
                    }
                    this.emit({type: "afterModify", detail: c, table: a});
                    return a
                }
            }

            b.defaultOptions = {modifier: "Sort", direction: "desc", orderByColumn: "y"};
            d.registerType("Sort", b);
            return b
        });
    k(d, "masters/modules/data-tools.src.js", [d["Core/Globals.js"], d["Data/Connectors/DataConnector.js"], d["Data/Converters/DataConverter.js"], d["Data/DataCursor.js"], d["Data/Modifiers/DataModifier.js"], d["Data/DataPool.js"],
        d["Data/DataTable.js"], d["Data/Formula/Formula.js"]], function (d, c, h, g, b, a, f, e) {
        d.DataConnector = c;
        d.DataConverter = h;
        d.DataCursor = g;
        d.DataModifier = b;
        d.DataPool = a;
        d.DataTable = f;
        d.Formula = e
    })
});
//# sourceMappingURL=data-tools.js.map