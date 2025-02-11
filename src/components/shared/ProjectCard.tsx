import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

interface Props {
    project: {
        id: string;
        title: string;
        image: string;
    };
}

const ProjectCard = ({ project }: Props) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
    >

        <Image src={project.image} alt={project.title} className="rounded-md w-full " layout="responsive" width={700} height={475} />
        <h3 className="text-lg font-bold mt-2">{project.title}</h3>
        <Link href={`/projects/${project.id}`} >
            <Button className="!mt-5">
                View Project
            </Button>
        </Link>

    </motion.div>
);

export default ProjectCard;
