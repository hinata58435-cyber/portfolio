import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// The portfolio is a standalone static site in public/portfolio; "/" forwards to it.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio — أحوّل الأفكار إلى تجارب رقمية" },
      { name: "description", content: "معرض أعمال في تصميم وتطوير المواقع الإلكترونية." },
      { property: "og:title", content: "Portfolio — أحوّل الأفكار إلى تجارب رقمية" },
      { property: "og:description", content: "معرض أعمال في تصميم وتطوير المواقع الإلكترونية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/portfolio/index.html");
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <a href="/portfolio/index.html" className="text-foreground underline">Portfolio</a>
    </div>
  );
}
