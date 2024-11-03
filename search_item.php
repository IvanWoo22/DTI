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
    <script src="code/js/bootstrap.bundle.min.js"></script>
    <title>搜索结果</title>
</head>
<body>

<div class="container px-3 my-3"><br>
    <?php
    global $conn;
    require_once "dbconn.php";
    $keywords = addslashes($_POST["kw"]);
    $condition = addslashes($_POST["condition"]);

    echo "<h3 style=\"margin:30px\">找到\"$keywords\"相关结果:</h3><br>";

    $keywordArray = preg_split('/\s+/', $keywords);
    $whereClause = "";
    foreach ($keywordArray as $keyword) {
        if ($condition == "and") {
            $whereClause .= " AND (PersonID LIKE '%$keyword%' or  PersonName LIKE '%$keyword%' or Address LIKE '%$keyword%')";
        } elseif ($condition == "or") {
            $whereClause .= " OR (PersonID LIKE '%$keyword%' or  PersonName LIKE '%$keyword%' or Address LIKE '%$keyword%')";
        }
    }
    $whereClause = ltrim($whereClause, " AND");
    $whereClause = ltrim($whereClause, " OR");
    $sql = "SELECT PersonID, PersonName, Sex, Age, Address FROM patient_info WHERE $whereClause";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo '<table class="table table-hover">
  <thead>
    <tr>
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
          <th scope="row"><a href="patient_view.php?id=' . $row["PersonID"] . '" target="_blank">' . $row["PersonID"] . '</a></th>
          <td>' . $row["PersonName"] . '</td>
          <td>' . $row["Sex"] . '</td>
          <td>' . $row["Age"] . '</td>
          <td>' . $row["Address"] . '</td>
        </tr>';
        }
        echo '  </tbody>
</table>';
    } else {
        echo "0 results";
    }
    ?>
    <br>
</div>
<div class="container d-grid gap-2">
    <a class="btn btn-primary" href="navi.php" role="button">返回</a>
</div>
</body>
