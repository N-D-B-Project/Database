import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTypeORMSchema1776818540402 implements MigrationInterface {
    name = 'InitialTypeORMSchema1776818540402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "api_users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "access_token" character varying NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "uq_api_users_user_id" UNIQUE ("user_id"), CONSTRAINT "REL_6f2be806b69b62e157c7916610" UNIQUE ("user_id"), CONSTRAINT "pk_api_users" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_api_users_user_id" ON "api_users" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "guilds" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" character varying NOT NULL, "name" character varying NOT NULL, "database_version" character varying NOT NULL DEFAULT 'API', CONSTRAINT "pk_guilds" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_guilds_created_at" ON "guilds" ("created_at") `);
        await queryRunner.query(`CREATE TABLE "guild_reaction_roles" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "channel" character varying NOT NULL, "role" character varying NOT NULL, "emoji" character varying NOT NULL, "option" integer NOT NULL, "guild_id" character varying NOT NULL, CONSTRAINT "uq_guild_reaction_roles_composite" UNIQUE ("guild_id", "channel", "message", "role", "emoji", "option"), CONSTRAINT "pk_guild_reaction_roles" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_guild_reaction_roles_message" ON "guild_reaction_roles" ("message") `);
        await queryRunner.query(`CREATE INDEX "idx_guild_reaction_roles_guild_id" ON "guild_reaction_roles" ("guild_id") `);
        await queryRunner.query(`CREATE TABLE "guild_settings" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reaction_dm" boolean NOT NULL DEFAULT true, "premium" boolean NOT NULL DEFAULT false, "ticket_panel_title" character varying, "ticket_panel_desc" text, "ticket_panel_color" character varying(7), "ticket_panel_thumbnail" character varying, "ticket_panel_image" character varying, "ticket_panel_footer" character varying, "ticket_panel_btn_label" character varying, "ticket_panel_btn_emoji" character varying, "ticket_default_role" character varying, "ticket_default_category" character varying, "ticket_default_message" text, "guild_id" character varying NOT NULL, CONSTRAINT "uq_guild_settings_guild_id" UNIQUE ("guild_id"), CONSTRAINT "REL_8d54b64d70e4360466564c8bf2" UNIQUE ("guild_id"), CONSTRAINT "pk_guild_settings" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_guild_settings_guild_id" ON "guild_settings" ("guild_id") `);
        await queryRunner.query(`CREATE TABLE "ticket_types" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(25) NOT NULL, "description" character varying(256) NOT NULL, "message" text NOT NULL, "emoji" character varying NOT NULL, "support_role_id" character varying, "category_id" character varying, "guild_settings_id" uuid, CONSTRAINT "uq_ticket_types_name" UNIQUE ("name"), CONSTRAINT "pk_ticket_types" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_ticket_types_guild_settings_id" ON "ticket_types" ("guild_settings_id") `);
        await queryRunner.query(`CREATE TYPE "public"."guild_tickets_status" AS ENUM('OPEN', 'CLOSED')`);
        await queryRunner.query(`CREATE TABLE "tickets" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "channel_id" character varying, "user_id" character varying, "guild_id" character varying, "ticket_type_id" uuid NOT NULL, "status" "public"."guild_tickets_status" NOT NULL DEFAULT 'OPEN', CONSTRAINT "pk_tickets" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_tickets_status" ON "tickets" ("status") `);
        await queryRunner.query(`CREATE INDEX "idx_tickets_channel_id" ON "tickets" ("channel_id") `);
        await queryRunner.query(`CREATE INDEX "idx_tickets_ticket_type_id" ON "tickets" ("ticket_type_id") `);
        await queryRunner.query(`CREATE INDEX "idx_tickets_user_id" ON "tickets" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "idx_tickets_guild_id" ON "tickets" ("guild_id") `);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" character varying NOT NULL, "database_version" character varying NOT NULL DEFAULT 'API', CONSTRAINT "pk_users" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_users_created_at" ON "users" ("created_at") `);
        await queryRunner.query(`CREATE TABLE "user_settings" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "premium" boolean NOT NULL DEFAULT false, "user_id" character varying NOT NULL, CONSTRAINT "uq_user_settings_user_id" UNIQUE ("user_id"), CONSTRAINT "REL_4ed056b9344e6f7d8d46ec4b30" UNIQUE ("user_id"), CONSTRAINT "pk_user_settings" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_user_settings_user_id" ON "user_settings" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "api_users" ADD CONSTRAINT "fk_api_users_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guild_reaction_roles" ADD CONSTRAINT "fk_guild_reaction_roles_guild_id" FOREIGN KEY ("guild_id") REFERENCES "guilds"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guild_settings" ADD CONSTRAINT "fk_guild_settings_guild_id" FOREIGN KEY ("guild_id") REFERENCES "guilds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_types" ADD CONSTRAINT "fk_ticket_types_guild_settings_id" FOREIGN KEY ("guild_settings_id") REFERENCES "guild_settings"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_guild_id" FOREIGN KEY ("guild_id") REFERENCES "guilds"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_ticket_type_id" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_settings" ADD CONSTRAINT "fk_user_settings_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_settings" DROP CONSTRAINT "fk_user_settings_user_id"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "fk_tickets_ticket_type_id"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "fk_tickets_guild_id"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "fk_tickets_user_id"`);
        await queryRunner.query(`ALTER TABLE "ticket_types" DROP CONSTRAINT "fk_ticket_types_guild_settings_id"`);
        await queryRunner.query(`ALTER TABLE "guild_settings" DROP CONSTRAINT "fk_guild_settings_guild_id"`);
        await queryRunner.query(`ALTER TABLE "guild_reaction_roles" DROP CONSTRAINT "fk_guild_reaction_roles_guild_id"`);
        await queryRunner.query(`ALTER TABLE "api_users" DROP CONSTRAINT "fk_api_users_user_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_settings_user_id"`);
        await queryRunner.query(`DROP TABLE "user_settings"`);
        await queryRunner.query(`DROP INDEX "public"."idx_users_created_at"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tickets_guild_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tickets_user_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tickets_ticket_type_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tickets_channel_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tickets_status"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TYPE "public"."guild_tickets_status"`);
        await queryRunner.query(`DROP INDEX "public"."idx_ticket_types_guild_settings_id"`);
        await queryRunner.query(`DROP TABLE "ticket_types"`);
        await queryRunner.query(`DROP INDEX "public"."idx_guild_settings_guild_id"`);
        await queryRunner.query(`DROP TABLE "guild_settings"`);
        await queryRunner.query(`DROP INDEX "public"."idx_guild_reaction_roles_guild_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_guild_reaction_roles_message"`);
        await queryRunner.query(`DROP TABLE "guild_reaction_roles"`);
        await queryRunner.query(`DROP INDEX "public"."idx_guilds_created_at"`);
        await queryRunner.query(`DROP TABLE "guilds"`);
        await queryRunner.query(`DROP INDEX "public"."idx_api_users_user_id"`);
        await queryRunner.query(`DROP TABLE "api_users"`);
    }

}
