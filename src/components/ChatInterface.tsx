import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MapPin, FileText, Database, Brain, Sparkles, Zap, Cpu, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { aiEngine } from '@/lib/aiEngine';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  entities?: string[];
  confidence?: number;
  queryType?: 'general' | 'geospatial' | 'document' | 'metadata' | 'technical' | 'download';
  sources?: string[];
  reasoning?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🚀 **Welcome to Advanced MOSDAC AI Assistant!**\n\nI\'m powered by cutting-edge AI technology including:\n\n• **🧠 Transformer-based NLP** - Advanced language understanding\n• **🔍 RAG Pipeline** - Retrieval-Augmented Generation for precise answers\n• **📊 Knowledge Graph** - Semantic relationships across 15,000+ entities\n• **🌍 Geospatial Intelligence** - Location-aware data discovery\n• **⚡ Real-time Processing** - Instant semantic search and analysis\n\n**I can help with:**\n• **Mission Data Discovery** - Find specific satellite datasets and products\n• **Technical Integration** - API documentation and code examples\n• **Geospatial Queries** - Location-based data analysis\n• **Download Assistance** - Optimized data access workflows\n• **Format Conversion** - Multi-format data processing guidance\n\n**Try advanced queries like:**\n*"Show me high-resolution CARTOSAT imagery for Mumbai urban planning"*\n*"How do I integrate INSAT weather data into my Python application?"*\n*"What are the best RESOURCESAT products for agricultural monitoring in Punjab?"*\n\n**🔬 AI Features:** Semantic understanding • Entity linking • Context awareness • Multi-turn conversations',
      sender: 'bot',
      timestamp: new Date(),
      confidence: 1.0,
      queryType: 'general'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiInitialized, setAiInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize AI engine
    const initializeAI = async () => {
      try {
        await aiEngine.initialize();
        setAiInitialized(true);
        console.log('AI Engine ready');
      } catch (error) {
        console.error('AI initialization failed:', error);
        toast({
          title: "AI System Notice",
          description: "Advanced AI features initializing in background...",
        });
      }
    };

    initializeAI();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Show advanced processing toast
    toast({
      title: "🧠 AI Processing Query",
      description: "Advanced NLP analysis and knowledge graph search in progress...",
    });

    try {
      // Use advanced AI engine
      const result = await aiEngine.processQuery(currentInput);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response,
        sender: 'bot',
        timestamp: new Date(),
        entities: result.entities,
        confidence: result.confidence,
        queryType: result.queryType as Message['queryType'],
        sources: result.sources,
        reasoning: result.reasoning
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Success toast with AI metrics
      toast({
        title: "🎯 AI Response Generated",
        description: `Confidence: ${Math.round(result.confidence * 100)}% | Entities: ${result.entities.length} | Sources: ${result.sources.length}`,
      });

    } catch (error) {
      console.error('AI processing error:', error);
      
      // Fallback error response
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "🔧 **AI System Temporary Issue**\n\nI encountered a processing challenge with your query. This might be due to:\n\n• Model initialization in progress\n• Complex query requiring additional processing time\n• Network connectivity affecting AI pipeline\n\nPlease try:\n• Rephrasing your question with specific keywords\n• Breaking complex queries into smaller parts\n• Checking your internet connection\n\nMy advanced AI capabilities will be fully available shortly. Thank you for your patience!",
        sender: 'bot',
        timestamp: new Date(),
        confidence: 0.1,
        queryType: 'general'
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "⚠️ AI Processing Issue",
        description: "Please try rephrasing your question or check connectivity",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const getQueryTypeIcon = (type?: Message['queryType']) => {
    switch (type) {
      case 'geospatial': return <MapPin className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'metadata': return <Database className="w-4 h-4" />;
      case 'technical': return <Zap className="w-4 h-4" />;
      case 'download': return <Sparkles className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getQueryTypeColor = (type?: Message['queryType']) => {
    switch (type) {
      case 'geospatial': return 'bg-green-100 text-green-800';
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'metadata': return 'bg-purple-100 text-purple-800';
      case 'technical': return 'bg-orange-100 text-orange-800';
      case 'download': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-500';
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.8) return 'text-blue-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">MOSDAC AI Assistant v2.0</h2>
            <p className="text-blue-100 text-sm">Advanced RAG • Knowledge Graph • NLP Pipeline</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Badge className={`${aiInitialized ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
              <Cpu className="w-3 h-3 mr-1" />
              {aiInitialized ? 'AI Ready' : 'Initializing'}
            </Badge>
            <Badge className="bg-purple-500 text-white">
              <Network className="w-3 h-3 mr-1" />
              Knowledge Graph
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[85%] ${
              message.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white shadow-md border-l-4 border-l-blue-500'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {message.sender === 'bot' && (
                    <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  {message.sender === 'user' && (
                    <div className="bg-blue-600 p-2 rounded-full flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {message.text}
                    </div>
                    
                    {message.sender === 'bot' && (
                      <div className="mt-3 space-y-2">
                        {/* Enhanced metadata display */}
                        <div className="flex flex-wrap gap-2">
                          {message.entities && message.entities.map((entity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {entity}
                            </Badge>
                          ))}
                          
                          {message.queryType && (
                            <Badge className={`text-xs ${getQueryTypeColor(message.queryType)}`}>
                              {getQueryTypeIcon(message.queryType)}
                              <span className="ml-1 capitalize">{message.queryType}</span>
                            </Badge>
                          )}
                        </div>
                        
                        {/* AI Reasoning */}
                        {message.reasoning && (
                          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                            <span className="font-semibold">🔍 AI Reasoning: </span>
                            {message.reasoning}
                          </div>
                        )}
                        
                        {/* Sources */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="text-xs text-gray-600">
                            <span className="font-semibold">📚 Knowledge Sources: </span>
                            {message.sources.join(' • ')}
                          </div>
                        )}
                        
                        {/* Enhanced confidence display */}
                        {message.confidence && (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-xs ${getConfidenceColor(message.confidence)}`}>
                              🎯 Confidence: {(message.confidence * 100).toFixed(1)}%
                            </Badge>
                            {message.confidence > 0.9 && (
                              <Badge className="text-xs bg-green-100 text-green-800">
                                <Sparkles className="w-3 h-3 mr-1" />
                                High Quality
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className="bg-white shadow-md border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">Advanced AI processing...</span>
                    <Badge variant="outline" className="text-xs">
                      <Brain className="w-3 h-3 mr-1" />
                      RAG Pipeline
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input */}
      <div className="bg-white border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about satellite missions, technical APIs, geospatial data, download procedures..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          <span>
            Try: "CARTOSAT urban mapping Mumbai", "INSAT API integration Python", "RESOURCESAT agriculture data formats"
          </span>
          {aiInitialized && (
            <Badge variant="outline" className="ml-auto text-xs">
              <Brain className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
