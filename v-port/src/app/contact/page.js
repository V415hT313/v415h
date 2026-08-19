import Link from "next/link";
import BackLink from "@/app/components/BackLink";

export const metadata = {
  title: "Say hi — Vaishnavi",
  description: "Get in touch with Vaishnavi.",
};

export default function ContactPage() {
  return (
    <div className="py-8">
      <BackLink href="/">Back</BackLink>

      <h1 className="mt-6 text-xl font-medium text-fg sm:text-2xl">Say hi</h1>
      <p className="mt-3 max-w-md text-fg-muted">
        My inbox is always open — questions, feedback, or just to say hi, I&apos;ll get back to
        you.
      </p>

      <Link
        href="mailto:vashu2506rkt@gmail.com"
        className="mt-6 inline-flex items-center gap-2 rounded-md border border-accent px-5 py-2.5 text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
      >
        vashu2506rkt@gmail.com
      </Link>
    </div>
  );
}
