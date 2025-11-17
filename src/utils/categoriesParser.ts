export interface Category {
  name: string;
  imageUrl: string;
}

export async function parseCategoriesCSV(): Promise<Category[]> {
  try {
    const response = await fetch('/src/data/the categories and images URLs - Sheet1.csv');
    const text = await response.text();

    const lines = text.split('\n');
    const categories: Category[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const commaIndex = line.indexOf(',');
      if (commaIndex === -1) continue;

      const name = line.substring(0, commaIndex).trim();
      const imageUrl = line.substring(commaIndex + 1).trim();

      if (name && imageUrl) {
        categories.push({ name, imageUrl });
      }
    }

    return categories;
  } catch (error) {
    console.error('Error parsing categories CSV:', error);
    return [];
  }
}
