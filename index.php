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
$recurrence="";


//Si j'ai défini un nom et une deadline
if(isset($_POST["name"]) AND $_POST["name"] != ""){ 

	if(isset($_POST["recurrence"]) AND $_POST["recurrence"] == "yes"){
		$recurrence = "yes";
	}
	else{
		$recurrence = "no";
	}

	if(isset($_POST["private"]) AND $_POST["private"] == "yes"){
		$private = "yes";
	}
	else{
		$private = "no";
	}

	if(isset($_POST["project"]) AND $_POST["project"] == ""){
		$project = null;
		$projectStage = null;
	}
	else if(isset($_POST["project"])){
		$project = $_POST["project"];
		$projectStage = $_POST["projectStage"];
	}
	//Si c'est une tache
	if($_POST["typeCheck"] == "task"){
	
		//Si pas de fréquence j'attribue la valeur null a delay
		if(isset($_POST['delay'])){
			if($_POST["delay"] == ""){
				$delay = null;
			}
			else{
				$delay = $_POST["delay"];
			}
		}

		if(isset($_POST['datePicker'])){
			if($_POST["datePicker"] == ""){
				$deadLine = null;
			}
			else{
				$deadLine = $_POST["datePicker"];
			}
		}

		
		//Si le formulaire a un ID (si la tache existe déjà) je mets à jour
		if($_POST["idCheck"] != ""){
			$req = $db->prepare("UPDATE taches SET name = :name, project =:project, projectStage =:projectStage, delay = :delay, recurrence = :recurrence, private =:private, duration = :duration, importance = :importance, deadLine = :deadLine, comment = :comment WHERE id = :id");
			$req->execute(array(
				"name" => $_POST["name"],
				"project" => $project,
				"projectStage" => $projectStage,
				"delay" => $delay,
				"recurrence" => $recurrence,
				"private" => $private,
				"duration" => $_POST["duration"],
				"importance" => $_POST["importance"],
				"deadLine" => $deadLine,
				"comment" => $_POST["comment"],
				"id" => $_POST["idCheck"],

			));
		}
		//Sinon je crée une nouvelle entrée dans la DB
		else{
			$req = $db->prepare("INSERT INTO taches (name, project, projectStage, delay, recurrence, private, duration, importance, deadLine, comment)
									VALUES(:name, :project, :projectStage, :delay, :recurrence, :private, :duration, :importance, :deadLine, :comment)");
			$req->execute(array(
				"name" => $_POST["name"],
				"project" => $project,
				"projectStage" => $projectStage,
				"delay" => $delay,
				"recurrence" => $recurrence,
				"private" => $private,
				"duration" => $_POST["duration"],
				"importance" => $_POST["importance"],
				"deadLine" => $deadLine,
				"comment" => $_POST["comment"],

			));
		}
	}

	//Si c'est un rdv
	else if($_POST["typeCheck"] == "rdv" AND ($_POST["datePicker"] != "")){

		//Si le formulaire a un ID (si le rdv existe déjà) je mets à jour
		if($_POST["idCheck"] != ""){
			$req = $db->prepare("UPDATE rdv SET name = :name, rdvDate = :rdvDate, adress = :adress, tel = :tel, mail = :mail, comment = :comment WHERE id = :id");
			$req->execute(array(
				"name" => $_POST["name"],
				"rdvDate" => $_POST['datePicker'],
				"adress" => $_POST["adress"],
				"tel" => $_POST["tel"],
				"mail" => $_POST["mail"],
				"comment" => $_POST["comment"],
				"id" => $_POST["idCheck"],

			));
		}
		//Sinon je crée une nouvelle entrée dans la DB
		else{
			$req = $db->prepare("INSERT INTO rdv (name, rdvDate, adress, tel, mail, comment)
									VALUES(:name, :rdvDate, :adress, :tel, :mail, :comment)");
			$req->execute(array(
				"name" => $_POST["name"],
				"rdvDate" => $_POST['datePicker'],
				"adress" => $_POST["adress"],
				"tel" => $_POST["tel"],
				"mail" => $_POST["mail"],
				"comment" => $_POST["comment"],

			));
		}
	}
	else if($_POST["typeCheck"] == "project"){
		//Si le formulaire a un ID (si le projet existe déjà) je mets à jour
		if($_POST["idCheck"] != ""){
			$req = $db->prepare("UPDATE projects SET projectName = :name WHERE id = :id");
			$req->execute(array(
				"name" => $_POST["name"],

			));
		}
		//Sinon je crée une nouvelle entrée dans la DB
		else{
			$req = $db->prepare("INSERT INTO projects (projectName)
									VALUES(:name)");
			$req->execute(array(
				"name" => $_POST["name"],
			));
		}
	}
	else if($_POST){
		echo "Un champ n'a pas été renseigné.";
	}
}
else if($_POST){
	echo "Un champ n'a pas été renseigné.";
}

if ($_POST) {
   // Execute code (such as database updates) here.

   // Redirect to this page.
   header("Location: " . $_SERVER['REQUEST_URI']);
   exit();
}

include_once('twig/twig.php');

echo $twig->render('accueil.twig', array(
		"navigation"=>"racine"
	));

?>
