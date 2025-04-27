<?php
require 'config.php';

header('Content-Type: application/json');

try {
    // Récupération des destinations depuis la base de données
    $stmt = $pdo->query("SELECT * FROM destinations");
    $destinations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($destinations)) {
        echo json_encode(['error' => 'Aucune destination trouvée']);
    } else {
        echo json_encode($destinations);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>