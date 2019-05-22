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


// Je fais une requete pour touts les rdv
$dataRdv = $db->query("SELECT name, rdvDate, adress, tel, mail 
						FROM rdv WHERE rdvDate>NOW() ORDER BY rdvDate ASC ");
$data = $dataRdv ->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);

?>

