
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ProjectPageContent from "./components/ProjectPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Project Showcase",
};

export default function ProjectsPage() {


    return (

        <>
            <Navbar />
            <ProjectPageContent/>
            <Footer />
        </>

    );
}
