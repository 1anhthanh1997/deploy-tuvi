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
      dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

function canChiNgay(
  nn,
  tt,
  nnnn,
  duongLich = true,
  timeZone = 7,
  thangNhuan = false
) {
  if (!duongLich) {
    [nn, tt, nnnn] = L2S(nn, tt, nnnn, thangNhuan, timeZone);
  }
  let jd = jdFromDate(nn, tt, nnnn);
  let canNgay = ((jd + 9) % 10) + 1;
  let chiNgay = ((jd + 1) % 12) + 1;
  return [canNgay, chiNgay];
}

console.log(canChiNgay(19, 3, 2025));
