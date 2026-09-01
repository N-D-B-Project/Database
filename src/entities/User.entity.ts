import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import type { APIUser } from "./APIUser.entity.js";
import { BaseSnowflakeEntity } from "./base/BaseSnowflakeEntity.js";
import type { Tickets } from "./Tickets.entity.js";
import type { UserSettings } from "./UserSettings.entity.js";

@Index("idx_users_created_at", ["createdAt"])
@Entity("users")
export class User extends BaseSnowflakeEntity {
	@Column({ name: "database_version", type: "varchar", default: "API" })
	databaseVersion: string;

	@OneToOne("UserSettings", (settings: UserSettings) => settings.user)
	settings: UserSettings;

	@OneToOne("APIUser", (apiUser: APIUser) => apiUser.user)
	apiUser: APIUser;

	@OneToMany("Tickets", (ticket: Tickets) => ticket.user)
	tickets: Tickets[];
}
