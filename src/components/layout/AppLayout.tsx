import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { PDFViewer } from '../pdf/PDFViewer';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPdf, setCurrentPdf] = useState<string | null>(null);

  return (
    <div className="h-screen w-full bg-gradient-subtle overflow-hidden">
      <Header 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar 
          collapsed={sidebarCollapsed}
          currentPdf={currentPdf}
          onPdfSelect={setCurrentPdf}
        />
        
        <main className={cn(
          "flex-1 transition-all duration-300 ease-spring",
          "bg-background/50 backdrop-blur-sm"
        )}>
          {currentPdf ? (
            <PDFViewer pdfUrl={currentPdf} />
          ) : (
            <div className="h-full flex items-center justify-center">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}