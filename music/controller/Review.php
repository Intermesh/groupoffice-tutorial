<?php


namespace go\modules\tutorial\music\controller;

use Exception;
use go\core\jmap\EntityController;
use go\core\util\ArrayObject;
use go\modules\tutorial\music\model;
use go\core\jmap\exception\InvalidArguments;
use go\core\jmap\exception\StateMismatch;

final class Review extends EntityController
{

	/**
	 * The class name of the entity this controller is for.
	 *
	 * @return model\Review::class
	 */
	protected function entityClass(): string
	{
		return model\Review::class;
	}

	/**
	 * Handles the Artist entity's Artist/query command
	 *
	 * @param array $params
	 * @return ArrayObject
	 * @throws InvalidArguments
	 * @see https://jmap.io/spec-core.html#/query
	 */
	public function query(array $params): ArrayObject
	{
		return $this->defaultQuery($params);
	}

	/**
	 * Handles the Artist entity's Artist/get command
	 *
	 * @param array $params
	 * @return ArrayObject
	 * @throws InvalidArguments|Exception
	 * @see https://jmap.io/spec-core.html#/get
	 */
	public function get(array $params): ArrayObject
	{
		return $this->defaultGet($params);
	}

	/**
	 * Handles the Artist entity's Artist/set command
	 *
	 * @see https://jmap.io/spec-core.html#/set
	 * @param array $params
	 * @return ArrayObject
	 * @throws StateMismatch
	 * @throws InvalidArguments
	 */
	public function set(array $params): ArrayObject
	{
		return $this->defaultSet($params);
	}

	/**
	 * Handles the Artist entity's Artist/changes command
	 * @param array $params
	 * @return ArrayObject
	 * @throws InvalidArguments
	 * @see https://jmap.io/spec-core.html#/changes
	 */
	public function changes(array $params): ArrayObject
	{
		return $this->defaultChanges($params);
	}
}
