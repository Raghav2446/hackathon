
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from '../components/ChatInterface';
import KnowledgeGraph from '../components/KnowledgeGraph';
import SystemDashboard from '../components/SystemDashboard';
import FeatureShowcase from '../components/FeatureShowcase';
import ErrorBoundary from '../components/ErrorBoundary';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            🛰️ MOSDAC AI Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI-powered satellite data discovery platform with RAG pipeline, 
            knowledge graph intelligence, and real-time semantic search capabilities
          </p>
        </div>

        <ErrorBoundary>
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="chat" className="text-sm">🤖 AI Chat</TabsTrigger>
              <TabsTrigger value="knowledge" className="text-sm">🧠 Knowledge Graph</TabsTrigger>
              <TabsTrigger value="dashboard" className="text-sm">📊 System Analytics</TabsTrigger>
              <TabsTrigger value="features" className="text-sm">✨ Features</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <ErrorBoundary>
                <ChatInterface />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-4">
              <ErrorBoundary>
                <KnowledgeGraph />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-4">
              <ErrorBoundary>
                <SystemDashboard />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <ErrorBoundary>
                <FeatureShowcase />
              </ErrorBoundary>
            </TabsContent>
          </Tabs>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Index;
