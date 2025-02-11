import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnects";
import Blogs from "@/Mongoose/models/Blogs";


export async function POST(req: Request) {
  try {
    await dbConnect();
    const { title, shortDescription, content, author, image } = await req.json();

    if (!title || !shortDescription || !content || !author || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newBlog = new Blogs({ title, shortDescription, content, author, image });
    await newBlog.save();

    return NextResponse.json({ message: "Blog added successfully" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to add blog" }, { status: 500 });
  }
}

export async function GET() {
    try {
      await dbConnect();
      const blogs = await Blogs.find().sort({ createdAt: -1 });
      return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.log(error);
      return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      await dbConnect();
      const { _id : id, title, shortDescription, content, author, image } = await req.json();
  
      if (!id) {
        return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
      }
  
      const updatedBlog = await Blogs.findByIdAndUpdate(id, { title, shortDescription, content, author, image }, { new: true });
  
      if (!updatedBlog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Blog updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
      return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
  }

  export async function DELETE(req: Request) {
    try {
      await dbConnect();
      const { id } = await req.json();
  
      if (!id) {
        return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
      }
  
      await Blogs.findByIdAndDelete(id);
      return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
      return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
  }
  
  