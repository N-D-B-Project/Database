import {
	Column,
	Entity,
	Index,
	JoinColumn,
	OneToMany,
	OneToOne,
	Unique,
} from "typeorm";
import { UseMixins, WithGuildScope } from "./base/mixins";
import { BaseUUIDEntity } from "./base/BaseUUIDEntity";
import type { Guild } from "./Guild.entity";
import type { TicketType } from "./TicketType.entity";

@Unique("uq_guild_settings_guild_id", ["guildId"])
@Index("idx_guild_settings_guild_id", ["guildId"])
@Entity("guild_settings")
export class GuildSettings extends UseMixins([WithGuildScope], BaseUUIDEntity) {
	@Column({ name: "reaction_dm", type: "boolean", default: true })
	reactionDM: boolean;

	@Column({ name: "premium", type: "boolean", default: false })
	premium: boolean;

	@Column({ name: "ticket_panel_title", type: "varchar", nullable: true })
	ticketPanelTitle: string | null;

	@Column({ name: "ticket_panel_desc", type: "text", nullable: true })
	ticketPanelDesc: string | null;

	@Column({ name: "ticket_panel_color", type: "varchar", length: 7, nullable: true })
	ticketPanelColor: string | null;

	@Column({ name: "ticket_panel_thumbnail", type: "varchar", nullable: true })
	ticketPanelThumbnail: string | null;

	@Column({ name: "ticket_panel_image", type: "varchar", nullable: true })
	ticketPanelImage: string | null;

	@Column({ name: "ticket_panel_footer", type: "varchar", nullable: true })
	ticketPanelFooter: string | null;

	@Column({ name: "ticket_panel_btn_label", type: "varchar", nullable: true })
	ticketPanelBtnLabel: string | null;

	@Column({ name: "ticket_panel_btn_emoji", type: "varchar", nullable: true })
	ticketPanelBtnEmoji: string | null;

	@Column({ name: "ticket_default_role", type: "varchar", nullable: true })
	ticketDefaultRole: string | null;

	@Column({ name: "ticket_default_category", type: "varchar", nullable: true })
	ticketDefaultCategory: string | null;

	@Column({ name: "ticket_default_message", type: "text", nullable: true })
	ticketDefaultMessage: string | null;

	@OneToOne("Guild", (guild: Guild) => guild.settings)
	@JoinColumn({ name: "guild_id" })
	guild: Guild;

	@OneToMany("TicketType", (ticketType: TicketType) => ticketType.guildSettings)
	ticketTypes: TicketType[];
}
