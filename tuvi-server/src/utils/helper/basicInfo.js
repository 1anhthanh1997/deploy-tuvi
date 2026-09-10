const { viToEnData } = require("./constants");
const { isChildArray } = require("./constants");

function getCungCachName(cungCachList, toHopSao) {
  for (let cungCach of cungCachList) {
    let saoCungCach = cungCach.saoList;
    if (isChildArray(toHopSao, saoCungCach)) {
      return cungCach.name;
    }
  }
}

function getBasicInfo(thapNhiCung) {
  const cungCachList = [
    {
      id: 0,
      name: "The Master + Guardian + Captialist + Hero + Executive",
      saoList: [1, 2, 4, 7, 11],
    },
    {
      id: 1,
      name: "The Master + Capitalist + Executive + Breaker + Taker + Seeker",
      saoList: [1, 2, 4, 9, 13, 14],
    },
    {
      id: 2,
      name: " The Breaker + Taker + Seeker",
      saoList: [9, 13, 14],
    },
    {
      id: 3,
      name: "The Guardian + Hero",
      saoList: [7, 11],
    },
    {
      id: 4,
      name: "The Thinker + Listener + Linker + Fortuner",
      saoList: [3, 6, 8, 12],
    },
    {
      id: 5,
      name: "The Thinker + Linker + Disruptor",
      saoList: [3, 6, 10],
    },
    {
      id: 6,
      name: "The Disruptor + Visionary",
      saoList: [5, 10],
    },
    {
      id: 7,
      name: "The Listener + Visionary + Fortuner",
      saoList: [5, 8, 12],
    },
  ];
  let tamHopList = [
    [viToEnData["Mệnh"], viToEnData["Tài Bạch"], viToEnData["Quan lộc"]],
    [viToEnData["Phúc đức"], viToEnData["Phu thê"], viToEnData["Thiên Di"]],
    [viToEnData["Huynh đệ"], viToEnData["Tật Ách"], viToEnData["Điền trạch"]],
    [viToEnData["Phụ mẫu"], viToEnData["Tử tức"], viToEnData["Nô bộc"]],
  ];
  let tamHopCungAnThan = [];
  let toHopSao = [[], [], [], []];
  let toHopSaoThan = [];
  let cungChuThan = "";
  let cungCach = [];
  let cungCachThan = "";
  tamHopList.forEach((tamHop, index) => {
    thapNhiCung.forEach((cung) => {
      if (cung.cungThan) {
        cungChuThan = cung.cungChu;
      }
      if (tamHop.includes(cung.cungChu)) {
        toHopSao[index] = [
          ...toHopSao[index],
          ...cung.cungSao
            .filter((sao) => sao.saoID && !sao.saoTen.includes("De."))
            .map((sao) => sao.saoID),
        ];
      }
    });
  });
  tamHopList.map((tamHop, index) => {
    if (tamHop.includes(cungChuThan)) {
      tamHopCungAnThan = tamHop;
      toHopSaoThan = toHopSao[index];
    }
  });
  tamHopList.forEach((tamHop, index) => {
    cungCach.push(getCungCachName(cungCachList, toHopSao[index]));
  });
  cungCachThan = getCungCachName(cungCachList, toHopSaoThan);
  return { cungCach, cungCachThan, cungChuThan, tamHopCungAnThan };
}

module.exports = {
  getBasicInfo,
};
