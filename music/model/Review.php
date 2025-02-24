<?php


namespace go\modules\tutorial\music\model;

use Exception;
use go\core\acl\model\AclOwnerEntity;
use go\core\db\Criteria;
use go\core\orm\Filters;
use go\core\orm\Mapping;
use go\core\orm\Query;

final class Review extends AclOwnerEntity
{
	/** @var int */
	public int $id;
	/** @var int */
	public $aclId;
	/** @var int */
	public int $createdBy;
	/** @var int */
	public int $albumId;
	/** @var int */
	public int $modifiedBy;
	/** @var int */
	public int $rating;
	/** @var string */
	public string $title;
	/** @var string */
	public string  $body;
	/** @var string */
	public string $albumtitle;

	protected static function defineMapping(): Mapping
	{
		return parent::defineMapping()
			->addTable('tutorial_music_review')
			->addQuery((new Query())->select('a.name AS albumtitle')
				->join('tutorial_music_album', 'a', 'a.id=tutorial_music_review.albumId'));
	}

	protected function internalSave(): bool
	{
		if ($this->isNew()) {
			$this->albumtitle = go()->getDbConnection()
				->selectSingleValue('name')
				->from('tutorial_music_album')
				->where(['id' => $this->albumId])
				->single();
		}

		$this->changeArtist([$this->albumId]);

		return parent::internalSave();
	}


	protected static function internalDelete(Query $query): bool
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
	private static function changeArtist(array $albumIds): void
	{
		Artist::entityType()->changes(
			go()->getDbConnection()
				->select('art.id, null, 0')
				->from('tutorial_music_artist', 'art')
				->join('tutorial_music_album', 'alb', 'alb.artistId = art.id')
				->where('alb.id', 'IN', $albumIds)
		);
	}

	protected static function defineFilters(): Filters
	{
		return parent::defineFilters()
			->add('albumId', function (Criteria $criteria, $value, Query $query, array $filter) {
				if (!empty($value)) {
					$query->where(['tutorial_music_review.albumId' => $value]);
				}
			});

	}


}