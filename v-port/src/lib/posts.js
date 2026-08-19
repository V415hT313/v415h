import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

function readTime(body) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllSlugs(section) {
  const dir = path.join(CONTENT_ROOT, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPost(section, slug) {
  const filePath = path.join(CONTENT_ROOT, section, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt ?? "",
    readTime: readTime(content),
    content,
  };
}

export function getAllPosts(section) {
  return getAllSlugs(section)
    .map((slug) => getPost(section, slug))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
