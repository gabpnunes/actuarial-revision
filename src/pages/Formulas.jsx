import { Link } from 'react-router-dom'
import MathBlock from '../components/MathBlock'

/* ── tiny helpers ─────────────────────────────────────────── */

function SectionHeader({ id, number, title }) {
  return (
    <h2 id={id}
        className="mt-14 mb-6 flex items-baseline gap-3 border-b pb-3 text-xl"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-ink-strong)',
          borderColor: 'var(--border)',
        }}>
      <span className="text-base font-semibold" style={{ color: 'var(--color-accent)' }}>{number}</span>
      {title}
    </h2>
  )
}

function PartBanner({ label }) {
  return (
    <div className="mt-16 mb-2 flex items-center gap-3">
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      <span className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', letterSpacing: '0.15em' }}>
        {label}
      </span>
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
    </div>
  )
}

function Row({ name, math, note }) {
  return (
    <tr className="group" style={{ borderBottom: '1px solid var(--border)' }}>
      <td className="whitespace-nowrap py-2 pr-4 align-top text-sm"
          style={{ color: 'var(--color-ink-muted)', width: '35%' }}>
        {name}
      </td>
      <td className="py-2 align-top">
        <MathBlock math={math} />
        {note && <span className="ml-2 text-xs" style={{ color: 'var(--color-ink-faint)' }}>{note}</span>}
      </td>
    </tr>
  )
}

function FormulaTable({ children }) {
  return (
    <div className="mb-6 overflow-x-auto rounded-lg px-5 py-3"
         style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
      <table className="w-full" style={{ borderCollapse: 'collapse' }}>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

function SubHead({ children }) {
  return (
    <h3 className="sg-sub">{children}</h3>
  )
}

/* ── page ─────────────────────────────────────────────────── */

export default function Formulas() {

  /* quick‑nav anchors */
  const sections = [
    { id: 's1', n: '1', t: 'Compound Distributions' },
    { id: 's2', n: '2', t: 'GLMs' },
    { id: 's3', n: '3', t: 'Insurance Pricing' },
    { id: 's4', n: '4', t: 'Cash Flows & Discounting' },
    { id: 's5', n: '5', t: 'Life Tables & Mortality' },
    { id: 's6', n: '6', t: 'Actuarial Present Values' },
    { id: 's7', n: '7', t: 'Pensions' },
    { id: 's8', n: '8', t: 'Financial Instruments' },
    { id: 's9', n: '9', t: 'Binomial Pricing (One Period)' },
    { id: 's10', n: '10', t: 'Multi-Period & American Options' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>

      {/* ── sticky header ── */}
      <header className="sticky top-0 z-20 border-b backdrop-blur-md"
              style={{ borderColor: 'var(--border)', background: 'rgba(8,9,14,0.85)' }}>
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs" style={{ color: 'var(--color-ink-muted)', textDecoration: 'none' }}>
              &larr; Home
            </Link>
            <h1 className="text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-strong)' }}>
              Formula Sheet
            </h1>
          </div>
          <span className="text-xs" style={{ color: 'var(--color-ink-faint)' }}>
            10 topics
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">

        {/* ── table of contents ── */}
        <nav className="mb-10 rounded-xl px-5 py-4"
             style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest"
               style={{ color: 'var(--color-ink-faint)' }}>
            Jump to section
          </div>
          <div className="flex flex-wrap gap-2">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`}
                 className="rounded-full px-3 py-1 text-xs font-medium transition-colors"
                 style={{
                   background: 'rgba(196,181,253,0.08)',
                   color: 'var(--color-accent)',
                   border: '1px solid rgba(196,181,253,0.15)',
                   textDecoration: 'none',
                 }}>
                {s.n}. {s.t}
              </a>
            ))}
          </div>
        </nav>

        {/* ════════════════════════════════════════════════════
            PART I — NON-LIFE INSURANCE
           ════════════════════════════════════════════════════ */}
        <PartBanner label="Part I — Non-Life Insurance" />

        {/* ── 1  Compound Distributions ── */}
        <SectionHeader id="s1" number="1" title="Compound Distributions" />

        <SubHead>Compound Sum</SubHead>
        <FormulaTable>
          <Row name="Compound sum" math={"S = X_1 + X_2 + \\cdots + X_N"} />
          <Row name="Tower property" math={"\\mathbb{E}[S] = \\mathbb{E}[\\mathbb{E}[S \\mid N]]"} />
          <Row name="Expected value" math={"\\mathbb{E}[S] = \\mu_1 \\cdot \\mathbb{E}[N]"} />
          <Row name="Law of total variance" math={"\\operatorname{Var}[W] = \\mathbb{E}[\\operatorname{Var}[W \\mid V]] + \\operatorname{Var}[\\mathbb{E}[W \\mid V]]"} />
          <Row name="Variance" math={"\\operatorname{Var}[S] = \\mathbb{E}[N]\\,\\operatorname{Var}[X] + \\mu_1^{2}\\,\\operatorname{Var}[N]"} />
          <Row name="Compound Poisson variance" math={"\\operatorname{Var}[S] = \\lambda\\,\\mathbb{E}[X^2]"} />
        </FormulaTable>

        <SubHead>Additive Property</SubHead>
        <FormulaTable>
          <Row name="Sum of indep. comp. Poisson" math={"\\lambda = \\sum_i \\lambda_i"} note="also compound Poisson" />
          <Row name="Mixed claim distribution" math={"P(x) = \\sum_i \\frac{\\lambda_i}{\\lambda}\\,P_i(x)"} />
        </FormulaTable>

        <SubHead>Approximations & Inequalities</SubHead>
        <FormulaTable>
          <Row name="Normal approx. quantile" math={"q_S(\\alpha) = \\mu_S + \\sigma_S \\cdot \\Phi^{-1}(\\alpha)"} />
          <Row name="Markov's inequality" math={"\\Pr[Z \\ge \\varepsilon] \\le \\frac{\\mathbb{E}[Z]}{\\varepsilon}"} note="Z ≥ 0" />
          <Row name="Chebyshev's inequality" math={"\\Pr\\bigl[|X - \\mu| \\ge \\ell\\bigr] \\le \\frac{\\sigma^2}{\\ell^2}"} />
          <Row name="Variance of sample mean" math={"\\operatorname{Var}[\\bar{X}_n] = \\frac{\\sigma^2}{n}"} />
          <Row name="Variance of sum" math={"\\operatorname{Var}[S_n] = n\\sigma^2"} />
          <Row name="Weak Law of Large Numbers" math={"\\Pr\\bigl[|\\bar{X}_n - \\mu| \\ge \\ell\\bigr] \\le \\frac{\\sigma^2}{n\\ell^2} \\to 0"} />
        </FormulaTable>

        {/* ── 2  GLMs ── */}
        <SectionHeader id="s2" number="2" title="Generalised Linear Models" />

        <SubHead>Three Components</SubHead>
        <FormulaTable>
          <Row name="Stochastic" math={"\\operatorname{Var}[Y_i] = \\psi_i \\cdot V(\\mu_i)"} />
          <Row name="Systematic" math={"\\eta_i = \\sum_j \\beta_j\\, x_{ji}"} />
          <Row name="Link" math={"\\eta_i = g(\\mu_i)"} />
        </FormulaTable>

        <SubHead>Variance Functions</SubHead>
        <FormulaTable>
          <Row name="Normal" math={"V(\\mu) = 1"} />
          <Row name="Poisson" math={"V(\\mu) = \\mu"} />
          <Row name="Gamma" math={"V(\\mu) = \\mu^2"} />
        </FormulaTable>

        <SubHead>Canonical Links</SubHead>
        <FormulaTable>
          <Row name="Normal" math={"g(\\mu) = \\mu"} note="identity" />
          <Row name="Poisson" math={"g(\\mu) = \\ln \\mu"} note="log" />
          <Row name="Gamma" math={"g(\\mu) = 1/\\mu"} note="inverse" />
          <Row name="Binomial" math={"g(\\mu) = \\ln\\!\\left(\\frac{\\mu}{1-\\mu}\\right)"} note="logit" />
        </FormulaTable>

        <SubHead>Log-Link Multiplicative Model</SubHead>
        <FormulaTable>
          <Row name="Multiplicative form" math={"\\mathbb{E}(Y_i) = \\exp\\!\\left(\\sum_j \\beta_j x_{ji}\\right) = \\prod_j \\exp(\\beta_j x_{ji})"} />
        </FormulaTable>

        <SubHead>Maximum Likelihood</SubHead>
        <FormulaTable>
          <Row name="Log-likelihood" math={"\\ell(\\boldsymbol{\\beta}) = \\sum_i \\ln f(y_i \\mid \\mathbf{x}_i, \\boldsymbol{\\beta})"} />
          <Row name="Poisson MLE (exposure)" math={"\\hat{\\lambda} = \\frac{\\sum y_i}{\\sum w_i}"} />
          <Row name="Bernoulli MLE" math={"\\hat{p} = \\frac{\\sum y_i}{n}"} />
          <Row name="Binomial MLE" math={"\\hat{p} = \\frac{\\sum y_i}{\\sum x_i}"} />
        </FormulaTable>

        <SubHead>Inference</SubHead>
        <FormulaTable>
          <Row name="z-statistic" math={"z = \\frac{\\hat{\\beta}_j}{\\operatorname{SE}(\\hat{\\beta}_j)}"} note="significant if |z| > 2" />
          <Row name="Relative effect (binary)" math={"\\frac{\\lambda_{\\text{female}}}{\\lambda_{\\text{male}}} = \\exp(\\hat{\\beta}_2)"} />
          <Row name="Relative effect (continuous)" math={"\\frac{\\lambda(x + \\Delta x)}{\\lambda(x)} = \\exp(\\hat{\\beta}_1 \\cdot \\Delta x)"} />
        </FormulaTable>

        {/* ── 3  Insurance Pricing ── */}
        <SectionHeader id="s3" number="3" title="Insurance Pricing" />

        <FormulaTable>
          <Row name="Poisson GLM w/ exposure" math={"Y_i \\sim \\text{Poi}\\bigl(w_i \\cdot \\exp[\\eta_i]\\bigr)"} />
          <Row name="Offset" math={"\\ln w_i \\text{ enters } \\eta_i \\text{ with coefficient } 1"} />
          <Row name="Log-link multiplicative" math={"\\mathbb{E}[Y_i] = w_i \\cdot \\prod_j \\exp(\\beta_j x_{ji})"} />
          <Row name="Logit link" math={"g(p) = \\ln\\!\\left(\\frac{p}{1-p}\\right),\\quad p = \\frac{1}{1 + e^{-\\eta}}"} />
          <Row name="Mortality force MLE" math={"\\hat{\\mu}_x = \\frac{d}{e}"} note="deaths / exposure" />
        </FormulaTable>

        {/* ════════════════════════════════════════════════════
            PART II — LIFE INSURANCE
           ════════════════════════════════════════════════════ */}
        <PartBanner label="Part II — Life Insurance" />

        {/* ── 4  Cash Flows & Discounting ── */}
        <SectionHeader id="s4" number="4" title="Cash Flows & Discounting" />

        <FormulaTable>
          <Row name="Cash-flow vector" math={"\\mathbf{c} = (c_0,\\, c_1,\\, \\ldots,\\, c_N)"} />
          <Row name="Discount function" math={"v(s,t)"} note="value at s of 1 unit at t" />
          <Row name="Consistency" math={"v(s,t) \\cdot v(t,u) = v(s,u)"} />
          <Row name="Inverse" math={"v(s,t) = v(t,s)^{-1}"} />
          <Row name="Present value factor" math={"v(t) := v(0,t)"} />
          <Row name="Constant interest" math={"v(n) = (1+i)^{-n}"} />
          <Row name="Present value" math={"\\text{Val}(\\mathbf{c}, v) = \\sum_t v(t)\\, c_t"} />
        </FormulaTable>

        {/* ── 5  Life Tables & Mortality ── */}
        <SectionHeader id="s5" number="5" title="Life Tables & Mortality" />

        <FormulaTable>
          <Row name="Lives at age x" math={"\\ell_x"} />
          <Row name="Deaths" math={"d_x = \\ell_x - \\ell_{x+1}"} />
          <Row name="n-year survival prob." math={"{}_{n}p_x = \\frac{\\ell_{x+n}}{\\ell_x}"} />
          <Row name="n-year death prob." math={"{}_{n}q_x = 1 - {}_{n}p_x"} />
          <Row name="Multiplication rule" math={"{}_{k}p_x \\cdot {}_{s}p_{x+k} = {}_{k+s}p_x"} />
          <Row name="Deferred death prob." math={"{}_{k|s}q_x = {}_{k}p_x \\cdot {}_{s}q_{x+k}"} />
          <Row name="Force of mortality" math={"\\mu_x = \\lim_{h \\downarrow 0} \\frac{{}_{h}q_x}{h}"} />
          <Row name="Survival from force" math={"{}_{h}p_x = e^{-h\\,\\mu_x}"} />
          <Row name="Death prob. from force" math={"q_x = 1 - e^{-\\mu_x}"} />
          <Row name="Curtate life expectancy" math={"e_x = \\sum_{k=1}^{\\infty} {}_{k}p_x"} />
          <Row name="Complete life expectancy" math={"\\mathring{e}_x = e_x + \\tfrac{1}{2}"} />
        </FormulaTable>

        {/* ── 6  Actuarial Present Values ── */}
        <SectionHeader id="s6" number="6" title="Actuarial Present Values" />

        <FormulaTable>
          <Row name="General APV" math={"\\text{APV} = \\sum_{t=0}^{\\infty} v(t) \\cdot c_t \\cdot {}_{t}p_x"} />
          <Row name="Lifelong annuity APV" math={"\\ddot{a}_x = \\sum_{k=0}^{\\infty} {}_{k}p_x \\cdot v^k"} />
          <Row name="Temporary annuity APV" math={"\\ddot{a}_{x:\\overline{n}|} = \\sum_{k=0}^{n-1} {}_{k}p_x \\cdot v^k"} />
          <Row name="Deferred annuity APV" math={"{}_{n|}\\ddot{a}_x = \\sum_{k=n}^{\\infty} {}_{k}p_x \\cdot v^k"} />
          <Row name="Annuity decomposition" math={"\\ddot{a}_x = \\ddot{a}_{x:\\overline{n}|} + {}_{n|}\\ddot{a}_x"} />
          <Row name="Term insurance APV" math={"A_{x:\\overline{n}|}^{1} = c \\cdot \\sum_{j=0}^{\\omega - x - 1} v^{j+1}\\; {}_{j}p_x \\; q_{x+j}"} />
          <Row name="Equivalence principle" math={"\\text{APV}_{\\text{premiums}} = \\text{APV}_{\\text{benefits}}"} />
        </FormulaTable>

        {/* ── 7  Pensions ── */}
        <SectionHeader id="s7" number="7" title="Pensions" />

        <FormulaTable>
          <Row name="Benefit APV" math={"a_b = \\sum_{k=x_r}^{\\infty} {}_{k-x}p_x \\cdot (1+i)^{-(k-x)}"} />
          <Row name="Premium APV" math={"a_c = \\sum_{k=x}^{x_r - 1} {}_{k-x}p_x \\cdot (1+i)^{-(k-x)}"} />
          <Row name="Equivalence" math={"c \\cdot a_c = b \\cdot a_b"} />
          <Row name="Adequate premium" math={"c = b \\cdot \\dfrac{a_b}{a_c}"} />
          <Row name="Interest rate change" math={"b^{\\text{new}} = b \\cdot \\dfrac{a_b^{\\text{old}}}{a_b^{\\text{new}}}"} />
          <Row name="High-low equivalence" math={"a_H \\cdot b_H + a_L \\cdot b_L = a \\cdot b"} />
        </FormulaTable>

        {/* ════════════════════════════════════════════════════
            PART III — OPTION PRICING
           ════════════════════════════════════════════════════ */}
        <PartBanner label="Part III — Option Pricing" />

        {/* ── 8  Financial Instruments ── */}
        <SectionHeader id="s8" number="8" title="Financial Instruments" />

        <FormulaTable>
          <Row name="Bond payoff" math={"B(1+r) \\text{ in both states}"} />
          <Row name="Stock" math={"uS \\text{ (up)},\\quad dS \\text{ (down)}"} />
          <Row name="Call option payoff" math={"\\max\\{S - K,\\; 0\\}"} />
          <Row name="Put option payoff" math={"\\max\\{K - S,\\; 0\\}"} />
          <Row name="Forward payoff" math={"S - K"} />
          <Row name="No-arbitrage condition" math={"d < 1 + r < u"} />
        </FormulaTable>

        {/* ── 9  Binomial Pricing (One Period) ── */}
        <SectionHeader id="s9" number="9" title="Binomial Pricing (One Period)" />

        <SubHead>Replicating Portfolio</SubHead>
        <FormulaTable>
          <Row name="Portfolio" math={"\\Pi = \\varphi \\cdot S + \\psi \\cdot B"} />
          <Row name="Stock position" math={"\\varphi = \\frac{C_u - C_d}{S(u - d)}"} />
          <Row name="Bond position" math={"\\psi = \\frac{u\\,C_d - d\\,C_u}{(1+r)(u-d)}"} />
          <Row name="Option price" math={"C = \\varphi\\, S + \\psi"} />
        </FormulaTable>

        <SubHead>Risk-Neutral Pricing</SubHead>
        <FormulaTable>
          <Row name="Risk-neutral probability" math={"q = \\frac{1 + r - d}{u - d}"} />
          <Row name="Risk-neutral price" math={"C = \\frac{1}{1+r}\\bigl(q\\, C_u + (1-q)\\, C_d\\bigr)"} />
        </FormulaTable>

        {/* ── 10  Multi-Period & American Options ── */}
        <SectionHeader id="s10" number="10" title="Multi-Period & American Options" />

        <SubHead>Stock Model & Parameters</SubHead>
        <FormulaTable>
          <Row name="Log-returns" math={"\\ln(S_{t+\\Delta t}/S_t) \\sim N(\\nu\\,\\Delta t,\\; \\sigma^2\\,\\Delta t)"} />
          <Row name="Up factor" math={"u = e^{\\sigma\\sqrt{\\Delta t}}"} />
          <Row name="Down factor" math={"d = e^{-\\sigma\\sqrt{\\Delta t}}"} />
          <Row name="Real-world probability" math={"p \\approx \\tfrac{1}{2} + \\tfrac{1}{2}\\bigl(\\tfrac{\\nu}{\\sigma}\\bigr)\\sqrt{\\Delta t}"} />
          <Row name="Stock price at maturity" math={"S \\cdot u^{\\,j} \\cdot d^{\\,n-j}, \\quad j = 0, 1, \\ldots, n"} />
          <Row name="Risk-neutral prob. (multi)" math={"q = \\frac{e^{r\\Delta t} - d}{u - d}"} />
        </FormulaTable>

        <SubHead>Backward Induction</SubHead>
        <FormulaTable>
          <Row name="European at each node" math={"C = e^{-r\\Delta t}\\bigl(q\\,C_u + (1-q)\\,C_d\\bigr)"} />
          <Row name="American at each node" math={"C = \\max\\!\\bigl\\{\\text{exercise value},\\; e^{-r\\Delta t}(q\\,C_u + (1-q)\\,C_d)\\bigr\\}"} />
        </FormulaTable>

        <SubHead>Additional</SubHead>
        <FormulaTable>
          <Row name="Put-call parity" math={"C - P = S - K\\,e^{-rT}"} note="European only" />
          <Row name="Three-state model" math={"3 \\text{ equations, } 3 \\text{ unknowns } (\\varphi,\\, \\psi,\\, c)"} note="unique replicating portfolio" />
        </FormulaTable>

        {/* ── footer ── */}
        <div className="mt-16 border-t py-8 text-center text-xs"
             style={{ borderColor: 'var(--border)', color: 'var(--color-ink-faint)' }}>
          IAS 2025/26 — Formula Sheet
        </div>
      </main>
    </div>
  )
}
