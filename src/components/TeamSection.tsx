import { team } from "@/data/team";
import { useReveal } from "@/hooks/useReveal";

const TeamSection = () => {
  const [ref, seen] = useReveal<HTMLDivElement>();
  return (
    <section id="team" className="rd-sec rd-sand">
      <div className="rd-wrap">
        <div className="rd-hd">
          <h2 className="rd-big">Our Team</h2>
          <p>
            Research and editorial direction from the founder. Front-end engineering and technical SEO from the
            specialists who build every page.
          </p>
        </div>
        <div ref={ref} className="rd-team">
          {team.map((m, i) => (
            <article key={m.name} className={`rd-mem${seen ? " rd-v" : ""}`} data-r style={{ "--d": i } as React.CSSProperties}>
              <div className="rd-plate" aria-hidden="true">{m.initials}</div>
              <h3>{m.name}</h3>
              <p className="rd-role">{m.role}</p>
              <p className="rd-spec">{m.focus}</p>
              {m.bio && <p className="rd-bio">{m.bio}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
