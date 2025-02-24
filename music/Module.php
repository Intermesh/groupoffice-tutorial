<?php

namespace go\modules\tutorial\music;

use go\core;

/**
 * @copyright (c) 2019-2024, Intermesh BV https://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @author Joachim van de Haterd <jvdhaterd@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
class Module extends core\Module
{

	public function getAuthor(): string
	{
		return "Intermesh BV <info@intermesh.nl>";
	}

	public function getStatus(): string
	{
		return self::STATUS_STABLE;
	}
}