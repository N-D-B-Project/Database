import { Column, Entity, Index, JoinColumn, OneToOne, Unique } from "typeorm";
import { UseMixins, WithUserScope } from "./base/mixins";
import { BaseUUIDEntity } from "./base/BaseUUIDEntity";
import type { User } from "./User.entity";

@Unique("uq_user_settings_user_id", ["userId"])
@Index("idx_user_settings_user_id", ["userId"])
@Entity("user_settings")
export class UserSettings extends UseMixins([WithUserScope], BaseUUIDEntity) {
	@Column({ name: "premium", type: "boolean", default: false })
	premium: boolean;

	@OneToOne("User", (user: User) => user.settings)
	@JoinColumn({ name: "user_id" })
	user: User;
}
