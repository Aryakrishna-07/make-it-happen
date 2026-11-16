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
      <div className="mt-14 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
        {tech.map(([name, role]) => (
          <div key={name} className="border-t border-border py-8">
            <div className="font-display text-3xl font-medium uppercase md:text-4xl">{name}</div>
            <div className="mt-3 text-sm text-muted-foreground">{role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
