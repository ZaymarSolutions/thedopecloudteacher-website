import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PgParksProgramsSection from "./components/PgParksProgramsSection";
import DctAcademySection from "./components/DctAcademySection";
import WorkshopsSection from "./components/WorkshopsSection";
import StudentSuccessSection from "./components/StudentSuccessSection";
import CtaFooter from "./components/CtaFooter";

function App() {
  return (
    <div className="page-shell" id="home">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />
      <Navbar />
      <main>
        <HeroSection />
        <PgParksProgramsSection />
        <DctAcademySection />
        <WorkshopsSection />
        <StudentSuccessSection />
      </main>
      <CtaFooter />
    </div>
  );
}

export default App;
