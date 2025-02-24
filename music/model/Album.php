<?php

namespace go\modules\tutorial\music\model;

use go\core\orm\Mapping;
use go\core\orm\Property;
use go\core\util\DateTime;

/**
 * Album model
 *
 * @copyright (c) 2019-2024, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @author Joachim van de Haterd <jvdhaterd@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
final class Album extends Property
{

	/**
	 *
	 * @var int
	 */
	public int $id;

	/** @var int */
	public int $artistId;

	/** @var string */
	public string $name;

	/** @var DateTime */
	public DateTime $releaseDate;

	/** @var int */
	public int $genreId;

	public array $reviews;

	protected static function defineMapping(): Mapping
	{
		return parent::defineMapping()
			->addTable("tutorial_music_album", "album")
			->addScalar('reviews', 'tutorial_music_review', ['id' => 'albumId']);
	}

}