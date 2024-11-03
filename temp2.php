<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="code/css/bootstrap.min.css" rel="stylesheet">
<script src="code/js/bootstrap.bundle.min.js"></script>
<script src="code/js/highcharts.js"></script>
<script src="code/modules/series-label.js"></script>
<script src="code/modules/exporting.js"></script>
<script src="code/modules/export-data.js"></script>
<script src="code/modules/accessibility.js"></script>

<link href="code/custom.css" rel="stylesheet" type="text/css">

<?php
// Include the database config file
global $conn;
require_once 'dbconn.php';

// If the search form is submitted
$searchKeyword = $queryCondition = '';
if (isset($_POST['searchSubmit'])) {
    $searchKeyword = $_POST['keyword'];
    if (!empty($searchKeyword)) {
        $wordsAry = explode(" ", $searchKeyword);
        $wordsCount = count($wordsAry);
        $queryCondition = " WHERE ";
        for ($i = 0; $i < $wordsCount; $i++) {
            $queryCondition .= "PersonID LIKE '%" . $wordsAry[$i] . "%' OR TextInfo LIKE '%" . $wordsAry[$i] . "%'";
            if ($i != $wordsCount - 1) {
                $queryCondition .= " OR ";
            }
        }
    }
}

// Get matched records from the database
$result = $conn->query("SELECT * FROM meta_info $queryCondition ORDER BY item_id DESC");

// Highlight words in text
function highlight_keywords($text, $keyword): string
{
    $result = "";
    $positions = [];
    $position = mb_stripos($text, $keyword);
    while ($position !== false) {
        $positions[] = $position;
        $position = mb_stripos($text, $keyword, $position + 1);
    }
    foreach ($positions as $position) {
        $start = max(0, $position - 20);
        $end = min(mb_strlen($text), $position + 20);
        $excerpt = mb_substr($text, $start, $end - $start);
        $result = $result . '<br>...' . mb_eregi_replace($keyword, '<span class="highlighted">' . $keyword . '</span>', $excerpt) . '...</br>';
    }
    return $result;
}

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $content = highlight_keywords($row['TextInfo'], $searchKeyword);
        ?>
        <div class="list-item">
            <h4><?php echo $row['PersonID']; ?></h4>
            <p><?php echo $content; ?></p>
        </div>
    <?php }
} else { ?>
    <p>No post(s) found...</p>
<?php } ?>
