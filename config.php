<?php

    $con = mysqli_connect("localhost", "root", "", "spendless_db") OR die("cannot connect");
    mysqli_select_db($con, 'spendless_db');

    if (mysqli_connect_errno())
    {
	   printf("Povezovanje s podatkovnim strežnikom ni uspelo: %s\n", mysqli_connect_error());
	   exit();
    } 	
    return $con;

?>