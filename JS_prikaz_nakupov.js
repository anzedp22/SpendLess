
function prikazi_vse_nakupe(){
	
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			try{
				var odgovorJSON = JSON.parse(this.responseText);
			}
			catch(e){
				console.log("Napaka pri razčlenjevanju podatkov");
				return;
			}
			prikazi_tabelo(odgovorJSON);
		}
		if(this.readyState == 4 && this.status != 200)
		{
			document.getElementById("odgovor").innerHTML = "Ni uspelo: " + this.status;
		}
	};
	 
	httpRequest.open("GET", "/SpendLess/API.php", true);
	httpRequest.send();
}

function prikazi_tabelo(odgovorJSON){
	var fragment = document.createDocumentFragment();
	
	for (var i=0; i<odgovorJSON.length; i++) {
		var tr = document.createElement("tr");	
		
			var td = document.createElement("td");
			td.innerHTML=odgovorJSON[i]["ponudnik"];
			tr.appendChild(td);
			
			var td = document.createElement("td");
			td.innerHTML=odgovorJSON[i]["datum"];
			tr.appendChild(td);
			
			var td = document.createElement("td");
			td.innerHTML=odgovorJSON[i]["cena"];
			tr.appendChild(td);
		
			var id_nakupa  = odgovorJSON[i]["ID_nakupa"];
			//window.alert(id_nakupa);
		
			var td_kos = document.createElement("td");
			//td_kos.innerHTML='<form onsubmit=izbris_nakupa('id_nakupa')><a class="Delete_butt" name="delete_button" href="API.php?ID_nakupa='+id_nakupa+'"> <img id="trash-can" src="images/trash-can1.png" ></a></form>';
			td_kos.innerHTML='<a id="delete_gumb" onclick="izbris_nakupa('+id_nakupa+')" class="Delete_butt" name="delete_button" > <img id="trash-can" src="images/trash-can1.png" ></a>';
			
			tr.appendChild(td_kos);	
		
		fragment.appendChild(tr);
	}
	
	document.getElementById("tabela").innerHTML="<tr><th>Ponudnik</th><th>Datum</th><th>Cena[€]</th><th></th></tr>";
	document.getElementById("tabela").appendChild(fragment);
	return id_nakupa;
}

function izbris_nakupa(id_nakupa){
	//window.alert(id_nakupa);
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 204)
		{
			prikazi_vse_nakupe();
		}
		if(this.readyState == 4 && this.status != 204)
		{
			document.getElementById("odgovor").innerHTML="Nakupa ni bilo mogoče izbrisati"+this.status;
		}
	};
	//window.alert(id_nakupa); 
	httpRequest.open("DELETE", "/SpendLess/API.php?ID_nakupa="+id_nakupa, true);
	httpRequest.send();
	
}
	
const formToJSON = elements => [].reduce.call(elements, (data, element) => 
{
	if(element.name!="")
	{
		data[element.name] = element.value;
	}
  return data;
}, {});
 
function dodaj_nakup()
{
	const data = formToJSON(document.getElementById("obrazec").elements);
	var JSONdata = JSON.stringify(data, null, "  ");	
    
    var ponudnik = document.getElementById("ponudnik").value;
    var datum = document.getElementById("datum").value;
    var cena = document.getElementById("cena").value;
    
	var ID = document.forms[0];
	var ID_kategorije = "";
	var i;
	for (i = 0; i < ID.length; i++) {
    if (ID[i].checked) {
		ID_kategorije = ID_kategorije + ID[i].value + " ";
		//window.alert(ID_kategorije);
	}
	}
	
	var podatki = new FormData();
	
	podatki.append("ponudnik", ponudnik);
	podatki.append("datum", datum);
	podatki.append("cena", cena);
	podatki.append("ID_kategorije", ID_kategorije);
    
    /*window.alert(ponudnik);
    window.alert(datum);
    window.alert(cena);
    window.alert(ID_kategorije);*/
    //window.alert(podatki);
	
	var xmlhttp = new XMLHttpRequest();										// ustvarimo HTTP zahtevo
	 
	xmlhttp.onreadystatechange = function()									// določimo odziv v primeru različnih razpletov komunikacije
	{
		if (this.readyState == 4 && this.status == 201)						// zahteva je bila uspešno poslana, prišel je odgovor 201
		{
			prikazi_vse_nakupe();
		}
		if(this.readyState == 4 && this.status != 201)						// zahteva je bila uspešno poslana, prišel je odgovor, ki ni 201
		{
			document.getElementById("odgovor").innerHTML="Dodajanje ni uspelo: "+this.status;
		}
	};
	
	//window.alert(JSONdata);
	 if(ID_kategorije==0)
	 {
		window.alert("Izberi kategorijo!");
	 }
	 else
	 {
		//xmlhttp.open("POST", "/SpendLess/API.php?ponudnik="+ponudnik+"&datum="+datum+"&cena="+cena+"&ID_kategorije="+ID_kategorije, true);
		xmlhttp.open("POST", "/SpendLess/API.php", true);		
		//xmlhttp.send(JSONdata);	
		xmlhttp.send(podatki);
		
	 }
    
}

function prikazi_vse_vsote(){
	
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			try{
				var odgovorJSON1 = JSON.parse(this.responseText);
				//window.alert(odgovorJSON1);
			}
			catch(e){
				console.log("Napaka pri razčlenjevanju podatkov");
				console.log(odgovorJSON1);
				return;
			}
			prikazi_vsoto(odgovorJSON1);
			narisi_graf(odgovorJSON1);
		}
		if(this.readyState == 4 && this.status != 200)
		{
			document.getElementById("odgovor").innerHTML = "Ni uspelo: " + this.status;
		}
	};
	 
	httpRequest.open("GET1", "/SpendLess/API.php", true);
	httpRequest.send();
	
}

function prikazi_vsoto(odgovorJSON1)
{
	
	var fragment = document.createDocumentFragment();
	
	for (var i=0; i<odgovorJSON1.length; i++) {
		var tr = document.createElement("tr");	
		
			var ID_kat = odgovorJSON1[i]["ID_kategorije"];
			
			if (ID_kat == 1){
				var ID_kat = "Hrana";
			}
			else if (ID_kat == 2){
				var ID_kat = "Pijača";
			}
			else if (ID_kat == 3){
				var ID_kat = "Živila";
			}
			else if (ID_kat == 4){
				var ID_kat = "Oblačila";
			}
			else if (ID_kat == 5){
				var ID_kat = "Prevoz";
			}
			else if (ID_kat == 6){
				var ID_kat = "Zabava";
			}
			else if (ID_kat == 7){
				var ID_kat = "Darila";
			}
			else {
				var ID_kat = "Ostalo";
			}
			
			//window.alert(ID_kat);
			
			var td = document.createElement("td");
			td.innerHTML=ID_kat;
			tr.appendChild(td);
			
			var td = document.createElement("td");
			td.innerHTML=odgovorJSON1[i]["SUM(cena)"];
			tr.appendChild(td);
			
			//window.alert(odgovorJSON1[i]["SUM(cena)"]);	
		
		fragment.appendChild(tr);
	
	}
	
	document.getElementById("tabela1").innerHTML="<tr><th>Kategorija</th><th>Poraba [€]</th></tr>";//pripravimo glavo tabele
	document.getElementById("tabela1").appendChild(fragment);	//fragment dodamo v tabelo
	
}

function narisi_graf(odgovorJSON1){
		
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		
		function drawChart() {
			
			var data = google.visualization.arrayToDataTable(podatki_za_graf(odgovorJSON1));
		  
			var options = {
			  width: '100%',
			  height: '100%',
			  title: 'Poraba',
			  titlePosition: 'none',
			  legendFontSize:30,
			  chartArea: {
				left: "3%",
				top: "3%",
				height: "94%",
				width: "94%"
				}
			  
			};

			var chart = new google.visualization.PieChart(document.getElementById('piechart'));

			chart.draw(data, options);
		
		}
		
}

function podatki_za_graf(odgovorJSON1){
	
	var table = [['kategorija', 'znesek']];
	
	for (var i=0; i<odgovorJSON1.length; i++) {
			  
		var ID_kat = odgovorJSON1[i]["ID_kategorije"];
			
			if (ID_kat == 1){
				var ID_kat = "Hrana";
			}
			else if (ID_kat == 2){
				var ID_kat = "Pijača";
			}
			else if (ID_kat == 3){
				var ID_kat = "Živila";
			}
			else if (ID_kat == 4){
				var ID_kat = "Oblačila";
			}
			else if (ID_kat == 5){
				var ID_kat = "Prevoz";
			}
			else if (ID_kat == 6){
				var ID_kat = "Zabava";
			}
			else if (ID_kat == 7){
				var ID_kat = "Darila";
			}
			else {
				var ID_kat = "Ostalo";
			}
					
			var string = odgovorJSON1[i]['SUM(cena)'];
			number = parseFloat(string);
			table.push([ID_kat, parseFloat(odgovorJSON1[i]['SUM(cena)'])]);
					  
	}
	
		
	//window.alert(table);
	//console.log(table);
	
	return table;
	
}

function start(){
        prikazi_vse_nakupe();
        prikazi_vse_vsote();
    }
	
	