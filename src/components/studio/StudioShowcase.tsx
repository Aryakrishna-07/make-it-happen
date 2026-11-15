import studio from "@/assets/studio_environment.png.asset.json";
import { Crosshair, SectionHeader, Tag } from "./Primitives";

const specs = [
  ["Walls", "Dark charcoal"],
  ["Vertical", "White LED strips"],
  ["Ceiling", "Parallel LED lines"],
  ["Floor", "Glossy reflective"],
];

export function StudioShowcase() {
  return (
    <section id="studio" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <SectionHeader index="02" name="The studio experience" />
      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <h2 className="display-xl text-5xl md:col-span-7 md:text-8xl">One studio.<br /><span className="text-muted-foreground">Every vehicle.</span></h2>
        <p className="self-end text-base leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9">
          Upload your vehicle. Let our processing pipeline isolate its original form and place it inside a consistent,
          premium automotive photography environment.
        </p>
      </div>

      <figure className="group relative mt-14 border border-border p-2 md:p-3">
        <Crosshair className="absolute -left-2 -top-2" /><Crosshair className="absolute -right-2 -top-2" />
        <Crosshair className="absolute -bottom-2 -left-2" /><Crosshair className="absolute -bottom-2 -right-2" />
        <div className="relative overflow-hidden">
          <img src={studio.url} alt="Dark showroom with vertical LED strips and glossy floor" loading="lazy"
            className="aspect-[4/5] w-full object-cover grayscale transition-transform duration-[2000ms] group-hover:scale-[1.03] sm:aspect-[16/9]" />
          <div className="absolute inset-0 fade-veil" />
          <div className="absolute left-4 top-4 md:left-6 md:top-6"><Tag className="text-foreground">ENV-01 / Fixed studio</Tag></div>
          <div className="absolute right-4 top-4 hidden md:block"><Tag className="text-foreground">Ceiling LED array</Tag></div>
        </div>
        <figcaption className="grid grid-cols-2 border-t border-border md:grid-cols-4">
          {specs.map(([k, v], i) => (
            <div key={k} className={`p-4 md:p-6 ${i % 2 ? "" : "border-r"} md:border-r border-border last:border-r-0`}>
              <div className="label-mono text-muted-foreground">0{i + 1} — {k}</div>
              <div className="mt-2 font-display text-lg uppercase md:text-xl">{v}</div>
            </div>
          ))}
        </figcaption>
      </figure>
    </section>
  );
}
