import Comments from "@/components/Comments";
import Form from "@/components/form";

export default function Home() {
  return (
    <div className="py-5 px-10 w-full h-screen flex gap-5 justify-between">
      <div className="p-5 bg-[#9D9D9D] w-[35] rounded-md">
        <Form />
      </div>

      <Comments />
    </div>
  );
}
