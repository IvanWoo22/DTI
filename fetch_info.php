<?php
require_once "dbconn.php";
global $conn;
$id = isset($_POST['id']) ? intval($_POST['id']) : null;
$type = $_POST['type'] ?? null;
if (!$id) {
    echo "<p>ID isn't provided.</p>";
    exit;
}

if (!in_array($type, ['TestResults', 'HospitalRecords', 'DoctorOrders', 'NutritionalRecords', 'BasicRecords', 'ChecksRecords', 'NursingSigns'], true)) {
    echo "无效的请求类型。";
    exit;
}

echo match ($type) {
    'TestResults' => getTestResults($id, $conn),
    'HospitalRecords' => getHospitalRecords($id, $conn),
    'DoctorOrders' => getDoctorOrders($id, $conn),
    'NutritionalRecords' => getNutritionalRecords($id, $conn),
    'BasicRecords' => getBasicRecords($id, $conn),
    'ChecksRecords' => getChecksRecords($id, $conn),
    'NursingSigns' => getNursingSigns($id, $conn),
    default => "无效的请求类型。",
};

function getTestResults($id, $conn): false|string
{
    ob_start();
    ?>
    <div class="container px-3 my-3">
        <?php
        $sql = "SELECT * FROM clinical_exam WHERE PersonID = ? ORDER BY RecordTime";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result && $result->num_rows > 0) {
            $resultsData = [];
            while ($row = $result->fetch_assoc()) {
                $resultsData[] = $row;
            }

            $groupedData = [];
            foreach ($resultsData as $row) {
                $bigItem = htmlspecialchars($row['BigItem'] ?? '', ENT_QUOTES);
                $item = htmlspecialchars($row['Item'] ?? '', ENT_QUOTES);
                $groupedData[$bigItem][$item][] = $row;
            }


            foreach ($groupedData as $bigItem => $items) {
                if (empty($bigItem)) {
                    continue;
                }
                ?>
                <h3 style="margin:30px"><?= $bigItem ?></h3>
                <div class="accordion" id="<?= $bigItem ?>">
                    <?php
                    foreach ($items as $item => $rows) {
                        if (empty($item)) {
                            continue;
                        }
                        ?>
                        <div class="accordion-item">
                            <h3 class="accordion-header" id="heading<?= $bigItem . "-" . $item ?>">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapse<?= $bigItem . "-" . $item ?>"
                                        aria-expanded="false"
                                        aria-controls="collapse<?= $bigItem . "-" . $item ?>">
                                    <?= $item ?>
                                </button>
                            </h3>
                            <div id="collapse<?= $bigItem . "-" . $item ?>"
                                 class="accordion-collapse collapse"
                                 aria-labelledby="heading<?= $bigItem . "-" . $item ?>">
                                <div class="accordion-body">
                                    <table class="table table-hover">
                                        <thead>
                                        <tr>
                                            <th scope="col">HospitalHistory</th>
                                            <th scope="col">RecordTime</th>
                                            <th scope="col">Result</th>
                                            <th scope="col">Unit</th>
                                            <th scope="col">RefRange</th>
                                            <th scope="col">Remark</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <?php
                                        foreach ($rows as $row) {
                                            $numberHos = htmlspecialchars($row['NumberHos'] ?? '', ENT_QUOTES);
                                            $recordTime = htmlspecialchars($row['RecordTime'] ?? '', ENT_QUOTES);
                                            $result = htmlspecialchars($row['Result'] ?? '', ENT_QUOTES);
                                            $unit = htmlspecialchars($row['Unit'] ?? '', ENT_QUOTES);
                                            $refRange = htmlspecialchars($row['RefRange'] ?? '', ENT_QUOTES);
                                            $remark = htmlspecialchars($row['Remark'] ?? '', ENT_QUOTES);
                                            $remarkStyle = '';
                                            if ($remark === '偏高') {
                                                $remarkStyle = 'style="color: #b02419;"';
                                            } elseif ($remark === '偏低') {
                                                $remarkStyle = 'style="color: #78f4ed;"';
                                            }
                                            ?>
                                            <tr>
                                                <td><?= $numberHos ?></td>
                                                <td><?= $recordTime ?></td>
                                                <td><?= $result ?></td>
                                                <td><?= $unit ?></td>
                                                <td><?= $refRange ?></td>
                                                <td <?= $remarkStyle ?>><?= $remark ?></td>
                                            </tr>
                                        <?php } ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    <?php } ?>
                </div>
                <?php
            }
        } else {
            echo "<p>未找到相关的化验记录。</p>";
        } ?>
    </div>
    <?php
    return ob_get_clean();
}


function getHospitalRecords($id, $conn): false|string
{
    ob_start();
    $sqls = "SELECT DISTINCT NumberHos FROM document WHERE PersonID = ? ORDER BY NumberHos";
    $stmt = $conn->prepare($sqls);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $results = $stmt->get_result();

    if ($results && $results->num_rows > 0) {
        while ($rows = $results->fetch_assoc()) {
            $numberHos = htmlspecialchars($rows["NumberHos"], ENT_QUOTES);
            ?>
            <div class="container px-3 my-3">
            <h3 style="margin:30px">第<?= $numberHos ?>次住院</h3>
            <?php
            $sql = "SELECT item_id, NumberHos, RecordTime, TextKind, TextInfo FROM document WHERE PersonID = ? AND NumberHos = ? ORDER BY RecordTime";
            $stmtDetail = $conn->prepare($sql);
            $stmtDetail->bind_param('ii', $id, $rows["NumberHos"]);
            $stmtDetail->execute();
            $result = $stmtDetail->get_result();
            if ($result->num_rows > 0) {
                ?>
                <div class="accordion" id="time<?= $numberHos ?>">
                    <?php
                    while ($row = $result->fetch_assoc()) {
                        $itemId = htmlspecialchars($row["item_id"] ?? '', ENT_QUOTES);
                        $textKind = htmlspecialchars($row["TextKind"] ?? '', ENT_QUOTES);
                        $recordTime = htmlspecialchars($row["RecordTime"] ?? '', ENT_QUOTES);
                        ?>
                        <div class="accordion-item">
                            <h3 class="accordion-header" id="heading<?= $itemId ?>">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapse<?= $itemId ?>"
                                        aria-expanded="false"
                                        aria-controls="collapse<?= $itemId ?>">
                                    <strong><?= $textKind ?> <?= $recordTime ?></strong>
                                </button>
                            </h3>
                            <div id="collapse<?= $itemId ?>"
                                 class="accordion-collapse collapse"
                                 aria-labelledby="heading<?= $itemId ?>">
                                <div class="accordion-body">
                                    <?php
                                    $data = $row["TextInfo"];
                                    if (preg_match('/<DetailInfo>(.*?)<\/DetailInfo>/s', $data, $matches)) {
                                        $detailInfo = $matches[1];
                                        if (preg_match_all('/<([^>]+)>(.*?)<\/\\1>/', $detailInfo, $detailMatches)) {
                                            $info = array_combine($detailMatches[1], $detailMatches[2]);

                                            // 渲染表格
                                            ?>
                                            <table class="table table-hover">
                                                <tbody>
                                                <?php
                                                foreach ($info as $key => $value) {
                                                    ?>
                                                    <tr>
                                                        <td style="width: 80px;">
                                                            <strong><?= htmlspecialchars($key, ENT_QUOTES) ?></strong>
                                                        </td>
                                                        <td><?= htmlspecialchars($value, ENT_QUOTES) ?></td>
                                                    </tr>
                                                <?php } ?>
                                                </tbody>
                                            </table>
                                            <?php
                                        }
                                    } else {
                                        // 未找到DetailInfo的情况下处理
                                        echo "No detail information found.";
                                    }
                                    ?>
                                </div>
                            </div>
                        </div>
                    <?php } ?>
                </div>
                </div>
                <?php
            }
        }
    } else {
        echo "<p>未找到相关的记录。</p>";
    }
    return ob_get_clean();
}

function getNutritionalRecords($id, $conn): false|string
{
    ob_start();
    ?>
    <div class="container px-3 my-3">
        <div class="accordion" id="test">
            <?php
            $sqls = "SELECT DISTINCT PersonID, inICUTime, outICUTime FROM energy_record WHERE PersonID = ? ORDER BY inICUTime";
            $stmt = $conn->prepare($sqls);
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $results = $stmt->get_result();

            if ($results && $results->num_rows > 0) {
                $count = 0;
                while ($rows = $results->fetch_assoc()) {
                    $count++;
                    $inICUTime = htmlspecialchars($rows["inICUTime"], ENT_QUOTES);
                    $outICUTime = htmlspecialchars($rows["outICUTime"], ENT_QUOTES);
                    ?>
                    <div class="accordion-item">
                        <h3 class="accordion-header" id="heading<?= $count ?>">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapse<?= $count ?>"
                                    aria-expanded="false"
                                    aria-controls="collapse<?= $count ?>">
                                ICU时间：<?= $inICUTime ?> 至 <?= $outICUTime ?>
                            </button>
                        </h3>
                        <div id="collapse<?= $count ?>" class="accordion-collapse collapse"
                             aria-labelledby="heading<?= $count ?>">
                            <div class="accordion-body">
                                <?php
                                $sql = "SELECT DayNo, Energy FROM energy_record WHERE PersonID = ? AND inICUTime = ? AND outICUTime = ? ORDER BY DayNo";
                                $stmtDetail = $conn->prepare($sql);
                                $stmtDetail->bind_param('iss', $id, $rows["inICUTime"], $rows["outICUTime"]);
                                $stmtDetail->execute();
                                $result = $stmtDetail->get_result();

                                if ($result->num_rows > 3) {
                                    $dataArray = [];
                                    while ($row = $result->fetch_assoc()) {
                                        $dayNo = (int)$row['DayNo'];
                                        $energy = (float)$row['Energy'];
                                        $dataArray[] = "[$dayNo, $energy]";
                                    }
                                    ?>
                                    <div class="container px-3 my-3">
                                        <figure class="highcharts-figure">
                                            <div id="fig<?= $count ?>"></div>
                                        </figure>
                                        <script type="text/javascript">
                                            Highcharts.chart("fig<?= $count ?>", {
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
                                                    data: [<?= implode(",", $dataArray) ?>]
                                                }]
                                            });
                                        </script>
                                    </div>
                                <?php } else { ?>
                                    <p>数据不足以生成图表。</p>
                                <?php } ?>
                            </div>
                        </div>
                    </div>
                <?php }
            } else {
                echo "<p>未找到相关的营养记录。</p>";
            }
            ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

function getBasicRecords($id, $conn): false|string
{
    ob_start();
    $sqls = "SELECT DISTINCT NumberHos FROM basics_record WHERE PersonID = ? ORDER BY NumberHos";
    $stmt = $conn->prepare($sqls);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $results = $stmt->get_result();

    if ($results && $results->num_rows > 0) {
        while ($rows = $results->fetch_assoc()) {
            $numberHos = htmlspecialchars($rows['NumberHos'], ENT_QUOTES);
            ?>
            <div class="container px-3 my-3">
                <?php
                $sql = "SELECT * FROM basics_record WHERE PersonID = ? AND NumberHos = ? ORDER BY NumberHos";
                $stmtDetail = $conn->prepare($sql);
                $stmtDetail->bind_param('ii', $id, $rows['NumberHos']);
                $stmtDetail->execute();
                $result = $stmtDetail->get_result();

                if ($result->num_rows > 0) {
                    ?>
                    <div class="accordion" id="time<?= $numberHos ?>">
                        <?php
                        while ($row = $result->fetch_assoc()) {
                            $item_id = htmlspecialchars($row['item_id'], ENT_QUOTES);
                            ?>
                            <div class="accordion-item">
                                <h3 class="accordion-header"
                                    id="heading<?= $numberHos ?>_<?= $item_id ?>">
                                    <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapse<?= $numberHos ?>_<?= $item_id ?>"
                                            aria-expanded="false"
                                            aria-controls="collapse<?= $numberHos ?>_<?= $item_id ?>">
                                        <strong>第<?= $numberHos ?>
                                            次住院&nbsp;&nbsp;&nbsp;&nbsp;转归：<?= htmlspecialchars($row["PrognosisStatus"] ?? '') ?>
                                            &nbsp;&nbsp;&nbsp;&nbsp;入ICU时间：<?= htmlspecialchars($row["inICUTime"] ?? '') ?></strong>
                                    </button>
                                </h3>
                                <div id="collapse<?= $numberHos ?>_<?= $item_id ?>"
                                     class="accordion-collapse collapse"
                                     aria-labelledby="heading<?= $numberHos ?>_<?= $item_id ?>">
                                    <div class="accordion-body">
                                        <table class="table">
                                            <tr>
                                                <td style="text-align: right; width: 120px" nowrap>入ICU时间</td>
                                                <td><?= htmlspecialchars($row["inICUTime"] ?? '') ?></td>
                                                <td style="text-align: right; width: 120px" nowrap>出ICU时间</td>
                                                <td><?= htmlspecialchars($row["outICUTime"] ?? '') ?></td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: right; width: 120px" nowrap>ICU时长</td>
                                                <td><?= htmlspecialchars(isset($row["inICUTime"], $row["outICUTime"]) ? intval(abs(strtotime($row["outICUTime"]) - strtotime($row["inICUTime"])) / 3600) : '') ?>
                                                    小时
                                                </td>
                                                <td style="text-align: right; width: 120px" nowrap>转归状态</td>
                                                <td><?= htmlspecialchars($row["PrognosisStatus"] ?? '') ?></td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: right; width: 120px" nowrap>入院日期</td>
                                                <td><?= htmlspecialchars($row["InDate"] ?? '') ?></td>
                                                <td style="text-align: right; width: 120px" nowrap>出院日期</td>
                                                <td><?= htmlspecialchars($row["OutDate"] ?? '') ?></td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: right; width: 120px" nowrap>入院科室</td>
                                                <td><?= htmlspecialchars($row["InClass"] ?? '') ?></td>
                                                <td style="text-align: right; width: 120px" nowrap>出院科室</td>
                                                <td><?= htmlspecialchars($row["OutClass"] ?? '') ?></td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: right; width: 120px" nowrap>住院天数</td>
                                                <td><?= htmlspecialchars($row["DuringTime"] ?? '') ?> 天</td>
                                                <td style="text-align: right; width: 120px" nowrap>住院总金额</td>
                                                <td><?= htmlspecialchars($row["TotalMoney"] ?? '') ?> 元</td>
                                            </tr>
                                        </table>
                                        <table class="table">
                                            <tr>
                                                <td style="text-align: right; width: 120px" nowrap>手术名称</td>
                                                <td><?= htmlspecialchars($row["Surgery"] ?? '') ?></td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: right; width: 120px" nowrap>入院诊断</td>
                                                <td><?= htmlspecialchars($row["AdmissionDiagnosis"] ?? '') ?></td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: right; width: 120px" nowrap>出院诊断</td>
                                                <td><?= htmlspecialchars($row["DischargeDiagnosis"] ?? '') ?></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        <?php } ?>
                    </div>
                <?php } ?>
            </div>
            <?php
        }
    }
    return ob_get_clean();
}

function getChecksRecords($id, $conn): false|string
{
    ob_start();

    $sqls = "SELECT DISTINCT NumberHos FROM checks_info WHERE PersonID = ? ORDER BY NumberHos";
    $stmt = $conn->prepare($sqls);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $results = $stmt->get_result();

    if ($results && $results->num_rows > 0) {
        while ($rows = $results->fetch_assoc()) {
            $numberHos = htmlspecialchars($rows["NumberHos"] ?? '', ENT_QUOTES, 'UTF-8');
            ?>
            <div class="container px-3 my-3">
                <h3 style="margin:30px">第<?= $numberHos !== '' ? $numberHos : '未知' ?>次住院</h3>
                <?php
                $sql = "SELECT * FROM checks_info WHERE PersonID = ? AND (NumberHos = ? OR (NumberHos IS NULL AND ? IS NULL)) ORDER BY ReportTime";
                $stmtDetail = $conn->prepare($sql);
                $numberHosValue = $rows['NumberHos'];

                $stmtDetail->bind_param('iii', $id, $numberHosValue, $numberHosValue);
                $stmtDetail->execute();
                $result = $stmtDetail->get_result();

                if ($result->num_rows > 0) {
                    ?>
                    <div class="accordion" id="accordion-<?= $numberHos ?>">
                        <?php
                        while ($row = $result->fetch_assoc()) {
                            $checkType = htmlspecialchars($row["CheckType"] ?? '', ENT_QUOTES);
                            $reportTime = htmlspecialchars($row["ReportTime"] ?? '', ENT_QUOTES);
                            $safeCheckType = preg_replace('/[^A-Za-z0-9\-_]/', '_', $checkType);
                            $safeReportTime = preg_replace('/[^A-Za-z0-9\-_]/', '_', $reportTime);
                            $collapseId = $numberHos . "-" . $safeCheckType . "-" . $safeReportTime;
                            ?>
                            <div class="accordion-item">
                                <h3 class="accordion-header" id="heading-<?= $collapseId ?>">
                                    <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapse-<?= $collapseId ?>"
                                            aria-expanded="false"
                                            aria-controls="collapse-<?= $collapseId ?>">
                                        <strong><?= $checkType ?>&nbsp;&nbsp;&nbsp;&nbsp;<?= $reportTime ?></strong>
                                    </button>
                                </h3>
                                <div id="collapse-<?= $collapseId ?>" class="accordion-collapse collapse"
                                     aria-labelledby="heading-<?= $collapseId ?>">
                                    <div class="accordion-body">
                                        <table class="table">
                                            <tr>
                                                <td style="text-align: right; width: 120px" nowrap>检查日期</td>
                                                <td><?= htmlspecialchars($row["CheckTime"] ?? '') ?></td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: right; width: 120px" nowrap>检查描述</td>
                                                <td><?= htmlspecialchars($row["Description"] ?? '') ?></td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: right; width: 120px" nowrap>检查结论</td>
                                                <td><?= htmlspecialchars($row["Conclusion"] ?? '') ?></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        <?php } ?>
                    </div>
                <?php } ?>
            </div>
            <?php
        }
    } else {
        echo "<p>未找到相关检查记录。</p>";
    }
    return ob_get_clean();
}

function getDoctorOrders($id, $conn): false|string
{
    ob_start();

    $sqls = "SELECT DISTINCT NumberHos FROM doctor_orders WHERE PersonID = ? ORDER BY NumberHos";
    $stmt = $conn->prepare($sqls);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $results = $stmt->get_result();

    if ($results && $results->num_rows > 0) {
        while ($rows = $results->fetch_assoc()) {
            $numberHos = htmlspecialchars($rows['NumberHos'], ENT_QUOTES);
            ?>
            <style>
                #result_table td:nth-child(1),
                #result_table td:nth-child(11),
                #result_table td:nth-child(12),
                #result_table td:nth-child(13),
                #result_table td:nth-child(14) {
                    font-size: 10px;
                }

                #result_table th:nth-child(4),
                #result_table td:nth-child(4) {
                    width: 50px;
                }
            </style>
            <div class="container px-3 my-3">
                <div class="accordion" id="time<?= $numberHos ?>">
                    <div class="accordion-item">
                        <h3 class="accordion-header"
                            id="heading<?= $numberHos ?>">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapse<?= $numberHos ?>"
                                    aria-expanded="false"
                                    aria-controls="collapse<?= $numberHos ?>">
                                <strong>第<?= $numberHos ?>次住院</strong>
                            </button>
                        </h3>
                        <div id="collapse<?= $numberHos ?>"
                             class="accordion-collapse collapse"
                             aria-labelledby="heading<?= $numberHos ?>">
                            <div class="accordion-body">
                                <table id="result_table" class="table table-striped table-bordered"
                                       style="width:100%">
                                    <thead>
                                    <tr>
                                        <th scope="col">开立时间</th>
                                        <th scope="col">名称</th>
                                        <th scope="col">类型</th>
                                        <th scope="col">时效</th>
                                        <th scope="col">剂量</th>
                                        <th scope="col">单位</th>
                                        <th scope="col">数量</th>
                                        <th scope="col">规格</th>
                                        <th scope="col">频次</th>
                                        <th scope="col">给药</th>
                                        <th scope="col">开始</th>
                                        <th scope="col">停止</th>
                                        <th scope="col">执行</th>
                                        <th scope="col">结束</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php
                                    $sql = "SELECT OrderTime,OrderName,OrderType,LongOrShort,Dosage,Unit,Quantity,Specification,Frequency,AdministrationMethod,StartTime,StopTime,ExecutionTime,EndTime FROM doctor_orders WHERE PersonID = ? AND NumberHos = ? ORDER BY OrderTime";
                                    $stmt = $conn->prepare($sql);
                                    $stmt->bind_param('ii', $id, $numberHos);
                                    $stmt->execute();
                                    $result = $stmt->get_result();
                                    while ($row = $result->fetch_assoc()) {
                                        ?>
                                        <tr>
                                            <td><?= htmlspecialchars($row["OrderTime"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["OrderName"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["OrderType"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["LongOrShort"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["Dosage"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["Unit"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["Quantity"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["Specification"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["Frequency"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["AdministrationMethod"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["StartTime"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["StopTime"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["ExecutionTime"] ?? '') ?></td>
                                            <td><?= htmlspecialchars($row["EndTime"] ?? '') ?></td>
                                        </tr>
                                    <?php } ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php
        }
    }
    return ob_get_clean();
}


function getNursingSigns(int $id, mysqli $conn): false|string
{
    ob_start();

    $sqls = "SELECT DISTINCT NumberHos FROM nursing_signs WHERE PersonID = ? ORDER BY NumberHos";
    $stmt = $conn->prepare($sqls);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $results = $stmt->get_result();

    if ($results && $results->num_rows > 0) {
        while ($rows = $results->fetch_assoc()) {
            $numberHos = htmlspecialchars($rows["NumberHos"] ?? '', ENT_QUOTES, 'UTF-8');
            ?>
            <div class="container px-3 my-3">
                <h3 style="margin:30px">第<?= $numberHos !== '' ? $numberHos : '未知' ?>次住院</h3>
                <?php
                $sql = "SELECT DISTINCT NursingType FROM nursing_signs WHERE PersonID = ? AND (NumberHos = ? OR (NumberHos IS NULL AND ? IS NULL)) ORDER BY NursingType";
                $stmtDetail = $conn->prepare($sql);
                $numberHosValue = $rows['NumberHos'];

                $stmtDetail->bind_param('iii', $id, $numberHosValue, $numberHosValue);
                $stmtDetail->execute();
                $result = $stmtDetail->get_result();

                if ($result->num_rows > 0) {
                    ?>
                    <div class="accordion" id="accordion-<?= $numberHos ?>">
                        <?php
                        while ($row = $result->fetch_assoc()) {
                            $nursingType = htmlspecialchars($row["NursingType"] ?? '', ENT_QUOTES);
                            $collapseId = $numberHos . "-" . $nursingType;
                            ?>
                            <div class="accordion-item">
                                <h3 class="accordion-header" id="heading<?= $collapseId ?>">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapse<?= $collapseId ?>"
                                            aria-expanded="false"
                                            aria-controls="collapse<?= $collapseId ?>">
                                        <?= $nursingType ?>
                                    </button>
                                </h3>
                                <div id="collapse<?= $collapseId ?>"
                                     class="accordion-collapse collapse"
                                     aria-labelledby="heading<?= $collapseId ?>">
                                    <div class="accordion-body">
                                        <table class="table table-hover">
                                            <thead>
                                            <tr>
                                                <th scope="col">测量时间</th>
                                                <th scope="col">测量结果</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <?php
                                            $sql = "SELECT NursingTime, NursingResult FROM nursing_signs WHERE PersonID = ? AND (NumberHos = ? OR (NumberHos IS NULL AND ? IS NULL)) AND NursingType = ? ORDER BY NursingTime";
                                            $stmtDetail = $conn->prepare($sql);
                                            $stmtDetail->bind_param('iiis', $id, $numberHosValue, $numberHosValue, $nursingType);
                                            $stmtDetail->execute();
                                            $resultss = $stmtDetail->get_result();
                                            while ($rowss = $resultss->fetch_assoc()) {
                                                $nursingTime = htmlspecialchars($rowss['NursingTime'] ?? '', ENT_QUOTES);
                                                $nursingResult = htmlspecialchars($rowss['NursingResult'] ?? '', ENT_QUOTES);
                                                ?>
                                                <tr>
                                                    <td><?= $nursingTime ?></td>
                                                    <td><?= $nursingResult ?></td>
                                                </tr>
                                            <?php } ?>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        <?php } ?>
                    </div>
                <?php } ?>
            </div>
            <?php
        }
    } else {
        echo "<p>未找到相关检查记录。</p>";
    }
    return ob_get_clean();
}

?>

