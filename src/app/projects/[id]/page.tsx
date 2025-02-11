"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    github: string;
    live: string;
    technologies: string[];
}

const projects: Project[] = [
    { id: "1", title: "Blood Map", description: "Find blood donors nearby.", image: "/profile.png", github: "https://github.com/ruhul/blood-map", live: "https://bloodmap.com", technologies: ["Next.js", "TypeScript", "Tailwind"] },
    { id: "2", title: "Portfolio", description: "Personal portfolio.", image: "/profile.png", github: "https://github.com/ruhul/portfolio", live: "https://ruhulcodes.netlify.app", technologies: ["Next.js", "ShadCN", "Framer Motion"] },
];

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const foundProject = projects.find((p) => p.id === id);
        setProject(foundProject || null);
    }, [id]);

    if (!project) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold">Project Not Found</h2>
                <Link href="/projects">
                    <Button variant="outline" className="mt-4">Back to Projects</Button>
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto py-12 px-6"
        >
            <Link href="/projects">
                <Button variant="outline" className="mb-4">⬅ Back to Projects</Button>
            </Link>

            <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-900">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="rounded-lg w-full object-cover"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                />

                <h1 className="text-4xl font-bold mt-6">{project.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="mt-6 flex gap-4">
                    <a href={project.github} target="_blank" className="px-4 py-2 bg-gray-900 text-white rounded-lg">
                        🔗 GitHub
                    </a>
                    <a href={project.live} target="_blank" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                        🌍 Live Demo
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;
