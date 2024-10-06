"use client";
import { useEffect, useState } from "react";
import LoadingIcon from "@/components/LoadingIcon";

export default function Form() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);

  const getComments = async () => {
    const response = await fetch("/api/comments", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    setComments(data);
  };

  const addComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });
      const newComment = {comment}
      setComments((previousComments) => [...previousComments, newComment]);
      setComment("");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="py-5 px-10 w-full h-screen flex gap-5 justify-between">
      <div className="p-5 bg-[#9D9D9D] w-[35%] rounded-md">
        <form action="flex flex-col gap-3" onSubmit={(e) => addComment(e)}>
          <input
            className="w-full mb-3 rounded-md p-2"
            type="text"
            placeholder="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="p-2 bg-slate-600 rounded-md w-full">
            {loading ? <LoadingIcon /> : "Add"}
          </button>
        </form>
      </div>

      <div className="p-5 bg-[#9D9D9D] w-[60%] flex flex-col justify-center items-center rounded-md overflow-y-auto">
        {comments === null ? (
          <LoadingIcon />
        ) : comments.length === 0 ? (
          <p>no comments</p>
        ) : (
          comments.map((comment) => (
            <div
              className="mb-2 p-5 w-full bg-red-500 rounded-md"
              key={comment._id}
            >
              <p>{comment.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
