"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ManageProjectsPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);


  useEffect(() => {
    setIsHydrated(true);
  }, []);

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects);
  }

  useEffect(() => {

    if (isHydrated) fetchProjects();
  }, [isHydrated]);

  async function handleSelectProject(e: React.ChangeEvent<HTMLSelectElement>) {
    const projectId = e.target.value;
    const project = projects.find((p) => p._id === projectId);
    setSelectedProject(project);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const techArray = selectedProject.technologies.split(",").map((tech: string) => tech.trim());

    const res = await fetch(`/api/projects/${selectedProject._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...selectedProject, technologies: techArray }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success("Project updated successfully!");
      router.refresh();
    } else {
      toast.error(data.error || "Failed to update project.");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSelectedProject({ ...selectedProject, [e.target.name]: e.target.value });
  }

  const handleDelete = async (id:string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id, 
        }),
      });
      

      const data = await response.json();

      if (response.ok) {
        toast.success("Project deleted successfully!");
        router.refresh();
        setSelectedProject(null);
        fetchProjects();
      } else {
        toast.error(data.error || "Failed to delete the project.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the project.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto p-8 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 dark:border-gray-800"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-6">
        Manage Projects
      </h2>


      {isHydrated && (
        <>
          <select
            onChange={handleSelectProject}
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select a project to manage</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>

          {selectedProject && (
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="title" placeholder="Project Title" value={selectedProject.title} onChange={handleChange} required />
                <Input name="shortDescription" placeholder="Short Description" value={selectedProject.shortDescription} onChange={handleChange} required />
              </div>

              <Textarea name="description" rows={13} placeholder="Project Description" value={selectedProject.description} onChange={handleChange} required />
              <Input name="technologies" placeholder="Technologies (comma-separated)" value={selectedProject.technologies} onChange={handleChange} required />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="liveLink" placeholder="Live Link" value={selectedProject.liveLink} onChange={handleChange} required />
                <Input name="repoLink" placeholder="GitHub Repo Link" value={selectedProject.repoLink} onChange={handleChange} required />
              </div>

              <Input name="image" placeholder="Image URL" value={selectedProject.image} onChange={handleChange} required />

              <div className="flex justify-center items-center gap-5 w-full">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full text-lg py-3" disabled={loading}>
                    {loading ? "Updating..." : "Update Project"}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button onClick={()=>handleDelete(selectedProject._id)}  className="w-full text-lg py-3 !bg-red-500 !text-white" disabled={deleting}>
                  {deleting ? "Deleting..." : "Delete Project"}
                </Button>
              </motion.div>
              </div>
            </form>
          )}
        </>
      )}
    </motion.div>
  );
}
