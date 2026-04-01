import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, Send, Loader2 } from "lucide-react";
import { useState, FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    try {
      await emailjs.sendForm(
        "service_pe47co8",
        "template_671jt3b",
        formRef.current,
        "-5yVEqYP6bw57Na7A"
      );
      setSubmitted(true);
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Let's Work Together</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground">
              Ready to grow your traffic with premium, human-written content? Get in touch and let's discuss your project.
            </p>
            <div className="space-y-4">
              <a href="mailto:ashutosh.mahapatra00023@outlook.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <Mail size={18} className="text-primary" /> ashutosh.mahapatra00023@outlook.com
              </a>
              <a href="tel:+919040451510" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <Phone size={18} className="text-primary" /> +91 9040451510
              </a>
              <a href="https://instagram.com/ashutosh.writes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <Instagram size={18} className="text-primary" /> @ashutosh.writes
              </a>
              <a href="https://linkedin.com/in/ashutosh-mahapatra" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <Linkedin size={18} className="text-primary" /> Ashutosh Mahapatra
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
              <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
                <p className="text-lg font-semibold text-accent">Thank you!</p>
                <p className="text-sm text-muted-foreground mt-2">I'll get back to you soon.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input
                    type="email"
                    name="from_email"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity w-full justify-center disabled:opacity-60"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Send Message <Send size={16} /></>}
                </button>
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
