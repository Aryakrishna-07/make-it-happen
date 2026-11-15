import { SectionHeader } from "./Primitives";

const tech = [
  ["YOLO", "Vehicle detection"],
  ["SAM 2", "Vehicle segmentation"],
  ["OpenCV", "Image processing"],
  ["PaddleOCR", "Number plate recognition"],
  ["Blender", "Studio environment"],
  ["FFmpeg", "Video processing"],
  ["FastAPI", "Backend infrastructure"],
];

export function TechnologySection() {
  return (
    <section id="technology" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <SectionHeader index="06" name="Technology" />
      <h2 className="display-xl mt-12 text-5xl md:text-8xl">Engineered for<br /><span className="text-muted-foreground">precision.</span></h2>
      <div className="mt-14 grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {tech.map(([name, role], i) => (
          <div key={name} className="group relative border-b border-r border-border p-6 transition-colors hover:bg-card md:p-8">
            <div className="label-mono text-muted-foreground">T-{String(i + 1).padStart(2, "0")}</div>
            <div className="mt-10 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">{name}</div>
            <div className="label-mono mt-3 text-muted-foreground transition-colors group-hover:text-primary">{role}</div>
          </div>
        ))}
        <div className="hidden border-b border-r border-border p-8 lg:flex lg:items-end">
          <span className="label-mono text-muted-foreground">[ Pipeline / 07 modules ]</span>
        </div>
      </div>
    </section>
  );
}
