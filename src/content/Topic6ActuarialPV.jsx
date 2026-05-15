import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'

export default function Topic6ActuarialPV() {
  return (
    <>
      <p className="sg-prose">
        In standard finance, the present value of a cash flow discounts future payments to today. In life insurance, there's an additional complication: future payments only occur <em>if the policyholder is alive</em> (or, for death benefits, <em>if the policyholder has died</em>). The <strong>actuarial present value (APV)</strong> combines discounting with survival probabilities to give the expected present value of uncertain, life-contingent cash flows.
      </p>

      <h3 className="sg-sub">From Present Value to Actuarial Present Value</h3>

      <p className="sg-prose">
        Recall from Topic 4 that the present value of a deterministic cash flow is <MathBlock math={"\\text{Val}(\\mathbf{c}, \\mathbf{v}) = \\sum_t v(t) \\cdot c_t"} />. For life-contingent cash flows, we multiply each term by the probability that the payment actually occurs:
      </p>

      <Definition title="Actuarial Present Value (APV)">
        <p>For a cash flow <MathBlock math={"c_t"} /> paid at time <MathBlock math={"t"} /> <em>only if the policyholder aged <MathBlock math={"x"} /> is alive</em>, the actuarial present value is:</p>
        <MathBlock math={"\\text{APV} = \\sum_{t=0}^{\\infty} v(t) \\cdot c_t \\cdot {}_{t}p_x"} display />
        <p>where <MathBlock math={"v(t) = (1+i)^{-t}"} /> is the discount factor and <MathBlock math={"{}_{t}p_x"} /> is the probability of surviving from age <MathBlock math={"x"} /> to age <MathBlock math={"x + t"} />.</p>
      </Definition>

      <Note>
        <p>
          <strong>Two adjustments, one formula.</strong> Each future cash flow is reduced by two factors: (1) the <strong>time value of money</strong> via <MathBlock math={"v(t)"} />, and (2) the <strong>probability of being alive</strong> via <MathBlock math={"{}_{t}p_x"} />. Both act as "discounts" — one for interest, one for mortality.
        </p>
      </Note>

      <Example title="Loan with Mortality">
        <p>Consider the cash flow <MathBlock math={"\\mathbf{c} = (-100, 27, 27, 27, 27)"} /> with <MathBlock math={"i = 2\\%"} /> and a constant annual mortality rate <MathBlock math={"q = 0.02"} /> (so <MathBlock math={"{}_{t}p_x = 0.98^t"} />).</p>
        <p style={{ marginTop: '0.5rem' }}>Without mortality adjustment (Topic 4): <MathBlock math={"\\text{Val} = 2.81"} /></p>
        <p>With mortality adjustment:</p>
        <MathBlock math={"\\text{APV} = \\sum_{t=0}^{4} 1.02^{-t} \\cdot c_t \\cdot 0.98^t = -100 + 27 \\cdot \\frac{0.98}{1.02} + 27 \\cdot \\frac{0.98^2}{1.02^2} + 27 \\cdot \\frac{0.98^3}{1.02^3} + 27 \\cdot \\frac{0.98^4}{1.02^4}"} display />
        <MathBlock math={"= -100 + 25.94 + 24.93 + 23.96 + 23.02 = -2.18"} display />
        <p>The APV is now <strong>negative</strong>! With mortality, there's a chance the borrower dies before repaying, making the loan unprofitable for the bank. This is exactly why life insurance matters: mortality risk changes the economics of long-term contracts.</p>
      </Example>

      <h3 className="sg-sub">Life Insurance Products — Survival Benefits</h3>

      <p className="sg-prose">
        The most common life insurance products can be expressed as simple APV formulas. We start with products that pay benefits <em>while the policyholder is alive</em>.
      </p>

      <Definition title="Lifelong Annuity">
        <p>A <strong>lifelong annuity</strong> pays a benefit of 1 unit per year as long as the policyholder (aged <MathBlock math={"x"} />) is alive. The APV is:</p>
        <MathBlock math={"\\ddot{a}_x = \\sum_{k=0}^{\\infty} {}_{k}p_x \\cdot (1 + i)^{-k}"} display />
        <p>The payment at <MathBlock math={"k = 0"} /> is immediate (multiplied by <MathBlock math={"{}_{0}p_x = 1"} /> and <MathBlock math={"v(0) = 1"} />).</p>
      </Definition>

      <Definition title="Temporary Annuity">
        <p>A <strong>temporary annuity</strong> pays 1 unit per year for at most <MathBlock math={"n"} /> years, only while the policyholder is alive:</p>
        <MathBlock math={"\\ddot{a}_{x:\\overline{n}|} = \\sum_{k=0}^{n-1} {}_{k}p_x \\cdot (1 + i)^{-k}"} display />
        <p>The upper limit is <MathBlock math={"n - 1"} /> because the annuity pays at the <em>beginning</em> of each of the <MathBlock math={"n"} /> years (times 0 through <MathBlock math={"n-1"} />).</p>
      </Definition>

      <Definition title="Deferred Annuity">
        <p>A <strong>deferred annuity</strong> pays 1 unit per year, but only starting after a deferral period of <MathBlock math={"n"} /> years (and only while alive). The APV is:</p>
        <MathBlock math={"{}_{n|}\\ddot{a}_x = \\sum_{k=n}^{\\infty} {}_{k}p_x \\cdot (1 + i)^{-k}"} display />
        <p>A typical example: a <strong>pension</strong> — premiums are paid during working years, and benefits start at retirement age.</p>
      </Definition>

      <Theorem title="Relationship Between Annuity Types">
        <p>A lifelong annuity can be decomposed into a temporary annuity (the first <MathBlock math={"n"} /> years) plus a deferred annuity (everything after):</p>
        <MathBlock math={"\\ddot{a}_x = \\ddot{a}_{x:\\overline{n}|} + {}_{n|}\\ddot{a}_x"} display />
      </Theorem>

      <h3 className="sg-sub">Life Insurance Products — Death Benefits</h3>

      <p className="sg-prose">
        Some products pay a benefit when the policyholder <em>dies</em> — for example, to pay off a mortgage or cover funeral expenses.
      </p>

      <Definition title="Term Life Insurance">
        <p>A <strong>term life insurance</strong> pays a benefit of <MathBlock math={"c"} /> at the end of the year of death, for a maximum of <MathBlock math={"\\omega - x"} /> years (i.e., up to the limiting age). The APV is:</p>
        <MathBlock math={"c \\cdot \\sum_{j=0}^{\\omega - x - 1} v(j + 1) \\cdot {}_{j}p_x \\cdot q_{x+j}"} display />
        <p>Each term represents: discount to time <MathBlock math={"j + 1"} /> (end of year), times probability of surviving <MathBlock math={"j"} /> years, times probability of dying in year <MathBlock math={"j + 1"} />.</p>
      </Definition>

      <Example title="Deriving the Term Insurance Formula">
        <p>For a person aged <MathBlock math={"x"} />, consider the first few possible death benefit payments:</p>
        <ul className="sg-list">
          <li><strong>Dies in year 1:</strong> Benefit <MathBlock math={"c"} /> paid at <MathBlock math={"t = 1"} />. APV contribution: <MathBlock math={"c \\cdot v(1) \\cdot q_x"} /></li>
          <li><strong>Dies in year 2:</strong> Must survive year 1 first. APV: <MathBlock math={"c \\cdot v(2) \\cdot p_x \\cdot q_{x+1}"} /></li>
          <li><strong>Dies in year 3:</strong> Must survive 2 years. APV: <MathBlock math={"c \\cdot v(3) \\cdot {}_{2}p_x \\cdot q_{x+2}"} /></li>
        </ul>
        <p style={{ marginTop: '0.5rem' }}>The pattern: for death in year <MathBlock math={"j + 1"} />, the APV contribution is <MathBlock math={"c \\cdot v(j+1) \\cdot {}_{j}p_x \\cdot q_{x+j}"} />. Summing over all possible years of death gives the full formula.</p>
      </Example>

      <Note>
        <p>
          <strong>Tip for setting up APV summations.</strong> Always write out the first two or three terms explicitly before trying to find the general pattern. This helps avoid off-by-one errors in the summation limits, which are a common exam mistake. For each term, ask: <em>when</em> is the payment made? What must have happened for it to occur?
        </p>
      </Note>

      <h3 className="sg-sub">Worked Example: Valuing a Lifelong Benefit</h3>

      <Example title="Lifelong Benefit for a 60-Year-Old">
        <p>A person aged <MathBlock math={"x = 60"} /> receives a benefit of 100 per year as long as they live. The mortality rates are <MathBlock math={"q_k = (k+1)/100"} /> for <MathBlock math={"k = 0, 1, \\ldots, 99"} /> (so <MathBlock math={"q_{60} = 61/100 = 0.61"} />, etc.), and the interest rate is <MathBlock math={"i = 2\\%"} />.</p>
        <p style={{ marginTop: '0.5rem' }}>The APV is:</p>
        <MathBlock math={"100 \\cdot \\sum_{k=0}^{99 - x} v(k) \\cdot {}_{k}p_x = 100 \\cdot \\sum_{k=0}^{39} (1.02)^{-k} \\cdot {}_{k}p_{60}"} display />
        <p>In R this can be computed as:</p>
        <div className="my-2 overflow-x-auto rounded-lg p-3" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-ink)' }}>
          <pre style={{ margin: 0 }}>{`iX <- 60
vQx <- (iX:99+1)/100
vkPx <- c(1, cumprod(1 - vQx))
vV <- 1/(1.02)^(0:(length(vkPx)-1))
100 * sum(vV * vkPx)  # = 160.40`}</pre>
        </div>
        <p>The APV is <strong>€160.40</strong>. This is the fair single premium for this contract — the lump sum the insurer should charge at inception to cover expected future benefits.</p>
      </Example>

      <h3 className="sg-sub">The Equivalence Principle</h3>

      <p className="sg-prose">
        How should premiums be set? The fundamental principle is:
      </p>

      <Theorem title="Equivalence Principle">
        <p>A premium is <strong>adequate</strong> (fair) if and only if:</p>
        <MathBlock math={"\\text{APV of premiums} = \\text{APV of benefits}"} display />
        <p>The present value of what the policyholder pays in should equal the present value of what the insurer pays out, on average.</p>
      </Theorem>

      <Note>
        <p>
          <strong>Why "on average"?</strong> For any individual policyholder, the insurer will either overpay (if the person lives long) or underpay (if they die early). But across a large portfolio, the law of large numbers ensures that the average outcome converges to the expected value. The equivalence principle sets premiums so that, in expectation, neither party profits at the expense of the other.
        </p>
      </Note>

      <h3 className="sg-sub">Summary</h3>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Product</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>APV Formula</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Pays when</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Lifelong annuity', '\\sum_{k=0}^{\\infty} {}_{k}p_x \\cdot v^k', 'Alive, forever'],
              ['Temporary annuity', '\\sum_{k=0}^{n-1} {}_{k}p_x \\cdot v^k', 'Alive, first n years'],
              ['Deferred annuity', '\\sum_{k=n}^{\\infty} {}_{k}p_x \\cdot v^k', 'Alive, after n years'],
              ['Term insurance', 'c \\sum_{j=0}^{\\omega-x-1} v^{j+1} \\cdot {}_{j}p_x \\cdot q_{x+j}', 'On death'],
            ].map(([product, formula, pays], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2" style={{ fontWeight: 500 }}>{product}</td>
                <td className="px-4 py-2"><MathBlock math={formula} /></td>
                <td className="px-4 py-2">{pays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
