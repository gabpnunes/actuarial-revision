import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import TreeDiagram from '../components/TreeDiagram'

export default function Topic8FinancialInstruments() {
  return (
    <>
      <p className="sg-prose">
        Insurance companies and pension funds invest the premiums they receive in financial markets. These markets are volatile, and financial derivatives (options) can be used to hedge against adverse price movements. In this section we introduce the basic financial products: <strong>bonds</strong>, <strong>stocks</strong>, and <strong>options</strong> (call and put). Understanding their payoff structures is essential before we can price them.
      </p>

      <h3 className="sg-sub">The One-Period Market Model</h3>

      <p className="sg-prose">
        We consider a simplified world where time has two points: <em>now</em> and <em>one year from now</em>. The economy can either go <strong>up</strong> (with probability <MathBlock math={"p"} />) or <strong>down</strong> (with probability <MathBlock math={"1 - p"} />). Any financial product <MathBlock math={"V"} /> has a known value today, but an uncertain value next year:
      </p>

      <div className="my-6 flex justify-center">
        <div style={{ position: 'relative', width: 260, height: 100 }}>
          <svg style={{ position: 'absolute', inset: 0 }} viewBox="0 0 260 100">
            <line x1="30" y1="50" x2="180" y2="14" stroke="rgba(134,239,172,0.4)" strokeWidth="1.5" />
            <line x1="30" y1="50" x2="180" y2="86" stroke="rgba(252,165,165,0.4)" strokeWidth="1.5" />
            <circle cx="30" cy="50" r="3.5" fill="var(--color-accent)" />
            <circle cx="180" cy="14" r="3.5" fill="var(--color-ok)" opacity="0.7" />
            <circle cx="180" cy="86" r="3.5" fill="var(--color-bad)" opacity="0.7" />
          </svg>
          <div style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)' }}>
            <MathBlock math={"V"} />
          </div>
          <div style={{ position: 'absolute', left: 92, top: 16, color: 'var(--color-ink-faint)', fontSize: '0.75rem' }}>
            <MathBlock math={"p"} />
          </div>
          <div style={{ position: 'absolute', left: 82, top: 60, color: 'var(--color-ink-faint)', fontSize: '0.75rem' }}>
            <MathBlock math={"1-p"} />
          </div>
          <div style={{ position: 'absolute', left: 192, top: 0 }}>
            <MathBlock math={"V^{\\text{up}}"} />
          </div>
          <div style={{ position: 'absolute', left: 192, top: 72 }}>
            <MathBlock math={"V^{\\text{down}}"} />
          </div>
        </div>
      </div>

      <h3 className="sg-sub">Bond (Risk-Free Asset)</h3>

      <Definition title="Bond">
        <p>A <strong>bond</strong> is a risk-free investment that earns a guaranteed return <MathBlock math={"r"} /> (the <strong>risk-free rate</strong>) regardless of whether the economy goes up or down. A bond worth <MathBlock math={"B"} /> today will be worth <MathBlock math={"B \\cdot (1 + r)"} /> in one year, in both scenarios:</p>
        <MathBlock math={"B^{\\text{up}} = B^{\\text{down}} = B \\cdot (1 + r)"} display />
        <p>For a bond with notional 1 (i.e., <MathBlock math={"B = 1"} />), the payoff is simply <MathBlock math={"1 + r"} /> in both states.</p>
      </Definition>

      <Note>
        <p>
          <strong>Why "risk-free"?</strong> The bond's return doesn't depend on the state of the economy. In practice, government bonds (e.g., Dutch or German) are considered approximately risk-free. The risk-free rate <MathBlock math={"r"} /> is the baseline return that any investment must beat to be worthwhile.
        </p>
      </Note>

      <h3 className="sg-sub">Stock (Risky Asset)</h3>

      <Definition title="Stock">
        <p>A <strong>stock</strong> (share) represents ownership in a company. Its value fluctuates with market conditions. A stock worth <MathBlock math={"S"} /> today has two possible values next year:</p>
        <MathBlock math={"S^{\\text{up}} = u \\cdot S \\quad \\text{and} \\quad S^{\\text{down}} = d \\cdot S"} display />
        <p>where <MathBlock math={"u > 1"} /> is the <strong>up factor</strong> and <MathBlock math={"0 < d < 1"} /> is the <strong>down factor</strong>. The profit in the up-scenario is <MathBlock math={"(u-1) \\cdot S"} /> and the loss in the down-scenario is <MathBlock math={"(1-d) \\cdot S"} />.</p>
      </Definition>

      <Note>
        <p>
          <strong>No-arbitrage condition:</strong> We need <MathBlock math={"d < 1 + r < u"} />. If <MathBlock math={"1 + r \\geq u"} />, the bond always does at least as well as the stock — nobody would hold the stock. If <MathBlock math={"1 + r \\leq d"} />, the stock always beats the bond — you could borrow at rate <MathBlock math={"r"} /> and invest in the stock for guaranteed profit (arbitrage).
        </p>
      </Note>

      <h3 className="sg-sub">Call Option</h3>

      <Definition title="Call Option">
        <p>A <strong>call option</strong> <MathBlock math={"C"} /> on a stock <MathBlock math={"S"} /> with <strong>strike price</strong> <MathBlock math={"K"} /> gives the holder the <em>right, but not the obligation</em>, to <strong>buy</strong> the stock at price <MathBlock math={"K"} /> at maturity.</p>
        <p style={{ marginTop: '0.75rem' }}>The payoff at maturity is:</p>
        <MathBlock math={"C = \\max\\{S - K, \\; 0\\}"} display />
        <ul className="sg-list">
          <li>If <MathBlock math={"S > K"} /> (stock above strike): exercise the option, buy at <MathBlock math={"K"} />, immediately sell at <MathBlock math={"S"} />, profit <MathBlock math={"S - K"} /></li>
          <li>If <MathBlock math={"S \\leq K"} /> (stock at or below strike): don't exercise, payoff is 0</li>
        </ul>
      </Definition>

      <p className="sg-prose">
        In our binomial model:
      </p>

      <MathBlock math={"C^{\\text{up}} = \\max\\{uS - K, \\; 0\\}, \\qquad C^{\\text{down}} = \\max\\{dS - K, \\; 0\\}"} display />

      <Example title="Call Option Payoffs">
        <p>Stock <MathBlock math={"S = 100"} />, strike <MathBlock math={"K = 100"} />, <MathBlock math={"u = 1.2"} />, <MathBlock math={"d = 0.9"} />:</p>
        <ul className="sg-list">
          <li><strong>Up:</strong> <MathBlock math={"C^{\\text{up}} = \\max\\{120 - 100, 0\\} = 20"} /></li>
          <li><strong>Down:</strong> <MathBlock math={"C^{\\text{down}} = \\max\\{90 - 100, 0\\} = 0"} /></li>
        </ul>
        <p>The call option pays off only when the stock goes up. The question is: what should this option cost <em>today</em>?</p>
        <div className="mt-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          <TreeDiagram title="Bond (r = 4%)" levels={[['100'], ['104', '104']]} />
          <TreeDiagram title="Stock" levels={[['100'], ['120', '90']]} />
          <TreeDiagram title="Call (K = 100)" levels={[['C = ?'], ['20', '0']]} />
        </div>
      </Example>

      <h3 className="sg-sub">Put Option</h3>

      <Definition title="Put Option">
        <p>A <strong>put option</strong> <MathBlock math={"P"} /> on a stock <MathBlock math={"S"} /> with strike price <MathBlock math={"K"} /> gives the holder the right to <strong>sell</strong> the stock at price <MathBlock math={"K"} /> at maturity.</p>
        <p style={{ marginTop: '0.75rem' }}>The payoff at maturity is:</p>
        <MathBlock math={"P = \\max\\{K - S, \\; 0\\}"} display />
        <ul className="sg-list">
          <li>If <MathBlock math={"K > S"} /> (strike above stock): exercise, sell at <MathBlock math={"K"} /> something worth <MathBlock math={"S"} />, profit <MathBlock math={"K - S"} /></li>
          <li>If <MathBlock math={"K \\leq S"} />: don't exercise, payoff is 0</li>
        </ul>
      </Definition>

      <Note>
        <p>
          <strong>Call vs. Put — who uses what?</strong> A call option is a bet that the stock <em>rises</em>. A put option is insurance against the stock <em>falling</em>. Put options are often used to protect portfolios: if you own a stock and buy a put, your downside is limited to the put premium — the put pays you when the stock drops.
        </p>
      </Note>

      <h3 className="sg-sub">Payoff Diagrams</h3>

      <p className="sg-prose">
        The payoff at maturity as a function of the stock price <MathBlock math={"S"} />:
      </p>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Contract</th>
              <th className="px-4 py-2 text-center" style={{ color: 'var(--color-ink-faint)' }}>Payoff if <MathBlock math={"S > K"} /></th>
              <th className="px-4 py-2 text-center" style={{ color: 'var(--color-ink-faint)' }}>Payoff if <MathBlock math={"S < K"} /></th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Shape</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td className="px-4 py-2" style={{ fontWeight: 500 }}>Long call</td>
              <td className="px-4 py-2 text-center"><MathBlock math={"S - K"} /></td>
              <td className="px-4 py-2 text-center">0</td>
              <td className="px-4 py-2">Hockey stick, slopes up-right</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td className="px-4 py-2" style={{ fontWeight: 500 }}>Short call (seller)</td>
              <td className="px-4 py-2 text-center"><MathBlock math={"-(S - K)"} /></td>
              <td className="px-4 py-2 text-center">0</td>
              <td className="px-4 py-2">Mirror of long call</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td className="px-4 py-2" style={{ fontWeight: 500 }}>Long put</td>
              <td className="px-4 py-2 text-center">0</td>
              <td className="px-4 py-2 text-center"><MathBlock math={"K - S"} /></td>
              <td className="px-4 py-2">Hockey stick, slopes down-right</td>
            </tr>
            <tr>
              <td className="px-4 py-2" style={{ fontWeight: 500 }}>Short put (seller)</td>
              <td className="px-4 py-2 text-center">0</td>
              <td className="px-4 py-2 text-center"><MathBlock math={"-(K - S)"} /></td>
              <td className="px-4 py-2">Mirror of long put</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Note>
        <p>
          <strong>Buyer vs. seller payoffs are mirror images.</strong> Options are zero-sum contracts: the buyer's profit is the seller's loss, and vice versa. The buyer pays a premium upfront for the right; the seller receives the premium but takes on the obligation.
        </p>
      </Note>

      <h3 className="sg-sub">The Leverage Effect</h3>

      <Example title="Stocks vs. Options — Risk and Return">
        <p>Compare two investors, each investing €1,000. Stock <MathBlock math={"S = 100"} />, call option price <MathBlock math={"C = 9"} />, <MathBlock math={"K = 100"} />.</p>

        <p style={{ marginTop: '0.5rem' }}><strong>Investor A</strong> buys 10 shares (€1,000 in stock):</p>
        <ul className="sg-list">
          <li>Stock up to 120: portfolio worth €1,200, profit <strong>+20%</strong></li>
          <li>Stock down to 90: portfolio worth €900, loss <strong>−10%</strong></li>
        </ul>

        <p style={{ marginTop: '0.5rem' }}><strong>Investor B</strong> buys 111 call options (€1,000 / €9 ≈ 111):</p>
        <ul className="sg-list">
          <li>Stock up to 120: each option pays 20, total €2,220, profit <strong>+122%</strong></li>
          <li>Stock down to 90: all options expire worthless, loss <strong>−100%</strong></li>
        </ul>

        <p style={{ marginTop: '0.5rem' }}>Options provide <strong>leverage</strong>: amplified returns in both directions. Investing in "naked" options (without holding the underlying stock) is essentially gambling — huge upside, but you can lose your entire investment.</p>
      </Example>

      <h3 className="sg-sub">Futures Contracts</h3>

      <Definition title="Future (Forward) Contract">
        <p>Unlike options, a <strong>future</strong> (or forward) gives the holder <em>the obligation</em> (not just the right) to buy the asset at the strike price <MathBlock math={"K"} /> at maturity. The payoff is:</p>
        <MathBlock math={"F = S - K"} display />
        <p>This can be <em>negative</em> — unlike an option, you cannot walk away. Futures are used to lock in prices: a farmer sells wheat futures to guarantee a sale price, removing price uncertainty.</p>
      </Definition>

      <Note>
        <p>
          <strong>Options vs. futures.</strong> A call option payoff is <MathBlock math={"\\max\\{S - K, 0\\}"} /> while a future's payoff is <MathBlock math={"S - K"} />. The call option has non-negative payoff, so it must have a positive price. A future can have negative payoff, and is typically structured so that no money changes hands at inception (the strike <MathBlock math={"K"} /> is chosen to make the contract fair).
        </p>
      </Note>

      <h3 className="sg-sub">Summary</h3>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Instrument</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Payoff at maturity</th>
              <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>Key feature</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Bond', 'B(1+r) \\text{ (both states)}', 'Risk-free, guaranteed return'],
              ['Stock', 'uS \\text{ or } dS', 'Risky, reflects company value'],
              ['Call option', '\\max\\{S - K, 0\\}', 'Right to buy at K'],
              ['Put option', '\\max\\{K - S, 0\\}', 'Right to sell at K'],
              ['Future', 'S - K', 'Obligation to buy at K'],
            ].map(([inst, payoff, feature], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2" style={{ fontWeight: 500 }}>{inst}</td>
                <td className="px-4 py-2"><MathBlock math={payoff} /></td>
                <td className="px-4 py-2">{feature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
