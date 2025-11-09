<?php
session_start(); 
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if(!isset($_SESSION['user_id'])){
    http_response_code(401); 
    echo json_encode(["success" => false, "message" => "Niste prijavljeni."]);
    exit();
}

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Neispravan request method."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$current = $data['current_password'] ?? '';
$new = $data['new_password'] ?? '';
$confirm_new = $data['confirm_new_password'] ?? ''; 

if(!$current || !$new || !$confirm_new){
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Sva polja su obavezna."]);
    exit();
}
if ($new !== $confirm_new) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Nova lozinka i potvrda se ne poklapaju."]);
    exit();
}

$stmt = $conn->prepare("SELECT password FROM users WHERE id=?");
$stmt->bind_param("i", $_SESSION['user_id']);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if(!password_verify($current, $user['password'])){
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Pogrešna trenutna lozinka."]);
    exit();
}

$hashed = password_hash($new, PASSWORD_DEFAULT);
$stmt = $conn->prepare("UPDATE users SET password=? WHERE id=?");
$stmt->bind_param("si", $hashed, $_SESSION['user_id']);
$stmt->execute();

http_response_code(200);
echo json_encode(["success" => true, "message" => "Lozinka je uspješno promijenjena."]);
?>