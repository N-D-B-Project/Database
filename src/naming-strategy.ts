import type { NamingStrategyInterface, Table } from "typeorm";
import { DefaultNamingStrategy } from "typeorm";

export class NamingStrategy
	extends DefaultNamingStrategy
	implements NamingStrategyInterface
{
	primaryKeyName(tableOrName: Table | string, _columnNames: string[]): string {
		const table =
			typeof tableOrName === "string" ? tableOrName : tableOrName.name;
		return `pk_${table}`;
	}

	foreignKeyName(
		tableOrName: Table | string,
		columnNames: string[],
		_referencedTablePath?: string,
		_referencedColumnNames?: string[],
	): string {
		const table =
			typeof tableOrName === "string" ? tableOrName : tableOrName.name;
		return `fk_${table}_${columnNames.join("_")}`;
	}
}
