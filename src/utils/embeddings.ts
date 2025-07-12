
import * as natural from 'natural';

export async function getEmbedding(text: string, embedder: any): Promise<number[]> {
  if (embedder) {
    try {
      const result = await embedder(text);
      return Array.from(result.data);
    } catch (error) {
      console.warn('Failed to create embedding, falling back to simple embedding');
    }
  }
  return createSimpleEmbedding(text);
}

export function createSimpleEmbedding(text: string): number[] {
  const words = natural.WordTokenizer.prototype.tokenize(text.toLowerCase()) || [];
  const vocabulary = ['satellite', 'data', 'india', 'mission', 'weather', 'ocean', 'land', 'image', 'resolution', 'coverage'];
  
  return vocabulary.map(word => 
    words.filter(w => w.includes(word) || word.includes(w)).length / words.length
  );
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}
