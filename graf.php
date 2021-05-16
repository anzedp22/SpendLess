<?php
require 'database/config.php';
?>

<!DOCTYPE html>
<html>
<head>
<title> SpendLess </title>
<link rel="stylesheet" href="css/style.css">
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="JS_prikaz_nakupov.js"></script>
    
</head>
<body style="background-image: url('gradient-nov-05.png');" onload="start()">
    <center><h2 style="color: white; font-size: 40px;"> SpendLess </h2></center>
	   <div id="main_page">
           <div class="upper_buttons">
                    <center>
                        <button id="Seznam" name="seznam_button" type="submit">Seznam</button>
                        <button id="Graf" name="graf_button" type="submit">Graf</button><br>
                    </center>
           </div>
           <div id="piechart" style="width: 600px; height: 400px; padding-left: 100px; padding-top: 20px;">
           </div>
	   </div>
    
       <div id="myList" class="header" onload="prikazi_vse_vsote()">
        <h2 id="seznam_naslov"><center>Poraba</center></h2>
        <center><table id="tabela1"></table></center>
        <div id="odgovor"></div>
    
       </div>
    
    
        <div id="myList" class="header">
        <h2 id="seznam_naslov"><center>Seznam</center></h2>
        <center><table id="tabela"></table></center>
        <div id="odgovor"></div>
        </div>
    
    <script src="main1.js"></script>
</body>
</html>