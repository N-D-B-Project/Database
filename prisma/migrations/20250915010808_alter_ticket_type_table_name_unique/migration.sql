/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TicketType` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."GuildSettings" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "TicketType_name_key" ON "public"."TicketType"("name");
