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

// Je fais une requete pour toutes les taches, ordonnés par date
$dataStats = $db->query("SELECT * FROM stats ORDER BY stamp ASC ");
$data = $dataStats->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);

?>