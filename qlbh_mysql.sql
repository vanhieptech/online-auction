/*
 Navicat Premium Data Transfer

 Source Server         : mySQL
 Source Server Type    : MySQL
 Source Server Version : 100130
 Source Host           : localhost:3306
 Source Schema         : qlbh

 Target Server Type    : MySQL
 Target Server Version : 50799
 File Encoding         : 65001

 Date: 03/08/2018 22:14:47
*/

SET
  NAMES utf8;
SET
  FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
  -- Table structure for categories
  -- ----------------------------
  DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
    `CatID` INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `CatName` VARCHAR (50) CHARACTER SET UTF8 COLLATE UTF8_UNICODE_CI NOT NULL,
    PRIMARY KEY (`CatID`) USING BTREE
  ) ENGINE = MYISAM AUTO_INCREMENT = 8 CHARACTER 
SET = UTF8 COLLATE = UTF8_UNICODE_CI;
-- ----------------------------
  -- Records of categories
  -- ----------------------------
  BEGIN;
INSERT INTO `categories`
VALUES
  (1, 'Sách'),
  (2, 'Máy tính bảng'),
  (3, 'Điện thoại'),
  (4, 'Laptop'),
  (5, 'Đồng hồ'),
  (6, 'Khác');
COMMIT;
-- ----------------------------
  -- Table structure for orderdetails
  -- ----------------------------
  DROP TABLE IF EXISTS `orderdetails`;
CREATE TABLE `orderdetails` (
    `ID` INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `OrderID` INT (11) NOT NULL,
    `ProID` INT (11) NOT NULL,
    `Quantity` INT (11) NOT NULL,
    `Price` BIGINT (20) NOT NULL,
    `Amount` INT (11) NOT NULL,
    PRIMARY KEY (`ID`) USING BTREE
  ) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
	SET = utf8 COLLATE = utf8_unicode_ci;
-- ----------------------------
  -- Table structure for orders
  -- ----------------------------
  DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
    `OrderID` INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `OrderDate` datetime (0) NOT NULL,
    `UserID` INT (11) NOT NULL,
    `Total` BIGINT (20) NOT NULL,
    PRIMARY KEY (`OrderID`) USING BTREE
  ) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
	SET = utf8 COLLATE = utf8_unicode_ci;
-- ----------------------------
  -- Table structure for products
  -- ----------------------------
  DROP TABLE IF EXISTS `products`;
  CREATE TABLE `products` (
    `ProID` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `OwnerID` INT(11) UNSIGNED NOT NULL,
    `UserID` INT(11) UNSIGNED NULL,
    `ProName` VARCHAR(50)CHARACTER SET UTF8 COLLATE UTF8_UNICODE_CI NOT NULL,
    `TinyDes` VARCHAR(100)CHARACTER SET UTF8 COLLATE UTF8_UNICODE_CI NOT NULL,
    `FullDes` TEXT CHARACTER SET UTF8 COLLATE UTF8_UNICODE_CI NOT NULL,
    `Price` INT(11) NOT NULL,
    `Step` INT(11) NOT NULL,
    `PriceToBuy` INT(11),
    `CatID` INT(11) NOT NULL,
    `Voted` INT(11) NULL,
    `Rate` INT(11) NULL,
    `TimeStart` DATETIME NOT NULL,
    `TimeFinish` DATETIME NOT NULL,
    `Extension` BIT NOT NULL,
    PRIMARY KEY (`ProID`) USING BTREE
)  ENGINE=MYISAM AUTO_INCREMENT=31 CHARACTER SET=UTF8 COLLATE = UTF8_UNICODE_CI;
-- ----------------------------
  -- Records of products
  -- ----------------------------
  BEGIN;
INSERT INTO `products`
VALUES
  (
    1,
    1,
    1,
    'NHẬT KÝ 300 NGÀY Ở HARVARD',
    'CẨM NANG DU HỌC MĨ - NHẬT KÝ 300 NGÀY Ở HARVARD - HỌC ĐỂ THAY ĐỔI THẾ GIỚI',
    '<UL>\r\n    <LI>Tác giả:	Trương Phạm Hoài Chung </LI>\r\n    <LI>NXB:	NXB Lao Động</LI>\r\n    <LI>Năm XB:	2019</LI>\r\n    <LI>Trọng lượng (gr):	350</LI>\r\n    <LI>Kích thước:	15 x 23 cm</LI>\r\n     <LI>Số trang:	341</LI>\r\n</UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Trước khi tham gia chương trình Thạc sĩ Giáo dục của Đại Học Harvard, tác giả Trương Phạm Hoài Chung có thời gian 5 năm làm việc trực tiếp với phụ huynh và học sinh cấp 3 ở thành phố Hồ Chí Minh. Tác giả giúp họ vạch ra kế hoạch để xây dựng bộ hồ sơ du học Mỹ thành công, bên cạnh đào tạo các bài thi chuẩn hóa. Tuy nhiên, anh tự thấy mình chưa trả lời thỏa đáng các câu hỏi: Một học sinh điển hình của Mỹ được trang bị những gì trước khi bước vào đại học? Môi trường giáo dục Mỹ hiện đang theo những xu hướng gì? Bài học gì Việt Nam có thể áp dụng ngay để tạo niềm tin cho phụ huynh? Vì thế trong thời gian du học ở Harvard, anh luôn bị thôi thúc viết ra những suy nghĩ và quan sát của mình khi theo học ở ngôi trường này. Và đó là lý do Nhật ký 300 ngày ở Harvard: Học để thay đổi thế giới ra đời.</P>',
    50000,
	2000,
    88000,
    1,
    83,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    2,
    1,
    1,
    'HÃY CỨ ƯỚC MƠ, HÃY CỨ DẠI KHỜ',
    'Hãy Cứ Ước Mơ, Hãy Cứ Dại Khờ. Cẩm nang du học Phần Lan',
    '<UL>\r\n    <LI>Tác giả:	SISU </LI>\r\n    <LI>NXB:	NXB Thế Giới</LI>\r\n    <LI>Năm XB:	01-2018</LI>\r\n    <LI>Trọng lượng (gr):	300</LI>\r\n    <LI>Kích thước:	13 x 20.5 cm</LI>\r\n     <LI>Số trang:	208</LI>\r\n</UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Hãy Cứ Ước Mơ, Hãy Cứ Dại Khờ. Cẩm nang du học Phần Lan. Hiện nay, du học đang phát triển mạnh tại nước ta, bắt nguồn từ nhu cầu hội nhập quốc tế và mở mang tri thức của giới trẻ. Tuy nhiên, việc chọn được một địa điểm du học với nền giáo dục tiên tiến và phù hợp với điều kiện kinh tế của phần lớn các gia đình tại Việt Nam không phải là điều đơn giản. Các quốc gia như Anh, Pháp, Đức, Mỹ hay Úc vẫn là những lựa chọn phổ biến và hấp dẫn nhưng lại có mức học phí cao và nhiều điều kiện ngặt nghèo về học bổng. Trái lại đất nước Phần Lan đang nổi lên như một quốc gia trẻ có nền giáo dục đại học chất lượng cao cùng nhiều chính sách ưu đãi cho sinh viên và chi phí phải chăng. Cuốn sách nhỏ này ra đời từ sáng kiến và sự hợp tác của nhóm tác giả là các bạn trẻ đang học tập, sinh sống tại các vùng miền khác nhau trên đất nước Phần Lan..</P>',
    30000,
	2000,
    70000,
    1,
    64,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    3,
    1,
    1,
    'SỰ THẬT TÀN NHẪN VỀ GIA ĐÌNH, CON CÁI VÀ TIỀN BẠC',
    'Sự Thật Tàn Nhẫn Về Gia Đình, Con Cái Và Tiền Bạc – Bạn đã có tấm bản đồ tài chính cho đời mình?.',
    '<UL>\r\n    <LI>Tác giả:	Kevin OLeary </LI>\r\n    <LI>NXB:	NXB Hồng Đức</LI>\r\n    <LI>Năm XB:	2019</LI>\r\n    <LI>Trọng lượng (gr):	500</LI>\r\n    <LI>Kích thước:	14.5 x 20.5 cm</LI>\r\n     <LI>Số trang:	458</LI>\r\n</UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Sự Thật Tàn Nhẫn Về Gia Đình, Con Cái Và Tiền Bạc – Bạn đã có tấm bản đồ tài chính cho đời mình? Tình yêu, hôn nhân và những đứa trẻ – Đó là các nghi lễ đánh dấu những phần quan trọng nhất trong cuộc đời chúng ta. Xét về cốt lõi, chúng ta đều muốn những thứ giống nhau: sự an toàn và ổn định, hạnh phúc, một cuộc sống tốt đẹp cho cả gia đình. Tiền chỉ đơn giản là thứ giúp chúng ta có được những mong muốn cơ bản, nhưng không có nó, cuộc sống sẽ không được như mong đợi. Bạn khó có thể duy trì được hạnh phúc nếu cứ đau đáu nỗi lo về sự thiếu thốn tiền bạc. Và để làm được việc này một cách dễ dàng bạn hãy đọc cuốn sách “Sự thật tàn nhẫn về gia đình, con cái và tiền bạc” của tỷ phú số 1 nước Mỹ.</P>',
    50000,
	2000,
    140000,
    1,
    86,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    4,
    1,
    1,
    'ĐẢO MỘNG MƠ',
    'Đảo Mộng Mơ. Đảo Mộng Mơ là một lát cắt đời sống của những đứa trẻ',
    '<UL>\r\n    <LI>Tác giả:	Nguyễn Nhật Ánh </LI>\r\n    <LI>NXB:	NXB Trẻ</LI>\r\n    <LI>Năm XB:	2018</LI>\r\n    <LI>Trọng lượng (gr):	280</LI>\r\n    <LI>Kích thước:	20.5 x 13.5 cm</LI>\r\n     <LI>Số trang:	254</LI>\r\n</UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Đảo Mộng Mơ là một lát cắt đời sống của những đứa trẻ lên 10 giàu trí tưởng tượng như tất cả mọi đứa trẻ. Chúng mơ mộng, tưởng tượng, và tự làm "hiện thực hóa" những khao khát của mình. Câu chuyện bắt đầu từ một đống cát, và được diễn ra theo nhân vật tôi - cu Tin. Có một hòn đảo hoang, trên đảo có Chúa đảo, phu nhân Chúa đảo, và một chàng Thứ... Bảy. Hàng ngày vợ chồng Chúa đảo và Thứ Bảy vẫn phải đi học, nhưng sau giờ học là một thế giới khác, của đảo, của biển có cá mập, và rừng có thú dữ. Hấp dẫn, đầy quyến rũ, có cãi vã, có cai trị, có yêu thương, có ẩu đả, và cả...những nụ hôn!.</P>',
    20000,
	2000,
    40000,
    1,
    63,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    5,
    1,
    1,
    'ECONOMIX',
    'ECONOMIX - CÁC NỀN KINH TẾ VẬN HÀNH (VÀ KHÔNG VẬN HÀNH) THẾ NÀO VÀ TẠI SAO?',
    '<UL>\r\n    <LI>Tác giả:	Michael Goodwin </LI>\r\n    <LI>NXB:	NXB  Dân Trí</LI>\r\n    <LI>Năm XB:	2019</LI>\r\n    <LI>Trọng lượng (gr):	350</LI>\r\n    <LI>Kích thước:	17 x 24.5 cm</LI>\r\n     <LI>Số trang:	310</LI>\r\n</UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Nếu các bạn từng tìm cách hiểu những khái niệm kinh tế qua việc đọc vô số giáo trình kinh tế học, nhưng vẫn thấy thật khó hình dung được bức tranh toàn cảnh về bộ môn này, thì cuốn sách sẽ cung cấp cho các bạn một mảnh ghép hoàn chỉnh cho những mảnh nho nhỏ mà các bạn đã đọc qua. Chúng ta sẽ hiểu rõ hơn về những khái niệm kinh tế cơ bản cùng những học thuyết kinh tế lớn còn ảnh hưởng tới ngày nay, qua tư tưởng của các nhà kinh tế học lớn như: Adam Smith, John Keynes... Có thể coi đây là một cuốn sử về lịch sử kinh tế thế giới kể từ khi nền kinh tế hàng hóa ra đời. Chúng ta sẽ lướt qua vài thế kỷ với vô số học thuyết về kinh tế học cùng những vụ khủng hoảng kinh tế lớn như thể đang đọc một cuốn truyện tranh, cả bi lẫn hài, căng thẳng mà không kém phần sảng khoái.</P>',
    30000,
	20000,
    130000,
    1,
    0,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    6,
    1,
    1,
    'BITCOIN THỰC HÀNH',
    'BITCOIN THỰC HÀNH - NHỮNG KHÁI NIỆM CƠ BẢN VÀ CÁCH SỬ DỤNG ĐÚNG ĐỒNG TIỀN MÃ HÓA (MASTERING BITCOIN)',
    '<UL>\r\n    <LI>Tác giả:	Andreas M. Antonopoulos </LI>\r\n    <LI>NXB:	NXB Đại Học Kinh Tế Quốc Dân</LI>\r\n    <LI>Năm XB:	03-2018</LI>\r\n    <LI>Trọng lượng (gr):	600</LI>\r\n    <LI>Kích thước:	16 x 24 cm</LI>\r\n     <LI>Số trang:	540</LI>\r\n</UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Mastering Bitcoin cung cấp các kiến thức cần thiết để giúp độc giả gia nhập thế giới của tiền ảo. Bitcoin là đồng tiền số thành công đầu tiên không do bất kỳ một chính phủ nào phát hành. Mặc dù bitcoin vẫn đang ở giai đoạn mới hình thành tuy nhiên, nó đã tạo ra đươc một nền kinh tế hàng tỉ đô. Nền kinh tế này luôn mở ra chào đón tất cả những ai có kiến thức và đam mê gia nhập. Và cuốn sách cung cấp cho bạn kiến thức, còn bạn chỉ cần theo đuổi nó với đam mê.</P>',
    10000,
	20000,
    220000,
    1,
    62,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    7,
    1,
    1,
    'iPad 10.2 inch Wifi 128GB (2019)',
    'Máy tính bảng iPad 10.2 inch Wifi 128GB',
    '<UL>\r\n    <LI>Màn hình:	LED backlit LCD, 10.2"</LI>\r\n    <LI>Hệ điều hành:	iOS 13</LI>\r\n    <LI>CPU:	Apple A10 Fusion 4 nhân, 2.34 GHz</LI>\r\n    <LI>RAM:	3 GB</LI>\r\n    <LI>Bộ nhớ trong:	128 GB.</LI>\r\n    <LI>Camera sau:	8 MP</LI>\r\n    <LI>Camera trước:	1.2 MP</LI>\r\n    <LI>Kết nối mạng:	WiFi, Không hỗ trợ 3G, Không hỗ trợ 4G</LI>\r\n    <LI>Đàm thoại:	FaceTime</LI>\r\n    <LI>Trọng lượng:	483 g</LI>\r\n    <LI>Trọng lượng 118 g</LI>\r\n    </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Muốn mua một chiếc máy tính bảng với hiệu năng ổn định, có thể dùng trong khoảng 2-3 năm tới với mức giá phải chăng thì không đi đâu xa, chiếc iPad 10.2 inch Wifi 128GB (2019) chính là sự lựa chọn dành cho bạn. iPad luôn cho thấy sự ổn định Sự khác biệt của iPad so với những chiếc máy tính bảng Android khác đó chính là hệ điều hành..</P>',
    3000000,
	200000,
    12000000,
    2,
    15,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    8,
    1,
    1,
    'Samsung Galaxy Tab S6',
    'Máy tính bảng Samsung Galaxy Tab S6',
    '<UL>\r\n    <LI>Màn hình:	Super AMOLED, 10.5"</LI>\r\n    <LI>Hệ điều hành:	Android 9.0 (Pie)</LI>\r\n    <LI>CPU:		Snapdragon 855 8 nhân, 1 nhân 2.84 GHz, 3 nhân 2.41 GHz & 4 nhân 1.78 GHz</LI>\r\n    <LI>RAM:	6 GB</LI>\r\n    <LI>Bộ nhớ trong:	128 GB.</LI>\r\n    <LI>Camera sau:	Chính 13 MP & Phụ 5 MP</LI>\r\n    <LI>Camera trước:	8 MP</LI>\r\n    <LI>Kết nối mạng:	WiFi, 3G, 4G LTE</LI>\r\n    <LI>Đàm thoại:	Có</LI>\r\n    <LI>Trọng lượng:	483 g</LI>\r\n    <LI>Trọng lượng 118 g</LI>\r\n    </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Samsung Galaxy Tab S6 là chiếc máy tính bảng 2 trong 1, được thiết kế để giúp cho những người cần một sản phẩm đủ gọn gàng nhưng mạnh mẽ.</P>',
    4000000,
	200000,
    17000000,
    2,
    74,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    9,
    1,
    1,
    'Samsung Galaxy Tab A 10.1 T515',
    'Máy tính bảng Samsung Galaxy Tab A 10.1 T515',
    '<UL>\r\n    <LI>Màn hình:	TFT LCD, 10.1"</LI>\r\n    <LI>Hệ điều hành:		Android 9.0 (Pie)</LI>\r\n    <LI>CPU:		Exynos 7904 8 nhân, 2 nhân 1.8 GHz & 6 nhân 1.6 GHz</LI>\r\n    <LI>RAM:	3 GB</LI>\r\n    <LI>Bộ nhớ trong:	32 GB.</LI>\r\n    <LI>Camera sau:	8 MP</LI>\r\n    <LI>Camera trước:	5 MP</LI>\r\n    <LI>Kết nối mạng:	WiFi, 3G, 4G LTE</LI>\r\n    <LI>Đàm thoại:	Có</LI>\r\n    <LI>Trọng lượng:	300 g</LI>\r\n    <LI>Trọng lượng 118 g</LI>\r\n    </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Samsung Galaxy Tab A 10.1 T515 (2019) là chiếc máy tính bảng có màn hình lớn cùng cấu hình vừa phải đáp ứng tốt cho bạn trong hầu hết các nhu cầu giải trí hằng ngày.</P>',
    2400000,
	200000,
    7400000,
    2,
    43,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    10,
    1,
    1,
    'iPad Pro 11 inch Wifi 64GB',
    'Máy tính bảng iPad Pro 11 inch Wifi 64GB (2018)',
    '<UL>\r\n    <LI>Màn hình:	Liquid Retina, 11"</LI>\r\n    <LI>Hệ điều hành:		iOS 12</LI>\r\n    <LI>CPU:		Apple A12X Bionic</LI>\r\n    <LI>RAM:	4 GB</LI>\r\n    <LI>Bộ nhớ trong:	64 GB.</LI>\r\n    <LI>Camera sau:	12 MP</LI>\r\n    <LI>Camera trước:	7 MP</LI>\r\n    <LI>Kết nối mạng:	WiFi, Không hỗ trợ 3G, Không hỗ trợ 4G</LI>\r\n    <LI>Đàm thoại:	FaceTime</LI>\r\n    <LI>Trọng lượng:	468 g</LI>\r\n    <LI>Trọng lượng 118 g</LI>\r\n    </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Máy tính bảng iPad Pro 11 inch 64GB Wifi (2018) được ra mắt vào cuối năm 2018, thu hút nhân viên văn phòng, doanh nhân bởi thiết kế hiện đại, đầy sức đột phá và một cấu hình mạnh mẽ đáp ứng tốt tất cả các nhu cầu từ giải trí đến làm việc..</P>',
    5000000,
	200000,
    22000000,
    2,
    80,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    11,
    1,
    1,
    'Huawei MediaPad M5 Lite',
    'Máy tính bảng Huawei MediaPad M5 Lite',
    '<UL>\r\n    <LI>Màn hình:	IPS LCD Full HD, 10.1"</LI>\r\n    <LI>Hệ điều hành:		Android 8.0</LI>\r\n    <LI>CPU:		Kirin 659, 1.7 GHz</LI>\r\n    <LI>RAM:	4 GB</LI>\r\n    <LI>Bộ nhớ trong:	64 GB.</LI>\r\n    <LI>Camera sau:	8 MP</LI>\r\n    <LI>Camera trước:	8 MP</LI>\r\n    <LI>Kết nối mạng:	WiFi, 3G, 4G LTE</LI>\r\n    <LI>Đàm thoại:	Có</LI>\r\n    <LI>Trọng lượng:	423 g</LI>\r\n    <LI>Trọng lượng 118 g</LI>\r\n    </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Nếu bạn đang tìm kiếm một chiếc máy tính bảng chạy hệ điều hành Android phục vụ cho công việc hay giải trí cao cấp thì Huawei Mediapad M5 Lite là sự lựa chọn đáng quan tâm bởi màn hình lớn, CPU ngon và hỗ trợ 4G.</P>',
    2500000,
	200000,
    8000000,
    2,
    88,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    12,
    1,
    1,
    'Huawei MediaPad T3 10',
    'Máy tính bảng Huawei MediaPad T3 10 (2017)',
    '<UL>\r\n    <LI>Màn hình:	PLS LCD, 10"</LI>\r\n    <LI>Hệ điều hành:	Android 7.0</LI>\r\n    <LI>CPU:	Snapdragon 425 4 nhân, 1.4 GHz</LI>\r\n    <LI>RAM:	2 GB</LI>\r\n    <LI>Bộ nhớ trong:	16 GB.</LI>\r\n    <LI>Camera sau:	5 MP</LI>\r\n    <LI>Camera trước:	 2 MP</LI>\r\n    <LI>Kết nối mạng:	WiFi, 3G, 4G LTE</LI>\r\n    <LI>Đàm thoại:	Có</LI>\r\n    <LI>Trọng lượng:	413 g</LI>\r\n    <LI>Trọng lượng 118 g</LI>\r\n    </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Huawei MediaPad T3 10 (2017) là chiếc máy tính bảng với màn hình kích thước lớn cùng khe cắm sim tiện lợi giúp người dùng có thể nghe gọi như một chiếc smartphone. Thiết kế mỏng, đẹp Về tổng thể, máy nổi bật với phần khung viền kim loại sang trọng, kết hợp màu sắc hiện đại cho cảm giác khá thanh lịch, nhẹ nhàng.</P>',
    1200000,
	200000,
    4500000,
    2,
    61,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    13,
    1,
    1,
    'iPhone 11 64GB',
    'Điện thoại iPhone 11 64GB',
    '<UL>\r\n    <LI>Màn hình:		IPS LCD, 6.1", Liquid Retina</LI>\r\n    <LI>Hệ điều hành:		iOS 13</LI>\r\n    <LI>CPU:		Apple A13 Bionic 6 nhân</LI>\r\n    <LI>RAM:	4 GB</LI>\r\n    <LI>Bộ nhớ trong:	64 GB.</LI>\r\n    <LI>Camera sau:	Chính 12 MP & Phụ 12 MP</LI>\r\n    <LI>Camera trước:	 12 MP</LI>\r\n    <LI>Kết nối mạng:	WiFi, 3G, 4G LTE</LI>\r\n    <LI>Dung lượng pin:	3110 mAh, có sạc nhanh</LI>\r\n    <LI>Trọng lượng:	413 g</LI>\r\n    <LI>Trọng lượng 118 g</LI>\r\n  Thẻ SIM:1 eSIM & 1 Nano SIM Hỗ trợ 4G </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Sau bao nhiêu chờ đợi cũng như đồn đoán thì cuối cùng Apple đã chính thức giới thiệu bộ 3 siêu phẩm iPhone 11 mạnh mẽ nhất của mình vào tháng 9/2019. Có mức giá rẻ nhất nhưng vẫn được nâng cấp mạnh mẽ như chiếc iPhone Xr năm ngoái, đó chính là phiên bản iPhone 11 64GB..</P>',
    16000000,
	2000000,
    22000000,
    3,
    92,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    14,
    1,
    1,
    'Samsung Galaxy Fold',
    'Điện thoại Samsung Galaxy Fold',
    '<UL>\r\n    <LI>Màn hình:	Chính: Dynamic AMOLED, phụ: Super AMOLED, Chính 7.3" & Phụ 4.6", Quad HD (2K)</LI>\r\n    <LI>Hệ điều hành:	Android 9.0 (Pie)</LI>\r\n    <LI>CPU:	Snapdragon 855 8 nhân</LI>\r\n    <LI>RAM:	12 GB</LI>\r\n    <LI>Bộ nhớ trong:	512 GB.</LI>\r\n    <LI>Camera sau:	Chính 12 MP & Phụ 12 MP, 16 MP</LI>\r\n    <LI>Camera trước:	 Trong: 10 MP, 8 MP; Ngoài: 10 MP</LI>\r\n    <LI>Kết nối mạng:	WiFi, 3G, 4G LTE</LI>\r\n    <LI>Thẻ SIM: 1 eSIM & 1 Nano SIM, Hỗ trợ 4G</LI>\r\n    <LI>Dung lượng pin:	4380 mAh, có sạc nhanh</LI>\r\n    </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Sau rất nhiều chờ đợi thì Samsung Galaxy Fold - chiếc smartphone màn hình gập đầu tiên của Samsung cũng đã chính thức trình làng với thiết kế mới lạ. Thiết kế 2 màn hình, màn hình uốn dẻo.</P>',
    30000000,
	2000000,
    50000000,
    3,
    0,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    15,
    1,
    1,
    'iPhone 11 Pro Max 512GB',
    'Hiệu năng "đè bẹp" mọi đối thủ',
    '<UL>\r\n    <LI>Màn hình:	OLED, 6.5", Super Retina XDR</LI>\r\n    <LI>Hệ điều hành:		iOS 13</LI>\r\n    <LI>CPU:	Apple A13 Bionic 6 nhân</LI>\r\n    <LI>RAM:	4 GB</LI>\r\n    <LI>Bộ nhớ trong:	512 GB</LI>\r\n    <LI>Camera sau:	3 camera 12 MP</LI>\r\n    <LI>Camera trước:	 12 MP</LI>\r\n    <LI>Thẻ SIM: 1 eSIM & 1 Nano SIM, Hỗ trợ 4G</LI>\r\n    <LI>Dung lượng pin:	3969 mAh, có sạc nhanh</LI>\r\n   </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Để tìm kiếm một chiếc smartphone có hiệu năng mạnh mẽ và có thể sử dụng mượt mà trong 2-3 năm tới thì không có chiếc máy nào xứng đang hơn chiếc iPhone 11 Pro Max 512GB mới ra mắt trong năm 2019 của Apple..</P>',
    30000000,
	2000000,
    45000000,
    3,
    22,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    16,
    1,
    1,
    'iPhone Xs 256GB',
    'Tích hợp chip Apple A12 hiệu năng mạnh mẽ bậc nhất',
    '<UL>\r\n    <LI>Màn hình:	OLED, 5.8", Super Retina</LI>\r\n    <LI>Hệ điều hành:			iOS 12</LI>\r\n    <LI>CPU:		Apple A12 Bionic 6 nhân</LI>\r\n    <LI>RAM:	4 GB</LI>\r\n    <LI>Bộ nhớ trong:	256 GB</LI>\r\n    <LI>Camera sau:	Chính 12 MP & Phụ 12 MP</LI>\r\n    <LI>Camera trước:	 7 MP</LI>\r\n    <LI>Thẻ SIM: 1 eSIM & 1 Nano SIM, Hỗ trợ 4G</LI>\r\n    <LI>Dung lượng pin:	2658 mAh, có sạc nhanh</LI>\r\n   </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Chiếc điện thoại iPhone mới đã chính thức được ra mắt vào đêm 12/9 theo giờ Việt Nam, trong đó có phiên bản iPhone Xs 256GB với bộ nhớ khủng, cấu hình mạnh mẽ với chip Apple A12 và những tính năng đẳng cấp khác.</P>',
    20000000,
	2000000,
    30000000,
    3,
    81,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    17,
    1,
    1,
    'Samsung Galaxy S10+ (512GB)',
    'Khác biệt tới từ màn hình Infinity-O',
    '<UL>\r\n    <LI>Màn hình:	Dynamic AMOLED, 6.4", Quad HD+ (2K+)</LI>\r\n    <LI>Hệ điều hành:			Android 9.0 (Pie)</LI>\r\n    <LI>CPU:		Exynos 9820 8 nhân</LI>\r\n    <LI>RAM:	8 GB</LI>\r\n    <LI>Bộ nhớ trong:	512 GB</LI>\r\n    <LI>Camera sau:	Chính 12 MP & Phụ 12 MP, 16 MP</LI>\r\n    <LI>Camera trước:	 	Chính 10 MP & Phụ 8 MP</LI>\r\n    <LI>Thẻ SIM: 1 eSIM & 1 Nano SIM, Hỗ trợ 4G</LI>\r\n    <LI>Dung lượng pin:	3969 mAh, có sạc nhanh</LI>\r\n   </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Samsung Galaxy S10+ 512GB - phiên bản kỷ niệm 10 năm chiếc Galaxy S đầu tiên ra mắt, là một chiếc smartphone hội tủ đủ các yếu tố mà bạn cần ở một chiếc máy cao cấp trong năm 2019.</P>',
    20000000,
	2000000,
    30000000,
    3,
    33,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    18,
    1,
    1,
    'Samsung Galaxy Note 9',
    'Một chút thay đổi trong thiết kế',
    '<UL>\r\n    <LI>Màn hình:	Super AMOLED, 6.4", Quad HD+ (2K+)</LI>\r\n    <LI>Hệ điều hành:			Android 8.1 (Oreo)</LI>\r\n    <LI>CPU:		Exynos 9810 8 nhân</LI>\r\n    <LI>RAM:	6 GB</LI>\r\n    <LI>Bộ nhớ trong:	128 GB</LI>\r\n    <LI>Camera sau:	Chính 12 MP & Phụ 12 MP</LI>\r\n    <LI>Camera trước:	 8 MP</LI>\r\n    <LI>Thẻ SIM: 2 SIM Nano (SIM 2 chung khe thẻ nhớ), Hỗ trợ 4G</LI>\r\n    <LI>Dung lượng pin:	4000 mAh, có sạc nhanh</LI>\r\n   </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Mang lại sự cải tiến đặc biệt trong cây bút S Pen, siêu phẩm Samsung Galaxy Note 9 còn sở hữu dung lượng pin khủng lên tới 4.000 mAh cùng hiệu năng mạnh mẽ vượt bậc, xứng đáng là một trong những chiếc điện thoại cao cấp nhất của Samsung..</P>',
    10000000,
	2000000,
    23000000,
    3,
    10,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    19,
    1,
    1,
    'OPPO Reno2',
    'Nâng cấp mạnh mẽ về camera',
    '<UL>\r\n    <LI>Màn hình:	Sunlight AMOLED, 6.55", Full HD+</LI>\r\n    <LI>Hệ điều hành:		Android 9.0 (Pie)</LI>\r\n    <LI>CPU:	Snapdragon 730G 8 nhân</LI>\r\n    <LI>RAM:	8 GB</LI>\r\n    <LI>Bộ nhớ trong:	256 GB</LI>\r\n    <LI>Camera sau:	Chính 48 MP & Phụ 13 MP, 8 MP, 2 MP</LI>\r\n    <LI>Camera trước:	 16 MP</LI>\r\n    <LI>Thẻ SIM: 2 SIM Nano (SIM 2 chung khe thẻ nhớ), Hỗ trợ 4G</LI>\r\n    <LI>Dung lượng pin:	4000 mAh, có sạc nhanh</LI>\r\n   </UL>\r\n<STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Sau sự thành công của chiếc OPPO Reno với thiết kế mới lạ, camera chất lượng thì mới đây OPPO tiếp tục giới thiệu phiên bản nâng cấp của chiếc smartphone này là chiếc OPPO Reno2.</P>',
    5000000,
	2000000,
    15000000,
    3,
    17,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    20,
    1,
    1,
    'Laptop Apple MacBook Air 2017 i5 1.8GHz/8GB/128GB (MQD32SA/A)',
    'Thiết kế siêu mỏng và nhẹ ',
    '<UL>\r\n    <LI>CPU:	Intel Core i5 Broadwell, 1.80 GHz</LI>\r\n    <LI>RAM:	8 GB, DDR3L(On board), 1600 MHz</LI>\r\n    <LI>Ổ cứng:	SSD: 128 GB</LI>\r\n    <LI>Màn hình:	13.3 inch, WXGA+(1440 x 900)</LI>\r\n    <LI>Card màn hình:	Card đồ họa tích hợp, Intel HD Graphics 6000</LI>\r\n    <LI>Cổng kết nối:	MagSafe 2, 2 x USB 3.0, Thunderbolt 2</LI>\r\n    <LI>Hệ điều hành:	Mac OS</LI>\r\n    <LI>Kích thước:	Dày 17 mm, 1.35 Kg</LI>\r\n     </UL>\r\n <STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>MacBook Air 2017 i5 128GB là mẫu laptop văn phòng, có thiết kế siêu mỏng và nhẹ, vỏ nhôm nguyên khối sang trọng. Máy có hiệu năng ổn định, thời lượng pin cực lâu 12 giờ, phù hợp cho hầu hết các nhu cầu làm việc và giải trí.</P>',
    4000000,
	2000000,
    22400000,
    4,
    0,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    21,
    1,
    1,
    'Laptop Apple Macbook Pro Touch 2019 i5 1.4GHz/8GB/128GB (MUHN2SA/A)',
    'Hiệu năng vượt tr',
    '<UL>\r\n    <LI>CPU:	Intel Core i5 Coffee Lake, 1.40 GHz</LI>\r\n    <LI>RAM:		8 GB, DDR3L, 2133 MHz</LI>\r\n    <LI>Ổ cứng:		SSD: 128 GB</LI>\r\n    <LI>Màn hình:		13.3 inch, Retina (2560 x 1600)</LI>\r\n    <LI>Card màn hình:		Card đồ họa tích hợp, Intel Iris Plus Graphics 645</LI>\r\n    <LI>Cổng kết nối:		2 x Thunderbolt 3 (USB-C)</LI>\r\n    <LI>Hệ điều hành:	Mac OS</LI>\r\n    <LI>Kích thước:	Dày 14.9 mm, 1.37 kg</LI>\r\n     </UL>\r\n <STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Laptop Apple MacBook Pro Touch 2019 i5 (MUHN2SA/A) là thế hệ laptop mới của dòng MacBook Pro. Khoác lên mình vẻ ngoài đẳng cấp, cấu hình mạnh mẽ cùng nhiều tính năng hiện đại, chiếc laptop Apple MacBook Pro là một trong những chiếc laptop cao cấp - sang trọng đáng sở hữu nhất hiện nay..</P>',
    20000000,
	2000000,
    34000000,
    4,
    74,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    22,
    1,
    1,
    'Laptop Macbook Pro Touch 2019 i9 2.3GHz/16GB/512GB/4GB Radeon 560X (MV912SA/A)',
    'Thiết kế đẳng cấp thời thượng',
    '<UL>\r\n    <LI>CPU:	Intel Core i9 Coffee Lake, 2.30 GHz</LI>\r\n    <LI>RAM:		16 GB, DDR4 (On board), 2400 MHz</LI>\r\n    <LI>Ổ cứng:	SSD: 	SSD 512GB</LI>\r\n    <LI>Màn hình:		15.4 inch, Retina (2880 x 1800)</LI>\r\n    <LI>Card màn hình:		Card đồ họa rời, AMD Radeon™ RX 560X 4GB</LI>\r\n    <LI>Cổng kết nối:	4 x Thunderbolt 3 (USB-C)</LI>\r\n    <LI>Hệ điều hành:	Mac OS</LI>\r\n    <LI>Kích thước:	Cao 15.5 mm, 1.83 kg</LI>\r\n     </UL>\r\n <STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Laptop Macbook Pro Touch 2019 i9 (MV912SA/A) - siêu phẩm mạnh mẽ nhất hiện nay của Apple sẽ đem đến những trải nghiệm mà không phải chiếc laptop nào cũng có được. Thiết kế hoàn mỹ, hiệu năng sở hữu nhiều cải tiến cùng các tính năng hiện đại là những gì mà MacBook ProTouch 2019 đem đến.</P>',
    30000000,
	2000000,
    69000000,
    4,
    30,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    23,
    1,
    1,
    'Laptop Asus ZenBook 14 UX433FN i5 8265U/8GB/512GB/2GB MX150/Win10 (A6124T)',
    'Mang lại hiệu quả công việc tốt nhất',
    '<UL>\r\n    <LI>CPU:	Intel Core i5 Coffee Lake, 8265U, 1.60 GHz</LI>\r\n    <LI>RAM:	8 GB, DDR3L(On board), 2133 MHz</LI>\r\n    <LI>Ổ cứng:	SSD: SSD 512 GB M.2 PCIe</LI>\r\n    <LI>Màn hình:		14 inch, Full HD (1920 x 1080)</LI>\r\n    <LI>Card màn hình:	Card đồ họa rời, NVIDIA Geforce MX150, 2GB</LI>\r\n    <LI>Cổng kết nối:		2 x USB 2.0, USB 3.1, HDMI, USB Type-C</LI>\r\n    <LI>Hệ điều hành:		Windows 10 Home SL</LI>\r\n    <LI>Kích thước:	Dày 15.9 mm, 1.19 kg</LI>\r\n     </UL>\r\n <STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Laptop Asus ZenBook UX433FA-A6124T là chiếc laptop mỏng nhẹ, trọng lượng chỉ 1,19 kg phù hợp với những ai có nhu cầu di chuyển nhiều. Cấu hình của laptop Asus mạnh mẽ phục vụ tốt cho nhu cầu văn phòng, học tập.</P>',
    4000000,
	2000000,
    26000000,
    4,
    5,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    24,
    1,
    1,
    'Laptop Asus Gaming ROG Strix G531GD i7 9750H/8GB/512GB/4GB GTX1050/Win10 (AL034T)',
    'Thiết kế hầm hố chuẩn gaming',
    '<UL>\r\n    <LI>CPU:	Intel Core i7 Coffee Lake, 9750H, 2.60 GHz</LI>\r\n    <LI>RAM:		8 GB, DDR4 (2 khe), 2666 MHz</LI>\r\n    <LI>Ổ cứng:	SSD: 	SSD 512 GB M.2 PCIe, Hỗ trợ khe cắm HDD SATA</LI>\r\n    <LI>Màn hình:	15.6 inch, Full HD (1920 x 1080)</LI>\r\n    <LI>Card màn hình:	Card đồ họa rời, NVIDIA GeForce GTX 1050, 4GB</LI>\r\n    <LI>Cổng kết nối:		3 x USB 3.1, HDMI, LAN (RJ45), USB Type-C</LI>\r\n    <LI>Hệ điều hành:		Windows 10 Home SL</LI>\r\n    <LI>Kích thước:	Dày 25.8 mm, 2.40 kg</LI>\r\n     </UL>\r\n <STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Laptop ASUS Gaming ROG G531GD i7 (AL034T) là một “cỗ máy chiến game” cực kì ấn tượng với vẻ ngoài cực ngầu, cấu hình khủng. ASUS Gaming ROG là một trong số những chiếc laptop gaming được các game thủ mong chờ nhất hiện nay. </P>',
    4000000,
	2000000,
    24900000,
    4,
    22,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    25,
    1,
    1,
    'Laptop Asus ZenBook Duo UX481F i5 10210U/8GB/512GB/2GB MX250/Pen/Win10 (BM048T)',
    'Khẳng định đẳng cấp thiết kế',
    '<UL>\r\n    <LI>CPU:		Intel Core i5 Comet Lake, 10210U, 1.60 GHz</LI>\r\n    <LI>RAM:		8 GB, DDR3L(On board), 2133 MHz</LI>\r\n    <LI>Ổ cứng:	SSD 512 GB M.2 PCIe</LI>\r\n    <LI>Màn hình:		14 inch, Full HD (1920 x 1080)</LI>\r\n    <LI>Card màn hình:		Card đồ họa rời, NVIDIA GeForce MX250 2GB</LI>\r\n    <LI>Cổng kết nối:		2 x USB 3.1, HDMI, USB Type-C</LI>\r\n    <LI>Hệ điều hành:		Windows 10 Home SL</LI>\r\n    <LI>Kích thước:	:	Dày 19.9 mm, 1.57 kg</LI>\r\n     </UL>\r\n <STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Mang thiết kế hướng tới tương lai, Asus ZenBook Duo UX481F đột phá với 2 màn hình độc đáo mang đến không gian làm việc tối ưu nhất. Thân máy siêu nhẹ luôn luôn sẵn sàng để bạn mang vội đi làm..</P>',
    8000000,
	2000000,
    33000000,
    4,
    52,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    26,
    1,
    1,
    'Apple Watch S3 GPS 42mm',
    'Thiết kế hiện đại năng động',
    '<UL>\r\n    <LI>Công nghệ màn hình:	AMOLED</LI>\r\n    <LI>Kích thước màn hình:	1.65 inch</LI>\r\n    <LI>Thời gian sử dụng pin:	Khoảng 18 giờ</LI>\r\n    <LI>Hệ điều hành:	iOS 13 trở lên</LI>\r\n    <LI>Chất liệu mặt:	Ion-X strengthened glass</LI>\r\n    <LI>Kết nối:	Bluetooth v4.2, GPS</LI>\r\n    <LI>Tiện ích:	Đo nhịp tim, Tính lượng Calories tiêu thụ, Đếm số bước chân, Tính quãng đường chạy, Chế độ luyện tập, Báo thức, Nghe nhạc với tai nghe Bluetooth, Từ chối cuộc gọi, Dự báo thời tiết, Điều khiển chơi nhạc, Thay mặt đồng hồ</LI>\r\n     </UL>\r\n <STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Về mặt tổng thể Apple Watch S3 42 mm có kích thước tương tự như Apple Watch Series 2. Sản phẩm chú trọng thêm về mặt thẩm mỹ với thiết kế sang trọng, năng động, dây đeo có nhiều màu sắc khác nhau..</P>',
    2000000,
	200000,
    6500000,
    5,
    11,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    27,
    1,
    1,
    'Apple Watch S5 LTE 40mm',
    'Sự kết hợp khéo léo, độc đáo',
    '<UL>\r\n    <LI>Công nghệ màn hình:	OLED</LI>\r\n    <LI>Kích thước màn hình:	1.57 inch</LI>\r\n    <LI>Thời gian sử dụng pin:	Khoảng 18 giờ, Khoảng 2 ngày</LI>\r\n    <LI>Hệ điều hành:	iOS 13 trở lên</LI>\r\n    <LI>Chất liệu mặt:	Ion-X strengthened glass</LI>\r\n    <LI>Kết nối:		Wifi, Bluetooth v5.0, GPS, Hỗ trợ eSim</LI>\r\n    <LI>Tiện ích:	Đo nhịp tim, Tính lượng Calories tiêu thụ, Đếm số bước chân, Tính quãng đường chạy, Chế độ luyện tập, Định vị, Đếm bước chân, Đồng hồ đếm ngược, Phát hiện té ngã, Báo thức, Nghe nhạc với tai nghe Bluetooth, Màn hình luôn hiển thị, Gọi điện trên đồng hồ, Từ chối cuộc gọi, Dự báo thời tiết, La bàn, Đồng hồ bấm giờ, Điều khiển chơi nhạc, Rung thông báo, Thay mặt đồng hồ, Nhận cuộc gọi, Tìm điện thoại</LI>\r\n     </UL>\r\n <STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Về mặt tổng thể Apple Watch S3 42 mm có kích thước tương tự như Apple Watch Series 2. Sản phẩm chú trọng thêm về mặt thẩm mỹ với thiết kế sang trọng, năng động, dây đeo có nhiều màu sắc khác nhau..</P>',
    5000000,
	2000000,
    14000000,
    5,
    28,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    28,
    1,
    1,
    'Đồng hồ Nam Kenneth Cole KC50780005',
    'Kiểu dáng hiện đại, thanh lịch',
    '<UL>\r\n    <LI>Đường kính mặt:	42.9 mm</LI>\r\n    <LI>Chất liệu khung viền:h</LI>\r\n    <LI>Độ dày mặt:	Dày 12.8 mm</LI>\r\n    <LI>Độ rộng dây:	20 mm</LI>\r\n    <LI>Chất liệu mặt:	Ion-X strengthened glass</LI>\r\n    <LI>Chống nước:	3 ATM - Rửa tay, đi mưa</LI>\r\n    <LI>Thương hiệu:	Mỹ</LI>\r\n     </UL>\r\n <STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Đồng hồ Kenneth Cole đã trở thành thương hiệu hấp dẫn đối với các tín đồ thời trang trên toàn thế giới. Danh tiếng của thương hiệu được tạo dựng bởi các thiết kế độc đáo, mang nét đặc trưng riêng của Kenneth Cole. Đồng hồ Kenneth Cole luôn bắt kịp các xu hướng mới nhất, được tìm thấy ở mọi nơi từ các sàn diễn thời trang đình đám đến những cung đường phố đời thường trong cuộc sống.</P>',
    1000000,
	2000000,
    3000000,
    5,
    29,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    29,
    1,
    1,
    'Đồng hồ thông minh Samsung Galaxy Watch Active 2 44mm',
    'Sang trọng, thời trang',
    '<UL>\r\n    <LI>Công nghệ màn hình:	SUPER AMOLED</LI>\r\n    <LI>Kích thước màn hình:	1.4 inch</LI>\r\n    <LI>Thời gian sử dụng pin:	Khoảng 18 giờ</LI>\r\n    <LI>Hệ điều hành:	Android 5.0, iOS 10 trở lên</LI>\r\n    <LI>Chất liệu mặt:	Kính cường lực Gorilla Glass Dx+</LI>\r\n    <LI>Kết nối:		Wifi, Bluetooth v5.0, GPS, NFC</LI>\r\n    <LI>Tiện ích:	Theo dõi giấc ngủ, Đo nhịp tim, Tính lượng Calories tiêu thụ, Đếm số bước chân, Tính quãng đường chạy, Chế độ luyện tập, Báo thức, Nghe nhạc với tai nghe Bluetooth, Gọi điện trên đồng hồ, Từ chối cuộc gọi, Dự báo thời tiết, Đồng hồ bấm giờ, Thay mặt đồng hồ, Nhận cuộc gọi, Tìm điện thoại</LI>\r\n     </UL>\r\n <STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Đồng hồ thông minh Samsung Galaxy Watch Active 2 cải tiến hơn với màn hình chống chói, hiển thị thông tin sắc nét. Các tiện ích khác cũng được nâng cấp nhằm mang lại sự tiện lợi nhất cho người dùng..</P>',
    3000000,
	2000000,
    8000000,
    5,
    49,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  ),
  (
    30,
    1,
    1,
    'Đồng hồ thông minh Honor Watch Magic 42mm',
    'Thiết kế sáng tạo, mỏng nhẹ tinh xảo',
    '<UL>\r\n    <LI>Công nghệ màn hình:	AMOLED</LI>\r\n    <LI>Kích thước màn hình:	1.2 inch</LI>\r\n    <LI>Thời gian sử dụng pin:	Khoảng 7 ngày</LI>\r\n    <LI>Hệ điều hành:	Android 4.4 trở lên, iOS 9 trở lên</LI>\r\n    <LI>Chất liệu mặt:	Kính Aluminosilicate</LI>\r\n    <LI>Kết nối:	Bluetooth v4.2, GPS</LI>\r\n    <LI>Tiện ích:	Theo dõi giấc ngủ, Đo nhịp tim, Tính lượng Calories tiêu thụ, Đếm số bước chân, Chế độ luyện tập, Đồng hồ đếm ngược, Đếm bước chân, Báo thức, Màn hình luôn hiển thị, La bàn, Đồng hồ bấm giờ, Rung thông báo, Thay mặt đồng hồ</LI>\r\n     </UL>\r\n <STRONG>Giới thiệu nội dung sản phẩm</STRONG><BR>\r\n<P>Đồng hồ thông minh Honor Watch Magic 42mm theo như những đánh giá thì đây là phiên bản thiết kế khá hoàn hảo của Huawei, sự thay đổi về mặt thiết kế giúp cho chiếc đồng hồ trở nên nhỏ gọn hơn, bên cạnh những tính năng quen thuộc của một chiếc đồng hồ thông minh như: Chăm sóc sức khỏe, kết nối,...</P>',
    1000000,
	2000000,
    3300000,
    5,
    0,
    3,
    "2017-06-15 09:34:21",
    "2019-06-15 09:34:21",
    0
  );
COMMIT;
-- ----------------------------
  -- Table structure for users
  -- ----------------------------
  DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT,
    `f_Username` VARCHAR (50) CHARACTER 
			SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `f_Password` VARCHAR (255) CHARACTER 
			SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `f_Name` VARCHAR (50) CHARACTER 
			SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `f_Email` VARCHAR (50) CHARACTER 
			SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `f_DOB` datetime NOT NULL,
    `f_phone` int NOT NULL,
    `f_address` nvarchar(50) NOT NULL,
    `f_Permission` INT NOT NULL,
    `f_Evaluate` float,
    PRIMARY KEY (`id`) USING BTREE
  ) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET
  FOREIGN_KEY_CHECKS = 1;
