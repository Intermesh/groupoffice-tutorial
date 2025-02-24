<?php

namespace go\modules\tutorial\music\controller;

use Exception;
use go\core\jmap\EntityController;
use go\core\jmap\exception\InvalidArguments;
use go\core\util\ArrayObject;
use go\core\jmap\exception\StateMismatch;
use go\modules\tutorial\music\model;

/**
 * The controller for the Artist entity
 *
 * @copyright (c) 2019-2024, Intermesh BV https://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @author Joachim van de Haterd <jvdhaterd@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
final class Artist extends EntityController
{

	/**
	 * The class name of the entity this controller is for.
	 *
	 */
	protected function entityClass(): string
	{
		return model\Artist::class;
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
	 * @throws Exception
	 * @throws InvalidArguments
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

