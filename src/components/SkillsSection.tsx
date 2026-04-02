import { motion } from "framer-motion";
import { Search, PenLine, Youtube, BookOpen } from "lucide-react";

const skills = [
  { icon: PenLine, label: "Top 0.1% SEO Blog Writing" },
  { icon: Youtube, label: "YouTube Script Writing" },
  { icon: Search, label: "Keyword Research" },
  { icon: BookOpen, label: "Storytelling" },
];

const SkillsSection = () => (
  <section id="skills" className="py-28">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Skills</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">My Expertise</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {skills.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card/50 p-6 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 text-center group"
          >
            <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
              <s.icon size={20} className="text-accent" />
            </div>
            <span className="text-sm font-semibold text-foreground leading-snug">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
