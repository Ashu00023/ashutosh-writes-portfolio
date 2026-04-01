import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const highlights = [
  "Specializing in high-performance SEO blog writing",
  "YouTube script writing optimized for retention & virality",
  "Deep keyword research & strategic content planning",
  "Quality over quantity — top 0.1% content positioning",
];

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="container mx-auto px-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">About Me</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Crafting Content That Ranks & Converts
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          I am a freelance content writer who helps creators and businesses generate real traffic from Google and YouTube. My approach combines deep research, strategic keyword targeting, and compelling storytelling to produce content that not only ranks but also converts readers into loyal audiences.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Every piece of content is crafted manually with deep research and strategic intent — <span className="font-semibold text-accent">no AI shortcuts</span>. I believe in quality over quantity, delivering work that positions my clients in the top 0.1%.
        </p>

        <ul className="space-y-3">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-foreground">
              <CheckCircle size={20} className="text-accent mt-0.5 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
