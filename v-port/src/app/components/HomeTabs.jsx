"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import TabNav from "./TabNav";
import AboutTab from "./tabs/AboutTab";
import ProjectsTab from "./tabs/ProjectsTab";
import PostListTab from "./tabs/PostListTab";

const VALID_TABS = ["about", "projects", "notes", "thoughts"];

const HomeTabs = ({ projects, notesPosts, thoughtsPosts }) => {
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const initialTab = VALID_TABS.includes(requestedTab) ? requestedTab : "about";
  const [active, setActive] = useState(initialTab);

  return (
    <div>
      <TabNav active={active} onChange={setActive} />
      {active === "about" && <AboutTab />}
      {active === "projects" && <ProjectsTab projects={projects} />}
      {active === "notes" && (
        <PostListTab posts={notesPosts} basePath="/notes" emptyLabel="No notes yet." />
      )}
      {active === "thoughts" && (
        <PostListTab posts={thoughtsPosts} basePath="/thoughts" emptyLabel="Nothing here yet." />
      )}
    </div>
  );
};

export default HomeTabs;
