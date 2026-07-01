import { Toaster } from "sonner";
import "./globals.css";
export const metadata = {
  title: "Art Meisters | Art Society",
  description:
    "Where creativity meets expression. A community of passionate artists inspiring creativity and celebrating art in all its forms.",
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      >
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem("theme");
              var root = document.documentElement;
              if (theme === "dark" || (!theme && true)) {
                root.classList.add("dark");
                root.style.setProperty("--color-frosty", "#000");
                root.style.setProperty("--color-content", "#fff");
                root.style.setProperty("--overlay", "#fff");
                root.style.setProperty("--text-gradient-from", "#fff");
                root.style.setProperty("--text-gradient-to", "#999");
              } else {
                root.classList.remove("dark");
                root.style.setProperty("--color-frosty", "#F0F6FA");
                root.style.setProperty("--color-content", "#000");
                root.style.setProperty("--overlay", "#000");
                root.style.setProperty("--text-gradient-from", "#000");
                root.style.setProperty("--text-gradient-to", "#555");
              }
            })();
          `
        }} />
      </head>
      <body className="min-h-full bg-frosty flex flex-col font-sans selection:bg-accent ">
          <Toaster richColors/>
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
