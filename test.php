<?php
require 'config.php';

try {
    $stmt = $pdo->query("SELECT 1");
    echo "Connexion à la base de données réussie!";
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>