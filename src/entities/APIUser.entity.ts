import { Column, Entity, Index, JoinColumn, OneToOne, Unique } from "typeorm";
import { BaseUUIDEntity } from "./base/BaseUUIDEntity";
import { UseMixins, WithUserScope } from "./base/mixins";
import type { User } from "./User.entity";

@Unique("uq_api_users_user_id", ["userId"])
@Index("idx_api_users_user_id", ["userId"])
@Entity("api_users")
export class APIUser extends UseMixins([WithUserScope], BaseUUIDEntity) {
	@Column({ name: "email", type: "varchar" })
	email: string;

	@Column({ name: "access_token", type: "varchar" })
	accessToken: string;

	@OneToOne("User", (user: User) => user.apiUser)
	@JoinColumn({ name: "user_id" })
	user: User;
}
