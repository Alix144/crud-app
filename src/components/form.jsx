"use client";
import { useState } from "react";
import LoadingIcon from "@/components/LoadingIcon";

export default function Form() {
  const [comment, setComment] = useState("");

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });
      setComment("")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="flex flex-col gap-3" onSubmit={(e)=>addComment(e)}>
      <input
        type="text"
        placeholder="comment"
        className="w-full mb-3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="bg-slate-600 rounded-md w-full">
        add
      </button>
    </form>
  );
}
