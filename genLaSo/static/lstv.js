$(document).ready(function () {
  var uploadLaso = "/upload";
  var d = new Date();
  var thismonth = d.getMonth() + 1;
  var today = d.getDate();
  var thisyear = d.getFullYear();
  $("#ngaysinh").val(today);
  $("#thangsinh").val(thismonth);
  $("#namsinh").val(thisyear);
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
      const chinhTinh = cungSao.filter((sao) => sao.saoAmDuong !== "");
      const phuTinh = cungSao.filter((sao) => sao.saoAmDuong === "");
      const cungDoiXung =
        cungSo + 6 > 12
          ? sapXepCungTheoCungSo[cungSo + 6 - 12]
          : sapXepCungTheoCungSo[cungSo + 6 - 1];
      const cungTamHop1 =
        cungSo + 4 > 12
          ? sapXepCungTheoCungSo[cungSo + 4 - 12]
          : sapXepCungTheoCungSo[cungSo + 4 - 1];
      const cungSoTamHop1 = cungTamHop1.cungSo - 1;
      const cungTamHop2 =
        cungSoTamHop1 + 4 > 12
          ? sapXepCungTheoCungSo[cungSoTamHop1 + 4 - 12]
          : sapXepCungTheoCungSo[cungSoTamHop1 + 4 - 1];
      const stt = index + 1;
      const sttNext =
        index === sapXepCungTheoTuoi.length - 1 ? null : index + 1;
      const { cungTen, cungChu, cungDaiHan, cungTieuHan } = cung;
      const cungDaiVan =
        index === sapXepCungTheoTuoi.length - 1
          ? `${cungDaiHan} tuổi trở lên`
          : `${cungDaiHan} tuổi đến năm ${
              sapXepCungTheoTuoi[sttNext].cungDaiHan - 1
            } tuổi`;
      return `${stt}. 
    Cung vị: ${capitalizeWords(cungTen)} 
    Cung chức: ${capitalizeWords(cungChu)} của anh ${ten} sinh năm ${namDuong}
    Tam hợp với cung ${capitalizeWords(
      cungTamHop1.cungChu
    )} và ${capitalizeWords(
        cungTamHop2.cungChu
      )}, đối xung ngoại cảnh là ${capitalizeWords(cungDoiXung.cungChu)}
    Chính Tinh  (ảnh hưởng min 50%, max 80%): ${chinhTinh
      .map((sao) => capitalizeWords(sao.saoTen))
      .join(" + ")}
    Phụ Tinh (ảnh hưởng min 20%, max 50%): ${phuTinh
      .map((sao) => capitalizeWords(sao.saoTen))
      .join(" + ")} 
    Đại vận thứ ${index === 0 ? "nhất" : index + 1} của anh ${capitalizeWords(
        ten
      )} sinh năm ${namDuong} (${cungDaiVan})
    Tiểu vận: năm ${capitalizeWords(cungTieuHan)}
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

      const { cungTen, trietLo, tuanTrung } = cung;

      return `${stt}.
      Cung vị: ${cungTen}
      Các sao lưu động: ${trietLo ? "Triệt, " : ""}${
        tuanTrung ? "Tuần, " : ""
      }${saoLuuNien.map((sao) => sao.saoTen.replace("L.", "")).join(", ")}`;
    });
    const contentCopy = `Lá số Tiểu vận ${namXemTieuVan}
 \n${namNu} Mệnh, năm ${canNamTieuVanTen} ${chiNamTieuVanTen} ${namXemTieuVan} \n${contentThapNhiCung.join(
      "\n"
    )}`;
    return contentCopy;
  }

  function downloadTxtFile(content) {
    const text = content;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "sample.txt";

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
    const content = $("#contentCopy").text();
    console.log(content);
    downloadTxtFile(content);
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
          $("#note").css("display", "flex");
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
