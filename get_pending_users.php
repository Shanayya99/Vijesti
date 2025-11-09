<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Credentials: true");
require __DIR__ . '/db.php'; 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if($_SERVER['REQUEST_METHOD'] !== 'GET'){
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Neispravan request method (očekuje se GET)"]);
    exit();
}

$pending_status = 'pending';
$stmt = $conn->prepare("SELECT id, ime, prezime, username, email, role, status FROM users WHERE status = ?");
$stmt->bind_param("s", $pending_status);
$stmt->execute();
$result = $stmt->get_result();
$pending_users = [];

while($row = $result->fetch_assoc()){
    $pending_users[] = $row;
}

if(count($pending_users) > 0){
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Uspješno dohvaćeni korisnici na čekanju.",
        "users" => $pending_users
    ]);
} else {
    http_response_code(200); // Vraćamo 200 jer je zahtjev uspješan, ali lista prazna
    echo json_encode([
        "success" => true,
        "message" => "Nema korisnika na čekanju za odobrenje.",
        "users" => []
    ]);
}
?>
