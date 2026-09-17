import { getBaziText } from "../getMainInfo";

interface BaseInfo {
  hoTen: string;
  ngaySinh: number;
  thangSinh: number;
  namSinh: number;
  gioSinh?: number;
  gioiTinh: number; // 1 for male, -1 for female
  duongLich: boolean; // true for solar calendar, false for lunar
  timeZone: number;
  namXemTieuVan?: number;
  namXemDaiVan?: number;
  thangLuuNguyet?: number;
  ngayLuuNhat?: number;
}

describe("getBaziText", () => {
  it("should return bazi text for special test cases", () => {
    // Define list of test dates
    const specialCases = [
      new Date(2001, 9, 23, 0, 30, 0), // October 23, 2001, 00:30:00 (month is 0-indexed, so 9 = October)
      // More dates can be added here later
    ];

    const genders = [
      { value: 1, name: "Male" },
      { value: -1, name: "Female" },
    ];

    specialCases.forEach((birthDate, dateIndex) => {
      genders.forEach((gender, genderIndex) => {
        const testDescription = `${gender.name}, ${birthDate.getDate()}/${
          birthDate.getMonth() + 1
        }/${birthDate.getFullYear()}, ${birthDate.getHours()}h${birthDate.getMinutes()}`;
        console.log(
          `\n=== Testing Case ${dateIndex + 1}.${
            genderIndex + 1
          }: ${testDescription} ===`
        );

        const ngaySinh = birthDate.getDate();
        const thangSinh = birthDate.getMonth() + 1; // Convert from 0-indexed to 1-indexed (like service)
        const namSinh = birthDate.getFullYear();
        const gioSinh = birthDate.getHours(); // Use raw hour like service (not converting 0 to 24)

        const baseInfo: BaseInfo = {
          hoTen: `Test User ${gender.name}`,
          ngaySinh,
          thangSinh,
          namSinh,
          gioSinh,
          gioiTinh: gender.value,
          duongLich: true, // Solar calendar
          timeZone: 7,
        };
        const boTruGio = false; // Not missing birth hour

        try {
          // Act
          const result = getBaziText(baseInfo, boTruGio);

          // Assert
          expect(result).toBeTruthy();
          expect(typeof result).toBe("string");
          expect(result.length).toBeGreaterThan(0);
          expect(result).toMatch(/Test User/);

          console.log(`✅ SUCCESS: ${testDescription}`);
          console.log(`   Date Object: ${birthDate.toLocaleString()}`);
          console.log(
            `   Extracted: Day=${ngaySinh}, Month=${thangSinh}, Year=${namSinh}, Hour=${gioSinh}`
          );
          console.log(`   Result length: ${result.length}`);
          // console.log(`   First 150 chars: ${result.substring(0, 150)}...`);
        } catch (error) {
          // Print failed input details
          console.error(`❌ TEST FAILED for: ${testDescription}`);
          console.error("Failed input parameters:");
          console.error("- Date Object:", birthDate);
          console.error("- ngaySinh (day):", ngaySinh);
          console.error("- thangSinh (month):", thangSinh);
          console.error("- namSinh (year):", namSinh);
          console.error("- gioSinh (hour):", gioSinh);
          console.error("- gioiTinh (gender):", gender.value);
          console.error("- boTruGio (missing hour):", boTruGio);
          console.error(
            "- Full baseInfo object:",
            JSON.stringify(baseInfo, null, 2)
          );
          console.error("- Error details:", error);

          // Re-throw the error so the test still fails
          throw error;
        }
      });
    });
  });

  it("should return bazi text for date range testing", () => {
    const startDate = new Date(1950, 0, 1, 0, 0, 0); // January 1, 1990, 00:00:00
    const endDate = new Date(2029, 11, 31, 23, 59, 0); // December 31, 2100, 23:59:00
    const intervalMinutes = 60 + 59;
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const birthDate = new Date(currentDate); // Create birthDate from current iteration

      const ngaySinh = birthDate.getDate();
      const thangSinh = birthDate.getMonth() + 1; // Convert from 0-indexed to 1-indexed
      const namSinh = birthDate.getFullYear();
      const gioSinh = birthDate.getHours();

      const baseInfo: BaseInfo = {
        hoTen: "Test User",
        ngaySinh,
        thangSinh,
        namSinh,
        gioSinh,
        gioiTinh: 1, // Male
        duongLich: true, // Solar calendar
        timeZone: 7,
      };
      const boTruGio = false; // Not missing birth hour

      try {
        // Act
        const result = getBaziText(baseInfo, boTruGio);
        console.log(
          `✅ SUCCESS: Test User born at ${gioSinh}h ${ngaySinh}/${thangSinh}/${namSinh}`
        );

        // Assert
        expect(result).toBeTruthy();
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(0);
        expect(result).toMatch(/Test User/);
      } catch (error) {
        // Print failed input details
        console.error(`❌ TEST FAILED for date: ${birthDate.toLocaleString()}`);
        console.error("Failed input parameters:");
        console.error("- Date Object:", birthDate);
        console.error("- ngaySinh (day):", ngaySinh);
        console.error("- thangSinh (month):", thangSinh);
        console.error("- namSinh (year):", namSinh);
        console.error("- gioSinh (hour):", gioSinh);
        console.error("- boTruGio (missing hour):", boTruGio);
        console.error(
          "- Full baseInfo object:",
          JSON.stringify(baseInfo, null, 2)
        );
        console.error("- Error details:", error);

        // Re-throw the error so the test still fails
        throw error;
      }

      currentDate = new Date(
        currentDate.getTime() + intervalMinutes * 60 * 1000
      );
    }
  });
});
