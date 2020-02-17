<?php
namespace go\modules\tutorial\music\model;
						
use go\core\orm\Property;

/**
 * Album model
 *
 * @copyright (c) 2020, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
class Album extends Property {
	/** @var int  */
	public $id;

	/** @var int  */							
	public $artistId;

	/** @var string  */							
	public $name;

	/** @var \go\core\util\DateTime  */							
	public $releaseDate;

	/** @var int  */							
	public $genreId;

	protected static function defineMapping() {
		return parent::defineMapping()
			->addTable('music_album', 'album')
			->addScalar('reviews', 'music_review', ['id' => 'albumId']);
	}
}