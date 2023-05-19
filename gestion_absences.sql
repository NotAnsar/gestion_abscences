-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2023 at 11:06 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestion_absences`
--

-- --------------------------------------------------------

--
-- Table structure for table `abscence`
--

CREATE TABLE `abscence` (
  `id` bigint(20) NOT NULL,
  `date_absence` text DEFAULT NULL,
  `justification` varchar(255) DEFAULT NULL,
  `etudiant_id` bigint(20) DEFAULT NULL,
  `sceance_id` bigint(20) DEFAULT NULL,
  `cours_id` bigint(20) DEFAULT NULL,
  `Status` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `abscence`
--

INSERT INTO `abscence` (`id`, `date_absence`, `justification`, `etudiant_id`, `sceance_id`, `cours_id`, `Status`) VALUES
(1, '01/01/2023 8:00', '123456nzrfnerlnel', 1, 1, 1, 'Justifié'),
(2, '01/01/2023 8:00', 'Funéraille d\'un membre de famille', 4, 2, 2, 'en attente'),
(3, '03/01/2023 8:00', 'Contrôle de permis de conduite', 2, 5, 3, 'non Justifié'),
(4, '02/01/2023 8:00', 'TEST123', 2, 1, 4, 'en attente'),
(35, '18/4/2023 21:00', '', 1, 3, NULL, 'en attente');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL,
  `password` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `password`) VALUES
(133133, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `cours`
--

CREATE TABLE `cours` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `id_prof` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cours`
--

INSERT INTO `cours` (`id`, `nom`, `id_prof`) VALUES
(1, 'Programmation WEB 2.0.3', 3),
(2, 'Résaux informatiques', 7),
(3, 'Java', 3),
(4, 'PHP', 7),
(5, 'Uml', 3);

-- --------------------------------------------------------

--
-- Table structure for table `etudiant`
--

CREATE TABLE `etudiant` (
  `filiere` varchar(255) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `nom` text NOT NULL,
  `prenom` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `etudiant`
--

INSERT INTO `etudiant` (`filiere`, `id`, `nom`, `prenom`) VALUES
('TPW', 1, 'ELHAOUDAR', 'Hamza'),
('TPW', 2, 'KARROUACH', 'Ansar'),
('TPW', 3, 'TATE', 'Andrew'),
('TPW', 4, 'OMEN', 'saif'),
('TPW', 5, 'ABDELAZIZ', 'Reda'),
('TPW', 7, 'BYI', 'Farid');

-- --------------------------------------------------------

--
-- Table structure for table `etudier`
--

CREATE TABLE `etudier` (
  `id_cours` bigint(20) NOT NULL,
  `id_etd` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jwt_response`
--

CREATE TABLE `jwt_response` (
  `id` bigint(20) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `profs`
--

CREATE TABLE `profs` (
  `departement` varchar(255) DEFAULT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profs`
--

INSERT INTO `profs` (`departement`, `id`) VALUES
('Informatique', 3),
('Informatique', 7);

-- --------------------------------------------------------

--
-- Table structure for table `sceance`
--

CREATE TABLE `sceance` (
  `id` bigint(20) NOT NULL,
  `date_debut` text DEFAULT NULL,
  `date_fin` text DEFAULT NULL,
  `date_sceance` text DEFAULT NULL,
  `id_cours` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sceance`
--

INSERT INTO `sceance` (`id`, `date_debut`, `date_fin`, `date_sceance`, `id_cours`) VALUES
(1, '01/01/2023 9:00', '01/01/2023 12:00', '01/01/2023', 1),
(2, '02/01/2023 9:00', '02/01/2023 12:00', '02/01/2023', 2),
(3, '03/01/2023 9:00', '03/01/2023 12:00', '03/01/2023', 3),
(4, '04/01/2023 9:00', '04/01/2023 12:00', '04/01/2023', 1),
(5, '05/01/2023 9:00', '05/01/2023 12:00', '05/01/2023', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `filiere` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `adresse`, `age`, `description`, `email`, `nom`, `password`, `prenom`, `tel`, `role`, `filiere`) VALUES
(1, 'sidi abbad', 20, 'Lorem ipsum dolor sit amet adipisicing elit. Similique voluptates eaque eius, recusandae et soluta nobis nisi ratione sapiente assumenda consectetur.4556656', 'hamza@gmail.com', 'ELHAOUDAR', 'hamza@gmail.com', 'Hamza', '0123456789', 'etudiant', NULL),
(2, 'sidi abbad', 20, 'Lorem ipsum dolor sit amet adipisicing elit. Similique voluptates eaque eius, recusandae et soluta nobis nisi ratione sapiente assumenda consectetur.', 'ansar@gmail.com', 'KARROUACH', 'ansar@gmail.com', 'Ansar', '0123456789', 'etudiant', NULL),
(3, 'sidi abbad1232112', 20, 'Lorem ipsum dolor sit amet adipisicing elit. Similique voluptates eaque eius, recusandae et soluta nobis nisi ratione sapiente assumenda consectetur.4546', 'prof@gmail.com', 'LAZAAR', 'prof@gmail.com', 'Hajar123', '0123456789', 'prof', NULL),
(4, 'sidi abbad', 35, 'Lorem ipsum dolor sit amet adipisicing elit. Similique voluptates eaque eius, recusandae et soluta nobis nisi ratione sapiente assumenda consectetur.', 'admin@gmail.com', 'JARIR', 'admin@gmail.com', 'Admin', '0123456789', 'admin', NULL),
(5, 'sidi abbad4454', 20, 'Lorem ipsum dolor sit amet adipisicing elit. Similique voluptates eaque eius, recusandae et soluta nobis nisi ratione sapiente assumenda consectetur.2123231', 'etud@gmail.com', 'Ahmed', 'password', 'Amine', '0123456789', 'prof', NULL),
(7, 'sidi abbad', 40, 'Lorem ipsum dolor sit amet adipisicing elit. Similique voluptates eaque eius, recusandae et soluta nobis nisi ratione sapiente assumenda consectetur.', 'reseau@gmail.com', 'BOUHAMIDI', 'reseau@gmail.com', 'Bouhamidi', '0123456789', 'prof', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_seq`
--

CREATE TABLE `users_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_seq`
--

INSERT INTO `users_seq` (`next_val`) VALUES
(1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abscence`
--
ALTER TABLE `abscence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1uo7ynlcg6b29rbw7qi0do3oc` (`cours_id`),
  ADD KEY `FKekki0idm38ey6jt4sexo6h6n4` (`etudiant_id`),
  ADD KEY `FK21s78a3bu87a35wbwc20yexpe` (`sceance_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKdj3ecqhabhm7huepflyr29su1` (`id_prof`);

--
-- Indexes for table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `etudier`
--
ALTER TABLE `etudier`
  ADD PRIMARY KEY (`id_cours`,`id_etd`),
  ADD KEY `FKqa0rgyaqslgb1q5thbafwj5pt` (`id_etd`);

--
-- Indexes for table `jwt_response`
--
ALTER TABLE `jwt_response`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profs`
--
ALTER TABLE `profs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sceance`
--
ALTER TABLE `sceance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKoj6as1ebexyctcui34jwffx74` (`id_cours`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `abscence`
--
ALTER TABLE `abscence`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `cours`
--
ALTER TABLE `cours`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `jwt_response`
--
ALTER TABLE `jwt_response`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sceance`
--
ALTER TABLE `sceance`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
