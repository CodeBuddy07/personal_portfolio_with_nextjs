import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnects";
import Projects from "@/Mongoose/models/Projects";


export async function GET() {
  try {
    await dbConnect();
    const projects = await Projects.find({});
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { title, shortDescription, description, technologies, liveLink, repoLink, image } = await req.json();

    if (!title || !shortDescription || !description || !technologies.length || !liveLink || !repoLink || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newProject = new Projects({
      title,
      shortDescription,
      description,
      technologies,
      liveLink,
      repoLink,
      image,
    });

    await newProject.save();
    return NextResponse.json({ message: "Project added successfully", ok:true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to add project" }, { status: 500 });
  }
}


