<?php
require 'database/config.php';
$ID_kategorije="";
?>

<!DOCTYPE html>
<html>
<head>
<title> SpendLess </title>
<link rel="stylesheet" href="css/style.css">
<style>
</style>
<script src="JS_prikaz_nakupov.js"></script>
</head>
<body style="background-image: url('gradient-nov-05.png');" onload="prikazi_vse_nakupe()">
    <center><h2 style="color: white; font-size: 40px;"> SpendLess </h2></center>
    
	   <div id="main_page">
           <div class="upper_buttons">
                    <center>
                        <button id="Seznam" name="seznam_button" type="submit">Seznam</button>
                        <button id="Graf" name="graf_button" type="submit">Graf</button><br>
                    </center>
           </div>
           <form id="obrazec" onsubmit="dodaj_nakup(); return false;">
           <div class="inputs">
                <center>        
                    <input id="ponudnik" type="text" placeholder="Vnesite ponudnika" name="ponudnik" required>
                    <input id="datum" type="date" placeholder="Vnesite datum dd.mm.llll" name="datum" required>
					<input id="cena" type="float" placeholder="Vnesite ceno nakupa v €" name="cena" required><br>
                </center> 
           </div>
                <center><p id="Izberi">Izberi kategorijo:</p></center>
           
           <center>
               <div class="select_box">
                   <div class="options_container">
                       <div class="option">
                           <input type="radio" class="radio" id="Hrana" name="category" value="1"/>
                           <label for="Hrana"><div class="choose_style"><img id="Hrana_pic" src="images/hrana.png"/>  Hrana</div></label>
                       </div>
                       <div class="option">
                           <input type="radio" class="radio" id="Pijača" name="category" value="2"/>
                           <label for="Pijača"><div class="choose_style"><img id="Pijača_pic" src="images/drink.png"/>  Pijača</div></label>
                       </div>
                       <div class="option">
                           <input type="radio" class="radio" id="Živila" name="category" value="3"/>
                           <label for="Živila"><div class="choose_style"><img id="Živila_pic" src="images/nakupi.png"/>  Živila</div></label>
                       </div>
                       <div class="option">
                           <input type="radio" class="radio" id="Oblačila" name="category" value="4"/>
                           <label for="Oblačila"><div class="choose_style"><img id="Oblačila_pic" src="images/oblacila.png"/>  Oblačila</div></label>
                       </div>
                       <div class="option">
                           <input type="radio" class="radio" id="Prevoz" name="category" value="5"/>
                           <label for="Prevoz"><div class="choose_style"><img id="Prevoz_pic" src="images/avto.png"/>  Prevoz</div></label>
                       </div>
                       <div class="option">
                           <input type="radio" class="radio" id="Zabava" name="category" value="6"/>
                           <label for="Zabava"><div class="choose_style"><img id="Zabava_pic" src="images/party.png"/>  Zabava</div></label>
                       </div>
                       <div class="option">
                           <input type="radio" class="radio" id="Darila" name="category" value="7"/>
                           <label for="Darila"><div class="choose_style"><img id="Darila_pic" src="images/darila.png"/>  Darila</div></label>
                       </div>
                       <div class="option">
                           <input type="radio" class="radio" id="Ostalo" name="category" value="8"/>
                           <label for="Ostalo"><div class="choose_style"><img id="Ostalo_pic" src="images/ostalo3.png"/>  Ostalo</div></label>
                       </div>
                   </div>
                   <div class="selected">
                       Izberi kategorijo:
                   </div>
               </div>   
           </center>

           <div class="lower_buttons">
                    <center>
                        <button id="Dodaj"  type="submit">Dodaj</button><br>
                    </center>
           </div>
           </form>
	   </div>
    
    <div id="myList" class="header">
    <h2 id="seznam_naslov"><center>Seznam</center></h2>
    <center><table id="tabela"></table></center>
    <div id="odgovor"></div>
    </div>
    
    <script src="main.js"></script>
</body>
</html>