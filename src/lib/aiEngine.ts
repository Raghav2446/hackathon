
import { pipeline } from '@huggingface/transformers';
import { AIResponse, KnowledgeDocument } from '../types/aiEngine';
import { knowledgeBase } from '../data/knowledgeBase';
import { getEmbedding, cosineSimilarity } from '../utils/embeddings';
import { extractEntities, classifyQuery, calculateConfidence, explainReasoning } from '../utils/textProcessing';
import { 
  generateMissionResponse, 
  generateGeospatialResponse, 
  generateDownloadResponse, 
  generateTechnicalResponse, 
  generateGeneralResponse 
} from '../services/responseGenerator';

// Advanced AI Engine with RAG capabilities
export class AIEngine {
  private classifier: any;
  private embedder: any;
  private vectorStore: Map<string, number[]> = new Map();
  private documentStore: Map<string, KnowledgeDocument> = new Map();
  private initialized = false;

  async initialize() {
    try {
      console.log('Initializing AI Engine...');
      
      // Initialize text classification pipeline
      this.classifier = await pipeline('text-classification', 'microsoft/DialoGPT-medium');
      
      // Initialize embedding pipeline for semantic search
      this.embedder = await pipeline('feature-extraction', 'sentence-transformers/all-MiniLM-L6-v2');
      
      // Build vector store from knowledge base
      await this.buildVectorStore();
      
      this.initialized = true;
      console.log('AI Engine initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AI Engine:', error);
      // Fallback to rule-based system
      this.initialized = false;
    }
  }

  private async buildVectorStore() {
    const documents = this.extractDocuments();
    
    for (const [id, doc] of documents.entries()) {
      try {
        const embedding = await getEmbedding(doc.text, this.embedder);
        this.vectorStore.set(id, embedding);
        this.documentStore.set(id, doc);
      } catch (error) {
        console.warn(`Failed to create embedding for document ${id}`);
      }
    }
  }

  private extractDocuments(): Map<string, KnowledgeDocument> {
    const documents = new Map();
    let docId = 0;

    // Extract mission documents
    for (const [missionName, mission] of Object.entries(knowledgeBase.missions)) {
      documents.set(`mission_${docId++}`, {
        text: `${missionName}: ${mission.description}. Products: ${mission.products.join(', ')}. Applications: ${mission.applications.join(', ')}.`,
        type: 'mission',
        entity: missionName,
        metadata: mission
      });
    }

    // Extract location documents
    for (const [locationName, location] of Object.entries(knowledgeBase.locations)) {
      documents.set(`location_${docId++}`, {
        text: `${locationName} is located at ${location.lat}°N, ${location.lon}°E in ${location.region}. Coverage: ${location.coverage}.`,
        type: 'location',
        entity: locationName,
        metadata: location
      });
    }

    return documents;
  }

  private async findRelevantDocuments(query: string, topK: number = 3): Promise<any[]> {
    const queryEmbedding = await getEmbedding(query, this.embedder);
    const similarities: Array<{ id: string; score: number; doc: KnowledgeDocument }> = [];

    for (const [docId, docEmbedding] of this.vectorStore.entries()) {
      const similarity = cosineSimilarity(queryEmbedding, docEmbedding);
      const doc = this.documentStore.get(docId);
      if (doc) {
        similarities.push({ id: docId, score: similarity, doc });
      }
    }

    return similarities
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  async processQuery(query: string): Promise<AIResponse> {
    if (!this.initialized) {
      await this.initialize();
    }

    console.log('Processing advanced query:', query);

    // Enhanced entity extraction
    const entities = extractEntities(query);
    const queryType = classifyQuery(query);
    
    // Retrieve relevant documents using RAG
    const relevantDocs = await this.findRelevantDocuments(query);
    
    // Generate contextual response
    const response = await this.generateResponse(query, queryType, entities, relevantDocs);
    
    // Calculate confidence based on document relevance and entity matches
    const confidence = calculateConfidence(query, entities, relevantDocs);
    
    const sources = relevantDocs.map(doc => `${doc.doc.type}: ${doc.doc.entity}`);
    const reasoning = explainReasoning(query, entities, relevantDocs);

    return {
      response,
      entities,
      confidence,
      queryType,
      sources,
      reasoning
    };
  }

  private async generateResponse(query: string, queryType: string, entities: string[], relevantDocs: any[]): Promise<string> {
    switch (queryType) {
      case 'metadata':
        return generateMissionResponse(query, entities, relevantDocs);
      case 'geospatial':
        return generateGeospatialResponse(query, entities, relevantDocs);
      case 'download':
        return generateDownloadResponse(query, entities);
      case 'technical':
        return generateTechnicalResponse(query, entities);
      default:
        return generateGeneralResponse(query, entities, relevantDocs);
    }
  }
}

// Singleton instance
export const aiEngine = new AIEngine();
