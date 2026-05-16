import { Helmet } from "react-helmet-async";
import ScriptViewer from "@/components/ScriptViewer";
import thumb from "@/assets/portfolio-dopamine.png";

const url = "https://ashutoshwrites.online/scripts/prediction-is-the-drug";
const title = "Why Your Brain Can't Stop Craving Things — YouTube Script Sample";
const description = "Long-form YouTube script on dopamine, prediction error, and structured boredom — written for a neuroscience and productivity channel.";

const PredictionDrug = () => (
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
      eyebrow="YouTube Script · Neuroscience & Productivity · Portfolio Sample"
      title="Why Your Brain Can't Stop Craving Things"
      subtitle="Reboot Human · ~8 minutes · ~1,030 words · Angle: Prediction Is the Drug"
      metaTable={[
        { label: "Niche", value: "Neuroscience · Behaviour · Productivity" },
        { label: "Target Viewer", value: "Educated 24–38, knowledge economy. Has tried dopamine detox and productivity systems." },
        { label: "Script Angle", value: "Prediction Is the Drug" },
        { label: "Primary Keyword", value: "dopamine detox" },
        { label: "Secondary Keyword", value: "social media addiction" },
        { label: "Word Count", value: "~1,030 words · ~8 min video" },
        { label: "Emotional Arc", value: "Curiosity → Recognition → Discomfort → Anger → Hope → Resolve" },
        { label: "Channel Voice", value: "Trusted, calm, slightly unsettling friend with a neuroscience background. Precise, dry, occasionally wry — never cold." },
        { label: "Master Hook", value: "\"The detox failed because you treated a prediction problem like a pleasure problem.\"" },
        { label: "Writer", value: "Ashutosh Mahapatra · ashutoshwrites.online" },
      ]}
    >
      <h2>Full Script</h2>

      <h3><span className="timecode">0:00–0:45</span> Hook</h3>
      <p><strong>(0:00–0:08)</strong> Dopamine isn't the problem. Your brain's prediction engine is.</p>
      <p><strong>(0:08–0:20)</strong> In 2023, JAMA Pediatrics published something alarming. Adolescent brains showed measurable developmental differences tied to habitual checking. Not after years. During use. The circuit trains while you scroll. While you tell yourself you'll stop soon.</p>
      <p><strong>(0:20–0:30)</strong> There's a name for what you've been feeling — the pull toward things that stopped being pleasurable. That name isn't addiction. It's more precise. More useful. By the end of this, you'll have it.</p>
      <p><strong>(0:30–0:45)</strong> You can be pulled toward something you don't even like anymore. Not things that feel good — things that feel necessary. Relieving or unsettling — pick one. Sit with that. It means something.</p>

      <h3><span className="timecode">0:45–2:00</span> Section 1 — Curiosity</h3>
      <p>Meet Alex.</p>
      <p>Alex has read the Huberman episode notes. Alex keeps a tab open with a productivity system, starting next Monday. Alex went twenty-two days without Instagram once and felt proud of it.</p>
      <p>It's 11pm. Alex picks up the phone. Opens an app silenced three weeks ago. Scrolls four minutes. Puts it down.</p>
      <p>Here's the part worth noticing. No pleasure. No relief. A low hum of tension, not satisfied — quieted. Like scratching a surface that wasn't where the itch was.</p>
      <p>No enjoyment. No information gained. The faint sense of having checked something that needed checking. Alex couldn't say what. The brain already knew.</p>
      <div className="pattern-interrupt"><em>[ Pattern Interrupt ]</em><br/>Ask yourself <em>what you were hoping to find</em>.</div>
      <p>Most people don't have an answer. Not a real one. No missing information. No one to hear from. The pull. The check.</p>
      <p>Alex didn't have an answer either. The brain did — and it had been running that answer for months.</p>

      <h3><span className="timecode">2:00–3:30</span> Section 2 — Recognition</h3>
      <p>This stops being about Alex now.</p>
      <p>Think about the last time you picked up your phone without deciding to. Not a choice — a motion. Hand to pocket. Screen unlocked. App open. Then the sheepish awareness: you're already here, already doing this.</p>
      <p>That lag between action and awareness isn't a focus problem. It's not distraction. A prediction circuit ran faster than your attention could track.</p>
      <p>The brain anticipated a reward before you made a decision. The decision came after. What felt like wanting was the brain already three steps ahead of you.</p>
      <p>The mild disappointment when the check delivers nothing doesn't reduce the urge. It registers for a second, then vanishes. Within minutes the loop starts again. Not because you're compulsive. Not because you lack discipline.</p>
      <div className="pattern-interrupt"><em>[ Pattern Interrupt ]</em><br/><em>You're not weak. You're well-trained.</em></div>
      <p>The system running in the background isn't broken. It does exactly what you trained it to do — one uncompleted check at a time.</p>
      <p>The question isn't why you keep doing it. The question is what your brain expects to receive — and why it never updates when the answer is nothing.</p>

      <h3><span className="timecode">3:30–5:00</span> Section 3 — Discomfort</h3>
      <p>In the 1990s, neuroscientist Wolfram Schultz ran experiments on monkeys. He expected dopamine neurons to fire when the reward arrived. They did — at first. Then the monkeys learned a cue that predicted the reward. Something shifted.</p>
      <p>The dopamine spike moved. It stopped firing at the reward. It fired at the cue — the signal that said reward was coming. When reward was withheld, dopamine dropped below baseline. The brain wasn't tracking pleasure. It was tracking prediction.</p>
      <p>That is a prediction-error signal. Not a pleasure signal.</p>
      <p>Andy Clark brought predictive processing into the mainstream. His argument: the brain isn't a receiver of experience. It's a prediction machine — generating expectations, updating when reality doesn't match.</p>
      <p>Put those two things together. Alex's 11pm scroll becomes clear. Alex's brain had filed the app as a possible resolution. Uncertain outcome. Scrap of novelty. Content was never the point. Checking was.</p>
      <div className="pattern-interrupt"><em>[ Pattern Interrupt ]</em><br/>That itch when the phone is face-down? Not craving. Your brain waiting for an answer to a question it asked without telling you.</div>
      <p>There's a word for this: anticipation on an incomplete loop. The pull without pleasure. The check without satisfaction. The brain generates it, sustains it, and files every unclosed check as a reason to go again.</p>

      <h3><span className="timecode">5:00–6:00</span> Section 4 — Anger</h3>
      <p>The dopamine detox industry sold you abstinence. Twenty-two days. No phone. No social media. Reset the brain. Start fresh. The story works in the moment because abstinence feels powerful. The first three days are clarity. Day seven is pride. Day twenty-two is identity.</p>
      <p>But abstinence ends. The phone comes back. The apps come back. The same boredom, the same stress, the same Tuesday evening — back. The prediction circuit, never retrained, only paused, reactivates. Cue-triggered habit research shows reactivation within hours. Not days. The same context is enough to restart the loop.</p>
      <p>The detox didn't fail because you lacked commitment. It failed because the cue never changed. The context never changed. The brain never sat with an unanswered prediction long enough to update.</p>
      <p>The whole time, you were solving the wrong problem.</p>
      <p>A detox treats abstinence like an answer. The brain treats it like a pause. Those aren't the same thing — and that gap is where every reset fell apart.</p>

      <h3><span className="timecode">6:00–7:00</span> Section 5 — Hope</h3>
      <p>One intervention has actual neuroscience behind it. Not a productivity strategy — a retraining mechanism. No compelling name. No branded protocol. Researchers call it <strong>structured boredom</strong>.</p>
      <p>Here's the design. Wait for the pull — not the absent-minded reach. The conscious one. You know you want to check. There's no real reason. That's the moment. You wait. Ten minutes. No phone, no music, no substitution. Sit with the open loop.</p>
      <p>That threshold matters. This applies when the urge is present and the check would be automatic. Not when you're looking something up. When the pull has no object.</p>
      <p>What happens neurologically: the cue fires. Anticipation builds. No reward arrives. The prediction system registers the mismatch. Repeat across days, and the cue stops generating the same anticipation. The loop weakens at its source.</p>

      <h3><span className="timecode">7:00–8:00</span> Section 6 — Resolve & Close</h3>
      <p>Dopamine isn't the problem. The prediction engine is.</p>
      <p>That line lands another way now. Not a correction to the standard story — a description of something you've felt. The low hum. The pull without pleasure. The check that answered nothing and still felt necessary.</p>
      <p>Alex figured this out on a Wednesday. No detox. No app blocker. No system. Alex felt the pull, saw the loop trying to run, and put the phone face-down on the table. Sat in a plain wooden chair in a quiet kitchen. Let the discomfort build and peak — and do nothing with nowhere to go.</p>
      <span className="stat-line">Eleven minutes. That's how long before it eased.</span>
      <p>Not fixed. Not reset. <strong>Updated.</strong> One small filing in the prediction system: cue ran, no payoff, survived.</p>
      <p>That's not a dramatic ending. Dramatic endings don't retrain anything.</p>
      <p>If this named something real for you, the next video goes further. What happens in the brain when retraining actually works.</p>

      <h2>SEO Title Options Delivered With Script</h2>
      <table className="doc-table">
        <thead><tr><th>#</th><th>Title</th><th>Hook Mechanism</th></tr></thead>
        <tbody>
          <tr><td>1 ★</td><td>Your Brain Isn't Addicted to Dopamine — It's Addicted to Prediction</td><td>Reframes the core belief immediately</td></tr>
          <tr><td>2</td><td>Why Every Dopamine Detox Eventually Fails</td><td>Loss-aversion + curiosity gap</td></tr>
          <tr><td>3</td><td>The Real Reason You Can't Put Your Phone Down</td><td>Identity recognition</td></tr>
          <tr><td>4</td><td>Neuroscience Says Dopamine Isn't What You Think</td><td>Authority + contradiction</td></tr>
          <tr><td>5</td><td>This 11-Minute Habit Retrains Your Brain (Not a Detox)</td><td>Specificity + mechanism</td></tr>
          <tr><td>6</td><td>The Prediction Loop That Owns Your Attention</td><td>Concept hook</td></tr>
        </tbody>
      </table>

      <h2>Process Behind This Script</h2>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", lineHeight: 1.8 }}>
        Stage 1 — Niche &amp; channel-voice mapping<br/>
        Stage 2 — Keyword + audience-intent research<br/>
        Stage 3 — Five angle development with emotional trigger mapping<br/>
        Stage 4 — Hook architecture (4-part, timed to second)<br/>
        Stage 5 — Full script outline with pattern-interrupt placement<br/>
        Stage 6 — Full script draft with Alex composite character arc<br/>
        Stage 7 — Four rounds of editing (Grade 6 → Grade 5, 16 very-hard sentences → 3)<br/>
        Stage 8 — Surgical attention-drop fixes, section by section<br/>
        <br/>
        Final word count: 1,030 words · ~8-minute runtime
      </p>
    </ScriptViewer>
  </>
);

export default PredictionDrug;