import { PrimaryGeneratedColumn } from "typeorm";
import { UseMixins, WithTimestamps } from "./mixins/index.js";

export abstract class BaseUUIDEntity extends UseMixins([WithTimestamps]) {
	@PrimaryGeneratedColumn("uuid", { name: "id" })
	public id: string;
}
