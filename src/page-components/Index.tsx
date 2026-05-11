import Layout from "../components/layout/Layout";
import HeroSection from "../components/home/HeroSection";
import TerminalSection from "../components/section/ServicesSection";
import { HomePageData } from "../lib/adminService";

interface IndexProps {
  homeData: HomePageData | null;
  quotes: string[];
}

const Index = ({ homeData, quotes }: IndexProps) => {
  return (
    <Layout>
      <HeroSection initialHomeData={homeData} initialQuotes={quotes} />
      <TerminalSection />
    </Layout>
  );
};

export default Index;
