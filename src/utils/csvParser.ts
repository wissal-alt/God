export interface Product {
  name: string;
  category: string;
  imageUrl: string;
  description: string;
}

export async function parseProductsCSV(): Promise<Product[]> {
  try {
    const response = await fetch(new URL('../data/PGD WOODEN HOUSE first DB - Sheet1 (3) copy copy.csv', import.meta.url).href);
    const csv = await response.text();

    const lines = csv.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());

    const products: Product[] = [];
    let i = 1;

    while (i < lines.length) {
      let line = lines[i];
      let inQuotes = (line.match(/"/g) || []).length % 2 === 1;

      while (inQuotes && i < lines.length - 1) {
        i++;
        line += '\n' + lines[i];
        inQuotes = (line.match(/"/g) || []).length % 2 === 1;
      }

      const values = parseCSVLine(line);

      if (values.length >= 4) {
        products.push({
          name: values[0]?.trim() || '',
          category: values[1]?.trim() || '',
          imageUrl: values[2]?.trim() || '',
          description: values[3]?.trim() || '',
        });
      }

      i++;
    }

    return products;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}
