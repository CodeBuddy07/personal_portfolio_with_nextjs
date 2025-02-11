/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import BlogSkeleton from "./components/loadingSkeleton";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`/api/add-blogs/${id}`);
      const data = await res.json();
      setBlog(data);
    }
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <BlogSkeleton/>;
  }

  return (
    <>
  <Navbar/>
  <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto my-10 min-h-screen"
    >

      <div className="relative w-full h-96">
        <Image src={blog.image} alt={blog.title} fill className="object-cover rounded-lg" />
      </div>

      <div className="p-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{blog.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4">By {blog.author}</p>

        <div className="border-b border-gray-300 dark:border-gray-700 my-4"></div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{blog.content}</p>
      </div>
    </motion.div>
  <Footer/>  
    </>
  );
}
