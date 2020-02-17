<?php

$updates = [];

$updates['202002041445'][] = <<<'EOT'
CREATE TABLE IF NOT EXISTS `music_artist_custom_fields`
	( id INT(11) NOT NULL PRIMARY KEY, 
	CONSTRAINT `music_artist_custom_fields_ibfk_1` FOREIGN KEY(id) REFERENCES music_artist (id) 
	ON DELETE CASCADE ON UPDATE RESTRICT ) ENGINE = INNODB;
EOT;

$updates['202002071045'][] = <<<'EOT'
CREATE TABLE IF NOT EXISTS `music_review`
	( `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`albumId` INT(11) NOT NULL,
	`aclId` INT(11) NOT NULL,
	`createdBy` int(11) NOT NULL,
  	`modifiedBy` int(11) NOT NULL,
  	`rating` SMALLINT(5) UNSIGNED NOT NULL,
  	`title` VARCHAR(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  	`body` TEXT collate utf8mb4_unicode_ci NOT NULL

	 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 
EOT;
$updates['202002071045'][] = <<<'EOT'
ALTER TABLE `music_review`
    ADD KEY `aclId` (`aclId`),
    ADD KEY `albumId` (`albumId`);
EOT;
$updates['202002071045'][] = <<<'EOT'
ALTER TABLE `music_review`
	ADD CONSTRAINT `music_review_fk1` FOREIGN KEY (`albumId`) REFERENCES `music_album` (`id`) ON DELETE CASCADE,
    ADD CONSTRAINT `music_review_fk2` FOREIGN KEY (`aclId`) REFERENCES `core_acl` (`id`);
EOT;

//$updates['202002041445'][] = <<<'EOT'
//CREATE TABLE IF NOT EXISTS `music_album_custom_fields`
//	( id INT(11) NOT NULL PRIMARY KEY, CONSTRAINT `music_album_custom_fields_ibfk_1` FOREIGN KEY(id)
//	REFERENCES music_album (id) ON DELETE CASCADE ON UPDATE RESTRICT ) ENGINE = INNODB;
//EOT;
