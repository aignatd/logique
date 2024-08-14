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

 Date: 17/07/2024 14:23:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for transaction_item
-- ----------------------------
DROP TABLE IF EXISTS `transaction_item`;
CREATE TABLE `transaction_item`  (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `sum` decimal(10, 0) NOT NULL DEFAULT 0,
  `created_at` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of transaction_item
-- ----------------------------
INSERT INTO `transaction_item` VALUES (1, 1, 1, 1, 11000, '2024-07-17 00:09:22', '2024-07-17 00:09:22');
INSERT INTO `transaction_item` VALUES (2, 2, 10, 1, 13000, '2024-07-17 00:10:25', '2024-07-17 00:10:25');
INSERT INTO `transaction_item` VALUES (3, 2, 11, 1, 19000, '2024-07-17 00:10:38', '2024-07-17 00:10:38');
INSERT INTO `transaction_item` VALUES (4, 15, 3, 1, 12000, '2024-07-17 13:49:57', '2024-07-17 13:49:57');
INSERT INTO `transaction_item` VALUES (5, 16, 3, 1, 12000, '2024-07-17 13:51:39', '2024-07-17 13:51:39');

SET FOREIGN_KEY_CHECKS = 1;
