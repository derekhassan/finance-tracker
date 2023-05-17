-- CreateTable
CREATE TABLE `TransactionType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TransactionType_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionTypeId` INTEGER NOT NULL,
    `transactionGroupId` INTEGER NOT NULL,

    UNIQUE INDEX `Transaction_transactionTypeId_key`(`transactionTypeId`),
    UNIQUE INDEX `Transaction_transactionGroupId_key`(`transactionGroupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TransactionGroup_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountTypeId` INTEGER NOT NULL,

    UNIQUE INDEX `Account_accountTypeId_key`(`accountTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AccountType_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TagToTransaction` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TagToTransaction_AB_unique`(`A`, `B`),
    INDEX `_TagToTransaction_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_transactionTypeId_fkey` FOREIGN KEY (`transactionTypeId`) REFERENCES `TransactionType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_transactionGroupId_fkey` FOREIGN KEY (`transactionGroupId`) REFERENCES `TransactionGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_accountTypeId_fkey` FOREIGN KEY (`accountTypeId`) REFERENCES `AccountType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToTransaction` ADD CONSTRAINT `_TagToTransaction_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToTransaction` ADD CONSTRAINT `_TagToTransaction_B_fkey` FOREIGN KEY (`B`) REFERENCES `Transaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
