import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/studio/Navbar";
import { HeroSection } from "@/components/studio/HeroSection";
import { StudioShowcase } from "@/components/studio/StudioShowcase";
import { UploadWorkspace } from "@/components/studio/UploadWorkspace";
import { TechnologySection } from "@/components/studio/TechnologySection";
import { Footer } from "@/components/studio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Automotive Studio — Precision in every frame" },
      { name: "description", content: "Your vehicle, reimagined in its own studio. Upload a photo or video and place it in a premium LED studio." },
      { property: "og:title", content: "AI Automotive Studio — Precision in every frame" },
      { property: "og:description", content: "Your vehicle, reimagined in its own studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <StudioShowcase />
      <UploadWorkspace />
      <TechnologySection />
      <Footer />
    </main>
  );
}
