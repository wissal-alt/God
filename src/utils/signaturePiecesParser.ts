export interface SignaturePiece {
  imageUrl: string;
  id: number;
}

export async function parseSignaturePiecesCSV(): Promise<SignaturePiece[]> {
  try {
    const response = await fetch('/src/data/signature-pieces.csv');
    const text = await response.text();

    const lines = text.split('\n').filter(line => line.trim());
    const pieces: SignaturePiece[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      pieces.push({
        imageUrl: line,
        id: i,
      });
    }

    return pieces;
  } catch (error) {
    console.error('Error parsing signature pieces CSV:', error);
    return [];
  }
}
