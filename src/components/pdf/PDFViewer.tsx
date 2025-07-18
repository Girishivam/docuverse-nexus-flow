import { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PDFViewerProps {
  pdfUrl: string;
}

export function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(24); // Mock total pages

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  // Mock PDF rendering - in real implementation, you'd use Adobe PDF Embed API
  return (
    <div className="h-full flex flex-col bg-muted/20">
      {/* PDF Toolbar */}
      <div className="border-b border-border/50 glass p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-4 w-px bg-border" />
            
            <Button variant="outline" size="sm" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Page</span>
            <input
              type="number"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="w-12 px-1 py-0.5 text-center border border-border rounded text-foreground bg-background"
              min={1}
              max={totalPages}
            />
            <span>of {totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 relative overflow-auto">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div
            className={cn(
              "pdf-container shadow-xl transition-transform duration-300 bg-white",
              `scale-${Math.round(zoom * 100)}`
            )}
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              width: '210mm',
              height: '297mm',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            {/* Mock PDF Content */}
            <div className="w-full h-full p-8 bg-white relative">
              {/* Header */}
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Research Paper: AI-Powered Document Analysis
                </h1>
                <p className="text-gray-600">
                  A comprehensive study on semantic document understanding
                </p>
              </div>

              {/* Content with semantic highlights */}
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  1. Introduction
                </h2>
                
                <p>
                  The field of <span className="semantic-highlight" title="Related to: Machine Learning, Page 5">
                    artificial intelligence
                  </span> has revolutionized how we process and understand documents. 
                  Modern approaches to <span className="semantic-highlight" title="Connected concept: NLP Framework">
                    natural language processing
                  </span> enable sophisticated analysis of textual content.
                </p>

                <p>
                  This research explores the intersection of <span className="semantic-highlight" title="See also: Page 12, Methodology">
                    semantic analysis
                  </span> and document understanding, presenting a novel framework 
                  for extracting meaningful insights from unstructured text.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
                  1.1 Objectives
                </h3>

                <p>
                  Our primary objectives include developing robust algorithms for 
                  <span className="semantic-highlight" title="Cross-reference: Results, Page 15">
                    content extraction
                  </span> and implementing real-time processing capabilities 
                  for large-scale document analysis.
                </p>

                {/* Page indicator */}
                <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                  Page {currentPage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}