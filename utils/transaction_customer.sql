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

 Date: 17/07/2024 14:23:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for transaction_customer
-- ----------------------------
DROP TABLE IF EXISTS `transaction_customer`;
CREATE TABLE `transaction_customer`  (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `total` decimal(10, 0) NOT NULL DEFAULT 0,
  `delivery_price` decimal(10, 0) NOT NULL DEFAULT 0,
  `delivery_address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `created_at` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`transaction_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of transaction_customer
-- ----------------------------
INSERT INTO `transaction_customer` VALUES (1, 10001, 11000, 11, 'Alamat antaran 1', '2024-07-17 00:06:18', '2024-07-17 00:08:25');
INSERT INTO `transaction_customer` VALUES (2, 10002, 32000, 0, 'Alamat antaran 2', '2024-07-17 00:07:54', '2024-07-17 00:09:57');
INSERT INTO `transaction_customer` VALUES (15, 10003, 12000, 12, 'Jalan antaran 3', '2024-07-17 13:49:57', '2024-07-17 13:49:57');
INSERT INTO `transaction_customer` VALUES (16, 10003, 12000, 12, 'Jalan antaran 3', '2024-07-17 13:51:39', '2024-07-17 13:51:39');

SET FOREIGN_KEY_CHECKS = 1;
