"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

// interface Project {
//     id: string;
//     title: string;
//     description: string;
//     image: string;
//     github: string;
//     live: string;
//     technologies: string[];
// }



const ProjectDetail = () => {
    const { id } = useParams();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [projects, setProjects] = useState<any>({});

    const getProjects = async () => {
        const res = await fetch(`/api/projects?id=${id}`);
        const data = await res.json();
        console.log(data.projects[0]);
        setProjects(data.projects[0]);
    }

    useEffect(() => {
        getProjects();
    }, []);



    if (!projects) {
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
        <>
            <Navbar />

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
                        src={projects.image}
                        alt={projects.title}
                        className="rounded-lg w-full object-cover"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />

                    <h1 className="text-4xl font-bold mt-6">{projects.title}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-3">{projects.description}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {projects?.technologies?.map((tech: string) => (
                            <span key={tech} className="px-3 py-1 bg-gray-800 text-white text-sm rounded-lg">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 flex gap-4">
                        <Link href={projects?.repoLink || "#"} target="_blank" >
                            <Button className="px-4 py-2 !bg-gray-800 !text-white rounded-lg">
                                🔗 GitHub
                            </Button>

                        </Link>
                        <Link href={projects?.liveLink || "#"} target="_blank" >

                            <Button className="px-4 py-2 !bg-blue-500 !text-white rounded-lg">
                                🌍 Live Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>


            <Footer />
        </>
    );
};

export default ProjectDetail;
