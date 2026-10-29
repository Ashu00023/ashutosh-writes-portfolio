import CitedExcerpt from "@/components/CitedExcerpt";
import { usualRoute } from "@/data/site";

const LedgerSection = () => (
  <section id="ledger" className="rd-sec rd-sand">
    <div className="rd-wrap">
      <div className="rd-hd">
        <h2 className="rd-big">Every article ships with its source ledger.</h2>
        <p>
          The ledger lists each statistic in the article, its primary source, its date and what that source does and does not prove. Your readers, and your compliance team, can check it without trusting us.
        </p>
      </div>

      <div className="st-ledger">
        <CitedExcerpt />
      </div>

      <div className="rd-chain">
        <div>
          <h3>Normally, an article passes through four people</h3>
          <ol>
            {usualRoute.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
        <div className="rd-one">
          <h3>With us, one handoff</h3>
          <p>
            A finished article, with Schema built in and the ledger behind it, as a Google Doc or a fully coded page. Researched, written and checked by one team, so nothing is lost between roles. If you already have an SEO team or agency, the handoff goes to them, in their format.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default LedgerSection;
