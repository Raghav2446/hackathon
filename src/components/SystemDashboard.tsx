
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Brain, 
  MessageSquare, 
  Database, 
  MapPin, 
  FileText,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const SystemDashboard = () => {
  const [metrics, setMetrics] = useState({
    intentAccuracy: 92,
    entityAccuracy: 88,
    responseCompleteness: 85,
    responseConsistency: 90,
    totalQueries: 1247,
    activeUsers: 34,
    knowledgeBaseSize: 15420,
    documentsProcessed: 342
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'query', user: 'User_123', query: 'INSAT satellite data for monsoon prediction', confidence: 0.94, timestamp: new Date(Date.now() - 5 * 60000) },
    { id: 2, type: 'entity', entity: 'RESOURCESAT-2', extracted: 'Land use classification data', confidence: 0.89, timestamp: new Date(Date.now() - 12 * 60000) },
    { id: 3, type: 'geospatial', location: 'Western Ghats', query: 'Forest cover analysis', confidence: 0.91, timestamp: new Date(Date.now() - 18 * 60000) },
    { id: 4, type: 'document', document: 'CARTOSAT User Manual v2.1', action: 'Content indexed', timestamp: new Date(Date.now() - 25 * 60000) },
    { id: 5, type: 'query', user: 'User_456', query: 'API documentation for bulk data download', confidence: 0.87, timestamp: new Date(Date.now() - 30 * 60000) }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalQueries: prev.totalQueries + Math.floor(Math.random() * 3),
        activeUsers: Math.max(20, prev.activeUsers + Math.floor(Math.random() * 6) - 3),
        intentAccuracy: Math.min(100, Math.max(85, prev.intentAccuracy + (Math.random() - 0.5) * 2)),
        entityAccuracy: Math.min(100, Math.max(80, prev.entityAccuracy + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'query': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'entity': return <Brain className="w-4 h-4 text-purple-500" />;
      case 'geospatial': return <MapPin className="w-4 h-4 text-green-500" />;
      case 'document': return <FileText className="w-4 h-4 text-orange-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (value: number) => {
    if (value >= 90) return 'text-green-600';
    if (value >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (value: number) => {
    if (value >= 90) return <CheckCircle className="w-4 h-4 text-green-600" />;
    return <AlertCircle className="w-4 h-4 text-yellow-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Intent Recognition</CardTitle>
            {getStatusIcon(metrics.intentAccuracy)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{metrics.intentAccuracy.toFixed(1)}%</div>
            <Progress value={metrics.intentAccuracy} className="mb-2" />
            <p className="text-xs text-muted-foreground">Query understanding accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Entity Recognition</CardTitle>
            {getStatusIcon(metrics.entityAccuracy)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{metrics.entityAccuracy.toFixed(1)}%</div>
            <Progress value={metrics.entityAccuracy} className="mb-2" />
            <p className="text-xs text-muted-foreground">Keyword extraction precision</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Response Quality</CardTitle>
            {getStatusIcon(metrics.responseCompleteness)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{metrics.responseCompleteness}%</div>
            <Progress value={metrics.responseCompleteness} className="mb-2" />
            <p className="text-xs text-muted-foreground">Answer completeness score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Consistency</CardTitle>
            {getStatusIcon(metrics.responseConsistency)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{metrics.responseConsistency}%</div>
            <Progress value={metrics.responseConsistency} className="mb-2" />
            <p className="text-xs text-muted-foreground">Multi-turn conversation logic</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Total Queries</span>
              </div>
              <span className="font-bold">{metrics.totalQueries.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <span className="text-sm">Active Users</span>
              </div>
              <span className="font-bold">{metrics.activeUsers}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-500" />
                <span className="text-sm">Knowledge Base</span>
              </div>
              <span className="font-bold">{metrics.knowledgeBaseSize.toLocaleString()} entities</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Documents Processed</span>
              </div>
              <span className="font-bold">{metrics.documentsProcessed}</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {activity.type}
                      </Badge>
                      {activity.confidence && (
                        <Badge variant="secondary" className="text-xs">
                          {(activity.confidence * 100).toFixed(0)}% confidence
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm font-medium truncate">
                      {activity.query || activity.entity || activity.location || activity.document}
                    </p>
                    
                    {activity.extracted && (
                      <p className="text-xs text-gray-600 mt-1">{activity.extracted}</p>
                    )}
                    
                    {activity.action && (
                      <p className="text-xs text-gray-600 mt-1">{activity.action}</p>
                    )}
                    
                    {activity.user && (
                      <p className="text-xs text-gray-500 mt-1">User: {activity.user}</p>
                    )}
                    
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Query Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Query Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">35%</div>
              <div className="text-sm text-gray-600">Geospatial Queries</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">28%</div>
              <div className="text-sm text-gray-600">Mission Data</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">22%</div>
              <div className="text-sm text-gray-600">Documentation</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">15%</div>
              <div className="text-sm text-gray-600">API/Technical</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemDashboard;
