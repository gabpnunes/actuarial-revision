import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'

export default function Topic7Pensions() {
  return (
    <>
      <p className="sg-prose">
        A pension is a deferred annuity: a worker pays premiums during their career, and receives benefits after retirement. The central actuarial problem is calculating the <strong>adequate premium</strong> — the annual payment during working years that exactly funds the retirement benefit, accounting for both interest and mortality.
      </p>

      <h3 className="sg-sub">The Setup</h3>

      <Definition title="Pension Contract">
        <p>A pension fund member aged <MathBlock math={"x"} /> (where <MathBlock math={"x < x_r"} />, the retirement age) wants to receive an annual benefit of <MathBlock math={"b"} /> starting at retirement. The pension fund will pay this benefit from age <MathBlock math={"x_r"} /> onward, as long as the member is alive. In return, the member pays an annual premium <MathBlock math={"c"} /> until retirement.</p>
        <p style={{ marginTop: '0.75rem' }}>Two cash flow streams:</p>
        <ul className="sg-list">
          <li><strong>Premium stream:</strong> Member pays <MathBlock math={"c"} /> per year from age <MathBlock math={"x"} /> to age <MathBlock math={"x_r - 1"} /> (while alive)</li>
          <li><strong>Benefit stream:</strong> Fund pays <MathBlock math={"b"} /> per year from age <MathBlock math={"x_r"} /> onward (while alive)</li>
        </ul>
      </Definition>

      <h3 className="sg-sub">APV of the Benefit (Deferred Annuity)</h3>

      <p className="sg-prose">
        The benefit stream is a <strong>deferred annuity</strong> that starts at retirement. From the perspective of a member currently aged <MathBlock math={"x"} />, the APV of receiving 1 unit per year starting at retirement is:
      </p>

      <Definition title="APV of Pension Benefit">
        <MathBlock math={"a_b = \\sum_{k=x_r}^{\\infty} {}_{k-x}p_x \\cdot (1 + i)^{-(k-x)}"} display />
        <p>Each term accounts for:</p>
        <ul className="sg-list">
          <li><MathBlock math={"{}_{k-x}p_x"} /> — probability of surviving from current age <MathBlock math={"x"} /> to age <MathBlock math={"k"} /></li>
          <li><MathBlock math={"(1+i)^{-(k-x)}"} /> — discount factor from age <MathBlock math={"k"} /> back to age <MathBlock math={"x"} /></li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>The total APV of the benefit is <MathBlock math={"b \\cdot a_b"} />.</p>
      </Definition>

      <h3 className="sg-sub">APV of the Premiums (Temporary Annuity)</h3>

      <p className="sg-prose">
        The premium stream is a <strong>temporary annuity</strong> lasting from age <MathBlock math={"x"} /> until retirement at age <MathBlock math={"x_r"} />:
      </p>

      <Definition title="APV of Premium Payments">
        <MathBlock math={"a_c = \\sum_{k=x}^{x_r - 1} {}_{k-x}p_x \\cdot (1 + i)^{-(k-x)}"} display />
        <p>This sums from the current age to one year before retirement (since the last premium is paid at the <em>start</em> of the final working year).</p>
        <p style={{ marginTop: '0.75rem' }}>The total APV of premiums is <MathBlock math={"c \\cdot a_c"} />.</p>
      </Definition>

      <h3 className="sg-sub">The Equivalence Principle for Pensions</h3>

      <Theorem title="Adequate Pension Premium">
        <p>Applying the equivalence principle — APV of premiums must equal APV of benefits:</p>
        <MathBlock math={"c \\cdot a_c = b \\cdot a_b"} display />
        <p>Solving for the premium:</p>
        <MathBlock math={"c = b \\cdot \\frac{a_b}{a_c}"} display />
      </Theorem>

      <Note>
        <p>
          <strong>Intuition for the ratio <MathBlock math={"a_b / a_c"} />.</strong> This ratio compares the "actuarial weight" of the benefit period to the premium period. If the benefit period is long relative to the premium period (e.g., early retirement with long life expectancy), the ratio is large and premiums must be high. If retirement is late and life expectancy is short, the ratio is small and premiums are lower.
        </p>
      </Note>

      <Example title="Computing the Pension Premium">
        <p>A member aged <MathBlock math={"x = 30"} /> wants a benefit of <MathBlock math={"b = 20{,}000"} /> per year starting at retirement age <MathBlock math={"x_r = 67"} />. Interest rate <MathBlock math={"i = 2\\%"} />, and mortality rates are given by a standard life table.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>Step 1: Compute <MathBlock math={"a_b"} /> (benefit APV per unit).</strong></p>
        <MathBlock math={"a_b = \\sum_{k=67}^{\\omega} {}_{k-30}p_{30} \\cdot 1.02^{-(k-30)}"} display />
        <p>This sums over all ages from 67 to <MathBlock math={"\\omega"} />, discounting each year's survival-weighted benefit back to age 30.</p>

        <p style={{ marginTop: '0.5rem' }}><strong>Step 2: Compute <MathBlock math={"a_c"} /> (premium APV per unit).</strong></p>
        <MathBlock math={"a_c = \\sum_{k=30}^{66} {}_{k-30}p_{30} \\cdot 1.02^{-(k-30)}"} display />
        <p>This sums over the 37 working years (ages 30 through 66).</p>

        <p style={{ marginTop: '0.5rem' }}><strong>Step 3: Solve for the premium.</strong></p>
        <MathBlock math={"c = 20{,}000 \\cdot \\frac{a_b}{a_c}"} display />
        <p>The exact value depends on the life table used. For typical Dutch mortality rates, <MathBlock math={"a_b/a_c"} /> is roughly 0.3–0.4, giving an annual premium of around €6,000–8,000.</p>
      </Example>

      <h3 className="sg-sub">Key Factors Affecting Pension Premiums</h3>

      <p className="sg-prose">
        Several factors determine whether pensions are expensive or cheap:
      </p>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Factor</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Effect on premium <MathBlock math={"c"} /></th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Why</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Higher benefit b', 'Higher', 'More to pay out'],
              ['Earlier retirement x_r', 'Higher', 'Longer benefit period, shorter premium period'],
              ['Higher life expectancy', 'Higher', 'Benefits paid for more years'],
              ['Higher interest rate i', 'Lower', 'Investments earn more, need less upfront'],
              ['Starting younger (lower x)', 'Lower', 'More years to accumulate premiums'],
            ].map(([factor, effect, why], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2" style={{ fontWeight: 500 }}>{factor}</td>
                <td className="px-4 py-2" style={{ color: effect === 'Higher' ? 'var(--color-bad)' : 'var(--color-ok)' }}>{effect}</td>
                <td className="px-4 py-2">{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Note>
        <p>
          <strong>The pension crisis in numbers.</strong> In the Netherlands, the retirement age has risen from 65 to 67 (and may rise further), precisely because of two of these factors: people live longer (increasing <MathBlock math={"a_b"} />) and interest rates have been historically low (reducing investment returns). Both effects push premiums higher — or equivalently, make existing pension funds underfunded.
        </p>
      </Note>

      <h3 className="sg-sub">Effect of Interest Rate Changes</h3>

      <p className="sg-prose">
        A pension fund invests premiums at a given interest rate. If the rate changes between when the premiums were set and when the pension is paid out, the achievable benefit changes too.
      </p>

      <Definition title="Pension Pot and Interest Rate Sensitivity">
        <p>A member who has been paying premiums has accumulated a <strong>pension pot</strong> — the total present value of their savings at retirement. If the original interest rate was used to promise a benefit <MathBlock math={"b"} />, then:</p>
        <MathBlock math={"\\text{Pot} = b \\cdot a_b^{\\text{old}}"} display />
        <p>If the interest rate changes, the APV of a €1 annuity changes from <MathBlock math={"a_b^{\\text{old}}"} /> to <MathBlock math={"a_b^{\\text{new}}"} />. The pot stays the same, but the benefit it can fund changes:</p>
        <MathBlock math={"b^{\\text{new}} = \\frac{\\text{Pot}}{a_b^{\\text{new}}} = b \\cdot \\frac{a_b^{\\text{old}}}{a_b^{\\text{new}}}"} display />
        <p>A <em>lower</em> interest rate means a <em>higher</em> APV per unit, so the same pot buys a <em>smaller</em> annual benefit.</p>
      </Definition>

      <Example title="Interest Rate Drop">
        <p>A member was promised €25,000/year. The original APV of €1/year at retirement was 19.5 (at 2% interest). Now the insurer uses 1.5%, giving an APV of 22.5.</p>
        <p style={{ marginTop: '0.5rem' }}>Pension pot: <MathBlock math={"25{,}000 \\times 19.5 = 487{,}500"} /></p>
        <p>New benefit: <MathBlock math={"487{,}500 / 22.5 = 21{,}666.67"} /> per year — a <strong>13.3% reduction</strong>.</p>
      </Example>

      <h3 className="sg-sub">High-Low Pension Construction</h3>

      <p className="sg-prose">
        A retiree may prefer <strong>higher benefits early in retirement</strong> (when they are active and healthy) and lower benefits later. A <strong>high-low construction</strong> pays a higher benefit <MathBlock math={"b_H"} /> for the first <MathBlock math={"n"} /> years, then switches to a lower benefit <MathBlock math={"b_L"} /> for the remainder. The total value must remain the same as the original flat pension.
      </p>

      <Definition title="High-Low Pension Equivalence">
        <p>A retiree originally receives a flat pension of <MathBlock math={"b"} /> per year with lifelong annuity value <MathBlock math={"a"} />. They switch to:</p>
        <ul className="sg-list">
          <li><MathBlock math={"b_H"} /> for the first <MathBlock math={"n"} /> years (annuity value <MathBlock math={"a_H"} />)</li>
          <li><MathBlock math={"b_L"} /> for the remaining years (annuity value <MathBlock math={"a_L = a - a_H"} />)</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>The <strong>actuarial equivalence</strong> condition requires the total PV to be unchanged:</p>
        <MathBlock math={"a_H \\cdot b_H + a_L \\cdot b_L = a \\cdot b"} display />
        <p>Typically <MathBlock math={"b_L = b_H - \\Delta"} /> for some known drop <MathBlock math={"\\Delta"} />, giving one equation in one unknown.</p>
      </Definition>

      <Example title="High-Low Pension Calculation">
        <p>Rahul retires with a flat pension of €40,000/year. He switches to high-low: <MathBlock math={"b_H"} /> for the first 15 years, then <MathBlock math={"b_L = b_H - 10{,}000"} />. The PV of €1 for the first 15 years is 13.8, and for the years after is 6.5.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>Step 1:</strong> Total lifelong annuity value: <MathBlock math={"a = 13.8 + 6.5 = 20.3"} /></p>
        <p><strong>Step 2:</strong> Current total PV: <MathBlock math={"40{,}000 \\times 20.3 = 812{,}000"} /></p>
        <p><strong>Step 3:</strong> Equivalence equation:</p>
        <MathBlock math={"13.8 \\cdot b_H + 6.5 \\cdot (b_H - 10{,}000) = 812{,}000"} display />
        <MathBlock math={"20.3 \\cdot b_H - 65{,}000 = 812{,}000"} display />
        <MathBlock math={"b_H = \\frac{877{,}000}{20.3} = 43{,}201.97, \\qquad b_L = 33{,}201.97"} display />
      </Example>

      <Example title="High-Low with Fixed b_H">
        <p>Jack receives €30,000/year. He switches to <MathBlock math={"b_H = 50{,}000"} /> for the first 5 years, then <MathBlock math={"b_L"} /> after. Lifelong annuity value <MathBlock math={"a = 25"} />, first 5 years annuity value <MathBlock math={"a_H = 4.5"} />.</p>
        <p style={{ marginTop: '0.5rem' }}>Late annuity: <MathBlock math={"a_L = 25 - 4.5 = 20.5"} /></p>
        <MathBlock math={"4.5 \\times 50{,}000 + 20.5 \\times b_L = 25 \\times 30{,}000 = 750{,}000"} display />
        <MathBlock math={"b_L = \\frac{750{,}000 - 225{,}000}{20.5} = \\frac{525{,}000}{20.5} = 25{,}609.76"} display />
      </Example>

      <h3 className="sg-sub">Subsidizing Solidarity</h3>

      <Example title="Cross-Subsidization in Life Insurance">
        <p>A life insurer has 1,000 one-year term life insurance policies with benefit €50,000:</p>
        <div className="my-4 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
          <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Group</th>
                <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}>Count</th>
                <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}><MathBlock math={"q_x"} /></th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2">Healthy</td>
                <td className="px-4 py-2 text-right">750</td>
                <td className="px-4 py-2 text-right">0.001</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2">Unhealthy</td>
                <td className="px-4 py-2 text-right">250</td>
                <td className="px-4 py-2 text-right">0.005</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>A uniform premium of €200 is charged (ignoring interest, <MathBlock math={"i = 0"} />).</p>

        <p style={{ marginTop: '0.5rem' }}><strong>(a) Profit on healthy insureds:</strong></p>
        <p>Premium income from healthy: <MathBlock math={"750 \\times 200 = 150{,}000"} /></p>
        <p>Expected claims: <MathBlock math={"750 \\times 0.001 \\times 50{,}000 = 37{,}500"} /></p>
        <p>Expected profit: <MathBlock math={"150{,}000 - 37{,}500 = 112{,}500"} /></p>

        <p style={{ marginTop: '0.5rem' }}><strong>(b) Break-even premium:</strong></p>
        <p>Total expected deaths: <MathBlock math={"750 \\times 0.001 + 250 \\times 0.005 = 0.75 + 1.25 = 2"} /></p>
        <p>Total expected claims: <MathBlock math={"2 \\times 50{,}000 = 100{,}000"} /></p>
        <p>Break-even premium: <MathBlock math={"100{,}000 / 1{,}000 = 100"} /> per policy.</p>

        <p style={{ marginTop: '0.5rem' }}><strong>(c) Subsidizing solidarity:</strong></p>
        <p>Fair premium for healthy: <MathBlock math={"0.001 \\times 50{,}000 = 50"} /></p>
        <p>Fair premium for unhealthy: <MathBlock math={"0.005 \\times 50{,}000 = 250"} /></p>
        <p>At the break-even premium of €100, healthy insureds overpay by €50 each. Total subsidy: <MathBlock math={"750 \\times 50 = 37{,}500"} /> transferred from healthy to unhealthy.</p>
      </Example>

      <Note>
        <p>
          <strong>Solidarity is a policy choice.</strong> When an insurer charges the same premium to all risk groups, low-risk individuals subsidize high-risk ones. This can be socially desirable (health insurance) or problematic (adverse selection). Actuaries quantify this cross-subsidization; the decision to allow it is political.
        </p>
      </Note>

      <h3 className="sg-sub">Summary</h3>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Concept</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Formula / Idea</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Benefit APV', 'a_b = \\sum_{k=x_r}^{\\infty} {}_{k-x}p_x \\cdot (1+i)^{-(k-x)}'],
              ['Premium APV', 'a_c = \\sum_{k=x}^{x_r - 1} {}_{k-x}p_x \\cdot (1+i)^{-(k-x)}'],
              ['Equivalence', 'c \\cdot a_c = b \\cdot a_b'],
              ['Adequate premium', 'c = b \\cdot a_b / a_c'],
              ['Interest rate change', 'b^{\\text{new}} = b \\cdot a_b^{\\text{old}} / a_b^{\\text{new}}'],
              ['High-low equivalence', 'a_H \\cdot b_H + a_L \\cdot b_L = a \\cdot b'],
              ['Solidarity', '\\text{Uniform premium} \\Rightarrow \\text{cross-subsidization}'],
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
