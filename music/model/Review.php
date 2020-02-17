<?php


namespace go\modules\tutorial\music\model;

use Exception;
use go\core\acl\model\AclOwnerEntity;
use go\core\orm\Query;

class Review extends AclOwnerEntity
{
	/** @var int */
	public $id;
	/** @var int */
	public $aclId;
	/** @var int */
	public $createdBy;
	/** @var int */
	public $albumId;
	/** @var int */
	public $modifiedBy;
	/** @var int */
	public $rating;
	/** @var string */
	public $title;
	/** @var string */
	public $body;
	/** @var string */
	public $albumtitle;

	protected static function defineMapping()
	{
		return parent::defineMapping()
			->addTable('music_review')
			->setQuery((new Query())->select('a.name AS albumtitle')
				->join('music_album', 'a', 'a.id=music_review.albumId'));
	}

	protected function internalSave()
	{
		if ($this->isNew()) {
			$this->albumtitle = go()->getDbConnection()
				->selectSingleValue('name')
				->from('music_album')
				->where(['id' => $this->albumId])
				->single();
		}

		$this->changeArtist([$this->albumId]);

		return parent::internalSave();
	}


	protected static function internalDelete(Query $query)
	{
		//Create clone to avoid changes to the  original delete query object
		$deleteQuery = clone $query;

		//Select albums of artists affected by this delete
		$deleteQuery->selectSingleValue('albumId');

		static::changeArtist($deleteQuery->all());

		return parent::internalDelete($query);
	}

	/**
	 * Our review has effect on Artist entities because they implement getAlbumCount().
	 *
	 * @param array $albumIds
	 * @throws Exception
	 */
	private static function changeArtist(array $albumIds)
	{
		Artist::entityType()->changes(
			go()->getDbConnection()
				->select('art.id, null, 0')
				->from('music_artist', 'art')
				->join('music_album', 'alb', 'alb.artistId = art.id')
				->where('alb.id', 'IN', $albumIds)
		);
	}

	protected static function defineFilters()
	{
		return parent::defineFilters()
			->add('albumId', function (\go\core\db\Criteria $criteria, $value, \go\core\orm\Query $query, array $filter) {
				if (!empty($value)) {
					$query->where(['music_review.albumId' => $value]);
				}
			});

	}


}