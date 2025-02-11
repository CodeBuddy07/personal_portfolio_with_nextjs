"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const [stats, setStats] = useState({ messages: 0, blogs: 0, projects: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/statistics");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch statistics", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Dashboard Overview</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">Manage your projects, blogs, and messages here.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Messages Card */}
        <Card className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-500">{stats.messages}</p>
          </CardContent>
        </Card>

        {/* Blogs Card */}
        <Card className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-500">{stats.blogs}</p>
          </CardContent>
        </Card>

        {/* Projects Card */}
        <Card className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-500">{stats.projects}</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
