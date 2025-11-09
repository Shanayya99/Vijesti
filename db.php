<?php
$host = "localhost";  
$user = "root";       
$pass = "";          
$dbname = "vijesti";  

$conn = new mysqli($host, $user, $pass, $dbname);

if($conn->connect_error){
    die(json_encode(["error" => "Konekcija nije uspjela: ".$conn->connect_error]));
}
?>
