"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AddProjectPage() {

  const [project, setProject] = useState({
    title: "",
    shortDescription: "",
    description: "",
    technologies: "",
    liveLink: "",
    repoLink: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const techArray = project.technologies.split(",").map((tech) => tech.trim());

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...project, technologies: techArray }),
    });

    const data = await res.json();
    setLoading(false);
    console.log(res);

    if (res.ok) {
      toast.success("Project added successfully!");
      setProject({
        title: "",
        shortDescription: "",
        description: "",
        technologies: "",
        liveLink: "",
        repoLink: "",
        image: "",
      });
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(data.error || "Failed to add project.");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-7xl mx-auto p-8 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 dark:border-gray-800"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-6">
        Add New Project
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Short Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="title" placeholder="Project Title" value={project.title} onChange={handleChange} required />
          <Input name="shortDescription" placeholder="Short Description" value={project.shortDescription} onChange={handleChange} required />
        </div>

        {/* Description */}
        <Textarea name="description" placeholder="Project Description" value={project.description} onChange={handleChange} required />

        {/* Technologies */}
        <Input name="technologies" placeholder="Technologies (comma-separated)" value={project.technologies} onChange={handleChange} required />

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="liveLink" placeholder="Live Link" value={project.liveLink} onChange={handleChange} required />
          <Input name="repoLink" placeholder="GitHub Repo Link" value={project.repoLink} onChange={handleChange} required />
        </div>

        {/* Image */}
        <Input name="image" placeholder="Image URL" value={project.image} onChange={handleChange} required />

        {/* Submit Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full text-lg py-3" disabled={loading}>
            {loading ? "Adding..." : "Add Project"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
