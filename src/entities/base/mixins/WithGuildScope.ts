import { Column } from "typeorm";
import type { AbstractConstructor, MixinReturn } from "./types";

export function WithGuildScope<TBase extends AbstractConstructor>(Base: TBase): MixinReturn<TBase, { guildId: string }> {
	abstract class GuildScopedMixin extends Base {
		@Column({ name: "guild_id", type: "varchar" })
		public guildId: string;
	}
	return GuildScopedMixin as any;
}
