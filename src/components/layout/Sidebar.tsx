import { useState } from 'react';
import { 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Hash, 
  Link, 
  Brain,
  FolderOpen,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  currentPdf: string | null;
  onPdfSelect: (pdf: string) => void;
}

interface OutlineItem {
  id: string;
  title: string;
  level: number;
  page: number;
  children?: OutlineItem[];
}

const mockOutline: OutlineItem[] = [
  {
    id: '1',
    title: 'Introduction',
    level: 1,
    page: 1,
    children: [
      { id: '1.1', title: 'Overview', level: 2, page: 1 },
      { id: '1.2', title: 'Objectives', level: 2, page: 2 },
    ]
  },
  {
    id: '2',
    title: 'Methodology',
    level: 1,
    page: 3,
    children: [
      { id: '2.1', title: 'Data Collection', level: 2, page: 3 },
      { id: '2.2', title: 'Analysis Framework', level: 2, page: 5 },
    ]
  },
  {
    id: '3',
    title: 'Results',
    level: 1,
    page: 7,
  },
];

const mockSemanticLinks = [
  { id: '1', title: 'Related Concepts', type: 'concept', relevance: 0.9 },
  { id: '2', title: 'Similar Research', type: 'reference', relevance: 0.8 },
  { id: '3', title: 'Data Correlation', type: 'data', relevance: 0.7 },
];

export function Sidebar({ collapsed, currentPdf, onPdfSelect }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'outline' | 'semantic' | 'documents'>('outline');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['1', '2']));
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderOutlineItem = (item: OutlineItem) => (
    <div key={item.id} className="outline-tree">
      <div
        className={cn(
          'outline-item',
          item.level === 1 && 'h1',
          item.level === 2 && 'h2',
          item.level === 3 && 'h3'
        )}
        style={{ paddingLeft: `${(item.level - 1) * 16 + 12}px` }}
      >
        {item.children && (
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-secondary"
            onClick={() => toggleExpanded(item.id)}
          >
            {expandedItems.has(item.id) ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        )}
        <span className="flex-1 truncate">{item.title}</span>
        <span className="text-xs text-muted-foreground">{item.page}</span>
      </div>
      
      {item.children && expandedItems.has(item.id) && (
        <div className="ml-2">
          {item.children.map(renderOutlineItem)}
        </div>
      )}
    </div>
  );

  if (collapsed) {
    return (
      <aside className="w-20 border-r border-border/50 glass flex flex-col items-center py-4 gap-4">
        <Button
          variant={activeTab === 'outline' ? 'default' : 'ghost'}
          size="sm"
          className="w-12 h-12 p-0"
          onClick={() => setActiveTab('outline')}
        >
          <Hash className="h-5 w-5" />
        </Button>
        <Button
          variant={activeTab === 'semantic' ? 'default' : 'ghost'}
          size="sm"
          className="w-12 h-12 p-0"
          onClick={() => setActiveTab('semantic')}
        >
          <Brain className="h-5 w-5" />
        </Button>
        <Button
          variant={activeTab === 'documents' ? 'default' : 'ghost'}
          size="sm"
          className="w-12 h-12 p-0"
          onClick={() => setActiveTab('documents')}
        >
          <FolderOpen className="h-5 w-5" />
        </Button>
      </aside>
    );
  }

  return (
    <aside className="w-80 border-r border-border/50 glass flex flex-col">
      {/* Tab Navigation */}
      <div className="p-4 border-b border-border/50">
        <div className="flex rounded-lg bg-muted/50 p-1">
          <Button
            variant={activeTab === 'outline' ? 'secondary' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveTab('outline')}
          >
            <Hash className="h-3 w-3 mr-1" />
            Outline
          </Button>
          <Button
            variant={activeTab === 'semantic' ? 'secondary' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveTab('semantic')}
          >
            <Brain className="h-3 w-3 mr-1" />
            Insights
          </Button>
          <Button
            variant={activeTab === 'documents' ? 'secondary' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveTab('documents')}
          >
            <FolderOpen className="h-3 w-3 mr-1" />
            Docs
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder={`Search ${activeTab}...`}
            className="pl-8 text-xs h-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 px-4">
        {activeTab === 'outline' && (
          <div className="space-y-1 pb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Document Structure</h3>
            {mockOutline.map(renderOutlineItem)}
          </div>
        )}

        {activeTab === 'semantic' && (
          <div className="space-y-4 pb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Semantic Connections</h3>
            {mockSemanticLinks.map((link) => (
              <div
                key={link.id}
                className="p-3 rounded-lg bg-card border border-border/50 hover:bg-secondary/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{link.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(link.relevance * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Link className="h-3 w-3 text-primary" />
                  <span className="text-xs text-muted-foreground capitalize">{link.type}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-2 pb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Documents</h3>
            <div className="p-3 rounded-lg bg-card border border-border/50 hover:bg-secondary/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Research Paper.pdf</p>
                  <p className="text-xs text-muted-foreground">24 pages • 2.3 MB</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
    </aside>
  );
}