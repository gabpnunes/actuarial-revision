import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'

export default function Topic5LifeTablesMortality() {
  return (
    <>
      <p className="sg-prose">
        To price life insurance, we need to know the probability that a policyholder will be alive (or dead) at various future times. This information is encoded in <strong>life tables</strong> — the fundamental data structure of actuarial mathematics. From a life table we extract mortality rates, survival probabilities, and life expectancies.
      </p>

      <h3 className="sg-sub">The Life Table</h3>

      <Definition title="Life Table">
        <p>A <strong>life table</strong> tracks a hypothetical cohort of <MathBlock math={"\\ell_0"} /> newborns. For each age <MathBlock math={"x"} />:</p>
        <ul className="sg-list">
          <li><MathBlock math={"\\ell_x"} /> — the number of people still alive at age <MathBlock math={"x"} /></li>
          <li><MathBlock math={"d_x"} /> — the number who die between age <MathBlock math={"x"} /> and age <MathBlock math={"x + 1"} /></li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>The fundamental relationship:</p>
        <MathBlock math={"\\ell_{x+1} = \\ell_x - d_x"} display />
        <p>We define <MathBlock math={"\\omega"} /> as the <strong>limiting age</strong> — the age at which everyone has died: <MathBlock math={"\\ell_\\omega = 0"} />. In practice, <MathBlock math={"\\omega"} /> is often set to 120 or 121.</p>
      </Definition>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-center" style={{ color: 'var(--color-ink-faint)' }}><MathBlock math={"x"} /></th>
              <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}><MathBlock math={"\\ell_x"} /></th>
              <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}><MathBlock math={"d_x"} /></th>
            </tr>
          </thead>
          <tbody>
            {[
              [0, '100,000', '2,000'],
              [1, '98,000', '1,500'],
              [2, '96,500', '1,000'],
              [3, '95,500', '900'],
            ].map(([x, lx, dx]) => (
              <tr key={x} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2 text-center">{x}</td>
                <td className="px-4 py-2 text-right">{lx}</td>
                <td className="px-4 py-2 text-right">{dx}</td>
              </tr>
            ))}
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td className="px-4 py-2 text-center">⋮</td>
              <td className="px-4 py-2 text-right">⋮</td>
              <td className="px-4 py-2 text-right">⋮</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-center"><MathBlock math={"\\omega"} /></td>
              <td className="px-4 py-2 text-right">0</td>
              <td className="px-4 py-2 text-right">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Note>
        <p>
          <strong>Real life tables</strong> are published by national statistics bureaus. They are typically separated by sex, and updated periodically. The starting cohort <MathBlock math={"\\ell_0"} /> is conventionally set to 100,000 — this is just a scaling choice; the probabilities we derive don't depend on it.
        </p>
      </Note>

      <h3 className="sg-sub">Survival Probabilities</h3>

      <Definition title="n-Year Survival Probability">
        <p>The probability that a person aged <MathBlock math={"x"} /> survives at least <MathBlock math={"n"} /> more years (i.e., reaches age <MathBlock math={"x + n"} />):</p>
        <MathBlock math={"{}_{n}p_x = \\frac{\\ell_{x+n}}{\\ell_x}"} display />
        <p>This is the ratio of the number alive at age <MathBlock math={"x + n"} /> to the number alive at age <MathBlock math={"x"} />.</p>
      </Definition>

      <Note>
        <p>
          <strong>Shorthand notation.</strong> The one-year survival probability <MathBlock math={"{}_{1}p_x"} /> is written simply as <MathBlock math={"p_x"} />, and the one-year mortality rate <MathBlock math={"{}_{1}q_x"} /> is written as <MathBlock math={"q_x"} />. These are <em>the</em> fundamental quantities in actuarial work.
        </p>
      </Note>

      <h3 className="sg-sub">Mortality Rates</h3>

      <Definition title="n-Year Mortality Rate">
        <p>The probability that a person aged <MathBlock math={"x"} /> dies within the next <MathBlock math={"n"} /> years:</p>
        <MathBlock math={"{}_{n}q_x = \\frac{\\ell_x - \\ell_{x+n}}{\\ell_x} = 1 - {}_{n}p_x"} display />
      </Definition>

      <Theorem title="Survival + Mortality = 1">
        <p>For any age <MathBlock math={"x"} /> and horizon <MathBlock math={"n"} />:</p>
        <MathBlock math={"{}_{n}p_x + {}_{n}q_x = 1"} display />
        <p>A person either survives or doesn't — these are complementary events.</p>
      </Theorem>

      <p className="sg-prose">
        The numerator of <MathBlock math={"{}_{n}q_x"} /> can be decomposed using the life table:
      </p>

      <MathBlock math={"\\ell_x - \\ell_{x+n} = d_x + d_{x+1} + \\cdots + d_{x+n-1}"} display />

      <p className="sg-prose">
        This is simply the total number of deaths between ages <MathBlock math={"x"} /> and <MathBlock math={"x + n"} />.
      </p>

      <h3 className="sg-sub">Chaining Survival Probabilities</h3>

      <Theorem title="Multiplication Rule for Survival">
        <p>The probability of surviving <MathBlock math={"k + s"} /> years can be decomposed:</p>
        <MathBlock math={"{}_{k}p_x \\cdot {}_{s}p_{x+k} = {}_{k+s}p_x"} display />
        <p>To survive <MathBlock math={"k + s"} /> years from age <MathBlock math={"x"} />, you must first survive <MathBlock math={"k"} /> years to reach age <MathBlock math={"x + k"} />, then survive <MathBlock math={"s"} /> more years to reach age <MathBlock math={"x + k + s"} />.</p>
      </Theorem>

      <Proof>
        <p>By the definition of <MathBlock math={"{}_{n}p_x"} />:</p>
        <MathBlock math={"{}_{k}p_x \\cdot {}_{s}p_{x+k} = \\frac{\\ell_{x+k}}{\\ell_x} \\cdot \\frac{\\ell_{x+k+s}}{\\ell_{x+k}} = \\frac{\\ell_{x+k+s}}{\\ell_x} = {}_{k+s}p_x \\qquad \\blacksquare"} display />
      </Proof>

      <Note>
        <p>
          <strong>This is the actuarial analogue of the discount function consistency property</strong> <MathBlock math={"v(s,t) \\cdot v(t,u) = v(s,u)"} /> from Topic 4. The structure is identical — one deals with money, the other with lives.
        </p>
      </Note>

      <p className="sg-prose">
        An important application: the probability that a person aged <MathBlock math={"x"} /> survives <MathBlock math={"k"} /> years but then dies within the following <MathBlock math={"s"} /> years:
      </p>

      <MathBlock math={"{}_{k}p_x \\cdot {}_{s}q_{x+k}"} display />

      <Example title="Probability of Dying at Age 20 (Given Age 18)">
        <p>Suppose the one-year mortality rate at age <MathBlock math={"x"} /> is <MathBlock math={"q_x = x/100"} />. What is the probability that an 18-year-old dies at the age of 20?</p>
        <p style={{ marginTop: '0.5rem' }}>The person must survive from 18 to 20 (two years), then die in the year from 20 to 21:</p>
        <MathBlock math={"{}_{2}p_{18} \\cdot q_{20} = p_{18} \\cdot p_{19} \\cdot q_{20}"} display />
        <MathBlock math={"= (1 - q_{18})(1 - q_{19}) \\cdot q_{20} = (1 - 0.18)(1 - 0.19) \\cdot 0.20"} display />
        <MathBlock math={"= 0.82 \\cdot 0.81 \\cdot 0.20 = 0.1328"} display />
      </Example>

      <Example title="Using a Real Life Table">
        <p>Given a fragment of a female life table:</p>
        <div className="my-4 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
          <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="px-4 py-2 text-center" style={{ color: 'var(--color-ink-faint)' }}><MathBlock math={"x"} /></th>
                <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}><MathBlock math={"\\ell_x^{\\text{Female}}"} /></th>
              </tr>
            </thead>
            <tbody>
              {[
                [30, '9,874,903'],
                [31, '9,866,578'],
                [32, '9,857,788'],
                [33, '9,848,477'],
                [34, '9,838,584'],
                [35, '9,828,040'],
              ].map(([x, lx]) => (
                <tr key={x} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-2 text-center">{x}</td>
                  <td className="px-4 py-2 text-right">{lx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>What is the probability that a 32-year-old woman dies in the coming two years?</p>
        <MathBlock math={"{}_{2}q_{32} = 1 - {}_{2}p_{32} = 1 - \\frac{\\ell_{34}}{\\ell_{32}} = 1 - \\frac{9{,}838{,}584}{9{,}857{,}788} = 0.001948"} display />
        <p>About 0.19% — roughly 1 in 500.</p>
      </Example>

      <h3 className="sg-sub">Life Expectancy</h3>

      <p className="sg-prose">
        Life expectancy summarizes an entire life table in a single number: how many more years can a person aged <MathBlock math={"x"} /> expect to live?
      </p>

      <Definition title="Curtate Life Expectancy">
        <p>The <strong>curtate future lifetime</strong> <MathBlock math={"K(x)"} /> is the number of <em>complete</em> years lived (rounded down to the nearest integer). The <strong>curtate life expectancy</strong> is:</p>
        <MathBlock math={"e_x = \\text{E}[K(x)] = \\sum_{k=0}^{\\infty} k \\cdot {}_{k}p_x \\cdot q_{x+k}"} display />
      </Definition>

      <Theorem title="Simplified Formula for Curtate Life Expectancy">
        <p>The curtate life expectancy simplifies to:</p>
        <MathBlock math={"e_x = \\sum_{k=1}^{\\infty} {}_{k}p_x"} display />
      </Theorem>

      <Proof>
        <p>Starting from the definition:</p>
        <MathBlock math={"e_x = \\sum_{k=0}^{\\infty} k \\cdot {}_{k}p_x \\cdot q_{x+k} = \\sum_{k=0}^{\\infty} k \\cdot {}_{k}p_x \\cdot (1 - p_{x+k})"} display />
        <MathBlock math={"= \\sum_{k=0}^{\\infty} k \\cdot {}_{k}p_x - \\sum_{k=0}^{\\infty} k \\cdot {}_{k+1}p_x"} display />
        <p>Re-index the second sum by substituting <MathBlock math={"j = k + 1"} /> (so <MathBlock math={"k = j - 1"} />):</p>
        <MathBlock math={"= \\sum_{k=1}^{\\infty} k \\cdot {}_{k}p_x - \\sum_{j=1}^{\\infty} (j-1) \\cdot {}_{j}p_x = \\sum_{k=1}^{\\infty} \\big[k - (k-1)\\big] \\cdot {}_{k}p_x = \\sum_{k=1}^{\\infty} {}_{k}p_x"} display />
      </Proof>

      <Note>
        <p>
          <strong>Intuition.</strong> Each term <MathBlock math={"{}_{k}p_x"} /> is the probability of surviving at least <MathBlock math={"k"} /> years. The sum counts the expected number of complete years survived — which is exactly the curtate life expectancy. This is a well-known result: for non-negative integer random variables, <MathBlock math={"\\text{E}[K] = \\sum_{k=1}^{\\infty} \\Pr[K \\geq k]"} />.
        </p>
      </Note>

      <Definition title="Complete Life Expectancy">
        <p>In reality, people don't die exactly on their birthday. Assuming deaths are uniformly distributed within each year, the <strong>complete life expectancy</strong> adds half a year:</p>
        <MathBlock math={"\\mathring{e}_x = e_x + \\tfrac{1}{2} = \\sum_{k=1}^{\\infty} {}_{k}p_x + \\tfrac{1}{2}"} display />
        <p>The <MathBlock math={"+ \\frac{1}{2}"} /> accounts for the fact that someone who dies in a given year lived, on average, an extra half-year beyond the last completed year.</p>
      </Definition>

      <Note>
        <p>
          <strong>Period vs. cohort.</strong> The life expectancies <MathBlock math={"e_x"} /> and <MathBlock math={"\\mathring{e}_x"} /> are <strong>period life expectancies</strong>: they use mortality rates from a single calendar year and assume those rates stay constant. In reality, mortality has been declining, so period life expectancy <em>underestimates</em> how long people actually live. <strong>Cohort life expectancy</strong> uses projected future mortality rates — but requires forecasting, which introduces uncertainty.
        </p>
      </Note>

      <h3 className="sg-sub">Summary</h3>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Quantity</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Definition</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['\\ell_x', '\\text{lives at age } x', 'Starting point for all calculations'],
              ['d_x', '\\ell_x - \\ell_{x+1}', 'Deaths between age x and x+1'],
              ['{}_{n}p_x', '\\ell_{x+n} / \\ell_x', 'Prob. of surviving n years from age x'],
              ['{}_{n}q_x', '1 - {}_{n}p_x', 'Prob. of dying within n years from age x'],
              ['e_x', '\\sum_{k=1}^{\\infty} {}_{k}p_x', 'Curtate life expectancy at age x'],
              ['\\mathring{e}_x', 'e_x + \\frac{1}{2}', 'Complete life expectancy at age x'],
            ].map(([qty, def, interp], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2"><MathBlock math={qty} /></td>
                <td className="px-4 py-2"><MathBlock math={def} /></td>
                <td className="px-4 py-2">{interp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
