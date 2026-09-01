import "reflect-metadata";
import type { DataSourceOptions } from "typeorm";
import { DataSource } from "typeorm";
import type { SeederOptions } from "typeorm-extension";
import { APIUser } from "./entities/APIUser.entity.js";
import { Guild } from "./entities/Guild.entity.js";
import { GuildReactionRoles } from "./entities/GuildReactionRoles.entity.js";
import { GuildSettings } from "./entities/GuildSettings.entity.js";
import { Tickets } from "./entities/Tickets.entity.js";
import { TicketType } from "./entities/TicketType.entity.js";
import { User } from "./entities/User.entity.js";
import { UserSettings } from "./entities/UserSettings.entity.js";
import { NamingStrategy } from "./naming-strategy.js";

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
	migrations: [`${import.meta.dirname}/migrations/*{.ts,.js}`],
	seeds: [`${import.meta.dirname}/seeds/MainSeeder{.ts,.js}`],
};

export const AppDataSource = new DataSource(options);
