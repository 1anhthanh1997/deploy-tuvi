// 12 cung trong lá số tử vi
const CUNG = [
  "Mệnh",
  "Phụ Mẫu",
  "Phúc Đức",
  "Điền Trạch",
  "Quan Lộc",
  "Nô Bộc",
  "Thiên Di",
  "Tật Ách",
  "Tài Bạch",
  "Tử Tức",
  "Phu Thê",
  "Huynh Đệ",
];

// Các bảng an sao
const SAO_TU_VI = [1, 4, 7, 10];
const SAO_THIEN_CO = [3, 6, 9, 0];
const SAO_THAI_DUONG = [0, 2, 4, 6, 8, 10];
const SAO_THIEN_LUONG = [2, 5, 8, 11];
const SAO_THIEN_DONG = [1, 3, 5, 7, 9, 11];
const SAO_THIEN_TUONG = [4, 7, 10, 1];
const SAO_THIEN_PHU = [0, 3, 6, 9];
const SAO_VU_KHUC = [2, 5, 8, 11];
const SAO_THAM_LANG = [1, 4, 7, 10];
const SAO_PHA_QUAN = [3, 6, 9, 0];
const SAO_THAI_AM = [2, 5, 8, 11];
const SAO_THAT_SAT = [0, 3, 6, 9];
const SAO_LIEM_TRINH = [1, 4, 7, 10];

// Các sao văn tinh và hóa tinh
const SAO_TA_PHU = [1, 4, 7, 10];
const SAO_HUU_BAT = [3, 6, 9, 0];
const SAO_VAN_XUONG = [2, 5, 8, 11];
const SAO_VAN_KHUC = [0, 3, 6, 9];
const SAO_HOA_KY = [1, 4, 7, 10];

// Các sao tài lộc và hung tinh
const SAO_LOC_TON = [2, 5, 8, 11];
const SAO_HOA_LOC = [1, 3, 6, 9];
const SAO_HOA_QUYEN = [0, 4, 7, 10];
const SAO_DIA_KHONG = [2, 5, 8, 11];
const SAO_DIA_KIEP = [1, 4, 7, 10];

// Các sao bổ sung
const SAO_HOA_KHOA = [3, 6, 9, 0];
const SAO_DAO_HOA = [2, 5, 8, 11];
const SAO_HONG_LOAN = [1, 4, 7, 10];
const SAO_KIEP_SAT = [0, 3, 6, 9];

// Các sao mới
const SAO_THIEN_MA = [3, 6, 9, 0];
const SAO_LONG_TRI = [1, 4, 7, 10];
const SAO_PHUONG_CAC = [2, 5, 8, 11];

// Hàm xác định vị trí sao
function anSao(chieuCung: number, cungBatDau: number, viTri: number[]): number {
  return (cungBatDau + viTri[chieuCung % viTri.length]) % 12;
}

// Hàm an sao chính và sao phụ
function anSaoChinh(
  ngay: number,
  thang: number,
  nam: number,
  gio: number
): Record<string, string> {
  let cungBatDau = gio % 12; // Cung Mệnh tính theo giờ sinh

  return {
    "Tử Vi": CUNG[anSao(thang, cungBatDau, SAO_TU_VI)],
    "Thiên Cơ": CUNG[anSao(thang, cungBatDau, SAO_THIEN_CO)],
    "Thái Dương": CUNG[anSao(thang, cungBatDau, SAO_THAI_DUONG)],
    "Thiên Lương": CUNG[anSao(thang, cungBatDau, SAO_THIEN_LUONG)],
    "Thiên Đồng": CUNG[anSao(thang, cungBatDau, SAO_THIEN_DONG)],
    "Thiên Tướng": CUNG[anSao(thang, cungBatDau, SAO_THIEN_TUONG)],

    // Các sao phụ
    "Thiên Phủ": CUNG[anSao(thang, cungBatDau, SAO_THIEN_PHU)],
    "Vũ Khúc": CUNG[anSao(thang, cungBatDau, SAO_VU_KHUC)],
    "Tham Lang": CUNG[anSao(thang, cungBatDau, SAO_THAM_LANG)],
    "Phá Quân": CUNG[anSao(thang, cungBatDau, SAO_PHA_QUAN)],
    "Thái Âm": CUNG[anSao(thang, cungBatDau, SAO_THAI_AM)],
    "Thất Sát": CUNG[anSao(thang, cungBatDau, SAO_THAT_SAT)],
    "Liêm Trinh": CUNG[anSao(thang, cungBatDau, SAO_LIEM_TRINH)],

    // Sao văn tinh và hóa tinh
    "Tả Phù": CUNG[anSao(thang, cungBatDau, SAO_TA_PHU)],
    "Hữu Bật": CUNG[anSao(thang, cungBatDau, SAO_HUU_BAT)],
    "Văn Xương": CUNG[anSao(thang, cungBatDau, SAO_VAN_XUONG)],
    "Văn Khúc": CUNG[anSao(thang, cungBatDau, SAO_VAN_KHUC)],
    "Hóa Kỵ": CUNG[anSao(thang, cungBatDau, SAO_HOA_KY)],

    // Sao tài lộc và hung tinh
    "Lộc Tồn": CUNG[anSao(thang, cungBatDau, SAO_LOC_TON)],
    "Hóa Lộc": CUNG[anSao(thang, cungBatDau, SAO_HOA_LOC)],
    "Hóa Quyền": CUNG[anSao(thang, cungBatDau, SAO_HOA_QUYEN)],
    "Địa Không": CUNG[anSao(thang, cungBatDau, SAO_DIA_KHONG)],
    "Địa Kiếp": CUNG[anSao(thang, cungBatDau, SAO_DIA_KIEP)],

    // Các sao bổ sung
    "Hóa Khoa": CUNG[anSao(thang, cungBatDau, SAO_HOA_KHOA)],
    "Đào Hoa": CUNG[anSao(thang, cungBatDau, SAO_DAO_HOA)],
    "Hồng Loan": CUNG[anSao(thang, cungBatDau, SAO_HONG_LOAN)],
    "Kiếp Sát": CUNG[anSao(thang, cungBatDau, SAO_KIEP_SAT)],

    // Các sao mới
    "Thiên Mã": CUNG[anSao(thang, cungBatDau, SAO_THIEN_MA)],
    "Long Trì": CUNG[anSao(thang, cungBatDau, SAO_LONG_TRI)],
    "Phượng Các": CUNG[anSao(thang, cungBatDau, SAO_PHUONG_CAC)],
  };
}

// 🌟 Ví dụ: An sao cho người sinh ngày 10/03/1995, lúc 14 giờ
const sao = anSaoChinh(14, 7, 1997, 16);
let data: any = [];
