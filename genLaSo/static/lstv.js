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

  function getCungChuInfo(cungChu) {
    switch (cungChu) {
      case "Mệnh": {
        return {
          description: "bản chất, lý tưởng, cốt lõi, ý chí, cá tính",
          shortName: "",
          doiXung: "Thiên Di",
        };
      }
      case "Phụ mẫu": {
        return {
          description:
            "cha mẹ, cha mẹ vợ/chồng, những người có vai trò như cha mẹ, thế hệ đi trước (quá khứ), bề trên (sếp, thủ trưởng, tiền bối…)",
          shortName: "Phụ",
          doiXung: "Tật Ách",
        };
      }
      case "Phúc đức": {
        return {
          description:
            "phước báu/may mắn, giá trị tinh thần, gia tộc (nội/ngoại), quan điểm về hạnh phúc",
          shortName: "Phúc",
          doiXung: "Tài Bạch",
        };
      }
      case "Điền trạch": {
        return {
          description:
            "tích lũy tài sản, cơ sở hạ tầng, thói quen sinh hoạt hằng ngày, di sản giá trị vật chất để lại cho đời",
          shortName: "Điền",
          doiXung: "Tử tức",
        };
      }
      case "Quan lộc": {
        return {
          description: "công việc/sự nghiệp, tác phong/năng lực làm việc",
          shortName: "Quan",
          doiXung: "Phu thê",
        };
      }
      case "Nô bộc": {
        return {
          description:
            "thế hệ đồng trang lứa (hiện tại), các mối quan hệ xã giao không sâu sắc, các mối quan hệ chỉ chia sẻ lợi ích mà không chia sẻ rủi ro",
          shortName: "Nô",
          doiXung: "Huynh đệ",
        };
      }
      case "Thiên di": {
        return {
          description:
            "góc nhìn của xã hội về đương số, ngoại cảnh của “Mệnh”, đối tác/đối thủ/đối phương, cách đối nhân xử thế & tương tác xã hội",
          shortName: "Di",
          doiXung: "Mệnh",
        };
      }
      case "Tật Ách": {
        return {
          description: "sức khỏe, bệnh tật, nghiệp quả",
          shortName: "Tật",
          doiXung: "Phụ mẫu",
        };
      }
      case "Tài Bạch": {
        return {
          description:
            "tài năng/tài nguyên/tài chính, tiền, kinh tế, giá trị vật chất",
          shortName: "Tài",
          doiXung: "Phúc đức",
        };
      }
      case "Tử tức": {
        return {
          description:
            "thế hệ sau (tương lai), con cháu/đệ tử/học trò/thú cưng, di sản giá trị tinh thần để lại cho đời",
          shortName: "Tử",
          doiXung: "Điền trạch",
        };
      }
      case "Phu thê": {
        return {
          description:
            "Vợ/chồng, người yêu/người tình, mối quan hệ mật thiết cá nhân",
          shortName: "Phối",
          doiXung: "Quan lộc",
        };
      }
      case "Huynh đệ": {
        return {
          description:
            "anh chị em trong gia tộc, các mối quan hệ chia sẻ cả lợi ích lẫn rủi ro, anh chị em kết nghĩa, anh chị em xã hội tri kỷ…",
          shortName: "Bào",
          doiXung: "Nô bộc",
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
    return saoTen.includes("De.");
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

  function getSao(cungChu, thapNhiCung) {
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
      if (tuan) {
        chinhTinh = [...chinhTinh, { saoTen: "Tuần" }];
      }
      if (triet) {
        chinhTinh = [...chinhTinh, { saoTen: "Triệt" }];
      }
      if (cung.daiVanTuanTrung) {
        saoDaiVan = [...saoDaiVan, { saoTen: "De. Tuần" }];
      }
      if (cung.daiVanTrietLo) {
        saoDaiVan = [...saoDaiVan, { saoTen: "De. Triệt" }];
      }
      if (cung.luuNienTuanTrung) {
        saoLuuNien = [...saoLuuNien, { saoTen: "Y. Tuần" }];
      }
      if (cung.luuNienTrietLo) {
        saoLuuNien = [...saoLuuNien, { saoTen: "Y. Triệt" }];
      }
      if (cung.luuNguyetTuanTrung) {
        saoLuuNguyet = [...saoLuuNguyet, { saoTen: "M. Tuần" }];
      }
      if (cung.luuNguyetTrietLo) {
        saoLuuNguyet = [...saoLuuNguyet, { saoTen: "M. Triệt" }];
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
      };
    }
    return {
      chinhTinh: "",
      phuTinh: "",
    };
  }

  const getTamHopCungSaoText = ({
    tamHopList,
    cungCach,
    cungChuThan,
    ten,
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
      "tam hợp mà đương số có khả năng chủ động cát hóa mạnh nhất",
      "đương số có khả năng chủ động cát hóa mạnh",
      "đương số có khả năng chủ động cát hóa hạn chế",
      "đương số có khả năng chủ động cát hóa yếu nhất",
    ];

    const tamHopCungSaoText = tamHopList
      .map((tamHop, index) => {
        return `\n${index + 1}. Tam hợp ${tamHop[0]} - ${tamHop[1]} - ${
          tamHop[2]
        } (${textIndex[index]}) thuộc dạng cách cục ${
          cungCach[index]
        }, ${ten} ${namDuong} ${tamHop
          .map((cung) => {
            return `\nCung ${cung} ${
              cung === cungChuThan ? "kiêm nhiệm cung an Thân " : ""
            }của ${ten} ${namDuong} chủ quản thông tin về: ${
              getCungChuInfo(cung).description
            }
        Chính tinh: ${getSao(cung, sapXepCungTheoTuoi).chinhTinh}
        Phụ tinh: ${getSao(cung, sapXepCungTheoTuoi).phuTinh}
        Cung chức mang ý nghĩa đối xung ngoại cảnh với cung ${cung} là cung ${
              getCungChuInfo(cung).doiXung
            }
      ${
        cungDaiVan
          ? `  Lưu động theo đại vận thứ ${daiVanIndex}: ${
              getSao(cung, sapXepCungTheoTuoi).daiVan
            }`
          : ""
      }${
              cungTieuVan
                ? `\n        Lưu động theo tiểu vận ${namXemTieuVan}: ${
                    getSao(cung, sapXepCungTheoTuoi).luuNien
                  }`
                : ""
            }${
              thangLuuNguyet
                ? `\n        Lưu động theo nguyệt vận tháng ${
                    thangLuuNguyet - 1 + "/" + namXemTieuVan
                  }: ${getSao(cung, sapXepCungTheoTuoi).luuNguyet}`
                : ""
            }${
              ngayLuuNhat && getSao(cung, sapXepCungTheoTuoi).luuNhat
                ? `\n        Lưu động theo ngày ${
                    ngayLuuNhat + "/" + thangLuuNguyet + "/" + namXemTieuVan
                  }: ${getSao(cung, sapXepCungTheoTuoi).luuNhat}`
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
      ["Mệnh", "Tài Bạch", "Quan lộc"],
      ["Phúc đức", "Phu thê", "Thiên di"],
      ["Huynh đệ", "Tật Ách", "Điền trạch"],
      ["Phụ mẫu", "Tử tức", "Nô bộc"],
    ];
    const tamHopCungSaoText = getTamHopCungSaoText({
      tamHopList,
      cungCach,
      cungChuThan,
      ten,
      namDuong,
      sapXepCungTheoTuoi,
    });
    const firstSection = `Thông tin lá số Tử Vi gốc của ${ten}, ${namNu.toLowerCase()} mệnh ${namDuong}`;

    const secondSection = `III. Danh sách các ngôi sao trên lá số gốc:${tamHopCungSaoText}`;
    const contentCopy = `Lá số Tử Vi gốc của ${ten} ${namDuong}, ${namNu} mệnh \n ${firstSection}\n${secondSection}`;
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
        name: "Tử Phủ Vũ Tướng Liêm",
        saoList: [1, 2, 4, 7, 11],
      },
      {
        id: 1,
        name: "Tử Vũ Liêm Sát Phá Tham",
        saoList: [1, 2, 4, 9, 13, 14],
      },
      {
        id: 2,
        name: "Sát Phá Tham",
        saoList: [9, 13, 14],
      },
      {
        id: 3,
        name: "Phủ Tướng",
        saoList: [7, 11],
      },
      {
        id: 4,
        name: "Cơ Nguyệt Đồng Lương",
        saoList: [3, 6, 8, 12],
      },
      {
        id: 5,
        name: "Cự Đồng Cơ",
        saoList: [3, 6, 10],
      },
      {
        id: 6,
        name: "Cự Nhật",
        saoList: [5, 10],
      },
      {
        id: 7,
        name: "Âm Lương Dương",
        saoList: [5, 8, 12],
      },
    ];
    let tamHopList = [
      ["Mệnh", "Tài Bạch", "Quan lộc"],
      ["Phúc đức", "Phu thê", "Thiên di"],
      ["Huynh đệ", "Tật Ách", "Điền trạch"],
      ["Phụ mẫu", "Tử tức", "Nô bộc"],
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

  function copyContentDaiVan(laso, namXemDaiVan) {
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
      ["Mệnh", "Tài Bạch", "Quan lộc"],
      ["Phúc đức", "Phu thê", "Thiên di"],
      ["Huynh đệ", "Tật Ách", "Điền trạch"],
      ["Phụ mẫu", "Tử tức", "Nô bộc"],
    ];
    let tuoiDaiVan = namXemDaiVan - namDuong;
    thapNhiCung.forEach((cung) => {
      if (
        (tuoiDaiVan < 10 && cung.cungDaiHan < 10) ||
        (cung.cungDaiHan <= tuoiDaiVan && cung.cungDaiHan + 10 > tuoiDaiVan)
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
      sapXepCungTheoTuoi,
      cungDaiVan: cungDaiVan,
      daiVanIndex: Math.ceil(cungDaiVan.cungDaiHan / 10),
    });

    const firstSection = `Cung chức ${
      cungDaiVan.cungChu
    } kiêm nhiệm chức năng là cung đại vận thứ ${Math.ceil(
      cungDaiVan.cungDaiHan / 10
    )}, quản lý thông tin đại vận thứ ${Math.ceil(
      cungDaiVan.cungDaiHan / 10
    )} của ${ten} ${namDuong} trong khoảng thời gian từ ${
      cungDaiVan.cungDaiHan - 1
    } tuổi đến ${cungDaiVan.cungDaiHan + 8} tuổi, từ năm ${
      namDuong + cungDaiVan.cungDaiHan - 1
    } đến năm ${namDuong + cungDaiVan.cungDaiHan + 8}
Bản đồ lưu động các sao theo đại vận thứ ${Math.ceil(
      cungDaiVan.cungDaiHan / 10
    )} của ${ten} ${namDuong} (De.) sẽ được căn cứ vào mã can chi ${
      cungDaiVan.cungCanTen
    } ${cungDaiVan.cungTen}.
Lá số Tử Vi gốc của ${ten} ${namDuong}, ${namNu.toLowerCase()} mệnh để luận giải đại vận thứ ${Math.ceil(
      cungDaiVan.cungDaiHan / 10
    )}`;
    const secondSection = `Quy tắc luận giải:
    Tam hợp cung đại vận này thuộc dạng nào trong 8 cách cục cơ bản. Tương tác với “tệp thông tin nền tảng của đương số” như thế nào?
    Luận giải đại vận ưu tiên xem xét ý nghĩa tổ hợp sao đồng cung tại cung đại vận, tam hợp với cung đại vận, đối xung với cung đại vận để luận giải ngoại cảnh. Ưu tiên nội dung các sao De. 
    Bắt buộc phải luận giải lần lượt De.Hóa Lộc, De.Hóa Quyền, De.Hóa Khoa, De.Hóa Kỵ. 
    Bắt buộc phải luận giải tính chất Không Vong trong đại vận bằng việc xem xét De.Tuần và De.Triệt
    Chủ động sáng tạo, phản hồi linh hoạt bằng cách luận giải lần lượt các trường hợp sao De. bay vào cung chức năng gốc.
    Mọi phản hồi luôn phải được suy luận theo hướng tương tác với “tệp thông tin nền tảng của đương số” để tạo thành 2 kết quả tương phản: cát hóa (tích cực/tài phú/danh vọng) và hung hóa (tiêu cực/nghèo/hèn)
`;
    const thirdSection = `${tamHopCungSaoText}`;
    return firstSection + "\n" + secondSection + "\n" + thirdSection;
  }

  function copyContentLuuNien(
    laso,
    ngayLuuNhat,
    thangLuuNguyet,
    namXemTieuVan,
    namXemDaiVan
  ) {
    console.log(namXemTieuVan, namXemDaiVan);
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

    let tamHopList = [
      ["Mệnh", "Tài Bạch", "Quan lộc"],
      ["Phúc đức", "Phu thê", "Thiên di"],
      ["Huynh đệ", "Tật Ách", "Điền trạch"],
      ["Phụ mẫu", "Tử tức", "Nô bộc"],
    ];
    let tuoiDaiVan = (namXemDaiVan ? namXemDaiVan : namXemTieuVan) - namDuong;
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
        (cung.cungDaiHan <= tuoiDaiVan && cung.cungDaiHan + 10 > tuoiDaiVan)
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
      sapXepCungTheoTuoi,
      cungTieuVan: cungTieuVan,
      cungDaiVan: cungDaiVan,
      daiVanIndex: Math.ceil(cungDaiVan.cungDaiHan / 10),
      namXemTieuVan: namXemTieuVan,
      ngayLuuNhat: ngayLuuNhat,
      thangLuuNguyet: thangLuuNguyet,
    });
    const firstSection = `I.Lá số luận giải vận cho ${ten} ${namDuong}
    1.Mã can chi
      Đại vận: mã can chi ${maCanChiDaiVan}
      ${maCanChiTieuVan ? `Tiểu vận: mã can chi ${maCanChiTieuVan}` : ""}
      ${maCanChiNguyetVan ? `Nguyệt vận: mã can chi ${maCanChiNguyetVan}` : ""}
      ${maCanChiNhatVan ? `Nhật vận: mã can chi ${maCanChiNhatVan}` : ""}
    `;
    const secondSection = `Bản đồ 4 tầng sao lưu động theo yêu cầu căn cứ vào 4 mã can chi\n${tamHopCungSaoText}`;
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
      $("#namxemtieuvan").css("display", "flex");
      $("#daivan").prop("checked", false);
      $("#namxemdaivan").css("display", "none");
    } else {
      $("#namxemtieuvan").css("display", "none");
    }
  });

  $("#daivan").click(function () {
    let checkedValues = $("#daivan").serialize();
    if (checkedValues) {
      $("#namxemdaivan").css("display", "flex");
      $("#luunien").prop("checked", false);
      $("#namxemtieuvan").css("display", "none");
    } else {
      $("#namxemdaivan").css("display", "none");
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
        if (
          $("form#lstv").serialize().includes("luunien=on") ||
          $("form#lstv").serialize().includes("daivan=on")
        ) {
          let namXemDaiVan = $("#namxemdaivan").val();
          let namXemTieuVan = $("#namxemtieuvan").val();
          let thangLuuNguyet = $("#thangluunguyet").val();
          let ngayLuuNhat = $("#ngayluunhat").val();
          const contentCopyLuuNien = copyContentLuuNien(
            thienBandiaBan,
            ngayLuuNhat,
            thangLuuNguyet,
            namXemTieuVan ? parseInt(namXemTieuVan) : new Date().getFullYear(),
            namXemDaiVan ? parseInt(namXemDaiVan) : new Date().getFullYear()
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
