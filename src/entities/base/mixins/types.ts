/** biome-ignore-all lint/suspicious/noExplicitAny: Necessary for Mixins */
export type AbstractConstructor<T = object> = abstract new (
	...args: any[]
) => T;
export type Mixin = (base: AbstractConstructor) => AbstractConstructor;
export type MixinReturn<
	TBase extends AbstractConstructor,
	TAdded,
> = abstract new (...args: any[]) => InstanceType<TBase> & TAdded;

export type UnionToIntersection<U> = (
	U extends any
		? (k: U) => void
		: never
) extends (k: infer I) => void
	? I
	: never;

export type ExtractAdded<T extends ((base: any) => any)[]> =
	UnionToIntersection<
		{
			[K in keyof T]: T[K] extends (
				base: any,
			) => abstract new (
				...args: any[]
			) => infer I
				? I
				: never;
		}[number & keyof T]
	>;
