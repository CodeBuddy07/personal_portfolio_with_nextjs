import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

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
    <section className="py-20  bg-gray-100 dark:bg-background">
      <div className="container max-w-7xl mx-auto text-center">
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
              <div className="p-6 text-left">
                <h3 className="text-xl  font-semibold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
 
                <Link href={project.link}>
                  <Button>
                    View Project
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
