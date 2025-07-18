import { AppLayout } from '@/components/layout/AppLayout';
import { WelcomeScreen } from '@/components/welcome/WelcomeScreen';

const Index = () => {
  const handlePdfUpload = (file: File) => {
    console.log('PDF uploaded:', file.name);
    // TODO: Process PDF with Round 1 extraction logic
  };

  return (
    <AppLayout>
      <WelcomeScreen onPdfUpload={handlePdfUpload} />
    </AppLayout>
  );
};

export default Index;
