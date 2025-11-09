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


$id = $_GET['id'] ?? null;
$articles = [];

if ($id) {
    
    $stmt = $conn->prepare("SELECT id, naslov, deskripcija, img, created_at, updated_at FROM novosti WHERE id = ?");
    $stmt->bind_param("i", $id); 
    $stmt->execute();
    $result = $stmt->get_result();
    $article = $result->fetch_assoc(); 
    
    if ($article) {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "article" => $article 
        ]);
    } else {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Članak nije pronađen."]);
    }
    exit();

} else {
    
    $stmt = $conn->prepare("SELECT id, naslov, deskripcija, img, created_at, updated_at FROM novosti ORDER BY id DESC");
    $stmt->execute();
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $articles[] = $row;
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "articles" => $articles 
    ]);
    exit();
}

?>