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

    $name = htmlspecialchars($data['name'] ?? '');
    $email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($data['phone'] ?? '');
    $message = htmlspecialchars($data['message'] ?? '');

    // Validation
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Tous les champs requis doivent être remplis']);
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email invalide']);
        exit;
    }

    try {
        // Préparation et exécution de la requête
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $email, $phone, $message]);

        echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès!']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi du message: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
}
?>