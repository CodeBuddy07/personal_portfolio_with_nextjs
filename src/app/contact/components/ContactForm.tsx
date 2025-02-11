"use client";

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then(mod => mod.motion.div), { ssr: false });
const MotionForm = dynamic(() => import("framer-motion").then(mod => mod.motion.form), { ssr: false });
const MotionP = dynamic(() => import("framer-motion").then(mod => mod.motion.p), { ssr: false });
const MotionButton = dynamic(() => import("framer-motion").then(mod => mod.motion.button), { ssr: false });

const ContactForm = () => {
    const { status } = useSession(); 
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (status === "unauthenticated") {
            setStatusMessage("❌ You must be logged in to submit the contact form.");
            return;
        }

        setLoading(true);
        setStatusMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setStatusMessage("✅ Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatusMessage(`❌ ${data.error || "Something went wrong."}`);
            }
        } catch (error) {
            console.log(error);
            setStatusMessage("❌ Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MotionDiv
            className="w-full max-w-2xl bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }} 
        >
            <h2 className="text-4xl font-bold text-center mb-6">📬 Contact Us</h2>
            <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-8">
                We&apos;d love to hear from you! Fill out the form below, and we&apos;ll get back to you soon.
            </p>

            <MotionForm
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }} 
            >
                {/* Name Field */}
                <MotionDiv initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                    <label htmlFor="name" className="block text-lg font-medium">
                        Your Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500 dark:placeholder-gray-400"
                        required
                    />
                </MotionDiv>

                {/* Email Field */}
                <MotionDiv initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <label htmlFor="email" className="block text-lg font-medium">
                        Your Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500 dark:placeholder-gray-400"
                        required
                    />
                </MotionDiv>

                {/* Message Field */}
                <MotionDiv initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
                    <label htmlFor="message" className="block text-lg font-medium">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        className="w-full p-3 h-32 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                        required
                    />
                </MotionDiv>

                {/* Submit Button */}
                <MotionButton
                    type="submit"
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white text-lg font-semibold rounded-lg shadow-lg"
                    disabled={loading}
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                >
                    {loading ? "Sending..." : "Send Message 🚀"}
                </MotionButton>
            </MotionForm>

            {/* Status Message */}
            {statusMessage && (
                <MotionP
                    role="alert"
                    className={`mt-6 text-center text-lg font-medium p-3 rounded-lg ${statusMessage.includes("✅") ? "bg-green-500/20 text-green-700 dark:text-green-400" : "bg-red-500/20 text-red-700 dark:text-red-400"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    {statusMessage}
                </MotionP>
            )}
        </MotionDiv>
    );
};

export default ContactForm;
