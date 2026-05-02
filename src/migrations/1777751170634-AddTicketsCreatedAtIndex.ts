import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTicketsCreatedAtIndex1777751170634 implements MigrationInterface {
    name = 'AddTicketsCreatedAtIndex1777751170634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx_tickets_created_at" ON "tickets" ("created_at") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_tickets_created_at"`);
    }

}
