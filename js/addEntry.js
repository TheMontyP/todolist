var projects;
//Requete AJAX pour récupérer mes projets en cours pour assigner une tache à un projet à la création
$.ajax({
    type: "GET",
    url: "/todolist/php/projectsDb.php",
    dataType: "JSON",
    success:function(xhr){
        projects = xhr;
        var projectOptions = "<option value=''>Aucun</option>";
        for(i=0;i<projects.length;i++){
        	if(projects[i].projectName != null){
				projectOptions += "<option value='"+projects[i].projectName+"'>"+projects[i].projectName+"</option>";
			}
        }     
        $("#taskModalProject").html(projectOptions);
    }
});

$("#taskModalOpener").click(function(e) {
	$("#taskModal").show();
	$("#taskModalTitle").html("Créer une nouvelle tâche");
	
	//Je réinitialise mon formulaire
	$("#taskForm").trigger("reset");
	$("#formTaskName").val("");
    $("#formTaskDeadLine").val("");

    $("#recurrence1").removeAttr("checked");
    $("#recurrence2").attr("checked", true);
    
    $("#duration1").attr("checked", true);
    $("#duration2").removeAttr("checked");
    $("#duration3").removeAttr("checked");  

    $("#importance1").attr("checked", true);
    $("#importance2").removeAttr("checked");
    $("#importance3").removeAttr("checked");  


    $("#submitButtonTask").html("CRÉER");

    $("#frequency").hide();
});

//Si je crée une tache récurrente
$("#recurrenceSwitch").click(function(e) {
	if($("#frequency").css("display") == "block"){
    	$("#frequency").hide();
        $("#formTaskDelay").attr("required",false);
	}
	else{
		$("#frequency").show();
        $("#formTaskDelay").attr("required",true);
	}

});

$("#rdvModalOpener").click(function(e) {
	$("#rdvModal").show();
	$("#rdvModalTitle").html("Créer un nouveau rendez-vous");
	
	//Je réinitialise mon formulaire
	$("#rdvForm").trigger("reset");
	$("#formRdvName").val("");
    $("#formRdvDeadLine").val("");
});

$("#projectModalOpener").click(function(e) {
	$("#projectModal").show();
	$("#projectModalTitle").html("Créer un nouveau projet");
});

$("#freezerModalOpener").click(function(e) {
    $("#freezerModal").show();
    $("#freezerModalTitle").html("Congeler un ingrédient");
    $("#freezerForm").trigger("reset");
    $('#freezerQtyRecap').html("");
    $('#freezerUnitRecap').html("");
    $('#freezerNameRecap').html("");
    $('#freezerPlaceRecap').html("");
    $('#freezerFormNameMenu').show();
    $('#freezerFormNameSelection').hide();
});



//Pour fermer les modals
$("#taskModal").click(function(e) {
	if(($("#taskModal").css("display") == "block") && (e.target == this)){
    	$("#taskModal").hide();
	}
});

$("#rdvModal").click(function(e) {
	if(($("#rdvModal").css("display") == "block") && (e.target == this)){
    	$("#rdvModal").hide();
	}
});

$("#projectModal").click(function(e) {
	if(($("#projectModal").css("display") == "block") && (e.target == this)){
    	$("#projectModal").hide();
	}
});

$("#freezerModal").click(function(e) {
    if(($("#freezerModal").css("display") == "block") && (e.target == this)){
        $("#freezerModal").hide();
        $('#freezerFormUnit').prop('readonly', false);
        $('#freezerFormError').hide();
    }
});