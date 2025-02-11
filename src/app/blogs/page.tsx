/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function BlogPage() {
    const [blogs, setBlogs] = useState<any>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchBlogs() {
            const res = await fetch("/api/add-blogs");
            const data = await res.json();
            console.log(data);
            setBlogs(data);
        }
        fetchBlogs();
    }, []);

    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="p-6 max-w-7xl mx-auto my-10 min-h-screen"
            >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                    Latest Blogs
                </h1>

                {blogs.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center">No blogs available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog: any) => (
                            <motion.div
                                key={blog._id}
                                className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                            >
                                <Image src={blog.image} alt={blog.title} width={500} height={300} className="w-full h-52 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{blog.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2">{blog.shortDescription}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">By {blog.author}</p>
                                    <Button onClick={() => router.push(`/blogs/${blog._id}`)} className="mt-4 w-full">
                                        Read More
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
            <Footer />
        </>

    );
}
