<?php
session_start();
if (!isset($_SESSION['logged'])) {
    header('Location: index.php');
    exit;
}
$selectedOptions = "";
$numberOfElements = "";
if (isset($_POST['PersonIDchecklist'])) {
    $selectedOptions = $_POST['PersonIDchecklist'];
    $numberOfElements = count($selectedOptions);
} else {
    echo "没有选择任何一位病人记录,请返回查验。<br>";
    echo '<a class="btn btn-primary" href="javascript:history.go(-1)" role="button">返回选择</a>';
}

require_once "dbconn.php";
require_once "getEarliestTimestamp.php";

?>

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
    <title>筛选内容</title>

</head>
<body>
<div class="container px-3 my-3"><br>
    <h3>
        已选择<?php echo $numberOfElements ?>条记录用于后续分析，请选择分析内容：
    </h3>

    <?php
    $summary = array();
    foreach ($selectedOptions as $option) {
        global $conn;
        $Array = explode('-', htmlspecialchars($option));
        $earliest = getEarliestTimestamp($Array[0], $Array[1]);
        if (!empty($earliest)) {
            $sqls = "";
            $latest = getEarliestTimestamp($Array[0], intval($Array[1]) + 1);
            $stmt = "";
            if (!empty($latest)) {
                $sqls = "SELECT * FROM clinical_exam
            WHERE PersonID = ? 
            AND RecordTime >= ? 
            AND RecordTime < ?";
                $stmt = $conn->prepare($sqls);
                $stmt->bind_param("sss", $Array[0], $earliest, $latest);
            } else {
                $sqls = "SELECT * FROM clinical_exam
            WHERE PersonID = ? 
            AND RecordTime >= ?";
                $stmt = $conn->prepare($sqls);
                $stmt->bind_param("ss", $Array[0], $earliest);
            }
            $stmt->execute();
            $result = $stmt->get_result();
            while ($row = $result->fetch_assoc()) {
                $BigItem = $row["BigItem"];
                $Item = $row["Item"];

                // Add the data to the summary array
                if (!isset($summary[$BigItem])) {
                    $summary[$BigItem] = array();
                }
                if (!isset($summary[$BigItem][$Item])) {
                    $summary[$BigItem][$Item] = 0;
                }
                $summary[$BigItem][$Item]++;
            }
            $stmt->close();
        }
    }
    ?>

    <form action="show_batch.php" method="post">
        <table id="result_table" class="table table-striped" style="width:100%">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">检验大项</th>
                <th scope="col">检验小项</th>
                <th scope="col">总数</th>
            </tr>
            </thead>
            <tbody>
            <?php
            if (!empty($summary)) {
                foreach ($summary as $testType => $testNameData) {
                    foreach ($testNameData as $testName => $count) {
                        echo '<tr>';
                        echo '<td><div class="form-check"><input class="form-check-input" type="checkbox" name="selectedTests[]" value="' . $testType . '-' . $testName . '"></div></td>';
                        echo '<td>' . $testType . '</td>';
                        echo '<td>' . $testName . '</td>';
                        echo '<td>' . $count . '</td>';
                        echo '</tr>';
                    }
                }
            }
            ?>
            </tbody>
        </table>

        <button type="button" onclick="<?php echo "opcheckboxed('selectedTests[]', 'checkall')"; ?>">全选</button>
        <button type="button" onclick="<?php echo "opcheckboxed('selectedTests[]', 'uncheckall')"; ?>">取消全选</button>
        <button type="button" onclick="<?php echo "opcheckboxed('selectedTests[]', 'reversecheck')"; ?>">反选</button>
        <br>
        <br>
        <?php
        if (isset($_POST['PersonIDchecklist'])) {
            $personIDchecklist = implode(",", $_POST['PersonIDchecklist']);
            echo '<input type="hidden" name="personIDchecklist" value="' . $personIDchecklist . '">';
        }
        ?>
        <div class="container d-grid gap-2">
            <button class="btn btn-primary" type="submit">
                提交分析
            </button>
        </div>
    </form>

</div>

<script type="text/javascript">

    function opcheckboxed(objName, type) {
        const objNameList = document.getElementsByName(objName);
        if (null != objNameList) {
            for (let i = 0; i < objNameList.length; i++) {
                if (objNameList[i].checked === true) {
                    if (type !== 'checkall') {
                        objNameList[i].checked = false;
                    }
                } else {
                    if (type !== 'uncheckall') {
                        objNameList[i].checked = true;
                    }
                }
            }
        }
    }

    $('#result_table').DataTable({
        lengthMenu: [[25, 100, -1], [25, 100, "All"]],
        language: {
            search: "查找:",
            lengthMenu: "_MENU_ 条/页",
            zeroRecords: "未找到记录",
            paginate: {
                first: "第一页",
                last: "最末页",
                next: "下一页",
                previous: "上一页"
            },
            info: "展示第_START_至_END_条 (共 _TOTAL_ 条)",
            loadingRecords: "加载中...",
            infoFiltered: "(从_MAX_条中筛选到)",
            infoEmpty: "无记录",
        },
        scrollX: true,
        scrollCollapse: true,
        autoWidth: true,
        paging: true,
        columnDefs: [
            {"width": "20px", "targets": [0]},
            {"width": "50px", "targets": [1, 2]},
            {"width": "40px", "targets": [3]}
        ],
        order: [[3, "desc"], [1, "desc"]]
    });
</script>
</body>
</html>