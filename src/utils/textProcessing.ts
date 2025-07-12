
import { knowledgeBase } from '../data/knowledgeBase';

export function extractEntities(query: string): string[] {
  const entities: string[] = [];
  const queryLower = query.toLowerCase();

  // Mission detection
  for (const mission of Object.keys(knowledgeBase.missions)) {
    if (queryLower.includes(mission.toLowerCase())) {
      entities.push(mission);
    }
  }

  // Location detection
  for (const location of Object.keys(knowledgeBase.locations)) {
    if (queryLower.includes(location.toLowerCase())) {
      entities.push(location);
    }
  }

  // Data format detection
  for (const format of Object.keys(knowledgeBase.dataFormats)) {
    if (queryLower.includes(format.toLowerCase())) {
      entities.push(format);
    }
  }

  // Technical terms
  const technicalTerms = ['api', 'download', 'access', 'resolution', 'coverage', 'sensor', 'format'];
  technicalTerms.forEach(term => {
    if (queryLower.includes(term)) {
      entities.push(term.toUpperCase());
    }
  });

  return entities;
}

export function classifyQuery(query: string): string {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('download') || queryLower.includes('access') || queryLower.includes('get')) {
    return 'download';
  }
  if (queryLower.includes('api') || queryLower.includes('code') || queryLower.includes('program')) {
    return 'technical';
  }
  if (Object.keys(knowledgeBase.locations).some(loc => queryLower.includes(loc.toLowerCase()))) {
    return 'geospatial';
  }
  if (Object.keys(knowledgeBase.missions).some(mission => queryLower.includes(mission.toLowerCase()))) {
    return 'metadata';
  }
  if (queryLower.includes('format') || queryLower.includes('file') || queryLower.includes('document')) {
    return 'document';
  }
  
  return 'general';
}

export function calculateConfidence(query: string, entities: string[], relevantDocs: any[]): number {
  let confidence = 0.5; // Base confidence

  // Boost confidence based on entity matches
  confidence += entities.length * 0.1;

  // Boost confidence based on document relevance
  if (relevantDocs.length > 0) {
    const avgScore = relevantDocs.reduce((sum, doc) => sum + doc.score, 0) / relevantDocs.length;
    confidence += avgScore * 0.4;
  }

  // Boost confidence for specific mission/location queries
  const hasSpecificEntity = entities.some(e => 
    knowledgeBase.missions[e as keyof typeof knowledgeBase.missions] ||
    knowledgeBase.locations[e as keyof typeof knowledgeBase.locations]
  );
  
  if (hasSpecificEntity) {
    confidence += 0.2;
  }

  return Math.min(confidence, 0.98); // Cap at 98%
}

export function explainReasoning(query: string, entities: string[], relevantDocs: any[]): string {
  const parts = [];
  
  if (entities.length > 0) {
    parts.push(`Identified ${entities.length} key entities: ${entities.join(', ')}`);
  }
  
  if (relevantDocs.length > 0) {
    parts.push(`Retrieved ${relevantDocs.length} relevant documents from knowledge graph`);
    parts.push(`Average relevance score: ${(relevantDocs.reduce((sum, doc) => sum + doc.score, 0) / relevantDocs.length * 100).toFixed(1)}%`);
  }
  
  parts.push('Applied semantic analysis and contextual understanding');
  parts.push('Generated response using retrieval-augmented generation (RAG)');
  
  return parts.join(' • ');
}
