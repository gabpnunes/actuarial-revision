import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import TreeDiagram from '../components/TreeDiagram'

export default function Topic9BinomialPricing() {
  return (
    <>
      <p className="sg-prose">
        We know the payoffs of a call or put option at maturity, but what should the option cost <em>today</em>? The key insight is that the option's payoff can be <strong>replicated</strong> — perfectly reproduced using a combination of stocks and bonds. If two portfolios have identical payoffs in all scenarios, they must have the same price. This is the <strong>no-arbitrage principle</strong>, and it gives us a precise formula for option prices.
      </p>

      <h3 className="sg-sub">The Replicating Portfolio Idea</h3>

      <p className="sg-prose">
        We want to find a portfolio of <MathBlock math={"\\phi"} /> stocks and <MathBlock math={"\\psi"} /> bonds that produces the same payoff as the option in <em>every</em> scenario. If such a portfolio exists, then the option price must equal the portfolio's cost — otherwise there would be an arbitrage opportunity.
      </p>

      <h3 className="sg-sub">Worked Example: One Period</h3>

      <Example title="Pricing a Call Option by Replication">
        <p>Consider a market with:</p>
        <ul className="sg-list">
          <li><strong>Bond:</strong> <MathBlock math={"B = 100"} />, risk-free rate <MathBlock math={"r = 4\\%"} />, so payoff = 104 in both states</li>
          <li><strong>Stock:</strong> <MathBlock math={"S = 100"} />, up to 120, down to 90</li>
          <li><strong>Call option:</strong> strike <MathBlock math={"K = 100"} />, payoff: 20 (up) or 0 (down), price <MathBlock math={"C = ?"} /></li>
        </ul>

        <div className="my-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          <TreeDiagram title="Bond" levels={[['100'], ['104', '104']]} />
          <TreeDiagram title="Stock" levels={[['100'], ['120', '90']]} />
          <TreeDiagram title="Call (K = 100)" levels={[['C = ?'], ['20', '0']]} />
        </div>

        <p style={{ marginTop: '0.5rem' }}>We need <MathBlock math={"\\phi"} /> and <MathBlock math={"\\psi"} /> such that the portfolio matches the option in both states:</p>

        <div className="my-4 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
          <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}></th>
                <th className="px-4 py-2 text-center" style={{ color: 'var(--color-ink-faint)' }}>Bond</th>
                <th className="px-4 py-2 text-center" style={{ color: 'var(--color-ink-faint)' }}>+ Stock</th>
                <th className="px-4 py-2 text-center" style={{ color: 'var(--color-ink-faint)' }}>= Call option</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2">Price now:</td>
                <td className="px-4 py-2 text-center"><MathBlock math={"\\psi \\times 100"} /></td>
                <td className="px-4 py-2 text-center"><MathBlock math={"+ \\phi \\times 100"} /></td>
                <td className="px-4 py-2 text-center"><MathBlock math={"= C"} /></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2">Up payoff:</td>
                <td className="px-4 py-2 text-center"><MathBlock math={"\\psi \\times 104"} /></td>
                <td className="px-4 py-2 text-center"><MathBlock math={"+ \\phi \\times 120"} /></td>
                <td className="px-4 py-2 text-center"><MathBlock math={"= 20"} /></td>
              </tr>
              <tr>
                <td className="px-4 py-2">Down payoff:</td>
                <td className="px-4 py-2 text-center"><MathBlock math={"\\psi \\times 104"} /></td>
                <td className="px-4 py-2 text-center"><MathBlock math={"+ \\phi \\times 90"} /></td>
                <td className="px-4 py-2 text-center"><MathBlock math={"= 0"} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p><strong>Solving the system</strong> (3 equations, 3 unknowns):</p>
        <p>From the last two equations: <MathBlock math={"\\phi \\cdot (120 - 90) = 20 - 0"} />, so <MathBlock math={"\\phi = 2/3"} />.</p>
        <p>Substituting into the down equation: <MathBlock math={"\\psi \\cdot 104 + (2/3) \\cdot 90 = 0"} />, so <MathBlock math={"\\psi = -60/104 \\approx -0.5769"} />.</p>
        <p>The option price:</p>
        <MathBlock math={"C = \\psi \\times 100 + \\phi \\times 100 = -57.69 + 66.67 = 8.97"} display />
      </Example>

      <Note>
        <p>
          <strong>Interpreting the replicating portfolio.</strong> <MathBlock math={"\\phi = 2/3 > 0"} /> means we <em>buy</em> 2/3 of a stock. <MathBlock math={"\\psi \\approx -0.577 < 0"} /> means we <em>borrow</em> 0.577 bonds (take a loan at the risk-free rate). So replicating a call option means: borrow money and use it to buy stock. This makes sense — a call option is a leveraged bet on the stock going up.
        </p>
      </Note>

      <h3 className="sg-sub">Generic One-Period Formula</h3>

      <p className="sg-prose">
        Now we generalize. Bond notional 1, stock price <MathBlock math={"S"} />, up/down factors <MathBlock math={"u, d"} />, risk-free rate <MathBlock math={"r"} />, option payoffs <MathBlock math={"C_u"} /> (up) and <MathBlock math={"C_d"} /> (down).
      </p>

      <Theorem title="Replicating Portfolio">
        <p>The stock and bond positions that replicate the option are:</p>
        <MathBlock math={"\\phi = \\frac{C_u - C_d}{S(u - d)}, \\qquad \\psi = \\frac{u \\cdot C_d - d \\cdot C_u}{(1 + r)(u - d)}"} display />
      </Theorem>

      <Proof>
        <p>The replication conditions are:</p>
        <MathBlock math={"\\psi(1+r) + \\phi \\cdot uS = C_u \\qquad \\text{(up state)}"} display />
        <MathBlock math={"\\psi(1+r) + \\phi \\cdot dS = C_d \\qquad \\text{(down state)}"} display />
        <p>Subtracting the second from the first: <MathBlock math={"\\phi \\cdot S(u - d) = C_u - C_d"} />, giving <MathBlock math={"\\phi"} />.</p>
        <p>Substituting back into either equation gives <MathBlock math={"\\psi"} />.</p>
      </Proof>

      <Theorem title="Option Price Formula">
        <p>The option price is the cost of the replicating portfolio:</p>
        <MathBlock math={"C = \\phi \\cdot S + \\psi \\cdot 1"} display />
        <p>Substituting the expressions for <MathBlock math={"\\phi"} /> and <MathBlock math={"\\psi"} /> and simplifying:</p>
        <MathBlock math={"C = \\frac{1}{1+r}\\Big(q \\cdot C_u + (1-q) \\cdot C_d\\Big)"} display />
        <p>where:</p>
        <MathBlock math={"q = \\frac{1 + r - d}{u - d}"} display />
      </Theorem>

      <Proof>
        <p>Starting from <MathBlock math={"C = \\phi S + \\psi"} />:</p>
        <MathBlock math={"C = \\frac{C_u - C_d}{S(u-d)} \\cdot S + \\frac{uC_d - dC_u}{(1+r)(u-d)}"} display />
        <MathBlock math={"= \\frac{C_u - C_d}{u-d} + \\frac{uC_d - dC_u}{(1+r)(u-d)}"} display />
        <MathBlock math={"= \\frac{(1+r)(C_u - C_d) + uC_d - dC_u}{(1+r)(u-d)}"} display />
        <MathBlock math={"= \\frac{(1+r-d)C_u + (u-1-r)C_d}{(1+r)(u-d)}"} display />
        <MathBlock math={"= \\frac{1}{1+r}\\left(\\frac{1+r-d}{u-d} \\cdot C_u + \\frac{u-1-r}{u-d} \\cdot C_d\\right)"} display />
        <p>Setting <MathBlock math={"q = (1+r-d)/(u-d)"} /> gives the result. Note <MathBlock math={"1-q = (u-1-r)/(u-d)"} />.</p>
      </Proof>

      <h3 className="sg-sub">Risk-Neutral Pricing</h3>

      <Definition title="Risk-Neutral Probability">
        <p>The quantity <MathBlock math={"q = \\frac{1+r-d}{u-d}"} /> is called the <strong>risk-neutral probability</strong>. Under the no-arbitrage condition <MathBlock math={"d < 1+r < u"} />, we have <MathBlock math={"0 < q < 1"} />, so <MathBlock math={"q"} /> is indeed a valid probability.</p>
      </Definition>

      <Theorem title="Risk-Neutral Pricing Formula">
        <p>The option price equals the <strong>discounted expected payoff under the risk-neutral measure</strong>:</p>
        <MathBlock math={"C = \\frac{1}{1+r} \\, \\text{E}^{\\mathbb{Q}}[\\text{payoff}] = \\frac{1}{1+r}\\Big(q \\cdot C_u + (1-q) \\cdot C_d\\Big)"} display />
        <p>The expectation <MathBlock math={"\\text{E}^{\\mathbb{Q}}"} /> uses the risk-neutral probability <MathBlock math={"q"} />, <strong>not</strong> the real-world probability <MathBlock math={"p"} />.</p>
      </Theorem>

      <Note>
        <p>
          <strong>The real-world probability <MathBlock math={"p"} /> doesn't appear in the pricing formula!</strong> This is a profound result. The option price depends on <MathBlock math={"S, u, d, r"} />, and <MathBlock math={"K"} /> — but <em>not</em> on the actual probability of the stock going up. The reason: the real-world probabilities are already embedded in the current stock price <MathBlock math={"S"} />. By pricing relative to <MathBlock math={"S"} />, we've implicitly accounted for them.
        </p>
      </Note>

      <Example title="Verifying the Formula">
        <p>Using our earlier example: <MathBlock math={"S = 100"} />, <MathBlock math={"u = 1.2"} />, <MathBlock math={"d = 0.9"} />, <MathBlock math={"r = 0.04"} />, <MathBlock math={"K = 100"} />.</p>
        <MathBlock math={"q = \\frac{1.04 - 0.9}{1.2 - 0.9} = \\frac{0.14}{0.30} = \\frac{7}{15} \\approx 0.467"} display />
        <MathBlock math={"C = \\frac{1}{1.04}\\left(\\frac{7}{15} \\cdot 20 + \\frac{8}{15} \\cdot 0\\right) = \\frac{1}{1.04} \\cdot \\frac{140}{15} = \\frac{1}{1.04} \\cdot 9.33 = 8.97"} display />
        <p>This matches our earlier result from solving the system of equations directly.</p>
      </Example>

      <h3 className="sg-sub">Creating a Riskless Portfolio</h3>

      <p className="sg-prose">
        The replicating portfolio also lets us construct a <strong>riskless hedge</strong>. If an investor sells <MathBlock math={"N"} /> options, they can hedge by buying <MathBlock math={"\\phi \\cdot N"} /> stocks. The remaining cash goes to a bank account, and the net payoff in one year is zero regardless of the market direction.
      </p>

      <Example title="Hedging 100 Options">
        <p>Sell 100 call options at €8.97 each (revenue: €897). Buy <MathBlock math={"\\phi \\cdot 100 = 66\\frac{2}{3}"} /> stocks at €100 each (cost: €6,667). Net cash flow: <MathBlock math={"897 - 6{,}667 = -5{,}770"} /> (borrow €5,770 at 4%).</p>

        <p style={{ marginTop: '0.5rem' }}><strong>If stock goes up (120):</strong></p>
        <ul className="sg-list">
          <li>Option holders exercise: you pay 100 × 20 = −€2,000... but wait, they buy stock from you at 100 when it's worth 120. You receive 100 × 100 = +€10,000</li>
          <li>Repay loan: −€6,000 (5,770 × 1.04)</li>
          <li>Buy 33⅓ extra stocks at 120: −€4,000</li>
          <li><strong>Net: 0</strong></li>
        </ul>

        <p style={{ marginTop: '0.5rem' }}><strong>If stock goes down (90):</strong></p>
        <ul className="sg-list">
          <li>Options expire worthless: €0</li>
          <li>Sell 66⅔ stocks at 90: +€6,000</li>
          <li>Repay loan: −€6,000</li>
          <li><strong>Net: 0</strong></li>
        </ul>

        <p style={{ marginTop: '0.5rem' }}>The portfolio is <strong>perfectly hedged</strong> — zero risk in both scenarios.</p>
      </Example>

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
              ['Stock position', '\\phi = (C_u - C_d) / [S(u - d)]'],
              ['Bond position', '\\psi = (uC_d - dC_u) / [(1+r)(u-d)]'],
              ['Option price', 'C = \\phi S + \\psi'],
              ['Risk-neutral prob.', 'q = (1+r-d) / (u-d)'],
              ['Risk-neutral pricing', 'C = \\frac{1}{1+r}(q C_u + (1-q) C_d)'],
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
