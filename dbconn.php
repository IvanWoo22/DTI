<?php
const DB_HOST = '192.168.1.51';
const DB_USER = 'remote';
const DB_PASS = 'aphid1303';
const DB_NAME = 'icu_info';

try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
} catch (Exception $e) {
    die("Database connection failed. Please try again later.");
}

