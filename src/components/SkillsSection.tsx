import { motion } from "framer-motion";
import { Search, PenLine, Youtube, BookOpen } from "lucide-react";

const skills = [
  { icon: PenLine, label: "Top 0.1% SEO Blog Writing" },
  { icon: Youtube, label: "YouTube Script Writing" },
  { icon: Search, label: "Keyword Research" },
  { icon: BookOpen, label: "Storytelling" },
];

const SkillsSection = () => (
  <section id="skills" className="py-24">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Skills</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">My Expertise</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
        {skills.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-background p-6 hover:border-primary/40 transition-colors text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <s.icon size={22} className="text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
