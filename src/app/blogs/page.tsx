
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Metadata } from "next";
import BlogPageContent from "./components/BlogPage";

export const metadata: Metadata = {
    title: "Blogs",
    description: "Our latest blogs",
};

export default function BlogPage() {


    return (
        <>
            <Navbar />
            <div className="p-6 max-w-7xl mx-auto my-10 min-h-screen">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                    Latest Blogs
                </h1>

                <BlogPageContent/>
                
            </div>
            <Footer />
        </>

    );
}
