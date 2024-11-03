<?php
require_once 'dbconn.php';
global $conn;
$sql = "SELECT PersonID, PersonName, Job, Employer FROM patient_info";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    ?>
    <table>
        <?php
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            ?>
            <tr>
                <td><?= htmlspecialchars($row["PersonID"]) ?></td>
                <td><?= htmlspecialchars($row["PersonName"]) ?></td>
                <td><?= htmlspecialchars($row["Job"]) ?></td>
                <td><?= htmlspecialchars($row["Employer"]) ?></td>
            </tr>
            <?php
        }
        ?></table>
    <?php
} else {
    echo "0 results";
}
