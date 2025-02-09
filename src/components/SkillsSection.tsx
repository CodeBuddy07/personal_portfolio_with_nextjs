"use client";

import * as React from "react"
import { motion } from "framer-motion";
import { 
  Code, 
  Server, 
  Database, 
  Leaf,  
  Wind, 
  Boxes, 
  Braces, 
  Layers3 
} from "lucide-react";

const skills = [
  { name: "React.js", icon: <Code className="text-blue-400 w-10 h-10" />, level: 90 },
  { name: "Next.js", icon: <Layers3 className="text-gray-900 dark:text-white w-10 h-10" />, level: 85 },
  { name: "TypeScript", icon: <Braces className="text-blue-500 w-10 h-10" />, level: 80 },
  { name: "Tailwind CSS", icon: <Wind className="text-teal-400 w-10 h-10" />, level: 85 },
  { name: "Node.js", icon: <Server className="text-green-500 w-10 h-10" />, level: 80 },
  { name: "Express.js", icon: <Boxes className="text-gray-700 dark:text-gray-300 w-10 h-10" />, level: 75 },
  { name: "MongoDB", icon: <Leaf className="text-green-600 w-10 h-10" />, level: 80 },
  { name: "SQL", icon: <Database className="text-orange-500 w-10 h-10" />, level: 75 },
];

export default function SkillsSection() {

        const [isMounted, setIsMounted] = React.useState(false);
    
        React.useEffect(() => {
            setIsMounted(true);
        }, []);
    
        if (!isMounted) {
            return null; 
        }

  return (
    <section className="w-full py-16 bg-background">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">My Tech Stack</h2>
        <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
          My expertise lies in building dynamic, high-performance web applications.  
          Here are the core technologies I work with.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-lg p-5 shadow-md border border-border flex flex-col items-center"
            >
              <div className="">{skill.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mt-3">{skill.name}</h3>
              <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-md mt-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-2 rounded-md bg-blue-400"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{skill.level}% Proficiency</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
