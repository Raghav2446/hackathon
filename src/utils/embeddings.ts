
// Simple embedding utilities without external dependencies for better compatibility
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
  // Simple tokenization without external dependencies
  const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  const vocabulary = ['satellite', 'data', 'india', 'mission', 'weather', 'ocean', 'land', 'image', 'resolution', 'coverage'];
  
  return vocabulary.map(word => {
    const matches = words.filter(w => w.includes(word) || word.includes(w)).length;
    return matches / Math.max(words.length, 1);
  });
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * (vecB[i] || 0), 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}
