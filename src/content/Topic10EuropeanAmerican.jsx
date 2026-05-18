import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import TreeDiagram from '../components/TreeDiagram'

export default function Topic10EuropeanAmerican() {
  return (
    <>
      <p className="sg-prose">
        So far we've priced options in a one-period model. Reality is more complex: stock prices change continuously, and some options can be exercised before maturity. In this final topic we extend the binomial model to <strong>multiple periods</strong> and introduce the distinction between <strong>European</strong> and <strong>American</strong> options.
      </p>

      <h3 className="sg-sub">Multi-Period Binomial Trees</h3>

      <p className="sg-prose">
        Instead of one large step, we divide the year into <MathBlock math={"n"} /> smaller steps of size <MathBlock math={"\\Delta t = 1/n"} />. At each step the stock moves up by factor <MathBlock math={"u"} /> or down by factor <MathBlock math={"d"} />. With <MathBlock math={"n"} /> steps, there are <MathBlock math={"n + 1"} /> possible stock prices at maturity.
      </p>

      <Definition title="Multi-Period Stock Price Tree">
        <p>After <MathBlock math={"n"} /> periods, the possible stock prices are:</p>
        <MathBlock math={"S \\cdot u^j \\cdot d^{n-j}, \\qquad j = 0, 1, \\ldots, n"} display />
        <p>where <MathBlock math={"j"} /> is the number of up-moves. If <MathBlock math={"u = 1/d"} />, then <MathBlock math={"u^j d^{n-j} = u^{2j-n}"} />, and the tree "recombines" — an up-then-down move gives the same price as a down-then-up move.</p>
      </Definition>

      <Example title="Two-Period Binomial Tree">
        <p>Stock <MathBlock math={"S = 100"} />, <MathBlock math={"u = 1.2"} />, <MathBlock math={"d = 0.9"} />. After 2 periods:</p>
        <div className="my-4 flex justify-center">
          <TreeDiagram levels={[['100'], ['120', '90'], ['144', '108', '81']]} />
        </div>
        <p>Note: <MathBlock math={"100 \\times 1.2 \\times 0.9 = 108 = 100 \\times 0.9 \\times 1.2"} /> — the tree recombines. The middle node (108) can be reached by either up-then-down or down-then-up.</p>
      </Example>

      <h3 className="sg-sub">Choosing u, d, and p to Match Reality</h3>

      <p className="sg-prose">
        Stock returns are typically assumed to be <strong>lognormally distributed</strong>:
      </p>

      <MathBlock math={"\\ln(S_{t+\\Delta t}/S_t) \\sim \\text{Normal}(\\nu \\Delta t, \\; \\sigma^2 \\Delta t)"} display />

      <p className="sg-prose">
        where <MathBlock math={"\\nu"} /> is the annual drift (mean log-return) and <MathBlock math={"\\sigma"} /> is the annual volatility. To match the mean and variance of this distribution in the binomial model with <MathBlock math={"u = 1/d"} />, we set:
      </p>

      <Theorem title="Binomial Tree Parameters">
        <MathBlock math={"u \\approx \\exp(\\sigma\\sqrt{\\Delta t}), \\qquad d \\approx \\exp(-\\sigma\\sqrt{\\Delta t})"} display />
        <MathBlock math={"p \\approx \\frac{1}{2} + \\frac{1}{2}\\left(\\frac{\\nu}{\\sigma}\\right)\\sqrt{\\Delta t}"} display />
        <p>As <MathBlock math={"\\Delta t \\to 0"} /> (more and more steps), the binomial model converges to the continuous-time Black–Scholes model.</p>
      </Theorem>

      <h3 className="sg-sub">Continuous vs. Discrete Discounting</h3>

      <Definition title="Continuous Interest Rate">
        <p>In continuous time, we use a continuous interest rate <MathBlock math={"r^c"} /> instead of a discrete rate <MathBlock math={"r^d"} />:</p>
        <ul className="sg-list">
          <li><strong>Discrete:</strong> 1 unit grows to <MathBlock math={"(1 + r^d)"} /> after one year</li>
          <li><strong>Continuous:</strong> 1 unit grows to <MathBlock math={"e^{r^c}"} /> after one year</li>
          <li><strong>Over period <MathBlock math={"\\Delta t"} />:</strong> discount factor is <MathBlock math={"\\exp(-r^c \\Delta t)"} /> (continuous) vs. <MathBlock math={"(1 + r^d)^{-1}"} /> (discrete)</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>When <MathBlock math={"r^d = r^c"} /> and <MathBlock math={"\\Delta t"} /> is small, the two are nearly identical.</p>
      </Definition>

      <h3 className="sg-sub">Backward Induction (Pricing Multi-Period Options)</h3>

      <p className="sg-prose">
        To price an option on a multi-period tree, we work <strong>backwards</strong> from maturity:
      </p>

      <Definition title="Backward Induction Algorithm">
        <p><strong>Step 1:</strong> At maturity (the final nodes), compute the option payoff directly:</p>
        <MathBlock math={"C_{\\text{final}} = \\max\\{S_{\\text{final}} - K, \\; 0\\} \\quad \\text{(call)}"} display />

        <p><strong>Step 2:</strong> At each earlier node, the option value is the discounted risk-neutral expected value of the next period's option values:</p>
        <MathBlock math={"C = \\exp(-r^c \\Delta t)\\Big(q \\cdot C_u + (1-q) \\cdot C_d\\Big)"} display />
        <p>where <MathBlock math={"q = \\frac{\\exp(r^c \\Delta t) - d}{u - d}"} /> is the risk-neutral probability.</p>

        <p><strong>Step 3:</strong> Repeat backward until you reach the starting node — that's the option price.</p>
      </Definition>

      <Example title="Two-Period Call Pricing">
        <p><MathBlock math={"S = 100, K = 100, u = 1.2, d = 0.9, r = 4\\%"} /> per period, 2 periods.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>Step 1 — payoffs at maturity:</strong></p>
        <ul className="sg-list">
          <li><MathBlock math={"S_{uu} = 144"} />: payoff = <MathBlock math={"\\max\\{144 - 100, 0\\} = 44"} /></li>
          <li><MathBlock math={"S_{ud} = 108"} />: payoff = <MathBlock math={"\\max\\{108 - 100, 0\\} = 8"} /></li>
          <li><MathBlock math={"S_{dd} = 81"} />: payoff = <MathBlock math={"\\max\\{81 - 100, 0\\} = 0"} /></li>
        </ul>
        <p style={{ marginTop: '0.5rem' }}><strong>Step 2 — work backward one period:</strong></p>
        <p>Risk-neutral probability: <MathBlock math={"q = (1.04 - 0.9)/(1.2 - 0.9) = 7/15"} /></p>
        <ul className="sg-list">
          <li>At node <MathBlock math={"S_u = 120"} />: <MathBlock math={"C_u = (7/15 \\cdot 44 + 8/15 \\cdot 8)/1.04 = 24.10"} /></li>
          <li>At node <MathBlock math={"S_d = 90"} />: <MathBlock math={"C_d = (7/15 \\cdot 8 + 8/15 \\cdot 0)/1.04 = 3.59"} /></li>
        </ul>
        <p style={{ marginTop: '0.5rem' }}><strong>Step 3 — work backward to now:</strong></p>
        <MathBlock math={"C = \\frac{1}{1.04}\\left(\\frac{7}{15} \\cdot 24.10 + \\frac{8}{15} \\cdot 3.59\\right) = \\frac{1}{1.04}(11.25 + 1.91) = \\frac{13.16}{1.04} = 12.65"} display />
      </Example>

      <h3 className="sg-sub">European vs. American Options</h3>

      <Definition title="European Option">
        <p>A <strong>European option</strong> can only be exercised <em>at maturity</em>. Its value before maturity is purely the continuation value (hold the option and wait):</p>
        <MathBlock math={"C^{\\text{European}} = \\exp(-r^c \\Delta t)\\Big(q \\cdot C_u + (1-q) \\cdot C_d\\Big)"} display />
      </Definition>

      <Definition title="American Option">
        <p>An <strong>American option</strong> can be exercised <em>at any time</em> before or at maturity. At each node, the holder chooses the <strong>maximum</strong> of exercising now vs. holding:</p>
        <MathBlock math={"P^{\\text{American}} = \\max\\Big\\{K - S, \\;\\; \\exp(-r^c \\Delta t)(q \\cdot P_u + (1-q) \\cdot P_d)\\Big\\}"} display />
        <p>The first term <MathBlock math={"K - S"} /> is the <strong>exercise value</strong> (immediate payoff if exercised). The second term is the <strong>continuation value</strong> (expected value of holding the option).</p>
      </Definition>

      <Theorem title="American ≥ European">
        <p>An American option is always worth at least as much as the corresponding European option:</p>
        <MathBlock math={"V^{\\text{American}} \\geq V^{\\text{European}}"} display />
        <p>The American option has all the rights of the European one, plus the additional right of early exercise. More rights = more value (or at least equal).</p>
      </Theorem>

      <Note>
        <p>
          <strong>When does early exercise matter?</strong> For <strong>call options</strong>, it can be shown that early exercise is <em>never</em> optimal (on a non-dividend-paying stock), so American and European call prices are equal. For <strong>put options</strong>, early exercise <em>can</em> be optimal — when the stock price drops far enough below the strike, it's better to exercise immediately and invest the proceeds at the risk-free rate rather than waiting.
        </p>
      </Note>

      <Example title="American vs. European Put">
        <p>Consider a put option with <MathBlock math={"K = 100"} /> on a multi-period tree. At some node deep in the tree, suppose <MathBlock math={"S = 70"} />.</p>
        <ul className="sg-list">
          <li><strong>Exercise value:</strong> <MathBlock math={"K - S = 100 - 70 = 30"} /></li>
          <li><strong>Continuation value:</strong> <MathBlock math={"\\exp(-r\\Delta t)(q P_u + (1-q) P_d)"} />, which might be, say, 28</li>
        </ul>
        <p>The American put holder exercises immediately (30 &gt; 28), while the European put holder must wait. This means <MathBlock math={"P^{\\text{American}} > P^{\\text{European}}"} /> for this contract.</p>
      </Example>

      <h3 className="sg-sub">Effect of Parameters on Option Prices</h3>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Parameter increases</th>
              <th className="px-4 py-2 text-center" style={{ color: 'var(--color-ink-faint)' }}>Call price</th>
              <th className="px-4 py-2 text-center" style={{ color: 'var(--color-ink-faint)' }}>Put price</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Why</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Stock price S', '↑', '↓', 'Higher S → more likely to end above K (call) / below K (put)'],
              ['Strike price K', '↓', '↑', 'Higher K → harder to profit from call / easier for put'],
              ['Volatility σ', '↑', '↑', 'More dispersion → higher upside payoff; downside is floored at 0'],
              ['Interest rate r', '↑', '↓', 'Higher r → lower PV of strike; favors call, hurts put'],
              ['Time to maturity', '↑', '↑', 'More time → more uncertainty → higher option value'],
            ].map(([param, call, put, why], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2" style={{ fontWeight: 500 }}>{param}</td>
                <td className="px-4 py-2 text-center" style={{ fontSize: '1.1rem' }}>{call}</td>
                <td className="px-4 py-2 text-center" style={{ fontSize: '1.1rem' }}>{put}</td>
                <td className="px-4 py-2 text-xs">{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Note>
        <p>
          <strong>Volatility makes both options more valuable.</strong> This is because options have asymmetric payoffs: you benefit from large moves in your direction (payoff increases), but your loss is capped at zero (you just don't exercise). More volatility means more chance of a big favorable move, while the downside is unchanged.
        </p>
      </Note>

      <h3 className="sg-sub">Beyond Two States: Multi-State Models</h3>

      <p className="sg-prose">
        The standard binomial model has two states (up and down). In some settings, there are <strong>three or more possible outcomes</strong>. This changes the replication and pricing argument.
      </p>

      <Definition title="Three-State Model">
        <p>With three states (up, middle, down), two instruments (bond + stock) give only two equations — not enough to pin down three risk-neutral probabilities. You need a <strong>third traded instrument</strong> (e.g., a call option with a known price) to form a complete system:</p>
        <MathBlock math={"q^{\\text{up}} + q^{\\text{mid}} + q^{\\text{down}} = 1 \\quad \\text{(probabilities sum to 1)}"} display />
        <MathBlock math={"q^{\\text{up}} \\cdot S^{\\text{up}} + q^{\\text{mid}} \\cdot S^{\\text{mid}} + q^{\\text{down}} \\cdot S^{\\text{down}} = (1+r) \\cdot S \\quad \\text{(stock)}"} display />
        <MathBlock math={"q^{\\text{up}} \\cdot C^{\\text{up}} + q^{\\text{mid}} \\cdot C^{\\text{mid}} + q^{\\text{down}} \\cdot C^{\\text{down}} = (1+r) \\cdot C \\quad \\text{(call)}"} display />
        <p>Similarly, to replicate a new instrument (e.g., a put), you use a portfolio of bonds, stocks, <em>and</em> calls — three instruments for three states.</p>
      </Definition>

      <Example title="Three-State Replication">
        <p>Bond <MathBlock math={"B = 100"} /> paying 100 in all states (<MathBlock math={"r = 0"} />). Stock <MathBlock math={"S = 100"} /> going to 110, 100, or 90. Call <MathBlock math={"C = 3"} /> with strike 100: payoffs 10, 0, 0.</p>
        <p style={{ marginTop: '0.5rem' }}>From the call equation: <MathBlock math={"10q^{\\text{up}} = 3"} />, so <MathBlock math={"q^{\\text{up}} = 0.3"} />.</p>
        <p>From the stock and probability constraint: <MathBlock math={"q^{\\text{down}} = 0.3"} />, <MathBlock math={"q^{\\text{mid}} = 0.4"} />.</p>
        <p>A put with payoffs 0, 0, 10 is worth: <MathBlock math={"P = q^{\\text{down}} \\times 10 = 3"} />.</p>
      </Example>

      <h3 className="sg-sub">Options in Actuarial Practice</h3>

      <p className="sg-prose">
        Why do actuaries need to understand options? Several reasons:
      </p>

      <ul className="sg-list">
        <li><strong>Investment risk:</strong> Insurers invest premiums in financial markets. Options and other derivatives help <em>hedge</em> against adverse market movements.</li>
        <li><strong>Embedded options:</strong> Many insurance products contain hidden option-like features. A guaranteed minimum return on a unit-linked policy is effectively a put option on the investment fund.</li>
        <li><strong>Solvency regulation:</strong> Under Solvency II, insurers must value liabilities at market-consistent prices, which requires option pricing techniques.</li>
        <li><strong>Variable annuities:</strong> Products like GMDBs (Guaranteed Minimum Death Benefits) combine life insurance with financial guarantees — pricing them requires both mortality modelling and option pricing.</li>
      </ul>

      <h3 className="sg-sub">Summary</h3>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Concept</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Key Idea</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Multi-period tree', '\\text{Divide time into } n \\text{ steps; } n+1 \\text{ outcomes at maturity}'],
              ['Backward induction', '\\text{Price from maturity back to now, one step at a time}'],
              ['Risk-neutral pricing', 'C = e^{-r\\Delta t}(qC_u + (1-q)C_d)'],
              ['European option', '\\text{Exercise at maturity only}'],
              ['American option', '\\max\\{\\text{exercise}, \\text{continuation}\\} \\text{ at each node}'],
              ['u, d parameters', 'u = e^{\\sigma\\sqrt{\\Delta t}}, \\; d = e^{-\\sigma\\sqrt{\\Delta t}}'],
              ['Convergence', '\\text{As } \\Delta t \\to 0 \\text{, binomial} \\to \\text{Black\\textendash Scholes}'],
            ].map(([concept, idea], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2" style={{ fontWeight: 500 }}>{concept}</td>
                <td className="px-4 py-2"><MathBlock math={idea} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
