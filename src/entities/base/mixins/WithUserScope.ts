/** biome-ignore-all lint/suspicious/noExplicitAny: Necessary for Mixins */
import { Column } from "typeorm";
import type { AbstractConstructor, MixinReturn } from "./types";

export function WithUserScope<TBase extends AbstractConstructor>(
	Base: TBase,
): MixinReturn<TBase, { userId: string }> {
	abstract class UserScopedMixin extends Base {
		@Column({ name: "user_id", type: "varchar" })
		public userId: string;
	}
	return UserScopedMixin as any;
}
