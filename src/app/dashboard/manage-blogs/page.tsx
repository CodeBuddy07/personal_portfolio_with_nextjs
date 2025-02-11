/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ManageBlogPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<any>([]);
    const [selectedBlog, setSelectedBlog] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchBlogs() {
            const res = await fetch("/api/add-blogs");
            const data = await res.json();
            setBlogs(data);
        }
        fetchBlogs();
    }, []);

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedBlog) return;

        setLoading(true);
        const res = await fetch(`/api/add-blogs`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedBlog),
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            toast.success("Blog updated successfully!");
            router.refresh();
        } else {
            toast.error(data.error || "Failed to update blog.");
        }
    }

    async function handleDelete() {
        if (!selectedBlog) return;

        const res = await fetch(`/api/add-blogs`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: selectedBlog._id }),
        });

        if (res.ok) {
            toast.success("Blog deleted successfully!");

            setBlogs(blogs.filter((b: any) => b._id !== selectedBlog._id));
            setSelectedBlog(null);
        } else {
            toast.error("Failed to delete blog.");
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSelectedBlog({ ...selectedBlog, [e.target.name]: e.target.value });
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md"
        >
            <h2 className="text-3xl font-bold mb-6">Manage Blogs</h2>

            {/* Blog Selection */}
            <select
                className="w-full p-2 border rounded mb-4 bg-gray-200 dark:bg-gray-800"

                onChange={(e) => setSelectedBlog(blogs.find((b: any) => b._id === e.target.value))}
                value={selectedBlog?._id || ""}
            >
                <option value="">Select a blog to manage</option>

                {blogs.map((blog: any) => (
                    <option key={blog._id} value={blog._id}>
                        {blog.title}
                    </option>
                ))}
            </select>

            {selectedBlog && (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <Input name="title" placeholder="Title" value={selectedBlog.title} onChange={handleChange} required />
                    <Input name="shortDescription" placeholder="Short Description" value={selectedBlog.shortDescription} onChange={handleChange} required />
                    <Textarea rows={20} name="content" placeholder="Content" value={selectedBlog.content} onChange={handleChange} required />
                    <Input name="author" placeholder="Author" value={selectedBlog.author} onChange={handleChange} required />
                    <Input name="image" placeholder="Image URL" value={selectedBlog.image} onChange={handleChange} required />

                    <div className="flex gap-3">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Updating..." : "Save Changes"}
                        </Button>
                        <Button type="button" className="w-full bg-red-500" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </form>
            )}
        </motion.div>
    );
}
