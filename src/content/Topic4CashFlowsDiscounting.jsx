import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'

export default function Topic4CashFlowsDiscounting() {
  return (
    <>
      <p className="sg-prose">
        Life insurance is fundamentally about payments that happen at different points in time and that depend on whether the policyholder is alive. Before we can price any life insurance product, we need two building blocks: <strong>cash flows</strong> (the payments themselves) and <strong>discounting</strong> (how to compare payments at different times). This topic covers both.
      </p>

      <h3 className="sg-sub">Cash Flows</h3>

      <Definition title="Cash Flow Vector">
        <p>A <strong>cash flow</strong> is a payment made from one party to another at a specific point in time. We assume payments occur at integer times <MathBlock math={"t = 0, 1, 2, \\ldots"} />, where <MathBlock math={"t = 0"} /> is now and <MathBlock math={"t = k"} /> is <MathBlock math={"k"} /> years from now.</p>
        <p style={{ marginTop: '0.75rem' }}>The net cash flow at time <MathBlock math={"k"} /> is denoted <MathBlock math={"c_k"} />:</p>
        <ul className="sg-list">
          <li><MathBlock math={"c_k > 0"} />: money <em>received</em></li>
          <li><MathBlock math={"c_k < 0"} />: money <em>paid out</em></li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>All cash flows are collected in a <strong>cash flow vector</strong>:</p>
        <MathBlock math={"\\mathbf{c} = (c_0, c_1, \\ldots, c_N)"} display />
        <p>where <MathBlock math={"N"} /> is the final period at which a payment is made.</p>
      </Definition>

      <Example title="Loan Repayment">
        <p>A bank lends you €100 now (<MathBlock math={"t = 0"} />) and you repay €27 per year for four years (<MathBlock math={"t = 1, \\ldots, 4"} />).</p>
        <p style={{ marginTop: '0.5rem' }}><strong>From the bank's perspective:</strong></p>
        <MathBlock math={"\\mathbf{c} = (-100, \\; 27, \\; 27, \\; 27, \\; 27)"} display />
        <p>The bank pays out 100 (negative) and receives 27 each year (positive).</p>
        <p style={{ marginTop: '0.5rem' }}><strong>From your perspective:</strong></p>
        <MathBlock math={"-\\mathbf{c} = (100, \\; -27, \\; -27, \\; -27, \\; -27)"} display />
        <p>You receive 100 and pay 27 each year. Note: one party's cash flow is the negative of the other's.</p>
      </Example>

      <Note>
        <p>
          <strong>Sign convention matters.</strong> Always be explicit about whose perspective the cash flow vector represents. In actuarial work, this is typically from the insurer's point of view: premiums received are positive, benefits paid are negative.
        </p>
      </Note>

      <h3 className="sg-sub">Discounting</h3>

      <p className="sg-prose">
        A euro today is worth more than a euro next year — because you can invest it and earn a return. Insurance companies invest the premiums they receive, and these investment returns can be used to cover future obligations. This is why we need <strong>discounting</strong>: to express future payments in terms of their value today.
      </p>

      <Example title="Why Discounting Matters">
        <p>An insurer must pay a benefit of €100 at the end of the year. If investments earn 2% per year, the insurer doesn't need €100 now — only:</p>
        <MathBlock math={"100 \\cdot 1.02^{-1} = 98.04"} display />
        <p>By investing €98.04 today at 2%, it grows to exactly €100 in one year. The <strong>present value</strong> of the €100 obligation is €98.04.</p>
      </Example>

      <h3 className="sg-sub">Discount Functions</h3>

      <Definition title="Discount Function">
        <p>The <strong>discount function</strong> <MathBlock math={"v(s, t)"} /> gives the value at time <MathBlock math={"s"} /> of 1 unit paid at time <MathBlock math={"t"} />.</p>
        <ul className="sg-list">
          <li>If <MathBlock math={"s < t"} />: <MathBlock math={"v(s, t)"} /> is the amount you must invest at time <MathBlock math={"s"} /> to receive 1 at time <MathBlock math={"t"} /> (present value)</li>
          <li>If <MathBlock math={"s > t"} />: <MathBlock math={"v(s, t)"} /> is the amount that 1 unit invested at time <MathBlock math={"t"} /> has grown to by time <MathBlock math={"s"} /> (accumulated value)</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>A cash flow of <MathBlock math={"c"} /> at time <MathBlock math={"t"} /> has value <MathBlock math={"v(s, t) \\cdot c"} /> at time <MathBlock math={"s"} />.</p>
      </Definition>

      <Theorem title="Consistency Property">
        <p>For discount functions to be consistent, the following must hold for all <MathBlock math={"s, t, u"} />:</p>
        <MathBlock math={"v(s, t) \\cdot v(t, u) = v(s, u)"} display />
      </Theorem>

      <Proof>
        <p>1 unit at time <MathBlock math={"u"} /> is worth <MathBlock math={"v(t, u)"} /> at time <MathBlock math={"t"} />. This <MathBlock math={"v(t, u)"} /> at time <MathBlock math={"t"} /> is worth <MathBlock math={"v(s, t) \\cdot v(t, u)"} /> at time <MathBlock math={"s"} />. But 1 unit at time <MathBlock math={"u"} /> is also directly worth <MathBlock math={"v(s, u)"} /> at time <MathBlock math={"s"} />. These must be equal.</p>
      </Proof>

      <p className="sg-prose">
        Two immediate consequences of the consistency property:
      </p>

      <Theorem title="Properties of Discount Functions">
        <p>Setting <MathBlock math={"s = t = u"} /> in the consistency property:</p>
        <MathBlock math={"v(s, s) = 1 \\quad \\text{for all } s"} display />
        <p>Setting <MathBlock math={"u = s"} />:</p>
        <MathBlock math={"v(s, t) = v(t, s)^{-1} = \\frac{1}{v(t, s)}"} display />
        <p>The "reverse" discount factor is just the reciprocal.</p>
      </Theorem>

      <h3 className="sg-sub">Simplifying: The Present Value Discount Factor</h3>

      <p className="sg-prose">
        Insurance companies need to value liabilities <em>now</em> (at <MathBlock math={"s = 0"} />). We introduce the shorthand:
      </p>

      <Definition title="Present Value Discount Factor">
        <MathBlock math={"v(t) := v(0, t)"} display />
        <p>This is the present value of 1 unit received at time <MathBlock math={"t"} />. Using the consistency property, we can express any discount factor in terms of <MathBlock math={"v(t)"} />:</p>
        <MathBlock math={"v(s, t) = \\frac{v(t)}{v(s)}"} display />
      </Definition>

      <p className="sg-prose">
        We also have useful recursion relationships:
      </p>

      <Theorem title="Recursion for Discount Factors">
        <MathBlock math={"v(n) = v(0, 1) \\cdot v(1, 2) \\cdots v(n-1, n)"} display />
        <p>and equivalently:</p>
        <MathBlock math={"v(n) = v(n-1) \\cdot v(n-1, n), \\qquad v(0) = 1"} display />
        <p>The <MathBlock math={"n"} />-year discount factor is the product of all one-year discount factors.</p>
      </Theorem>

      <h3 className="sg-sub">Interest Rates</h3>

      <p className="sg-prose">
        To actually compute discount functions, we need to know the <strong>interest rate</strong>. We make a key simplifying assumption:
      </p>

      <Definition title="Constant Interest Rate Assumption">
        <p>We assume that one-year returns are constant over time:</p>
        <MathBlock math={"v(s+1, s) = v(t+1, t) \\quad \\text{for all } s, t"} display />
        <p>The <strong>interest rate</strong> <MathBlock math={"i"} /> is defined by:</p>
        <MathBlock math={"v(s+1, s) = 1 + i"} display />
        <p>This means 1 unit invested at time <MathBlock math={"s"} /> grows to <MathBlock math={"1 + i"} /> at time <MathBlock math={"s + 1"} />.</p>
      </Definition>

      <Theorem title="Discount Factor Under Constant Interest">
        <p>Under a constant interest rate <MathBlock math={"i"} />, the present value discount factor is:</p>
        <MathBlock math={"v(n) = (1 + i)^{-n}"} display />
      </Theorem>

      <Proof>
        <p>From the recursion <MathBlock math={"v(n) = v(0,1) \\cdot v(1,2) \\cdots v(n-1,n)"} />, and since <MathBlock math={"v(k, k+1) = v(k+1, k)^{-1} = (1+i)^{-1}"} /> for every <MathBlock math={"k"} />, we get:</p>
        <MathBlock math={"v(n) = \\underbrace{(1+i)^{-1} \\cdot (1+i)^{-1} \\cdots (1+i)^{-1}}_{n \\text{ factors}} = (1+i)^{-n}"} display />
      </Proof>

      <Example title="Compound Interest">
        <p>You deposit €100 at the bank at <MathBlock math={"t = 0"} /> with interest rate <MathBlock math={"i = 2\\%"} />. What do you have at <MathBlock math={"t = 10"} />?</p>
        <MathBlock math={"100 \\cdot (1 + 0.02)^{10} = 100 \\cdot 1.02^{10} = 121.90"} display />
        <p>If the interest rate doubles to 4%, the amount at <MathBlock math={"t = 10"} /> is:</p>
        <MathBlock math={"100 \\cdot 1.04^{10} = 148.02"} display />
        <p>The interest earned (48.02) is <strong>more than double</strong> the interest at 2% (21.90). This is the <strong>compounding effect</strong>: you earn interest not just on the original capital, but on all previously earned interest.</p>
      </Example>

      <Note>
        <p>
          <strong>Compounding is non-linear.</strong> Doubling the interest rate more than doubles the total interest earned, because the "interest on interest" grows faster. Conversely, doubling the starting capital <em>exactly</em> doubles the final amount (since multiplication is linear). Whether doubling the rate or doubling the capital produces more depends on the rate itself — the crossover is at about <MathBlock math={"i \\approx 15.5\\%"} />.
        </p>
      </Note>

      <h3 className="sg-sub">Present Value of a Cash Flow</h3>

      <Definition title="Present Value">
        <p>Given a cash flow vector <MathBlock math={"\\mathbf{c} = (c_0, c_1, \\ldots, c_N)"} /> and discount factors <MathBlock math={"\\mathbf{v} = (v(0), v(1), \\ldots)"} />, the <strong>present value</strong> is:</p>
        <MathBlock math={"\\text{Val}(\\mathbf{c}, \\mathbf{v}) = \\sum_{t=0}^{N} v(t) \\cdot c_t"} display />
        <p>Under constant interest rate <MathBlock math={"i"} />:</p>
        <MathBlock math={"\\text{Val}(\\mathbf{c}, \\mathbf{v}) = \\sum_{t=0}^{N} (1+i)^{-t} \\cdot c_t"} display />
        <p>Note that <MathBlock math={"c_0"} /> is multiplied by <MathBlock math={"v(0) = 1"} /> — cash flows at time 0 are not discounted.</p>
      </Definition>

      <Example title="Present Value of a Loan">
        <p>Consider <MathBlock math={"\\mathbf{c} = (-100, 27, 27, 27, 27)"} /> with <MathBlock math={"i = 2\\%"} />:</p>
        <MathBlock math={"\\text{Val}(\\mathbf{c}, \\mathbf{v}) = \\sum_{t=0}^{4} 1.02^{-t} \\cdot c_t = -100 + \\frac{27}{1.02} + \\frac{27}{1.02^2} + \\frac{27}{1.02^3} + \\frac{27}{1.02^4}"} display />
        <MathBlock math={"= -100 + 26.47 + 25.95 + 25.44 + 24.94 = 2.81"} display />
        <p>The present value is <strong>€2.81</strong>. This means the bank should be indifferent between:</p>
        <ul className="sg-list">
          <li>Lending 100 now and receiving 27 per year for 4 years, or</li>
          <li>Simply having €2.81 in cash right now (invested at 2%)</li>
        </ul>
        <p>The positive present value tells us this loan is <em>profitable</em> for the bank at 2% interest.</p>
      </Example>

      <Note>
        <p>
          <strong>Decision rule.</strong> An investment is worthwhile if and only if its present value is positive. This is the fundamental principle behind all financial valuation: compare everything at the same point in time (usually now) by discounting all future cash flows.
        </p>
      </Note>

      <h3 className="sg-sub">Annuity Loans</h3>

      <Example title="Annuity Loan — Interest Decreases Over Time">
        <p>Andrew borrows €6,000 via an <strong>annuity loan</strong>: each year he repays a fixed portion of the principal, plus interest on the outstanding balance. Maturity is 6 years, interest rate is 5%.</p>
        <p style={{ marginTop: '0.5rem' }}>Each year he redeems €1,000 of principal. The interest in year <MathBlock math={"k"} /> is 5% of the remaining balance:</p>

        <div className="my-4 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
          <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Year</th>
                <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}>Outstanding</th>
                <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}>Interest (5%)</th>
                <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}>Repayment</th>
                <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}>Total paid</th>
              </tr>
            </thead>
            <tbody>
              {[
                [1, '6,000', '300', '1,000', '1,300'],
                [2, '5,000', '250', '1,000', '1,250'],
                [3, '4,000', '200', '1,000', '1,200'],
                [4, '3,000', '150', '1,000', '1,150'],
                [5, '2,000', '100', '1,000', '1,100'],
                [6, '1,000', '50', '1,000', '1,050'],
              ].map(([yr, out, int, rep, tot]) => (
                <tr key={yr} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-2">{yr}</td>
                  <td className="px-4 py-2 text-right">{out}</td>
                  <td className="px-4 py-2 text-right">{int}</td>
                  <td className="px-4 py-2 text-right">{rep}</td>
                  <td className="px-4 py-2 text-right">{tot}</td>
                </tr>
              ))}
              <tr style={{ fontWeight: 600 }}>
                <td className="px-4 py-2" colSpan={2}>Total interest</td>
                <td className="px-4 py-2 text-right">1,050</td>
                <td className="px-4 py-2" colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Total interest paid: €1,050 — which is <strong>less than</strong> €1,800 = 6 × 300 (what you'd pay if the balance never decreased). The interest decreases each year because part of the principal is redeemed annually.</p>
      </Example>

      <h3 className="sg-sub">From Finance to Insurance</h3>

      <p className="sg-prose">
        Discounting cash flows is used across all of finance: mortgage pricing, bond valuation, investment appraisal. What makes <strong>life insurance</strong> special is that cash flows are <em>uncertain</em> — they depend on whether the policyholder is alive or dead. A pension benefit is only paid if the retiree is alive; a death benefit is only paid if the policyholder dies.
      </p>

      <Note>
        <p>
          <strong>The bridge to actuarial mathematics.</strong> In standard finance, we compute:
        </p>
        <MathBlock math={"\\text{Present value} = \\sum_{t} v(t) \\cdot c_t"} display />
        <p>In life insurance, we must also account for the <em>probability</em> that the cash flow actually occurs:</p>
        <MathBlock math={"\\text{Actuarial present value} = \\sum_{t} v(t) \\cdot c_t \\cdot \\Pr[\\text{payment occurs at } t]"} display />
        <p>This is the <strong>actuarial present value (APV)</strong> — covered in Topic 6. To compute these probabilities, we need life tables and mortality rates — covered in Topic 5.</p>
      </Note>

      <h3 className="sg-sub">Summary</h3>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Concept</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Key Formula</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Cash flow vector', '\\mathbf{c} = (c_0, c_1, \\ldots, c_N)'],
              ['Discount function', 'v(s, t) = \\text{value at } s \\text{ of 1 at } t'],
              ['Consistency', 'v(s, t) \\cdot v(t, u) = v(s, u)'],
              ['Inverse', 'v(s, t) = v(t, s)^{-1}'],
              ['Present value factor', 'v(t) := v(0, t)'],
              ['Constant interest', 'v(n) = (1 + i)^{-n}'],
              ['Present value', '\\text{Val}(\\mathbf{c}, \\mathbf{v}) = \\sum_t v(t) \\cdot c_t'],
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
