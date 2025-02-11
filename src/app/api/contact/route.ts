// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import dbConnect from "@/utils/dbConnects";
import Contact from "@/Mongoose/models/Contact";


export async function POST(req: Request) {
  try {



    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to submit the contact form." },
        { status: 401 }
      );
    }


    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await dbConnect();


    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return NextResponse.json({ message: "Message saved successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error handling contact form:", error);
    return NextResponse.json({ error: "Failed to save the message." }, { status: 500 });
  }
}


export async function GET() {
  try {

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to view messages." },
        { status: 401 }
      );
    }


    await dbConnect();


    const messages = await Contact.find().sort({ createdAt: -1 }); 

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages." }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    // Authenticate the user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to delete messages." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const messageId = searchParams.get("id");

    if (!messageId) {
      return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    }

    await dbConnect();


    const deletedMessage = await Contact.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return NextResponse.json({ error: "Message not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Message deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json({ error: "Failed to delete the message." }, { status: 500 });
  }
}

