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

$today = date("Y-m-d");


if(isset($_POST["task"])){
		//Je modifie la date "lastDone"
		$req = $db->prepare("UPDATE taches SET lastDone = :lastDone WHERE name = :name");
			$req->execute(array(
				"lastDone" => $_POST["lastDone"],
				"name" => $_POST["task"]
			));

		//Je récupère la deadline actuelle
		$oldDeadLine = $db->prepare("SELECT * FROM taches WHERE name = :name");
				$oldDeadLine->execute(array(
				"name" => $_POST["task"]
				));
		$oldDL = $oldDeadLine->fetch();

		//Je mets à jour la deadline
		$majDeadLine = $db->prepare("UPDATE taches SET deadLine = :deadLine WHERE name = :name");

		//Si récurrence, j'ajoute le nombre de jours entré dans "delay" à la date d'aujourd'hui(si on est le 22 avec un delay de 3 la deadline sera assignée au 25)
		if($oldDL["recurrence"] == "yes"){
			$majDeadLine->execute(array(
				"deadLine" => date('Y-m-d', strtotime($today. ' + '.$oldDL["delay"].' days')),
				"name" => $_POST["task"]
			));
		}
		else if($oldDL["recurrence"] == "no"){
			$majDeadLine->execute(array(
				"deadLine" => NULL,
				"name" => $_POST["task"]
			));
		}
}
?>
