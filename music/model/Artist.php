<?php
namespace go\modules\tutorial\music\model;

//use go\core\orm\Query;
use go\core\jmap\Entity;
use go\core\orm\CustomFieldsTrait;

class Artist extends Entity {
	use CustomFieldsTrait;

	/** @var int  */							
	public $id;

	/** @var string  */							
	public $name;

	/** @var string  */							
	public $photo;

	/** @var \go\core\util\DateTime  */							
	public $createdAt;

	/** @var \go\core\util\DateTime  */							
	public $modifiedAt;

	/** @var int  */							
	public $createdBy;

	/** @var int  */							
	public $modifiedBy;
	
	/** @var array */
	public $albums;

	/** @var array */
	public $reviews;

	/** @var int */
	protected $albumCount;

	protected static function defineMapping() {
		return parent::defineMapping()
						->addTable('music_artist', 'artist')
						->addMap('albums', Album::class, ['id' => 'artistId']);
	}

	/**
	 * This function returns the columns to search when using the "text" filter.
	 */
	public static function textFilterColumns() {
		return ['name'];
	}


	/**
	 * Define JMAP filters
	 *
	 * Add the 'genres' filter which can be an array of genre IDs
	 * @return \go\core\orm\Filters
	 * @throws \Exception
	 */
	protected static function defineFilters()
	{
		return parent::defineFilters()
			->add('genres', function(\go\core\db\Criteria $criteria, $value,  \go\core\orm\Query $query, array $filter){
				if(!empty($value)) {
					$query->join('music_album', 'album', 'album.artistId = artist.id')
						->groupBy(['artist.id'])
						->where(['album.genreId' => $value]);
				}
			});
	}

	/**
	 * The album count is simply the number of albums as per the artist-album relation
	 *
	 * @return int
	 */
	public function getAlbumCount() :int
	{
		return count($this->albums);
	}
}