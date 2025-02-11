/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import ProjectCard from "@/components/shared/ProjectCard";
import { Skeleton } from "@/components/shared/Skeleton";

const ProjectPageContent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch("/api/projects");
                const data = await res.json();
                console.log(data);
                setProjects(data.projects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    return (
        <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-6 py-12 min-h-screen"
            >
                <h1 className="text-3xl font-bold text-center mb-8">Our Projects</h1>

                {loading ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-64 w-full rounded-md" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {projects.length > 0 ? (
                            projects.map((project: any) => <ProjectCard key={project._id} project={project} />)
                        ) : (
                            <p className="text-center col-span-3">No projects found.</p>
                        )}
                    </div>
                )}
            </motion.div>
    );
};

export default ProjectPageContent;