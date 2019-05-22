var donutCtx = $("#donutChart");
var monthCtx = $("#lineChartMonth");
var doneTodayNoRefresh = 0;
var monthChartLabels = [];
donutCtx.height= "300px";

if($("#donutChart").length>0){//Si je suis sur la page ou se trouve le graphique donut
	//Je crée mon graphique donut
	var myDoughnutChart = new Chart(donutCtx, {
	    type: 'doughnut',
	    data: {
		    datasets: [{
		        data: [],
				backgroundColor: [
	                'rgb(46, 204, 113)',
	                'rgb(255, 99, 132)'
	            ]
		    }],
		    labels: ["Fait", "A faire"],
		},
		options: {
			cutoutPercentage : 66,
			responsive: true,
	    	maintainAspectRatio: false,
	    	legend: {
	            display:false
	        }
		}
	});
	//Je récupère les données de ma DB et j'update le graphique
	$.ajax({
	    type: "GET",
	    url: "/todolist/php/tasksDb.php",
	    dataType: "JSON",
	    success:function(xhr){
	    	taskTodayChart(xhr);
	    }
	});
}

if($("#lineChartMonth").length>0){//Si je suis sur la page ou se trouve le graphique ligne
	//Je crée mon graphique ligne
	var lineChartMonth = new Chart(monthCtx, {
		type: 'line',
		data: {
			labels: [],
			datasets :[{
				data:[],
				label:"Fait",
				borderColor: "#3e95cd",
	        	fill: false,
	        	yAxisID: 'left-y-axis'
			}, {
				data:[],
				label:"Taches en retard",
				borderColor: "#3cba9f",
	        	fill: false,
	        	yAxisID: 'left-y-axis'
			}, {
				data:[],
				label:"Retard Cumulé",
				borderColor: "#9caa9f",
	        	fill: false,
	        	yAxisID: 'right-y-axis'
			}
			]

		},
		options : {
			responsive:true,
			elements: {
	            line: {
	                tension: 0.14, // disables bezier curves
	            }
	        },
	        scales: {
	            yAxes: [{
	                id: 'left-y-axis',
	                type: 'linear',
	                position: 'left'
	            }, {
	                id: 'right-y-axis',
	                type: 'linear',
	                position: 'right'
	            }]
	        }
		}

	});
	//Je récupère les données de ma DB et j'update le graphique
	$.ajax({
	    type: "GET",
	    url: "/todolist/php/statsDb.php",
	    dataType: "JSON",
	    success:function(xhr){
	    	taskMonthChart(xhr.slice(-30));//Je ne prends que les 30 dernieres lignes du tableau(30 derniers jours)
	    	statsScreenDisplay(xhr.slice(-30));
	    }
	});
}






function taskTodayChart(tasks){//Attribue les données de ma DB aux tableaux correspondants pour tracer mon graph
	var toDoTodayCounter = 0;
	var doneTodayCounter = doneTodayNoRefresh;
	for(i=0;i<tasks.length;i++){
		if(tasks[i].deadLine<=todaysDate || isToday(tasks[i].lastDone)){
			toDoTodayCounter ++;
		}

		if(isToday(tasks[i].lastDone)){
			doneTodayCounter ++;
		}
	}
	var notDoneTodayCounter = toDoTodayCounter - doneTodayCounter;
	if (notDoneTodayCounter < 0){
		notDoneTodayCounter = 0;
	}
   	if($("#donutChart").length>0){
   		myDoughnutChart.data.datasets[0].data = [doneTodayCounter,notDoneTodayCounter];
   		myDoughnutChart.update();
   	}
}



function taskMonthChart(stats){//Attribue les données de ma DB aux tableaux correspondants pour tracer mon graph
	for(i=0;i<stats.length;i++){
		lineChartMonth.data.labels[i] = getDayFromDate(stats[i].stamp);
		lineChartMonth.data.datasets[0].data[i] = stats[i].countDoneTasks;
		lineChartMonth.data.datasets[1].data[i] = stats[i].countLateTasks;
		lineChartMonth.data.datasets[2].data[i] = stats[i].daysLate;
	}
	if($("#lineChartMonth").length>0){
		lineChartMonth.update();
	}
}

function statsScreenDisplay(stats){
	var done = 0;
	var late = 0;
	for(i=0;i<stats.length;i++){
		done += +stats[i].countDoneTasks;
		late += +stats[i].countLateTasks;
	}
	done = Math.round(done/stats.length);
	late = Math.round(late/stats.length);
	console.log(done, late);
	$("#doneStats").html(done);
	$("#lateStats").html(late);
}



function getDayFromDate(date){
	date = date.slice(0,10);
	date = date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3');
	return date;
}