"use client";
import { useEffect, useState } from "react";
import LoadingIcon from "@/components/LoadingIcon";

export default function Comments() {
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getComments = async () => {
    setIsLoading(true);
    const response = await fetch("/api/comments", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    setComments(data);
  };

  useEffect(() => {
    getComments().then(setIsLoading(false));
  }, []);

  return (
    <div className="p-5 bg-[#9D9D9D] w-[60%] flex flex-col justify-center items-center rounded-md">

      {comments === null ? (
        <LoadingIcon />
      ) : comments.length === 0 ? (
        <p>no comments</p>
      ) : (
        comments.map((comment) => (
          <div className="mb-2 p-5 w-full bg-red-500 rounded-md" key={comment._id}>
            <p>{comment.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
