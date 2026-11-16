import hero from "@/assets/hero_supercar.png.asset.json";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section id="top" className="overflow-hidden pt-20">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10">
        <h1 className="display-xl hero-heading pt-9 text-center text-[32px] sm:text-5xl md:text-[56px] lg:text-[72px] xl:text-[88px]">
          The next<br />
          generation of<br />
          automotive studio.
        </h1>
        <div className="mt-6 md:mt-8">
          <img
            src={hero.url}
            alt="Black hypercar under white LED studio lighting"
            fetchPriority="high"
            width={1200}
            height={618}
            className="hero-photograph mx-auto w-full max-w-[1200px] object-contain"
          />
        </div>
        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row md:py-6">
          <p className="max-w-sm text-center text-sm leading-relaxed text-muted-foreground md:text-left">
            A considered setting for every vehicle.<br />
            Photography and film, brought into the studio.
          </p>
          <Button asChild variant="studio" size="studio"><a href="#workspace">Enter the studio <span aria-hidden>→</span></a></Button>
        </div>
      </div>
    </section>
  );
}
