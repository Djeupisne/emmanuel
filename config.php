<?php
$host = 'localhost';
$dbname = 'luxe_voyages';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Créer la table destinations si elle n'existe pas
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS destinations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            image VARCHAR(255) NOT NULL,
            price VARCHAR(50),
            rating INT DEFAULT 4,
            badge VARCHAR(50))
    ");
    
    // Insérer des données de test si la table est vide
    $stmt = $pdo->query("SELECT COUNT(*) FROM destinations");
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("
            INSERT INTO destinations (title, description, image, price, rating, badge) VALUES
            ('Maldives', 'Plages de sable blanc et eaux cristallines', 'images/OIP.jpeg', 'À partir de 2500€', 5, 'Nouveau'),
            ('Paris', 'La ville lumière et son romantisme', 'images/iii.jpeg', 'À partir de 1200€', 4, 'Populaire'),
            ('Tokyo', 'Tradition et modernité en harmonie', 'images/o.jpeg', 'À partir de 1800€', 4, 'Exclusif')
        ");
    }
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>