<?php

try

{

    $db = new PDO('mysql:host=localhost;dbname=todolist;charset=utf8', 'root', 'password',
    array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

}

catch (Exception $e)

{

        die('Erreur : ' . $e->getMessage());

}


$freezerlibData = $db->query("SELECT name FROM freezerlibrary");
$freezerlib = $freezerlibData->fetchAll(PDO::FETCH_NUM);//Je récupère les noms de ma library

$notReallyNew = false;
$today = date("Y-m-d");
//Si je connais le nom de l'ingrédient(recherche dans ma BDD sur cette page)j'update plutot qu'insert. 
if(isset($_POST["name"]) || isset($_POST["nameNew"])){
	if($_POST["nameNew"] == ""){//Si j'ai utilisé un des boutons d'ingrédients déjà utilisés(je n'ai pas rempli le champ nouvelle entrée
		//Je crée une nouvelle entrée dans mon congel
		$req = $db->prepare("INSERT INTO freezer (name, category, quantity, unit, place, dateAdded)
										VALUES(:name, :category, :quantity, :unit, :place, :dateAdded)");
		$req->execute(array(
			"name"=>$_POST["name"],
			"category" => $_POST["category"],
			"quantity" => $_POST["quantity"],
			"unit" => $_POST["unit"],
			"place" => $_POST["place"],
			"dateAdded" => $today
		));
		//J'incrémente la valeur recurrence de l'ingrédient concerné dans ma library(permet d'afficher les ingrédients récurrents sur la page d'accueil)
		$req2 = $db->prepare("UPDATE freezerlibrary SET recurrence = recurrence + 1 WHERE name = :name");
		$req2->execute(array(
			"name"=>$_POST["name"]
		));
	}
	else{//Si j'ai rempli le champ nouvelle entrée
		for($i=0;$i<count($freezerlib);$i++){
			//Si en parcourant mon array contenant les noms dans ma library, je tombe sur le même nom, ma nouvelle entrée n'en est pas vraiment une
			if( $freezerlib[$i][0] == $_POST["nameNew"]){
				$notReallyNew = true;
			}
		}
		if($notReallyNew == false){
			//Si c'est une nouvelle entrée, je crée une nouvelle entrée dans ma library
			$req3 = $db->prepare("INSERT INTO freezerlibrary (name, category, unit)
										VALUES(:name, :category, :unit)");
			$req3->execute(array(
				"name" => $_POST["nameNew"],
				"category" => $_POST["category"],
				"unit" => $_POST["unit"]
			));
		}
		else{
			//Sinon, j'incrémente la valeur recurrence de l'ingrédient concerné dans ma library
			$req5 = $db->prepare("UPDATE freezerlibrary SET recurrence = recurrence + 1 WHERE name = :name");
			$req5->execute(array(
				"name"=>$_POST["nameNew"]
			));
		}
		//Dans les deux cas, je crée une nouvelle entrée dans mon congel
		$req4 = $db->prepare("INSERT INTO freezer (name, category, quantity, unit, place, dateAdded)
										VALUES(:name, :category, :quantity, :unit, :place, :dateAdded)");
		$req4->execute(array(
			"name" => $_POST["nameNew"],
			"category" => $_POST["category"],
			"quantity" => $_POST["quantity"],
			"unit" => $_POST["unit"],
			"place" => $_POST["place"],
			"dateAdded"=> $today
		));	
	}
}

if ($_POST) {
   // Execute code (such as database updates) here.

   // Redirect to this page.
   header("Location: " . $_SERVER['REQUEST_URI']);
   exit();
}

include_once(realpath(dirname(__FILE__) . '/../twig/twig.php'));
	
echo $twig->render('freezer.twig', array(

	));

?>