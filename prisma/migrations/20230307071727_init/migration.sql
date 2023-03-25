-- CreateTable
CREATE TABLE `answers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(262) NOT NULL,
    `question_id` INTEGER NOT NULL,
    `isCorrect` BOOLEAN NOT NULL,

    INDEX `answers_ibfk_1`(`question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NULL,
    `quiz_id` INTEGER NOT NULL,

    INDEX `questions_ibfk_3`(`quiz_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quizes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(62) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_ibfk_3` FOREIGN KEY (`quiz_id`) REFERENCES `quizes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
