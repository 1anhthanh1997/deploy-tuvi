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

  function getCungChuInfo(cungChu) {
    console.log(cungChu)
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

  function getSao(cungChu, thapNhiCung) {
    cungArr = thapNhiCung.filter((c) => {
      return c.cungChu === cungChu;
    });
    if (cungArr.length > 0) {
      let cung = cungArr[0];
      const { cungSao, cungSo } = cung;
      const chinhTinh = cungSao.filter((sao) => sao.saoAmDuong !== "");
      const phuTinh = cungSao.filter((sao) => sao.saoAmDuong === "");
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
    let nhatVan = cungSo;
    let nhatVanStr = cungSo.toString();
    while (nhatVan + 12 <= 30) {
      nhatVan += 12;
      nhatVanStr = nhatVanStr + ", " + nhatVan;
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
      const chinhTinh = cungSao.filter((sao) => sao.saoAmDuong !== "");
      let chinhTinhStr=""
      let phuTinh = cungSao.filter((sao) => sao.saoAmDuong === "");
      console.log(sapXepCungTheoCungSo)
      const cungDoiXung =sapXepCungTheoCungSo[(cungSo + 5) % 12]
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
      const { cungTen, cungChu, cungDaiHan, cungTieuHan, tuanTrung, trietLo } =
        cung;
      const cungDaiVan =
        index === sapXepCungTheoTuoi.length - 1
          ? `${cungDaiHan - 1} tuổi trở lên`
          : `${cungDaiHan - 1} tuổi đến năm ${
              sapXepCungTheoTuoi[sttNext].cungDaiHan - 2
            } tuổi`;
            if(!chinhTinh.length){
              let saoDacTinh= phuTinh.filter((sao)=>{
                return sao.saoDacTinh==="H";
              })
              phuTinh=phuTinh.filter((sao)=>{
                return sao.saoDacTinh!=="H";
              })
              chinhTinhStr=
              // "Lấy ý nghĩa đối xung của (" 
              +getSao(cungDoiXung.cungChu, sapXepCungTheoTuoi).chinhTinh
              // +") mà luận"
              +(saoDacTinh.length?" + ":"")+ saoDacTinh.map((sao) => capitalizeWords(sao.saoTen)).join(" + ")
            }else{
              chinhTinhStr=chinhTinh.map((sao) => capitalizeWords(sao.saoTen)).join(" + ")
            }
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
    )} của ${ten} sinh năm ${namDuong}  gồm có: ${chinhTinhStr} ${trietLo ? "+ Triệt" : ""}${tuanTrung ? "+ Tuần" : ""}
    Phụ Tinh ${capitalizeWords(
      cungChu
    )} của ${ten} sinh năm ${namDuong} gồm có: ${phuTinh
        .map((sao) => capitalizeWords(sao.saoTen))
        .join(" + ")} 
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

  function downloadTxtFile(content,title) {
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
    let title="sample.txt"
    let checkedValues = $("#luunien").serialize();
    if(checkedValues){
      let namXemTieuVan = $('#namxemtieuvan').val();
      title="tieu_van_"+namXemTieuVan+".txt";
    }else{
      let name =$('#hoten').val();
      title="la_so_"+name+".txt";
    }
    const content = $("#contentCopy").text();
    downloadTxtFile(content,title);
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
