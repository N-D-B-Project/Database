import type { DataSource } from "typeorm";
import type { Seeder } from "typeorm-extension";

export class MainSeeder implements Seeder {
	async run(_dataSource: DataSource): Promise<void> {
		// Add child seeders here via runSeeder(dataSource, ChildSeeder)
	}
}
