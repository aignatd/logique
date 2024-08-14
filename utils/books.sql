/*
 Navicat Premium Data Transfer

 Source Server         : Local Mysql
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : ecommerce

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 14/08/2024 22:56:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `author` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `publishedYear` int(4) NOT NULL,
  `genres` json NULL,
  `stock` int(11) NOT NULL,
  `created_at` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `notes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idxTitle`(`title`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES (1, 'Sebuah Seni Untuk Bersikap Bodo Amat', 'Mark Manson', 2021, '[\"Biografi\", \"Pendidikan\", \"Umum\"]', 12, '2024-08-14 17:20:45', '2024-08-14 22:54:31', NULL);
INSERT INTO `books` VALUES (2, 'Home Sweet Loan', 'Almira Bastari', 2021, '[\"Pendidikan\", \"Umum\", \"Fiksi\"]', 78, '2024-08-14 17:22:35', '2024-08-14 22:54:53', NULL);
INSERT INTO `books` VALUES (3, 'The Star and I', 'Ilana Tan', 2022, '[\"Novel\", \"Umum\"]', 36, '2024-08-14 17:24:41', '2024-08-14 22:55:00', NULL);
INSERT INTO `books` VALUES (4, 'Rich Dad Poor Dad', 'Robert T. Kiyosaki', 2022, '[\"Umum\", \"Biografi\"]', 99, '2024-08-14 17:25:38', '2024-08-14 22:55:13', NULL);
INSERT INTO `books` VALUES (6, 'Mencintai pekerjaan bukan perusahaan', 'Agustinus Ignat Deswanto', 2024, '[\"Fiksi\", \"Umum\"]', 765, '2024-08-14 18:39:37', '2024-08-14 22:55:25', NULL);
INSERT INTO `books` VALUES (12, 'Feature AI dan Chat GPT dalam pembuatan web', 'Ignat Deswanto', 2023, '[\"Science\", \"Umum\"]', 11, '2024-08-14 20:55:11', '2024-08-14 22:56:04', NULL);

SET FOREIGN_KEY_CHECKS = 1;
