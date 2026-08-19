"use client";
import React, { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import ProjectTag from "../ProjectTag";

const ProjectsTab = ({ projects }) => {
  const [tag, setTag] = useState("All");

  const tags = ["All", ...new Set(projects.map((p) => p.tag))];
  const filteredProjects = projects.filter((p) => tag === "All" || p.tag === tag);

  return (
    <div className="py-8">
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <ProjectTag key={t} onClick={setTag} name={t} isSelected={tag === t} />
        ))}
      </div>

      <ul className="mt-6 divide-y divide-border border-t border-border">
        {filteredProjects.map((project) => (
          <li key={project.slug} className="py-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-medium text-fg sm:text-lg">{project.title}</h3>
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="shrink-0 text-fg-muted transition-colors hover:text-accent"
              >
                <CodeBracketIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="prose-content mt-2 text-sm text-fg-muted">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsTab;
