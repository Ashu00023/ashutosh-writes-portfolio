import { useRef } from "react";
import { clamp, reducedMotion, useScrollFrame } from "@/hooks/useScrollFrame";

const statement =
  "I am Ashutosh, founder of Ashutosh Writes, a three-person writing and engineering team in Bhubaneswar, India. We write source-verified articles for fintech and AI-security teams.";
const words = statement.split(" ");

const highlights = [
  "Articles built around search intent and the questions AI engines answer",
  "Answer-first headings, extractable facts and Schema that mirrors the page",
  "Original research, primary sources, and stated limits on every claim",
  "Judgment and final decisions made by a human editor",
];

const AboutSection = () => {
  const el = useRef<HTMLParagraphElement>(null);

  useScrollFrame(() => {
    const node = el.current;
    if (!node) return;
    const vh = window.innerHeight;
    const p = reducedMotion() ? 1 : clamp((vh * 0.82 - node.getBoundingClientRect().top) / (vh * 0.42));
    Array.from(node.children).forEach((child, i) => {
      (child as HTMLElement).style.opacity = String(0.6 + 0.4 * clamp(p * (words.length + 5) - i));
    });
  });

  return (
    <section id="about" className="rd-sec">
      <div className="rd-wrap">
        <h2 style={{ fontSize: "1.4rem" }}>Research first. Writing second.</h2>
        <p className="rd-ab" ref={el}>
          {words.map((w, i) => (
            <span key={i}>{w}{i < words.length - 1 ? " " : ""}</span>
          ))}
        </p>
        <div className="rd-ag">
          <div>
            <p>
              I specialize in long-form articles built on understanding the subject, finding reliable evidence, identifying what existing coverage misses, and turning that research into something people can actually understand.
            </p>
            <p className="rd-disc">
              I use AI where it improves research and workflow efficiency, but the argument, judgment, structure and
              final decisions remain mine.
            </p>
          </div>
          <ul className="rd-hl">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
