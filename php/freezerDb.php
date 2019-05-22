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
// Je fais une requete par type d'ingrédients dans ma library
$dataFreezerMeat = $db->query("SELECT * FROM freezerlibrary WHERE category = 'meat'");
$dataFreezerVegs = $db->query("SELECT * FROM freezerlibrary WHERE category = 'vegs'");
$dataFreezerMeal = $db->query("SELECT * FROM freezerlibrary WHERE category = 'meal'");
$dataFreezerSugary = $db->query("SELECT * FROM freezerlibrary WHERE category = 'sugary'");
$dataFreezerOther = $db->query("SELECT * FROM freezerlibrary WHERE category = 'other'");

//Je fais une requete par type d'ingrédients dans mon congel
$stockFreezerMeat = $db->query("SELECT * FROM freezer WHERE category = 'meat'");
$stockFreezerVegs = $db->query("SELECT * FROM freezer WHERE category = 'vegs'");
$stockFreezerMeal = $db->query("SELECT * FROM freezer WHERE category = 'meal'");
$stockFreezerSugary = $db->query("SELECT * FROM freezer WHERE category = 'sugary'");
$stockFreezerOther = $db->query("SELECT * FROM freezer WHERE category = 'other'");


//Je fais une requête dans ma library ordonnée par récurrence
$dataFreezerRec = $db->query("SELECT * FROM freezerlibrary ORDER BY recurrence DESC");

$dataMeat = $dataFreezerMeat->fetchAll(PDO::FETCH_ASSOC);
$dataVegs = $dataFreezerVegs->fetchAll(PDO::FETCH_ASSOC);
$dataMeal = $dataFreezerMeal->fetchAll(PDO::FETCH_ASSOC);
$dataSugary = $dataFreezerSugary->fetchAll(PDO::FETCH_ASSOC);
$dataOther = $dataFreezerOther->fetchAll(PDO::FETCH_ASSOC);

$stockMeat = $stockFreezerMeat->fetchAll(PDO::FETCH_ASSOC);
$stockVegs = $stockFreezerVegs->fetchAll(PDO::FETCH_ASSOC);
$stockMeal = $stockFreezerMeal->fetchAll(PDO::FETCH_ASSOC);
$stockSugary = $stockFreezerSugary->fetchAll(PDO::FETCH_ASSOC);
$stockOther = $stockFreezerOther->fetchAll(PDO::FETCH_ASSOC);

$freezerRec = $dataFreezerRec->fetchAll(PDO::FETCH_ASSOC);


//J'envoie le tout dans un objet en json, pour le parcourir en js grâce à une requête AJAX
echo json_encode(array("meat" => $dataMeat, "vegs" => $dataVegs,"meal" => $dataMeal, "sugary" => $dataSugary,"other" => $dataOther, "meatStock" => $stockMeat, "vegsStock" => $stockVegs,"mealStock" => $stockMeal, "sugaryStock" => $stockSugary,"otherStock" => $stockOther, "freezerRec" => $freezerRec));
?>
