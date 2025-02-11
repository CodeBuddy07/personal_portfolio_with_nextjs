"use client"
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const FeaturedProjects = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([]);

  const getProjects = async() =>{
    const res = await fetch("/api/projects");
    const data = await res.json();
    console.log(data);
    setProjects(data.projects);
  }

  useEffect(()=>{
    getProjects();
  },[]);


  return (
    <section className="py-20  bg-gray-100 dark:bg-background">
      <div className="container max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={project?.image}
                  alt={project?.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl  font-semibold text-gray-900 dark:text-white mb-3">{project?.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project?.shortDescription}</p>
 
                <Link href={`/projects/${project._id}`}>
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
