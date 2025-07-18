import { useState } from 'react';
import { Upload, FileText, Brain, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WelcomeScreenProps {
  onPdfUpload: (file: File) => void;
}

export function WelcomeScreen({ onPdfUpload }: WelcomeScreenProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onPdfUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPdfUpload(e.target.files[0]);
    }
  };

  const features = [
    {
      icon: FileText,
      title: 'Smart Document Structure',
      description: 'Automatically extract hierarchical outlines and navigate through H1/H2/H3 sections with ease.'
    },
    {
      icon: Brain,
      title: 'Semantic Intelligence',
      description: 'AI-powered analysis links related concepts across documents and highlights key insights.'
    },
    {
      icon: Zap,
      title: 'Interactive Experience',
      description: 'Transform static PDFs into dynamic, searchable, and interconnected knowledge bases.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12 animate-fade-in-up">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Document Analysis</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gradient leading-tight">
          Transform PDFs into
          <br />
          Intelligent Documents
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Upload your PDF and watch it come alive with interactive outlines, 
          semantic connections, and AI-powered insights that make information discovery effortless.
        </p>
      </div>

      {/* Upload Area */}
      <Card className="glass-card">
        <div
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            dragActive
              ? 'border-primary bg-primary/5 scale-105'
              : 'border-border hover:border-primary/50 hover:bg-muted/20'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center transition-transform duration-300 ${
              dragActive ? 'scale-110' : ''
            }`}>
              <Upload className="h-8 w-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {dragActive ? 'Drop your PDF here' : 'Upload your PDF document'}
              </h3>
              <p className="text-muted-foreground">
                Drag and drop your file here, or click to browse
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="btn-primary-glass" size="lg">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </Button>
              
              <Button variant="outline" size="lg" className="glass">
                Try Demo PDF
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={feature.title} className={`glass-card interactive-hover animate-scale-in`} style={{ animationDelay: `${index * 100}ms` }}>
            <div className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Powered by Adobe PDF Embed API • Built for the future of document intelligence</p>
      </div>
    </div>
  );
}