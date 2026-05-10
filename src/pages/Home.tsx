import { MainLayout } from '../components/layout/MainLayout';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { MetricsSection } from '../components/home/MetricsSection';

export function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <MetricsSection />
      <FeaturesSection />
    </MainLayout>
  );
}
