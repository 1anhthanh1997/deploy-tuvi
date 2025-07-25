$(document).ready(function () {
  var uploadLaso = "/upload";
  var d = new Date();
  var thismonth = d.getMonth() + 1;
  var today = d.getDate();
  var thisyear = d.getFullYear();
  $("#ngaysinh").val(today);
  $("#thangsinh").val(thismonth);
  $("#namsinh").val(thisyear);

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

  const getThapThanh = (nhatChuName) => {
    let thapThan = [{ name: "Giáp", thapThan: [] }];
  };

  const getTuTruData = (bazi) => {
    let nhatChu = bazi.day;
    let nhatChuName = nhatChu.name.split(" ")[0];
    let tuTru = `
Nhật Chủ: ${nhatChuName}. File Thập Thần của Nhật Chủ ${nhatChu.name}
Mười Thiên Can khi tương tác với Nhật Chủ ${nhatChuName} ${nhatChu.nguHanhCan} sẽ tạo ra mười thực thể (Thập Thần) với những biểu hiện riêng biệt.
Tỷ Kiên (Kỷ Thổ): Đại diện cho bản thân, bạn bè, đồng nghiệp cùng giới tính.
Tích cực: Có kế hoạch, bao dung, giỏi quản lý và sắp xếp.
Tiêu cực: Hay lo nghĩ, vụn vặt, bao bọc quá mức.
Kiếp Tài (Mậu Thổ): Đại diện cho anh em, bạn bè khác giới, đối thủ cạnh tranh.
Tích cực: Vững chãi, uy tín, hào sảng, trung thành, đáng tin cậy.
Tiêu cực: Bảo thủ, trì trệ, cố chấp, thiếu linh hoạt.
Thực Thần (Tân Kim): Đại diện cho sự hưởng thụ, tài năng nghệ thuật, con gái.
Tích cực: Tinh tế, sắc sảo, chỉn chu, có nguyên tắc, coi trọng danh dự.
Tiêu cực: Khó tính, hay chỉ trích, kiêu ngạo, lời nói sắc bén gây tổn thương.
Thương Quan (Canh Kim): Đại diện cho sự thông minh, phản kháng, sáng tạo, con trai.
Tích cực: Quyết đoán, dũng cảm, nghĩa khí, thẳng thắn, bảo vệ lẽ phải.
Tiêu cực: Hiếu thắng, cứng nhắc, nóng vội, độc đoán.
Chính Quan (Giáp Mộc): Đại diện cho công danh, sự nghiệp, kỷ luật, chồng (đối với nữ).
Tích cực: Có khí chất lãnh đạo, chính trực, độc lập, kiên định và đáng tin cậy.
Tiêu cực: Độc đoán, gia trưởng, cứng nhắc, tự cao.
Thất Sát (Ất Mộc): Đại diện cho áp lực, thử thách, quyền lực, người tình (đối với nữ).
Tích cực: Khéo léo, linh hoạt, nhẫn nại, giỏi giao tiếp, tùy cơ ứng biến.
Tiêu cực: Dựa dẫm, thiếu chính kiến, gió chiều nào theo chiều ấy, thao túng ngầm.
Chính Ấn (Bính Hỏa): Đại diện cho mẹ, sự che chở, kiến thức, lòng nhân hậu.
Tích cực: Hào phóng, nhiệt tình, lạc quan, truyền cảm hứng, quang minh chính đại.
Tiêu cực: Nóng nảy, bốc đồng, phô trương, háo danh, cả thèm chóng chán.
Thiên Ấn (Đinh Hỏa): Đại diện cho mẹ kế, kiến thức độc đáo, trực giác, sự cô độc.
Tích cực: Ấm áp, tinh tế, sâu sắc, lễ phép, chu đáo, có khả năng soi sáng cho người khác.
Tiêu cực: Hay ghen tuông, đa nghi, giữ thù, nhạy cảm quá mức, nóng giận ngầm.
Chính Tài (Nhâm Thủy): Đại diện cho tài sản ổn định, thu nhập chính, vợ (đối với nam).
Tích cực: Thông minh, linh hoạt, hào sảng, có tầm nhìn rộng, giỏi giao tiếp xã hội.
Tiêu cực: Hay thay đổi, không ổn định, cả thèm chóng chán, phóng túng.
Thiên Tài (Quý Thủy): Đại diện cho tài sản bất ngờ, đầu tư, kinh doanh, cha, người tình (đối với nam).
Tích cực: Sâu sắc, tinh tế, khiêm tốn, nhẫn nại, giỏi lắng nghe, thấu cảm, có trực giác tốt.
Tiêu cực: Hay lo nghĩ, bi quan, u uất, nhạy cảm quá mức, hay suy diễn.
`;
    return tuTru;
  };

  function getBatTuTemplate(bazi) {
    let nam = bazi.year;
    let thang = bazi.month;
    let ngay = bazi.day;
    let gio = bazi.hour;
    let nguHanhScore = bazi.nguHanhScore;
    let batTuTemplate = `Hồ sơ AGI của Hoàng sinh năm 1994
    Phần 1: Tứ Trụ
    ${getTuTruData(bazi)}
     `;
  }

  function lapBatTu(bazi) {
    let nam = bazi.year;
    let thang = bazi.month;
    let ngay = bazi.day;
    let gio = bazi.hour;
    let nguHanhScore = bazi.nguHanhScore;
    // $("#namDuongLich").text(nam.solarValue);
    // $("#thangDuongLich").text(thang.solarValue);
    // $("#ngayDuongLich").text(ngay.solarValue);
    // $("#gioDuongLich").text(gio.lunarValue);
    // $("#namAmLich").text(nam.lunarValue);
    // $("#thangAmLich").text(thang.lunarValue);
    // $("#ngayAmLich").text(ngay.lunarValue);
    // $("#gioAmLich").text(gio.lunarValue);
    // $("#tenNamAm").text(nam.name);
    // $("#tenThangAm").text(thang.name);
    // $("#tenNgayAm").text(ngay.name);
    // $("#tenGioAm").text(gio.name);
    // $("#napAmNam").text(nam.nguHanhNapAm);
    // $("#napAmThang").text(thang.nguHanhNapAm);
    // $("#napAmNgay").text(ngay.nguHanhNapAm);
    // $("#napAmGio").text(gio.nguHanhNapAm);
    $("#tenNamBatTu").text(nam.name);
    $("#napAmNamBatTu").text(nam.nguHanhNapAm);
    $("#nguHanhCanNamBatTu").text(nam.nguHanhCan);
    $("#nguHanhChiNamBatTu").text(nam.nguHanhChi);
    $("#tenThangBatTu").text(thang.name);
    $("#napAmThangBatTu").text(thang.nguHanhNapAm);
    $("#nguHanhCanThangBatTu").text(thang.nguHanhCan);
    $("#nguHanhChiThangBatTu").text(thang.nguHanhChi);
    $("#tenNgayBatTu").text(ngay.name);
    $("#napAmNgayBatTu").text(ngay.nguHanhNapAm);
    $("#nguHanhCanNgayBatTu").text(ngay.nguHanhCan);
    $("#nguHanhChiNgayBatTu").text(ngay.nguHanhChi);
    $("#tenGioBatTu").text(gio.name);
    $("#napAmGioBatTu").text(gio.nguHanhNapAm);
    $("#nguHanhCanGioBatTu").text(gio.nguHanhCan);
    $("#nguHanhChiGioBatTu").text(gio.nguHanhChi);
    $("#tenDaiVanBatTu").text(bazi.daiVan ? bazi.daiVan.name : "");
    $("#napAmDaiVanBatTu").text(bazi.daiVan ? bazi.daiVan.nguHanhNapAm : "");
    $("#nguHanhCanDaiVanBatTu").text(bazi.daiVan ? bazi.daiVan.nguHanhCan : "");
    $("#nguHanhChiDaiVanBatTu").text(bazi.daiVan ? bazi.daiVan.nguHanhChi : "");
    $("#tenTieuVanBatTu").text(bazi.tieuVan ? bazi.tieuVan.name : "");
    $("#napAmTieuVanBatTu").text(bazi.tieuVan ? bazi.tieuVan.nguHanhNapAm : "");
    $("#nguHanhCanTieuVanBatTu").text(bazi.tieuVan ? bazi.tieuVan.nguHanhCan : "");
    $("#nguHanhChiTieuVanBatTu").text(bazi.tieuVan ? bazi.tieuVan.nguHanhChi : "");
    $("#tenNguyetVanBatTu").text(bazi.nguyetVan ? bazi.nguyetVan.name : "");
    $("#napAmNguyetVanBatTu").text(bazi.nguyetVan ? bazi.nguyetVan.nguHanhNapAm : "");
    $("#nguHanhCanNguyetVanBatTu").text(bazi.nguyetVan ? bazi.nguyetVan.nguHanhCan : "");
    $("#nguHanhChiNguyetVanBatTu").text(bazi.nguyetVan ? bazi.nguyetVan.nguHanhChi : "");
    $("#tenNhatVanBatTu").text(bazi.nhatVan ? bazi.nhatVan.name : "");
    $("#napAmNhatVanBatTu").text(bazi.nhatVan ? bazi.nhatVan.nguHanhNapAm : "");
    $("#nguHanhCanNhatVanBatTu").text(bazi.nhatVan ? bazi.nhatVan.nguHanhCan : "");
    $("#nguHanhChiNhatVanBatTu").text(bazi.nhatVan ? bazi.nhatVan.nguHanhChi : "");
    $("#tenThoiVanBatTu").text(bazi.thoiVan ? bazi.thoiVan.name : "");
    $("#napAmThoiVanBatTu").text(bazi.thoiVan ? bazi.thoiVan.nguHanhNapAm : "");
    $("#nguHanhCanThoiVanBatTu").text(bazi.thoiVan ? bazi.thoiVan.nguHanhCan : "");
    $("#nguHanhChiThoiVanBatTu").text(bazi.thoiVan ? bazi.thoiVan.nguHanhChi : "");
    $("#tenNamTru").text(nam.name);
    $("#tenThangTru").text(thang.name);
    $("#tenNgayTru").text(ngay.name);
    $("#tenGioTru").text(gio.name);
    $("#canTangNam").text(nam.canTang);
    $("#canTangThang").text(thang.canTang);
    $("#canTangNgay").text(ngay.canTang);
    $("#canTangGio").text(gio.canTang);
    $("#thapThanNam").text(nam.thapThan);
    $("#thapThanThang").text(thang.thapThan);
    $("#thapThanNgay").text(ngay.thapThan);
    $("#thapThanGio").text(gio.thapThan);
    $("#nangLuongAmKim").text(
      nguHanhScore.find((item) => item.id === 1).scoreAm
    );
    $("#nangLuongAmMoc").text(
      nguHanhScore.find((item) => item.id === 2).scoreAm
    );
    $("#nangLuongAmThuy").text(
      nguHanhScore.find((item) => item.id === 3).scoreAm
    );
    $("#nangLuongAmHoa").text(
      nguHanhScore.find((item) => item.id === 4).scoreAm
    );
    $("#nangLuongAmTho").text(
      nguHanhScore.find((item) => item.id === 5).scoreAm
    );
    $("#nangLuongDuongKim").text(
      nguHanhScore.find((item) => item.id === 1).scoreDuong
    );
    $("#nangLuongDuongMoc").text(
      nguHanhScore.find((item) => item.id === 2).scoreDuong
    );
    $("#nangLuongDuongThuy").text(
      nguHanhScore.find((item) => item.id === 3).scoreDuong
    );
    $("#nangLuongDuongHoa").text(
      nguHanhScore.find((item) => item.id === 4).scoreDuong
    );
    $("#nangLuongDuongTho").text(
      nguHanhScore.find((item) => item.id === 5).scoreDuong
    );
    $("#tongNangLuongKim").text(
      nguHanhScore.find((item) => item.id === 1).total
    );
    $("#tongNangLuongMoc").text(
      nguHanhScore.find((item) => item.id === 2).total
    );
    $("#tongNangLuongThuy").text(
      nguHanhScore.find((item) => item.id === 3).total
    );
    $("#tongNangLuongHoa").text(
      nguHanhScore.find((item) => item.id === 4).total
    );
    $("#tongNangLuongTho").text(
      nguHanhScore.find((item) => item.id === 5).total
    );
    $("#phanTramNangLuongKim").text(
      nguHanhScore.find((item) => item.id === 1).percent
    );
    $("#phanTramNangLuongMoc").text(
      nguHanhScore.find((item) => item.id === 2).percent
    );
    $("#phanTramNangLuongThuy").text(
      nguHanhScore.find((item) => item.id === 3).percent
    );
    $("#phanTramNangLuongHoa").text(
      nguHanhScore.find((item) => item.id === 4).percent
    );
    $("#phanTramNangLuongTho").text(
      nguHanhScore.find((item) => item.id === 5).percent
    );
  }

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

  $("input#laplaso").click(function () {
    $("#laso").removeClass("anlaso");
    $("#urlLaso").val("");
    $.ajax({
      url: "/api/get-bazi",
      type: "GET",
      dataType: "json",
      data: $("form#lstv").serialize(),
      success: function (thienBandiaBan) {
        lapBatTu(thienBandiaBan);
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
