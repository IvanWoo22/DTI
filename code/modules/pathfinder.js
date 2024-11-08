/*
 Highcharts Gantt JS v11.1.0 (2023-06-05)

 Pathfinder

 (c) 2016-2021 ystein Moseng

 License: www.highcharts.com/license
*/
'use strict';
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/pathfinder", ["highcharts"], function (v) {
        a(v);
        a.Highcharts = v;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function v(a, l, t, C) {
        a.hasOwnProperty(l) || (a[l] = C.apply(null, t), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: l,
                module: a[l]
            }
        })))
    }

    a = a ? a._modules :
        {};
    v(a, "Gantt/Connection.js", [a["Core/Defaults.js"], a["Core/Globals.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]], function (a, l, t, C) {
        function A(f) {
            var e = f.shapeArgs;
            return e ? {
                xMin: e.x || 0,
                xMax: (e.x || 0) + (e.width || 0),
                yMin: e.y || 0,
                yMax: (e.y || 0) + (e.height || 0)
            } : (e = f.graphic && f.graphic.getBBox()) ? {
                xMin: f.plotX - e.width / 2,
                xMax: f.plotX + e.width / 2,
                yMin: f.plotY - e.height / 2,
                yMax: f.plotY + e.height / 2
            } : null
        }

        ({defaultOptions: a} = a);
        const {defined: y, error: h, extend: u, merge: q, objectEach: r} = C;
        "";
        const d = l.deg2rad,
            c = Math.max, n = Math.min;
        u(a, {
            connectors: {
                type: "straight",
                lineWidth: 1,
                marker: {enabled: !1, align: "center", verticalAlign: "middle", inside: !1, lineWidth: 1},
                startMarker: {symbol: "diamond"},
                endMarker: {symbol: "arrow-filled"}
            }
        });

        class F {
            constructor(f, e, k) {
                this.toPoint = this.pathfinder = this.graphics = this.fromPoint = this.chart = void 0;
                this.init(f, e, k)
            }

            init(f, e, k) {
                this.fromPoint = f;
                this.toPoint = e;
                this.options = k;
                this.chart = f.series.chart;
                this.pathfinder = this.chart.pathfinder
            }

            renderPath(f, e, k) {
                let d = this.chart, c = d.styledMode,
                    n = d.pathfinder, b = !d.options.chart.forExport && !1 !== k,
                    m = this.graphics && this.graphics.path;
                n.group || (n.group = d.renderer.g().addClass("highcharts-pathfinder-group").attr({zIndex: -1}).add(d.seriesGroup));
                n.group.translate(d.plotLeft, d.plotTop);
                m && m.renderer || (m = d.renderer.path().add(n.group), c || m.attr({opacity: 0}));
                m.attr(e);
                f = {d: f};
                c || (f.opacity = 1);
                m[b ? "animate" : "attr"](f, k);
                this.graphics = this.graphics || {};
                this.graphics.path = m
            }

            addMarker(f, e, k) {
                var c = this.fromPoint.series.chart;
                let n = c.pathfinder;
                c = c.renderer;
                let a = "start" === f ? this.fromPoint : this.toPoint;
                var b = a.getPathfinderAnchorPoint(e);
                let m, g;
                e.enabled && ((k = "start" === f ? k[1] : k[k.length - 2]) && "M" === k[0] || "L" === k[0]) && (k = {
                    x: k[1],
                    y: k[2]
                }, k = a.getRadiansToVector(k, b), b = a.getMarkerVector(k, e.radius, b), k = -k / d, e.width && e.height ? (m = e.width, g = e.height) : m = g = 2 * e.radius, this.graphics = this.graphics || {}, b = {
                    x: b.x - m / 2,
                    y: b.y - g / 2,
                    width: m,
                    height: g,
                    rotation: k,
                    rotationOriginX: b.x,
                    rotationOriginY: b.y
                }, this.graphics[f] ? this.graphics[f].animate(b) : (this.graphics[f] = c.symbol(e.symbol).addClass("highcharts-point-connecting-path-" +
                    f + "-marker highcharts-color-" + this.fromPoint.colorIndex).attr(b).add(n.group), c.styledMode || this.graphics[f].attr({
                    fill: e.color || this.fromPoint.color,
                    stroke: e.lineColor,
                    "stroke-width": e.lineWidth,
                    opacity: 0
                }).animate({opacity: 1}, a.series.options.animation)))
            }

            getPath(f) {
                let e = this.pathfinder, k = this.chart, d = e.algorithms[f.type], c = e.chartObstacles;
                if ("function" !== typeof d) return h('"' + f.type + '" is not a Pathfinder algorithm.'), {
                    path: [],
                    obstacles: []
                };
                d.requiresObstacles && !c && (c = e.chartObstacles = e.getChartObstacles(f),
                    k.options.connectors.algorithmMargin = f.algorithmMargin, e.chartObstacleMetrics = e.getObstacleMetrics(c));
                return d(this.fromPoint.getPathfinderAnchorPoint(f.startMarker), this.toPoint.getPathfinderAnchorPoint(f.endMarker), q({
                    chartObstacles: c,
                    lineObstacles: e.lineObstacles || [],
                    obstacleMetrics: e.chartObstacleMetrics,
                    hardBounds: {xMin: 0, xMax: k.plotWidth, yMin: 0, yMax: k.plotHeight},
                    obstacleOptions: {margin: f.algorithmMargin},
                    startDirectionX: e.getAlgorithmStartDirection(f.startMarker)
                }, f))
            }

            render() {
                var f = this.fromPoint;
                let e = f.series;
                var k = e.chart;
                let d = k.pathfinder,
                    a = q(k.options.connectors, e.options.connectors, f.options.connectors, this.options), h = {};
                k.styledMode || (h.stroke = a.lineColor || f.color, h["stroke-width"] = a.lineWidth, a.dashStyle && (h.dashstyle = a.dashStyle));
                h["class"] = "highcharts-point-connecting-path highcharts-color-" + f.colorIndex;
                a = q(h, a);
                y(a.marker.radius) || (a.marker.radius = n(c(Math.ceil((a.algorithmMargin || 8) / 2) - 1, 1), 5));
                f = this.getPath(a);
                k = f.path;
                f.obstacles && (d.lineObstacles = d.lineObstacles || [], d.lineObstacles =
                    d.lineObstacles.concat(f.obstacles));
                this.renderPath(k, h, e.options.animation);
                this.addMarker("start", q(a.marker, a.startMarker), k);
                this.addMarker("end", q(a.marker, a.endMarker), k)
            }

            destroy() {
                this.graphics && (r(this.graphics, function (f) {
                    f.destroy()
                }), delete this.graphics)
            }
        }

        l.Connection = F;
        u(t.prototype, {
            getPathfinderAnchorPoint: function (f) {
                let e = A(this), d, c;
                switch (f.align) {
                    case "right":
                        d = "xMax";
                        break;
                    case "left":
                        d = "xMin"
                }
                switch (f.verticalAlign) {
                    case "top":
                        c = "yMin";
                        break;
                    case "bottom":
                        c = "yMax"
                }
                return {
                    x: d ?
                        e[d] : (e.xMin + e.xMax) / 2, y: c ? e[c] : (e.yMin + e.yMax) / 2
                }
            }, getRadiansToVector: function (f, e) {
                let d;
                y(e) || (d = A(this)) && (e = {x: (d.xMin + d.xMax) / 2, y: (d.yMin + d.yMax) / 2});
                return Math.atan2(e.y - f.y, f.x - e.x)
            }, getMarkerVector: function (d, e, c) {
                var f = 2 * Math.PI, a = A(this), n = a.xMax - a.xMin;
                let b = a.yMax - a.yMin, m = Math.atan2(b, n), g = !1;
                n /= 2;
                let k = b / 2, D = a.xMin + n;
                a = a.yMin + k;
                var B = D, h = a;
                let p = 1, w = 1;
                for (; d < -Math.PI;) d += f;
                for (; d > Math.PI;) d -= f;
                f = Math.tan(d);
                d > -m && d <= m ? (w = -1, g = !0) : d > m && d <= Math.PI - m ? w = -1 : d > Math.PI - m || d <= -(Math.PI - m) ?
                    (p = -1, g = !0) : p = -1;
                g ? (B += p * n, h += w * n * f) : (B += b / (2 * f) * p, h += w * k);
                c.x !== D && (B = c.x);
                c.y !== a && (h = c.y);
                return {x: B + e * Math.cos(d), y: h - e * Math.sin(d)}
            }
        });
        return F
    });
    v(a, "Gantt/PathfinderAlgorithms.js", [a["Core/Utilities.js"]], function (a) {
        function l(d, c, a) {
            a = a || 0;
            let n = d.length - 1;
            c -= 1e-7;
            let f, e;
            for (; a <= n;) if (f = n + a >> 1, e = c - d[f].xMin, 0 < e) a = f + 1; else if (0 > e) n = f - 1; else return f;
            return 0 < a ? a - 1 : 0
        }

        function t(d, a) {
            let c = l(d, a.x + 1) + 1;
            for (; c--;) {
                var h;
                if (h = d[c].xMax >= a.x) h = d[c], h = a.x <= h.xMax && a.x >= h.xMin && a.y <= h.yMax && a.y >=
                    h.yMin;
                if (h) return c
            }
            return -1
        }

        function C(d) {
            const a = [];
            if (d.length) {
                a.push(["M", d[0].start.x, d[0].start.y]);
                for (let c = 0; c < d.length; ++c) a.push(["L", d[c].end.x, d[c].end.y])
            }
            return a
        }

        function A(d, a) {
            d.yMin = u(d.yMin, a.yMin);
            d.yMax = h(d.yMax, a.yMax);
            d.xMin = u(d.xMin, a.xMin);
            d.xMax = h(d.xMax, a.xMax)
        }

        const {pick: v} = a, {min: h, max: u, abs: q} = Math;
        a = function (d, a, h) {
            function c(a, d, b, e, h) {
                a = {x: a.x, y: a.y};
                a[d] = b[e || d] + (h || 0);
                return a
            }

            function f(a, d, b) {
                const m = q(d[b] - a[b + "Min"]) > q(d[b] - a[b + "Max"]);
                return c(d, b, a, b + (m ?
                    "Max" : "Min"), m ? 1 : -1)
            }

            let e = [];
            var k = v(h.startDirectionX, q(a.x - d.x) > q(a.y - d.y)) ? "x" : "y", n = h.chartObstacles;
            let u = t(n, d);
            h = t(n, a);
            let l;
            if (-1 < h) {
                var b = n[h];
                h = f(b, a, k);
                b = {start: h, end: a};
                l = h
            } else l = a;
            -1 < u && (n = n[u], h = f(n, d, k), e.push({
                start: d,
                end: h
            }), h[k] >= d[k] === h[k] >= l[k] && (k = "y" === k ? "x" : "y", a = d[k] < a[k], e.push({
                start: h,
                end: c(h, k, n, k + (a ? "Max" : "Min"), a ? 1 : -1)
            }), k = "y" === k ? "x" : "y"));
            d = e.length ? e[e.length - 1].end : d;
            h = c(d, k, l);
            e.push({start: d, end: h});
            k = c(h, "y" === k ? "x" : "y", l);
            e.push({start: h, end: k});
            e.push(b);
            return {path: C(e), obstacles: e}
        };
        a.requiresObstacles = !0;
        const r = function (a, c, n) {
            function d(a, b, d) {
                let m, e, f, x, c, g = a.x < b.x ? 1 : -1;
                a.x < b.x ? (m = a, e = b) : (m = b, e = a);
                a.y < b.y ? (x = a, f = b) : (x = b, f = a);
                for (c = 0 > g ? h(l(p, e.x), p.length - 1) : 0; p[c] && (0 < g && p[c].xMin <= e.x || 0 > g && p[c].xMax >= m.x);) {
                    if (p[c].xMin <= e.x && p[c].xMax >= m.x && p[c].yMin <= f.y && p[c].yMax >= x.y) return d ? {
                        y: a.y,
                        x: a.x < b.x ? p[c].xMin - 1 : p[c].xMax + 1,
                        obstacle: p[c]
                    } : {x: a.x, y: a.y < b.y ? p[c].yMin - 1 : p[c].yMax + 1, obstacle: p[c]};
                    c += g
                }
                return b
            }

            function f(a, b, m, e, c) {
                var f = c.soft,
                    h = c.hard;
                let g = e ? "x" : "y", p = {x: b.x, y: b.y}, x = {x: b.x, y: b.y};
                c = a[g + "Max"] >= f[g + "Max"];
                f = a[g + "Min"] <= f[g + "Min"];
                let k = a[g + "Max"] >= h[g + "Max"];
                h = a[g + "Min"] <= h[g + "Min"];
                let B = q(a[g + "Min"] - b[g]), D = q(a[g + "Max"] - b[g]);
                m = 10 > q(B - D) ? b[g] < m[g] : D < B;
                x[g] = a[g + "Min"];
                p[g] = a[g + "Max"];
                a = d(b, x, e)[g] !== x[g];
                b = d(b, p, e)[g] !== p[g];
                m = a ? b ? m : !0 : b ? !1 : m;
                m = f ? c ? m : !0 : c ? !1 : m;
                return h ? k ? m : !0 : k ? !1 : m
            }

            function e(a, b, g) {
                if (a.x === b.x && a.y === b.y) return [];
                var c = g ? "x" : "y";
                let k, x, w, q = n.obstacleOptions.margin;
                var l = {
                    soft: {
                        xMin: G, xMax: D, yMin: B,
                        yMax: I
                    }, hard: n.hardBounds
                };
                k = t(p, a);
                -1 < k ? (k = p[k], l = f(k, a, b, g, l), A(k, n.hardBounds), w = g ? {
                    y: a.y,
                    x: k[l ? "xMax" : "xMin"] + (l ? 1 : -1)
                } : {
                    x: a.x,
                    y: k[l ? "yMax" : "yMin"] + (l ? 1 : -1)
                }, x = t(p, w), -1 < x && (x = p[x], A(x, n.hardBounds), w[c] = l ? u(k[c + "Max"] - q + 1, (x[c + "Min"] + k[c + "Max"]) / 2) : h(k[c + "Min"] + q - 1, (x[c + "Max"] + k[c + "Min"]) / 2), a.x === w.x && a.y === w.y ? (m && (w[c] = l ? u(k[c + "Max"], x[c + "Max"]) + 1 : h(k[c + "Min"], x[c + "Min"]) - 1), m = !m) : m = !1), a = [{
                    start: a,
                    end: w
                }]) : (c = d(a, {x: g ? b.x : a.x, y: g ? a.y : b.y}, g), a = [{
                    start: a,
                    end: {x: c.x, y: c.y}
                }], c[g ? "x" : "y"] !==
                b[g ? "x" : "y"] && (l = f(c.obstacle, c, b, !g, l), A(c.obstacle, n.hardBounds), l = {
                    x: g ? c.x : c.obstacle[l ? "xMax" : "xMin"] + (l ? 1 : -1),
                    y: g ? c.obstacle[l ? "yMax" : "yMin"] + (l ? 1 : -1) : c.y
                }, g = !g, a = a.concat(e({x: c.x, y: c.y}, l, g))));
                return a = a.concat(e(a[a.length - 1].end, b, !g))
            }

            function k(a, b, c) {
                const g = h(a.xMax - b.x, b.x - a.xMin) < h(a.yMax - b.y, b.y - a.yMin);
                c = f(a, b, c, g, {soft: n.hardBounds, hard: n.hardBounds});
                return g ? {y: b.y, x: a[c ? "xMax" : "xMin"] + (c ? 1 : -1)} : {
                    x: b.x,
                    y: a[c ? "yMax" : "yMin"] + (c ? 1 : -1)
                }
            }

            let r = v(n.startDirectionX, q(c.x - a.x) > q(c.y -
                a.y)), y = r ? "x" : "y";
            let z, b = [], m = !1;
            var g = n.obstacleMetrics;
            let G = h(a.x, c.x) - g.maxWidth - 10, D = u(a.x, c.x) + g.maxWidth + 10,
                B = h(a.y, c.y) - g.maxHeight - 10, I = u(a.y, c.y) + g.maxHeight + 10, p = n.chartObstacles;
            var w = l(p, G);
            g = l(p, D);
            p = p.slice(w, g + 1);
            -1 < (g = t(p, c)) && (z = k(p[g], c, a), b.push({end: c, start: z}), c = z);
            for (; -1 < (g = t(p, c));) w = 0 > c[y] - a[y], z = {
                x: c.x,
                y: c.y
            }, z[y] = p[g][w ? y + "Max" : y + "Min"] + (w ? 1 : -1), b.push({end: c, start: z}), c = z;
            a = e(a, c, r);
            a = a.concat(b.reverse());
            return {path: C(a), obstacles: a}
        };
        r.requiresObstacles = !0;
        return {
            fastAvoid: r,
            straight: function (a, c) {
                return {path: [["M", a.x, a.y], ["L", c.x, c.y]], obstacles: [{start: a, end: c}]}
            }, simpleConnect: a
        }
    });
    v(a, "Gantt/Pathfinder.js", [a["Gantt/Connection.js"], a["Core/Chart/Chart.js"], a["Core/Defaults.js"], a["Core/Globals.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"], a["Gantt/PathfinderAlgorithms.js"]], function (a, l, t, C, A, v, h) {
        function u(a) {
            var b = a.shapeArgs;
            return b ? {
                xMin: b.x || 0,
                xMax: (b.x || 0) + (b.width || 0),
                yMin: b.y || 0,
                yMax: (b.y || 0) + (b.height || 0)
            } : (b = a.graphic && a.graphic.getBBox()) ? {
                xMin: a.plotX -
                    b.width / 2, xMax: a.plotX + b.width / 2, yMin: a.plotY - b.height / 2, yMax: a.plotY + b.height / 2
            } : null
        }

        function q(a) {
            let b = a.length, c = 0, d, f, h = [], k = function (a, b, c) {
                c = e(c, 10);
                const g = a.yMax + c > b.yMin - c && a.yMin - c < b.yMax + c,
                    d = a.xMax + c > b.xMin - c && a.xMin - c < b.xMax + c,
                    h = g ? a.xMin > b.xMax ? a.xMin - b.xMax : b.xMin - a.xMax : Infinity,
                    m = d ? a.yMin > b.yMax ? a.yMin - b.yMax : b.yMin - a.yMax : Infinity;
                return d && g ? c ? k(a, b, Math.floor(c / 2)) : Infinity : H(h, m)
            };
            for (; c < b; ++c) for (d = c + 1; d < b; ++d) f = k(a[c], a[d]), 80 > f && h.push(f);
            h.push(80);
            return E(Math.floor(h.sort(function (a,
                                                 b) {
                return a - b
            })[Math.floor(h.length / 10)] / 2 - 1), 1)
        }

        function r(a) {
            if (a.options.pathfinder || a.series.reduce(function (a, b) {
                b.options && f(!0, b.options.connectors = b.options.connectors || {}, b.options.pathfinder);
                return a || b.options && b.options.pathfinder
            }, !1)) f(!0, a.options.connectors = a.options.connectors || {}, a.options.pathfinder), n('WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.')
        }

        ({defaultOptions: t} = t);
        const {
            addEvent: d, defined: c, error: n, extend: y, merge: f,
            pick: e, splat: k
        } = v;
        "";
        const E = Math.max, H = Math.min;
        y(t, {
            connectors: {
                type: "straight",
                lineWidth: 1,
                marker: {enabled: !1, align: "center", verticalAlign: "middle", inside: !1, lineWidth: 1},
                startMarker: {symbol: "diamond"},
                endMarker: {symbol: "arrow-filled"}
            }
        });

        class z {
            constructor(a) {
                this.lineObstacles = this.group = this.connections = this.chartObstacleMetrics = this.chartObstacles = this.chart = void 0;
                this.init(a)
            }

            init(a) {
                this.chart = a;
                this.connections = [];
                d(a, "redraw", function () {
                    this.pathfinder.update()
                })
            }

            update(b) {
                const c = this.chart,
                    g = this, d = g.connections;
                g.connections = [];
                c.series.forEach(function (b) {
                    b.visible && !b.options.isInternal && b.points.forEach(function (b) {
                        var d = b.options;
                        d && d.dependency && (d.connect = d.dependency);
                        let e;
                        d = b.options && b.options.connect && k(b.options.connect);
                        b.visible && !1 !== b.isInside && d && d.forEach(function (d) {
                            e = c.get("string" === typeof d ? d : d.to);
                            e instanceof A && e.series.visible && e.visible && !1 !== e.isInside && g.connections.push(new a(b, e, "string" === typeof d ? {} : d))
                        })
                    })
                });
                for (let a = 0, b, c, e = d.length, h = g.connections.length; a <
                e; ++a) {
                    c = !1;
                    const e = d[a];
                    for (b = 0; b < h; ++b) {
                        const a = g.connections[b];
                        if ((e.options && e.options.type) === (a.options && a.options.type) && e.fromPoint === a.fromPoint && e.toPoint === a.toPoint) {
                            a.graphics = e.graphics;
                            c = !0;
                            break
                        }
                    }
                    c || e.destroy()
                }
                delete this.chartObstacles;
                delete this.lineObstacles;
                g.renderConnections(b)
            }

            renderConnections(a) {
                a ? this.chart.series.forEach(function (a) {
                    const b = function () {
                        const b = a.chart.pathfinder;
                        (b && b.connections || []).forEach(function (b) {
                            b.fromPoint && b.fromPoint.series === a && b.render()
                        });
                        a.pathfinderRemoveRenderEvent && (a.pathfinderRemoveRenderEvent(), delete a.pathfinderRemoveRenderEvent)
                    };
                    !1 === a.options.animation ? b() : a.pathfinderRemoveRenderEvent = d(a, "afterAnimate", b)
                }) : this.connections.forEach(function (a) {
                    a.render()
                })
            }

            getChartObstacles(a) {
                let b = [], d = this.chart.series, h = e(a.algorithmMargin, 0), f;
                for (let a = 0, c = d.length; a < c; ++a) if (d[a].visible && !d[a].options.isInternal) for (let c = 0, e = d[a].points.length, g, f; c < e; ++c) f = d[a].points[c], f.visible && (g = u(f)) && b.push({
                    xMin: g.xMin - h, xMax: g.xMax +
                        h, yMin: g.yMin - h, yMax: g.yMax + h
                });
                b = b.sort(function (a, b) {
                    return a.xMin - b.xMin
                });
                c(a.algorithmMargin) || (f = a.algorithmMargin = q(b), b.forEach(function (a) {
                    a.xMin -= f;
                    a.xMax += f;
                    a.yMin -= f;
                    a.yMax += f
                }));
                return b
            }

            getObstacleMetrics(a) {
                let b = 0, c = 0, d, e, f = a.length;
                for (; f--;) d = a[f].xMax - a[f].xMin, e = a[f].yMax - a[f].yMin, b < d && (b = d), c < e && (c = e);
                return {maxHeight: c, maxWidth: b}
            }

            getAlgorithmStartDirection(a) {
                let b = "top" !== a.verticalAlign && "bottom" !== a.verticalAlign;
                return "left" !== a.align && "right" !== a.align ? b ? void 0 : !1 : b ? !0 :
                    void 0
            }
        }

        z.prototype.algorithms = h;
        C.Pathfinder = z;
        y(A.prototype, {
            getPathfinderAnchorPoint: function (a) {
                let b = u(this), c, d;
                switch (a.align) {
                    case "right":
                        c = "xMax";
                        break;
                    case "left":
                        c = "xMin"
                }
                switch (a.verticalAlign) {
                    case "top":
                        d = "yMin";
                        break;
                    case "bottom":
                        d = "yMax"
                }
                return {x: c ? b[c] : (b.xMin + b.xMax) / 2, y: d ? b[d] : (b.yMin + b.yMax) / 2}
            }, getRadiansToVector: function (a, d) {
                let b;
                c(d) || (b = u(this)) && (d = {x: (b.xMin + b.xMax) / 2, y: (b.yMin + b.yMax) / 2});
                return Math.atan2(d.y - a.y, a.x - d.x)
            }, getMarkerVector: function (a, c, d) {
                var b = 2 * Math.PI,
                    e = u(this), f = e.xMax - e.xMin;
                let h = e.yMax - e.yMin, g = Math.atan2(h, f), k = !1;
                f /= 2;
                let m = h / 2, l = e.xMin + f;
                e = e.yMin + m;
                var n = l, q = e;
                let r = 1, t = 1;
                for (; a < -Math.PI;) a += b;
                for (; a > Math.PI;) a -= b;
                b = Math.tan(a);
                a > -g && a <= g ? (t = -1, k = !0) : a > g && a <= Math.PI - g ? t = -1 : a > Math.PI - g || a <= -(Math.PI - g) ? (r = -1, k = !0) : r = -1;
                k ? (n += r * f, q += t * f * b) : (n += h / (2 * b) * r, q += t * m);
                d.x !== l && (n = d.x);
                d.y !== e && (q = d.y);
                return {x: n + c * Math.cos(a), y: q - c * Math.sin(a)}
            }
        });
        l.prototype.callbacks.push(function (a) {
            !1 !== a.options.connectors.enabled && (r(a), this.pathfinder = new z(this),
                this.pathfinder.update(!0))
        });
        return z
    });
    v(a, "Extensions/ArrowSymbols.js", [a["Core/Utilities.js"]], function (a) {
        function l(a, l, q, r) {
            return [["M", a, l + r / 2], ["L", a + q, l], ["L", a, l + r / 2], ["L", a + q, l + r]]
        }

        function t(a, u, q, r) {
            return l(a, u, q / 2, r)
        }

        function v(a, l, q, r) {
            return [["M", a + q, l], ["L", a, l + r / 2], ["L", a + q, l + r], ["Z"]]
        }

        function y(a, l, q, r) {
            return v(a, l, q / 2, r)
        }

        const E = [];
        return {
            compose: function (h) {
                a.pushUnique(E, h) && (h = h.prototype.symbols, h.arrow = l, h["arrow-filled"] = v, h["arrow-filled-half"] = y, h["arrow-half"] = t, h["triangle-left"] =
                    v, h["triangle-left-half"] = y)
            }
        }
    });
    v(a, "masters/modules/pathfinder.src.js", [a["Core/Globals.js"], a["Extensions/ArrowSymbols.js"]], function (a, l) {
        l.compose(a.SVGRenderer)
    })
});
//# sourceMappingURL=pathfinder.js.map