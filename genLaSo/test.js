import fetch from "node-fetch";

async function getDataFromGGDocAndPrint(docUrl) {
  try {
    const response = await fetch(docUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const html = await response.text();

    const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/);
    if (!tableMatch) {
      throw new Error("Could not find table in document");
    }

    const tableHtml = tableMatch[1];
    const rows = tableHtml.match(/<tr[^>]*>([\s\S]*?)<\/tr>/g);
    const points = [];
    let maxX = 0;
    let maxY = 0;

    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].match(/<td[^>]*>([\s\S]*?)<\/td>/g);
      if (cells && cells.length === 3) {
        const x = parseInt(cells[0].replace(/<[^>]+>/g, "").trim(), 10);
        const char = cells[1].replace(/<[^>]+>/g, "").trim();
        const y = parseInt(cells[2].replace(/<[^>]+>/g, "").trim(), 10);

        if (!isNaN(x) && !isNaN(y)) {
          points.push({ x, y, char });
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }
    const grid = Array.from(
      { length: maxY + 1 },
      () => Array.from({ length: maxX + 1 }, () => " ") // Initialize with space character
    );

    points.forEach(({ x, y, char }) => {
      grid[y][x] = char;
    });

    for (let i = grid.length - 1; i >= 0; i--) {
      console.log(grid[i].join(""));
    }
  } catch (err) {
    console.error("Error fetching or processing document:", err);
  }
}

// Example usage:
getDataFromGGDocAndPrint(
  "https://docs.google.com/document/d/e/2PACX-1vSZ1vDD85PCR1d5QC2XwbXClC1Kuh3a4u0y3VbTvTFQI53erafhUkGot24ulET8ZRqFSzYoi3pLTGwM/pub"
);
