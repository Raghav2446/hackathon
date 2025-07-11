
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MapPin, FileText, Database, Brain, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  entities?: string[];
  confidence?: number;
  queryType?: 'general' | 'geospatial' | 'document' | 'metadata' | 'technical' | 'download';
  sources?: string[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🚀 **Welcome to MOSDAC AI Assistant!**\n\nI\'m powered by advanced NLP and knowledge graph technology. I can help you with:\n\n• **Satellite Data Discovery** - Find specific datasets and products\n• **Mission Information** - Details about INSAT, RESOURCESAT, CARTOSAT, etc.\n• **Geospatial Queries** - Location-based data and coordinates\n• **Technical Documentation** - User guides, APIs, and specifications\n• **Download Assistance** - Help with data access and formats\n\nTry asking: *"Show me INSAT-3D data for Mumbai region"* or *"How do I download CARTOSAT imagery?"*',
      sender: 'bot',
      timestamp: new Date(),
      confidence: 1.0,
      queryType: 'general'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI query processing with better intelligence
  const processQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    console.log('Processing query:', query);
    
    // Advanced entity recognition
    const entities: string[] = [];
    let queryType: Message['queryType'] = 'general';
    let confidence = 0.85;
    let sources: string[] = [];
    
    // Satellite missions detection
    const missions = ['insat', 'resourcesat', 'cartosat', 'oceansat', 'scatsat', 'risat', 'astrosat'];
    const detectedMissions = missions.filter(mission => lowerQuery.includes(mission));
    if (detectedMissions.length > 0) {
      entities.push(...detectedMissions.map(m => m.toUpperCase()));
      queryType = 'metadata';
      confidence = 0.94;
    }

    // Geographic locations
    const locations = ['india', 'mumbai', 'delhi', 'chennai', 'kolkata', 'bangalore', 'hyderabad', 'pune', 'ahmedabad'];
    const detectedLocations = locations.filter(loc => lowerQuery.includes(loc));
    if (detectedLocations.length > 0) {
      entities.push(...detectedLocations.map(l => l.charAt(0).toUpperCase() + l.slice(1)));
      queryType = 'geospatial';
      confidence = 0.92;
    }

    // Data types and formats
    if (lowerQuery.includes('download') || lowerQuery.includes('access') || lowerQuery.includes('get')) {
      entities.push('Data Access');
      queryType = 'download';
    }
    
    if (lowerQuery.includes('api') || lowerQuery.includes('technical') || lowerQuery.includes('code')) {
      entities.push('Technical Documentation');
      queryType = 'technical';
    }

    // Generate intelligent responses based on query analysis
    let response = generateIntelligentResponse(query, lowerQuery, queryType, entities, detectedMissions, detectedLocations);
    
    // Add sources based on query type
    switch (queryType) {
      case 'metadata':
        sources = ['MOSDAC Mission Database', 'Satellite Specifications', 'Technical Documentation'];
        break;
      case 'geospatial':
        sources = ['Geographic Database', 'Coordinate Systems', 'Regional Data Catalog'];
        break;
      case 'download':
        sources = ['Data Portal', 'Access Guidelines', 'Format Specifications'];
        break;
      case 'technical':
        sources = ['API Documentation', 'Developer Guide', 'Technical Manuals'];
        break;
      default:
        sources = ['MOSDAC Knowledge Base', 'FAQ Database'];
    }

    return { response, entities, confidence, queryType, sources };
  };

  const generateIntelligentResponse = (
    originalQuery: string, 
    lowerQuery: string, 
    queryType: Message['queryType'], 
    entities: string[], 
    missions: string[], 
    locations: string[]
  ): string => {
    
    // Mission-specific responses
    if (missions.length > 0) {
      const mission = missions[0].toUpperCase();
      const missionData = {
        'INSAT': {
          description: 'Indian National Satellite System for meteorological and communication services',
          products: ['Weather Data', 'Cloud Imagery', 'Temperature Profiles', 'Precipitation Data'],
          resolution: '1km - 4km',
          coverage: 'Indian subcontinent and surrounding regions'
        },
        'RESOURCESAT': {
          description: 'Earth observation satellite for natural resource monitoring',
          products: ['Land Cover Maps', 'Vegetation Index', 'Agricultural Monitoring', 'Forest Assessment'],
          resolution: '5.8m - 188m',
          coverage: 'Global coverage with focus on India'
        },
        'CARTOSAT': {
          description: 'High-resolution Earth imaging for cartographic applications',
          products: ['Stereo Imagery', 'Digital Elevation Models', 'Ortho-rectified Images', 'Topographic Maps'],
          resolution: '0.25m - 2.5m',
          coverage: 'On-demand imaging capability'
        },
        'OCEANSAT': {
          description: 'Ocean monitoring and atmospheric studies',
          products: ['Sea Surface Temperature', 'Ocean Color', 'Wind Speed', 'Wave Height'],
          resolution: '360m - 8km',
          coverage: 'Global ocean coverage'
        }
      };

      const data = missionData[mission as keyof typeof missionData];
      if (data) {
        return `🛰️ **${mission} Mission Information**\n\n**Description:** ${data.description}\n\n**Available Products:**\n${data.products.map(p => `• ${p}`).join('\n')}\n\n**Spatial Resolution:** ${data.resolution}\n**Coverage:** ${data.coverage}\n\n**Access Information:**\n• Products available in GeoTIFF, HDF5, and NetCDF formats\n• Real-time and archive data accessible\n• API endpoints available for automated access\n• Metadata includes acquisition time, sensor parameters, and quality flags\n\n*Would you like specific product details or download instructions?*`;
      }
    }

    // Location-specific responses
    if (locations.length > 0 && queryType === 'geospatial') {
      const location = locations[0];
      return `🌍 **Geospatial Data for ${location.charAt(0).toUpperCase() + location.slice(1)}**\n\n**Available Datasets:**\n• **INSAT-3D/3DR:** Weather and atmospheric data\n• **RESOURCESAT-2/2A:** Land use and vegetation monitoring\n• **CARTOSAT-2/3:** High-resolution optical imagery\n• **RISAT-1/2:** All-weather radar imaging\n\n**Coordinate Information:**\n• Geographic coordinate system (WGS84)\n• UTM projections available\n• Pixel-level georeferencing\n• Ground control points included\n\n**Data Formats:**\n• GeoTIFF with embedded metadata\n• HDF5 with scientific datasets\n• NetCDF for time-series data\n• KML for visualization\n\n**Access Methods:**\n• Web-based data discovery portal\n• FTP download services\n• API-based programmatic access\n• Bulk data ordering system\n\n*Need help with specific coordinates or time periods?*`;
    }

    // Download/Access queries
    if (queryType === 'download') {
      return `📥 **Data Download & Access Guide**\n\n**Step-by-Step Process:**\n\n**1. Data Discovery**\n• Use search filters: mission, date range, geographic area\n• Preview thumbnails and metadata\n• Check data availability and quality\n\n**2. User Registration**\n• Create free MOSDAC account\n• Verify email and complete profile\n• Accept data usage terms\n\n**3. Data Selection**\n• Add products to cart\n• Choose download format (GeoTIFF, HDF5, NetCDF)\n• Select processing level (L1, L2, L3)\n\n**4. Download Methods**\n• **Web Portal:** Direct browser download\n• **FTP Server:** Bulk data transfer\n• **API Access:** Programmatic retrieval\n• **Physical Media:** For large datasets\n\n**5. Data Processing**\n• Use provided metadata files\n• Apply radiometric corrections\n• Reproject to desired coordinate system\n\n**Supported Formats:**\n• GeoTIFF (georeferenced imagery)\n• HDF5 (hierarchical data)\n• NetCDF (climate data)\n• CSV (tabular data)\n• KML (visualization)\n\n*Which specific dataset are you looking to download?*`;
    }

    // Technical/API queries
    if (queryType === 'technical') {
      return `⚙️ **Technical Documentation & API Access**\n\n**API Endpoints:**\n• **Search API:** \`/api/v1/search\` - Dataset discovery\n• **Metadata API:** \`/api/v1/metadata\` - Product information\n• **Download API:** \`/api/v1/download\` - Data retrieval\n• **Status API:** \`/api/v1/status\` - System health\n\n**Authentication:**\n• API key required for all requests\n• OAuth 2.0 for secure access\n• Rate limiting: 1000 requests/hour\n• SSL/TLS encryption mandatory\n\n**SDKs & Libraries:**\n• **Python:** \`pip install mosdac-sdk\`\n• **JavaScript:** \`npm install @mosdac/api-client\`\n• **R:** \`install.packages("mosdacR")\`\n• **MATLAB:** Download from portal\n\n**Code Examples:**\n\`\`\`python\nfrom mosdac import Client\nclient = Client(api_key='your_key')\ndata = client.search(mission='INSAT', region='India')\n\`\`\`\n\n**Documentation:**\n• API Reference Guide (PDF)\n• SDK Documentation (HTML)\n• Code Examples Repository\n• Video Tutorials\n\n*Need help with specific programming language or use case?*`;
    }

    // General intelligent responses
    const generalResponses = [
      `🤖 **AI Analysis Complete**\n\nI've processed your query "${originalQuery}" and found relevant information in our knowledge base.\n\n**Key Insights:**\n• Multiple data sources available across our satellite missions\n• Various processing levels and formats supported\n• Both real-time and historical data accessible\n• Comprehensive metadata and documentation provided\n\n**Recommended Next Steps:**\n• Specify your exact requirements (location, time period, data type)\n• Review available missions and their capabilities\n• Check data access requirements and formats\n• Explore our API documentation for automated access\n\n**Popular Queries:**\n• "Show me latest weather data for Mumbai"\n• "How to access CARTOSAT imagery?"\n• "Download RESOURCESAT vegetation data"\n• "API documentation for developers"\n\n*Please provide more specific details about your data needs.*`,
      
      `🔍 **Intelligent Search Results**\n\nBased on your query, I've identified several relevant resources:\n\n**Data Products:** 450+ datasets available\n**Missions:** 8 active satellite programs\n**Coverage:** Pan-India with global capability\n**Formats:** 5 standard data formats supported\n\n**Quick Access:**\n• Browse by mission type\n• Search by geographic location\n• Filter by data collection date\n• Sort by spatial resolution\n\n**Support Resources:**\n• User manual and tutorials\n• FAQ section with 200+ answers\n• Video demonstrations\n• Technical support contact\n\n*How can I help you find the exact information you need?*`
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
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
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Show processing toast
    toast({
      title: "Processing Query",
      description: "AI is analyzing your request...",
    });

    // Simulate more realistic AI processing time
    setTimeout(() => {
      try {
        const { response, entities, confidence, queryType, sources } = processQuery(currentInput);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'bot',
          timestamp: new Date(),
          entities,
          confidence,
          queryType,
          sources
        };

        setMessages(prev => [...prev, botMessage]);
        
        // Success toast
        toast({
          title: "Response Generated",
          description: `Query processed with ${Math.round((confidence || 0.85) * 100)}% confidence`,
        });
      } catch (error) {
        console.error('Error processing query:', error);
        
        // Error response
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I apologize, but I encountered an issue processing your request. Please try rephrasing your question or contact our technical support team.",
          sender: 'bot',
          timestamp: new Date(),
          confidence: 0.0,
          queryType: 'general'
        };
        
        setMessages(prev => [...prev, errorMessage]);
        
        toast({
          title: "Processing Error",
          description: "Please try again or rephrase your question",
          variant: "destructive"
        });
      } finally {
        setIsTyping(false);
      }
    }, 2000 + Math.random() * 1000); // More realistic processing time
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
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">MOSDAC AI Assistant</h2>
            <p className="text-blue-100 text-sm">Advanced NLP-Powered Knowledge Retrieval</p>
          </div>
          <div className="ml-auto">
            <Badge className="bg-green-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Enhanced AI
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
                        {/* Entities and Query Type */}
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
                        
                        {/* Sources */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="text-xs text-gray-600">
                            <span className="font-semibold">Sources: </span>
                            {message.sources.join(', ')}
                          </div>
                        )}
                        
                        {/* Confidence */}
                        {message.confidence && (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-xs ${getConfidenceColor(message.confidence)}`}>
                              Confidence: {(message.confidence * 100).toFixed(0)}%
                            </Badge>
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
                    <span className="text-sm text-gray-600">AI is thinking...</span>
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
            placeholder="Ask about satellite missions, data downloads, geographic regions..."
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
          <span>Try: "INSAT-3D weather data for Delhi", "How to download CARTOSAT imagery?", "API documentation"</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
