import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, MessageCircle } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "ashutoshwrites.online@gmail.com",
    href: "mailto:ashutoshwrites.online@gmail.com",
  },
  {
    icon: Phone,
    label: "+91 9040451510",
    href: "tel:+919040451510",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/919040451510",
  },
  {
    icon: Instagram,
    label: "@ashutosh.writes",
    href: "https://instagram.com/ashutosh.writes",
  },
  {
    icon: Linkedin,
    label: "Ashutosh Mahapatra",
    href: "https://linkedin.com/in/ashutosh-mahapatra",
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Let's Work Together</h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Ready to grow your traffic with premium, human-written content? Reach out through any channel below.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto space-y-4">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/50 px-6 py-4 hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <c.icon size={18} className="text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                {c.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
