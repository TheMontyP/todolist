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


if(isset($_POST["project"])){
		//Je modifie la date "lastDone"
		$req = $db->prepare("UPDATE projects SET done = :done WHERE projectName = :name");
			$req->execute(array(
				"done" => "yes",
				"name" => $_POST["project"]
			));

		
}
?>
