SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Table structure for table `music_album`
--

CREATE TABLE IF NOT EXISTS `music_album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artistId` int(11) NOT NULL,
  `name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `releaseDate` date NOT NULL,
  `genreId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `artistId` (`artistId`),
  KEY `genreId` (`genreId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `music_artist`
--

CREATE TABLE IF NOT EXISTS `music_artist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` binary(40) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime NOT NULL,
  `createdBy` int(11) NOT NULL,
  `modifiedBy` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `photo` (`photo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `music_artist_custom_fields`
--

CREATE TABLE IF NOT EXISTS `music_artist_custom_fields` (
  `id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `bio` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `music_genre`
--

CREATE TABLE IF NOT EXISTS `music_genre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `music_review`
--

CREATE TABLE IF NOT EXISTS `music_review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `albumId` int(11) NOT NULL,
  `aclId` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `modifiedBy` int(11) NOT NULL,
  `rating` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `aclId` (`aclId`),
  KEY `albumId` (`albumId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `music_album`
--
ALTER TABLE `music_album`
  ADD CONSTRAINT `music_album_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `music_artist` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `music_album_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `music_genre` (`id`);

--
-- Constraints for table `music_artist`
--
ALTER TABLE `music_artist`
  ADD CONSTRAINT `music_artist_ibfk_1` FOREIGN KEY (`photo`) REFERENCES `core_blob` (`id`);

--
-- Constraints for table `music_artist_custom_fields`
--
ALTER TABLE `music_artist_custom_fields`
  ADD CONSTRAINT `music_artist_custom_fields_ibfk_1` FOREIGN KEY (`id`) REFERENCES `music_artist` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `music_review`
--
ALTER TABLE `music_review`
  ADD CONSTRAINT `music_review_fk1` FOREIGN KEY (`albumId`) REFERENCES `music_album` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `music_review_fk2` FOREIGN KEY (`aclId`) REFERENCES `core_acl` (`id`);
COMMIT;

--
-- Dumping data for table `music_artist`
--

--
-- Dumping data for table `music_genre`
--

INSERT INTO `music_genre` (`id`, `name`) VALUES
(1, 'Pop'),
(2, 'Rock'),
(3, 'Blues'),
(4, 'Jazz');


--
-- Dumping data for table `music_album`
--

INSERT INTO `music_album` (`id`, `artistId`, `name`, `releaseDate`, `genreId`) VALUES
(1, 3, 'The Doors', '1967-01-04', 2),
(1, 3, 'Strange Days', '1967-09-25', 2);
