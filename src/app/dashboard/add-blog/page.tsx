"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddBlogPage() {
  const router = useRouter();
  const [blog, setBlog] = useState({
    title: "",
    shortDescription: "",
    content: "",
    author: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/add-blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success("Blog added successfully!");
      setBlog({
        title: "",
        shortDescription: "",
        content: "",
        author: "",
        image: "",
      });
      router.refresh();
    } else {
      toast.error(data.error || "Failed to add blog.");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-bold mb-6">Add a New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input name="title" placeholder="Title" value={blog.title} onChange={handleChange} required />
        <Input name="shortDescription" placeholder="Short Description" value={blog.shortDescription} onChange={handleChange} required />
        <Textarea name="content" placeholder="Content" value={blog.content} onChange={handleChange} required />
        <Input name="author" placeholder="Author" value={blog.author} onChange={handleChange} required />
        <Input name="image" placeholder="Image URL" value={blog.image} onChange={handleChange} required />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Blog"}
        </Button>
      </form>
    </motion.div>
  );
}
