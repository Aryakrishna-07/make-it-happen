import hero from "@/assets/hero_supercar.png.asset.json";
import { Crosshair, Tag } from "./Primitives";

export function HeroSection() {
  return (
    <section id="top" className="tech-grid relative flex min-h-svh flex-col overflow-hidden pt-16">
      {/* circular technical markings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[140vw] max-w-[1100px] max-h-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border md:size-[80vw]" />
      <div className="animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 size-[110vw] max-w-[820px] max-h-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border md:size-[60vw]" />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 md:px-10">
        <div className="flex justify-between pt-8 md:pt-10">
          <Tag>Precision compositing</Tag>
          <Tag className="hidden sm:inline">Studio environment</Tag>
        </div>

        <h1 className="display-xl animate-reveal relative z-0 mt-8 text-center text-[11.5vw] md:mt-6 md:text-[8.4vw] xl:text-[7.6rem]">
          The next<br />
          <span className="whitespace-nowrap text-ghost-type">generation of</span><br />
          automotive studio.
        </h1>

        {/* car overlaps the typography */}
        <div className="relative z-10 -mt-[10vw] md:-mt-[9vw] xl:-mt-36">
          <img
            src={hero.url}
            alt="Black hypercar under white LED studio lighting"
            className="animate-slow-zoom mx-auto w-full max-w-[1200px] object-cover [mask-image:radial-gradient(ellipse_70%_75%_at_50%_55%,black_55%,transparent_100%)]"
          />
          <div className="absolute left-[8%] top-[30%] hidden items-center gap-2 lg:flex">
            <Crosshair /><Tag>AI vehicle segmentation</Tag>
          </div>
          <div className="absolute bottom-[18%] right-[6%] hidden items-center gap-2 lg:flex">
            <Tag>Frame 001 / Reflection pass</Tag><Crosshair />
          </div>
        </div>

        <div className="relative z-20 mt-6 grid gap-6 pb-10 md:-mt-12 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Transform ordinary vehicle photographs and footage into premium automotive studio visuals.
          </p>
          <a href="#workspace" className="group label-mono inline-flex items-center justify-center gap-3 bg-primary px-7 py-4 text-primary-foreground transition-all hover:gap-5">
            Enter the studio <span aria-hidden>→</span>
          </a>
          <div className="hidden justify-end md:flex"><Tag>Scroll / 01—07</Tag></div>
        </div>
      </div>
    </section>
  );
}
