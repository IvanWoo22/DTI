/*
 Highcharts JS v11.1.0 (2023-06-05)

 (c) 2009-2022

 License: www.highcharts.com/license
*/
'use strict';
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/tiledwebmap", ["highcharts"], function (b) {
        a(b);
        a.Highcharts = b;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function b(a, b, w, m) {
        a.hasOwnProperty(b) || (a[b] = m.apply(null, w), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: b,
                module: a[b]
            }
        })))
    }

    a = a ? a._modules :
        {};
    b(a, "Maps/TilesProviders/OpenStreetMap.js", [], function () {
        return function () {
            return function () {
                this.subdomains = ["a", "b", "c"];
                this.themes = {
                    Standard: {
                        url: "https://{s}.tile.openstreetmap.org/{zoom}/{x}/{y}.png",
                        minZoom: 0,
                        maxZoom: 19
                    },
                    Hot: {url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", minZoom: 0, maxZoom: 19},
                    OpenTopoMap: {
                        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
                        minZoom: 0,
                        maxZoom: 17,
                        credits: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">\n                OpenStreetMap</a> contributors, <a href="https://viewfinderpanoramas.org">SRTM</a> \n                | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> \n                (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                    }
                };
                this.initialProjectionName = "WebMercator";
                this.defaultCredits = 'Map data \u00a92023 <a href="https://www.openstreetmap.org/copyright">\n            OpenStreetMap</a>'
            }
        }()
    });
    b(a, "Maps/TilesProviders/Stamen.js", [], function () {
        return function () {
            return function () {
                this.subdomains = ["a", "b", "c", "d"];
                this.themes = {
                    Toner: {
                        url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
                        minZoom: 0,
                        maxZoom: 20
                    },
                    TonerBackground: {
                        url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png",
                        minZoom: 0, maxZoom: 20
                    },
                    TonerLite: {
                        url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png",
                        minZoom: 0,
                        maxZoom: 20
                    },
                    Terrain: {
                        url: "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png",
                        minZoom: 0,
                        maxZoom: 18
                    },
                    TerrainBackground: {
                        url: "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png",
                        minZoom: 0,
                        maxZoom: 18
                    },
                    Watercolor: {
                        url: "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png",
                        minZoom: 1,
                        maxZoom: 16,
                        credits: '\u00a9 Map tiles by <a href="https://stamen.com">Stamen Design</a>,\n            under <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.\n            Data by <a href="https://openstreetmap.org">OpenStreetMap</a>, under\n            <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
                    }
                };
                this.initialProjectionName = "WebMercator";
                this.defaultCredits = '\u00a9 Map tiles by <a href="https://stamen.com">Stamen Design</a>,\n        under <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.\n        Data by <a href="https://openstreetmap.org">OpenStreetMap</a>, under\n        <a href="https://www.openstreetmap.org/copyright">ODbL</a>'
            }
        }()
    });
    b(a, "Maps/TilesProviders/LimaLabs.js", [], function () {
        return function () {
            return function () {
                this.themes = {
                    Standard: {
                        url: "https://cdn.lima-labs.com/{zoom}/{x}/{y}.png?api={apikey}",
                        minZoom: 0, maxZoom: 20
                    }
                };
                this.initialProjectionName = "WebMercator";
                this.defaultCredits = 'Map data \u00a92023 <a href="https://maps.lima-labs.com/">LimaLabs</a>';
                this.requiresApiKey = !0
            }
        }()
    });
    b(a, "Maps/TilesProviders/Thunderforest.js", [], function () {
        return function () {
            return function () {
                this.subdomains = ["a", "b", "c"];
                this.themes = {
                    OpenCycleMap: {
                        url: "https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}",
                        minZoom: 0,
                        maxZoom: 22
                    },
                    Transport: {
                        url: "https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}",
                        minZoom: 0, maxZoom: 22
                    },
                    TransportDark: {
                        url: "https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}",
                        minZoom: 0,
                        maxZoom: 22
                    },
                    SpinalMap: {
                        url: "https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey={apikey}",
                        minZoom: 0,
                        maxZoom: 22
                    },
                    Landscape: {
                        url: "https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}",
                        minZoom: 0,
                        maxZoom: 22
                    },
                    Outdoors: {
                        url: "https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey={apikey}",
                        minZoom: 0,
                        maxZoom: 22
                    },
                    Pioneer: {
                        url: "https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey={apikey}",
                        minZoom: 0, maxZoom: 22
                    },
                    MobileAtlas: {
                        url: "https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey={apikey}",
                        minZoom: 0,
                        maxZoom: 22
                    },
                    Neighbourhood: {
                        url: "https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey={apikey}",
                        minZoom: 0,
                        maxZoom: 22
                    }
                };
                this.initialProjectionName = "WebMercator";
                this.defaultCredits = 'Maps \u00a9 <a href="https://www.thunderforest.com">Thunderforest</a>,\n        Data \u00a9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
                this.requiresApiKey = !0
            }
        }()
    });
    b(a, "Maps/TilesProviders/Esri.js", [], function () {
        return function () {
            return function () {
                this.themes = {
                    WorldStreetMap: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 20
                    },
                    DeLorme: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 1,
                        maxZoom: 11,
                        credits: "Tiles &copy; Esri &mdash; Copyright: &copy;2012 DeLorme"
                    },
                    WorldTopoMap: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 20,
                        credits: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, \n                Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, \n                Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), \n                and the GIS User Community"
                    },
                    WorldImagery: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 20,
                        credits: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, \n                USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, \n                and the GIS User Community"
                    },
                    WorldTerrain: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 13,
                        credits: "Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, \n                DeLorme, and NPS"
                    },
                    WorldShadedRelief: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 13,
                        credits: "Tiles &copy; Esri &mdash; Source: Esri"
                    },
                    WorldPhysical: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 8,
                        credits: "Tiles &copy; Esri &mdash; Source: US National Park \n                Service"
                    },
                    NatGeoWorldMap: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 16,
                        credits: "Tiles &copy; Esri &mdash; National Geographic, Esri,\n                DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO,\n                 NOAA, iPC"
                    },
                    WorldGrayCanvas: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0, maxZoom: 16, credits: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
                    }
                };
                this.initialProjectionName = "WebMercator";
                this.defaultCredits = "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ,\n        USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong),\n        Esri (Thailand), TomTom, 2012"
            }
        }()
    });
    b(a, "Maps/TilesProviders/USGS.js", [], function () {
        return function () {
            return function () {
                this.themes = {
                    USTopo: {
                        url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0, maxZoom: 20
                    },
                    USImagery: {
                        url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 20
                    },
                    USImageryTopo: {
                        url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 20
                    }
                };
                this.initialProjectionName = "WebMercator";
                this.defaultCredits = 'Tiles courtesy of the <a href="https://usgs.gov/">U.S.\n        Geological Survey</a>'
            }
        }()
    });
    b(a, "Maps/TilesProviders/TilesProvidersRegistry.js",
        [a["Maps/TilesProviders/OpenStreetMap.js"], a["Maps/TilesProviders/Stamen.js"], a["Maps/TilesProviders/LimaLabs.js"], a["Maps/TilesProviders/Thunderforest.js"], a["Maps/TilesProviders/Esri.js"], a["Maps/TilesProviders/USGS.js"]], function (a, b, w, m, x, z) {
            return {OpenStreetMap: a, Stamen: b, LimaLabs: w, Thunderforest: m, Esri: x, USGS: z}
        });
    b(a, "Series/TiledWebMap/TiledWebMapSeries.js", [a["Core/Series/SeriesRegistry.js"], a["Maps/TilesProviders/TilesProvidersRegistry.js"], a["Core/Chart/Chart.js"], a["Core/Utilities.js"]],
        function (a, b, w, m) {
            var x = this && this.__extends || function () {
                var a = function (c, h) {
                    a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, h) {
                        a.__proto__ = h
                    } || function (a, h) {
                        for (var d in h) Object.prototype.hasOwnProperty.call(h, d) && (a[d] = h[d])
                    };
                    return a(c, h)
                };
                return function (c, h) {
                    function b() {
                        this.constructor = c
                    }

                    if ("function" !== typeof h && null !== h) throw new TypeError("Class extends value " + String(h) + " is not a constructor or null");
                    a(c, h);
                    c.prototype = null === h ? Object.create(h) : (b.prototype = h.prototype,
                        new b)
                }
            }(), z = a.seriesTypes.map, C = m.addEvent, t = m.defined, u = m.error, E = m.merge, D = m.pick;
            m = function (a) {
                function c() {
                    var h = null !== a && a.apply(this, arguments) || this;
                    h.options = void 0;
                    h.redrawTiles = !1;
                    h.isAnimating = !1;
                    return h
                }

                x(c, a);
                c.prototype.lonLatToTile = function (a, b) {
                    var h = a.lat;
                    return {
                        x: Math.floor((a.lon + 180) / 360 * Math.pow(2, b)),
                        y: Math.floor((1 - Math.log(Math.tan(h * Math.PI / 180) + 1 / Math.cos(h * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, b))
                    }
                };
                c.prototype.tileToLonLat = function (a, b, c) {
                    b = Math.PI - 2 * Math.PI * b / Math.pow(2,
                        c);
                    return {
                        lon: a / Math.pow(2, c) * 360 - 180,
                        lat: 180 / Math.PI * Math.atan(.5 * (Math.exp(b) - Math.exp(-b)))
                    }
                };
                c.prototype.drawPoints = function () {
                    var a = this, c, p = this.chart, d = p.mapView;
                    if (d) {
                        this.tiles || (this.tiles = {});
                        this.transformGroups || (this.transformGroups = []);
                        var f = this.tiles, m = this.transformGroups, q = this, l = this.options.provider, A = d.zoom,
                            w = D(d.projection.options.rotation && d.projection.options.rotation[0], 0),
                            z = p.renderer.forExport ? 0 : 200, C = function (a) {
                                Object.keys(f).forEach(function (b) {
                                    parseFloat(b) === (0 > d.zoom ?
                                        0 : Math.floor(d.zoom)) || q.minZoom && (0 > d.zoom ? 0 : Math.floor(d.zoom)) < q.minZoom && parseFloat(b) === q.minZoom || q.maxZoom && (0 > d.zoom ? 0 : Math.floor(d.zoom)) > q.maxZoom && parseFloat(b) === q.maxZoom ? Object.keys(f[b].tiles).forEach(function (d, c) {
                                        f[b].tiles[d].animate({opacity: 1}, {duration: a}, function () {
                                            c === Object.keys(f[b].tiles).length - 1 && (f[b].isActive = !0)
                                        })
                                    }) : Object.keys(f[b].tiles).forEach(function (d, c) {
                                        f[b].tiles[d].animate({opacity: 0}, {duration: a, defer: a / 2}, function () {
                                            f[b].tiles[d].destroy();
                                            delete f[b].tiles[d];
                                            c === Object.keys(f[b].tiles).length - 1 && (f[b].isActive = !1, f[b].loaded = !1)
                                        })
                                    })
                                })
                            }, k = 0 > A ? 0 : Math.floor(A), y = Math.pow(2, k),
                            e = 256 / 400.979322 * Math.pow(2, A) / (256 / 400.979322 * Math.pow(2, k)), v = 256 * e;
                        if (l && (l.type || l.url)) {
                            if (l.type && !l.url) {
                                e = b[l.type];
                                if (!t(e)) {
                                    u("Highcharts warning: Tiles Provider '" + l.type + "' not defined in the ProviderRegistry.", !1);
                                    return
                                }
                                var g = new e;
                                e = g.initialProjectionName;
                                var n = void 0, r = "";
                                if (l.theme && t(g.themes[l.theme])) n = g.themes[l.theme]; else {
                                    var B = Object.keys(g.themes)[0];
                                    n = g.themes[B];
                                    u("Highcharts warning: The Tiles Provider's Theme '" + l.theme + "' is not defined in the Provider definition - falling back to '" + B + "'.", !1)
                                }
                                l.subdomain && g.subdomains && -1 !== g.subdomains.indexOf(l.subdomain) ? r = l.subdomain : t(g.subdomains) && (r = D(g.subdomains && g.subdomains[0], ""), u("Highcharts warning: The Tiles Provider's Subdomain '" + l.subdomain + "' is not defined in the Provider definition - falling back to '" + r + "'.", !1));
                                g.requiresApiKey && (l.apiKey ? n.url = n.url.replace("{apikey}", l.apiKey) : (u("Highcharts warning: The Tiles Provider requires API Key to use tiles, use provider.apiKey to provide a token.",
                                    !1), n.url = n.url.replace("?apikey={apikey}", "")));
                                l.url = n.url.replace("{s}", r);
                                this.minZoom = n.minZoom;
                                this.maxZoom = n.maxZoom;
                                g = D(p.userOptions.credits && p.userOptions.credits.text, "Highcharts.com " + D(n.credits, g.defaultCredits));
                                p.credits ? p.credits.update({text: g}) : p.addCredits({
                                    text: g,
                                    style: D(null === (c = p.options.credits) || void 0 === c ? void 0 : c.style, {})
                                });
                                d.projection.options.name !== e && u("Highcharts warning: The set projection is different than supported by Tiles Provider.", !1)
                            } else d.projection.options.name ||
                            u("Highcharts warning: The set projection is different than supported by Tiles Provider.", !1);
                            t(this.minZoom) && k < this.minZoom ? (k = this.minZoom, y = Math.pow(2, k), e = 256 / 400.979322 * Math.pow(2, A) / (256 / 400.979322 * Math.pow(2, k)), v = 256 * e) : t(this.maxZoom) && k > this.maxZoom && (k = this.maxZoom, y = Math.pow(2, k), e = 256 / 400.979322 * Math.pow(2, A) / (256 / 400.979322 * Math.pow(2, k)), v = 256 * e);
                            if (d.projection && d.projection.def) {
                                d.projection.hasCoordinates = !0;
                                m[k] || (m[k] = p.renderer.g().add(this.group));
                                var E = function (a, b, d, f) {
                                    return a.replace("{x}",
                                        b.toString()).replace("{y}", d.toString()).replace("{zoom}", f.toString()).replace("{z}", f.toString())
                                };
                                c = function (a, b, c, h, g) {
                                    var e = a % y, k = b % y;
                                    e = 0 > e ? e + y : e;
                                    k = 0 > k ? k + y : k;
                                    !f["".concat(c)].tiles["".concat(a, ",").concat(b)] && l.url && (k = E(l.url, e, k, c), f[c].loaded = !1, f["".concat(c)].tiles["".concat(a, ",").concat(b)] = p.renderer.image(k, a * v - h, b * v - g, v, v).attr({
                                        zIndex: 2,
                                        opacity: 0
                                    }).on("load", function () {
                                        l.onload && l.onload.apply(this);
                                        if (c === (0 > d.zoom ? 0 : Math.floor(d.zoom)) || c === q.minZoom) f["".concat(c)].actualTilesCount++,
                                        f["".concat(c)].howManyTiles === f["".concat(c)].actualTilesCount && (f[c].loaded = !0, q.isAnimating ? q.redrawTiles = !0 : (q.redrawTiles = !1, C(z)), f["".concat(c)].actualTilesCount = 0)
                                    }).add(m[c]), f["".concat(c)].tiles["".concat(a, ",").concat(b)].posX = a, f["".concat(c)].tiles["".concat(a, ",").concat(b)].posY = b, f["".concat(c)].tiles["".concat(a, ",").concat(b)].originalURL = k)
                                };
                                e = d.pixelsToProjectedUnits({x: 0, y: 0});
                                e = d.projection.def.inverse([e.x, e.y]);
                                e = {lon: e[0] - w, lat: e[1]};
                                g = d.pixelsToProjectedUnits({
                                    x: p.plotWidth,
                                    y: p.plotHeight
                                });
                                g = d.projection.def.inverse([g.x, g.y]);
                                g = {lon: g[0] - w, lat: g[1]};
                                if (e.lat > d.projection.maxLatitude || g.lat < -1 * d.projection.maxLatitude) e.lat = d.projection.maxLatitude, g.lat = -1 * d.projection.maxLatitude;
                                e = this.lonLatToTile(e, k);
                                g = this.lonLatToTile(g, k);
                                n = this.tileToLonLat(e.x, e.y, k);
                                n = d.projection.def.forward([n.lon + w, n.lat]);
                                r = d.projectedUnitsToPixels({x: n[0], y: n[1]});
                                n = e.x * v - r.x;
                                r = e.y * v - r.y;
                                f["".concat(k)] || (f["".concat(k)] = {
                                    tiles: {},
                                    isActive: !1,
                                    howManyTiles: 0,
                                    actualTilesCount: 0,
                                    loaded: !1
                                });
                                f["".concat(k)].howManyTiles = (g.x - e.x + 1) * (g.y - e.y + 1);
                                f["".concat(k)].actualTilesCount = 0;
                                for (B = e.x; B <= g.x; B++) for (var x = e.y; x <= g.y; x++) c(B, x, k, n, r)
                            }
                            Object.keys(f).forEach(function (b) {
                                Object.keys(f[b].tiles).forEach(function (c) {
                                    if (d.projection && d.projection.def) {
                                        var e = 256 / 400.979322 * Math.pow(2, A) / (256 / 400.979322 * Math.pow(2, parseFloat(b))) * 256,
                                            h = f[b].tiles[Object.keys(f[b].tiles)[0]], g = f[b].tiles[c], l = g.posX,
                                            n = g.posY;
                                        if (t(l) && t(n) && t(h.posX) && t(h.posY)) {
                                            g = a.tileToLonLat(h.posX, h.posY, parseFloat(b));
                                            g = d.projection.def.forward([g.lon + w, g.lat]);
                                            g = d.projectedUnitsToPixels({x: g[0], y: g[1]});
                                            var m = h.posX * e - g.x, r = h.posY * e - g.y;
                                            if (p.renderer.globalAnimation && p.hasRendered) {
                                                var u = Number(f[b].tiles[c].attr("x")),
                                                    v = Number(f[b].tiles[c].attr("y")),
                                                    x = Number(f[b].tiles[c].attr("width")),
                                                    y = Number(f[b].tiles[c].attr("height"));
                                                q.isAnimating = !0;
                                                f[b].tiles[c].attr({animator: 0}).animate({animator: 1}, {
                                                    step: function (a, d) {
                                                        f[b].tiles[c].attr({
                                                            x: u + (l * e - m - u) * d.pos,
                                                            y: v + (n * e - r - v) * d.pos,
                                                            width: x + (Math.ceil(e) + 1 - x) * d.pos,
                                                            height: y + (Math.ceil(e) + 1 - y) * d.pos
                                                        })
                                                    }
                                                }, function () {
                                                    q.isAnimating = !1;
                                                    q.redrawTiles && (q.redrawTiles = !1, C(z))
                                                })
                                            } else {
                                                if (q.redrawTiles || parseFloat(b) !== k || (f[b].isActive || parseFloat(b) === k) && Object.keys(f[b].tiles).map(function (a) {
                                                    return f[b].tiles[a]
                                                }).some(function (a) {
                                                    return 0 === a.opacity
                                                })) q.redrawTiles = !1, C(z);
                                                f[b].tiles[c].attr({
                                                    x: l * e - m,
                                                    y: n * e - r,
                                                    width: Math.ceil(e) + 1,
                                                    height: Math.ceil(e) + 1
                                                })
                                            }
                                        }
                                    }
                                })
                            })
                        } else u("Highcharts warning: Tiles Provider not defined in the Provider Registry.", !1)
                    }
                };
                c.prototype.update =
                    function () {
                        var c = this.transformGroups, m = this.chart.mapView, p = arguments[0].provider;
                        c && (c.forEach(function (a) {
                            0 !== Object.keys(a).length && a.destroy()
                        }), this.transformGroups = []);
                        m && !t(m.options.projection) && p && p.type && (c = b[p.type]) && (c = (new c).initialProjectionName, m.update({projection: {name: c}}));
                        a.prototype.update.apply(this, arguments)
                    };
                c.defaultOptions = E(z.defaultOptions, {states: {inactive: {enabled: !1}}});
                return c
            }(z);
            C(w, "beforeMapViewInit", function (a) {
                var c = (this.options.series || []).filter(function (a) {
                    return "tiledwebmap" ===
                        a.type
                })[0];
                a = a.geoBounds;
                if (c && c.provider && c.provider.type && !c.provider.url) {
                    c = b[c.provider.type];
                    if (t(c)) return c = (new c).initialProjectionName, this.options.mapView && (this.options.mapView.recommendedMapView = a ? {
                        projection: {
                            name: c,
                            parallels: [a.y1, a.y2],
                            rotation: [-(a.x1 + a.x2) / 2]
                        }
                    } : {projection: {name: c}, minZoom: 0}), !1;
                    u("Highcharts warning: Tiles Provider not defined in the Provider Registry.", !1)
                }
                return !0
            });
            a.registerSeriesType("tiledwebmap", m);
            "";
            return m
        });
    b(a, "masters/modules/tiledwebmap.src.js",
        [a["Core/Globals.js"], a["Maps/TilesProviders/TilesProvidersRegistry.js"]], function (a, b) {
            a.TilesProvidersRegistry = b
        })
});
//# sourceMappingURL=tiledwebmap.js.map