/*
 Highcharts JS v11.1.0 (2023-06-05)

 (c) 2009-2022

 License: www.highcharts.com/license
*/
'use strict';
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/tiledwebmap", ["highcharts"], function (h) {
        a(h);
        a.Highcharts = h;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function h(a, h, r, q) {
        a.hasOwnProperty(h) || (a[h] = q.apply(null, r), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: h,
                module: a[h]
            }
        })))
    }

    a = a ? a._modules :
        {};
    h(a, "Maps/TilesProviders/OpenStreetMap.js", [], function () {
        class a {
            constructor() {
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
                        credits: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">\n                        OpenStreetMap</a> contributors, <a href="https://viewfinderpanoramas.org">SRTM</a> \n                        | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> \n                        (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                    }
                };
                this.initialProjectionName = "WebMercator";
                this.defaultCredits = 'Map data \u00a92023 <a href="https://www.openstreetmap.org/copyright">\n                    OpenStreetMap</a>'
            }
        }

        return a
    });
    h(a, "Maps/TilesProviders/Stamen.js", [], function () {
        class a {
            constructor() {
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
                        credits: '\u00a9 Map tiles by <a href="https://stamen.com">Stamen Design</a>,\n                    under <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.\n                    Data by <a href="https://openstreetmap.org">OpenStreetMap</a>, under\n                    <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
                    }
                };
                this.initialProjectionName = "WebMercator";
                this.defaultCredits = '\u00a9 Map tiles by <a href="https://stamen.com">Stamen Design</a>,\n                under <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.\n                Data by <a href="https://openstreetmap.org">OpenStreetMap</a>, under\n                <a href="https://www.openstreetmap.org/copyright">ODbL</a>'
            }
        }

        return a
    });
    h(a, "Maps/TilesProviders/LimaLabs.js", [], function () {
        class a {
            constructor() {
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
        }

        return a
    });
    h(a, "Maps/TilesProviders/Thunderforest.js", [], function () {
        class a {
            constructor() {
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
                this.defaultCredits = 'Maps \u00a9 <a href="https://www.thunderforest.com">Thunderforest</a>,\n                Data \u00a9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
                this.requiresApiKey = !0
            }
        }

        return a
    });
    h(a, "Maps/TilesProviders/Esri.js", [], function () {
        class a {
            constructor() {
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
                        credits: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, \n                        Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, \n                        Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), \n                        and the GIS User Community"
                    },
                    WorldImagery: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 20,
                        credits: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, \n                        USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, \n                        and the GIS User Community"
                    },
                    WorldTerrain: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 13,
                        credits: "Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, \n                        DeLorme, and NPS"
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
                        credits: "Tiles &copy; Esri &mdash; Source: US National Park \n                        Service"
                    },
                    NatGeoWorldMap: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0,
                        maxZoom: 16,
                        credits: "Tiles &copy; Esri &mdash; National Geographic, Esri,\n                        DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO,\n                         NOAA, iPC"
                    },
                    WorldGrayCanvas: {
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                        minZoom: 0, maxZoom: 16, credits: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
                    }
                };
                this.initialProjectionName = "WebMercator";
                this.defaultCredits = "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ,\n                USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong),\n                Esri (Thailand), TomTom, 2012"
            }
        }

        return a
    });
    h(a, "Maps/TilesProviders/USGS.js", [], function () {
        class a {
            constructor() {
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
                this.defaultCredits = 'Tiles courtesy of the <a href="https://usgs.gov/">U.S.\n                Geological Survey</a>'
            }
        }

        return a
    });
    h(a, "Maps/TilesProviders/TilesProvidersRegistry.js",
        [a["Maps/TilesProviders/OpenStreetMap.js"], a["Maps/TilesProviders/Stamen.js"], a["Maps/TilesProviders/LimaLabs.js"], a["Maps/TilesProviders/Thunderforest.js"], a["Maps/TilesProviders/Esri.js"], a["Maps/TilesProviders/USGS.js"]], function (a, h, r, q, u, D) {
            return {OpenStreetMap: a, Stamen: h, LimaLabs: r, Thunderforest: q, Esri: u, USGS: D}
        });
    h(a, "Series/TiledWebMap/TiledWebMapSeries.js", [a["Core/Series/SeriesRegistry.js"], a["Maps/TilesProviders/TilesProvidersRegistry.js"], a["Core/Chart/Chart.js"], a["Core/Utilities.js"]],
        function (a, h, r, q) {
            const {seriesTypes: {map: u}} = a, {addEvent: D, defined: p, error: v, merge: A, pick: B} = q;

            class E extends u {
                constructor() {
                    super(...arguments);
                    this.options = void 0;
                    this.isAnimating = this.redrawTiles = !1
                }

                lonLatToTile(a, b) {
                    const {lon: c, lat: d} = a;
                    return {
                        x: Math.floor((c + 180) / 360 * Math.pow(2, b)),
                        y: Math.floor((1 - Math.log(Math.tan(d * Math.PI / 180) + 1 / Math.cos(d * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, b))
                    }
                }

                tileToLonLat(a, b, c) {
                    b = Math.PI - 2 * Math.PI * b / Math.pow(2, c);
                    return {
                        lon: a / Math.pow(2, c) * 360 - 180, lat: 180 / Math.PI *
                            Math.atan(.5 * (Math.exp(b) - Math.exp(-b)))
                    }
                }

                drawPoints() {
                    var a;
                    const {chart: b} = this, c = b.mapView;
                    if (c) {
                        this.tiles || (this.tiles = {});
                        this.transformGroups || (this.transformGroups = []);
                        var {tiles: d, transformGroups: r} = this, n = this, l = this.options.provider, {zoom: x} = c,
                            q = B(c.projection.options.rotation && c.projection.options.rotation[0], 0),
                            u = b.renderer.forExport ? 0 : 200, A = a => {
                                Object.keys(d).forEach(b => {
                                    parseFloat(b) === (0 > c.zoom ? 0 : Math.floor(c.zoom)) || n.minZoom && (0 > c.zoom ? 0 : Math.floor(c.zoom)) < n.minZoom && parseFloat(b) ===
                                    n.minZoom || n.maxZoom && (0 > c.zoom ? 0 : Math.floor(c.zoom)) > n.maxZoom && parseFloat(b) === n.maxZoom ? Object.keys(d[b].tiles).forEach((c, k) => {
                                        d[b].tiles[c].animate({opacity: 1}, {duration: a}, function () {
                                            k === Object.keys(d[b].tiles).length - 1 && (d[b].isActive = !0)
                                        })
                                    }) : Object.keys(d[b].tiles).forEach((c, k) => {
                                        d[b].tiles[c].animate({opacity: 0}, {duration: a, defer: a / 2}, function () {
                                            d[b].tiles[c].destroy();
                                            delete d[b].tiles[c];
                                            k === Object.keys(d[b].tiles).length - 1 && (d[b].isActive = !1, d[b].loaded = !1)
                                        })
                                    })
                                })
                            }, m = 0 > x ? 0 : Math.floor(x),
                            y = Math.pow(2, m),
                            f = 256 / 400.979322 * Math.pow(2, x) / (256 / 400.979322 * Math.pow(2, m)), w = 256 * f;
                        if (l && (l.type || l.url)) {
                            if (l.type && !l.url) {
                                f = h[l.type];
                                if (!p(f)) {
                                    v("Highcharts warning: Tiles Provider '" + l.type + "' not defined in the ProviderRegistry.", !1);
                                    return
                                }
                                var e = new f;
                                ({initialProjectionName: f} = e);
                                var t = "";
                                if (l.theme && p(e.themes[l.theme])) var g = e.themes[l.theme]; else {
                                    var z = Object.keys(e.themes)[0];
                                    g = e.themes[z];
                                    v("Highcharts warning: The Tiles Provider's Theme '" + l.theme + "' is not defined in the Provider definition - falling back to '" +
                                        z + "'.", !1)
                                }
                                l.subdomain && e.subdomains && -1 !== e.subdomains.indexOf(l.subdomain) ? t = l.subdomain : p(e.subdomains) && (t = B(e.subdomains && e.subdomains[0], ""), v("Highcharts warning: The Tiles Provider's Subdomain '" + l.subdomain + "' is not defined in the Provider definition - falling back to '" + t + "'.", !1));
                                e.requiresApiKey && (l.apiKey ? g.url = g.url.replace("{apikey}", l.apiKey) : (v("Highcharts warning: The Tiles Provider requires API Key to use tiles, use provider.apiKey to provide a token.", !1), g.url = g.url.replace("?apikey={apikey}",
                                    "")));
                                l.url = g.url.replace("{s}", t);
                                this.minZoom = g.minZoom;
                                this.maxZoom = g.maxZoom;
                                e = B(b.userOptions.credits && b.userOptions.credits.text, "Highcharts.com " + B(g.credits, e.defaultCredits));
                                b.credits ? b.credits.update({text: e}) : b.addCredits({
                                    text: e,
                                    style: B(null === (a = b.options.credits) || void 0 === a ? void 0 : a.style, {})
                                });
                                c.projection.options.name !== f && v("Highcharts warning: The set projection is different than supported by Tiles Provider.", !1)
                            } else c.projection.options.name || v("Highcharts warning: The set projection is different than supported by Tiles Provider.",
                                !1);
                            p(this.minZoom) && m < this.minZoom ? (m = this.minZoom, y = Math.pow(2, m), f = 256 / 400.979322 * Math.pow(2, x) / (256 / 400.979322 * Math.pow(2, m)), w = 256 * f) : p(this.maxZoom) && m > this.maxZoom && (m = this.maxZoom, y = Math.pow(2, m), f = 256 / 400.979322 * Math.pow(2, x) / (256 / 400.979322 * Math.pow(2, m)), w = 256 * f);
                            if (c.projection && c.projection.def) {
                                c.projection.hasCoordinates = !0;
                                r[m] || (r[m] = b.renderer.g().add(this.group));
                                const h = (a, b, c, d) => a.replace("{x}", b.toString()).replace("{y}", c.toString()).replace("{zoom}", d.toString()).replace("{z}",
                                    d.toString());
                                a = (a, e, k, f, m) => {
                                    var C = a % y, g = e % y;
                                    C = 0 > C ? C + y : C;
                                    g = 0 > g ? g + y : g;
                                    !d[`${k}`].tiles[`${a},${e}`] && l.url && (g = h(l.url, C, g, k), d[k].loaded = !1, d[`${k}`].tiles[`${a},${e}`] = b.renderer.image(g, a * w - f, e * w - m, w, w).attr({
                                        zIndex: 2,
                                        opacity: 0
                                    }).on("load", function () {
                                        l.onload && l.onload.apply(this);
                                        if (k === (0 > c.zoom ? 0 : Math.floor(c.zoom)) || k === n.minZoom) d[`${k}`].actualTilesCount++, d[`${k}`].howManyTiles === d[`${k}`].actualTilesCount && (d[k].loaded = !0, n.isAnimating ? n.redrawTiles = !0 : (n.redrawTiles = !1, A(u)), d[`${k}`].actualTilesCount =
                                            0)
                                    }).add(r[k]), d[`${k}`].tiles[`${a},${e}`].posX = a, d[`${k}`].tiles[`${a},${e}`].posY = e, d[`${k}`].tiles[`${a},${e}`].originalURL = g)
                                };
                                f = c.pixelsToProjectedUnits({x: 0, y: 0});
                                f = c.projection.def.inverse([f.x, f.y]);
                                f = {lon: f[0] - q, lat: f[1]};
                                e = c.pixelsToProjectedUnits({x: b.plotWidth, y: b.plotHeight});
                                e = c.projection.def.inverse([e.x, e.y]);
                                e = {lon: e[0] - q, lat: e[1]};
                                if (f.lat > c.projection.maxLatitude || e.lat < -1 * c.projection.maxLatitude) f.lat = c.projection.maxLatitude, e.lat = -1 * c.projection.maxLatitude;
                                f = this.lonLatToTile(f,
                                    m);
                                e = this.lonLatToTile(e, m);
                                g = this.tileToLonLat(f.x, f.y, m);
                                g = c.projection.def.forward([g.lon + q, g.lat]);
                                t = c.projectedUnitsToPixels({x: g[0], y: g[1]});
                                g = f.x * w - t.x;
                                t = f.y * w - t.y;
                                d[`${m}`] || (d[`${m}`] = {
                                    tiles: {},
                                    isActive: !1,
                                    howManyTiles: 0,
                                    actualTilesCount: 0,
                                    loaded: !1
                                });
                                d[`${m}`].howManyTiles = (e.x - f.x + 1) * (e.y - f.y + 1);
                                d[`${m}`].actualTilesCount = 0;
                                for (z = f.x; z <= e.x; z++) for (let b = f.y; b <= e.y; b++) a(z, b, m, g, t)
                            }
                            Object.keys(d).forEach(a => {
                                Object.keys(d[a].tiles).forEach(e => {
                                    if (c.projection && c.projection.def) {
                                        const k =
                                                256 / 400.979322 * Math.pow(2, x) / (256 / 400.979322 * Math.pow(2, parseFloat(a))) * 256,
                                            g = d[a].tiles[Object.keys(d[a].tiles)[0]], {
                                                posX: h,
                                                posY: l
                                            } = d[a].tiles[e];
                                        if (p(h) && p(l) && p(g.posX) && p(g.posY)) {
                                            var f = this.tileToLonLat(g.posX, g.posY, parseFloat(a));
                                            f = c.projection.def.forward([f.lon + q, f.lat]);
                                            f = c.projectedUnitsToPixels({x: f[0], y: f[1]});
                                            const F = g.posX * k - f.x, p = g.posY * k - f.y;
                                            if (b.renderer.globalAnimation && b.hasRendered) {
                                                const b = Number(d[a].tiles[e].attr("x")),
                                                    c = Number(d[a].tiles[e].attr("y")),
                                                    f = Number(d[a].tiles[e].attr("width")),
                                                    g = Number(d[a].tiles[e].attr("height"));
                                                n.isAnimating = !0;
                                                d[a].tiles[e].attr({animator: 0}).animate({animator: 1}, {
                                                    step: (m, n) => {
                                                        d[a].tiles[e].attr({
                                                            x: b + (h * k - F - b) * n.pos,
                                                            y: c + (l * k - p - c) * n.pos,
                                                            width: f + (Math.ceil(k) + 1 - f) * n.pos,
                                                            height: g + (Math.ceil(k) + 1 - g) * n.pos
                                                        })
                                                    }
                                                }, function () {
                                                    n.isAnimating = !1;
                                                    n.redrawTiles && (n.redrawTiles = !1, A(u))
                                                })
                                            } else {
                                                if (n.redrawTiles || parseFloat(a) !== m || (d[a].isActive || parseFloat(a) === m) && Object.keys(d[a].tiles).map(b => d[a].tiles[b]).some(a => 0 === a.opacity)) n.redrawTiles = !1, A(u);
                                                d[a].tiles[e].attr({
                                                    x: h *
                                                        k - F,
                                                    y: l * k - p,
                                                    width: Math.ceil(k) + 1,
                                                    height: Math.ceil(k) + 1
                                                })
                                            }
                                        }
                                    }
                                })
                            })
                        } else v("Highcharts warning: Tiles Provider not defined in the Provider Registry.", !1)
                    }
                }

                update() {
                    var {transformGroups: a} = this;
                    const b = this.chart.mapView, {provider: c} = arguments[0];
                    a && (a.forEach(a => {
                        0 !== Object.keys(a).length && a.destroy()
                    }), this.transformGroups = []);
                    b && !p(b.options.projection) && c && c.type && (a = h[c.type]) && (a = new a, {initialProjectionName: a} = a, b.update({projection: {name: a}}));
                    super.update.apply(this, arguments)
                }
            }

            E.defaultOptions =
                A(u.defaultOptions, {states: {inactive: {enabled: !1}}});
            D(r, "beforeMapViewInit", function (a) {
                var b = (this.options.series || []).filter(a => "tiledwebmap" === a.type)[0];
                ({geoBounds: a} = a);
                if (b && b.provider && b.provider.type && !b.provider.url) {
                    b = h[b.provider.type];
                    if (p(b)) {
                        b = new b;
                        ({initialProjectionName: b} = b);
                        if (this.options.mapView) if (a) {
                            const {x1: c, y1: d, x2: h, y2: n} = a;
                            this.options.mapView.recommendedMapView = {
                                projection: {
                                    name: b,
                                    parallels: [d, n],
                                    rotation: [-(c + h) / 2]
                                }
                            }
                        } else this.options.mapView.recommendedMapView = {
                            projection: {name: b},
                            minZoom: 0
                        };
                        return !1
                    }
                    v("Highcharts warning: Tiles Provider not defined in the Provider Registry.", !1)
                }
                return !0
            });
            a.registerSeriesType("tiledwebmap", E);
            "";
            return E
        });
    h(a, "masters/modules/tiledwebmap.src.js", [a["Core/Globals.js"], a["Maps/TilesProviders/TilesProvidersRegistry.js"]], function (a, h) {
        a.TilesProvidersRegistry = h
    })
});
//# sourceMappingURL=tiledwebmap.js.map