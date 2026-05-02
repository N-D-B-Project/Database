// biome-ignore-all lint/suspicious/noExplicitAny: mixin pattern requires any to compose arbitrary constructors
import type { AbstractConstructor, ExtractAdded } from "./types";

abstract class BaseEmptyClass {}

export function UseMixins<const T extends ((base: any) => any)[]>(
	mixins: T,
): abstract new (
	...args: any[]
) => ExtractAdded<T>;

export function UseMixins<
	TBase extends AbstractConstructor,
	const T extends ((base: any) => any)[],
>(
	mixins: T,
	Base: TBase,
): abstract new (
	...args: any[]
) => InstanceType<TBase> & ExtractAdded<T>;

export function UseMixins(
	mixins: ((base: any) => any)[],
	Base?: AbstractConstructor,
): AbstractConstructor {
	return mixins.reduce(
		(cls, mixin) => mixin(cls),
		(Base ?? BaseEmptyClass) as AbstractConstructor,
	);
}
