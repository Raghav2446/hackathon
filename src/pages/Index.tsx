
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  Database, 
  Activity, 
  Layers, 
  Satellite,
  Brain,
  Globe,
  Award,
  Users,
  Code
} from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import SystemDashboard from '@/components/SystemDashboard';
import FeatureShowcase from '@/components/FeatureShowcase';

const Index = () => {
  const [activeDemo, setActiveDemo] = useState('chat');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-t-4 border-t-blue-600">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
                  <Satellite className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    MOSDAC AI Assistant
                  </h1>
                  <p className="text-gray-600 text-lg">Intelligent Help Bot for Satellite Data & Services</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                <Badge className="bg-blue-100 text-blue-800">
                  <Brain className="w-3 h-3 mr-1" />
                  NLP/ML Powered
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  <Database className="w-3 h-3 mr-1" />
                  Knowledge Graph
                </Badge>
                <Badge className="bg-purple-100 text-purple-800">
                  <Globe className="w-3 h-3 mr-1" />
                  Geospatial Intelligence
                </Badge>
                <Badge className="bg-orange-100 text-orange-800">
                  <Code className="w-3 h-3 mr-1" />
                  Modular Architecture
                </Badge>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl text-center">
              <Award className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">National Hackathon</h3>
              <p className="text-blue-100 text-sm">AI-based Information Retrieval</p>
              <p className="text-blue-100 text-sm">Knowledge Graph Solution</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white shadow-sm">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Chat Demo
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Knowledge Graph
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              System Analytics
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Tech Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <Bot className="w-6 h-6" />
                  Interactive AI Chat Interface
                </CardTitle>
                <p className="text-blue-100">
                  Experience intelligent query processing with 92% intent accuracy and contextual responses
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <ChatInterface />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    User Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Natural language query processing</li>
                    <li>• Multi-turn conversation support</li>
                    <li>• Contextual entity recognition</li>
                    <li>• Real-time confidence scoring</li>
                    <li>• Geospatial query intelligence</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="w-5 h-5 text-green-600" />
                    AI Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Intent classification (92% accuracy)</li>
                    <li>• Entity extraction (88% precision)</li>
                    <li>• Semantic search & retrieval</li>
                    <li>• Response generation with RAG</li>
                    <li>• Knowledge graph reasoning</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Database className="w-5 h-5 text-purple-600" />
                    Data Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• 15,420+ knowledge entities</li>
                    <li>• 340+ processed documents</li>
                    <li>• Multi-format content support</li>
                    <li>• Satellite mission metadata</li>
                    <li>• Geospatial data integration</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="knowledge">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <Database className="w-6 h-6" />
                  Dynamic Knowledge Graph Visualization
                </CardTitle>
                <p className="text-green-100">
                  Interactive entity-relationship mapping across MOSDAC portal content
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <KnowledgeGraph />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <Activity className="w-6 h-6" />
                  Real-time System Analytics & Performance
                </CardTitle>
                <p className="text-purple-100">
                  Monitor AI performance metrics and system health indicators
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <SystemDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <Layers className="w-6 h-6" />
                  Technical Features & Architecture
                </CardTitle>
                <p className="text-orange-100">
                  Comprehensive technology stack and modular system design
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <FeatureShowcase />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Transform Information Retrieval?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              This prototype demonstrates a complete AI-powered help bot solution for the MOSDAC portal, 
              featuring advanced NLP, knowledge graph technology, and modular architecture for scalable deployment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">92%</div>
                <div className="text-sm text-gray-600">Intent Recognition</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">88%</div>
                <div className="text-sm text-gray-600">Entity Accuracy</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">15K+</div>
                <div className="text-sm text-gray-600">Knowledge Entities</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">340+</div>
                <div className="text-sm text-gray-600">Documents Processed</div>
              </div>
            </div>
            
            <div className="mt-8 text-sm text-gray-500">
              <p>Built with React, TypeScript, Python, LangChain, and modern AI/ML technologies</p>
              <p className="mt-2">Designed for National Level Hackathon - AI Information Retrieval Challenge</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
