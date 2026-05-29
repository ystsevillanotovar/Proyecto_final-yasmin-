-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    INDEX `Usuario_email_idx`(`email`),
    INDEX `Usuario_role_idx`(`role`),
    INDEX `Usuario_is_active_idx`(`is_active`),
    INDEX `Usuario_deleted_at_idx`(`deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Categoria_slug_key`(`slug`),
    INDEX `Categoria_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etiqueta` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Etiqueta_nombre_key`(`nombre`),
    UNIQUE INDEX `Etiqueta_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Juego` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `categoria_id` VARCHAR(191) NOT NULL,
    `puntuacion_metacritic` INTEGER NOT NULL,
    `horas_dedicacion` DOUBLE NOT NULL,
    `completado` BOOLEAN NOT NULL DEFAULT false,
    `fecha_completado` DATETIME(3) NULL,
    `notas` VARCHAR(191) NULL,
    `valoracion` INTEGER NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `Juego_categoria_id_idx`(`categoria_id`),
    INDEX `Juego_usuario_id_idx`(`usuario_id`),
    INDEX `Juego_completado_idx`(`completado`),
    INDEX `Juego_deleted_at_idx`(`deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JuegoEtiqueta` (
    `juego_id` VARCHAR(191) NOT NULL,
    `etiqueta_id` VARCHAR(191) NOT NULL,

    INDEX `JuegoEtiqueta_juego_id_idx`(`juego_id`),
    INDEX `JuegoEtiqueta_etiqueta_id_idx`(`etiqueta_id`),
    PRIMARY KEY (`juego_id`, `etiqueta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Juego` ADD CONSTRAINT `Juego_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juego` ADD CONSTRAINT `Juego_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JuegoEtiqueta` ADD CONSTRAINT `JuegoEtiqueta_juego_id_fkey` FOREIGN KEY (`juego_id`) REFERENCES `Juego`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JuegoEtiqueta` ADD CONSTRAINT `JuegoEtiqueta_etiqueta_id_fkey` FOREIGN KEY (`etiqueta_id`) REFERENCES `Etiqueta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
