var tasks, rdv;
var weekDay = ["DIMANCHE", "LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"];
var tasksWeekDay = [0, 0, 0, 0, 0, 0, 0];
var rdvWeekDay = [0, 0, 0, 0, 0, 0, 0];
var actualDelayTask = [];
var actualDelayRdv = [];
var today = new Date();//Date complète avec heures/minutes/secondes
var todaysDate = today.getFullYear() + "-" + ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2);//Date simplifiée(yyyy/mm/dd)
var myRed = "rgb(231, 76, 60)";
var myOrange = "rgb(243, 156, 18)";
var myYellow = "rgb(244, 208, 63)";
var myGreen = "rgb(46, 204, 113)";
var taskClicked;
var currentTaskName;
var currentTaskDuration;
var currentTaskImportance;
var currentTaskRecurrence;
var currentTaskDeadLine;
var currentTaskComment;
var currentTaskId;
var currentTaskDone;


displayWeekDays();
//
//
//Requete AJAX db taches et affichage
//
//
$.ajax({
    type: "GET",
    url: "/todolist/php/tasksDb.php",
    dataType: "JSON",
    success:function(xhr){
        tasks = xhr;
        tasksDisplay();
        openDetails();
    }
});
function tasksDisplay(){
  	var todayList ="";
	for(i=0; i<tasks.length;i++){
		//Calcule l'écart entre aujourd'hui et la deadline de chaque tache, l'inscrit dans un tableau
		actualDelayTask[i] = calculateDelay(today, tasks[i].deadLine);
        console.log(tasks[i].deadLine);
        if((actualDelayTask[i] < 1 && actualDelayTask[i] != null) || (actualDelayTask[i] == null && tasks[i].lastDone == null && tasks[i].project == null)){//Si la tache est due aujourd'hui 
    		todayList +=`<li class='task' id='task`+ i +`'>
                            <p class='taskLogo' id='taskLogo`+ i +`'></p>
                            <div class='taskText' title='` + tasks[i].name+ `' id='taskText` + i + `'>
                                <p class='taskColoredText'  id='taskColoredText` + i + `'>` + tasks[i].name+ `</p>
                                <p class='taskDeadLine'>` + formatDate(tasks[i].deadLine) + `</p>
                            </div>
                        </li>`;
		}
		else if(actualDelayTask[i] <=7){//Si la tache est due dans moins d'une semaine, je compte le nombre de tâches par jour
            switch(actualDelayTask[i]){
                case 1 :
                    tasksWeekDay[0]++;
                    break;
                case 2 :
                    tasksWeekDay[1]++;
                    break;
                case 3 :
                    tasksWeekDay[2]++;
                    break;
                case 4 :
                    tasksWeekDay[3]++;
                    break;
                case 5 :
                    tasksWeekDay[4]++;
                    break;
                case 6 :
                    tasksWeekDay[5]++;
                    break;
                case 7 :
                    tasksWeekDay[6]++;
                    break;

            }
		}
	}
	//J'intègre le html créé dans ma boucle aux ul correspondants
	$("#tasksToday").html(todayList);
	
	//J'assigne une couleur et un logo à chaque tache en fonction de ma BDD
	for(i=0; i<tasks.length;i++){
		taskColor(i, tasks[i].importance, tasks[i].duration);
    }
    //Je rentre dans mon planning hebdo le nombre de tâches par jour
    for(j=1;j<=7;j++){
            if(tasksWeekDay[j-1] == 0){
                $("#tasksDay"+j).html("AUCUNE TACHE");
            }
            else if(tasksWeekDay[j-1] == 1){
                $("#tasksDay"+j).html(tasksWeekDay[j-1]+" TACHE");
            }
            else{
                $("#tasksDay"+j).html(tasksWeekDay[j-1]+" TACHES");
            }
	}
}

//
//
//Requete AJAX db RDV et affichage
//
//
$.ajax({
    type: "GET",
    url: "php/rdvDb.php",
    dataType: "JSON",
    success:function(xhr){
        rdv = xhr;
        rdvDisplay();
    }
});

function rdvDisplay(){
    for(i=0; i<rdv.length;i++){
        //Calcule l'écart entre aujourd'hui et la deadline de chaque tache, l'inscrit dans un tableau
        actualDelayRdv[i] = calculateDelay(today, rdv[i].rdvDate);

        //Je remplis les infos concernant mon prochain RDV
        var weekDayTemp = new Date(rdv[0].rdvDate);//Je crée une date
        $("#nextRdvWeekDay").html(weekDay[weekDayTemp.getDay()]);//getDay renvoie un chiffre, weekDay est un tableau avec les noms de jours
        $("#nextRdvDate").html(formatRdvDate(rdv[0].rdvDate));
        $("#nextRdvTime").html(formatRdvTime(rdv[0].rdvDate));
        $("#nextRdvName").html(rdv[0].name);
        $("#nextRdvAdress").html("Adresse : "+rdv[0].adress);
        $("#nextRdvTel").html("Téléphone : "+rdv[0].tel);
        $("#nextRdvMail").html("Mail : "+rdv[0].mail);

        if(actualDelayRdv[i] <=7){//Si la tache est due dans moins d'une semaine, je compte le nombre de tâches par jour
            switch(actualDelayRdv[i]){
                case 1 :
                    rdvWeekDay[0]++;
                    break;
                case 2 :
                    rdvWeekDay[1]++;
                    break;
                case 3 :
                    rdvWeekDay[2]++;
                    break;
                case 4 :
                    rdvWeekDay[3]++;
                    break;
                case 5 :
                    rdvWeekDay[4]++;
                    break;
                case 6 :
                    rdvWeekDay[5]++;
                    break;
                case 7 :
                    rdvWeekDay[6]++;
                    break;
            }
        }
    }
    //Je rentre dans mon planning hebdo le nombre de tâches par jour
    for(j=1;j<=7;j++){
            if(rdvWeekDay[j-1] == 0){
                $("#rdvDay"+j).html("AUCUN RDV");
            }
            else if(rdvWeekDay[j-1] == 1){
                $("#rdvDay"+j).html(rdvWeekDay[j-1]+" RDV");
            }
            else{
                $("#rdvDay"+j).html(rdvWeekDay[j-1]+" RDV");
            }
    }
}


//Fonction pour calculer le nombre de jours entre deux dates
function calculateDelay(date1, date2){
	//1 jour en millisecondes
    var oneDay=1000*60*60*24;
    
    date1.setHours(0, 0, 0, 0);
    if(date2 != null){
        date2 = new Date(date2);
        date2.setHours(0, 0, 0, 0);
    }

    date1Ms = Date.parse(date1);
    date2Ms = Date.parse(date2);
    // Calcule la différence en ms
    var differenceMs = date2 - date1Ms;
    // Convertit de ms en jours
    if(date2 != null){
        return Math.ceil(differenceMs/oneDay);
    }
    else{
        return null;
    }
}

//Assigne une couleur et un logo à une tache
function taskColor(i, importance, duration){
	if(importance == "high"){
		$("#taskLogo"+i).css("background-color", myRed);
	}
	else if(importance == "average"){
		$("#taskLogo"+i).css("background-color", myOrange);
	}
	else if(importance == "low"){
		$("#taskLogo"+i).css("background-color", myYellow);
	}

	$("#taskLogo"+i).css("background-repeat", "no-repeat");
	$("#taskLogo"+i).css("background-position", "center");	
	if(duration =="short"){
		$("#taskLogo"+i).css("background-image", "url(css/shortTask.png)");
	}
	else if(duration == "average"){
		$("#taskLogo"+i).css("background-image", "url(css/averageTask.png)");
	}
	else if(duration == "long"){
		$("#taskLogo"+i).css("background-image", "url(css/longTask.png)");
	}
}


function isToday(date){
	if (date == todaysDate){
		return true;
	}
	else{
		return false;
	}
}

function formatDate(date){//Regex pour changer le format de la date
    if(date != null){
    date = date.slice(0,10);
	date = date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1');
	return date;
    }
    else{
        return '';
    }
}

function formatRdvDate(date){
    var tempDate = new Date(date);
    //Je crée les options pour transformer ma date en string, le mois en toutes lettres et le jour en chiffres
    var options = {month: "long", day: "numeric"};
    var formattedDate = tempDate.toLocaleDateString("fr-FR", options);
    return formattedDate.toUpperCase();
}

function formatRdvTime(date){
    var tempDate = new Date(date);
    return (tempDate.getHours()<10?'0':'')+tempDate.getHours()+" : "+(tempDate.getMinutes()<10?'0':'') +tempDate.getMinutes();
}

function displayWeekDays(){
    
    var d = today.getDay();
    for(i=1;i<=7;i++){
        if((d+i)<7){
            $("#day"+i).html(weekDay[d+i]);
        }
        else{
            $("#day"+i).html(weekDay[d+i-7]);
        }
    }
}
//Si je clique sur une tache, j'ouvre un modal avec des détails et la possibilité de la valider
function openDetails(){
    $(document).on('click', '.task', function(){
        if($("#modalWeekDayTask").css("display") == "block"){
            $("#modalWeekDayTask").hide();
        }
		taskClicked = $(this);
		$("#modalDetails").show();
		for(i=0;i<tasks.length;i++){
			if(tasks[i].name == $(this).find(".taskColoredText").html()){
				currentTaskName = tasks[i].name;
                currentTaskDelay = tasks[i].delay;
				currentTaskDuration = tasks[i].duration;
				currentTaskImportance = tasks[i].importance;
				currentTaskRecurrence = tasks[i].recurrence;
				currentTaskComment = tasks[i].comment;
                currentTaskProject = tasks[i].project;
                currentTaskProjectStage = tasks[i].projectStage;
                currentTaskId = tasks[i].id;
				if(tasks[i].deadLine!=null){
					currentTaskDeadLine = tasks[i].deadLine;
				}
                else{
                    currentTaskDeadLine = null;
                }
                if(tasks[i].lastDone!=null){
                    currentTaskDone = true;
                }
                else{
                    currentTaskDone = false;
                }
			}
        }

		$("#modalDetailsTitle").html(currentTaskName);
        if(currentTaskDeadLine!=null){
		    $("#modalDetailsDeadLine").html("A faire avant le "+currentTaskDeadLine);
        }
        else{
            $("#modalDetailsDeadLine").html("");
        }
		$("#modalDetailsCommentary").html(currentTaskComment);

		if(currentTaskDuration == "short"){
			$("#modalDetailsDuration").html("COURT");
			$("#modalDetailsDuration").css("background-color", myYellow);
		}
		else if(currentTaskDuration == "average"){
			$("#modalDetailsDuration").html("LONG");
			$("#modalDetailsDuration").css("background-color", myOrange);
		}
		else if(currentTaskDuration == "long"){
			$("#modalDetailsDuration").html("TRES LONG");
			$("#modalDetailsDuration").css("background-color", myRed);
		}

		if(currentTaskImportance == "low"){
			$("#modalDetailsImportance").html("PEU IMPORTANT");
			$("#modalDetailsImportance").css("background-color", myYellow);
		}
		else if(currentTaskImportance == "average"){
			$("#modalDetailsImportance").html("IMPORTANT");
			$("#modalDetailsImportance").css("background-color", myOrange);
		}
		else if(currentTaskImportance == "high"){
			$("#modalDetailsImportance").html("TRES IMPORTANT");
			$("#modalDetailsImportance").css("background-color", myRed);
		}

        if(currentTaskDone && currentTaskProject != null){
            $("#validateTask").hide();
            $("#modifyTask").hide();
        }
    });
}

$("#validateTask").click(function() {//Quand je clique sur le bouton valider d'une tache

	$("#modalDetails").hide();
    doneTodayNoRefresh ++;
    taskTodayChart(tasks);
	var taskName = taskClicked.find(".taskColoredText").html();
    if(currentTaskProject == null){
                $("#"+taskClicked.attr('id')).remove();       
    }
    //Je modifie ma DB en conséquence
	$.ajax({
        type: "POST",
        url: "/todolist/php/tasksDbValidate.php",
        data: {task:taskName,lastDone:todaysDate},
        success: function(){
            if(currentTaskProject != null){
                loadProjectDb(currentTaskProject);
            }
         },
        error: function(err) {
        	if(err.responseText!=""){
        		alert(err.responseText);
            }
        }
    });
});

$("#modifyTask").click(function() {//Quand je clique sur le bouton modifier d'une tache
    if($("#modalWeekDayTask").css("display") == "block"){
       $("#modalWeekDayTask").hide(); 
    }
    $("#taskModal").show();
    $("#modalDetails").hide();
    $("#taskForm").trigger("reset");
    $("#taskModalTitle").html("Modifier");
    $("#submitButtonTask").html("MODIFIER");
    $("#formTaskName").val(currentTaskName);
    $( "#formTaskDeadLine" ).flatpickr({disableMobile:true,defaultDate:currentTaskDeadLine,altInput:'true', altFormat:'j F Y',locale:"fr",weekNumbers: true});
    $("#formTaskDeadLine").val(currentTaskDeadLine);
    $("#formTaskDelay").val(currentTaskDelay);
    $("#idCheck").val(currentTaskId);
    $("#formTaskComment").val(currentTaskComment);
    $('#taskModalProject option[value="'+currentTaskProject+'"]').attr("selected",true);
    $('#taskModalProjectStage option[value='+currentTaskProjectStage+']').attr("selected",true);
    if(currentTaskRecurrence == "yes"){
        $("#recurrenceSwitch").attr("checked", true);
        $("#frequency").show();


    }
    else{
        $("#recurrenceSwitch").removeAttr("checked");
        $("#frequency").hide();
    }

    if(currentTaskDuration == "short"){
        $("#duration1").attr("checked", true);
        $("#duration2").removeAttr("checked");
        $("#duration3").removeAttr("checked");

    }
    else if(currentTaskDuration == "average"){
        $("#duration2").attr("checked", true);
        $("#duration1").removeAttr("checked");
        $("#duration3").removeAttr("checked");
    }
    else{
        $("#duration3").attr("checked", true);
        $("#duration1").removeAttr("checked");
        $("#duration2").removeAttr("checked");
    } 

    if(currentTaskImportance == "low"){
        $("#importance1").attr("checked", true);
        $("#importance2").removeAttr("checked");
        $("#importance3").removeAttr("checked");

    }
    else if(currentTaskImportance == "average"){
        $("#importance2").attr("checked", true);
        $("#importance1").removeAttr("checked");
        $("#importance3").removeAttr("checked");
    }
    else{
        $("#importance3").attr("checked", true);
        $("#importance1").removeAttr("checked");
        $("#importance2").removeAttr("checked");
    }   
});

$("#modalDetails").click(function(e) {// Ferme le modal si il est affiché et que je clique en dehors
	if(($("#modalDetails").css("display") == "block") && (e.target == this)){
    	
    	$("#modalDetails").hide();
	}
});

$("#modalWeekDayTask").click(function(e) {// Ferme le modal si il est affiché et que je clique en dehors
    if(($("#modalWeekDayTask").css("display") == "block") && (e.target == this)){
        
        $("#modalWeekDayTask").hide();
    }
});


//Quand je clique sur un bouton taches d'un jour de semaine(bloc droite)
$(document).ready ( function () {
    $(document).on ("click", ".weekDayTasks", function (e) {
        var dayClicked = this.id.slice(8);
        var weekDayList = [];
        $("#weekDayTasksTitle").html($("#day"+[dayClicked]).html());
        for(i=0; i<tasks.length;i++){
            //Calcule l'écart entre aujourd'hui et la deadline de chaque tache, l'inscrit dans un tableau
            actualDelayTask[i] = calculateDelay(today, tasks[i].deadLine);

            if(actualDelayTask[i] == dayClicked){
                weekDayList +=`<li class='task' id='task`+ i +`'>
                                    <p class='taskLogo' id='taskLogo`+ i +`'></p>
                                    <div class='taskText' title='` + tasks[i].name+ `' id='taskText` + i + `'>
                                        <p class='taskColoredText'  id='taskColoredText` + i + `'>` + tasks[i].name+ `</p>
                                        <p class='taskDeadLine'>` + formatDate(tasks[i].deadLine) + `</p>
                                    </div>
                                </li>`;  
            }
        }
        if (weekDayList.length != 0){
            $("#modalWeekDayTask").show();
        }
        $("#weekDayTasksList").html(weekDayList);

        for(i=0; i<tasks.length;i++){
            taskColor(i, tasks[i].importance, tasks[i].duration);
        }
    });
});

$(document).ready ( function () {
    $(document).on ("click", ".weekDayRdv", function (e) {
        var dayClicked = this.id.slice(6);
        var weekDayList = [];
        $("#weekDayRdvTitle").html($("#day"+[dayClicked]).html());
        for(i=0; i<rdv.length;i++){
            //Calcule l'écart entre aujourd'hui et la deadline de chaque tache, l'inscrit dans un tableau
            actualDelayRdv[i] = calculateDelay(today, rdv[i].rdvDate);
            if(actualDelayRdv[i] == dayClicked){
                weekDayList +=`<li class='rdv' id='rdv`+ i +`'>
                                    <div class='rdvText' title='` + rdv[i].name+ `' id='rdvText` + i + `'>
                                        <p class='rdvColoredText'  id='rdvColoredText` + i + `'>` + rdv[i].name+ `</p>
                                        <p class='rdvDeadLine'>` + formatDate(rdv[i].rdvDate) + `</p>
                                    </div>
                                </li>`;            
            }
        }
        if (weekDayList.length != 0){
            $("#modalWeekDayRdv").show();
        }
        $("#weekDayRdvList").html(weekDayList);
    });
});

$("#modalWeekDayRdv").click(function(e) {// Ferme le modal si il est affiché et que je clique en dehors
    if(($("#modalWeekDayRdv").css("display") == "block") && (e.target == this)){
        
        $("#modalWeekDayRdv").hide();
    }
});