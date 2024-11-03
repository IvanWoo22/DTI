<?php
session_start();
if (!isset($_SESSION['logged'])) {
    header('Location: index.php');
    exit;
}

$selectedOptions = [];
$numberOfElements = 0;

if (isset($_POST['selectedTests'])) {
    $selectedOptions = $_POST['selectedTests'];
    $numberOfElements = count($selectedOptions);
} else {
    echo "没有选择任何一项内容,请返回查验。<br>";
    echo '<a class="btn btn-primary" href="javascript:history.go(-1)" role="button">返回选择</a>';
    exit;
}

require_once "dbconn.php";
require_once "getEarliestTimestamp.php";

function generateScatterChart($option, $data, $chartIndex, $BigItem, $Item, $Unit): void
{
    echo '<div class="container px-3 my-3">
        <figure class="highcharts-figure">
            <div id="fig' . $chartIndex . '"></div>
            <p class="fig' . $chartIndex . '"></p>
        </figure>
        <script type="text/javascript">
            function regression(arrY, arrX) {
                var r, sy, sx, b, a, meanX, meanY;
                r = jStat.corrcoeff(arrX, arrY);
                sy = jStat.stdev(arrY);
                sx = jStat.stdev(arrX);
                meanY = jStat(arrY).mean();
                meanX = jStat(arrX).mean();
                b = r * (sy / sx);
                a = meanY - meanX * b;
                
                // Set up a line
                var y1, y2, x1, x2;
                x1 = jStat.min(arrX);
                x2 = jStat.max(arrX);
                y1 = a + b * x1;
                y2 = a + b * x2;
                
                return {
                    line: [
                        [x1, y1],
                        [x2, y2]
                    ],
                    r
                };
            }

            var data = ' . json_encode($data) . ';
            var xData = [];
            var yData = [];
            var personIDColorMap = {};

            data.forEach(function(item) {
                xData.push(parseInt(item["DateDiffDays"]));
                yData.push(parseFloat(item["Result"]));

                if (!personIDColorMap.hasOwnProperty(item["PID"])) {
                    personIDColorMap[item["PID"]] = Highcharts.getOptions().colors[
                        Object.keys(personIDColorMap).length % Highcharts.getOptions().colors.length
                    ];
                }
            });

            var { line, r } = regression(yData, xData);

            Highcharts.chart("fig' . $chartIndex . '", {
                chart: {
                    type: "scatter",
                    zoomType: "x"
                },
                title: {
                    text: "' . $BigItem . '-' . $Item . '"
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: "入院天数"
                    },
                    labels: {
                        format: "{value}天"
                    },
                    startOnTick: false,
                    min: 0,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: "' . $Item . ' (' . $Unit . ')"
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    scatter: {
                        jitter: {
                            x: 0.2,
                            y: 0
                        },
                        marker: {
                            radius: 2.5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: "rgb(100,100,100)"
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        if (this.series.data.length > 2) {
                            return "入院第" + this.point.x + "天<br>" +
                                "' . $Item . ': " + this.point.y + "<br>" +
                                "PersonID: <b>" + this.point.PID + "</b><br>" +
                                "RecordTime: <b>" + this.point.RecordTime + "</b><br>" +
                                "Platform: <b>" + this.point.Platform + "</b>";
                        } else {
                            return (
                                this.series.name +
                                "<br/>r: " +
                                this.series.userOptions.r.toFixed(2)
                            );
                        }
                    }
                },
                series: [{
                    type: "scatter",
                    name: "' . $option . '",
                    colorByPoint: true,
                    data: xData.map(function(value, index) {
                        var point = data[index];
                        return {
                            x: value,
                            y: yData[index],
                            PID: point.PID,
                            RecordTime: point.RecordTime,
                            Platform: point.Platform,
                            color: personIDColorMap[point.PID]
                        };
                    })
                }, {
                    visible: "visible",
                    type: "line",
                    name: "Linear regression",
                    r: r,
                    data: line,
                    color: "#ec7c7d"
                }]
            });
        </script>
    </div>';
}

?>

<!DOCTYPE html>
<html lang="zh">
<head>
    <link href="code/css/bootstrap.min.css" rel="stylesheet">

    <link href="code/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <link href="code/css/buttons.dataTables.min.css" rel="stylesheet">
    <link href="code/custom.css" rel="stylesheet" type="text/css">

    <script src="code/js/jquery-3.7.0.js"></script>
    <script src="code/js/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="code/js/dataTables.bootstrap5.min.js" type="text/javascript"></script>
    <script src="code/js/jszip.min.js" type="text/javascript"></script>
    <script src="code/js/pdfmake.min.js" type="text/javascript"></script>
    <script src="code/js/vfs_fonts.js" type="text/javascript"></script>
    <script src="code/js/buttons.html5.min.js" type="text/javascript"></script>
    <script src="code/js/buttons.print.min.js" type="text/javascript"></script>
    <script src="code/js/bootstrap.bundle.min.js"></script>

    <script src="https://code.highcharts.com/modules/data.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/stock/indicators/trendline.js"></script>
    <script src="https://code.highcharts.com/stock/indicators/indicators.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/jstat@latest/dist/jstat.min.js"></script>
    <script src="code/js/highcharts.js"></script>
    <script src="code/modules/series-label.js"></script>
    <script src="code/modules/exporting.js"></script>
    <script src="code/modules/export-data.js"></script>
    <script src="code/modules/accessibility.js"></script>

    <title>分析结果</title>
</head>
<body>

<?php
$personIDchecklist = [];

if (isset($_POST['personIDchecklist'])) {
    $personIDchecklist = explode(",", $_POST['personIDchecklist']);
}

$chartIndex = 0; // 为每个图表生成唯一的索引
foreach ($selectedOptions as $option1) {
    $Array1 = explode('-', htmlspecialchars($option1));
    $combinedResults = [];
    $unit = "";

    foreach ($personIDchecklist as $option2) {
        $Array2 = explode('-', htmlspecialchars($option2));
        $earliest = getEarliestTimestamp($Array2[0], $Array2[1]);
        $latest = getEarliestTimestamp($Array2[0], intval($Array2[1]) + 1);
        if (!empty($earliest)) {
            global $conn;
            if (!empty($latest)) {
                $sql = "SELECT CONCAT(PersonID, '-', ?) AS PID, RecordTime, Result, Unit, RefRange, TIMESTAMPDIFF(DAY , ?, RecordTime) + 1 AS DateDiffDays FROM clinical_exam WHERE ( PersonID = ? AND RecordTime >= ? AND RecordTime < ? ) AND BigItem = ? AND Item = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("sssssss", $Array2[1], $earliest, $Array2[0], $earliest, $latest, $Array1[0], $Array1[1]);
            } else {
                $sql = "SELECT CONCAT(PersonID, '-', ?) AS PID, RecordTime, Result, Unit, RefRange, TIMESTAMPDIFF(DAY , ?, RecordTime) + 1 AS DateDiffDays FROM clinical_exam WHERE ( PersonID = ? AND RecordTime >= ? ) AND BigItem = ? AND Item = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ssssss", $Array2[1], $earliest, $Array2[0], $earliest, $Array1[0], $Array1[1]);
            }
            $stmt->execute();
            $result = $stmt->get_result();
            while ($row = $result->fetch_assoc()) {
                $combinedResults[] = $row;
                $unit = $row['Unit'];
            }
            $stmt->close();
        }
    }
    $chartIndex++;
    generateScatterChart($option1, $combinedResults, $chartIndex, $Array1[0], $Array1[1], $unit);
}
?>

<div class="container d-grid gap-2">
    <a class="btn btn-secondary" href="javascript:history.go(-1)" role="button">返回</a>
</div>
<br>

</body>
</html>