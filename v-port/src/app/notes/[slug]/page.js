import { getAllSlugs, getPost } from "@/lib/posts";
import PostArticle from "@/app/components/PostArticle";

export function generateStaticParams() {
  return getAllSlugs("notes").map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPost("notes", params.slug);
  return { title: `${post.title} — Vaishnavi`, description: post.excerpt };
}

export default function NotePost({ params }) {
  const post = getPost("notes", params.slug);
  return <PostArticle post={post} backHref="/?tab=notes" />;
}
