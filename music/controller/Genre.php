<?php

namespace go\modules\tutorial\music\controller;

use go\core\jmap\Entity;
use go\core\jmap\EntityController;
use go\core\jmap\exception\InvalidArguments;
use go\core\util\ArrayObject;
use go\core\jmap\exception\StateMismatch;
use go\modules\tutorial\music\model;

/**
 * The controller for the Genre entity
 *
 * @copyright (c) 2019-2024, Intermesh BV https://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @author Joachim van de Haterd <jvdhaterd@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
final class Genre extends EntityController
{

	/**
	 * The class name of the entity this controller is for.
	 * @return string
	 */
	protected function entityClass(): string
	{
		return model\Genre::class;
	}

	/**
	 * Handles the Genre entity's Genre/query command
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
	 * Handles the Genre entity's Genre/get command
	 *
	 * @param array $params
	 * @return ArrayObject
	 * @throws \Exception
	 * @see https://jmap.io/spec-core.html#/get
	 */
	public function get(array $params): ArrayObject
	{
		return $this->defaultGet($params);
	}

	/**
	 * Handles the Genre entity's Genre/set command
	 *
	 * @see https://jmap.io/spec-core.html#/set
	 * @return ArrayObject
	 * @param array $params
	 * @return array
	 * @throws StateMismatch
	 * @throws InvalidArguments
	 */
	public function set(array $params): ArrayObject
	{
		return $this->defaultSet($params);
	}


	/**
	 * Handles the Genre entity's Genre/changes command
	 *
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

