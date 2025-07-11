
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MapPin, FileText, Database, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  entities?: string[];
  confidence?: number;
  queryType?: 'general' | 'geospatial' | 'document' | 'metadata';
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your MOSDAC AI Assistant. I can help you find satellite data, documentation, and answer questions about our portal. Try asking about satellite missions, data products, or specific geographical areas.',
      sender: 'bot',
      timestamp: new Date(),
      confidence: 0.98
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processQuery = (query: string) => {
    // Simulate AI query processing
    const lowerQuery = query.toLowerCase();
    let queryType: Message['queryType'] = 'general';
    let entities: string[] = [];
    let response = '';
    let confidence = 0.85;

    // Entity recognition simulation
    if (lowerQuery.includes('satellite') || lowerQuery.includes('mission')) {
      entities.push('satellite missions');
      queryType = 'metadata';
    }
    if (lowerQuery.includes('india') || lowerQuery.includes('location') || lowerQuery.includes('coordinates')) {
      entities.push('geospatial');
      queryType = 'geospatial';
    }
    if (lowerQuery.includes('document') || lowerQuery.includes('pdf') || lowerQuery.includes('manual')) {
      entities.push('documentation');
      queryType = 'document';
    }
    if (lowerQuery.includes('data') || lowerQuery.includes('download')) {
      entities.push('data products');
    }

    // Generate contextual responses
    if (queryType === 'geospatial') {
      response = `🌍 **Geospatial Query Detected**\n\nI found relevant information about geographical data. MOSDAC provides satellite imagery and data for various regions. Here are some key points:\n\n• **Coverage**: India and surrounding regions\n• **Resolution**: Multiple resolution options available\n• **Formats**: GeoTIFF, HDF, NetCDF\n• **Coordinate Systems**: Geographic and UTM projections supported\n\nWould you like specific data for a particular region or time period?`;
      confidence = 0.92;
    } else if (queryType === 'metadata') {
      response = `🛰️ **Satellite Mission Information**\n\nMOSDAC hosts data from multiple Indian satellite missions:\n\n• **INSAT Series**: Weather and communication satellites\n• **RESOURCESAT**: Land observation and mapping\n• **CARTOSAT**: High-resolution Earth imaging\n• **OCEANSAT**: Ocean monitoring and studies\n• **SCATSAT**: Wind vector measurements\n\nEach mission provides specific data products with detailed metadata including acquisition time, sensor specifications, and processing levels.`;
      confidence = 0.95;
    } else if (queryType === 'document') {
      response = `📄 **Documentation Resources**\n\nI can help you find various documents:\n\n• **User Manuals**: Step-by-step guides for data access\n• **Product Specifications**: Technical details of datasets\n• **API Documentation**: Programming interfaces\n• **Tutorials**: Getting started guides\n• **FAQs**: Common questions and solutions\n\nAll documents are available in multiple formats (PDF, HTML, DOCX). What specific documentation are you looking for?`;
      confidence = 0.88;
    } else {
      response = `I understand you're looking for information about "${query}". Based on our knowledge graph, I can provide comprehensive details about MOSDAC services, satellite data products, and documentation.\n\nCould you please specify if you need:\n• Data product information\n• Technical documentation\n• Geospatial data for specific regions\n• API access details\n• Mission-specific information`;
      confidence = 0.78;
    }

    return { response, entities, confidence, queryType };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate processing delay
    setTimeout(() => {
      const { response, entities, confidence, queryType } = processQuery(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        entities,
        confidence,
        queryType
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getQueryTypeIcon = (type?: Message['queryType']) => {
    switch (type) {
      case 'geospatial': return <MapPin className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'metadata': return <Database className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getQueryTypeColor = (type?: Message['queryType']) => {
    switch (type) {
      case 'geospatial': return 'bg-green-100 text-green-800';
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'metadata': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">MOSDAC AI Assistant</h2>
            <p className="text-blue-100 text-sm">Intelligent Help Bot for Satellite Data & Services</p>
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
            <Card className={`max-w-[80%] ${
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
                      <div className="mt-3 flex flex-wrap gap-2">
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
                        
                        {message.confidence && (
                          <Badge variant="outline" className="text-xs">
                            Confidence: {(message.confidence * 100).toFixed(0)}%
                          </Badge>
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
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about satellite data, missions, documentation..."
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
        <div className="text-xs text-gray-500 mt-2">
          Try: "Show me satellite data for India", "INSAT mission details", or "How to download data?"
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
