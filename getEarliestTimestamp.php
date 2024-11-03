<?php
function getEarliestTimestamp($PI, $NH)
{
    global $conn;
    $sql = "SELECT RecordTime FROM document WHERE PersonID = ? AND NumberHos = ? ORDER BY RecordTime LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $PI, $NH);
    $stmt->execute();
    $stmt->bind_result($earliestTimestamp);

    // 获取结果
    if ($stmt->fetch()) {
        // 有符合条件的条目
        $stmt->close();
        return $earliestTimestamp;
    } else {
        // 没有符合条件的条目
        $stmt->close();
        return "";
    }
}