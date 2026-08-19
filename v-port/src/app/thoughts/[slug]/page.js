import { getAllSlugs, getPost } from "@/lib/posts";
import PostArticle from "@/app/components/PostArticle";

export function generateStaticParams() {
  return getAllSlugs("thoughts").map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPost("thoughts", params.slug);
  return { title: `${post.title} — Vaishnavi`, description: post.excerpt };
}

export default function ThoughtPost({ params }) {
  const post = getPost("thoughts", params.slug);
  return <PostArticle post={post} backHref="/?tab=thoughts" />;
}
