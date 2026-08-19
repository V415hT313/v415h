import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ProfileHeader from "./components/ProfileHeader";
import Footer from "./components/Footer";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "Vaishnavi Tiwari — Backend Engineer",
  description:
    "Vaishnavi Tiwari's personal site — projects, reading notes, and assorted thoughts.",
};

const noFlashScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className={`${sans.variable} ${mono.variable} font-sans`}>
        <main className="flex min-h-screen flex-col bg-bg">
          <div className="container mx-auto max-w-3xl px-6">
            <ProfileHeader />
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
