<div class="container px-3 my-3">
    <figure class="highcharts-figure">
        <div id="figC反应蛋白"></div>
        <p class="figC反应蛋白"></p>
    </figure>
    <script type="text/javascript">
        Highcharts.chart("figC反应蛋白", {
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            chart: {
                height: 180,
                type: 'spline'
            },
            title: {
                text: "C反应蛋白"
            },
            subtitle: {
                text: "2020-06-04 至 2020-06-18"
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%b %Y",
                    year: "%b %Y"
                },
                title: {
                    text: "Date"
                }
            },
            yAxis: {
                title: {
                    text: "C反应蛋白(mg/L)"
                },
                min: 0
            },
            tooltip: {
                headerFormat: "<b>{series.name}</b><br>",
                pointFormat: "{point.x:%e %b %Y}: {point.y:.2f} mg/L"
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: true,
                        radius: 3
                    },
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            colors: ["#06C", "#036", "#000"],
            series: [{
                name: "",
                data: [[Date.UTC(2020, 6, 4, 12, 11, 18), 63.1], [Date.UTC(2020, 6, 5, 13, 29, 18), 111.6], [Date.UTC(2020, 6, 7, 9, 51, 45), 157], [Date.UTC(2020, 6, 8, 12, 11, 45), 157.6], [Date.UTC(2020, 6, 11, 12, 25, 53), 114.9], [Date.UTC(2020, 6, 15, 13, 52, 39), 268.5], [Date.UTC(2020, 6, 18, 12, 38, 43), 224.9]]
            }]
        })
    </script>
</div>
<div class="container px-3 my-3">
    <figure class="highcharts-figure">
        <div id="figeGFR(MDRD)"></div>
        <p class="figeGFR(MDRD)"></p>
    </figure>
    <script type="text/javascript">
        Highcharts.chart("figeGFR(MDRD)", {
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            chart: {
                height: 180,
                type: 'spline'
            },
            title: {
                text: "eGFR(MDRD)"
            },
            subtitle: {
                text: "2020-06-04 至 2020-06-18"
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%b %Y",
                    year: "%b %Y"
                },
                title: {
                    text: "Date"
                }
            },
            yAxis: {
                title: {
                    text: "eGFR(MDRD)(NULL)"
                },
                min: 0
            },
            tooltip: {
                headerFormat: "<b>{series.name}</b><br>",
                pointFormat: "{point.x:%e %b %Y}: {point.y:.2f} NULL"
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: true,
                        radius: 3
                    },
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            colors: ["#06C", "#036", "#000"],
            series: [{
                name: "",
                data: [[Date.UTC(2020, 6, 4, 12, 11, 18), 44], [Date.UTC(2020, 6, 5, 13, 29, 18), 93.7], [Date.UTC(2020, 6, 7, 9, 51, 45), 169.7], [Date.UTC(2020, 6, 8, 12, 11, 45), 129.4], [Date.UTC(2020, 6, 11, 12, 25, 53), 112.5], [Date.UTC(2020, 6, 15, 13, 52, 39), 116.3], [Date.UTC(2020, 6, 18, 12, 38, 43), 64.1]]
            }]
        })
    </script>
</div>
<div class="container px-3 my-3">
    <figure class="highcharts-figure">
        <div id="figH-胆固醇"></div>
        <p class="figH-胆固醇"></p>
    </figure>
    <script type="text/javascript">
        Highcharts.chart("figH-胆固醇", {
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            chart: {
                height: 180,
                type: 'spline'
            },
            title: {
                text: "H-胆固醇"
            },
            subtitle: {
                text: "2020-06-04 至 2020-06-18"
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%b %Y",
                    year: "%b %Y"
                },
                title: {
                    text: "Date"
                }
            },
            yAxis: {
                title: {
                    text: "H-胆固醇(mmol/L)"
                },
                min: 0
            },
            tooltip: {
                headerFormat: "<b>{series.name}</b><br>",
                pointFormat: "{point.x:%e %b %Y}: {point.y:.2f} mmol/L"
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: true,
                        radius: 3
                    },
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            colors: ["#06C", "#036", "#000"],
            series: [{
                name: "",
                data: [[Date.UTC(2020, 6, 4, 12, 11, 18), 0.5], [Date.UTC(2020, 6, 5, 13, 29, 18), 0.6], [Date.UTC(2020, 6, 7, 9, 51, 45), 0.4], [Date.UTC(2020, 6, 8, 12, 11, 45), 0.3], [Date.UTC(2020, 6, 11, 12, 25, 53), 0.3], [Date.UTC(2020, 6, 15, 13, 52, 39), 0.1], [Date.UTC(2020, 6, 18, 12, 38, 43), 0.1]]
            }]
        })
    </script>
</div>
<div class="container px-3 my-3">
    <figure class="highcharts-figure">
        <div id="figL-胆固醇"></div>
        <p class="figL-胆固醇"></p>
    </figure>
    <script type="text/javascript">
        Highcharts.chart("figL-胆固醇", {
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            chart: {
                height: 180,
                type: 'spline'
            },
            title: {
                text: "L-胆固醇"
            },
            subtitle: {
                text: "2020-06-04 至 2020-06-18"
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%b %Y",
                    year: "%b %Y"
                },
                title: {
                    text: "Date"
                }
            },
            yAxis: {
                title: {
                    text: "L-胆固醇(mmol/L)"
                },
                min: 0
            },
            tooltip: {
                headerFormat: "<b>{series.name}</b><br>",
                pointFormat: "{point.x:%e %b %Y}: {point.y:.2f} mmol/L"
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: true,
                        radius: 3
                    },
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            colors: ["#06C", "#036", "#000"],
            series: [{
                name: "",
                data: [[Date.UTC(2020, 6, 4, 12, 11, 18), 0.8], [Date.UTC(2020, 6, 5, 13, 29, 18), 1], [Date.UTC(2020, 6, 7, 9, 51, 45), 1.1], [Date.UTC(2020, 6, 8, 12, 11, 45), 1.1], [Date.UTC(2020, 6, 11, 12, 25, 53), 1.4], [Date.UTC(2020, 6, 15, 13, 52, 39), 0.2], [Date.UTC(2020, 6, 18, 12, 38, 43), 0.3]]
            }]
        })
    </script>
</div>
<div class="container px-3 my-3">
    <figure class="highcharts-figure">
        <div id="fig乳酸脱氢酶"></div>
        <p class="fig乳酸脱氢酶"></p>
    </figure>
    <script type="text/javascript">
        Highcharts.chart("fig乳酸脱氢酶", {
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            chart: {
                height: 180,
                type: 'spline'
            },
            title: {
                text: "乳酸脱氢酶"
            },
            subtitle: {
                text: "2020-06-04 至 2020-06-18"
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%b %Y",
                    year: "%b %Y"
                },
                title: {
                    text: "Date"
                }
            },
            yAxis: {
                title: {
                    text: "乳酸脱氢酶(U/L)"
                },
                min: 0
            },
            tooltip: {
                headerFormat: "<b>{series.name}</b><br>",
                pointFormat: "{point.x:%e %b %Y}: {point.y:.2f} U/L"
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: true,
                        radius: 3
                    },
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            colors: ["#06C", "#036", "#000"],
            series: [{
                name: "",
                data: [[Date.UTC(2020, 6, 4, 12, 11, 18), 294], [Date.UTC(2020, 6, 5, 13, 29, 18), 407], [Date.UTC(2020, 6, 7, 9, 51, 45), 391], [Date.UTC(2020, 6, 8, 12, 11, 45), 351], [Date.UTC(2020, 6, 11, 12, 25, 53), 418], [Date.UTC(2020, 6, 15, 13, 52, 39), 444], [Date.UTC(2020, 6, 18, 12, 38, 43), 580]]
            }]
        })
    </script>
</div>
<div class="container px-3 my-3">
    <figure class="highcharts-figure">
        <div id="fig亮氨酸氨酞酶"></div>
        <p class="fig亮氨酸氨酞酶"></p>
    </figure>
    <script type="text/javascript">
        Highcharts.chart("fig亮氨酸氨酞酶", {
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            chart: {
                height: 180,
                type: 'spline'
            },
            title: {
                text: "亮氨酸氨酞酶"
            },
            subtitle: {
                text: "2020-06-04 至 2020-06-18"
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%b %Y",
                    year: "%b %Y"
                },
                title: {
                    text: "Date"
                }
            },
            yAxis: {
                title: {
                    text: "亮氨酸氨酞酶(U/L)"
                },
                min: 0
            },
            tooltip: {
                headerFormat: "<b>{series.name}</b><br>",
                pointFormat: "{point.x:%e %b %Y}: {point.y:.2f} U/L"
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: true,
                        radius: 3
                    },
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            colors: ["#06C", "#036", "#000"],
            series: [{
                name: "",
                data: [[Date.UTC(2020, 6, 4, 12, 11, 18), 48.9], [Date.UTC(2020, 6, 5, 13, 29, 18), 52.9], [Date.UTC(2020, 6, 7, 9, 51, 45), 74.4], [Date.UTC(2020, 6, 8, 12, 11, 45), 74.6], [Date.UTC(2020, 6, 11, 12, 25, 53), 77.7], [Date.UTC(2020, 6, 15, 13, 52, 39), 93.7], [Date.UTC(2020, 6, 18, 12, 38, 43), 83]]
            }]
        })
    </script>
</div>
<div class="container px-3 my-3">
    <figure class="highcharts-figure">
        <div id="fig尿素"></div>
        <p class="fig尿素"></p>
    </figure>
    <script type="text/javascript">
        Highcharts.chart("fig尿素", {
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            chart: {
                height: 180,
                type: 'spline'
            },
            title: {
                text: "尿素"
            },
            subtitle: {
                text: "2020-06-04 至 2020-06-18"
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%b %Y",
                    year: "%b %Y"
                },
                title: {
                    text: "Date"
                }
            },
            yAxis: {
                title: {
                    text: "尿素(mmol/L)"
                },
                min: 0
            },
            tooltip: {
                headerFormat: "<b>{series.name}</b><br>",
                pointFormat: "{point.x:%e %b %Y}: {point.y:.2f} mmol/L"
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: true,
                        radius: 3
                    },
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            colors: ["#06C", "#036", "#000"],
            series: [{
                name: "",
                data: [[Date.UTC(2020, 6, 4, 12, 11, 18), 14.9], [Date.UTC(2020, 6, 5, 13, 29, 18), 7.4], [Date.UTC(2020, 6, 7, 9, 51, 45), 4.3], [Date.UTC(2020, 6, 8, 12, 11, 45), 5.6], [Date.UTC(2020, 6, 11, 12, 25, 53), 13.6], [Date.UTC(2020, 6, 15, 13, 52, 39), 11.4], [Date.UTC(2020, 6, 18, 12, 38, 43), 19.7]]
            }]
        })
    </script>
</div>
<div class="container px-3 my-3">
    <figure class="highcharts-figure">
        <div id="fig尿酸"></div>
        <p class="fig尿酸"></p>
    </figure>
    <script type="text/javascript">
        Highcharts.chart("fig尿酸", {
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            chart: {
                height: 180,
                type: 'spline'
            },
            title: {
                text: "尿酸"
            },
            subtitle: {
                text: "2020-06-04 至 2020-06-18"
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%b %Y",
                    year: "%b %Y"
                },
                title: {
                    text: "Date"
                }
            },
            yAxis: {
                title: {
                    text: "尿酸(umol/L)"
                },
                min: 0
            },
            tooltip: {
                headerFormat: "<b>{series.name}</b><br>",
                pointFormat: "{point.x:%e %b %Y}: {point.y:.2f} umol/L"
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: true,
                        radius: 3
                    },
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            colors: ["#06C", "#036", "#000"],
            series: [{
                name: "",
                data: [[Date.UTC(2020, 6, 4, 12, 11, 18), 264], [Date.UTC(2020, 6, 5, 13, 29, 18), 124], [Date.UTC(2020, 6, 7, 9, 51, 45), 61], [Date.UTC(2020, 6, 8, 12, 11, 45), 99], [Date.UTC(2020, 6, 11, 12, 25, 53), 196], [Date.UTC(2020, 6, 15, 13, 52, 39), 170], [Date.UTC(2020, 6, 18, 12, 38, 43), 331]]
            }]
        })
    </script>
</div>
