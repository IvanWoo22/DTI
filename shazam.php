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
    <form action="check_batch.php" method="post" name="CheckList" id="CheckList">
        <?php
        global $conn;
        include "dbconn.php";
        $keyword = addslashes($_POST["kw"]);
        echo "<h3 style=\"margin:30px\">找到\"$keyword\"相关结果:</h3><br>";
        $sql = "SELECT PersonID, PersonName, Sex, Age, Address FROM patient_info WHERE PersonName LIKE '%" . $keyword . "%'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            echo '<table id="result_table" class="table table-striped" style="width:100%">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">#</th>
      <th scope="col">姓名</th>
      <th scope="col">性别</th>
      <th scope="col">年龄</th>
      <th scope="col">家庭住址</th>
    </tr>
  </thead>
  <tbody>';
            while ($row = $result->fetch_assoc()) {
                echo '<tr>
          <td>
          <div class="form-check">
          <input class="form-check-input" type="checkbox" name="PersonIDchecklist[]" value="' . $row["PersonID"] . '">
          </div>
          </td>
          <th scope="row"><a href="lymphocyte_count.php?id=' . $row["PersonID"] . '" target="_blank">' . $row["PersonID"] . '</a></th>
          <td>' . $row["PersonName"] . '</td>
          <td>' . $row["Sex"] . '</td>
          <td>' . $row["Age"] . '</td>
          <td>' . $row["Address"] . '</td>
        </tr>';
            }
            echo '  </tbody>
</table>
<button type="button" onclick="opcheckboxed(\'PersonIDchecklist[]\', \'checkall\')">全选</button>
<button type="button" onclick="opcheckboxed(\'PersonIDchecklist[]\', \'uncheckall\')">取消全选</button>
<button type="button" onclick="opcheckboxed(\'PersonIDchecklist[]\', \'reversecheck\')">反选</button><br>';
        } else {
            echo "0 results";
        }
        ?>
        <br>

        <div class="container d-grid gap-2">
            <button class="btn btn-primary" type="submit">
                <span class="custom-icon"></span>
                <strong>Shazam!</strong>
            </button>
            <a class="btn btn-secondary" href="navi.php" role="button">返回</a>
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
        }
    });

</script>
</body>

