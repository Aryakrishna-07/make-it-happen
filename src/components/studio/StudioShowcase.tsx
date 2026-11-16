import studio from "@/assets/studio_environment.png.asset.json";
import { SectionHeader } from "./Primitives";

const specs = [
  ["Walls", "Dark charcoal"],
  ["Vertical", "White LED strips"],
  ["Ceiling", "Parallel LED lines"],
  ["Floor", "Glossy reflective"],
];

export function StudioShowcase() {
  return (
    <section id="studio" className="mx-auto max-w-[1440px] px-5 pb-24 pt-8 md:px-10 md:pb-36">
      <SectionHeader index="02" name="The studio experience" />
      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <h2 className="display-xl text-5xl md:col-span-7 md:text-8xl">One studio.<br /><span className="text-muted-foreground">Every vehicle.</span></h2>
        <p className="self-end text-base leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9">
           Dark walls. Sculpted light. A reflective floor. One carefully composed setting that gives every vehicle room to stand out.
        </p>
      </div>

      <figure className="mt-14">
        <div className="overflow-hidden">
          <img src={studio.url} alt="Dark showroom with vertical LED strips and glossy floor" loading="lazy"
            className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]" />
        </div>
        <figcaption className="grid grid-cols-2 border-t border-border md:grid-cols-4">
          {specs.map(([k, v]) => (
            <div key={k} className="py-5 pr-4 md:py-6">
              <div className="label-mono text-muted-foreground">{k}</div>
              <div className="mt-2 font-display text-lg uppercase md:text-xl">{v}</div>
            </div>
          ))}
        </figcaption>
      </figure>
    </section>
  );
}
