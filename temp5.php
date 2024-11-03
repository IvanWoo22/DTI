<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="code/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <link href="code/css/bootstrap.min.css" rel="stylesheet">
    <script src="code/js/bootstrap.bundle.min.js"></script>
    <script src="code/js/highcharts.js"></script>
    <script src="code/modules/series-label.js"></script>
    <script src="code/modules/exporting.js"></script>
    <script src="code/modules/export-data.js"></script>
    <script src="code/modules/accessibility.js"></script>
    <script src="code/js/jquery.min.js"></script>
    <link href="code/custom.css" rel="stylesheet" type="text/css">

    <title>Patient Records</title>
    <style>
        .tab {
            overflow: hidden;
            border: 1px solid #ccc;
            background-color: #f1f1f1;
            display: flex;
            justify-content: center;
        }

        .tab button {
            background-color: inherit;
            float: left;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 14px 16px;
            transition: 0.3s;
            font-size: 20px;
        }

        .tab button:hover {
            background-color: #888888;
        }

        .tab button.active {
            background-color: #ccc;
        }

        .tabcontent {
            display: none;
            padding: 6px 12px;
            border: 1px solid #ccc;
            border-top: none;
        }

        .tablinks {
            margin: 0 16px;
            padding: 10px 20px;
            cursor: pointer;
        }
    </style>
</head>

<body>
<div class="container px-3 my-3">
    <h3 style="margin:30px">基本信息</h3>
    <div class="container px-3 my-3">
        <table class="table table-hover table-striped w-auto" style="font-size:larger;width:50%">
            <tbody>
            <tr>
                <td class='text-end'>住院号</td>
                <td class='text-center'><strong>4092866</strong></td>
            </tr>
            <tr>
                <td class='text-end'>姓名</td>
                <td class='text-center'><strong>王华瑞</strong></td>
            </tr>
            <tr>
                <td class='text-end'>性别</td>
                <td class='text-center'><strong>男</strong></td>
            </tr>
            <tr>
                <td class='text-end'>年龄</td>
                <td class='text-center'><strong>89</strong></td>
            </tr>
            <tr>
                <td class='text-end'>民族</td>
                <td class='text-center'><strong>汉族</strong></td>
            </tr>
            <tr>
                <td class='text-end'>婚姻</td>
                <td class='text-center'><strong>丧偶</strong></td>
            </tr>
            <tr>
                <td class='text-end'>出生地</td>
                <td class='text-center'><strong>江苏省南京市鼓楼区宁海路街道港宁园1-403</strong></td>
            </tr>
            <tr>
                <td class='text-end'>职业</td>
                <td class='text-center'><strong>未提供</strong></td>
            </tr>
            <tr>
                <td class='text-end'>工作单位</td>
                <td class='text-center'><strong>南京梅园纪念馆</strong></td>
            </tr>
            <tr>
                <td class='text-end'>住址</td>
                <td class='text-center'><strong>港宁园1-403</strong></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="tab">
    <button class="tablinks" data-tab="BasicRecords">ICU登记</button>
    <button class="tablinks" data-tab="HospitalRecords">文书记录</button>
    <button class="tablinks" data-tab="DoctorOrders">医嘱记录</button>
    <button class="tablinks" data-tab="ChecksRecords">检测结果</button>
    <button class="tablinks" data-tab="TestResults">化验结果</button>
    <button class="tablinks" data-tab="NursingSigns">护理体征</button>
    <button class="tablinks" data-tab="NutritionalRecords">营养数据</button>
</div>

<div id="BasicRecords" class="tabcontent">
    <div id="BasicRecords"></div>
</div>

<div id="ChecksRecords" class="tabcontent">
    <div id="ChecksRecords"></div>
</div>

<div id="TestResults" class="tabcontent">
    <div id="TestResults"></div>
</div>

<div id="HospitalRecords" class="tabcontent">
    <div id="HospitalRecords"></div>
</div>

<div id="NutritionalRecords" class="tabcontent">
    <div id="NutritionalRecords"></div>
</div>

<div id="DoctorOrders" class="tabcontent">
    <div id="DoctorOrders"></div>
</div>

<div id="NursingSigns" class="tabcontent">
    <div id="NursingSigns"></div>
</div>


<script>
    document.addEventListener('DOMContentLoaded', function () {
        let patientId = 4092866;

        // 为每个按钮添加点击事件
        document.querySelectorAll('.tab button').forEach(button => {
            button.addEventListener('click', function (event) {
                openTab(event, this.getAttribute('data-tab'));
            });
        });

        function openTab(evt, tabName) {
            document.querySelectorAll('.tabcontent').forEach(content => content.style.display = "none");
            document.querySelectorAll('.tablinks').forEach(link => link.classList.remove('active'));
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.classList.add('active');

            // 根据 tabName 加载内容
            loadContent('fetch_info.php', tabName, `type=${tabName}&id=${patientId}`);
        }

        function loadContent(url, elementId, params) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params,
            })
                .then(response => response.text())
                .then(data => document.getElementById(elementId).innerHTML = data)
                .catch(error => console.error('Error:', error));
        }
    });
</script>
</body>
</html>


<div class="container px-3 my-3">
    <div class="accordion" id="test">
        <div class="accordion-item">
            <h3 class="accordion-header" id="heading1">
                <button class="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse1"
                        aria-expanded="false"
                        aria-controls="collapse1">
                    ICU时间：2019-03-27 08:00:00 至 2019-04-30 07:59:59
                </button>
            </h3>
            <div id="collapse1" class="accordion-collapse collapse"
                 aria-labelledby="heading1">
                <div class="accordion-body">
                    <div class="container px-3 my-3">
                        <figure class="highcharts-figure">
                            <div id="fig1"></div>
                        </figure>
                        <script type="text/javascript">
                            Highcharts.chart("fig1", {
                                credits: {enabled: false},
                                legend: {enabled: false},
                                chart: {height: 180, type: 'spline'},
                                title: {text: ""},
                                xAxis: {
                                    type: "linear",
                                    title: {text: "Number of days in ICU"}
                                },
                                yAxis: {title: {text: "肠内营养剂量"}, min: 0},
                                plotOptions: {
                                    series: {
                                        marker: {enabled: true, radius: 3},
                                        dataLabels: {enabled: true}
                                    }
                                },
                                colors: ["#06C", "#036", "#000"],
                                series: [{
                                    name: "",
                                    data: [[1, 1300], [2, 1200], [3, 1820], [4, 1800], [5, 1610], [6, 1800], [7, 1820], [8, 1300], [9, 1190], [10, 1100], [11, 510], [12, 1300], [13, 1700], [14, 900], [15, 1270], [16, 1320], [17, 1300], [18, 1640], [19, 1800], [20, 210], [21, 1300], [22, 1330], [23, 1800], [24, 1330], [25, 1850], [26, 1700], [27, 1300], [28, 1420], [29, 1300], [30, 1320], [31, 1300], [32, 1860], [33, 1330]]
                                }]
                            });
                        </script>
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h3 class="accordion-header" id="heading2">
                <button class="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse2"
                        aria-expanded="false"
                        aria-controls="collapse2">
                    ICU时间：2019-04-29 08:00:00 至 2019-05-29 07:59:59
                </button>
            </h3>
            <div id="collapse2" class="accordion-collapse collapse"
                 aria-labelledby="heading2">
                <div class="accordion-body">
                    <div class="container px-3 my-3">
                        <figure class="highcharts-figure">
                            <div id="fig2"></div>
                        </figure>
                        <script type="text/javascript">
                            Highcharts.chart("fig2", {
                                credits: {enabled: false},
                                legend: {enabled: false},
                                chart: {height: 180, type: 'spline'},
                                title: {text: ""},
                                xAxis: {
                                    type: "linear",
                                    title: {text: "Number of days in ICU"}
                                },
                                yAxis: {title: {text: "肠内营养剂量"}, min: 0},
                                plotOptions: {
                                    series: {
                                        marker: {enabled: true, radius: 3},
                                        dataLabels: {enabled: true}
                                    }
                                },
                                colors: ["#06C", "#036", "#000"],
                                series: [{
                                    name: "",
                                    data: [[1, 1760], [2, 1730], [3, 1830], [4, 1130], [5, 1730], [6, 1300], [7, 1130], [8, 1730], [9, 1170], [10, 1730], [11, 1830], [12, 1530], [13, 1130], [14, 1730], [15, 1730], [16, 1130], [17, 1730], [18, 1730], [19, 1630], [20, 1730], [21, 1340], [22, 1830], [23, 1730], [24, 410], [25, 1230], [26, 1840], [27, 1230], [28, 1740], [29, 1230], [30, 1730]]
                                }]
                            });
                        </script>
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h3 class="accordion-header" id="heading3">
                <button class="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse3"
                        aria-expanded="false"
                        aria-controls="collapse3">
                    ICU时间：2019-05-28 08:00:00 至 2019-07-02 07:59:59
                </button>
            </h3>
            <div id="collapse3" class="accordion-collapse collapse"
                 aria-labelledby="heading3">
                <div class="accordion-body">
                    <div class="container px-3 my-3">
                        <figure class="highcharts-figure">
                            <div id="fig3"></div>
                        </figure>
                        <script type="text/javascript">
                            Highcharts.chart("fig3", {
                                credits: {enabled: false},
                                legend: {enabled: false},
                                chart: {height: 180, type: 'spline'},
                                title: {text: ""},
                                xAxis: {
                                    type: "linear",
                                    title: {text: "Number of days in ICU"}
                                },
                                yAxis: {title: {text: "肠内营养剂量"}, min: 0},
                                plotOptions: {
                                    series: {
                                        marker: {enabled: true, radius: 3},
                                        dataLabels: {enabled: true}
                                    }
                                },
                                colors: ["#06C", "#036", "#000"],
                                series: [{
                                    name: "",
                                    data: [[1, 600], [2, 1660], [3, 1020], [4, 1520], [5, 1700], [6, 1680], [7, 1730], [8, 1730], [9, 500], [10, 1020], [11, 1730], [12, 1700], [13, 1060], [14, 1240], [15, 1730], [16, 0], [17, 530], [18, 460], [19, 1020], [20, 1020], [21, 630], [22, 1830], [23, 1830], [24, 1020], [25, 590], [26, 1500], [27, 1400], [28, 1730], [29, 1520], [30, 1730], [31, 1020], [32, 1830], [33, 1020], [34, 1600], [35, 1730]]
                                }]
                            });
                        </script>
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h3 class="accordion-header" id="heading4">
                <button class="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse4"
                        aria-expanded="false"
                        aria-controls="collapse4">
                    ICU时间：2019-07-01 08:00:00 至 2019-07-09 07:59:59
                </button>
            </h3>
            <div id="collapse4" class="accordion-collapse collapse"
                 aria-labelledby="heading4">
                <div class="accordion-body">
                    <div class="container px-3 my-3">
                        <figure class="highcharts-figure">
                            <div id="fig4"></div>
                        </figure>
                        <script type="text/javascript">
                            Highcharts.chart("fig4", {
                                credits: {enabled: false},
                                legend: {enabled: false},
                                chart: {height: 180, type: 'spline'},
                                title: {text: ""},
                                xAxis: {
                                    type: "linear",
                                    title: {text: "Number of days in ICU"}
                                },
                                yAxis: {title: {text: "肠内营养剂量"}, min: 0},
                                plotOptions: {
                                    series: {
                                        marker: {enabled: true, radius: 3},
                                        dataLabels: {enabled: true}
                                    }
                                },
                                colors: ["#06C", "#036", "#000"],
                                series: [{
                                    name: "",
                                    data: [[1, 1190], [2, 900], [3, 967.5], [4, 400], [5, 80], [6, 430]]
                                }]
                            });
                        </script>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

