<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
require __DIR__ . '/../../db.php';

if(!isset($_SESSION['user_id'])){
    echo json_encode(["error" => "Korisnik nije prijavljen"]);
    exit();
}

if($_SERVER['REQUEST_METHOD'] !== 'PUT'){
    echo json_encode(["error" => "Neispravan request method"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? 0;
$naslov = $data['naslov'] ?? '';
$deskripcija = $data['deskripcija'] ?? '';
$img = $data['img'] ?? '';

if(!$id || !$naslov || !$deskripcija || !$img){
    echo json_encode(["error" => "Sva polja su obavezna"]);
    exit();
}

$stmt = $conn->prepare("UPDATE novosti SET naslov=?, deskripcija=?, img=?, updated_at=NOW() WHERE id=?");
if(!$stmt){
    die(json_encode(["error" => $conn->error]));
}
$stmt->bind_param("sssi", $naslov, $deskripcija, $img, $id);

if($stmt->execute()){
    echo json_encode(["success" => "Novost ažurirana"]);
} else {
    echo json_encode(["error" => $stmt->error]);
}
