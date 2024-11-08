/*
 Highcharts JS v11.1.0 (2023-06-05)

 Boost module

 (c) 2010-2021 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/boost-canvas", ["highcharts"], function (u) {
        a(u);
        a.Highcharts = u;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function u(a, h, c, n) {
        a.hasOwnProperty(h) || (a[h] = n.apply(null, c), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: h,
                module: a[h]
            }
        })))
    }

    a = a ?
        a._modules : {};
    u(a, "Extensions/Boost/Boostables.js", [], function () {
        return "area areaspline arearange column columnrange bar line scatter heatmap bubble treemap".split(" ")
    });
    u(a, "Extensions/Boost/BoostableMap.js", [a["Extensions/Boost/Boostables.js"]], function (a) {
        var h = {};
        a.forEach(function (a) {
            h[a] = !0
        });
        return h
    });
    u(a, "Extensions/Boost/BoostChart.js", [a["Extensions/Boost/BoostableMap.js"], a["Core/Utilities.js"]], function (a, h) {
        function c(b) {
            var f = b.series, h = b.boost = b.boost || {}, A = b.options.boost || {}, c =
                B(A.seriesThreshold, 50);
            if (f.length >= c) return !0;
            if (1 === f.length) return !1;
            A = A.allowForce;
            if ("undefined" === typeof A) for (A = !0, c = 0, b = b.xAxis; c < b.length; c++) {
                var l = b[c];
                if (B(l.min, -Infinity) > B(l.dataMin, -Infinity) || B(l.max, Infinity) < B(l.dataMax, Infinity)) {
                    A = !1;
                    break
                }
            }
            if ("undefined" !== typeof h.forceChartBoost) {
                if (A) return h.forceChartBoost;
                h.forceChartBoost = void 0
            }
            for (var n = c = b = 0; n < f.length; n++) {
                var J = f[n];
                l = J.options;
                0 !== l.boostThreshold && !1 !== J.visible && "heatmap" !== J.type && (a[J.type] && ++b, r(J.processedXData,
                    l.data, J.points) >= (l.boostThreshold || Number.MAX_VALUE) && ++c)
            }
            h.forceChartBoost = A && (b === f.length && 0 < c || 5 < c);
            return h.forceChartBoost
        }

        function n(b) {
            f(b, "predraw", function () {
                b.boost = b.boost || {};
                b.boost.forceChartBoost = void 0;
                b.boosted = !1;
                b.boost.clear && b.boost.clear();
                b.boost.canvas && b.boost.wgl && c(b) && b.boost.wgl.allocateBuffer(b);
                b.boost.markerGroup && b.xAxis && 0 < b.xAxis.length && b.yAxis && 0 < b.yAxis.length && b.boost.markerGroup.translate(b.xAxis[0].pos, b.yAxis[0].pos)
            });
            f(b, "render", function () {
                b.boost &&
                b.boost.wgl && c(b) && b.boost.wgl.render(b)
            });
            var a = -1, h = -1;
            f(b.pointer, "afterGetHoverData", function () {
                var f = b.hoverSeries;
                b.boost = b.boost || {};
                if (b.boost.markerGroup && f) {
                    var r = b.inverted ? f.yAxis : f.xAxis;
                    f = b.inverted ? f.xAxis : f.yAxis;
                    if (r && r.pos !== a || f && f.pos !== h) b.boost.markerGroup.translate(r.pos, f.pos), a = r.pos, h = f.pos
                }
            })
        }

        function r() {
            for (var b = [], f = 0; f < arguments.length; f++) b[f] = arguments[f];
            var a = -Number.MAX_VALUE;
            b.forEach(function (b) {
                if ("undefined" !== typeof b && null !== b && "undefined" !== typeof b.length &&
                    0 < b.length) return a = b.length, !0
            });
            return a
        }

        var f = h.addEvent, B = h.pick, l = [];
        return {
            compose: function (b, f) {
                f && h.pushUnique(l, b) && b.prototype.callbacks.push(n);
                return b
            }, getBoostClipRect: function (b, f) {
                var a = {x: b.plotLeft, y: b.plotTop, width: b.plotWidth, height: b.plotHeight};
                f === b && (f = b.inverted ? b.xAxis : b.yAxis, 1 >= f.length ? (a.y = Math.min(f[0].pos, a.y), a.height = f[0].pos - b.plotTop + f[0].len) : a.height = b.plotHeight);
                return a
            }, isChartSeriesBoosting: c
        }
    });
    u(a, "Extensions/Boost/WGLDrawMode.js", [], function () {
        return {
            area: "LINES",
            arearange: "LINES",
            areaspline: "LINES",
            column: "LINES",
            columnrange: "LINES",
            bar: "LINES",
            line: "LINE_STRIP",
            scatter: "POINTS",
            heatmap: "TRIANGLES",
            treemap: "TRIANGLES",
            bubble: "POINTS"
        }
    });
    u(a, "Extensions/Boost/WGLShader.js", [a["Core/Utilities.js"]], function (a) {
        var h = a.clamp, c = a.error, n = a.pick;
        return function () {
            function a(a) {
                this.errors = [];
                this.uLocations = {};
                (this.gl = a) && this.createShader()
            }

            a.prototype.bind = function () {
                this.gl && this.shaderProgram && this.gl.useProgram(this.shaderProgram)
            };
            a.prototype.createShader =
                function () {
                    var a = this,
                        h = this.stringToProgram("#version 100\n#define LN10 2.302585092994046\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform bool  xAxisIsLog;\nuniform bool  xAxisReversed;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  yAxisIsLog;\nuniform bool  yAxisReversed;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value = aVertexPosition.w;\nfloat zMax = bubbleZMax;\nfloat zMin = bubbleZMin;\nfloat radius = 0.0;\nfloat pos = 0.0;\nfloat zRange = zMax - zMin;\nif (bubbleSizeAbs){\nvalue = value - bubbleZThreshold;\nzMax = max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin = 0.0;\n}\nif (value < zMin){\nradius = bubbleZMin / 2.0 - 1.0;\n} else {\npos = zRange > 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea && pos > 0.0){\npos = sqrt(pos);\n}\nradius = ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord,\nbool  isLog,\nbool  reversed\n){\nfloat sign = 1.0;\nfloat cvsOffset = 0.0;\nif (cvsCoord) {\nsign *= -1.0;\ncvsOffset = len;\n}\nif (isLog) {\nval = log(val) / LN10;\n}\nif (reversed) {\nsign *= -1.0;\ncvsOffset -= sign * len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value) {\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord, xAxisIsLog, xAxisReversed);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold) {\nfloat v;\nif (skipTranslation){\nv = value;// + yAxisPos;\n} else {\nv = translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord, yAxisIsLog, yAxisReversed);// + yAxisPos;\nif (v > yAxisLen) {\nv = yAxisLen;\n}\n}\nif (checkTreshold > 0.0 && hasThreshold) {\nv = min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize = bubbleRadius();\n} else {\ngl_PointSize = pSize;\n}\nvColor = aColor;\nif (skipTranslation && isInverted) {\ngl_Position = uPMatrix * vec4(aVertexPosition.y + yAxisPos, aVertexPosition.x + xAxisPos, 0.0, 1.0);\n} else if (isInverted) {\ngl_Position = uPMatrix * vec4(yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, xToPixels(aVertexPosition.x) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position = uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}",
                            "vertex"),
                        c = this.stringToProgram("precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col = fillColor;\nvec4 tcol = texture2D(uSampler, gl_PointCoord.st);\nif (hasColor) {\ncol = vColor;\n}\nif (isCircle) {\ncol *= tcol;\nif (tcol.r < 0.0) {\ndiscard;\n} else {\ngl_FragColor = col;\n}\n} else {\ngl_FragColor = col;\n}\n}", "fragment"),
                        b = function (b) {
                            return a.gl.getUniformLocation(a.shaderProgram,
                                b)
                        };
                    if (!h || !c) return this.shaderProgram = !1, this.handleErrors(), !1;
                    this.shaderProgram = this.gl.createProgram();
                    this.gl.attachShader(this.shaderProgram, h);
                    this.gl.attachShader(this.shaderProgram, c);
                    this.gl.linkProgram(this.shaderProgram);
                    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) return this.errors.push(this.gl.getProgramInfoLog(this.shaderProgram)), this.handleErrors(), this.shaderProgram = !1;
                    this.gl.useProgram(this.shaderProgram);
                    this.gl.bindAttribLocation(this.shaderProgram,
                        0, "aVertexPosition");
                    this.pUniform = b("uPMatrix");
                    this.psUniform = b("pSize");
                    this.fcUniform = b("fillColor");
                    this.isBubbleUniform = b("isBubble");
                    this.bubbleSizeAbsUniform = b("bubbleSizeAbs");
                    this.bubbleSizeAreaUniform = b("bubbleSizeByArea");
                    this.uSamplerUniform = b("uSampler");
                    this.skipTranslationUniform = b("skipTranslation");
                    this.isCircleUniform = b("isCircle");
                    this.isInverted = b("isInverted");
                    return !0
                };
            a.prototype.handleErrors = function () {
                this.errors.length && c("[highcharts boost] shader error - " + this.errors.join("\n"))
            };
            a.prototype.stringToProgram = function (a, h) {
                var f = this.gl.createShader("vertex" === h ? this.gl.VERTEX_SHADER : this.gl.FRAGMENT_SHADER);
                this.gl.shaderSource(f, a);
                this.gl.compileShader(f);
                return this.gl.getShaderParameter(f, this.gl.COMPILE_STATUS) ? f : (this.errors.push("when compiling " + h + " shader:\n" + this.gl.getShaderInfoLog(f)), !1)
            };
            a.prototype.destroy = function () {
                this.gl && this.shaderProgram && (this.gl.deleteProgram(this.shaderProgram), this.shaderProgram = !1)
            };
            a.prototype.fillColorUniform = function () {
                return this.fcUniform
            };
            a.prototype.getProgram = function () {
                return this.shaderProgram
            };
            a.prototype.pointSizeUniform = function () {
                return this.psUniform
            };
            a.prototype.perspectiveUniform = function () {
                return this.pUniform
            };
            a.prototype.reset = function () {
                this.gl && this.shaderProgram && (this.gl.uniform1i(this.isBubbleUniform, 0), this.gl.uniform1i(this.isCircleUniform, 0))
            };
            a.prototype.setBubbleUniforms = function (a, c, r, b) {
                void 0 === b && (b = 1);
                var f = a.options, l = Number.MAX_VALUE, J = -Number.MAX_VALUE;
                if (this.gl && this.shaderProgram && a.is("bubble")) {
                    var B =
                        a.getPxExtremes();
                    l = n(f.zMin, h(c, !1 === f.displayNegative ? f.zThreshold : -Number.MAX_VALUE, l));
                    J = n(f.zMax, Math.max(J, r));
                    this.gl.uniform1i(this.isBubbleUniform, 1);
                    this.gl.uniform1i(this.isCircleUniform, 1);
                    this.gl.uniform1i(this.bubbleSizeAreaUniform, "width" !== a.options.sizeBy);
                    this.gl.uniform1i(this.bubbleSizeAbsUniform, a.options.sizeByAbsoluteValue);
                    this.setUniform("bubbleMinSize", B.minPxSize * b);
                    this.setUniform("bubbleMaxSize", B.maxPxSize * b);
                    this.setUniform("bubbleZMin", l);
                    this.setUniform("bubbleZMax",
                        J);
                    this.setUniform("bubbleZThreshold", a.options.zThreshold)
                }
            };
            a.prototype.setColor = function (a) {
                this.gl && this.shaderProgram && this.gl.uniform4f(this.fcUniform, a[0] / 255, a[1] / 255, a[2] / 255, a[3])
            };
            a.prototype.setDrawAsCircle = function (a) {
                this.gl && this.shaderProgram && this.gl.uniform1i(this.isCircleUniform, a ? 1 : 0)
            };
            a.prototype.setInverted = function (a) {
                this.gl && this.shaderProgram && this.gl.uniform1i(this.isInverted, a)
            };
            a.prototype.setPMatrix = function (a) {
                this.gl && this.shaderProgram && this.gl.uniformMatrix4fv(this.pUniform,
                    !1, a)
            };
            a.prototype.setPointSize = function (a) {
                this.gl && this.shaderProgram && this.gl.uniform1f(this.psUniform, a)
            };
            a.prototype.setSkipTranslation = function (a) {
                this.gl && this.shaderProgram && this.gl.uniform1i(this.skipTranslationUniform, !0 === a ? 1 : 0)
            };
            a.prototype.setTexture = function (a) {
                this.gl && this.shaderProgram && this.gl.uniform1i(this.uSamplerUniform, a)
            };
            a.prototype.setUniform = function (a, h) {
                this.gl && this.shaderProgram && (a = this.uLocations[a] = this.uLocations[a] || this.gl.getUniformLocation(this.shaderProgram,
                    a), this.gl.uniform1f(a, h))
            };
            return a
        }()
    });
    u(a, "Extensions/Boost/WGLVertexBuffer.js", [], function () {
        return function () {
            function a(a, c, n) {
                this.buffer = !1;
                this.iterator = 0;
                this.vertAttribute = this.preAllocated = !1;
                this.components = n || 2;
                this.dataComponents = n;
                this.gl = a;
                this.shader = c
            }

            a.prototype.allocate = function (a) {
                this.iterator = -1;
                this.preAllocated = new Float32Array(4 * a)
            };
            a.prototype.bind = function () {
                if (!this.buffer) return !1;
                this.gl.vertexAttribPointer(this.vertAttribute, this.components, this.gl.FLOAT, !1, 0, 0)
            };
            a.prototype.build = function (a, c, n) {
                var h;
                this.data = a || [];
                if (!(this.data && 0 !== this.data.length || this.preAllocated)) return this.destroy(), !1;
                this.components = n || this.components;
                this.buffer && this.gl.deleteBuffer(this.buffer);
                this.preAllocated || (h = new Float32Array(this.data));
                this.buffer = this.gl.createBuffer();
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, this.preAllocated || h, this.gl.STATIC_DRAW);
                this.vertAttribute = this.gl.getAttribLocation(this.shader.getProgram(),
                    c);
                this.gl.enableVertexAttribArray(this.vertAttribute);
                return !0
            };
            a.prototype.destroy = function () {
                this.buffer && (this.gl.deleteBuffer(this.buffer), this.vertAttribute = this.buffer = !1);
                this.iterator = 0;
                this.components = this.dataComponents || 2;
                this.data = []
            };
            a.prototype.push = function (a, c, n, r) {
                this.preAllocated && (this.preAllocated[++this.iterator] = a, this.preAllocated[++this.iterator] = c, this.preAllocated[++this.iterator] = n, this.preAllocated[++this.iterator] = r)
            };
            a.prototype.render = function (a, c, n) {
                var h = this.preAllocated ?
                    this.preAllocated.length : this.data.length;
                if (!this.buffer || !h) return !1;
                if (!a || a > h || 0 > a) a = 0;
                if (!c || c > h) c = h;
                if (a >= c) return !1;
                this.gl.drawArrays(this.gl[n || "POINTS"], a / this.components, (c - a) / this.components);
                return !0
            };
            return a
        }()
    });
    u(a, "Extensions/Boost/WGLRenderer.js", [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"], a["Extensions/Boost/WGLDrawMode.js"], a["Extensions/Boost/WGLShader.js"], a["Extensions/Boost/WGLVertexBuffer.js"]], function (a, h, c, n, r, f) {
        var B = a.parse, l = h.doc, b = h.win,
            J = c.isNumber, u = c.isObject, A = c.merge, X = c.objectEach, R = c.pick,
            F = {column: !0, columnrange: !0, bar: !0, area: !0, areaspline: !0, arearange: !0},
            ca = {scatter: !0, bubble: !0}, N = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
        return function () {
            function c(a) {
                this.data = [];
                this.height = 0;
                this.isInited = !1;
                this.markerData = [];
                this.series = [];
                this.textureHandles = {};
                this.width = 0;
                this.postRenderCallback = a;
                this.settings = {
                    pointSize: 1,
                    lineWidth: 1,
                    fillColor: "#AA00AA",
                    useAlpha: !0,
                    usePreallocated: !1,
                    useGPUTranslations: !1,
                    debug: {
                        timeRendering: !1,
                        timeSeriesProcessing: !1, timeSetup: !1, timeBufferCopy: !1, timeKDTree: !1, showSkipSummary: !1
                    }
                }
            }

            c.orthoMatrix = function (a, b) {
                return [2 / a, 0, 0, 0, 0, -(2 / b), 0, 0, 0, 0, -2, 0, -1, 1, -1, 1]
            };
            c.seriesPointCount = function (a) {
                if (a.boosted) {
                    var g = !!a.options.stacking;
                    var b = a.xData || a.options.xData || a.processedXData;
                    g = (g ? a.data : b || a.options.data).length;
                    "treemap" === a.type ? g *= 12 : "heatmap" === a.type ? g *= 6 : F[a.type] && (g *= 2);
                    return g
                }
                return 0
            };
            c.prototype.getPixelRatio = function () {
                return this.settings.pixelRatio || b.devicePixelRatio ||
                    1
            };
            c.prototype.setOptions = function (a) {
                "pixelRatio" in a || (a.pixelRatio = 1);
                A(!0, this.settings, a)
            };
            c.prototype.allocateBuffer = function (a) {
                var g = this.vbuffer, b = 0;
                this.settings.usePreallocated && (a.series.forEach(function (a) {
                    a.boosted && (b += c.seriesPointCount(a))
                }), g && g.allocate(b))
            };
            c.prototype.allocateBufferForSingleSeries = function (a) {
                var g = this.vbuffer, b = 0;
                this.settings.usePreallocated && (a.boosted && (b = c.seriesPointCount(a)), g && g.allocate(b))
            };
            c.prototype.clear = function () {
                var a = this.gl;
                a && a.clear(a.COLOR_BUFFER_BIT |
                    a.DEPTH_BUFFER_BIT)
            };
            c.prototype.pushSeriesData = function (a, b) {
                var g = this, c = this.data, f = this.settings, e = this.vbuffer,
                    m = a.pointArrayMap && "low,high" === a.pointArrayMap.join(","), q = a.chart, p = a.options,
                    O = !!p.stacking, da = p.data, d = a.xAxis.getExtremes(), P = d.min, h = d.max;
                d = a.yAxis.getExtremes();
                var l = d.min, n = d.max, r = a.xData || p.xData || a.processedXData,
                    J = a.yData || p.yData || a.processedYData, H = a.zData || p.zData || a.processedZData, A = a.yAxis,
                    D = a.xAxis, I = !r || 0 === r.length, N = p.connectNulls;
                d = a.points || !1;
                var E = O ? a.data :
                        r || da, k = {x: Number.MAX_VALUE, y: 0}, y = {x: -Number.MAX_VALUE, y: 0},
                    ya = "undefined" === typeof q.index, Aa = F[a.type], Ba = p.zoneAxis || "y", Y = p.zones || !1,
                    T = p.threshold, Z = this.getPixelRatio(), ra = a.chart.plotWidth, ea = !1, fa = !1, W, S, R = 0,
                    sa = !1, z, v, C, ha, w = -1, Q = !1, U = !1, K, ta = !1, la = !1, x = !1, ua = !1, va = !0,
                    ma = !0, L = !1, M = !1, aa = 0;
                if (!(p.boostData && 0 < p.boostData.length)) {
                    p.gapSize && (M = "value" !== p.gapUnit ? p.gapSize * a.closestPointRange : p.gapSize);
                    if (Y) {
                        var ba = [];
                        Y.forEach(function (a, b) {
                            if (a.color) {
                                var k = B(a.color).rgba;
                                k[0] /= 255;
                                k[1] /=
                                    255;
                                k[2] /= 255;
                                ba[b] = k;
                                L || "undefined" !== typeof a.value || (L = k)
                            }
                        });
                        L || (r = a.pointAttribs && a.pointAttribs().fill || a.color, L = B(r).rgba, L[0] /= 255, L[1] /= 255, L[2] /= 255)
                    }
                    q.inverted && (ra = a.chart.plotHeight);
                    a.closestPointRangePx = Number.MAX_VALUE;
                    var ia = function (a) {
                        a && (b.colorData.push(a[0]), b.colorData.push(a[1]), b.colorData.push(a[2]), b.colorData.push(a[3]))
                    }, V = function (a, k, y, m, g) {
                        void 0 === m && (m = 1);
                        ia(g);
                        1 === Z || f.useGPUTranslations && !b.skipTranslation || (a *= Z, k *= Z, m *= Z);
                        f.usePreallocated && e ? (e.push(a, k, y ? 1 :
                            0, m), aa += 4) : (c.push(a), c.push(k), c.push(y ? Z : 0), c.push(m))
                    }, Ea = function () {
                        b.segments.length && (b.segments[b.segments.length - 1].to = c.length || aa)
                    }, za = function () {
                        b.segments.length && b.segments[b.segments.length - 1].from === (c.length || aa) || (Ea(), b.segments.push({from: c.length || aa}))
                    }, Fa = function (a, k, b, e, m) {
                        ia(m);
                        V(a + b, k);
                        ia(m);
                        V(a, k);
                        ia(m);
                        V(a, k + e);
                        ia(m);
                        V(a, k + e);
                        ia(m);
                        V(a + b, k + e);
                        ia(m);
                        V(a + b, k)
                    };
                    za();
                    if (d && 0 < d.length) b.skipTranslation = !0, b.drawMode = "TRIANGLES", d[0].node && d[0].node.levelDynamic && d.sort(function (a,
                                                                                                                                                     k) {
                        if (a.node) {
                            if (a.node.levelDynamic > k.node.levelDynamic) return 1;
                            if (a.node.levelDynamic < k.node.levelDynamic) return -1
                        }
                        return 0
                    }), d.forEach(function (k) {
                        var b = k.plotY;
                        if ("undefined" !== typeof b && !isNaN(b) && null !== k.y && k.shapeArgs) {
                            var e = k.shapeArgs;
                            b = e.x;
                            b = void 0 === b ? 0 : b;
                            var m = e.y;
                            m = void 0 === m ? 0 : m;
                            var y = e.width;
                            y = void 0 === y ? 0 : y;
                            e = e.height;
                            e = void 0 === e ? 0 : e;
                            var g = q.styledMode ? k.series.colorAttribs(k) : g = k.series.pointAttribs(k);
                            k = g["stroke-width"] || 0;
                            x = B(g.fill).rgba;
                            x[0] /= 255;
                            x[1] /= 255;
                            x[2] /= 255;
                            a.is("treemap") &&
                            (k = k || 1, S = B(g.stroke).rgba, S[0] /= 255, S[1] /= 255, S[2] /= 255, Fa(b, m, y, e, S), k /= 2);
                            a.is("heatmap") && q.inverted && (b = D.len - b, m = A.len - m, y = -y, e = -e);
                            Fa(b + k, m + k, y - 2 * k, e - 2 * k, x)
                        }
                    }); else {
                        for (d = function () {
                            C = E[++w];
                            if ("undefined" === typeof C) return "continue";
                            if (ya) return "break";
                            var e = da && da[w];
                            !I && u(e, !0) && e.color && (x = B(e.color).rgba, x[0] /= 255, x[1] /= 255, x[2] /= 255);
                            I ? (z = C[0], v = C[1], E[w + 1] && (U = E[w + 1][0]), E[w - 1] && (Q = E[w - 1][0]), 3 <= C.length && (ha = C[2], C[2] > b.zMax && (b.zMax = C[2]), C[2] < b.zMin && (b.zMin = C[2]))) : (z = C, v = J[w], E[w +
                            1] && (U = E[w + 1]), E[w - 1] && (Q = E[w - 1]), H && H.length && (ha = H[w], H[w] > b.zMax && (b.zMax = H[w]), H[w] < b.zMin && (b.zMin = H[w])));
                            if (!N && (null === z || null === v)) return za(), "continue";
                            U && U >= P && U <= h && (ta = !0);
                            Q && Q >= P && Q <= h && (la = !0);
                            m ? (I && (v = C.slice(1, 3)), K = v[0], v = v[1]) : O && (z = C.x, v = C.stackY, K = v - C.y);
                            null !== l && "undefined" !== typeof l && null !== n && "undefined" !== typeof n && (va = v >= l && v <= n);
                            z > h && y.x < h && (y.x = z, y.y = v);
                            z < P && k.x > P && (k.x = z, k.y = v);
                            if (null === v && N) return "continue";
                            if (null === v || !va && !ta && !la) return za(), "continue";
                            (U >= P ||
                                z >= P) && (Q <= h || z <= h) && (ua = !0);
                            if (!ua && !ta && !la) return "continue";
                            M && z - Q > M && za();
                            if (Y) {
                                var g;
                                Y.some(function (a, k) {
                                    var b = Y[k - 1];
                                    return "x" === Ba ? "undefined" !== typeof a.value && z <= a.value ? (ba[k] && (!b || z >= b.value) && (g = ba[k]), !0) : !1 : "undefined" !== typeof a.value && v <= a.value ? (ba[k] && (!b || v >= b.value) && (g = ba[k]), !0) : !1
                                });
                                x = g || L || x
                            }
                            if (!f.useGPUTranslations && (b.skipTranslation = !0, z = D.toPixels(z, !0), v = A.toPixels(v, !0), z > ra && "POINTS" === b.drawMode)) return "continue";
                            b.hasMarkers && ua && !1 !== ea && (a.closestPointRangePx =
                                Math.min(a.closestPointRangePx, Math.abs(z - ea)));
                            if (!f.useGPUTranslations && !f.usePreallocated && ea && 1 > Math.abs(z - ea) && fa && 1 > Math.abs(v - fa)) return f.debug.showSkipSummary && ++R, "continue";
                            if (Aa) {
                                W = K;
                                if (!1 === K || "undefined" === typeof K) W = 0 > v ? v : 0;
                                m || O || (W = Math.max(null === T ? l : T, l));
                                f.useGPUTranslations || (W = A.toPixels(W, !0));
                                V(z, W, 0, 0, x)
                            }
                            p.step && !ma && V(z, fa, 0, 2, x);
                            V(z, v, 0, "bubble" === a.type ? ha || 1 : 2, x);
                            ea = z;
                            fa = v;
                            sa = !0;
                            ma = !1
                        }; w < E.length - 1 && "break" !== d();) ;
                        f.debug.showSkipSummary && console.log("skipped points:",
                            R);
                        d = function (a, k) {
                            f.useGPUTranslations || (b.skipTranslation = !0, a.x = D.toPixels(a.x, !0), a.y = A.toPixels(a.y, !0));
                            k ? g.data = [a.x, a.y, 0, 2].concat(g.data) : V(a.x, a.y, 0, 2)
                        };
                        sa || !1 === N || "line_strip" !== a.drawMode || (k.x < Number.MAX_VALUE && d(k, !0), y.x > -Number.MAX_VALUE && d(y))
                    }
                    Ea()
                }
            };
            c.prototype.pushSeries = function (a) {
                var b = this.markerData, g = this.series, c = this.settings;
                0 < g.length && g[g.length - 1].hasMarkers && (g[g.length - 1].markerTo = b.length);
                c.debug.timeSeriesProcessing && console.time("building " + a.type + " series");
                b = {
                    segments: [],
                    markerFrom: b.length,
                    colorData: [],
                    series: a,
                    zMin: Number.MAX_VALUE,
                    zMax: -Number.MAX_VALUE,
                    hasMarkers: a.options.marker ? !1 !== a.options.marker.enabled : !1,
                    showMarkers: !0,
                    drawMode: n[a.type] || "LINE_STRIP"
                };
                a.index >= g.length ? g.push(b) : g[a.index] = b;
                this.pushSeriesData(a, b);
                c.debug.timeSeriesProcessing && console.timeEnd("building " + a.type + " series")
            };
            c.prototype.flush = function () {
                var a = this.vbuffer;
                this.data = [];
                this.markerData = [];
                this.series = [];
                a && a.destroy()
            };
            c.prototype.setXAxis = function (a) {
                var b =
                    this.shader;
                if (b) {
                    var g = this.getPixelRatio();
                    b.setUniform("xAxisTrans", a.transA * g);
                    b.setUniform("xAxisMin", a.min);
                    b.setUniform("xAxisMinPad", a.minPixelPadding * g);
                    b.setUniform("xAxisPointRange", a.pointRange);
                    b.setUniform("xAxisLen", a.len * g);
                    b.setUniform("xAxisPos", a.pos * g);
                    b.setUniform("xAxisCVSCoord", !a.horiz);
                    b.setUniform("xAxisIsLog", !!a.logarithmic);
                    b.setUniform("xAxisReversed", !!a.reversed)
                }
            };
            c.prototype.setYAxis = function (a) {
                var b = this.shader;
                if (b) {
                    var c = this.getPixelRatio();
                    b.setUniform("yAxisTrans",
                        a.transA * c);
                    b.setUniform("yAxisMin", a.min);
                    b.setUniform("yAxisMinPad", a.minPixelPadding * c);
                    b.setUniform("yAxisPointRange", a.pointRange);
                    b.setUniform("yAxisLen", a.len * c);
                    b.setUniform("yAxisPos", a.pos * c);
                    b.setUniform("yAxisCVSCoord", !a.horiz);
                    b.setUniform("yAxisIsLog", !!a.logarithmic);
                    b.setUniform("yAxisReversed", !!a.reversed)
                }
            };
            c.prototype.setThreshold = function (a, b) {
                var c = this.shader;
                c && (c.setUniform("hasThreshold", a), c.setUniform("translatedThreshold", b))
            };
            c.prototype.renderChart = function (b) {
                var g =
                    this, t = this.gl, l = this.settings, n = this.shader, e = this.vbuffer, m = this.getPixelRatio();
                if (b) this.width = b.chartWidth * m, this.height = b.chartHeight * m; else return !1;
                var q = this.height, p = this.width;
                if (!(t && n && p && q)) return !1;
                l.debug.timeRendering && console.time("gl rendering");
                t.canvas.width = p;
                t.canvas.height = q;
                n.bind();
                t.viewport(0, 0, p, q);
                n.setPMatrix(c.orthoMatrix(p, q));
                1 < l.lineWidth && !h.isMS && t.lineWidth(l.lineWidth);
                e && (e.build(this.data, "aVertexPosition", 4), e.bind());
                n.setInverted(b.inverted);
                this.series.forEach(function (c,
                                              p) {
                    var d = c.series.options, h = d.marker, q = "undefined" !== typeof d.lineWidth ? d.lineWidth : 1,
                        O = d.threshold, r = J(O), A = c.series.yAxis.getThreshold(O);
                    O = R(d.marker ? d.marker.enabled : null, c.series.xAxis.isRadial ? !0 : null, c.series.closestPointRangePx > 2 * ((d.marker ? d.marker.radius : 10) || 10));
                    h = g.textureHandles[h && h.symbol || c.series.symbol] || g.textureHandles.circle;
                    if (0 !== c.segments.length && c.segments[0].from !== c.segments[0].to && (h.isReady && (t.bindTexture(t.TEXTURE_2D, h.handle), n.setTexture(h.handle)), b.styledMode ?
                        h = c.series.markerGroup && c.series.markerGroup.getStyle("fill") : (h = "POINTS" === c.drawMode && c.series.pointAttribs && c.series.pointAttribs().fill || c.series.color, d.colorByPoint && (h = c.series.chart.options.colors[p])), c.series.fillOpacity && d.fillOpacity && (h = (new a(h)).setOpacity(R(d.fillOpacity, 1)).get()), h = B(h).rgba, l.useAlpha || (h[3] = 1), "LINES" === c.drawMode && l.useAlpha && 1 > h[3] && (h[3] /= 10), "add" === d.boostBlending ? (t.blendFunc(t.SRC_ALPHA, t.ONE), t.blendEquation(t.FUNC_ADD)) : "mult" === d.boostBlending || "multiply" ===
                    d.boostBlending ? t.blendFunc(t.DST_COLOR, t.ZERO) : "darken" === d.boostBlending ? (t.blendFunc(t.ONE, t.ONE), t.blendEquation(t.FUNC_MIN)) : t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA), n.reset(), 0 < c.colorData.length ? (n.setUniform("hasColor", 1), p = new f(t, n), p.build(c.colorData, "aColor", 4), p.bind()) : t.disableVertexAttribArray(t.getAttribLocation(n.getProgram(), "aColor")), n.setColor(h), g.setXAxis(c.series.xAxis), g.setYAxis(c.series.yAxis), g.setThreshold(r, A), "POINTS" === c.drawMode &&
                    n.setPointSize(2 * R(d.marker && d.marker.radius, .5) * m), n.setSkipTranslation(c.skipTranslation), "bubble" === c.series.type && n.setBubbleUniforms(c.series, c.zMin, c.zMax, m), n.setDrawAsCircle(ca[c.series.type] || !1), e)) {
                        if (0 < q || "LINE_STRIP" !== c.drawMode) for (q = 0; q < c.segments.length; q++) e.render(c.segments[q].from, c.segments[q].to, c.drawMode);
                        if (c.hasMarkers && O) for (n.setPointSize(2 * R(d.marker && d.marker.radius, 5) * m), n.setDrawAsCircle(!0), q = 0; q < c.segments.length; q++) e.render(c.segments[q].from, c.segments[q].to,
                            "POINTS")
                    }
                });
                l.debug.timeRendering && console.timeEnd("gl rendering");
                this.postRenderCallback && this.postRenderCallback(this);
                this.flush()
            };
            c.prototype.render = function (a) {
                var b = this;
                this.clear();
                if (a.renderer.forExport) return this.renderChart(a);
                this.isInited ? this.renderChart(a) : setTimeout(function () {
                    b.render(a)
                }, 1)
            };
            c.prototype.setSize = function (a, b) {
                var f = this.shader;
                !f || this.width === a && this.height === b || (this.width = a, this.height = b, f.bind(), f.setPMatrix(c.orthoMatrix(a, b)))
            };
            c.prototype.init = function (a,
                                         b) {
                var c = this, h = this.settings;
                this.isInited = !1;
                if (!a) return !1;
                h.debug.timeSetup && console.time("gl setup");
                for (var g = 0; g < N.length && !(this.gl = a.getContext(N[g], {})); ++g) ;
                var e = this.gl;
                if (e) b || this.flush(); else return !1;
                e.enable(e.BLEND);
                e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA);
                e.disable(e.DEPTH_TEST);
                e.depthFunc(e.LESS);
                a = this.shader = new r(e);
                if (!a) return !1;
                this.vbuffer = new f(e, a);
                a = function (a, b) {
                    var m = {isReady: !1, texture: l.createElement("canvas"), handle: e.createTexture()},
                        f = m.texture.getContext("2d");
                    c.textureHandles[a] = m;
                    m.texture.width = 512;
                    m.texture.height = 512;
                    f.mozImageSmoothingEnabled = !1;
                    f.webkitImageSmoothingEnabled = !1;
                    f.msImageSmoothingEnabled = !1;
                    f.imageSmoothingEnabled = !1;
                    f.strokeStyle = "rgba(255, 255, 255, 0)";
                    f.fillStyle = "#FFF";
                    b(f);
                    try {
                        e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, m.handle), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, m.texture), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
                            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.bindTexture(e.TEXTURE_2D, null), m.isReady = !0
                    } catch (na) {
                    }
                };
                a("circle", function (a) {
                    a.beginPath();
                    a.arc(256, 256, 256, 0, 2 * Math.PI);
                    a.stroke();
                    a.fill()
                });
                a("square", function (a) {
                    a.fillRect(0, 0, 512, 512)
                });
                a("diamond", function (a) {
                    a.beginPath();
                    a.moveTo(256, 0);
                    a.lineTo(512, 256);
                    a.lineTo(256, 512);
                    a.lineTo(0, 256);
                    a.lineTo(256, 0);
                    a.fill()
                });
                a("triangle", function (a) {
                    a.beginPath();
                    a.moveTo(0,
                        512);
                    a.lineTo(256, 0);
                    a.lineTo(512, 512);
                    a.lineTo(0, 512);
                    a.fill()
                });
                a("triangle-down", function (a) {
                    a.beginPath();
                    a.moveTo(0, 0);
                    a.lineTo(256, 512);
                    a.lineTo(512, 0);
                    a.lineTo(0, 0);
                    a.fill()
                });
                this.isInited = !0;
                h.debug.timeSetup && console.timeEnd("gl setup");
                return !0
            };
            c.prototype.destroy = function () {
                var a = this.gl, b = this.shader, c = this.vbuffer;
                this.flush();
                c && c.destroy();
                b && b.destroy();
                a && (X(this.textureHandles, function (b) {
                    b.handle && a.deleteTexture(b.handle)
                }), a.canvas.width = 1, a.canvas.height = 1)
            };
            return c
        }()
    });
    u(a, "Extensions/Boost/BoostSeries.js", [a["Extensions/Boost/BoostableMap.js"], a["Extensions/Boost/Boostables.js"], a["Extensions/Boost/BoostChart.js"], a["Core/Defaults.js"], a["Core/Globals.js"], a["Core/Utilities.js"], a["Extensions/Boost/WGLRenderer.js"]], function (a, h, c, n, r, f, B) {
        function l(a, b) {
            var k = b.boost;
            a && k && k.target && k.canvas && !p(b.chart) && a.allocateBufferForSingleSeries(b)
        }

        function b(a) {
            return Da(a && a.options && a.options.boost && a.options.boost.enabled, !0)
        }

        function J(a, b) {
            var k = a.constructor, e =
                    a.seriesGroup || b.group, c = a.chartWidth, y = a.chartHeight, f = a,
                m = "undefined" !== typeof SVGForeignObjectElement;
            f = p(a) ? a : b;
            var d = f.boost = f.boost || {};
            m = !1;
            E || (E = na.createElement("canvas"));
            d.target || (d.canvas = E, a.renderer.forExport || !m ? (f.renderTarget = d.target = a.renderer.image("", 0, 0, c, y).addClass("highcharts-boost-canvas").add(e), d.clear = function () {
                d.target.attr({href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="})
            }, d.copy = function () {
                d.resize();
                d.target.attr({href: d.canvas.toDataURL("image/png")})
            }) : (d.targetFo = a.renderer.createElement("foreignObject").add(e), f.renderTarget = d.target = na.createElement("canvas"), d.targetCtx = d.target.getContext("2d"), d.targetFo.element.appendChild(d.target), d.clear = function () {
                d.target.width = d.canvas.width;
                d.target.height = d.canvas.height
            }, d.copy = function () {
                d.target.width = d.canvas.width;
                d.target.height = d.canvas.height;
                d.targetCtx.drawImage(d.canvas, 0, 0)
            }), d.resize = function () {
                c = a.chartWidth;
                y = a.chartHeight;
                (d.targetFo ||
                    d.target).attr({x: 0, y: 0, width: c, height: y}).css({
                    pointerEvents: "none",
                    mixedBlendMode: "normal",
                    opacity: 1
                });
                f instanceof k && f.boost.markerGroup.translate(a.plotLeft, a.plotTop)
            }, d.clipRect = a.renderer.clipRect(), (d.targetFo || d.target).clip(d.clipRect), f instanceof k && (f.boost.markerGroup = f.renderer.g().add(e).translate(b.xAxis.pos, b.yAxis.pos)));
            d.canvas.width = c;
            d.canvas.height = y;
            d.clipRect && d.clipRect.attr(q(a, f));
            d.resize();
            d.clear();
            d.wgl || (d.wgl = new B(function (a) {
                a.settings.debug.timeBufferCopy && console.time("buffer copy");
                d.copy();
                a.settings.debug.timeBufferCopy && console.timeEnd("buffer copy")
            }), d.wgl.init(d.canvas) || Ca("[highcharts boost] - unable to init WebGL renderer"), d.wgl.setOptions(a.options.boost || {}), f instanceof k && d.wgl.allocateBuffer(a));
            d.wgl.setSize(c, y);
            return d.wgl
        }

        function u(a) {
            var b = a.points;
            if (b) {
                var k = void 0, e = void 0;
                for (e = 0; e < b.length; e += 1) (k = b[e]) && k.destroyElements && k.destroyElements()
            }
            ["graph", "area", "tracker"].forEach(function (b) {
                var k = a[b];
                k && (a[b] = k.destroy())
            });
            a.getZonesGraphs && a.getZonesGraphs([["graph",
                "highcharts-graph"]]).forEach(function (b) {
                var k = a[b[0]];
                k && (a[b[0]] = k.destroy())
            })
        }

        function A(a, b, e, c, d, f) {
            d = d || 0;
            c = c || 3E3;
            for (var k = d + c, m = !0; m && d < k && d < a.length;) m = b(a[d], d), ++d;
            m && (d < a.length ? f ? A(a, b, e, c, d, f) : P.requestAnimationFrame ? P.requestAnimationFrame(function () {
                A(a, b, e, c, d)
            }) : setTimeout(A, 0, a, b, e, c, d) : e && e())
        }

        function X(a) {
            a.boost = a.boost || {
                getPoint: function (b) {
                    return g(a, b)
                }
            };
            var b = a.boost.altered = [];
            ["allowDG", "directTouch", "stickyTracking"].forEach(function (e) {
                b.push({
                    prop: e, val: a[e], own: Object.hasOwnProperty.call(a,
                        e)
                })
            });
            a.allowDG = !1;
            a.directTouch = !1;
            a.stickyTracking = !0;
            a.finishedAnimating = !0;
            a.labelBySeries && (a.labelBySeries = a.labelBySeries.destroy())
        }

        function R(a) {
            var b = a.boost;
            b && ((b.altered || []).forEach(function (b) {
                b.own ? a[b.prop] = b.val : delete a[b.prop]
            }), b.clear && b.clear())
        }

        function F(a, b) {
            var e = a.options, c = a.xAxis && a.xAxis.options, d = a.yAxis && a.yAxis.options;
            a = a.colorAxis && a.colorAxis.options;
            return e.data.length > (e.boostThreshold || Number.MAX_VALUE) && H(d.min) && H(d.max) && (!b || H(c.min) && H(c.max)) && (!a ||
                H(a.min) && H(a.max))
        }

        function ca() {
            var a = this, b = a.chart;
            b.boost && b.boost.markerGroup === a.markerGroup && (a.markerGroup = null);
            b.hoverPoints && (b.hoverPoints = b.hoverPoints.filter(function (b) {
                return b.series === a
            }));
            b.hoverPoint && b.hoverPoint.series === a && (b.hoverPoint = null)
        }

        function N() {
            var a = this.boost;
            a && a.canvas && a.target && (a.wgl && a.wgl.clear(), a.clear && a.clear())
        }

        function wa(a) {
            var b = a.boost;
            b && b.canvas && b.target && b.wgl && !p(a.chart) && b.wgl.render(a.chart)
        }

        function g(a, b) {
            var e = a.options, c = a.xAxis, d = a.pointClass;
            if (b instanceof d) return b;
            e = a.xData || e.xData || a.processedXData || !1;
            d = (new d).init(a, a.options.data[b.i], e ? e[b.i] : void 0);
            d.category = Da(c.categories ? c.categories[d.x] : d.x, d.x);
            d.dist = b.dist;
            d.distX = b.distX;
            d.plotX = b.plotX;
            d.plotY = b.plotY;
            d.index = b.i;
            d.percentage = b.percentage;
            d.isInside = a.isPointInside(d);
            return d
        }

        function da() {
            function a(a, b) {
                var e = "undefined" === typeof c.index, d = !1, k = !0;
                if ("undefined" === typeof a) return !0;
                if (!e) {
                    if (E) {
                        var h = a[0];
                        var g = a[1]
                    } else h = a, g = q[b];
                    if (C) E && (g = a.slice(1, 3)),
                        d = g[0], g = g[1]; else if (H) {
                        h = a.x;
                        g = a.stackY;
                        d = g - a.y;
                        var p = a.percentage
                    }
                    na || (k = (g || 0) >= t && g <= r);
                    if (h >= O && h <= P && k) if (a = f.toPixels(h, !0), z) {
                        if ("undefined" === typeof D || a === I) {
                            C || (d = g);
                            if ("undefined" === typeof L || g > ka) ka = g, L = b;
                            if ("undefined" === typeof D || d < F) F = d, D = b
                        }
                        K && a === I || ("undefined" !== typeof D && (g = m.toPixels(ka, !0), x = m.toPixels(F, !0), aa(a, g, L, p), x !== g && aa(a, x, D, p)), D = L = void 0, I = a)
                    } else g = Math.ceil(m.toPixels(g, !0)), aa(a, g, b, p)
                }
                return !e
            }

            var b = this, e = this.options || {}, c = this.chart, f = this.xAxis, m = this.yAxis,
                h = e.xData || this.processedXData, q = e.yData || this.processedYData, g = e.data, n = f.getExtremes(),
                O = n.min, P = n.max;
            n = m.getExtremes();
            var t = n.min, r = n.max, B = {}, z = !!this.sampling, v = e.enableMouseTracking;
            n = e.threshold;
            var C = this.pointArrayMap && "low,high" === this.pointArrayMap.join(","), H = !!e.stacking,
                w = this.cropStart || 0, na = this.requireSorting, E = !h, K = "x" === e.findNearestPointBy,
                G = this.xData || this.options.xData || this.processedXData || !1;
            e = !1;
            var I, x = m.getThreshold(n), F, ka, D, L;
            e = J(c, this);
            c.boosted = !0;
            if (this.visible) {
                (this.points ||
                    this.graph) && u(this);
                p(c) ? (this.markerGroup && this.markerGroup !== c.boost.markerGroup && this.markerGroup.destroy(), this.markerGroup = c.boost.markerGroup, this.boost && this.boost.target && (this.renderTarget = this.boost.target = this.boost.target.destroy())) : (c.boost && this.markerGroup === c.boost.markerGroup && (this.markerGroup = void 0), this.markerGroup = this.plotGroup("markerGroup", "markers", !0, 1, c.seriesGroup));
                var M = this.points = [], aa = function (a, b, e, k) {
                    var h = G ? G[w + e] : !1, g = function (a) {
                        c.inverted && (a = f.len - a, b = m.len -
                            b);
                        M.push({destroy: d, x: h, clientX: a, plotX: a, plotY: b, i: w + e, percentage: k})
                    };
                    a = Math.ceil(a);
                    qa = K ? a : a + "," + b;
                    v && (B[qa] ? h === G[G.length - 1] && (M.length--, g(a)) : (B[qa] = !0, g(a)))
                };
                this.buildKDTree = d;
                e && (l(e, this), e.pushSeries(this), wa(this));
                var ba = e.settings;
                e = function () {
                    oa(b, "renderedCanvas");
                    delete b.buildKDTree;
                    b.buildKDTree();
                    ba.debug.timeKDTree && console.timeEnd("kd tree building")
                };
                c.renderer.forExport || (ba.debug.timeKDTree && console.time("kd tree building"), A(H ? this.data : h || g, a, e))
            }
        }

        function t(a) {
            var b =
                !0;
            this.chart.options && this.chart.options.boost && (b = "undefined" === typeof this.chart.options.boost.enabled ? !0 : this.chart.options.boost.enabled);
            if (!b || !this.boosted) return a.call(this);
            this.chart.boosted = !0;
            if (a = J(this.chart, this)) l(a, this), a.pushSeries(this);
            wa(this)
        }

        function ja(e, d, c) {
            function f(e) {
                var d = this.options.stacking && ("translate" === c || "generatePoints" === c);
                this.boosted && !d && b(this.chart) && "heatmap" !== this.type && "treemap" !== this.type && a[this.type] && 0 !== this.options.boostThreshold ? "render" ===
                    c && this.renderCanvas && this.renderCanvas() : e.call(this)
            }

            D(e, c, f);
            "translate" === c && ["column", "arearange", "columnrange", "heatmap", "treemap"].forEach(function (a) {
                d[a] && D(d[a].prototype, c, f)
            })
        }

        function xa(a) {
            return this.boosted && F(this) ? {} : a.apply(this, [].slice.call(arguments, 1))
        }

        function e(e) {
            var d = this, c = this.options.data, f = function (a) {
                return d.forceCrop ? !1 : p(d.chart) || (a ? a.length : 0) >= (d.options.boostThreshold || Number.MAX_VALUE)
            };
            b(this.chart) && a[this.type] ? (f(c) && "heatmap" !== this.type && "treemap" !==
            this.type && !this.options.stacking && F(this, !0) || (e.apply(this, [].slice.call(arguments, 1)), c = this.processedXData), (this.boosted = f(c)) ? (c = void 0, this.options.data && this.options.data.length && (c = this.getFirstValidPoint(this.options.data), H(c) || pa(c) || Ca(12, !1, this.chart)), X(this)) : R(this)) : e.apply(this, [].slice.call(arguments, 1))
        }

        function m(a) {
            var b = a.apply(this, [].slice.call(arguments, 1));
            return this.boost && b ? this.boost.getPoint(b) : b
        }

        var q = c.getBoostClipRect, p = c.isChartSeriesBoosting, O = n.getOptions, na =
                r.doc, d = r.noop, P = r.win, ka = f.addEvent, Ca = f.error, G = f.extend, oa = f.fireEvent, pa = f.isArray,
            H = f.isNumber, Da = f.pick, D = f.wrap, I = [], qa, E;
        return {
            compose: function (a, b, c) {
                if (f.pushUnique(I, a)) {
                    ka(a, "destroy", ca);
                    ka(a, "hide", N);
                    var d = a.prototype;
                    c && (d.renderCanvas = da);
                    D(d, "getExtremes", xa);
                    D(d, "processData", e);
                    D(d, "searchPoint", m);
                    ["translate", "generatePoints", "drawTracker", "drawPoints", "render"].forEach(function (a) {
                        return ja(d, b, a)
                    })
                }
                if (f.pushUnique(I, O)) {
                    var k = O().plotOptions;
                    h.forEach(function (a) {
                        var e = k[a];
                        e && (e.boostThreshold = 5E3, e.boostData = [], b[a].prototype.fillOpacity = !0)
                    })
                }
                if (c) {
                    var g = b.area, q = b.areaspline, p = b.bubble;
                    c = b.column;
                    var n = b.heatmap, l = b.scatter, P = b.treemap;
                    g && f.pushUnique(I, g) && G(g.prototype, {fill: !0, fillOpacity: !0, sampling: !0});
                    q && f.pushUnique(I, q) && G(q.prototype, {fill: !0, fillOpacity: !0, sampling: !0});
                    p && f.pushUnique(I, p) && (g = p.prototype, delete g.buildKDTree, D(g, "markerAttribs", function (a) {
                        return this.boosted ? !1 : a.apply(this, [].slice.call(arguments, 1))
                    }));
                    c && f.pushUnique(I, c) && G(c.prototype,
                        {fill: !0, sampling: !0});
                    l && f.pushUnique(I, l) && (l.prototype.fill = !0);
                    [n, P].forEach(function (a) {
                        a && f.pushUnique(I, a) && D(a.prototype, "drawPoints", t)
                    })
                }
                return a
            }, destroyGraphics: u, eachAsync: A, getPoint: g
        }
    });
    u(a, "Extensions/BoostCanvas.js", [a["Extensions/Boost/BoostChart.js"], a["Extensions/Boost/BoostSeries.js"], a["Core/Chart/Chart.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, h, c, n, r, f, B, l) {
        var b = a.getBoostClipRect,
            u = a.isChartSeriesBoosting, J = h.destroyGraphics, A = n.parse, X = r.doc, R = r.noop, F = B.seriesTypes,
            ca = l.addEvent, N = l.extend, wa = l.fireEvent, g = l.isNumber, da = l.merge, t = l.pick, ja = l.wrap, xa;
        return function () {
            r.seriesTypes.heatmap && ja(r.seriesTypes.heatmap.prototype, "drawPoints", function () {
                var a = this.chart, b = this.getContext(), c = this.chart.inverted, f = this.xAxis, h = this.yAxis;
                b ? (this.points.forEach(function (e) {
                    var d = e.plotY;
                    if ("undefined" !== typeof d && !isNaN(d) && null !== e.y && b) {
                        var m = e.shapeArgs || {};
                        d = m.x;
                        d = void 0 ===
                        d ? 0 : d;
                        var g = m.y;
                        g = void 0 === g ? 0 : g;
                        var q = m.width;
                        q = void 0 === q ? 0 : q;
                        m = m.height;
                        m = void 0 === m ? 0 : m;
                        e = a.styledMode ? e.series.colorAttribs(e) : e.series.pointAttribs(e);
                        b.fillStyle = e.fill;
                        c ? b.fillRect(h.len - g + f.left, f.len - d + h.top, -m, -q) : b.fillRect(d + f.left, g + h.top, q, m)
                    }
                }), this.canvasToSVG()) : this.chart.showLoading("Your browser doesn't support HTML5 canvas, <br>please use a modern browser")
            });
            N(f.prototype, {
                getContext: function () {
                    var a = this.chart, c = u(a) ? a : this, f = c === a ? a.seriesGroup : a.seriesGroup || this.group,
                        h =
                            a.chartWidth, g = a.chartHeight, n = function (a, b, e, c, d, f, m) {
                            a.call(this, e, b, c, d, f, m)
                        }, d = c.boost = c.boost || {};
                    var l = d.targetCtx;
                    d.canvas || (d.canvas = X.createElement("canvas"), d.target = a.renderer.image("", 0, 0, h, g).addClass("highcharts-boost-canvas").add(f), l = d.targetCtx = d.canvas.getContext("2d"), a.inverted && ["moveTo", "lineTo", "rect", "arc"].forEach(function (a) {
                        ja(l, a, n)
                    }), d.copy = function () {
                        d.target.attr({href: d.canvas.toDataURL("image/png")})
                    }, d.clear = function () {
                        l.clearRect(0, 0, d.canvas.width, d.canvas.height);
                        c === d.target && d.target.attr({href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="})
                    }, d.clipRect = a.renderer.clipRect(), d.target.clip(d.clipRect));
                    d.canvas.width !== h && (d.canvas.width = h);
                    d.canvas.height !== g && (d.canvas.height = g);
                    d.target.attr({
                        x: 0,
                        y: 0,
                        width: h,
                        height: g,
                        style: "pointer-events: none",
                        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    });
                    d.clipRect && d.clipRect.attr(b(a,
                        c));
                    return l
                }, canvasToSVG: function () {
                    u(this.chart) ? this.boost && this.boost.clear && this.boost.clear() : this.boost && this.boost.copy ? this.boost.copy() : this.chart.boost && this.chart.boost.copy && this.chart.boost.copy()
                }, cvsLineTo: function (a, b, c) {
                    a.lineTo(b, c)
                }, renderCanvas: function () {
                    var a = this, b = a.options, c = a.chart, f = this.xAxis, r = this.yAxis,
                        B = (c.options.boost || {}).timeRendering || !1, d = 0, u = a.processedXData,
                        F = a.processedYData, X = b.data, G = f.getExtremes(), oa = G.min, pa = G.max;
                    G = r.getExtremes();
                    var H = G.min, ja = G.max,
                        D = {}, I, qa = !!a.sampling, E = b.marker && b.marker.radius, k = this.cvsDrawPoint,
                        y = b.lineWidth ? this.cvsLineTo : void 0,
                        ya = E && 1 >= E ? this.cvsMarkerSquare : this.cvsMarkerCircle, Aa = this.cvsStrokeBatch || 1E3,
                        Ba = b.enableMouseTracking, Y;
                    G = b.threshold;
                    var T = r.getThreshold(G), Z = g(G), ra = T, ea = this.fill,
                        fa = a.pointArrayMap && "low,high" === a.pointArrayMap.join(","), W = !!b.stacking,
                        S = a.cropStart || 0;
                    G = c.options.loading;
                    var Ga = a.requireSorting, sa, z = b.connectNulls, v = !u, C, ha, w, Q, U, K = W ? a.data : u || X,
                        ta = a.fillOpacity ? n.parse(a.color).setOpacity(t(b.fillOpacity,
                            .75)).get() : a.color, la = function () {
                            ea ? (M.fillStyle = ta, M.fill()) : (M.strokeStyle = a.color, M.lineWidth = b.lineWidth, M.stroke())
                        }, x = function (b, e, f, h) {
                            0 === d && (M.beginPath(), y && (M.lineJoin = "round"));
                            c.scroller && "highcharts-navigator-series" === a.options.className ? (e += c.scroller.top, f && (f += c.scroller.top)) : e += c.plotTop;
                            b += c.plotLeft;
                            sa ? M.moveTo(b, e) : k ? k(M, b, e, f, Y) : y ? y(M, b, e) : ya && ya.call(a, M, b, e, E, h);
                            d += 1;
                            d === Aa && (la(), d = 0);
                            Y = {clientX: b, plotY: e, yBottom: f}
                        }, ua = "x" === b.findNearestPointBy, va = this.xData || this.options.xData ||
                            this.processedXData || !1, ma = function (a, b, d) {
                            U = ua ? a : a + "," + b;
                            Ba && !D[U] && (D[U] = !0, c.inverted && (a = f.len - a, b = r.len - b), L.push({
                                x: va ? va[S + d] : !1,
                                clientX: a,
                                plotX: a,
                                plotY: b,
                                i: S + d
                            }))
                        };
                    u = this.boost || {};
                    u.target && u.target.attr({href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="});
                    (this.points || this.graph) && J(this);
                    a.plotGroup("group", "series", a.visible ? "visible" : "hidden", b.zIndex, c.seriesGroup);
                    a.markerGroup = a.group;
                    ca(a, "destroy", function () {
                        a.markerGroup =
                            null
                    });
                    var L = this.points = [];
                    var M = this.getContext();
                    a.buildKDTree = R;
                    u.clear && u.clear();
                    this.visible && (99999 < X.length && (c.options.loading = da(G, {
                        labelStyle: {
                            backgroundColor: A("#ffffff").setOpacity(.75).get(),
                            padding: "1em",
                            borderRadius: "0.5em"
                        }, style: {backgroundColor: "none", opacity: 1}
                    }), l.clearTimeout(xa), c.showLoading("Drawing..."), c.options.loading = G), B && console.time("canvas rendering"), h.eachAsync(K, function (b, d) {
                        var e = !1, h = !1, g = !1, m = !1, k = "undefined" === typeof c.index, n = !0;
                        if (!k) {
                            if (v) {
                                var p = b[0];
                                var l = b[1];
                                K[d + 1] && (g = K[d + 1][0]);
                                K[d - 1] && (m = K[d - 1][0])
                            } else p = b, l = F[d], K[d + 1] && (g = K[d + 1]), K[d - 1] && (m = K[d - 1]);
                            g && g >= oa && g <= pa && (e = !0);
                            m && m >= oa && m <= pa && (h = !0);
                            if (fa) {
                                v && (l = b.slice(1, 3));
                                var q = l[0];
                                l = l[1]
                            } else W && (p = b.x, l = b.stackY, q = l - b.y);
                            b = null === l;
                            Ga || (n = l >= H && l <= ja);
                            if (!b && (p >= oa && p <= pa && n || e || h)) if (p = Math.round(f.toPixels(p, !0)), qa) {
                                if ("undefined" === typeof w || p === I) {
                                    fa || (q = l);
                                    if ("undefined" === typeof Q || l > ha) ha = l, Q = d;
                                    if ("undefined" === typeof w || q < C) C = q, w = d
                                }
                                p !== I && ("undefined" !== typeof w && (l = r.toPixels(ha,
                                    !0), T = r.toPixels(C, !0), x(p, Z ? Math.min(l, ra) : l, Z ? Math.max(T, ra) : T, d), ma(p, l, Q), T !== l && ma(p, T, w)), w = Q = void 0, I = p)
                            } else l = Math.round(r.toPixels(l, !0)), x(p, l, T, d), ma(p, l, d);
                            sa = b && !z;
                            0 === d % 5E4 && (a.boost && a.boost.copy ? a.boost.copy() : a.chart.boost && a.chart.boost.copy && a.chart.boost.copy())
                        }
                        return !k
                    }, function () {
                        var b = c.loadingDiv, d = c.loadingShown;
                        la();
                        a.canvasToSVG();
                        B && console.timeEnd("canvas rendering");
                        wa(a, "renderedCanvas");
                        d && (N(b.style, {
                            transition: "opacity 250ms",
                            opacity: 0
                        }), c.loadingShown = !1, xa = setTimeout(function () {
                            b.parentNode &&
                            b.parentNode.removeChild(b);
                            c.loadingDiv = c.loadingSpan = null
                        }, 250));
                        delete a.buildKDTree;
                        a.buildKDTree()
                    }, c.renderer.forExport ? Number.MAX_VALUE : void 0))
                }
            });
            F.scatter.prototype.cvsMarkerCircle = function (a, b, c, f) {
                a.moveTo(b, c);
                a.arc(b, c, f, 0, 2 * Math.PI, !1)
            };
            F.scatter.prototype.cvsMarkerSquare = function (a, b, c, f) {
                a.rect(b - f, c - f, 2 * f, 2 * f)
            };
            F.scatter.prototype.fill = !0;
            F.bubble && (F.bubble.prototype.cvsMarkerCircle = function (a, b, c, f, g) {
                a.moveTo(b, c);
                a.arc(b, c, this.radii && this.radii[g], 0, 2 * Math.PI, !1)
            }, F.bubble.prototype.cvsStrokeBatch =
                1);
            N(F.area.prototype, {
                cvsDrawPoint: function (a, b, c, f, g) {
                    g && b !== g.clientX && (a.moveTo(g.clientX, g.yBottom), a.lineTo(g.clientX, g.plotY), a.lineTo(b, c), a.lineTo(b, f))
                }, fill: !0, fillOpacity: !0, sampling: !0
            });
            N(F.column.prototype, {
                cvsDrawPoint: function (a, b, c, f) {
                    a.rect(b - 1, c, 1, f - c)
                }, fill: !0, sampling: !0
            });
            c.prototype.callbacks.push(function (a) {
                ca(a, "predraw", function () {
                    var a = this.boost || {};
                    a.target && a.target.attr({href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="});
                    a.canvas && a.canvas.getContext("2d").clearRect(0, 0, a.canvas.width, a.canvas.height)
                });
                ca(a, "render", function () {
                    a.boost && a.boost.copy && a.boost.copy()
                })
            })
        }
    });
    u(a, "masters/modules/boost-canvas.src.js", [], function () {
    })
});
//# sourceMappingURL=boost-canvas.js.map