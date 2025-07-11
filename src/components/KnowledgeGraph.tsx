
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Satellite, FileText, MapPin, Database, Users } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  type: 'mission' | 'data' | 'location' | 'document' | 'user_query';
  x: number;
  y: number;
  connections: string[];
  metadata?: Record<string, any>;
}

interface Edge {
  from: string;
  to: string;
  relationship: string;
}

const KnowledgeGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const initializeGraph = () => {
    const initialNodes: Node[] = [
      {
        id: 'insat',
        label: 'INSAT Series',
        type: 'mission',
        x: 150,
        y: 100,
        connections: ['weather_data', 'communication'],
        metadata: { launch_year: '1988', status: 'active', sensors: ['VHRR', 'CCD'] }
      },
      {
        id: 'resourcesat',
        label: 'RESOURCESAT',
        type: 'mission',
        x: 300,
        y: 100,
        connections: ['land_data', 'agriculture'],
        metadata: { launch_year: '2003', status: 'active', sensors: ['LISS-III', 'AWiFS'] }
      },
      {
        id: 'cartosat',
        label: 'CARTOSAT',
        type: 'mission',
        x: 450,
        y: 100,
        connections: ['mapping_data', 'urban_planning'],
        metadata: { launch_year: '2005', status: 'active', sensors: ['PAN', 'MX'] }
      },
      {
        id: 'weather_data',
        label: 'Weather Data',
        type: 'data',
        x: 100,
        y: 250,
        connections: ['india_region', 'cyclone_docs'],
        metadata: { formats: ['NetCDF', 'HDF'], resolution: '1km', update_frequency: 'hourly' }
      },
      {
        id: 'land_data',
        label: 'Land Use Data',
        type: 'data',
        x: 300,
        y: 250,
        connections: ['india_region', 'agriculture_docs'],
        metadata: { formats: ['GeoTIFF', 'HDF'], resolution: '23.5m', update_frequency: 'daily' }
      },
      {
        id: 'mapping_data',
        label: 'Mapping Data',
        type: 'data',
        x: 500,
        y: 250,
        connections: ['urban_areas', 'cartography_docs'],
        metadata: { formats: ['GeoTIFF'], resolution: '2.5m', update_frequency: 'on-demand' }
      },
      {
        id: 'india_region',
        label: 'India & Surroundings',
        type: 'location',
        x: 200,
        y: 400,
        connections: ['user_queries'],
        metadata: { bounds: [68.7, 97.25, 8.4, 37.6], projection: 'Geographic' }
      },
      {
        id: 'urban_areas',
        label: 'Urban Centers',
        type: 'location',
        x: 400,
        y: 400,
        connections: ['user_queries'],
        metadata: { cities: ['Delhi', 'Mumbai', 'Bangalore'], coverage: 'high_resolution' }
      },
      {
        id: 'cyclone_docs',
        label: 'Cyclone Monitoring Guide',
        type: 'document',
        x: 50,
        y: 350,
        connections: [],
        metadata: { type: 'PDF', pages: 45, last_updated: '2024-01-15' }
      },
      {
        id: 'agriculture_docs',
        label: 'Agriculture Handbook',
        type: 'document',
        x: 250,
        y: 350,
        connections: [],
        metadata: { type: 'PDF', pages: 78, last_updated: '2024-02-20' }
      },
      {
        id: 'user_queries',
        label: 'User Queries',
        type: 'user_query',
        x: 300,
        y: 500,
        connections: [],
        metadata: { common_topics: ['data_download', 'api_access', 'coordinates'] }
      }
    ];

    const initialEdges: Edge[] = [
      { from: 'insat', to: 'weather_data', relationship: 'generates' },
      { from: 'resourcesat', to: 'land_data', relationship: 'generates' },
      { from: 'cartosat', to: 'mapping_data', relationship: 'generates' },
      { from: 'weather_data', to: 'india_region', relationship: 'covers' },
      { from: 'land_data', to: 'india_region', relationship: 'covers' },
      { from: 'mapping_data', to: 'urban_areas', relationship: 'focuses_on' },
      { from: 'weather_data', to: 'cyclone_docs', relationship: 'documented_in' },
      { from: 'land_data', to: 'agriculture_docs', relationship: 'documented_in' },
      { from: 'india_region', to: 'user_queries', relationship: 'queried_for' },
      { from: 'urban_areas', to: 'user_queries', relationship: 'queried_for' }
    ];

    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  useEffect(() => {
    initializeGraph();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Draw relationship label
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(edge.relationship, midX, midY - 5);
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      // Node background
      const colors = {
        mission: '#3b82f6',
        data: '#10b981',
        location: '#f59e0b',
        document: '#8b5cf6',
        user_query: '#ef4444'
      };

      ctx.fillStyle = colors[node.type];
      ctx.beginPath();
      ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI);
      ctx.fill();

      // Node border
      if (selectedNode?.id === node.id) {
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Node label
      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + 3);
    });
  }, [nodes, edges, selectedNode]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find clicked node
    const clickedNode = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= 30;
    });

    setSelectedNode(clickedNode || null);
  };

  const getNodeIcon = (type: Node['type']) => {
    switch (type) {
      case 'mission': return <Satellite className="w-4 h-4" />;
      case 'data': return <Database className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'user_query': return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Knowledge Graph Visualization */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Knowledge Graph Visualization
            </CardTitle>
            <Button
              onClick={initializeGraph}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              onClick={handleCanvasClick}
              className="border rounded-lg cursor-pointer w-full h-[400px] bg-gradient-to-br from-gray-50 to-gray-100"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <Satellite className="w-3 h-3 mr-1" />
                Missions
              </Badge>
              <Badge className="bg-green-100 text-green-800">
                <Database className="w-3 h-3 mr-1" />
                Data Products
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800">
                <MapPin className="w-3 h-3 mr-1" />
                Locations
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                <FileText className="w-3 h-3 mr-1" />
                Documents
              </Badge>
              <Badge className="bg-red-100 text-red-800">
                <Users className="w-3 h-3 mr-1" />
                User Queries
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Node Details Panel */}
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedNode ? getNodeIcon(selectedNode.type) : <Database className="w-5 h-5" />}
              {selectedNode ? 'Node Details' : 'Select a Node'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedNode.label}</h3>
                  <Badge className="mt-1 capitalize">{selectedNode.type}</Badge>
                </div>

                {selectedNode.metadata && (
                  <div>
                    <h4 className="font-medium mb-2">Metadata:</h4>
                    <div className="space-y-2 text-sm">
                      {Object.entries(selectedNode.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                          <span className="font-medium">
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Connections:</h4>
                  <div className="space-y-1">
                    {selectedNode.connections.map(connection => {
                      const connectedNode = nodes.find(n => n.id === connection);
                      return connectedNode ? (
                        <div key={connection} className="flex items-center gap-2 text-sm">
                          {getNodeIcon(connectedNode.type)}
                          <span>{connectedNode.label}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Relationships:</h4>
                  <div className="space-y-1 text-sm">
                    {edges
                      .filter(edge => edge.from === selectedNode.id || edge.to === selectedNode.id)
                      .map((edge, index) => (
                        <div key={index} className="text-gray-600">
                          {edge.from === selectedNode.id 
                            ? `→ ${edge.relationship} → ${nodes.find(n => n.id === edge.to)?.label}`
                            : `← ${edge.relationship} ← ${nodes.find(n => n.id === edge.from)?.label}`
                          }
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Click on a node in the graph to view its details and relationships.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
