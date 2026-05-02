import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseUUIDEntity } from "./base/BaseUUIDEntity";
import type { Guild } from "./Guild.entity";
import type { TicketType } from "./TicketType.entity";
import type { User } from "./User.entity";

export enum GuildTicketsStatus {
	OPEN = "OPEN",
	CLOSED = "CLOSED",
}

@Index("idx_tickets_guild_id", ["guildId"])
@Index("idx_tickets_user_id", ["userId"])
@Index("idx_tickets_ticket_type_id", ["ticketTypeId"])
@Index("idx_tickets_channel_id", ["channelId"])
@Index("idx_tickets_status", ["status"])
@Index("idx_tickets_created_at", ["createdAt"])
@Entity("tickets")
export class Tickets extends BaseUUIDEntity {
	@Column({ name: "channel_id", type: "varchar", nullable: true })
	channelId: string | null;

	@Column({ name: "user_id", type: "varchar", nullable: true })
	userId: string | null;

	@Column({ name: "guild_id", type: "varchar", nullable: true })
	guildId: string | null;

	@Column({ name: "ticket_type_id", type: "varchar" })
	ticketTypeId: string;

	@Column({
		name: "status",
		type: "enum",
		enum: GuildTicketsStatus,
		enumName: "guild_tickets_status",
		default: GuildTicketsStatus.OPEN,
	})
	status: GuildTicketsStatus;

	@ManyToOne("User", (user: User) => user.tickets, {
		nullable: true,
		onDelete: "SET NULL",
	})
	@JoinColumn({ name: "user_id" })
	user: User | null;

	@ManyToOne("Guild", (guild: Guild) => guild.tickets, {
		nullable: true,
		onDelete: "SET NULL",
	})
	@JoinColumn({ name: "guild_id" })
	guild: Guild | null;

	@ManyToOne("TicketType", (type: TicketType) => type.tickets, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "ticket_type_id" })
	ticketType: TicketType;
}
