--
-- Table structure for table `tutorial_music_artist`
--

CREATE TABLE IF NOT EXISTS `tutorial_music_artist`
(
    `id`         int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`       varchar(190)     NOT NULL,
    `photo`      binary(40)                DEFAULT NULL,
    `createdAt`  datetime         NOT NULL,
    `modifiedAt` datetime         NOT NULL,
    `createdBy`  int(11)          NOT NULL,
    `modifiedBy` int(11)          NOT NULL,
    `active`     tinyint(1)       NOT NULL DEFAULT 1,
    `bio`        text                      DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `photo` (`photo`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;


--
-- Table structure for table `music_album`
--

CREATE TABLE IF NOT EXISTS `tutorial_music_album`
(
    `id`          int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `artistId`    int(11) UNSIGNED NOT NULL,
    `name`        varchar(190)     NOT NULL,
    `releaseDate` date             NOT NULL,
    `genreId`     int(11) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `artistId` (`artistId`),
    KEY `genreId` (`genreId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `music_artist_custom_fields`
--

CREATE TABLE IF NOT EXISTS `tutorial_music_artist_custom_fields`
(
    `id` int(11) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `music_genre`
--

CREATE TABLE IF NOT EXISTS `tutorial_music_genre`
(
    `id`   int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` varchar(190)     NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `music_review`
--

CREATE TABLE IF NOT EXISTS `tutorial_music_review`
(
    `id`         int(11) UNSIGNED     NOT NULL AUTO_INCREMENT,
    `albumId`    int(11) UNSIGNED     NOT NULL,
    `aclId`      int(11)              NOT NULL,
    `createdBy`  int(11)              NOT NULL,
    `modifiedBy` int(11)              NOT NULL,
    `rating`     smallint(5) UNSIGNED NOT NULL,
    `title`      varchar(190)         NOT NULL,
    `body`       text                 NOT NULL,
    PRIMARY KEY (`id`),
    KEY `aclId` (`aclId`),
    KEY `albumId` (`albumId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

--
-- Constraints for table `music_review`
--
ALTER TABLE `tutorial_music_review`
    ADD CONSTRAINT `music_review_fk1` FOREIGN KEY (`albumId`) REFERENCES `tutorial_music_album` (`id`) ON DELETE CASCADE,
    ADD CONSTRAINT `music_review_fk2` FOREIGN KEY (`aclId`) REFERENCES `core_acl` (`id`);


ALTER TABLE `tutorial_music_album`
    ADD CONSTRAINT `music_album_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `tutorial_music_artist` (`id`) ON DELETE CASCADE,
    ADD CONSTRAINT `music_album_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `tutorial_music_genre` (`id`);

ALTER TABLE `tutorial_music_artist`
    ADD CONSTRAINT `tutorial_music_artist_ibfk_1` FOREIGN KEY (`photo`) REFERENCES `core_blob` (`id`);

--
-- Constraints for table `music_artist_custom_fields`
--
ALTER TABLE `tutorial_music_artist_custom_fields`
    ADD CONSTRAINT `music_artist_cf_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tutorial_music_artist` (`id`) ON DELETE CASCADE;


INSERT INTO `tutorial_music_genre` (`id`, `name`)
VALUES (1, 'Pop'),
       (2, 'Rock'),
       (3, 'Blues'),
       (4, 'Jazz'),
       (5, 'Metal'),
       (7, 'Industrial');

