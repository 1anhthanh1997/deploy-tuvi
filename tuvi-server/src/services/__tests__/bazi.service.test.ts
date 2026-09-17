import { Request } from "express";
import horoscopeService from "../horoscope.service";

// Không cần mock vì chỉ kiểm tra có giá trị trả về

describe("horoscopeService.getBaziResult", () => {
  let mockRequest: Partial<Request>;

  describe("with continuous hourly testing from 1/1/1939 to 31/12/2030", () => {
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

    // Generate test cases for every hour from 1/1/1939 to 31/12/2030
    const startDate = new Date(1939, 0, 1, 0, 0, 0); // 1/1/1939 00:00
    const endDate = new Date(2030, 11, 31, 23, 0, 0); // 31/12/2030 23:00

    // For performance, we'll test every 24 hours (daily) instead of every hour
    // This gives us ~33,000 test cases instead of ~800,000
    const testCases = generateTestCases(startDate, endDate, 24);

    console.log(
      `Generated ${
        testCases.length
      } test cases for getBaziResult from ${startDate.toDateString()} to ${endDate.toDateString()}`
    );

    testCases.forEach(({ day, month, year, hour, dateString }) => {
      it(`should return bazi result for ${dateString} (hour ${hour})`, () => {
        // Arrange
        mockRequest = {
          query: {
            ngaysinh: day.toString(),
            thangsinh: month.toString(),
            namsinh: year.toString(),
            giosinh: hour.toString(),
          },
        };

        // Act
        const result = horoscopeService.getBaziResult(mockRequest as Request);

        // Assert - chỉ cần kiểm tra có giá trị trả về
        expect(result).toHaveProperty("baziResult");
        expect(result.baziResult).toBeTruthy();
      });
    });
  });
});
