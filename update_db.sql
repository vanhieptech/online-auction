DROP TABLE IF EXISTS `wishlist`;
CREATE TABLE `wishlist` (
    `WishID` INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `UserID` INT (11) UNSIGNED NOT NULL,
    `ProID` INT (11) UNSIGNED NOT NULL,
    `ProName` VARCHAR(50)CHARACTER SET UTF8 COLLATE UTF8_UNICODE_CI NOT NULL,
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
  (1, 3, 22, 'Laptop Macbook Pro Touch 2019', 30000000),
  (2, 7, 23,'Laptop Asus ZenBook 14 UX433FN', 4000000),
  (3, 5, 24, 'Laptop Asus Gaming ROG Strix G531GD',4000000),
  (4, 7, 24,'Laptop Asus Gaming ROG Strix G531GD',4000000);
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
    `Rate`INT (11) UNSIGNED NOT NULL,
    `Comment` VARCHAR(100)CHARACTER SET UTF8 COLLATE UTF8_UNICODE_CI NOT NULL,
    PRIMARY KEY (`ReviewID`) USING BTREE
  ) ENGINE = MYISAM AUTO_INCREMENT = 8 CHARACTER 
SET = UTF8 COLLATE = UTF8_UNICODE_CI;
-- ----------------------------
  -- Records of categories
  -- ----------------------------
  BEGIN;
INSERT INTO `reviews`
VALUES
  (1,4, 2,1,'Sản phẩm tốt'),
  (2,4, 2,1,'Sản phẩm tốt'),
  (3,7, 2,1,'Shop xin'),
  (4,7, 3,1,'Sản phẩm tốt'), 
  (5,7, 3,1,'KHong tot'), 
  (6,8, 3,1,'Sản phẩm tốt'),
  (7,8, 3,1,'Sản phẩm lỗi');
COMMIT;

DROP TABLE IF EXISTS `auctions`;
CREATE TABLE `auctions` (
    `AuctionID` INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `UserID` INT (11) UNSIGNED NOT NULL,
    `ProID` INT (11) UNSIGNED NOT NULL,
    `Status`INT (11) UNSIGNED NOT NULL,
    PRIMARY KEY (`AuctionID`) USING BTREE
  ) ENGINE = MYISAM AUTO_INCREMENT = 8 CHARACTER 
SET = UTF8 COLLATE = UTF8_UNICODE_CI;
-- ----------------------------
  -- Records of categories
  -- ----------------------------
  BEGIN;
INSERT INTO `auctions`
VALUES
  (1,4, 23,1),
  (2,4, 24,1),
  (3,7, 25,0),
  (4,7, 25,1), 
  (5,7, 21,0), 
  (6,8, 23,0),
  (7,8, 21,1);
COMMIT;





