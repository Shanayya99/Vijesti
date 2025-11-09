<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

require __DIR__ . '/../../db.php'; 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if($_SERVER['REQUEST_METHOD'] !== 'GET'){
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Neispravan request method (očekuje se GET)"]);
    exit();
}

$stmt = $conn->prepare("SELECT id, naslov, autor, godina, img FROM knjige ORDER BY godina DESC");
$stmt = $conn->prepare("SELECT id, naslov, autor, godina, img FROM knjige ORDER BY godina DESC");

if (!$stmt) {
    die(json_encode([
        "success" => false,
        "message" => "Greška u pripremi upita: " . $conn->error
    ]));
}

$stmt->execute();
$result = $stmt->get_result();
$books = [];

while($row = $result->fetch_assoc()){
    $books[] = $row;
}

http_response_code(200);
echo json_encode([
    "success" => true,
    "books" => $books 
]);
?>