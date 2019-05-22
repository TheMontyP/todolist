<?php
    include_once('lib/Twig/Autoloader.php');
    Twig_Autoloader::register();
    
	//Dossier contenant les templates
    $loader = new Twig_Loader_Filesystem(realpath(dirname(__FILE__) . '/../templates'));
    $twig = new Twig_Environment($loader, array(
      'cache' => false
    ));
?>