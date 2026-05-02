import "reflect-metadata";
import type { DataSourceOptions } from "typeorm";
import { DataSource } from "typeorm";
import type { SeederOptions } from "typeorm-extension";
import { APIUser } from "./entities/APIUser.entity";
import { Guild } from "./entities/Guild.entity";
import { GuildReactionRoles } from "./entities/GuildReactionRoles.entity";
import { GuildSettings } from "./entities/GuildSettings.entity";
import { Tickets } from "./entities/Tickets.entity";
import { TicketType } from "./entities/TicketType.entity";
import { User } from "./entities/User.entity";
import { UserSettings } from "./entities/UserSettings.entity";
import { NamingStrategy } from "./naming-strategy";

const isProduction = process.env.NODE_ENV === "production";

const options: DataSourceOptions & SeederOptions = {
	type: "postgres",
	url: process.env.DATABASE_URL,
	synchronize: false,
	logging: !isProduction,
	namingStrategy: new NamingStrategy(),
	extra: {
		max: parseInt(process.env.DB_POOL_SIZE ?? "10", 10),
		idleTimeoutMillis: 30_000,
		connectionTimeoutMillis: 5_000,
	},
	entities: [
		Guild,
		GuildSettings,
		GuildReactionRoles,
		Tickets,
		TicketType,
		User,
		UserSettings,
		APIUser,
	],
	migrations: [`${__dirname}/migrations/*{.ts,.js}`],
	seeds: [`${__dirname}/seeds/MainSeeder{.ts,.js}`],
};

export const AppDataSource = new DataSource(options);
