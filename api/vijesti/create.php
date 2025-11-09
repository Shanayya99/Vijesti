<?php
session_start();
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

require __DIR__ . '/../../db.php'; 


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if(!isset($_SESSION['user_id'])){
    http_response_code(401); 
    echo json_encode(["success" => false, "message" => "Korisnik nije prijavljen"]);
    exit();
}

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405); 
    echo json_encode(["success" => false, "message" => "Neispravan request method"]);
    exit();
}
if(!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin'){
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Korisnik nije prijavljen ili nije administrator."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$naslov = $data['naslov'] ?? '';
$deskripcija = $data['deskripcija'] ?? '';
$img = $data['img'] ?? '';

if(!$naslov || !$deskripcija || !$img){
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "message" => "Naslov, deskripcija i slika su obavezni"]);
    exit();
}


$stmt = $conn->prepare("INSERT INTO novosti (naslov, deskripcija, img) VALUES (?, ?, ?)");
if(!$stmt){
    http_response_code(500); 
    echo json_encode(["success" => false, "message" => "Greška u pripremi upita: " . $conn->error]);
    exit();
}
$stmt->bind_param("sss", $naslov, $deskripcija, $img);

if($stmt->execute()){
    http_response_code(201); // Created
    echo json_encode(["success" => true, "message" => "Novost uspješno dodana."]); 
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Greška prilikom dodavanja novosti: " . $stmt->error]);
}
?>