<?php
session_start();
global $conn;
include "dbconn.php";

// Now we check if the data from the login form was submitted, isset() will check if the data exists.
if (!isset($_POST['username'], $_POST['password'])) {
    exit('请填写用户名和密码！');
}

// Prepare our SQL, preparing the SQL statement will prevent SQL injection.
if ($stmt = $conn->prepare('SELECT id, password FROM accounts WHERE username = ?')) {
    $stmt->bind_param('s', $_POST['username']);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $password);
        $stmt->fetch();
        // Account exists, now we verify the password.
        // Note: remember to use password_hash in your registration file to store the hashed passwords.
        if (password_verify($_POST['password'], $password)) {
            session_regenerate_id();
            $_SESSION['logged'] = TRUE;
            $_SESSION['name'] = $_POST['username'];
            $_SESSION['id'] = $id;
            header('Location: navi.php');
        } else {
            // Incorrect password
            echo '用户名或密码错误！';
        }
    } else {
        // Incorrect username
        echo '用户名或密码错误！';
    }
} else exit("数据库查询准备失败");
$stmt?->close();