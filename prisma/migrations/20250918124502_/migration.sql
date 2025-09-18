/*
  Warnings:

  - You are about to drop the column `compositeProfile` on the `Strain` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `access_token` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Strain` DROP COLUMN `compositeProfile`;
