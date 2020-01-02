

DROP TABLE IF EXISTS `user_name`;
CREATE TABLE `user_name` (
    `user_id` INT,
    `first_name` TEXT,
    PRIMARY KEY (`user_id`) USING BTREE
)  ENGINE=MYISAM AUTO_INCREMENT=8 CHARACTER SET=UTF8 COLLATE = UTF8_UNICODE_CI;
-- ----------------------------
  -- Records of categories
  -- ----------------------------
  BEGIN;
INSERT INTO `user_name`
VALUES
  (1,'admin3'),
  (2,'lvhiep'),
  (3,'jecasu'),
  (4,'romeo'), 
  (5,'julyer'), 
  (6,'amande'),
  (7,'peter');
COMMIT;