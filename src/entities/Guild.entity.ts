import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { BaseSnowflakeEntity } from "./base/BaseSnowflakeEntity.js";
import type { GuildReactionRoles } from "./GuildReactionRoles.entity.js";
import type { GuildSettings } from "./GuildSettings.entity.js";
import type { Tickets } from "./Tickets.entity.js";

@Index("idx_guilds_created_at", ["createdAt"])
@Entity("guilds")
export class Guild extends BaseSnowflakeEntity {
	@Column({ name: "name", type: "varchar" })
	name: string;

	@Column({ name: "database_version", type: "varchar", default: "API" })
	databaseVersion: string;

	@OneToOne("GuildSettings", (settings: GuildSettings) => settings.guild)
	settings: GuildSettings;

	@OneToMany("GuildReactionRoles", (rr: GuildReactionRoles) => rr.guild)
	reactionRoles: GuildReactionRoles[];

	@OneToMany("Tickets", (ticket: Tickets) => ticket.guild)
	tickets: Tickets[];
}
