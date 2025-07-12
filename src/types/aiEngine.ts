
export interface AIResponse {
  response: string;
  entities: string[];
  confidence: number;
  queryType: string;
  sources: string[];
  reasoning: string;
}

export interface KnowledgeDocument {
  text: string;
  type: string;
  entity: string;
  metadata: any;
}

export interface Mission {
  description: string;
  products: string[];
  resolution: string;
  coverage: string;
  sensors: string[];
  launch_years: string[];
  applications: string[];
}

export interface Location {
  lat: number;
  lon: number;
  region: string;
  coverage: string;
}

export interface DataFormat {
  description: string;
  use_case: string;
  size: string;
}

export interface KnowledgeBase {
  missions: Record<string, Mission>;
  locations: Record<string, Location>;
  dataFormats: Record<string, DataFormat>;
}
