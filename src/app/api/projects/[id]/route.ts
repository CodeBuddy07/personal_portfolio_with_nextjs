import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnects";
import Projects from "@/Mongoose/models/Projects";


export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const updatedData = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const updatedProject = await Projects.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function GET(req: Request,{ params }: { params: Promise<{ id: string }> }) {
    try {
      await dbConnect();

      const { id } = await params;
        
  
      if (!id) {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
      }
      const projects = await Projects.findById(id);
      return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
  }


  export async function POST(req: Request) {
    try {
      await dbConnect();
     
      const { id } = await req.json();
  
      if (!id) {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
      }
  
      const deletedProject = await Projects.findByIdAndDelete(id);

      if (!deletedProject) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
  }