/** biome-ignore-all lint/suspicious/noExplicitAny: Necessary for Mixins */
import { DeleteDateColumn } from "typeorm";
import type { AbstractConstructor, MixinReturn } from "./types";

export function WithSoftDelete<TBase extends AbstractConstructor>(
	Base: TBase,
): MixinReturn<TBase, { deletedAt: Date | null }> {
	abstract class SoftDeletableMixin extends Base {
		@DeleteDateColumn({ name: "deleted_at" })
		public deletedAt: Date | null;
	}
	return SoftDeletableMixin as any;
}
