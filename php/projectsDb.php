<?php
// Connexion à MySQL
try

{

    $db = new PDO('mysql:host=localhost;dbname=todolist;charset=utf8', 'root', 'password',
    array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

}

catch (Exception $e)

{

        die('Erreur : ' . $e->getMessage());

}
$dataTable = [];
// Je fais une requete pour toutes les taches, ordonnés par date
$dataProjects = $db->query("SELECT * FROM projects WHERE done != 'yes' ");
$dataProjectTasks = $db->query("SELECT * FROM taches WHERE project != 'null'");

while ($data = $dataProjectTasks->fetch(PDO::FETCH_ASSOC)) {
    array_push($dataTable, $data);
}
while ($data = $dataProjects->fetch(PDO::FETCH_ASSOC)) {
    array_push($dataTable, $data);
}

echo json_encode($dataTable);
?>
