<?php
$DEBUG = true;							

header('Content-Type: application/json');	
header('Access-Control-Allow-Origin: *');	
header('Access-Control-Allow-Methods: GET, POST, DELETE');		

switch($_SERVER["REQUEST_METHOD"])
{
	case 'GET':
        pridobi_nakupe();
        break;
        
    case 'GET1':
        pridobi_vsoto();
        break;

	case 'POST':
		  dodaj_nakup($_POST["ponudnik"], $_POST["datum"], $_POST["cena"], $_POST["ID_kategorije"]);
		break;
		
	case 'DELETE':
        izbrisi_nakup($_GET["ID_nakupa"]);
        breaky;
		
	default:
		http_response_code(405);
		break;
}

function pridobi_nakupe()
{
    include('config.php');
    
    $odgovor=array();
    
    $poizvedba = $con->prepare("SELECT ID_nakupa, ponudnik, datum, cena from nakupi order by ID_nakupa desc");
    
    $poizvedba -> execute();
    $poizvedba -> bind_result($ID_nakupa, $ponudnik, $datum, $cena);
    
    while($poizvedba -> fetch()){
        $newDate = date("d/m/Y", strtotime($datum));
        
        $temp = array();
        
        $temp['ID_nakupa'] = $ID_nakupa;
        $temp['ponudnik'] = $ponudnik;
        $temp['datum'] = $newDate;
        $temp['cena'] = $cena;
        
        array_push($odgovor,$temp);
    }
    
    http_response_code(200);
    echo json_encode($odgovor);
}

function pridobi_vsoto()
{
    
    include('config.php');
    
    $odgovor=array();
    
    $sql = $con->prepare("SELECT ID_kategorije, SUM(cena) FROM nakupi GROUP BY ID_kategorije");
    $sql -> execute();
    $sql -> bind_result($ID_kategorije, $SUM_cena);
    while($sql -> fetch()){
        $SUM_cena_round = number_format((float)$SUM_cena,2,'.','');
        
        $temp = array();
        
        $temp['ID_kategorije'] = $ID_kategorije;
        $temp['SUM(cena)'] = $SUM_cena_round;
        
        array_push($odgovor, $temp);
        
    }
    http_response_code(200);
    echo json_encode($odgovor);
    
}

function dodaj_nakup($ponudnik, $datum, $cena, $ID_kategorije)
{
    include('config.php');
     
    $query="INSERT INTO nakupi(ponudnik,datum,cena,ID_kategorije) VALUES('$ponudnik', '$datum', '$cena', '$ID_kategorije')";
    $query_run=mysqli_query($con,$query);
    
    if($query_run)
        {
            http_response_code(201);            
        }
        else{
            http_response_code(500);
        }  

}

function izbrisi_nakup($id_nakupa)
{
    include('config.php');
    
    $ID_nakupa = $id_nakupa;

    $del = mysqli_query($con, "delete from nakupi where ID_nakupa = '$ID_nakupa'");

    if($del){
        mysqli_close($con);
        header("location:index.php");
        http_response_code(204);
        exit;
    }
    else{
        http_response_code(500);
    }
    
}

?>