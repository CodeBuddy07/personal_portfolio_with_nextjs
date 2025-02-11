import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnects";
import Contact from "@/Mongoose/models/Contact";
import Blogs from "@/Mongoose/models/Blogs";
import Projects from "@/Mongoose/models/Projects";


export async function GET() {
  try {
    await dbConnect();
    const messageCount = await Contact.countDocuments();
    const blogCount = await Blogs.countDocuments();
    const projectCount = await Projects.countDocuments();

    return NextResponse.json({
      messages: messageCount,
      blogs: blogCount,
      projects: projectCount,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
  }
}
