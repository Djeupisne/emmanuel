<?php
require 'config.php';

// Activer l'affichage des erreurs pour le débogage
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data === null) {
        // Fallback pour les anciennes soumissions de formulaire
        $data = $_POST;
    }

    $email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);

    // Validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email invalide']);
        exit;
    }

    try {
        // Préparation et exécution de la requête
        $stmt = $pdo->prepare("INSERT INTO newsletter (email) VALUES (?)");
        $stmt->execute([$email]);

        echo json_encode(['success' => true, 'message' => 'Inscription réussie!']);
    } catch (PDOException $e) {
        if ($e->errorInfo[1] === 1062) { // Erreur duplicate entry
            echo json_encode(['success' => false, 'message' => 'Cet email est déjà inscrit']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'inscription: ' . $e->getMessage()]);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Requête invalide']);
}
?>