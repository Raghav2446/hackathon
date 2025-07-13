
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Database, 
  Cpu, 
  Network, 
  Brain, 
  Zap, 
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

interface SystemMetrics {
  aiAccuracy: number;
  responseTime: number;
  queriesProcessed: number;
  knowledgeEntities: number;
  systemHealth: number;
  activeUsers: number;
}

const SystemDashboard = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    aiAccuracy: 92,
    responseTime: 180,
    queriesProcessed: 1247,
    knowledgeEntities: 15420,
    systemHealth: 98,
    activeUsers: 23
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        aiAccuracy: Math.min(99, prev.aiAccuracy + (Math.random() * 2 - 1)),
        responseTime: Math.max(80, prev.responseTime + (Math.random() * 20 - 10)),
        queriesProcessed: prev.queriesProcessed + Math.floor(Math.random() * 3),
        knowledgeEntities: prev.knowledgeEntities + Math.floor(Math.random() * 5),
        systemHealth: Math.min(100, prev.systemHealth + (Math.random() * 4 - 2)),
        activeUsers: Math.max(1, prev.activeUsers + Math.floor(Math.random() * 6 - 3))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const performanceData = [
    { name: 'AI Intent Recognition', value: metrics.aiAccuracy, color: 'bg-green-500', target: 90 },
    { name: 'Response Generation', value: 88, color: 'bg-blue-500', target: 85 },
    { name: 'Knowledge Retrieval', value: 94, color: 'bg-purple-500', target: 90 },
    { name: 'System Uptime', value: metrics.systemHealth, color: 'bg-orange-500', target: 95 }
  ];

  return (
    <div className="space-y-6">
      {/* Real-time Metrics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Analytics Dashboard</h2>
          <p className="text-gray-600">Real-time performance monitoring and AI metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={`${isLive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            <Activity className={`w-3 h-3 mr-1 ${isLive ? 'animate-pulse' : ''}`} />
            {isLive ? 'Live Data' : 'Static View'}
          </Badge>
          <Button
            onClick={() => setIsLive(!isLive)}
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLive ? 'animate-spin' : ''}`} />
            {isLive ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
                <p className="text-2xl font-bold text-green-600">{metrics.aiAccuracy.toFixed(1)}%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+2.1% from last hour</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.responseTime.toFixed(0)}ms</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-blue-600">Within target (&lt; 200ms)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Queries Processed</p>
                <p className="text-2xl font-bold text-purple-600">{metrics.queriesProcessed.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <Activity className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-purple-600">+47 in last 5 minutes</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-orange-600">{metrics.activeUsers}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <Users className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-orange-600">Peak: 67 users today</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              AI Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600">{item.value.toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={item.value} className="flex-1" />
                  {item.value >= item.target ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="text-xs text-gray-500">Target: {item.target}%</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-5 h-5" />
              Knowledge Graph Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{metrics.knowledgeEntities.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Entities</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">45,200</div>
                <div className="text-sm text-gray-600">Relationships</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">340+</div>
                <div className="text-sm text-gray-600">Documents</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-sm text-gray-600">Data Sources</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Knowledge Coverage</span>
                <span>96.8%</span>
              </div>
              <Progress value={96.8} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Freshness</span>
                <span>Real-time</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Last updated: 2 minutes ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Architecture Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            System Architecture Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Frontend Layer</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>React App</span>
                  <Badge className="bg-green-100 text-green-800">✓ Running</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>UI Components</span>
                  <Badge className="bg-green-100 text-green-800">✓ Loaded</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>WebSocket</span>
                  <Badge className="bg-green-100 text-green-800">✓ Connected</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">AI Processing</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>NLP Engine</span>
                  <Badge className="bg-green-100 text-green-800">✓ Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>RAG Pipeline</span>
                  <Badge className="bg-green-100 text-green-800">✓ Ready</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Vector Store</span>
                  <Badge className="bg-yellow-100 text-yellow-800">⚡ Indexing</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Data Layer</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Knowledge Graph</span>
                  <Badge className="bg-green-100 text-green-800">✓ Online</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Document Store</span>
                  <Badge className="bg-green-100 text-green-800">✓ Synced</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Cache Layer</span>
                  <Badge className="bg-green-100 text-green-800">✓ Optimized</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemDashboard;
