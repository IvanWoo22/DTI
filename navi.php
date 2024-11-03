<?php
session_start();
if (!isset($_SESSION['logged'])) {
    header('Location: index.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="code/css/bootstrap.min.css" rel="stylesheet">
    <script src="code/js/bootstrap.bundle.min.js"></script>
    <link href="code/custom.css" rel="stylesheet" type="text/css">
    <style>
        h3 {
            text-align: center;
            margin: 30px;
        }
    </style>
    <title>信息检索筛选系统</title>
</head>

<body>
<?php
include "dbconn.php";
?>

<h3>记录检索</h3>

<div class="container px-3 my-3">
    <form action="search_item.php" method="post">
        <div class="row g-3">
            <div class="form-floating mt-3">
                <input type="text" class="form-control" id="kw" placeholder="请输入关键词" name="kw"
                       aria-describedby="HelpInline" required>
                <label for="kw">请输入关键词</label>
                <small id="HelpInline" class="text-muted">
                    用空格间隔
                </small>
            </div>
            <div>
                <label for="condition">条件：</label>
                <input class="form-check-input" type="radio" id="and" name="condition" value="and" checked>
                <label class="form-check-label" for="and">和</label>
                <input class="form-check-input" type="radio" id="or" name="condition" value="or">
                <label class="form-check-label" for="or">或</label>
            </div>
            <button type="submit" class="btn btn-primary">查找</button>
        </div>
    </form>
</div>

<br>
<br>
<hr>
<br>

<h3 style="margin:30px">样本筛选</h3>
<div class="container px-3 my-3">
    <form action="search_batch.php" method="post">
        <div class="row g-3">
            <div class="input-group mt-3">
                <span class="input-group-text"><strong>包含</strong></span>
                <div class="form-floating">
                    <input type="text" class="form-control" id="ikw" placeholder="ikw" name="ikw">
                    <label for="ikw">关键词</label>
                </div>
            </div>
            <div class="form-check-inline mt-3">
                <label for="condition">条件：</label>
                <input class="form-check-input" type="radio" id="and" name="condition" value="and" checked>
                <label class="form-check-label" for="and">和</label>
                <input class="form-check-input" type="radio" id="or" name="condition" value="or">
                <label class="form-check-label" for="or">或</label>
            </div>
            <div class="input-group mt-3">
                <span class="input-group-text"><strong>排除</strong></span>
                <div class="form-floating">
                    <input type="text" class="form-control" id="ekw" placeholder="ekw" name="ekw">
                    <label for="ekw">关键词</label>
                </div>
            </div>
            <div class="form-floating col-md-1">
                <input type="number" class="form-control" id="min_age" placeholder="请输入最小年龄" name="min_age"
                       min="0">
                <label for="min_age">最小年龄</label>
            </div>
            <div class="form-floating col-md-1">
                <input type="number" class="form-control" id="max_age" placeholder="请输入最大年龄" name="max_age"
                       min="0">
                <label for="max_age">最大年龄</label>
            </div>
            <div class="form-floating col-md-2">
                <select class="form-select" id="sex" name="sex">
                    <option value=0 selected>不限</option>
                    <option value=1>男</option>
                    <option value=2>女</option>
                </select>
                <label for="sex">性别</label>
            </div>
            <div class="form-floating col-md-2">
                <input type="text" class="form-control" id="ethnic" placeholder="ethnic" name="ethnic">
                <label for="ethnic">民族</label>
            </div>
            <div class="form-floating col-md-2">
                <select class="form-select" id="marriage" name="marriage">
                    <option value=0 selected>不限</option>
                    <option value=1>已婚</option>
                    <option value=2>未婚</option>
                </select>
                <label for="marriage">婚姻</label>
            </div>
            <div class="form-floating col-md-2">
                <input type="date" class="form-control" id="first_date" name="first_date">
                <label for="first_date">最早入院日期</label>
            </div>
            <div class="form-floating col-md-2">
                <input type="date" class="form-control" id="last_date" name="last_date">
                <label for="last_date">最晚入院日期</label>
            </div>
            <button type="submit" class="btn btn-primary">提交</button>
        </div>
    </form>
</div>

</body>
</html>
