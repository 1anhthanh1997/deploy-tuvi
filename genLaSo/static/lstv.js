$(document).ready(function () {
  var uploadLaso = "/upload";
  var d = new Date();
  var thismonth = d.getMonth() + 1;
  var today = d.getDate();
  var thisyear = d.getFullYear();
  $("#ngaysinh").val(today);
  $("#thangsinh").val(thismonth);
  $("#namsinh").val(thisyear);

  function jdFromDate(dd, mm, yy) {
    let a = Math.floor((14 - mm) / 12);
    let y = yy + 4800 - a;
    let m = mm + 12 * a - 3;
    let jd =
      dd +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;
    if (jd < 2299161) {
      jd =
        dd +
        Math.floor((153 * m + 2) / 5) +
        365 * y +
        Math.floor(y / 4) -
        32083;
    }
    return jd;
  }

  function jdToDate(jd) {
    let a, b, c;
    if (jd > 2299160) {
      a = jd + 32044;
      b = Math.floor((4 * a + 3) / 146097);
      c = a - Math.floor((b * 146097) / 4);
    } else {
      b = 0;
      c = jd + 32082;
    }
    let d = Math.floor((4 * c + 3) / 1461);
    let e = c - Math.floor((1461 * d) / 4);
    let m = Math.floor((5 * e + 2) / 153);
    let day = e - Math.floor((153 * m + 2) / 5) + 1;
    let month = m + 3 - 12 * Math.floor(m / 10);
    let year = b * 100 + d - 4800 + Math.floor(m / 10);
    return [day, month, year];
  }

  function NewMoon(k) {
    let T = k / 1236.85;
    let T2 = T * T;
    let T3 = T2 * T;
    let dr = Math.PI / 180;
    let Jd1 =
      2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

    let M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    let Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    let F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;

    let C1 =
      (0.1734 - 0.000393 * T) * Math.sin(M * dr) +
      0.0021 * Math.sin(2 * dr * M);
    C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
    C1 -= 0.0004 * Math.sin(3 * dr * Mpr);
    C1 += 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin((M + Mpr) * dr);
    C1 -=
      0.0074 * Math.sin((M - Mpr) * dr) + 0.0004 * Math.sin((2 * F + M) * dr);
    C1 -=
      0.0004 * Math.sin((2 * F - M) * dr) -
      0.0006 * Math.sin((2 * F + Mpr) * dr);
    C1 +=
      0.001 * Math.sin((2 * F - Mpr) * dr) +
      0.0005 * Math.sin((2 * Mpr + M) * dr);

    let deltat =
      T < -11
        ? 0.001 +
          0.000839 * T +
          0.0002261 * T2 -
          0.00000845 * T3 -
          0.000000081 * T * T3
        : -0.000278 + 0.000265 * T + 0.000262 * T2;
    let JdNew = Jd1 + C1 - deltat;
    return JdNew;
  }

  function getNewMoonDay(k, timeZone) {
    return Math.floor(NewMoon(k) + 0.5 + timeZone / 24);
  }

  function getSunLongitude(jdn, timeZone) {
    let T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    let T2 = T * T;
    let dr = Math.PI / 180;
    let M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T2 * T;
    let L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL +=
      (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
      0.00029 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    let omega = 125.04 - 1934.136 * T;
    L = L - 0.00569 - 0.00478 * Math.sin(omega * dr);
    L = L * dr;
    L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));
    return Math.floor((L / Math.PI) * 6);
  }

  function getLunarMonth11(yy, timeZone) {
    /**
     * Find the day that starts the lunar month 11 of the given year for the given time zone.
     * @param {number} yy - Year
     * @param {number} timeZone - Time zone offset
     * @returns {number} The Julian day of the lunar month 11 start
     */

    let off = jdFromDate(31, 12, yy) - 2415021;
    let k = Math.floor(off / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    let sunLong = getSunLongitude(nm, timeZone); // Sun longitude at local midnight

    if (sunLong >= 9) {
      nm = getNewMoonDay(k - 1, timeZone);
    }

    return nm;
  }

  function getLeapMonthOffset(a11, timeZone) {
    /**
     * Find the index of the leap month after the month starting on the day a11.
     * @param {number} a11 - Julian day number of lunar month 11
     * @param {number} timeZone - Time zone offset
     * @returns {number} Index of the leap month
     */

    let k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1; // Start with the month following lunar month 11

    let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);

    while (true) {
      last = arc;
      i += 1;
      arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);

      if (!(arc !== last && i < 14)) {
        break;
      }
    }

    return i - 1;
  }

  function S2L(dd, mm, yy, timeZone = 7) {
    /**
     * Convert solar date (dd/mm/yyyy) to the corresponding lunar date.
     * @param {number} dd - Day
     * @param {number} mm - Month
     * @param {number} yy - Year
     * @param {number} timeZone - Time zone offset (default: 7)
     * @returns {Array} [lunarDay, lunarMonth, lunarYear, lunarLeap]
     */

    let dayNumber = jdFromDate(dd, mm, yy);
    let k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1, timeZone);

    if (monthStart > dayNumber) {
      monthStart = getNewMoonDay(k, timeZone);
    }

    let a11 = getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear;

    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = getLunarMonth11(yy + 1, timeZone);
    }

    let lunarDay = dayNumber - monthStart + 1;
    let diff = Math.floor((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;

    if (b11 - a11 > 365) {
      let leapMonthDiff = getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }

    if (lunarMonth > 12) {
      lunarMonth -= 12;
    }

    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }

    return [lunarDay, lunarMonth, lunarYear, lunarLeap];
  }

  function canChiNgay(
    nn,
    tt,
    nnnn,
    duongLich = true,
    timeZone = 7,
    thangNhuan = false
  ) {
    let jd = jdFromDate(nn, tt, nnnn);
    let canNgay = ((jd + 9) % 10) + 1;
    let chiNgay = ((jd + 1) % 12) + 1;
    return [canNgay, chiNgay];
  }

  function checkNgayTrongNam(nn, tt, nnnn, timeZone = 7) {
    let thangNhuan = 0;
    let currentDate = new Date();
    let currenDateData = S2L(
      currentDate.getDate(),
      currentDate.getMonth() + 1,
      currentDate.getFullYear()
    );
    [nn, tt, nnnn, thangNhuan] = S2L(nn, tt, nnnn);

    return { ngayAm: nn, thangAm: tt, isValid: currenDateData[2] === nnnn };
  }

  function dichCung(cungBanDau, soCungDich) {
    var cungSauKhiDich = Math.floor(cungBanDau);
    cungSauKhiDich += Math.floor(soCungDich);
    if (cungSauKhiDich % 12 == 0) {
      return 12;
    } else {
      return cungSauKhiDich % 12;
    }
  }
  diaban = $("[cung-id]").click(function () {
    $("[cung-id]").removeClass("xungChieu");
    cungid = $(this).attr("cung-id");
    cungXungChieu = dichCung(cungid, 6);
    cungTamHop1 = dichCung(cungid, 4);
    cungTamHop2 = dichCung(cungid, 8);
    console.log(cungXungChieu, cungTamHop1);
    $(this).addClass("xungChieu");
    $("[cung-id=" + cungXungChieu + "]").addClass("xungChieu");
    $("[cung-id=" + cungTamHop1 + "]").addClass("xungChieu");
    $("[cung-id=" + cungTamHop2 + "]").addClass("xungChieu");
  });
  $("#thienBan").click(function () {
    $("[cung-id]").removeClass("xungChieu");
  });
  function lapLaSo(laso) {
    try {
      $.templates({
        cungDiaBan: "#cungDiaBan",
        vungThienBan: "#vungThienBan",
        infoData: "#infoData",
      });
      var tb = laso["thienBan"];
      var data = laso["thapNhiCung"];
      var thienBan = $.templates.vungThienBan.render(tb);
      $("#thienBan").html(thienBan);
      var cungTy1 = $.templates.cungDiaBan.render(data[1]);
      $("#cungTy1").html(cungTy1);
      var cungSuu = $.templates.cungDiaBan.render(data[2]);
      $("#cungSuu").html(cungSuu);
      var cungDan = $.templates.cungDiaBan.render(data[3]);
      $("#cungDan").html(cungDan);
      var cungMao = $.templates.cungDiaBan.render(data[4]);
      $("#cungMao").html(cungMao);
      var cungThin = $.templates.cungDiaBan.render(data[5]);
      $("#cungThin").html(cungThin);
      var cungTy5 = $.templates.cungDiaBan.render(data[6]);
      $("#cungTy5").html(cungTy5);
      var cungNgo = $.templates.cungDiaBan.render(data[7]);
      $("#cungNgo").html(cungNgo);
      var cungMui = $.templates.cungDiaBan.render(data[8]);
      $("#cungMui").html(cungMui);
      var cungThan = $.templates.cungDiaBan.render(data[9]);
      $("#cungThan").html(cungThan);
      var cungDau = $.templates.cungDiaBan.render(data[10]);
      $("#cungDau").html(cungDau);
      var cungTuat = $.templates.cungDiaBan.render(data[11]);
      $("#cungTuat").html(cungTuat);
      var cungHoi = $.templates.cungDiaBan.render(data[12]);
      $("#cungHoi").html(cungHoi);
      // Sort and filter cung data
      var sortedCungs = Object.values(data)
        .filter((cung) => cung.cungSo > 0)
        .sort((a, b) => a.cungSo - b.cungSo);

      var infoData = $.templates.infoData.render({
        thapNhiCung: sortedCungs,
      });
      $("#infoDataRender").html(infoData);
      var zt = new $.Zebra_Tooltips($(".tooltips"), {
        position: "right",
        max_width: 300,
      });
      zt.show($("#tooltip"), true);
    } catch (error) {
      // baoLoi(error);
    }
  }

  function capitalizeWords(str = "") {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "); //
  }

  let enToViData = {
    "Destiny / Soul": "Mệnh",
    Senior: "Phụ mẫu",
    "Spiritual Value": "Phúc đức",
    "Material Legacy": "Điền trạch",
    Career: "Quan lộc",
    "Friends/Peers": "Nô bộc",
    External: "Thiên Di",
    Karma: "Tật Ách",
    Resources: "Tài Bạch",
    Junior: "Tử tức",
    Soulmate: "Phu thê",
    "Brothers and Sisters": "Huynh đệ",
  };

  const viToEnData = {};
  // Create viToEnData by reversing enToViData key-value pairs
  Object.entries(enToViData).forEach(([key, value]) => {
    viToEnData[value] = key;
  });

  function getCungChuInfo(cungChu) {
    switch (enToViData[cungChu]) {
      case "Mệnh": {
        return {
          description: "nature, ideals, core, willpower, personality.",
          shortName: "",
          doiXung: viToEnData["Thiên Di"],
        };
      }
      case "Phụ mẫu": {
        return {
          description:
            "parents, parents-in-law, those who play parental roles, previous generations (past), superiors (bosses, leaders, seniors...).",
          shortName: "Phụ",
          doiXung: viToEnData["Tật Ách"],
        };
      }
      case "Phúc đức": {
        return {
          description:
            "blessings/luck, spiritual values, family clan (paternal/maternal), views on happiness",
          shortName: "Phúc",
          doiXung: viToEnData["Tài Bạch"],
        };
      }
      case "Điền trạch": {
        return {
          description:
            "asset accumulation, infrastructure, daily living habits, material legacy left for the world.",
          shortName: "Điền",
          doiXung: viToEnData["Tử tức"],
        };
      }
      case "Quan lộc": {
        return {
          description: "work/career, work style/capability",
          shortName: "Quan",
          doiXung: viToEnData["Phu thê"],
        };
      }
      case "Nô bộc": {
        return {
          description:
            "peer generation (present), superficial social relationships, relationships that only share benefits without sharing risks.",
          shortName: "Nô",
          doiXung: viToEnData["Huynh đệ"],
        };
      }
      case "Thiên Di": {
        return {
          description: `society's view of the native, external environment of the "Destiny", partners/competitors/counterparts, interpersonal skills & social interaction.`,
          shortName: "Di",
          doiXung: viToEnData["Mệnh"],
        };
      }
      case "Tật Ách": {
        return {
          description: "health, illness, karmic consequences.",
          shortName: "Tật",
          doiXung: viToEnData["Phụ mẫu"],
        };
      }
      case "Tài Bạch": {
        return {
          description:
            "talents/resources/finances, money, economy, material values",
          shortName: "Tài",
          doiXung: viToEnData["Phúc đức"],
        };
      }
      case "Tử tức": {
        return {
          description:
            "future generations (future), children/disciples/students/pets, spiritual legacy left for the world.",
          shortName: "Tử",
          doiXung: viToEnData["Điền trạch"],
        };
      }
      case "Phu thê": {
        return {
          description: "Spouse, lover/partner, close personal relationships",
          shortName: "Phối",
          doiXung: viToEnData["Quan lộc"],
        };
      }
      case "Huynh đệ": {
        return {
          description:
            "siblings in the family clan, relationships sharing both benefits and risks, sworn siblings, close social siblings...",
          shortName: "Bào",
          doiXung: viToEnData["Nô bộc"],
        };
      }
      default: {
        return "";
      }
    }
  }

  const newChinhTinh = [
    51, 52, 53, 54, 55, 56, 57, 58, 61, 62, 73, 92, 93, 94, 95,
  ];

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

  function getSao(cungChu, thapNhiCung, tamHop = false) {
    cungArr = thapNhiCung.filter((c) => {
      return c.cungChu === cungChu;
    });
    if (cungArr.length > 0) {
      let cung = cungArr[0];
      const { cungSao, cungSo } = cung;
      const chinhTinhGoc = cungSao.filter((sao) => sao.saoAmDuong !== "");
      const chinhTinhMoi = cungSao.filter(
        (sao) =>
          newChinhTinh.includes(sao.saoID) &&
          !checkSaoDaiVan(sao.saoTen) &&
          !checkSaoLuuNien(sao.saoTen) &&
          !checkSaoLuuNguyet(sao.saoTen) &&
          !checkSaoLuuNhat(sao.saoTen)
      );
      let saoDaiVan = cungSao.filter((sao) => checkSaoDaiVan(sao.saoTen));
      let saoLuuNien = cungSao.filter((sao) => checkSaoLuuNien(sao.saoTen));
      let saoLuuNguyet = cungSao.filter((sao) => checkSaoLuuNguyet(sao.saoTen));
      let saoLuuNhat = cungSao.filter((sao) => checkSaoLuuNhat(sao.saoTen));
      let tuan = cung.tuanTrung;
      let triet = cung.trietLo;
      let chinhTinh = [...chinhTinhGoc, ...chinhTinhMoi];
      if (tamHop) {
        chinhTinh = [...chinhTinhMoi];
      }
      if (tuan) {
        chinhTinh = [...chinhTinh, { saoTen: "Void Zone" }];
      }
      if (triet) {
        chinhTinh = [...chinhTinh, { saoTen: "Void Cut" }];
      }
      if (cung.daiVanTuanTrung) {
        saoDaiVan = [...saoDaiVan, { saoTen: "X. Void Zone" }];
      }
      if (cung.daiVanTrietLo) {
        saoDaiVan = [...saoDaiVan, { saoTen: "X. Void Cut" }];
      }
      if (cung.luuNienTuanTrung) {
        saoLuuNien = [...saoLuuNien, { saoTen: "Y. Void Zone" }];
      }
      if (cung.luuNienTrietLo) {
        saoLuuNien = [...saoLuuNien, { saoTen: "Y. Void Cut" }];
      }
      if (cung.luuNguyetTuanTrung) {
        saoLuuNguyet = [...saoLuuNguyet, { saoTen: "M. Void Zone" }];
      }
      if (cung.luuNguyetTrietLo) {
        saoLuuNguyet = [...saoLuuNguyet, { saoTen: "M. Void Cut" }];
      }

      const phuTinh = cungSao.filter(
        (sao) =>
          sao.saoAmDuong === "" &&
          !newChinhTinh.includes(sao.saoID) &&
          !checkSaoDaiVan(sao.saoTen) &&
          !checkSaoLuuNien(sao.saoTen) &&
          !checkSaoLuuNguyet(sao.saoTen) &&
          !checkSaoLuuNhat(sao.saoTen)
      );

      return {
        chinhTinh: chinhTinh
          .map((sao) => capitalizeWords(sao.saoTen))
          .join(" + "),
        phuTinh: phuTinh.map((sao) => capitalizeWords(sao.saoTen)).join(" + "),
        daiVan: saoDaiVan.map((sao) => capitalizeWords(sao.saoTen)).join(" + "),
        luuNien: saoLuuNien
          .map((sao) => capitalizeWords(sao.saoTen))
          .join(" + "),
        luuNguyet: saoLuuNguyet
          .map((sao) => capitalizeWords(sao.saoTen))
          .join(" + "),
        luuNhat: saoLuuNhat
          .map((sao) => capitalizeWords(sao.saoTen))
          .join(" + "),
        cungDaiHan: cung.cungDaiHan,
      };
    }
    return {
      chinhTinh: "",
      phuTinh: "",
    };
  }

  const getNumberIndex = (daiVanIndex) => {
    switch (daiVanIndex) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      case 4:
        return "4th";
      case 5:
        return "5th";
      case 6:
        return "6th";
      case 7:
        return "7th";
      case 8:
        return "8th";
      case 9:
        return "9th";
      case 10:
        return "10th";
      case 11:
        return "11th";
      case 12:
        return "12th";
      default:
        return "";
    }
  };

  const getMonthName = (thangLuuNguyet) => {
    switch (thangLuuNguyet) {
      case "1":
        return "January";
      case "2":
        return "February";
      case "3":
        return "March";
      case "4":
        return "April";
      case "5":
        return "May";
      case "6":
        return "June";
      case "7":
        return "July";
      case "8":
        return "August";
      case "9":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
      default:
        return "";
    }
  };

  const getTamHopCungSaoText = ({
    tamHopList,
    cungCach,
    cungChuThan,
    ten,
    namNu,
    namDuong,
    sapXepCungTheoTuoi,
    cungDaiVan,
    daiVanIndex,
    cungTieuVan,
    namXemTieuVan,
    thangLuuNguyet,
    ngayLuuNhat,
  }) => {
    const textIndex = [
      "Trine where the native has the strongest ability to actively manifest auspiciousness",
      "Trine where the native has a strong ability to actively manifest auspiciousness",
      "Trine where the native has a limited ability to actively manifest auspiciousness",
      "Trine where the native has the weakest ability to actively manifest auspiciousness",
    ];
    const tamHopCungSaoText = tamHopList
      .map((tamHop, index) => {
        return `\n${index + 1}. Trine of ${tamHop[0]} - ${tamHop[1]} - ${
          tamHop[2]
        } (${textIndex[index]}) belongs to ${
          cungCach[index]
        } formation type, for ${
          namNu == "Nam" ? "Mr." : "Ms."
        }${ten} ${namDuong} ${tamHop
          .map((cung) => {
            let cungDaiHan = getSao(cung, sapXepCungTheoTuoi).cungDaiHan;
            return `\n${cung} Point ${
              cung === cungChuThan
                ? "concurrently holding the Identity Point "
                : ""
            }${`(concurrently holding the ${getNumberIndex(
              Math.ceil(cungDaiHan / 10)
            )} Decade timeline Point, age ${cungDaiHan - 1} to ${
              cungDaiHan + 8
            })`}${
              cungTieuVan &&
              cung.toLowerCase() === cungTieuVan.cungChu.toLowerCase()
                ? `concurrently holding Annual ${namXemTieuVan} timeline Point`
                : ""
            } of ${
              namNu == "Nam" ? "Mr." : "Ms."
            } ${ten} ${namDuong} governs information about: ${
              getCungChuInfo(cung).description
            }
        Major Energies: ${getSao(cung, sapXepCungTheoTuoi).chinhTinh}
        Auxiliary Energies: ${getSao(cung, sapXepCungTheoTuoi).phuTinh}
        The Point in external opposition to the ${cung} is the ${
              getCungChuInfo(cung).doiXung
            }${
              cungDaiVan &&
              cungDaiVan.cungChu.toLowerCase() === cung.toLowerCase()
                ? `\n        Point ${cung} concurrently holding ${getNumberIndex(
                    daiVanIndex
                  )} Decade timeline Point of ${
                    namNu == "Nam" ? "Mr." : "Ms."
                  }${ten} ${namDuong} age ${cungDaiVan.cungDaiHan - 1} to ${
                    cungDaiVan.cungDaiHan + 8
                  }`
                : ""
            }${
              cungDaiVan
                ? `\n        Flowing with the ${getNumberIndex(
                    daiVanIndex
                  )} Decade timeline (age ${cungDaiVan.cungDaiHan - 1} to ${
                    cungDaiVan.cungDaiHan + 8
                  })${
                    cung === viToEnData["Mệnh"]
                      ? ", adding to the original Destiny Point"
                      : ""
                  }: ${getSao(cung, sapXepCungTheoTuoi).daiVan}`
                : ""
            }${
              cungTieuVan
                ? `\n        Flowing with the ${namXemTieuVan} Annual timeline${
                    cung === viToEnData["Mệnh"]
                      ? ", adding to the original Destiny Point"
                      : ""
                  }: ${getSao(cung, sapXepCungTheoTuoi).luuNien}`
                : ""
            }${
              thangLuuNguyet
                ? `\n        Flowing with the ${
                    getMonthName(thangLuuNguyet) + " " + namXemTieuVan
                  } Monthly timeline : ${
                    getSao(cung, sapXepCungTheoTuoi).luuNguyet
                  }`
                : ""
            }${
              ngayLuuNhat && getSao(cung, sapXepCungTheoTuoi).luuNhat
                ? `\n        Flowing with the ${
                    getMonthName(thangLuuNguyet) +
                    " " +
                    ngayLuuNhat +
                    ", " +
                    namXemTieuVan
                  } Daily timeline: ${getSao(cung, sapXepCungTheoTuoi).luuNhat}`
                : ""
            }`;
          })
          .join("")}
      `;
      })
      .join("");
    return tamHopCungSaoText;
  };

  function copyContent(laso) {
    const { thienBan, thapNhiCung } = laso;
    const { namDuong, canNamTen, ten, chiNamTen, namNu } = thienBan;
    thapNhiCung.shift();
    const sapXepCungTheoCungSo = [...thapNhiCung].sort(
      (a, b) => a.cungSo - b.cungSo
    );
    const sapXepCungTheoTuoi = [...thapNhiCung].sort(
      (a, b) => a.cungDaiHan - b.cungDaiHan
    );
    const { cungCach, cungCachThan, cungChuThan, tamHopCungAnThan } =
      getBasicInfo(sapXepCungTheoTuoi);
    let tamHopList = [
      [viToEnData["Mệnh"], viToEnData["Tài Bạch"], viToEnData["Quan lộc"]],
      [viToEnData["Phúc đức"], viToEnData["Phu thê"], viToEnData["Thiên Di"]],
      [viToEnData["Huynh đệ"], viToEnData["Tật Ách"], viToEnData["Điền trạch"]],
      [viToEnData["Phụ mẫu"], viToEnData["Tử tức"], viToEnData["Nô bộc"]],
    ];

    const baseInfoText = getBaseInfoText(thapNhiCung, thienBan);
    const tamHopCungSaoText = getTamHopCungSaoText({
      tamHopList,
      cungCach,
      cungChuThan,
      ten,
      namDuong,
      namNu,
      sapXepCungTheoTuoi,
    });
    const firstSection = `Destiny Analysis Chart for ${ten}, ${
      namNu == "Nam" ? "male" : "female"
    } born in ${namDuong}`;

    const secondSection = `${tamHopCungSaoText}`;
    const contentCopy = `${firstSection}\n${baseInfoText}\n${secondSection}`;
    return contentCopy;
  }
  function isChildArray(parentArray, childArray) {
    // Handle edge cases
    if (!Array.isArray(parentArray) || !Array.isArray(childArray)) {
      return false;
    }

    // Check if every element in child array exists in parent array
    return childArray.every((element) => parentArray.includes(element));
  }

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

  function getBaseInfoText(thapNhiCung, thienBan, tangVan = false) {
    let tamHopList = [
      [viToEnData["Mệnh"], viToEnData["Tài Bạch"], viToEnData["Quan lộc"]],
      [viToEnData["Phúc đức"], viToEnData["Phu thê"], viToEnData["Thiên Di"]],
      [viToEnData["Huynh đệ"], viToEnData["Tật Ách"], viToEnData["Điền trạch"]],
      [viToEnData["Phụ mẫu"], viToEnData["Tử tức"], viToEnData["Nô bộc"]],
    ];
    const { namDuong, canNamTen, ten, chiNamTen, namNu } = thienBan;
    const { cungCach, cungCachThan, cungChuThan, tamHopCungAnThan } =
      getBasicInfo(thapNhiCung);
    const tamHopThanIndex = tamHopList.findIndex((tamHop) =>
      tamHop.includes(cungChuThan)
    );

    let chinhTinhTamHopCungMenh = [
      getSao(viToEnData["Mệnh"], thapNhiCung, true).chinhTinh,
      getSao(viToEnData["Tài Bạch"], thapNhiCung, true).chinhTinh,
      getSao(viToEnData["Quan lộc"], thapNhiCung, true).chinhTinh,
    ]
      .filter((value) => value)
      .join(" + ");

    let phuTinhTamHopCungMenh = [
      getSao(viToEnData["Mệnh"], thapNhiCung, true).phuTinh,
      getSao(viToEnData["Tài Bạch"], thapNhiCung, true).phuTinh,
      getSao(viToEnData["Quan lộc"], thapNhiCung, true).phuTinh,
    ]
      .filter((value) => value)
      .join(" + ");
    let firstSection = `Foundational Information for ${ten} ${
      tangVan ? "'s" : ""
    } (born ${namDuong}) ${
      tangVan ? "Decade Timeline" : ""
    } = Meaning of the energy combinations within (Trine of Destiny Point + Trine of Identity Point). The Identity Point is concurrently held by ${cungChuThan} Point`;
    let secondSection = "";
    if (!tamHopThanIndex) {
      secondSection = `Major Energies: ${cungCach[0]} + ${chinhTinhTamHopCungMenh}\nAuxiliary Energies: ${phuTinhTamHopCungMenh}`;
    } else {
      let chinhTinhTamHopCungThan = [
        getSao(tamHopCungAnThan[0], thapNhiCung, true).chinhTinh,
        getSao(tamHopCungAnThan[1], thapNhiCung, true).chinhTinh,
        getSao(tamHopCungAnThan[2], thapNhiCung, true).chinhTinh,
      ]
        .filter((value) => value)
        .join(" + ");
      let phuTinhTamHopCungThan = [
        getSao(tamHopCungAnThan[0], thapNhiCung).phuTinh,
        getSao(tamHopCungAnThan[1], thapNhiCung).phuTinh,
        getSao(tamHopCungAnThan[2], thapNhiCung).phuTinh,
      ]
        .filter((value) => value)
        .join(" + ");
      getSao(tamHopCungAnThan[2], thapNhiCung).phuTinh;
      secondSection = `Trine of Destiny Point:\nMajor Energies: ${cungCach[0]} + ${chinhTinhTamHopCungMenh}\nAuxiliary Energies: ${phuTinhTamHopCungMenh}\nTrine of Identity Point:\nChính tinh: Dạng ${cungCachThan} + ${chinhTinhTamHopCungThan}\nPhụ tinh: ${phuTinhTamHopCungThan}
      `;
    }
    return firstSection + "\n" + secondSection;
  }

  function getNumberCanChi(
    ngayLuuNhat,
    thangLuuNguyet,
    namXemTieuVan,
    namXemDaiVan
  ) {
    if (ngayLuuNhat) {
      return 4;
    }
    if (thangLuuNguyet) {
      return 3;
    }
    if (namXemTieuVan) {
      return 2;
    }
    if (namXemDaiVan) {
      return 1;
    }
  }

  function copyContentLuuNien(
    laso,
    ngayLuuNhat,
    thangLuuNguyet,
    namXemTieuVan,
    namXemDaiVan
  ) {
    const {
      thienBan,
      thapNhiCung,
      maCanChiDaiVan,
      maCanChiTieuVan,
      maCanChiNguyetVan,
      maCanChiNhatVan,
    } = laso;
    const { namDuong, canNamTen, ten, chiNamTen, namNu } = thienBan;
    thapNhiCung.shift();
    const sapXepCungTheoCungSo = [...thapNhiCung].sort(
      (a, b) => a.cungSo - b.cungSo
    );
    const sapXepCungTheoTuoi = [...thapNhiCung].sort(
      (a, b) => a.cungDaiHan - b.cungDaiHan
    );
    const { cungCach, cungCachThan, cungChuThan, tamHopCungAnThan } =
      getBasicInfo(sapXepCungTheoTuoi);
    const baseInfoText = getBaseInfoText(thapNhiCung, thienBan, true);

    let tamHopList = [
      [viToEnData["Mệnh"], viToEnData["Tài Bạch"], viToEnData["Quan lộc"]],
      [viToEnData["Phúc đức"], viToEnData["Phu thê"], viToEnData["Thiên Di"]],
      [viToEnData["Huynh đệ"], viToEnData["Tật Ách"], viToEnData["Điền trạch"]],
      [viToEnData["Phụ mẫu"], viToEnData["Tử tức"], viToEnData["Nô bộc"]],
    ];
    let tuoiDaiVan = namXemDaiVan - namDuong;
    let cungTieuVan = null;
    let cungDaiVan = null;
    thapNhiCung.forEach((cung) => {
      if (cung.namTieuVanTen) {
        cungTieuVan = cung;
      }
    });

    thapNhiCung.forEach((cung) => {
      if (
        (tuoiDaiVan < 10 && cung.cungDaiHan < 10) ||
        (cung.cungDaiHan - 1 <= tuoiDaiVan && cung.cungDaiHan + 9 > tuoiDaiVan)
      ) {
        cungDaiVan = cung;
      }
    });
    const tamHopCungSaoText = getTamHopCungSaoText({
      tamHopList,
      cungCach,
      cungChuThan,
      ten,
      namDuong,
      namNu,
      sapXepCungTheoTuoi,
      cungTieuVan: cungTieuVan,
      cungDaiVan: cungDaiVan,
      daiVanIndex: Math.ceil(cungDaiVan.cungDaiHan / 10),
      namXemTieuVan: namXemTieuVan,
      ngayLuuNhat: ngayLuuNhat,
      thangLuuNguyet: thangLuuNguyet,
    });
    const tamHopDaiVanIndex = tamHopList.findIndex((tamHop) =>
      tamHop.includes(cungDaiVan.cungChu)
    );
    let tamHopTieuVanIndex = "";
    if (namXemTieuVan) {
      tamHopTieuVanIndex = tamHopList.findIndex((tamHop) =>
        tamHop.includes(cungTieuVan.cungChu)
      );
    }

    const firstSection = `I. Destiny Analysis Chart for ${ten}, ${
      namNu === "Nam" ? "male" : "female"
    }, born in ${namDuong}   
    1. Timeline Points:\nDecade Timeline Point: ${
      cungDaiVan.cungChu
    } Point, belongs to the basic ${
      cungCach[tamHopDaiVanIndex]
    } formation type\n${
      namXemTieuVan
        ? `Annual Timeline Point = ${cungTieuVan.cungChu} Point, belongs to the basic  ${cungCach[tamHopTieuVanIndex]} formation type`
        : ""
    }${"\n    2. " + baseInfoText}
    `;
    const secondSection = `II. Map of ${getNumberCanChi(
      ngayLuuNhat,
      thangLuuNguyet,
      namXemTieuVan,
      namXemDaiVan
    )} Layers of Transient Energies Based on the ${getNumberCanChi(
      ngayLuuNhat,
      thangLuuNguyet,
      namXemTieuVan,
      namXemDaiVan
    )} Stem-Branch Codes as Requested${tamHopCungSaoText}`;
    return firstSection + "\n" + secondSection;
  }

  function downloadTxtFile(content, title) {
    const text = content;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = title;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  $("#btn-copy-content").click(function () {
    const content = $("#contentCopy").text();
    navigator.clipboard
      .writeText(content)
      .then(function () {
        alert("Đã sao chép nội dung!");
      })
      .catch(function (err) {
        console.error("Không thể sao chép: ", err);
        alert("Không thể sao chép nội dung!");
      });
  });

  $("#btn-download-content").click(function () {
    let title = "sample.txt";
    let checkedValues = $("#luunien").serialize();
    let checkedValuesDaiVan = $("#daivan").serialize();
    if (checkedValuesDaiVan) {
      title = "dai_van.txt";
    } else if (checkedValues) {
      let namXemTieuVan = $("#namxemtieuvan").val();
      title = "tieu_van_" + namXemTieuVan + ".txt";
    } else {
      let name = $("#hoten").val();
      title = "la_so_" + name + ".txt";
    }
    const content = $("#contentCopy").text();
    downloadTxtFile(content, title);
  });

  $("#luunien").click(function () {
    let checkedValues = $("#luunien").serialize();
    if (checkedValues) {
      $("#namxemtieuvandiv").css("display", "flex");
      $("#daivan").prop("checked", false);
      $("#namxemdaivandiv").css("display", "none");
    } else {
      $("#namxemtieuvandiv").css("display", "none");
    }
  });

  $("#daivan").click(function () {
    let checkedValues = $("#daivan").serialize();
    if (checkedValues) {
      $("#namxemdaivandiv").css("display", "flex");
      $("#luunien").prop("checked", false);
      $("#namxemtieuvandiv").css("display", "none");
    } else {
      $("#namxemdaivandiv").css("display", "none");
    }
  });

  // $("input#laplaso").click(function () {
  //   $("#laso").removeClass("anlaso");
  //   $("#urlLaso").val("");
  //   $.ajax({
  //     url: "api",
  //     type: "GET",
  //     dataType: "json",
  //     data: $("form#lstv").serialize(),
  //     success: function (thienBandiaBan) {
  //       lapLaSo(thienBandiaBan);
  //       $("#btn-copy-content").css("display", "block");
  //       $("#valueAnhHuong").css("display", "block");
  //       const contentCopy = copyContent(thienBandiaBan);
  //       $("#contentCopy").text(contentCopy);
  //     },
  //     error: function (thienBandiaBan) {
  //       console.log("AJAX error callback called");
  //     },
  //   });
  // });

  $("input#laplaso").click(function () {
    $("#laso").removeClass("anlaso");
    $("#urlLaso").val("");
    $.ajax({
      url: "api",
      type: "GET",
      dataType: "json",
      data: $("form#lstv").serialize(),
      success: function (thienBandiaBan) {
        lapLaSo(thienBandiaBan);
        $("#btn-copy-content").css("display", "block");
        $("#btn-download-content").css("display", "block");
        let checkDaiVan = $("form#lstv").serialize().includes("daivan=on");
        let checkTieuVan = $("form#lstv").serialize().includes("luunien=on");
        if (checkTieuVan || checkDaiVan) {
          let namXemDaiVan = $("#namxemdaivan").val();
          let namXemTieuVan = $("#namxemtieuvan").val();
          let thangLuuNguyet = $("#thangluunguyet").val();
          let ngayLuuNhat = $("#ngayluunhat").val();
          const contentCopyLuuNien = copyContentLuuNien(
            thienBandiaBan,
            ngayLuuNhat,
            thangLuuNguyet,
            checkTieuVan && namXemTieuVan ? parseInt(namXemTieuVan) : null,
            checkDaiVan && namXemDaiVan
              ? parseInt(namXemDaiVan)
              : namXemTieuVan
              ? parseInt(namXemTieuVan)
              : new Date().getFullYear()
          );
          $("#contentCopy").text(contentCopyLuuNien);
          // $("#note").css("display", "flex");
          $("#valueAnhHuong").css("display", "none");
        } else {
          const contentCopy = copyContent(thienBandiaBan);
          $("#contentCopy").text(contentCopy);
          $("#valueAnhHuong").css("display", "block");
        }
      },
      error: function (thienBandiaBan) {
        console.log("AJAX error callback called");
      },
    });
  });

  $("input#uploadLaso").click(function () {
    if ($("#laso").is(":hidden")) {
      alert("Hãy an lá số trước khi upload!");
      return false;
    }

    html2canvas(document.getElementById("laso"), {
      background: "#FFFFFF",
      onrendered: function (canvas) {
        canvasData = canvas
          .toDataURL("image/jpeg")
          .replace("image/jpeg", "image/octet-stream");
        $.ajax({
          url: uploadLaso,
          type: "POST",
          data: {
            image: canvasData,
            hoten: $("#hoten").val(),
            ngaysinh: $("#ngaysinh").val(),
            thangsinh: $("#thangsinh").val(),
            namsinh: $("#namsinh").val(),
          },
          dataType: "json",
          success: function (response) {
            if (response.error == false) {
              $("#urlLaso").val(response.message);
              alert("Upload thành công.");
            } else {
              alert("Có lỗi, không lưu được lá số trên server.");
            }
          },
        }).fail(function () {
          alert("Có lỗi, không lưu được lá số trên server.");
        });
      },
    });
  });
});
