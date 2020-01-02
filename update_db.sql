DROP TABLE IF EXISTS `wishlist`;
CREATE TABLE `wishlist` (
  `WishID` INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `UserID` INT (11) UNSIGNED NOT NULL,
  `ProID` INT (11) UNSIGNED NOT NULL,
  `ProName` VARCHAR(50) CHARACTER SET UTF8 COLLATE UTF8_UNICODE_CI NOT NULL,
  `Price` INT(11) NOT NULL,
  PRIMARY KEY (`WishID`) USING BTREE
) ENGINE = MYISAM AUTO_INCREMENT = 8 CHARACTER 
SET = UTF8 COLLATE = UTF8_UNICODE_CI;
-- ----------------------------
-- Records of categories
-- ----------------------------
BEGIN;
INSERT INTO `wishlist`
VALUES
  (
    1,
    3,
    22,
    'Laptop Macbook Pro Touch 2019',
    30000000
  ),
  (
    2,
    7,
    23,
    'Laptop Asus ZenBook 14 UX433FN',
    4000000
  ),
  (
    3,
    5,
    24,
    'Laptop Asus Gaming ROG Strix G531GD',
    4000000
  ),
  (
    4,
    7,
    24,
    'Laptop Asus Gaming ROG Strix G531GD',
    4000000
  );
COMMIT;
DROP TABLE IF EXISTS `requests`;
CREATE TABLE `requests` (
    `ID` INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `UserID` INT (11) UNSIGNED NOT NULL,
    PRIMARY KEY (`ID`) USING BTREE
  ) ENGINE = MYISAM AUTO_INCREMENT = 8 CHARACTER 
SET = UTF8 COLLATE = UTF8_UNICODE_CI;
-- ----------------------------
  -- Records of categories
  -- ----------------------------
  BEGIN;
INSERT INTO `requests`
VALUES
  (1, 5),
  (3, 8);
COMMIT;
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
    `ReviewID` INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `UserID` INT (11) UNSIGNED NOT NULL,
    `RatedID` INT (11) UNSIGNED NOT NULL,
    `Rate` INT (11) NOT NULL,
    `Comment` VARCHAR(100) CHARACTER SET UTF8 COLLATE UTF8_UNICODE_CI NOT NULL,
    `TimeRate` DATETIME NOT NULL,
    PRIMARY KEY (`ReviewID`) USING BTREE
  ) ENGINE = MYISAM AUTO_INCREMENT = 8 CHARACTER 
SET = UTF8 COLLATE = UTF8_UNICODE_CI;
-- ----------------------------
  -- Records of categories
  -- ----------------------------
  BEGIN;
INSERT INTO `reviews`
VALUES
  (1, 4, 2, 1, 'Sản phẩm tốt', subtime(now(), '1 1:5:0')),
  (2, 4, 2, 1, 'Sản phẩm tốt', subtime(now(), '1 3:8:0')),
  (3, 1, 2, 1, 'Shop xin', subtime(now(), '4 2:5:0')),
  (4, 1, 3, 1, 'Sản phẩm tốt', subtime(now(), '8 1:5:0')),
  (5, 1, 3, 1, 'KHong tot', subtime(now(), '1 1:20:0')),
  (
    6,
    3,
    3,
    1,
    'Sản phẩm tốt',
    subtime(now(), '20 1:5:0')
  ),
  (
    7,
    4,
    3,
    1,
    'Sản phẩm lỗi',
    subtime(now(), '11 8:5:0')
  );
COMMIT;
DROP TABLE IF EXISTS `biddinglist`;
CREATE TABLE `biddinglist` (
    `AuctionID` INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `UserID` INT (11) UNSIGNED NOT NULL,
    `UserName` VARCHAR (50) CHARACTER 
			SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `ProID` INT (11) UNSIGNED NOT NULL,
    `Price` INT(11) NOT NULL,
    `Time` DATETIME NOT NULL,
    `Status` INT (11) NOT NULL,
    PRIMARY KEY (`AuctionID`) USING BTREE
  ) ENGINE = MYISAM AUTO_INCREMENT = 8 CHARACTER 
SET = UTF8 COLLATE = UTF8_UNICODE_CI;
-- ----------------------------
  -- Records of categories
  -- ----------------------------
  BEGIN;
INSERT INTO `biddinglist`
VALUES
  (1, 4, 'admin4', 23, 8000000, '2019-06-16 09:34:21', 1),
  (2, 4, 'admin4', 24, 6000000, '2019-06-20 09:34:21', 1),
  (3, 6, 'admin6', 26, 8000000, '2019-06-15 02:54:21', 2),
  (
    4,
    6,
    'admin6',
    25,
    10000000,
    '2019-06-17 09:36:21',
    2
  ),
  (
    5,
    6,
    'admin6',
    21,
    22000000,
    '2019-06-14 09:34:21',
    0
  ),
  (6, 7, 'admin7', 23, 6000000, '2019-06-12 09:34:21', 0),
  (
    7,
    7,
    'admin7',
    21,
    24000000,
    '2019-06-15 09:34:21',
    1
  );
COMMIT;
ALTER TABLE products
ADD
  FULLTEXT KEY ProName (ProName);
ALTER TABLE categories
ADD
  FULLTEXT KEY CatName (CatName);
-------------------------------
  DROP TABLE IF EXISTS `waitinglist`;
CREATE TABLE `waitinglist` (
    `WaitID` INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `UserID` INT (11) UNSIGNED NOT NULL,
    `ProID` INT (11) UNSIGNED NOT NULL,
    `Price` INT(11) NOT NULL,
    PRIMARY KEY (`WaitID`) USING BTREE
  ) ENGINE = MYISAM AUTO_INCREMENT = 8 CHARACTER 
SET = UTF8 COLLATE = UTF8_UNICODE_CI;
-- ----------------------------
  -- Records of categories
  -- ----------------------------
  BEGIN;
INSERT INTO `waitinglist`
VALUES
  (1, 3, 22, 30000000),
  (2, 7, 23, 4000000),
  (3, 5, 24, 4000000),
  (4, 7, 24, 4000000);
COMMIT;