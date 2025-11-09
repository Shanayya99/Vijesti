-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2025 at 06:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vijesti`
--

-- --------------------------------------------------------

--
-- Table structure for table `knjige`
--

CREATE TABLE `knjige` (
  `id` int(11) NOT NULL,
  `naslov` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `godina` int(4) NOT NULL,
  `zanr` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `knjige`
--

INSERT INTO `knjige` (`id`, `naslov`, `autor`, `godina`, `zanr`, `img`) VALUES
(1, 'Na Drini Cuprija', 'Ivo Andric', 1945, 'Roman', 'https://www.knjiga.ba/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/slike/d0977_na_drini_cuprija.jpg'),
(2, 'Prokleta Avlija', 'Ivo Andric', 1954, 'Roman', 'https://www.knjiga.ba/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/slike/prokleta_avlija_andric.jpg'),
(3, 'Hasanaginica', 'Narodna', 1773, 'Balada', 'https://dalmatiastorytelling.com/wp-content/uploads/2023/12/dalmacija-storytelling-hasnaginica-letak-prednja-01-2023-12-28-11-53-50.jpg'),
(4, 'Dervis i smrt', 'Mesa Selimovic', 1966, 'Roman', 'https://www.knjiga.ba/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/slike/d0822_dervis_i_smrt.jpg'),
(5, 'Gorski Vijenac', 'Petar II Petrovic Njegos', 1847, 'Poema', NULL),
(6, 'Na Drini Cuprija 2', 'Ivo Andric', 1946, 'Roman', NULL),
(7, 'Prokleta Avlija 2', 'Ivo Andric', 1955, 'Roman', NULL),
(8, 'Dervis i smrt 2', 'Mesa Selimovic', 1967, 'Roman', NULL),
(9, 'Hasanaginica 2', 'Narodna', 1774, 'Balada', NULL),
(10, 'Gorski Vijenac 2', 'Petar II Petrovic Njegos', 1848, 'Poema', NULL),
(11, 'Na Drini Cuprija 3', 'Ivo Andric', 1947, 'Roman', NULL),
(12, 'Prokleta Avlija 3', 'Ivo Andric', 1956, 'Roman', NULL),
(13, 'Dervis i smrt 3', 'Mesa Selimovic', 1968, 'Roman', NULL),
(14, 'Hasanaginica 3', 'Narodna', 1775, 'Balada', NULL),
(15, 'Gorski Vijenac 3', 'Petar II Petrovic Njegos', 1849, 'Poema', NULL),
(16, 'Na Drini Cuprija 4', 'Ivo Andric', 1948, 'Roman', NULL),
(17, 'Prokleta Avlija 4', 'Ivo Andric', 1957, 'Roman', NULL),
(18, 'Dervis i smrt 4', 'Mesa Selimovic', 1969, 'Roman', NULL),
(19, 'Hasanaginica 4', 'Narodna', 1776, 'Balada', NULL),
(20, 'Gorski Vijenac 4', 'Petar II Petrovic Njegos', 1850, 'Poema', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `novosti`
--

CREATE TABLE `novosti` (
  `id` int(11) NOT NULL,
  `naslov` varchar(255) NOT NULL,
  `deskripcija` text NOT NULL,
  `img` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `novosti`
--

INSERT INTO `novosti` (`id`, `naslov`, `deskripcija`, `img`, `created_at`, `updated_at`) VALUES
(13, 'Pozar u Tuzli', 'Nakon sinoćnjeg požara u zgradi Doma penzionera, javnost i građani postavljaju brojna pitanja o intervenciji i korištenju dostupne opreme. Posebnu pažnju izazvala je činjenica da oprema tuzlanskih vatrogasaca – ljestve duge 32 metra, namijenjene gašenju požara i spašavanju s visine nije korištena.\n\nProfesionalna vatrogasna jedinica Tuzle nedavno je bogatija za ovu novu opremu, koja je prošla sve potrebne kontrole u okviru Evropske unije.\nIzvršen je i desetogodišnji servis, a pribavljeni su i certifikati koji potvrđuju usklađenost ljestvi sa EU standardima. Uz to, osigurana je sva potrebna dokumentacija i potvrde nadležnih institucija Bosne i Hercegovine, čime je potvrđena sigurnost i pouzdanost opreme za svakodnevne intervencije.\n\n', 'https://tuzlanski.ba/assets/storage/photos/4/img-1037-scaled-1759229726.jpg', '2025-11-05 13:07:55', NULL),
(15, 'Medina', 'test', 'https://meetbosnia.com/storage/2022/04/What-to-see-in-Sarajevo.jpg', '2025-11-05 13:58:39', '2025-11-05 19:04:21'),
(19, 'Studenti', 'Studenti IPI Akademije su uspjesno zavrsili svoje skolovanje', 'https://vidiportal.ba/wp-content/uploads/2024/03/IPI-akademija-diplomanti-mart-2024.jpg', '2025-11-07 15:49:13', '2025-11-07 15:49:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `ime` varchar(100) NOT NULL,
  `prezime` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` datetime DEFAULT current_timestamp(),
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `ime`, `prezime`, `username`, `password`, `email`, `role`, `created_at`, `status`) VALUES
(11, 'Admin', 'Admin', 'admin', '$2y$10$gpriMJP2Jd3eyyXkExKMLOITmrNgrigOqxLPUB5CI54cccBIaGo5S', 'admin@example.com', 'admin', '2025-11-03 22:35:57', 'approved'),
(12, 'Marko', 'Markovic', 'marko123', '$2y$10$fKOF3JvtbO1IuzqCuGilxecp64V7U2GoXZ/ANEjv1Tc0tw9/51qm6', 'marko@example.com', 'user', '2025-11-03 22:39:40', 'approved'),
(13, 'Marko', 'Markovic', 'marko1232', '$2y$10$/m8oqMTNS9.3Q9hJu9M48uFX8UZQXEQt/kVnLQ6134t4WMxTDHIAa', 'mark2@example.com', '', '2025-11-04 16:38:37', 'approved'),
(14, 'Medina', 'Mustacevic', 'medina22', '$2y$10$itH3.3kgiIMqZB4jNFW5Mue6I3nweT3vjlfvjry6Ij8yg3D5kUWCS', 'medina222@gmail.com', '', '2025-11-04 16:38:45', 'approved'),
(15, 'Medina', 'Testira', 'medinatestira', '$2y$10$j1XmrOhF8Peji1kY33Qz4.WQB0W5xsP2telHfRQEGRPbe40blbTkO', 'medinatestira@gmail.com', '', '2025-11-05 14:45:24', 'approved'),
(16, 'Medina', 'Testira', 'medinatestira1', '$2y$10$pM2TBJLORStfOcaj8zDDDOsykk95lPVLkBTV2IGpY5bwlCH6hB.O2', 'medinatestira1@gmail.com', '', '2025-11-05 15:09:50', 'approved'),
(17, 'Medina', 'Mustacevic', 'medina1', '$2y$10$NIQfmTZXls/2fcJY7cQIOOCUXwv01s/DUoVv70TfTzkTlndmNv61m', 'medina1@gmail.com', '', '2025-11-05 15:23:28', 'approved'),
(18, 'Medina', 'Mustacevic', 'medinatestira12', '$2y$10$dlbSa2BKIdzc6iikkH3Xv.msEESVHNBIaR8NKL98Ys46IuSwtEF/m', 'medinatestira12@gmail.com', 'user', '2025-11-05 15:30:38', 'approved'),
(19, 'Medina', 'Testira', 'medina123', '$2y$10$RjL87SSeHqpuimTS/BVrS.M1NnJqjgrxizkmAEshnMkdneP5WZEE2', 'medina123@gmail.com', 'user', '2025-11-05 21:48:59', 'approved'),
(20, 'medina1234', 'medina1234', 'medina1234', '$2y$10$TRFizi7bggEGTbEEB5FnlOCjcKZhc4Qt8KYMhsQHlT99bXNFqxsj6', 'medina1234@hotmail.com', 'user', '2025-11-05 21:51:53', 'approved'),
(21, 'medina12345', 'medina12345', 'medina12345', '$2y$10$k2dcL/h/JoQO8Zod2yZK4OzzwGP2V1iBKD8cwKZiKfy8Ek/COgJS.', 'medina12345@hotmail.com', 'user', '2025-11-05 22:00:24', 'approved'),
(22, 'Test', 'Test', 'test22', '$2y$10$Gm92a2mmCv5pYawSBi8Nme/CGjwmYqjjCUuKwwLpzC9Z5Klfpme76', 'test22@gmail.com', 'user', '2025-11-06 14:55:28', 'rejected'),
(23, 'Medina', 'Mustacevic', 'medina900', '$2y$10$bC.e04xjJghsRTdHYwo2PObHXK7uyaA5W39vDHs4Q6jRgUob8G8N.', 'medina900@gmail.com', 'user', '2025-11-06 14:55:59', 'approved'),
(24, 'medinatest2025', 'medinatest2025', 'medinatest2025', '$2y$10$6Ocv8.bVBifdLy8KK2ojtOSVR73blyMljiMf.CNuOjwUHQsM2WEkm', 'medinatest2025@gmail.com', 'user', '2025-11-07 15:46:31', 'approved'),
(25, 'Medina', 'Mustacevic', 'medina2', '$2y$10$mq87rV/3uFBt3WrW.AbnLedbPN1IrccrPzoDUbyCrwp1cmpsxtYrK', 'medinaaaaaa@gmail.com', 'user', '2025-11-07 15:48:07', 'approved'),
(26, 'Medina', 'Mustacevic', 'medina333', '$2y$10$btxzE5esBbMmVKGG5hVZI.m0N/Jjlc/dylIdPA/syrHyVr638VBOG', 'medina333@gmail.com', 'user', '2025-11-07 15:49:54', 'approved');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `knjige`
--
ALTER TABLE `knjige`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `novosti`
--
ALTER TABLE `novosti`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `knjige`
--
ALTER TABLE `knjige`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `novosti`
--
ALTER TABLE `novosti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
