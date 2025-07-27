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
        thapThanText: `- Giáp (+Mộc) - Tỷ Kiên: Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.
    Tích cực: Tăng cường sự tự tin, ý chí độc lập. Có nhiều bạn bè tốt, cùng chí hướng, hỗ trợ nhau trong việc lớn.
    Tiêu cực: Cạnh tranh cực kỳ gay gắt để giành vị trí dẫn đầu. Dễ xảy ra mâu thuẫn, xung đột với bạn bè, đồng nghiệp. Không ai chịu nhường ai.

- Ất (-Mộc) - Kiếp Tài: Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.
    Tích cực: Đây là sự kết hợp tốt nhất cho Ất Mộc. Hình ảnh dây leo (Ất) quấn quanh cây lớn (Giáp) để vươn lên. Có quý nhân, người có năng lực che chở, giúp đỡ để thăng tiến.
    Tiêu cực: Dễ trở nên quá phụ thuộc, ỷ lại. Nếu không có Giáp Mộc, sẽ cảm thấy mất phương hướng.

- Bính (+Hỏa) - Thực Thần: Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).
    Tích cực: Đây là hình ảnh đẹp nhất của Giáp Mộc (Mộc Hỏa thông minh). Cây lớn được mặt trời chiếu rọi, phát triển rực rỡ. Mang lại trí thông minh, sự lạc quan, tài năng sáng tạo và khả năng biểu đạt xuất sắc.
    Tiêu cực: Dễ trở nên quá khoe khoang, thích thể hiện. Có thể vì quá tập trung vào việc thể hiện mà trở nên thiếu thực tế.

- Đinh (-Hỏa) - Thương Quan: Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).
    Tích cực: Mang lại sự sáng tạo tinh tế, khả năng đi sâu vào chi tiết. Có tài năng trong các lĩnh vực nghệ thuật, kỹ thuật đòi hỏi sự tỉ mỉ.
    Tiêu cực: Hình ảnh cây lớn (Giáp) làm nhiên liệu cho ngọn lửa nhỏ (Đinh). Sự sáng tạo này làm tiêu hao rất nhiều năng lượng. Dễ bị kiệt sức, lao tâm khổ tứ.

- Mậu (+Thổ) - Chính Tài: Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.
    Tích cực: Giáp Kỷ hợp hóa Thổ. Cây lớn cắm rễ vào mảnh đất màu mỡ. Mang lại tài lộc ổn định, bền vững. Nam mệnh có vợ hiền, là người biết vun vén, hỗ trợ chồng.
    Tiêu cực: Dễ trở nên quá thực tế, chỉ quan tâm đến tiền bạc. Có thể vì gia đình, vợ con mà mất đi chí lớn.

- Kỷ (-Thổ) - Thiên Tài: Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).
    Tích cực: Hình ảnh cây cổ thụ mọc trên ngọn núi lớn. Có cơ hội kiếm những khoản tiền lớn, tham gia vào các dự án tầm cỡ, đặc biệt là bất động sản.
    Tiêu cực: Kiếm tiền rất vất vả, phải đối mặt với thử thách lớn. Cần nỗ lực rất nhiều mới có thể thành công.

- Canh (+Kim) - Chính Quan: Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).
    Tích cực: Hình ảnh dao kéo (Tân) tỉa bớt cành lá cho cây (Giáp). Giúp Giáp Mộc trở nên gọn gàng, hữu dụng hơn. Mang lại danh tiếng, địa vị, sự nghiệp ổn định. Nữ mệnh có chồng khéo léo, biết cách góp ý.
    Tiêu cực: Luôn cảm thấy bị gò bó, kiểm soát bởi những quy tắc nhỏ nhặt. Dễ bị cấp trên hoặc chồng "chỉnh đốn" gây khó chịu.

- Tân (-Kim) - Thất Sát: Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).
    Tích cực: Khi Giáp Mộc cực cường và có Hỏa để chế ngự Kim, có thể mang lại quyền lực tối cao trong các môi trường khắc nghiệt. Có khả năng đảm đương trọng trách lớn.
    Tiêu cực: Đây là kẻ thù nguy hiểm nhất của Giáp Mộc. Hình ảnh rìu lớn (Canh) chặt đổ cây cổ thụ. Gây ra tai họa, tai nạn, bệnh tật nặng, kiện tụng. Nữ mệnh tình duyên cực kỳ trắc trở.

- Nhâm (+Thủy) - Chính Ấn: Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.
    Tích cực: Hình ảnh mưa nhỏ, sương mai (Quý) tưới cho cây. Mang lại sự hỗ trợ từ mẹ, quý nhân một cách nhẹ nhàng, tinh tế. Có trí thông minh, lòng nhân ái, ham học hỏi.
    Tiêu cực: Nguồn hỗ trợ này không đủ mạnh để Giáp Mộc phát triển thành cây đại thụ. Có thể chỉ có bằng cấp nhưng kiến thức không quá sâu sắc.

- Quý (-Thủy) - Thiên Ấn: Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.
    Tích cực: Hình ảnh sông lớn (Nhâm) bồi đắp phù sa cho cây. Mang lại nguồn hỗ trợ mạnh mẽ, kiến thức uyên bác, tư duy độc đáo. Có quý nhân quyền thế giúp đỡ.
    Tiêu cực: Khi Thủy quá cường, cây sẽ bị úng rễ hoặc bị cuốn trôi. Sự giúp đỡ quá mức có thể làm hại. Dễ trở nên lười biếng, suy nghĩ viển vông.`,
      },
      {
        name: "Ất",
        thapThanText: `- Ất (-Mộc) - Tỷ Kiên: Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.
  Tích cực: Có nhiều bạn bè, mối quan hệ xã hội tốt. Giỏi hợp tác, làm việc nhóm.
  Tiêu cực: Cạnh tranh ngầm rất gay gắt. Dễ bị bạn bè lôi kéo vào những chuyện thị phi, bè phái. Hay đố kỵ, so bì với nhau.

- Giáp (+Mộc) - Kiếp Tài: Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.
  Tích cực: Đây là sự kết hợp tốt nhất cho Ất Mộc. Hình ảnh dây leo (Ất) quấn quanh cây lớn (Giáp) để vươn lên. Có quý nhân, người có năng lực che chở, giúp đỡ để thăng tiến.
  Tiêu cực: Dễ trở nên quá phụ thuộc, ỷ lại. Nếu không có Giáp Mộc, sẽ cảm thấy mất phương hướng.

- Đinh (-Hỏa) - Thực Thần: Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).
  Tích cực: Mang lại sự sáng tạo tinh tế, khả năng biểu đạt nghệ thuật. Lời nói duyên dáng, có sức thuyết phục. Có tài năng trong lĩnh vực ẩm thực, thời trang, làm đẹp.
  Tiêu cực: Dễ trở nên quá đam mê hưởng thụ, thiếu ý chí phấn đấu. Sự sáng tạo có phần nhỏ bé, không tạo ra đột phá lớn.

- Bính (+Hỏa) - Thương Quan: Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).
  Tích cực: Đây là Thần quan trọng nhất của Ất Mộc. Hình ảnh hoa cỏ (Ất) hướng về mặt trời (Bính). Mang lại sự lạc quan, trí thông minh, khả năng sáng tạo và danh tiếng. Giúp Ất Mộc trở nên nổi bật và được công nhận.
  Tiêu cực: Dễ trở nên quá khoe khoang, thích thể hiện. Có thể hơi phù phiếm, chỉ chú trọng đến vẻ bề ngoài.

- Mậu (+Thổ) - Chính Tài: Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.
  Tích cực: Có cơ hội tiếp xúc với những nguồn tài chính lớn, ổn định. Nam mệnh có thể lấy được vợ hiền, có gia thế tốt.
  Tiêu cực: Hình ảnh hoa cỏ yếu ớt mọc trên núi cao. Kiếm tiền rất vất vả, khó khăn. Dễ bị các vấn đề tài chính làm cho mệt mỏi.

- Kỷ (-Thổ) - Thiên Tài: Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).
  Tích cực: Hình ảnh hoa cỏ mọc trên đất vườn màu mỡ. Có nhiều cơ hội kiếm tiền, kinh doanh thuận lợi. Tài lộc dồi dào.
  Tiêu cực: Dễ trở nên quá thực dụng, chỉ quan tâm đến tiền bạc.`,
      },
      {
        name: "Bính",
        thapThanText: `- Bính (+Hỏa) - Tỷ Kiên: Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.
  Tích cực: Tăng cường sự tự tin, ý chí và tinh thần độc lập. Có nhiều bạn bè cùng chí hướng, nhiệt tình giúp đỡ lẫn nhau.
  Tiêu cực: Hình ảnh hai mặt trời trên trời, cạnh tranh gay gắt. Dễ xảy ra xung đột, tranh giành vị trí dẫn đầu. Không ai chịu nhường ai.

- Đinh (-Hỏa) - Kiếp Tài: Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.
    Tích cực: Giúp Bính Hỏa trở nên tinh tế, có chiều sâu hơn. Có khả năng kết hợp giữa sự quảng đại và sự tỉ mỉ.
    Tiêu cực: Hình ảnh ánh nến (Đinh) tranh sáng với mặt trời (Bính). Dễ bị cạnh tranh ngầm, bị người khác cướp công. Sự giúp đỡ nhận được thường không thực chất.

- Mậu (+Thổ) - Thực Thần: Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).
    Tích cực: Mang lại sự ổn định, đôn hậu. Giúp Bính Hỏa biến sự nhiệt tình thành những kết quả thực tế, vững chắc. Có khả năng lãnh đạo và quản lý tốt.
    Tiêu cực: Hình ảnh mặt trời bị núi cao che khuất. Làm giảm đi sự tỏa sáng và nhiệt huyết. Dễ trở nên lười biếng, chỉ thích an nhàn, thiếu đi chí tiến thủ.

- Kỷ (-Thổ) - Thương Quan: Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).
  Tích cực: Mang lại sự mềm mỏng, khéo léo. Có khả năng sáng tạo tinh tế.
  Tiêu cực: Hình ảnh mây mù (Kỷ) che lấp mặt trời (Bính). Khiến tài năng bị che khuất, khó được công nhận. Dễ vướng vào thị phi, bị người khác nói xấu, hiểu lầm.

- Tân (-Kim) - Chính Tài: Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.
  Tích cực: Bính Tân hợp hóa Thủy. Có khả năng quản lý tài chính tốt. Nam mệnh có vợ đẹp, tài giỏi và có thể hợp tác tốt với vợ. Có thể kiếm tiền từ các tài sản có giá trị cao.
  Tiêu cực: Dễ vì tiền bạc, tình cảm mà mất đi lý trí, sự quang minh của mình.

- Canh (+Kim) - Thiên Tài: Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).
  Tích cực: Hình ảnh mặt trời luyện kim loại thô. Có khả năng kiếm những khoản tiền lớn, làm chủ các dự án lớn, đặc biệt trong lĩnh vực công nghiệp, tài chính.
  Tiêu cực: Kiếm tiền rất vất vả, đòi hỏi phải đầu tư nhiều công sức. Dễ gặp cạnh tranh lớn về tài chính.

- Quý (-Thủy) - Chính Quan: Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).
  Tích cực: Khi Bính Hỏa cường, Quý Thủy giúp điều hòa, mang lại danh tiếng và địa vị. Giúp Bính Hỏa biết kiềm chế, trở nên có chiều sâu hơn.
  Tiêu cực: Hình ảnh mưa, sương (Quý) che lấp mặt trời. Gây ra phiền phức, khó chịu từ cấp trên. Dễ bị mất danh dự vì những chuyện nhỏ nhặt. Nữ mệnh có chồng hay γèm pha, kiểm soát.

- Nhâm (+Thủy) - Thất Sát: Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).
  Tích cực: Khi Bính Hỏa cực cường có Mộc tương sinh, có thể tạo nên cách cục "Thủy quang tương chiếu", mang lại quyền lực và danh tiếng vang dội. Có khả năng đảm đương trọng trách lớn.
  Tiêu cực: Đây là kẻ thù lớn nhất của Bính Hỏa. Hình ảnh biển cả (Nhâm) nhấn chìm mặt trời. Gây ra tai họa, bệnh tật hiểm nghèo, kiện tụng, tù tội. Nữ mệnh có tình duyên cực kỳ trắc trở.

- Ất (-Mộc) - Chính Ấn: Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.
  Tích cực: Hình ảnh cỏ cây, hoa lá hướng về mặt trời. Mang lại sự hỗ trợ từ mẹ, quý nhân một cách tận tình. Có lòng nhân hậu, ham học hỏi kiến thức truyền thống.
  Tiêu cực: Sự hỗ trợ này có phần yếu ớt, không đủ để Bính Hỏa tỏa sáng rực rỡ. Dễ trở nên hơi ỷ lại, thiếu đi sự quyết đoán.

- Giáp (+Mộc) - Thiên Ấn: Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.
  Tích cực: Đây là nguồn năng lượng tốt nhất cho Bính Hỏa. Hình ảnh cây đại thụ (Giáp) làm nhiên liệu cho mặt trời. Mang lại sự hỗ trợ mạnh mẽ, quý nhân quyền thế. Có trí tuệ uyên bác, tư duy đột phá, giúp Bính Hỏa tỏa sáng tột độ.
  Tiêu cực: Nếu Mộc quá cường mà Hỏa quá yếu, sẽ gây ra tình trạng "Mộc đa Hỏa tức" (củi nhiều lửa tắt). Dễ trở nên quá ỷ lại, thiếu nỗ lực cá nhân.

- Đinh (-Hỏa) - Thiên Ấn: Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.
    Tích cực: Có trực giác vô cùng nhạy bén, khả năng cảm nhận tâm linh cao. Có tài năng đặc biệt trong các lĩnh vực độc đáo, huyền bí, nghệ thuật. Tư duy khác biệt, sâu sắc.
    Tiêu cực: Tính cách kỳ lạ, khó hiểu, dễ bị cô lập. Suy nghĩ tiêu cực, hay đa nghi. Mối quan hệ với mẹ không được tốt hoặc mẹ vất vả.`,
      },
      {
        name: "Đinh",
        thapThanText: `- Đinh (-Hỏa) - Tỷ Kiên: Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.
Tích cực: "Nhiều ngọn nến sẽ tạo thành đám cháy lớn". Tăng cường sức mạnh, sự tự tin, có nhiều bạn bè, đồng nghiệp cùng chung sức, hỗ trợ nhau để tạo ra kết quả lớn hơn.
Tiêu cực: Dễ tụ tập thành bè phái, gây ra sự đố kỵ, cạnh tranh ngầm. Có thể trở nên quá nóng nảy khi có nhiều người kích động.

- Bính (+Hỏa) - Kiếp Tài: Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.
Tích cực: Có thể nhận được sự giúp đỡ từ những người có quyền thế, có sức ảnh hưởng lớn. Giúp Đinh Hỏa trở nên hướng ngoại, quảng giao hơn.
Tiêu cực: Hình ảnh mặt trời (Bính) làm lu mờ ánh nến (Đinh). Đây là sự cạnh tranh không cân sức. Dễ bị người khác cướp công, chiếm đoạt thành quả. Tài năng và công sức không được công nhận.

- Mậu (+Thổ) - Thực Thần: Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).
Tích cực: Mang lại những ý tưởng, tham vọng lớn. Có khả năng sáng tạo trong các lĩnh vực lớn như kiến trúc, quy hoạch.
Tiêu cực: Hình ảnh ngọn nến nhỏ soi sáng cả ngọn núi lớn, là sự tiêu hao quá sức. Dễ có những ý tưởng viển vông, khó thực hiện. Dễ bị kiệt sức vì tham vọng.

- Kỷ (-Thổ) - Thương Quan: Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).
Tích cực: Mang lại sự mềm mỏng, nhân hậu và khả năng sáng tạo tinh tế. Giỏi trong các công việc thủ công, nghệ thuật.
Tiêu cực: Hình ảnh tro tàn (Kỷ) làm lửa (Đinh) yếu đi. Làm tiêu hao năng lượng, khiến Đinh Hỏa mất đi sự sắc bén. Dễ trở nên lười biếng, chỉ thích an nhàn.

- Canh (+Kim) - Chính Tài: Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.
Tích cực: Đây là mục tiêu ưa thích nhất của Đinh Hỏa (lửa rèn kim loại thô). Có khả năng kiếm tiền từ chính tài năng, chuyên môn của mình. Biến những thứ thô sơ thành sản phẩm có giá trị.
Tiêu cực: Kiếm tiền rất vất vả, phải lao tâm khổ tứ. Nếu Hỏa yếu không đủ sức rèn Kim, sẽ bị công việc và tiền bạc làm cho kiệt sức.

- Tân (-Kim) - Thiên Tài: Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).
Tích cực: Có khả năng kiếm tiền từ các lĩnh vực đòi hỏi sự tinh xảo, làm đẹp, trang sức. Có gu thẩm mỹ tốt trong việc đầu tư.
Tiêu cực: Hình ảnh lửa nến (Đinh) khó làm tan chảy trang sức (Tân). Kiếm tiền khó khăn, tài lộc không lớn.

- Nhâm (+Thủy) - Chính Quan: Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).
Tích cực: Đinh Nhâm hợp hóa Mộc. Nếu trong mệnh có Mộc, sự kết hợp này mang lại danh vị và quyền lực cao quý. Nữ mệnh có chồng tài giỏi, có địa vị, vợ chồng yêu thương nhau.
Tiêu cực: Nếu không có Mộc, đây là sự kết hợp nguy hiểm. Hình ảnh sông lớn dập tắt ngọn nến. Gây ra áp lực lớn, rủi ro trong công việc. Dễ bị cấp trên chèn ép.

- Quý (-Thủy) - Thất Sát: Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).
Tích cực: Rất hiếm khi tích cực, trừ khi Đinh Hỏa cực cường có Mộc và Thổ mạnh để chống đỡ.
Tiêu cực: Đây là kẻ thù nguy hiểm nhất của Đinh Hỏa. Hình ảnh mưa dông (Quý) dập tắt ngọn nến. Gây ra tai họa, bệnh tật, thị phi, tiểu nhân hãm hại. Nữ mệnh có tình duyên cực kỳ đau khổ.

- Giáp (+Mộc) - Chính Ấn: Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.
Tích cực: Đây là Thần quan trọng nhất của Đinh Hỏa. Hình ảnh cây gỗ lớn (Giáp) làm nhiên liệu cho ngọn lửa (Đinh). Mang lại nguồn năng lượng dồi dào, bền bỉ. Có quý nhân quyền thế giúp đỡ, học vấn uyên bác, trí tuệ sâu sắc.
Tiêu cực: Nếu Mộc quá cường mà Hỏa quá yếu, sẽ gây ra tình trạng "Mộc đa Hỏa tức" (củi nhiều lửa tắt). Dễ trở nên quá ỷ lại, thiếu nỗ lực cá nhân.

- Ất (-Mộc) - Thiên Ấn: Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.
Tích cực: Mang lại sự khéo léo, tư duy nhạy bén và khả năng học hỏi các lĩnh vực độc đáo, nghệ thuật.
Tiêu cực: Hình ảnh cỏ cây, cành lá nhỏ (Ất) làm nhiên liệu. Lửa cháy bùng lên nhanh nhưng cũng chóng tàn và tạo ra nhiều khói. Sự hỗ trợ nhận được không bền vững, kiến thức học được không sâu.`,
      },
      {
        name: "Mậu",
        thapThanText: `- Mậu (+Thổ) - Tỷ Kiên: Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.
    Tích cực: Tăng cường sự tự chủ, lập trường vững vàng và khả năng chịu đựng áp lực. Rất coi trọng chữ tín, là người bạn đồng hành đáng tin cậy, sẵn sàng gánh vác trách nhiệm.
    Tiêu cực: Khi quá cường sẽ trở nên cực kỳ cố chấp, độc đoán, không ai có thể thay đổi được suy nghĩ của họ. Thiếu linh hoạt, dễ bỏ lỡ cơ hội.

- Kỷ (-Thổ) - Kiếp Tài: Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.
    Tích cực: Giúp Mậu Thổ trở nên mềm mỏng, khéo léo và tinh tế hơn. Có khả năng kết nối với nhiều người, giỏi hợp tác trong các hội nhóm nhỏ.
    Tiêu cực: Dễ bị bạn bè hoặc người thân lợi dụng, lôi kéo vào những chuyện không đâu. Có thể bị cạnh tranh ngầm mà không hay biết, gây hao tài tốn của.

- Canh (+Kim) - Thực Thần: Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).
    Tích cực: Hành động mạnh mẽ, quyết đoán. Có tài năng trong các lĩnh vực kỹ thuật, sản xuất. Tư duy khoáng đạt, thẳng thắn, không thích vòng vo. Mang lại sự giàu có, sung túc.
    Tiêu cực: Dễ trở nên lười biếng, chỉ thích hưởng thụ. Lời nói quá thẳng, đôi khi thiếu suy nghĩ. Có thể hành động bộc phát, thiếu kế hoạch dài hạn.

- Tân (-Kim) - Thương Quan: Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).
    Tích cực: Có tài năng nghệ thuật, văn chương, gu thẩm mỹ tinh tế. Lời nói sắc sảo, có sức thuyết phục cao. Có khả năng kiếm tiền từ tài năng đặc biệt của mình.
    Tiêu cực: Kiêu ngạo, thích thể hiện, hay xem thường người khác. Lời nói sắc bén dễ làm tổn thương người khác. Dễ xung đột với cấp trên, cơ quan quyền lực.

- Quý (-Thủy) - Chính Tài: Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.
    Tích cực: Mậu và Quý là cặp trời sinh (Mậu Quý hợp Hỏa), mang lại sự may mắn về tiền bạc và tình duyên. Họ là người cẩn thận, biết cách quản lý tài chính và có một cuộc sống ổn định. Nam mệnh có vợ hiền, là trợ thủ đắc lực.
    Tiêu cực: Đôi khi quá cẩn thận, tính toán chi li thành ra bỏ lỡ cơ hội lớn. Vì quá tập trung vào công việc và tiền bạc mà trở nên khô khan, thiếu lãng mạn. Lo lắng quá nhiều về tài chính.

- Nhâm (+Thủy) - Thiên Tài: Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).
    Tích cực: Mang lại sự khéo léo, linh hoạt trong việc kiếm tiền. Có khả năng kinh doanh, đầu tư, nhìn ra những cơ hội mà người khác không thấy. Hào phóng, giỏi xã giao.
    Tiêu cực: Tài chính bấp bênh, lúc có lúc không. Dễ chi tiêu hoang phí, không biết giữ tiền. Nam mệnh dễ có nhiều mối quan hệ ngoài luồng.

- Giáp (+Mộc) - Chính Quan: Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).
    Tích cực: Mang lại sự chính trực, tinh thần trách nhiệm và khả năng lãnh đạo. Có công danh, địa vị trong xã hội, được mọi người tôn trọng. Nữ mệnh có chồng tốt, là người có năng lực.
    Tiêu cực: Khi quá cường dễ trở nên cứng nhắc, bảo thủ, quá tuân thủ quy tắc một cách máy móc. Gặp nhiều áp lực, căng thẳng trong công việc.

- Ất (-Mộc) - Thất Sát: Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh (quân đội, cảnh sát), người tình (đối với nữ).
    Tích cực: Khi được chế hóa, mang lại sự nhanh nhạy, quyết đoán phi thường. Có khả năng giải quyết các vấn đề khó khăn, phức tạp. Có uy quyền và khả năng xử lý khủng hoảng.
    Tiêu cực: Gặp nhiều áp lực, thị phi, tiểu nhân hãm hại. Sức khỏe dễ bị ảnh hưởng, dễ gặp tai nạn. Nữ mệnh dễ lận đận trong chuyện tình cảm, gặp phải người không phù hợp.

- Bính (+Hỏa) - Chính Ấn: Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.
    Tích cực: Mang lại sự ấm áp, lạc quan và lòng nhân từ. Thông minh, ham học hỏi, có kiến thức sâu rộng. Luôn có quý nhân giúp đỡ, được cấp trên nâng đỡ.
    Tiêu cực: Dễ trở nên ỷ lại, thiếu tính độc lập. Đôi khi lý thuyết suông, thiếu tính thực tế. Suy nghĩ quá nhiều mà không hành động.

- Đinh (-Hỏa) - Thiên Ấn: Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.
    Tích cực: Có trực giác vô cùng nhạy bén, khả năng cảm nhận tâm linh cao. Có tài năng đặc biệt trong các lĩnh vực độc đáo, huyền bí, nghệ thuật. Tư duy khác biệt, sâu sắc.
    Tiêu cực: Tính cách kỳ lạ, khó hiểu, dễ bị cô lập. Suy nghĩ tiêu cực, hay đa nghi. Mối quan hệ với mẹ không được tốt hoặc mẹ vất vả.`,
      },
      {
        name: "Kỷ",
        thapThanText: `- Kỷ (-Thổ) - Tỷ Kiên: Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.
    Tích cực: Tăng cường sự tự tin, tính độc lập. Rất bao dung, giỏi lập kế hoạch và sắp xếp công việc một cách logic, có đầu có cuối. Là người bạn đáng tin cậy.
    Tiêu cực: Khi quá cường dễ trở nên cố chấp, tự cho mình là đúng. Hay lo nghĩ những chuyện nhỏ nhặt, bao bọc người khác quá mức cần thiết.

- Mậu (+Thổ) - Kiếp Tài: Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; cũng là sự cạnh tranh, lòng tự tôn.
    Tích cực: Mang lại sự mạnh mẽ, quyết đoán và tầm nhìn lớn cho Kỷ Thổ. Giúp họ trở nên phóng khoáng, quảng giao hơn. Có chí tiến thủ, không ngại cạnh tranh.
    Tiêu cực: Có xu hướng lấn át, áp đặt người khác. Tính chiếm hữu cao, dễ gây ra tranh đoạt (tiền bạc, tình cảm). Đôi khi hành động liều lĩnh, thiếu suy xét kỹ càng.

- Tân (-Kim) - Thực Thần: Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).
    Tích cực: Tinh tế, có năng khiếu nghệ thuật và gu thẩm mỹ cao. Lời nói nhẹ nhàng, duyên dáng. Tư duy sắc sảo, thích tìm tòi, khám phá. Tận hưởng cuộc sống một cách tao nhã.
    Tiêu cực: Cầu kỳ, khó tính, đôi khi quá kén chọn. Dễ trở nên lười biếng, chỉ thích hưởng thụ mà không muốn làm việc vất vả.

- Canh (+Kim) - Thương Quan: Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).
    Tích cực: Vô cùng thông minh, sắc bén, có khả năng nhìn thấu vấn đề. Dám nghĩ dám làm, có tài năng cải cách, sáng tạo đột phá. Phản ứng nhanh nhạy.
    Tiêu cực: Kiêu ngạo, thích thể hiện, dễ xem thường người khác. Lời nói sắc bén có thể làm tổn thương người khác. Không thích bị gò bó, dễ chống đối cấp trên và quy tắc.

- Nhâm (+Thủy) - Chính Tài: Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.
    Tích cực: Mang lại cho Kỷ Thổ cơ hội tài chính lớn và ổn định. Người có Nhâm Tài thường chăm chỉ, có kế hoạch tài chính rõ ràng, biết cách tích lũy. Nam mệnh có vợ tài giỏi, đảm đang.
    Tiêu cực: Dễ trở nên quá coi trọng tiền bạc. Có thể vì tình cảm mà trở nên thiếu quyết đoán, mất đi sự mạnh mẽ vốn có.

- Quý (-Thủy) - Thiên Tài: Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).
    Tích cực: Mang lại sự khéo léo, linh hoạt trong việc kiếm tiền. Có khả năng kinh doanh, đầu tư, nhìn ra những cơ hội mà người khác không thấy. Hào phóng, giỏi xã giao.
    Tiêu cực: Tài chính bấp bênh, lúc có lúc không. Dễ chi tiêu hoang phí, không biết giữ tiền. Nam mệnh dễ có nhiều mối quan hệ ngoài luồng.

- Giáp (+Mộc) - Chính Quan: Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).
    Tích cực: Mang lại sự chính trực, tinh thần trách nhiệm và khả năng lãnh đạo. Có công danh, địa vị trong xã hội, được mọi người tôn trọng. Nữ mệnh có chồng tốt, là người có năng lực.
    Tiêu cực: Khi quá cường dễ trở nên cứng nhắc, bảo thủ, quá tuân thủ quy tắc một cách máy móc. Gặp nhiều áp lực, căng thẳng trong công việc.

- Ất (-Mộc) - Thất Sát: Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh (quân đội, cảnh sát), người tình (đối với nữ).
    Tích cực: Khi được chế hóa, mang lại sự nhanh nhạy, quyết đoán phi thường. Có khả năng giải quyết các vấn đề khó khăn, phức tạp. Có uy quyền và khả năng xử lý khủng hoảng.
    Tiêu cực: Gặp nhiều áp lực, thị phi, tiểu nhân hãm hại. Sức khỏe dễ bị ảnh hưởng, dễ gặp tai nạn. Nữ mệnh dễ lận đận trong chuyện tình cảm, gặp phải người không phù hợp.

- Bính (+Hỏa) - Chính Ấn: Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.
    Tích cực: Mang lại sự ấm áp, lạc quan và lòng nhân từ. Thông minh, ham học hỏi, có kiến thức sâu rộng. Luôn có quý nhân giúp đỡ, được cấp trên nâng đỡ.
    Tiêu cực: Dễ trở nên ỷ lại, thiếu tính độc lập. Đôi khi lý thuyết suông, thiếu tính thực tế. Suy nghĩ quá nhiều mà không hành động.

- Đinh (-Hỏa) - Thiên Ấn: Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.
    Tích cực: Có trực giác vô cùng nhạy bén, khả năng cảm nhận tâm linh cao. Có tài năng đặc biệt trong các lĩnh vực độc đáo, huyền bí, nghệ thuật. Tư duy khác biệt, sâu sắc.
    Tiêu cực: Tính cách kỳ lạ, khó hiểu, dễ bị cô lập. Suy nghĩ tiêu cực, hay đa nghi. Mối quan hệ với mẹ không được tốt hoặc mẹ vất vả.`,
      },
      {
        name: "Canh",
        thapThanText: `- Canh (+Kim) - Tỷ Kiên: Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.
    Tích cực: Tăng cường ý chí, sự tự chủ và tinh thần đồng đội. Có nhiều bạn bè trung thành, cùng nhau kề vai sát cánh vượt qua khó khăn.
    Tiêu cực: Khi quá cường sẽ trở nên cực kỳ bướng bỉnh, hiếu chiến. Dễ xảy ra xung đột, tranh chấp với bạn bè vì quá thẳng tính và thiếu linh hoạt.

- Tân (-Kim) - Kiếp Tài: Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.
    Tích cực: Giúp Canh Kim trở nên tinh tế, khéo léo và sắc sảo hơn trong lời nói. Có khả năng kết hợp giữa sức mạnh và sự tinh tế để đạt mục tiêu.
    Tiêu cực: Cạnh tranh cực kỳ gay gắt. Dễ bị bạn bè hoặc người thân phản bội, đâm sau lưng. Lòng tự tôn quá cao, dễ tự ái và gây ra mâu thuẫn.

- Nhâm (+Thủy) - Thực Thần: Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).
    Tích cực: Đây là hình ảnh "Kim bạch thủy thanh" (Kim trắng được nước trong rửa sạch), mang lại sự thông minh, tài hoa và khả năng biểu đạt xuất chúng. Có tài năng lãnh đạo và sáng tạo lớn.
    Tiêu cực: Dễ trở nên quá tự do, phóng túng. Có thể vì hưởng thụ mà trở nên lười biếng. Cần có định hướng rõ ràng để không lãng phí tài năng.

- Quý (-Thủy) - Thương Quan: Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).
    Tích cực: Mang lại sự sắc bén trong tư duy, khả năng phản biện và phân tích vấn đề sâu sắc. Có tài năng đặc biệt trong các lĩnh vực kỹ thuật, công nghệ cao.
    Tiêu cực: Rất kiêu ngạo, hay chỉ trích và dễ xem thường người khác. Dễ xung đột với cấp trên và các quy tắc xã hội. Lời nói lạnh lùng có thể làm tổn thương người khác.

- Ất (-Mộc) - Chính Tài: Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.
    Tích cực: Canh và Ất là cặp hợp hóa Kim, mang lại sự may mắn về tài lộc và tình duyên. Giúp Canh Kim trở nên mềm mỏng, tình cảm hơn. Nam mệnh có vợ hiền, khéo léo và rất yêu thương chồng.
    Tiêu cực: Dễ trở nên quá coi trọng tiền bạc. Có thể vì tình cảm mà trở nên thiếu quyết đoán, mất đi sự mạnh mẽ vốn có.

- Giáp (+Mộc) - Thiên Tài: Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).
    Tích cực: Đây là mục tiêu ưa thích nhất của Canh Kim (dùng rìu chặt cây lớn). Mang lại cơ hội kiếm những khoản tiền lớn, tham gia vào các dự án lớn. Rất quyết đoán và mạnh mẽ trong việc theo đuổi tài lộc.
    Tiêu cực: Kiếm tiền rất vất vả, phải cạnh tranh và nỗ lực rất nhiều. Dễ bị các vấn đề về xương khớp, gân cốt do làm việc quá sức.

- Đinh (-Hỏa) - Chính Quan: Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).
    Tích cực: Đây là Thần quan trọng nhất của Canh Kim, là lửa trong lò rèn luyện Canh Kim thành vũ khí sắc bén. Mang lại công danh, địa vị, sự nghiệp vẻ vang và sự tôn trọng của xã hội. Giúp Canh Kim trở nên có kỷ luật và hữu dụng. Nữ mệnh có chồng tài giỏi.
    Tiêu cực: Gặp nhiều áp lực, phải trải qua nhiều rèn giũa, thử thách mới có thể thành công. Nếu Hỏa quá yếu thì không đủ sức rèn Canh, sự nghiệp khó thành.

- Bính (+Hỏa) - Thất Sát: Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).
    Tích cực: Khi Canh Kim đủ mạnh, Bính Hỏa mang lại quyền lực tối cao trong các môi trường khắc nghiệt như quân đội, cảnh sát, chính trị. Có khả năng đảm đương trọng trách lớn, lập nên đại nghiệp.
    Tiêu cực: Khi Canh Kim yếu, đây là áp lực khủng khiếp, gây ra tai họa, bệnh tật nặng, các vấn đề nghiêm trọng về pháp luật. Cuộc sống luôn đầy rẫy nguy hiểm và kẻ thù. Nữ mệnh có tình duyên trắc trở.

- Kỷ (-Thổ) - Chính Ấn: Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.
    Tích cực: Mang lại sự ổn định, có người che chở, giúp đỡ. Có nền tảng gia đình tốt.
    Tiêu cực: Hình ảnh đất bùn làm bẩn kim loại (Thổ hậu mai kim). Khiến Canh Kim trở nên lười biếng, ỷ lại, mất đi sự sắc bén và ý chí chiến đấu. Tài năng bị chôn vùi, khó phát huy.

- Mậu (+Thổ) - Thiên Ấn: Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.
    Tích cực: Mang lại một nền tảng vững chắc, sự hỗ trợ mạnh mẽ từ quý nhân có quyền lực. Giúp Canh Kim trở nên kiên định và có sức chịu đựng tốt hơn.
    Tiêu cực: Hình ảnh núi lớn chôn vùi kim loại. Khi Thổ quá cường sẽ khiến Canh Kim trở nên ngu dốt, cứng nhắc, không chịu học hỏi, tài năng bị chôn vùi hoàn toàn. Dễ bị cô lập và không được công nhận.`,
      },
      {
        name: "Tân",
        thapThanText: `- Tân (-Kim) - Tỷ Kiên: Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.
Tích cực: Tăng cường sự tự tin, giúp họ trở nên sắc sảo và tinh tế hơn. Có những người bạn cùng đẳng cấp, có thể hỗ trợ nhau trong việc xây dựng hình ảnh.
Tiêu cực: Cạnh tranh gay gắt. Luôn có sự so bì, đố kỵ với bạn bè. Dễ bị bạn bè nói xấu, chơi không đẹp. Cái tôi quá lớn, khó hợp tác.

- Canh (+Kim) - Kiếp Tài: Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.
Tích cực: Mang lại cho Tân Kim sự mạnh mẽ, quyết đoán và can đảm hơn. Có thể nhận được sự giúp đỡ từ những người bạn mạnh mẽ, thẳng thắn.
Tiêu cực: Hình ảnh kim loại thô (Canh) làm trầy xước trang sức (Tân). Dễ bị bạn bè, người thân làm tổn thương hoặc gây phiền phức. Dễ bị hao tài, mất mát vì sự cạnh tranh thô bạo.

- Quý (-Thủy) - Thực Thần: Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).
Tích cực: Hình ảnh sương, mưa nhỏ rửa sạch bụi trên trang sức. Mang lại sự thông minh, tinh tế và khả năng biểu đạt nghệ thuật. Lời nói nhẹ nhàng, duyên dáng.
Tiêu cực: Dễ trở nên quá nhạy cảm, đa sầu đa cảm. Tư duy có phần mơ mộng, thiếu tính thực tế. Sự sáng tạo chỉ ở mức độ nhỏ, khó tạo ra đột phá lớn.

- Nhâm (+Thủy) - Thương Quan: Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).
Tích cực: Đây là Thần quan trọng và được yêu thích nhất của Tân Kim. Hình ảnh sông lớn (Nhâm) rửa sạch ngọc quý (Tân), giúp Tân Kim tỏa sáng rực rỡ. Mang lại trí thông minh tuyệt đỉnh, tài hoa xuất chúng, danh tiếng lẫy lừng.
Tiêu cực: Khi Thủy quá cường có thể cuốn trôi Kim. Dễ trở nên quá kiêu ngạo, tự mãn. Có thể vì tài năng mà coi thường mọi quy tắc, gây ra rắc rối.

- Giáp (+Mộc) - Chính Tài: Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.
Tích cực: Có mục tiêu tài chính lớn, có tham vọng về tiền bạc. Có thể kiếm được tiền từ các dự án lớn, đối tác lớn.
Tiêu cực: Hình ảnh dao nhỏ (Tân) chặt cây lớn (Giáp). Kiếm tiền rất vất vả, lao tâm khổ tứ. Dễ bị các vấn đề về tài chính làm cho mệt mỏi, kiệt sức.

- Ất (-Mộc) - Thiên Tài: Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).
Tích cực: Hình ảnh dao nhỏ tỉa cành lá (Ất). Có khả năng kiếm tiền từ các công việc đòi hỏi sự khéo léo, tinh tế như nghệ thuật, làm đẹp, thời trang.
Tiêu cực: Tài lộc không lớn, chỉ đủ chi tiêu. Dễ bị hao tán vì các sở thích cá nhân, mua sắm.

- Bính (+Hỏa) - Chính Quan: Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).
Tích cực: Đây là cặp Bính Tân hợp hóa Thủy. Hình ảnh mặt trời (Bính) chiếu rọi làm trang sức (Tân) thêm lấp lánh. Mang lại danh tiếng, địa vị cao quý, được xã hội công nhận. Nữ mệnh có chồng tài giỏi, có địa vị.
Tiêu cực: Dễ vì danh tiếng mà đánh mất bản thân. Luôn phải sống dưới sự chú ý của người khác, gây ra áp lực.

- Đinh (-Hỏa) - Thất Sát: Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).
Tích cực: Khi được chế hóa, có thể mang lại quyền lực trong các lĩnh vực đặc thù, đòi hỏi sự chính xác cao như y tế (dao mổ), kỹ thuật.
Tiêu cực: Hình ảnh lửa lò (Đinh) làm tan chảy trang sức (Tân). Đây là áp lực hủy diệt. Gặp nhiều khó khăn, thử thách, sức khỏe suy yếu (đặc biệt là hệ hô hấp). Nữ mệnh tình duyên cực kỳ trắc trở.

- Mậu (+Thổ) - Chính Ấn: Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.
Tích cực: Có sự che chở, giúp đỡ từ người lớn tuổi, có quyền lực. Có nền tảng gia đình vững chắc.
Tiêu cực: Đây là Thần mà Tân Kim sợ nhất. Hình ảnh núi lớn (Mậu) chôn vùi hoàn toàn trang sức (Tân). Khiến tài năng, vẻ đẹp bị che lấp, không được công nhận. Dễ bị trầm cảm, suy nghĩ tiêu cực, cuộc sống tù túng.

- Kỷ (-Thổ) - Thiên Ấn: Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.
Tích cực: Có sự hỗ trợ nhỏ, không đáng kể. Có thể có chút năng khiếu về nghệ thuật, thủ công.
Tiêu cực: Hình ảnh bùn đất (Kỷ) làm vấy bẩn trang sức (Tân). Sự hỗ trợ nhận được thường đi kèm phiền phức, hoặc sự giúp đỡ không đúng cách làm hỏng việc. Gây ra cảm giác khó chịu, bực bội.`,
      },
      {
        name: "Nhâm",
        thapThanText: `- Nhâm (+Thủy) - Tỷ Kiên: Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.
Tích cực: Tăng cường sự tự tin, khí phách và khả năng cạnh tranh. Có nhiều bạn bè, mối quan hệ xã hội rộng, giỏi hợp tác để cùng nhau phát triển.
Tiêu cực: Khi quá cường sẽ trở nên cực kỳ liều lĩnh, bất cần. Dễ bị cuốn vào các cuộc cạnh tranh không lành mạnh, dẫn đến hao tài, tốn của.

- Quý (-Thủy) - Kiếp Tài: Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.
Tích cực: Giúp Nhâm Thủy trở nên tinh tế, sâu sắc và có chiều sâu hơn. Có khả năng thấu hiểu nội tâm người khác, biết cách dùng cả sự mềm mỏng và cứng rắn.
Tiêu cực: Dễ bị cạnh tranh ngầm, bị người khác đâm sau lưng mà không biết. Nội tâm phức tạp, dễ che giấu những toan tính riêng.

- Giáp (+Mộc) - Thực Thần: Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).
Tích cực: Hình ảnh sông lớn nuôi cây đại thụ. Mang lại tài năng, sự sáng tạo ở quy mô lớn. Có khả năng lãnh đạo, tầm nhìn xa và tạo ra những thành quả to lớn, vững chắc.
Tiêu cực: Dễ trở nên quá lý tưởng hóa, đôi khi hành động mà không tính đến chi tiết. Có xu hướng thích chỉ huy hơn là tự tay làm.

- Ất (-Mộc) - Thương Quan: Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).
Tích cực: Mang lại sự khéo léo, tinh tế trong giao tiếp và kinh doanh. Có tài ăn nói, khả năng thuyết phục và năng khiếu nghệ thuật. Rất giỏi trong việc kiếm tiền.
Tiêu cực: Dễ thay đổi, không ổn định. Có xu hướng hơi phù phiếm, thích những thứ hào nhoáng bề ngoài. Dễ vướng vào các mối quan hệ phức tạp.

- Đinh (-Hỏa) - Chính Tài: Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.
Tích cực: Nhâm và Đinh là cặp hợp hóa Mộc, mang lại sự may mắn về tài lộc và tình duyên. Họ có khả năng kiếm tiền tốt và có kế hoạch tài chính rõ ràng. Nam mệnh có vợ đẹp, tài năng, là trợ thủ đắc lực.
Tiêu cực: Dễ bị cuốn vào tình cảm, có thể vì tình yêu mà quên đi lý trí. Đôi khi quá tập trung vào mục tiêu mà trở nên toan tính.

- Bính (+Hỏa) - Thiên Tài: Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).
Tích cực: Đây là hình ảnh đẹp nhất của Nhâm Thủy (Thủy quang tương chiếu - ánh mặt trời chiếu rọi mặt biển), mang lại sự giàu có, danh tiếng và thành công rực rỡ. Có tầm nhìn lớn, hào phóng, có khả năng làm những việc kinh thiên động địa.
Tiêu cực: Dễ trở nên quá phô trương, khoe khoang. Chi tiêu hoang phí, không biết tiết kiệm. Cần cẩn thận kẻo thành công đến nhanh rồi đi cũng nhanh.

- Kỷ (-Thổ) - Chính Quan: Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).
Tích cực: Giúp Nhâm Thủy trở nên có kỷ luật, nguyên tắc và định hướng rõ ràng hơn. Có cơ hội thăng tiến trong sự nghiệp, được cấp trên công nhận.
Tiêu cực: Hình ảnh đất bùn làm vẩn đục sông lớn. Dễ gặp phải những quy định phiền phức, bị cấp trên gây khó dễ. Cảm thấy bị gò bó, mất tự do, khó phát huy hết khả năng. Nữ mệnh dễ có chồng không tương xứng.

- Mậu (+Thổ) - Thất Sát: Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).
Tích cực: Hình ảnh con đê lớn ngăn chặn dòng lũ. Khi Nhâm Thủy đủ mạnh, Mậu Thổ mang lại quyền lực tối cao, khả năng quản lý và đảm đương những trọng trách vĩ đại. Thành công vang dội trong quân đội, chính trị hoặc làm chủ doanh nghiệp lớn.
Tiêu cực: Khi Nhâm Thủy yếu, đây là áp lực khủng khiếp, gây ra tai họa, bệnh tật, các vấn đề về pháp luật. Cuộc sống luôn đầy rẫy khó khăn, thử thách. Nữ mệnh có tình duyên vất vả, dễ gặp người chồng vũ phu, độc đoán.

- Tân (-Kim) - Chính Ấn: Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.
Tích cực: Mang lại tư duy sắc bén, tinh tế và khả năng học hỏi sâu sắc. Có gu thẩm mỹ tốt, được mẹ hoặc quý nhân là nữ giới hết lòng giúp đỡ.
Tiêu cực: Dễ trở nên quá nhạy cảm, suy nghĩ nhiều. Có thể hơi dựa dẫm, thiếu đi sự mạnh mẽ vốn có của Nhâm Thủy.

- Canh (+Kim) - Thiên Ấn: Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.
Tích cực: Là nguồn năng lượng vô tận cho Nhâm Thủy. Mang lại trực giác phi thường, tư duy đột phá và khả năng học hỏi các lĩnh vực độc đáo. Có quý nhân mạnh mẽ nâng đỡ.
Tiêu cực: Dễ trở nên lười biếng vì có người chống lưng. Có thể có những suy nghĩ kỳ lạ, khác người, dẫn đến bị cô lập. Nếu Kim quá cường sẽ làm Thủy bị đục.`,
      },
      {
        name: "Quý",
        thapThanText: `- Quý (-Thủy) - Tỷ Kiên: Đại diện cho bản thân, anh em, bạn bè, đồng nghiệp cùng giới tính.
Tích cực: Tăng cường sức mạnh nội tâm, sự kiên trì và khả năng tập trung. Giúp họ có thêm sự đồng cảm và thấu hiểu. Là người bạn đồng hành tinh tế, sâu sắc.
Tiêu cực: Khi quá cường sẽ trở nên rất cố chấp một cách thầm lặng. Dễ bị chìm đắm trong suy nghĩ của bản thân, hướng nội quá mức và trở nên u uất, bi quan.

- Nhâm (+Thủy) - Kiếp Tài: Đại diện cho anh em, bạn bè, đồng nghiệp khác giới tính; sự cạnh tranh, lòng tự tôn.
Tích cực: Mang lại cho Quý Thủy sự mạnh mẽ, dũng cảm và khả năng hành động. Giúp họ trở nên quảng giao, hướng ngoại hơn. Có thể hợp tác để làm những việc lớn.
Tiêu cực: Dễ bị bạn bè lôi kéo, ảnh hưởng xấu. Có xu hướng bị người mạnh hơn lấn át, che mờ. Dễ bị hao tài vì các mối quan hệ xã hội.

- Ất (-Mộc) - Thực Thần: Đại diện cho sự hưởng thụ, ăn uống, tư duy sáng tạo, lời nói mềm mỏng, con cái (đối với nữ).
Tích cực: Đây là hình ảnh đẹp nhất của Quý Thủy (mưa tưới hoa). Mang lại tài năng nghệ thuật, sự lãng mạn, tinh tế và lòng nhân ái. Lời nói nhẹ nhàng, duyên dáng, có khả năng chữa lành.
Tiêu cực: Dễ trở nên yếu đuối, mơ mộng, thiếu thực tế. Dễ bị lụy trong tình cảm. Có thể hơi lười biếng, chỉ thích an nhàn.

- Giáp (+Mộc) - Thương Quan: Đại diện cho sự phá cách, thông minh lanh lợi, phản biện, không thích quy tắc, con cái (đối với nam).
Tích cực: Vô cùng thông minh, có tài năng và tham vọng lớn. Có khả năng lãnh đạo, sáng tạo đột phá, mang lại những thành tựu lớn lao. Dám nghĩ dám làm.
Tiêu cực: Kiêu ngạo, thích thể hiện, dễ xem thường người khác. Không tuân thủ quy tắc, dễ xung đột với cấp trên. Lời nói thẳng thắn có thể gây mất lòng.

- Bính (+Hỏa) - Chính Tài: Đại diện cho thu nhập ổn định từ công việc, người vợ (đối với nam), sự chăm chỉ, tiết kiệm.
Tích cực: Hình ảnh mặt trời (Bính) và màn sương (Quý) tạo nên cầu vồng, mang lại sự may mắn và tài lộc. Có thu nhập ổn định, cuộc sống sung túc. Nam mệnh có vợ đẹp, tài giỏi.
Tiêu cực: Dễ quá coi trọng vật chất, tiền bạc. Có thể vì công việc mà bỏ bê các khía cạnh khác của cuộc sống.

- Đinh (-Hỏa) - Thiên Tài: Đại diện cho thu nhập bất ổn, kinh doanh, đầu tư, người cha, người tình (đối với nam).
Tích cực: Mang lại sự nhạy bén với các cơ hội kinh doanh, đầu tư. Có thể kiếm được những khoản tiền bất ngờ. Có sức hấp dẫn, lãng mạn trong tình cảm.
Tiêu cực: Tài chính bấp bênh, khó đoán. Dễ bị cuốn vào các mối quan hệ tình cảm phức tạp. Đam mê nhất thời, khó duy trì lâu dài.

- Mậu (+Thổ) - Chính Quan: Đại diện cho công danh, sự nghiệp, pháp luật, cấp trên, người chồng (đối với nữ).
Tích cực: Đây là cặp Mậu Quý hợp Hỏa, mang lại danh vọng và địa vị. Giúp Quý Thủy trở nên có nguyên tắc, đáng tin cậy. Sự nghiệp thăng tiến. Nữ mệnh có chồng tài giỏi, là chỗ dựa vững chắc.
Tiêu cực: Khi Thổ quá cường, Quý Thủy sẽ bị áp chế, gây ra sự căng thẳng, mất tự do. Dễ bị gò bó trong các quy tắc, không phát huy được sự sáng tạo.

- Kỷ (-Thổ) - Thất Sát: Đại diện cho thử thách, áp lực, kẻ thù, quyền lực trong môi trường cạnh tranh, người tình (đối với nữ).
Tích cực: Khi được chế hóa, giúp Quý Thủy trở nên kiên cường, có khả năng chịu đựng áp lực và giải quyết các vấn đề phức tạp.
Tiêu cực: Hình ảnh đất bùn làm vẩn đục dòng nước. Gặp nhiều thị phi, tiểu nhân quấy phá. Sức khỏe dễ bị ảnh hưởng, đặc biệt là hệ tiêu hóa. Nữ mệnh dễ lận đận tình duyên, gặp phải người không phù hợp.

- Canh (+Kim) - Chính Ấn: Đại diện cho mẹ, kiến thức, học vấn, sự che chở, lòng nhân hậu, quý nhân.
Tích cực: Hình ảnh kim loại lớn tạo ra dòng nước trong lành. Mang lại tư duy logic, sáng suốt, khả năng học hỏi tốt. Luôn có quý nhân là người lớn tuổi, có chức quyền giúp đỡ.
Tiêu cực: Dễ trở nên lười biếng, ỷ lại vào sự giúp đỡ của người khác. Thiếu động lực để tự mình phấn đấu.

- Tân (-Kim) - Thiên Ấn: Đại diện cho mẹ kế, kiến thức độc đáo, huyền học, tôn giáo, sự cô độc, trực giác nhạy bén.
Tích cực: Mang lại sự tinh tế, sắc bén và trực giác nhạy bén phi thường. Có năng khiếu đặc biệt trong các lĩnh vực nghệ thuật, triết học, huyền học.
Tiêu cực: Lạnh lùng, khó gần, hay chỉ trích. Dễ cảm thấy cô độc, không được thấu hiểu. Mối quan hệ với mẹ có thể xa cách hoặc mẹ hay ốm đau.`,
      },
    ];
    let thapThanText = thapThan.find(
      (item) => item.name === nhatChuName
    ).thapThanText;
    return thapThanText;
  };

  const getThapThanDiaChi = (nhatChuName) => {
    let thapThan = [
      {
        name: "Kỷ",
        thapThanText: `
- Thìn, Tuất (+Thổ) - Kiếp Tài: Thể hiện người có uy tín, tầm nhìn, tham vọng, giỏi lãnh đạo (Thìn), hoặc sự trung thành, chính trực, nhiệt tình, có nguyên tắc, trọng tình nghĩa (Tuất). Mặt trái là sự mưu mô, khó lường, độc đoán, tham vọng mù quáng (Thìn), hoặc trở nên nóng nảy, cứng nhắc, bảo thủ và hay tranh cãi khi mất cân bằng (Tuất).
- Sửu, Mùi (-Thổ) - Tỷ Kiên: Biểu hiện sự kiên trì, chăm chỉ, nhẫn nại, kỷ luật và thực tế (Sửu), hoặc sự ôn hòa, hiền lành, vị tha, sống tình cảm và biết lắng nghe (Mùi). Mặt tiêu cực có thể là lì lợm, cố chấp, lạnh lùng, khắc nghiệt (Sửu), hoặc đa sầu đa cảm, mê tín, nhu nhược và lụy tình (Mùi).
- Dần (+Mộc) - Chính Quan: Là Mộc pha trộn nhiệt tình (Hỏa) và thực tế (Thổ), tạo ra con người can đảm, hào phóng, năng động và sáng tạo. Mặt trái là sự nóng nảy, bốc đồng, khoe khoang và cả thèm chóng chán.
- Mão (-Mộc) - Thất Sát/Thiên Quan: Là Mộc thuần túy, có sức sống mãnh liệt, kiên trì phi thường, nhẫn nại và bền bỉ. Tiêu cực là sự ghen tuông mạnh, cố chấp ngầm, giữ thù dai và nhạy cảm quá mức.
- Ngọ (+Hỏa) - Chính Ấn: Đỉnh cao của năng lượng Hỏa, thể hiện sự đam mê mãnh liệt, quyến rũ, kiên định và giữ chữ tín. Khi tiêu cực sẽ rất cực đoan, cố chấp, nóng tính và tâm trạng thất thường.
- Tỵ (-Hỏa) - Thiên Ấn: Năng lượng biến hóa chứa cả Hỏa, Kim, Thổ, tạo ra người thông minh, nhanh nhẹn, có mục đích, giỏi tính toán và thực tế. Mặt tiêu cực là thủ đoạn, xảo quyệt, hay thay đổi, ghen tuông và đố kỵ.
- Thân (+Kim) - Thương Quan: Kết hợp Kim với trí tuệ và linh hoạt, tạo ra người lanh lợi, đa tài, thông minh và giỏi giải quyết vấn đề. Khi tiêu cực sẽ là mưu mẹo, khôn lỏi, thích thể hiện và không ổn định.
- Dậu (-Kim) - Thực Thần: Là Kim thuần khiết, biểu hiện cho sự kỷ luật tuyệt đối, tự trọng cao, cực kỳ nguyên tắc và đáng tin cậy. Tiêu cực là sự cực đoan, phán xét, cứng nhắc và tự cho mình là đúng.
- Tý (+Thủy) - Chính Tài: Đỉnh cao của năng lượng Thủy, đại diện cho trí tuệ sâu sắc và quyền lực tiềm ẩn, cực kỳ thông minh, mưu trí và có tầm nhìn chiến lược. Khi mất cân bằng sẽ trở nên mưu mô, thủ đoạn, đa nghi và thâm hiểm.
- Hợi (-Thủy) - Thiên Tài: Biểu hiện cho trí tuệ phúc hậu và lòng nhân ái, là người tốt bụng, thật thà, có lòng trắc ẩn và rộng lượng. Tiêu cực là sự dễ dãi, cả tin, thiếu đề phòng và dễ bị lợi dụng.`,
      },
      {
        name: "Giáp",
        thapThanText: `
- Dần (+Mộc) - Tỷ Kiên: Là gốc rễ vững chắc (Lộc), mang lại sự tự chủ, năng lượng dồi dào, rất quyết đoán và có khả năng thực thi mạnh mẽ. Tiêu cực là cực kỳ bướng bỉnh, cố chấp, tự quyết định mọi việc, không thích bị người khác xen vào, dễ cô lập bản thân.
- Mão (-Mộc) - Kiếp Tài: Có nhiều mối quan hệ xã hội, được nhiều người yêu quý, mở rộng các mối quan hệ, giao tiếp tốt, dễ được giúp đỡ. Tiêu cực là nơi Đế cường của Kiếp Tài, cạnh tranh rất khốc liệt, dễ bị hao tài vì bạn bè, đặc biệt là các vấn đề liên quan đến tình cảm, tửu sắc.
- Tỵ (-Hỏa) - Thực Thần: Rất thông minh, có khả năng học hỏi và sáng tạo tốt, có tài năng trong lĩnh vực giáo dục, truyền thông, sáng tạo. Tiêu cực là năng lượng của Giáp Mộc bị tiết xuất quá nhiều, dễ cảm thấy mệt mỏi, kiệt sức, suy nghĩ nhiều nhưng hành động ít.
- Ngọ (+Hỏa) - Thương Quan: Có tài năng nghệ thuật, biểu diễn xuất chúng, sáng tạo đột phá, gây ấn tượng mạnh, có khả năng nổi bật trong đám đông. Tiêu cực là "Mộc bị thiêu cháy", dễ hành động bốc đồng, thiếu kiểm soát, nổi loạn, chống đối quy tắc, sức khỏe dễ bị ảnh hưởng.
- Sửu, Mùi (-Thổ) - Chính Tài: Có khả năng kiếm tiền một cách chăm chỉ, cần cù. Tài lộc đến từ sự tích lũy kiên trì (Sửu), hoặc có thể có tài sản liên quan đến đất đai. Có sự ổn định về tài chính (Mùi). Tiêu cực là Sửu là đất ẩm lạnh, cây khó bén rễ. Kiếm tiền rất vất vả, phải nỗ lực rất nhiều trong môi trường khó khăn (Sửu), hoặc Mùi là đất khô nóng, Mộc trong Mùi đã vào mộ. Cây khó phát triển tốt. Nguồn tài chính không dồi dào, kiếm tiền khó khăn (Mùi).
- Thìn, Tuất (+Thổ) - Thiên Tài: Thìn là đất ẩm có chứa Thủy, rất tốt cho Giáp Mộc phát triển, có nhiều cơ hội tốt để kinh doanh, đầu tư và thu được lợi nhuận lớn (Thìn), hoặc Tuất là đất khô nóng, rèn luyện ý chí và khả năng chịu đựng trong việc kiếm tiền, có thể thành công nhờ nỗ lực vượt khó (Tuất). Tiêu cực là tài chính có thể biến động, cần biết nắm bắt cơ hội đúng lúc (Thìn), hoặc Tuất là loại Thiên Tài khó kiếm nhất, phải làm việc trong môi trường cực kỳ khắc nghiệt, cạnh tranh cao mới có thể có tiền (Tuất).
- Thân (+Kim) - Thất Sát: Rèn luyện ý chí và khả năng đối mặt với thử thách sinh tử, có khả năng đảm đương trọng trách lớn, vượt qua thử thách, rèn luyện bản lĩnh. Tiêu cực là luôn phải đối mặt với nguy hiểm, áp lực cực lớn, dễ bị tai nạn, đặc biệt là liên quan đến xe cộ, máy móc kim loại, sức khỏe và tính mạng bị đe dọa.
- Dậu (-Kim) - Chính Quan: Có tinh thần trách nhiệm, làm việc có kỷ luật, có cơ hội thăng tiến trong sự nghiệp, làm việc có kỷ luật, trách nhiệm. Tiêu cực là áp lực công việc lớn, dễ bị căng thẳng thần kinh, môi trường làm việc có nhiều quy tắc cứng nhắc.
- Tý (+Thủy) - Chính Ấn: Có nền tảng học vấn tốt, được gia đình yêu thương, giúp đỡ, thông minh, có khả năng tiếp thu kiến thức tốt, được hỗ trợ từ mẹ, quý nhân. Tiêu cực là dễ sinh ra tính ỷ lại, thiếu nỗ lực cá nhân, nếu Thủy quá cường dễ gây ra tình trạng "Thủy phiếm Mộc" (nước cuốn trôi cây), khiến cuộc sống trôi nổi, không ổn định.
- Hợi (-Thủy) - Thiên Ấn: Hợi là đất trường sinh của Giáp Mộc, vừa là Ấn vừa là gốc rễ, nguồn hỗ trợ mạnh mẽ và bền vững nhất, vô cùng thông minh, có tài năng và luôn có quý nhân phù trợ. Tiêu cực là có thể vì có người chống lưng mà trở nên thiếu đi nỗ lực cá nhân, khó thành tựu lớn nếu không tự mình phấn đấu.`,
      },
      {
        name: "Ất",
        thapThanText: `
- Dần (+Mộc) - Kiếp Tài: Có sự giúp đỡ từ anh em, bạn bè mạnh mẽ. Giúp Ất Mộc trở nên quyết đoán, mạnh mẽ hơn. Tiêu cực là Dần là nơi Đế cường của Kiếp Tài. Dễ bị người khác lấn át, cướp công. Cần cẩn thận trong các mối quan hệ hợp tác.
- Mão (-Mộc) - Tỷ Kiên: Là gốc rễ vững chắc (Lộc), mang lại sự tự chủ và khả năng chuyên môn tốt. Có nhiều bạn bè thân thiết. Tiêu cực là rất cố chấp một cách mềm mỏng. Dễ bị các mối quan hệ tình cảm chi phối (đào hoa).
- Tỵ (-Hỏa) - Thương Quan: Rất thông minh, có khả năng học hỏi và sáng tạo tốt. Có tài năng trong lĩnh vực giáo dục, truyền thông. Tiêu cực là dễ hành động bốc đồng, lời nói thiếu suy nghĩ. Có thể kiêu ngạo, xem thường người khác, gây ra xung đột với cấp trên.
- Ngọ (+Hỏa) - Thực Thần: Có tài năng nghệ thuật, biểu diễn xuất chúng. Có khả năng sáng tạo và thể hiện bản thân tốt. Tiêu cực là "Mộc bị thiêu cháy". Năng lượng bị tiết xuất quá nhiều. Dễ cảm thấy mệt mỏi, kiệt sức vì công việc, con cái.
- Thìn, Tuất (+Thổ) - Chính Tài: Có khả năng quản lý tài chính tốt, có thể có được tài sản từ đất đai (Thìn), hoặc rèn luyện tính kiên trì, chăm chỉ trong việc kiếm tiền (Tuất). Tiêu cực là kiếm tiền không dễ dàng, phải nỗ lực nhiều (Thìn), hoặc Tuất là đất khô nóng, cây cỏ khó sống, kiếm tiền cực kỳ khó khăn, trong môi trường khắc nghiệt (Tuất).
- Sửu, Mùi (-Thổ) - Thiên Tài: Có thể có những khoản thu nhập bất ngờ từ đất đai, bất động sản (Sửu), hoặc Mùi là đất khô nhưng lại là kho của Mộc, có khả năng tích lũy tài sản, có "của ăn của để" (Mùi). Tiêu cực là Sửu là đất ẩm lạnh, cây khó phát triển, cơ hội kiếm tiền không nhiều, tài chính bấp bênh (Sửu), hoặc kiếm tiền phải trải qua nhiều vất vả, cạnh tranh (Mùi).
- Thân (+Kim) - Thất Sát: Rèn luyện ý chí sinh tồn phi thường. Tiêu cực là áp lực từ mọi phía, cảm giác như bị dao kề cổ. Sức khỏe suy yếu, đặc biệt là gan, mật, hệ thần kinh. Cuộc sống luôn đầy rẫy khó khăn, thử thách.
- Dậu (-Kim) - Chính Quan: Rèn luyện khả năng làm việc trong môi trường có kỷ luật, áp lực cao. Tiêu cực là áp lực công việc rất lớn. Dễ bị căng thẳng, mệt mỏi. Nữ mệnh có chồng gia trưởng, độc đoán.
- Hợi (-Thủy) - Chính Ấn: Có nền tảng gia đình, học vấn tốt. Được mẹ yêu thương, che chở. Tiêu cực là dễ sinh ra tính ỷ lại, thiếu nỗ lực cá nhân. Nếu Thủy quá nhiều, cây sẽ bị úng rễ, khó phát triển.
- Tý (+Thủy) - Thiên Ấn: Có trực giác tốt, thông minh, có khả năng học hỏi các lĩnh vực độc đáo. Tiêu cực là Tý là đất bại của Mộc. Nước quá lạnh làm cây khó sống. Dễ bị cô độc, mối quan hệ với mẹ không tốt. Sức khỏe dễ bị ảnh hưởng bởi yếu tố hàn (lạnh).`,
      },
      {
        name: "Bính",
        thapThanText: `
- Tỵ (-Hỏa) - Tỷ Kiên: Là gốc rễ vững chắc (Lộc), mang lại sự tự chủ, năng lượng dồi dào và khả năng thực thi tốt. Giúp Bính Hỏa trở nên mạnh mẽ và quyết đoán hơn. Tiêu cực: Cực kỳ cố chấp và nóng nảy. Có xu hướng tự làm theo ý mình, không linh hoạt. Dễ gây ra mâu thuẫn vì sự bướng bỉnh.
- Ngọ (+Hỏa) - Kiếp Tài: Đây là nơi Bính Hỏa cường nhất (Đế cường). Mang lại quyền lực, sức ảnh hưởng và khả năng lãnh đạo tuyệt đối. Ý chí kiên cường, không gì lay chuyển được. Tiêu cực: Cực kỳ nóng nảy, độc đoán và chuyên quyền. Không chấp nhận sự phản đối. Có thể trở nên tàn bạo nếu không được kiểm soát.
- Thìn, Tuất (+Thổ) - Thực Thần: Có khả năng sáng tạo, có thể tạo ra những thành quả nhất định (Thìn), hoặc Tuất là đất khô nóng (Hỏa khố), giúp Bính Hỏa có nơi để thể hiện tài năng. Có khả năng sáng tạo nghệ thuật, biểu diễn tốt (Tuất). Tiêu cực là Thìn là đất ẩm, làm Hỏa bị yếu đi rất nhiều. Tài năng, sự sáng tạo không được thể hiện một cách rực rỡ, dễ bị che lấp hoặc hiểu lầm (Thìn), hoặc vẫn làm giảm độ sáng của Bính Hỏa. Có thể trở nên quá đam mê hưởng thụ, vui chơi mà quên đi trách nhiệm (Tuất).
- Sửu, Mùi (-Thổ) - Thương Quan: Có thể có những ý tưởng độc đáo nhưng khó thực hiện (Sửu), hoặc có tài năng trong các lĩnh vực nghệ thuật, thủ công (Mùi). Tiêu cực là Sửu là đất ẩm lạnh, làm Hỏa bị mất nhiệt. Đây là loại Thương Quan xấu nhất, khiến Bính Hỏa mất đi sức sống, trở nên u uất, bi quan (Sửu), hoặc Mùi là đất khô, vẫn làm Hỏa bị tối đi. Dễ trở nên kiêu ngạo, tự mãn với những thành quả nhỏ. Có thể nói năng thiếu suy nghĩ, gây mất lòng (Mùi).
- Dậu (-Kim) - Chính Tài: Có thu nhập ổn định, đều đặn. Có khả năng quản lý tài chính tốt. Tiêu cực: Dễ trở nên quá tính toán, chi li. Có thể vì quá tập trung vào các khoản lợi nhỏ mà bỏ qua cơ hội lớn.
- Thân (+Kim) - Thiên Tài: Rất nhạy bén với các cơ hội kinh doanh, đầu tư. Có thể kiếm được những khoản tiền lớn bất ngờ. Tiêu cực: Tài chính cực kỳ bấp bênh. Dễ bị thua lỗ nặng nếu đầu tư mạo hiểm. Tiền vào nhanh nhưng ra cũng nhanh.
- Tý (+Thủy) - Chính Quan: Rèn luyện Bính Hỏa trong môi trường kỷ luật, có nguyên tắc. Tiêu cực: Áp lực công việc lớn, luôn cảm thấy bị gò bó, kiểm soát. Cấp trên nghiêm khắc. Dễ gặp các vấn đề về sức khỏe liên quan đến tim mạch, mắt.
- Hợi (-Thủy) - Thất Sát: Nếu có Mộc mạnh, có thể biến áp lực thành động lực, đạt được quyền lực. Tiêu cực: Áp lực đến một cách âm thầm nhưng mạnh mẽ. Luôn phải đối mặt với nguy hiểm, kẻ thù mạnh. Sức khỏe và tinh thần bị bào mòn nghiêm trọng.
- Dần (+Mộc) - Chính Ấn: Dần là đất trường sinh của Bính Hỏa. Đây là nguồn hỗ trợ mạnh mẽ và bền vững nhất. Vô cùng thông minh, có tài năng và luôn có quý nhân phù trợ lúc khó khăn. Tiêu cực: Có thể vì có người chống lưng mà trở nên lười biếng, thiếu đi nỗ lực cá nhân.
- Mão (-Mộc) - Thiên Ấn: Có nền tảng học vấn tốt, được gia đình yêu thương, che chở. Thông minh, có lòng nhân ái. Tiêu cực: Đôi khi quá hiền lành, thiếu đi sự mạnh mẽ cần thiết để đối mặt với sóng gió.`,
      },
      {
        name: "Mậu",
        thapThanText: `
- Thìn, Tuất (+Thổ) - Tỷ Kiên: Mang lại cho Mậu Thổ sự thông minh và tầm nhìn chiến lược. Có tham vọng, biết cách quản lý nguồn lực (Thìn), hoặc cực kỳ trung thành, thẳng thắn và có tinh thần nghĩa hiệp. Là người bạn, người đồng đội đáng tin cậy nhất (Tuất). Tiêu cực là nội tâm phức tạp, khó đoán. Có thể trở nên quá tham vọng, dùng thủ đoạn để cạnh tranh (Thìn), hoặc nóng nảy, hiếu thắng, dễ gây gổ khi bị khiêu khích. Cứng nhắc, đôi khi quá thẳng thắn đến mức làm mất lòng người khác (Tuất).
- Sửu, Mùi (-Thổ) - Kiếp Tài: Mang lại sự kiên trì, nhẫn nại từ bên trong. Làm việc chăm chỉ, cần mẫn và có khả năng tích lũy một cách âm thầm, bền bỉ (Sửu), hoặc giúp Mậu Thổ trở nên ấm áp, biết quan tâm đến người khác hơn. Có khả năng thuyết phục và tạo dựng các mối quan hệ xã hội tốt (Mùi). Tiêu cực là bướng bỉnh một cách thầm lặng, khó chia sẻ. Dễ bị ảnh hưởng bởi các mối quan hệ bạn bè, dẫn đến hao tài một cách không đáng có (Sửu), hoặc nội tâm dễ thay đổi, "sáng nắng chiều mưa". Có thể vì quá cả nể bạn bè mà chịu thiệt thòi về mình (Mùi).
- Thân (+Kim) - Thực Thần: Cực kỳ thông minh, đa tài, học nhanh hiểu rộng. Có khả năng ứng biến xuất sắc, giỏi trong việc kinh doanh, đầu tư và các hoạt động mang tính di chuyển. Tiêu cực là "cả thèm chóng chán", thiếu sự kiên trì đến cùng. Dễ dùng tài năng của mình vào những việc mang tính đầu cơ, rủi ro cao.
- Dậu (-Kim) - Thương Quan: Khả năng ăn nói xuất chúng, có tài hùng biện, tranh luận. Thích hợp với các công việc cần đến giao tiếp như luật sư, giáo viên, diễn giả. Tiêu cực là thích chỉ trích, phán xét. Dễ vướng thị phi từ lời nói của mình. Hay khoe khoang, tự phụ.
- Hợi (-Thủy) - Chính Tài: Có khả năng quản lý các dòng tiền lớn, có tầm nhìn trong kinh doanh. Thường có những khoản thu nhập lớn, bất ngờ. Tiêu cực là dễ gặp rủi ro về tài chính nếu đầu tư mạo hiểm. Tiền bạc có tính lưu động cao, khó giữ được lâu.
- Tý (+Thủy) - Thiên Tài: Rất thông minh và nhạy bén với các cơ hội kiếm tiền. Có nhiều nguồn thu nhập, giỏi xoay sở tài chính. Tiêu cực là dễ tham gia vào các hoạt động đầu cơ, cờ bạc. Tiền bạc đến và đi nhanh chóng, cuộc sống tài chính không ổn định.
- Mão (-Mộc) - Chính Quan: Có ý thức tự giác cao, làm việc có nguyên tắc và được mọi người tôn trọng. Thích hợp làm trong các cơ quan nhà nước, tổ chức lớn. Tiêu cực là dễ trở nên quá cứng nhắc, thiếu linh hoạt. Luôn cảm thấy bị áp lực về mặt tinh thần, khó mà thoải mái.
- Dần (+Mộc) - Thất Sát: Có khí phách, quyền uy, không sợ hãi. Có tố chất của một nhà lãnh đạo, một người tiên phong, dám đối mặt với mọi thử thách. Tiêu cực là cuộc sống luôn đầy rẫy sự cạnh tranh và áp lực. Dễ gặp tai nạn, các vấn đề liên quan đến pháp luật. Tính cách nóng nảy, độc đoán.
- Ngọ (+Hỏa) - Chính Ấn: Cực kỳ thông minh, có đam mê học hỏi mãnh liệt. Có bằng cấp cao, kiến thức uyên bác và được xã hội công nhận. Tiêu cực là tính khí nóng nảy, thiếu kiên nhẫn. Đôi khi quá tự tin vào kiến thức của mình mà trở nên kiêu ngạo.
- Tỵ (-Hỏa) - Thiên Ấn: Vô cùng thông minh, có khả năng nhìn thấu bản chất vấn đề. Có tài năng đặc biệt trong các lĩnh vực nghiên cứu chuyên sâu hoặc những ngành nghề ít người theo đuổi. Tiêu cực là nội tâm phức tạp, hay suy nghĩ. Dễ bị cô lập khỏi đám đông. Mối quan hệ với người thân (đặc biệt là mẹ) có thể xa cách.`,
      },
      {
        name: "Kỷ",
        thapThanText: `
- Sửu, Mùi (-Thổ) - Tỷ Kiên: Vô cùng kiên định, nhẫn nại, có sức chịu đựng phi thường. Chăm chỉ, cần cù, làm việc không mệt mỏi và rất đáng tin cậy (Sửu), hoặc khéo léo, tinh tế, có khả năng xã giao tốt. Tốt bụng, có lòng trắc ẩn, biết cách chăm sóc người khác một cách ấm áp (Mùi). Tiêu cực là bướng bỉnh, lầm lì, một khi đã quyết thì khó ai lay chuyển. Hướng nội quá mức, khó bộc lộ cảm xúc (Sửu), hoặc dễ nóng nảy, thiếu kiên nhẫn khi mọi việc không như ý. Nội tâm phức tạp, hay thay đổi, đôi khi đa sầu đa cảm và dễ bị tổn thương (Mùi).
- Thìn, Tuất (+Thổ) - Kiếp Tài: Thông minh, có tài năng lãnh đạo và khả năng thích ứng cao. Có tham vọng, biết cách tận dụng các mối quan hệ để phát triển (Thìn), hoặc trung thành, thẳng thắn, có tinh thần nghĩa hiệp. Rất nhạy bén, có khả năng phán đoán tốt (Tuất). Tiêu cực là nhiều mưu mẹo, khó lường, đôi khi không đáng tin cậy. Dễ vướng vào thị phi, tranh chấp (Thìn), hoặc nóng nảy, hiếu thắng, dễ gây gổ. Đôi khi quá thẳng thắn làm mất lòng người khác (Tuất).
- Dậu (-Kim) - Thực Thần: Thông minh, hoạt bát, có tài ăn nói và khả năng thuyết phục. Rất giỏi trong việc thể hiện bản thân. Có tài năng trong lĩnh vực nghệ thuật, giải trí. Tiêu cực là thích khoe khoang, nói nhiều nhưng làm ít. Hay chỉ trích, phán xét người khác. Dễ vướng vào các mối quan hệ phức tạp, đào hoa.
- Thân (+Kim) - Thương Quan: Đa tài, linh hoạt, học một biết mười. Giỏi bắt chước, có khả năng ứng biến xuất sắc trong mọi tình huống. Có nhiều ý tưởng độc đáo. Tiêu cực là hay thay đổi, thiếu kiên định, "cả thèm chóng chán". Đôi khi dùng sự thông minh vào những việc không chính đáng, thích đi đường tắt.
- Tý (+Thủy) - Chính Tài: Thông minh, biết cách quản lý tiền bạc một cách khôn ngoan. Có khả năng kiếm tiền từ nhiều nguồn nhỏ, tích tiểu thành đại. Tiêu cực là hay tính toán chi li, đôi khi quá cẩn thận mà bỏ lỡ cơ hội lớn. Dễ lo lắng về những khoản tiền nhỏ.
- Hợi (-Thủy) - Thiên Tài: Có tầm nhìn xa, giỏi nắm bắt các cơ hội kinh doanh lớn. Thông minh, có thể kiếm được những khoản tiền lớn một cách bất ngờ. Tiêu cực là dễ bị cuốn vào các dự án đầu tư mạo hiểm, có thể dẫn đến thua lỗ nặng. Quản lý tài chính kém, tiền vào nhanh ra cũng nhanh.
- Dần (+Mộc) - Chính Quan: Có uy quyền, dũng cảm, có tố chất của người lãnh đạo. Có chí tiến thủ, không ngừng nỗ lực để đạt được vị trí cao trong sự nghiệp. Tiêu cực là dễ trở nên độc đoán, chuyên quyền. Thích kiểm soát người khác, gây áp lực cho cấp dưới.
- Mão (-Mộc) - Thất Sát: Rất nhạy bén, có khả năng nắm bắt tình hình nhanh chóng. Thích hợp với các công việc đòi hỏi sự cạnh tranh cao, kỷ luật thép. Tiêu cực là gặp nhiều áp lực từ mọi phía. Dễ bị căng thẳng thần kinh, nóng vội. Cần cẩn thận với các vấn đề liên quan đến kiện tụng, tranh chấp.
- Tỵ (-Hỏa) - Chính Ấn: Thông minh, sáng dạ, có khả năng học hỏi nhanh. Có trực giác tốt, tư duy logic. Luôn nhận được sự giúp đỡ từ người lớn tuổi hoặc cấp trên. Tiêu cực là dễ bị che giấu, nội tâm phức tạp. Đôi khi quá tự tin vào sự thông minh của mình mà trở nên chủ quan.
- Ngọ (+Hỏa) - Thiên Ấn: Rất thông minh, có tài năng nổi bật và đam mê mãnh liệt. Có khả năng thành công lớn trong các lĩnh vực đòi hỏi sự sáng tạo và cảm hứng đặc biệt. Tiêu cực là nóng nảy, thiếu kiên nhẫn, làm việc theo cảm hứng. Dễ bị cô đơn, cảm thấy không ai hiểu mình. Có thể gặp khó khăn trong việc duy trì các mối quan hệ lâu dài.`,
      },
      {
        name: "Tân",
        thapThanText: `
- Dậu (-Kim) - Tỷ Kiên: Là gốc rễ vững chắc (Lâm Quan), mang lại sự tự chủ và khả năng chuyên môn cao. Rất giỏi trong các công việc đòi hỏi sự tỉ mỉ, chính xác. Tiêu cực là cực kỳ cố chấp và bảo thủ. Lời nói rất sắc bén, dễ làm mất lòng người khác. Có xu hướng tự cô lập mình.
- Thân (+Kim) - Kiếp Tài: Giúp Tân Kim trở nên năng động, đa tài và hoạt bát hơn. Có khả năng ứng biến linh hoạt. Tiêu cực là dễ bị người khác lấn át, cướp công. Các mối quan hệ xã hội có thể mang lại nhiều phiền toái hơn là lợi ích. Dễ bị hao tán tiền bạc.
- Tý (+Thủy) - Thực Thần: Có khả năng sáng tạo độc đáo. Tư duy thông minh, sắc sảo và có chiều sâu. Có thể thành công trong các lĩnh vực nghệ thuật, biểu diễn. Tiêu cực là dễ trở nên lạnh lùng, khó gần. Có xu hướng nổi loạn ngầm, không thích bị gò bó.
- Hợi (-Thủy) - Thương Quan: Rất thông minh, có khả năng học hỏi và thể hiện bản thân tốt. Có tài năng trong kinh doanh, ngoại giao. Tiêu cực là dễ dùng sự thông minh của mình để chỉ trích người khác. Có thể hơi phóng túng, thiếu ổn định trong cuộc sống.
- Dần (+Mộc) - Chính Tài: Có ý chí kiếm tiền, không ngại khó khăn. Có thể có được những khoản thu nhập lớn nếu nỗ lực hết mình. Tiêu cực là luôn phải đối mặt với sự cạnh tranh và thử thách lớn về tài chính. Dễ bị hao tài vì các dự án quá sức.
- Mão (-Mộc) - Thiên Tài: Có tài năng trong việc kinh doanh các mặt hàng nhỏ, mang tính thẩm mỹ. Có nhiều cơ hội kiếm tiền nhưng không lớn. Tiêu cực là tiền bạc đến và đi nhanh chóng. Dễ bị xung khắc (Mão Dậu xung), gây ra sự bất ổn, mất mát về tài chính.
- Tỵ (-Hỏa) - Chính Quan: Có cơ hội làm việc trong các tổ chức lớn, có danh tiếng. Được cấp trên ưu ái, nâng đỡ. Tiêu cực là môi trường làm việc có nhiều áp lực. Dễ bị căng thẳng thần kinh. Cần chú ý các vấn đề về tim mạch, khí huyết.
- Ngọ (+Hỏa) - Thất Sát: Rèn luyện ý chí mạnh mẽ, khả năng chịu đựng áp lực phi thường. Nếu vượt qua được sẽ có thành tựu. Tiêu cực là áp lực công việc, cuộc sống cực lớn. Luôn cảm thấy như bị thiêu đốt, mệt mỏi, kiệt sức. Sức khỏe và tinh thần bị bào mòn nghiêm trọng.
- Thìn, Tuất (+Thổ) - Chính Ấn: Thìn là đất ẩm, có thể nhận được sự hỗ trợ về vật chất, đất đai (Thìn), hoặc có thể có hứng thú với tôn giáo, huyền học như một lối thoát (Tuất). Tiêu cực là vẫn là hình ảnh đất chôn vùi Kim. Dù đất ẩm có phần tốt hơn đất khô nhưng vẫn khiến Tân Kim mất đi sự tỏa sáng (Thìn), hoặc Tuất là đất khô nóng, là loại Chính Ấn xấu nhất. Chôn vùi Tân Kim một cách triệt để, khiến Kim vừa bị bẩn vừa trở nên giòn, dễ vỡ (Tuất).
- Sửu, Mùi (-Thổ) - Thiên Ấn: Sửu là đất ẩm lạnh, có thể có sự ổn định về mặt vật chất. Hứng thú với những kiến thức cổ, truyền thống (Sửu), hoặc có thể có một chút tài sản, đất đai nhưng không lớn (Mùi). Tiêu cực là làm bẩn và khiến trang sức mất đi vẻ óng ả. Cuộc sống có phần cô độc, lạnh lẽo, thiếu sự ấm áp (Sửu), hoặc Mùi là đất khô nóng, làm bẩn và khiến trang sức trở nên giòn. Dễ bị người khác giúp đỡ một cách nhiệt tình nhưng lại gây hại (Mùi).`,
      },
      {
        name: "Nhâm",
        thapThanText: `
- Hợi (-Thủy) - Tỷ Kiên: Là gốc rễ vững chắc của Nhâm Thủy (Lâm Quan). Mang lại sự thông minh, tự chủ và khả năng độc lập tác chiến. Có nhiều bạn bè tốt, sẵn sàng giúp đỡ. Tiêu cực là rất bướng bỉnh và có xu hướng tự làm theo ý mình, không nghe ai. Có thể trở nên quá tự tin vào bản thân dẫn đến thất bại.
- Tý (+Thủy) - Kiếp Tài: Mang lại cho Nhâm Thủy ý chí sắt đá và tham vọng quyền lực (Đế cường). Vô cùng thông minh, mưu lược, có khả năng lãnh đạo và thu phục lòng người. Tiêu cực là cạnh tranh cực kỳ khốc liệt. Có tính chiếm hữu cao, có thể dùng mọi thủ đoạn để đạt được mục đích. Dễ gây ra tranh đoạt về tiền bạc, tình cảm.
- Dần (+Mộc) - Thực Thần: Vô cùng năng động, có tài năng trong nhiều lĩnh vực, đặc biệt là kinh doanh và khám phá. Dám nghĩ dám làm, không ngại thử thách. Tiêu cực là dễ bốc đồng, làm việc theo cảm hứng. Có thể hơi liều lĩnh, "được ăn cả, ngã về không".
- Mão (-Mộc) - Thương Quan: Có tài năng nghệ thuật, văn chương xuất chúng. Lời nói duyên dáng, có sức hấp dẫn. Rất thông minh và nhạy bén với thời cuộc. Tiêu cực là dễ quá đa tình, không chung thủy. Hay chỉ trích, phán xét người khác. Dễ bị cảm xúc chi phối hành động.
- Ngọ (+Hỏa) - Chính Tài: Có cơ hội kiếm được những khoản tiền lớn và ổn định. Có đam mê và nhiệt huyết với công việc, dễ đạt được thành công về tài chính. Tiêu cực là dễ xảy ra xung đột, mâu thuẫn (Thủy Hỏa giao tranh). Tài chính có thể lên xuống thất thường nếu không biết quản lý tốt.
- Tỵ (-Hỏa) - Thiên Tài: Rất nhạy bén với các cơ hội đầu tư, kinh doanh. Có thể kiếm được những khoản tiền lớn một cách bất ngờ. Tiêu cực là tài chính cực kỳ biến động, rủi ro cao. Dễ gặp phải các vấn đề tranh chấp liên quan đến tiền bạc.
- Sửu, Mùi (-Thổ) - Chính Quan: Sửu mang lại sự ổn định và tinh thần trách nhiệm. Giúp họ kiên trì hơn trong việc theo đuổi mục tiêu sự nghiệp (Sửu), hoặc nếu trong mệnh có Kim mạnh để thông quan, có thể đạt được chức vụ trong các lĩnh vực liên quan đến đất đai, xây dựng (Mùi). Tiêu cực là Sửu là đất ẩm lạnh, làm giảm sức mạnh của Nhâm Thủy. Công việc có nhiều quy tắc ngầm, áp lực không rõ ràng nhưng dai dẳng (Sửu), hoặc Mùi là đất khô nóng, gây ra sự xung khắc mạnh. Công việc có nhiều áp lực rõ ràng, đòi hỏi cao, dễ xảy ra mâu thuẫn trực diện với cấp trên hoặc luật lệ (Mùi).
- Thìn, Tuất (+Thổ) - Thất Sát: Thìn là kho chứa nước, là Thất Sát nhưng lại là nơi Nhâm Thủy có thể nương tựa. Mang lại quyền lực lớn lao, khả năng quản lý các dự án tầm cỡ (Thìn), hoặc rèn luyện ý chí kiên cường, không sợ hãi. Nếu vượt qua được sẽ đạt được vị thế và quyền lực mà không ai sánh bằng (Tuất). Tiêu cực là cuộc sống luôn đầy rẫy những trận chiến lớn. Áp lực cực đại, đòi hỏi phải luôn mạnh mẽ (Thìn), hoặc Tuất là đất khô nóng và là "lưới trời", gây ra sự khắc chế mạnh nhất. Đây là thử thách sinh tử, hiểm nguy bậc nhất. Dễ gặp tai nạn, bệnh tật hiểm nghèo, kiện tụng, tù tội (Tuất).
- Dậu (-Kim) - Chính Ấn: Rất thông minh, có năng khiếu học thuật và nghệ thuật. Có khả năng tiếp thu kiến thức tốt và được sự hỗ trợ từ gia đình. Nguồn nước được bồi đắp liên tục. Tiêu cực là đôi khi quá lý thuyết, thiếu tính thực tế. Dễ bị ám ảnh bởi sự hoàn hảo. Dễ bị vướng vào các mối quan hệ tình cảm phức tạp (đào hoa).
- Thân (+Kim) - Thiên Ấn: Cực kỳ thông minh, đa tài, học một biết mười. Có khả năng thành công trong nhiều lĩnh vực khác nhau, đặc biệt là những ngành nghề đòi hỏi tư duy linh hoạt. Tiêu cực là "cả thèm chóng chán", không kiên trì theo đuổi đến cùng. Dễ thay đổi, thiếu sự ổn định trong định hướng.`,
      },
      {
        name: "Quý",
        thapThanText: `
- Tý (+Thủy) - Tỷ Kiên: Đây là gốc rễ vững chắc nhất của Quý Thủy (Đế cường), mang lại sự thông minh tột đỉnh và ý chí mạnh mẽ. Có khả năng lãnh đạo ngầm, thu hút người khác đi theo mình. Tiêu cực là rất ương ngạnh, bên ngoài mềm mỏng nhưng bên trong không ai thay đổi được. Có thể rất mưu mẹo, toan tính và có ham muốn kiểm soát mạnh mẽ.
- Hợi (-Thủy) - Kiếp Tài: Cung cấp nguồn năng lượng dồi dào (Lâm Quan), giúp Quý Thủy trở nên tự tin và có sức sống hơn. Có nhiều bạn bè, mối quan hệ xã hội rộng. Tiêu cực là dễ bị cuốn theo đám đông, mất đi bản sắc riêng. Khó giữ được tiền bạc, dễ bị bạn bè vay mượn hoặc lừa gạt.
- Mão (-Mộc) - Thực Thần: Rất thông minh, sáng tạo, có tài năng xuất chúng trong các lĩnh vực văn chương, nghệ thuật, giáo dục. Có khả năng biểu đạt cảm xúc một cách tinh tế. Tiêu cực là nhạy cảm quá mức, dễ bị tổn thương. Đôi khi hơi phù phiếm, chỉ chú trọng đến vẻ bề ngoài.
- Dần (+Mộc) - Thương Quan: Có tài năng đa dạng, có khả năng kinh doanh, đầu tư. Dám mạo hiểm, có chí tiến thủ và không ngừng học hỏi để vươn lên. Tiêu cực là dễ hành động bốc đồng, thiếu suy xét kỹ càng. Tham vọng quá lớn có thể dẫn đến thất bại. Dễ gặp rắc rối với pháp luật, quy định.
- Tỵ (-Hỏa) - Chính Tài: Thông minh, biết cách kiếm tiền và quản lý tài chính một cách khôn ngoan. Thường có những công việc mang lại thu nhập tốt và ổn định. Tiêu cực là hay lo lắng về tiền bạc. Đôi khi hơi tính toán, chi li. Cần cẩn thận kẻo bị lừa gạt tài chính.
- Ngọ (+Hỏa) - Thiên Tài: Có cơ hội kiếm được những khoản tiền lớn. Có đam mê và nhiệt huyết trong công việc kinh doanh, dám chấp nhận rủi ro để có lợi nhuận cao. Tiêu cực là chi tiêu hoang phí, tiền vào nhanh ra cũng nhanh. Dễ bị phá sản nếu đầu tư thất bại. Cuộc sống tài chính đầy biến động.
- Thìn, Tuất (+Thổ) - Chính Quan: Thìn là kho chứa nước, vừa là Quan vừa là gốc rễ của Thủy. Điều này tạo ra một mối quan hệ phức tạp nhưng thuận lợi: cấp trên, tổ chức vừa quản lý vừa tạo điều kiện cho mình phát triển (Thìn), hoặc mang lại tinh thần trách nhiệm và sự tuân thủ kỷ luật. Giúp rèn luyện bản thân trong môi trường áp lực cao để trở nên mạnh mẽ hơn (Tuất). Tiêu cực là dễ bị vướng vào các mối quan hệ chồng chéo, phức tạp trong công việc. Đôi khi cấp trên hay đồng nghiệp cũng chính là đối thủ cạnh tranh ngầm (Thìn), hoặc Tuất là đất khô nóng (Hỏa khố), gây áp lực rất lớn cho Quý Thủy. Môi trường làm việc khắc nghiệt, cấp trên nghiêm khắc, đòi hỏi cao. Dễ bị căng thẳng, mệt mỏi vì công việc (Tuất).
- Sửu, Mùi (-Thổ) - Thất Sát: Khi có Ấn chế hóa, có thể biến áp lực thành động lực, đạt được quyền lực trong các môi trường đặc thù (nghiên cứu, kỹ thuật). Rèn luyện tính kiên nhẫn (Sửu), hoặc nếu trong mệnh có Mộc mạnh để chế ngự, có thể biến thử thách thành cơ hội để thể hiện tài năng, đạt được thành tựu bất ngờ (Mùi). Tiêu cực là Sửu là đất ẩm lạnh (Kim khố), là Thất Sát mang tính âm thầm. Áp lực đến từ từ, dai dẳng, khó chịu. Dễ gặp phải tiểu nhân ngấm ngầm hãm hại, các bệnh mãn tính khó chữa (Sửu), hoặc Mùi là đất khô nóng (Mộc khố), Thất Sát này đến một cách trực diện và mạnh mẽ. Thử thách, kẻ thù xuất hiện rõ ràng. Áp lực công việc rất lớn, dễ bị stress, nóng nảy. Nữ mệnh tình duyên vất vả (Mùi).
- Dậu (-Kim) - Chính Ấn: Có tài năng đặc biệt, tư duy khác người. Có khả năng thành công trong các lĩnh vực đòi hỏi sự tinh xảo và độc đáo. Tiêu cực là tính cách kỳ lạ, khó hòa đồng. Dễ bị ám ảnh bởi những suy nghĩ tiêu cực. Có thể gặp khó khăn trong việc xây dựng các mối quan hệ thân thiết.
- Thân (+Kim) - Thiên Ấn: Rất thông minh, có nguồn kiến thức dồi dào. Có khả năng học hỏi và áp dụng kiến thức một cách linh hoạt. Tiêu cực là đôi khi suy nghĩ quá nhiều mà không hành động. Có xu hướng dựa dẫm vào gia đình, người thân.`,
      },
      {
        name: "Đinh",
        thapThanText: `
- Ngọ (+Hỏa) - Tỷ Kiên: Là gốc rễ vững chắc (Lộc), mang lại năng lượng, ý chí và sự tự chủ. Giúp Đinh Hỏa trở nên mạnh mẽ và quyết đoán hơn. Tiêu cực là cực kỳ cố chấp, một khi đã quyết thì không thay đổi. Tính cách nóng nảy, thiếu sự mềm mỏng, linh hoạt.
- Tỵ (-Hỏa) - Kiếp Tài: Mang lại sự tự tin, năng lượng và khả năng cạnh tranh. Có nhiều bạn bè, mối quan hệ xã hội. Tiêu cực là nơi Đế cường của Kiếp Tài. Cạnh tranh cực kỳ khốc liệt. Dễ bị bạn bè lôi kéo, phản bội. Hao tài tốn của vì các mối quan hệ.
- Thìn, Tuất (+Thổ) - Thương Quan: Có đầu óc thông minh, khả năng sáng tạo tốt (Thìn), hoặc là lò lửa, là nơi Đinh Hỏa phát huy tốt nhất khả năng "rèn luyện" của mình. Rất giỏi trong các ngành nghề kỹ thuật, chuyên môn cao, đòi hỏi sự tập trung (Tuất). Tiêu cực là Thìn là đất ẩm, làm Hỏa bị lu mờ. Dễ bị người khác xem thường tài năng. Lời nói có thể kiêu ngạo nhưng không đủ sức thuyết phục (Thìn), hoặc dễ trở nên quá tập trung vào chuyên môn mà khô khan, khó gần. Có thể hơi kiêu ngạo về tài năng của mình (Tuất).
- Sửu, Mùi (-Thổ) - Thực Thần: Rèn luyện tính kiên nhẫn, khả năng làm việc tỉ mỉ trong thời gian dài (Sửu), hoặc là đất khô, chứa Mộc, có thể giúp Đinh Hỏa duy trì sự sáng tạo. Có tài năng trong lĩnh vực nghệ thuật, ẩm thực (Mùi). Tiêu cực là Sửu là đất ẩm lạnh, làm dập tắt ngọn lửa. Khiến Đinh Hỏa mất hết sức sống, trở nên bi quan, u uất. Tài năng và sức khỏe đều bị ảnh hưởng xấu (Sửu), hoặc vẫn làm Hỏa bị yếu đi. Có thể trở nên quá đam mê hưởng thụ, vui chơi mà thiếu đi ý chí phấn đấu (Mùi).
- Dậu (-Kim) - Thiên Tài: Rất nhạy bén với các cơ hội tài chính. Có thể có được những khoản thu nhập bất ngờ. Tiêu cực là tiền bạc đến và đi rất nhanh. Dễ bị thua lỗ vì các quyết định đầu tư vội vàng.
- Thân (+Kim) - Chính Tài: Có nhiều cơ hội kiếm tiền, có khả năng quản lý các dự án tài chính. Tiêu cực là tài chính không ổn định, lúc được lúc mất. Dễ bị công việc làm cho mệt mỏi.
- Tý (+Thủy) - Thất Sát: Rèn luyện ý chí sinh tồn phi thường. Tiêu cực là áp lực từ mọi phía, cảm giác như bị dồn vào chân tường. Sức khỏe suy yếu, đặc biệt là mắt và hệ tim mạch. Cuộc sống luôn đầy rẫy khó khăn, thử thách.
- Hợi (-Thủy) - Chính Quan: Rèn luyện cho Đinh Hỏa khả năng làm việc trong môi trường có kỷ luật, nguyên tắc. Tiêu cực là áp lực công việc đến một cách âm thầm nhưng mạnh mẽ. Luôn cảm thấy bị kiểm soát, gò bó. Nữ mệnh có chồng gia trưởng.
- Dần (+Mộc) - Chính Ấn: Là nguồn hỗ trợ mạnh mẽ và vững chắc. Có nền tảng gia đình, học vấn tốt. Luôn có người giúp đỡ lúc khó khăn. Tiêu cực là có thể vì được che chở quá mức mà trở nên thiếu kinh nghiệm sống, hơi ngây thơ.
- Mão (-Mộc) - Thiên Ấn: Rất thông minh, có năng khiếu trong các lĩnh vực nghệ thuật, thủ công. Có trực giác tốt. Tiêu cực là dễ "cả thèm chóng chán", không theo đuổi kiến thức đến cùng. Suy nghĩ có phần kỳ lạ, khó hòa đồng, dễ cảm thấy cô độc.`,
      },
      {
        name: "Canh",
        thapThanText: `
- Thân (+Kim) - Tỷ Kiên: Là gốc rễ vững chắc (Lâm Quan), mang lại sự thông minh, năng động và đa tài. Rất giỏi trong việc thực thi, hành động nhanh nhẹn, dứt khoát. Tiêu cực là rất hiếu thắng, thích cạnh tranh và có phần liều lĩnh. Dễ thay đổi, thiếu sự ổn định lâu dài. Cần cẩn thận với tai nạn xe cộ, va chạm.
- Dậu (-Kim) - Kiếp Tài: Giúp Canh Kim có khả năng ăn nói tốt hơn, biết cách thể hiện bản thân một cách duyên dáng (Đế cường). Có thể thành công trong các lĩnh vực cần sự kết hợp giữa sức mạnh và vẻ đẹp. Tiêu cực là dễ vướng vào các cuộc tranh cãi, thị phi. Có thể bị hao tài vì các mối quan hệ xã hội. Dễ có các vấn đề liên quan đến tình cảm, tửu sắc.
- Hợi (-Thủy) - Thực Thần: Rất thông minh, có tầm nhìn xa. Có khả năng học hỏi và sáng tạo không ngừng. Thích hợp với các công việc đòi hỏi tư duy và sự di chuyển. Tiêu cực là dễ hành động theo cảm tính. Có thể hơi thiếu thực tế, suy nghĩ nhiều hơn làm. Năng lượng bị tiết xuất quá nhiều.
- Tý (+Thủy) - Thương Quan: Cực kỳ thông minh, có tài năng xuất chúng và khả năng sáng tạo độc đáo. Có thể tạo ra những thành tựu đột phá. Tiêu cực là thích nổi loạn, không chịu sự gò bó. Dễ gặp rắc rối với pháp luật. Có xu hướng cô độc, khó hòa nhập. Kim bị Thủy lạnh làm cho "chết", mất đi sự ấm áp.
- Mão (-Mộc) - Chính Tài: Có khả năng quản lý tài chính tốt, biết cách tích lũy. Có thu nhập ổn định từ công việc chăm chỉ. Tiêu cực là dễ trở nên quá tính toán, chi li. Có thể gặp khó khăn trong việc kiếm tiền vì Mão Mộc là Âm Mộc yếu ớt so với Canh Kim.
- Dần (+Mộc) - Thiên Tài: Có khí phách, dám nghĩ dám làm trong kinh doanh. Có khả năng kiếm được những khoản tiền lớn thông qua đầu tư, mạo hiểm. Tiêu cực là tài chính rất bấp bênh. Dễ gặp rủi ro lớn trong đầu tư, có thể mất trắng. Cần cẩn thận với các vấn đề liên quan đến xe cộ.
- Ngọ (+Hỏa) - Chính Quan: Có tinh thần trách nhiệm cao, ý chí mạnh mẽ để theo đuổi công danh. Có cơ hội làm lãnh đạo, quản lý trong môi trường có kỷ luật cao. Tiêu cực là áp lực công việc rất lớn, luôn trong trạng thái căng thẳng. Dễ bị các bệnh liên quan đến tim mạch, huyết áp. Tính cách có phần nóng nảy, cứng nhắc.
- Tỵ (-Hỏa) - Thất Sát: Có khả năng làm việc dưới áp lực cao. Rất quyết đoán và có uy quyền trong lĩnh vực của mình. Tỵ là đất trường sinh của Canh Kim, nên dù là Sát nhưng vẫn có yếu tố hỗ trợ ngầm. Tiêu cực là luôn phải đối mặt với sự cạnh tranh khốc liệt và nguy hiểm. Dễ gặp tai nạn, kiện tụng. Sức khỏe dễ bị ảnh hưởng, đặc biệt là hệ hô hấp.
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
    let napAmData = [
      {
        name: "KIẾM PHONG KIM",
        description:
          'KIẾM PHONG KIM (Vàng Mũi Kiếm)\nXếp Hạng: 1/6 (Mạnh Nhất)\nNguồn Gốc Can Chi: Nhâm Thân, Quý Dậu\nHình Tượng & Bản Chất: Đây là hình tượng kim loại đã được tôi luyện tới đỉnh cao của sự cứng rắn và sắc bén. Nó là thanh bảo kiếm của đế vương, là mũi kim của thần y, mang năng lượng của sự công phá, quyền lực, kỷ luật và sự dứt khoát. Đây là dạng Kim "thành khí" và hữu dụng nhất.\nLuận Bàn Tính Cách & Số Phận: Người có mệnh này thường quyết đoán, dũng mãnh, có ý chí sắt đá và tài năng lãnh đạo. Họ sống có mục tiêu, hành động nhanh gọn, yêu thích sự công bằng, minh bạch. Tuy nhiên, điểm yếu của họ là sự lạnh lùng, cứng nhắc, đôi khi độc đoán và hiếu chiến, dễ gây tổn thương cho người khác bằng lời nói hoặc hành động sắc như dao kiếm.\nNgữ Nghĩa Cốt Lõi: Sức mạnh của sự công phá & Nguy cơ của sự tàn khốc.',
      },
      {
        name: "KIM BẠCH KIM",
        description:
          "KIM BẠCH KIM (Vàng Thỏi/Vàng Trắng)\nXếp Hạng: 2/6 (Mạnh Nhì)\nNguồn Gốc Can Chi: Canh Thìn, Tân Tỵ\nHình Tượng & Bản Chất: Kim loại nguyên chất, tự nhiên, chưa qua chế tác. Vàng khối, bạc nén, mang giá trị nội tại cao quý và thuần khiết.\nLuận Bàn Tính Cách & Số Phận: Người có mệnh này thường có nội tâm trong sáng, ngay thẳng, chính trực và có lòng tự trọng cao. Họ là những người có thực lực, giá trị cốt lõi. Tuy nhiên, điểm yếu của họ là quá lý tưởng hóa, kiêu kỳ, khó gần, thiếu linh hoạt.\nNgữ Nghĩa Cốt Lõi: Sự cao quý của giá trị & Sự xa cách của lý tưởng.",
      },
      {
        name: "SA TRUNG KIM",
        description:
          "SA TRUNG KIM (Vàng Trong Cát)\nXếp Hạng: 3/6 (Mạnh Ba)\nNguồn Gốc Can Chi: Giáp Ngọ, Ất Mùi\nHình Tượng & Bản Chất: Khoáng sản, quặng vàng còn lẫn trong đất cát, chưa được khai phá. Giá trị tiềm ẩn, cần có điều kiện bên ngoài tác động mới lộ ra.\nLuận Bàn Tính Cách & Số Phận: Người có mệnh này thường khiêm tốn, có tài năng, giá trị tiềm ẩn nhưng cần có người dìu dắt, khám phá. Họ có mâu thuẫn nội tâm, tư duy không thuần nhất.\nNgữ Nghĩa Cốt Lõi: Giá trị tiềm ẩn & Sự thiếu kiên định.",
      },
      {
        name: "THOA XUYẾN KIM",
        description:
          "THOA XUYẾN KIM (Vàng Trang Sức)\nXếp Hạng: 4/6 (Mạnh Tư)\nNguồn Gốc Can Chi: Canh Tuất, Tân Hợi\nHình Tượng & Bản Chất: Kim loại đã qua chế tác tinh xảo thành đồ trang sức lộng lẫy. Giá trị nằm ở vẻ đẹp, sự tinh tế và công năng trang điểm.\nLuận Bàn Tính Cách & Số Phận: Ngoại hình ưa nhìn, khéo léo, tinh tế, có khiếu thẩm mỹ và khả năng giao tiếp tốt. Tuy nhiên, điểm yếu của họ là nội lực yếu, trọng hình thức, đôi khi phù phiếm.\nNgữ Nghĩa Cốt Lõi: Vẻ đẹp của sự tinh xảo & Sự thiếu vắng sức mạnh cốt lõi.",
      },
      {
        name: "HẢI TRUNG KIM",
        description:
          "HẢI TRUNG KIM (Vàng Dưới Biển)\nXếp Hạng: 5/6 (Mạnh Năm)\nNguồn Gốc Can Chi: Giáp Tý, Ất Sửu\nHình Tượng & Bản Chất: Kho báu, kim loại quý chìm sâu dưới đáy đại dương. Tĩnh lặng, lạnh lẽo và bị che giấu.\nLuận Bàn Tính Cách & Số Phận: Nội tâm sâu sắc, trầm tĩnh, có tài năng nhưng không thích thể hiện. Sống an phận, ít tham vọng, thường bỏ lỡ cơ hội.\nNgữ Nghĩa Cốt Lõi: Kho báu bị che giấu & Sự thụ động, thiếu cơ hội.",
      },
      {
        name: "BẠCH LẠP KIM",
        description:
          "BẠCH LẠP KIM (Vàng Trong Nến)\nXếp Hạng: 6/6 (Yếu Nhất)\nNguồn Gốc Can Chi: Canh Dần, Tân Mão\nHình Tượng & Bản Chất: Kim loại ở dạng phôi thai, còn non yếu, đang trong quá trình nóng chảy như sáp nến. Chưa có hình hài cố định.\nLuận Bàn Tính Cách & Số Phận: Khả năng thích ứng cao, linh hoạt, giỏi giao tiếp nhưng thiếu lập trường, dễ bị người khác ảnh hưởng.\nNgữ Nghĩa Cốt Lõi: Tiềm năng của sự khởi đầu & Sự yếu ớt vì chưa thành hình",
      },
      {
        name: "THIÊN THƯỢNG HỎA",
        description:
          "THIÊN THƯỢNG HỎA (Lửa Trên Trời)\nXếp Hạng: 1/6 (Mạnh Nhất)\nNguồn Gốc Can Chi: Mậu Ngọ, Kỷ Mùi\nHình Tượng & Bản Chất: Năng lượng của mặt trời, nguồn sáng và nhiệt vô tận, bao trùm vạn vật. Bản chất quang minh, chính đại, công bằng và hào sảng.\nLuận Bàn Tính Cách & Số Phận: Tư duy lớn, hào sảng, chính trực, công bằng và có sức ảnh hưởng rộng lớn. Tuy nhiên, điểm yếu của họ là kiêu ngạo, tự cao, không thích bị ai vượt mặt.\nNgữ Nghĩa Cốt Lõi: Sức mạnh của sự minh bạch & Sự thiêu đốt của tính kiêu ngạo",
      },
      {
        name: "TÍCH LỊCH HỎA",
        description:
          "TÍCH LỊCH HỎA (Lửa Sấm Sét)\nXếp Hạng: 2/6 (Mạnh Nhì)\nNguồn Gốc Can Chi: Mậu Tý, Kỷ Sửu\nHình Tượng & Bản Chất: Năng lượng bùng nổ, đột ngột và dữ dội của trời đất. Tia sét đánh xuống, tia lửa điện. Mang tính đột phá, nhanh, mạnh.\nLuận Bàn Tính Cách & Số Phận: Cực kỳ thông minh, năng nổ, có tài năng xuất chúng và khả năng tạo ra những thay đổi lớn. Tuy nhiên, điểm yếu của họ là cực kỳ nóng tính, dễ nổi giận.\nNgữ Nghĩa Cốt Lõi: Sức mạnh của sự đột phá & Sự nguy hiểm của tính bộc phát",
      },
      {
        name: "LƯ TRUNG HỎA",
        description:
          "LƯ TRUNG HỎA (Lửa Trong Lò)\nXếp Hạng: 3/6 (Mạnh Ba)\nNguồn Gốc Can Chi: Bính Dần, Đinh Mão\nHình Tượng & Bản Chất: Ngọn lửa được nuôi dưỡng và kiểm soát trong một không gian nhất định. Sức mạnh tập trung, có mục đích rõ ràng.\nLuận Bàn Tính Cách & Số Phận: Có nội lực, ý chí bền bỉ và tài năng tiềm ẩn cần được mài giũa. Tuy nhiên, điểm yếu của họ là cuộc sống phụ thuộc, cần người khác 'tiếp nhiên liệu'.\nNgữ Nghĩa Cốt Lõi: Sức mạnh của năng lượng tập trung & Sự phụ thuộc vào nguồn nhiên liệu",
      },
      {
        name: "SƠN ĐẦU HỎA",
        description:
          "SƠN ĐẦU HỎA (Lửa Trên Núi)\nXếp Hạng: 4/6 (Mạnh Tư)\nNguồn Gốc Can Chi: Giáp Tuất, Ất Hợi\nHình Tượng & Bản Chất: Ngọn lửa cháy trên núi, lửa của đám cháy rừng. Lúc ẩn lúc hiện, có thể bùng phát dữ dội khi có điều kiện.\nLuận Bàn Tính Cách & Số Phận: Thông minh, thâm trầm, có tài năng nhưng ít khi thể hiện ra ngoài. Tuy nhiên, điểm yếu của họ là nội tâm phức tạp, khó đoán, hay che giấu cảm xúc.\nNgữ Nghĩa Cốt Lõi: Sức mạnh tiềm ẩn chờ bùng nổ & Sự khó lường của nội tâm",
      },
      {
        name: "SƠN HẠ HỎA",
        description:
          "SƠN HẠ HỎA (Lửa Dưới Núi)\nXếp Hạng: 5/6 (Mạnh Năm)\nNguồn Gốc Can Chi: Bính Thân, Đinh Dậu\nHình Tượng & Bản Chất: Ánh lửa le lói dưới chân núi lúc đêm về, ánh hoàng hôn đang dần tắt. Năng lượng đã ở giai đoạn suy yếu.\nLuận Bàn Tính Cách & Số Phận: Ôn hòa, điềm tĩnh, sống có kinh nghiệm và biết điểm dừng. Tuy nhiên, điểm yếu của họ là thiếu nhiệt huyết, hay do dự, dễ bỏ lỡ thời cơ.\nNgữ Nghĩa Cốt Lõi: Vẻ đẹp của sự trải nghiệm & Sự suy yếu của năng lượng",
      },
      {
        name: "PHÚC ĐĂNG HỎA",
        description:
          "PHÚC ĐĂNG HỎA (Lửa Ngọn Đèn)\nXếp Hạng: 6/6 (Yếu Nhất)\nNguồn Gốc Can Chi: Giáp Thìn, Ất Tỵ\nHình Tượng & Bản Chất: Ánh sáng nhỏ bé của ngọn đèn dầu, đèn lồng. Chỉ có thể soi sáng một không gian hẹp, mang lại sự ấm áp.\nLuận Bàn Tính Cách & Số Phận: Tấm lòng nhân hậu, khiêm tốn, sống tận tụy và hy sinh thầm lặng cho người khác. Tuy nhiên, điểm yếu của họ là năng lực có hạn, tầm nhìn hẹp.\nNgữ Nghĩa Cốt Lõi: Sự ấm áp của hy sinh thầm lặng & Sự giới hạn của năng lượng nhỏ",
      },
      {
        name: "ĐẠI HẢI THỦY",
        description:
          "ĐẠI HẢI THỦY (Nước Biển Lớn)\nXếp Hạng: 1/6 (Mạnh Nhất)\nNguồn Gốc Can Chi: Nhâm Tuất, Quý Hợi\nHình Tượng & Bản Chất: Là biển cả mênh mông, năng lượng vô biên, khó lường và chứa đựng vạn vật. Nó là biểu tượng của tiềm năng vô hạn, hoài bão lớn lao nhưng cũng đầy bất ổn và có sức hủy diệt khủng khiếp.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này thường có hoài bão lớn, tư duy không giới hạn, tấm lòng bao dung. Họ có khả năng làm những việc phi thường. Tuy nhiên, họ thường bất ổn, cả thèm chóng chán, khó kiểm soát cảm xúc, khi giận dữ có thể hủy hoại mọi thứ xung quanh.\nNgữ Nghĩa Cốt Lõi: Tiềm năng vô hạn & Sự khó lường của biển cả.",
      },
      {
        name: "THIÊN HÀ THỦY",
        description:
          "THIÊN HÀ THỦY (Nước Trên Trời)\nXếp Hạng: 2/6 (Mạnh Nhì)\nNguồn Gốc Can Chi: Bính Ngọ, Đinh Mùi\nHình Tượng & Bản Chất: Là nước mưa từ trời cao ban xuống, tinh khiết và trong lành. Nó là biểu tượng của sự ban ơn, lòng nhân ái và trí tuệ thanh cao. Năng lượng của nó có sức ảnh hưởng rộng lớn, nuôi dưỡng vạn vật một cách công bằng.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này thường thanh cao, tinh tế, có lòng nhân ái và được nhiều người yêu mến. Họ có sức ảnh hưởng và khả năng lan tỏa những điều tốt đẹp. Tuy nhiên, họ có thể hơi mơ mộng, thiếu thực tế, và tâm trạng thất thường như mưa nắng.\nNgữ Nghĩa Cốt Lõi: Sự ban ơn từ trên cao & Sự xa rời thực tế.",
      },
      {
        name: "TRƯỜNG LƯU THỦY",
        description:
          "TRƯỜNG LƯU THỦY (Sông Dài Chảy Mãi)\nXếp Hạng: 3/6 (Mạnh Ba)\nNguồn Gốc Can Chi: Nhâm Thìn, Quý Tỵ\nHình Tượng & Bản Chất: Là dòng sông lớn chảy không ngừng, có phương hướng và mục tiêu rõ ràng là đổ ra biển. Nó là biểu tượng của sự năng động, kiên trì và một cuộc đời nhiều biến động, không ngừng tiến về phía trước.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này sống rất năng động, có mục tiêu rõ ràng và ý chí kiên trì để theo đuổi. Họ không ngại khó khăn, gian khổ. Tuy nhiên, cuộc sống của họ thường bôn ba, vất vả, ít khi được dừng lại nghỉ ngơi và trải qua nhiều biến động.\nNgữ Nghĩa Cốt Lõi: Động lực của sự kiên trì & Sự vất vả của hành trình không ngừng nghỉ.",
      },
      {
        name: "ĐẠI KHÊ THỦY",
        description:
          "ĐẠI KHÊ THỦY (Nước Suối Lớn)\nXếp Hạng: 4/6 (Mạnh Tư)\nNguồn Gốc Can Chi: Giáp Dần, Ất Mão\nHình Tượng & Bản Chất: Là dòng suối lớn trong khe núi, lúc ẩn lúc hiện, chảy mạnh mẽ nhưng linh hoạt. Nó là biểu tượng của nội lực, sự thông minh, khéo léo che giấu thực lực và tinh thần yêu tự do.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này thường thông minh, tự lực, có nội lực mạnh mẽ nhưng không phô trương. Họ linh hoạt, ứng biến tốt và thích cuộc sống tự do tự tại. Tuy nhiên, họ có thể hành động theo cảm tính, không thích quy tắc gò bó và đôi khi khó đoán.\nNgữ Nghĩa Cốt Lõi: Sức mạnh của nội lực & Sự khó đoán, ưa tự do.",
      },
      {
        name: "TUYỀN TRUNG THỦY",
        description:
          "TUYỀN TRUNG THỦY (Nước Trong Giếng)\nXếp Hạng: 5/6 (Mạnh Năm)\nNguồn Gốc Can Chi: Giáp Thân, Ất Dậu\nHình Tượng & Bản Chất: Là nước giếng trong lành, tĩnh lặng và có giới hạn. Nó là biểu tượng của trí tuệ, sự thâm trầm, sống có chiều sâu nhưng bị giới hạn trong một không gian hẹp.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này thường sống an nhàn, trong sạch, có chiều sâu nội tâm và trí tuệ. Họ suy nghĩ thâm trầm, sâu sắc. Tuy nhiên, tầm nhìn của họ thường hạn hẹp, cuộc sống bị động, ít có cơ hội để phát triển những sự nghiệp lớn lao.\nNgữ Nghĩa Cốt Lõi: Sự sâu sắc của tĩnh lặng & Sự giới hạn của không gian hẹp.",
      },
      {
        name: "GIẢN HẠ THỦY",
        description:
          "GIẢN HẠ THỦY (Nước Ngầm/Khe Nhỏ)\nXếp Hạng: 6/6 (Yếu Nhất)\nNguồn Gốc Can Chi: Bính Tý, Đinh Sửu\nHình Tượng & Bản Chất: Là mạch nước ngầm, dòng chảy yếu ớt len lỏi trong lòng đất. Nó là khởi nguồn của các dòng chảy nhưng lại là dạng Thủy yếu nhất. Đây là biểu tượng của sự khởi đầu thầm lặng, bền bỉ nhưng hay do dự.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này sống nội tâm, bền bỉ một cách thầm lặng và biết chờ đợi thời cơ. Họ có tiềm năng nhưng thường yếu đuối, hay do dự, mâu thuẫn và thiếu quyết đoán để nắm bắt cơ hội.\nNgữ Nghĩa Cốt Lõi: Sự khởi nguồn thầm lặng & Sự do dự, thiếu động lực.",
      },
      {
        name: "ĐẠI LÂM MỘC",
        description:
          "ĐẠI LÂM MỘC (Cây Rừng Lớn)\nXếp Hạng: 1/6 (Mạnh Nhất)\nNguồn Gốc Can Chi: Mậu Tuất, Kỷ Hợi\nHình Tượng & Bản Chất: Hình ảnh của cả một khu rừng già với những cây đại thụ vững chãi, sum suê. Năng lượng mang tính cộng đồng, sự che chở.\nLuận Bàn Tính Cách & Số Phận: Hào sảng, trí tuệ, có khả năng che chở và là trụ cột cho gia đình, tập thể. Tuy nhiên, điểm yếu của họ là cố chấp, bảo thủ, không thích sự thay đổi.\nNgữ Nghĩa Cốt Lõi: Sức mạnh của sự bảo bọc & Sự trì trệ của cây cổ thụ",
      },
      {
        name: "TÙNG BÁCH MỘC",
        description:
          "TÙNG BÁCH MỘC (Cây Tùng Bách)\nXếp Hạng: 2/6 (Mạnh Nhì)\nNguồn Gốc Can Chi: Canh Dần, Tân Mão\nHình Tượng & Bản Chất: Cây tùng, cây bách kiên cường, mọc trên núi cao, chịu đựng sương gió, tuyết lạnh. Biểu tượng của khí tiết, ý chí kiên định.\nLuận Bàn Tính Cách & Số Phận: Ý chí sắt đá, khí phách, có thể vượt qua mọi nghịch cảnh. Tuy nhiên, điểm yếu của họ là đơn độc, khắc khổ, khó hòa nhập với đám đông.\nNgữ Nghĩa Cốt Lõi: Sức mạnh của ý chí & Cái giá của sự kiên cường",
      },
      {
        name: "THẠCH LỰU MỘC",
        description:
          "THẠCH LỰU MỘC (Cây Lựu Trên Đá)\nXếp Hạng: 3/6 (Mạnh Ba)\nNguồn Gốc Can Chi: Canh Thân, Tân Dậu\nHình Tượng & Bản Chất: Cây lựu có sức sống mãnh liệt, có thể mọc và ra quả trên đất đá khô cằn. Biểu tượng của nghị lực phi thường.\nLuận Bàn Tính Cách & Số Phận: Nghị lực phi thường, kiên trì, dẻo dai và không bao giờ đầu hàng số phận. Tuy nhiên, điểm yếu của họ là cuộc đời vất vả, phải đấu tranh liên tục.\nNgữ Nghĩa Cốt Lõi: Sức sống nảy mầm từ nghịch cảnh & Sự vất vả của cuộc đấu tranh sinh tồn",
      },
      {
        name: "TANG ĐỐ MỘC",
        description:
          "TANG ĐỐ MỘC (Cây Dâu)\nXếp Hạng: 4/6 (Mạnh Tư)\nNguồn Gốc Can Chi: Nhâm Tý, Quý Sửu\nHình Tượng & Bản Chất: Cây dâu tằm, một loại cây rất linh hoạt và hữu dụng. Biểu tượng của sự ứng biến, khéo léo và tinh thần phục vụ.\nLuận Bàn Tính Cách & Số Phận: Năng động, khéo léo, giỏi ứng biến và có nhiều tài lẻ. Tuy nhiên, điểm yếu của họ là thiếu chiều sâu, không ổn định, hay thay đổi mục tiêu.\nNgữ Nghĩa Cốt Lõi: Sự hữu ích của tính linh hoạt & Sự thiếu vững chãi",
      },
      {
        name: "BÌNH ĐỊA MỘC",
        description:
          "BÌNH ĐỊA MỘC (Cây Đồng Bằng)\nXếp Hạng: 5/6 (Mạnh Năm)\nNguồn Gốc Can Chi: Mậu Tuất, Kỷ Hợi\nHình Tượng & Bản Chất: Những loài cây cỏ, cây nông nghiệp mọc ở đồng bằng. Không phải gỗ quý, sống hiền hòa, phụ thuộc hoàn toàn vào tự nhiên.\nLuận Bàn Tính Cách & Số Phận: Ôn hòa, hiền lành, dễ gần và sống rất thực tế. Tuy nhiên, điểm yếu của họ là tầm nhìn ngắn, sức bật yếu, dễ bằng lòng với thực tại.\nNgữ Nghĩa Cốt Lõi: Vẻ đẹp của sự bình dị & Sự giới hạn của tầm nhìn",
      },
      {
        name: "DƯƠNG LIỄU MỘC",
        description:
          "DƯƠNG LIỄU MỘC (Cây Dương Liễu)\nXếp Hạng: 6/6 (Yếu Nhất)\nNguồn Gốc Can Chi: Nhâm Ngọ, Quý Mùi\nHình Tượng & Bản Chất: Cây liễu với thân mềm, cành lá rũ xuống, luôn đung đưa theo gió. Biểu tượng của sự uyển chuyển, mềm mại, nhạy cảm.\nLuận Bàn Tính Cách & Số Phận: Tâm hồn nhạy cảm, giàu lòng trắc ẩn, giỏi lắng nghe và thích nghi tốt. Tuy nhiên, điểm yếu của họ là yếu đuối về mặt ý chí, thiếu lập trường.\nNgữ Nghĩa Cốt Lõi: Sự khéo léo thích nghi & Sự thiếu vắng cốt lõi",
      },
      {
        name: "THÀNH ĐẦU THỔ",
        description:
          "THÀNH ĐẦU THỔ (Đất Trên Thành)\nXếp Hạng: 1/6 (Mạnh Nhất)\nNguồn Gốc Can Chi: Mậu Dần, Kỷ Mão\nHình Tượng & Bản Chất: Là đất tường thành, đê điều, đã được nén chặt và gia cố. Nó là biểu tượng của sự kiên cố, vững chãi, khả năng bảo vệ và tính nguyên tắc. Đây là dạng Thổ có sức mạnh phòng thủ lớn nhất.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này thường có lập trường vững vàng, sống có nguyên tắc, đáng tin cậy và có khả năng bảo vệ người khác. Họ là những người xây dựng và duy trì sự ổn định. Tuy nhiên, họ có thể rất bảo thủ, cứng đầu, thiếu linh hoạt và cố chấp.\nNgữ Nghĩa Cốt Lõi: Sức mạnh của sự kiên cố & Nguy cơ của sự bất biến.",
      },
      {
        name: "ĐẠI TRẠCH THỔ",
        description:
          "ĐẠI TRẠCH THỔ (Đất Nền Rộng)\nXếp Hạng: 2/6 (Mạnh Nhì)\nNguồn Gốc Can Chi: Mậu Thân, Kỷ Dậu\nHình Tượng & Bản Chất: Là đất cồn bãi, đất phù sa, nền móng rộng lớn. Nó là biểu tượng của sự màu mỡ, trù phú, lòng bao dung và là nền tảng cho vạn vật sinh sôi.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này có tấm lòng bao dung, phóng khoáng, dễ tha thứ. Họ thường có tài sản, đất đai và là nền tảng vững chắc cho người khác nương tựa. Tuy nhiên, họ có thể thiếu sự tinh tế, đôi khi tùy tiện và không có quy củ chặt chẽ như Thành Đầu Thổ.\nNgữ Nghĩa Cốt Lõi: Sức mạnh của nền tảng và sự trù phú & Sự thiếu quy củ.",
      },
      {
        name: "LỘ BÀNG THỔ",
        description:
          "LỘ BÀNG THỔ (Đất Ven Đường)\nXếp Hạng: 3/6 (Mạnh Ba)\nNguồn Gốc Can Chi: Canh Ngọ, Tân Mùi\nHình Tượng & Bản Chất: Là đất ven đường đã bị người và xe qua lại đè nén đến chai sạn. Nó là biểu tượng của sự bền bỉ, nhẫn nại, sức chịu đựng cao và trải qua nhiều sương gió.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này có sức chịu đựng phi thường, kiên nhẫn, giữ chữ tín và có thể gánh vác những công việc nặng nhọc. Cuộc sống của họ thường vất vả, ít có cơ hội phát triển lớn và có thể trở nên trơ lì, vô cảm với xung quanh.\nNgữ Nghĩa Cốt Lõi: Sức mạnh của sự dãi dầu & Sự thiếu màu mỡ.",
      },
      {
        name: "SA TRUNG THỔ",
        description:
          "SA TRUNG THỔ (Đất Pha Cát)\nXếp Hạng: 4/6 (Mạnh Tư)\nNguồn Gốc Can Chi: Bính Thìn, Đinh Tỵ\nHình Tượng & Bản Chất: Là đất cát, không thuần chất và dễ biến đổi. Nó là biểu tượng của sự linh hoạt, dễ thích nghi nhưng thiếu sự ổn định và lập trường vững chắc.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này rất linh hoạt, dễ thích nghi với nhiều môi trường khác nhau. Họ có nhiều khả năng tiềm ẩn. Tuy nhiên, họ thường không ổn định, hay thay đổi, thiếu lập trường và khó tập trung vào một mục tiêu lâu dài.\nNgữ Nghĩa Cốt Lõi: Sức mạnh của sự thích ứng & Sự thiếu nhất quán.",
      },
      {
        name: "BÍCH THƯỢNG THỔ",
        description:
          "BÍCH THƯỢNG THỔ (Đất Trên Tường)\nXếp Hạng: 5/6 (Mạnh Năm)\nNguồn Gốc Can Chi: Canh Tý, Tân Sửu\nHình Tượng & Bản Chất: Là lớp vôi vữa, đất trát trên tường. Nó không thể tự tồn tại mà phải nương tựa vào một cấu trúc khác. Nó là biểu tượng của sự cộng sinh, hợp tác, trang trí nhưng thiếu tự chủ.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này có tinh thần hợp tác tốt, biết nương tựa vào người khác để cùng phát triển. Họ có khả năng làm đẹp, trang trí. Tuy nhiên, họ thiếu tính tự lập, không có chính kiến, dễ lung lay và cuộc sống thường phụ thuộc vào người khác.\nNgữ Nghĩa Cốt Lõi: Vẻ đẹp của sự cộng sinh & Sự yếu đuối vì thiếu tự chủ.",
      },
      {
        name: "ỐC THƯỢNG THỔ",
        description:
          "ỐC THƯỢNG THỔ (Đất Trên Mái/Ngói)\nXếp Hạng: 6/6 (Yếu Nhất)\nNguồn Gốc Can Chi: Bính Tuất, Đinh Hợi\nHình Tượng & Bản Chất: Là đất đã được nung trong lửa thành ngói lợp nhà. Nó đã mất đi hoàn toàn đặc tính tự nhiên của đất. Nó là biểu tượng của sự trật tự, quy tắc và công năng che chở, bảo vệ.\nLuận Bàn Tính Cách & Số Phận: Người mệnh này sống rất có trật tự, tuân thủ quy tắc và có công năng bảo vệ, che chở cho người khác. Họ làm việc theo khuôn khổ định sẵn. Tuy nhiên, họ có thể cứng nhắc, giáo điều, mất gốc, thiếu sự linh hoạt và không có khả năng nuôi dưỡng, sáng tạo.\nNgữ Nghĩa Cốt Lõi: Sự hữu ích của quy tắc & Sự mất mát bản chất tự nhiên.",
      },
    ];
    return napAmData.find((item) => item.name === napAm).description;
  };

  const getCuongNhươc = (percent) => {
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

  const getTuTruData = (bazi) => {
    let nam = bazi.year;
    let thang = bazi.month;
    let nhatChu = bazi.day;
    let gio = bazi.hour;
    let nhatChuName = nhatChu.name.split(" ")[0];
    let nguHanhScore = bazi.nguHanhScore;
    let tuTru = `
Nhật Chủ: ${nhatChuName}. File Thập Thần của Nhật Chủ ${nhatChu.name}
Mười Thiên Can khi tương tác với Nhật Chủ ${nhatChuName} ${
      nhatChu.nguHanhCan
    } sẽ tạo ra mười thực thể (Thập Thần) với những biểu hiện riêng biệt. 
${getThapThanThienCan(nhatChuName)}
THẬP THẦN ĐỊA CHI
Mười hai Địa Chi ẩn chứa các Thiên Can, tạo nên những biểu hiện Thập Thần phức tạp và đa dạng hơn.
${getThapThanDiaChi(nhatChuName)}
2. Lá số Tứ Trụ. File Can Chi
Trụ Chính Năm ${nam.name}: Can ${nam.can} (${nam.thapThan}). Chi ${nam.chi} (${
      nam.thapThan
    }). Can Tàng (100%)= ${nam.canTangPercent
      .map((item) => `${item.name} ${item.score}% (${item.name})`)
      .join(" + ")}. Ngũ Hành Nạp Âm: ${nam.nguHanhNapAm}.
Trụ Chính Tháng ${thang.name}: Can ${thang.can} (${thang.thapThan}). Chi ${
      thang.chi
    } (${thang.thapThan}). Can Tàng (100%)= ${thang.canTangPercent
      .map((item) => `${item.name} ${item.score}% (${item.name})`)
      .join(" + ")}. Ngũ Hành Nạp Âm: ${thang.nguHanhNapAm}.
Trụ Chính Ngày ${nhatChu.name}: Can ${nhatChu.can} (${nhatChu.thapThan}). Chi ${
      nhatChu.chi
    } (${nhatChu.thapThan}). Can Tàng (100%): ${nhatChu.canTangPercent
      .map((item) => `${item.name} ${item.score}% (${item.name})`)
      .join(" + ")}. Ngũ Hành Nạp Âm: ${nhatChu.nguHanhNapAm}.
Trụ Chính Giờ ${gio.name}: Can ${gio.can} (${gio.thapThan}). Chi ${gio.chi} (${
      gio.thapThan
    }). Can Tàng (100%) = ${gio.canTangPercent
      .map((item) => `${item.name} ${item.score}% (${item.name})`)
      .join(" + ")}. Ngũ Hành Nạp Âm: ${gio.nguHanhNapAm}.

Tỷ trọng Ngũ Hành: Hệ thống tính điểm
Cơ bản (gốc) Base Stat
${nguHanhScore
  .map(
    (item) =>
      `- ${item.name}(${getCuongNhươc(item.percent)}) = ${item.percent}%. -${
        item.name
      } (${item.thapThan[0]}) = ${item.percentAm}%, +${item.name} (${
        item.thapThan[1]
      }) = ${item.percentDuong}%`
  )
  .join("\n")}
Đây là tỷ trọng Ngũ Hành được tính toán tương đối tại thời điểm sinh ra đời, tỷ trọng Ngũ Hành khi xem vận hạn sẽ tùy thuộc vào số Trụ Biến được nạp vào dữ liệu tính toán. Ví dụ luận giải vận hạn năm Ất Tỵ 2025 thì đương nhiên tỷ trọng Ngũ Hành -Mộc và -Hỏa sẽ được gia tăng đáng kể (chưa tính Trụ Biến Đại Vận)
4. Ngũ Hành Nạp Âm
Trụ Chính Năm: ${nam.nguHanhNapAm}
Trụ Chính Tháng: ${thang.nguHanhNapAm}
Trụ Chính Ngày: ${nhatChu.nguHanhNapAm}
Trụ Chính Giờ: ${gio.nguHanhNapAm}
${getNapAm(nam.nguHanhNapAm)}
${getNapAm(thang.nguHanhNapAm)}
${getNapAm(nhatChu.nguHanhNapAm)}
${getNapAm(gio.nguHanhNapAm)}
`;
    return tuTru;
  };

  function getBatTuTemplate(bazi) {
    // let nam = bazi.year;
    // let thang = bazi.month;
    // let ngay = bazi.day;
    // let gio = bazi.hour;
    // let nguHanhScore = bazi.nguHanhScore;
    let baseInfo = bazi.baseInfo;
    let batTuTemplate = `Hồ sơ AGI của ${baseInfo.hoTen} sinh năm ${
      baseInfo.namSinh
    }
    Phần 1: Tứ Trụ
    ${getTuTruData(bazi)}
     `;
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
    $("#tenGioTru").text(gio.name);
    $("#tenDaiVanTru").text(bazi.daiVan ? bazi.daiVan.name : "");
    $("#tenTieuVanTru").text(bazi.tieuVan ? bazi.tieuVan.name : "");
    $("#tenNguyetVanTru").text(bazi.nguyetVan ? bazi.nguyetVan.name : "");
    $("#tenNhatVanTru").text(bazi.nhatVan ? bazi.nhatVan.name : "");
    $("#tenThoiVanTru").text(bazi.thoiVan ? bazi.thoiVan.name : "");
    $("#canTangNam").text(nam.canTang);
    $("#canTangThang").text(thang.canTang);
    $("#canTangNgay").text(ngay.canTang);
    $("#canTangGio").text(gio.canTang);
    $("#canTangDaiVan").text(bazi.daiVan ? bazi.daiVan.canTang : "");
    $("#canTangTieuVan").text(bazi.tieuVan ? bazi.tieuVan.canTang : "");
    $("#canTangNguyetVan").text(bazi.nguyetVan ? bazi.nguyetVan.canTang : "");
    $("#canTangNhatVan").text(bazi.nhatVan ? bazi.nhatVan.canTang : "");
    $("#canTangThoiVan").text(bazi.thoiVan ? bazi.thoiVan.canTang : "");
    $("#thapThanNam").text(nam.thapThan);
    $("#thapThanThang").text(thang.thapThan);
    $("#thapThanNgay").text(ngay.thapThan);
    $("#thapThanGio").text(gio.thapThan);
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
