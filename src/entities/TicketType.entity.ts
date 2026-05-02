import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Unique,
} from "typeorm";
import { BaseUUIDEntity } from "./base/BaseUUIDEntity";
import type { GuildSettings } from "./GuildSettings.entity";
import type { Tickets } from "./Tickets.entity";

@Unique("uq_ticket_types_name", ["name"])
@Index("idx_ticket_types_guild_settings_id", ["guildSettingsId"])
@Entity("ticket_types")
export class TicketType extends BaseUUIDEntity {
	@Column({ name: "name", type: "varchar", length: 25 })
	name: string;

	@Column({ name: "description", type: "varchar", length: 256 })
	description: string;

	@Column({ name: "message", type: "text" })
	message: string;

	@Column({ name: "emoji", type: "varchar" })
	emoji: string;

	@Column({ name: "support_role_id", type: "varchar", nullable: true })
	supportRoleId: string | null;

	@Column({ name: "category_id", type: "varchar", nullable: true })
	categoryId: string | null;

	@Column({ name: "guild_settings_id", type: "varchar", nullable: true })
	guildSettingsId: string | null;

	@ManyToOne(
		"GuildSettings",
		(settings: GuildSettings) => settings.ticketTypes,
		{
			nullable: true,
			onDelete: "SET NULL",
		},
	)
	@JoinColumn({ name: "guild_settings_id" })
	guildSettings: GuildSettings | null;

	@OneToMany("Tickets", (ticket: Tickets) => ticket.ticketType)
	tickets: Tickets[];
}
