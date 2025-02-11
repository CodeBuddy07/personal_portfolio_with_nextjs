/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Skeleton } from "@/components/shared/Skeleton";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const BlogPageContent = () => {

    const [blogs, setBlogs] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchBlogs() {
            try {
                setLoading(true);
                const res = await fetch("/api/add-blogs");
                const data = await res.json();
                console.log(data);
                setBlogs(data);
            } catch (error) {
                console.log(error);
                toast("Something went wrong.")
            }finally{
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    if (loading) {
        return <Skeleton />
    }

    return (
        <>
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
        </>
    );
};

export default BlogPageContent;