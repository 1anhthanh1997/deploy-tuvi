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

  const getThapThanThienCan = (nhatChuName) => {
    let thapThan = [
      {
        name: "Giáp",
        characteristic: `Đặc tính cơ bản của Nhật Chủ Giáp Mộc
Giáp Mộc là hình ảnh của cây cổ thụ to lớn, vững chãi, luôn vươn thẳng lên trời (Dương Mộc). Đặc tính cốt lõi là sự kiên định, chính trực, có lòng nhân ái và luôn có ý chí vươn lên làm người dẫn đầu. Người Giáp Mộc có tố chất của một nhà lãnh đạo, thẳng thắn, đáng tin cậy nhưng đôi khi khá cứng nhắc và thiếu linh hoạt. Để phát triển, Giáp Mộc cần đất (Thổ) để bén rễ, nước (Thủy) để nuôi dưỡng và ánh nắng (Hỏa) để quang hợp.
  •	Khi cân bằng:
      Đặc điểm: Họ là người có ý chí mạnh mẽ, lòng tự trọng cao và tinh thần trách nhiệm. Luôn đặt ra mục tiêu rõ ràng và kiên trì theo đuổi. Họ chính trực, nhân hậu, sẵn sàng che chở, bảo vệ cho người khác. Họ là những nhà lãnh đạo, người tiên phong đáng tin cậy.
      Dấu hiệu nhận biết: Dáng người cao, thẳng. Tác phong đĩnh đạc, chững chạc. Lời nói thẳng thắn, có trọng lượng. Không thích những chuyện vụn vặt, tiểu tiết.
  •	Khi mất cân bằng (Quá Cường / Quá Nhược):
      - Quá Cường (Mộc quá vượng):
        Đặc điểm: Một khu rừng quá rậm rạp, cây cối tranh giành ánh sáng và chất dinh dưỡng. Họ trở nên cực kỳ cố chấp, bướng bỉnh, không chịu lắng nghe ai. Thiếu sự linh hoạt, không biết tùy cơ ứng biến. Có thể trở nên độc đoán, chỉ biết đến mình.
        Dấu hiệu nhận biết: Cứng đầu, bảo thủ. Khó chấp nhận sự thay đổi. Thiếu sự tinh tế, dễ làm người khác khó chịu vì sự thẳng thắn quá mức.
      - Quá Nhược (Mộc bị suy):
        Đặc điểm: Cây cối còi cọc, không thể phát triển. Họ thiếu tự tin, lập trường không vững vàng, dễ bị người khác lôi kéo, chi phối. Thiếu ý chí, dễ bỏ cuộc giữa chừng. Không có khả năng tự bảo vệ mình.
        Dấu hiệu nhận biết: Do dự, thiếu quyết đoán. Dễ dựa dẫm vào người khác. Thiếu đi khí phách và sự mạnh mẽ vốn có.
`,
        data: [
          {
            name: "Giáp",
            thapThan: "Tỷ Kiên",
            nguHanh: "Mộc",
            amDuong: "Dương",
            description:
              "Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.",
            tichCuc:
              "Tăng cường sự tự tin, ý chí độc lập. Có nhiều bạn bè tốt, cùng chí hướng, hỗ trợ nhau trong việc lớn.",
            tieuCuc:
              "Cạnh tranh cực kỳ gay gắt để giành vị trí dẫn đầu. Dễ xảy ra mâu thuẫn, xung đột với bạn bè, đồng nghiệp. Không ai chịu nhường ai.",
          },
          {
            name: "Ất",
            thapThan: "Kiếp Tài",
            nguHanh: "Mộc",
            amDuong: "Âm",
            description:
              "Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.",
            tichCuc:
              "Đây là sự kết hợp tốt nhất cho Ất Mộc. Hình ảnh dây leo (Ất) quấn quanh cây lớn (Giáp) để vươn lên. Có quý nhân, người có năng lực che chở, giúp đỡ để thăng tiến.",
            tieuCuc:
              "Dễ trở nên quá phụ thuộc, ỷ lại. Nếu không có Giáp Mộc, sẽ cảm thấy mất phương hướng.",
          },
          {
            name: "Bính",
            thapThan: "Thực Thần",
            nguHanh: "Hỏa",
            amDuong: "Dương",
            description:
              "Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).",
            tichCuc:
              "Đây là hình ảnh đẹp nhất của Giáp Mộc (Mộc Hỏa thông minh). Cây lớn được mặt trời chiếu rọi, phát triển rực rỡ. Mang lại trí thông minh, sự lạc quan, tài năng sáng tạo và khả năng biểu đạt xuất sắc.",
            tieuCuc:
              "Dễ trở nên quá khoe khoang, thích thể hiện. Có thể vì quá tập trung vào việc thể hiện mà trở nên thiếu thực tế.",
          },
          {
            name: "Đinh",
            thapThan: "Thương Quan",
            nguHanh: "Hỏa",
            amDuong: "Âm",
            description:
              "Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).",
            tichCuc:
              "Mang lại sự sáng tạo tinh tế, khả năng đi sâu vào chi tiết. Có tài năng trong các lĩnh vực nghệ thuật, kỹ thuật đòi hỏi sự tỉ mỉ.",
            tieuCuc:
              "Hình ảnh cây lớn (Giáp) làm nhiên liệu cho ngọn lửa nhỏ (Đinh). Sự sáng tạo này làm tiêu hao rất nhiều năng lượng. Dễ bị kiệt sức, lao tâm khổ tứ.",
          },
          {
            name: "Mậu",
            thapThan: "Thiên Tài",
            nguHanh: "Thổ",
            amDuong: "Dương",
            description:
              "Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam)",
            tichCuc:
              "Hình ảnh cây cổ thụ mọc trên ngọn núi lớn. Có cơ hội kiếm những khoản tiền lớn, tham gia vào các dự án tầm cỡ, đặc biệt là bất động sản.",
            tieuCuc:
              "Kiếm tiền rất vất vả, phải đối mặt với thử thách lớn. Cần nỗ lực rất nhiều mới có thể thành công.",
          },
          {
            name: "Kỷ",
            thapThan: "Chính Tài",
            nguHanh: "Thổ",
            amDuong: "Âm",
            description:
              "Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.",
            tichCuc:
              "Giáp Kỷ hợp hóa Thổ. Cây lớn cắm rễ vào mảnh đất màu mỡ. Mang lại tài lộc ổn định, bền vững. Nam mệnh có vợ hiền, là người biết vun vén, hỗ trợ chồng.",
            tieuCuc:
              "Dễ trở nên quá thực tế, chỉ quan tâm đến tiền bạc. Có thể vì gia đình, vợ con mà mất đi chí lớn.",
          },
          {
            name: "Tân",
            thapThan: "Chính Quan",
            nguHanh: "Kim",
            amDuong: "Âm",
            description:
              "Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).",
            tichCuc:
              "Hình ảnh dao kéo (Tân) tỉa bớt cành lá cho cây (Giáp). Giúp Giáp Mộc trở nên gọn gàng, hữu dụng hơn. Mang lại danh tiếng, địa vị, sự nghiệp ổn định. Nữ mệnh có chồng khéo léo, biết cách góp ý.",
            tieuCuc:
              'Luôn cảm thấy bị gò bó, kiểm soát bởi những quy tắc nhỏ nhặt. Dễ bị cấp trên hoặc chồng "chỉnh đốn" gây khó chịu.',
          },
          {
            name: "Canh",
            thapThan: "Thiên Quan",
            nguHanh: "Kim",
            amDuong: "Dương",
            description:
              "Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).",
            tichCuc:
              "Khi Giáp Mộc cực cường và có Hỏa để chế ngự Kim, có thể mang lại quyền lực tối cao trong các môi trường khắc nghiệt. Có khả năng đảm đương trọng trách lớn.",
            tieuCuc:
              "Đây là kẻ thù nguy hiểm nhất của Giáp Mộc. Hình ảnh rìu lớn (Canh) chặt đổ cây cổ thụ. Gây ra tai họa, tai nạn, bệnh tật nặng, kiện tụng. Nữ mệnh tình duyên cực kỳ trắc trở.",
          },
          {
            name: "Quý",
            thapThan: "Chính Ấn",
            nguHanh: "Thủy",
            amDuong: "Âm",
            description:
              "Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.",
            tichCuc:
              "Hình ảnh mưa nhỏ, sương mai (Quý) tưới cho cây. Mang lại sự hỗ trợ từ mẹ, quý nhân một cách nhẹ nhàng, tinh tế. Có trí thông minh, lòng nhân ái, ham học hỏi.",
            tieuCuc:
              "Nguồn hỗ trợ này không đủ mạnh để Giáp Mộc phát triển thành cây đại thụ. Có thể chỉ có bằng cấp nhưng kiến thức không quá sâu sắc.",
          },
          {
            name: "Nhâm",
            thapThan: "Thiên Ấn",
            nguHanh: "Thủy",
            amDuong: "Dương",
            description:
              "Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.",
            tichCuc:
              "Hình ảnh sông lớn (Nhâm) bồi đắp phù sa cho cây. Mang lại nguồn hỗ trợ mạnh mẽ, kiến thức uyên bác, tư duy độc đáo. Có quý nhân quyền thế giúp đỡ.",
            tieuCuc:
              "Khi Thủy quá cường, cây sẽ bị úng rễ hoặc bị cuốn trôi. Sự giúp đỡ quá mức có thể làm hại. Dễ trở nên lười biếng, suy nghĩ viển vông.",
          },
        ],
      },
      {
        name: "Ất",
        characteristic: `Đặc tính cơ bản của Nhật Chủ Ất Mộc
Ất Mộc là hình ảnh của các loài cây thân mềm như hoa, cỏ, dây leo (Âm Mộc). Đặc tính cốt lõi là sự mềm dẻo, linh hoạt, khả năng thích ứng cao và có sức sống mãnh liệt. Người Ất Mộc không đối đầu trực diện mà biết luồn lách, nương theo hoàn cảnh để tồn tại và phát triển. Họ khéo léo, giỏi giao tiếp và có khả năng xây dựng các mối quan hệ xã hội. Để phát triển tốt nhất, Ất Mộc cần có cây lớn (Giáp Mộc) để nương tựa, ánh nắng (Bính Hỏa) và mưa (Quý Thủy).
•	Khi cân bằng:
	Đặc điểm: Họ là người vô cùng khéo léo, tinh tế và giỏi ngoại giao. Họ có khả năng thích nghi với mọi môi trường, dễ dàng kết bạn và tạo dựng mạng lưới quan hệ. Họ mềm mỏng, ôn hòa nhưng bên trong lại có một sức sống bền bỉ, kiên cường, có thể vượt qua mọi nghịch cảnh.
	Dấu hiệu nhận biết: Dáng người mềm mại, uyển chuyển. Lời nói nhẹ nhàng, dễ nghe. Giỏi lắng nghe và thấu hiểu. Có khả năng thuyết phục người khác một cách khéo léo.
•	Khi mất cân bằng (Quá Cường / Quá Nhược):
	- Quá Cường (Mộc quá vượng):
	Đặc điểm: Cỏ dại mọc um tùm, tranh giành chất dinh dưỡng. Họ trở nên hay đố kỵ, ganh ghét, có nhiều toan tính, mưu mẹo. Dễ thay đổi, lập trường không vững vàng, hay dựa dẫm và có thể trở nên phiền phức.
	Dấu hiệu nhận biết: Hay nói xấu sau lưng. Dễ thay đổi ý kiến, không đáng tin cậy. Thích dựa dẫm, phụ thuộc vào người khác.
	- Quá Nhược (Mộc bị suy):
	Đặc điểm: Hoa cỏ héo úa, thiếu sức sống. Họ thiếu tự tin, nhút nhát, dễ bị người khác chi phối, bắt nạt. Không có khả năng tự bảo vệ mình, dễ bị cuốn theo số phận, không có định hướng rõ ràng.
	Dấu hiệu nhận biết: Yếu đuối, dễ bị tổn thương. Thiếu chủ kiến, ai nói gì cũng nghe theo. Cuộc sống không ổn định, hay gặp khó khăn.
`,
        data: [
          {
            name: "Ất",
            thapThan: "Tỷ Kiên",
            nguHanh: "Mộc",
            amDuong: "Âm",
            description:
              "Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.",
            tichCuc:
              "Có nhiều bạn bè, mối quan hệ xã hội tốt. Giỏi hợp tác, làm việc nhóm.",
            tieuCuc:
              "Cạnh tranh ngầm rất gay gắt. Dễ bị bạn bè lôi kéo vào những chuyện thị phi, bè phái. Hay đố kỵ, so bì với nhau.",
          },
          {
            name: "Giáp",
            thapThan: "Kiếp Tài",
            nguHanh: "Mộc",
            amDuong: "Dương",
            description:
              "Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.",
            tichCuc:
              "Đây là sự kết hợp tốt nhất cho Ất Mộc. Hình ảnh dây leo (Ất) quấn quanh cây lớn (Giáp) để vươn lên. Có quý nhân, người có năng lực che chở, giúp đỡ để thăng tiến.",
            tieuCuc:
              "Dễ trở nên quá phụ thuộc, ỷ lại. Nếu không có Giáp Mộc, sẽ cảm thấy mất phương hướng.",
          },
          {
            name: "Đinh",
            thapThan: "Thực Thần",
            nguHanh: "Hỏa",
            amDuong: "Âm",
            description:
              "Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).",
            tichCuc:
              "Mang lại sự sáng tạo tinh tế, khả năng biểu đạt nghệ thuật. Lời nói duyên dáng, có sức thuyết phục. Có tài năng trong lĩnh vực ẩm thực, thời trang, làm đẹp.",
            tieuCuc:
              "Dễ trở nên quá đam mê hưởng thụ, thiếu ý chí phấn đấu. Sự sáng tạo có phần nhỏ bé, không tạo ra đột phá lớn.",
          },
          {
            name: "Bính",
            thapThan: "Thương Quan",
            nguHanh: "Hỏa",
            amDuong: "Dương",
            description:
              "Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).",
            tichCuc:
              "Đây là Thần quan trọng nhất của Ất Mộc. Hình ảnh hoa cỏ (Ất) hướng về mặt trời (Bính). Mang lại sự lạc quan, trí thông minh, khả năng sáng tạo và danh tiếng. Giúp Ất Mộc trở nên nổi bật và được công nhận.",
            tieuCuc:
              "Dễ trở nên quá khoe khoang, thích thể hiện. Có thể hơi phù phiếm, chỉ chú trọng đến vẻ bề ngoài.",
          },
          {
            name: "Mậu",
            thapThan: "Chính Tài",
            nguHanh: "Thổ",
            amDuong: "Dương",
            description:
              "Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.",
            tichCuc:
              "Có cơ hội tiếp xúc với những nguồn tài chính lớn, ổn định. Nam mệnh có thể lấy được vợ hiền, có gia thế tốt.",
            tieuCuc:
              "Hình ảnh hoa cỏ yếu ớt mọc trên núi cao. Kiếm tiền rất vất vả, khó khăn. Dễ bị các vấn đề tài chính làm cho mệt mỏi.",
          },
          {
            name: "Kỷ",
            thapThan: "Thiên Tài",
            nguHanh: "Thổ",
            amDuong: "Âm",
            description:
              "Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).",
            tichCuc:
              "Hình ảnh hoa cỏ mọc trên đất vườn màu mỡ. Có nhiều cơ hội kiếm tiền, kinh doanh thuận lợi. Tài lộc dồi dào.",
            tieuCuc: "Dễ trở nên quá thực dụng, chỉ quan tâm đến tiền bạc.",
          },
          {
            name: "Canh",
            thapThan: "Chính Quan",
            nguHanh: "Kim",
            amDuong: "Dương",
            description:
              "Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).",
            tichCuc:
              "Canh Ất hợp hóa Kim. Nếu Ất Mộc có gốc rễ vững, có thể mang lại danh vị, địa vị. Nữ mệnh có chồng là người có năng lực, quyền thế, vợ chồng yêu thương nhau.",
            tieuCuc:
              "Nếu Ất Mộc yếu, đây là sự kết hợp nguy hiểm. Hình ảnh rìu lớn (Canh) chặt đứt dây leo. Dễ bị cấp trên, chồng chèn ép, kiểm soát quá mức.",
          },
          {
            name: "Tân",
            thapThan: "Thiên Quan",
            nguHanh: "Kim",
            amDuong: "Âm",
            description:
              "Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).",
            tichCuc: "Rất hiếm khi tích cực, trừ khi có Hỏa mạnh để chế ngự.",
            tieuCuc:
              "Đây là kẻ thù nguy hiểm nhất của Ất Mộc. Hình ảnh dao kéo (Tân) cắt nát hoa cỏ. Gây ra tai họa, bệnh tật, thị phi, tiểu nhân hãm hại. Nữ mệnh có tình duyên cực kỳ đau khổ, dễ bị bạo hành.",
          },
          {
            name: "Nhâm",
            thapThan: "Chính Ấn",
            nguHanh: "Thủy",
            amDuong: "Dương",
            description:
              "Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.",
            tichCuc:
              "Có sự hỗ trợ mạnh mẽ từ mẹ, quý nhân. Có nền tảng học vấn tốt, kiến thức sâu rộng.",
            tieuCuc:
              "Khi Thủy quá vượng sẽ gây ra tình trạng 'Thủy phiếm Mộc' (nước cuốn trôi cây). Sự giúp đỡ quá mức thành ra làm hại. Dễ trở nên lười biếng, ỷ lại, cuộc sống trôi nổi.",
          },
          {
            name: "Quý",
            thapThan: "Thiên Ấn",
            nguHanh: "Thủy",
            amDuong: "Âm",
            description:
              "Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.",
            tichCuc:
              "Hình ảnh mưa nhỏ, sương mai (Quý) tưới cho hoa cỏ. Mang lại sự thông minh, tư duy nhạy bén. Có năng khiếu trong các lĩnh vực nghệ thuật, huyền học.",
            tieuCuc:
              "Nguồn hỗ trợ này không ổn định. Dễ 'cả thèm chóng chán' trong học tập. Suy nghĩ có phần kỳ lạ, khó hòa đồng, dễ cảm thấy cô độc.",
          },
        ],
      },
      {
        name: "Bính",
        characteristic: `Đặc tính cơ bản của Nhật Chủ Bính Hỏa
Bính Hỏa là hình ảnh của mặt trời (Dương Hỏa). Đặc tính cốt lõi là sự nhiệt tình, hào phóng, quang minh lỗi lạc và năng lượng dồi dào. Người Bính Hỏa giống như mặt trời, luôn tỏa sáng, ban phát ánh sáng và hơi ấm cho vạn vật. Họ thẳng thắn, lạc quan, thích là trung tâm của sự chú ý và có khả năng truyền cảm hứng. Họ ghét sự che lấp, đặc biệt là bởi nước lớn (Nhâm Thủy).
•	Khi cân bằng:
	Đặc điểm: Họ là người vô cùng hào phóng, cởi mở và đầy nhiệt huyết. Luôn lạc quan, nhìn thấy mặt tích cực của vấn đề và lan tỏa năng lượng đó đến mọi người. Họ thẳng thắn, chính trực, không thích mưu mẹo hay dối trá. Họ là những nhà lãnh đạo bẩm sinh, có sức ảnh hưởng lớn và được mọi người yêu quý.
	Dấu hiệu nhận biết: Luôn tươi cười, tràn đầy năng lượng. Nói to, rõ ràng, tác phong nhanh nhẹn. Thích giao du, kết bạn và là tâm điểm của các cuộc vui.
•	Khi mất cân bằng (Quá Cường / Quá Nhược):
	- Quá Cường (Hỏa quá vượng):
	Đặc điểm: Mặt trời quá gay gắt sẽ thiêu đốt vạn vật. Họ trở nên nóng nảy, thiếu kiên nhẫn, dễ nổi giận vô cớ. Tự cho mình là đúng, kiêu ngạo, không nghe lời khuyên. Hành động bộc phát, vội vàng, dễ dẫn đến sai lầm.
	Dấu hiệu nhận biết: Nóng tính, bộp chộp. Thích khoe khoang, lấn át người khác. Không chịu được sự chỉ trích, dễ gây xung đột.
	- Quá Nhược (Hỏa bị suy):
	Đặc điểm: Mặt trời bị mây đen che khuất. Họ mất đi sự nhiệt tình và lạc quan vốn có. Trở nên thiếu tự tin, do dự, đầu voi đuôi chuột. Dễ bi quan, chán nản, thiếu năng lượng để theo đuổi mục tiêu.
	Dấu hiệu nhận biết: Thiếu sức sống, hay thở dài. Khởi đầu mọi việc rất hăng hái nhưng nhanh chóng bỏ cuộc. Dễ thay đổi, không kiên định.
`,
        data: [
          {
            name: "Bính",
            thapThan: "Tỷ Kiên",
            nguHanh: "Hỏa",
            amDuong: "Dương",
            description:
              "Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.",
            tichCuc:
              "Tăng cường sự tự tin, ý chí và tinh thần độc lập. Có nhiều bạn bè cùng chí hướng, nhiệt tình giúp đỡ lẫn nhau.",
            tieuCuc:
              "Hình ảnh hai mặt trời trên trời, cạnh tranh gay gắt. Dễ xảy ra xung đột, tranh giành vị trí dẫn đầu. Không ai chịu nhường ai.",
          },
          {
            name: "Đinh",
            thapThan: "Kiếp Tài",
            nguHanh: "Hỏa",
            amDuong: "Âm",
            description:
              "Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.",
            tichCuc:
              "Giúp Bính Hỏa trở nên tinh tế, có chiều sâu hơn. Có khả năng kết hợp giữa sự quảng đại và sự tỉ mỉ.",
            tieuCuc:
              "Hình ảnh ánh nến (Đinh) tranh sáng với mặt trời (Bính). Dễ bị cạnh tranh ngầm, bị người khác cướp công. Sự giúp đỡ nhận được thường không thực chất.",
          },
          {
            name: "Mậu",
            thapThan: "Thực Thần",
            nguHanh: "Thổ",
            amDuong: "Dương",
            description:
              "Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).",
            tichCuc:
              "Mang lại sự ổn định, đôn hậu. Giúp Bính Hỏa biến sự nhiệt tình thành những kết quả thực tế, vững chắc. Có khả năng lãnh đạo và quản lý tốt.",
            tieuCuc:
              "Hình ảnh mặt trời bị núi cao che khuất. Làm giảm đi sự tỏa sáng và nhiệt huyết. Dễ trở nên lười biếng, chỉ thích an nhàn, thiếu đi chí tiến thủ.",
          },
          {
            name: "Kỷ",
            thapThan: "Thương Quan",
            nguHanh: "Thổ",
            amDuong: "Âm",
            description:
              "Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).",
            tichCuc:
              "Mang lại sự mềm mỏng, khéo léo. Có khả năng sáng tạo tinh tế.",
            tieuCuc:
              "Hình ảnh mây mù (Kỷ) che lấp mặt trời (Bính). Khiến tài năng bị che khuất, khó được công nhận. Dễ vướng vào thị phi, bị người khác nói xấu, hiểu lầm.",
          },
          {
            name: "Tân",
            thapThan: "Chính Tài",
            nguHanh: "Kim",
            amDuong: "Âm",
            description:
              "Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.",
            tichCuc:
              "Bính Tân hợp hóa Thủy. Có khả năng quản lý tài chính tốt. Nam mệnh có vợ đẹp, tài giỏi và có thể hợp tác tốt với vợ. Có thể kiếm tiền từ các tài sản có giá trị cao.",
            tieuCuc:
              "Dễ vì tiền bạc, tình cảm mà mất đi lý trí, sự quang minh của mình.",
          },
          {
            name: "Canh",
            thapThan: "Thiên Tài",
            nguHanh: "Kim",
            amDuong: "Dương",
            description:
              "Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).",
            tichCuc:
              "Hình ảnh mặt trời luyện kim loại thô. Có khả năng kiếm những khoản tiền lớn, làm chủ các dự án lớn, đặc biệt trong lĩnh vực công nghiệp, tài chính.",
            tieuCuc:
              "Kiếm tiền rất vất vả, đòi hỏi phải đầu tư nhiều công sức. Dễ gặp cạnh tranh lớn về tài chính.",
          },
          {
            name: "Quý",
            thapThan: "Chính Quan",
            nguHanh: "Thủy",
            amDuong: "Âm",
            description:
              "Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).",
            tichCuc:
              "Khi Bính Hỏa cường, Quý Thủy giúp điều hòa, mang lại danh tiếng và địa vị. Giúp Bính Hỏa biết kiềm chế, trở nên có chiều sâu hơn.",
            tieuCuc:
              "Hình ảnh mưa, sương (Quý) che lấp mặt trời. Gây ra phiền phức, khó chịu từ cấp trên. Dễ bị mất danh dự vì những chuyện nhỏ nhặt. Nữ mệnh có chồng hay γèm pha, kiểm soát.",
          },
          {
            name: "Nhâm",
            thapThan: "Thiên Quan",
            nguHanh: "Thủy",
            amDuong: "Dương",
            description:
              "Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).",
            tichCuc:
              "Khi Bính Hỏa cực cường có Mộc tương sinh, có thể tạo nên cách cục 'Thủy quang tương chiếu', mang lại quyền lực và danh tiếng vang dội. Có khả năng đảm đương trọng trách lớn.",
            tieuCuc:
              "Đây là kẻ thù lớn nhất của Bính Hỏa. Hình ảnh biển cả (Nhâm) nhấn chìm mặt trời. Gây ra tai họa, bệnh tật hiểm nghèo, kiện tụng, tù tội. Nữ mệnh có tình duyên cực kỳ trắc trở.",
          },
          {
            name: "Ất",
            thapThan: "Chính Ấn",
            nguHanh: "Mộc",
            amDuong: "Âm",
            description:
              "Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.",
            tichCuc:
              "Hình ảnh cỏ cây, hoa lá hướng về mặt trời. Mang lại sự hỗ trợ từ mẹ, quý nhân một cách tận tình. Có lòng nhân hậu, ham học hỏi kiến thức truyền thống.",
            tieuCuc:
              "Sự hỗ trợ này có phần yếu ớt, không đủ để Bính Hỏa tỏa sáng rực rỡ. Dễ trở nên hơi ỷ lại, thiếu đi sự quyết đoán.",
          },
          {
            name: "Giáp",
            thapThan: "Thiên Ấn",
            nguHanh: "Mộc",
            amDuong: "Dương",
            description:
              "Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.",
            tichCuc:
              "Đây là nguồn năng lượng tốt nhất cho Bính Hỏa. Hình ảnh cây đại thụ (Giáp) làm nhiên liệu cho mặt trời. Mang lại sự hỗ trợ mạnh mẽ, quý nhân quyền thế. Có trí tuệ uyên bác, tư duy đột phá, giúp Bính Hỏa tỏa sáng tột độ.",
            tieuCuc:
              "Nếu Mộc quá vượng có thể làm Hỏa bị nghẹt. Dễ trở nên quá tự tin vào kiến thức của mình mà thành ra kiêu ngạo.",
          },
        ],
      },
      {
        name: "Đinh",
        characteristic: `Đặc tính cơ bản của Nhật Chủ Đinh Hỏa
Đinh Hỏa là hình ảnh của ngọn lửa từ cây nến, ánh sao, hoặc lửa trong lò rèn (Âm Hỏa). Đặc tính cốt lõi là sự ấm áp, soi sáng, tinh tế và có khả năng soi rọi vào chi tiết. Khác với Bính Hỏa tỏa sáng ra bên ngoài, Đinh Hỏa cháy âm ỉ, hướng vào bên trong, mang nội tâm sâu sắc, suy nghĩ chu đáo. Họ có khả năng dẫn đường, truyền đạt kiến thức và "rèn giũa" người khác. Để tồn tại, Đinh Hỏa cần nhiên liệu (Mộc) và sợ nhất bị dập tắt bởi nước (Thủy).
•	Khi cân bằng:
	Đặc điểm: Họ là người vô cùng tinh tế, nhạy bén và có óc quan sát sắc sảo. Họ ấm áp, lịch sự, biết cách quan tâm đến người khác một cách thầm lặng. Họ là những nhà tư tưởng, người thầy, người cố vấn xuất sắc, có khả năng nhìn thấu bản chất vấn đề và đưa ra những lời khuyên giá trị.
	Dấu hiệu nhận biết: Ánh mắt có thần, sâu sắc. Thái độ ôn hòa, từ tốn. Có khả năng tập trung cao độ và giỏi trong các công việc đòi hỏi sự tỉ mỉ, kiên nhẫn.
•	Khi mất cân bằng (Quá Cường / Quá Nhược):
	- Quá Cường (Hỏa quá vượng):
	Đặc điểm: Ngọn lửa quá lớn sẽ trở nên khó kiểm soát. Họ trở nên nóng vội, thiếu kiên nhẫn, hay lo âu, suy nghĩ tiêu cực. Nội tâm đầy mâu thuẫn, dễ nghi ngờ và hay để bụng, thù dai.
	Dấu hiệu nhận biết: Dễ bị stress, căng thẳng thần kinh. Hay suy diễn, có thể hơi cực đoan trong suy nghĩ. Tâm trạng thất thường.
	- Quá Nhược (Hỏa bị suy):
	Đặc điểm: Ngọn nến leo lét trước gió. Họ thiếu tự tin, yếu đuối, dễ bị bi quan và chán nản. Thiếu năng lượng, khó theo đuổi mục tiêu đến cùng. Dễ bị người khác tác động, không có chính kiến rõ ràng.
	Dấu hiệu nhận biết: Hay lo sợ, thiếu cảm giác an toàn. Dễ mệt mỏi, thiếu sức sống. Hành động do dự, không dứt khoát.
`,
        data: [
          {
            name: "Đinh",
            thapThan: "Tỷ Kiên",
            nguHanh: "Hỏa",
            amDuong: "Âm",
            description:
              "Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.",
            tichCuc:
              "'Nhiều ngọn nến sẽ tạo thành đám cháy lớn'. Tăng cường sức mạnh, sự tự tin, có nhiều bạn bè, đồng nghiệp cùng chung sức, hỗ trợ nhau để tạo ra kết quả lớn hơn.",
            tieuCuc:
              "Dễ tụ tập thành bè phái, gây ra sự đố kỵ, cạnh tranh ngầm. Có thể trở nên quá nóng nảy khi có nhiều người kích động.",
          },
          {
            name: "Bính",
            thapThan: "Kiếp Tài",
            nguHanh: "Hỏa",
            amDuong: "Dương",
            description:
              "Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.",
            tichCuc:
              "Có thể nhận được sự giúp đỡ từ những người có quyền thế, có sức ảnh hưởng lớn. Giúp Đinh Hỏa trở nên hướng ngoại, quảng giao hơn.",
            tieuCuc:
              "Hình ảnh mặt trời (Bính) làm lu mờ ánh nến (Đinh). Đây là sự cạnh tranh không cân sức. Dễ bị người khác cướp công, chiếm đoạt thành quả. Tài năng và công sức không được công nhận.",
          },
          {
            name: "Kỷ",
            thapThan: "Thực Thần",
            nguHanh: "Thổ",
            amDuong: "Âm",
            description:
              "Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).",
            tichCuc:
              "Mang lại những ý tưởng, tham vọng lớn. Có khả năng sáng tạo trong các lĩnh vực lớn như kiến trúc, quy hoạch.",
            tieuCuc:
              "Hình ảnh ngọn nến nhỏ soi sáng cả ngọn núi lớn, là sự tiêu hao quá sức. Dễ có những ý tưởng viển vông, khó thực hiện. Dễ bị kiệt sức vì tham vọng.",
          },
          {
            name: "Mậu",
            thapThan: "Thương Quan",
            nguHanh: "Thổ",
            amDuong: "Dương",
            description:
              "Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).",
            tichCuc:
              "Mang lại sự mềm mỏng, nhân hậu và khả năng sáng tạo tinh tế. Giỏi trong các công việc thủ công, nghệ thuật.",
            tieuCuc:
              "Hình ảnh tro tàn (Kỷ) làm lửa (Đinh) yếu đi. Làm tiêu hao năng lượng, khiến Đinh Hỏa mất đi sự sắc bén. Dễ trở nên lười biếng, chỉ thích an nhàn.",
          },
          {
            name: "Canh",
            thapThan: "Chính Tài",
            nguHanh: "Kim",
            amDuong: "Dương",
            description:
              "Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.",
            tichCuc:
              "Đây là mục tiêu ưa thích nhất của Đinh Hỏa (lửa rèn kim loại thô). Có khả năng kiếm tiền từ chính tài năng, chuyên môn của mình. Biến những thứ thô sơ thành sản phẩm có giá trị.",
            tieuCuc:
              "Kiếm tiền rất vất vả, phải lao tâm khổ tứ. Nếu Hỏa yếu không đủ sức rèn Kim, sẽ bị công việc và tiền bạc làm cho kiệt sức.",
          },
          {
            name: "Tân",
            thapThan: "Thiên Tài",
            nguHanh: "Kim",
            amDuong: "Âm",
            description:
              "Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).",
            tichCuc:
              "Có khả năng kiếm tiền từ các lĩnh vực đòi hỏi sự tinh xảo, làm đẹp, trang sức. Có gu thẩm mỹ tốt trong việc đầu tư.",
            tieuCuc:
              "Hình ảnh lửa nến (Đinh) khó làm tan chảy trang sức (Tân). Kiếm tiền khó khăn, tài lộc không lớn.",
          },
          {
            name: "Nhâm",
            thapThan: "Chính Quan",
            nguHanh: "Thủy",
            amDuong: "Dương",
            description:
              "Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).",
            tichCuc:
              "Đinh Nhâm hợp hóa Mộc. Nếu trong mệnh có Mộc, sự kết hợp này mang lại danh vị và quyền lực cao quý. Nữ mệnh có chồng tài giỏi, có địa vị, vợ chồng yêu thương nhau.",
            tieuCuc:
              "Nếu không có Mộc, đây là sự kết hợp nguy hiểm. Hình ảnh sông lớn dập tắt ngọn nến. Gây ra áp lực lớn, rủi ro trong công việc. Dễ bị cấp trên chèn ép.",
          },
          {
            name: "Quý",
            thapThan: "Thiên Quan",
            nguHanh: "Thủy",
            amDuong: "Âm",
            description:
              "Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).",
            tichCuc:
              "Rất hiếm khi tích cực, trừ khi Đinh Hỏa cực cường có Mộc và Thổ mạnh để chống đỡ.",
            tieuCuc:
              "Đây là kẻ thù nguy hiểm nhất của Đinh Hỏa. Hình ảnh mưa dông (Quý) dập tắt ngọn nến. Gây ra tai họa, bệnh tật, thị phi, tiểu nhân hãm hại. Nữ mệnh có tình duyên cực kỳ đau khổ.",
          },
          {
            name: "Giáp",
            thapThan: "Chính Ấn",
            nguHanh: "Mộc",
            amDuong: "Dương",
            description:
              "Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.",
            tichCuc:
              "Đây là Thần quan trọng nhất của Đinh Hỏa. Hình ảnh cây gỗ lớn (Giáp) làm nhiên liệu cho ngọn lửa (Đinh). Mang lại nguồn năng lượng dồi dào, bền bỉ. Có quý nhân quyền thế giúp đỡ, học vấn uyên bác, trí tuệ sâu sắc.",
            tieuCuc:
              "Nếu Mộc quá cường mà Hỏa quá yếu, sẽ gây ra tình trạng 'Mộc đa Hỏa tức' (củi nhiều lửa tắt). Dễ trở nên quá ỷ lại, thiếu nỗ lực cá nhân.",
          },
          {
            name: "Ất",
            thapThan: "Thiên Ấn",
            nguHanh: "Mộc",
            amDuong: "Âm",
            description:
              "Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.",
            tichCuc:
              "Mang lại sự khéo léo, tư duy nhạy bén và khả năng học hỏi các lĩnh vực độc đáo, nghệ thuật.",
            tieuCuc:
              "Hình ảnh cỏ cây, cành lá nhỏ (Ất) làm nhiên liệu. Lửa cháy bùng lên nhanh nhưng cũng chóng tàn và tạo ra nhiều khói. Sự hỗ trợ nhận được không bền vững, kiến thức học được không sâu.",
          },
        ],
      },
      {
        name: "Mậu",
        characteristic: `Đặc tính cơ bản của Nhật Chủ Mậu Thổ
Mậu Thổ là hình ảnh của ngọn núi cao, tảng đá lớn, bức tường thành vững chãi (Dương Thổ). Đặc tính cốt lõi là sự vững chãi, đáng tin cậy, trọng chữ tín và có sức chịu đựng cao. Người Mậu Thổ thường trầm ổn, không dễ thay đổi và là điểm tựa cho người khác.
•	Khi cân bằng:
	Đặc điểm: Họ là người chính trực, trung hậu, và cực kỳ đáng tin cậy. Một khi đã hứa, họ sẽ làm bằng được. Họ có tầm nhìn xa, thái độ điềm tĩnh và khả năng bao dung lớn như núi cao. Họ là những người lãnh đạo hoặc người trụ cột trầm lặng, mang lại cảm giác an toàn và ổn định cho một tập thể.
	Dấu hiệu nhận biết: Thái độ vững vàng, không dễ bị lung lay. Lời nói và hành động nhất quán. Luôn mang lại cảm giác an toàn, là người mà người khác tìm đến khi gặp khó khăn.
•	Khi mất cân bằng (Quá Cường / Quá Nhược):
	- Quá Cường (Thổ quá vượng):
	Đặc điểm: Ngọn núi quá lớn sẽ trở nên trơ trọi và cách biệt. Họ trở nên cực kỳ cố chấp, bảo thủ, không chịu tiếp thu ý kiến của người khác. Phản ứng chậm chạp, thiếu linh hoạt, đôi khi lười biếng và không muốn thay đổi. Có xu hướng tự cho mình là trung tâm, thiếu sự tinh tế trong giao tiếp.
	Dấu hiệu nhận biết: Sự bướng bỉnh đến mức cực đoan, không chịu thay đổi dù biết là sai. Thiếu linh hoạt trong xử lý tình huống, dễ bị cô lập.
	- Quá Nhược (Thổ bị suy):
	Đặc điểm: Bề ngoài có vẻ vững chắc nhưng bên trong lại trống rỗng, thiếu tự tin. Họ có lòng tự trọng cao nhưng lại không có đủ năng lực để theo đuổi, dẫn đến tự ti. Dễ bị cô lập, không có sự hỗ trợ, cảm thấy đơn độc trong các quyết định của mình.
	Dấu hiệu nhận biết: Hay do dự, lo được lo mất. Bề ngoài tỏ ra mạnh mẽ nhưng thực chất dễ bị tổn thương và thiếu cảm giác an toàn.
`,
        data: [
          {
            name: "Mậu",
            thapThan: "Tỷ Kiên",
            nguHanh: "Thổ",
            amDuong: "Dương",
            description:
              "Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.",
            tichCuc:
              "Tăng cường sự tự chủ, lập trường vững vàng và khả năng chịu đựng áp lực. Rất coi trọng chữ tín, là người bạn đồng hành đáng tin cậy, sẵn sàng gánh vác trách nhiệm.",
            tieuCuc:
              "Khi quá cường sẽ trở nên cực kỳ cố chấp, độc đoán, không ai có thể thay đổi được suy nghĩ của họ. Thiếu linh hoạt, dễ bỏ lỡ cơ hội.",
          },
          {
            name: "Kỷ",
            thapThan: "Kiếp Tài",
            nguHanh: "Thổ",
            amDuong: "Âm",
            description:
              "Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.",
            tichCuc:
              "Giúp Mậu Thổ trở nên mềm mỏng, khéo léo và tinh tế hơn. Có khả năng kết nối với nhiều người, giỏi hợp tác trong các hội nhóm nhỏ.",
            tieuCuc:
              "Dễ bị bạn bè hoặc người thân lợi dụng, lôi kéo vào những chuyện không đâu. Có thể bị cạnh tranh ngầm mà không hay biết, gây hao tài tốn của.",
          },
          {
            name: "Canh",
            thapThan: "Thực Thần",
            nguHanh: "Kim",
            amDuong: "Dương",
            description:
              "Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).",
            tichCuc:
              "Hành động mạnh mẽ, quyết đoán. Có tài năng trong các lĩnh vực kỹ thuật, sản xuất. Tư duy khoáng đạt, thẳng thắn, không thích vòng vo. Mang lại sự giàu có, sung túc.",
            tieuCuc:
              "Dễ trở nên lười biếng, chỉ thích hưởng thụ. Lời nói quá thẳng, đôi khi thiếu suy nghĩ. Có thể hành động bộc phát, thiếu kế hoạch dài hạn.",
          },
          {
            name: "Tân",
            thapThan: "Thương Quan",
            nguHanh: "Kim",
            amDuong: "Âm",
            description:
              "Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).",
            tichCuc:
              "Có tài năng nghệ thuật, văn chương, gu thẩm mỹ tinh tế. Lời nói sắc sảo, có sức thuyết phục cao. Có khả năng kiếm tiền từ tài năng đặc biệt của mình.",
            tieuCuc:
              "Kiêu ngạo, thích thể hiện, hay xem thường người khác. Lời nói sắc bén dễ làm tổn thương người khác. Dễ xung đột với cấp trên, cơ quan quyền lực.",
          },
          {
            name: "Quý",
            thapThan: "Chính Tài",
            nguHanh: "Thủy",
            amDuong: "Âm",
            description:
              "Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.",
            tichCuc:
              "Mậu và Quý là cặp trời sinh (Mậu Quý hợp Hỏa), mang lại sự may mắn về tiền bạc và tình duyên. Họ là người cẩn thận, biết cách quản lý tài chính và có một cuộc sống ổn định. Nam mệnh có vợ hiền, là trợ thủ đắc lực.",
            tieuCuc:
              "Đôi khi quá cẩn thận, tính toán chi li thành ra bỏ lỡ cơ hội lớn. Vì quá tập trung vào công việc và tiền bạc mà trở nên khô khan, thiếu lãng mạn. Lo lắng quá nhiều về tài chính.",
          },
          {
            name: "Nhâm",
            thapThan: "Thiên Tài",
            nguHanh: "Thủy",
            amDuong: "Dương",
            description:
              "Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).",
            tichCuc:
              "Có khả năng kiếm những khoản tiền khổng lồ, giống như ngọn núi ngăn sông lớn. Có khí phách, hào phóng, giỏi kinh doanh và có tầm nhìn xa. Thích hợp làm những việc lớn",
            tieuCuc:
              "Tài chính cực kỳ bấp bênh, có thể phất lên rất nhanh và phá sản cũng rất nhanh. Tiêu tiền như nước, khó kiểm soát chi tiêu. Nam mệnh đào hoa, dễ có nhiều mối quan hệ phức tạp.",
          },
          {
            name: "Giáp",
            thapThan: "Thiên Quan",
            nguHanh: "Mộc",
            amDuong: "Dương",
            description:
              "Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh (quân đội, cảnh sát), người tình (đối với nữ).",
            tichCuc:
              "Khi Mậu Thổ đủ mạnh, Giáp Mộc mang lại quyền lực tối cao, khả năng lãnh đạo phi thường. Họ dũng cảm, quyết đoán, có thể đảm đương những trọng trách lớn lao, thành công trong các lĩnh vực như quân sự, chính trị.",
            tieuCuc:
              "Khi Mậu Thổ yếu, đây là áp lực khủng khiếp. Gặp nhiều khó khăn, thử thách, tiểu nhân hãm hại, sức khỏe suy kiệt. Nữ mệnh dễ có tình duyên trắc trở, vất vả.",
          },
          {
            name: "Ất",
            thapThan: "Chính Quan",
            nguHanh: "Mộc",
            amDuong: "Âm",
            description:
              "Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).",
            tichCuc:
              "Giúp Mậu Thổ trở nên có danh tiếng và địa vị. Họ là người có tinh thần trách nhiệm, tuân thủ kỷ luật, được cấp trên tin tưởng. Nữ mệnh có chồng là người tài giỏi, nho nhã.",
            tieuCuc:
              "Dễ bị gò bó, mất tự do bởi các quy tắc. Lo sợ mất danh tiếng, không dám mạo hiểm. Dễ bị căng thẳng vì áp lực từ công việc.",
          },
          {
            name: "Bính",
            thapThan: "Thiên Ấn",
            nguHanh: "Hỏa",
            amDuong: "Dương",
            description:
              "Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.",
            tichCuc:
              "Mang lại danh tiếng và sự công nhận rộng rãi. Có trực giác cực tốt, tư duy đột phá và khả năng học hỏi các lĩnh vực độc đáo, huyền học. Được quý nhân quyền thế giúp đỡ.",
            tieuCuc:
              'Dễ "cả thèm chóng chán" trong học tập, hứng thú nhất thời. Tính cách thất thường, khó đoán. Dễ cảm thấy cô độc, không được thấu hiểu.',
          },
          {
            name: "Đinh",
            thapThan: "Chính Ấn",
            nguHanh: "Hỏa",
            amDuong: "Âm",
            description:
              "Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.",
            tichCuc:
              "Mang lại tư duy sâu sắc, sự thông thái và khả năng học hỏi bền bỉ. Họ có kiến thức vững chắc, được mẹ hoặc quý nhân hết lòng che chở, giúp đỡ.",
            tieuCuc:
              "Dễ trở nên quá dựa dẫm, thiếu tính độc lập. Đôi khi bảo thủ, chỉ tin vào những gì mình đã học mà thiếu đi sự sáng tạo.",
          },
        ],
      },
      {
        name: "Kỷ",
        characteristic: `Đặc tính cơ bản của Nhật Chủ Kỷ Thổ
Kỷ Thổ là hình ảnh của đất vườn, đất phù sa (Âm Thổ), bản chất là nuôi dưỡng, bao dung và tích trữ. Người Kỷ Thổ có nội tâm phức tạp, suy nghĩ chu đáo, giỏi trong việc vun trồng và phát triển một cách thầm lặng.
  •	Khi cân bằng:
    Đặc điểm: Họ là người ôn hòa, mềm mỏng, có lòng trắc ẩn và tinh thần trách nhiệm cao. Giống như mảnh đất màu mỡ, họ là nền tảng vững chắc, luôn sẵn sàng hỗ trợ, chăm sóc và mang lại giá trị cho những người xung quanh. Họ có khả năng lập kế hoạch, sắp xếp mọi thứ ngăn nắp, giỏi quản lý và có uy tín một cách tự nhiên.
    Dấu hiệu nhận biết: Thái độ điềm tĩnh, đáng tin cậy. Khả năng lắng nghe và thấu hiểu sâu sắc. Hành động có tính xây dựng, luôn hướng tới sự ổn định và lợi ích lâu dài.
  •	Khi mất cân bằng (Quá Cường / Quá Nhược):
    - Quá Cường (Thổ quá vượng):
    Đặc điểm: Đất quá nhiều sẽ trở nên đặc quánh, gây trì trệ. Họ trở nên cố chấp, bảo thủ, khó tiếp thu cái mới. Suy nghĩ nhiều, lo nghĩ vẩn vơ, dễ bị sa đà vào những chi tiết vụn vặt. Sự bao bọc trở thành kiểm soát, khiến người khác ngột ngạt. Dễ bị nghi ngờ, thiếu sự phóng khoáng.
    Dấu hiệu nhận biết: Cứng đầu, bướng bỉnh, khư khư giữ ý kiến của mình. Hay lo âu, tâm trạng nặng nề, thiếu linh hoạt.
    - Quá Nhược (Thổ bị suy):
    Đặc điểm: Đất đai cằn cỗi, thiếu sức sống. Họ thiếu tự tin, lập trường không vững, dễ bị người khác tác động, lôi kéo. Hay do dự, thiếu quyết đoán, không dám chịu trách nhiệm. Cảm giác an toàn thấp, dễ bi quan và hay có cảm giác bị bỏ rơi.
    Dấu hiệu nhận biết: Thiếu chủ kiến, dễ phụ thuộc vào người khác. Hay tự ti, nhu nhược, dễ bỏ cuộc khi gặp khó khăn.
`,
        data: [
          {
            name: "Kỷ",
            thapThan: "Tỷ Kiên",
            nguHanh: "Thổ",
            amDuong: "Âm",
            description:
              "Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.",
            tichCuc:
              "Tăng cường sự tự tin, tính độc lập. Rất bao dung, giỏi lập kế hoạch và sắp xếp công việc một cách logic, có đầu có cuối. Là người bạn đáng tin cậy.",
            tieuCuc:
              "Khi quá cường dễ trở nên cố chấp, tự cho mình là đúng. Hay lo nghĩ những chuyện nhỏ nhặt, bao bọc người khác quá mức cần thiết.",
          },
          {
            name: "Mậu",
            thapThan: "Kiếp Tài",
            nguHanh: "Thổ",
            amDuong: "Dương",
            description:
              "Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; cũng là sự cạnh tranh, lòng tự tôn.",
            tichCuc:
              "Mang lại sự mạnh mẽ, quyết đoán và tầm nhìn lớn cho Kỷ Thổ. Giúp họ trở nên phóng khoáng, quảng giao hơn. Có chí tiến thủ, không ngại cạnh tranh.",
            tieuCuc:
              "Có xu hướng lấn át, áp đặt người khác. Tính chiếm hữu cao, dễ gây ra tranh đoạt (tiền bạc, tình cảm). Đôi khi hành động liều lĩnh, thiếu suy xét kỹ càng.",
          },
          {
            name: "Tân",
            thapThan: "Thực Thần",
            nguHanh: "Kim",
            amDuong: "Âm",
            description:
              "Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).",
            tichCuc:
              "Tinh tế, có năng khiếu nghệ thuật và gu thẩm mỹ cao. Lời nói nhẹ nhàng, duyên dáng. Tư duy sắc sảo, thích tìm tòi, khám phá. Tận hưởng cuộc sống một cách tao nhã.",
            tieuCuc:
              "Cầu kỳ, khó tính, đôi khi quá kén chọn. Dễ trở nên lười biếng, chỉ thích hưởng thụ mà không muốn làm việc vất vả.",
          },
          {
            name: "Canh",
            thapThan: "Thương Quan",
            nguHanh: "Kim",
            amDuong: "Dương",
            description:
              "Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).",
            tichCuc:
              "Vô cùng thông minh, sắc bén, có khả năng nhìn thấu vấn đề. Dám nghĩ dám làm, có tài năng cải cách, sáng tạo đột phá. Phản ứng nhanh nhạy.",
            tieuCuc:
              "Kiêu ngạo, thích thể hiện, dễ xem thường người khác. Lời nói sắc bén có thể làm tổn thương người khác. Không thích bị gò bó, dễ chống đối cấp trên và quy tắc.",
          },
          {
            name: "Nhâm",
            thapThan: "Chính Tài",
            nguHanh: "Thủy",
            amDuong: "Dương",
            description:
              "Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.",
            tichCuc:
              "Mang lại cho Kỷ Thổ cơ hội tài chính lớn và ổn định. Người có Nhâm Tài thường chăm chỉ, có kế hoạch tài chính rõ ràng, biết cách tích lũy. Nam mệnh có vợ tài giỏi, đảm đang.",
            tieuCuc:
              "Dễ trở nên quá coi trọng tiền bạc, keo kiệt, bủn xỉn. Đôi khi quá thực dụng, thiếu lãng mạn. Lo lắng quá nhiều về tài chính.",
          },
          {
            name: "Quý",
            thapThan: "Thiên Tài",
            nguHanh: "Thủy",
            amDuong: "Âm",
            description:
              "Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).",
            tichCuc:
              "Mang lại sự khéo léo, linh hoạt trong việc kiếm tiền. Có khả năng kinh doanh, đầu tư, nhìn ra những cơ hội mà người khác không thấy. Hào phóng, giỏi xã giao.",
            tieuCuc:
              "Tài chính bấp bênh, lúc có lúc không. Dễ chi tiêu hoang phí, không biết giữ tiền. Nam mệnh dễ có nhiều mối quan hệ ngoài luồng.",
          },
          {
            name: "Giáp",
            thapThan: "Chính Quan",
            nguHanh: "Mộc",
            amDuong: "Dương",
            description:
              "Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).",
            tichCuc:
              "Mang lại sự chính trực, tinh thần trách nhiệm và khả năng lãnh đạo. Có công danh, địa vị trong xã hội, được mọi người tôn trọng. Nữ mệnh có chồng tốt, là người có năng lực.",
            tieuCuc:
              "Khi quá cường dễ trở nên cứng nhắc, bảo thủ, quá tuân thủ quy tắc một cách máy móc. Gặp nhiều áp lực, căng thẳng trong công việc.",
          },
          {
            name: "Ất",
            thapThan: "Thiên Quan",
            nguHanh: "Mộc",
            amDuong: "Âm",
            description:
              "Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh (quân đội, cảnh sát), người tình (đối với nữ).",
            tichCuc:
              "Khi được chế hóa, mang lại sự nhanh nhạy, quyết đoán phi thường. Có khả năng giải quyết các vấn đề khó khăn, phức tạp. Có uy quyền và khả năng xử lý khủng hoảng.",
            tieuCuc:
              "Gặp nhiều áp lực, thị phi, tiểu nhân hãm hại. Sức khỏe dễ bị ảnh hưởng, dễ gặp tai nạn. Nữ mệnh dễ lận đận trong chuyện tình cảm, gặp phải người không phù hợp.",
          },
          {
            name: "Bính",
            thapThan: "Chính Ấn",
            nguHanh: "Hỏa",
            amDuong: "Dương",
            description:
              "Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.",
            tichCuc:
              "Mang lại sự ấm áp, lạc quan và lòng nhân từ. Thông minh, ham học hỏi, có kiến thức sâu rộng. Luôn có quý nhân giúp đỡ, được cấp trên nâng đỡ.",
            tieuCuc:
              "Dễ trở nên ỷ lại, thiếu tính độc lập. Đôi khi lý thuyết suông, thiếu tính thực tế. Suy nghĩ quá nhiều mà không hành động.",
          },
          {
            name: "Đinh",
            thapThan: "Thiên Ấn",
            nguHanh: "Hỏa",
            amDuong: "Âm",
            description:
              "Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.",
            tichCuc:
              "Có trực giác vô cùng nhạy bén, khả năng cảm nhận tâm linh cao. Có tài năng đặc biệt trong các lĩnh vực độc đáo, huyền bí, nghệ thuật. Tư duy khác biệt, sâu sắc.",
            tieuCuc:
              "Tính cách kỳ lạ, khó hiểu, dễ bị cô lập. Suy nghĩ tiêu cực, hay đa nghi. Mối quan hệ với mẹ không được tốt hoặc mẹ vất vả.",
          },
        ],
      },
      {
        name: "Canh",
        characteristic: `Đặc tính cơ bản của Nhật Chủ Canh Kim
Canh Kim là hình ảnh của kim loại thô, quặng mỏ, hoặc vũ khí như gươm, đao (Dương Kim). Đặc tính cốt lõi là sự cương trực, nghĩa khí, quyết đoán và mạnh mẽ. Người Canh Kim có tinh thần của một chiến binh, trọng tình nghĩa, sẵn sàng bảo vệ bạn bè và lẽ phải. Để trở nên hữu dụng, Canh Kim cần được lửa (Hỏa) tôi luyện.
•	Khi cân bằng (được tôi luyện và có môi trường thể hiện):
	Đặc điểm: Họ là người vô cùng nghĩa khí, dũng cảm và quyết đoán. Một khi đã đặt ra mục tiêu, họ sẽ hành động nhanh chóng và mạnh mẽ để đạt được. Họ là người bạn, người đồng đội trung thành, đáng tin cậy, luôn đứng ra gánh vác trách nhiệm và bảo vệ kẻ yếu.
	Dấu hiệu nhận biết: Phong thái dứt khoát, mạnh mẽ. Lời nói thẳng thắn, không vòng vo. Luôn thể hiện tinh thần trượng nghĩa, sẵn sàng giúp đỡ người khác.
•	Khi mất cân bằng (Quá Cường / Quá Nhược):
	- Quá Cường (Kim quá vượng, không được tôi luyện):
	Đặc điểm: Kim loại thô không được rèn giũa sẽ trở nên vô dụng và phá phách. Họ trở nên khô khan, cứng nhắc, hiếu thắng và thích dùng bạo lực để giải quyết vấn đề. Lời nói và hành động thiếu suy nghĩ, sắc bén như dao, dễ gây tổn thương cho người khác.
	Dấu hiệu nhận biết: Nóng nảy, cố chấp. Hành động liều lĩnh, thiếu sự tinh tế. Dễ gây gổ và có xu hướng áp đặt người khác.
	- Quá Nhược (Kim bị suy):
	Đặc điểm: Kim loại yếu ớt, dễ bị bẻ gãy. Họ thiếu quyết đoán, do dự, không dám đối mặt với khó khăn. Dù có lòng nghĩa khí nhưng không đủ sức mạnh để hành động. Dễ bị khuất phục, không có khả năng bảo vệ bản thân hay người khác.
	Dấu hiệu nhận biết: Thiếu tự tin, hay do dự. Dễ bị bắt nạt hoặc bị lấn át. Thiếu đi sự mạnh mẽ, dứt khoát vốn có của Canh Kim.
`,
        data: [
          {
            name: "Canh",
            thapThan: "Tỷ Kiên",
            nguHanh: "Kim",
            amDuong: "Dương",
            description:
              "Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.",
            tichCuc:
              "Tăng cường ý chí, sự tự chủ và tinh thần đồng đội. Có nhiều bạn bè trung thành, cùng nhau kề vai sát cánh vượt qua khó khăn.",
            tieuCuc:
              "Khi quá cường sẽ trở nên cực kỳ bướng bỉnh, hiếu chiến. Dễ xảy ra xung đột, tranh chấp với bạn bè vì quá thẳng tính và thiếu linh hoạt.",
          },
          {
            name: "Tân",
            thapThan: "Kiếp Tài",
            nguHanh: "Kim",
            amDuong: "Âm",
            description:
              "Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.",
            tichCuc:
              "Giúp Canh Kim trở nên tinh tế, khéo léo và sắc sảo hơn trong lời nói. Có khả năng kết hợp giữa sức mạnh và sự tinh tế để đạt mục tiêu.",
            tieuCuc:
              "Cạnh tranh cực kỳ gay gắt. Dễ bị bạn bè hoặc người thân phản bội, đâm sau lưng. Lòng tự tôn quá cao, dễ tự ái và gây ra mâu thuẫn.",
          },
          {
            name: "Nhâm",
            thapThan: "Thực Thần",
            nguHanh: "Thủy",
            amDuong: "Dương",
            description:
              "Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).",
            tichCuc:
              "Đây là hình ảnh 'Kim bạch thủy thanh' (Kim trắng được nước trong rửa sạch), mang lại sự thông minh, tài hoa và khả năng biểu đạt xuất chúng. Có tài năng lãnh đạo và sáng tạo lớn.",
            tieuCuc:
              "Dễ trở nên quá tự do, phóng túng. Có thể vì hưởng thụ mà trở nên lười biếng. Cần có định hướng rõ ràng để không lãng phí tài năng.",
          },
          {
            name: "Quý",
            thapThan: "Thương Quan",
            nguHanh: "Thủy",
            amDuong: "Âm",
            description:
              "Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).",
            tichCuc:
              "Mang lại sự sắc bén trong tư duy, khả năng phản biện và phân tích vấn đề sâu sắc. Có tài năng đặc biệt trong các lĩnh vực kỹ thuật, công nghệ cao.",
            tieuCuc:
              "Rất kiêu ngạo, hay chỉ trích và dễ xem thường người khác. Dễ xung đột với cấp trên và các quy tắc xã hội. Lời nói lạnh lùng có thể làm tổn thương người khác.",
          },
          {
            name: "Ất",
            thapThan: "Chính Tài",
            nguHanh: "Mộc",
            amDuong: "Âm",
            description:
              "Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.",
            tichCuc:
              "Canh và Ất là cặp hợp hóa Kim, mang lại sự may mắn về tài lộc và tình duyên. Giúp Canh Kim trở nên mềm mỏng, tình cảm hơn. Nam mệnh có vợ hiền, khéo léo và rất yêu thương chồng.",
            tieuCuc:
              "Dễ trở nên quá coi trọng tiền bạc. Có thể vì tình cảm mà trở nên thiếu quyết đoán, mất đi sự mạnh mẽ vốn có.",
          },
          {
            name: "Giáp",
            thapThan: "Thiên Tài",
            nguHanh: "Mộc",
            amDuong: "Dương",
            description:
              "Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).",
            tichCuc:
              "Đây là mục tiêu ưa thích nhất của Canh Kim (dùng rìu chặt cây lớn). Mang lại cơ hội kiếm những khoản tiền lớn, tham gia vào các dự án lớn. Rất quyết đoán và mạnh mẽ trong việc theo đuổi tài lộc.",
            tieuCuc:
              "Kiếm tiền rất vất vả, phải cạnh tranh và nỗ lực rất nhiều. Dễ bị các vấn đề về xương khớp, gân cốt do làm việc quá sức.",
          },
          {
            name: "Đinh",
            thapThan: "Chính Quan",
            nguHanh: "Hỏa",
            amDuong: "Âm",
            description:
              "Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).",
            tichCuc:
              "Đây là Thần quan trọng nhất của Canh Kim, là lửa trong lò rèn luyện Canh Kim thành vũ khí sắc bén. Mang lại công danh, địa vị, sự nghiệp vẻ vang và sự tôn trọng của xã hội. Giúp Canh Kim trở nên có kỷ luật và hữu dụng. Nữ mệnh có chồng tài giỏi.",
            tieuCuc:
              "Gặp nhiều áp lực, phải trải qua nhiều rèn giũa, thử thách mới có thể thành công. Nếu Hỏa quá yếu thì không đủ sức rèn Canh, sự nghiệp khó thành.",
          },
          {
            name: "Bính",
            thapThan: "Thiên Quan",
            nguHanh: "Hỏa",
            amDuong: "Dương",
            description:
              "Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).",
            tichCuc:
              "Khi Canh Kim đủ mạnh, Bính Hỏa mang lại quyền lực tối cao trong các môi trường khắc nghiệt như quân đội, cảnh sát, chính trị. Có khả năng đảm đương trọng trách lớn, lập nên đại nghiệp.",
            tieuCuc:
              "Khi Canh Kim yếu, đây là áp lực khủng khiếp, gây ra tai họa, bệnh tật nặng, các vấn đề nghiêm trọng về pháp luật. Cuộc sống luôn đầy rẫy nguy hiểm và kẻ thù. Nữ mệnh có tình duyên trắc trở.",
          },
          {
            name: "Kỷ",
            thapThan: "Chính Ấn",
            nguHanh: "Thổ",
            amDuong: "Âm",
            description:
              "Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.",
            tichCuc:
              "Mang lại sự ổn định, có người che chở, giúp đỡ. Có nền tảng gia đình tốt.",
            tieuCuc:
              "Hình ảnh đất bùn làm bẩn kim loại (Thổ hậu mai kim). Khiến Canh Kim trở nên lười biếng, ỷ lại, mất đi sự sắc bén và ý chí chiến đấu. Tài năng bị chôn vùi, khó phát huy.",
          },
          {
            name: "Mậu",
            thapThan: "Thiên Ấn",
            nguHanh: "Thổ",
            amDuong: "Dương",
            description:
              "Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.",
            tichCuc:
              "Mang lại một nền tảng vững chắc, sự hỗ trợ mạnh mẽ từ quý nhân có quyền lực. Giúp Canh Kim trở nên kiên định và có sức chịu đựng tốt hơn.",
            tieuCuc:
              "Hình ảnh núi lớn chôn vùi kim loại. Khi Thổ quá cường sẽ khiến Canh Kim trở nên ngu dốt, cứng nhắc, không chịu học hỏi, tài năng bị chôn vùi hoàn toàn. Dễ bị cô lập và không được công nhận.",
          },
        ],
      },
      {
        name: "Tân",
        characteristic: `Đặc tính cơ bản của Nhật Chủ Tân Kim
Tân Kim là hình ảnh của kim loại đã qua chế tác, là trang sức, châu báu, ngọc ngà (Âm Kim). Đặc tính cốt lõi là sự tinh tế, thanh lịch, sang trọng và giá trị. Người Tân Kim có lòng tự trọng cao, yêu cái đẹp, thích sự chú ý và công nhận. Họ giống như một viên ngọc quý, khao khát được nước (Thủy) rửa sạch để tỏa sáng và sợ nhất bị đất (Thổ) làm vẩn đục.
•	Khi cân bằng (được Thủy rửa và có Hỏa chiếu):
	Đặc điểm: Họ là người vô cùng tinh tế, thanh lịch và có gu thẩm mỹ cao. Lời nói và hành động duyên dáng, có sức hấp dẫn đặc biệt. Họ thông minh, sắc sảo và luôn nổi bật trong đám đông. Họ là những nghệ sĩ, nhà ngoại giao, hoặc những chuyên gia trong các lĩnh vực đòi hỏi sự tỉ mỉ và sang trọng.
	Dấu hiệu nhận biết: Khí chất sang trọng, dù ăn mặc đơn giản. Chú trọng đến hình thức, ngoại hình. Lời nói nhẹ nhàng nhưng sắc bén. Có sức hút tự nhiên.
•	Khi mất cân bằng (Quá Cường / Quá Nhược):
	- Quá Cường (Kim quá vượng):
	Đặc điểm: Nhiều món trang sức quý giá để cùng một chỗ sẽ tranh giành sự chú ý, làm giảm giá trị của nhau. Họ trở nên quá kiêu kỳ, khó gần, hay chỉ trích và phán xét người khác. Lời nói chua ngoa, sắc lẹm, dễ gây tổn thương sâu sắc. Lòng tự tôn quá cao dẫn đến tự phụ và cô độc.
	Dấu hiệu nhận biết: Kiêu ngạo, thích khoe khoang. Hay chê bai, chỉ trích. Luôn cho mình là trung tâm và khó chấp nhận ý kiến trái chiều.
	-Quá Nhược (Kim bị suy):
	Đặc điểm: Trang sức bị hư hỏng, mất đi giá trị. Họ thiếu tự tin, nhạy cảm quá mức, dễ bị tổn thương bởi những lời nói dù là vô tình. Không có khả năng tự bảo vệ mình, dễ bị người khác xem thường hoặc lợi dụng.
	Dấu hiệu nhận biết: Tự ti, hay mặc cảm về bản thân. Rất nhạy cảm, dễ khóc hoặc tự ái. Thiếu đi sự tỏa sáng và sức hút vốn có.
`,
        data: [
          {
            name: "Tân",
            thapThan: "Tỷ Kiên",
            nguHanh: "Kim",
            amDuong: "Âm",
            description:
              "Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.",
            tichCuc:
              "Tăng cường sự tự tin, giúp họ trở nên sắc sảo và tinh tế hơn. Có những người bạn cùng đẳng cấp, có thể hỗ trợ nhau trong việc xây dựng hình ảnh.",
            tieuCuc:
              "Cạnh tranh gay gắt. Luôn có sự so bì, đố kỵ với bạn bè. Dễ bị bạn bè nói xấu, chơi không đẹp. Cái tôi quá lớn, khó hợp tác.",
          },
          {
            name: "Canh",
            thapThan: "Kiếp Tài",
            nguHanh: "Kim",
            amDuong: "Dương",
            description:
              "Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.",
            tichCuc:
              "Mang lại cho Tân Kim sự mạnh mẽ, quyết đoán và can đảm hơn. Có thể nhận được sự giúp đỡ từ những người bạn mạnh mẽ, thẳng thắn.",
            tieuCuc:
              "Hình ảnh kim loại thô (Canh) làm trầy xước trang sức (Tân). Dễ bị bạn bè, người thân làm tổn thương hoặc gây phiền phức. Dễ bị hao tài, mất mát vì sự cạnh tranh thô bạo.",
          },
          {
            name: "Quý",
            thapThan: "Thực Thần",
            nguHanh: "Thủy",
            amDuong: "Âm",
            description:
              "Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).",
            tichCuc:
              "Hình ảnh sương, mưa nhỏ rửa sạch bụi trên trang sức. Mang lại sự thông minh, tinh tế và khả năng biểu đạt nghệ thuật. Lời nói nhẹ nhàng, duyên dáng.",
            tieuCuc:
              "Dễ trở nên quá nhạy cảm, đa sầu đa cảm. Tư duy có phần mơ mộng, thiếu tính thực tế. Sự sáng tạo chỉ ở mức độ nhỏ, khó tạo ra đột phá lớn.",
          },
          {
            name: "Nhâm",
            thapThan: "Thương Quan",
            nguHanh: "Thủy",
            amDuong: "Dương",
            description:
              "Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).",
            tichCuc:
              "Đây là Thần quan trọng và được yêu thích nhất của Tân Kim. Hình ảnh sông lớn (Nhâm) rửa sạch ngọc quý (Tân), giúp Tân Kim tỏa sáng rực rỡ. Mang lại trí thông minh tuyệt đỉnh, tài hoa xuất chúng, danh tiếng lẫy lừng.",
            tieuCuc:
              "Khi Thủy quá cường có thể cuốn trôi Kim. Dễ trở nên quá kiêu ngạo, tự mãn. Có thể vì tài năng mà coi thường mọi quy tắc, gây ra rắc rối.",
          },
          {
            name: "Giáp",
            thapThan: "Chính Tài",
            nguHanh: "Mộc",
            amDuong: "Dương",
            description:
              "Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.",
            tichCuc:
              "Có mục tiêu tài chính lớn, có tham vọng về tiền bạc. Có thể kiếm được tiền từ các dự án lớn, đối tác lớn.",
            tieuCuc:
              "Hình ảnh dao nhỏ (Tân) chặt cây lớn (Giáp). Kiếm tiền rất vất vả, lao tâm khổ tứ. Dễ bị các vấn đề về tài chính làm cho mệt mỏi, kiệt sức.",
          },
          {
            name: "Ất",
            thapThan: "Thiên Tài",
            nguHanh: "Mộc",
            amDuong: "Âm",
            description:
              "Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).",
            tichCuc:
              "Hình ảnh dao nhỏ tỉa cành lá (Ất). Có khả năng kiếm tiền từ các công việc đòi hỏi sự khéo léo, tinh tế như nghệ thuật, làm đẹp, thời trang.",
            tieuCuc:
              "Tài lộc không lớn, chỉ đủ chi tiêu. Dễ bị hao tán vì các sở thích cá nhân, mua sắm.",
          },
          {
            name: "Bính",
            thapThan: "Chính Quan",
            nguHanh: "Hỏa",
            amDuong: "Dương",
            description:
              "Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).",
            tichCuc:
              "Đây là cặp Bính Tân hợp hóa Thủy. Hình ảnh mặt trời (Bính) chiếu rọi làm trang sức (Tân) thêm lấp lánh. Mang lại danh tiếng, địa vị cao quý, được xã hội công nhận. Nữ mệnh có chồng tài giỏi, có địa vị.",
            tieuCuc:
              "Dễ vì danh tiếng mà đánh mất bản thân. Luôn phải sống dưới sự chú ý của người khác, gây ra áp lực.",
          },
          {
            name: "Đinh",
            thapThan: "Thiên Quan",
            nguHanh: "Hỏa",
            amDuong: "Âm",
            description:
              "Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).",
            tichCuc:
              "Khi được chế hóa, có thể mang lại quyền lực trong các lĩnh vực đặc thù, đòi hỏi sự chính xác cao như y tế (dao mổ), kỹ thuật.",
            tieuCuc:
              "Hình ảnh lửa lò (Đinh) làm tan chảy trang sức (Tân). Đây là áp lực hủy diệt. Gặp nhiều khó khăn, thử thách, sức khỏe suy yếu (đặc biệt là hệ hô hấp). Nữ mệnh tình duyên cực kỳ trắc trở.",
          },
          {
            name: "Mậu",
            thapThan: "Chính Ấn",
            nguHanh: "Thổ",
            amDuong: "Dương",
            description:
              "Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.",
            tichCuc:
              "Có sự che chở, giúp đỡ từ người lớn tuổi, có quyền lực. Có nền tảng gia đình vững chắc.",
            tieuCuc:
              "Đây là Thần mà Tân Kim sợ nhất. Hình ảnh núi lớn (Mậu) chôn vùi hoàn toàn trang sức (Tân). Khiến tài năng, vẻ đẹp bị che lấp, không được công nhận. Dễ bị trầm cảm, suy nghĩ tiêu cực, cuộc sống tù túng.",
          },
          {
            name: "Kỷ",
            thapThan: "Thiên Ấn",
            nguHanh: "Thổ",
            amDuong: "Âm",
            description:
              "Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.",
            tichCuc:
              "Có sự hỗ trợ nhỏ, không đáng kể. Có thể có chút năng khiếu về nghệ thuật, thủ công.",
            tieuCuc:
              "Hình ảnh bùn đất (Kỷ) làm vấy bẩn trang sức (Tân). Sự hỗ trợ nhận được thường đi kèm phiền phức, hoặc sự giúp đỡ không đúng cách làm hỏng việc. Gây ra cảm giác khó chịu, bực bội.",
          },
        ],
      },
      {
        name: "Nhâm",
        characteristic: `Đặc tính cơ bản của Nhật Chủ Nhâm Thủy
Nhâm Thủy là hình ảnh của dòng nước mạnh mẽ như biển cả, sông lớn (Dương Thủy). Đặc tính cốt lõi là sự năng động, thông minh, khoáng đạt và khả năng thích ứng vô biên. Người Nhâm Thủy có tầm nhìn lớn, tư duy tự do và luôn chứa đựng một nguồn năng lượng mạnh mẽ, không ngừng chuyển động.
•	Khi cân bằng:
	Đặc điểm: Họ là người thông minh, hào phóng, có khả năng bao dung như biển cả. Họ thích ứng nhanh với mọi hoàn cảnh, giỏi giao tiếp và có khả năng dẫn dắt, kết nối mọi người. Với tầm nhìn xa và tư duy linh hoạt, họ có thể tạo ra những thành tựu to lớn.
	Dấu hiệu nhận biết: Phong thái tự tin, phóng khoáng. Khả năng xử lý nhiều vấn đề cùng lúc. Luôn tràn đầy năng lượng và có sức ảnh hưởng lớn đến những người xung quanh.
•	Khi mất cân bằng (Quá Cường / Quá Nhược):
	- Quá Cường (Thủy quá vượng):
	Đặc điểm: Dòng nước quá mạnh sẽ trở thành trận lụt tàn phá. Họ trở nên hung hãn, thiếu kiểm soát, hành động bộc phát và dễ gây ra hậu quả lớn. Tính tình thất thường, khó lường, dễ buông thả, thiếu kỷ luật và không nghe theo lời khuyên của ai.
	Dấu hiệu nhận biết: Bất cần, liều lĩnh. Dễ thay đổi, không kiên định. Có xu hướng lấn át người khác và khó kiểm soát được cảm xúc của chính mình.
	- Quá Nhược (Thủy bị suy):
	Đặc điểm: Sông lớn cạn kiệt, mất đi sức mạnh. Họ có nhiều ý tưởng nhưng thiếu ý chí và động lực để thực hiện. Dễ bị người khác dẫn dắt, không có định hướng rõ ràng cho cuộc đời. Trở nên do dự, thiếu tự tin và dễ bỏ cuộc.
	Dấu hiệu nhận biết: Thiếu quyết đoán, hay thay đổi mục tiêu. Bề ngoài có vẻ năng động nhưng thực chất không có thành tựu gì cụ thể. Dễ cảm thấy lạc lõng, mất phương hướng.
`,
        data: [
          {
            name: "Nhâm",
            thapThan: "Tỷ Kiên",
            nguHanh: "Thủy",
            amDuong: "Dương",
            description:
              "Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.",
            tichCuc:
              "Tăng cường sự tự tin, khí phách và khả năng cạnh tranh. Có nhiều bạn bè, mối quan hệ xã hội rộng, giỏi hợp tác để cùng nhau phát triển.",
            tieuCuc:
              "Khi quá cường sẽ trở nên cực kỳ liều lĩnh, bất cần. Dễ bị cuốn vào các cuộc cạnh tranh không lành mạnh, dẫn đến hao tài, tốn của.",
          },
          {
            name: "Quý",
            thapThan: "Kiếp Tài",
            nguHanh: "Thủy",
            amDuong: "Âm",
            description:
              "Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.",
            tichCuc:
              "Giúp Nhâm Thủy trở nên tinh tế, sâu sắc và có chiều sâu hơn. Có khả năng thấu hiểu nội tâm người khác, biết cách dùng cả sự mềm mỏng và cứng rắn.",
            tieuCuc:
              "Dễ bị cạnh tranh ngầm, bị người khác đâm sau lưng mà không biết. Nội tâm phức tạp, dễ che giấu những toan tính riêng.",
          },
          {
            name: "Giáp",
            thapThan: "Thực Thần",
            nguHanh: "Mộc",
            amDuong: "Dương",
            description:
              "Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).",
            tichCuc:
              "Hình ảnh sông lớn nuôi cây đại thụ. Mang lại tài năng, sự sáng tạo ở quy mô lớn. Có khả năng lãnh đạo, tầm nhìn xa và tạo ra những thành quả to lớn, vững chắc.",
            tieuCuc:
              "Dễ trở nên quá lý tưởng hóa, đôi khi hành động mà không tính đến chi tiết. Có xu hướng thích chỉ huy hơn là tự tay làm.",
          },
          {
            name: "Ất",
            thapThan: "Thương Quan",
            nguHanh: "Mộc",
            amDuong: "Âm",
            description:
              "Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).",
            tichCuc:
              "Mang lại sự khéo léo, tinh tế trong giao tiếp và kinh doanh. Có tài ăn nói, khả năng thuyết phục và năng khiếu nghệ thuật. Rất giỏi trong việc kiếm tiền.",
            tieuCuc:
              "Dễ thay đổi, không ổn định. Có xu hướng hơi phù phiếm, thích những thứ hào nhoáng bề ngoài. Dễ vướng vào các mối quan hệ phức tạp.",
          },
          {
            name: "Đinh",
            thapThan: "Chính Tài",
            nguHanh: "Hỏa",
            amDuong: "Âm",
            description:
              "Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.",
            tichCuc:
              "Nhâm và Đinh là cặp hợp hóa Mộc, mang lại sự may mắn về tài lộc và tình duyên. Họ có khả năng kiếm tiền tốt và có kế hoạch tài chính rõ ràng. Nam mệnh có vợ đẹp, tài năng, là trợ thủ đắc lực.",
            tieuCuc:
              "Dễ bị cuốn vào tình cảm, có thể vì tình yêu mà quên đi lý trí. Đôi khi quá tập trung vào mục tiêu mà trở nên toan tính.",
          },
          {
            name: "Bính",
            thapThan: "Thiên Tài",
            nguHanh: "Hỏa",
            amDuong: "Dương",
            description:
              "Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).",
            tichCuc:
              "Đây là hình ảnh đẹp nhất của Nhâm Thủy (Thủy quang tương chiếu - ánh mặt trời chiếu rọi mặt biển), mang lại sự giàu có, danh tiếng và thành công rực rỡ. Có tầm nhìn lớn, hào phóng, có khả năng làm những việc kinh thiên động địa.",
            tieuCuc:
              "Dễ trở nên quá phô trương, khoe khoang. Chi tiêu hoang phí, không biết tiết kiệm. Cần cẩn thận kẻo thành công đến nhanh rồi đi cũng nhanh.",
          },
          {
            name: "Kỷ",
            thapThan: "Chính Quan",
            nguHanh: "Thổ",
            amDuong: "Âm",
            description:
              "Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).",
            tichCuc:
              "Giúp Nhâm Thủy trở nên có kỷ luật, nguyên tắc và định hướng rõ ràng hơn. Có cơ hội thăng tiến trong sự nghiệp, được cấp trên công nhận.",
            tieuCuc:
              "Hình ảnh đất bùn làm vẩn đục sông lớn. Dễ gặp phải những quy định phiền phức, bị cấp trên gây khó dễ. Cảm thấy bị gò bó, mất tự do, khó phát huy hết khả năng. Nữ mệnh dễ có chồng không tương xứng.",
          },
          {
            name: "Mậu",
            thapThan: "Thiên Quan",
            nguHanh: "Thổ",
            amDuong: "Dương",
            description:
              "Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).",
            tichCuc:
              "Hình ảnh con đê lớn ngăn chặn dòng lũ. Khi Nhâm Thủy đủ mạnh, Mậu Thổ mang lại quyền lực tối cao, khả năng quản lý và đảm đương những trọng trách vĩ đại. Thành công vang dội trong quân đội, chính trị hoặc làm chủ doanh nghiệp lớn.",
            tieuCuc:
              "Khi Nhâm Thủy yếu, đây là áp lực khủng khiếp, gây ra tai họa, bệnh tật, các vấn đề về pháp luật. Cuộc sống luôn đầy rẫy khó khăn, thử thách. Nữ mệnh có tình duyên vất vả, dễ gặp người chồng vũ phu, độc đoán.",
          },
          {
            name: "Tân",
            thapThan: "Chính Ấn",
            nguHanh: "Kim",
            amDuong: "Âm",
            description:
              "Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.",
            tichCuc:
              "Mang lại tư duy sắc bén, tinh tế và khả năng học hỏi sâu sắc. Có gu thẩm mỹ tốt, được mẹ hoặc quý nhân là nữ giới hết lòng giúp đỡ.",
            tieuCuc:
              "Dễ trở nên quá nhạy cảm, suy nghĩ nhiều. Có thể hơi dựa dẫm, thiếu đi sự mạnh mẽ vốn có của Nhâm Thủy.",
          },
          {
            name: "Canh",
            thapThan: "Thiên Ấn",
            nguHanh: "Kim",
            amDuong: "Dương",
            description:
              "Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.",
            tichCuc:
              "Là nguồn năng lượng vô tận cho Nhâm Thủy. Mang lại trực giác phi thường, tư duy đột phá và khả năng học hỏi các lĩnh vực độc đáo. Có quý nhân mạnh mẽ nâng đỡ.",
            tieuCuc:
              "Dễ trở nên lười biếng vì có người chống lưng. Có thể có những suy nghĩ kỳ lạ, khác người, dẫn đến bị cô lập. Nếu Kim quá cường sẽ làm Thủy bị đục.",
          },
        ],
      },
      {
        name: "Quý",
        characteristic: `Đặc tính cơ bản của Nhật Chủ Quý Thủy
Quý Thủy là hình ảnh của dòng nước mềm mại như mưa, sương, suối nhỏ (Âm Thủy). Đặc tính cốt lõi là sự linh hoạt, thông tuệ, khả năng thẩm thấu và nội tâm sâu sắc. Người Quý Thủy có tư duy nhanh nhạy, khả năng thích ứng cao và một sức mạnh tiềm tàng khó lường.
•	Khi cân bằng:
	Đặc điểm: Họ là người thông minh, hiền hòa, khiêm tốn và có khả năng thấu hiểu người khác. Giống như mưa tưới cho vạn vật, họ mang lại sự nuôi dưỡng một cách thầm lặng. Họ có trí tưởng tượng phong phú, tư duy chiến lược và khả năng vượt qua khó khăn bằng sự mềm mỏng, linh hoạt.
	Dấu hiệu nhận biết: Thái độ ôn hòa, dễ gần. Khả năng thích ứng với mọi hoàn cảnh. Tư duy sắc bén và có chiều sâu, luôn nhìn ra những khía cạnh mà người khác bỏ qua.
•	Khi mất cân bằng (Quá Cường / Quá Nhược):
	- Quá Cường (Thủy quá vượng):
	Đặc điểm: Dòng nước quá lớn sẽ trở thành lũ lụt. Họ trở nên hay suy nghĩ vẩn vơ, đa nghi, nội tâm luôn biến động. Tâm trạng thất thường, khó đoán, dễ bị cuốn theo cảm xúc tiêu cực. Có thể trở nên âm mưu, toan tính, dùng sự thông minh của mình vào những việc không chính đáng.
	Dấu hiệu nhận biết: Hay thay đổi, thiếu kiên định. Suy nghĩ quá nhiều dẫn đến do dự. Dễ che giấu cảm xúc thật, tạo cảm giác bí ẩn, khó lường.
	- Quá Nhược (Thủy bị suy):
	Đặc điểm: Dòng nước quá yếu sẽ dễ dàng bốc hơi. Họ thiếu chủ kiến, dễ bị người khác chi phối và lợi dụng. Yếu đuối, nhạy cảm quá mức, dễ bị tổn thương bởi những lời nói hay hành động nhỏ nhặt. Thiếu khả năng tự bảo vệ bản thân.
	Dấu hiệu nhận biết: Nhút nhát, thiếu tự tin. Dễ bị động trong mọi việc, không dám đưa ra quyết định. Thường xuyên cảm thấy bất an.
`,
        data: [
          {
            name: "Quý",
            thapThan: "Tỷ Kiên",
            nguHanh: "Thủy",
            amDuong: "Âm",
            description:
              "Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.",
            tichCuc:
              "Tăng cường sức mạnh nội tâm, sự kiên trì và khả năng tập trung. Giúp họ có thêm sự đồng cảm và thấu hiểu. Là người bạn đồng hành tinh tế, sâu sắc.",
            tieuCuc:
              "Khi quá cường sẽ trở nên rất cố chấp một cách thầm lặng. Dễ bị chìm đắm trong suy nghĩ của bản thân, hướng nội quá mức và trở nên u uất, bi quan.",
          },
          {
            name: "Nhâm",
            thapThan: "Kiếp Tài",
            nguHanh: "Thủy",
            amDuong: "Dương",
            description:
              "Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.",
            tichCuc:
              "Mang lại cho Quý Thủy sự mạnh mẽ, dũng cảm và khả năng hành động. Giúp họ trở nên quảng giao, hướng ngoại hơn. Có thể hợp tác để làm những việc lớn.",
            tieuCuc:
              "Dễ bị bạn bè lôi kéo, ảnh hưởng xấu. Có xu hướng bị người mạnh hơn lấn át, che mờ. Dễ bị hao tài vì các mối quan hệ xã hội.",
          },
          {
            name: "Ất",
            thapThan: "Thực Thần",
            nguHanh: "Mộc",
            amDuong: "Âm",
            description:
              "Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).",
            tichCuc:
              "Đây là hình ảnh đẹp nhất của Quý Thủy (mưa tưới hoa). Mang lại tài năng nghệ thuật, sự lãng mạn, tinh tế và lòng nhân ái. Lời nói nhẹ nhàng, duyên dáng, có khả năng chữa lành.",
            tieuCuc:
              "Dễ trở nên yếu đuối, mơ mộng, thiếu thực tế. Dễ bị lụy trong tình cảm. Có thể hơi lười biếng, chỉ thích an nhàn.",
          },
          {
            name: "Giáp",
            thapThan: "Thương Quan",
            nguHanh: "Mộc",
            amDuong: "Dương",
            description:
              "Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).",
            tichCuc:
              "Vô cùng thông minh, có tài năng và tham vọng lớn. Có khả năng lãnh đạo, sáng tạo đột phá, mang lại những thành tựu lớn lao. Dám nghĩ dám làm.",
            tieuCuc:
              "Kiêu ngạo, thích thể hiện, dễ xem thường người khác. Không tuân thủ quy tắc, dễ xung đột với cấp trên. Lời nói thẳng thắn có thể gây mất lòng.",
          },
          {
            name: "Bính",
            thapThan: "Chính Tài",
            nguHanh: "Hỏa",
            amDuong: "Dương",
            description:
              "Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.",
            tichCuc:
              "Hình ảnh mặt trời (Bính) và màn sương (Quý) tạo nên cầu vồng, mang lại sự may mắn và tài lộc. Có thu nhập ổn định, cuộc sống sung túc. Nam mệnh có vợ đẹp, tài giỏi.",
            tieuCuc:
              "Dễ quá coi trọng vật chất, tiền bạc. Có thể vì công việc mà bỏ bê các khía cạnh khác của cuộc sống.",
          },
          {
            name: "Đinh",
            thapThan: "Thiên Tài",
            nguHanh: "Hỏa",
            amDuong: "Âm",
            description:
              "Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).",
            tichCuc:
              "Mang lại sự nhạy bén với các cơ hội kinh doanh, đầu tư. Có thể kiếm được những khoản tiền bất ngờ. Có sức hấp dẫn, lãng mạn trong tình cảm.",
            tieuCuc:
              "Tài chính bấp bênh, khó đoán. Dễ bị cuốn vào các mối quan hệ tình cảm phức tạp. Đam mê nhất thời, khó duy trì lâu dài.",
          },
          {
            name: "Mậu",
            thapThan: "Chính Quan",
            nguHanh: "Thổ",
            amDuong: "Dương",
            description:
              "Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).",
            tichCuc:
              "Đây là cặp Mậu Quý hợp Hỏa, mang lại danh vọng và địa vị. Giúp Quý Thủy trở nên có nguyên tắc, đáng tin cậy. Sự nghiệp thăng tiến. Nữ mệnh có chồng tài giỏi, là chỗ dựa vững chắc.",
            tieuCuc:
              "Khi Thổ quá cường, Quý Thủy sẽ bị áp chế, gây ra sự căng thẳng, mất tự do. Dễ bị gò bó trong các quy tắc, không phát huy được sự sáng tạo.",
          },
          {
            name: "Kỷ",
            thapThan: "Thiên Quan",
            nguHanh: "Thổ",
            amDuong: "Âm",
            description:
              "Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).",
            tichCuc:
              "Khi được chế hóa, giúp Quý Thủy trở nên kiên cường, có khả năng chịu đựng áp lực và giải quyết các vấn đề phức tạp.",
            tieuCuc:
              "Hình ảnh đất bùn làm vẩn đục dòng nước. Gặp nhiều thị phi, tiểu nhân quấy phá. Sức khỏe dễ bị ảnh hưởng, đặc biệt là hệ tiêu hóa. Nữ mệnh dễ lận đận tình duyên, gặp phải người không phù hợp.",
          },
          {
            name: "Canh",
            thapThan: "Chính Ấn",
            nguHanh: "Kim",
            amDuong: "Dương",
            description:
              "Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.",
            tichCuc:
              "Hình ảnh kim loại lớn tạo ra dòng nước trong lành. Mang lại tư duy logic, sáng suốt, khả năng học hỏi tốt. Luôn có quý nhân là người lớn tuổi, có chức quyền giúp đỡ.",
            tieuCuc:
              "Dễ trở nên lười biếng, ỷ lại vào sự giúp đỡ của người khác. Thiếu động lực để tự mình phấn đấu.",
          },
          {
            name: "Tân",
            thapThan: "Thiên Ấn",
            nguHanh: "Kim",
            amDuong: "Âm",
            description:
              "Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.",
            tichCuc:
              "Mang lại sự tinh tế, sắc bén và trực giác nhạy bén phi thường. Có năng khiếu đặc biệt trong các lĩnh vực nghệ thuật, triết học, huyền học.",
            tieuCuc:
              "Lạnh lùng, khó gần, hay chỉ trích. Dễ cảm thấy cô độc, không được thấu hiểu. Mối quan hệ với mẹ có thể xa cách hoặc mẹ hay ốm đau.",
          },
        ],
      },
    ];
    let data = thapThan.find((item) => item.name === nhatChuName);
    return data;
  };

  const getThapThanDiaChi = (nhatChuName) => {
    let thapThan = [
      {
        name: "Kỷ",
        thapThanText: `- Thìn, Tuất (+Thổ) - Kiếp Tài: Thể hiện người có uy tín, tầm nhìn, tham vọng, giỏi lãnh đạo (Thìn), hoặc sự trung thành, chính trực, nhiệt tình, có nguyên tắc, trọng tình nghĩa (Tuất). Mặt trái là sự mưu mô, khó lường, độc đoán, tham vọng mù quáng (Thìn), hoặc trở nên nóng nảy, cứng nhắc, bảo thủ và hay tranh cãi khi mất cân bằng (Tuất).
- Sửu, Mùi (-Thổ) - Tỷ Kiên: Biểu hiện sự kiên trì, chăm chỉ, nhẫn nại, kỷ luật và thực tế (Sửu), hoặc sự ôn hòa, hiền lành, vị tha, sống tình cảm và biết lắng nghe (Mùi). Mặt tiêu cực có thể là lì lợm, cố chấp, lạnh lùng, khắc nghiệt (Sửu), hoặc đa sầu đa cảm, mê tín, nhu nhược và lụy tình (Mùi).
- Dần (+Mộc) - Chính Quan: Là Mộc pha trộn nhiệt tình (Hỏa) và thực tế (Thổ), tạo ra con người can đảm, hào phóng, năng động và sáng tạo. Mặt trái là sự nóng nảy, bốc đồng, khoe khoang và cả thèm chóng chán.
- Mão (-Mộc) - Thiên Quan/Thiên Quan: Là Mộc thuần túy, có sức sống mãnh liệt, kiên trì phi thường, nhẫn nại và bền bỉ. Tiêu cực là sự ghen tuông mạnh, cố chấp ngầm, giữ thù dai và nhạy cảm quá mức.
- Ngọ (+Hỏa) - Chính Ấn: Đỉnh cao của năng lượng Hỏa, thể hiện sự đam mê mãnh liệt, quyến rũ, kiên định và giữ chữ tín. Khi tiêu cực sẽ rất cực đoan, cố chấp, nóng tính và tâm trạng thất thường.
- Tỵ (-Hỏa) - Thiên Ấn: Năng lượng biến hóa chứa cả Hỏa, Kim, Thổ, tạo ra người thông minh, nhanh nhẹn, có mục đích, giỏi tính toán và thực tế. Mặt tiêu cực là thủ đoạn, xảo quyệt, hay thay đổi, ghen tuông và đố kỵ.
- Thân (+Kim) - Thương Quan: Kết hợp Kim với trí tuệ và linh hoạt, tạo ra người lanh lợi, đa tài, thông minh và giỏi giải quyết vấn đề. Khi tiêu cực sẽ là mưu mẹo, khôn lỏi, thích thể hiện và không ổn định.
- Dậu (-Kim) - Thực Thần: Là Kim thuần khiết, biểu hiện cho sự kỷ luật tuyệt đối, tự trọng cao, cực kỳ nguyên tắc và đáng tin cậy. Tiêu cực là sự cực đoan, phán xét, cứng nhắc và tự cho mình là đúng.
- Tý (+Thủy) - Chính Tài: Đỉnh cao của năng lượng Thủy, đại diện cho trí tuệ sâu sắc và quyền lực tiềm ẩn, cực kỳ thông minh, mưu trí và có tầm nhìn chiến lược. Khi mất cân bằng sẽ trở nên mưu mô, thủ đoạn, đa nghi và thâm hiểm.
- Hợi (-Thủy) - Thiên Tài: Biểu hiện cho trí tuệ phúc hậu và lòng nhân ái, là người tốt bụng, thật thà, có lòng trắc ẩn và rộng lượng. Tiêu cực là sự dễ dãi, cả tin, thiếu đề phòng và dễ bị lợi dụng.`,
      },
      {
        name: "Giáp",
        thapThanText: `- Dần (+Mộc) - Tỷ Kiên: Là gốc rễ vững chắc (Lộc), mang lại sự tự chủ, năng lượng dồi dào, rất quyết đoán và có khả năng thực thi mạnh mẽ. Tiêu cực là cực kỳ bướng bỉnh, cố chấp, tự quyết định mọi việc, không thích bị người khác xen vào, dễ cô lập bản thân.
- Mão (-Mộc) - Kiếp Tài: Có nhiều mối quan hệ xã hội, được nhiều người yêu quý, mở rộng các mối quan hệ, giao tiếp tốt, dễ được giúp đỡ. Tiêu cực là nơi Đế cường của Kiếp Tài, cạnh tranh rất khốc liệt, dễ bị hao tài vì bạn bè, đặc biệt là các vấn đề liên quan đến tình cảm, tửu sắc.
- Tỵ (-Hỏa) - Thực Thần: Rất thông minh, có khả năng học hỏi và sáng tạo tốt, có tài năng trong lĩnh vực giáo dục, truyền thông, sáng tạo. Tiêu cực là năng lượng của Giáp Mộc bị tiết xuất quá nhiều, dễ cảm thấy mệt mỏi, kiệt sức, suy nghĩ nhiều nhưng hành động ít.
- Ngọ (+Hỏa) - Thương Quan: Có tài năng nghệ thuật, biểu diễn xuất chúng, sáng tạo đột phá, gây ấn tượng mạnh, có khả năng nổi bật trong đám đông. Tiêu cực là "Mộc bị thiêu cháy", dễ hành động bốc đồng, thiếu kiểm soát, nổi loạn, chống đối quy tắc, sức khỏe dễ bị ảnh hưởng.
- Sửu, Mùi (-Thổ) - Chính Tài: Có khả năng kiếm tiền một cách chăm chỉ, cần cù. Tài lộc đến từ sự tích lũy kiên trì (Sửu), hoặc có thể có tài sản liên quan đến đất đai. Có sự ổn định về tài chính (Mùi). Tiêu cực là Sửu là đất ẩm lạnh, cây khó bén rễ. Kiếm tiền rất vất vả, phải nỗ lực rất nhiều trong môi trường khó khăn (Sửu), hoặc Mùi là đất khô nóng, Mộc trong Mùi đã vào mộ. Cây khó phát triển tốt. Nguồn tài chính không dồi dào, kiếm tiền khó khăn (Mùi).
- Thìn, Tuất (+Thổ) - Thiên Tài: Thìn là đất ẩm có chứa Thủy, rất tốt cho Giáp Mộc phát triển, có nhiều cơ hội tốt để kinh doanh, đầu tư và thu được lợi nhuận lớn (Thìn), hoặc Tuất là đất khô nóng, rèn luyện ý chí và khả năng chịu đựng trong việc kiếm tiền, có thể thành công nhờ nỗ lực vượt khó (Tuất). Tiêu cực là tài chính có thể biến động, cần biết nắm bắt cơ hội đúng lúc (Thìn), hoặc Tuất là loại Thiên Tài khó kiếm nhất, phải làm việc trong môi trường cực kỳ khắc nghiệt, cạnh tranh cao mới có thể có tiền (Tuất).
- Thân (+Kim) - Thiên Quan: Rèn luyện ý chí và khả năng đối mặt với thử thách sinh tử, có khả năng đảm đương trọng trách lớn, vượt qua thử thách, rèn luyện bản lĩnh. Tiêu cực là luôn phải đối mặt với nguy hiểm, áp lực cực lớn, dễ bị tai nạn, đặc biệt là liên quan đến xe cộ, máy móc kim loại, sức khỏe và tính mạng bị đe dọa.
- Dậu (-Kim) - Chính Quan: Có tinh thần trách nhiệm, làm việc có kỷ luật, có cơ hội thăng tiến trong sự nghiệp, làm việc có kỷ luật, trách nhiệm. Tiêu cực là áp lực công việc lớn, dễ bị căng thẳng thần kinh, môi trường làm việc có nhiều quy tắc cứng nhắc.
- Tý (+Thủy) - Chính Ấn: Có nền tảng học vấn tốt, được gia đình yêu thương, giúp đỡ, thông minh, có khả năng tiếp thu kiến thức tốt, được hỗ trợ từ mẹ, quý nhân. Tiêu cực là dễ sinh ra tính ỷ lại, thiếu nỗ lực cá nhân, nếu Thủy quá cường dễ gây ra tình trạng "Thủy phiếm Mộc" (nước cuốn trôi cây), khiến cuộc sống trôi nổi, không ổn định.
- Hợi (-Thủy) - Thiên Ấn: Hợi là đất trường sinh của Giáp Mộc, vừa là Ấn vừa là gốc rễ, nguồn hỗ trợ mạnh mẽ và bền vững nhất, vô cùng thông minh, có tài năng và luôn có quý nhân phù trợ. Tiêu cực là có thể vì có người chống lưng mà trở nên thiếu đi nỗ lực cá nhân, khó thành tựu lớn nếu không tự mình phấn đấu.`,
      },
      {
        name: "Ất",
        thapThanText: `- Dần (+Mộc) - Kiếp Tài: Có sự giúp đỡ từ anh em, bạn bè mạnh mẽ. Giúp Ất Mộc trở nên quyết đoán, mạnh mẽ hơn. Tiêu cực là Dần là nơi Đế cường của Kiếp Tài. Dễ bị người khác lấn át, cướp công. Cần cẩn thận trong các mối quan hệ hợp tác.
- Mão (-Mộc) - Tỷ Kiên: Là gốc rễ vững chắc (Lộc), mang lại sự tự chủ và khả năng chuyên môn tốt. Có nhiều bạn bè thân thiết. Tiêu cực là rất cố chấp một cách mềm mỏng. Dễ bị các mối quan hệ tình cảm chi phối (đào hoa).
- Tỵ (-Hỏa) - Thương Quan: Rất thông minh, có khả năng học hỏi và sáng tạo tốt. Có tài năng trong lĩnh vực giáo dục, truyền thông. Tiêu cực là dễ hành động bốc đồng, lời nói thiếu suy nghĩ. Có thể kiêu ngạo, xem thường người khác, gây ra xung đột với cấp trên.
- Ngọ (+Hỏa) - Thực Thần: Có tài năng nghệ thuật, biểu diễn xuất chúng. Có khả năng sáng tạo và thể hiện bản thân tốt. Tiêu cực là "Mộc bị thiêu cháy". Năng lượng bị tiết xuất quá nhiều. Dễ cảm thấy mệt mỏi, kiệt sức vì công việc, con cái.
- Thìn, Tuất (+Thổ) - Chính Tài: Có khả năng quản lý tài chính tốt, có thể có được tài sản từ đất đai (Thìn), hoặc rèn luyện tính kiên trì, chăm chỉ trong việc kiếm tiền (Tuất). Tiêu cực là kiếm tiền không dễ dàng, phải nỗ lực nhiều (Thìn), hoặc Tuất là đất khô nóng, cây cỏ khó sống, kiếm tiền cực kỳ khó khăn, trong môi trường khắc nghiệt (Tuất).
- Sửu, Mùi (-Thổ) - Thiên Tài: Có thể có những khoản thu nhập bất ngờ từ đất đai, bất động sản (Sửu), hoặc Mùi là đất khô nhưng lại là kho của Mộc, có khả năng tích lũy tài sản, có "của ăn của để" (Mùi). Tiêu cực là Sửu là đất ẩm lạnh, cây khó phát triển, cơ hội kiếm tiền không nhiều, tài chính bấp bênh (Sửu), hoặc kiếm tiền phải trải qua nhiều vất vả, cạnh tranh (Mùi).
- Thân (+Kim) - Thiên Quan: Rèn luyện ý chí sinh tồn phi thường. Tiêu cực là áp lực từ mọi phía, cảm giác như bị dao kề cổ. Sức khỏe suy yếu, đặc biệt là gan, mật, hệ thần kinh. Cuộc sống luôn đầy rẫy khó khăn, thử thách.
- Dậu (-Kim) - Chính Quan: Rèn luyện khả năng làm việc trong môi trường có kỷ luật, áp lực cao. Tiêu cực là áp lực công việc rất lớn. Dễ bị căng thẳng, mệt mỏi. Nữ mệnh có chồng gia trưởng, độc đoán.
- Hợi (-Thủy) - Chính Ấn: Có nền tảng gia đình, học vấn tốt. Được mẹ yêu thương, che chở. Tiêu cực là dễ sinh ra tính ỷ lại, thiếu nỗ lực cá nhân. Nếu Thủy quá nhiều, cây sẽ bị úng rễ, khó phát triển.
- Tý (+Thủy) - Thiên Ấn: Có trực giác tốt, thông minh, có khả năng học hỏi các lĩnh vực độc đáo. Tiêu cực là Tý là đất bại của Mộc. Nước quá lạnh làm cây khó sống. Dễ bị cô độc, mối quan hệ với mẹ không tốt. Sức khỏe dễ bị ảnh hưởng bởi yếu tố hàn (lạnh).`,
      },
      {
        name: "Bính",
        thapThanText: `- Tỵ (-Hỏa) - Tỷ Kiên: Là gốc rễ vững chắc (Lộc), mang lại sự tự chủ, năng lượng dồi dào và khả năng thực thi tốt. Giúp Bính Hỏa trở nên mạnh mẽ và quyết đoán hơn. Tiêu cực: Cực kỳ cố chấp và nóng nảy. Có xu hướng tự làm theo ý mình, không linh hoạt. Dễ gây ra mâu thuẫn vì sự bướng bỉnh.
- Ngọ (+Hỏa) - Kiếp Tài: Đây là nơi Bính Hỏa cường nhất (Đế cường). Mang lại quyền lực, sức ảnh hưởng và khả năng lãnh đạo tuyệt đối. Ý chí kiên cường, không gì lay chuyển được. Tiêu cực: Cực kỳ nóng nảy, độc đoán và chuyên quyền. Không chấp nhận sự phản đối. Có thể trở nên tàn bạo nếu không được kiểm soát.
- Thìn, Tuất (+Thổ) - Thực Thần: Có khả năng sáng tạo, có thể tạo ra những thành quả nhất định (Thìn), hoặc Tuất là đất khô nóng (Hỏa khố), giúp Bính Hỏa có nơi để thể hiện tài năng. Có khả năng sáng tạo nghệ thuật, biểu diễn tốt (Tuất). Tiêu cực là Thìn là đất ẩm, làm Hỏa bị yếu đi rất nhiều. Tài năng, sự sáng tạo không được thể hiện một cách rực rỡ, dễ bị che lấp hoặc hiểu lầm (Thìn), hoặc vẫn làm giảm độ sáng của Bính Hỏa. Có thể trở nên quá đam mê hưởng thụ, vui chơi mà quên đi trách nhiệm (Tuất).
- Sửu, Mùi (-Thổ) - Thương Quan: Có thể có những ý tưởng độc đáo nhưng khó thực hiện (Sửu), hoặc có tài năng trong các lĩnh vực nghệ thuật, thủ công (Mùi). Tiêu cực là Sửu là đất ẩm lạnh, làm Hỏa bị mất nhiệt. Đây là loại Thương Quan xấu nhất, khiến Bính Hỏa mất đi sức sống, trở nên u uất, bi quan (Sửu), hoặc Mùi là đất khô, vẫn làm Hỏa bị tối đi. Dễ trở nên kiêu ngạo, tự mãn với những thành quả nhỏ. Có thể nói năng thiếu suy nghĩ, gây mất lòng (Mùi).
- Dậu (-Kim) - Chính Tài: Có thu nhập ổn định, đều đặn. Có khả năng quản lý tài chính tốt. Tiêu cực: Dễ trở nên quá tính toán, chi li. Có thể vì quá tập trung vào các khoản lợi nhỏ mà bỏ qua cơ hội lớn.
- Thân (+Kim) - Thiên Tài: Rất nhạy bén với các cơ hội kinh doanh, đầu tư. Có thể kiếm được những khoản tiền lớn bất ngờ. Tiêu cực: Tài chính cực kỳ bấp bênh. Dễ bị thua lỗ nặng nếu đầu tư mạo hiểm. Tiền vào nhanh nhưng ra cũng nhanh.
- Tý (+Thủy) - Chính Quan: Rèn luyện Bính Hỏa trong môi trường kỷ luật, có nguyên tắc. Tiêu cực: Áp lực công việc lớn, luôn cảm thấy bị gò bó, kiểm soát. Cấp trên nghiêm khắc. Dễ gặp các vấn đề về sức khỏe liên quan đến tim mạch, mắt.
- Hợi (-Thủy) - Thiên Quan: Nếu có Mộc mạnh, có thể biến áp lực thành động lực, đạt được quyền lực. Tiêu cực: Áp lực đến một cách âm thầm nhưng mạnh mẽ. Luôn phải đối mặt với nguy hiểm, kẻ thù mạnh. Sức khỏe và tinh thần bị bào mòn nghiêm trọng.
- Dần (+Mộc) - Chính Ấn: Dần là đất trường sinh của Bính Hỏa. Đây là nguồn hỗ trợ mạnh mẽ và bền vững nhất. Vô cùng thông minh, có tài năng và luôn có quý nhân phù trợ lúc khó khăn. Tiêu cực: Có thể vì có người chống lưng mà trở nên lười biếng, thiếu đi nỗ lực cá nhân.
- Mão (-Mộc) - Thiên Ấn: Có nền tảng học vấn tốt, được gia đình yêu thương, che chở. Thông minh, có lòng nhân ái. Tiêu cực: Đôi khi quá hiền lành, thiếu đi sự mạnh mẽ cần thiết để đối mặt với sóng gió.`,
      },
      {
        name: "Mậu",
        thapThanText: `- Thìn, Tuất (+Thổ) - Tỷ Kiên: Mang lại cho Mậu Thổ sự thông minh và tầm nhìn chiến lược. Có tham vọng, biết cách quản lý nguồn lực (Thìn), hoặc cực kỳ trung thành, thẳng thắn và có tinh thần nghĩa hiệp. Là người bạn, người đồng đội đáng tin cậy nhất (Tuất). Tiêu cực là nội tâm phức tạp, khó đoán. Có thể trở nên quá tham vọng, dùng thủ đoạn để cạnh tranh (Thìn), hoặc nóng nảy, hiếu thắng, dễ gây gổ khi bị khiêu khích. Cứng nhắc, đôi khi quá thẳng thắn đến mức làm mất lòng người khác (Tuất).
- Sửu, Mùi (-Thổ) - Kiếp Tài: Mang lại sự kiên trì, nhẫn nại từ bên trong. Làm việc chăm chỉ, cần mẫn và có khả năng tích lũy một cách âm thầm, bền bỉ (Sửu), hoặc giúp Mậu Thổ trở nên ấm áp, biết quan tâm đến người khác hơn. Có khả năng thuyết phục và tạo dựng các mối quan hệ xã hội tốt (Mùi). Tiêu cực là bướng bỉnh một cách thầm lặng, khó chia sẻ. Dễ bị ảnh hưởng bởi các mối quan hệ bạn bè, dẫn đến hao tài một cách không đáng có (Sửu), hoặc nội tâm dễ thay đổi, "sáng nắng chiều mưa". Có thể vì quá cả nể bạn bè mà chịu thiệt thòi về mình (Mùi).
- Thân (+Kim) - Thực Thần: Cực kỳ thông minh, đa tài, học nhanh hiểu rộng. Có khả năng ứng biến xuất sắc, giỏi trong việc kinh doanh, đầu tư và các hoạt động mang tính di chuyển. Tiêu cực là "cả thèm chóng chán", thiếu sự kiên trì đến cùng. Dễ dùng tài năng của mình vào những việc mang tính đầu cơ, rủi ro cao.
- Dậu (-Kim) - Thương Quan: Khả năng ăn nói xuất chúng, có tài hùng biện, tranh luận. Thích hợp với các công việc cần đến giao tiếp như luật sư, giáo viên, diễn giả. Tiêu cực là thích chỉ trích, phán xét. Dễ vướng thị phi từ lời nói của mình. Hay khoe khoang, tự phụ.
- Hợi (-Thủy) - Chính Tài: Có khả năng quản lý các dòng tiền lớn, có tầm nhìn trong kinh doanh. Thường có những khoản thu nhập lớn, bất ngờ. Tiêu cực là dễ gặp rủi ro về tài chính nếu đầu tư mạo hiểm. Tiền bạc có tính lưu động cao, khó giữ được lâu.
- Tý (+Thủy) - Thiên Tài: Rất thông minh và nhạy bén với các cơ hội kiếm tiền. Có nhiều nguồn thu nhập, giỏi xoay sở tài chính. Tiêu cực là dễ tham gia vào các hoạt động đầu cơ, cờ bạc. Tiền bạc đến và đi nhanh chóng, cuộc sống tài chính không ổn định.
- Mão (-Mộc) - Chính Quan: Có ý thức tự giác cao, làm việc có nguyên tắc và được mọi người tôn trọng. Thích hợp làm trong các cơ quan nhà nước, tổ chức lớn. Tiêu cực là dễ trở nên quá cứng nhắc, thiếu linh hoạt. Luôn cảm thấy bị áp lực về mặt tinh thần, khó mà thoải mái.
- Dần (+Mộc) - Thiên Quan: Có khí phách, quyền uy, không sợ hãi. Có tố chất của một nhà lãnh đạo, một người tiên phong, dám đối mặt với mọi thử thách. Tiêu cực là cuộc sống luôn đầy rẫy sự cạnh tranh và áp lực. Dễ gặp tai nạn, các vấn đề liên quan đến pháp luật. Tính cách nóng nảy, độc đoán.
- Ngọ (+Hỏa) - Chính Ấn: Cực kỳ thông minh, có đam mê học hỏi mãnh liệt. Có bằng cấp cao, kiến thức uyên bác và được xã hội công nhận. Tiêu cực là tính khí nóng nảy, thiếu kiên nhẫn. Đôi khi quá tự tin vào kiến thức của mình mà trở nên kiêu ngạo.
- Tỵ (-Hỏa) - Thiên Ấn: Vô cùng thông minh, có khả năng nhìn thấu bản chất vấn đề. Có tài năng đặc biệt trong các lĩnh vực nghiên cứu chuyên sâu hoặc những ngành nghề ít người theo đuổi. Tiêu cực là nội tâm phức tạp, hay suy nghĩ. Dễ bị cô lập khỏi đám đông. Mối quan hệ với người thân (đặc biệt là mẹ) có thể xa cách.`,
      },
      {
        name: "Kỷ",
        thapThanText: `- Sửu, Mùi (-Thổ) - Tỷ Kiên: Vô cùng kiên định, nhẫn nại, có sức chịu đựng phi thường. Chăm chỉ, cần cù, làm việc không mệt mỏi và rất đáng tin cậy (Sửu), hoặc khéo léo, tinh tế, có khả năng xã giao tốt. Tốt bụng, có lòng trắc ẩn, biết cách chăm sóc người khác một cách ấm áp (Mùi). Tiêu cực là bướng bỉnh, lầm lì, một khi đã quyết thì khó ai lay chuyển. Hướng nội quá mức, khó bộc lộ cảm xúc (Sửu), hoặc dễ nóng nảy, thiếu kiên nhẫn khi mọi việc không như ý. Nội tâm phức tạp, hay thay đổi, đôi khi đa sầu đa cảm và dễ bị tổn thương (Mùi).
- Thìn, Tuất (+Thổ) - Kiếp Tài: Thông minh, có tài năng lãnh đạo và khả năng thích ứng cao. Có tham vọng, biết cách tận dụng các mối quan hệ để phát triển (Thìn), hoặc trung thành, thẳng thắn, có tinh thần nghĩa hiệp. Rất nhạy bén, có khả năng phán đoán tốt (Tuất). Tiêu cực là nhiều mưu mẹo, khó lường, đôi khi không đáng tin cậy. Dễ vướng vào thị phi, tranh chấp (Thìn), hoặc nóng nảy, hiếu thắng, dễ gây gổ. Đôi khi quá thẳng thắn làm mất lòng người khác (Tuất).
- Dậu (-Kim) - Thực Thần: Thông minh, hoạt bát, có tài ăn nói và khả năng thuyết phục. Rất giỏi trong việc thể hiện bản thân. Có tài năng trong lĩnh vực nghệ thuật, giải trí. Tiêu cực là thích khoe khoang, nói nhiều nhưng làm ít. Hay chỉ trích, phán xét người khác. Dễ vướng vào các mối quan hệ phức tạp, đào hoa.
- Thân (+Kim) - Thương Quan: Đa tài, linh hoạt, học một biết mười. Giỏi bắt chước, có khả năng ứng biến xuất sắc trong mọi tình huống. Có nhiều ý tưởng độc đáo. Tiêu cực là hay thay đổi, thiếu kiên định, "cả thèm chóng chán". Đôi khi dùng sự thông minh vào những việc không chính đáng, thích đi đường tắt.
- Tý (+Thủy) - Chính Tài: Thông minh, biết cách quản lý tiền bạc một cách khôn ngoan. Có khả năng kiếm tiền từ nhiều nguồn nhỏ, tích tiểu thành đại. Tiêu cực là hay tính toán chi li, đôi khi quá cẩn thận mà bỏ lỡ cơ hội lớn. Dễ lo lắng về những khoản tiền nhỏ.
- Hợi (-Thủy) - Thiên Tài: Có tầm nhìn xa, giỏi nắm bắt các cơ hội kinh doanh lớn. Thông minh, có thể kiếm được những khoản tiền lớn một cách bất ngờ. Tiêu cực là dễ bị cuốn vào các dự án đầu tư mạo hiểm, có thể dẫn đến thua lỗ nặng. Quản lý tài chính kém, tiền vào nhanh ra cũng nhanh.
- Dần (+Mộc) - Chính Quan: Có uy quyền, dũng cảm, có tố chất của người lãnh đạo. Có chí tiến thủ, không ngừng nỗ lực để đạt được vị trí cao trong sự nghiệp. Tiêu cực là dễ trở nên độc đoán, chuyên quyền. Thích kiểm soát người khác, gây áp lực cho cấp dưới.
- Mão (-Mộc) - Thiên Quan: Rất nhạy bén, có khả năng nắm bắt tình hình nhanh chóng. Thích hợp với các công việc đòi hỏi sự cạnh tranh cao, kỷ luật thép. Tiêu cực là gặp nhiều áp lực từ mọi phía. Dễ bị căng thẳng thần kinh, nóng vội. Cần cẩn thận với các vấn đề liên quan đến kiện tụng, tranh chấp.
- Tỵ (-Hỏa) - Chính Ấn: Thông minh, sáng dạ, có khả năng học hỏi nhanh. Có trực giác tốt, tư duy logic. Luôn nhận được sự giúp đỡ từ người lớn tuổi hoặc cấp trên. Tiêu cực là dễ bị che giấu, nội tâm phức tạp. Đôi khi quá tự tin vào sự thông minh của mình mà trở nên chủ quan.
- Ngọ (+Hỏa) - Thiên Ấn: Rất thông minh, có tài năng nổi bật và đam mê mãnh liệt. Có khả năng thành công lớn trong các lĩnh vực đòi hỏi sự sáng tạo và cảm hứng đặc biệt. Tiêu cực là nóng nảy, thiếu kiên nhẫn, làm việc theo cảm hứng. Dễ bị cô đơn, cảm thấy không ai hiểu mình. Có thể gặp khó khăn trong việc duy trì các mối quan hệ lâu dài.`,
      },
      {
        name: "Tân",
        thapThanText: `- Dậu (-Kim) - Tỷ Kiên: Là gốc rễ vững chắc (Lâm Quan), mang lại sự tự chủ và khả năng chuyên môn cao. Rất giỏi trong các công việc đòi hỏi sự tỉ mỉ, chính xác. Tiêu cực là cực kỳ cố chấp và bảo thủ. Lời nói rất sắc bén, dễ làm mất lòng người khác. Có xu hướng tự cô lập mình.
- Thân (+Kim) - Kiếp Tài: Giúp Tân Kim trở nên năng động, đa tài và hoạt bát hơn. Có khả năng ứng biến linh hoạt. Tiêu cực là dễ bị người khác lấn át, cướp công. Các mối quan hệ xã hội có thể mang lại nhiều phiền toái hơn là lợi ích. Dễ bị hao tán tiền bạc.
- Tý (+Thủy) - Thực Thần: Có khả năng sáng tạo độc đáo. Tư duy thông minh, sắc sảo và có chiều sâu. Có thể thành công trong các lĩnh vực nghệ thuật, biểu diễn. Tiêu cực là dễ trở nên lạnh lùng, khó gần. Có xu hướng nổi loạn ngầm, không thích bị gò bó.
- Hợi (-Thủy) - Thương Quan: Rất thông minh, có khả năng học hỏi và thể hiện bản thân tốt. Có tài năng trong kinh doanh, ngoại giao. Tiêu cực là dễ dùng sự thông minh của mình để chỉ trích người khác. Có thể hơi phóng túng, thiếu ổn định trong cuộc sống.
- Dần (+Mộc) - Chính Tài: Có ý chí kiếm tiền, không ngại khó khăn. Có thể có được những khoản thu nhập lớn nếu nỗ lực hết mình. Tiêu cực là luôn phải đối mặt với sự cạnh tranh và thử thách lớn về tài chính. Dễ bị hao tài vì các dự án quá sức.
- Mão (-Mộc) - Thiên Tài: Có tài năng trong việc kinh doanh các mặt hàng nhỏ, mang tính thẩm mỹ. Có nhiều cơ hội kiếm tiền nhưng không lớn. Tiêu cực là tiền bạc đến và đi nhanh chóng. Dễ bị xung khắc (Mão Dậu xung), gây ra sự bất ổn, mất mát về tài chính.
- Tỵ (-Hỏa) - Chính Quan: Có cơ hội làm việc trong các tổ chức lớn, có danh tiếng. Được cấp trên ưu ái, nâng đỡ. Tiêu cực là môi trường làm việc có nhiều áp lực. Dễ bị căng thẳng thần kinh. Cần chú ý các vấn đề về tim mạch, khí huyết.
- Ngọ (+Hỏa) - Thiên Quan: Rèn luyện ý chí mạnh mẽ, khả năng chịu đựng áp lực phi thường. Nếu vượt qua được sẽ có thành tựu. Tiêu cực là áp lực công việc, cuộc sống cực lớn. Luôn cảm thấy như bị thiêu đốt, mệt mỏi, kiệt sức. Sức khỏe và tinh thần bị bào mòn nghiêm trọng.
- Thìn, Tuất (+Thổ) - Chính Ấn: Thìn là đất ẩm, có thể nhận được sự hỗ trợ về vật chất, đất đai (Thìn), hoặc có thể có hứng thú với tôn giáo, huyền học như một lối thoát (Tuất). Tiêu cực là vẫn là hình ảnh đất chôn vùi Kim. Dù đất ẩm có phần tốt hơn đất khô nhưng vẫn khiến Tân Kim mất đi sự tỏa sáng (Thìn), hoặc Tuất là đất khô nóng, là loại Chính Ấn xấu nhất. Chôn vùi Tân Kim một cách triệt để, khiến Kim vừa bị bẩn vừa trở nên giòn, dễ vỡ (Tuất).
- Sửu, Mùi (-Thổ) - Thiên Ấn: Sửu là đất ẩm lạnh, có thể có sự ổn định về mặt vật chất. Hứng thú với những kiến thức cổ, truyền thống (Sửu), hoặc có thể có một chút tài sản, đất đai nhưng không lớn (Mùi). Tiêu cực là làm bẩn và khiến trang sức mất đi vẻ óng ả. Cuộc sống có phần cô độc, lạnh lẽo, thiếu sự ấm áp (Sửu), hoặc Mùi là đất khô nóng, làm bẩn và khiến trang sức trở nên giòn. Dễ bị người khác giúp đỡ một cách nhiệt tình nhưng lại gây hại (Mùi).`,
      },
      {
        name: "Nhâm",
        thapThanText: `- Hợi (-Thủy) - Tỷ Kiên: Là gốc rễ vững chắc của Nhâm Thủy (Lâm Quan). Mang lại sự thông minh, tự chủ và khả năng độc lập tác chiến. Có nhiều bạn bè tốt, sẵn sàng giúp đỡ. Tiêu cực là rất bướng bỉnh và có xu hướng tự làm theo ý mình, không nghe ai. Có thể trở nên quá tự tin vào bản thân dẫn đến thất bại.
- Tý (+Thủy) - Kiếp Tài: Mang lại cho Nhâm Thủy ý chí sắt đá và tham vọng quyền lực (Đế cường). Vô cùng thông minh, mưu lược, có khả năng lãnh đạo và thu phục lòng người. Tiêu cực là cạnh tranh cực kỳ khốc liệt. Có tính chiếm hữu cao, có thể dùng mọi thủ đoạn để đạt được mục đích. Dễ gây ra tranh đoạt về tiền bạc, tình cảm.
- Dần (+Mộc) - Thực Thần: Vô cùng năng động, có tài năng trong nhiều lĩnh vực, đặc biệt là kinh doanh và khám phá. Dám nghĩ dám làm, không ngại thử thách. Tiêu cực là dễ bốc đồng, làm việc theo cảm hứng. Có thể hơi liều lĩnh, "được ăn cả, ngã về không".
- Mão (-Mộc) - Thương Quan: Có tài năng nghệ thuật, văn chương xuất chúng. Lời nói duyên dáng, có sức hấp dẫn. Rất thông minh và nhạy bén với thời cuộc. Tiêu cực là dễ quá đa tình, không chung thủy. Hay chỉ trích, phán xét người khác. Dễ bị cảm xúc chi phối hành động.
- Ngọ (+Hỏa) - Chính Tài: Có cơ hội kiếm được những khoản tiền lớn và ổn định. Có đam mê và nhiệt huyết với công việc, dễ đạt được thành công về tài chính. Tiêu cực là dễ xảy ra xung đột, mâu thuẫn (Thủy Hỏa giao tranh). Tài chính có thể lên xuống thất thường nếu không biết quản lý tốt.
- Tỵ (-Hỏa) - Thiên Tài: Rất nhạy bén với các cơ hội đầu tư, kinh doanh. Có thể kiếm được những khoản tiền lớn một cách bất ngờ. Tiêu cực là tài chính cực kỳ biến động, rủi ro cao. Dễ gặp phải các vấn đề tranh chấp liên quan đến tiền bạc.
- Sửu, Mùi (-Thổ) - Chính Quan: Sửu mang lại sự ổn định và tinh thần trách nhiệm. Giúp họ kiên trì hơn trong việc theo đuổi mục tiêu sự nghiệp (Sửu), hoặc nếu trong mệnh có Kim mạnh để thông quan, có thể đạt được chức vụ trong các lĩnh vực liên quan đến đất đai, xây dựng (Mùi). Tiêu cực là Sửu là đất ẩm lạnh, làm giảm sức mạnh của Nhâm Thủy. Công việc có nhiều quy tắc ngầm, áp lực không rõ ràng nhưng dai dẳng (Sửu), hoặc Mùi là đất khô nóng, gây ra sự xung khắc mạnh. Công việc có nhiều áp lực rõ ràng, đòi hỏi cao, dễ xảy ra mâu thuẫn trực diện với cấp trên hoặc luật lệ (Mùi).
- Thìn, Tuất (+Thổ) - Thiên Quan: Thìn là kho chứa nước, là Thiên Quan nhưng lại là nơi Nhâm Thủy có thể nương tựa. Mang lại quyền lực lớn lao, khả năng quản lý các dự án tầm cỡ (Thìn), hoặc rèn luyện ý chí kiên cường, không sợ hãi. Nếu vượt qua được sẽ đạt được vị thế và quyền lực mà không ai sánh bằng (Tuất). Tiêu cực là cuộc sống luôn đầy rẫy những trận chiến lớn. Áp lực cực đại, đòi hỏi phải luôn mạnh mẽ (Thìn), hoặc Tuất là đất khô nóng và là "lưới trời", gây ra sự khắc chế mạnh nhất. Đây là thử thách sinh tử, hiểm nguy bậc nhất. Dễ gặp tai nạn, bệnh tật hiểm nghèo, kiện tụng, tù tội (Tuất).
- Dậu (-Kim) - Chính Ấn: Rất thông minh, có năng khiếu học thuật và nghệ thuật. Có khả năng tiếp thu kiến thức tốt và được sự hỗ trợ từ gia đình. Nguồn nước được bồi đắp liên tục. Tiêu cực là đôi khi quá lý thuyết, thiếu tính thực tế. Dễ bị ám ảnh bởi sự hoàn hảo. Dễ bị vướng vào các mối quan hệ tình cảm phức tạp (đào hoa).
- Thân (+Kim) - Thiên Ấn: Cực kỳ thông minh, đa tài, học một biết mười. Có khả năng thành công trong nhiều lĩnh vực khác nhau, đặc biệt là những ngành nghề đòi hỏi tư duy linh hoạt. Tiêu cực là "cả thèm chóng chán", không kiên trì theo đuổi đến cùng. Dễ thay đổi, thiếu sự ổn định trong định hướng.`,
      },
      {
        name: "Quý",
        thapThanText: `- Tý (+Thủy) - Tỷ Kiên: Đây là gốc rễ vững chắc nhất của Quý Thủy (Đế cường), mang lại sự thông minh tột đỉnh và ý chí mạnh mẽ. Có khả năng lãnh đạo ngầm, thu hút người khác đi theo mình. Tiêu cực là rất ương ngạnh, bên ngoài mềm mỏng nhưng bên trong không ai thay đổi được. Có thể rất mưu mẹo, toan tính và có ham muốn kiểm soát mạnh mẽ.
- Hợi (-Thủy) - Kiếp Tài: Cung cấp nguồn năng lượng dồi dào (Lâm Quan), giúp Quý Thủy trở nên tự tin và có sức sống hơn. Có nhiều bạn bè, mối quan hệ xã hội rộng. Tiêu cực là dễ bị cuốn theo đám đông, mất đi bản sắc riêng. Khó giữ được tiền bạc, dễ bị bạn bè vay mượn hoặc lừa gạt.
- Mão (-Mộc) - Thực Thần: Rất thông minh, sáng tạo, có tài năng xuất chúng trong các lĩnh vực văn chương, nghệ thuật, giáo dục. Có khả năng biểu đạt cảm xúc một cách tinh tế. Tiêu cực là nhạy cảm quá mức, dễ bị tổn thương. Đôi khi hơi phù phiếm, chỉ chú trọng đến vẻ bề ngoài.
- Dần (+Mộc) - Thương Quan: Có tài năng đa dạng, có khả năng kinh doanh, đầu tư. Dám mạo hiểm, có chí tiến thủ và không ngừng học hỏi để vươn lên. Tiêu cực là dễ hành động bốc đồng, thiếu suy xét kỹ càng. Tham vọng quá lớn có thể dẫn đến thất bại. Dễ gặp rắc rối với pháp luật, quy định.
- Tỵ (-Hỏa) - Chính Tài: Thông minh, biết cách kiếm tiền và quản lý tài chính một cách khôn ngoan. Thường có những công việc mang lại thu nhập tốt và ổn định. Tiêu cực là hay lo lắng về tiền bạc. Đôi khi hơi tính toán, chi li. Cần cẩn thận kẻo bị lừa gạt tài chính.
- Ngọ (+Hỏa) - Thiên Tài: Có cơ hội kiếm được những khoản tiền lớn. Có đam mê và nhiệt huyết trong công việc kinh doanh, dám chấp nhận rủi ro để có lợi nhuận cao. Tiêu cực là chi tiêu hoang phí, tiền vào nhanh ra cũng nhanh. Dễ bị phá sản nếu đầu tư thất bại. Cuộc sống tài chính đầy biến động.
- Thìn, Tuất (+Thổ) - Chính Quan: Thìn là kho chứa nước, vừa là Quan vừa là gốc rễ của Thủy. Điều này tạo ra một mối quan hệ phức tạp nhưng thuận lợi: cấp trên, tổ chức vừa quản lý vừa tạo điều kiện cho mình phát triển (Thìn), hoặc mang lại tinh thần trách nhiệm và sự tuân thủ kỷ luật. Giúp rèn luyện bản thân trong môi trường áp lực cao để trở nên mạnh mẽ hơn (Tuất). Tiêu cực là dễ bị vướng vào các mối quan hệ chồng chéo, phức tạp trong công việc. Đôi khi cấp trên hay đồng nghiệp cũng chính là đối thủ cạnh tranh ngầm (Thìn), hoặc Tuất là đất khô nóng (Hỏa khố), gây áp lực rất lớn cho Quý Thủy. Môi trường làm việc khắc nghiệt, cấp trên nghiêm khắc, đòi hỏi cao. Dễ bị căng thẳng, mệt mỏi vì công việc (Tuất).
- Sửu, Mùi (-Thổ) - Thiên Quan: Khi có Ấn chế hóa, có thể biến áp lực thành động lực, đạt được quyền lực trong các môi trường đặc thù (nghiên cứu, kỹ thuật). Rèn luyện tính kiên nhẫn (Sửu), hoặc nếu trong mệnh có Mộc mạnh để chế ngự, có thể biến thử thách thành cơ hội để thể hiện tài năng, đạt được thành tựu bất ngờ (Mùi). Tiêu cực là Sửu là đất ẩm lạnh (Kim khố), là Thiên Quan mang tính âm thầm. Áp lực đến từ từ, dai dẳng, khó chịu. Dễ gặp phải tiểu nhân ngấm ngầm hãm hại, các bệnh mãn tính khó chữa (Sửu), hoặc Mùi là đất khô nóng (Mộc khố), Thiên Quan này đến một cách trực diện và mạnh mẽ. Thử thách, kẻ thù xuất hiện rõ ràng. Áp lực công việc rất lớn, dễ bị stress, nóng nảy. Nữ mệnh tình duyên vất vả (Mùi).
- Dậu (-Kim) - Chính Ấn: Có tài năng đặc biệt, tư duy khác người. Có khả năng thành công trong các lĩnh vực đòi hỏi sự tinh xảo và độc đáo. Tiêu cực là tính cách kỳ lạ, khó hòa đồng. Dễ bị ám ảnh bởi những suy nghĩ tiêu cực. Có thể gặp khó khăn trong việc xây dựng các mối quan hệ thân thiết.
- Thân (+Kim) - Thiên Ấn: Rất thông minh, có nguồn kiến thức dồi dào. Có khả năng học hỏi và áp dụng kiến thức một cách linh hoạt. Tiêu cực là đôi khi suy nghĩ quá nhiều mà không hành động. Có xu hướng dựa dẫm vào gia đình, người thân.`,
      },
      {
        name: "Đinh",
        thapThanText: `- Ngọ (+Hỏa) - Tỷ Kiên: Là gốc rễ vững chắc (Lộc), mang lại năng lượng, ý chí và sự tự chủ. Giúp Đinh Hỏa trở nên mạnh mẽ và quyết đoán hơn. Tiêu cực là cực kỳ cố chấp, một khi đã quyết thì không thay đổi. Tính cách nóng nảy, thiếu sự mềm mỏng, linh hoạt.
- Tỵ (-Hỏa) - Kiếp Tài: Mang lại sự tự tin, năng lượng và khả năng cạnh tranh. Có nhiều bạn bè, mối quan hệ xã hội. Tiêu cực là nơi Đế cường của Kiếp Tài. Cạnh tranh cực kỳ khốc liệt. Dễ bị bạn bè lôi kéo, phản bội. Hao tài tốn của vì các mối quan hệ.
- Thìn, Tuất (+Thổ) - Thương Quan: Có đầu óc thông minh, khả năng sáng tạo tốt (Thìn), hoặc là lò lửa, là nơi Đinh Hỏa phát huy tốt nhất khả năng "rèn luyện" của mình. Rất giỏi trong các ngành nghề kỹ thuật, chuyên môn cao, đòi hỏi sự tập trung (Tuất). Tiêu cực là Thìn là đất ẩm, làm Hỏa bị lu mờ. Dễ bị người khác xem thường tài năng. Lời nói có thể kiêu ngạo nhưng không đủ sức thuyết phục (Thìn), hoặc dễ trở nên quá tập trung vào chuyên môn mà khô khan, khó gần. Có thể hơi kiêu ngạo về tài năng của mình (Tuất).
- Sửu, Mùi (-Thổ) - Thực Thần: Rèn luyện tính kiên nhẫn, khả năng làm việc tỉ mỉ trong thời gian dài (Sửu), hoặc là đất khô, chứa Mộc, có thể giúp Đinh Hỏa duy trì sự sáng tạo. Có tài năng trong lĩnh vực nghệ thuật, ẩm thực (Mùi). Tiêu cực là Sửu là đất ẩm lạnh, làm dập tắt ngọn lửa. Khiến Đinh Hỏa mất hết sức sống, trở nên bi quan, u uất. Tài năng và sức khỏe đều bị ảnh hưởng xấu (Sửu), hoặc vẫn làm Hỏa bị yếu đi. Có thể trở nên quá đam mê hưởng thụ, vui chơi mà thiếu đi ý chí phấn đấu (Mùi).
- Dậu (-Kim) - Thiên Tài: Rất nhạy bén với các cơ hội tài chính. Có thể có được những khoản thu nhập bất ngờ. Tiêu cực là tiền bạc đến và đi rất nhanh. Dễ bị thua lỗ vì các quyết định đầu tư vội vàng.
- Thân (+Kim) - Chính Tài: Có nhiều cơ hội kiếm tiền, có khả năng quản lý các dự án tài chính. Tiêu cực là tài chính không ổn định, lúc được lúc mất. Dễ bị công việc làm cho mệt mỏi.
- Tý (+Thủy) - Thiên Quan: Rèn luyện ý chí sinh tồn phi thường. Tiêu cực là áp lực từ mọi phía, cảm giác như bị dồn vào chân tường. Sức khỏe suy yếu, đặc biệt là mắt và hệ tim mạch. Cuộc sống luôn đầy rẫy khó khăn, thử thách.
- Hợi (-Thủy) - Chính Quan: Rèn luyện cho Đinh Hỏa khả năng làm việc trong môi trường có kỷ luật, nguyên tắc. Tiêu cực là áp lực công việc đến một cách âm thầm nhưng mạnh mẽ. Luôn cảm thấy bị kiểm soát, gò bó. Nữ mệnh có chồng gia trưởng.
- Dần (+Mộc) - Chính Ấn: Là nguồn hỗ trợ mạnh mẽ và vững chắc. Có nền tảng gia đình, học vấn tốt. Luôn có người giúp đỡ lúc khó khăn. Tiêu cực là có thể vì được che chở quá mức mà trở nên thiếu kinh nghiệm sống, hơi ngây thơ.
- Mão (-Mộc) - Thiên Ấn: Rất thông minh, có năng khiếu trong các lĩnh vực nghệ thuật, thủ công. Có trực giác tốt. Tiêu cực là dễ "cả thèm chóng chán", không theo đuổi kiến thức đến cùng. Suy nghĩ có phần kỳ lạ, khó hòa đồng, dễ cảm thấy cô độc.`,
      },
      {
        name: "Canh",
        thapThanText: `- Thân (+Kim) - Tỷ Kiên: Là gốc rễ vững chắc (Lâm Quan), mang lại sự thông minh, năng động và đa tài. Rất giỏi trong việc thực thi, hành động nhanh nhẹn, dứt khoát. Tiêu cực là rất hiếu thắng, thích cạnh tranh và có phần liều lĩnh. Dễ thay đổi, thiếu sự ổn định lâu dài. Cần cẩn thận với tai nạn xe cộ, va chạm.
- Dậu (-Kim) - Kiếp Tài: Giúp Canh Kim có khả năng ăn nói tốt hơn, biết cách thể hiện bản thân một cách duyên dáng (Đế cường). Có thể thành công trong các lĩnh vực cần sự kết hợp giữa sức mạnh và vẻ đẹp. Tiêu cực là dễ vướng vào các cuộc tranh cãi, thị phi. Có thể bị hao tài vì các mối quan hệ xã hội. Dễ có các vấn đề liên quan đến tình cảm, tửu sắc.
- Hợi (-Thủy) - Thực Thần: Rất thông minh, có tầm nhìn xa. Có khả năng học hỏi và sáng tạo không ngừng. Thích hợp với các công việc đòi hỏi tư duy và sự di chuyển. Tiêu cực là dễ hành động theo cảm tính. Có thể hơi thiếu thực tế, suy nghĩ nhiều hơn làm. Năng lượng bị tiết xuất quá nhiều.
- Tý (+Thủy) - Thương Quan: Cực kỳ thông minh, có tài năng xuất chúng và khả năng sáng tạo độc đáo. Có thể tạo ra những thành tựu đột phá. Tiêu cực là thích nổi loạn, không chịu sự gò bó. Dễ gặp rắc rối với pháp luật. Có xu hướng cô độc, khó hòa nhập. Kim bị Thủy lạnh làm cho "chết", mất đi sự ấm áp.
- Mão (-Mộc) - Chính Tài: Có khả năng quản lý tài chính tốt, biết cách tích lũy. Có thu nhập ổn định từ công việc chăm chỉ. Tiêu cực là dễ trở nên quá tính toán, chi li. Có thể gặp khó khăn trong việc kiếm tiền vì Mão Mộc là Âm Mộc yếu ớt so với Canh Kim.
- Dần (+Mộc) - Thiên Tài: Có khí phách, dám nghĩ dám làm trong kinh doanh. Có khả năng kiếm được những khoản tiền lớn thông qua đầu tư, mạo hiểm. Tiêu cực là tài chính rất bấp bênh. Dễ gặp rủi ro lớn trong đầu tư, có thể mất trắng. Cần cẩn thận với các vấn đề liên quan đến xe cộ.
- Ngọ (+Hỏa) - Chính Quan: Có tinh thần trách nhiệm cao, ý chí mạnh mẽ để theo đuổi công danh. Có cơ hội làm lãnh đạo, quản lý trong môi trường có kỷ luật cao. Tiêu cực là áp lực công việc rất lớn, luôn trong trạng thái căng thẳng. Dễ bị các bệnh liên quan đến tim mạch, huyết áp. Tính cách có phần nóng nảy, cứng nhắc.
- Tỵ (-Hỏa) - Thiên Quan: Có khả năng làm việc dưới áp lực cao. Rất quyết đoán và có uy quyền trong lĩnh vực của mình. Tỵ là đất trường sinh của Canh Kim, nên dù là Sát nhưng vẫn có yếu tố hỗ trợ ngầm. Tiêu cực là luôn phải đối mặt với sự cạnh tranh khốc liệt và nguy hiểm. Dễ gặp tai nạn, kiện tụng. Sức khỏe dễ bị ảnh hưởng, đặc biệt là hệ hô hấp.
- Sửu, Mùi (-Thổ) - Chính Ấn: Mang lại sự hỗ trợ bền bỉ, kiên trì. Có sự giúp đỡ từ gia đình, người thân một cách thầm lặng (Sửu), hoặc có sự hỗ trợ về mặt vật chất, đất đai. Có thể được thừa hưởng tài sản (Mùi). Tiêu cực là Sửu là mộ của Kim, vừa là Ấn vừa là nơi chôn vùi. Khiến Canh Kim trở nên chậm chạp, hướng nội, thiếu sự năng động. Dễ bị bao bọc quá mức, mất đi cơ hội để rèn luyện và tỏa sáng (Sửu), hoặc Mùi là đất khô nóng, làm cho Kim trở nên giòn và dễ gãy. Sự hỗ trợ này có thể đi kèm với điều kiện, hoặc đến từ những người nóng nảy, khiến bản thân cảm thấy không thoải mái, áp lực (Mùi).
- Thìn, Tuất (+Thổ) - Thiên Ấn: Thìn là đất ẩm, có thể sinh Kim mà không làm Kim bị khô giòn. Đây là loại Thiên Ấn tốt, mang lại sự hỗ trợ thông minh, giúp phát huy tài năng. Có quý nhân giúp đỡ một cách khéo léo (Thìn), hoặc rèn luyện ý chí và sự kiên định. Có thể có hứng thú với các lĩnh vực huyền học, tôn giáo (Tuất). Tiêu cực là dù tốt nhưng nếu quá nhiều Thổ vẫn sẽ làm Kim bị chôn vùi. Dễ trở nên ỷ lại, thiếu đi sự quyết đoán cần có (Thìn), hoặc Tuất là đất khô nóng (Hỏa khố), là loại Thiên Ấn xấu nhất cho Canh Kim. Khiến Kim trở nên cực kỳ giòn, dễ gãy, tính tình cố chấp, bảo thủ đến cực đoan. Sự hỗ trợ nhận được thường đi kèm với áp lực lớn hoặc không thực chất (Tuất).`,
      },
    ];
    let thapThanText = thapThan.find(
      (item) => item.name === nhatChuName
    ).thapThanText;
    return thapThanText;
  };

  const getNapAm = (napAm) => {
    if (!napAm) return "";
    let napAmData = [
      {
        name: "KIẾM PHONG KIM",
        description: `KIẾM PHONG KIM (Vũ Khí)
•	Nguồn Gốc Can Chi: Nhâm Thân, Quý Dậu
•	Hình Tượng & Bản Chất: Là kim loại đã được tôi luyện đến độ cứng rắn và sắc bén cao nhất. Nó là biểu tượng của vũ khí, quyền lực, kỷ luật thép và sự quyết đoán. Mang sát khí mạnh, có công năng chặt, chém và phân định rạch ròi.
•	Đặc tính đột biến (Tổng quát): Cần Hỏa để tôi luyện nên không sợ Hỏa ở mức độ vừa phải. Cần Thủy để mài dũa cho thêm sắc bén. Gặp Mộc thì thể hiện được hết công năng của mình.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này cương trực, ý chí sắt đá, quyết đoán, có tài năng lãnh đạo và giỏi thực thi. Họ sống có mục tiêu rõ ràng, không ngại va chạm để bảo vệ quan điểm. Tuy nhiên, họ có thể quá cứng nhắc, lạnh lùng, dễ gây tổn thương cho người khác.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự sắc bén & Nguy cơ của sự tàn phá. Đây là dạng Kim đã đạt đến đỉnh cao của công năng và sức mạnh. Nó đã được tôi luyện (qua Hỏa) và mài dũa (qua Thủy) để trở nên cứng rắn và sắc bén nhất. Sức mạnh của nó là khả năng thực thi, phân định rõ ràng, mang tính quyết đoán và có tác động mạnh mẽ nhất.`,
      },
      {
        name: "KIM BẠCH KIM",
        description: `KIM BẠCH KIM (Kim Loại Thuần Khiết)
•	Nguồn Gốc Can Chi: Nhâm Dần, Quý Mão
•	Hình Tượng & Bản Chất: "Bạch" nghĩa là trắng, tinh khiết. Đây là hình tượng kim loại đã được luyện, tách khỏi tạp chất, trở thành vàng nén, thỏi bạc, kim loại nguyên chất. Nó là biểu tượng của giá trị nội tại, sự cô đọng, tinh túy và thanh khiết.
•	Đặc tính đột biến (Tổng quát): Là Kim duy nhất không có gốc từ Thổ. Nó là sự kết tinh từ quá trình Thủy sinh Mộc. Do đã tinh khiết nên rất kỵ Hỏa (lửa làm ô tạp). Không ưa Thổ (đất làm vẩn đục).
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường có phẩm chất trong sạch, cốt cách thanh cao, ít nói nhưng lời nói có trọng lượng. Họ là những người có giá trị thực chất. Tuy nhiên, họ có thể cô độc, khó hòa hợp với môi trường xô bồ.
•	Ngữ Nghĩa Cốt Lõi: Giá trị của sự tinh khiết & Sự cao quý, xa cách của lý tưởng. Đây là kim loại ở dạng nguyên chất, cô đọng (vàng thỏi, bạc nén). Sức mạnh của nó là giá trị nội tại, sự tinh khiết và là nền tảng để tạo ra các dạng Kim khác. Nó rất mạnh về bản chất nhưng chưa có công năng cụ thể như vũ khí hay trang sức.`,
      },
      {
        name: "SA TRUNG KIM",
        description: `SA TRUNG KIM (Kim Loại Trong Cát)
•	Nguồn Gốc Can Chi: Giáp Ngọ, Ất Mùi
•	Hình Tượng & Bản Chất: Là khoáng sản, quặng kim loại còn lẫn trong đất cát. Nó là biểu tượng của tiềm năng lớn lao nhưng còn ẩn giấu, cần sự khai phá, sàng lọc và tôi luyện mới có thể trở thành vật phẩm có giá trị.
•	Đặc tính đột biến (Tổng quát): Bị Thổ vùi lấp. Cần Thủy để đãi lọc. Cần Hỏa để luyện. Khi chưa khai thác thì không khắc được Mộc.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này có nhiều tài năng tiềm ẩn, kiên nhẫn, có nội lực. Tuy nhiên, nếu không gặp thời, tài năng có thể bị chôn vùi, đôi khi thiếu quyết đoán.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của tiềm năng ẩn giấu & Nguy cơ của sự mai một. Sức mạnh của nó nằm ở dạng tiềm năng. Đây là quặng kim loại, là vàng trong cát, có giá trị lớn nhưng còn bị che lấp và cần được khai phá. Nó mạnh hơn các dạng Kim chưa định hình khác vì đã là khoáng sản rắn chắc, chỉ chờ được khám phá.`,
      },
      {
        name: "THOA XUYẾN KIM",
        description: `THOA XUYẾN KIM (Trang Sức)
•	Nguồn Gốc Can Chi: Canh Tuất, Tân Hợi
•	Hình Tượng & Bản Chất: Là vàng bạc đã được chế tác tinh xảo thành đồ trang sức quý giá. Nó là biểu tượng của sự cao sang, quyền quý, vẻ đẹp, địa vị xã hội và sự giàu có. Không có công năng thực chiến nhưng có giá trị cao về mặt phẩm chất.
•	Đặc tính đột biến (Tổng quát): Vì đã là thành phẩm tinh xảo nên rất kỵ Hỏa, gặp lửa sẽ bị hư hoại. Cần nhất là Thủy để gột rửa, làm cho sáng bóng, tăng thêm vẻ đẹp.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường có khí chất thanh cao, tao nhã, có gu thẩm mỹ tốt và coi trọng danh dự. Họ có số được người khác kính trọng, thường có địa vị trong xã hội. Tuy nhiên, họ có thể kiêu kỳ, xa rời thực tế, thiếu khả năng chịu đựng gian khổ.
•	Ngữ Nghĩa Cốt Lõi: Vẻ đẹp của sự cao quý & Sự yếu đuối khi thiếu thực chiến. Sức mạnh của nó nằm ở giá trị và sự cao quý. Dù không có sức công phá như vũ khí, nó là dạng Kim đã được chế tác tinh xảo, đạt đến đỉnh cao của vẻ đẹp và phẩm chất. Sức mạnh của nó là sự sang trọng, địa vị và giá trị được xã hội công nhận.`,
      },
      {
        name: "HẢI TRUNG KIM",
        description: `HẢI TRUNG KIM (Kim Loại dưới Biển)
•	Nguồn Gốc Can Chi: Giáp Tý, Ất Sửu
•	Hình Tượng & Bản Chất: Là kho tàng kim loại, vàng bạc, châu báu khổng lồ lắng đọng dưới đáy đại dương. Nó là biểu tượng của tiềm năng vĩ đại nhất, của sự giàu có và trí tuệ ở dạng thuần túy, nguyên sơ, được bảo tồn trong sự tĩnh lặng của biển sâu.
•	Đặc tính đột biến (Tổng quát): Bị Thủy bao bọc, không phải là kìm hãm mà là che chở, bảo tồn giá trị. Do đó, nó không sợ Hỏa vì nước biển đã cách ly. Không thể khắc Mộc vì chưa được khai phá. Sức mạnh của nó là nội tại, không phụ thuộc vào các yếu tố bên ngoài.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này có nội lực thâm sâu, trí tuệ uyên bác và tiềm năng cực lớn. Họ giống như một kho báu chưa được khám phá. Cuộc sống của họ thường an tĩnh, không phô trương, nhưng một khi đã gặp được môi trường hoặc con người phù hợp để "khai phá", họ sẽ tạo ra những giá trị phi thường.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của tiềm năng vô hạn & Thử thách của sự khai phá. Đại diện cho tiềm năng và giá trị nội tại lớn nhất. Đây là kho báu nguyên sơ, khổng lồ. Tuy chưa được khai phá nhưng trữ lượng và giá trị tiềm ẩn của nó vượt xa các dạng Kim khác. Sức mạnh của nó là sức mạnh của chiều sâu và sự giàu có vô tận.`,
      },
      {
        name: "BẠCH LẠP KIM",
        description: `BẠCH LẠP KIM (Kim Loại Lỏng)
•	Nguồn Gốc Can Chi: Canh Thìn, Tân Tỵ
•	Hình Tượng & Bản Chất: Là kim loại ở trạng thái ban sơ, đang nóng chảy hoặc chưa thành hình khối rõ ràng, còn lẫn tạp chất. Nó là biểu tượng của sự khởi đầu, khả năng thay đổi nhưng còn non nớt, chưa có giá trị cụ thể.
•	Đặc tính đột biến (Tổng quát): Cần nhất là Hỏa để loại bỏ tạp chất và định hình. Kỵ Thủy mạnh làm nguội lạnh, mất đi khả năng biến đổi. Không có khả năng khắc Mộc.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này có khả năng thích nghi tốt, dễ học hỏi, có tiềm năng lớn. Họ cần một môi trường tốt, một người thầy để định hướng phát triển. Tuy nhiên, họ thiếu tự chủ và khó thành công khi đứng một mình.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự biến đổi & Sự yếu đuối vì chưa định hình. Đây là dạng Kim ở trạng thái yếu và không ổn định nhất. Nó chưa được định hình, còn lẫn tạp chất và dễ bị tác động bởi các yếu tố bên ngoài (cần Hỏa để duy trì, sợ Thủy làm nguội). Sức mạnh duy nhất của nó là khả năng biến đổi, nhưng ở trạng thái hiện tại, nó không có sức mạnh nội tại.`,
      },
      {
        name: "THIÊN THƯỢNG HỎA",
        description: `THIÊN THƯỢNG HỎA (Mặt Trời)
•	Nguồn Gốc Can Chi: Mậu Ngọ, Kỷ Mùi
•	Hình Tượng & Bản Chất: Là hình tượng lửa của mặt trời lúc ban trưa, nguồn sáng lớn nhất, rực rỡ và quang minh nhất, bao trùm vạn vật. Nó là biểu tượng của quyền lực tối cao, sự công bằng, chính trực và năng lượng sống dồi dào.
•	Đặc tính đột biến (Tổng quát): Là vua của các loại Hỏa, không sợ lửa khác. Có thể làm bốc hơi các loại Thủy nhỏ, chỉ có Đại Hải Thủy mới có thể cân bằng lại. Mang lại lợi ích và sự sống cho Mộc và Thổ.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này quang minh, lỗi lạc, có tầm ảnh hưởng lớn và tố chất lãnh đạo. Họ sống công bằng, chính trực và có tấm lòng rộng mở. Tuy nhiên, nếu năng lượng quá mạnh, họ có thể trở nên độc đoán, thiêu đốt những người xung quanh.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự quang minh & Nguy cơ của sự thiêu đốt. Đây là "vua của các loại Hỏa". Sức mạnh của nó là tuyệt đối, bao trùm vạn vật và là nguồn năng lượng của sự sống.`,
      },
      {
        name: "TÍCH LỊCH HỎA",
        description: `TÍCH LỊCH HỎA (Sấm Sét)
•	Nguồn Gốc Can Chi: Mậu Tý, Kỷ Sửu
•	Hình Tượng & Bản Chất: Là lửa sinh ra từ sự va chạm của âm dương trong vũ trụ, là sấm sét vang trời. Nó là biểu tượng của sức mạnh đột phá, sự thay đổi chớp nhoáng, quyền uy của tạo hóa và những biến cố bất ngờ.
•	Đặc tính đột biến (Tổng quát): Là loại Hỏa duy nhất sinh ra từ Thủy (sự giao tranh của mây mưa). Do đó không kỵ Thủy mà còn cần Thủy để xuất hiện. Lửa này có thể mang mưa đến tưới cho Mộc và Thổ.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này có tính cách mạnh mẽ, quyết liệt, có khả năng tạo ra những thay đổi lớn. Họ có thể thành công rất nhanh nhưng cuộc đời cũng đầy biến động. Họ hợp với các ngành nghề đòi hỏi sự táo bạo, đột phá.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự đột phá & Nguy cơ của sự hủy diệt. Tượng trưng cho sức mạnh đột phá, chớp nhoáng và quyền uy của tạo hóa. Sức mạnh của nó mang tính hủy diệt và tái tạo trong khoảnh khắc.`,
      },
      {
        name: "LƯ TRUNG HỎA",
        description: `LƯ TRUNG HỎA (Lửa Trong Lò)
•	Nguồn Gốc Can Chi: Bính Dần, Đinh Mão
•	Hình Tượng & Bản Chất: Là ngọn lửa cháy trong lò, cần có vật liệu (củi, than) và không gian (lò) để duy trì. Nó là biểu tượng của nội lực, tiềm năng cần được nuôi dưỡng, sự tôi luyện và quá trình chuẩn bị để tỏa sáng.
•	Đặc tính đột biến (Tổng quát): Cần nhất là Mộc (củi) để cháy, không có Mộc sẽ tự lụi tàn. Không sợ Thổ (lò) và Kim (vật cần rèn). Rất kỵ Thủy vì sẽ bị dập tắt hoàn toàn.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này có tài năng tiềm ẩn, cần có sự giáo dục, rèn luyện và một môi trường tốt để phát triển. Thành công của họ đến muộn nhưng rất vững chắc. Họ có thể nóng tính nhưng thường không thể hiện ra ngoài.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của nội lực & Sự phụ thuộc vào nhiên liệu. Đây là ngọn lửa có mục đích, tượng trưng cho sức mạnh của sự tôi luyện và nội lực được nuôi dưỡng.`,
      },
      {
        name: "SƠN ĐẦU HỎA",
        description: `SƠN ĐẦU HỎA (Núi Lửa)
•	Nguồn Gốc Can Chi: Giáp Tuất, Ất Hợi
•	Hình Tượng & Bản Chất: Là ngọn lửa âm ỉ bên trong lòng núi, có vẻ ngoài tĩnh lặng nhưng bên trong chứa đựng nguồn năng lượng khổng lồ. Nó là biểu tượng của sức mạnh tiềm tàng, nội lực thâm sâu, sự bùng nổ bất ngờ và khả năng thay đổi cục diện.
•	Đặc tính đột biến (Tổng quát): Vẻ ngoài là Thổ nhưng bản chất là Hỏa. Vì vậy không sợ Thủy thông thường. Lửa này không cần Mộc để cháy, mà tự vận động từ bên trong. Khi phun trào, nó tạo ra Thổ mới.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường có vẻ ngoài điềm tĩnh, ít nói, sống nội tâm nhưng lại có tài năng và ý chí rất lớn. Họ không dễ thể hiện nhưng một khi đã hành động thì vô cùng quyết liệt, tạo ra kết quả phi thường. Thành công của họ thường đến sau một giai đoạn dài tích lũy.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự dồn nén & Sự bùng nổ thay đổi tất cả. Đại diện cho sức mạnh nội lực bị dồn nén đến cực đại rồi bùng nổ. Nó là ngọn lửa của sự chuyển mình từ sâu trong lòng đất.`,
      },
      {
        name: "SƠN HẠ HỎA",
        description: `SƠN HẠ HỎA (Lửa Nhân Tạo)
•	Nguồn Gốc Can Chi: Bính Thân, Đinh Dậu
•	Hình Tượng & Bản Chất: Là ngọn lửa do con người tạo ra dưới chân núi khi màn đêm buông xuống, như lửa trại, lửa lò rèn. Nó là biểu tượng của sự sống, hoạt động của con người, sự ấm áp, cộng đồng và nguồn năng lượng chủ động để xua tan bóng tối.
•	Đặc tính đột biến (Tổng quát): Hỏa ở vào thế "bệnh" và "tử", không phải vì năng lượng yếu, mà vì sự phụ thuộc. Lửa này không thể tự tồn tại, phải dựa vào nhiên liệu (Mộc) để cháy. Không sợ Thổ (núi che gió).
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường nhiệt tình, năng nổ, hướng ngoại và có khả năng khuấy động tập thể. Họ giống như ngọn lửa trại, là trung tâm của sự chú ý. Tuy nhiên, họ có xu hướng "cả thèm chóng chán", cần sự cổ vũ và "nhiên liệu" (động lực, sự công nhận) từ bên ngoài để duy trì đam mê.
•	Ngữ Nghĩa Cốt Lõi: Nhiệt huyết bùng cháy & Sức mạnh phụ thuộc. Là ngọn lửa của cộng đồng, phục vụ nhu cầu của con người, mang tính ứng dụng cao nhưng không ổn định.`,
      },
      {
        name: "PHÚC ĐĂNG HỎA",
        description: `PHÚC ĐĂNG HỎA (Đèn Lồng)
•	Nguồn Gốc Can Chi: Giáp Thìn, Ất Tỵ
•	Hình Tượng & Bản Chất: Là ánh lửa của ngọn đèn do con người tạo ra, dùng để soi sáng vào ban đêm hoặc những nơi khuất. Nó là biểu tượng của tri thức, sự văn minh, niềm vui, sự dẫn đường và sự ấm áp trong một phạm vi nhỏ.
•	Đặc tính đột biến (Tổng quát): Là Hỏa yếu, chỉ phát huy giá trị tốt nhất khi không có Thiên Thượng Hỏa (Mặt Trời). Rất sợ Thủy và gió lớn. Cần Mộc (dầu trong đèn, nến) để duy trì.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường là người mang lại tri thức, niềm vui cho người khác như thầy giáo, nhà tư vấn, nghệ sĩ. Họ thích các hoạt động về đêm. Tuy nhiên, họ có thể yếu đuối, cần sự che chở để tỏa sáng.
•	Ngữ Nghĩa Cốt Lõi: Sự hữu ích của ánh sáng nhân tạo & Sự mong manh trước giông bão. Đây là loại Hỏa yếu nhất về mặt năng lượng vật lý, sức mạnh của nó nằm ở giá trị tinh thần và tri thức.`,
      },
      {
        name: "ĐẠI HẢI THỦY",
        description: `ĐẠI HẢI THỦY (Đại Dương)
•	Nguồn Gốc Can Chi: Nhâm Tuất, Quý Hợi
•	Hình Tượng & Bản Chất: Là hình tượng dòng nước ở trạng thái rộng lớn, mạnh mẽ và hùng vĩ nhất. Nó là biểu tượng của tham vọng lớn, nội lực hùng hậu, tiềm năng vô hạn nhưng cũng chứa đựng sự biến động và khó lường.
•	Đặc tính đột biến (Tổng quát): Là vua của các loại Thủy, không sợ các dòng nước khác mà có thể dung nạp tất cả. Có thể nhấn chìm Thổ, dập tắt Hỏa. Chỉ bị Thổ rất mạnh (như đê điều) ngăn chặn.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường có chí lớn, tư duy khoáng đạt, có tài năng và tiềm năng để làm những việc lớn lao. Họ có sức ảnh hưởng, thu hút người khác. Tuy nhiên, cuộc đời họ thường có nhiều sóng gió, tính tình có thể thất thường, khó đoán.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự vĩ đại & Nguy cơ của sự vô định. Đây là "vua của các loại Thủy". Đại dương là nơi quy tụ của tất cả các dòng nước, có quy mô và sức mạnh lớn nhất, không gì sánh bằng. Nó có thể nhấn chìm vạn vật, dung nạp tất cả các dòng chảy khác. Sức mạnh của nó là tuyệt đối và hùng vĩ.`,
      },
      {
        name: "THIÊN HÀ THỦY",
        description: `THIÊN HÀ THỦY (Nước Mưa)
•	Nguồn Gốc Can Chi: Bính Ngọ, Đinh Mùi
•	Hình Tượng & Bản Chất: Là nước mưa từ trên trời rơi xuống, mang tính phổ quát, ban ơn cho vạn vật. Nó là biểu tượng của sự tinh khôi, lòng nhân ái, sự sáng tạo và những gì mang tính tâm linh, vô hình.
•	Đặc tính đột biến (Tổng quát): Nước từ trời nên không có nguồn từ Kim. Có thể tương tác với Hỏa (sấm sét). Mang lại lợi ích cho toàn bộ Mộc và Thổ, không có sự phân biệt.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường có tâm hồn trong sáng, nhân hậu, có trí tưởng tượng phong phú. Họ có thể thành công trong các lĩnh vực văn hóa, nghệ thuật, giáo dục, tôn giáo. Tuy nhiên, họ có thể hơi mơ mộng, thiếu thực tế.
•	Ngữ Nghĩa Cốt Lõi: Sự màu nhiệm của ân huệ & Sự xa rời thực tế. Mặc dù không có lưu lượng tập trung như sông lớn, nhưng Nước Mưa lại có tầm ảnh hưởng phổ quát nhất. Nó rơi từ trên trời, ban phát sự sống cho cả một vùng rộng lớn không phân biệt. Về mặt quy mô tác động trong một thời điểm (cơn mưa lớn), nó chỉ đứng sau Đại Dương.`,
      },
      {
        name: "TRƯỜNG LƯU THỦY",
        description: `TRƯỜNG LƯU THỦY (Sông Dài)
•	Nguồn Gốc Can Chi: Nhâm Thìn, Quý Tỵ
•	Hình Tượng & Bản Chất: Là dòng sông lớn chảy một chặng đường rất dài, len lỏi qua các địa hình để cuối cùng đổ ra biển. Nó là biểu tượng của sự kiên nhẫn, tầm nhìn xa, khả năng thích ứng và tích lũy theo thời gian.
•	Đặc tính đột biến (Tổng quát): Dòng nước này tự tìm đường đi, có thể biến đổi để phù hợp với Thổ. Không sợ Thổ chặn vì nó sẽ tự tìm đường vòng. Đích đến cuối cùng là gặp được Đại Hải Thủy.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này có khả năng hoạch định dài hạn, suy nghĩ sâu xa, không nóng vội. Họ có thể đạt được thành công lớn khi về già. Tuy nhiên, họ có thể thiếu quyết đoán, chần chừ, mất nhiều thời gian để đi đến mục tiêu.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của tầm nhìn xa & Sự chậm chạp của con đường dài. Đây là hình ảnh dòng sông lớn, có lưu lượng ổn định và sức mạnh bền bỉ theo thời gian. Nó có sức mạnh bào mòn đất đá, thay đổi địa hình và là nguồn sống cho cả một khu vực nó chảy qua. Sức mạnh của nó đến từ sự kiên trì và dòng chảy không ngừng nghỉ.`,
      },
      {
        name: "ĐẠI KHÊ THỦY",
        description: `ĐẠI KHÊ THỦY (Thác Nước)
•	Nguồn Gốc Can Chi: Giáp Dần, Ất Mão
•	Hình Tượng & Bản Chất: Là dòng nước lớn ở đầu nguồn, trong các khe núi, chảy mạnh mẽ, dữ dội nhưng chưa có hướng đi rõ ràng. Nó là biểu tượng của sức sống mãnh liệt, sự nhiệt huyết, thẳng thắn của tuổi trẻ.
•	Đặc tính đột biến (Tổng quát): Vì ở đầu nguồn nên không ưa Kim (chưa cần đến nguồn). Thích gặp các loại Thủy khác để hợp thành sông lớn. Không sợ Thổ vì có thể cuốn trôi đất đá. Rất ưa Mộc vì nó thể hiện sức sống của núi rừng.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường hướng ngoại, thẳng thắn, nhiệt tình và thích tự do. Họ có nhiều ý tưởng, thích phiêu lưu mạo hiểm. Tuy nhiên, họ có thể bốc đồng, thiếu kiên nhẫn, không suy nghĩ dài hạn.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự nhiệt huyết & Sự thiếu định hướng của tuổi trẻ. Sức mạnh của Thác Nước rất dữ dội, mãnh liệt nhưng chỉ trong một phạm vi hẹp và ngắn. Nó có thể cuốn phăng đất đá ở đầu nguồn nhưng sức mạnh không bền bỉ và có định hướng như Sông Dài. Nó đại diện cho sức mạnh bộc phát nhất thời.`,
      },
      {
        name: "TUYỀN TRUNG THỦY",
        description: `TUYỀN TRUNG THỦY (Nước Suối)
•	Nguồn Gốc Can Chi: Giáp Thân, Ất Dậu
•	Hình Tượng & Bản Chất: Là dòng nước suối trong mát, chảy ra từ nguồn trong núi, lúc ẩn lúc hiện. Nó là biểu tượng của trí tuệ thanh khiết, sự tinh tường, khả năng nuôi dưỡng một cách thầm lặng và bền bỉ.
•	Đặc tính đột biến (Tổng quát): Vì nguồn của nó là Kim (Thân, Dậu) nên đây là loại Thủy duy nhất càng gặp Kim lại càng mạnh, càng trong. Rất ưa Mộc để được nuôi dưỡng. Không sợ Thổ vì có thể len lỏi qua.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thông minh, thanh cao, có tấm lòng nhân hậu. Họ thích cuộc sống an tĩnh, không màng danh lợi xô bồ. Họ là những người thầy, nhà tư vấn thầm lặng. Tuy nhiên, họ có thể thiếu tham vọng, sống ẩn dật, khép kín.
•	Ngữ Nghĩa Cốt Lõi: Sự trong lành của trí tuệ & Sự thầm lặng của cống hiến. Nước Suối có lưu lượng nhỏ, dòng chảy hiền hòa. Sức mạnh của nó không nằm ở sức công phá mà ở khả năng nuôi dưỡng, duy trì sự sống một cách bền bỉ và tinh khiết. Nó là khởi nguồn của những dòng sông lớn nhưng bản thân nó lại rất khiêm tốn.`,
      },
      {
        name: "GIẢN HẠ THỦY",
        description: `GIẢN HẠ THỦY (Mạch Nước Ngầm)
•	Nguồn Gốc Can Chi: Bính Tý, Đinh Sửu
•	Hình Tượng & Bản Chất: Là dòng nước ngầm, mạch nước chảy trong khe sâu, lúc ẩn lúc hiện, lặng lẽ và mát lành. Nó là biểu tượng của nội tâm thâm sâu, trí tuệ tiềm ẩn và sự kiên trì bền bỉ nhưng ít khi thể hiện ra ngoài.
•	Đặc tính đột biến (Tổng quát): Là Thủy ở tầng sâu nhất, không sợ Thổ vì nó nằm trong lòng đất. Cần Kim để sinh ra. Không sợ Hỏa yếu vì khó có thể tác động đến.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường có nội tâm phức tạp, khó đoán, thông minh nhưng không khoe khoang. Họ có sự nhẫn nại và có thể thành công một cách thầm lặng. Tuy nhiên, họ có thể đa nghi, hay do dự, bỏ lỡ cơ hội.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự thâm trầm & Sự do dự vì đa nghi. Đây là dòng nước có lưu lượng nhỏ nhất và ẩn mình sâu nhất. Nó gần như không có tác động trực tiếp lên bề mặt. Sức mạnh của nó là sự tồn tại thầm lặng, bền bỉ và tiềm ẩn. Nó rất quan trọng nhưng lại yếu nhất về mặt biểu hiện ra bên ngoài.`,
      },
      {
        name: "ĐẠI LÂM MỘC",
        description: `ĐẠI LÂM MỘC (Rừng Cây Lớn)
•	Nguồn Gốc Can Chi: Mậu Thìn, Kỷ Tỵ
•	Hình Tượng & Bản Chất: Là hình tượng của một khu rừng lớn với vô số cây cối hùng vĩ, xanh tươi. Nó là biểu tượng của sự thịnh vượng, sức sống mãnh liệt, tính cộng đồng và nền tảng vững chắc. Đây là dạng Mộc mạnh mẽ và có sức lan tỏa lớn nhất.
•	Đặc tính đột biến (Tổng quát): Vì là cả một khu rừng nên không sợ Kim (một chiếc rìu không thể đốn hết). Cần Thủy để nuôi dưỡng và Thổ để làm nền tảng. Có thể lấn át Hỏa yếu.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường có tấm lòng nhân hậu, phóng khoáng, có tinh thần đồng đội và khả năng che chở cho người khác. Họ có nền tảng tốt, dễ thành công trong các lĩnh vực đòi hỏi sự hợp tác, quy mô lớn. Tuy nhiên, trong một tập thể lớn, họ có thể thiếu đi sự nổi bật cá nhân.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự hùng vĩ & Sự cạnh tranh của quần thể. Sức mạnh của Đại Lâm Mộc đến từ quy mô và tính quần thể. Một cây có thể bị đốn hạ, nhưng cả một khu rừng là một thế lực hùng vĩ, có sức sống mãnh liệt và rất khó bị hủy diệt. Sức mạnh của nó là sự to lớn, hùng hậu và vững chãi.`,
      },
      {
        name: "TÙNG BÁCH MỘC",
        description: `TÙNG BÁCH MỘC (Cây Thân Cứng, Mọc Thẳng)
•	Nguồn Gốc Can Chi: Canh Dần, Tân Mão
•	Hình Tượng & Bản Chất: Là hình ảnh cây tùng, cây bách hiên ngang, cứng cỏi, chịu đựng được sương tuyết giá lạnh. Nó là biểu tượng của sự kiên định, ý chí sắt đá, tuổi thọ, sự chính trực và khả năng vượt qua nghịch cảnh.
•	Đặc tính đột biến (Tổng quát): Là loại Mộc duy nhất có thể chống chọi lại Kim (rìu khó đốn). Không sợ mùa đông (Thủy vượng). Sống trên núi cao nên không cần nhiều Thổ màu mỡ.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này có ý chí kiên cường, lập trường vững vàng, sống có nguyên tắc và danh dự. Họ có thể gánh vác những trọng trách lớn, là trụ cột trong gia đình và tổ chức. Tuy nhiên, họ có thể cô độc, cứng nhắc và ít khi cúi mình.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự kiên định & Sự cô độc trong giá lạnh. Đây là loại Mộc cứng rắn, kiên định và có ý chí mạnh mẽ nhất. Nó là hình ảnh của cây đại thụ hiên ngang trước sương tuyết, không sợ Kim khắc (rìu khó đốn). Sức mạnh của nó nằm ở sự bất khuất, khí phách và khả năng chịu đựng nghịch cảnh khắc nghiệt nhất.`,
      },
      {
        name: "THẠCH LỰU MỘC",
        description: `THẠCH LỰU MỘC (Cây Ăn Quả)
•	Nguồn Gốc Can Chi: Canh Thân, Tân Dậu
•	Hình Tượng & Bản Chất: Là hình ảnh cây thạch lựu, một loại cây mà giá trị không nằm ở thân gỗ mà ở quả (hoa thơm, quả ngọt). Nó là biểu tượng của vẻ đẹp và thành quả nội tại, cần sự tác động từ bên ngoài để kết trái.
•	Đặc tính đột biến (Tổng quát): Là Mộc duy nhất bị Kim khắc mà lại trở nên tốt đẹp. Cần có Kim (dao kéo) cắt tỉa cành lá thì mới có thể ra hoa, kết trái. Do đó, nó không sợ Kim mà còn cần Kim.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường có tài năng, vẻ đẹp tiềm ẩn bên trong. Họ cần sự rèn luyện, kỷ luật, thậm chí là áp lực, chỉ trích để có thể tạo ra thành quả. Thành công của họ thường đến sau khi trải qua gian khó.
•	Ngữ Nghĩa Cốt Lõi: Vẻ đẹp của thành quả & Sự trưởng thành từ áp lực. Sức mạnh của nó nằm ở sức sống phi thường và khả năng biến nghịch cảnh thành sức mạnh. Là Mộc duy nhất không những không sợ Kim mà còn cần Kim (sự cắt tỉa, áp lực) để phát triển và tạo ra thành quả. Đây là sức mạnh của sự kiên cường và ý chí vươn lên từ gian khó.`,
      },
      {
        name: "TANG ĐỐ MỘC",
        description: `TANG ĐỐ MỘC (Cây Đa Dụng)
•	Nguồn Gốc Can Chi: Nhâm Tý, Quý Sửu
•	Hình Tượng & Bản Chất: Là hình ảnh cây dâu tằm, một loại cây có công năng đặc biệt (nuôi tằm, dệt lụa). Nó là biểu tượng của sự khéo léo, hữu ích trong một lĩnh vực chuyên biệt, sự hy sinh và cống hiến thầm lặng.
•	Đặc tính đột biến (Tổng quát): Là Mộc sinh ra từ Thủy (Tý, Sửu). Rất cần Thủy để phát triển. Công năng của nó gắn liền với con người (chăn nuôi, dệt vải), do đó nó có tính "nhân tạo" và cần sự chăm sóc.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường có tài năng đặc biệt trong một lĩnh vực hẹp, rất khéo léo và cần mẫn. Họ sống vì người khác nhiều hơn vì mình. Tuy nhiên, cuộc sống có thể vất vả, ít được hưởng thụ thành quả.
•	Ngữ Nghĩa Cốt Lõi: Sự hữu ích của chuyên môn & Sự hy sinh thầm lặng. Sức mạnh của nó không nằm ở sự cứng cỏi hay tầm vóc, mà ở giá trị sử dụng và sự linh hoạt. Gỗ dâu có thể làm cung tên (chứa đựng sức mạnh), lá dâu có thể nuôi tằm (tạo ra giá trị). Đây là sức mạnh của sự hữu ích, chuyên dụng và khả năng cống hiến.`,
      },
      {
        name: "BÌNH ĐỊA MỘC",
        description: `BÌNH ĐỊA MỘC (Cây Thấp, Sát Đất)
•	Nguồn Gốc Can Chi: Mậu Tuất, Kỷ Hợi
•	Hình Tượng & Bản Chất: Là cây cỏ, bụi rậm mọc ở đồng bằng. Tuy không cao lớn nhưng có sức sống mãnh liệt và lan tỏa trên diện rộng. Nó là biểu tượng của sự thực tế, gần gũi, khả năng thích nghi và tính cộng đồng.
•	Đặc tính đột biến (Tổng quát): Vì là cây cỏ nên không có giá trị về gỗ, do đó không sợ Kim (rìu). Rất cần Thủy (mưa) để sinh trưởng và sợ nhất là Hỏa (lửa đồng). Sống hòa hợp với Thổ.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này sống thực tế, hòa đồng, dễ thích nghi và có nhiều mối quan hệ. Họ không có tham vọng cao xa nhưng xây dựng được cuộc sống ổn định, vui vẻ. Tuy nhiên, họ có thể thiếu tầm nhìn, dễ bằng lòng với thực tại.
•	Ngữ Nghĩa Cốt Lõi: Sức sống của sự lan tỏa & Sự thiếu tầm vóc cao xa. Sức mạnh của nó nằm ở sự lan tỏa và sức sống dẻo dai. Cây cỏ có thể bị dẫm đạp nhưng vẫn vươn lên. Tuy nhiên, về mặt tầm vóc và sự vững chãi, nó không thể so sánh với các loại cây gỗ lớn. Sức mạnh của nó là sức mạnh của số đông nhưng thiếu đi vóc dáng và sự kiên cố của cá thể.`,
      },
      {
        name: "DƯƠNG LIỄU MỘC",
        description: `DƯƠNG LIỄU MỘC (Cây Thân Mềm)
•	Nguồn Gốc Can Chi: Nhâm Ngọ, Quý Mùi
•	Hình Tượng & Bản Chất: Là hình ảnh cây dương liễu với thân mềm mại, cành lá rủ xuống, luôn đung đưa trước gió. Nó là biểu tượng của sự uyển chuyển, linh hoạt, duyên dáng nhưng cũng thiếu đi sự cứng cỏi, lập trường không vững vàng.
•	Đặc tính đột biến (Tổng quát): Thân mềm nên rất sợ Kim. Ưa Thủy để duy trì sự mềm mại. Dễ bị Hỏa mạnh làm cho khô héo.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường có vẻ ngoài duyên dáng, tình cảm, khéo léo trong giao tiếp. Họ dễ thích nghi nhưng lập trường không vững, dễ thay đổi, nội tâm đa sầu đa cảm.
•	Ngữ Nghĩa Cốt Lõi: Vẻ đẹp của sự mềm mại & Sự yếu đuối vì thiếu lập trường. Yếu nhất vì bản chất của nó là sự mềm mại, uyển chuyển và thiếu lập trường. Nó dễ dàng uốn mình theo chiều gió, tượng trưng cho sự thiếu kiên định. Trong hệ quy chiếu về sức mạnh (vốn đề cao sự cứng cỏi, vững vàng), nó bị xem là yếu nhất.`,
      },
      {
        name: "THÀNH ĐẦU THỔ",
        description: `THÀNH ĐẦU THỔ (Đất Tường Thành)
•	Nguồn Gốc Can Chi: Mậu Dần, Kỷ Mão
•	Hình Tượng & Bản Chất: Là đất tường thành, đê điều, đã được nén chặt và gia cố. Nó là biểu tượng của sự kiên cố, vững chãi, khả năng bảo vệ và tính nguyên tắc. Đây là dạng Thổ có sức mạnh phòng thủ lớn nhất.
•	Đặc tính đột biến (Tổng quát): Không ngại Mộc, lại còn cần Mộc để làm cổng thành, gia tăng sự vững chãi, chứ không sợ bị Mộc khắc theo cách thông thường. Ưa Hỏa để làm đất thêm khô cứng, vững chãi. Rất kỵ Thủy lớn vì có thể làm sụp đổ thành trì.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này thường có lập trường vững vàng, sống có nguyên tắc, đáng tin cậy và có khả năng bảo vệ người khác. Họ là những người xây dựng và duy trì sự ổn định. Tuy nhiên, họ có thể rất bảo thủ, cứng đầu, thiếu linh hoạt.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự kiên cố & Nguy cơ của sự bất biến. Đây là loại Thổ có tính kiên cố, vững chãi và sức phòng thủ cao nhất. Nó được tạo ra với mục đích là để chống chịu, bảo vệ. Đặc biệt, nó không sợ Mộc khắc theo cách thông thường mà còn cần Mộc để gia cố. Sức mạnh của nó nằm ở sự vững vàng không thể lay chuyển.`,
      },
      {
        name: "ÐẠI TRẠCH THỔ",
        description: `ĐẠI TRẠCH THỔ (Đồng Bằng)
•	Nguồn Gốc Can Chi: Mậu Thân, Kỷ Dậu
•	Hình Tượng & Bản Chất: Là đất cồn bãi, đất phù sa, nền móng rộng lớn. Nó là biểu tượng của sự màu mỡ, trù phú, lòng bao dung và là nền tảng cho vạn vật sinh sôi.
•	Đặc tính đột biến (Tổng quát): Không sợ Mộc vì đất rộng thì cây cối mọc lên càng làm đất thêm màu mỡ. Rất cần Thủy để bồi đắp và nuôi dưỡng. Gặp Hỏa (mặt trời) sẽ càng thêm trù phú.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này có tấm lòng bao dung, phóng khoáng, dễ tha thứ. Họ thường có tài sản, đất đai và là nền tảng vững chắc cho người khác nương tựa. Tuy nhiên, họ có thể thiếu sự tinh tế, đôi khi tùy tiện và không có quy củ chặt chẽ.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của nền tảng và sự trù phú & Sự thiếu quy củ. Sức mạnh của Đại Trạch Thổ nằm ở quy mô rộng lớn và khả năng nuôi dưỡng vô hạn. Nó là nền tảng cho vạn vật sinh sôi, có tấm lòng bao dung, dung nạp tất cả. Dù không cứng rắn như Thành Đầu Thổ, nhưng sức mạnh về tầm vóc và sự trù phú của nó là không thể phủ nhận.`,
      },
      {
        name: "LỘ BÀNG THỔ",
        description: `LỘ BÀNG THỔ (Mặt Đường Giao Thông)
•	Nguồn Gốc Can Chi: Canh Ngọ, Tân Mùi
•	Hình Tượng & Bản Chất: Là đất ven đường đã bị người và xe qua lại đè nén đến chai sạn. Nó là biểu tượng của sự bền bỉ, nhẫn nại, sức chịu đựng cao và trải qua nhiều sương gió.
•	Đặc tính đột biến (Tổng quát): Vì đã chai sạn nên không sợ Mộc khắc, rễ cây khó đâm xuyên. Gặp Thủy sẽ trở nên lầy lội, vất vả. Gặp Hỏa sẽ càng thêm khô cứng.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này có sức chịu đựng phi thường, kiên nhẫn, giữ chữ tín. Cuộc sống của họ thường vất vả, ít có cơ hội phát triển lớn và có thể trở nên trơ lì, vô cảm với xung quanh.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự dãi dầu & Sự thiếu màu mỡ. Sức mạnh của nó đến từ sự dãi dầu, chai sạn. Nó đã chịu đựng vô số tác động mà trở nên rắn chắc. Sức mạnh này không phải là quy mô hay sự màu mỡ, mà là sức bền và khả năng chịu đựng áp lực phi thường. Nó cũng là loại Thổ không sợ Mộc khắc.`,
      },
      {
        name: "SA TRUNG THỔ",
        description: `SA TRUNG THỔ (Đất Pha Cát)
•	Nguồn Gốc Can Chi: Bính Thìn, Đinh Tỵ
•	Hình Tượng & Bản Chất: Là đất cát, không thuần chất và dễ biến đổi. Nó là biểu tượng của sự linh hoạt, dễ thích nghi nhưng thiếu sự ổn định và lập trường vững chắc.
•	Đặc tính đột biến (Tổng quát): Vì không thuần nhất nên dễ bị các hành khác tác động. Gặp Thủy sẽ bị cuốn trôi. Gặp Hỏa sẽ trở thành sa mạc khô cằn. Mộc khó sinh trưởng.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này rất linh hoạt, dễ thích nghi. Họ có nhiều khả năng tiềm ẩn. Tuy nhiên, họ thường không ổn định, hay thay đổi, thiếu lập trường và khó tập trung vào một mục tiêu lâu dài.
•	Ngữ Nghĩa Cốt Lõi: Sức mạnh của sự thích ứng & Sự thiếu nhất quán. Đây là loại Thổ thiếu sự ổn định và kiên cố nhất. Cấu trúc của nó rời rạc, dễ bị gió thổi, nước cuốn. "Sức mạnh" của nó nằm ở sự linh hoạt, biến đổi, nhưng trong hệ quy chiếu của hành Thổ (vốn trọng sự ổn định), nó bị xem là yếu.`,
      },
      {
        name: "BÍCH THƯỢNG THỔ",
        description: `BÍCH THƯỢNG THỔ (Đất Xây Nhà: xi măng, vôi...)
•	Nguồn Gốc Can Chi: Canh Tý, Tân Sửu
•	Hình Tượng & Bản Chất: Là lớp vôi vữa, đất trát trên tường. Nó không thể tự tồn tại mà phải nương tựa vào một cấu trúc khác (gạch, gỗ). Nó là biểu tượng của sự cộng sinh, hợp tác, trang trí nhưng thiếu tự chủ.
•	Đặc tính đột biến (Tổng quát): Cần Mộc (cốt tre, gỗ) để làm cấu trúc nương tựa, do đó không thể tồn tại nếu thiếu Mộc. Rất sợ Thủy (nước làm mục vữa). Cần Hỏa (ánh đèn, mặt trời) để giữ cho khô ráo, sáng sủa.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này có tinh thần hợp tác tốt, biết nương tựa vào người khác để cùng phát triển. Họ có khả năng làm đẹp, trang trí. Tuy nhiên, họ thiếu tính tự lập, không có chính kiến, dễ lung lay và cuộc sống thường phụ thuộc.
•	Ngữ Nghĩa Cốt Lõi: Vẻ đẹp của sự cộng sinh & Sự yếu đuối vì thiếu tự chủ. Yếu nhất vì hoàn toàn thiếu tính tự chủ. Nó là một lớp vữa mỏng, phải dựa vào cấu trúc khác (Mộc, gạch) để tồn tại. Nó không có sức chống chịu, dễ dàng bị bong tróc bởi Thủy. Sức mạnh của nó gần như không có, chỉ mang giá trị trang trí và phụ thuộc.`,
      },
      {
        name: "ỐC THƯỢNG THỔ",
        description: `ỐC THƯỢNG THỔ (Đất Nung:gốm,sứ, gạch…)
•	Nguồn Gốc Can Chi: Bính Tuất, Đinh Hợi
•	Hình Tượng & Bản Chất: Là đất đã được nung trong lửa thành ngói lợp nhà. Nó đã mất đi hoàn toàn đặc tính tự nhiên của đất (khả năng nuôi dưỡng). Nó là biểu tượng của sự trật tự, quy tắc và công năng che chở, bảo vệ.
•	Đặc tính đột biến (Tổng quát): Đã qua Hỏa luyện nên không sợ Mộc. Công năng chính là để chống lại Thủy (nước mưa). Do đó, đây là loại Thổ duy nhất không sợ Mộc và kỵ Thủy. Cần có Mộc (vì kèo) để làm giá đỡ.
•	Luận Bàn Tính Cách & Số Phận (Tổng quát): Nhân cách này sống rất có trật tự, tuân thủ quy tắc và có công năng bảo vệ, che chở cho người khác. Tuy nhiên, họ có thể cứng nhắc, giáo điều, mất gốc, thiếu sự linh hoạt và không có khả năng nuôi dưỡng, sáng tạo.
•	Ngữ Nghĩa Cốt Lõi: Sự hữu ích của quy tắc & Sự mất mát bản chất tự nhiên. Đã qua lửa tôi luyện (nung thành ngói), nó trở nên rắn chắc và có công năng đặc biệt là chống lại Thủy. Sức mạnh của nó mang tính chức năng, hữu ích và có quy tắc. Tuy nhiên, nó đã mất đi bản chất tự nhiên của đất (khả năng nuôi dưỡng) và cần phải có kết cấu khác (Mộc) để nương tựa.`,
      },
    ];
    return napAmData.find((item) => item.name === napAm).description;
  };

  const getNguHanhThapThan = (nguHanhCan) => {
    switch (nguHanhCan) {
      case "Kim":
        return ["Kim", "Thủy", "Mộc", "Hỏa", "Thổ"];
      case "Mộc":
        return ["Mộc", "Hỏa", "Thổ", "Kim", "Thủy"];
      case "Thủy":
        return ["Thủy", "Mộc", "Hỏa", "Thổ", "Kim"];
      case "Hỏa":
        return ["Hỏa", "Thổ", "Kim", "Thủy", "Mộc"];
      case "Thổ":
        return ["Thổ", "Kim", "Thủy", "Mộc", "Hỏa"];
      default:
        return [];
    }
  };

  const getCuongNhuoc = (percent) => {
    if (percent < 10) {
      return "cực nhược";
    } else if (percent < 20) {
      return "nhược";
    } else if (percent == 20) {
      return "cân bằng";
    } else if (percent <= 30) {
      return "cường";
    } else {
      return "cực cường";
    }
  };

  const getThapThanInfo = (thapThan, nhatChu) => {
    let data = getThapThanThienCan(nhatChu).data;
    let thapThanInfo = data.find((info) => info.thapThan === thapThan);
    return thapThanInfo;
  };

  const renderThapThanSection = (thapThan, nhatChuName) => {
    const info = getThapThanInfo(thapThan, nhatChuName);
    return `
    ${info.description}
      •	Can ${info.name} (${info.amDuong} ${info.nguHanh}):
      Tích cực: ${info.tichCuc}
      Tiêu cực: ${info.tieuCuc}`;
  };

  const renderThapThan = (nhatChuName, nguHanhCan) => {
    let thapThanData = [
      ["Tỷ Kiên", "Kiếp Tài"],
      ["Thực Thần", "Thương Quan"],
      ["Chính Tài", "Thiên Tài"],
      ["Chính Quan", "Thiên Quan"],
      ["Chính Ấn", "Thiên Ấn"],
    ];
    let thapThanInfo = thapThanData
      .map((thapThanGroup, groupIndex) => {
        return `3.${groupIndex + 1}. ${thapThanGroup[0]} - ${
          thapThanGroup[1]
        } (Ngũ hành ${getNguHanhThapThan(nguHanhCan)[groupIndex]})
    a. ${thapThanGroup[0]}${renderThapThanSection(
          thapThanGroup[0],
          nhatChuName
        )}
    b. ${thapThanGroup[1]}${renderThapThanSection(
          thapThanGroup[1],
          nhatChuName
        )}`;
      })
      .join("\n\n");
    return thapThanInfo;
  };

  const getSupportForces = (can) => {
    let forceData = [
      {
        can: "Giáp",
        forceRanges: [
          {
            id: 0,
            title: "Giáp Mộc Cực Cường (Extremely Strong): > 74%",
            data: `• Luận giải: Ở trạng thái này, cây cổ thụ đã phát triển thành cả một khu rừng, che lấp mọi ánh sáng. Tham vọng trở thành sự thống trị tàn nhẫn, và nguyên tắc trở thành giáo điều không thể lay chuyển. Họ trở nên độc đoán, áp đảo và tạo ra một môi trường ngột ngạt, kìm hãm sự phát triển của những người xung quanh.
• Lực lượng thuận lợi (Favorable Forces): Theo cấu trúc "Tòng Vượng", họ cực kỳ ưa Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival). Càng có nhiều nước và cây cối, khu rừng càng trở nên bất khả xâm phạm.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces (the Leader & the Warrior) là Kỵ Thần số một. Một chút kim loại (Kim) cố gắng đốn hạ khu rừng sẽ bị "nuốt chửng" và gây ra sự phản kháng dữ dội. Economic Forces (the Provider & the Venturer) cũng rất bất lợi.
            `,
          },
          {
            id: 1,
            title: "Giáp Mộc Cường (Strong): 65% – 74%",
            data: `• Luận giải: Đây là hình mẫu Nhật Chủ Giáp Mộc của người lãnh đạo bẩm sinh. Họ kiên định, có nguyên tắc, thẳng thắn và luôn có khát vọng vươn lên. Giống như cây đại thụ, họ là trụ cột cho cộng đồng, là nơi che chở cho những người yếu thế hơn. Họ truyền cảm hứng bằng sự chính trực và ý chí không khuất phục.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đối lập để được tôi luyện. Power Forces (the Leader & the Warrior) để cắt tỉa cành lá, tạo nên hình dáng hữu dụng; Economic Forces (the Provider & the Venturer) để có đất đai cắm rễ; Creation Forces (the Creator & the Innovator) để Mộc sinh Hỏa, thể hiện tài năng.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival), vì chúng tạo ra sự cạnh tranh về không gian và ánh sáng.
            `,
          },
          {
            id: 2,
            title: "Giáp Mộc Cân Bằng (thiên Cường): 55% – 65%",
            data: `• Luận giải: Đây là phiên bản Nhật Chủ Giáp Mộc chủ động và đầy sức sống. Họ tự tin vào con đường của mình, sẵn sàng dẫn dắt và bảo vệ quan điểm. Họ là những nhà lãnh đạo có tầm nhìn, những người đặt ra nền móng và định hướng cho cả một tập thể.
• Lực lượng thuận lợi (Favorable Forces): Ưu tiên Power Forces, Economic Forces, và Creation Forces.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces và Companion Forces.
            `,
          },
          {
            id: 3,
            title: "Giáp Mộc Cân Bằng Thực Sự (True Balance): 45% – 55%",
            data: `• Luận giải: Đây là trạng thái lý tưởng nhất của Nhật Chủ Giáp Mộc. Họ vừa giữ được sự thẳng thắn, kiên định của mình, vừa có được sự dẻo dai cần thiết. Giống như cây tre, họ "cứng mà không giòn, mềm mà không yếu". Họ là những nhà lãnh đạo khôn ngoan, biết khi nào cần vươn lên và khi nào cần uốn mình theo gió.
• Lực lượng thuận lợi (Favorable Forces): Rất linh hoạt. Thường ưa Power Forces (the Leader/Warrior) để có kỷ luật và sự công nhận, và Creation Forces (the Creator/Innovator) để thể hiện tài năng một cách hiệu quả.
• Lực lượng bất lợi (Unfavorable Forces): Bất kỳ lực lượng nào xuất hiện quá nhiều làm phá vỡ sự cân bằng.
            `,
          },
          {
            id: 4,
            title: "Giáp Mộc Cân Bằng (thiên Nhược): 35% – 45%",
            data: `• Luận giải: Đây là phiên bản Nhật Chủ Giáp Mộc khiêm tốn và có tinh thần hợp tác hơn. Họ vẫn giữ được sự chính trực, nhưng hiểu rằng sức mạnh của mình sẽ được phát huy tốt nhất khi là một phần của một cấu trúc lớn hơn. Họ là những người quản lý dự án, những trụ cột đáng tin cậy trong một đội nhóm.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đồng minh. Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) giúp họ có nền tảng vững chắc.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces, Economic Forces, và Creation Forces.
            `,
          },
          {
            id: 5,
            title: "Giáp Mộc Nhược (Weak): 25% – 35%",
            data: `• Luận giải: Bản năng của họ là muốn vươn lên thẳng tắp, nhưng lại thiếu "nước" (hỗ trợ) và "đất" (nguồn lực) để làm điều đó. Điều này tạo ra cảm giác bất lực, hoài bão lớn nhưng không thể thực hiện. Họ sợ bị "chặt hạ" bởi áp lực và chỉ trích.
• Lực lượng thuận lợi (Favorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là cần thiết nhất để cây có thể lớn lên.
• Lực lượng bất lợi (Unfavorable Forces): Rất kỵ Power Forces (the Leader & the Warrior) - như rìu chặt cây non. Creation Forces và Economic Forces cũng làm họ kiệt sức.
            `,
          },
          {
            id: 6,
            title: "Giáp Mộc Cực Nhược (Extremely Weak): < 25%",
            data: `• Luận giải: Ở trạng thái này, Nhật Chủ Giáp Mộc phải từ bỏ hoàn toàn bản năng lãnh đạo và ý chí vươn lên của mình để "Tòng" (Follow) theo lực lượng đối lập vượng nhất. Họ phải học cách trở thành nhiên liệu cho một ngọn lửa khác, hoặc trở thành vật trang trí trong một khu vườn.
• Lực lượng thuận lợi (Favorable Forces): Là lực lượng vượng nhất mà Nhật Chủ đang "Tòng" theo (có thể là Economic, Power, hoặc Creation Forces) và lực lượng sinh ra nó.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là Kỵ Thần số một. Một chút nước hay cây khác cũng sẽ "đánh thức" bản năng Nhật Chủ Giáp Mộc, phá vỡ cấu trúc Tòng cách và gây ra tai họa.
            `,
          },
        ],
      },
      {
        can: "Ất",
        forceRanges: [
          {
            id: 0,
            title: "Ất Mộc Cực Cường (Extremely Strong): > 74%",
            data: `• Luận giải: Lúc này, dây leo không còn mềm mại mà trở nên xâm lấn, bóp nghẹt mọi thứ nó quấn lấy. Sự linh hoạt biến thành sự luồn lách, cơ hội vô nguyên tắc. Khả năng kết nối trở thành những mạng lưới bè phái phức tạp. Họ tạo ra một môi trường hỗn loạn, rối rắm để sinh tồn và thống trị.
• Lực lượng thuận lợi (Favorable Forces): Theo cấu trúc "Tòng Vượng", họ cực kỳ ưa Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival).
• Lực lượng bất lợi (Unfavorable Forces): Power Forces (the Leader & the Warrior) là Kỵ Thần số một. Một chút kim loại (Kim) cố gắng cắt tỉa sẽ khiến chúng càng phản ứng mạnh mẽ hơn. Economic Forces (the Provider & the Venturer) cũng rất bất lợi.
            `,
          },
          {
            id: 1,
            title: "Ất Mộc Cường (Strong): 65% – 74%",
            data: `• Luận giải: Đây là hình mẫu Ất Mộc của nhà ngoại giao, người kết nối bậc thầy. Họ mềm dẻo, khéo léo và có khả năng thích ứng phi thường. Họ không đối đầu trực diện mà đạt được mục tiêu bằng cách "leo" lên những cấu trúc có sẵn (một công ty, một người có quyền lực), và làm đẹp cho chính cấu trúc đó.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đối lập. Power Forces (the Leader & the Warrior) để có giàn leo; Economic Forces (the Provider & the Venturer) để có đất bám; Creation Forces (the Creator & the Innovator) để Mộc sinh Hỏa, giúp hoa nở rực rỡ.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival), vì chúng tạo ra một mớ dây leo hỗn loạn, tranh giành nhau.
            `,
          },
          {
            id: 2,
            title: "Ất Mộc Cân Bằng (thiên Cường): 55% – 65%",
            data: `• Luận giải: Đây là phiên bản Ất Mộc chủ động và có sức sống mãnh liệt. Họ tự tin vào khả năng sinh tồn và thích ứng của mình, không ngại khó khăn và luôn tìm được cách để vươn lên. Họ là những người giải quyết vấn đề một cách sáng tạo và linh hoạt.
• Lực lượng thuận lợi (Favorable Forces): Ưu tiên Power Forces, Economic Forces, và Creation Forces.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces và Companion Forces.
            `,
          },
          {
            id: 3,
            title: "Ất Mộc Cân Bằng Thực Sự (True Balance): 45% – 55%",
            data: `• Luận giải: Đây là trạng thái lý tưởng nhất của Ất Mộc. Họ vừa mềm mại, duyên dáng, vừa có sức sống riêng. Họ khéo léo trong giao tiếp, tinh tế trong cảm nhận và có khả năng mang lại vẻ đẹp, sự hòa hợp cho môi trường xung quanh. Họ là những nghệ sĩ, nhà ngoại giao, người hòa giải bẩm sinh.
• Lực lượng thuận lợi (Favorable Forces): Rất linh hoạt. Thường ưa Creation Forces (the Creator/Innovator) để thể hiện vẻ đẹp của mình và Economic Forces (the Provider/Venturer) để vẻ đẹp đó được công nhận và có giá trị.
• Lực lượng bất lợi (Unfavorable Forces): Bất kỳ lực lượng nào xuất hiện quá nhiều làm phá vỡ sự cân bằng.
            `,
          },
          {
            id: 4,
            title: "Ất Mộc Cân Bằng (thiên Nhược): 35% – 45%",
            data: `• Luận giải: Đây là phiên bản Ất Mộc khiêm tốn và cần sự che chở. Họ có khả năng thích ứng nhưng cần một môi trường thuận lợi để phát triển. Họ giỏi làm việc nhóm, biết cách nương theo người khác để cùng đi lên.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đồng minh. Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là rất quan trọng.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces, Economic Forces, và Creation Forces.
            `,
          },
          {
            id: 5,
            title: "Ất Mộc Nhược (Weak): 25% – 35%",
            data: `• Luận giải: Họ có sức sống tiềm tàng nhưng môi trường quá khắc nghiệt. Họ cảm thấy mình nhỏ bé, yếu ớt và dễ bị tổn thương. Họ luôn trong trạng thái phòng thủ, cố gắng tìm một kẽ hở, một sự giúp đỡ nhỏ nhất để tồn tại.
• Lực lượng thuận lợi (Favorable Forces): Support Forces (the Mentor & the Maverick) - như nước tưới - là quan trọng nhất. Companion Forces (the Companion & the Rival) cũng rất cần thiết.
• Lực lượng bất lợi (Unfavorable Forces): Rất kỵ Power Forces (the Leader & the Warrior) - như dao cắt cỏ. Creation Forces và Economic Forces cũng làm họ kiệt quệ.
            `,
          },
          {
            id: 6,
            title: "Ất Mộc Cực Nhược (Extremely Weak): < 25%",
            data: `• Luận giải: Ở trạng thái này, Ất Mộc phải từ bỏ hoàn toàn bản chất sinh trưởng của mình để "Tòng" (Follow) theo lực lượng đối lập vượng nhất. Họ phải học cách tìm thấy vẻ đẹp và mục đích của mình trong sự tàn phai hoặc trở thành một phần của một thứ khác.
• Lực lượng thuận lợi (Favorable Forces): Là lực lượng vượng nhất mà Nhật Chủ đang "Tòng" theo (có thể là Economic, Power, hoặc Creation Forces) và lực lượng sinh ra nó.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là Kỵ Thần số một. Một chút nước hay cây khác cũng sẽ "đánh thức" bản năng sinh tồn, phá vỡ cấu trúc Tòng cách và gây ra khủng hoảng.
            `,
          },
        ],
      },
      {
        can: "Bính",
        forceRanges: [
          {
            id: 0,
            title: "Bính Hỏa Cực Cường (Extremely Strong): > 74%",
            data: `• Luận giải: Lúc này, Mặt Trời không còn tỏa sáng mà trở nên thiêu đốt. Sự nhiệt tình, hào phóng biến thành sự áp đảo, ngột ngạt, làm lu mờ tất cả những người xung quanh. Họ trở nên cực kỳ tự cao, cho mình là trung tâm vũ trụ, không thể lắng nghe hay chấp nhận sự khác biệt. Sự thẳng thắn của họ trở thành sự thiếu tinh tế, dễ gây tổn thương.
• Lực lượng thuận lợi (Favorable Forces): Theo cấu trúc "Tòng Vượng", họ cực kỳ ưa Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival). Càng có nhiều nhiên liệu và đồng minh, ngọn lửa càng bùng cháy rực rỡ.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces (the Leader & the Warrior) là Kỵ Thần số một. Một chút nước (Thủy) cũng có thể gây ra một vụ nổ hơi nước dữ dội, dẫn đến sự sụp đổ thảm khốc. Economic Forces (the Provider & the Venturer) cũng rất bất lợi.
            `,
          },
          {
            id: 1,
            title: "Bính Hỏa Cường (Strong): 65% – 74%",
            data: `• Luận giải: Đây là hình mẫu Bính Hỏa của người lãnh đạo bẩm sinh. Họ tỏa ra năng lượng tích cực, sự hào phóng và lòng nhiệt thành một cách tự nhiên. Sức hút của họ khiến mọi người muốn đi theo. Họ là trung tâm của mọi sự chú ý, luôn công khai, minh bạch và đầy đam mê.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đối lập. Power Forces (the Leader & the Warrior) giúp họ có được quyền lực và sự tôn trọng; Economic Forces (the Provider & the Venturer) cho họ mục tiêu để chinh phục; Creation Forces (the Creator & the Innovator) để họ thể hiện năng lượng của mình.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival), vì chúng khiến ngọn lửa trở nên quá nóng và khó kiểm soát.
            `,
          },
          {
            id: 2,
            title: "Bính Hỏa Cân Bằng (thiên Cường): 55% – 65%",
            data: `• Luận giải: Đây là phiên bản Bính Hỏa đầy năng lượng và chủ động. Họ tự tin vào sức hút của mình, sẵn sàng đứng ra dẫn dắt và lan tỏa sự tích cực. Họ là những người khởi xướng, những nhà lãnh đạo truyền cảm hứng một cách mạnh mẽ và rõ ràng.
• Lực lượng thuận lợi (Favorable Forces): Ưu tiên Power Forces, Economic Forces, và Creation Forces để tối ưu hóa tiềm năng.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces và Companion Forces.
            `,
          },
          {
            id: 3,
            title: "Bính Hỏa Cân Bằng Thực Sự (True Balance): 45% – 55%",
            data: `• Luận giải: Đây là trạng thái lý tưởng nhất của Nhật Chủ Giáp Mộc. Họ vừa giữ được sự thẳng thắn, kiên định của mình, vừa có được sự dẻo dai cần thiết. Giống như cây tre, họ "cứng mà không giòn, mềm mà không yếu". Họ là những nhà lãnh đạo khôn ngoan, biết khi nào cần vươn lên và khi nào cần uốn mình theo gió.
• Lực lượng thuận lợi (Favorable Forces): Rất linh hoạt. Thường ưa Power Forces (the Leader/Warrior) để có kỷ luật và sự công nhận, và Creation Forces (the Creator/Innovator) để thể hiện tài năng một cách hiệu quả.
• Lực lượng bất lợi (Unfavorable Forces): Bất kỳ lực lượng nào xuất hiện quá nhiều làm phá vỡ sự cân bằng.
            `,
          },
          {
            id: 4,
            title: "Bính Hỏa Cân Bằng (thiên Nhược): 35% – 45%",
            data: `• Luận giải: Đây là phiên bản Bính Hỏa mềm mại và khéo léo hơn. Họ vẫn có sức hút và sự ấm áp, nhưng thể hiện nó một cách khiêm tốn và tinh tế hơn. Họ tỏa sáng thông qua việc hỗ trợ và làm nổi bật người khác.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đồng minh. Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) giúp Nhật Chủ tự tin tỏa sáng.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces, Economic Forces, và Creation Forces.
            `,
          },
          {
            id: 5,
            title: "Bính Hỏa Nhược (Weak): 25% – 35%",
            data: `• Luận giải: Bản chất của họ là muốn tỏa sáng nhưng lại thiếu năng lượng để làm điều đó. Điều này tạo ra sự mâu thuẫn nội tâm, khiến họ có thể trở nên thiếu tự tin hoặc hay ghen tị với thành công của người khác. Họ có hoài bão lớn nhưng lực bất tòng tâm.
• Lực lượng thuận lợi (Favorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là cần thiết nhất để "thổi bùng" ngọn lửa.
• Lực lượng bất lợi (Unfavorable Forces): Rất kỵ Power Forces (the Leader & the Warrior) - như nước dập tắt lửa. Economic Forces và Creation Forces cũng làm họ kiệt sức.
            `,
          },
          {
            id: 6,
            title: "Bính Hỏa Cực Nhược (Extremely Weak): < 25%",
            data: `• Luận giải: Ở trạng thái này, Bính Hỏa phải từ bỏ bản chất "Mặt Trời" của mình để "Tòng" (Follow) theo lực lượng đối lập vượng nhất. Họ phải học cách sống mà không phải là trung tâm của vũ trụ.
• Lực lượng thuận lợi (Favorable Forces): Là lực lượng vượng nhất mà Nhật Chủ đang "Tòng" theo (có thể là Economic, Power, hoặc Creation Forces) và lực lượng sinh ra nó.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là Kỵ Thần số một. Một chút hỗ trợ cũng sẽ "đánh thức" bản năng Mặt Trời, phá vỡ cấu trúc Tòng cách và gây ra tai họa.
            `,
          },
        ],
      },
      {
        can: "Đinh",
        forceRanges: [
          {
            id: 0,
            title: "Đinh Hỏa Cực Cường (Extremely Strong): > 74%",
            data: `• Luận giải: Ngọn nến ấm áp đã biến thành một dòng dung nham thiêu đốt. Sự soi sáng dẫn dắt trở thành sự soi mói, đa nghi. Nội tâm sâu sắc của họ biến thành những suy nghĩ cực đoan, hay dằn vặt. Cảm xúc của họ âm ỉ và có thể bùng nổ bất ngờ với sức hủy diệt lớn.
• Lực lượng thuận lợi (Favorable Forces): Theo cấu trúc "Tòng Vượng", họ cực kỳ ưa Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival).
• Lực lượng bất lợi (Unfavorable Forces): Power Forces (the Leader & the Warrior) là Kỵ Thần số một. Áp lực từ bên ngoài sẽ kích nổ những cảm xúc bị dồn nén, gây ra hậu quả khôn lường. Economic Forces (the Provider & the Venturer) cũng rất bất lợi.
            `,
          },
          {
            id: 1,
            title: "Đinh Hỏa Cường (Strong): 65% – 74%",
            data: `• Luận giải: Đây là hình mẫu Đinh Hỏa của người thầy, người dẫn dắt tinh thần. Ánh sáng của họ không chói lóa mà tập trung, soi rõ con đường cho những người cần nó. Họ sâu sắc, tinh tế, có khả năng truyền cảm hứng bằng trí tuệ và sự ấm áp. Họ là những nhà tư tưởng, những chuyên gia thầm lặng nhưng có sức ảnh hưởng lớn.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đối lập. Power Forces (the Leader & the Warrior) giúp họ có được sự công nhận; Economic Forces (the Provider & the Venturer) để họ hiện thực hóa các ý tưởng; Creation Forces (the Creator & the Innovator) để trí tuệ của họ được tuôn chảy.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival), vì chúng khiến họ trở nên quá tự mãn với kiến thức của mình và không muốn thay đổi.
            `,
          },
          {
            id: 2,
            title: "Đinh Hỏa Cân Bằng (thiên Cường): 55% – 65%",
            data: `• Luận giải: Đây là phiên bản Đinh Hỏa tự tin và chủ động hơn trong việc dẫn dắt. Họ sẵn sàng dùng trí tuệ và sự nhiệt thành của mình để soi đường cho một nhóm, một dự án. Họ là những người lãnh đạo truyền cảm hứng bằng chiều sâu kiến thức.
• Lực lượng thuận lợi (Favorable Forces): Ưu tiên Power Forces, Economic Forces, và Creation Forces.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces và Companion Forces.
            `,
          },
          {
            id: 3,
            title: "Đinh Hỏa Cân Bằng Thực Sự (True Balance): 45% – 55%",
            data: `• Luận giải: Đây là trạng thái lý tưởng nhất của Đinh Hỏa. Họ ấm áp, tinh tế, sâu sắc và đầy thấu cảm. Ánh sáng của họ vừa đủ để soi rọi con đường cho bản thân và những người xung quanh mà không gây áp lực. Họ là người bạn tâm giao, người chữa lành, người nghệ sĩ tài hoa.
• Lực lượng thuận lợi (Favorable Forces): Rất linh hoạt. Thường ưa Creation Forces (the Creator/Innovator) để thể hiện nội tâm phong phú, hoặc Power Forces (the Leader/Warrior) để ánh sáng của họ có mục đích và được định hướng rõ ràng.
• Lực lượng bất lợi (Unfavorable Forces): Bất kỳ lực lượng nào xuất hiện quá nhiều làm phá vỡ sự cân bằng tinh tế.
            `,
          },
          {
            id: 4,
            title: "Đinh Hỏa Cân Bằng (thiên Nhược): 35% – 45%",
            data: `• Luận giải: Đây là phiên bản Đinh Hỏa khiêm tốn và cần sự hỗ trợ. Ánh sáng của họ rất đẹp nhưng không ổn định, cần có bầu trời đêm (sự hỗ trợ) để trở nên nổi bật. Họ giỏi lắng nghe và tiếp thu kiến thức, tỏa sáng trong một tập thể.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đồng minh. Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là rất quan trọng.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces, Economic Forces, và Creation Forces.
            `,
          },
          {
            id: 5,
            title: "Đinh Hỏa Nhược (Weak): 25% – 35%",
            data: `Luận giải: Ánh sáng của họ rất yếu ớt và leo lét. Họ có những ý tưởng, những suy nghĩ sâu sắc nhưng không đủ năng lượng để thể hiện ra ngoài hoặc theo đuổi chúng. Nội tâm thường cảm thấy cô đơn, bất an và dễ bi quan.
Lực lượng thuận lợi (Favorable Forces): Support Forces (the Mentor & the Maverick) - như thêm dầu vào đèn - là quan trọng nhất. Companion Forces (the Companion & the Rival) cũng rất cần thiết.
Lực lượng bất lợi (Unfavorable Forces): Rất kỵ Power Forces (the Leader & the Warrior) - như một cơn gió mạnh có thể thổi tắt ngọn đèn. Economic Forces và Creation Forces cũng làm họ kiệt quệ.
            `,
          },
          {
            id: 6,
            title: "Đinh Hỏa Cực Nhược (Extremely Weak): < 25%",
            data: `• Luận giải: Ở trạng thái này, Đinh Hỏa phải từ bỏ bản chất soi sáng của mình để "Tòng" (Follow) theo lực lượng đối lập vượng nhất. Họ phải học cách tồn tại bằng cách nương theo một năng lượng khác mạnh mẽ hơn.
• Lực lượng thuận lợi (Favorable Forces): Là lực lượng vượng nhất mà Nhật Chủ đang "Tòng" theo (có thể là Economic, Power, hoặc Creation Forces) và lực lượng sinh ra nó.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là Kỵ Thần số một. Một chút "dầu" hay "củi" cũng sẽ phá vỡ cấu trúc Tòng cách, gây ra sự giằng xé nội tâm và thất bại.`,
          },
        ],
      },
      {
        can: "Mậu",
        forceRanges: [
          {
            id: 0,
            title: "Mậu Thổ Cực Cường (Extremely Strong): > 74%",
            data: `• Luận giải: Ở trạng thái này, Mậu Thổ không còn là một ngọn núi mà là cả một dãy núi. Sự vững chãi và kiên định biến thành sự bảo thủ tuyệt đối, không thể lay chuyển. Họ giống như một pháo đài bất khả xâm phạm, mọi ý kiến từ bên ngoài đều bị chặn lại. Sự bảo vệ của họ trở nên ngột ngạt, và sự ổn định của họ trở thành lực cản cho mọi sự thay đổi.
• Lực lượng thuận lợi (Favorable Forces): Theo cấu trúc "Tòng Vượng", họ cực kỳ ưa Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival). Càng được sinh trợ và có đồng minh, mệnh cục càng trở nên thịnh vượng.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces (the Leader & the Warrior) là Kỵ Thần số một. Một chút áp lực hay kỷ luật cũng có thể "chọc giận" toàn bộ cấu trúc Vượng, gây ra sụp đổ thảm khốc. Economic Forces (the Provider & the Venturer) cũng rất bất lợi.
            `,
          },
          {
            id: 1,
            title: "Mậu Thổ Cường (Strong): 65% – 74%",
            data: `• Luận giải: Đây là hình mẫu Mậu Thổ kinh điển: đáng tin cậy, trung thành, trọng chữ tín và có những nguyên tắc sống không thể lay chuyển. Họ là điểm tựa vững chắc cho người khác, là người lãnh đạo bảo vệ tập thể bằng sự kiên định của mình. Họ không mưu mẹo, hành động thẳng thắn và quang minh chính đại.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đối lập để tiết chế bớt năng lượng. Power Forces (the Leader & the Warrior) mang lại kỷ luật và quyền lực; Economic Forces (the Provider & the Venturer) cho mục tiêu phấn đấu; Creation Forces (the Creator & the Innovator) để thể hiện tài năng.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival), vì chúng làm cho Mậu Thổ càng thêm mạnh và mất cân bằng.
            `,
          },
          {
            id: 2,
            title: "Mậu Thổ Cân Bằng (thiên Cường): 55% – 65%",
            data: `• Luận giải: Đây là phiên bản Mậu Thổ chủ động trong việc bảo vệ và xây dựng. Họ không chỉ đứng yên mà còn tích cực tạo ra các quy tắc, hệ thống và cấu trúc để mang lại sự an toàn cho mọi người. Họ là người lãnh đạo tạo ra một môi trường ổn định và đáng tin cậy.
• Lực lượng thuận lợi (Favorable Forces): Ưu tiên Power Forces, Economic Forces, và Creation Forces để tối ưu hóa tiềm năng.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces và Companion Forces.
            `,
          },
          {
            id: 3,
            title: "Mậu Thổ Cân Bằng Thực Sự (True Balance): 45% – 55%",
            data: `• Luận giải: Đây là trạng thái lý tưởng nhất của Mậu Thổ. Họ vững chãi nhưng không hề cứng nhắc. Họ có nguyên tắc mạnh mẽ nhưng cũng đủ trí tuệ để thấu hiểu và bao dung cho sự khác biệt. Họ giống như một vị thẩm phán công tâm hay một người trưởng lão thông thái, biết khi nào cần đứng yên và khi nào cần để dòng chảy cuộc sống đi qua.
• Lực lượng thuận lợi (Favorable Forces): Rất linh hoạt. Thường ưa các lực lượng giúp lưu thông khí trong lá số như the Creator/Innovator (Creation Forces). Tùy vào cấu trúc, có thể cần một chút Power Forces để có định hướng hoặc Economic Forces để có mục tiêu.
• Lực lượng bất lợi (Unfavorable Forces): Bất kỳ lực lượng nào xuất hiện quá nhiều làm phá vỡ thế cân bằng tinh tế sẵn có.
            `,
          },
          {
            id: 4,
            title: "Mậu Thổ Cân Bằng (thiên Nhược): 35% – 45%",
            data: `• Luận giải: Đây là phiên bản Mậu Thổ dễ tiếp cận và hòa đồng hơn. Họ vẫn giữ được sự đáng tin cậy và lòng trung thành, nhưng cởi mở hơn trong việc lắng nghe và hợp tác. Họ lãnh đạo bằng cách tạo dựng sự đồng thuận thay vì dùng uy quyền.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đồng minh. Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) giúp Mậu Thổ vững vàng hơn.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces, Economic Forces, và Creation Forces.
            `,
          },
          {
            id: 5,
            title: "Mậu Thổ Nhược (Weak): 25% – 35%",
            data: `• Luận giải: Ngọn núi đã bị bào mòn thành cát. Bản năng muốn ổn định vẫn còn đó, nhưng họ thiếu nội lực để duy trì nó. Họ thường cảm thấy bất an và luôn tìm kiếm sự công nhận từ bên ngoài. Vẻ ngoài có thể tỏ ra cứng rắn như một cơ chế phòng vệ, nhưng bên trong lại đầy dao động.
• Lực lượng thuận lợi (Favorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là cần thiết nhất để sinh trợ và hỗ trợ.
• Lực lượng bất lợi (Unfavorable Forces): Rất kỵ Power Forces (the Leader & the Warrior), Economic Forces (the Provider & the Venturer), và Creation Forces (the Creator & the Innovator), vì chúng làm Mậu Thổ càng thêm suy yếu.
            `,
          },
          {
            id: 6,
            title: "Mậu Thổ Cực Nhược (Extremely Weak): < 25%",
            data: `• Luận giải: Ở trạng thái này, Mậu Thổ phải từ bỏ bản chất kiên định của mình để "Tòng" (Follow) theo hành vượng nhất trong lá số. Sự đấu tranh nội tâm giữa bản năng muốn ổn định và thực tế phải thuận theo dòng chảy có thể rất lớn.
• Lực lượng thuận lợi (Favorable Forces): Là lực lượng vượng nhất mà Mậu Thổ đang "Tòng" theo (có thể là Economic, Power, hoặc Creation Forces) và lực lượng sinh ra nó. Ví dụ, nếu Tòng theo Power Forces, thì Economic Forces cũng trở nên thuận lợi.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là Kỵ Thần số một. Sự xuất hiện của chúng sẽ phá vỡ thế "Tòng cách", gây ra xung đột và khủng hoảng định mệnh.
            `,
          },
        ],
      },
      {
        can: "Kỷ",
        forceRanges: [
          {
            id: 0,
            title: "Kỷ Thổ Cực Cường (Extremely Strong): > 74%",
            data: `• Luận giải: Ở trạng thái này, đất vườn đã tích tụ đến mức trở nên quá dày và đặc. Tính linh hoạt và nuôi dưỡng bị thay thế bởi sự bảo thủ, cố chấp và ì ở mức độ cực đoan. Họ quá tin vào bản thân đến mức từ chối mọi sự góp ý. Lòng tốt và mong muốn chăm sóc có thể biến thành sự kiểm soát và áp đặt.
• Lực lượng thuận lợi (Favorable Forces): Theo cấu trúc "Tòng Vượng", họ cực kỳ ưa Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival). Càng được sinh trợ và có đồng minh, mệnh cục càng trở nên thịnh vượng.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces (the Leader & the Warrior) là Kỵ Thần số một. Một chút áp lực hay kỷ luật cũng có thể "chọc giận" toàn bộ cấu trúc Vượng, gây ra sụp đổ thảm khốc. Economic Forces (the Provider & the Venturer) cũng rất bất lợi.
            `,
          },
          {
            id: 1,
            title: "Kỷ Thổ Cường (Strong): 65% – 74%",
            data: `• Luận giải: Đây là một Kỷ Thổ mạnh mẽ và tích cực. Họ có đủ nội lực để trở thành một trụ cột vững chắc cho gia đình và tổ chức. Họ đáng tin cậy, có trách nhiệm, và khả năng hỗ trợ, vun trồng của họ được phát huy tối đa.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đối lập để tiết chế bớt năng lượng. Power Forces (the Leader & the Warrior) mang lại kỷ luật và quyền lực; Economic Forces (the Provider & the Venturer) cho mục tiêu phấn đấu; Creation Forces (the Creator & the Innovator) để thể hiện tài năng.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival), vì chúng làm cho Kỷ Thổ càng thêm mạnh và mất cân bằng.
            `,
          },
          {
            id: 2,
            title: "Kỷ Thổ Cân Bằng (thiên Cường): 55% – 65%",
            data: `• Luận giải: Đây là phiên bản Kỷ Thổ vững vàng và chủ động hơn. Họ tự tin vào khả năng của mình, sẵn sàng đứng ra dẫn dắt, che chở và hỗ trợ người khác một cách mạnh mẽ. Họ là người bảo trợ đáng tin cậy.
• Lực lượng thuận lợi (Favorable Forces): Tương tự như Cường, ưu tiên Power Forces, Economic Forces, và Creation Forces để đạt đến sự cân bằng hoàn hảo.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces và Companion Forces.
            `,
          },
          {
            id: 3,
            title: "Kỷ Thổ Cân Bằng Thực Sự (True Balance): 45% – 55%",
            data: `• Luận giải: Đây là trạng thái lý tưởng nhất của Kỷ Thổ. Mọi phẩm chất tốt đẹp nhất được thể hiện một cách hài hòa. Họ giàu lòng nhân ái, kiên nhẫn, linh hoạt, khéo léo và có khả năng kiến tạo sự hòa hợp. Đây là mẫu người có thể phát triển ổn định và bền vững nhất.
• Lực lượng thuận lợi (Favorable Forces): Rất linh hoạt. Thường ưa các lực lượng giúp lưu thông khí trong lá số như the Creator/Innovator (Creation Forces). Tùy vào cấu trúc, có thể cần một chút Power Forces để có định hướng hoặc Economic Forces để có mục tiêu.
• Lực lượng bất lợi (Unfavorable Forces): Bất kỳ lực lượng nào xuất hiện quá nhiều làm phá vỡ thế cân bằng tinh tế sẵn có
            `,
          },
          {
            id: 4,
            title: "Kỷ Thổ Cân Bằng (thiên Nhược): 35% – 45%",
            data: `• Luận giải: Đây là phiên bản Kỷ Thổ khéo léo và linh hoạt hơn. Thay vì áp đặt, họ dùng sự lắng nghe sâu sắc và khả năng hợp tác tuyệt vời để vun trồng các mối quan hệ và dự án. Họ là nhà ngoại giao và người hòa giải tài tình.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đồng minh. Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) giúp Nhật Chủ vững vàng hơn.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces, Economic Forces, và Creation Forces.
            `,
          },
          {
            id: 5,
            title: "Kỷ Thổ Nhược (Weak): 25% – 35%",
            data: `• Luận giải: Đất vườn lúc này thiếu dưỡng chất. Sự linh hoạt biến thành sự do dự, thiếu chính kiến. Họ dễ bị môi trường và người khác tác động. Họ có xu hướng lo lắng nhiều, thiếu tự tin, và lòng tốt dễ bị lợi dụng.
• Lực lượng thuận lợi (Favorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là cần thiết nhất để sinh trợ và hỗ trợ.
• Lực lượng bất lợi (Unfavorable Forces): Rất kỵ Power Forces (the Leader & the Warrior), Economic Forces (the Provider & the Venturer), và Creation Forces (the Creator & the Innovator), vì chúng làm Nhật Chủ càng thêm suy yếu.
            `,
          },
          {
            id: 6,
            title: "Kỷ Thổ Cực Nhược (Extremely Weak): < 25%",
            data: `• Luận giải: Ở trạng thái này, Kỷ Thổ gần như mất đi bản chất của mình và phải "Tòng" (Follow) theo lực lượng đối lập vượng nhất trong lá số. Họ trở thành một người cực kỳ chuyên biệt, dồn hết năng lượng vào một hướng duy nhất.
• Lực lượng thuận lợi (Favorable Forces): Là lực lượng vượng nhất mà Nhật Chủ đang "Tòng" theo (có thể là Economic, Power, hoặc Creation Forces) và lực lượng sinh ra nó. Ví dụ, nếu Tòng theo Economic Forces, thì Creation Forces cũng trở nên thuận lợi.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là Kỵ Thần số một. Sự xuất hiện của chúng sẽ phá vỡ thế "Tòng cách", khiến Nhật Chủ cố gắng trở lại bản chất yếu ớt của mình và gây ra xung đột nội tâm dữ dội.`,
          },
        ],
      },
      {
        can: "Canh",
        forceRanges: [
          {
            id: 0,
            title: "Canh Kim Cực Cường (Extremely Strong): > 74%",
            data: `• Luận giải: Lúc này, thanh kiếm đã trở thành một vũ khí hủy diệt không thể kiểm soát. Sự quyết đoán biến thành sự liều lĩnh, phá phách. Lòng nghĩa khí trở thành sự cố chấp cực đoan, sẵn sàng "chém" phăng mọi thứ cản đường mà không cần suy xét hậu quả. Họ là một lực lượng của sự thay đổi dữ dội, một cuộc cách mạng không khoan nhượng.
• Lực lượng thuận lợi (Favorable Forces): Theo cấu trúc "Tòng Vượng", họ cực kỳ ưa Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival). Càng được bồi đắp và có đồng minh, sức mạnh càng trở nên áp đảo.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces (the Leader & the Warrior) là Kỵ Thần số một. Lửa (Hỏa) rèn Kim lúc này sẽ gây ra một sự chống trả dữ dội, dẫn đến cả hai cùng bị hủy diệt. Economic Forces (the Provider & the Venturer) cũng rất bất lợi.
            `,
          },
          {
            id: 1,
            title: "Canh Kim Cường (Strong): 65% – 74%",
            data: `• Luận giải: Đây là hình mẫu Canh Kim của chiến binh, của vị tướng quân. Họ trọng nghĩa khí, công bằng, và hành động. Họ là người bạn trung thành nhưng cũng là đối thủ đáng gờm. Với họ, vấn đề được giải quyết bằng hành động trực diện và dứt khoát, không phải bằng mưu mẹo hay lời nói.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đối lập để được tôi luyện. Power Forces (the Leader & the Warrior) để biến kim loại thô thành vũ khí hữu dụng; Economic Forces (the Provider & the Venturer) để có mục tiêu chinh phục; Creation Forces (the Creator & the Innovator) để thể hiện sức mạnh.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival), vì chúng khiến kim loại trở nên quá cứng và giòn, dễ gãy.
            `,
          },
          {
            id: 2,
            title: "Canh Kim Cân Bằng (thiên Cường): 55% – 65%",
            data: `• Luận giải: Đây là phiên bản Canh Kim chủ động và có mục đích rõ ràng. Họ dùng sức mạnh của mình để bảo vệ công lý, thực thi kỷ luật. Họ là những nhà lãnh đạo hành động, những người thực thi pháp luật, những người tiên phong dọn đường.
• Lực lượng thuận lợi (Favorable Forces): Ưu tiên Power Forces, Economic Forces, và Creation Forces.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces và Companion Forces.
            `,
          },
          {
            id: 3,
            title: "Canh Kim Cân Bằng Thực Sự (True Balance): 45% – 55%",
            data: `• Luận giải: Đây là trạng thái lý tưởng nhất của Canh Kim. Sự cứng rắn của họ được cân bằng bởi trí tuệ và sự công tâm. Họ là người phân xử, người đàm phán, người có khả năng nhìn nhận vấn đề một cách khách quan và đưa ra quyết định dựa trên lẽ phải.
• Lực lượng thuận lợi (Favorable Forces): Rất linh hoạt. Thường ưa Power Forces (the Leader/Warrior) để có được thẩm quyền chính thức, và Creation Forces (the Creator/Innovator) để thể hiện sự khôn ngoan của mình.
• Lực lượng bất lợi (Unfavorable Forces): Bất kỳ lực lượng nào xuất hiện quá nhiều làm phá vỡ sự cân bằng.
            `,
          },
          {
            id: 4,
            title: "Canh Kim Cân Bằng (thiên Nhược): 35% – 45%",
            data: `• Luận giải: Đây là phiên bản Canh Kim có tiềm năng nhưng cần sự định hướng. Họ vẫn có sự cứng rắn và nghĩa khí, nhưng cởi mở hơn trong việc hợp tác và tuân theo một khuôn khổ. Họ là những người đồng đội trung thành, sẵn sàng cống hiến cho một mục tiêu lớn hơn.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đồng minh. Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) giúp họ trở nên mạnh mẽ hơn.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces, Economic Forces, và Creation Forces.
            `,
          },
          {
            id: 5,
            title: "Canh Kim Nhược (Weak): 25% – 35%",
            data: `• Luận giải: Bản chất của họ là muốn hành động, muốn quyết đoán, nhưng lại thiếu sức mạnh và sự tự tin để làm điều đó. Điều này tạo ra sự ức chế và bất mãn lớn. Họ sợ xung đột, sợ phải đưa ra quyết định và thường trì hoãn hành động.
• Lực lượng thuận lợi (Favorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là cần thiết nhất để "mài sắc" lại thanh kiếm.
• Lực lượng bất lợi (Unfavorable Forces): Rất kỵ Power Forces (the Leader & the Warrior) - như lửa nung chảy kim loại yếu. Economic Forces và Creation Forces cũng làm họ kiệt sức.
            `,
          },
          {
            id: 6,
            title: "Canh Kim Cực Nhược (Extremely Weak): < 25%",
            data: `• Luận giải: Ở trạng thái này, Canh Kim phải từ bỏ bản chất "chiến binh" của mình để "Tòng" (Follow) theo lực lượng đối lập vượng nhất. Họ phải học cách tồn tại bằng cách trở thành công cụ cho một sức mạnh khác.
• Lực lượng thuận lợi (Favorable Forces): Là lực lượng vượng nhất mà Nhật Chủ đang "Tòng" theo (có thể là Economic, Power, hoặc Creation Forces) và lực lượng sinh ra nó.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là Kỵ Thần số một. Một chút hỗ trợ cũng sẽ "đánh thức" bản năng chiến binh, phá vỡ cấu trúc Tòng cách và gây ra tai họa.
            `,
          },
        ],
      },
      {
        can: "Tân",
        forceRanges: [
          {
            id: 0,
            title: "Tân Kim Cực Cường (Extremely Strong): > 74%",
            data: `• Luận giải: Lúc này, viên kim cương không còn tỏa sáng mà trở nên sắc lạnh và nguy hiểm. Sự tinh tế biến thành sự chỉ trích, phán xét cực đoan. Lòng tự tôn trở thành sự kiêu ngạo và tự mãn tột độ. Lời nói của họ sắc như dao, làm tổn thương tất cả những ai đến gần. Họ tự cô lập mình trong một thế giới hoàn hảo nhưng không có sự ấm áp.
• Lực lượng thuận lợi (Favorable Forces): Theo cấu trúc "Tòng Vượng", họ cực kỳ ưa Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival).
• Lực lượng bất lợi (Unfavorable Forces): Power Forces (the Leader & the Warrior) là Kỵ Thần số một. Lửa (Hỏa) nung chảy món trang sức tinh xảo sẽ hủy hoại hoàn toàn giá trị của nó. Economic Forces (the Provider & the Venturer) cũng rất bất lợi.
            `,
          },
          {
            id: 1,
            title: "Tân Kim Cường (Strong): 65% – 74%",
            data: `• Luận giải: Đây là hình mẫu Tân Kim của người nổi bật bằng giá trị và sự tinh xảo. Họ là những chuyên gia hàng đầu, những nhà phê bình sắc sảo, những nghệ sĩ theo đuổi sự hoàn mỹ. Họ có lòng tự tôn cao, yêu cái đẹp và luôn đòi hỏi chất lượng tốt nhất trong mọi việc. Lời nói của họ rất có trọng lượng.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đối lập. Power Forces (the Leader & the Warrior) để định hình giá trị; Creation Forces (the Creator & the Innovator) để tỏa sáng lấp lánh; Economic Forces (the Provider & the Venturer) để giá trị của họ được công nhận.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) - như đất bùn làm bẩn viên ngọc. Companion Forces (the Companion & the Rival) - vì kim cương không muốn bị so sánh với những viên đá khác.
            `,
          },
          {
            id: 2,
            title: "Tân Kim Cân Bằng (thiên Cường): 55% – 65%",
            data: `• Luận giải: Đây là phiên bản Tân Kim chủ động dùng sự sắc bén của mình để tạo ra giá trị. Họ là những chuyên gia có khả năng phân tích, mổ xẻ vấn đề một cách chính xác. Họ lãnh đạo bằng kiến thức chuyên môn và tiêu chuẩn cao.
• Lực lượng thuận lợi (Favorable Forces): Ưu tiên Power Forces, Economic Forces, và Creation Forces.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces và Companion Forces.
            `,
          },
          {
            id: 3,
            title: "Tân Kim Cân Bằng Thực Sự (True Balance): 45% – 55%",
            data: `• Luận giải: Đây là trạng thái lý tưởng nhất của Tân Kim. Sự sắc bén của họ được cân bằng bởi sự duyên dáng và tinh tế. Họ vừa có giá trị nội tại, vừa biết cách thể hiện ra ngoài một cách thu hút. Họ là những người có gu thẩm mỹ cao, những nhà ngoại giao thanh lịch.
• Lực lượng thuận lợi (Favorable Forces): Rất linh hoạt. Thường ưa Creation Forces (the Creator/Innovator) để thể hiện vẻ đẹp của mình và Power Forces (the Leader/Warrior) để được đặt trong một bối cảnh xứng đáng.
• Lực lượng bất lợi (Unfavorable Forces): Bất kỳ lực lượng nào xuất hiện quá nhiều làm phá vỡ sự cân bằng.
            `,
          },
          {
            id: 4,
            title: "Tân Kim Cân Bằng (thiên Nhược): 35% – 45%",
            data: `• Luận giải: Đây là phiên bản Tân Kim khiêm tốn và cần được nâng đỡ. Giá trị của họ vẫn ở đó, nhưng họ cần một môi trường, một bối cảnh phù hợp để tỏa sáng. Họ giỏi lắng nghe và hoàn thiện bản thân thông qua góp ý.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đồng minh. Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) giúp họ tự tin hơn vào giá trị của mình.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces, Economic Forces, và Creation Forces.
            `,
          },
          {
            id: 5,
            title: "Tân Kim Nhược (Weak): 25% – 35%",
            data: `• Luận giải: Họ cảm nhận được giá trị tiềm ẩn của bản thân nhưng lại thiếu sự hỗ trợ (Đất) để được khai phá và ngọn lửa (Lửa) để được mài giũa. Điều này tạo ra cảm giác tự ti, mặc cảm, cảm thấy mình bị đánh giá thấp hoặc không được công nhận.
• Lực lượng thuận lợi (Favorable Forces): Support Forces (the Mentor & the Maverick) - như đất mang khoáng sản - là quan trọng nhất. Companion Forces (the Companion & the Rival) cũng rất cần thiết.
• Lực lượng bất lợi (Unfavorable Forces): Rất kỵ Power Forces (the Leader & the Warrior) - như lửa nung chảy món trang sức yếu ớt. Economic Forces và Creation Forces cũng làm họ kiệt sức.

            `,
          },
          {
            id: 6,
            title: "Tân Kim Cực Nhược (Extremely Weak): < 25%",
            data: `• Luận giải: Ở trạng thái này, Tân Kim phải từ bỏ hoàn toàn lòng tự tôn và giá trị cá nhân để "Tòng" (Follow) theo lực lượng đối lập vượng nhất. Họ phải tìm thấy giá trị của mình thông qua việc phục vụ cho một mục đích hoặc một sức mạnh khác.
• Lực lượng thuận lợi (Favorable Forces): Là lực lượng vượng nhất mà Nhật Chủ đang "Tòng" theo (có thể là Economic, Power, hoặc Creation Forces) và lực lượng sinh ra nó.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là Kỵ Thần số một. Một chút hỗ trợ cũng sẽ "đánh thức" lòng tự tôn, phá vỡ cấu trúc Tòng cách và gây ra khủng hoảng.
            `,
          },
        ],
      },
      {
        can: "Nhâm",
        forceRanges: [
          {
            id: 0,
            title: "Nhâm Thủy Cực Cường (Extremely Strong): > 74%",
            data: `• Luận giải: Ở trạng thái này, đại dương không còn hiền hòa mà trở thành một cơn lũ không thể kiểm soát. Sự thông minh và tự do biến thành sự liều lĩnh, ngông cuồng và kiêu ngạo. Giống như một cơn sóng thần, họ cuốn phăng mọi thứ trên đường đi, tạo ra sự hỗn loạn và không tuân theo bất kỳ quy tắc nào.
• Lực lượng thuận lợi (Favorable Forces): Theo cấu trúc "Tòng Vượng", họ cực kỳ ưa Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival). Càng có nhiều Kim sinh và Thủy trợ, dòng chảy càng trở nên mạnh mẽ vô địch.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces (the Leader & the Warrior) là Kỵ Thần số một. Một chút đất (Thổ) cố gắng ngăn chặn dòng lũ sẽ chỉ khiến nó trở nên hung tợn và phá vỡ tất cả. Economic Forces (the Provider & the Venturer) cũng rất bất lợi.
            `,
          },
          {
            id: 1,
            title: "Nhâm Thủy Cường (Strong): 65% – 74%",
            data: `• Luận giải: Đây là hình mẫu Nhâm Thủy của nhà chiến lược, nhà thám hiểm, hoặc thương nhân lớn. Họ thông minh, có tầm nhìn xa, linh hoạt và luôn chuyển động. Giống như một dòng sông lớn, họ có khả năng kết nối các vùng đất, tạo ra các tuyến giao thương và mang lại sự thịnh vượng. Sức mạnh của họ rất lớn và có tầm ảnh hưởng rộng.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đối lập để năng lượng được hữu dụng. Power Forces (the Leader & the Warrior) để xây đê, tạo ra phương hướng; Economic Forces (the Provider & the Venturer) là mục tiêu để chinh phục; Creation Forces (the Creator & the Innovator) để Thủy sinh Mộc, thể hiện trí tuệ.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival), vì chúng khiến dòng chảy trở nên quá mạnh và mất kiểm soát.
            `,
          },
          {
            id: 2,
            title: "Nhâm Thủy Cân Bằng (thiên Cường): 55% – 65%",
            data: `• Luận giải: Đây là phiên bản Nhâm Thủy chủ động và đầy tham vọng. Họ tự tin vào khả năng của mình để chinh phục những mục tiêu lớn. Họ là những người tiên phong, không ngại dấn thân vào những lĩnh vực mới mẻ và đầy thách thức.
• Lực lượng thuận lợi (Favorable Forces): Ưu tiên Power Forces, Economic Forces, và Creation Forces.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces và Companion Forces.
            `,
          },
          {
            id: 3,
            title: "Nhâm Thủy Cân Bằng Thực Sự (True Balance): 45% – 55%",
            data: `• Luận giải: Đây là trạng thái lý tưởng nhất của Nhâm Thủy. Trí tuệ của họ sâu sắc nhưng tĩnh lặng. Họ có khả năng nhìn thấu vấn đề mà không bị cuốn theo sự hỗn loạn bên ngoài. Họ linh hoạt nhưng không dễ dao động, mạnh mẽ nhưng không áp đảo. Họ là những nhà tư tưởng, nhà hoạch định chính sách khôn ngoan.
• Lực lượng thuận lợi (Favorable Forces): Rất linh hoạt. Thường ưa Creation Forces (the Creator/Innovator) để trí tuệ của họ được thể hiện ra ngoài, và Power Forces (the Leader/Warrior) để có được sự ổn định và định hướng.
• Lực lượng bất lợi (Unfavorable Forces): Bất kỳ lực lượng nào xuất hiện quá nhiều làm phá vỡ sự cân bằng.
            `,
          },
          {
            id: 4,
            title: "Nhâm Thủy Cân Bằng (thiên Nhược): 35% – 45%",
            data: `• Luận giải: Đây là phiên bản Nhâm Thủy khéo léo và có mục đích. Họ hiểu rằng sức mạnh của mình sẽ được phát huy tốt nhất khi chảy trong một hệ thống có sẵn. Họ giỏi tận dụng các nguồn lực và làm việc hiệu quả trong một tập thể.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đồng minh. Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) giúp dòng chảy không bao giờ cạn.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces, Economic Forces, và Creation Forces.
            `,
          },
          {
            id: 5,
            title: "Nhật Chủ Giáp Mộc Nhược (Weak): 25% – 35%",
            data: `• Luận giải: Bản năng của họ là muốn vươn lên thẳng tắp, nhưng lại thiếu "nước" (hỗ trợ) và "đất" (nguồn lực) để làm điều đó. Điều này tạo ra cảm giác bất lực, hoài bão lớn nhưng không thể thực hiện. Họ sợ bị "chặt hạ" bởi áp lực và chỉ trích.
• Lực lượng thuận lợi (Favorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là cần thiết nhất để cây có thể lớn lên.
• Lực lượng bất lợi (Unfavorable Forces): Rất kỵ Power Forces (the Leader & the Warrior) - như rìu chặt cây non. Creation Forces và Economic Forces cũng làm họ kiệt sức.
            `,
          },
          {
            id: 6,
            title: "Nhâm Thủy Nhược (Weak): 25% – 35%",
            data: `• Luận giải: Bản chất của họ là muốn chảy, muốn được tự do, nhưng lại thiếu nguồn (Kim) và đồng minh (Thủy) để tạo thành dòng. Điều này tạo ra cảm giác bị mắc kẹt, tù túng và bất mãn. Trí thông minh của họ không được sử dụng, gây ra sự trì trệ.
• Lực lượng thuận lợi (Favorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là cần thiết nhất để tạo ra dòng chảy.
• Lực lượng bất lợi (Unfavorable Forces): Rất kỵ Power Forces (the Leader & the Warrior) - như đất đắp ngăn vũng nước nhỏ. Creation Forces và Economic Forces cũng làm họ khô cạn.
            `,
          },
        ],
      },
      {
        can: "Quý",
        forceRanges: [
          {
            id: 0,
            title: "Quý Thủy Cực Cường (Extremely Strong): > 74%",
            data: `• Luận giải: Lúc này, cơn mưa nuôi dưỡng vạn vật đã trở thành một trận mưa dai dẳng, lạnh lẽo và u ám, gây ra ngập úng. Sự thâm nhập tinh tế biến thành sự soi mói, đa nghi. Nội tâm sâu sắc trở thành sự u uất, trầm cảm. Họ tạo ra một môi trường cảm xúc tiêu cực, làm "thối rữa" mọi sự sống.
• Lực lượng thuận lợi (Favorable Forces): Theo cấu trúc "Tòng Vượng", họ cực kỳ ưa Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival).
• Lực lượng bất lợi (Unfavorable Forces): Power Forces (the Leader & the Warrior) là Kỵ Thần số một. Đất (Thổ) cố gắng ngăn chặn cơn mưa dầm sẽ chỉ biến thành bùn lầy. Economic Forces (the Provider & the Venturer) cũng rất bất lợi.
            `,
          },
          {
            id: 1,
            title: "Quý Thủy Cường (Strong): 65% – 74%",
            data: `• Luận giải: Đây là hình mẫu Quý Thủy của người thầy, người chữa lành, người nuôi dưỡng tinh thần. Trí tuệ của họ không phô trương mà thấm nhuần một cách nhẹ nhàng, từ tốn. Họ kiên nhẫn, thấu cảm và có khả năng dùng lời nói, kiến thức của mình để tưới tẩm cho tâm hồn người khác.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đối lập. Power Forces (the Leader & the Warrior) để dòng suối chảy trong русло; Economic Forces (the Provider & the Venturer) để chinh phục ngọn lửa; Creation Forces (the Creator & the Innovator) để nuôi dưỡng cây cối.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival), vì chúng khiến dòng suối trở nên quá lớn và mất đi sự trong trẻo.
            `,
          },
          {
            id: 2,
            title: "Quý Thủy Cân Bằng (thiên Cường): 55% – 65%",
            data: `• Luận giải: Đây là phiên bản Quý Thủy chủ động hơn trong việc lan tỏa ảnh hưởng. Giống như sương mù, họ thâm nhập vào mọi ngóc ngách một cách thầm lặng nhưng hiệu quả. Họ là những nhà chiến lược, những người có khả năng gây ảnh hưởng mà không cần đối đầu trực diện.
• Lực lượng thuận lợi (Favorable Forces): Ưu tiên Power Forces, Economic Forces, và Creation Forces.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces và Companion Forces.
            `,
          },
          {
            id: 3,
            title: "Quý Thủy Cân Bằng Thực Sự (True Balance): 45% – 55%",
            data: `• Luận giải: Đây là trạng thái lý tưởng nhất của Quý Thủy. Họ tinh khiết, trong trẻo và mang trong mình cả một thế giới. Trí tuệ của họ cô đọng và quý giá. Họ là những nghệ sĩ, nhà thơ, những người có khả năng nhìn thấy vẻ đẹp và sự thật trong những điều nhỏ bé nhất.
• Lực lượng thuận lợi (Favorable Forces): Rất linh hoạt. Thường ưa Creation Forces (the Creator/Innovator) để nuôi dưỡng và thể hiện sự sáng tạo, và Economic Forces (the Provider/Venturer) để mang lại giá trị thực tế.
• Lực lượng bất lợi (Unfavorable Forces): Bất kỳ lực lượng nào xuất hiện quá nhiều làm phá vỡ sự cân bằng.
            `,
          },
          {
            id: 4,
            title: "Quý Thủy Cân Bằng (thiên Nhược): 35% – 45%",
            data: `• Luận giải: Đây là phiên bản Quý Thủy khiêm tốn, mang lại sự an ủi và chữa lành. Họ không chủ động gây ảnh hưởng mà chờ đợi được tìm đến. Họ là những người bạn tâm giao, người biết lắng nghe và đưa ra lời khuyên chân thành.
• Lực lượng thuận lợi (Favorable Forces): Ưa các lực lượng đồng minh. Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là rất quan trọng.
• Lực lượng bất lợi (Unfavorable Forces): Power Forces, Economic Forces, và Creation Forces.
            `,
          },
          {
            id: 5,
            title: "Quý Thủy Nhược (Weak): 25% – 35%",
            data: `• Luận giải: Năng lượng của họ rất yếu ớt, dễ bay hơi. Họ cảm thấy mình nhỏ bé và bất lực trước cuộc sống. Nội tâm của họ đầy lo âu và nhạy cảm. Họ dễ bị tổn thương và thường nhìn cuộc sống qua lăng kính bi quan.
• Lực lượng thuận lợi (Favorable Forces): Support Forces (the Mentor & the Maverick) - như nguồn nước - là quan trọng nhất. Companion Forces (the Companion & the Rival) cũng rất cần thiết.
• Lực lượng bất lợi (Unfavorable Forces): Rất kỵ Power Forces (the Leader & the Warrior) - như đất hút cạn nước. Creation Forces và Economic Forces cũng làm họ kiệt quệ.
            `,
          },
          {
            id: 6,
            title: "Quý Thủy Cực Nhược (Extremely Weak): < 25%",
            data: `• Luận giải: Ở trạng thái này, Quý Thủy gần như vô hình và phải "Tòng" (Follow) theo lực lượng đối lập vượng nhất. Họ phải học cách tồn tại bằng cách hòa tan hoàn toàn vào một năng lượng khác.
• Lực lượng thuận lợi (Favorable Forces): Là lực lượng vượng nhất mà Nhật Chủ đang "Tòng" theo (có thể là Economic, Power, hoặc Creation Forces) và lực lượng sinh ra nó.
• Lực lượng bất lợi (Unfavorable Forces): Support Forces (the Mentor & the Maverick) và Companion Forces (the Companion & the Rival) là Kỵ Thần số một. Một chút hỗ trợ cũng sẽ khiến "hơi thở" ngưng tụ, phá vỡ cấu trúc Tòng cách và gây ra khủng hoảng.
            `,
          },
        ],
      },
    ];
    return forceData.find((item) => item.can === can).forceRanges;
  };

  const getNguHanhHoTro = (nguHanh) => {
    switch (nguHanh) {
      case "Thủy":
        return "Kim";
      case "Thổ":
        return "Hỏa";
      case "Mộc":
        return "Thủy";
      case "Kim":
        return "Thổ";
      case "Hỏa":
        return "Mộc";
      default:
        return "";
    }
  };

  const getSupportPercent = (nhatChu, nguHanhScore) => {
    let dongHanhPercent = 0;
    let hoTroPercent = 0;
    let nhatChuNguHanh = nhatChu.nguHanhCan;

    for (let nguHanh of nguHanhScore) {
      if (nguHanh.name === nhatChuNguHanh) {
        dongHanhPercent = nguHanh.percent;
      }
      if (nguHanh.name === getNguHanhHoTro(nhatChuNguHanh)) {
        hoTroPercent = nguHanh.percent;
      }
    }

    return {
      dongHanh: {
        name: nhatChuNguHanh,
        percent: parseFloat(dongHanhPercent),
      },
      hoTro: {
        name: getNguHanhHoTro(nhatChuNguHanh),
        percent: parseFloat(hoTroPercent),
      },
      ratio: parseFloat(dongHanhPercent / hoTroPercent).toFixed(2),
      totalPercent: (
        parseFloat(dongHanhPercent) + parseFloat(hoTroPercent)
      ).toFixed(2),
    };
  };

  const getRoleText = (dongHanhPercent, hoTroPercent) => {
    if (dongHanhPercent > hoTroPercent) {
      return "Lực Lượng Đồng Hành có vai trò quan trọng hơn Lực Lượng Hỗ Trợ trong việc cấu thành Sức Mạnh của Nhật Chủ";
    } else if (dongHanhPercent < hoTroPercent) {
      return "Lực Lượng Hỗ Trợ có vai trò quan trọng hơn Lực Lượng Đồng Hành trong việc cấu thành Sức Mạnh của Nhật Chủ";
    } else {
      return "Lực Lượng Đồng Hành và Lực Lượng Hỗ Trợ có vai trò tương đương trong việc cấu thành Sức Mạnh Nhật Chủ";
    }
  };

  const getNameFromIndex = (index) => {
    switch (index) {
      case 0:
        return "Cực Cường";
      case 1:
        return "Cường";
      case 2:
        return "Cân Bằng Thiên Cường";
      case 3:
        return "Cân Bằng Thực Sự";
      case 4:
        return "Cân Bằng Thiên Nhược";
      case 5:
        return "Nhược";
      case 6:
        return "Cực Nhược";
    }
  };

  const getForcesDetail = (nhatChu, dongHanhPercent, hoTroPercent) => {
    let forces = getSupportForces(nhatChu.can);
    let totalPercent = dongHanhPercent + hoTroPercent;
    let majorForcesIndex = 0;
    if (totalPercent > 74) {
      majorForcesIndex = 0;
    } else if (totalPercent >= 65) {
      majorForcesIndex = 1;
    } else if (totalPercent >= 55) {
      majorForcesIndex = 2;
    } else if (totalPercent >= 45) {
      majorForcesIndex = 3;
    } else if (totalPercent >= 35) {
      majorForcesIndex = 4;
    } else if (totalPercent >= 25) {
      majorForcesIndex = 5;
    } else {
      majorForcesIndex = 6;
    }
    let minorForcesIndex = null;
    if (
      Math.round(dongHanhPercent / totalPercent) !==
      Math.round(hoTroPercent / totalPercent)
    ) {
      if (
        Math.round(dongHanhPercent) > Math.round(hoTroPercent) &&
        majorForcesIndex !== 0
      ) {
        minorForcesIndex = majorForcesIndex - 1;
      } else if (
        Math.round(dongHanhPercent / totalPercent) <
          Math.round(hoTroPercent / totalPercent) &&
        majorForcesIndex !== 6
      ) {
        minorForcesIndex = majorForcesIndex + 1;
      }
    }

    return {
      majorForces: {
        name: getNameFromIndex(majorForcesIndex),
        title: forces[majorForcesIndex].title,
        data: forces[majorForcesIndex].data,
      },
      minorForces:
        minorForcesIndex || minorForcesIndex == 0
          ? {
              name: getNameFromIndex(minorForcesIndex),
              title: forces[minorForcesIndex].title,
              data: forces[minorForcesIndex].data,
            }
          : { name: "", title: "", data: "" },
    };
  };

  const getAdditionPercent = (nguHanh, nguHanhScore, nguHanhScoreGoc) => {
    let nguHanhIndex = nguHanhScore.findIndex((item) => item.name === nguHanh);
    let additionPercent =
      nguHanhScore[nguHanhIndex].percent -
      nguHanhScoreGoc[nguHanhIndex].percent;
    let percentAm =
      nguHanhScore[nguHanhIndex].percentAm -
      nguHanhScoreGoc[nguHanhIndex].percentAm;
    let percentDuong =
      nguHanhScore[nguHanhIndex].percentDuong -
      nguHanhScoreGoc[nguHanhIndex].percentDuong;
    return {
      total:
        (additionPercent > 0 ? "+" : "") + additionPercent.toFixed(2) + "%",
      am: (percentAm > 0 ? "+" : "") + percentAm.toFixed(2) + "%",
      duong: (percentDuong > 0 ? "+" : "") + percentDuong.toFixed(2) + "%",
    };
  };

  const getTuTruData = (bazi, baseInfo) => {
    let nam = bazi.year;
    let thang = bazi.month;
    let nhatChu = bazi.day;
    let gio = bazi.hour;
    let nguHanhScoreGoc = bazi.nguHanhScoreGoc;
    let nguHanhScore = bazi.nguHanhScore;
    let daiVan = bazi.daiVan;
    let tieuVan = bazi.tieuVan;
    let nguyetVan = bazi.nguyetVan;
    let nhatVan = bazi.nhatVan;
    let thoiVan = bazi.thoiVan;

    let tuTru = `
    1. Lá Số Tứ Trụ của ${baseInfo.gioiTinh === 1 ? "anh" : "chị"} ${
      baseInfo.hoTen
    } sinh năm ${baseInfo.namSinh}
Trụ Năm Chính:${nam.name}
•	Can: ${nam.can} (${nam.thapThan})
•	Chi: ${nam.chi} 
•	Can Tàng (100%): ${nam.canTangPercent
      .map((item) => `${item.name} ${item.score * 2}% (${item.thapThan})`)
      .join(" + ")}
•	Ngũ Hành Nạp Âm: ${nam.nguHanhNapAm}. (${nam.nguHanhNapAmThapThan})
Trụ Tháng Chính:${thang.name}
•	Can: ${thang.can} (${thang.thapThan})
•	Chi: ${thang.chi} 
•	Can Tàng (100%): ${thang.canTangPercent
      .map((item) => `${item.name} ${item.score * 2}% (${item.thapThan})`)
      .join(" + ")}
•	Ngũ Hành Nạp Âm: ${thang.nguHanhNapAm}. (${thang.nguHanhNapAmThapThan})
Trụ Ngày Chính:${nhatChu.name}
•	Can: ${nhatChu.can} (${nhatChu.thapThan})
•	Chi: ${nhatChu.chi} 
•	Can Tàng (100%): ${nhatChu.canTangPercent
      .map((item) => `${item.name} ${item.score * 2}% (${item.thapThan})`)
      .join(" + ")}
•	Ngũ Hành Nạp Âm: ${nhatChu.nguHanhNapAm}. (${nhatChu.nguHanhNapAmThapThan})
Trụ Giờ Chính:${gio ? gio.name : ""}
•	Can: ${gio ? gio.can : ""} (${gio ? gio.thapThan : ""})
•	Chi: ${gio ? gio.chi : ""} (${gio ? gio.thapThan : ""})
•	Can Tàng (100%): ${
      gio
        ? gio.canTangPercent
            .map((item) => `${item.name} ${item.score * 2}% (${item.thapThan})`)
            .join(" + ")
        : ""
    }
•	Ngũ Hành Nạp Âm: ${gio ? gio.nguHanhNapAm : ""}. (${
      gio ? gio.nguHanhNapAmThapThan : ""
    })${
      daiVan
        ? `\n\nThông tin các Trụ Thời Gian (Biến) của ${
            baseInfo.gioiTinh === 1 ? "anh" : "chị"
          } ${baseInfo.hoTen} sinh năm ${baseInfo.namSinh} tại đại vận thứ ${
            daiVan.decadeIndex
          }${
            baseInfo.gioThoiVan && !baseInfo.onlyDecade
              ? " thời điểm " + (baseInfo.gioThoiVan - 1) * 2 + "h"
              : ""
          }${
            baseInfo.ngayLuuNhat && !baseInfo.onlyDecade
              ? " ngày " + baseInfo.ngayLuuNhat
              : ""
          }${
            baseInfo.thangLuuNguyet && !baseInfo.onlyDecade
              ? " tháng " + baseInfo.thangLuuNguyet
              : ""
          }${
            baseInfo.namXemTieuVan && !baseInfo.onlyDecade
              ? " năm " + baseInfo.namXemTieuVan
              : ""
          }`
        : ""
    }${
      daiVan
        ? `\nTrụ Đại Vận Biến: ${daiVan.name}
•	Can: ${daiVan.can} (${daiVan.thapThan})
•	Chi: ${daiVan.chi}
•	Can Tàng: ${daiVan.canTangPercent
            .map((item) => `${item.name} ${item.score * 2}% (${item.thapThan})`)
            .join(" + ")}`
        : ""
    }${
      tieuVan
        ? `\nTrụ Năm Biến: ${tieuVan.name} 
•	Can: ${tieuVan.can} (${tieuVan.thapThan})
•	Chi: ${tieuVan.chi}
•	Can Tàng: ${tieuVan.canTangPercent
            .map((item) => `${item.name} ${item.score * 2}% (${item.thapThan})`)
            .join(" + ")}`
        : ""
    }${
      nguyetVan
        ? `\nTrụ Tháng Biến: ${nguyetVan.name}
•	Can: ${nguyetVan.can} (${nguyetVan.thapThan})
•	Chi: ${nguyetVan.chi}
•	Can Tàng: ${nguyetVan.canTangPercent
            .map((item) => `${item.name} ${item.score * 2}% (${item.thapThan})`)
            .join(" + ")}`
        : ""
    }${
      nhatVan
        ? `\nTrụ Ngày Biến: ${nhatVan.name}
•	Can: ${nhatVan.can} (${nhatVan.thapThan})
•	Chi: ${nhatVan.chi}
•	Can Tàng: ${nhatVan.canTangPercent
            .map((item) => `${item.name} ${item.score * 2}% (${item.thapThan})`)
            .join(" + ")}`
        : ""
    }${
      thoiVan
        ? `\nTrụ Giờ Biến: ${thoiVan.name}
•	Can: ${thoiVan.can} (${thoiVan.thapThan})
•	Chi: ${thoiVan.chi}
•	Can Tàng: ${thoiVan.canTangPercent
            .map((item) => `${item.name} ${item.score * 2}% (${item.thapThan})`)
            .join(" + ")}`
        : ""
    }    

4. Tỷ Trọng Ngũ Hành gốc của ${baseInfo.gioiTinh === 1 ? "anh" : "chị"} ${
      baseInfo.hoTen
    } sinh năm ${baseInfo.namSinh}
  ${nguHanhScoreGoc
    .map(
      (item) =>
        `• ${item.name}(${getCuongNhuoc(item.percent)}) = ${item.percent}%.
        -${item.name} (${item.thapThan[0]}) = ${item.percentAm}%, 
        +${item.name} (${item.thapThan[1]}) = ${item.percentDuong}%`
    )
    .join("\n\n")}
  
Cấp độ sức mạnh của Nhật Chủ (Chính): Hành ${
      getSupportPercent(nhatChu, nguHanhScoreGoc).dongHanh.name
    } (Đồng Hành) ${
      getSupportPercent(nhatChu, nguHanhScoreGoc).dongHanh.percent
    }% + Hành ${
      getSupportPercent(nhatChu, nguHanhScoreGoc).hoTro.name
    } (Hỗ Trợ) ${
      getSupportPercent(nhatChu, nguHanhScoreGoc).hoTro.percent
    }% = ${
      getSupportPercent(nhatChu, nguHanhScoreGoc).totalPercent
    }%. Tuy nhiên do ${getRoleText(
      getSupportPercent(nhatChu, nguHanhScoreGoc).dongHanh.percent,
      getSupportPercent(nhatChu, nguHanhScoreGoc).hoTro.percent
    )} nên Sức Mạnh của Nhật Chủ được AGI xác định tương đối tại ${
      !getForcesDetail(
        nhatChu,
        getSupportPercent(nhatChu, nguHanhScoreGoc).dongHanh.percent,
        getSupportPercent(nhatChu, nguHanhScoreGoc).hoTro.percent
      ).minorForces.name
        ? ""
        : "2"
    } cấp độ ${
      getForcesDetail(
        nhatChu,
        getSupportPercent(nhatChu, nguHanhScoreGoc).dongHanh.percent,
        getSupportPercent(nhatChu, nguHanhScoreGoc).hoTro.percent
      ).majorForces.name
    }${
      getForcesDetail(
        nhatChu,
        getSupportPercent(nhatChu, nguHanhScoreGoc).dongHanh.percent,
        getSupportPercent(nhatChu, nguHanhScoreGoc).hoTro.percent
      ).minorForces.name
        ? " và " +
          getForcesDetail(
            nhatChu,
            getSupportPercent(nhatChu, nguHanhScoreGoc).dongHanh.percent,
            getSupportPercent(nhatChu, nguHanhScoreGoc).hoTro.percent
          ).minorForces.name
        : ""
    }     
${
  getForcesDetail(
    nhatChu,
    getSupportPercent(nhatChu, nguHanhScoreGoc).dongHanh.percent,
    getSupportPercent(nhatChu, nguHanhScoreGoc).hoTro.percent
  ).majorForces.title
}
${
  getForcesDetail(
    nhatChu,
    getSupportPercent(nhatChu, nguHanhScoreGoc).dongHanh.percent,
    getSupportPercent(nhatChu, nguHanhScoreGoc).hoTro.percent
  ).majorForces.data
}
${
  getForcesDetail(
    nhatChu,
    getSupportPercent(nhatChu, nguHanhScoreGoc).dongHanh.percent,
    getSupportPercent(nhatChu, nguHanhScoreGoc).hoTro.percent
  ).minorForces?.title
}
${
  getForcesDetail(
    nhatChu,
    getSupportPercent(nhatChu, nguHanhScoreGoc).dongHanh.percent,
    getSupportPercent(nhatChu, nguHanhScoreGoc).hoTro.percent
  ).minorForces?.data
}${
      daiVan
        ? `\nTỷ Trọng Ngũ Hành của ${baseInfo.gioiTinh === 1 ? "anh" : "chị"} ${
            baseInfo.hoTen
          } sinh năm ${baseInfo.namSinh} tại đại vận thứ ${daiVan.decadeIndex}${
            baseInfo.gioThoiVan && !baseInfo.onlyDecade
              ? " thời điểm " + (baseInfo.gioThoiVan - 1) * 2 + "h"
              : ""
          }${
            baseInfo.ngayLuuNhat && !baseInfo.onlyDecade
              ? " ngày " + baseInfo.ngayLuuNhat
              : ""
          }${
            baseInfo.thangLuuNguyet && !baseInfo.onlyDecade
              ? " tháng " + baseInfo.thangLuuNguyet
              : ""
          }${
            baseInfo.namXemTieuVan && !baseInfo.onlyDecade
              ? " năm " + baseInfo.namXemTieuVan
              : ""
          } (đính kèm dữ liệu tăng/giảm so với tỷ trọng chính)
  ${nguHanhScore
    .map(
      (item) =>
        `• ${item.name}(${getCuongNhuoc(item.percent)}) = ${item.percent}% (${
          daiVan
            ? getAdditionPercent(item.name, nguHanhScore, nguHanhScoreGoc).total
            : ""
        }).
        -${item.name} (${item.thapThan[0]}) = ${item.percentAm}% (${
          daiVan
            ? getAdditionPercent(item.name, nguHanhScore, nguHanhScoreGoc).am
            : ""
        }), 
        +${item.name} (${item.thapThan[1]}) = ${item.percentDuong}% (${
          daiVan
            ? getAdditionPercent(item.name, nguHanhScore, nguHanhScoreGoc).duong
            : ""
        })`
    )
    .join("\n\n")}
Cấp độ sức mạnh của Nhật Chủ (Biến): Hành ${
            getSupportPercent(nhatChu, nguHanhScore).dongHanh.name
          } (Đồng Hành) ${
            getSupportPercent(nhatChu, nguHanhScore).dongHanh.percent
          }% + Hành ${
            getSupportPercent(nhatChu, nguHanhScore).hoTro.name
          } (Hỗ Trợ) ${
            getSupportPercent(nhatChu, nguHanhScore).hoTro.percent
          }% = ${
            getSupportPercent(nhatChu, nguHanhScore).totalPercent
          }%. Tuy nhiên do ${getRoleText(
            getSupportPercent(nhatChu, nguHanhScore).dongHanh.percent,
            getSupportPercent(nhatChu, nguHanhScore).hoTro.percent
          )} nên Sức Mạnh của Nhật Chủ được AGI xác định tương đối tại ${
            !getForcesDetail(
              nhatChu,
              getSupportPercent(nhatChu, nguHanhScore).dongHanh.percent,
              getSupportPercent(nhatChu, nguHanhScore).hoTro.percent
            ).minorForces.name
              ? ""
              : "2"
          } cấp độ ${
            getForcesDetail(
              nhatChu,
              getSupportPercent(nhatChu, nguHanhScore).dongHanh.percent,
              getSupportPercent(nhatChu, nguHanhScore).hoTro.percent
            ).majorForces.name
          }${
            getForcesDetail(
              nhatChu,
              getSupportPercent(nhatChu, nguHanhScore).dongHanh.percent,
              getSupportPercent(nhatChu, nguHanhScore).hoTro.percent
            ).minorForces.name
              ? " và " +
                getForcesDetail(
                  nhatChu,
                  getSupportPercent(nhatChu, nguHanhScore).dongHanh.percent,
                  getSupportPercent(nhatChu, nguHanhScore).hoTro.percent
                ).minorForces.name
              : ""
          } 
${
  getForcesDetail(
    nhatChu,
    getSupportPercent(nhatChu, nguHanhScore).dongHanh.percent,
    getSupportPercent(nhatChu, nguHanhScore).hoTro.percent
  ).majorForces.title
}
${
  getForcesDetail(
    nhatChu,
    getSupportPercent(nhatChu, nguHanhScore).dongHanh.percent,
    getSupportPercent(nhatChu, nguHanhScore).hoTro.percent
  ).majorForces.data
}
${
  getForcesDetail(
    nhatChu,
    getSupportPercent(nhatChu, nguHanhScore).dongHanh.percent,
    getSupportPercent(nhatChu, nguHanhScore).hoTro.percent
  ).minorForces?.title
}
${
  getForcesDetail(
    nhatChu,
    getSupportPercent(nhatChu, nguHanhScore).dongHanh.percent,
    getSupportPercent(nhatChu, nguHanhScore).hoTro.percent
  ).minorForces?.data
}`
        : ""
    }
5. Ngũ Hành Nạp Âm
•	Trụ Năm:  ${nam.nguHanhNapAm}
•	Trụ Tháng: ${thang.nguHanhNapAm}
•	Trụ Ngày: ${nhatChu.nguHanhNapAm}
•	Trụ Giờ: ${gio ? gio.nguHanhNapAm : ""}

${getNapAm(nam.nguHanhNapAm)}\n
${getNapAm(thang.nguHanhNapAm)}\n
${getNapAm(nhatChu.nguHanhNapAm)}\n
${getNapAm(gio ? gio.nguHanhNapAm : "")}
`;
    return tuTru;
  };

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
        nameEn: "The Master + Guardian + Captialist + Hero + Executive",
        saoList: [1, 2, 4, 7, 11],
      },
      {
        id: 1,
        name: "Tử Vũ Liêm Sát Phá Tham",
        nameEn:
          "The Master + Capitalist + Executive + Breaker + Taker + Seeker",
        saoList: [1, 2, 4, 9, 13, 14],
      },
      {
        id: 2,
        name: "Sát Phá Tham",
        nameEn: "The Breaker + Taker + Seeker",
        saoList: [9, 13, 14],
      },
      {
        id: 3,
        name: "Phủ Tướng",
        nameEn: "The Guardian + Hero",
        saoList: [7, 11],
      },
      {
        id: 4,
        name: "Cơ Nguyệt Đồng Lương",
        nameEn: "The Thinker + Listener + Linker + Fortuner",
        saoList: [3, 6, 8, 12],
      },
      {
        id: 5,
        name: "Cơ Đồng Cự",
        nameEn: "The Thinker + Linker + Disruptor",
        saoList: [3, 6, 10], //
      },
      {
        id: 6,
        name: "Cự Nhật",
        nameEn: "The Disruptor + Visionary",
        saoList: [5, 10],
      },
      {
        id: 7,
        name: "Âm Lương Dương",
        nameEn: "The Listener + Visionary + Fortuner",
        saoList: [5, 8, 12],
      },
    ];
    let tamHopList = [
      ["Mệnh", "Tài Bạch", "Quan lộc"],
      ["Phúc đức", "Phu thê", "Thiên Di"],
      ["Phụ mẫu", "Tử tức", "Nô bộc"],
      ["Huynh đệ", "Tật Ách", "Điền trạch"],
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

  const getNguHanhChi = (chi) => {
    switch (chi) {
      case "Tý":
        return "+Thủy";
      case "Sửu":
        return "-Thổ";
      case "Dần":
        return "+Mộc";
      case "Mão":
        return "-Mộc";
      case "Thìn":
        return "+Thổ";
      case "Tỵ":
        return "-Hỏa";
      case "Ngọ":
        return "+Hỏa";
      case "Mùi":
        return "-Thổ";
      case "Thân":
        return "+Kim";
      case "Dậu":
        return "-Kim";
      case "Tuất":
        return "+Thổ";
      case "Hợi":
        return "-Thủy";
      default:
        return "";
    }
  };
  // Tử Vi Base chỉ còn: 14 chính tinh, Tả Hữu Xương Khúc, Không Kiếp, Hỏa Linh, Tuần Triệt, Kình Đà

  function capitalizeWords(str = "") {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "); //
  }

  function getSao(cungChu, thapNhiCung, tamHop = false) {
    const newChinhTinh = [
      51, 52, 53, 54, 55, 56, 57, 58, 61, 62, 92, 93, 94, 95,
    ];
    cungArr = thapNhiCung.filter((c) => {
      return c.cungChu === cungChu;
    });
    if (cungArr.length > 0) {
      let cung = cungArr[0];
      const { cungSao, cungSo } = cung;
      const chinhTinhGoc = cungSao.filter(
        (sao) => sao.saoAmDuong && sao.saoAmDuong !== ""
      );
      let chinhTinhMoi = cungSao.filter(
        (sao) => newChinhTinh.includes(sao.saoID)
        // !checkSaoDaiVan(sao.saoTen) &&
        // !checkSaoLuuNien(sao.saoTen) &&
        // !checkSaoLuuNguyet(sao.saoTen) &&
        // !checkSaoLuuNhat(sao.saoTen)
      );
      // let saoDaiVan = cungSao.filter((sao) => checkSaoDaiVan(sao.saoTen));
      // let saoLuuNien = cungSao.filter((sao) => checkSaoLuuNien(sao.saoTen));
      // let saoLuuNguyet = cungSao.filter((sao) => checkSaoLuuNguyet(sao.saoTen));
      // let saoLuuNhat = cungSao.filter((sao) => checkSaoLuuNhat(sao.saoTen));
      // let chinhTinhDaiVanId = [92, 93, 94, 95];
      // let chinhTinhDaiVan = saoDaiVan.filter((sao) =>
      //   chinhTinhDaiVanId.includes(sao.saoID)
      // );
      // let phuTinhDaiVan = saoDaiVan.filter(
      //   (sao) => !chinhTinhDaiVanId.includes(sao.saoID)
      // );
      let tuan = cung.tuanTrung;
      let triet = cung.trietLo;
      let chinhTinh = [...chinhTinhGoc, ...chinhTinhMoi];
      if (tamHop) {
        chinhTinh = [...chinhTinhMoi];
      }
      if (tuan) {
        chinhTinh = [...chinhTinh, { saoTen: "Tuần" }];
        chinhTinhMoi = [...chinhTinhMoi, { saoTen: "Tuần" }];
      }
      if (triet) {
        chinhTinh = [...chinhTinh, { saoTen: "Triệt" }];
        chinhTinhMoi = [...chinhTinhMoi, { saoTen: "Triệt" }];
      }
      // if (cung.daiVanTuanTrung) {
      //   saoDaiVan = [...saoDaiVan, { saoTen: "X. Void Zone" }];
      //   chinhTinhDaiVan = [...chinhTinhDaiVan, { saoTen: "X. Void Zone" }];
      // }
      // if (cung.daiVanTrietLo) {
      //   saoDaiVan = [...saoDaiVan, { saoTen: "X. Void Cut" }];
      //   chinhTinhDaiVan = [...chinhTinhDaiVan, { saoTen: "X. Void Cut" }];
      // }
      // if (cung.luuNienTuanTrung) {
      //   saoLuuNien = [...saoLuuNien, { saoTen: "Y. Void Zone" }];
      // }
      // if (cung.luuNienTrietLo) {
      //   saoLuuNien = [...saoLuuNien, { saoTen: "Y. Void Cut" }];
      // }
      // if (cung.luuNguyetTuanTrung) {
      //   saoLuuNguyet = [...saoLuuNguyet, { saoTen: "M. Void Zone" }];
      // }
      // if (cung.luuNguyetTrietLo) {
      //   saoLuuNguyet = [...saoLuuNguyet, { saoTen: "M. Void Cut" }];
      // }

      const phuTinh = cungSao.filter(
        (sao) => sao.saoAmDuong === "" && !newChinhTinh.includes(sao.saoID)
        // !checkSaoDaiVan(sao.saoTen) &&
        // !checkSaoLuuNien(sao.saoTen) &&
        // !checkSaoLuuNguyet(sao.saoTen) &&
        // !checkSaoLuuNhat(sao.saoTen)
      );

      return {
        voChinhDieu: chinhTinhGoc.length === 0,
        chinhTinhGoc: chinhTinhGoc.map((sao) => sao.saoTen).join(" + "),
        newChinhTinh: chinhTinhMoi.map((sao) => sao.saoTen).join(" + "),
        chinhTinh: chinhTinh
          .map((sao) => capitalizeWords(sao.saoTen))
          .join(" + "),
        phuTinh: phuTinh.map((sao) => capitalizeWords(sao.saoTen)).join(" + "),
        // daiVan: saoDaiVan.map((sao) => capitalizeWords(sao.saoTen)).join(" + "),
        // chinhTinhDaiVan: chinhTinhDaiVan
        //   .map((sao) => capitalizeWords(sao.saoTen))
        //   .join(" + "),
        // phuTinhDaiVan: phuTinhDaiVan
        //   .map((sao) => capitalizeWords(sao.saoTen))
        //   .join(" + "),
        // luuNien: saoLuuNien
        //   .map((sao) => capitalizeWords(sao.saoTen))
        //   .join(" + "),
        // luuNguyet: saoLuuNguyet
        //   .map((sao) => capitalizeWords(sao.saoTen))
        //   .join(" + "),
        // luuNhat: saoLuuNhat
        //   .map((sao) => capitalizeWords(sao.saoTen))
        //   .join(" + "),
        // cungDaiHan: cung.cungDaiHan,
      };
    }
    return {
      chinhTinh: "",
      phuTinh: "",
    };
  }

  const getXungChieu = (cungChu) => {
    switch (cungChu) {
      case "Mệnh":
        return "Thiên Di";
      case "Tài Bạch":
        return "Phúc đức";
      case "Phúc đức":
        return "Tài Bạch";
      case "Phu thê":
        return "Quan lộc";
      case "Thiên Di":
        return "Mệnh";
      case "Quan lộc":
        return "Phu thê";
      case "Phụ mẫu":
        return "Tật Ách";
      case "Tật Ách":
        return "Phụ mẫu";
      case "Tử tức":
        return "Điền trạch";
      case "Điền trạch":
        return "Tử tức";
      case "Nô bộc":
        return "Huynh đệ";
      case "Huynh đệ":
        return "Nô bộc";
      default:
        return "";
    }
  };

  const getCanTangData = (diaChi) => {
    let canTangIndex = {
      1: [
        { id: 10, name: "Quý", score: 46.65 },
        { id: 9, name: "Nhâm", score: 3.35 },
      ], // Tý: Quý,Nhâm
      2: [
        { id: 6, name: "Kỷ", score: 30 },
        { id: 8, name: "Tân", score: 15 },
        { id: 10, name: "Quý", score: 5 },
      ], // Sửu: Kỷ, Tân, Quý
      3: [
        { id: 1, name: "Giáp", score: 30 },
        { id: 3, name: "Bính", score: 15 },
        { id: 5, name: "Mậu", score: 5 },
      ], // Dần: Giáp, Bính, Mậu
      4: [
        { id: 2, name: "Ất", score: 46.35 },
        { id: 1, name: "Giáp", score: 3.35 },
      ], // Mão: Ất,Giáp
      5: [
        { id: 5, name: "Mậu", score: 46.65 },
        { id: 10, name: "Quý", score: 5 },
        { id: 2, name: "Ất", score: 3.35 },
      ], // Thìn: Mậu, Quý, Ất
      6: [
        { id: 3, name: "Bính", score: 30 },
        { id: 7, name: "Canh", score: 15 },
        { id: 5, name: "Mậu", score: 5 },
      ], // Tỵ: Bính, Canh, Mậu
      7: [
        { id: 4, name: "Đinh", score: 30 },
        { id: 6, name: "Kỷ", score: 20 },
      ], // Ngọ: Đinh, Kỷ
      8: [
        { id: 6, name: "Kỷ", score: 30 },
        { id: 2, name: "Ất", score: 15 },
        { id: 4, name: "Đinh", score: 5 },
      ], // Mùi: Kỷ, Ất, Đinh
      9: [
        { id: 7, name: "Canh", score: 30 },
        { id: 9, name: "Nhâm", score: 15 },
        { id: 5, name: "Mậu", score: 5 },
      ], // Thân: Canh, Nhâm, Mậu
      10: [
        { id: 8, name: "Tân", score: 46.65 },
        { id: 7, name: "Canh", score: 3.35 },
      ], // Dậu: Tân,Canh
      11: [
        { id: 5, name: "Mậu", score: 30 },
        { id: 4, name: "Đinh", score: 15 },
        { id: 8, name: "Tân", score: 5 },
      ], // Tuất: Mậu, Đinh, Tân
      12: [
        { id: 9, name: "Nhâm", score: 30 },
        { id: 1, name: "Giáp", score: 20 },
      ], // Hợi: Nhâm, Giáp
    };
    return canTangIndex[diaChi];
  };

  function checkNguHanhRelationshipDetailed(hanh1, hanh2) {
    // Chuyển đổi tên ngũ hành sang ID
    const hanhToId = {
      K: 1, // Kim
      M: 2, // Mộc
      T: 3, // Thủy
      H: 4, // Hỏa
      O: 5, // Thổ
    };

    const id1 = hanhToId[hanh1];
    const id2 = hanhToId[hanh2];

    if (!id1 || !id2) {
      throw new Error("Ngũ hành phải là K, M, T, H, hoặc O");
    }

    // Nếu cùng ngũ hành
    if (id1 === id2) {
      return "Ngang nhau";
    }

    // Ma trận tương sinh tương khắc
    // 1: Kim, 2: Mộc, 3: Thủy, 4: Hỏa, 5: Thổ
    // 0: Ngang nhau, 1: Sinh, -1: Được sinh, 2: Khắc, -2: Bị khắc
    const relationshipMatrix = [
      [null, null, null, null, null, null],
      [null, 0, 2, 1, -2, -1], // Kim
      [null, -2, 0, -1, 1, 2], // Mộc
      [null, -1, 1, 0, 2, -2], // Thủy
      [null, 2, -1, -2, 0, 1], // Hỏa
      [null, 1, -2, 2, -1, 0], // Thổ
    ];

    const rel12 = relationshipMatrix[id1][id2];

    if (rel12 === 1) return "Sinh"; // hanh1 sinh hanh2
    if (rel12 === -1) return "Được sinh"; // hanh2 sinh hanh1 (hanh1 được sinh)
    if (rel12 === 2) return "Khắc"; // hanh1 khắc hanh2
    if (rel12 === -2) return "Bị khắc"; // hanh2 khắc hanh1 (hanh1 bị khắc)
    return "Ngang nhau";
  }

  const getNguHanhCan = (thienCan) => {
    switch (thienCan) {
      case "Giáp":
        return {
          nguHanh: "M",
          amDuong: 1,
        };
      case "Ất":
        return {
          nguHanh: "M",
          amDuong: -1,
        };
      case "Bính":
        return {
          nguHanh: "H",
          amDuong: 1,
        };
      case "Đinh":
        return {
          nguHanh: "H",
          amDuong: -1,
        };
      case "Mậu":
        return {
          nguHanh: "O",
          amDuong: 1,
        };
      case "Kỷ":
        return {
          nguHanh: "O",
          amDuong: -1,
        };
      case "Canh":
        return {
          nguHanh: "K",
          amDuong: 1,
        };
      case "Tân":
        return {
          nguHanh: "K",
          amDuong: -1,
        };
      case "Nhâm":
        return {
          nguHanh: "T",
          amDuong: 1,
        };
      case "Quý":
        return {
          nguHanh: "T",
          amDuong: -1,
        };
    }
  };

  const getThapThan = (nguHanhThienCan, nguHanhNhatChu, cungDau) => {
    let relationship = checkNguHanhRelationshipDetailed(
      nguHanhNhatChu,
      nguHanhThienCan
    );

    // Bảng thập thần dựa trên mối quan hệ ngũ hành và âm dương
    const thapThanMap = {
      "Ngang nhau": {
        cungDau: { tenDayDu: "Tỷ Kiên", goiTat: "Tỷ" },
        khacDau: { tenDayDu: "Kiếp Tài", goiTat: "Kiếp" },
      },
      Sinh: {
        cungDau: { tenDayDu: "Thực Thần", goiTat: "Thực" },
        khacDau: { tenDayDu: "Thương Quan", goiTat: "Thương" },
      },
      "Được sinh": {
        cungDau: { tenDayDu: "Thiên Ấn", goiTat: "Kiêu" },
        khacDau: { tenDayDu: "Chính Ấn", goiTat: "Ấn" },
      },
      Khắc: {
        cungDau: { tenDayDu: "Thiên Tài", goiTat: "Thiên" },
        khacDau: { tenDayDu: "Chính Tài", goiTat: "Tài" },
      },
      "Bị khắc": {
        cungDau: { tenDayDu: "Thiên Quan", goiTat: "Sát" },
        khacDau: { tenDayDu: "Chính Quan", goiTat: "Quan" },
      },
    };

    const thapThan = thapThanMap[relationship];
    if (!thapThan) {
      throw new Error(
        `Không xác định được thập thần cho mối quan hệ: ${relationship}`
      );
    }

    return cungDau ? thapThan.cungDau.tenDayDu : thapThan.khacDau.tenDayDu;
  };

  const getCungInfo = (cungChu, thapNhiCung, nhatChu) => {
    let cung = thapNhiCung.find((cung) => cung.cungChu === cungChu);
    let canTangData = getCanTangData(cung.cungSo);

    return `Cung ${cungChu}${
      cung.cungThan ? " kiêm nhiệm cung an Thân" : ""
    }: Địa Chi: ${cung.cungTen} (${getNguHanhChi(
      cung.cungTen
    )}), Can Tàng: ${canTangData
      .map((item) => {
        return (
          item.name +
          " " +
          item.score * 2 +
          "% (" +
          getThapThan(
            getNguHanhCan(item.name).nguHanh,
            getNguHanhCan(nhatChu).nguHanh,
            getNguHanhCan(item.name).amDuong === getNguHanhCan(nhatChu).amDuong
          ) +
          ")"
        );
      })
      .join(" + ")}, Sao gốc: ${
      getSao(cung.cungChu, thapNhiCung).chinhTinhGoc
        ? getSao(cung.cungChu, thapNhiCung).chinhTinh
        : `Vô Chính Diệu có ${
            getSao(getXungChieu(cung.cungChu), thapNhiCung).chinhTinhGoc
          } xung chiếu, ${getSao(cung.cungChu, thapNhiCung).newChinhTinh}`
    }`;
  };

  const getTamHopData = (thapNhiCung, nhatChu) => {
    let tamHopList = [
      {
        id: 1,
        name: "Mệnh Tài Quan",
        cung: ["Mệnh", "Tài Bạch", "Quan lộc"],
      },
      {
        id: 2,
        name: "Phúc Phối Di",
        cung: ["Phúc đức", "Phu thê", "Thiên Di"],
      },
      { id: 3, name: "Phụ Tử Nô", cung: ["Phụ mẫu", "Tử tức", "Nô bộc"] },
      {
        id: 4,
        name: "Huynh Tật Điền",
        cung: ["Huynh đệ", "Tật Ách", "Điền trạch"],
      },
    ];
    const cungCachList = getBasicInfo(thapNhiCung).cungCach;
    let tamHopData = tamHopList.map((item, index) => {
      return `${item.id}. Tam hợp ${item.name}: Dạng cách cục ${
        cungCachList[index]
      }
      ${item.cung
        .map((cungChu) => getCungInfo(cungChu, thapNhiCung, nhatChu))
        .join("\n")}
      `;
    });
    return tamHopData.join("\n");
  };

  function getBatTuTemplate(bazi) {
    // let nam = bazi.year;
    // let thang = bazi.month;
    // let ngay = bazi.day;
    // let gio = bazi.hour;
    // let nguHanhScore = bazi.nguHanhScore;
    let thapNhiCung = bazi.thapNhiCung;
    let baseInfo = bazi.baseInfo;
    let daiVan = bazi.daiVan;
    if (daiVan?.decadeIndex === 0) {
      return `Chưa thể xác định đại vận cho đến năm ${daiVan.yearStartDecade}`;
    }
    let batTuTemplate = `Hồ sơ AGI của ${
      baseInfo.gioiTinh === 1 ? "anh" : "chị"
    } ${baseInfo.hoTen} sinh năm ${baseInfo.namSinh}
    Phần 1: Tứ Trụ
    ${getTuTruData(bazi, baseInfo)}
    ${
      !baseInfo.boTruGio
        ? `Phần 2: Tử Vi. Trợ lý AGI bắt buộc phải suy xét Ngũ Hành Cung, Thập Thần tàng trong Cung
    ${getTamHopData(thapNhiCung, bazi.day.can)}`
        : ""
    }`;
    return batTuTemplate;
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
    $("#tenGioBatTu").text(gio ? gio.name : "");
    $("#napAmGioBatTu").text(gio ? gio.nguHanhNapAm : "");
    $("#nguHanhCanGioBatTu").text(gio ? gio.nguHanhCan : "");
    $("#nguHanhChiGioBatTu").text(gio ? gio.nguHanhChi : "");
    $("#tenDaiVanBatTu").text(bazi.daiVan ? bazi.daiVan.name : "");
    $("#napAmDaiVanBatTu").text(bazi.daiVan ? bazi.daiVan.nguHanhNapAm : "");
    $("#nguHanhCanDaiVanBatTu").text(bazi.daiVan ? bazi.daiVan.nguHanhCan : "");
    $("#nguHanhChiDaiVanBatTu").text(bazi.daiVan ? bazi.daiVan.nguHanhChi : "");
    $("#tenTieuVanBatTu").text(bazi.tieuVan ? bazi.tieuVan.name : "");
    $("#napAmTieuVanBatTu").text(bazi.tieuVan ? bazi.tieuVan.nguHanhNapAm : "");
    $("#nguHanhCanTieuVanBatTu").text(
      bazi.tieuVan ? bazi.tieuVan.nguHanhCan : ""
    );
    $("#nguHanhChiTieuVanBatTu").text(
      bazi.tieuVan ? bazi.tieuVan.nguHanhChi : ""
    );
    $("#tenNguyetVanBatTu").text(bazi.nguyetVan ? bazi.nguyetVan.name : "");
    $("#napAmNguyetVanBatTu").text(
      bazi.nguyetVan ? bazi.nguyetVan.nguHanhNapAm : ""
    );
    $("#nguHanhCanNguyetVanBatTu").text(
      bazi.nguyetVan ? bazi.nguyetVan.nguHanhCan : ""
    );
    $("#nguHanhChiNguyetVanBatTu").text(
      bazi.nguyetVan ? bazi.nguyetVan.nguHanhChi : ""
    );
    $("#tenNhatVanBatTu").text(bazi.nhatVan ? bazi.nhatVan.name : "");
    $("#napAmNhatVanBatTu").text(bazi.nhatVan ? bazi.nhatVan.nguHanhNapAm : "");
    $("#nguHanhCanNhatVanBatTu").text(
      bazi.nhatVan ? bazi.nhatVan.nguHanhCan : ""
    );
    $("#nguHanhChiNhatVanBatTu").text(
      bazi.nhatVan ? bazi.nhatVan.nguHanhChi : ""
    );
    $("#tenThoiVanBatTu").text(bazi.thoiVan ? bazi.thoiVan.name : "");
    $("#napAmThoiVanBatTu").text(bazi.thoiVan ? bazi.thoiVan.nguHanhNapAm : "");
    $("#nguHanhCanThoiVanBatTu").text(
      bazi.thoiVan ? bazi.thoiVan.nguHanhCan : ""
    );
    $("#nguHanhChiThoiVanBatTu").text(
      bazi.thoiVan ? bazi.thoiVan.nguHanhChi : ""
    );
    $("#tenNamTru").text(nam.name);
    $("#tenThangTru").text(thang.name);
    $("#tenNgayTru").text(ngay.name);
    $("#tenGioTru").text(gio ? gio.name : "");
    $("#tenDaiVanTru").text(bazi.daiVan ? bazi.daiVan.name : "");
    $("#tenTieuVanTru").text(bazi.tieuVan ? bazi.tieuVan.name : "");
    $("#tenNguyetVanTru").text(bazi.nguyetVan ? bazi.nguyetVan.name : "");
    $("#tenNhatVanTru").text(bazi.nhatVan ? bazi.nhatVan.name : "");
    $("#tenThoiVanTru").text(bazi.thoiVan ? bazi.thoiVan.name : "");
    $("#canTangNam").text(nam.canTang);
    $("#canTangThang").text(thang.canTang);
    $("#canTangNgay").text(ngay.canTang);
    $("#canTangGio").text(gio ? gio.canTang : "");
    $("#canTangDaiVan").text(bazi.daiVan ? bazi.daiVan.canTang : "");
    $("#canTangTieuVan").text(bazi.tieuVan ? bazi.tieuVan.canTang : "");
    $("#canTangNguyetVan").text(bazi.nguyetVan ? bazi.nguyetVan.canTang : "");
    $("#canTangNhatVan").text(bazi.nhatVan ? bazi.nhatVan.canTang : "");
    $("#canTangThoiVan").text(bazi.thoiVan ? bazi.thoiVan.canTang : "");
    $("#thapThanNam").text(nam.thapThan);
    $("#thapThanThang").text(thang.thapThan);
    $("#thapThanNgay").text(ngay.thapThan);
    $("#thapThanGio").text(gio ? gio.thapThan : "");
    $("#thapThanDaiVan").text(bazi.daiVan ? bazi.daiVan.thapThan : "");
    $("#thapThanTieuVan").text(bazi.tieuVan ? bazi.tieuVan.thapThan : "");
    $("#thapThanNguyetVan").text(bazi.nguyetVan ? bazi.nguyetVan.thapThan : "");
    $("#thapThanNhatVan").text(bazi.nhatVan ? bazi.nhatVan.thapThan : "");
    $("#thapThanThoiVan").text(bazi.thoiVan ? bazi.thoiVan.thapThan : "");
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
    $("#batTuTemplate").html(getBatTuTemplate(bazi).replace(/\n/g, "<br>"));
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
