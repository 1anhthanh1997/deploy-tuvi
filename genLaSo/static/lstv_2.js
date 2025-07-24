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

  function lapBatTu(bazi) {
    let nam = bazi.year;
    let thang = bazi.month;
    let ngay = bazi.day;
    let gio = bazi.hour;
    let nguHanhScore = bazi.nguHanhScore;
    $("#namDuongLich").text(nam.solarValue);
    $("#thangDuongLich").text(thang.solarValue);
    $("#ngayDuongLich").text(ngay.solarValue);
    $("#gioDuongLich").text(gio.lunarValue);
    $("#namAmLich").text(nam.lunarValue);
    $("#thangAmLich").text(thang.lunarValue);
    $("#ngayAmLich").text(ngay.lunarValue);
    $("#gioAmLich").text(gio.lunarValue);
    $("#tenNamAm").text(nam.name);
    $("#tenThangAm").text(thang.name);
    $("#tenNgayAm").text(ngay.name);
    $("#tenGioAm").text(gio.name);
    $("#napAmNam").text(nam.nguHanhNapAm);
    $("#napAmThang").text(thang.nguHanhNapAm);
    $("#napAmNgay").text(ngay.nguHanhNapAm);
    $("#napAmGio").text(gio.nguHanhNapAm);
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
