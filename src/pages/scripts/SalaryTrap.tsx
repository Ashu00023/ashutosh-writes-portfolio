import { Helmet } from "react-helmet-async";
import ScriptViewer from "@/components/ScriptViewer";
import thumb from "@/assets/portfolio-tds-deducted.png";

const url = "https://ashutoshwrites.online/scripts/salary-trap";
const title = "Why 90% of Salaried People Never Build Real Wealth — YouTube Script Sample";
const description = "An 8-minute long-form YouTube script for an Indian personal finance channel — Hindi voice, structured for retention with pattern interrupts, humor beats, and a six-stage emotional arc.";

const SalaryTrap = () => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={thumb} />
    </Helmet>
    <ScriptViewer
      eyebrow="YouTube Script · Indian Personal Finance · Portfolio Sample"
      title="Why 90% of Salaried People Never Build Real Wealth"
      subtitle="An 8-minute long-form script written for a 27-year-old salaried Indian professional."
      metaTable={[
        { label: "Format", value: "YouTube Long-Form Script" },
        { label: "Runtime", value: "8 minutes max · 1,079 words" },
        { label: "Target Viewer", value: "27-year-old salaried Indian professional · ₹40,000–₹80,000/month" },
        { label: "Primary Keyword", value: "Escaping the Middle Class Trap" },
        { label: "Secondary Keyword", value: "Middle Class Trap India" },
        { label: "Angle", value: "Discipline Was Never Enough" },
        { label: "Emotional Arc", value: "Curiosity → Recognition → Discomfort → Anger → Hope → Resolve" },
        { label: "Humor Beats", value: "3 placed beats — laugh AT the system, never AT the viewer" },
        { label: "Written By", value: "Ashutosh Mahapatra · ashutoshwrites.online" },
      ]}
    >
      <h2>Pre-Script: Psychological Hook Add-ons</h2>
      <p><em>These elements appear before or alongside the script in production. Each triggers a specific psychological response within the first 5 seconds.</em></p>
      <p><strong>01 · Open Loop Title Card (0:00)</strong> — Flash on screen before the first spoken word: "The advice was correct. It still was not enough." Hold 1.5 seconds. No music. Cut to face.</p>
      <p><strong>02 · Social Proof Anchor (0:03)</strong> — Bottom-left chyron: "Based on RBI data, SEBI investor surveys & Raghuram Rajan's public statements." Builds credibility before the viewer decides to stay.</p>
      <p><strong>03 · Curiosity Gap Number Flash (0:10)</strong> — Flash ₹70,578 on screen in large red type — no context, no label — just the number for 2 seconds while the salary line is spoken. The brain reaches for meaning. That reach keeps people watching.</p>
      <p><strong>04 · Identity Mirror Line (pre-roll caption)</strong> — "If you have the SIP app downloaded and have not started — this video was made for you." Specificity creates identification. Identification creates retention.</p>
      <p><strong>05 · Pattern Interrupt Visual Cue (editor note)</strong> — Every [PATTERN INTERRUPT] marker = hard cut to black for 8 frames, then return. Pair with a single low bass note or silence drop. Resets viewer attention before it drifts.</p>
      <p><strong>06 · Progress Bar Psychology (editor note)</strong> — Thin red progress bar at the bottom of frame for the entire runtime. Viewers who see how far they are stay longer to complete it. Completion is an algorithm signal.</p>

      <h2>Full Script</h2>

      <h3><span className="timecode">0:00–0:45</span> Hook</h3>
      <p>The most disciplined people in India are also the most quietly overlooked.</p>
      <p>Someone earned ₹50,000 a month in 2015. Every raise. Every review. Every increment — earned. Today they take home ₹1,20,558. Sounds like a success story. Run it through inflation. In real purchasing power, that salary is worth ₹70,578. Ten years of discipline. Ten years of delivering. And the system returned them a ₹50,000 pay cut in real terms.</p>
      <p>By the end of this, you will not walk away with a new investment tip. You will walk away understanding why the tips were never the problem — and what nobody told you the tips alone cannot fix.</p>
      <p>Here is what rarely gets said. The advice was correct. Spend less. Save more. Invest early. Sound advice. And it was designed for a game where the rules quietly favour a different kind of player.</p>
      <div className="transition">Transition · Here is what that game looks like from the inside.</div>

      <h3><span className="timecode">0:45–2:00</span> Section 1 — The Trap</h3>
      <p>Meet Rahul. Thirty-one. Software engineer in Bengaluru. Pulls ₹65,000 a month. Knows what a SIP is. Has watched the videos. Has the app downloaded.</p>
      <div className="humor-beat"><strong>Humor Beat</strong>He has been about to start his SIP since approximately 2019.</div>
      <p>Next month. After the credit card clears. After the rent. After Diwali. After the bonus. After things settle.</p>
      <div className="pattern-interrupt"><em>[ Pattern Interrupt — Cut / Visual Shift ]</em><br/>Here is the thing about "after things settle." Things do not settle. They do not have a settling mode. They have a "new thing" mode and a "slightly more expensive thing" mode. That is the full menu.</div>
      <p>Rahul is not careless. He is not undisciplined. He is doing precisely what the system trained him to do. Optimise spending. Chase the next increment. Plan for a future that stays twelve months away. Salary arrives on the 1st. Tax leaves before he sees it. Rent, EMI, groceries, parents. What remains is what he is supposed to build wealth with.</p>
      <p>What remains never feels like a foundation. It feels like survival — with a better job title.</p>
      <p>Here is the question nobody asks at the annual review. If your salary doubled tomorrow — would you actually be free? Or would you become a more expensive version of this? Still selling hours. Still one layoff away from the whole structure collapsing.</p>
      <p>Doubling the number does not change the game. It just raises the stakes inside the same trap.</p>
      <div className="transition">Transition · That is the trap. Now look at the math nobody shows you alongside your offer letter.</div>

      <h3><span className="timecode">2:00–3:30</span> Section 2 — The Math</h3>
      <p>One number. ₹6,00,000. That is what a ₹5,000-per-month SIP produces over ten years in pure principal. Your money. Your consistency.</p>
      <div className="humor-beat"><strong>Humor Beat</strong>Your sacrifice of roughly four dinners out per month.</div>
      <p>Now here is what that same money does inside Indian equity markets compounding at a rate the Nifty 50 has historically delivered. ₹12,06,994. Same ten years. Same ₹5,000. The money did not sit idle. It worked. It earned on previous earnings. It grew on its own growth.</p>
      <span className="stat-line">₹6,06,994 created without a single additional hour of your time.</span>
      <div className="pattern-interrupt"><em>[ Pattern Interrupt — Cut / Visual Shift ]</em><br/>That money grew while someone slept. Your salary has never once grown while you slept. Every rupee your salary produced required your physical presence. Your output. Your continued employment. Your willingness to sit through a one-hour meeting that needed to be a two-line message.</div>
      <div className="humor-beat"><strong>Humor Beat</strong>Stop working — salary stops. Capital does not clock out. Capital has no feelings about Monday mornings.</div>
      <p>That is the mechanical difference between labor income and capital income. And that difference — more than spending habits, more than lifestyle choices — determines who builds lasting wealth and who builds a comfortable life that stops the moment they do.</p>
      <div className="transition">Transition · This is not a math problem. It is a design problem. And it was designed deliberately.</div>

      <h3><span className="timecode">3:30–5:15</span> Section 3 — The System</h3>
      <p>Picture two taps. The first tap is your salary. It flows only when you are there turning it. Step away — it stops. The second tap is capital. You fill a tank. The tank feeds itself. You can sleep. You can switch jobs. You can take that trip to Goa. The tank keeps filling.</p>
      <p>India's economy runs on both taps. Most salaried people only own the first one.</p>
      <div className="pattern-interrupt"><em>[ Pattern Interrupt — Editor Note ]</em><br/>Display on screen as chyron during this beat — "Labour wage rates are not rising the way they typically do in a fast-growing economy." — Raghuram Rajan, 2024. White text. Dark background. Hold 3 seconds.</div>
      <p>Raghuram Rajan — former Governor of the Reserve Bank of India — said this on record. The economy is expanding. Corporate profits are climbing. Yet workers are not capturing a proportionate share of that growth. When the person who ran India's monetary policy says wages are falling behind, that is a structural diagnosis.</p>
      <p>Rahul did not cause this. His employer did not cause this. This is the architecture of an economy designed to reward ownership. Not hours.</p>
      <div className="humor-beat"><strong>Humor Beat</strong>The tax code says it without apology. TDS leaves Rahul's salary before he touches it. Slab rates cut again. Long-term capital gains on listed equity are taxed at 12.5% above the exemption — after compounding has already happened. The system taxes labour first, hardest, immediately. It taxes capital last, lightly, after wealth is already created. That is not an oversight. That is a philosophy.</div>
      <div className="transition">Transition · So if the system is not going to rebalance itself — what do you do inside it?</div>

      <h3><span className="timecode">5:15–6:30</span> Section 4 — The Turn</h3>
      <p>You stop being only a labour-income player inside it. That is the move. Not a motivational answer. A structural one.</p>
      <p>The real wealth gap is not between those who spend and those who save. It is between those whose money stops when they do — and those whose money keeps moving when they rest.</p>
      <div className="pattern-interrupt"><em>[ Pattern Interrupt — Cut / Visual Shift ]</em><br/>When you put ₹5,000 into a SIP, you are not saving. You are purchasing an ownership stake in companies that will generate returns whether you show up tomorrow or not. That is not a tip. That is a category shift. You become — in a small, compounding, unstoppable way — an owner.</div>
      <p>Now here is the urgency no one hands you with a brochure. At the return rate the Nifty has historically delivered, one year missed at the start requires more than three years of extra contributions later to recover. The compounding clock does not pause for credit card cycles. It started without you. It will keep moving without you.</p>
      <p>The entry point is not ₹5,00,000 in the bank. It is the first month your capital earns while you sleep. That can begin at ₹500.</p>
      <p>Here is exactly how. Open any UPI-linked investment app. Search Nifty 50 Index Fund. Set a monthly auto-pay for the 2nd of every month — one day after salary hits. ₹500. ₹1,000. Whatever the number is today. Start there. The amount scales. The habit does not wait.</p>
      <div className="transition">Transition · The goal was never just to earn more. The goal was always to own something that earns for you.</div>

      <h3><span className="timecode">6:30–8:00</span> Close + CTA</h3>
      <p>The most disciplined people in India are also the most quietly overlooked.</p>
      <p>Not because they lack ability. Not because they made wrong choices. But because they played only one side of a two-sided game — and nobody handed them a rulebook for the other side.</p>
      <p>Rahul is opening his SIP this month. Not because his salary suddenly grew. Because he has made the only decision that actually changes the trajectory: stop waiting for the perfect moment and claim the category. The money was never the missing condition. The decision was.</p>
      <p>Two people. Same city. Same salary. Same work ethic. One spends thirty years becoming an exceptional employee. The other spends thirty years letting capital compound alongside their career. After thirty years — they are not in the same income bracket. They are not in the same conversation. They are not in the same world.</p>
      <p>The difference was not intelligence. Not privilege. Not luck. It was one decision — made on one unremarkable Tuesday — to stop waiting for the right month and start owning instead.</p>
      <p>You have the discipline. You have always had it. Now you have the framework.</p>
      <p><strong>The only question left is: are you going to stay an earner — or become an owner?</strong></p>
      <p>Send this to the group chat where everyone complains about their appraisal every March. Tell them the appraisal was never the problem. The category was.</p>

      <h2>Thumbnail Text Options</h2>
      <p><em>Each option targets a different psychological trigger. Pick one — never combine two on the same thumbnail.</em></p>
      <table className="doc-table">
        <thead>
          <tr><th>Trigger</th><th>Thumbnail Text</th></tr>
        </thead>
        <tbody>
          <tr><td>Betrayal</td><td>"Your Salary Is Working Against You"</td></tr>
          <tr><td>Shock / Data</td><td>"₹70,578. That's What Your Raise Was Actually Worth."</td></tr>
          <tr><td>Identity Shift</td><td>"Earners Stay Poor. Owners Get Rich. Pick One."</td></tr>
          <tr><td>Curiosity Gap</td><td>"The Math Your Boss Will Never Show You"</td></tr>
          <tr><td>Loss Aversion</td><td>"Every Month You Wait Costs You ₹6,06,994"</td></tr>
          <tr><td>Disillusionment</td><td>"You Did Everything Right. That Was the Problem."</td></tr>
        </tbody>
      </table>
    </ScriptViewer>
  </>
);

export default SalaryTrap;