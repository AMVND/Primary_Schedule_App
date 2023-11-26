create database scheduleapp;
-- TABLE MON HOC
CREATE TABLE `tbl_monhoc` (
  `ma_monhoc` varchar(10) NOT NULL,
  `ten_monhoc` varchar(45) NOT NULL,
  `loai_monhoc` varchar(45) NOT NULL,
  PRIMARY KEY (`ma_monhoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- TABLE PHAN MON
CREATE TABLE `tbl_phanmon` (
  `ma_phanmon` varchar(10) NOT NULL,
  `ten_phanmon` varchar(45) NOT NULL,
  `ma_monhoc` varchar(10) NOT NULL,
  PRIMARY KEY (`ma_phanmon`),
  KEY `ma_monhoc_idx` (`ma_monhoc`),
  CONSTRAINT `ma_monhoc` FOREIGN KEY (`ma_monhoc`) REFERENCES `tbl_monhoc` (`ma_monhoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- TABLE TIET HOC
CREATE TABLE `tbl_tiethoc` (
  `ma_tiethoc` varchar(10) NOT NULL,
  `tiethoc` int NOT NULL,
  `ngay_hoc` date NOT NULL,
  `ma_phanmon` varchar(10) NOT NULL,
  `fileword` varchar(100) NOT NULL,
  PRIMARY KEY (`ma_tiethoc`),
  KEY `ma_phanmon_idx` (`ma_phanmon`),
  CONSTRAINT `ma_phanmon` FOREIGN KEY (`ma_phanmon`) REFERENCES `tbl_phanmon` (`ma_phanmon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- TABLE TUAN HOC
CREATE TABLE `tbl_tuanhoc` (
  `ma_tuanhoc` varchar(10) NOT NULL,
  `thu_hoc` int NOT NULL,
  `ma_phanmon` varchar(10) NOT NULL,
  `fileword` varchar(100) NOT NULL,
  PRIMARY KEY (`ma_tuanhoc`),
  KEY `ma_phanmon_idx` (`ma_phanmon`),
  CONSTRAINT `ma_phanmon_tuanhoc` FOREIGN KEY (`ma_phanmon`) REFERENCES `tbl_phanmon` (`ma_phanmon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- INSERT MONHOC
INSERT INTO tbl_monhoc (ma_monhoc, ten_monhoc, loai_monhoc) VALUES
('toan','Toán', 'Khong'),
('tv','Tiếng Việt', 'HocPhan'),
('ta','Tiếng Anh', 'Khong');