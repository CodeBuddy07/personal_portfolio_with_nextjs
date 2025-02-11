import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnects";
import Blogs from "@/Mongoose/models/Blogs";


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const {id} = await params;
    
    const blog = await Blogs.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}
