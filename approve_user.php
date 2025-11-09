<?php
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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false, 
        "message" => "Neispravan request method (očekuje se POST)"
    ]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$admin_username = $data['admin_username'] ?? null;
$id = $data['id'] ?? null;
$action = $data['action'] ?? null;

if (empty($admin_username) || empty($id) || !in_array($action, ['approve', 'reject'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Nedostaju potrebni podaci za obradu.",
        "debug_received" => [
            "admin" => $admin_username, 
            "id" => $id, 
            "action" => $action
        ]
    ]);
    exit();
}

$stmt = $conn->prepare("SELECT id FROM users WHERE username = ? AND role = 'admin'");
$stmt->bind_param("s", $admin_username);
$stmt->execute();
$result = $stmt->get_result();
$admin = $result->fetch_assoc();

if (!$admin) {
    http_response_code(401);
    echo json_encode([
        "success" => false, 
        "message" => "Neautorizovan admin."
    ]);
    exit();
}

$new_status = ($action === 'approve') ? 'approved' : 'rejected';

$stmt = $conn->prepare("UPDATE users SET status = ? WHERE id = ? AND status = 'pending'");
$stmt->bind_param("si", $new_status, $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        http_response_code(200);
        echo json_encode([
            "success" => true, 
            "message" => "Korisnik uspješno " . $action . "ovan."
        ]);
    } else {
        http_response_code(200);
        echo json_encode([
            "success" => false, 
            "message" => "Korisnik je već obrađen ili ID ne postoji."
        ]);
    }
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "message" => "Greška prilikom promjene statusa: " . $stmt->error
    ]);
}
?>
