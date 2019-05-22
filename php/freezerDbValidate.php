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


if(isset($_POST["idStock"])){
	if($_POST["delete"] == true){
		$req = $db->prepare("DELETE FROM freezer 
								WHERE idStock = :id");
			$req->execute(array(
				"id" => $_POST["idStock"]
			));
	}
	else{
		$req = $db->prepare("UPDATE freezer SET quantity = :qty, place = :place 
								WHERE idStock = :id");
			$req->execute(array(
				"id" => $_POST["idStock"],
				"qty" => $_POST["qty"],
				"place" => $_POST["place"]
			));
	}

		
}
?>