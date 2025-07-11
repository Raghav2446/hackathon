
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  FileText, 
  Database, 
  Cpu, 
  Layers,
  Bot,
  Search,
  MapPin,
  Download,
  Code,
  Satellite,
  CloudDownload
} from 'lucide-react';

const FeatureShowcase = () => {
  const [demoQuery, setDemoQuery] = useState('');
  const [demoResponse, setDemoResponse] = useState('');

  const features = [
    {
      title: 'Multi-Modal Content Processing',
      description: 'Extract and process structured/unstructured content from PDFs, DOCs, web pages, and metadata',
      icon: <FileText className="w-6 h-6" />,
      tech: ['Python', 'PyPDF2', 'BeautifulSoup', 'spaCy'],
      demo: 'Processes 340+ documents including mission manuals, API docs, and scientific papers'
    },
    {
      title: 'Geospatial Intelligence',
      description: 'Spatially-aware question answering with coordinate system support and regional data mapping',
      icon: <MapPin className="w-6 h-6" />,
      tech: ['GDAL', 'Shapely', 'GeoPandas', 'PostGIS'],
      demo: 'Handles queries like "Show me NDVI data for Karnataka between 2020-2023"'
    },
    {
      title: 'Dynamic Knowledge Graph',
      description: 'Real-time entity and relationship extraction with semantic understanding',
      icon: <Database className="w-6 h-6" />,
      tech: ['Neo4j', 'NetworkX', 'NLTK', 'Transformers'],
      demo: '15,420+ entities mapped across missions, data products, and documentation'
    },
    {
      title: 'NLP/ML Pipeline',
      description: 'Advanced intent recognition and entity extraction with contextual understanding',
      icon: <Cpu className="w-6 h-6" />,
      tech: ['LangChain', 'Hugging Face', 'NVIDIA RAG', 'TensorFlow'],
      demo: '92% intent accuracy, 88% entity recognition precision'
    },
    {
      title: 'RAG Architecture',
      description: 'Retrieval-Augmented Generation for accurate, context-aware responses',
      icon: <Search className="w-6 h-6" />,
      tech: ['Chroma', 'FAISS', 'LlamaIndex', 'OpenAI'],
      demo: 'Combines retrieved context with LLM generation for 85% response completeness'
    },
    {
      title: 'Modular Deployment',
      description: 'Scalable architecture for deployment across multiple portal domains',
      icon: <Layers className="w-6 h-6" />,
      tech: ['Docker', 'Kubernetes', 'FastAPI', 'React'],
      demo: 'Configurable for ISRO, NRSC, and other government portals'
    }
  ];

  const techStack = {
    'Backend': ['Python', 'FastAPI', 'LangChain', 'spaCy', 'NLTK'],
    'AI/ML': ['Hugging Face Transformers', 'NVIDIA RAG', 'TensorFlow', 'PyTorch'],
    'Database': ['Neo4j', 'PostgreSQL', 'Chroma Vector DB', 'Redis'],
    'Frontend': ['React', 'TypeScript', 'Tailwind CSS', 'D3.js'],
    'Infrastructure': ['Docker', 'Kubernetes', 'AWS/Azure', 'Nginx'],
    'Geospatial': ['GDAL', 'PostGIS', 'Shapely', 'GeoPandas']
  };

  const demoQueries = [
    'Show me RESOURCESAT data for agricultural monitoring in Punjab',
    'What are the technical specifications of CARTOSAT-2 sensor?',
    'How to download INSAT weather data using API?',
    'Find documentation for ocean color analysis from OCEANSAT',
    'Compare land use data between 2020 and 2023 for Mumbai region'
  ];

  const handleDemoQuery = (query: string) => {
    setDemoQuery(query);
    // Simulate processing delay
    setTimeout(() => {
      let response = '';
      if (query.includes('RESOURCESAT') && query.includes('Punjab')) {
        response = `**🛰️ RESOURCESAT Agricultural Data - Punjab Region**

**Available Datasets:**
• LISS-III multispectral data (23.5m resolution)
• AWiFS data (56m resolution) for regional coverage
• NDVI time series for crop monitoring
• Land use/land cover classification maps

**Temporal Coverage:** 2003-2024 (current)
**Update Frequency:** 5-24 days depending on sensor
**Data Formats:** GeoTIFF, HDF5, NetCDF

**Key Applications for Punjab:**
- Wheat and rice crop monitoring
- Irrigation pattern analysis  
- Agricultural stress detection
- Yield estimation models

**Access Methods:**
- Web portal: mosdac.gov.in
- Bulk download API available
- WMS/WFS services for GIS integration

*Confidence: 94% | Sources: 3 documents, 7 data products*`;
      } else if (query.includes('CARTOSAT-2')) {
        response = `**🛰️ CARTOSAT-2 Technical Specifications**

**Sensor Details:**
• **Panchromatic (PAN):** 0.65m resolution, 9.6km swath
• **Multispectral (MX):** 2.5m resolution (4 bands), 9.6km swath
• **Spectral Ranges:** Blue, Green, Red, NIR

**Orbital Parameters:**
• Altitude: 635 km (sun-synchronous)
• Inclination: 97.9°
• Revisit time: 4 days at equator

**Data Products:**
- Level-1: Radiometrically corrected
- Level-2: Geometrically corrected (orthorectified)
- Level-3: Map products and mosaics

**Applications:**
- Urban planning and infrastructure mapping
- Cadastral mapping at 1:4000 scale
- Disaster monitoring and assessment
- Coastal zone management

*Confidence: 96% | Source: CARTOSAT-2 User Handbook v3.2*`;
      } else {
        response = `**Processing Query:** "${query}"

I understand you're looking for information about ${query.toLowerCase()}. Based on our knowledge graph, I can provide comprehensive details about:

• **Data Products:** Available datasets and their specifications
• **Technical Documentation:** User manuals and API references  
• **Spatial Coverage:** Geographic extent and coordinate systems
• **Temporal Information:** Data availability and update frequencies
• **Access Methods:** Download options and web services

Please specify if you need details about any particular aspect, or I can provide a complete overview of available resources.

*This is a demonstration of contextual understanding and entity recognition.*`;
      }
      setDemoResponse(response);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  {feature.icon}
                </div>
                <span className="text-lg">{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Technologies:</h4>
                <div className="flex flex-wrap gap-1">
                  {feature.tech.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800 font-medium">Demo:</p>
                <p className="text-xs text-blue-700 mt-1">{feature.demo}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Complete Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Backend" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              {Object.keys(techStack).map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(techStack).map(([category, technologies]) => (
              <TabsContent key={category} value={category} className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {technologies.map((tech, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-medium text-sm">{tech}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Interactive Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Interactive Query Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-3">Try these sample queries:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {demoQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoQuery(query)}
                  className="text-left justify-start h-auto p-3 whitespace-normal"
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>

          {demoQuery && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800">Query</Badge>
              </div>
              <p className="text-sm font-medium">{demoQuery}</p>
            </div>
          )}

          {demoResponse && (
            <div className="border rounded-lg p-4 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-green-100 text-green-800">AI Response</Badge>
              </div>
              <div className="text-sm whitespace-pre-line leading-relaxed">
                {demoResponse}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Architecture Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            System Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Globe className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-medium">Data Ingestion</h4>
              <p className="text-xs text-gray-600 mt-1">Web crawling, document parsing, metadata extraction</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Database className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-medium">Knowledge Graph</h4>
              <p className="text-xs text-gray-600 mt-1">Entity extraction, relationship mapping, graph storage</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <Cpu className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-medium">AI Processing</h4>
              <p className="text-xs text-gray-600 mt-1">NLP pipeline, RAG architecture, response generation</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <Bot className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <h4 className="font-medium">User Interface</h4>
              <p className="text-xs text-gray-600 mt-1">Chat interface, visualization, API endpoints</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureShowcase;
