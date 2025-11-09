<?php
session_start(); 

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require __DIR__ . '/db.php'; 

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Neispravan request method"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';

if(!$username || !$password){
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Korisničko ime i lozinka su obavezni"]);
    exit();
}

$stmt = $conn->prepare("SELECT id, ime, prezime, username, password, role, status FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if(!$user || !password_verify($password, $user['password'])){
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Neispravan korisnik ili lozinka"]);
    exit();
}

if($user['status'] !== 'approved'){
    http_response_code(403);
    echo json_encode([
        "success" => false,
        "message" => "Račun još nije odobren od strane admina.",
        "status" => $user['status']
    ]);
    exit();
}

$_SESSION['user_id'] = $user['id'];
$_SESSION['user_role'] = $user['role']; 

http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Uspješno prijavljen.",
    "user_type" => $user['role'], 
    "username" => $user['username']
]);

exit();