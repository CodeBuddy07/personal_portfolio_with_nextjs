
import FeaturedProjects from "@/components/FeaturedProjects";
import { HeroBanner } from "@/components/HeroBanner";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import SkillsSection from "@/components/SkillsSection";




export default function Home() {


  return (
    <div>
      <Navbar/>
      <HeroBanner/>
      <SkillsSection/>
      <FeaturedProjects/>
      <Footer/>
    </div>
  );
}
