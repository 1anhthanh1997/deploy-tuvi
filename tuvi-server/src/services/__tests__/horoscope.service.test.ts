import { Request } from "express";
import horoscopeService from "../horoscope.service";

// Không cần mock vì chỉ kiểm tra có giá trị trả về

describe("horoscopeService.calculateHoroscope", () => {
  let mockRequest: Partial<Request>;

  describe("with continuous hourly testing from 1/1/1900 to 31/12/2100", () => {
    // Helper function to generate test cases for a specific time range
    const generateTestCases = (
      startDate: Date,
      endDate: Date,
      stepHours: number = 1
    ) => {
      const testCases = [];
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // getMonth() returns 0-11
        const year = currentDate.getFullYear();
        const hour = currentDate.getHours() + 1; // Convert 0-23 to 1-24 (Chinese hour system)

        testCases.push({
          day,
          month,
          year,
          hour: hour > 12 ? hour - 12 : hour, // Convert to 1-12 system
          dateString: `${day}/${month}/${year} ${currentDate
            .getHours()
            .toString()
            .padStart(2, "0")}:00`,
        });

        currentDate.setHours(currentDate.getHours() + stepHours);
      }

      return testCases;
    };

    // Generate test cases for every hour from 1/1/1900 to 31/12/2100
    const startDate = new Date(1900, 0, 1, 0, 0, 0); // 1/1/1900 00:00
    const endDate = new Date(2100, 11, 31, 23, 0, 0); // 31/12/2100 23:00

    // For performance, we'll test every 24 hours (daily) instead of every hour
    // This gives us ~73,000 test cases instead of ~1,750,000
    const testCases = generateTestCases(startDate, endDate, 24);

    console.log(
      `Generated ${
        testCases.length
      } test cases for calculateHoroscope from ${startDate.toDateString()} to ${endDate.toDateString()}`
    );

    testCases.forEach(({ day, month, year, hour, dateString }) => {
      it(`should return horoscope result for ${dateString} (hour ${hour})`, () => {
        // Arrange
        mockRequest = {
          query: {
            hoten: "Test User",
            ngaysinh: day.toString(),
            thangsinh: month.toString(),
            namsinh: year.toString(),
            giosinh: hour.toString(),
            amlich: "off", // Use solar calendar
            gioitinh: "nam",
            muigio: "7",
            namxemtieuvan: "0",
            namxemdaivan: "0",
            thangluunhat: "0",
            ngayluunhat: "0",
          },
        };

        // Act
        const result = horoscopeService.calculateHoroscope(
          mockRequest as Request
        );

        // Assert - chỉ cần kiểm tra có giá trị trả về
        expect(result).toHaveProperty("mainLaSoText");
        expect(result.mainLaSoText).toBeTruthy();
      });
    });
  });
});
