import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from "typeorm";
import { UseMixins, WithGuildScope } from "./base/mixins";
import { BaseUUIDEntity } from "./base/BaseUUIDEntity";
import type { Guild } from "./Guild.entity";

@Unique("uq_guild_reaction_roles_composite", [
	"guildId",
	"channel",
	"message",
	"role",
	"emoji",
	"option",
])
@Index("idx_guild_reaction_roles_guild_id", ["guildId"])
@Index("idx_guild_reaction_roles_message", ["message"])
@Entity("guild_reaction_roles")
export class GuildReactionRoles extends UseMixins([WithGuildScope], BaseUUIDEntity) {
	@Column({ name: "message", type: "varchar" })
	message: string;

	@Column({ name: "channel", type: "varchar" })
	channel: string;

	@Column({ name: "role", type: "varchar" })
	role: string;

	@Column({ name: "emoji", type: "varchar" })
	emoji: string;

	@Column({ name: "option", type: "int" })
	option: number;

	@ManyToOne("Guild", (guild: Guild) => guild.reactionRoles, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "guild_id" })
	guild: Guild;
}
