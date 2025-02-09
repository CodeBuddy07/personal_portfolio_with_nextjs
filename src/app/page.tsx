import FeaturedProjects from "@/components/FeaturedProjects";
import HeroBanner from "@/components/HeroBanner";
import SkillsSection from "@/components/SkillsSection";




export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <SkillsSection/>
      <FeaturedProjects/>
    </div>
  );
}
