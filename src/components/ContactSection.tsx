import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, Send, Loader2 } from "lucide-react";
import { useState, FormEvent, useRef } from "react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(formRef.current),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Web3Forms error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <p className="text-muted-foreground leading-relaxed">
              Ready to grow your traffic with premium, human-written content? Get in touch and let's discuss your project.
            </p>
            <div className="space-y-4">
              <a href="mailto:ashutoshwrites.online@gmail.com" className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors duration-200">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail size={16} className="text-accent" />
                </div>
                ashutoshwrites.online@gmail.com
              </a>
              <a href="tel:+919040451510" className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors duration-200">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Phone size={16} className="text-accent" />
                </div>
                +91 9040451510
              </a>
              <a href="https://instagram.com/ashutosh.writes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors duration-200">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Instagram size={16} className="text-accent" />
                </div>
                @ashutosh.writes
              </a>
              <a href="https://linkedin.com/in/ashutosh-mahapatra" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors duration-200">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Linkedin size={16} className="text-accent" />
                </div>
                Ashutosh Mahapatra
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {submitted ? (
              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-10 text-center">
                <p className="text-lg font-semibold text-accent">Thank you!</p>
                <p className="text-sm text-muted-foreground mt-2">I'll get back to you soon.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="access_key" value="8636a3ae-7143-4745-bf1f-5aa9fdde2554" />
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wide">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-all duration-200 w-full justify-center disabled:opacity-60 shadow-sm"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Send Message <Send size={14} /></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
