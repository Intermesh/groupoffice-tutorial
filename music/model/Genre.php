<?php

namespace go\modules\tutorial\music\model;
						
use go\core\jmap\Entity;
use go\core\orm\Mapping;

/**
 * Genre model
 *
 * @copyright (c) 2019-2024, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @author Joachim van de Haterd <jvdhaterd@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
final class Genre extends Entity
{

	/**
	 *
	 * @var int
	 */
	public int $id;

	/**
	 *
	 * @var string
	 */
	public string $name;

	protected static function defineMapping(): Mapping
	{
		return parent::defineMapping()
			->addTable("tutorial_music_genre", "genre");
	}

}