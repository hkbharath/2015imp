<?php

include_once 'dbsetting.php';
include_once 'debugger.php';
$db = new dbConnector();
$link = $db->getAgent();

$query = "INSERT INTO imp_images (id, name, pic_path, page) VALUES
(NULL, 'Impetus15', 'images/stage_bescome.png', 'sponsor'),
(NULL, 'Impetus15 Sponsors', 'images/stage_bsnl.png', 'sponsor'),
(NULL, 'Impetus15 Sponsors', 'images/stage_mcal.png', 'sponsor'),
(NULL, 'Impetus15 Sponsors', 'images/stage_srisai.png', 'sponsor'),
(NULL, 'Impetus15 Sponsors', 'images/stage_techser.png', 'sponsor'),
(NULL, 'Impetus15 Sponsors', 'images/stage_teqip2.png', 'sponsor');";

echo $query;
mysqli_query($link, $query);
echo mysqli_errno($link);
?>
