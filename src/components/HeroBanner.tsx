'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export  const HeroBanner = () =>{

    return (
        <section className="relative w-full py-20 bg-gradient-to-r  overflow-hidden">

            <div className="absolute inset-0 flex justify-end items-center -z-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"
                ></motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">


                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center md:text-left"
                >
                    <span className="text-primary font-medium text-lg uppercase tracking-wide">
                        Hello!
                    </span>
                    <h1 className="text-4xl font-extrabold md:text-6xl leading-[1.2] text-foreground mt-2">
                        I&apos;m <span className="text-primary"> Mang Coda Ruhul Amin</span>
                    </h1>
                    <p className="text-muted-foreground mt-4 md:text-lg text-base md:max-w-3xl p-5 md:p-0">
                        A passionate Web Developer dedicated to crafting modern, scalable, and high-performance applications.
                    </p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-6 flex flex-col md:flex-row gap-5 justify-center md:justify-start space-x-4"
                    >
                        <Link href="/projects">
                            <Button size="sm" className="px-6 py-3 text-lg rounded-lg shadow-md">
                                View My Work
                            </Button>
                        </Link>
                        <a href="https://docs.google.com/document/d/1HNn6EsjwJ9kXSgB8iMhfaqcZCl_4LB9BKt8KY7L5zB4/export?format=pdf" download>
                            <Button variant="outline" size="sm" className="px-6  py-3 text-lg rounded-lg border-2 shadow-md">
                                Download Resume
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative"
                >

                    <div className='md:w-96 w-80 md:h-96 h-80'>
                        <Image
                            src="/profile.png"
                            alt="Ruhul Amin"
                            layout="fill"
                            objectFit="cover"
                            priority
                            className="rounded-lg"
                        />
                    </div>


                    <div className="absolute bg-orange-400 -top-6 -left-6 w-16 h-16 bg-primary/30 rounded-full animate-bounce"></div>
                    <div className="absolute bg-orange-400 -bottom-6 -right-6 w-12 h-12 bg-secondary/40 rounded-full animate-pulse"></div>
                </motion.div>

            </div>
        </section>
    );
}
