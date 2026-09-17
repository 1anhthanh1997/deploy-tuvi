const enToViData = {
  Destiny: "Mệnh",
  "Senior/Parents": "Phụ mẫu",
  Spiritual: "Phúc đức",
  Property: "Điền trạch",
  Career: "Quan lộc",
  Peers: "Nô bộc",
  External: "Thiên Di",
  Health: "Tật Ách",
  Resources: "Tài Bạch",
  "Junior/Children": "Tử tức",
  Partner: "Phu thê",
  Siblings: "Huynh đệ",
};

const viToEnData = {};
// Create viToEnData by reversing enToViData key-value pairs
Object.entries(enToViData).forEach(([key, value]) => {
  viToEnData[value] = key;
});

const newChinhTinh = [
  51, 52, 53, 54, 55, 56, 57, 58, 61, 62, 73, 92, 93, 94, 95,
];

function capitalizeWords(str = "") {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function checkSaoDaiVan(saoTen) {
  return saoTen.includes("X.");
}

function checkSaoLuuNien(saoTen) {
  return saoTen.includes("Y.");
}

function checkSaoLuuNguyet(saoTen) {
  return saoTen.includes("M.");
}

function checkSaoLuuNhat(saoTen) {
  return saoTen.includes("D.");
}

function isChildArray(parentArray, childArray) {
  // Handle edge cases
  if (!Array.isArray(parentArray) || !Array.isArray(childArray)) {
    return false;
  }

  // Check if every element in child array exists in parent array
  return childArray.every((element) => parentArray.includes(element));
}

const LANGUAGE = "vi";

export {
  enToViData,
  viToEnData,
  newChinhTinh,
  capitalizeWords,
  checkSaoDaiVan,
  checkSaoLuuNien,
  checkSaoLuuNguyet,
  checkSaoLuuNhat,
  isChildArray,
  LANGUAGE,
};