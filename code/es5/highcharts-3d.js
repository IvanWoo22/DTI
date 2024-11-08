/*
 Highcharts JS v11.1.0 (2023-06-05)

 3D features for Highcharts JS

 License: www.highcharts.com/license
*/
'use strict';
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/highcharts-3d", ["highcharts"], function (E) {
        a(E);
        a.Highcharts = E;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function E(a, w, p, C) {
        a.hasOwnProperty(w) || (a[w] = C.apply(null, p), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: w,
                module: a[w]
            }
        })))
    }

    a = a ? a._modules :
        {};
    E(a, "Core/Math3D.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, w) {
        function p(l, e, k, b) {
            var c = e.options.chart.options3d, a = B(b, k ? e.inverted : !1),
                m = {x: e.plotWidth / 2, y: e.plotHeight / 2, z: c.depth / 2, vd: B(c.depth, 1) * B(c.viewDistance, 0)},
                t = e.scale3d || 1;
            b = g * c.beta * (a ? -1 : 1);
            c = g * c.alpha * (a ? -1 : 1);
            var n = Math.cos(c), z = Math.cos(-b), y = Math.sin(c), r = Math.sin(-b);
            k || (m.x += e.plotLeft, m.y += e.plotTop);
            return l.map(function (c) {
                var e = (a ? c.y : c.x) - m.x;
                var b = (a ? c.x : c.y) - m.y;
                c = (c.z || 0) - m.z;
                e = {
                    x: z * e - r * c, y: -y * r *
                        e + n * b - z * y * c, z: n * r * e + y * b + n * z * c
                };
                b = A(e, m, m.vd);
                b.x = b.x * t + m.x;
                b.y = b.y * t + m.y;
                b.z = e.z * t + m.z;
                return {x: a ? b.y : b.x, y: a ? b.x : b.y, z: b.z}
            })
        }

        function A(a, e, k) {
            e = 0 < k && k < Number.POSITIVE_INFINITY ? k / (a.z + e.z + k) : 1;
            return {x: a.x * e, y: a.y * e}
        }

        function l(a) {
            var e = 0, k;
            for (k = 0; k < a.length; k++) {
                var b = (k + 1) % a.length;
                e += a[k].x * a[b].y - a[b].x * a[k].y
            }
            return e / 2
        }

        var g = a.deg2rad, B = w.pick;
        return {
            perspective: p, perspective3D: A, pointCameraDistance: function (a, e) {
                var k = e.options.chart.options3d, b = e.plotWidth / 2;
                e = e.plotHeight / 2;
                k = B(k.depth,
                    1) * B(k.viewDistance, 0) + k.depth;
                return Math.sqrt(Math.pow(b - B(a.plotX, a.x), 2) + Math.pow(e - B(a.plotY, a.y), 2) + Math.pow(k - B(a.plotZ, a.z), 2))
            }, shapeArea: l, shapeArea3D: function (a, e, k) {
                return l(p(a, e, k))
            }
        }
    });
    E(a, "Core/Renderer/SVG/SVGElement3D.js", [a["Core/Color/Color.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function (a, w, p) {
        var A = a.parse, l = p.defined;
        a = p.merge;
        var g = p.objectEach, B = p.pick, z = {
            base: {
                initArgs: function (e) {
                    var a = this, b = a.renderer, c = b[a.pathType + "Path"](e), l = c.zIndexes;
                    a.parts.forEach(function (e) {
                        var m =
                            {"class": "highcharts-3d-" + e, zIndex: l[e] || 0};
                        b.styledMode && ("top" === e ? m.filter = "url(#highcharts-brighter)" : "side" === e && (m.filter = "url(#highcharts-darker)"));
                        a[e] = b.path(c[e]).attr(m).add(a)
                    });
                    a.attr({"stroke-linejoin": "round", zIndex: l.group});
                    a.originalDestroy = a.destroy;
                    a.destroy = a.destroyParts;
                    a.forcedSides = c.forcedSides
                }, singleSetterForParts: function (e, a, b, c, l, m) {
                    var k = {};
                    c = [null, null, c || "attr", l, m];
                    var n = b && b.zIndexes;
                    b ? (n && n.group && this.attr({zIndex: n.group}), g(b, function (c, a) {
                        k[a] = {};
                        k[a][e] =
                            c;
                        n && (k[a].zIndex = b.zIndexes[a] || 0)
                    }), c[1] = k) : (k[e] = a, c[0] = k);
                    return this.processParts.apply(this, c)
                }, processParts: function (a, k, b, c, l) {
                    var e = this;
                    e.parts.forEach(function (m) {
                        k && (a = B(k[m], !1));
                        if (!1 !== a) e[m][b](a, c, l)
                    });
                    return e
                }, destroyParts: function () {
                    this.processParts(null, null, "destroy");
                    return this.originalDestroy()
                }
            }
        };
        z.cuboid = a(z.base, {
            parts: ["front", "top", "side"], pathType: "cuboid", attr: function (a, k, b, c) {
                if ("string" === typeof a && "undefined" !== typeof k) {
                    var e = a;
                    a = {};
                    a[e] = k
                }
                return a.shapeArgs ||
                l(a.x) ? this.singleSetterForParts("d", null, this.renderer[this.pathType + "Path"](a.shapeArgs || a)) : w.prototype.attr.call(this, a, void 0, b, c)
            }, animate: function (a, k, b) {
                if (l(a.x) && l(a.y)) {
                    a = this.renderer[this.pathType + "Path"](a);
                    var c = a.forcedSides;
                    this.singleSetterForParts("d", null, a, "animate", k, b);
                    this.attr({zIndex: a.zIndexes.group});
                    c !== this.forcedSides && (this.forcedSides = c, this.renderer.styledMode || z.cuboid.fillSetter.call(this, this.fill))
                } else w.prototype.animate.call(this, a, k, b);
                return this
            }, fillSetter: function (a) {
                this.forcedSides =
                    this.forcedSides || [];
                this.singleSetterForParts("fill", null, {
                    front: a,
                    top: A(a).brighten(0 <= this.forcedSides.indexOf("top") ? 0 : .1).get(),
                    side: A(a).brighten(0 <= this.forcedSides.indexOf("side") ? 0 : -.1).get()
                });
                this.color = this.fill = a;
                return this
            }
        });
        return z
    });
    E(a, "Core/Renderer/SVG/SVGRenderer3D.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Math3D.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGElement3D.js"], a["Core/Renderer/SVG/SVGRenderer.js"],
        a["Core/Utilities.js"]], function (a, w, p, C, l, g, B, z) {
        var e = this && this.__extends || function () {
                var a = function (h, c) {
                    a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, f) {
                        a.__proto__ = f
                    } || function (a, f) {
                        for (var u in f) Object.prototype.hasOwnProperty.call(f, u) && (a[u] = f[u])
                    };
                    return a(h, c)
                };
                return function (h, c) {
                    function b() {
                        this.constructor = h
                    }

                    if ("function" !== typeof c && null !== c) throw new TypeError("Class extends value " + String(c) + " is not a constructor or null");
                    a(h, c);
                    h.prototype = null === c ? Object.create(c) :
                        (b.prototype = c.prototype, new b)
                }
            }(), k = a.animObject, b = w.parse, c = p.charts, x = p.deg2rad, m = C.perspective, t = C.shapeArea,
            n = z.defined, D = z.extend, y = z.merge, r = z.pick, A = Math.cos, G = Math.sin, H = Math.PI,
            K = 4 * (Math.sqrt(2) - 1) / 3 / (H / 2);
        return function (a) {
            function h() {
                return null !== a && a.apply(this, arguments) || this
            }

            e(h, a);
            h.compose = function (a) {
                a = a.prototype;
                var c = h.prototype;
                a.elements3d = g;
                a.arc3d = c.arc3d;
                a.arc3dPath = c.arc3dPath;
                a.cuboid = c.cuboid;
                a.cuboidPath = c.cuboidPath;
                a.element3d = c.element3d;
                a.face3d = c.face3d;
                a.polyhedron =
                    c.polyhedron;
                a.toLinePath = c.toLinePath;
                a.toLineSegments = c.toLineSegments
            };
            h.curveTo = function (a, c, f, u, d, q, v, F) {
                var h = [], b = q - d;
                return q > d && q - d > Math.PI / 2 + .0001 ? (h = h.concat(this.curveTo(a, c, f, u, d, d + Math.PI / 2, v, F)), h = h.concat(this.curveTo(a, c, f, u, d + Math.PI / 2, q, v, F))) : q < d && d - q > Math.PI / 2 + .0001 ? (h = h.concat(this.curveTo(a, c, f, u, d, d - Math.PI / 2, v, F)), h = h.concat(this.curveTo(a, c, f, u, d - Math.PI / 2, q, v, F))) : [["C", a + f * Math.cos(d) - f * K * b * Math.sin(d) + v, c + u * Math.sin(d) + u * K * b * Math.cos(d) + F, a + f * Math.cos(q) + f * K * b * Math.sin(q) +
                v, c + u * Math.sin(q) - u * K * b * Math.cos(q) + F, a + f * Math.cos(q) + v, c + u * Math.sin(q) + F]]
            };
            h.prototype.toLinePath = function (a, c) {
                var f = [];
                a.forEach(function (a) {
                    f.push(["L", a.x, a.y])
                });
                a.length && (f[0][0] = "M", c && f.push(["Z"]));
                return f
            };
            h.prototype.toLineSegments = function (a) {
                var c = [], f = !0;
                a.forEach(function (a) {
                    c.push(f ? ["M", a.x, a.y] : ["L", a.x, a.y]);
                    f = !f
                });
                return c
            };
            h.prototype.face3d = function (a) {
                var h = this, f = this.createElement("path");
                f.vertexes = [];
                f.insidePlotArea = !1;
                f.enabled = !0;
                f.attr = function (f) {
                    if ("object" ===
                        typeof f && (n(f.enabled) || n(f.vertexes) || n(f.insidePlotArea))) {
                        this.enabled = r(f.enabled, this.enabled);
                        this.vertexes = r(f.vertexes, this.vertexes);
                        this.insidePlotArea = r(f.insidePlotArea, this.insidePlotArea);
                        delete f.enabled;
                        delete f.vertexes;
                        delete f.insidePlotArea;
                        var d = m(this.vertexes, c[h.chartIndex], this.insidePlotArea), q = h.toLinePath(d, !0);
                        d = t(d);
                        f.d = q;
                        f.visibility = this.enabled && 0 < d ? "inherit" : "hidden"
                    }
                    return l.prototype.attr.apply(this, arguments)
                };
                f.animate = function (f) {
                    if ("object" === typeof f && (n(f.enabled) ||
                        n(f.vertexes) || n(f.insidePlotArea))) {
                        this.enabled = r(f.enabled, this.enabled);
                        this.vertexes = r(f.vertexes, this.vertexes);
                        this.insidePlotArea = r(f.insidePlotArea, this.insidePlotArea);
                        delete f.enabled;
                        delete f.vertexes;
                        delete f.insidePlotArea;
                        var d = m(this.vertexes, c[h.chartIndex], this.insidePlotArea), q = h.toLinePath(d, !0);
                        d = t(d);
                        d = this.enabled && 0 < d ? "visible" : "hidden";
                        f.d = q;
                        this.attr("visibility", d)
                    }
                    return l.prototype.animate.apply(this, arguments)
                };
                return f.attr(a)
            };
            h.prototype.polyhedron = function (a) {
                var c =
                    this, f = this.g(), h = f.destroy;
                this.styledMode || f.attr({"stroke-linejoin": "round"});
                f.faces = [];
                f.destroy = function () {
                    for (var d = 0; d < f.faces.length; d++) f.faces[d].destroy();
                    return h.call(this)
                };
                f.attr = function (d, q, a, h) {
                    if ("object" === typeof d && n(d.faces)) {
                        for (; f.faces.length > d.faces.length;) f.faces.pop().destroy();
                        for (; f.faces.length < d.faces.length;) f.faces.push(c.face3d().add(f));
                        for (var v = 0; v < d.faces.length; v++) c.styledMode && delete d.faces[v].fill, f.faces[v].attr(d.faces[v], null, a, h);
                        delete d.faces
                    }
                    return l.prototype.attr.apply(this,
                        arguments)
                };
                f.animate = function (d, q, a) {
                    if (d && d.faces) {
                        for (; f.faces.length > d.faces.length;) f.faces.pop().destroy();
                        for (; f.faces.length < d.faces.length;) f.faces.push(c.face3d().add(f));
                        for (var v = 0; v < d.faces.length; v++) f.faces[v].animate(d.faces[v], q, a);
                        delete d.faces
                    }
                    return l.prototype.animate.apply(this, arguments)
                };
                return f.attr(a)
            };
            h.prototype.element3d = function (a, c) {
                var f = this.g();
                D(f, this.elements3d[a]);
                f.initArgs(c);
                return f
            };
            h.prototype.cuboid = function (a) {
                return this.element3d("cuboid", a)
            };
            h.prototype.cuboidPath =
                function (a) {
                    function h(f) {
                        return 0 === v && 1 < f && 6 > f ? {
                            x: l[f].x,
                            y: l[f].y + 10,
                            z: l[f].z
                        } : l[0].x === l[7].x && 4 <= f ? {
                            x: l[f].x + 10,
                            y: l[f].y,
                            z: l[f].z
                        } : 0 === b && 2 > f || 5 < f ? {x: l[f].x, y: l[f].y, z: l[f].z + 10} : l[f]
                    }

                    function f(f) {
                        return l[f]
                    }

                    var u = a.x || 0, d = a.y || 0, q = a.z || 0, v = a.height || 0, F = a.width || 0, b = a.depth || 0,
                        e = c[this.chartIndex], k = e.options.chart.options3d.alpha, n = 0,
                        l = [{x: u, y: d, z: q}, {x: u + F, y: d, z: q}, {x: u + F, y: d + v, z: q}, {
                            x: u,
                            y: d + v,
                            z: q
                        }, {x: u, y: d + v, z: q + b}, {x: u + F, y: d + v, z: q + b}, {
                            x: u + F,
                            y: d,
                            z: q + b
                        }, {x: u, y: d, z: q + b}], J = [];
                    l = m(l, e, a.insidePlotArea);
                    var M = function (d, a, q) {
                        var v = [[], -1], c = d.map(f), u = a.map(f);
                        d = d.map(h);
                        a = a.map(h);
                        0 > t(c) ? v = [c, 0] : 0 > t(u) ? v = [u, 1] : q && (J.push(q), v = 0 > t(d) ? [c, 0] : 0 > t(a) ? [u, 1] : [c, 0]);
                        return v
                    };
                    var g = M([3, 2, 1, 0], [7, 6, 5, 4], "front");
                    a = g[0];
                    var r = g[1];
                    g = M([1, 6, 7, 0], [4, 5, 2, 3], "top");
                    F = g[0];
                    var y = g[1];
                    g = M([1, 2, 5, 6], [0, 7, 4, 3], "side");
                    M = g[0];
                    g = g[1];
                    1 === g ? n += 1E6 * (e.plotWidth - u) : g || (n += 1E6 * u);
                    n += 10 * (!y || 0 <= k && 180 >= k || 360 > k && 357.5 < k ? e.plotHeight - d : 10 + d);
                    1 === r ? n += 100 * q : r || (n += 100 * (1E3 - q));
                    return {
                        front: this.toLinePath(a, !0),
                        top: this.toLinePath(F,
                            !0),
                        side: this.toLinePath(M, !0),
                        zIndexes: {group: Math.round(n)},
                        forcedSides: J,
                        isFront: r,
                        isTop: y
                    }
                };
            h.prototype.arc3d = function (a) {
                function c(f) {
                    var a = !1, q = {}, c;
                    f = y(f);
                    for (c in f) -1 !== d.indexOf(c) && (q[c] = f[c], delete f[c], a = !0);
                    return a ? [q, f] : !1
                }

                var f = this.g(), h = f.renderer, d = "x y r innerR start end depth".split(" ");
                a = y(a);
                a.alpha = (a.alpha || 0) * x;
                a.beta = (a.beta || 0) * x;
                f.top = h.path();
                f.side1 = h.path();
                f.side2 = h.path();
                f.inn = h.path();
                f.out = h.path();
                f.onAdd = function () {
                    var d = f.parentGroup, a = f.attr("class");
                    f.top.add(f);
                    ["out", "inn", "side1", "side2"].forEach(function (q) {
                        f[q].attr({"class": a + " highcharts-3d-side"}).add(d)
                    })
                };
                ["addClass", "removeClass"].forEach(function (d) {
                    f[d] = function () {
                        var a = arguments;
                        ["top", "out", "inn", "side1", "side2"].forEach(function (q) {
                            f[q][d].apply(f[q], a)
                        })
                    }
                });
                f.setPaths = function (d) {
                    var a = f.renderer.arc3dPath(d), q = 100 * a.zTop;
                    f.attribs = d;
                    f.top.attr({d: a.top, zIndex: a.zTop});
                    f.inn.attr({d: a.inn, zIndex: a.zInn});
                    f.out.attr({d: a.out, zIndex: a.zOut});
                    f.side1.attr({d: a.side1, zIndex: a.zSide1});
                    f.side2.attr({
                        d: a.side2,
                        zIndex: a.zSide2
                    });
                    f.zIndex = q;
                    f.attr({zIndex: q});
                    d.center && (f.top.setRadialReference(d.center), delete d.center)
                };
                f.setPaths(a);
                f.fillSetter = function (f) {
                    var d = b(f).brighten(-.1).get();
                    this.fill = f;
                    this.side1.attr({fill: d});
                    this.side2.attr({fill: d});
                    this.inn.attr({fill: d});
                    this.out.attr({fill: d});
                    this.top.attr({fill: f});
                    return this
                };
                ["opacity", "translateX", "translateY", "visibility"].forEach(function (d) {
                    f[d + "Setter"] = function (d, a) {
                        f[a] = d;
                        ["out", "inn", "side1", "side2", "top"].forEach(function (q) {
                            f[q].attr(a,
                                d)
                        })
                    }
                });
                f.attr = function (d) {
                    var a;
                    if ("object" === typeof d && (a = c(d))) {
                        var q = a[0];
                        arguments[0] = a[1];
                        D(f.attribs, q);
                        f.setPaths(f.attribs)
                    }
                    return l.prototype.attr.apply(f, arguments)
                };
                f.animate = function (d, a, h) {
                    var q = this.attribs, u = "data-" + Math.random().toString(26).substring(2, 9);
                    delete d.center;
                    delete d.z;
                    delete d.alpha;
                    delete d.beta;
                    var v = k(r(a, this.renderer.globalAnimation));
                    if (v.duration) {
                        a = c(d);
                        f[u] = 0;
                        d[u] = 1;
                        f[u + "Setter"] = p.noop;
                        if (a) {
                            var b = a[0];
                            v.step = function (d, f) {
                                function a(d) {
                                    return q[d] + (r(b[d],
                                        q[d]) - q[d]) * f.pos
                                }

                                f.prop === u && f.elem.setPaths(y(q, {
                                    x: a("x"),
                                    y: a("y"),
                                    r: a("r"),
                                    innerR: a("innerR"),
                                    start: a("start"),
                                    end: a("end"),
                                    depth: a("depth")
                                }))
                            }
                        }
                        a = v
                    }
                    return l.prototype.animate.call(this, d, a, h)
                };
                f.destroy = function () {
                    this.top.destroy();
                    this.out.destroy();
                    this.inn.destroy();
                    this.side1.destroy();
                    this.side2.destroy();
                    return l.prototype.destroy.call(this)
                };
                f.hide = function () {
                    this.top.hide();
                    this.out.hide();
                    this.inn.hide();
                    this.side1.hide();
                    this.side2.hide()
                };
                f.show = function (d) {
                    this.top.show(d);
                    this.out.show(d);
                    this.inn.show(d);
                    this.side1.show(d);
                    this.side2.show(d)
                };
                return f
            };
            h.prototype.arc3dPath = function (a) {
                function c(d) {
                    d %= 2 * Math.PI;
                    d > Math.PI && (d = 2 * Math.PI - d);
                    return d
                }

                var f = a.x || 0, u = a.y || 0, d = a.start || 0, q = (a.end || 0) - .00001, v = a.r || 0,
                    b = a.innerR || 0, l = a.depth || 0, e = a.alpha || 0, m = a.beta || 0, k = Math.cos(d),
                    n = Math.sin(d);
                a = Math.cos(q);
                var t = Math.sin(q), g = v * Math.cos(m);
                v *= Math.cos(e);
                var r = b * Math.cos(m), y = b * Math.cos(e);
                b = l * Math.sin(m);
                var x = l * Math.sin(e);
                l = [["M", f + g * k, u + v * n]];
                l = l.concat(h.curveTo(f, u, g, v, d, q, 0, 0));
                l.push(["L", f + r * a, u + y * t]);
                l = l.concat(h.curveTo(f, u, r, y, q, d, 0, 0));
                l.push(["Z"]);
                var z = 0 < m ? Math.PI / 2 : 0;
                m = 0 < e ? 0 : Math.PI / 2;
                z = d > -z ? d : q > -z ? -z : d;
                var D = q < H - m ? q : d < H - m ? H - m : q, p = 2 * H - m;
                e = [["M", f + g * A(z), u + v * G(z)]];
                e = e.concat(h.curveTo(f, u, g, v, z, D, 0, 0));
                q > p && d < p ? (e.push(["L", f + g * A(D) + b, u + v * G(D) + x]), e = e.concat(h.curveTo(f, u, g, v, D, p, b, x)), e.push(["L", f + g * A(p), u + v * G(p)]), e = e.concat(h.curveTo(f, u, g, v, p, q, 0, 0)), e.push(["L", f + g * A(q) + b, u + v * G(q) + x]), e = e.concat(h.curveTo(f, u, g, v, q, p, b, x)), e.push(["L", f + g * A(p), u + v * G(p)]),
                    e = e.concat(h.curveTo(f, u, g, v, p, D, 0, 0))) : q > H - m && d < H - m && (e.push(["L", f + g * Math.cos(D) + b, u + v * Math.sin(D) + x]), e = e.concat(h.curveTo(f, u, g, v, D, q, b, x)), e.push(["L", f + g * Math.cos(q), u + v * Math.sin(q)]), e = e.concat(h.curveTo(f, u, g, v, q, D, 0, 0)));
                e.push(["L", f + g * Math.cos(D) + b, u + v * Math.sin(D) + x]);
                e = e.concat(h.curveTo(f, u, g, v, D, z, b, x));
                e.push(["Z"]);
                m = [["M", f + r * k, u + y * n]];
                m = m.concat(h.curveTo(f, u, r, y, d, q, 0, 0));
                m.push(["L", f + r * Math.cos(q) + b, u + y * Math.sin(q) + x]);
                m = m.concat(h.curveTo(f, u, r, y, q, d, b, x));
                m.push(["Z"]);
                k = [["M",
                    f + g * k, u + v * n], ["L", f + g * k + b, u + v * n + x], ["L", f + r * k + b, u + y * n + x], ["L", f + r * k, u + y * n], ["Z"]];
                f = [["M", f + g * a, u + v * t], ["L", f + g * a + b, u + v * t + x], ["L", f + r * a + b, u + y * t + x], ["L", f + r * a, u + y * t], ["Z"]];
                t = Math.atan2(x, -b);
                u = Math.abs(q + t);
                a = Math.abs(d + t);
                d = Math.abs((d + q) / 2 + t);
                u = c(u);
                a = c(a);
                d = c(d);
                d *= 1E5;
                q = 1E5 * a;
                u *= 1E5;
                return {
                    top: l,
                    zTop: 1E5 * Math.PI + 1,
                    out: e,
                    zOut: Math.max(d, q, u),
                    inn: m,
                    zInn: Math.max(d, q, u),
                    side1: k,
                    zSide1: .99 * u,
                    side2: f,
                    zSide2: .99 * q
                }
            };
            return h
        }(B)
    });
    E(a, "Core/Chart/Chart3D.js", [a["Core/Color/Color.js"], a["Core/Defaults.js"],
        a["Core/Math3D.js"], a["Core/Utilities.js"]], function (a, w, p, C) {
        var l = a.parse, g = w.defaultOptions, A = p.perspective, z = p.shapeArea3D, e = C.addEvent, k = C.isArray,
            b = C.merge, c = C.pick, x = C.wrap, m;
        (function (a) {
            function m(a) {
                this.is3d() && "scatter" === a.options.type && (a.options.type = "scatter3d")
            }

            function t() {
                if (this.chart3d && this.is3d()) {
                    var a = this.renderer, c = this.options.chart.options3d, d = this.chart3d.get3dFrame(),
                        q = this.plotLeft, h = this.plotLeft + this.plotWidth, b = this.plotTop,
                        e = this.plotTop + this.plotHeight;
                    c = c.depth;
                    var m = q - (d.left.visible ? d.left.size : 0), k = h + (d.right.visible ? d.right.size : 0),
                        n = b - (d.top.visible ? d.top.size : 0), g = e + (d.bottom.visible ? d.bottom.size : 0),
                        t = 0 - (d.front.visible ? d.front.size : 0), r = c + (d.back.visible ? d.back.size : 0),
                        x = this.hasRendered ? "animate" : "attr";
                    this.chart3d.frame3d = d;
                    this.frameShapes || (this.frameShapes = {
                        bottom: a.polyhedron().add(),
                        top: a.polyhedron().add(),
                        left: a.polyhedron().add(),
                        right: a.polyhedron().add(),
                        back: a.polyhedron().add(),
                        front: a.polyhedron().add()
                    });
                    this.frameShapes.bottom[x]({
                        "class": "highcharts-3d-frame highcharts-3d-frame-bottom",
                        zIndex: d.bottom.frontFacing ? -1E3 : 1E3,
                        faces: [{
                            fill: l(d.bottom.color).brighten(.1).get(),
                            vertexes: [{x: m, y: g, z: t}, {x: k, y: g, z: t}, {x: k, y: g, z: r}, {x: m, y: g, z: r}],
                            enabled: d.bottom.visible
                        }, {
                            fill: l(d.bottom.color).brighten(.1).get(),
                            vertexes: [{x: q, y: e, z: c}, {x: h, y: e, z: c}, {x: h, y: e, z: 0}, {x: q, y: e, z: 0}],
                            enabled: d.bottom.visible
                        }, {
                            fill: l(d.bottom.color).brighten(-.1).get(),
                            vertexes: [{x: m, y: g, z: t}, {x: m, y: g, z: r}, {x: q, y: e, z: c}, {x: q, y: e, z: 0}],
                            enabled: d.bottom.visible && !d.left.visible
                        }, {
                            fill: l(d.bottom.color).brighten(-.1).get(),
                            vertexes: [{x: k, y: g, z: r}, {x: k, y: g, z: t}, {x: h, y: e, z: 0}, {x: h, y: e, z: c}],
                            enabled: d.bottom.visible && !d.right.visible
                        }, {
                            fill: l(d.bottom.color).get(),
                            vertexes: [{x: k, y: g, z: t}, {x: m, y: g, z: t}, {x: q, y: e, z: 0}, {x: h, y: e, z: 0}],
                            enabled: d.bottom.visible && !d.front.visible
                        }, {
                            fill: l(d.bottom.color).get(),
                            vertexes: [{x: m, y: g, z: r}, {x: k, y: g, z: r}, {x: h, y: e, z: c}, {x: q, y: e, z: c}],
                            enabled: d.bottom.visible && !d.back.visible
                        }]
                    });
                    this.frameShapes.top[x]({
                        "class": "highcharts-3d-frame highcharts-3d-frame-top",
                        zIndex: d.top.frontFacing ? -1E3 :
                            1E3,
                        faces: [{
                            fill: l(d.top.color).brighten(.1).get(),
                            vertexes: [{x: m, y: n, z: r}, {x: k, y: n, z: r}, {x: k, y: n, z: t}, {x: m, y: n, z: t}],
                            enabled: d.top.visible
                        }, {
                            fill: l(d.top.color).brighten(.1).get(),
                            vertexes: [{x: q, y: b, z: 0}, {x: h, y: b, z: 0}, {x: h, y: b, z: c}, {x: q, y: b, z: c}],
                            enabled: d.top.visible
                        }, {
                            fill: l(d.top.color).brighten(-.1).get(),
                            vertexes: [{x: m, y: n, z: r}, {x: m, y: n, z: t}, {x: q, y: b, z: 0}, {x: q, y: b, z: c}],
                            enabled: d.top.visible && !d.left.visible
                        }, {
                            fill: l(d.top.color).brighten(-.1).get(),
                            vertexes: [{x: k, y: n, z: t}, {x: k, y: n, z: r}, {
                                x: h,
                                y: b, z: c
                            }, {x: h, y: b, z: 0}],
                            enabled: d.top.visible && !d.right.visible
                        }, {
                            fill: l(d.top.color).get(),
                            vertexes: [{x: m, y: n, z: t}, {x: k, y: n, z: t}, {x: h, y: b, z: 0}, {x: q, y: b, z: 0}],
                            enabled: d.top.visible && !d.front.visible
                        }, {
                            fill: l(d.top.color).get(),
                            vertexes: [{x: k, y: n, z: r}, {x: m, y: n, z: r}, {x: q, y: b, z: c}, {x: h, y: b, z: c}],
                            enabled: d.top.visible && !d.back.visible
                        }]
                    });
                    this.frameShapes.left[x]({
                        "class": "highcharts-3d-frame highcharts-3d-frame-left",
                        zIndex: d.left.frontFacing ? -1E3 : 1E3,
                        faces: [{
                            fill: l(d.left.color).brighten(.1).get(),
                            vertexes: [{x: m, y: g, z: t}, {x: q, y: e, z: 0}, {x: q, y: e, z: c}, {x: m, y: g, z: r}],
                            enabled: d.left.visible && !d.bottom.visible
                        }, {
                            fill: l(d.left.color).brighten(.1).get(),
                            vertexes: [{x: m, y: n, z: r}, {x: q, y: b, z: c}, {x: q, y: b, z: 0}, {x: m, y: n, z: t}],
                            enabled: d.left.visible && !d.top.visible
                        }, {
                            fill: l(d.left.color).brighten(-.1).get(),
                            vertexes: [{x: m, y: g, z: r}, {x: m, y: n, z: r}, {x: m, y: n, z: t}, {x: m, y: g, z: t}],
                            enabled: d.left.visible
                        }, {
                            fill: l(d.left.color).brighten(-.1).get(),
                            vertexes: [{x: q, y: b, z: c}, {x: q, y: e, z: c}, {x: q, y: e, z: 0}, {x: q, y: b, z: 0}],
                            enabled: d.left.visible
                        },
                            {
                                fill: l(d.left.color).get(),
                                vertexes: [{x: m, y: g, z: t}, {x: m, y: n, z: t}, {x: q, y: b, z: 0}, {
                                    x: q,
                                    y: e,
                                    z: 0
                                }],
                                enabled: d.left.visible && !d.front.visible
                            }, {
                                fill: l(d.left.color).get(),
                                vertexes: [{x: m, y: n, z: r}, {x: m, y: g, z: r}, {x: q, y: e, z: c}, {
                                    x: q,
                                    y: b,
                                    z: c
                                }],
                                enabled: d.left.visible && !d.back.visible
                            }]
                    });
                    this.frameShapes.right[x]({
                        "class": "highcharts-3d-frame highcharts-3d-frame-right",
                        zIndex: d.right.frontFacing ? -1E3 : 1E3,
                        faces: [{
                            fill: l(d.right.color).brighten(.1).get(),
                            vertexes: [{x: k, y: g, z: r}, {x: h, y: e, z: c}, {x: h, y: e, z: 0}, {
                                x: k,
                                y: g, z: t
                            }],
                            enabled: d.right.visible && !d.bottom.visible
                        }, {
                            fill: l(d.right.color).brighten(.1).get(),
                            vertexes: [{x: k, y: n, z: t}, {x: h, y: b, z: 0}, {x: h, y: b, z: c}, {x: k, y: n, z: r}],
                            enabled: d.right.visible && !d.top.visible
                        }, {
                            fill: l(d.right.color).brighten(-.1).get(),
                            vertexes: [{x: h, y: b, z: 0}, {x: h, y: e, z: 0}, {x: h, y: e, z: c}, {x: h, y: b, z: c}],
                            enabled: d.right.visible
                        }, {
                            fill: l(d.right.color).brighten(-.1).get(),
                            vertexes: [{x: k, y: g, z: t}, {x: k, y: n, z: t}, {x: k, y: n, z: r}, {x: k, y: g, z: r}],
                            enabled: d.right.visible
                        }, {
                            fill: l(d.right.color).get(),
                            vertexes: [{x: k, y: n, z: t}, {x: k, y: g, z: t}, {x: h, y: e, z: 0}, {x: h, y: b, z: 0}],
                            enabled: d.right.visible && !d.front.visible
                        }, {
                            fill: l(d.right.color).get(),
                            vertexes: [{x: k, y: g, z: r}, {x: k, y: n, z: r}, {x: h, y: b, z: c}, {x: h, y: e, z: c}],
                            enabled: d.right.visible && !d.back.visible
                        }]
                    });
                    this.frameShapes.back[x]({
                        "class": "highcharts-3d-frame highcharts-3d-frame-back",
                        zIndex: d.back.frontFacing ? -1E3 : 1E3,
                        faces: [{
                            fill: l(d.back.color).brighten(.1).get(),
                            vertexes: [{x: k, y: g, z: r}, {x: m, y: g, z: r}, {x: q, y: e, z: c}, {x: h, y: e, z: c}],
                            enabled: d.back.visible &&
                                !d.bottom.visible
                        }, {
                            fill: l(d.back.color).brighten(.1).get(),
                            vertexes: [{x: m, y: n, z: r}, {x: k, y: n, z: r}, {x: h, y: b, z: c}, {x: q, y: b, z: c}],
                            enabled: d.back.visible && !d.top.visible
                        }, {
                            fill: l(d.back.color).brighten(-.1).get(),
                            vertexes: [{x: m, y: g, z: r}, {x: m, y: n, z: r}, {x: q, y: b, z: c}, {x: q, y: e, z: c}],
                            enabled: d.back.visible && !d.left.visible
                        }, {
                            fill: l(d.back.color).brighten(-.1).get(),
                            vertexes: [{x: k, y: n, z: r}, {x: k, y: g, z: r}, {x: h, y: e, z: c}, {x: h, y: b, z: c}],
                            enabled: d.back.visible && !d.right.visible
                        }, {
                            fill: l(d.back.color).get(), vertexes: [{
                                x: q,
                                y: b, z: c
                            }, {x: h, y: b, z: c}, {x: h, y: e, z: c}, {x: q, y: e, z: c}], enabled: d.back.visible
                        }, {
                            fill: l(d.back.color).get(),
                            vertexes: [{x: m, y: g, z: r}, {x: k, y: g, z: r}, {x: k, y: n, z: r}, {x: m, y: n, z: r}],
                            enabled: d.back.visible
                        }]
                    });
                    this.frameShapes.front[x]({
                        "class": "highcharts-3d-frame highcharts-3d-frame-front",
                        zIndex: d.front.frontFacing ? -1E3 : 1E3,
                        faces: [{
                            fill: l(d.front.color).brighten(.1).get(),
                            vertexes: [{x: m, y: g, z: t}, {x: k, y: g, z: t}, {x: h, y: e, z: 0}, {x: q, y: e, z: 0}],
                            enabled: d.front.visible && !d.bottom.visible
                        }, {
                            fill: l(d.front.color).brighten(.1).get(),
                            vertexes: [{x: k, y: n, z: t}, {x: m, y: n, z: t}, {x: q, y: b, z: 0}, {x: h, y: b, z: 0}],
                            enabled: d.front.visible && !d.top.visible
                        }, {
                            fill: l(d.front.color).brighten(-.1).get(),
                            vertexes: [{x: m, y: n, z: t}, {x: m, y: g, z: t}, {x: q, y: e, z: 0}, {x: q, y: b, z: 0}],
                            enabled: d.front.visible && !d.left.visible
                        }, {
                            fill: l(d.front.color).brighten(-.1).get(),
                            vertexes: [{x: k, y: g, z: t}, {x: k, y: n, z: t}, {x: h, y: b, z: 0}, {x: h, y: e, z: 0}],
                            enabled: d.front.visible && !d.right.visible
                        }, {
                            fill: l(d.front.color).get(),
                            vertexes: [{x: h, y: b, z: 0}, {x: q, y: b, z: 0}, {x: q, y: e, z: 0}, {
                                x: h, y: e,
                                z: 0
                            }],
                            enabled: d.front.visible
                        }, {
                            fill: l(d.front.color).get(),
                            vertexes: [{x: k, y: g, z: t}, {x: m, y: g, z: t}, {x: m, y: n, z: t}, {x: k, y: n, z: t}],
                            enabled: d.front.visible
                        }]
                    })
                }
            }

            function y() {
                this.styledMode && [{name: "darker", slope: .6}, {name: "brighter", slope: 1.4}].forEach(function (a) {
                    this.renderer.definition({
                        tagName: "filter", attributes: {id: "highcharts-" + a.name}, children: [{
                            tagName: "feComponentTransfer",
                            children: [{
                                tagName: "feFuncR",
                                attributes: {type: "linear", slope: a.slope}
                            }, {tagName: "feFuncG", attributes: {type: "linear", slope: a.slope}},
                                {tagName: "feFuncB", attributes: {type: "linear", slope: a.slope}}]
                        }]
                    })
                }, this)
            }

            function r() {
                var a = this.options;
                this.is3d() && (a.series || []).forEach(function (f) {
                    "scatter" === (f.type || a.chart.type || a.chart.defaultSeriesType) && (f.type = "scatter3d")
                })
            }

            function p() {
                var a = this.options.chart.options3d;
                if (this.chart3d && this.is3d()) {
                    a && (a.alpha = a.alpha % 360 + (0 <= a.alpha ? 0 : 360), a.beta = a.beta % 360 + (0 <= a.beta ? 0 : 360));
                    var c = this.inverted, d = this.clipBox, h = this.margin;
                    d[c ? "y" : "x"] = -(h[3] || 0);
                    d[c ? "x" : "y"] = -(h[0] || 0);
                    d[c ? "height" :
                        "width"] = this.chartWidth + (h[3] || 0) + (h[1] || 0);
                    d[c ? "width" : "height"] = this.chartHeight + (h[0] || 0) + (h[2] || 0);
                    this.scale3d = 1;
                    !0 === a.fitToPlot && (this.scale3d = this.chart3d.getScale(a.depth));
                    this.chart3d.frame3d = this.chart3d.get3dFrame()
                }
            }

            function B() {
                this.is3d() && (this.isDirtyBox = !0)
            }

            function w() {
                this.chart3d && this.is3d() && (this.chart3d.frame3d = this.chart3d.get3dFrame())
            }

            function C() {
                this.chart3d || (this.chart3d = new I(this))
            }

            function N(a) {
                return this.is3d() || a.apply(this, [].slice.call(arguments, 1))
            }

            function h(a) {
                var f =
                    this.series.length;
                if (this.is3d()) for (; f--;) a = this.series[f], a.translate(), a.render(); else a.call(this)
            }

            function J(a) {
                a.apply(this, [].slice.call(arguments, 1));
                this.is3d() && (this.container.className += " highcharts-3d-chart")
            }

            var I = function () {
                function a(a) {
                    this.frame3d = void 0;
                    this.chart = a
                }

                a.prototype.get3dFrame = function () {
                    var a = this.chart, d = a.options.chart.options3d, f = d.frame, h = a.plotLeft,
                        b = a.plotLeft + a.plotWidth, e = a.plotTop, m = a.plotTop + a.plotHeight, k = d.depth,
                        n = function (d) {
                            d = z(d, a);
                            return .5 < d ? 1 : -.5 >
                            d ? -1 : 0
                        }, g = n([{x: h, y: m, z: k}, {x: b, y: m, z: k}, {x: b, y: m, z: 0}, {x: h, y: m, z: 0}]),
                        t = n([{x: h, y: e, z: 0}, {x: b, y: e, z: 0}, {x: b, y: e, z: k}, {x: h, y: e, z: k}]),
                        l = n([{x: h, y: e, z: 0}, {x: h, y: e, z: k}, {x: h, y: m, z: k}, {x: h, y: m, z: 0}]),
                        r = n([{x: b, y: e, z: k}, {x: b, y: e, z: 0}, {x: b, y: m, z: 0}, {x: b, y: m, z: k}]),
                        x = n([{x: h, y: m, z: 0}, {x: b, y: m, z: 0}, {x: b, y: e, z: 0}, {x: h, y: e, z: 0}]);
                    n = n([{x: h, y: e, z: k}, {x: b, y: e, z: k}, {x: b, y: m, z: k}, {x: h, y: m, z: k}]);
                    var y = !1, p = !1, D = !1, J = !1;
                    [].concat(a.xAxis, a.yAxis, a.zAxis).forEach(function (a) {
                        a && (a.horiz ? a.opposite ? p = !0 : y = !0 : a.opposite ?
                            J = !0 : D = !0)
                    });
                    var I = function (a, d, f) {
                        for (var h = ["size", "color", "visible"], b = {}, e = 0; e < h.length; e++) for (var m = h[e], k = 0; k < a.length; k++) if ("object" === typeof a[k]) {
                            var n = a[k][m];
                            if ("undefined" !== typeof n && null !== n) {
                                b[m] = n;
                                break
                            }
                        }
                        a = f;
                        !0 === b.visible || !1 === b.visible ? a = b.visible : "auto" === b.visible && (a = 0 < d);
                        return {size: c(b.size, 1), color: c(b.color, "none"), frontFacing: 0 < d, visible: a}
                    };
                    f = {
                        axes: {},
                        bottom: I([f.bottom, f.top, f], g, y),
                        top: I([f.top, f.bottom, f], t, p),
                        left: I([f.left, f.right, f.side, f], l, D),
                        right: I([f.right,
                            f.left, f.side, f], r, J),
                        back: I([f.back, f.front, f], n, !0),
                        front: I([f.front, f.back, f], x, !1)
                    };
                    "auto" === d.axisLabelPosition ? (r = function (a, d) {
                        return a.visible !== d.visible || a.visible && d.visible && a.frontFacing !== d.frontFacing
                    }, d = [], r(f.left, f.front) && d.push({
                        y: (e + m) / 2,
                        x: h,
                        z: 0,
                        xDir: {x: 1, y: 0, z: 0}
                    }), r(f.left, f.back) && d.push({
                        y: (e + m) / 2,
                        x: h,
                        z: k,
                        xDir: {x: 0, y: 0, z: -1}
                    }), r(f.right, f.front) && d.push({
                        y: (e + m) / 2,
                        x: b,
                        z: 0,
                        xDir: {x: 0, y: 0, z: 1}
                    }), r(f.right, f.back) && d.push({
                        y: (e + m) / 2,
                        x: b,
                        z: k,
                        xDir: {x: -1, y: 0, z: 0}
                    }), g = [], r(f.bottom,
                        f.front) && g.push({
                        x: (h + b) / 2,
                        y: m,
                        z: 0,
                        xDir: {x: 1, y: 0, z: 0}
                    }), r(f.bottom, f.back) && g.push({
                        x: (h + b) / 2,
                        y: m,
                        z: k,
                        xDir: {x: -1, y: 0, z: 0}
                    }), t = [], r(f.top, f.front) && t.push({
                        x: (h + b) / 2,
                        y: e,
                        z: 0,
                        xDir: {x: 1, y: 0, z: 0}
                    }), r(f.top, f.back) && t.push({
                        x: (h + b) / 2,
                        y: e,
                        z: k,
                        xDir: {x: -1, y: 0, z: 0}
                    }), l = [], r(f.bottom, f.left) && l.push({
                        z: (0 + k) / 2,
                        y: m,
                        x: h,
                        xDir: {x: 0, y: 0, z: -1}
                    }), r(f.bottom, f.right) && l.push({
                        z: (0 + k) / 2,
                        y: m,
                        x: b,
                        xDir: {x: 0, y: 0, z: 1}
                    }), m = [], r(f.top, f.left) && m.push({
                        z: (0 + k) / 2,
                        y: e,
                        x: h,
                        xDir: {x: 0, y: 0, z: -1}
                    }), r(f.top, f.right) && m.push({
                        z: (0 +
                            k) / 2, y: e, x: b, xDir: {x: 0, y: 0, z: 1}
                    }), h = function (d, f, h) {
                        if (0 === d.length) return null;
                        if (1 === d.length) return d[0];
                        for (var c = A(d, a, !1), b = 0, e = 1; e < c.length; e++) h * c[e][f] > h * c[b][f] ? b = e : h * c[e][f] === h * c[b][f] && c[e].z < c[b].z && (b = e);
                        return d[b]
                    }, f.axes = {
                        y: {left: h(d, "x", -1), right: h(d, "x", 1)},
                        x: {top: h(t, "y", -1), bottom: h(g, "y", 1)},
                        z: {top: h(m, "y", -1), bottom: h(l, "y", 1)}
                    }) : f.axes = {
                        y: {
                            left: {x: h, z: 0, xDir: {x: 1, y: 0, z: 0}},
                            right: {x: b, z: 0, xDir: {x: 0, y: 0, z: 1}}
                        },
                        x: {
                            top: {y: e, z: 0, xDir: {x: 1, y: 0, z: 0}}, bottom: {
                                y: m, z: 0, xDir: {
                                    x: 1, y: 0,
                                    z: 0
                                }
                            }
                        },
                        z: {
                            top: {x: D ? b : h, y: e, xDir: D ? {x: 0, y: 0, z: 1} : {x: 0, y: 0, z: -1}},
                            bottom: {x: D ? b : h, y: m, xDir: D ? {x: 0, y: 0, z: 1} : {x: 0, y: 0, z: -1}}
                        }
                    };
                    return f
                };
                a.prototype.getScale = function (a) {
                    var d = this.chart, f = d.plotLeft, h = d.plotWidth + f, c = d.plotTop, b = d.plotHeight + c,
                        e = f + d.plotWidth / 2, m = c + d.plotHeight / 2, k = Number.MAX_VALUE, n = -Number.MAX_VALUE,
                        g = Number.MAX_VALUE, r = -Number.MAX_VALUE, t = 1;
                    var l = [{x: f, y: c, z: 0}, {x: f, y: c, z: a}];
                    [0, 1].forEach(function (a) {
                        l.push({x: h, y: l[a].y, z: l[a].z})
                    });
                    [0, 1, 2, 3].forEach(function (a) {
                        l.push({
                            x: l[a].x,
                            y: b, z: l[a].z
                        })
                    });
                    l = A(l, d, !1);
                    l.forEach(function (a) {
                        k = Math.min(k, a.x);
                        n = Math.max(n, a.x);
                        g = Math.min(g, a.y);
                        r = Math.max(r, a.y)
                    });
                    f > k && (t = Math.min(t, 1 - Math.abs((f + e) / (k + e)) % 1));
                    h < n && (t = Math.min(t, (h - e) / (n - e)));
                    c > g && (t = 0 > g ? Math.min(t, (c + m) / (-g + c + m)) : Math.min(t, 1 - (c + m) / (g + m) % 1));
                    b < r && (t = Math.min(t, Math.abs((b - m) / (r - m))));
                    return t
                };
                return a
            }();
            a.Composition = I;
            a.defaultOptions = {
                chart: {
                    options3d: {
                        enabled: !1,
                        alpha: 0,
                        beta: 0,
                        depth: 100,
                        fitToPlot: !0,
                        viewDistance: 25,
                        axisLabelPosition: null,
                        frame: {
                            visible: "default",
                            size: 1, bottom: {}, top: {}, left: {}, right: {}, back: {}, front: {}
                        }
                    }
                }
            };
            a.compose = function (f, c) {
                var d = f.prototype;
                c = c.prototype;
                d.is3d = function () {
                    return !(!this.options.chart.options3d || !this.options.chart.options3d.enabled)
                };
                d.propsRequireDirtyBox.push("chart.options3d");
                d.propsRequireUpdateSeries.push("chart.options3d");
                c.matrixSetter = function () {
                    if (1 > this.pos && (k(this.start) || k(this.end))) {
                        var a = this.start || [1, 0, 0, 1, 0, 0], d = this.end || [1, 0, 0, 1, 0, 0];
                        var f = [];
                        for (var h = 0; 6 > h; h++) f.push(this.pos * d[h] + (1 - this.pos) *
                            a[h])
                    } else f = this.end;
                    this.elem.attr(this.prop, f, null, !0)
                };
                b(!0, g, a.defaultOptions);
                e(f, "init", C);
                e(f, "addSeries", m);
                e(f, "afterDrawChartBox", t);
                e(f, "afterGetContainer", y);
                e(f, "afterInit", r);
                e(f, "afterSetChartSize", p);
                e(f, "beforeRedraw", B);
                e(f, "beforeRender", w);
                x(d, "isInsidePlot", N);
                x(d, "renderSeries", h);
                x(d, "setClassName", J)
            }
        })(m || (m = {}));
        "";
        return m
    });
    E(a, "Core/Axis/ZAxis.js", [a["Core/Axis/Axis.js"], a["Core/Utilities.js"]], function (a, w) {
        function p(a) {
            return new b(this, a)
        }

        function A() {
            var a = this,
                b = this.options.zAxis = e(this.options.zAxis || {});
            this.is3d() && (this.zAxis = [], b.forEach(function (c, b) {
                a.addZAxis(c).setScale()
            }))
        }

        var l = this && this.__extends || function () {
            var a = function (c, b) {
                a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, c) {
                    a.__proto__ = c
                } || function (a, c) {
                    for (var b in c) Object.prototype.hasOwnProperty.call(c, b) && (a[b] = c[b])
                };
                return a(c, b)
            };
            return function (c, b) {
                function e() {
                    this.constructor = c
                }

                if ("function" !== typeof b && null !== b) throw new TypeError("Class extends value " +
                    String(b) + " is not a constructor or null");
                a(c, b);
                c.prototype = null === b ? Object.create(b) : (e.prototype = b.prototype, new e)
            }
        }(), g = w.addEvent, B = w.merge, z = w.pick, e = w.splat, k = [], b = function (a) {
            function c() {
                var c = null !== a && a.apply(this, arguments) || this;
                c.isZAxis = !0;
                return c
            }

            l(c, a);
            c.compose = function (a) {
                w.pushUnique(k, a) && (g(a, "afterGetAxes", A), a = a.prototype, a.addZAxis = p, a.collectionsWithInit.zAxis = [a.addZAxis], a.collectionsWithUpdate.push("zAxis"))
            };
            c.prototype.init = function (c, b) {
                this.isZAxis = !0;
                a.prototype.init.call(this,
                    c, b, "zAxis")
            };
            c.prototype.getSeriesExtremes = function () {
                var a = this, c = this.chart;
                this.hasVisibleSeries = !1;
                this.dataMin = this.dataMax = this.ignoreMinPadding = this.ignoreMaxPadding = void 0;
                this.stacking && this.stacking.buildStacks();
                this.series.forEach(function (b) {
                    if (b.visible || !c.options.chart.ignoreHiddenSeries) a.hasVisibleSeries = !0, b = b.zData, b.length && (a.dataMin = Math.min(z(a.dataMin, b[0]), Math.min.apply(null, b)), a.dataMax = Math.max(z(a.dataMax, b[0]), Math.max.apply(null, b)))
                })
            };
            c.prototype.setAxisSize = function () {
                var c =
                    this.chart;
                a.prototype.setAxisSize.call(this);
                this.width = this.len = c.options.chart.options3d && c.options.chart.options3d.depth || 0;
                this.right = c.chartWidth - this.width - this.left
            };
            c.prototype.setOptions = function (c) {
                c = B({offset: 0, lineWidth: 0}, c);
                a.prototype.setOptions.call(this, c)
            };
            return c
        }(a);
        return b
    });
    E(a, "Core/Axis/Axis3DDefaults.js", [], function () {
        return {labels: {position3d: "offset", skew3d: !1}, title: {position3d: null, skew3d: null}}
    });
    E(a, "Core/Axis/Tick3DComposition.js", [a["Core/Utilities.js"]], function (a) {
        function A(a) {
            var e =
                this.axis.axis3D;
            e && l(a.pos, e.fix3dPosition(a.pos))
        }

        function p(a) {
            var e = this.axis.axis3D, k = a.apply(this, [].slice.call(arguments, 1));
            if (e) {
                var b = k[0], c = k[1];
                if ("M" === b[0] && "L" === c[0]) return e = [e.fix3dPosition({
                    x: b[1],
                    y: b[2],
                    z: 0
                }), e.fix3dPosition({x: c[1], y: c[2], z: 0})], this.axis.chart.renderer.toLineSegments(e)
            }
            return k
        }

        var C = a.addEvent, l = a.extend, g = a.wrap, B = [];
        return {
            compose: function (l) {
                a.pushUnique(B, l) && (C(l, "afterGetLabelPosition", A), g(l.prototype, "getMarkPath", p))
            }
        }
    });
    E(a, "Core/Axis/Axis3DComposition.js",
        [a["Core/Axis/Axis3DDefaults.js"], a["Core/Globals.js"], a["Core/Math3D.js"], a["Core/Axis/Tick3DComposition.js"], a["Core/Utilities.js"]], function (a, w, p, C, l) {
            function g() {
                var a = this.chart, c = this.options;
                a.is3d && a.is3d() && "colorAxis" !== this.coll && (c.tickWidth = L(c.tickWidth, 0), c.gridLineWidth = L(c.gridLineWidth, 1))
            }

            function A(a) {
                this.chart.is3d() && "colorAxis" !== this.coll && a.point && (a.point.crosshairPos = this.isXAxis ? a.point.axisXpos : this.len - a.point.axisYpos)
            }

            function z() {
                this.axis3D || (this.axis3D = new K(this))
            }

            function e(a) {
                return this.chart.is3d() && "colorAxis" !== this.coll ? [] : a.apply(this, [].slice.call(arguments, 1))
            }

            function k(a) {
                if (!this.chart.is3d() || "colorAxis" === this.coll) return a.apply(this, [].slice.call(arguments, 1));
                var c = arguments, b = c[2], e = [];
                c = this.getPlotLinePath({value: c[1]});
                b = this.getPlotLinePath({value: b});
                if (c && b) for (var f = 0; f < c.length; f += 2) {
                    var k = c[f], d = c[f + 1], m = b[f], g = b[f + 1];
                    "M" === k[0] && "L" === d[0] && "M" === m[0] && "L" === g[0] && e.push(k, d, g, ["L", m[1], m[2]], ["Z"])
                }
                return e
            }

            function b(a) {
                var c =
                    this.axis3D, b = this.chart, e = a.apply(this, [].slice.call(arguments, 1));
                if ("colorAxis" === this.coll || !b.chart3d || !b.is3d() || null === e) return e;
                var f = b.options.chart.options3d, k = this.isZAxis ? b.plotWidth : f.depth;
                f = b.chart3d.frame3d;
                var d = e[0], m = e[1];
                e = [];
                "M" === d[0] && "L" === m[0] && (c = [c.swapZ({x: d[1], y: d[2], z: 0}), c.swapZ({
                    x: d[1],
                    y: d[2],
                    z: k
                }), c.swapZ({x: m[1], y: m[2], z: 0}), c.swapZ({
                    x: m[1],
                    y: m[2],
                    z: k
                })], this.horiz ? (this.isZAxis ? (f.left.visible && e.push(c[0], c[2]), f.right.visible && e.push(c[1], c[3])) : (f.front.visible &&
                e.push(c[0], c[2]), f.back.visible && e.push(c[1], c[3])), f.top.visible && e.push(c[0], c[1]), f.bottom.visible && e.push(c[2], c[3])) : (f.front.visible && e.push(c[0], c[2]), f.back.visible && e.push(c[1], c[3]), f.left.visible && e.push(c[0], c[1]), f.right.visible && e.push(c[2], c[3])), e = t(e, this.chart, !1));
                return b.renderer.toLineSegments(e)
            }

            function c(a, c) {
                var b = this.chart, e = this.ticks, f = this.gridGroup;
                if (this.categories && b.frameShapes && b.is3d() && f && c && c.label) {
                    f = f.element.childNodes[0].getBBox();
                    var h = b.frameShapes.left.getBBox(),
                        d = b.options.chart.options3d;
                    b = {
                        x: b.plotWidth / 2,
                        y: b.plotHeight / 2,
                        z: d.depth / 2,
                        vd: L(d.depth, 1) * L(d.viewDistance, 0)
                    };
                    d = c.pos;
                    var k = e[d - 1], m = e[d + 1], g = e = void 0;
                    0 !== d && k && k.label && k.label.xy && (e = n({
                        x: k.label.xy.x,
                        y: k.label.xy.y,
                        z: null
                    }, b, b.vd));
                    m && m.label && m.label.xy && (g = n({x: m.label.xy.x, y: m.label.xy.y, z: null}, b, b.vd));
                    d = {x: c.label.xy.x, y: c.label.xy.y, z: null};
                    d = n(d, b, b.vd);
                    return Math.abs(e ? d.x - e.x : g ? g.x - d.x : f.x - h.x)
                }
                return a.apply(this, [].slice.call(arguments, 1))
            }

            function x(a) {
                var c = a.apply(this, [].slice.call(arguments,
                    1));
                return this.axis3D ? this.axis3D.fix3dPosition(c, !0) : c
            }

            var m = w.deg2rad, t = p.perspective, n = p.perspective3D, D = p.shapeArea, y = l.addEvent, r = l.merge,
                L = l.pick, G = l.wrap, H = [], K = function () {
                    function n(a) {
                        this.axis = a
                    }

                    n.compose = function (h, m) {
                        C.compose(m);
                        l.pushUnique(H, h) && (r(!0, h.defaultOptions, a), h.keepProps.push("axis3D"), y(h, "init", z), y(h, "afterSetOptions", g), y(h, "drawCrosshair", A), h = h.prototype, G(h, "getLinePath", e), G(h, "getPlotBandPath", k), G(h, "getPlotLinePath", b), G(h, "getSlotWidth", c), G(h, "getTitlePosition",
                            x))
                    };
                    n.prototype.fix3dPosition = function (a, c) {
                        var b = this.axis, f = b.chart;
                        if ("colorAxis" === b.coll || !f.chart3d || !f.is3d()) return a;
                        var e = m * f.options.chart.options3d.alpha, d = m * f.options.chart.options3d.beta,
                            k = L(c && b.options.title.position3d, b.options.labels.position3d);
                        c = L(c && b.options.title.skew3d, b.options.labels.skew3d);
                        var h = f.chart3d.frame3d, g = f.plotLeft, n = f.plotWidth + g, l = f.plotTop, r = f.plotHeight + l,
                            y = f = 0, p = {x: 0, y: 1, z: 0}, x = !1;
                        a = b.axis3D.swapZ({x: a.x, y: a.y, z: 0});
                        if (b.isZAxis) if (b.opposite) {
                            if (null ===
                                h.axes.z.top) return {};
                            y = a.y - l;
                            a.x = h.axes.z.top.x;
                            a.y = h.axes.z.top.y;
                            g = h.axes.z.top.xDir;
                            x = !h.top.frontFacing
                        } else {
                            if (null === h.axes.z.bottom) return {};
                            y = a.y - r;
                            a.x = h.axes.z.bottom.x;
                            a.y = h.axes.z.bottom.y;
                            g = h.axes.z.bottom.xDir;
                            x = !h.bottom.frontFacing
                        } else if (b.horiz) if (b.opposite) {
                            if (null === h.axes.x.top) return {};
                            y = a.y - l;
                            a.y = h.axes.x.top.y;
                            a.z = h.axes.x.top.z;
                            g = h.axes.x.top.xDir;
                            x = !h.top.frontFacing
                        } else {
                            if (null === h.axes.x.bottom) return {};
                            y = a.y - r;
                            a.y = h.axes.x.bottom.y;
                            a.z = h.axes.x.bottom.z;
                            g = h.axes.x.bottom.xDir;
                            x = !h.bottom.frontFacing
                        } else if (b.opposite) {
                            if (null === h.axes.y.right) return {};
                            f = a.x - n;
                            a.x = h.axes.y.right.x;
                            a.z = h.axes.y.right.z;
                            g = h.axes.y.right.xDir;
                            g = {x: g.z, y: g.y, z: -g.x}
                        } else {
                            if (null === h.axes.y.left) return {};
                            f = a.x - g;
                            a.x = h.axes.y.left.x;
                            a.z = h.axes.y.left.z;
                            g = h.axes.y.left.xDir
                        }
                        "chart" !== k && ("flap" === k ? b.horiz ? (d = Math.sin(e), e = Math.cos(e), b.opposite && (d = -d), x && (d = -d), p = {
                            x: g.z * d,
                            y: e,
                            z: -g.x * d
                        }) : g = {
                            x: Math.cos(d),
                            y: 0,
                            z: Math.sin(d)
                        } : "ortho" === k ? b.horiz ? (p = Math.cos(e), k = Math.sin(d) * p, e = -Math.sin(e), d =
                            -p * Math.cos(d), p = {
                            x: g.y * d - g.z * e,
                            y: g.z * k - g.x * d,
                            z: g.x * e - g.y * k
                        }, e = 1 / Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z), x && (e = -e), p = {
                            x: e * p.x,
                            y: e * p.y,
                            z: e * p.z
                        }) : g = {x: Math.cos(d), y: 0, z: Math.sin(d)} : b.horiz ? p = {
                            x: Math.sin(d) * Math.sin(e),
                            y: Math.cos(e),
                            z: -Math.cos(d) * Math.sin(e)
                        } : g = {x: Math.cos(d), y: 0, z: Math.sin(d)});
                        a.x += f * g.x + y * p.x;
                        a.y += f * g.y + y * p.y;
                        a.z += f * g.z + y * p.z;
                        f = t([a], b.chart)[0];
                        c && (0 > D(t([a, {x: a.x + g.x, y: a.y + g.y, z: a.z + g.z}, {
                            x: a.x + p.x,
                            y: a.y + p.y,
                            z: a.z + p.z
                        }], b.chart)) && (g = {x: -g.x, y: -g.y, z: -g.z}), a = t([{x: a.x, y: a.y, z: a.z},
                            {x: a.x + g.x, y: a.y + g.y, z: a.z + g.z}, {
                                x: a.x + p.x,
                                y: a.y + p.y,
                                z: a.z + p.z
                            }], b.chart), f.matrix = [a[1].x - a[0].x, a[1].y - a[0].y, a[2].x - a[0].x, a[2].y - a[0].y, f.x, f.y], f.matrix[4] -= f.x * f.matrix[0] + f.y * f.matrix[2], f.matrix[5] -= f.x * f.matrix[1] + f.y * f.matrix[3]);
                        return f
                    };
                    n.prototype.swapZ = function (a, c) {
                        var b = this.axis;
                        return b.isZAxis ? (c = c ? 0 : b.chart.plotLeft, {x: c + a.z, y: a.y, z: a.x - c}) : a
                    };
                    return n
                }();
            return K
        });
    E(a, "Core/Series/Series3D.js", [a["Core/Math3D.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]], function (a,
                                                                                                                         w, p) {
        var A = this && this.__extends || function () {
                var a = function (b, c) {
                    a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, c) {
                        a.__proto__ = c
                    } || function (a, c) {
                        for (var b in c) Object.prototype.hasOwnProperty.call(c, b) && (a[b] = c[b])
                    };
                    return a(b, c)
                };
                return function (b, c) {
                    function e() {
                        this.constructor = b
                    }

                    if ("function" !== typeof c && null !== c) throw new TypeError("Class extends value " + String(c) + " is not a constructor or null");
                    a(b, c);
                    b.prototype = null === c ? Object.create(c) : (e.prototype = c.prototype, new e)
                }
            }(),
            l = a.perspective;
        a = p.addEvent;
        var g = p.extend, B = p.merge, z = p.pick, e = p.isNumber;
        p = function (a) {
            function b() {
                return null !== a && a.apply(this, arguments) || this
            }

            A(b, a);
            b.prototype.translate = function () {
                a.prototype.translate.apply(this, arguments);
                this.chart.is3d() && this.translate3dPoints()
            };
            b.prototype.translate3dPoints = function () {
                var a = this.options, b = this.chart, g = z(this.zAxis, b.options.zAxis[0]), k = [], n, p = [];
                this.zPadding = (a.stacking ? e(a.stack) ? a.stack : 0 : this.index || 0) * (a.depth || 0 + (a.groupZPadding || 1));
                for (n =
                         0; n < this.data.length; n++) {
                    a = this.data[n];
                    if (g && g.translate) {
                        var y = g.logarithmic && g.val2lin ? g.val2lin(a.z) : a.z;
                        a.plotZ = g.translate(y);
                        a.isInside = a.isInside ? y >= g.min && y <= g.max : !1
                    } else a.plotZ = this.zPadding;
                    a.axisXpos = a.plotX;
                    a.axisYpos = a.plotY;
                    a.axisZpos = a.plotZ;
                    k.push({x: a.plotX, y: a.plotY, z: a.plotZ});
                    p.push(a.plotX || 0)
                }
                this.rawPointsX = p;
                b = l(k, b, !0);
                for (n = 0; n < this.data.length; n++) a = this.data[n], g = b[n], a.plotX = g.x, a.plotY = g.y, a.plotZ = g.z
            };
            b.defaultOptions = B(w.defaultOptions);
            return b
        }(w);
        a(w, "afterTranslate",
            function () {
                this.chart.is3d() && this.translate3dPoints()
            });
        g(w.prototype, {translate3dPoints: p.prototype.translate3dPoints});
        return p
    });
    E(a, "Series/Area3D/Area3DSeries.js", [a["Core/Math3D.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, w, p) {
        function A(a) {
            var e = a.apply(this, [].slice.call(arguments, 1));
            if (!this.chart.is3d()) return e;
            var b = g.getGraphPath, c = this.options, p = Math.round(this.yAxis.getThreshold(c.threshold)), m = [];
            if (this.rawPointsX) for (var t = 0; t < this.points.length; t++) m.push({
                x: this.rawPointsX[t],
                y: c.stacking ? this.points[t].yBottom : p, z: this.zPadding
            });
            c = this.chart.options.chart.options3d;
            m = l(m, this.chart, !0).map(function (a) {
                return {plotX: a.x, plotY: a.y, plotZ: a.z}
            });
            this.group && c && c.depth && c.beta && (this.markerGroup && (this.markerGroup.add(this.group), this.markerGroup.attr({
                translateX: 0,
                translateY: 0
            })), this.group.attr({zIndex: Math.max(1, 270 < c.beta || 90 > c.beta ? c.depth - Math.round(this.zPadding || 0) : Math.round(this.zPadding || 0))}));
            m.reversed = !0;
            b = b.call(this, m, !0, !0);
            b[0] && "M" === b[0][0] && (b[0] = ["L",
                b[0][1], b[0][2]]);
            this.areaPath && (b = this.areaPath.splice(0, this.areaPath.length / 2).concat(b), b.xMap = this.areaPath.xMap, this.areaPath = b);
            return e
        }

        var l = a.perspective, g = w.seriesTypes.line.prototype, B = p.wrap, z = [];
        return {
            compose: function (a) {
                p.pushUnique(z, a) && B(a.prototype, "getGraphPath", A)
            }
        }
    });
    E(a, "Series/Column3D/Column3DComposition.js", [a["Series/Column/ColumnSeries.js"], a["Core/Series/Series.js"], a["Core/Math3D.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Axis/Stacking/StackItem.js"], a["Core/Utilities.js"]],
        function (a, w, p, C, l, g) {
            function B(a, b) {
                var c = a.series, e = {totalStacks: 0}, g, k = 1;
                c.forEach(function (a) {
                    g = m(a.options.stack, b ? 0 : c.length - 1 - a.index);
                    e[g] ? e[g].series.push(a) : (e[g] = {series: [a], position: k}, k++)
                });
                e.totalStacks = k + 1;
                return e
            }

            function z(a) {
                var b = a.apply(this, [].slice.call(arguments, 1));
                this.chart.is3d && this.chart.is3d() && (b.stroke = this.options.edgeColor || b.fill, b["stroke-width"] = m(this.options.edgeWidth, 1));
                return b
            }

            function e(a, b, c) {
                var e = this.chart.is3d && this.chart.is3d();
                e && (this.options.inactiveOtherPoints =
                    !0);
                a.call(this, b, c);
                e && (this.options.inactiveOtherPoints = !1)
            }

            function k(a) {
                for (var b = [], c = 1; c < arguments.length; c++) b[c - 1] = arguments[c];
                return this.series.chart.is3d() ? this.graphic && "g" !== this.graphic.element.nodeName : a.apply(this, b)
            }

            var b = a.prototype, c = p.perspective;
            p = g.addEvent;
            var x = g.extend, m = g.pick;
            g = g.wrap;
            g(b, "translate", function (a) {
                a.apply(this, [].slice.call(arguments, 1));
                this.chart.is3d() && this.translate3dShapes()
            });
            g(w.prototype, "justifyDataLabel", function (a) {
                return arguments[2].outside3dPlot ?
                    !1 : a.apply(this, [].slice.call(arguments, 1))
            });
            b.translate3dPoints = function () {
            };
            b.translate3dShapes = function () {
                var a = this, b = a.chart, e = a.options, g = e.depth,
                    k = (e.stacking ? e.stack || 0 : a.index) * (g + (e.groupZPadding || 1)),
                    m = a.borderWidth % 2 ? .5 : 0, l;
                b.inverted && !a.yAxis.reversed && (m *= -1);
                !1 !== e.grouping && (k = 0);
                k += e.groupZPadding || 1;
                a.data.forEach(function (e) {
                    e.outside3dPlot = null;
                    if (null !== e.y) {
                        var n = x({x: 0, y: 0, width: 0, height: 0}, e.shapeArgs || {}), r = e.tooltipPos, h;
                        [["x", "width"], ["y", "height"]].forEach(function (b) {
                            h =
                                n[b[0]] - m;
                            0 > h && (n[b[1]] += n[b[0]] + m, n[b[0]] = -m, h = 0);
                            h + n[b[1]] > a[b[0] + "Axis"].len && 0 !== n[b[1]] && (n[b[1]] = a[b[0] + "Axis"].len - n[b[0]]);
                            if (0 !== n[b[1]] && (n[b[0]] >= a[b[0] + "Axis"].len || n[b[0]] + n[b[1]] <= m)) {
                                for (var c in n) n[c] = "y" === c ? -9999 : 0;
                                e.outside3dPlot = !0
                            }
                        });
                        "roundedRect" === e.shapeType && (e.shapeType = "cuboid");
                        e.shapeArgs = x(n, {z: k, depth: g, insidePlotArea: !0});
                        l = {x: n.x + n.width / 2, y: n.y, z: k + g / 2};
                        b.inverted && (l.x = n.height, l.y = e.clientX || 0);
                        e.plot3d = c([l], b, !0, !1)[0];
                        r && (r = c([{x: r[0], y: r[1], z: k + g / 2}], b, !0,
                            !1)[0], e.tooltipPos = [r.x, r.y])
                    }
                });
                a.z = k
            };
            g(b, "animate", function (a) {
                if (this.chart.is3d()) {
                    var b = this.yAxis, c = this, e = this.yAxis.reversed;
                    arguments[1] ? c.data.forEach(function (a) {
                        null !== a.y && (a.height = a.shapeArgs.height, a.shapey = a.shapeArgs.y, a.shapeArgs.height = 1, e || (a.shapeArgs.y = a.stackY ? a.plotY + b.translate(a.stackY) : a.plotY + (a.negative ? -a.height : a.height)))
                    }) : (c.data.forEach(function (a) {
                        if (null !== a.y && (a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic)) a.graphic[a.outside3dPlot ? "attr" : "animate"](a.shapeArgs,
                            c.options.animation)
                    }), this.drawDataLabels())
                } else a.apply(this, [].slice.call(arguments, 1))
            });
            g(b, "plotGroup", function (a, b, c, e, g, k) {
                "dataLabelsGroup" !== b && "markerGroup" !== b && this.chart.is3d() && (this[b] && delete this[b], k && (this.chart.columnGroup || (this.chart.columnGroup = this.chart.renderer.g("columnGroup").add(k)), this[b] = this.chart.columnGroup, this.chart.columnGroup.attr(this.getPlotBox()), this[b].survive = !0, "group" === b && (arguments[3] = "visible")));
                return a.apply(this, Array.prototype.slice.call(arguments,
                    1))
            });
            g(b, "setVisible", function (a, b) {
                var c = this;
                c.chart.is3d() && c.data.forEach(function (a) {
                    a.visible = a.options.visible = b = "undefined" === typeof b ? !m(c.visible, a.visible) : b;
                    c.options.data[c.data.indexOf(a)] = a.options;
                    a.graphic && a.graphic.attr({visibility: b ? "visible" : "hidden"})
                });
                a.apply(this, Array.prototype.slice.call(arguments, 1))
            });
            p(a, "afterInit", function () {
                if (this.chart.is3d()) {
                    var a = this.options, b = a.grouping, c = a.stacking, e = this.yAxis.options.reversedStacks, g = 0;
                    if ("undefined" === typeof b || b) {
                        b = B(this.chart,
                            c);
                        g = a.stack || 0;
                        for (c = 0; c < b[g].series.length && b[g].series[c] !== this; c++) ;
                        g = 10 * (b.totalStacks - b[g].position) + (e ? c : -c);
                        this.xAxis.reversed || (g = 10 * b.totalStacks - g)
                    }
                    a.depth = a.depth || 25;
                    this.z = this.z || 0;
                    a.zIndex = g
                }
            });
            g(b, "pointAttribs", z);
            g(b, "setState", e);
            g(b.pointClass.prototype, "hasNewShapeType", k);
            C.seriesTypes.columnRange && (p = C.seriesTypes.columnrange.prototype, g(p, "pointAttribs", z), g(p, "setState", e), g(p.pointClass.prototype, "hasNewShapeType", k), p.plotGroup = b.plotGroup, p.setVisible = b.setVisible);
            g(w.prototype, "alignDataLabel", function (a, b, e, g, k) {
                var l = this.chart;
                g.outside3dPlot = b.outside3dPlot;
                if (l.is3d() && this.is("column")) {
                    var n = this.options, p = m(g.inside, !!this.options.stacking), r = l.options.chart.options3d,
                        t = b.pointWidth / 2 || 0;
                    n = {x: k.x + t, y: k.y, z: this.z + n.depth / 2};
                    l.inverted && (p && (k.width = 0, n.x += b.shapeArgs.height / 2), 90 <= r.alpha && 270 >= r.alpha && (n.y += b.shapeArgs.width));
                    n = c([n], l, !0, !1)[0];
                    k.x = n.x - t;
                    k.y = b.outside3dPlot ? -9E9 : n.y
                }
                a.apply(this, [].slice.call(arguments, 1))
            });
            g(l.prototype, "getStackBox",
                function (a, b) {
                    var e = a.apply(this, [].slice.call(arguments, 1)), g = this.axis.chart, k = b.width;
                    if (g.is3d() && this.base) {
                        var m = +this.base.split(",")[0], l = g.series[m];
                        m = g.options.chart.options3d;
                        l && l instanceof C.seriesTypes.column && (l = {
                            x: e.x + (g.inverted ? e.height : k / 2),
                            y: e.y,
                            z: l.options.depth / 2
                        }, g.inverted && (e.width = 0, 90 <= m.alpha && 270 >= m.alpha && (l.y += k)), l = c([l], g, !0, !1)[0], e.x = l.x - k / 2, e.y = l.y)
                    }
                    return e
                });
            "";
            return a
        });
    E(a, "Series/Pie3D/Pie3DPoint.js", [a["Core/Series/SeriesRegistry.js"]], function (a) {
        var w =
            this && this.__extends || function () {
                var a = function (l, g) {
                    a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, g) {
                        a.__proto__ = g
                    } || function (a, g) {
                        for (var e in g) Object.prototype.hasOwnProperty.call(g, e) && (a[e] = g[e])
                    };
                    return a(l, g)
                };
                return function (l, g) {
                    function p() {
                        this.constructor = l
                    }

                    if ("function" !== typeof g && null !== g) throw new TypeError("Class extends value " + String(g) + " is not a constructor or null");
                    a(l, g);
                    l.prototype = null === g ? Object.create(g) : (p.prototype = g.prototype, new p)
                }
            }();
        a = a.seriesTypes.pie.prototype.pointClass;
        var p = a.prototype.haloPath;
        return function (a) {
            function l() {
                var g = null !== a && a.apply(this, arguments) || this;
                g.series = void 0;
                return g
            }

            w(l, a);
            l.prototype.haloPath = function () {
                var a;
                return (null === (a = this.series) || void 0 === a ? 0 : a.chart.is3d()) ? [] : p.apply(this, arguments)
            };
            return l
        }(a)
    });
    E(a, "Series/Pie3D/Pie3DSeries.js", [a["Core/Globals.js"], a["Series/Pie3D/Pie3DPoint.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, w, p, C) {
        var l = this && this.__extends || function () {
            var a = function (e, g) {
                a =
                    Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, c) {
                        a.__proto__ = c
                    } || function (a, c) {
                        for (var b in c) Object.prototype.hasOwnProperty.call(c, b) && (a[b] = c[b])
                    };
                return a(e, g)
            };
            return function (e, g) {
                function b() {
                    this.constructor = e
                }

                if ("function" !== typeof g && null !== g) throw new TypeError("Class extends value " + String(g) + " is not a constructor or null");
                a(e, g);
                e.prototype = null === g ? Object.create(g) : (b.prototype = g.prototype, new b)
            }
        }(), g = a.deg2rad;
        a = C.extend;
        var B = C.pick;
        p = function (a) {
            function e() {
                return null !==
                    a && a.apply(this, arguments) || this
            }

            l(e, a);
            e.prototype.addPoint = function () {
                a.prototype.addPoint.apply(this, arguments);
                this.chart.is3d() && this.update(this.userOptions, !0)
            };
            e.prototype.animate = function (e) {
                if (this.chart.is3d()) {
                    var b = this.options.animation;
                    var c = this.center;
                    var g = this.group, k = this.markerGroup;
                    !0 === b && (b = {});
                    e ? (g.oldtranslateX = B(g.oldtranslateX, g.translateX), g.oldtranslateY = B(g.oldtranslateY, g.translateY), c = {
                        translateX: c[0],
                        translateY: c[1],
                        scaleX: .001,
                        scaleY: .001
                    }, g.attr(c), k && (k.attrSetters =
                        g.attrSetters, k.attr(c))) : (c = {
                        translateX: g.oldtranslateX,
                        translateY: g.oldtranslateY,
                        scaleX: 1,
                        scaleY: 1
                    }, g.animate(c, b), k && k.animate(c, b))
                } else a.prototype.animate.apply(this, arguments)
            };
            e.prototype.drawDataLabels = function () {
                if (this.chart.is3d()) {
                    var e = this.chart.options.chart.options3d;
                    this.data.forEach(function (a) {
                        var b = a.shapeArgs, k = b.r, m = (b.start + b.end) / 2;
                        a = a.labelPosition;
                        var l = a.connectorPosition, n = -k * (1 - Math.cos((b.alpha || e.alpha) * g)) * Math.sin(m),
                            p = k * (Math.cos((b.beta || e.beta) * g) - 1) * Math.cos(m);
                        [a.natural, l.breakAt, l.touchingSliceAt].forEach(function (a) {
                            a.x += p;
                            a.y += n
                        })
                    })
                }
                a.prototype.drawDataLabels.apply(this, arguments)
            };
            e.prototype.pointAttribs = function (e) {
                var b = a.prototype.pointAttribs.apply(this, arguments), c = this.options;
                this.chart.is3d() && !this.chart.styledMode && (b.stroke = c.edgeColor || e.color || this.color, b["stroke-width"] = B(c.edgeWidth, 1));
                return b
            };
            e.prototype.translate = function () {
                a.prototype.translate.apply(this, arguments);
                if (this.chart.is3d()) {
                    var e = this, b = e.options, c = b.depth || 0, l =
                            e.chart.options.chart.options3d, m = l.alpha, p = l.beta,
                        n = b.stacking ? (b.stack || 0) * c : e._i * c;
                    n += c / 2;
                    !1 !== b.grouping && (n = 0);
                    e.data.forEach(function (a) {
                        var k = a.shapeArgs;
                        a.shapeType = "arc3d";
                        k.z = n;
                        k.depth = .75 * c;
                        k.alpha = m;
                        k.beta = p;
                        k.center = e.center;
                        k = (k.end + k.start) / 2;
                        a.slicedTranslation = {
                            translateX: Math.round(Math.cos(k) * b.slicedOffset * Math.cos(m * g)),
                            translateY: Math.round(Math.sin(k) * b.slicedOffset * Math.cos(m * g))
                        }
                    })
                }
            };
            e.prototype.drawTracker = function () {
                a.prototype.drawTracker.apply(this, arguments);
                this.chart.is3d() &&
                this.points.forEach(function (a) {
                    a.graphic && ["out", "inn", "side1", "side2"].forEach(function (b) {
                        a.graphic && (a.graphic[b].element.point = a)
                    })
                })
            };
            return e
        }(p.seriesTypes.pie);
        a(p.prototype, {pointClass: w});
        "";
        return p
    });
    E(a, "Series/Pie3D/Pie3DComposition.js", [a["Series/Pie3D/Pie3DPoint.js"], a["Series/Pie3D/Pie3DSeries.js"], a["Core/Series/SeriesRegistry.js"]], function (a, w, p) {
        p.seriesTypes.pie.prototype.pointClass.prototype.haloPath = a.prototype.haloPath;
        p.seriesTypes.pie = w
    });
    E(a, "Series/Scatter3D/Scatter3DPoint.js",
        [a["Series/Scatter/ScatterSeries.js"], a["Core/Utilities.js"]], function (a, w) {
            var p = this && this.__extends || function () {
                var a = function (g, l) {
                    a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, e) {
                        a.__proto__ = e
                    } || function (a, e) {
                        for (var g in e) Object.prototype.hasOwnProperty.call(e, g) && (a[g] = e[g])
                    };
                    return a(g, l)
                };
                return function (g, l) {
                    function p() {
                        this.constructor = g
                    }

                    if ("function" !== typeof l && null !== l) throw new TypeError("Class extends value " + String(l) + " is not a constructor or null");
                    a(g, l);
                    g.prototype = null === l ? Object.create(l) : (p.prototype = l.prototype, new p)
                }
            }(), A = w.defined;
            return function (a) {
                function g() {
                    var g = null !== a && a.apply(this, arguments) || this;
                    g.options = void 0;
                    g.series = void 0;
                    return g
                }

                p(g, a);
                g.prototype.applyOptions = function () {
                    a.prototype.applyOptions.apply(this, arguments);
                    A(this.z) || (this.z = 0);
                    return this
                };
                return g
            }(a.prototype.pointClass)
        });
    E(a, "Series/Scatter3D/Scatter3DSeries.js", [a["Core/Math3D.js"], a["Series/Scatter3D/Scatter3DPoint.js"], a["Series/Scatter/ScatterSeries.js"],
        a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, w, p, C, l) {
        var g = this && this.__extends || function () {
            var a = function (e, b) {
                a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                    a.__proto__ = b
                } || function (a, b) {
                    for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
                };
                return a(e, b)
            };
            return function (e, b) {
                function c() {
                    this.constructor = e
                }

                if ("function" !== typeof b && null !== b) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                a(e,
                    b);
                e.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
            }
        }(), A = a.pointCameraDistance;
        a = l.extend;
        var z = l.merge;
        l = function (a) {
            function e() {
                var b = null !== a && a.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }

            g(e, a);
            e.prototype.pointAttribs = function (b) {
                var c = a.prototype.pointAttribs.apply(this, arguments);
                this.chart.is3d() && b && (c.zIndex = A(b, this.chart));
                return c
            };
            e.defaultOptions = z(p.defaultOptions, {tooltip: {pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>"}});
            return e
        }(p);
        a(l.prototype, {
            axisTypes: ["xAxis", "yAxis", "zAxis"],
            directTouch: !0,
            parallelArrays: ["x", "y", "z"],
            pointArrayMap: ["x", "y", "z"],
            pointClass: w
        });
        C.registerSeriesType("scatter3d", l);
        "";
        return l
    });
    E(a, "masters/highcharts-3d.src.js", [a["Core/Globals.js"], a["Core/Renderer/SVG/SVGRenderer3D.js"], a["Core/Chart/Chart3D.js"], a["Core/Axis/ZAxis.js"], a["Core/Axis/Axis3DComposition.js"], a["Series/Area3D/Area3DSeries.js"]], function (a, w, p, C, l, g) {
        w.compose(a.SVGRenderer);
        p.compose(a.Chart, a.Fx);
        C.compose(a.Chart);
        l.compose(a.Axis, a.Tick);
        g.compose(a.seriesTypes.area)
    })
});
//# sourceMappingURL=highcharts-3d.js.map