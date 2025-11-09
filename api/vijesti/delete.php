<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

session_start();
require __DIR__ . '/../../db.php'; 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if(!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin'){
    http_response_code(401); // Unauthorized
    echo json_encode(["success" => false, "message" => "Korisnik nije prijavljen ili nije administrator."]);
    exit();
}

if($_SERVER['REQUEST_METHOD'] !== 'DELETE'){
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Neispravan request method (očekuje se DELETE)"]);
    exit();
}

$id = $_GET['id'] ?? null;

if(!$id || !is_numeric($id)){
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "message" => "ID članka je obavezan."]);
    exit();
}

$stmt = $conn->prepare("DELETE FROM novosti WHERE id=?");
$stmt->bind_param("i", $id);

if($stmt->execute()){
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Članak uspješno obrisan."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Greška prilikom brisanja: " . $stmt->error]);
}
?>