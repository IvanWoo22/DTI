<?php
session_start();
if (!isset($_SESSION['logged'])) {
    header('Location: index.php');
    exit;
}
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
    <style>
        .accordion {
            --bs-accordion-btn-padding-y: 0;
            --bs-accordion-btn-focus-border-color: "#777777";
        }
    </style>
    <title>筛选内容</title>

</head>
<body>
<div class="container px-3 my-3"><br>
    <form action="check_batch.php" method="post" name="CheckList" id="CheckList">
        <?php
        include "dbconn.php";
        global $conn;

        function highlight_keywords($text, $keywords): string
        {
            $result = "";
            $positions = [];
            $keywordArray = preg_split('/\s+/', $keywords);
            foreach ($keywordArray as $keyword) {
                $position = mb_stripos($text, $keyword);
                while ($position !== false) {
                    $positions[] = $position;
                    $position = mb_stripos($text, $keyword, $position + 1);
                }
            }
            foreach ($positions as $position) {
                $start = max(0, $position - 28);
                $end = min(mb_strlen($text), $position + 28);
                $excerpt = mb_substr($text, $start, $end - $start);
                $excerpt = mb_ereg_replace($keywords, '<span class="highlighted">' . $keywords . '</span>', $excerpt);
                $result .= '<br>...' . $excerpt . '...</br>';
            }

            return $result;
        }

        $whereClause = "";
        $whereClause1 = "";
        $whereClause2 = "";
        $whereClause3 = "";

        $ikw = "";
        if (isset($_POST['ikw'])) {
            $ikw = addslashes($_POST["ikw"]);
            $condition = addslashes($_POST["condition"]);
            if (!empty($ikw)) {
                $Array = preg_split('/\s+/', $ikw);
                foreach ($Array as $keyword) {
                    if ($condition == "and") {
                        $whereClause1 .= " AND (TextInfo LIKE '%$keyword%')";
                    } elseif ($condition == "or") {
                        $whereClause1 .= " OR (TextInfo LIKE '%$keyword%')";
                    }
                }
                if ($condition == "and") {
                    $whereClause1 = ltrim($whereClause1, " AND");
                } elseif ($condition == "or") {
                    $whereClause1 = ltrim($whereClause1, " OR");
                }
            }
        }
        if (isset($_POST['ekw'])) {
            $ekw = addslashes($_POST["ekw"]);
            if (!empty($ekw)) {
                $Array = preg_split('/\s+/', $ekw);
                foreach ($Array as $keyword) {
                    $whereClause2 .= " AND (TextInfo NOT LIKE '%$keyword%')";
                }
                $whereClause2 = ltrim($whereClause2, " AND");
            }
        }

        if (isset($_POST['min_age'])) {
            $min_age = addslashes($_POST["min_age"]);
            if (!empty($min_age)) {
                if (is_numeric($min_age)) {
                    $whereClause3 .= " AND (Age >= $min_age)";
                } else {
                    echo "年龄是非数字，请检查！";
                    exit;
                }
            }
        }
        if (isset($_POST['max_age'])) {
            $max_age = addslashes($_POST["max_age"]);
            if (!empty($max_age)) {
                if (is_numeric($max_age)) {
                    $whereClause3 .= " AND (Age <= $max_age)";
                } else {
                    echo "年龄是非数字，请检查！";
                    exit;
                }
            }
        }

        $sex = addslashes($_POST["sex"]);
        if ($sex == 1) {
            $whereClause3 .= " AND (Sex = '男')";
        }
        if ($sex == 2) {
            $whereClause3 .= " AND (Sex = '女')";
        }
        if (isset($_POST['ethnic'])) {
            $ethnic = addslashes($_POST["ethnic"]);
            if (!empty($ethic)) {
                $whereClause3 .= " AND (Ethnic LIKE $ethnic)";
            }
        }

        $marriage = addslashes($_POST["marriage"]);
        $marriage = addslashes($_POST["marriage"]);
        if ($marriage == 1) {
            $whereClause3 .= " AND (Sex = '已婚')";
        }
        if ($marriage == 2) {
            $whereClause3 .= " AND (Sex = '未婚')";
        }
        //$first_date = addslashes($_POST["first_date"]);
        //$last_date = addslashes($_POST["last_date"]);
        $whereClause3 = ltrim($whereClause3, " AND");

        if (!empty($whereClause1) and !empty($whereClause2)) {
            $whereClause = "(" . $whereClause1 . ") AND (" . $whereClause2 . ")";
        }
        if (!empty($whereClause1) and empty($whereClause2)) {
            $whereClause = $whereClause1;
        }
        if (empty($whereClause1) and !empty($whereClause2)) {
            $whereClause = $whereClause2;
        }
        $sql = "SELECT DISTINCT PersonID, NumberHos FROM document WHERE $whereClause ORDER BY PersonID";
        if (empty($whereClause1) and empty($whereClause2)) {
            $sql = "SELECT DISTINCT PersonID, NumberHos FROM document ORDER BY PersonID";
        }
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            ?>
            <table id="result_table" class="table table-striped" style="width:100%">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">#</th>
                    <th scope="col">姓名</th>
                    <th scope="col">性别</th>
                    <th scope="col">年龄</th>
                    <th scope="col">记录</th>
                </tr>
                </thead>
                <tbody>
                <?php
                while ($row = $result->fetch_assoc()) {
                    if (!empty($whereClause3)) {
                        $sqls = "SELECT DISTINCT PersonName, Sex, Age FROM patient_info WHERE $whereClause3 AND PersonID = " . $row["PersonID"];
                    } else {
                        $sqls = "SELECT DISTINCT PersonName, Sex, Age FROM patient_info WHERE PersonID = " . $row["PersonID"];
                    }
                    $results = $conn->query($sqls);
                    if ($results->num_rows > 0) {
                        $rows = $results->fetch_assoc();
                        $idNo = $row["PersonID"] . "-" . $row["NumberHos"];
                        ?>
                        <tr>
                            <td>
                                <div class="form-check">
                                    <label>
                                        <input class="form-check-input" type="checkbox" name="PersonIDchecklist[]"
                                               value="<?= htmlspecialchars($idNo) ?>">
                                    </label>
                                </div>
                            </td>
                            <th scope="row"><a href="patient_view.php?id=<?= htmlspecialchars($row["PersonID"]) ?>"
                                               target="_blank"><?= htmlspecialchars($row["PersonID"]) ?></a></th>
                            <td><?= htmlspecialchars($rows["PersonName"]) ?></td>
                            <td><?= htmlspecialchars($rows["Sex"]) ?></td>
                            <td><?= htmlspecialchars($rows["Age"]) ?></td>
                            <td>
                                <div class="accordion accordion-item">
                                    <p class="accordion-header" id="heading<?= htmlspecialchars($idNo) ?>">
                                        <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapse<?= htmlspecialchars($idNo) ?>"
                                                aria-expanded="false"
                                                aria-controls="collapse<?= htmlspecialchars($idNo) ?>">
                                            第<?= htmlspecialchars($row["NumberHos"]) ?>次入院
                                        </button>
                                    </p>
                                    <div id="collapse<?= htmlspecialchars($idNo) ?>" class="accordion-collapse collapse"
                                         aria-labelledby="heading<?= htmlspecialchars($idNo) ?>">
                                        <div class="accordion-body">
                                            <?php
                                            $content = "";
                                            if (!empty($whereClause1)) {
                                                if (!empty($whereClause)) {
                                                    $sqlss = "SELECT DISTINCT TextInfo FROM document WHERE $whereClause AND PersonID = " . $row["PersonID"] . " AND NumberHos = " . $row["NumberHos"];
                                                } else {
                                                    $sqlss = "SELECT DISTINCT TextInfo FROM document WHERE PersonID = " . $row["PersonID"] . " AND NumberHos = " . $row["NumberHos"];
                                                }
                                                $resultss = $conn->query($sqlss);
                                                while ($row = $resultss->fetch_assoc()) {
                                                    $content .= highlight_keywords($row['TextInfo'], $ikw);
                                                }
                                            }
                                            echo $content;
                                            ?></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    <?php }
                } ?>
                </tbody>
            </table>
            <button type="button" onclick="opcheckboxed('PersonIDchecklist[]', 'checkall')">全选</button>
            <button type="button" onclick="opcheckboxed('PersonIDchecklist[]', 'uncheckall')">取消全选</button>
            <button type="button" onclick="opcheckboxed('PersonIDchecklist[]', 'reversecheck')">反选</button><br>
        <?php } ?>
        <br>

        <div class="container d-grid gap-2">
            <button class="btn btn-primary" type="submit">
                批量分析
            </button>
            <a class="btn btn-secondary" href="javascript:history.go(-1)" role="button">返回</a>
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
            {"width": "70px", "targets": [1, 2]},
            {"width": "40px", "targets": [3, 4]},
            {"width": "100px", "targets": [5]}
        ],
        order: [[2, "asc"], [5, "asc"]]
    });
</script>
</body>
</html>



