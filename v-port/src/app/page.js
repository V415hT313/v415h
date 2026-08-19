import { Suspense } from "react";
import HomeTabs from "./components/HomeTabs";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();
  const notesPosts = getAllPosts("notes");
  const thoughtsPosts = getAllPosts("thoughts");

  return (
    <Suspense>
      <HomeTabs projects={projects} notesPosts={notesPosts} thoughtsPosts={thoughtsPosts} />
    </Suspense>
  );
}
