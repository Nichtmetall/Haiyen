import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { LOGOS } from "./data";

export const Marquee = () => (
  <section id="entdecken" className="brand-carousel" aria-label="Unsere Pflegemarken">
    <FadeIn delay={0.08}>
      <div className="brand-carousel-heading section-shell">
        <p className="eyebrow">Gutes Handwerk. Ausgewählte Pflege.</p>
      </div>
    </FadeIn>
    <FadeIn delay={0.2}>
      <div className="brand-carousel-window">
        <div className="brand-carousel-track">
          {[0, 1, 2].map(copy => (
            <div className="brand-carousel-group" key={copy} aria-hidden={copy > 0}>
              {LOGOS.map(logo => (
                <div className="brand-carousel-logo" key={logo.alt}>
                  <Image src={logo.src} alt={copy === 0 ? logo.alt : ""} fill sizes="150px" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  </section>
);
export default Marquee;
