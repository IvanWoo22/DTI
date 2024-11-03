<!DOCTYPE html>
<?php
session_start();
if (!isset($_SESSION['logged'])) {
    header('Location: index.php');
    exit;
}
?>
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
    <?php
    require_once "dbconn.php";
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    if (!$id) {
        echo "<p>ID isn't provided.</p>";
        exit;
    }
    $sql = "SELECT * FROM patient_info WHERE PersonID = ? ORDER BY Address DESC LIMIT 1";
    global $conn;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    ?>
</head>

<body>
<div class="container px-3 my-3">
    <h3 style="margin:30px">基本信息</h3>
    <div class="container px-3 my-3">
        <table class="table table-hover table-striped w-auto" style="font-size:larger;width:50%">
            <tbody>
            <?php
            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
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
                    $value = htmlspecialchars($row[$field] ?? 'N/A');
                    echo "<tr><td class='text-end'>$label</td><td class='text-center'><strong>$value</strong></td></tr>";
                }
            }
            ?>
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
        let patientId = <?= json_encode($id) ?>;

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
