import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { AbstractConstructor, MixinReturn } from "./types";

export function WithTimestamps<TBase extends AbstractConstructor>(Base: TBase): MixinReturn<TBase, { createdAt: Date; updatedAt: Date }> {
	abstract class TimestampedMixin extends Base {
		@CreateDateColumn({ name: "created_at" })
		public createdAt: Date;

		@UpdateDateColumn({ name: "updated_at" })
		public updatedAt: Date;
	}
	return TimestampedMixin as any;
}
