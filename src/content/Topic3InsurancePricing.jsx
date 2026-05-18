import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'

export default function Topic3InsurancePricing() {
  return (
    <>
      <p className="sg-prose">
        In the previous topics we saw how compound distributions separate total loss into <strong>frequency</strong> (how many claims?) and <strong>severity</strong> (how large is each claim?). We also introduced the GLM framework for modelling non-normal data. Now we combine these ideas: we use a Poisson GLM with a log link to model <em>claim frequency</em> as a function of policyholder risk factors, forming the basis of non-life insurance pricing.
      </p>

      <h3 className="sg-sub">The Car Insurance Dataset</h3>

      <p className="sg-prose">
        Consider a stylized dataset from a car insurance company. Each row is a <strong>risk category</strong> — a combination of gender (1 = female, 2 = male) and residential area (1 = countryside, 2 = elsewhere, 3 = big city):
      </p>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Record</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Gender</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Area</th>
              <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}>Claims</th>
              <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}>Claim size (€1k)</th>
              <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}>Policies</th>
              <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}>Exposure (yr)</th>
            </tr>
          </thead>
          <tbody>
            {[
              [1, 'F', 1, '383', '1,582', '5,383', '5,000'],
              [2, 'F', 2, '919', '2,234', '11,471', '10,000'],
              [3, 'F', 3, '2,259', '2,258', '21,825', '20,000'],
              [4, 'M', 1, '731', '2,895', '11,890', '10,000'],
              [5, 'M', 2, '1,538', '3,790', '21,748', '20,000'],
              [6, 'M', 3, '4,030', '4,057', '42,627', '40,000'],
            ].map(([rec, g, a, claims, size, policies, expo]) => (
              <tr key={rec} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2">{rec}</td>
                <td className="px-4 py-2">{g}</td>
                <td className="px-4 py-2">{a}</td>
                <td className="px-4 py-2 text-right">{claims}</td>
                <td className="px-4 py-2 text-right">{size}</td>
                <td className="px-4 py-2 text-right">{policies}</td>
                <td className="px-4 py-2 text-right">{expo}</td>
              </tr>
            ))}
            <tr style={{ fontWeight: 600 }}>
              <td className="px-4 py-2" colSpan={3}>Totals</td>
              <td className="px-4 py-2 text-right">9,860</td>
              <td className="px-4 py-2 text-right">16,816</td>
              <td className="px-4 py-2 text-right">114,944</td>
              <td className="px-4 py-2 text-right">105,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Note>
        <p>
          <strong>Exposure vs. number of policies.</strong> The exposure (in years) is <em>smaller</em> than the number of policies because not every policy was in force for the full calendar year. A policy started in July contributes only 0.5 years of exposure. This distinction turns out to be critical for correctly estimating claim frequencies.
        </p>
      </Note>

      <h3 className="sg-sub">Simple Poisson Model (No Risk Factors)</h3>

      <p className="sg-prose">
        Before introducing risk factors, suppose all policyholders share the same claim frequency. We model each policyholder's claim count as:
      </p>

      <MathBlock math={"Y_i \\sim \\text{Poisson}(\\lambda)"} display />

      <p className="sg-prose">
        The log-likelihood for a sample <MathBlock math={"y_1, \\ldots, y_n"} /> is:
      </p>

      <MathBlock math={"\\ell(\\lambda; \\vec{y}) = \\log \\prod_{i=1}^{n} f_{Y_i}(y_i; \\lambda) = -n\\lambda + \\sum_{i=1}^{n} y_i \\log \\lambda - \\sum_{i=1}^{n} \\log y_i!"} display />

      <Theorem title="MLE Without Exposure">
        <p>Setting the derivative equal to zero and solving:</p>
        <MathBlock math={"\\frac{d}{d\\lambda} \\ell(\\lambda; \\vec{y}) = -n + \\frac{1}{\\lambda}\\sum_{i=1}^{n} y_i = 0 \\quad \\Longrightarrow \\quad \\hat{\\lambda} = \\frac{\\sum_{i=1}^{n} y_i}{n}"} display />
        <p>The MLE is simply the sample mean: total claims divided by number of policies.</p>
      </Theorem>

      <Example title="MLE Without Exposure (Table 1)">
        <p>Using our dataset:</p>
        <MathBlock math={"\\hat{\\lambda} = \\frac{9{,}860}{114{,}944} = 0.0858"} display />
        <p>So on average each policy generates 0.0858 claims, or equivalently, we expect 1 claim per <MathBlock math={"1/0.0858 \\approx 12"} /> policies.</p>
      </Example>

      <h3 className="sg-sub">Incorporating Exposure</h3>

      <p className="sg-prose">
        The simple model above ignores that policies have different durations. A policy in force for only 6 months should naturally generate fewer claims than one active all year. We incorporate this by letting <MathBlock math={"w_i"} /> denote the <strong>exposure</strong> (in years) for policy <MathBlock math={"i"} />, and modelling:
      </p>

      <MathBlock math={"Y_i \\sim \\text{Poisson}(\\lambda \\cdot w_i)"} display />

      <p className="sg-prose">
        The expected number of claims is now proportional to the time the policy is active. The log-likelihood becomes:
      </p>

      <MathBlock math={"\\ell(\\lambda; \\vec{y}, \\vec{w}) = \\sum_{i=1}^{n} \\left(-\\lambda w_i + y_i \\log(\\lambda w_i) - \\log y_i!\\right)"} display />

      <Theorem title="MLE With Exposure">
        <p>Differentiating with respect to <MathBlock math={"\\lambda"} /> and setting equal to zero:</p>
        <MathBlock math={"\\frac{d}{d\\lambda} \\ell = \\sum_{i=1}^{n} \\left(-w_i + \\frac{y_i}{\\lambda}\\right) = \\lambda^{-1} \\sum_{i=1}^{n} y_i - \\sum_{i=1}^{n} w_i = 0"} display />
        <MathBlock math={"\\Longrightarrow \\quad \\hat{\\lambda} = \\frac{\\sum_{i=1}^{n} y_i}{\\sum_{i=1}^{n} w_i}"} display />
        <p>The MLE is now total claims divided by <em>total exposure</em>, not total policies.</p>
      </Theorem>

      <Example title="MLE With Exposure (Table 1)">
        <p>Using our dataset:</p>
        <MathBlock math={"\\hat{\\lambda} = \\frac{9{,}860}{105{,}000} = 0.0939"} display />
        <p>
          This is <strong>higher</strong> than the 0.0858 we found without exposure. That makes sense: by ignoring the fact that many policies were active for less than a full year, we were <em>underestimating</em> the annual claim frequency. The correct interpretation: each policy-year generates 0.0939 claims on average — roughly 1 claim per 11 policy-years.
        </p>
      </Example>

      <Note>
        <p>
          <strong>Why the difference matters.</strong> If we ignore exposure, we underestimate the annual claim frequency by about 9%. For a portfolio of 100,000 policies, this would mean underpricing premiums significantly — a costly mistake for the insurer.
        </p>
      </Note>

      <h3 className="sg-sub">Poisson GLM for Claim Frequency</h3>

      <p className="sg-prose">
        In reality, different policyholders have different risk profiles. We want to let the claim frequency <MathBlock math={"\\lambda_i"} /> depend on risk factors (age, region, gender, etc.) while still being proportional to exposure <MathBlock math={"w_i"} />. This is exactly a Poisson GLM with a log link.
      </p>

      <Definition title="Poisson GLM for Claim Frequency">
        <p>The statistical model is:</p>
        <MathBlock math={"Y_i \\sim \\text{Poisson}\\big(\\lambda_i = \\exp(\\eta_i)\\big)"} display />
        <p>where the linear predictor includes an <strong>offset</strong> for the log-exposure:</p>
        <MathBlock math={"\\eta_i = \\log w_i + \\sum_{j=1}^{p} \\beta_j x_{ji}"} display />
        <p>Equivalently:</p>
        <MathBlock math={"\\lambda_i = w_i \\cdot \\exp\\!\\left(\\sum_{j=1}^{p} \\beta_j x_{ji}\\right)"} display />
        <p>The term <MathBlock math={"\\log w_i"} /> is called the <strong>offset</strong> — it enters the linear predictor with a fixed coefficient of 1 (not estimated).</p>
      </Definition>

      <Note>
        <p>
          <strong>Why an offset and not a regular covariate?</strong> If we included <MathBlock math={"\\log w_i"} /> as a regular risk factor, its coefficient would be estimated from the data and might differ from 1. But we <em>know</em> from the model that claim frequency is proportional to exposure — doubling the exposure period should double the expected claims. The offset enforces this structural constraint.
        </p>
      </Note>

      <p className="sg-prose">
        Because of the log link, this model is <strong>multiplicative</strong>: the expected number of claims is:
      </p>

      <MathBlock math={"\\text{E}[Y_i] = w_i \\cdot \\exp(\\beta_1) \\cdot \\exp(\\beta_2 x_{2i}) \\cdots \\exp(\\beta_p x_{pi})"} display />

      <p className="sg-prose">
        Each risk factor acts as a <em>multiplier</em> on the base claim frequency. For instance, if <MathBlock math={"\\beta_{\\text{male}} = 0.3"} />, then male policyholders have <MathBlock math={"e^{0.3} \\approx 1.35"} /> times the claim frequency of the reference group — a 35% increase.
      </p>

      <h3 className="sg-sub">Worked Example: Car Insurance GLM</h3>

      <p className="sg-prose">
        Consider modelling claim frequency using the dataset above, with risk factors Age (continuous), and Region (categorical with 3 levels). We use a Poisson GLM with log link:
      </p>

      <Definition title="Car Insurance Pricing Model">
        <p>The statistical model:</p>
        <MathBlock math={"\\text{Claims}_i \\sim \\text{Poisson}\\!\\left(\\text{Expo}_i \\cdot \\exp\\!\\big[\\beta_1 + \\beta_2 \\cdot \\text{Age}_i + \\beta_3 \\cdot \\mathbb{1}_{[\\text{Region}_i = 2]} + \\beta_4 \\cdot \\mathbb{1}_{[\\text{Region}_i = 3]}\\big]\\right)"} display />
        <p>where:</p>
        <ul className="sg-list">
          <li><MathBlock math={"\\beta_1"} /> is the intercept (baseline log-frequency for Region 1)</li>
          <li><MathBlock math={"\\beta_2"} /> captures the linear effect of age</li>
          <li><MathBlock math={"\\beta_3"} /> is the additional log-frequency for Region 2 vs. Region 1</li>
          <li><MathBlock math={"\\beta_4"} /> is the additional log-frequency for Region 3 vs. Region 1</li>
          <li><MathBlock math={"\\mathbb{1}_{[\\text{Region}_i = j]}"} /> is an indicator: 1 if policyholder <MathBlock math={"i"} /> lives in Region <MathBlock math={"j"} />, and 0 otherwise</li>
        </ul>
      </Definition>

      <Note>
        <p>
          <strong>Dummy coding for categorical variables.</strong> Region has 3 levels but only 2 indicator variables. Region 1 (countryside) is the <em>reference category</em> — its effect is absorbed into the intercept <MathBlock math={"\\beta_1"} />. The coefficients <MathBlock math={"\\beta_3"} /> and <MathBlock math={"\\beta_4"} /> measure the <em>difference</em> from this baseline. This avoids perfect multicollinearity (the "dummy variable trap").
        </p>
      </Note>

      <p className="sg-prose">
        In R, this model is fitted with:
      </p>

      <div className="my-4 overflow-x-auto rounded-lg p-4" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-ink)' }}>
        <code>glm(Claims ~ 1 + Age + Region + offset(log(Expo)), family=poisson(link=log))</code>
      </div>

      <p className="sg-prose">
        The <code>offset(log(Expo))</code> term ensures that the log-exposure enters the linear predictor with coefficient fixed at 1, making claim frequency proportional to exposure as required.
      </p>

      <h3 className="sg-sub">Interpreting the Multiplicative Structure</h3>

      <p className="sg-prose">
        Suppose we fit the model and obtain estimates <MathBlock math={"\\hat{\\beta}_1 = -2.5, \\; \\hat{\\beta}_2 = 0.01, \\; \\hat{\\beta}_3 = 0.15, \\; \\hat{\\beta}_4 = 0.40"} />. Then the expected annual claim frequency for a 30-year-old in Region 3 is:
      </p>

      <MathBlock math={"\\hat{\\lambda} = \\exp(-2.5 + 0.01 \\cdot 30 + 0.40) = \\exp(-1.8) \\approx 0.165"} display />

      <p className="sg-prose">
        We can decompose this multiplicatively:
      </p>

      <ul className="sg-list">
        <li><strong>Base frequency:</strong> <MathBlock math={"e^{\\hat{\\beta}_1} = e^{-2.5} \\approx 0.082"} /> (a young person in Region 1)</li>
        <li><strong>Age multiplier:</strong> <MathBlock math={"e^{0.01 \\times 30} = e^{0.3} \\approx 1.35"} /> (35% more claims at age 30 vs. age 0)</li>
        <li><strong>Region 3 multiplier:</strong> <MathBlock math={"e^{0.40} \\approx 1.49"} /> (49% more claims in big city vs. countryside)</li>
        <li><strong>Combined:</strong> <MathBlock math={"0.082 \\times 1.35 \\times 1.49 \\approx 0.165"} /></li>
      </ul>

      <Note>
        <p>
          <strong>Pricing interpretation.</strong> Once we have estimated the claim frequency <MathBlock math={"\\hat{\\lambda}_i"} /> for each risk category, the <strong>pure premium</strong> (the expected total loss per policy-year) is:
        </p>
        <MathBlock math={"\\text{Pure premium}_i = \\hat{\\lambda}_i \\times \\text{E}[X_i]"} display />
        <p>where <MathBlock math={"\\text{E}[X_i]"} /> is the expected claim severity. This is precisely the compound distribution decomposition from Topic 1: <MathBlock math={"\\text{E}[S] = \\text{E}[N] \\cdot \\text{E}[X]"} />.</p>
      </Note>

      <h3 className="sg-sub">GLMs for Lapse Probabilities (Bernoulli)</h3>

      <p className="sg-prose">
        GLMs aren't limited to claim counts. Consider an insurer who wants to model the probability that a policyholder <em>lapses</em> (terminates their policy). The outcome is binary: <MathBlock math={"Y_i = 1"} /> if lapsed, <MathBlock math={"Y_i = 0"} /> if retained.
      </p>

      <Definition title="Bernoulli GLM for Lapse">
        <p>The statistical model:</p>
        <MathBlock math={"Y_i \\sim \\text{Bernoulli}(p_i)"} display />
        <p>where <MathBlock math={"p_i"} /> is the probability that policyholder <MathBlock math={"i"} /> lapses. The likelihood for the full sample is:</p>
        <MathBlock math={"\\mathcal{L}(p \\,|\\, \\vec{y}) = \\prod_{i=1}^{n} p^{y_i} \\cdot (1-p)^{1-y_i}"} display />
      </Definition>

      <Theorem title="MLE for Bernoulli (No Risk Factors)">
        <p>When all policyholders share the same lapse probability <MathBlock math={"p"} />, the log-likelihood is:</p>
        <MathBlock math={"\\ln \\mathcal{L}(p \\,|\\, \\vec{y}) = \\sum_{i=1}^{n} \\big[y_i \\ln p + (1-y_i) \\ln(1-p)\\big]"} display />
        <p>Differentiating and solving:</p>
        <MathBlock math={"\\frac{d}{dp} \\ln \\mathcal{L} = \\sum_{i=1}^{n} \\left(\\frac{y_i}{p} - \\frac{1-y_i}{1-p}\\right) = 0 \\quad \\Longrightarrow \\quad \\hat{p} = \\frac{\\sum_{i=1}^{n} y_i}{n}"} display />
        <p>The MLE is the sample proportion of lapses — exactly what intuition suggests.</p>
      </Theorem>

      <h3 className="sg-sub">The Logit Link Function</h3>

      <p className="sg-prose">
        When we add risk factors (e.g., age <MathBlock math={"x_{1i}"} /> and policy duration <MathBlock math={"x_{2i}"} />), we need a link function to connect the linear predictor <MathBlock math={"\\eta_i = \\beta_0 + \\beta_1 x_{1i} + \\beta_2 x_{2i}"} /> to the probability <MathBlock math={"p_i"} />.
      </p>

      <p className="sg-prose">
        The <strong>identity link</strong> (<MathBlock math={"p_i = \\eta_i"} />) is problematic: the linear predictor can take any real value, but probabilities must lie in <MathBlock math={"[0, 1]"} />. Nothing stops a fitted value from being negative or exceeding 1.
      </p>

      <Definition title="The Logit Link">
        <p>The logit link function maps probabilities to the real line:</p>
        <MathBlock math={"g(p) = \\text{logit}(p) = \\ln\\!\\left(\\frac{p}{1-p}\\right) = \\eta"} display />
        <p>The inverse (the <strong>logistic function</strong>) maps back:</p>
        <MathBlock math={"p = g^{-1}(\\eta) = \\frac{\\exp(\\eta)}{1 + \\exp(\\eta)} = \\frac{1}{1 + \\exp(-\\eta)}"} display />
      </Definition>

      <Theorem title="Why Logit Guarantees Valid Probabilities">
        <p>For any real value <MathBlock math={"\\eta \\in (-\\infty, +\\infty)"} />:</p>
        <ul className="sg-list">
          <li>As <MathBlock math={"\\eta \\to -\\infty"} />: <MathBlock math={"p \\to 0"} /></li>
          <li>As <MathBlock math={"\\eta \\to +\\infty"} />: <MathBlock math={"p \\to 1"} /></li>
          <li>For all finite <MathBlock math={"\\eta"} />: <MathBlock math={"0 < p < 1"} /></li>
        </ul>
        <p>Therefore the logit link automatically guarantees that all fitted probabilities are valid — unlike the identity link.</p>
      </Theorem>

      <Note>
        <p>
          <strong>Odds interpretation.</strong> The quantity <MathBlock math={"p/(1-p)"} /> is the <em>odds</em> of lapsing. So <MathBlock math={"\\text{logit}(p) = \\ln(\\text{odds})"} />, and in a logistic regression each coefficient <MathBlock math={"\\beta_j"} /> represents the change in log-odds per unit increase in <MathBlock math={"x_j"} />. Equivalently, <MathBlock math={"e^{\\beta_j}"} /> is the <strong>odds ratio</strong>: the factor by which the odds multiply for each unit increase in <MathBlock math={"x_j"} />.
        </p>
      </Note>

      <h3 className="sg-sub">GLMs for Mortality (Force of Mortality)</h3>

      <p className="sg-prose">
        Another important application bridges non-life and life insurance. Consider a portfolio of <MathBlock math={"n = 10{,}000"} /> individuals all aged <MathBlock math={"x"} />. At year-end, <MathBlock math={"d = 160"} /> have died. We want to estimate the mortality probability <MathBlock math={"q_x"} /> and the <strong>force of mortality</strong> <MathBlock math={"\\mu_x"} />.
      </p>

      <Definition title="Mortality Quantities">
        <ul className="sg-list">
          <li><MathBlock math={"q_x"} /> — the probability that someone aged exactly <MathBlock math={"x"} /> dies within one year</li>
          <li><MathBlock math={"{}_{h}q_x"} /> — the probability of dying within the next <MathBlock math={"h"} /> years</li>
          <li><MathBlock math={"\\mu_x"} /> — the <strong>force of mortality</strong>, an instantaneous death rate: <MathBlock math={"\\mu_x = \\lim_{h \\downarrow 0} \\frac{{}_{h}q_x}{h}"} /></li>
          <li><MathBlock math={"p_x = 1 - q_x"} /> — the one-year survival probability</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>If the force of mortality is constant over <MathBlock math={"[x, x+1)"} />, then:</p>
        <MathBlock math={"{}_{h}p_x = \\exp[-h \\cdot \\mu_x] \\qquad \\text{and} \\qquad q_x = 1 - \\exp[-\\mu_x]"} display />
      </Definition>

      <h3 className="sg-sub">Estimating Mortality: Three Approaches</h3>

      <p className="sg-prose">
        The data is binary: for each individual <MathBlock math={"i"} />, define <MathBlock math={"\\delta_i = 1"} /> if they died, <MathBlock math={"\\delta_i = 0"} /> otherwise. The key question is how to handle <strong>exposure</strong> (the fraction of the year each person was alive).
      </p>

      <Example title="Approach 1: Bernoulli Model (Deaths at Year-End)">
        <p>If we assume everyone who dies does so at the <em>very end</em> of the year, then each individual has exposure <MathBlock math={"\\tau_i = 1"} /> (alive all year). The model is simply Bernoulli:</p>
        <MathBlock math={"\\delta_i \\sim \\text{Bernoulli}(q_x)"} display />
        <p>The log-likelihood is:</p>
        <MathBlock math={"\\ell(q_x) = \\sum_{i=1}^{n} \\big[\\delta_i \\log q_x + (1 - \\delta_i) \\log(1 - q_x)\\big]"} display />
        <p>This gives <MathBlock math={"\\hat{q}_x = d/n = 160/10{,}000 = 0.016"} />.</p>
      </Example>

      <Example title="Approach 2: Force of Mortality (Deaths at Year-End)">
        <p>Now parametrize in terms of the force of mortality <MathBlock math={"\\mu_x"} />. If everyone survives the full year or dies at the very end, the survival probability is <MathBlock math={"p_x = \\exp[-\\mu_x]"} /> and the death probability is <MathBlock math={"p_x \\cdot \\mu_x = \\exp[-\\mu_x] \\cdot \\mu_x"} />. The likelihood is:</p>
        <MathBlock math={"\\mathcal{L}(\\mu_x | \\vec{\\delta}) = \\prod_{i=1}^{n} \\exp[-\\mu_x] \\cdot \\mu_x^{\\delta_i}"} display />
        <MathBlock math={"\\log \\mathcal{L} = \\sum_{i=1}^{n} (-\\mu_x + \\delta_i \\log \\mu_x) = -n\\mu_x + d \\log \\mu_x"} display />
        <p>Setting the derivative to zero: <MathBlock math={"\\hat{\\mu}_x = d/n = 160/10{,}000 = 0.016"} />.</p>
        <p>The implied mortality probability: <MathBlock math={"\\hat{q}_x = 1 - e^{-0.016} = 0.01587"} />.</p>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>NB:</strong> This is slightly <em>less</em> than 0.016. However, this sub-question uses the formula <MathBlock math={"q_x = 1 - e^{-\\mu_x}"} /> which assumes constant force of mortality over <MathBlock math={"[x, x+1)"} /> — an assumption that is <em>violated</em> by the premise that deaths occur only at year-end.
        </p>
      </Example>

      <Example title="Approach 3: Force of Mortality with Exposure">
        <p>More realistically, people die <em>during</em> the year. Suppose on average those who die lived half a year. Define <MathBlock math={"\\tau_i \\in (0, 1]"} /> as the fraction of the year person <MathBlock math={"i"} /> was alive. The total exposure is:</p>
        <MathBlock math={"e = \\sum_{i=1}^{n} \\tau_i = n - \\tfrac{1}{2} \\sum_{i=1}^{n} \\delta_i = 10{,}000 - \\tfrac{1}{2}(160) = 9{,}920"} display />
        <p>The likelihood incorporating individual exposure:</p>
        <MathBlock math={"\\mathcal{L}(\\mu_x | \\vec{\\delta}, \\vec{\\tau}) = \\prod_{i=1}^{n} \\exp[-\\tau_i \\mu_x] \\cdot (\\mu_x)^{\\delta_i}"} display />
        <MathBlock math={"\\log \\mathcal{L} = \\sum_{i=1}^{n} \\left(-\\tau_i \\mu_x + \\delta_i \\log \\mu_x\\right) = -e \\cdot \\mu_x + d \\cdot \\log \\mu_x"} display />
        <p>Maximizing:</p>
        <MathBlock math={"\\hat{\\mu}_x = \\frac{d}{e} = \\frac{160}{9{,}920} = 0.01613"} display />
        <p>This is about <strong>0.8% higher</strong> than the Approach 2 estimate (0.016). The difference comes from properly accounting for the reduced exposure of those who died during the year.</p>
      </Example>

      <Theorem title="Poisson-Like Structure of the Mortality Likelihood">
        <p>The likelihood from Approach 3 can be simplified using <MathBlock math={"e = \\sum_i \\tau_i"} /> and <MathBlock math={"d = \\sum_i \\delta_i"} />:</p>
        <MathBlock math={"\\mathcal{L}(\\mu_x | \\vec{\\delta}, \\vec{\\tau}) = \\exp[-e \\cdot \\mu_x] \\cdot (\\mu_x)^{d}"} display />
        <p>This is proportional to a <strong>Poisson likelihood</strong> for observing <MathBlock math={"d"} /> deaths with expected value <MathBlock math={"e \\cdot \\mu_x"} />. This is why Poisson regression can be used to model mortality rates — even though individual deaths are binary events, the aggregated count behaves like a Poisson variable.</p>
      </Theorem>

      <Note>
        <p>
          <strong>The bridge to life insurance.</strong> This result is fundamental: it justifies using Poisson GLMs to estimate forces of mortality from portfolio data, incorporating exposure correctly via the offset. The same technique applies in Topics 5–6 when we build life tables and compute actuarial present values.
        </p>
      </Note>

      <h3 className="sg-sub">Usage-Based Pricing and Telematics</h3>

      <p className="sg-prose">
        Traditional car insurance pricing uses risk factors reported at policy inception: age, license age, postal code, engine power, vehicle weight, and business vs. private use. These factors say little about <em>how</em> the policyholder actually drives.
      </p>

      <Definition title="Telematics Data">
        <p><strong>Telematics</strong> refers to data collected from a "black box" installed in the vehicle. On every trip it records:</p>
        <ul className="sg-list">
          <li>Where and when the ride took place (region, time of day)</li>
          <li>How fast the driver accelerates and brakes</li>
          <li>How aggressively the driver takes turns</li>
          <li>Total distance driven (mileage)</li>
        </ul>
        <p>This gives the insurer information about both the <em>characteristics</em> and <em>aggressiveness</em> of driving behavior — far richer than static risk factors.</p>
      </Definition>

      <h3 className="sg-sub">Mileage: Exposure or Risk Factor?</h3>

      <p className="sg-prose">
        A central question in usage-based pricing is how to treat mileage. There are two fundamentally different approaches:
      </p>

      <Definition title="Mileage as Exposure">
        <p>Replace time-based exposure with distance-based exposure:</p>
        <MathBlock math={"\\text{Claims}_i \\sim \\text{Poisson}\\!\\left(\\text{Mileage}_i \\cdot \\exp\\!\\Big[\\sum_j \\beta_j x_{ji}\\Big]\\right)"} display />
        <p>This assumes claim frequency is <strong>proportional to distance driven</strong>: driving twice as far doubles your expected claims.</p>
      </Definition>

      <Definition title="Mileage as Risk Factor">
        <p>Keep time-based exposure and include mileage as a covariate:</p>
        <MathBlock math={"\\text{Claims}_i \\sim \\text{Poisson}\\!\\left(\\text{Expo}_i \\cdot \\exp\\!\\Big[\\beta_{\\text{mi}} \\cdot \\text{Mileage}_i + \\sum_j \\beta_j x_{ji}\\Big]\\right)"} display />
        <p>This allows the data to determine <em>how</em> mileage relates to claim frequency — the relationship doesn't have to be proportional.</p>
      </Definition>

      <Note>
        <p>
          <strong>The key difference.</strong> Suppose drivers A and B have the same risk factors, but A drives twice as far as B during the same coverage period.
        </p>
        <ul className="sg-list">
          <li><strong>Mileage as exposure:</strong> A is expected to claim exactly twice as often as B. The relative difference is fixed.</li>
          <li><strong>Mileage as risk factor:</strong> We don't presuppose the relationship. It might be that high-mileage drivers are more <em>experienced</em> and actually have lower per-km claim rates — the data decides.</li>
        </ul>
        <p style={{ marginTop: '0.5rem' }}>Verbelen et al. (2018) find that the optimal model uses <strong>coverage period as exposure</strong> and <strong>mileage as a risk factor</strong>, because the proportionality assumption is too restrictive.</p>
      </Note>

      <h3 className="sg-sub">Four Modelling Alternatives</h3>

      <p className="sg-prose">
        The Verbelen et al. (2018) paper investigates four approaches to incorporating mileage:
      </p>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Model</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Exposure</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Mileage in model</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td className="px-4 py-2" style={{ color: 'var(--color-accent)' }}>1 (Current)</td>
              <td className="px-4 py-2">Coverage period</td>
              <td className="px-4 py-2">Not included</td>
              <td className="px-4 py-2">Traditional pricing — ignores telematics</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td className="px-4 py-2" style={{ color: 'var(--color-accent)' }}>2</td>
              <td className="px-4 py-2">Mileage</td>
              <td className="px-4 py-2">As exposure</td>
              <td className="px-4 py-2">Assumes proportionality to distance</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td className="px-4 py-2" style={{ color: 'var(--color-accent)' }}>3</td>
              <td className="px-4 py-2">Coverage period</td>
              <td className="px-4 py-2">As risk factor</td>
              <td className="px-4 py-2">Mileage effect estimated from data</td>
            </tr>
            <tr>
              <td className="px-4 py-2" style={{ color: 'var(--color-accent)' }}>4 (Optimal)</td>
              <td className="px-4 py-2">Coverage period</td>
              <td className="px-4 py-2">As risk factor</td>
              <td className="px-4 py-2">+ other telematics (speed, acceleration)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="sg-prose">
        Model 4 is found to be statistically optimal (lowest AIC, best cross-validation scores). Models 3 and 4 are also the most practical to implement, since coverage period is the natural exposure measure for premium calculation.
      </p>

      <h3 className="sg-sub">Wearables in Health Insurance</h3>

      <p className="sg-prose">
        The same philosophy extends to health insurance. Since 1997 (Discovery Vitality in South Africa), <strong>insurance wellness programs</strong> have used wearable devices to track policyholder health behaviors: steps per day, heart rate, sleep patterns. The data can be used as additional risk factors in pricing models, capturing <em>lifestyle</em> information that traditional underwriting questionnaires miss.
      </p>

      <Note>
        <p>
          <strong>The broader lesson.</strong> Whether it's mileage in car insurance or step counts in health insurance, the modelling question is the same: should the usage measure be treated as <strong>exposure</strong> (fixed proportionality) or as a <strong>risk factor</strong> (flexible relationship)? The answer depends on domain knowledge and statistical testing — but the GLM framework handles both cases seamlessly through the offset mechanism.
        </p>
      </Note>

      <h3 className="sg-sub">Summary</h3>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Concept</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Key Formula / Idea</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Simple Poisson MLE', '\\hat{\\lambda} = \\sum y_i / n'],
              ['MLE with exposure', '\\hat{\\lambda} = \\sum y_i / \\sum w_i'],
              ['Poisson GLM', 'Y_i \\sim \\text{Poi}(w_i \\cdot \\exp[\\eta_i])'],
              ['Offset', '\\log w_i \\text{ enters } \\eta_i \\text{ with coefficient } 1'],
              ['Log link → multiplicative', '\\text{E}[Y_i] = w_i \\cdot \\prod_j e^{\\beta_j x_{ji}}'],
              ['Bernoulli MLE', '\\hat{p} = \\sum y_i / n'],
              ['Logit link', 'g(p) = \\ln(p/(1-p)) \\; \\Rightarrow \\; p \\in (0,1)'],
              ['Mortality force MLE', '\\hat{\\mu}_x = d / e \\; (\\text{deaths / exposure})'],
            ].map(([concept, formula], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2" style={{ fontWeight: 500 }}>{concept}</td>
                <td className="px-4 py-2"><MathBlock math={formula} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
