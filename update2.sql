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




