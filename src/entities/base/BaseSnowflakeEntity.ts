import { PrimaryColumn } from "typeorm";
import { UseMixins, WithTimestamps } from "./mixins";

export abstract class BaseSnowflakeEntity extends UseMixins([WithTimestamps]) {
	@PrimaryColumn({ name: "id", type: "varchar" })
	public id: string;
}
