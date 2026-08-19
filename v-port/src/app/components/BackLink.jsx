import React from "react";
import Link from "next/link";

const BackLink = ({ href, children, accent = false }) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[11px] uppercase tracking-wide transition-colors ${
        accent
          ? "border-accent text-accent hover:bg-accent hover:text-bg"
          : "border-border text-fg-muted hover:border-fg-muted hover:text-fg"
      }`}
    >
      &larr; {children}
    </Link>
  );
};

export default BackLink;
