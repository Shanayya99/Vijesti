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
if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Neispravan request method"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$ime = trim($data['ime'] ?? '');
$prezime = trim($data['prezime'] ?? '');
$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$password_confirm = $data['password_confirm'] ?? '';

if(!$ime || !$prezime || !$username || !$email || !$password || !$password_confirm){
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Sva polja su obavezna"]);
    exit();
}
if($password !== $password_confirm){
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Lozinka i potvrda lozinke se ne poklapaju"]);
    exit();
}

$stmt_check = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
$stmt_check->bind_param("ss", $username, $email);
$stmt_check->execute();
$stmt_check->store_result();

if ($stmt_check->num_rows > 0) {
    http_response_code(409); 
    echo json_encode(["success" => false, "message" => "Korisničko ime ili email već postoji."]);
    $stmt_check->close();
    exit();
}
$stmt_check->close();

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (ime, prezime, username, password, email) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $ime, $prezime, $username, $hashedPassword, $email);

if($stmt->execute()){
    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Registracija uspješna. Sačekajte odobrenje admina."]);
} else {
    http_response_code(500); 
    echo json_encode(["success" => false, "message" => "Greška prilikom registracije: " . $stmt->error]);
}