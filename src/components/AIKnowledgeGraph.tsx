
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Brain, Zap, Network, Database, Cpu } from 'lucide-react';

interface AINode {
  id: string;
  label: string;
  type: 'mission' | 'location' | 'data_product' | 'api_endpoint' | 'ai_model' | 'knowledge_entity';
  x: number;
  y: number;
  connections: string[];
  aiScore: number;
  processingTime: number;
  metadata?: Record<string, any>;
}

interface AIEdge {
  from: string;
  to: string;
  relationship: string;
  confidence: number;
  reasoning: string;
}

const AIKnowledgeGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<AINode | null>(null);
  const [nodes, setNodes] = useState<AINode[]>([]);
  const [edges, setEdges] = useState<AIEdge[]>([]);
  const [aiMetrics, setAiMetrics] = useState({
    totalEntities: 0,
    avgConfidence: 0,
    processingSpeed: 0,
    knowledgeDepth: 0
  });

  const initializeAIGraph = () => {
    const aiNodes: AINode[] = [
      {
        id: 'nlp_engine',
        label: 'NLP Engine',
        type: 'ai_model',
        x: 300,
        y: 50,
        connections: ['entity_extractor', 'intent_classifier'],
        aiScore: 0.94,
        processingTime: 120,
        metadata: { model: 'Transformer-based', accuracy: '94%', languages: ['English', 'Hindi'] }
      },
      {
        id: 'knowledge_graph',
        label: 'Knowledge Graph',
        type: 'knowledge_entity',
        x: 150,
        y: 150,
        connections: ['missions_db', 'locations_db', 'products_db'],
        aiScore: 0.96,
        processingTime: 80,
        metadata: { entities: 15420, relationships: 45000, update_frequency: 'Real-time' }
      },
      {
        id: 'rag_pipeline',
        label: 'RAG Pipeline',
        type: 'ai_model',
        x: 450,
        y: 150,
        connections: ['vector_store', 'response_generator'],
        aiScore: 0.91,
        processingTime: 200,
        metadata: { retrieval_k: 5, embedding_dim: 384, context_window: 4096 }
      },
      {
        id: 'insat_mission',
        label: 'INSAT Missions',
        type: 'mission',
        x: 50,
        y: 300,
        connections: ['weather_products', 'api_weather'],
        aiScore: 0.98,
        processingTime: 50,
        metadata: { satellites: 12, data_volume: '2TB/day', coverage: 'Indian Ocean Region' }
      },
      {
        id: 'cartosat_mission',
        label: 'CARTOSAT Missions',
        type: 'mission',
        x: 200,
        y: 300,
        connections: ['mapping_products', 'api_imagery'],
        aiScore: 0.97,
        processingTime: 60,
        metadata: { resolution: '0.25m', satellites: 6, applications: 'Urban Planning' }
      },
      {
        id: 'resourcesat_mission',
        label: 'RESOURCESAT Missions',
        type: 'mission',
        x: 350,
        y: 300,
        connections: ['land_products', 'api_agriculture'],
        aiScore: 0.95,
        processingTime: 70,
        metadata: { spectral_bands: 23, swath: '740km', repeat_cycle: '24 days' }
      },
      {
        id: 'mumbai_region',
        label: 'Mumbai Region',
        type: 'location',
        x: 500,
        y: 300,
        connections: ['urban_analysis', 'coastal_monitoring'],
        aiScore: 0.93,
        processingTime: 40,
        metadata: { coordinates: '[19.0760°N, 72.8777°E]', area: '603.4 km²', population: '12.4M' }
      },
      {
        id: 'api_gateway',
        label: 'API Gateway',
        type: 'api_endpoint',
        x: 300,
        y: 450,
        connections: ['auth_service', 'rate_limiter', 'data_service'],
        aiScore: 0.92,
        processingTime: 30,
        metadata: { endpoints: 25, requests_per_day: '1M+', uptime: '99.9%' }
      }
    ];

    const aiEdges: AIEdge[] = [
      { from: 'nlp_engine', to: 'knowledge_graph', relationship: 'queries', confidence: 0.94, reasoning: 'NLP engine semantically queries knowledge graph for entity resolution' },
      { from: 'knowledge_graph', to: 'rag_pipeline', relationship: 'provides_context', confidence: 0.91, reasoning: 'Knowledge graph provides structured context for RAG retrieval' },
      { from: 'rag_pipeline', to: 'insat_mission', relationship: 'retrieves_data', confidence: 0.89, reasoning: 'RAG pipeline retrieves relevant INSAT mission data based on query' },
      { from: 'insat_mission', to: 'mumbai_region', relationship: 'covers', confidence: 0.96, reasoning: 'INSAT satellites provide comprehensive coverage of Mumbai region' },
      { from: 'cartosat_mission', to: 'mumbai_region', relationship: 'high_res_imagery', confidence: 0.98, reasoning: 'CARTOSAT provides high-resolution imagery for Mumbai urban analysis' },
      { from: 'api_gateway', to: 'cartosat_mission', relationship: 'data_access', confidence: 0.93, reasoning: 'API gateway enables programmatic access to CARTOSAT data products' }
    ];

    setNodes(aiNodes);
    setEdges(aiEdges);

    // Calculate AI metrics
    const totalEntities = aiNodes.length;
    const avgConfidence = aiEdges.reduce((sum, edge) => sum + edge.confidence, 0) / aiEdges.length;
    const processingSpeed = aiNodes.reduce((sum, node) => sum + node.processingTime, 0) / aiNodes.length;
    const knowledgeDepth = aiEdges.length / aiNodes.length;

    setAiMetrics({
      totalEntities,
      avgConfidence,
      processingSpeed,
      knowledgeDepth
    });
  };

  useEffect(() => {
    initializeAIGraph();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw AI-enhanced edges with confidence visualization
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      
      if (fromNode && toNode) {
        // Edge color based on confidence
        const opacity = edge.confidence;
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
        ctx.lineWidth = 2 + (edge.confidence * 2);
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Confidence indicator
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        
        ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;
        ctx.beginPath();
        ctx.arc(midX, midY, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Relationship label
        ctx.fillStyle = '#374151';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${edge.relationship} (${(edge.confidence * 100).toFixed(0)}%)`, midX, midY - 8);
      }
    });

    // Draw AI-enhanced nodes with performance indicators
    nodes.forEach(node => {
      const colors = {
        mission: '#3b82f6',
        location: '#f59e0b',
        data_product: '#10b981',
        api_endpoint: '#8b5cf6',
        ai_model: '#ef4444',
        knowledge_entity: '#06b6d4'
      };

      // Node background with AI score gradient
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 35);
      gradient.addColorStop(0, colors[node.type]);
      gradient.addColorStop(1, `${colors[node.type]}80`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 30 + (node.aiScore * 10), 0, 2 * Math.PI);
      ctx.fill();

      // AI Score ring
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 35, 0, 2 * Math.PI * node.aiScore);
      ctx.stroke();

      // Node border for selection
      if (selectedNode?.id === node.id) {
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 38, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Node label
      ctx.fillStyle = 'white';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y - 5);
      
      // AI Score
      ctx.font = '8px sans-serif';
      ctx.fillText(`${(node.aiScore * 100).toFixed(0)}%`, node.x, node.y + 8);
    });
  }, [nodes, edges, selectedNode]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedNode = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= 35;
    });

    setSelectedNode(clickedNode || null);
  };

  const getNodeIcon = (type: AINode['type']) => {
    switch (type) {
      case 'ai_model': return <Brain className="w-4 h-4" />;
      case 'knowledge_entity': return <Database className="w-4 h-4" />;
      case 'api_endpoint': return <Zap className="w-4 h-4" />;
      default: return <Network className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* AI Knowledge Graph Visualization */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI-Enhanced Knowledge Graph
            </CardTitle>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-800">
                <Cpu className="w-3 h-3 mr-1" />
                AI Active
              </Badge>
              <Button
                onClick={initializeAIGraph}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <canvas
              ref={canvasRef}
              width={600}
              height={500}
              onClick={handleCanvasClick}
              className="border rounded-lg cursor-pointer w-full bg-gradient-to-br from-gray-50 to-blue-50"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            
            {/* AI Metrics Dashboard */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-600">{aiMetrics.totalEntities}</div>
                <div className="text-xs text-gray-600">AI Entities</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-green-600">{(aiMetrics.avgConfidence * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-600">Avg Confidence</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-purple-600">{aiMetrics.processingSpeed.toFixed(0)}ms</div>
                <div className="text-xs text-gray-600">Avg Response</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-orange-600">{aiMetrics.knowledgeDepth.toFixed(1)}x</div>
                <div className="text-xs text-gray-600">Knowledge Depth</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <Brain className="w-3 h-3 mr-1" />
                AI Models
              </Badge>
              <Badge className="bg-cyan-100 text-cyan-800">
                <Database className="w-3 h-3 mr-1" />
                Knowledge Entities
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                <Zap className="w-3 h-3 mr-1" />
                API Endpoints
              </Badge>
              <Badge className="bg-green-100 text-green-800">
                <Network className="w-3 h-3 mr-1" />
                Missions & Data
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Node Analysis Panel */}
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedNode ? getNodeIcon(selectedNode.type) : <Brain className="w-5 h-5" />}
              {selectedNode ? 'AI Entity Analysis' : 'Select AI Entity'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedNode.label}</h3>
                  <Badge className="mt-1 capitalize">{selectedNode.type.replace('_', ' ')}</Badge>
                </div>

                {/* AI Performance Metrics */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    AI Performance
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>AI Score:</span>
                      <span className="font-bold text-green-600">{(selectedNode.aiScore * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Time:</span>
                      <span className="font-medium">{selectedNode.processingTime}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Connections:</span>
                      <span className="font-medium">{selectedNode.connections.length}</span>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                {selectedNode.metadata && (
                  <div>
                    <h4 className="font-medium mb-2">Entity Metadata:</h4>
                    <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-lg">
                      {Object.entries(selectedNode.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                          <span className="font-medium text-right max-w-[60%]">
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Relationships */}
                <div>
                  <h4 className="font-medium mb-2">AI Relationships:</h4>
                  <div className="space-y-2">
                    {edges
                      .filter(edge => edge.from === selectedNode.id || edge.to === selectedNode.id)
                      .map((edge, index) => (
                        <div key={index} className="bg-blue-50 p-2 rounded text-sm">
                          <div className="font-medium">
                            {edge.from === selectedNode.id 
                              ? `→ ${edge.relationship} → ${nodes.find(n => n.id === edge.to)?.label}`
                              : `← ${edge.relationship} ← ${nodes.find(n => n.id === edge.from)?.label}`
                            }
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Confidence: {(edge.confidence * 100).toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {edge.reasoning}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="mb-2">Click on any AI entity to analyze its performance metrics and relationships.</p>
                <p className="text-sm">Explore the intelligent connections in our knowledge graph.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIKnowledgeGraph;
