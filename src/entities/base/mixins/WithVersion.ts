import { VersionColumn } from "typeorm";
import type { AbstractConstructor, MixinReturn } from "./types";

export function WithVersion<TBase extends AbstractConstructor>(Base: TBase): MixinReturn<TBase, { version: number }> {
	abstract class VersionedMixin extends Base {
		@VersionColumn({ name: "version" })
		public version: number;
	}
	return VersionedMixin as any;
}
