var freezerData;
var freezerList="";
var freezerCategory="";
$("#searchFreezerForm input").val('');

$.ajax({
    type: "GET",
    url: "../php/freezerDb.php",
    dataType: "JSON",
    success:function(xhr){
        freezerData = xhr;
        favoriteFreezerModal();
    },
    error:function(result){
    	console.log(result);
    }
});

//Au clic sur n'importe quel bouton de catégories
$(".searchFreezerButton").click(function() {
	$('#searchFreezerTableContainer').css('display', 'flex');
	$('#searchFreezerTableTitle').html($(this).html());
	$('#searchFreezerCtn').hide();
	$('#addFreezer').hide();
	freezerList = "";
	$('.searchFreezerTableRow').html("");
});

$("#searchFreezerMeat").click(function() {
	if(freezerData != undefined){
		for(i=0;i<freezerData.meatStock.length;i++){
			freezerList+="<tr class='searchFreezerTableRow' id='freezerTableRowId"+freezerData.meatStock[i].idStock+"'><td>"+freezerData.meatStock[i].name+"</td><td><span>"+freezerData.meatStock[i].quantity+"</span> "+freezerData.meatStock[i].unit+"</td><td>"+freezerData.meatStock[i].place+"</td><td>"+formatDate(freezerData.meatStock[i].dateAdded)+"</td><td class='freezerTableBtns' id='freezerTableBtns"+i+"'><button class='freezerModify'>MODIFIER</button><button class='freezerWithdraw'>DÉCONGELER</button><button type='button' class='modifyFreezerBackBtn'>RETOUR</button><button type='submit' class='modifyFreezerValBtn'>MODIFIER</button></td></tr>";
		}
	}
	$('#searchFreezerTable').append(freezerList);
});

$("#searchFreezerVegs").click(function() {
	if(freezerData != undefined){
		for(i=0;i<freezerData.vegsStock.length;i++){
			freezerList+="<tr class='searchFreezerTableRow' id='freezerTableRowId"+freezerData.vegsStock[i].idStock+"'><td>"+freezerData.vegsStock[i].name+"</td><td><span>"+freezerData.vegsStock[i].quantity+"</span> "+freezerData.vegsStock[i].unit+"</td><td>"+freezerData.vegsStock[i].place+"</td><td>"+formatDate(freezerData.vegsStock[i].dateAdded)+"</td><td class='freezerTableBtns' id='freezerTableBtns"+i+"'><button class='freezerModify'>MODIFIER</button><button class='freezerWithdraw'>DÉCONGELER</button><button type='button' class='modifyFreezerBackBtn'>RETOUR</button><button type='submit' class='modifyFreezerValBtn'>MODIFIER</button></td></tr>";
		}
	}
	$('#searchFreezerTable').append(freezerList);
});

$("#searchFreezerMeal").click(function() {
	if(freezerData != undefined){
		for(i=0;i<freezerData.mealStock.length;i++){
			freezerList+="<tr class='searchFreezerTableRow' id='freezerTableRowId"+freezerData.mealStock[i].idStock+"'><td>"+freezerData.mealStock[i].name+"</td><td><span>"+freezerData.mealStock[i].quantity+"</span> "+freezerData.mealStock[i].unit+"</td><td>"+freezerData.mealStock[i].place+"</td><td>"+formatDate(freezerData.mealStock[i].dateAdded)+"</td><td class='freezerTableBtns' id='freezerTableBtns"+i+"'><button  class='freezerModify'>MODIFIER</button><button class='freezerWithdraw'>DÉCONGELER</button><button type='button' class='modifyFreezerBackBtn'>RETOUR</button><button type='submit' class='modifyFreezerValBtn'>MODIFIER</button></td></tr>";
		}
	}
	$('#searchFreezerTable').append(freezerList);
});

$("#searchFreezerSugary").click(function() {
	if(freezerData != undefined){
		for(i=0;i<freezerData.sugaryStock.length;i++){
			freezerList+="<tr class='searchFreezerTableRow' id='freezerTableRowId"+freezerData.sugaryStock[i].idStock+"'><td>"+freezerData.sugaryStock[i].name+"</td><td><span>"+freezerData.sugaryStock[i].quantity+"</span> "+freezerData.sugaryStock[i].unit+"</td><td>"+freezerData.sugaryStock[i].place+"</td><td>"+formatDate(freezerData.sugaryStock[i].dateAdded)+"</td><td class='freezerTableBtns' id='freezerTableBtns"+i+"'><button  class='freezerModify'>MODIFIER</button><button class='freezerWithdraw'>DÉCONGELER</button><button type='button' class='modifyFreezerBackBtn'>RETOUR</button><button type='submit' class='modifyFreezerValBtn'>MODIFIER</button></td></tr>";
		}
	}
	$('#searchFreezerTable').append(freezerList);
});

$("#searchFreezerOther").click(function() {
	if(freezerData != undefined){
		for(i=0;i<freezerData.otherStock.length;i++){
			freezerList+="<tr class='searchFreezerTableRow' id='freezerTableRowId"+freezerData.otherStock[i].idStock+"'><td>"+freezerData.otherStock[i].name+"</td><td><span>"+freezerData.otherStock[i].quantity+"</span> "+freezerData.otherStock[i].unit+"</td><td>"+freezerData.otherStock[i].place+"</td><td>"+formatDate(freezerData.otherStock[i].dateAdded)+"</td><td class='freezerTableBtns' id='freezerTableBtns"+i+"'><button  class='freezerModify'>MODIFIER</button><button class='freezerWithdraw'>DÉCONGELER</button><button type='button' class='modifyFreezerBackBtn'>RETOUR</button><button type='submit' class='modifyFreezerValBtn'>MODIFIER</button></td></tr>";
		}
	}
	$('#searchFreezerTable').append(freezerList);
});


//Si j'utilise la recherche
$("#submitButtonSearchFreezer").click(function() {
	freezerList = "";
	$('#searchFreezerTableContainer').css('display', 'flex');
	$('#searchFreezerTableTitle').html($(this).html());
	$('#searchFreezerCtn').hide();
	$('#addFreezer').hide();
	$('.searchFreezerTableRow').html("");
			for(i=5;i<10;i++){// i va de 5 à 9 car mon stock se trouve dans les objets 5 à 9 de mon objet freezerData(0 à 4 sont la "library")
				tempCat = Object.keys(freezerData)[i];//Object.keys récupère le nom de l'objet dans la liste d'objets freezerData
				for(j in freezerData[tempCat]){//Les 2 boucles permettent de parcourir l'intégralité de mon congel
					if(freezerData[tempCat][j].name.toUpperCase().includes($("#searchFreezerForm input").val().toUpperCase())){
						freezerList+="<tr class='searchFreezerTableRow' id='freezerTableRowId"+freezerData[tempCat][j].idStock+"'><td>"+freezerData[tempCat][j].name+"</td><td><span>"+freezerData[tempCat][j].quantity+"</span> "+freezerData[tempCat][j].unit+"</td><td>"+freezerData[tempCat][j].place+"</td><td>"+formatDate(freezerData[tempCat][j].dateAdded)+"</td><td class='freezerTableBtns' id='freezerTableBtns"+i+"'><button  class='freezerModify'>MODIFIER</button><button class='freezerWithdraw'>DÉCONGELER</button><button type='button' class='modifyFreezerBackBtn'>RETOUR</button><button type='submit' class='modifyFreezerValBtn'>MODIFIER</button></td></tr>";
					}

				}
			}
	$('#searchFreezerTable').append(freezerList);
});


$("#searchFreezerBackBtn").click(function() {
	$('#searchFreezerTableContainer').hide();
	$('#searchFreezerCtn').show();
	$('#addFreezer').show();
	$("#searchFreezerForm input").val('');
	$('#tbodySearchFreezer').html("");
});


$(document).ready ( function () {
    $(document).on ("click", ".freezerModify", function (e) {
    	$(".freezerModify").attr("disabled",true);
    	var tempRow = e.target.closest("tr");
    	var tempRowBtns = "freezerTableBtns"+(tempRow.rowIndex - 1);
		var tempQty = tempRow.cells[1].children[0].innerHTML;
		var tempPlace = tempRow.cells[2].innerHTML;
		tempRow.cells[1].children[0].innerHTML="<input type='text' id='tempfreezerQty' name='qty' value='"+tempQty+"'>";
		switch(tempPlace){
			case "cuisine":
				tempRow.cells[2].innerHTML='<select id="tempfreezerPlace"name="place"><option selected value="cuisine">Cuisine</option><option value="boxGarage">Box Garage</option><option value="frigoGarage">Frigo Garage</option></select>';
					break;
			case "boxGarage":
				tempRow.cells[2].innerHTML='<select id="tempfreezerPlace"name="place"><option value="cuisine">Cuisine</option><option selected value="boxGarage">Box Garage</option><option value="frigoGarage">Frigo Garage</option></select>';
					break;
			case "frigoGarage":
				tempRow.cells[2].innerHTML='<select id="tempfreezerPlace"name="place"><option value="cuisine">Cuisine</option><option value="boxGarage">Box Garage</option><option selected value="frigoGarage">Frigo Garage</option></select>';
					break;
		}
		$(tempRow).css('background-color', '#f5b7b1');
		$("#"+tempRowBtns+" .modifyFreezerBackBtn").show();
		$("#"+tempRowBtns+" .modifyFreezerValBtn").show();
		$("#"+tempRowBtns+" .freezerModify").hide();
		$("#"+tempRowBtns+" .freezerWithdraw").hide();
	});

	$(document).on ("click", ".modifyFreezerBackBtn", function (e) {
		var tempRow = e.target.closest("tr");
		var tempRowBtns = "freezerTableBtns"+(tempRow.rowIndex - 1);
		var tempQty = $("#tempfreezerQty").val();
		var tempPlace = $("#tempfreezerPlace").val();
		tempRow.cells[1].children[0].innerHTML=tempQty;
		tempRow.cells[2].innerHTML=tempPlace;
		$("#"+tempRowBtns+" .modifyFreezerBackBtn").hide();
		$("#"+tempRowBtns+" .modifyFreezerValBtn").hide();
		$("#"+tempRowBtns+" .freezerModify").show();
		$("#"+tempRowBtns+" .freezerWithdraw").show();
		$(".freezerModify").attr("disabled",false);
		recolorBack(tempRow);
	});

	$(document).on ("click", ".modifyFreezerValBtn", function (e) {
		var tempRow = e.target.closest("tr");
		var tempRowBtns = "freezerTableBtns"+(tempRow.rowIndex - 1);
		var tempName = tempRow.cells[0].innerHTML;
		var tempQty = $("#tempfreezerQty").val();
		var tempPlace = $("#tempfreezerPlace").val();
		var tempDate = tempRow.cells[3].innerHTML;
		var tempId = tempRow.id.slice(17); 
		$.ajax({
	        type: "POST",
	        url: "/todolist/php/freezerDbValidate.php",
	        data: {idStock:tempId,name:tempName,qty:tempQty,place:tempPlace,dateAdded:tempDate},
	        success: function(){
	         },
	        error: function(err) {
	        	if(err.responseText!=""){
	        		alert(err.responseText);
	            }
	        }
	    });
		tempRow.cells[1].children[0].innerHTML = tempRow.cells[1].children[0].children[0].value;
		tempRow.cells[2].innerHTML=tempPlace;
		$("#"+tempRowBtns+" .modifyFreezerBackBtn").hide();
		$("#"+tempRowBtns+" .modifyFreezerValBtn").hide();
		$("#"+tempRowBtns+" .freezerModify").show();
		$("#"+tempRowBtns+" .freezerWithdraw").show();
		$(".freezerModify").attr("disabled",false);
		recolorBack(tempRow);
 	});
});

$(document).ready ( function () {
    $(document).on ("click", ".freezerWithdraw", function (e) {
		var tempId = e.target.closest("tr").id.slice(17); 
		$.ajax({
	        type: "POST",
	        url: "/todolist/php/freezerDbValidate.php",
	        data: {idStock:tempId, delete:true},
	        success: function(){
	         },
	        error: function(err) {
	        	if(err.responseText!=""){
	        		alert(err.responseText);
	            }
	        }
	    });
	    e.target.closest("tr").remove();
 	});
});


function recolorBack(tempRow){
	console.log(tempRow.rowIndex);
	if (tempRow.rowIndex % 2 == 1){
		$(tempRow).css('background-color', 'white');
	}else{
		$(tempRow).css('background-color', '#f2f2f2');
	}
}
//////////////////MODAL////////////////////////



function favoriteFreezerModal(){
	for(i=0;i<5;i++){//5 cases préremplies en haut
		if(freezerData.freezerRec[i] != undefined){
			$("#freezerRecu"+(i+1)+" + label").html(freezerData.freezerRec[i].name);
		}
	}
}

$('#freezerFormQuantity').keyup(function() {
    $('#freezerQtyRecap').html($(this).val());
    displayRecap();
});

$('#freezerFormUnit').keyup(function() {
    $('#freezerUnitRecap').html($(this).val());
    displayRecap();
});
$('#freezerFormTextInput').keyup(function() {
	$('#freezerNameRecap').html($(this).val());
	$('#freezerFormUnit').prop('readonly', false);
	displayRecap();
});
$(document).ready ( function () {
    $(document).on ("click", ".freezerFormNameBtnInput", function (e) {//Clic sur un ingrédient
    	$('#freezerFormUnit').prop('readonly', true);
    	var tempIngredient;
    	var tempCat;
		$('#freezerNameRecap').html(e.target.innerHTML);//Affichage de l'ingrédient en bas
		
		if(freezerCategory == ""){//Si je sélectionne dans la catégorie du haut(favoris)
			for(i=0;i<Object.keys(freezerData).length;i++){
				tempCat = Object.keys(freezerData)[i];
				for(j in freezerData[tempCat]){
					if(e.target.innerHTML == freezerData[tempCat][j].name){
							tempIngredient = freezerData[tempCat][j];
					}
				}
			}
		}
		else{//Si je suis déjà dans une catégorie
			for(i=0;i<freezerData[freezerCategory].length;i++){
				if(e.target.innerHTML == freezerData[freezerCategory][i].name){
						tempIngredient = freezerData[freezerCategory][i];
				}
			}
		}
		console.log(tempIngredient);
		$(this).prev().val(tempIngredient.name);//Assigne la valeur (nom) à la checkbox pour transmettre a la DB
		$('#freezer0').removeProp("checked");
		$('#freezer1').removeProp("checked");
		$('#freezer2').removeProp("checked");
		$("#freezerFormUnit").val(tempIngredient.unit)
		$('#freezerUnitRecap').html(tempIngredient.unit);
		$('#freezerFormCategory').val(tempIngredient.category);
		displayRecap();
	});
});

$('input[name="place"]').change(function(){
	$('#freezerPlaceRecap').html($('input[name=place]:checked').val());
	displayRecap();
});


$(".freezerFormCatBtn").click(function() {//Si je clique sur une catégorie, affiche les éléments déjà présents
	$('#freezerFormNameSelection').css('display', 'flex');
	$('#freezerFormNameMenu').hide();
	var tempCat = $(this).attr("id").slice(11).toLowerCase();
	$('#freezerFormCategory').val(tempCat);
	freezerList = "";
	freezerCategory = tempCat;
	if(freezerData != undefined){
		displayTempCat(tempCat, 0, 5);
	}
});

function displayTempCat(tempCat, low, high){
	for(i in freezerData[tempCat]){
		if(i >= low && i<= high){
			freezerList+="<input type='radio' id='freezerName"+i+"' name='name'><label for='freezerName"+i+"' class='freezerFormNameBtnInput' id='freezerFormNameBtnInput"+i+"' title='"+freezerData[tempCat][i].name+"'>"+freezerData[tempCat][i].name+"</label>";
			if(freezerData[tempCat][i].name.length > 9){
				$('#freezerFormNameBtnInput'+i).css("font-size", "0.9em");
				console.log($('#freezerFormNameBtnInput'+i));
				console.log(i);
			}
		}
	}
	$('#freezerFormStoredNames').html(freezerList);
	for(i in freezerData[tempCat]){//Si le nom fait plus de 10 caractères, je réduis la taille du texte
		if(i >= low && i<= high && freezerData[tempCat][i].name.length > 9){
			$('#freezerFormNameBtnInput'+i).css("font-size", "1em");
		}
	}
}

$("#freezerFormPrevBtn").click(function() {
	var prevRow = parseInt($(this).parent().prev().children().first().attr("id").slice(11));
	if(prevRow>=6){
		$('#freezerFormStoredNames').html("");
		freezerList="";
		var newRow = prevRow-6;
		displayTempCat(freezerCategory, newRow, newRow+5);
	}
	
});
$("#freezerFormNextBtn").click(function() {
	var prevRow = parseInt($(this).parent().prev().children().first().attr("id").slice(11));
	var newRow = prevRow+6;
	if(newRow<freezerData[freezerCategory].length){
		$('#freezerFormStoredNames').html("");
		freezerList="";
		displayTempCat(freezerCategory, newRow, newRow+5);
	}
});

$("#freezerFormBackBtn").click(function() {
	$('#freezerFormNameMenu').show();
	$('#freezerFormNameSelection').hide();
	freezerCategory="";
	$('#freezerQtyRecap').html("");
    $('#freezerUnitRecap').html("");
    $('#freezerNameRecap').html("");
    $('#freezerPlaceRecap').html("");
    $('#freezer0').removeProp("checked");
	$('#freezer1').removeProp("checked");
	$('#freezer2').removeProp("checked");
	$("#freezerFormQuantity").val("");
	$("#freezerFormUnit").val("");

});

function displayRecap(){
	if($('#freezerQtyRecap').html() != "" && $('#freezerUnitRecap').html() != "" && $('#freezerNameRecap').html() != "" && $('#freezerPlaceRecap').html() != "" ){
		$('#freezerFormRecap').css ("display", "block");
		$('#freezerFormError').css ("display", "none");
	}
}

function validateFreezerForm(){
	if ($('#freezerFormRecap').css("display") != "block"){
		var errorDetails = "";
		$('#freezerFormError').css ("display", "block");
		if($('#freezerNameRecap').html() == ""){
			errorDetails += " ingrédient,";
		}
		if($('#freezerPlaceRecap').html() == ""){
			errorDetails += " emplacement,";
		}
		if($('#freezerQtyRecap').html() == ""){
			errorDetails += " quantité,";
		}
		if($('#freezerUnitRecap').html() == ""){
			errorDetails += " unité,";
		}
		$('#freezerFormErrorDetails').html(errorDetails.slice(0,-1));
		
		return false;
	}
}
