
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Database, 
  Code, 
  Globe, 
  Zap, 
  Shield,
  Layers,
  Network,
  Cpu,
  Search,
  MessageSquare,
  BarChart3,
  Settings,
  Rocket,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const FeatureShowcase = () => {
  const [selectedFeature, setSelectedFeature] = useState('nlp');

  const coreFeatures = [
    {
      id: 'nlp',
      icon: Brain,
      title: 'Advanced NLP Engine',
      description: 'State-of-the-art natural language processing with 92% intent accuracy',
      technologies: ['Transformer Models', 'BERT Embeddings', 'spaCy NER', 'Custom Intent Classification'],
      capabilities: [
        'Multi-language query understanding',
        'Context-aware entity extraction',
        'Semantic similarity matching',
        'Intent classification with confidence scoring'
      ],
      metrics: { accuracy: 92, speed: '180ms', languages: 2 }
    },
    {
      id: 'rag',
      icon: Search,
      title: 'RAG Pipeline',
      description: 'Retrieval-Augmented Generation for contextually accurate responses',
      technologies: ['FAISS Vector Store', 'Sentence Transformers', 'LangChain', 'Semantic Search'],
      capabilities: [
        'Document embedding and indexing',
        'Semantic similarity search',
        'Context-aware response generation',
        'Source attribution and citations'
      ],
      metrics: { documents: '15K+', retrieval_time: '50ms', precision: 88 }
    },
    {
      id: 'kg',
      icon: Network,
      title: 'Knowledge Graph',
      description: 'Dynamic knowledge representation with entity relationships',
      technologies: ['Neo4j', 'NetworkX', 'Graph Algorithms', 'Entity Linking'],
      capabilities: [
        'Real-time relationship mapping',
        'Multi-hop reasoning',
        'Entity disambiguation',
        'Dynamic graph updates'
      ],
      metrics: { entities: '15.4K', relationships: '45K', depth: 8 }
    },
    {
      id: 'modular',
      icon: Layers,
      title: 'Modular Architecture',
      description: 'Scalable, maintainable system design for enterprise deployment',
      technologies: ['Microservices', 'API Gateway', 'Docker', 'Load Balancing'],
      capabilities: [
        'Horizontal scaling capability',
        'Independent service deployment',
        'Fault tolerance and recovery',
        'Multi-tenant support'
      ],
      metrics: { uptime: '99.9%', scalability: '10x', deployment: '< 5min' }
    }
  ];

  const technicalStack = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React 18', description: 'Modern component-based UI framework', icon: Code },
        { name: 'TypeScript', description: 'Type-safe development environment', icon: Shield },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework', icon: Settings },
        { name: 'Lucide Icons', description: 'Beautiful, customizable SVG icons', icon: Star }
      ]
    },
    {
      category: 'AI/ML Stack',
      technologies: [
        { name: 'Transformers.js', description: 'Browser-based ML inference', icon: Brain },
        { name: 'LangChain', description: 'LLM application framework', icon: Zap },
        { name: 'FAISS', description: 'Efficient similarity search', icon: Search },
        { name: 'Natural', description: 'NLP library for JavaScript', icon: MessageSquare }
      ]
    },
    {
      category: 'Data & Backend',
      technologies: [
        { name: 'Neo4j', description: 'Graph database for knowledge graphs', icon: Database },
        { name: 'FastAPI', description: 'High-performance API framework', icon: Rocket },
        { name: 'Redis', description: 'In-memory caching layer', icon: Layers },
        { name: 'PostgreSQL', description: 'Reliable relational database', icon: Database }
      ]
    }
  ];

  const deploymentFeatures = [
    {
      title: 'Cloud-Native Architecture',
      description: 'Built for modern cloud deployments with containerization support',
      features: ['Docker containers', 'Kubernetes orchestration', 'Auto-scaling', 'Health monitoring']
    },
    {
      title: 'API-First Design',
      description: 'RESTful APIs with comprehensive documentation and SDKs',
      features: ['OpenAPI specification', 'Rate limiting', 'Authentication', 'Versioning']
    },
    {
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with compliance standards',
      features: ['OAuth 2.0', 'Data encryption', 'Audit logging', 'GDPR compliance']
    },
    {
      title: 'Monitoring & Analytics',
      description: 'Real-time performance monitoring and usage analytics',
      features: ['Performance metrics', 'Error tracking', 'Usage analytics', 'Custom dashboards']
    }
  ];

  const selectedFeatureData = coreFeatures.find(f => f.id === selectedFeature);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Advanced Technology Stack</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Built with cutting-edge AI technologies and modern web frameworks for scalable, 
          enterprise-ready information retrieval systems.
        </p>
      </div>

      {/* Core Features Deep Dive */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-6 h-6" />
            Core AI Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feature Selection */}
            <div className="space-y-2">
              {coreFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Button
                    key={feature.id}
                    variant={selectedFeature === feature.id ? "default" : "outline"}
                    className="w-full justify-start h-auto p-4"
                    onClick={() => setSelectedFeature(feature.id)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{feature.title}</div>
                      <div className="text-xs opacity-70">{feature.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Feature Details */}
            {selectedFeatureData && (
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">{selectedFeatureData.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedFeatureData.description}</p>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(selectedFeatureData.metrics).map(([key, value]) => (
                      <div key={key} className="bg-blue-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-blue-600">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedFeatureData.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div>
                    <h4 className="font-semibold mb-2">Key Capabilities:</h4>
                    <div className="space-y-2">
                      {selectedFeatureData.capabilities.map((capability, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Technical Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-6 h-6" />
            Complete Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="ai">AI/ML Stack</TabsTrigger>
              <TabsTrigger value="backend">Data & Backend</TabsTrigger>
            </TabsList>
            
            {technicalStack.map((stack) => (
              <TabsContent key={stack.category.toLowerCase().replace('/', '-').replace(' ', '-')} value={stack.category.toLowerCase().replace('/', '-').replace(' ', '-')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stack.technologies.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <div key={tech.name} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{tech.name}</h4>
                          <p className="text-sm text-gray-600">{tech.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Deployment & Enterprise Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deploymentFeatures.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {feature.features.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Performance Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">92%</div>
              <div className="text-sm text-gray-600">Intent Recognition Accuracy</div>
              <div className="text-xs text-green-600 mt-1">Industry Leading</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">180ms</div>
              <div className="text-sm text-gray-600">Average Response Time</div>
              <div className="text-xs text-blue-600 mt-1">Sub-200ms Target</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">15.4K</div>
              <div className="text-sm text-gray-600">Knowledge Entities</div>
              <div className="text-xs text-purple-600 mt-1">Continuously Growing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">99.9%</div>
              <div className="text-sm text-gray-600">System Uptime</div>
              <div className="text-xs text-orange-600 mt-1">Enterprise Grade</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureShowcase;
