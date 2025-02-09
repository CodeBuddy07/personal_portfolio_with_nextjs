import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const FeaturedProjects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "A short description of your project goes here.",
      link: "#",
      image: "/profile.png",
    },
    {
      title: "Project 2",
      description: "Another brief description of the project.",
      link: "#",
      image: "/profile.png",
    },
    {
      title: "Project 3",
      description: "Some more details on your project.",
      link: "#",
      image: "/profile.png",
    },
  ];

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 transition duration-300"
                >
                  View Project
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
