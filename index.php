<?php
header('Content-Type: application/json');
session_start();

// Provjera da li je korisnik logovan
if(isset($_SESSION['user_id'])){
    echo json_encode([
        "user_id" => $_SESSION['user_id'],
        "username" => $_SESSION['username'],
        "role" => $_SESSION['role']
    ]);
} else {
    echo json_encode([
        "error" => "Korisnik nije prijavljen"
    ]);
}
