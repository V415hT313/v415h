import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BackLink from "./BackLink";

const fullDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const PostArticle = ({ post, backHref }) => {
  return (
    <article className="py-8">
      <BackLink href={backHref} accent>
        Back to articles
      </BackLink>

      <h1 className="mt-6 text-sm font-medium text-fg sm:text-base">{post.title}</h1>
      <p className="mt-3 text-[11px] uppercase tracking-wide text-fg-muted">
        {fullDate(post.date)} <span className="mx-2 text-border">·</span> {post.readTime} min read
      </p>

      <div className="prose-content mt-8 text-fg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostArticle;
