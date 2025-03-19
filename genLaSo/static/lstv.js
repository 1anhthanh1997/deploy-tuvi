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
    console.log(cungChu);
    switch (cungChu) {
      case "Mệnh": {
        return {
          description: "bản chất, lý tưởng, cốt lõi, ý chí, cá tính",
          shortName: "",
        };
      }
      case "Phụ mẫu": {
        return {
          description:
            "cha mẹ, cha mẹ vợ/chồng, những người có vai trò như cha mẹ, thế hệ đi trước (quá khứ), bề trên (sếp, thủ trưởng, tiền bối…)",
          shortName: "Phụ",
        };
      }
      case "Phúc đức": {
        return {
          description:
            "phước báu/may mắn, giá trị tinh thần, gia tộc (nội/ngoại), quan điểm về hạnh phúc",
          shortName: "Phúc",
        };
      }
      case "Điền trạch": {
        return {
          description:
            "tích lũy tài sản, cơ sở hạ tầng, thói quen sinh hoạt hằng ngày, di sản giá trị vật chất để lại cho đời",
          shortName: "Điền",
        };
      }
      case "Quan lộc": {
        return {
          description: "công việc/sự nghiệp, tác phong/năng lực làm việc",
          shortName: "Quan",
        };
      }
      case "Nô bộc": {
        return {
          description:
            "thế hệ đồng trang lứa (hiện tại), các mối quan hệ xã giao không sâu sắc, các mối quan hệ chỉ chia sẻ lợi ích mà không chia sẻ rủi ro",
          shortName: "Nô",
        };
      }
      case "Thiên di": {
        return {
          description:
            "góc nhìn của xã hội về đương số, ngoại cảnh của “Mệnh”, đối tác/đối thủ/đối phương, cách đối nhân xử thế & tương tác xã hội",
          shortName: "Di",
        };
      }
      case "Tật Ách": {
        return {
          description: "sức khỏe, bệnh tật, nghiệp quả",
          shortName: "Tật",
        };
      }
      case "Tài Bạch": {
        return {
          description:
            "tài năng/tài nguyên/tài chính, tiền, kinh tế, giá trị vật chất",
          shortName: "Tài",
        };
      }
      case "Tử tức": {
        return {
          description:
            "thế hệ sau (tương lai), con cháu/đệ tử/học trò/thú cưng, di sản giá trị tinh thần để lại cho đời",
          shortName: "Tử",
        };
      }
      case "Phu thê": {
        return {
          description:
            "Vợ/chồng, người yêu/người tình, mối quan hệ mật thiết cá nhân",
          shortName: "Phối",
        };
      }
      case "Huynh đệ": {
        return {
          description:
            "anh chị em trong gia tộc, các mối quan hệ chia sẻ cả lợi ích lẫn rủi ro, anh chị em kết nghĩa, anh chị em xã hội tri kỷ…",
          shortName: "Bào",
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

  function getSao(cungChu, thapNhiCung) {
    cungArr = thapNhiCung.filter((c) => {
      return c.cungChu === cungChu;
    });
    if (cungArr.length > 0) {
      let cung = cungArr[0];
      const { cungSao, cungSo } = cung;
      const chinhTinhGoc = cungSao.filter((sao) => sao.saoAmDuong !== "");
      const chinhTinhMoi = cungSao.filter((sao) =>
        newChinhTinh.includes(sao.saoID)
      );
      const chinhTinh = [...chinhTinhGoc, ...chinhTinhMoi];
      const phuTinh = cungSao.filter(
        (sao) => sao.saoAmDuong === "" && !newChinhTinh.includes(sao.saoID)
      );
      return {
        chinhTinh: chinhTinh
          .map((sao) => capitalizeWords(sao.saoTen))
          .join(" + "),
        phuTinh: phuTinh.map((sao) => capitalizeWords(sao.saoTen)).join(" + "),
      };
    }
    return {
      chinhTinh: "",
      phuTinh: "",
    };
  }

  function getNhatVan(cungSo) {
    let nhatVanStr = "";
    let year = new Date().getFullYear();
    const start = new Date(year, 0, 1); // 01/01 của năm nhập vào
    const endYear = year + 1;

    // Kiểm tra năm nhuận để tính ngày cuối tháng 2
    const isLeapYear = new Date(endYear, 1, 29).getDate() === 29;
    const end = new Date(endYear, 1, isLeapYear ? 29 : 28); // 28/02 hoặc 29/02 của năm sau

    let currentDate = new Date(start);

    while (currentDate <= end) {
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const currentYear = currentDate.getFullYear();
      let { ngayAm, thangAm, isValid } = checkNgayTrongNam(
        parseInt(day),
        parseInt(month),
        currentYear
      );
      if (isValid) {
        [canNgay, chiNgay] = canChiNgay(
          parseInt(day),
          parseInt(month),
          currentYear
        );
        if (cungSo === chiNgay) {
          nhatVanStr += ngayAm + "/" + thangAm + ", ";
        }
      }

      currentDate.setDate(currentDate.getDate() + 1); // Tăng thêm 1 ngày
    }

    return nhatVanStr;
  }

  function copyContent(laso) {
    const { thienBan, thapNhiCung } = laso;
    const { namDuong, canNamTen, ten, chiNamTen } = thienBan;
    thapNhiCung.shift();
    const sapXepCungTheoCungSo = [...thapNhiCung].sort(
      (a, b) => a.cungSo - b.cungSo
    );
    const sapXepCungTheoTuoi = [...thapNhiCung].sort(
      (a, b) => a.cungDaiHan - b.cungDaiHan
    );

    // Get content from input fields
    const chinhTinhContent = $("#chinhTinh").val();
    const phuTinhContent = $("#phuTinh").val();

    const contentThapNhiCung = sapXepCungTheoTuoi.map((cung, index) => {
      const { cungSao, cungSo } = cung;
      const chinhTinhGoc = cungSao.filter((sao) => sao.saoAmDuong !== "");
      const chinhTinhMoi = cungSao.filter((sao) =>
        newChinhTinh.includes(sao.saoID)
      );
      const chinhTinh = [...chinhTinhGoc, ...chinhTinhMoi];
      let chinhTinhStr = "";
      let phuTinh = cungSao.filter(
        (sao) => sao.saoAmDuong === "" && !newChinhTinh.includes(sao.saoID)
      );
      console.log(sapXepCungTheoCungSo);
      const cungDoiXung = sapXepCungTheoCungSo[(cungSo + 5) % 12];
      const cungTamHop1 = sapXepCungTheoCungSo[(cungSo + 3) % 12]; //cungSo tinh tu 1 con index tinh tu 0
      const cungTamHop2 = sapXepCungTheoCungSo[(cungSo + 7) % 12];
      const stt = index + 1;
      const sttNext =
        index === sapXepCungTheoTuoi.length - 1 ? null : index + 1;
      const { cungTen, cungChu, cungDaiHan, cungTieuHan, tuanTrung, trietLo } =
        cung;
      const cungDaiVan =
        index === sapXepCungTheoTuoi.length - 1
          ? `${cungDaiHan - 1} tuổi trở lên`
          : `${cungDaiHan - 1} tuổi đến năm ${
              sapXepCungTheoTuoi[sttNext].cungDaiHan - 2
            } tuổi`;
      chinhTinhStr = chinhTinh
        .map((sao) => capitalizeWords(sao.saoTen))
        .join(" + ");

      return `${stt}. 
    Cung chức gốc: ${capitalizeWords(cungChu)} ${
        getCungChuInfo(cungChu).shortName
          ? "(" + getCungChuInfo(cungChu).shortName + ")"
          : ""
      } của ${ten} sinh năm ${namDuong}
    Cung ${capitalizeWords(cungChu)} chủ quản thông tin về: ${
        getCungChuInfo(cungChu).description
      }
    Chính Tinh của cung ${capitalizeWords(
      cungChu
    )} của ${ten} sinh năm ${namDuong}  gồm có: ${chinhTinhStr} ${
        trietLo ? "+ Triệt" : ""
      }${tuanTrung ? "+ Tuần" : ""}
    Phụ Tinh ${capitalizeWords(
      cungChu
    )} của ${ten} sinh năm ${namDuong} gồm có: ${phuTinh
        .map((sao) => capitalizeWords(sao.saoTen))
        .join(" + ")} 
    ${
      !chinhTinhGoc.length
        ? "Tham khảo thêm ý nghĩa cung đối xung ngoại cảnh"
        : ""
    }    
    Xét tổ hợp ý nghĩa của cung ${capitalizeWords(
      cungChu
    )} của ${ten} sinh năm ${namDuong}
      - Tam hợp với cung ${capitalizeWords(cungChu)} là cung ${capitalizeWords(
        cungTamHop1.cungChu
      )} có ${
        (getSao(cungTamHop1.cungChu, sapXepCungTheoTuoi).chinhTinh
          ? "chính tinh: "
          : "") +
        getSao(cungTamHop1.cungChu, sapXepCungTheoTuoi).chinhTinh +
        (getSao(cungTamHop1.cungChu, sapXepCungTheoTuoi).chinhTinh ? ", " : "")
      }phụ tinh: ${
        getSao(cungTamHop1.cungChu, sapXepCungTheoTuoi).phuTinh
      } và cung ${capitalizeWords(cungTamHop2.cungChu)} có ${
        (getSao(cungTamHop2.cungChu, sapXepCungTheoTuoi).chinhTinh
          ? "chính tinh: "
          : "") +
        getSao(cungTamHop2.cungChu, sapXepCungTheoTuoi).chinhTinh +
        (getSao(cungTamHop2.cungChu, sapXepCungTheoTuoi).chinhTinh ? ", " : "")
      }phụ tinh: ${getSao(cungTamHop2.cungChu, sapXepCungTheoTuoi).phuTinh}
      - Đối xung ngoại cảnh với cung ${capitalizeWords(
        cungChu
      )} là cung ${capitalizeWords(cungDoiXung.cungChu)} có ${
        (getSao(cungDoiXung.cungChu, sapXepCungTheoTuoi).chinhTinh
          ? "chính tinh: "
          : "") +
        getSao(cungDoiXung.cungChu, sapXepCungTheoTuoi).chinhTinh +
        (getSao(cungDoiXung.cungChu, sapXepCungTheoTuoi).chinhTinh ? ", " : "")
      }phụ tinh: ${getSao(cungDoiXung.cungChu, sapXepCungTheoTuoi).phuTinh}
    Xét vận tại cung ${capitalizeWords(
      cungChu
    )} của ${ten} sinh năm ${namDuong}   
      - Cung ${capitalizeWords(
        cungChu
      )} chủ quản thông tin Đại vận (${cungDaiVan})
      - Cung ${capitalizeWords(
        cungChu
      )} chủ quản thông tin Tiểu vận: năm ${capitalizeWords(cungTieuHan)}
      - Cung ${capitalizeWords(cungChu)} chủ quản thông tin Nguyệt vận: tháng ${
        cungSo - 2 <= 0 ? cungSo + 10 : cungSo - 2
      }
      - Cung ${capitalizeWords(
        cungChu
      )} chủ quản thông tin Nhật vận: ngày ${getNhatVan(cungSo)}
            `;
    });
    const contentCopy = `Lá số của ${ten} sinh năm ${namDuong} (${canNamTen} ${chiNamTen}) \n ${contentThapNhiCung.join(
      "\n"
    )}`;
    return contentCopy;
  }

  function copyContentLuuNien(laso) {
    const { thienBan, thapNhiCung } = laso;
    const {
      namDuong,
      canNamTen,
      ten,
      chiNamTen,
      namNu,
      namAm,
      namXemTieuVan,
      canNamTieuVanTen,
      chiNamTieuVanTen,
    } = thienBan;

    const sapXepCungTheoCungSo = [...thapNhiCung].sort(
      (a, b) => a.cungSo - b.cungSo
    );
    const contentThapNhiCung = sapXepCungTheoCungSo.map((cung, index) => {
      const { cungSao } = cung;
      let saoLuuNien = cungSao.filter((sao) => {
        return sao.saoLuuNien;
      });

      const stt = index + 1;

      const { cungTen, cungChu, luuTrietLo, luuTuanTrung } = cung;

      return `${stt}.
      Cung chức: ${cungChu}
      Các sao lưu động: ${luuTrietLo ? "Triệt, " : ""}${
        luuTuanTrung ? "Tuần, " : ""
      }${saoLuuNien.map((sao) => sao.saoTen.replace("L.", "")).join(", ")}`;
    });
    const contentCopy = `Lá số Tiểu vận ${namXemTieuVan}
 \n${namNu} Mệnh, năm ${canNamTieuVanTen} ${chiNamTieuVanTen} ${namXemTieuVan} \n${contentThapNhiCung.join(
      "\n"
    )}`;
    return contentCopy;
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
    if (checkedValues) {
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
    } else {
      $("#namxemtieuvan").css("display", "none");
    }
  });

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
        $("#valueAnhHuong").css("display", "block");
        const contentCopy = copyContent(thienBandiaBan);
        $("#contentCopy").text(contentCopy);
      },
      error: function (thienBandiaBan) {
        console.log("AJAX error callback called");
      },
    });
  });

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
        const contentCopy = copyContent(thienBandiaBan);
        const contentCopyLuuNien = copyContentLuuNien(thienBandiaBan);
        if ($("form#lstv").serialize().includes("luunien=on")) {
          $("#contentCopy").text(contentCopyLuuNien);
          // $("#note").css("display", "flex");
          $("#valueAnhHuong").css("display", "none");
        } else {
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
