-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 27 avr. 2025 à 11:31
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `luxe_voyages`
--

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `phone`, `message`, `created_at`) VALUES
(1, 'Djeupisne Oualoumi', 'oualoumidjeupisne@gmail.com', '93360150', '- Un lever de soleil qui te laisse sans voix.\n- Un repas improvisé qui devient le meilleur que tu aies jamais goûté.\n- Un fou rire avec des inconnus qui, l’espace d’un instant, deviennent des amis.\n\n\n', '2025-04-18 05:06:34'),
(2, 'SOUGNABE ', 'oualoumisougnabe@gmail.com', '+235 66 28 31 14', '\n- Matinées douces avec un café face à un paysage sublime.\n- Après-midis animés à explorer les quartiers emblématiques, goûter les spécialités locales et échanger avec les habitants.\n- Soirées magiques, peut-être un dîner en bord de mer, une balade sous les lumières de la ville ou une escapade sous les étoiles.\n', '2025-04-18 05:07:42'),
(3, 'BATONON', 'vanessa@gmail.com', '+228 90210072', 'PARIS', '2025-04-23 11:22:55');

-- --------------------------------------------------------

--
-- Structure de la table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
CREATE TABLE IF NOT EXISTS `destinations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` varchar(50) DEFAULT NULL,
  `rating` int DEFAULT '4',
  `badge` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `destinations`
--

INSERT INTO `destinations` (`id`, `title`, `description`, `image`, `price`, `rating`, `badge`) VALUES
(1, 'TCHAD', 'Plages de sable blanc et eaux cristallines', 'images/OIP.jpeg', 'À partir de 2500€', 5, 'Nouveau'),
(2, 'Paris', 'La ville lumière et son romantisme', 'images/iii.jpeg', 'À partir de 1200€', 4, 'Populaire'),
(3, 'Tokyo', 'Tradition et modernité en harmonie', 'images/o.jpeg', 'À partir de 1800€', 4, 'Exclusif'),
(4, 'Bora Bora', 'Eaux turquoise et bungalows sur pilotis', 'images/bora-bora.jpg', 'À partir de 3000€', 5, 'Exclusif'),
(5, 'New York', 'La ville qui ne dort jamais', 'images/new-york.jpg', 'À partir de 1200€', 4, 'Populaire'),
(6, 'Venise', 'Romantisme et gondoles', 'images/venise.jpg', 'À partir de 900€', 5, 'Promo'),
(7, 'Dubai', 'Luxes et gratte-ciels futuristes', 'images/dubai.jpg', 'À partir de 2000€', 5, 'Nouveau'),
(8, 'Santorin', 'Couchers de soleil spectaculaires', 'images/santorin.jpg', 'À partir de 1500€', 4, 'Populaire');

-- --------------------------------------------------------

--
-- Structure de la table `newsletter`
--

DROP TABLE IF EXISTS `newsletter`;
CREATE TABLE IF NOT EXISTS `newsletter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `subscribed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `newsletter`
--

INSERT INTO `newsletter` (`id`, `email`, `subscribed_at`) VALUES
(1, 'oualoumidjeupisne@gmail.com', '2025-04-18 04:25:57'),
(2, 'sougnabe@gmail.com', '2025-04-18 05:08:33'),
(3, 'vanessa@gmail.com', '2025-04-23 11:23:32');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
