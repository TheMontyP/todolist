var currentProject;
$("#endProject").hide();

$.ajax({
    type: "GET",
    url: "../php/projectsDb.php",
    dataType: "JSON",
    success:function(xhr){
        projects = xhr;
        projectsDisplay();
    }
});



function loadProjectDb(target){
    $.ajax({
        type: "GET",
        url: "../php/projectsDb.php",
        dataType: "JSON",
        success:function(xhr){
            projects = xhr;
            projectsDisplay();
            if(target!=null){
                displayProject(target);
            }
        },
        error:function(xhr){
            console.log(xhr);
        }
    });
}

function projectsDisplay(){
    var projectsList="";
    for(i=0;i<projects.length;i++){
        if(projects[i].projectName != null){
            projectsList += "<li class='project'>"+projects[i].projectName+"</li>";

        }    
    }
    $("#projectsList").html(projectsList); 
}


$(document).ready ( function () {
    $(document).on ("click", ".project", function (e) {
        loadProjectDb(e.target.innerHTML);
        $("#endProject").show();
    });
});

$("#endProject").click(function() {//Quand je clique sur le bouton valider d'une tache
    $.ajax({
        type: "POST",
        url: "/todolist/php/projectDbValidate.php",
        data: {project:currentProject},
        success: function(){
            location.reload();
         },
        error: function(err) {
            if(err.responseText!=""){
                alert(err.responseText);
            }
        }
    });
});

function displayProject(project){
    var currentProjectConception ="";
    var currentProjectPurchase ="";
    var currentProjectExecution ="";
    var conceptionToDo=0, conceptionDone=0, purchaseToDo=0, purchaseDone=0, executionToDo=0, executionDone=0; 
    
    currentProject = project;//Stocke le nom du projet affiché
    for(i=0;i<projects.length;i++){
        if(projects[i].project == project){// Si le nom du projet est le même que le nom du bouton
            switch(projects[i].projectStage){
            case "conception":
                currentProjectConception += "<div><div id='projectTaskLogo"+i+"'></div><li class='task'><p class='taskColoredText'>"+projects[i].name+"</p></li></div>";
                if(projects[i].lastDone!= null){
                    conceptionDone ++;
                    conceptionToDo ++;
                }
                else{
                    conceptionToDo ++;
                }
                break;
            case "purchase":
                currentProjectPurchase += "<div><div id='projectTaskLogo"+i+"'></div><li class='task'><p class='taskColoredText'>"+projects[i].name+"</p></li></div>";
                if(projects[i].lastDone !=null){
                    purchaseDone ++;
                    purchaseToDo ++;
                }
                else{
                    purchaseToDo ++;
                }
                break;
            case "execution":
                currentProjectExecution += "<div><div id='projectTaskLogo"+i+"'></div><li class='task'><p class='taskColoredText'>"+projects[i].name+"</p></li></div>";
                if(projects[i].lastDone !=null){
                    executionDone ++;
                    executionToDo ++;
                }
                else{
                    executionToDo ++;
                }
                break;
            }   
        }
        if(projects[i].projectName == project){  //Compteur à coté du header
            $("#conceptionStatus").html(conceptionDone + " / " + conceptionToDo);
            $("#purchaseStatus").html(purchaseDone + " / " + purchaseToDo);
            $("#executionStatus").html(executionDone + " / " + executionToDo);
        }
    }
    $("#currentProjectTitle").html(project);
    $("#currentProjectConception").html(currentProjectConception);
    $("#currentProjectPurchase").html(currentProjectPurchase);
    $("#currentProjectExecution").html(currentProjectExecution);

    projectTaskColorStatus();
}


function projectTaskColorStatus(){
    for(i=0;i<projects.length;i++){
        if(projects[i].lastDone!= null){
                $("#projectTaskLogo"+i).css("background-color", "rgba(46, 204, 113, 0.85)");
            }
            else{
                $("#projectTaskLogo"+i).css("background-color", "rgba(243, 156, 18, 0.85)");
            }
    }
}

