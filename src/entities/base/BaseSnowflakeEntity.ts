import { PrimaryColumn } from "typeorm";
import { UseMixins, WithTimestamps } from "./mixins/index.js";

export abstract class BaseSnowflakeEntity extends UseMixins([WithTimestamps]) {
	@PrimaryColumn({ name: "id", type: "varchar" })
	public id: string;
}
