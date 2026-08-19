import React from "react";
import Link from "next/link";
import { groupByYear } from "@/lib/groupByYear";

const monthDay = (date) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit" });

const PostListTab = ({ posts, basePath, emptyLabel }) => {
  if (posts.length === 0) {
    return <p className="py-8 text-fg-muted">{emptyLabel}</p>;
  }

  const groups = groupByYear(posts);

  return (
    <div className="py-8">
      {groups.map(([year, yearPosts]) => (
        <div key={year} className="mb-8">
          <h3 className="mb-3 text-xs uppercase tracking-wide text-fg-muted">{year}</h3>
          <ul className="divide-y divide-border border-t border-border">
            {yearPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`${basePath}/${post.slug}`}
                  className="group flex items-start justify-between gap-4 py-3.5"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-14 shrink-0 text-[11px] text-fg-muted">
                      {monthDay(post.date)}
                    </span>
                    <span className="text-sm font-medium text-fg group-hover:text-accent sm:text-base">
                      {post.title}
                    </span>
                  </div>
                  <span className="shrink-0 text-[11px] text-fg-muted">
                    {post.readTime} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PostListTab;
