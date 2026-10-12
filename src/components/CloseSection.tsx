import { EMAIL } from "@/data/site";

const CloseSection = () => (
  <section className="rd-sec rd-sand st-close">
    <div className="rd-wrap st-center">
      <h2>Send us one article. We&rsquo;ll check every claim in it.</h2>
      <p className="st-lede" style={{ margin: "20px auto 0" }}>
        A few free Article Checks each month. You get a written report of what we found, whether or not we ever work together.
      </p>
      <div className="rd-btns">
        <a className="rd-b1" href="/contact">Get a free Article Check</a>
        <a className="rd-b2" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    </div>
  </section>
);

export default CloseSection;
