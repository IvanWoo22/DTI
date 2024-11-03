<!DOCTYPE html>
<html lang="zh">
<head>
    <?php
    require_once "dbconn.php";
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    if (!$id) {
        echo "ID not provided.";
        exit;
    }
    $sql = "SELECT * FROM patient_info WHERE PersonID = $id ORDER BY Address DESC LIMIT 1;";
    global $conn;
    $result = $conn->query($sql);
    ?>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="code/css/bootstrap.min.css" rel="stylesheet">
    <script src="code/js/bootstrap.bundle.min.js"></script>
    <script src="code/js/highcharts.js"></script>
    <script src="code/modules/series-label.js"></script>
    <script src="code/modules/exporting.js"></script>
    <script src="code/modules/export-data.js"></script>
    <script src="code/modules/accessibility.js"></script>

    <link href="code/custom.css" rel="stylesheet" type="text/css">

    <title>
        InfoList
    </title>
</head>

<body>
<?php
if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    ?>
    <div class="container px-3 my-3">
        <h3 style="margin:30px">基本信息</h3>
        <div class="container px-3 my-3">
            <table class="table table-hover table-striped w-auto" style="font-size:larger;width:50%">
                <tbody>
                <?php
                $infoFields = [
                    "PersonID" => "住院号",
                    "PersonName" => "姓名",
                    "Sex" => "性别",
                    "Age" => "年龄",
                    "Ethnic" => "民族",
                    "MaritalStatus" => "婚姻",
                    "Birthplace" => "出生地",
                    "Job" => "职业",
                    "Employer" => "工作单位",
                    "Address" => "住址"
                ];

                foreach ($infoFields as $field => $label) {
                    $value = htmlspecialchars($row[$field] ?? '');
                    ?>
                    <tr>
                        <td class="text-end"><?= $label ?></td>
                        <td class="text-center"><strong><?= $value ?></strong></td>
                    </tr>
                <?php } ?>
                </tbody>
            </table>
        </div>
    </div>
<?php } ?>

<div class="container px-3 my-3">
    <h3 style="margin:30px">检测结果</h3>
    <div class="accordion" id="test">

        <?php
        $sqls = "SELECT DISTINCT BigItem FROM clinical_exam WHERE PersonID = $id AND (BigItem LIKE '%血常规%' OR BigItem LIKE '%生化全套%' ) ORDER BY BigItem";
        $results = $conn->query($sqls);

        if ($results && $results->num_rows > 0) {
            while ($rows = $results->fetch_assoc()) {
                $bigItem = htmlspecialchars($rows["BigItem"]);
                echo '<div class="accordion-item">
            <h3 class="accordion-header" id="panelsStayOpen-heading' . $bigItem . '">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapse' . $bigItem . '" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapse' . $bigItem . '">';
                echo $bigItem;
                echo '</button>
            </h3>
            <div id="panelsStayOpen-collapse' . $bigItem . '" class="accordion-collapse collapse"
                 aria-labelledby="panelsStayOpen-heading' . $bigItem . '">
                <div class="accordion-body">';
                $sqlss = "SELECT DISTINCT Item, Unit FROM clinical_exam WHERE PersonID = ? AND BigItem = ? ORDER BY Item";
                $stmt = $conn->prepare($sqlss);
                $stmt->bind_param("ss", $id, $bigItem);
                $stmt->execute();
                $resultss = $stmt->get_result();

                while ($rowss = $resultss->fetch_assoc()) {
                    $item = htmlspecialchars($rowss["Item"]);
                    $sql = "SELECT RecordTime, Result, Item FROM clinical_exam WHERE PersonID = ? AND BigItem = ? AND Item = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("sss", $id, $bigItem, $item);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    if ($result->num_rows > 3) {
                        echo '<div class="container px-3 my-3"><figure class="highcharts-figure">';
                        echo '<div id="fig' . $rowss["Item"] . '"></div>';
                        echo '<p class="fig' . $rowss["Item"] . '"></p></figure>';

                        echo '<script type="text/javascript">
    Highcharts.chart("fig' . $rowss["Item"] . '", {
        credits: {
            enabled: false
        },
        legend: {enabled: false},
        chart: {
            height: 180,
            type: \'spline\'
        },';
                        echo 'title: {text: "' . $rowss["Item"] . '"},';
                        echo 'subtitle: {text: "';

                        $earliestTimestamp = PHP_INT_MAX;
                        $latestTimestamp = 0;
                        while ($row = $result->fetch_assoc()) {
                            $timestamp = strtotime($row["RecordTime"]);
                            if ($timestamp < $earliestTimestamp) {
                                $earliestTimestamp = $timestamp;
                            }
                            if ($timestamp > $latestTimestamp) {
                                $latestTimestamp = $timestamp;
                            }
                        }
                        echo date('Y-m-d', $earliestTimestamp) . ' 至 ' . date('Y-m-d', $latestTimestamp) . '"},';
                        echo 'xAxis: {';
                        echo 'type: "datetime",';
                        echo 'dateTimeLabelFormats: {';
                        echo 'month: "%b %Y",';
                        echo 'year: "%b %Y"},';
                        echo 'title: { text: "Date"}},';
                        echo 'yAxis: { title: { text: "' . $rowss["Item"] . '(' . $rowss["Unit"] . ')"}, min: 0 },';
                        echo 'tooltip: { headerFormat: "<b>{series.name}</b><br>", pointFormat: "{point.x:%e %b %Y}: {point.y:.2f} ' . $rowss["Unit"] . '"},';
                        echo 'plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    radius: 3
                },
                dataLabels: {
                    enabled: true
                }
            }
        },';
                        echo 'colors: ["#06C", "#036", "#000"],
        series: [ { name: "",';
                        $dataArray = array();
                        $nameArray = array();
                        while ($rowsss = $result->fetch_assoc()) {
                            $timestamp = strtotime($rowsss["RecordTime"]);
                            $dateUTC = new DateTime("@$timestamp");
                            $dateUTC->setTimeZone(new DateTimeZone("UTC"));
                            $dataArray[] = "[Date.UTC(" . $dateUTC->format("Y, n, j, G, i, s") . "), " . $rowsss["Result"] . "]";
                            $nameArray[] = $rowsss["Item"];
                        }
                        echo 'data: [';
                        echo implode(",", $dataArray);
                        echo ']}]})</script></div>';
                    }
                }
                echo '</div></div></div>';

            }
        }
        ?>
    </div>
</div>

<?php
$sqls = "SELECT DISTINCT NumberHos FROM meta_info WHERE PersonID = $id ORDER BY NumberHos";
$results = $conn->query($sqls);

if ($results && $results->num_rows > 0) {
    while ($rows = $results->fetch_assoc()) {
        echo "<div class=\"container px-3 my-3\">
        <h3 style=\"margin:30px\">第" . $rows["NumberHos"] . "次住院记录</h3>";
        $sql = "SELECT item_id, NumberHos, RecordTime,TextKind, TextInfo FROM meta_info WHERE PersonID = $id AND NumberHos = " . $rows["NumberHos"] . " ORDER BY RecordTime;";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            echo "<div class=\"accordion\" id=\"time" . $rows["NumberHos"] . "\">";
            while ($row = $result->fetch_assoc()) {
                echo "        <div class=\"accordion-item\">
            <h3 class=\"accordion-header\" id=\"panelsStayOpen-heading" . $row["item_id"] . "\">
                <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\"
                        data-bs-target=\"#panelsStayOpen-collapse" . $row["item_id"] . "\" aria-expanded=\"false\"
                        aria-controls=\"panelsStayOpen-collapse" . $row["item_id"] . "\">
                    " . $row["TextKind"] . "\t" . $row["RecordTime"] . "
                                    </button>
            </h3>
                        <div id=\"panelsStayOpen-collapse" . $row["item_id"] . "\" class=\"accordion-collapse collapse\"
                 aria-labelledby=\"panelsStayOpen-heading" . $row["item_id"] . "\">
                <div class=\"accordion-body\">";
                $data = $row["TextInfo"];
                preg_match('/<DetailInfo>(.*?)<\/DetailInfo>/s', $data, $matches);
                $detailInfo = $matches[1];
                preg_match_all('/<([^>]+)>(.*?)<\/\\1>/', $detailInfo, $detailMatches);
                $info = array_combine($detailMatches[1], $detailMatches[2]);
                echo '<table class="table table-hover"><tbody>';
                foreach ($info as $key => $value) {
                    echo '<tr><td><strong>' . htmlspecialchars($key) . '</strong></td><td>' . htmlspecialchars($value) . '</td></tr>';
                }
                echo "</tbody></table>
            </div>
            </div>
            </div>
            ";
            }
            echo "
                </div>
            </div>";
        }
    }
}
?>

<div class="container px-3 my-3">
    <h3 style="margin:30px">营养记录</h3>
    <div class="accordion" id="test">
        <?php
        $sqls = "SELECT DISTINCT PersonID, inICUTime, outICUTime FROM energy_record WHERE PersonID = $id ORDER BY inICUTime";
        $results = $conn->query($sqls);

        if ($results && $results->num_rows > 0) {
            while ($rows = $results->fetch_assoc()) {
                echo '<div class="accordion-item">
            <h3 class="accordion-header" id="panelsStayOpen-heading' . $rows["inICUTime"] . '">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapse' . $rows["inICUTime"] . '" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapse' . $rows["inICUTime"] . '">';
                echo "ICU时间：" . $rows["inICUTime"] . " 至 " . $rows["outICUTime"];
                echo '</button>
            </h3>
            <div id="panelsStayOpen-collapse' . $rows["inICUTime"] . '" class="accordion-collapse collapse"
                 aria-labelledby="panelsStayOpen-heading' . $rows["inICUTime"] . '">
                <div class="accordion-body">';

                $sql = "SELECT DayNo, Energy FROM energy_record WHERE PersonID = $id AND inICUTime = '" . $rows["inICUTime"] . "' AND outICUTime = '" . $rows["outICUTime"] . "' ORDER BY DayNo";
                $result = $conn->query($sql);
                $resultsss = $conn->query($sql);
                if ($result->num_rows > 3) {
                    echo '<div class="container px-3 my-3"><figure class="highcharts-figure">';
                    echo '<div id="fig' . $rows["inICUTime"] . '"></div>';
                    echo '<p class="fig' . $rows["inICUTime"] . '"></p></figure>';

                    echo '<script type="text/javascript">
    Highcharts.chart("fig' . $rows["inICUTime"] . '", {
        credits: {
            enabled: false
        },
        legend: {enabled: false},
        chart: {
            height: 180,
            type: \'spline\'
        },';
                    echo 'title: {text: ""},';
                    echo 'subtitle: {text: ""},';
                    echo 'xAxis: {';
                    echo 'type: "linear",';
                    echo 'title: { text: "Number of days in ICU"}},';
                    echo 'yAxis: { title: { text: "肠内营养剂量"}, min: 0 },';
                    echo 'plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    radius: 3
                },
                dataLabels: {
                    enabled: true
                }
            }
        },';
                    echo 'colors: ["#06C", "#036", "#000"],
        series: [ { name: "",';
                    $dataArray = array();
                    $nameArray = array();
                    while ($rowsss = $resultsss->fetch_assoc()) {
                        $dataArray[] = "[" . $rowsss["DayNo"] . ", " . $rowsss["Energy"] . "]";
                        $nameArray[] = $rowsss["Energy"];
                    }
                    echo 'data: [';
                    echo implode(",", $dataArray);
                    echo ']}]})</script></div>';
                }
            }
            echo '</div></div></div>';
        }
        ?>
    </div>
</div>

</body>
</html>