/*
  Warnings:

  - You are about to drop the column `Channel` on the `GuildReactionRoles` table. All the data in the column will be lost.
  - You are about to drop the column `Emoji` on the `GuildReactionRoles` table. All the data in the column will be lost.
  - You are about to drop the column `Message` on the `GuildReactionRoles` table. All the data in the column will be lost.
  - You are about to drop the column `Option` on the `GuildReactionRoles` table. All the data in the column will be lost.
  - You are about to drop the column `Role` on the `GuildReactionRoles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guildId,channel,message,role,emoji,option]` on the table `GuildReactionRoles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channel` to the `GuildReactionRoles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emoji` to the `GuildReactionRoles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `GuildReactionRoles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option` to the `GuildReactionRoles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `GuildReactionRoles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuildReactionRoles" DROP COLUMN "Channel",
DROP COLUMN "Emoji",
DROP COLUMN "Message",
DROP COLUMN "Option",
DROP COLUMN "Role",
ADD COLUMN     "channel" TEXT NOT NULL,
ADD COLUMN     "emoji" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "option" INTEGER NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GuildReactionRoles_guildId_channel_message_role_emoji_optio_key" ON "GuildReactionRoles"("guildId", "channel", "message", "role", "emoji", "option");
