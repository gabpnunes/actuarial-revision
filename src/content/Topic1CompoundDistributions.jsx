import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'

export default function Topic1CompoundDistributions() {
  return (
    <>
      <p className="sg-prose">
        Insurance is a means against financial loss. Many individuals who all bear a similar risk pay a premium which is only a fraction of the potential loss. The losses that result when the insured event occurs are financed by these premiums. Two fundamental questions for the insurance industry are: <strong>what is the distribution of the total losses</strong>, and <strong>how should the insurance premium be determined?</strong>
      </p>
      <p className="sg-prose" style={{ marginTop: '0.75rem' }}>
        Non-life insurance covers activities where the insured benefit does not depend on the survival of the policyholder — automobile insurance, property insurance, fire insurance, legal expenses, and so on. To price these products, we need to understand the <strong>total claim amount</strong> across a portfolio of policies.
      </p>

      <h3 className="sg-sub">Properties of Compound Distributions</h3>

      <p className="sg-prose">
        Consider a portfolio that produces a random number <MathBlock math={"N"} /> of claims in a certain period. The total claim amount is:
      </p>

      <Definition title="Compound Sum">
        <p>The <strong>compound sum</strong> (or aggregate claim amount) is defined as:</p>
        <MathBlock math={"S = X_1 + X_2 + \\cdots + X_N"} display />
        <p style={{ marginTop: '0.5rem' }}>
          where <MathBlock math={"X_i"} /> is the size of the <MathBlock math={"i"} />-th claim, and if <MathBlock math={"N = 0"} /> then <MathBlock math={"S = 0"} />.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          We assume the individual claims <MathBlock math={"X_i"} /> are <strong>independent and identically distributed</strong> (i.i.d.), and that <MathBlock math={"N"} /> and all <MathBlock math={"X_i"} /> are <strong>independent</strong> (the number of claims does not influence claim sizes).
        </p>
      </Definition>

      <Note>
        <p>
          <strong>Why separate N and X?</strong> In practice, we model claim <em>frequency</em> (how often claims happen) and claim <em>severity</em> (how large each claim is) separately. This gives more flexibility — different risk factors can explain frequency vs. severity. For example, young drivers may have more accidents (frequency) but not necessarily more expensive ones (severity).
        </p>
      </Note>

      <p className="sg-prose">
        We use the notation <MathBlock math={"\\mu_k = E[X^k]"} /> for the <MathBlock math={"k"} />-th moment of the claim size, and <MathBlock math={"P(x) = \\Pr[X \\leq x]"} /> for its CDF. Even though both <MathBlock math={"N"} /> and <MathBlock math={"X_i"} /> are random, we can derive the first two moments of <MathBlock math={"S"} /> using only the moments of <MathBlock math={"N"} /> and <MathBlock math={"X"} />.
      </p>

      <h3 className="sg-sub">Expected Value of S</h3>

      <Theorem title="Expected Value of a Compound Sum">
        <MathBlock math={"E[S] = \\mu_1 \\cdot E[N]"} display />
        <p>The expected total claim amount equals the expected claim size times the expected number of claims.</p>
      </Theorem>

      <Proof title="via Law of Total Expectation (Tower Property)">
        <p>We condition on <MathBlock math={"N"} /> and use the law of total expectation <MathBlock math={"E[S] = E[E[S \\mid N]]"} />:</p>
        <MathBlock math={"E[S] = E[E[S \\mid N]] = \\sum_{n=0}^{\\infty} E[X_1 + \\cdots + X_N \\mid N = n] \\cdot \\Pr[N = n]"} display />
        <p>When <MathBlock math={"N = n"} />, the sum has exactly <MathBlock math={"n"} /> terms. Since <MathBlock math={"X_i"} /> are independent of <MathBlock math={"N"} />:</p>
        <MathBlock math={"= \\sum_{n=0}^{\\infty} E[X_1 + \\cdots + X_n] \\cdot \\Pr[N = n] = \\sum_{n=0}^{\\infty} n\\mu_1 \\cdot \\Pr[N = n]"} display />
        <p>Recognizing this as the definition of <MathBlock math={"E[N]"} />:</p>
        <MathBlock math={"= \\mu_1 \\sum_{n=0}^{\\infty} n \\cdot \\Pr[N = n] = \\mu_1 \\cdot E[N]"} display />
      </Proof>

      <Note>
        <p>
          <strong>Key insight:</strong> We used two properties: (1) the <em>tower property</em> — condition on <MathBlock math={"N"} /> to make the sum deterministic, then take the outer expectation; (2) the <em>independence</em> of <MathBlock math={"X_i"} /> and <MathBlock math={"N"} /> — which lets us drop the conditioning when computing <MathBlock math={"E[X_i \\mid N = n] = E[X_i] = \\mu_1"} />.
        </p>
      </Note>

      <h3 className="sg-sub">Variance of S</h3>

      <Theorem title="Variance of a Compound Sum">
        <MathBlock math={"\\text{Var}[S] = E[N] \\cdot \\text{Var}[X] + \\mu_1^2 \\cdot \\text{Var}[N]"} display />
      </Theorem>

      <Proof title="via Law of Total Variance">
        <p>The law of total variance states that for any random variables <MathBlock math={"W, V"} />:</p>
        <MathBlock math={"\\text{Var}[W] = E[\\text{Var}[W \\mid V]] + \\text{Var}[E[W \\mid V]]"} display />
        <p>Applying this with <MathBlock math={"W = S"} /> and <MathBlock math={"V = N"} />:</p>
        <MathBlock math={"\\text{Var}[S] = E[\\text{Var}[S \\mid N]] + \\text{Var}[E[S \\mid N]]"} display />

        <p><strong>First term:</strong> Given <MathBlock math={"N = n"} />, <MathBlock math={"S"} /> is a sum of <MathBlock math={"n"} /> i.i.d. variables, so <MathBlock math={"\\text{Var}[S \\mid N = n] = n \\cdot \\text{Var}[X]"} />. Therefore:</p>
        <MathBlock math={"E[\\text{Var}[S \\mid N]] = E[N \\cdot \\text{Var}[X]] = E[N] \\cdot \\text{Var}[X]"} display />

        <p><strong>Second term:</strong> We showed <MathBlock math={"E[S \\mid N] = N \\mu_1"} />, so:</p>
        <MathBlock math={"\\text{Var}[E[S \\mid N]] = \\text{Var}[N \\mu_1] = \\mu_1^2 \\cdot \\text{Var}[N]"} display />

        <p>Combining:</p>
        <MathBlock math={"\\text{Var}[S] = E[N] \\cdot \\text{Var}[X] + \\mu_1^2 \\cdot \\text{Var}[N]"} display />
      </Proof>

      <Note>
        <p>
          <strong>Reading the variance formula:</strong> Total uncertainty has two sources. The first term <MathBlock math={"E[N] \\cdot \\text{Var}[X]"} /> captures uncertainty in <em>claim sizes</em> (even if we knew exactly how many claims there'd be). The second term <MathBlock math={"\\mu_1^2 \\cdot \\text{Var}[N]"} /> captures uncertainty in the <em>number of claims</em> (even if every claim had the same expected size).
        </p>
      </Note>

      <h3 className="sg-sub">Compound Poisson Distribution</h3>

      <p className="sg-prose">
        The most important special case is when the number of claims follows a Poisson distribution. If <MathBlock math={"N \\sim \\text{Poisson}(\\lambda)"} />, then <MathBlock math={"E[N] = \\text{Var}[N] = \\lambda"} />, and the variance formula simplifies beautifully.
      </p>

      <Theorem title="Variance under Compound Poisson">
        <p>If <MathBlock math={"N \\sim \\text{Poisson}(\\lambda)"} />, then:</p>
        <MathBlock math={"\\text{Var}[S] = \\lambda \\cdot \\text{Var}[X] + \\mu_1^2 \\cdot \\lambda = \\lambda\\bigl(\\text{Var}[X] + \\mu_1^2\\bigr) = \\lambda \\cdot E[X^2]"} display />
        <p>since <MathBlock math={"\\text{Var}[X] + (E[X])^2 = E[X^2]"} /> by the variance identity.</p>
      </Theorem>

      <h3 className="sg-sub">Sum of Compound Poisson is Compound Poisson</h3>

      <Theorem title="Additive Property">
        <p>
          If <MathBlock math={"S_1, S_2, \\ldots, S_m"} /> are independent compound Poisson random variables with parameters <MathBlock math={"\\lambda_i"} /> and claim size distributions <MathBlock math={"P_i(x)"} />, then their sum <MathBlock math={"S = S_1 + S_2 + \\cdots + S_m"} /> is also compound Poisson distributed with:
        </p>
        <MathBlock math={"\\lambda = \\sum_{i=1}^{m} \\lambda_i \\qquad \\text{and} \\qquad P(x) = \\sum_{i=1}^{m} \\frac{\\lambda_i}{\\lambda} P_i(x)"} display />
      </Theorem>

      <Note>
        <p>
          <strong>Practical interpretation:</strong> Suppose there are <MathBlock math={"m"} /> policyholders, each with their own claim frequency <MathBlock math={"\\lambda_i"} /> and claim size distribution <MathBlock math={"P_i(x)"} />. Each policyholder's total claim <MathBlock math={"S_i"} /> is compound Poisson. The portfolio total <MathBlock math={"S"} /> is <em>also</em> compound Poisson, with the total frequency being the sum of individual frequencies, and the portfolio claim size distribution being a <strong>weighted average</strong> of individual distributions (weighted by each policyholder's share of total frequency).
        </p>
      </Note>

      <h3 className="sg-sub">Normal Approximation</h3>

      <p className="sg-prose">
        When a portfolio has many policies (large <MathBlock math={"\\lambda"} />), the Central Limit Theorem tells us that the total claim <MathBlock math={"S"} /> is approximately normally distributed. This lets us compute quantiles for risk analysis.
      </p>

      <Definition title="Normal Approximation for S">
        <p>For large <MathBlock math={"\\lambda"} />, <MathBlock math={"S"} /> is approximately:</p>
        <MathBlock math={"S \\approx N\\!\\left(\\mu_S,\\; \\sigma_S^2\\right)"} display />
        <p>where <MathBlock math={"\\mu_S = E[S]"} /> and <MathBlock math={"\\sigma_S^2 = \\text{Var}[S]"} />.</p>
        <p style={{ marginTop: '0.5rem' }}>The <MathBlock math={"\\alpha"} />-quantile (e.g., the 1-in-100 year worst-case outcome at <MathBlock math={"\\alpha = 0.99"} />) is:</p>
        <MathBlock math={"q_S(\\alpha) = \\mu_S + \\sigma_S \\cdot \\Phi^{-1}(\\alpha)"} display />
        <p>where <MathBlock math={"\\Phi^{-1}"} /> is the standard normal quantile function.</p>
      </Definition>

      <Example title="Normal Approximation — Worked Example">
        <p className="sg-prose">
          <strong>Setup:</strong> A portfolio contains 1000 policies. Each has (in expectation) a claim once every five years. Claim frequency is Poisson with <MathBlock math={"\\lambda = 0.2"} /> per policy. Claim size given a claim occurs is <MathBlock math={"\\text{Normal}(\\mu_X = 100,\\; \\sigma_X^2 = 10^2)"} />.
        </p>
        <p className="sg-prose" style={{ marginTop: '0.5rem' }}>
          <strong>Step 1:</strong> Compute the portfolio Poisson parameter. With 1000 policies each having <MathBlock math={"\\lambda = 0.2"} />, the total portfolio frequency is:
        </p>
        <MathBlock math={"\\lambda_{\\text{total}} = 1000 \\times 0.2 = 200"} display />
        <p className="sg-prose">
          <strong>Step 2:</strong> Compute <MathBlock math={"E[S]"} /> and <MathBlock math={"\\text{Var}[S]"} />.
        </p>
        <MathBlock math={"\\mu_S = E[S] = \\mu_1 \\cdot E[N] = 100 \\times 200 = 20{,}000"} display />
        <MathBlock math={"\\sigma_S^2 = \\text{Var}[S] = \\lambda \\cdot E[X^2] = 200 \\times (\\sigma_X^2 + \\mu_X^2) = 200 \\times (100 + 10{,}000) = 2{,}020{,}000"} display />
        <MathBlock math={"\\sigma_S = \\sqrt{2{,}020{,}000} \\approx 1{,}421.27"} display />
        <p className="sg-prose">
          <strong>Step 3:</strong> Find the 1-in-100 year worst-case outcome (<MathBlock math={"\\alpha = 0.99"} />, so <MathBlock math={"\\Phi^{-1}(0.99) = 2.33"} />):
        </p>
        <MathBlock math={"q_S(0.99) = 20{,}000 + 1{,}421.27 \\times 2.33 \\approx 23{,}306"} display />
        <p className="sg-prose">
          On average, once every 100 years the total loss exceeds approximately <strong>23,306</strong>.
        </p>
      </Example>

      <h3 className="sg-sub">Simulation Approach</h3>

      <p className="sg-prose">
        When analytical formulas are not available (e.g., with reinsurance contracts that cap individual claims), we can use <strong>Monte Carlo simulation</strong> to estimate the distribution of <MathBlock math={"S"} />.
      </p>

      <Definition title="Simulation Algorithm">
        <p>For <MathBlock math={"i = 1, 2, \\ldots, B"} /> (number of simulations):</p>
        <ul className="sg-list">
          <li><strong>Step 1:</strong> Draw a random number of claims <MathBlock math={"n_i"} /> from the distribution of <MathBlock math={"N"} /></li>
          <li><strong>Step 2:</strong> Draw <MathBlock math={"n_i"} /> random claim sizes <MathBlock math={"x_{1,i}, \\ldots, x_{n_i,i}"} /> from the distribution of <MathBlock math={"X"} /></li>
          <li><strong>Step 3:</strong> Calculate the total loss <MathBlock math={"S_i = \\sum_{j=1}^{n_i} x_{j,i}"} /></li>
        </ul>
        <p style={{ marginTop: '0.5rem' }}>From the simulated values we estimate:</p>
        <MathBlock math={"\\hat{\\mu}_S = \\frac{1}{B} \\sum_{i=1}^{B} S_i, \\qquad \\hat{\\sigma}_S^2 = \\frac{1}{B-1} \\sum_{i=1}^{B} (S_i - \\hat{\\mu}_S)^2"} display />
      </Definition>

      <Note>
        <p>
          <strong>When to simulate:</strong> Simulation is essential when the loss distribution is modified by contractual features. For example, with a <em>reinsurance contract</em> that caps the insurer's liability at 150 per policyholder per year, the analytical formulas no longer apply, but the simulation algorithm can easily be adapted by capping each policyholder's total before summing.
        </p>
      </Note>

      <Example title="Simulation Results">
        <p className="sg-prose">
          Using <MathBlock math={"B = 100{,}000"} /> simulations with the same parameters as the previous example (1000 policies, <MathBlock math={"\\lambda = 0.2"} />, <MathBlock math={"\\mu_X = 100"} />, <MathBlock math={"\\sigma_X = 10"} />):
        </p>
        <ul className="sg-list">
          <li>Simulated mean: <MathBlock math={"\\hat{\\mu}_S \\approx 19{,}997"} /> (analytical: 20,000)</li>
          <li>Simulated std dev: <MathBlock math={"\\hat{\\sigma}_S \\approx 1{,}422"} /> (analytical: 1,421.27)</li>
          <li>Simulated 99th percentile: <MathBlock math={"\\approx 23{,}377"} /> (normal approx: 23,306)</li>
        </ul>
        <p className="sg-prose" style={{ marginTop: '0.5rem' }}>
          The simulation results closely match the analytical values. The slight differences are due to sampling variability — increasing <MathBlock math={"B"} /> reduces the gap.
        </p>
      </Example>

      <h3 className="sg-sub">Concentration Inequalities & the Law of Large Numbers</h3>

      <p className="sg-prose">
        Insurance relies on <strong>pooling</strong>: when many independent risks are combined, the average loss becomes predictable. The mathematical foundation for this is the <strong>Law of Large Numbers</strong>, which we derive using <strong>Markov's inequality</strong>.
      </p>

      <Theorem title="Markov's Inequality">
        <p>For any non-negative random variable <MathBlock math={"Z \\geq 0"} /> with finite expectation, and any <MathBlock math={"\\varepsilon > 0"} />:</p>
        <MathBlock math={"\\mathbb{P}[Z \\geq \\varepsilon] \\leq \\frac{\\text{E}[Z]}{\\varepsilon}"} display />
      </Theorem>

      <Proof>
        <p>Since <MathBlock math={"Z \\geq 0"} />, we have <MathBlock math={"\\text{E}[Z] \\geq \\text{E}[Z \\cdot \\mathbf{1}_{\\{Z \\geq \\varepsilon\\}}] \\geq \\varepsilon \\cdot \\mathbb{P}[Z \\geq \\varepsilon]"} />. Dividing both sides by <MathBlock math={"\\varepsilon"} /> gives the result.</p>
      </Proof>

      <Theorem title="Chebyshev's Inequality">
        <p>For any random variable <MathBlock math={"X"} /> with <MathBlock math={"\\text{E}[X] = 0"} /> and <MathBlock math={"\\text{Var}(X) = \\sigma^2"} />:</p>
        <MathBlock math={"\\mathbb{P}[|X| \\geq \\ell] \\leq \\frac{\\sigma^2}{\\ell^2}"} display />
      </Theorem>

      <Proof>
        <p>Apply Markov's inequality to <MathBlock math={"Z = X^2"} /> (which is non-negative). Since <MathBlock math={"\\text{E}[X] = 0"} />, we have <MathBlock math={"\\text{E}[X^2] = \\sigma^2"} />:</p>
        <MathBlock math={"\\mathbb{P}[X^2 \\geq \\varepsilon] \\leq \\frac{\\sigma^2}{\\varepsilon}"} display />
        <p>Now note that <MathBlock math={"X^2 \\geq \\varepsilon \\iff |X| \\geq \\sqrt{\\varepsilon}"} />. Setting <MathBlock math={"\\ell = \\sqrt{\\varepsilon}"} /> (i.e. <MathBlock math={"\\varepsilon = \\ell^2"} />):</p>
        <MathBlock math={"\\mathbb{P}[|X| \\geq \\ell] = \\mathbb{P}[X^2 \\geq \\ell^2] \\leq \\frac{\\sigma^2}{\\ell^2}"} display />
      </Proof>

      <Definition title="Variance of Sample Mean vs Total">
        <p>Let <MathBlock math={"X_1, X_2, \\ldots, X_n"} /> be i.i.d. with <MathBlock math={"\\text{E}[X_k] = \\mu"} /> and <MathBlock math={"\\text{Var}(X_k) = \\sigma^2"} />. Define the sample mean <MathBlock math={"\\bar{X}_n = \\frac{1}{n}\\sum_{k=1}^n X_k"} /> and the total <MathBlock math={"S_n = \\sum_{k=1}^n X_k"} />. Then:</p>
        <MathBlock math={"\\text{Var}[\\bar{X}_n] = \\frac{\\sigma^2}{n} \\to 0 \\quad \\text{as } n \\to \\infty"} display />
        <MathBlock math={"\\text{Var}[S_n] = n\\sigma^2 \\to \\infty \\quad \\text{as } n \\to \\infty"} display />
        <p>The average becomes more predictable as <MathBlock math={"n"} /> grows, but the total becomes less predictable.</p>
      </Definition>

      <Theorem title="Weak Law of Large Numbers">
        <p>For i.i.d. random variables with mean <MathBlock math={"\\mu"} /> and variance <MathBlock math={"\\sigma^2"} />, for any <MathBlock math={"\\ell > 0"} />:</p>
        <MathBlock math={"\\mathbb{P}[|\\bar{X}_n - \\mu| \\geq \\ell] \\leq \\frac{\\sigma^2}{n \\ell^2} \\to 0 \\quad \\text{as } n \\to \\infty"} display />
        <p>The sample mean converges in probability to the true mean.</p>
      </Theorem>

      <Proof>
        <p>Apply Chebyshev's inequality to <MathBlock math={"\\bar{X}_n - \\mu"} />, which has mean 0 and variance <MathBlock math={"\\sigma^2/n"} />:</p>
        <MathBlock math={"\\mathbb{P}[|\\bar{X}_n - \\mu| \\geq \\ell] \\leq \\frac{\\text{Var}(\\bar{X}_n)}{\\ell^2} = \\frac{\\sigma^2}{n\\ell^2}"} display />
        <p>As <MathBlock math={"n \\to \\infty"} />, this bound tends to 0.</p>
      </Proof>

      <Note>
        <p>
          <strong>Why this matters for insurance.</strong> The WLLN is the mathematical reason insurance works: by pooling many independent risks, the average loss per policy becomes predictable. The insurer can set premiums close to the expected loss, knowing that with a large pool, the actual average loss will be close to this expectation with high probability.
        </p>
      </Note>

      <h3 className="sg-sub">Summary of Key Formulas</h3>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>Property</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>General</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>Compound Poisson</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"E[S]"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\mu_1 \\cdot E[N]"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\lambda \\mu_1"} /></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\text{Var}[S]"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"E[N]\\text{Var}[X] + \\mu_1^2\\text{Var}[N]"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\lambda \\cdot E[X^2]"} /></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Quantile</td>
              <td colSpan={2} style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"q_S(\\alpha) = \\mu_S + \\sigma_S \\cdot \\Phi^{-1}(\\alpha)"} /></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Markov</td>
              <td colSpan={2} style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\mathbb{P}[Z \\geq \\varepsilon] \\leq \\text{E}[Z] / \\varepsilon"} /></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Chebyshev</td>
              <td colSpan={2} style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\mathbb{P}[|X| \\geq \\ell] \\leq \\sigma^2 / \\ell^2"} /></td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>WLLN</td>
              <td colSpan={2} style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\mathbb{P}[|\\bar{X}_n - \\mu| \\geq \\ell] \\leq \\sigma^2 / (n\\ell^2) \\to 0"} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
