import HeroSection from "@/components/pages/landingPage/HeroSection";
import Footer from "@/components/common/Footer";
import AllComponentLandingPage from "@/components/pages/landingPage/AllComponentLandingPage";
function LandingPage() {
  return (
    <div className="w-full">
      <div className="bg-home-gradient-light from-background via-backgroundGradient via-55% to-background dark:bg-gradient-to-b">
        <HeroSection isTop={true} />
      </div>
      <AllComponentLandingPage />
      <Footer />
    </div>
  );
}
export default LandingPage;
