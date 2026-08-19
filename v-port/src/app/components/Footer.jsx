import React from "react";
import Link from "next/link";

const iconLinks = [
  {
    label: "GitHub",
    href: "https://github.com/V415hT313",
    path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vaishnavi-tiwari-3a82731a2/",
    path: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM8.34 18H5.67V9.75h2.67V18Zm-1.34-9.4c-.86 0-1.4-.58-1.4-1.3 0-.74.55-1.3 1.43-1.3.87 0 1.4.56 1.41 1.3 0 .72-.54 1.3-1.44 1.3ZM19 18h-2.67v-4.44c0-1.19-.66-2-1.77-2-.85 0-1.31.57-1.53 1.13-.08.19-.07.46-.07.73V18h-2.64s.03-7.66 0-8.25h2.64v1.27c.2-.55.99-1.34 2.28-1.34 1.6 0 2.76 1.05 2.76 3.32V18Z",
  },
  {
    label: "Email",
    href: "mailto:vashu2506rkt@gmail.com",
    path: "M2.25 6.75c0-.83.67-1.5 1.5-1.5h16.5c.83 0 1.5.67 1.5 1.5v10.5c0 .83-.67 1.5-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V6.75Zm1.72-.03 8.03 5.62 8.03-5.62H3.97ZM3.75 8.1v9.15h16.5V8.1l-7.63 5.34a1.5 1.5 0 0 1-1.74 0L3.75 8.1Z",
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto flex max-w-3xl items-center gap-3 px-6 py-8 text-xs text-fg-muted">
        <span>
          &copy; {new Date().getFullYear()} Vaishnavi Tiwari
        </span>
        <span className="text-border">•</span>
        <div className="flex items-center gap-3">
          {iconLinks.map((icon) => (
            <Link
              key={icon.label}
              href={icon.href}
              aria-label={icon.label}
              target={icon.href.startsWith("http") ? "_blank" : undefined}
              rel={icon.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d={icon.path} />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
