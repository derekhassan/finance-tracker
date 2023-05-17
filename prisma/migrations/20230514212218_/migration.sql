/*
  Warnings:

  - You are about to drop the column `transactionGroupId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `TransactionGroup` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[TransactionOccasionId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_transactionGroupId_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `transactionGroupId`,
    ADD COLUMN `TransactionOccasionId` INTEGER NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `TransactionGroup`;

-- CreateTable
CREATE TABLE `TransactionOccasion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TransactionOccasion_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Transaction_TransactionOccasionId_key` ON `Transaction`(`TransactionOccasionId`);

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_TransactionOccasionId_fkey` FOREIGN KEY (`TransactionOccasionId`) REFERENCES `TransactionOccasion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
