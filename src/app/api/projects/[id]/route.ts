import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnects";
import Projects from "@/Mongoose/models/Projects";


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params;
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
