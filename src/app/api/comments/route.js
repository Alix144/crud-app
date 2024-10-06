import Comment from "@/lib/models/Comment";
import connectToDb from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
    const comments = await Comment.find();
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "could not find comments " + error.message }),
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();

    await connectToDb();
    const newComment = new Comment(body);
    await newComment.save();
    return new NextResponse(
      JSON.stringify({ message: "Comment created", comment: newComment }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "error creating OPOPOPOP " + error.message }),
      { status: 500 }
    );
  }
};