/** biome-ignore-all lint/suspicious/noExplicitAny: Necessary for Mixins */
import { Column, Index } from "typeorm";
import type { AbstractConstructor, MixinReturn } from "./types";

export function WithExpiresAt<TBase extends AbstractConstructor>(
	Base: TBase,
): MixinReturn<TBase, { expiresAt: Date | null; readonly isExpired: boolean }> {
	@Index("idx_expires_at")
	abstract class ExpiresAtMixin extends Base {
		@Column({ name: "expires_at", type: "timestamptz", nullable: true })
		public expiresAt: Date | null;

		public get isExpired(): boolean {
			return this.expiresAt !== null && this.expiresAt <= new Date();
		}
	}
	return ExpiresAtMixin as any;
}
