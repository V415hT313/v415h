import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "src", "content", "projects");

export function getAllProjects() {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        tag: data.tag,
        github: data.github,
        order: data.order ?? 0,
        content,
      };
    })
    .sort((a, b) => a.order - b.order);
}
