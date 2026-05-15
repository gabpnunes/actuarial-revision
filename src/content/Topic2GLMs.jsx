import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'

export default function Topic2GLMs() {
  return (
    <>
      <p className="sg-prose">
        In the Econometrics part of this course, the standard linear model was introduced. While powerful, it has serious limitations when applied to insurance data: it can produce <strong>negative fitted values</strong> for counts (which must be non-negative) or <strong>fractional outcomes</strong> for integer data. Generalized Linear Models (GLMs) fix these problems by generalizing the linear model in three key directions.
      </p>

      <h3 className="sg-sub">The Linear Model (OLS Recap)</h3>

      <Definition title="Linear Model">
        <p>Suppose we have observations <MathBlock math={"y_i"} /> for <MathBlock math={"i = 1, \\ldots, n"} /> that we wish to explain using risk factors <MathBlock math={"x_{1i}, \\ldots, x_{pi}"} />. The linear model is:</p>
        <MathBlock math={"y_i = \\beta_1 x_{1i} + \\beta_2 x_{2i} + \\cdots + \\beta_p x_{pi} + \\varepsilon_i = \\sum_{j=1}^{p} \\beta_j x_{ji} + \\varepsilon_i"} display />
        <p>where <MathBlock math={"\\varepsilon_i \\sim (0, \\sigma^2)"} /> are random noise terms with zero mean and constant variance.</p>
      </Definition>

      <p className="sg-prose">
        The parameters <MathBlock math={"\\beta_j"} /> are unknown. We estimate them by <strong>Ordinary Least Squares (OLS)</strong>: find the values <MathBlock math={"b_j"} /> that minimize the sum of squared residuals:
      </p>

      <MathBlock math={"\\hat{b} = \\arg\\min_{b} \\sum_{i=1}^{n} e_i^2 = \\arg\\min_{b} \\sum_{i=1}^{n} \\left(y_i - \\sum_{j=1}^{p} b_j x_{ji}\\right)^2"} display />

      <Note>
        <p>
          <strong>OLS = MLE under normality.</strong> If we assume <MathBlock math={"\\varepsilon_i \\sim \\text{Normal}(0, \\sigma^2)"} />, then OLS and Maximum Likelihood Estimation give the <em>same</em> parameter estimates. But OLS makes no distributional assumptions — it works purely by minimizing squared errors.
        </p>
      </Note>

      <h3 className="sg-sub">Why OLS Fails for Insurance Data</h3>

      <p className="sg-prose">
        OLS can produce unreasonable results for insurance data:
      </p>
      <ul className="sg-list">
        <li><strong>Negative predictions for counts:</strong> If we model claim counts (which are 0, 1, 2, ...) with a linear model, the fitted values can be negative — which is meaningless.</li>
        <li><strong>Fractional predictions for integers:</strong> A linear model predicts continuous values, but claim counts are discrete.</li>
        <li><strong>Constant variance assumption:</strong> In insurance, higher-risk groups often have higher variance. The assumption <MathBlock math={"\\text{Var}[\\varepsilon_i] = \\sigma^2"} /> (same for all <MathBlock math={"i"} />) is too restrictive.</li>
      </ul>

      <h3 className="sg-sub">Generalized Linear Models</h3>

      <Definition title="GLM — Three Components">
        <p>A GLM has three components:</p>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>1. Stochastic component:</strong> The observations <MathBlock math={"Y_i"} /> are independent random variables from the <em>exponential dispersion family</em> with mean <MathBlock math={"\\mu_i"} /> and dispersion parameter <MathBlock math={"\\psi_i"} />. The variance is:
        </p>
        <MathBlock math={"\\text{Var}[Y_i] = \\psi_i \\cdot V(\\mu_i)"} display />
        <p>where <MathBlock math={"V(\\mu)"} /> is the <strong>variance function</strong>, which depends on the chosen distribution.</p>

        <p style={{ marginTop: '0.75rem' }}>
          <strong>2. Systematic component:</strong> A <em>linear predictor</em>:
        </p>
        <MathBlock math={"\\eta_i = \\sum_{j=1}^{p} \\beta_j x_{ji}"} display />
        <p>which is linear in the parameters <MathBlock math={"\\beta_1, \\ldots, \\beta_p"} /> and the covariates (risk factors) <MathBlock math={"x_{ji}"} />.</p>

        <p style={{ marginTop: '0.75rem' }}>
          <strong>3. Link function:</strong> A function <MathBlock math={"g"} /> that connects the mean to the linear predictor:
        </p>
        <MathBlock math={"\\eta_i = g(\\mu_i) \\quad \\Longleftrightarrow \\quad \\mu_i = g^{-1}(\\eta_i)"} display />
      </Definition>

      <Note>
        <p>
          <strong>In plain language:</strong> (1) We assume each observation comes from a distribution with a certain mean. (2) Risk factors combine linearly to form a predictor. (3) A link function connects the linear predictor to the mean — and this link does <em>not</em> have to be the identity. That's the key generalization over OLS, where we always have <MathBlock math={"\\mu_i = \\eta_i"} /> directly.
        </p>
      </Note>

      <h3 className="sg-sub">Distributions in the Exponential Family</h3>

      <p className="sg-prose">
        The most important distributions for this course and their properties:
      </p>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>Distribution</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>Support</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>Variance</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}><MathBlock math={"V(\\mu)"} /></th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}><MathBlock math={"\\psi"} /></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"N(\\mu, \\sigma^2)"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\mathbb{R}"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\sigma^2"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"1"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\sigma^2"} /></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\text{Poisson}(\\mu)"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\mathbb{N}^0"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\mu"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\mu"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"1"} /></td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\text{Gamma}(\\alpha, \\beta)"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\mathbb{R}^+"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\psi \\mu^2"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\mu^2"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"\\psi"} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <Theorem title="Variance Functions">
        <p>The variance function <MathBlock math={"V(\\mu)"} /> characterizes the mean-variance relationship:</p>
        <ul className="sg-list">
          <li><strong>Normal:</strong> <MathBlock math={"V(\\mu) = 1"} /> — variance is constant, independent of the mean</li>
          <li><strong>Poisson:</strong> <MathBlock math={"V(\\mu) = \\mu"} /> — variance equals the mean</li>
          <li><strong>Gamma:</strong> <MathBlock math={"V(\\mu) = \\mu^2"} /> — variance is proportional to the square of the mean</li>
        </ul>
      </Theorem>

      <Note>
        <p>
          <strong>Why this matters:</strong> Different distributions imply different relationships between mean and variance. With the Poisson, higher-frequency risk categories automatically have higher variance. With the Gamma, the spread grows even faster with the mean. Choosing the right distribution means choosing the right mean-variance relationship for your data.
        </p>
      </Note>

      <h3 className="sg-sub">Canonical Link Functions</h3>

      <p className="sg-prose">
        Each distribution has a natural ("canonical") link function with nice mathematical properties. These are the most commonly used:
      </p>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>Distribution</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>Canonical Link</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}><MathBlock math={"g(\\mu)"} /></th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>Model Type</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Normal</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Identity</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"g(\\mu) = \\mu"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Additive</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Poisson</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Log</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"g(\\mu) = \\log \\mu"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Multiplicative</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Gamma</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Inverse</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"g(\\mu) = 1/\\mu"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>—</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Binomial</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Logit</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}><MathBlock math={"g(\\mu) = \\log\\frac{\\mu}{1 - \\mu}"} /></td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Logistic</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Theorem title="Poisson GLM with Log Link — Multiplicative Model">
        <p>With a Poisson distribution and log link:</p>
        <MathBlock math={"\\eta_i = \\log \\mu_i = \\sum_j \\beta_j x_{ji}"} display />
        <p>Inverting gives:</p>
        <MathBlock math={"E(Y_i) = \\mu_i = \\exp(\\eta_i) = \\exp\\!\\left(\\sum_j \\beta_j x_{ji}\\right) = \\prod_j \\exp(\\beta_j x_{ji})"} display />
        <p>This is a <strong>multiplicative model</strong>: each risk factor multiplies the expected value by <MathBlock math={"e^{\\beta_j}"} />. This is natural for insurance — a male driver doesn't <em>add</em> a fixed number of claims; being male <em>multiplies</em> the expected claim frequency by some factor.</p>
      </Theorem>

      <h3 className="sg-sub">Maximum Likelihood Estimation</h3>

      <Definition title="Likelihood and MLE">
        <p>Given observations <MathBlock math={"y_1, \\ldots, y_n"} /> and risk factors <MathBlock math={"\\vec{x}_i"} />, the <strong>likelihood</strong> is the probability of observing the data as a function of the parameters:</p>
        <MathBlock math={"\\mathcal{L}(\\vec{\\beta} \\mid y_1, \\ldots, y_n, \\vec{x}_1, \\ldots, \\vec{x}_n) = \\prod_{i=1}^{n} f(y_i \\mid \\vec{x}_i, \\vec{\\beta})"} display />
        <p>Since products are hard to optimize, we use the <strong>log-likelihood</strong>:</p>
        <MathBlock math={"\\ell(\\vec{\\beta}) = \\log \\mathcal{L}(\\vec{\\beta}) = \\sum_{i=1}^{n} \\log f(y_i \\mid \\vec{x}_i, \\vec{\\beta})"} display />
        <p>The <strong>MLE</strong> <MathBlock math={"\\hat{\\vec{\\beta}}"} /> maximizes <MathBlock math={"\\ell(\\vec{\\beta})"} />: the parameter values that make the observed data most likely.</p>
      </Definition>

      <Note>
        <p>
          <strong>Practical note:</strong> For GLMs with non-identity link functions, the MLE generally has no closed-form solution. It is computed numerically using the <em>Iteratively Reweighted Least Squares (IRLS)</em> algorithm — but the details of IRLS are out of scope for this course.
        </p>
      </Note>

      <h3 className="sg-sub">Worked Example: Poisson MLE</h3>

      <Example title="MLE for Poisson with Weights (Solutions A7)">
        <p className="sg-prose">
          <strong>Setup:</strong> We have observations <MathBlock math={"y_i"} /> with weights <MathBlock math={"w_i"} /> (exposures). We assume <MathBlock math={"Y_i \\sim \\text{Poisson}(\\lambda \\cdot w_i)"} />. Find the MLE for <MathBlock math={"\\lambda"} />.
        </p>
        <p className="sg-prose" style={{ marginTop: '0.5rem' }}>
          <strong>Step 1:</strong> Write the PDF and log-likelihood.
        </p>
        <MathBlock math={"f_Y(y) = e^{-\\lambda w_i} \\cdot \\frac{(\\lambda w_i)^{y_i}}{y_i!}"} display />
        <MathBlock math={"\\ell(\\lambda) = \\sum_{i=1}^{n} \\left(-\\lambda w_i + y_i \\log(\\lambda w_i) - \\log(y_i!)\\right)"} display />

        <p className="sg-prose" style={{ marginTop: '0.5rem' }}>
          <strong>Step 2:</strong> Differentiate with respect to <MathBlock math={"\\lambda"} /> and set equal to zero.
        </p>
        <MathBlock math={"\\frac{d\\ell}{d\\lambda} = \\sum_{i=1}^{n} \\left(-w_i + \\frac{y_i}{\\lambda}\\right) = -\\sum_{i=1}^n w_i + \\lambda^{-1} \\sum_{i=1}^n y_i = 0"} display />

        <p className="sg-prose" style={{ marginTop: '0.5rem' }}>
          <strong>Step 3:</strong> Solve for <MathBlock math={"\\hat{\\lambda}"} />.
        </p>
        <MathBlock math={"\\hat{\\lambda} = \\frac{\\sum_{i=1}^{n} y_i}{\\sum_{i=1}^{n} w_i}"} display />
        <p className="sg-prose">
          The MLE is the <strong>total number of claims divided by the total exposure</strong> — an intuitively sensible estimator.
        </p>
      </Example>

      <h3 className="sg-sub">Bernoulli & Binomial MLE</h3>

      <Example title="Bernoulli MLE (No Risk Factors)">
        <p className="sg-prose">
          We observe <MathBlock math={"y_i \\in \\{0, 1\\}"} /> for <MathBlock math={"n"} /> individuals, all with the same probability <MathBlock math={"p"} />. Model: <MathBlock math={"Y_i \\sim \\text{Bernoulli}(p)"} />.
        </p>
        <MathBlock math={"\\mathcal{L}(p) = \\prod_{i=1}^{n} p^{y_i}(1-p)^{1-y_i}"} display />
        <MathBlock math={"\\ell(p) = \\sum [y_i \\ln p + (1 - y_i)\\ln(1-p)]"} display />
        <MathBlock math={"\\frac{d\\ell}{dp} = \\sum \\frac{y_i}{p} - \\frac{1-y_i}{1-p} = 0 \\quad \\Rightarrow \\quad \\hat{p} = \\frac{\\sum y_i}{n}"} display />
      </Example>

      <Example title="Binomial MLE with Different Trial Counts">
        <p className="sg-prose">
          When each individual <MathBlock math={"i"} /> is observed for <MathBlock math={"x_i"} /> years (each year they claim with probability <MathBlock math={"p"} />), the model is <MathBlock math={"Y_i \\sim \\text{Binomial}(x_i, p)"} />:
        </p>
        <MathBlock math={"f(y_i) = \\binom{x_i}{y_i} p^{y_i} (1-p)^{x_i - y_i}"} display />
        <MathBlock math={"\\ell(p) = \\sum_{i=1}^{n} \\left[\\ln \\binom{x_i}{y_i} + y_i \\ln p + (x_i - y_i)\\ln(1-p)\\right]"} display />
        <MathBlock math={"\\hat{p} = \\frac{\\sum y_i}{\\sum x_i}"} display />
        <p className="sg-prose">
          The MLE is the total number of claims divided by total person-years of observation.
        </p>
      </Example>

      <h3 className="sg-sub">Interpreting GLM Output</h3>

      <p className="sg-prose">
        When fitting a GLM in R or Python, software reports <strong>coefficient estimates</strong>, <strong>standard errors</strong>, <strong>z-values</strong>, and <strong>p-values</strong> for each parameter. Understanding these is essential for model interpretation.
      </p>

      <Definition title="Significance Testing in GLMs">
        <p>For each coefficient <MathBlock math={"\\hat{\\beta}_j"} />, the software tests <MathBlock math={"H_0: \\beta_j = 0"} /> (the variable has no effect):</p>
        <MathBlock math={"z = \\frac{\\hat{\\beta}_j}{\\text{SE}(\\hat{\\beta}_j)}"} display />
        <p>The <strong>p-value</strong> is the probability of observing a z-value this extreme under <MathBlock math={"H_0"} />. Rules of thumb:</p>
        <ul className="sg-list">
          <li><MathBlock math={"|z| > 2"} /> (p-value &lt; 0.05): <strong>significant</strong> — evidence that the variable has a real effect</li>
          <li><MathBlock math={"|z| < 2"} /> (p-value &gt; 0.05): <strong>not significant</strong> — the variable may have no effect and should be considered for removal</li>
        </ul>
      </Definition>

      <Example title="Reading R Output">
        <p className="sg-prose">Given output:</p>
        <div className="my-2 rounded-lg p-3" style={{ background: 'rgba(196,181,253,0.04)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-ink)' }}>
          <pre style={{ margin: 0 }}>{`            Estimate  Std.Error  z value  Pr(>|z|)
(Intercept) -4.0348   0.0186    -216.5   < 2e-16 ***
Age          0.0513   0.1268     0.405    0.685`}</pre>
        </div>
        <p className="sg-prose" style={{ marginTop: '0.5rem' }}>
          The intercept is highly significant (<MathBlock math={"|z| = 216.5"} />). But Age has <MathBlock math={"|z| = 0.405"} /> with p-value 0.685 — far from significant. Conclusion: age does <em>not</em> significantly affect claim frequency in this model, and the variable should be considered for removal.
        </p>
      </Example>

      <h3 className="sg-sub">Comparing Risk Groups from GLM Coefficients</h3>

      <p className="sg-prose">
        With a log link, the <strong>relative difference</strong> between two groups is obtained by exponentiating the coefficient:
      </p>

      <Definition title="Relative Effect in a Log-Link GLM">
        <p>For a binary variable <MathBlock math={"x_2"} /> (e.g., 1 = female, 0 = male):</p>
        <MathBlock math={"\\frac{\\lambda_{\\text{female}}}{\\lambda_{\\text{male}}} = \\exp(\\hat{\\beta}_2)"} display />
        <p>For a continuous variable (e.g., age), the relative effect of a difference of <MathBlock math={"\\Delta x"} /> is:</p>
        <MathBlock math={"\\frac{\\lambda(x + \\Delta x)}{\\lambda(x)} = \\exp(\\hat{\\beta}_1 \\cdot \\Delta x)"} display />
      </Definition>

      <h3 className="sg-sub">OLS vs GLMs — Key Comparison</h3>

      <Example title="OLS vs GLMs (Solutions A6)">
        <p className="sg-prose">
          <strong>Similarity:</strong> Both OLS and GLMs aim to find a relationship between observations <MathBlock math={"y_i"} /> and explanatory variables <MathBlock math={"x_{ji}"} />. OLS minimizes squared errors; GLMs maximize the probability of observing the data.
        </p>
        <p className="sg-prose" style={{ marginTop: '0.5rem' }}>
          <strong>Key difference:</strong> OLS makes <em>no</em> distributional assumptions — it can be applied to any dataset, but may produce implausible results (negative counts, fractional integers). GLMs <em>require</em> specifying the distribution and link function upfront, but once specified, the estimates are guaranteed to be sensible (e.g., always positive for Poisson counts with log link).
        </p>
      </Example>

      <h3 className="sg-sub">Variance Function Deep Dive</h3>

      <Example title="Deriving Variance Functions (Solutions A9)">
        <p className="sg-prose">
          For each distribution, we decompose the variance as <MathBlock math={"\\text{Var}[Y_i] = \\psi_i \\cdot V(\\mu_i)"} />:
        </p>
        <p className="sg-prose" style={{ marginTop: '0.5rem' }}>
          <strong>Normal</strong> <MathBlock math={"N(\\mu_i, \\sigma^2)"} />: Variance is <MathBlock math={"\\sigma^2"} />, independent of the mean. So <MathBlock math={"V(\\mu_i) = 1"} /> and <MathBlock math={"\\psi = \\sigma^2"} />.
        </p>
        <p className="sg-prose" style={{ marginTop: '0.5rem' }}>
          <strong>Poisson</strong> <MathBlock math={"\\text{Poisson}(\\mu_i)"} />: Variance equals the mean: <MathBlock math={"\\text{Var}[Y_i] = \\mu_i"} />. So <MathBlock math={"V(\\mu_i) = \\mu_i"} /> and <MathBlock math={"\\psi = 1"} />.
        </p>
        <p className="sg-prose" style={{ marginTop: '0.5rem' }}>
          <strong>Gamma</strong> <MathBlock math={"\\text{Gamma}(\\alpha = 1/\\psi, \\beta = 1/(\\psi \\mu))"} />: Variance is <MathBlock math={"\\alpha / \\beta^2 = \\psi \\mu_i^2"} />. So <MathBlock math={"V(\\mu_i) = \\mu_i^2"} /> and the dispersion parameter is <MathBlock math={"\\psi"} />.
        </p>
        <p className="sg-prose" style={{ marginTop: '0.5rem' }}>
          <strong>Key takeaway:</strong> With the Normal, variance is constant. With the Poisson, variance grows linearly with the mean. With the Gamma, variance grows quadratically. The choice of distribution should match the observed mean-variance relationship in your data.
        </p>
      </Example>

      <h3 className="sg-sub">Summary</h3>

      <div className="my-6 overflow-x-auto rounded-lg" style={{ background: 'var(--color-bg-elev)', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>Aspect</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>OLS</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--color-ink-muted)', fontWeight: 500 }}>GLM</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Estimation</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Minimize squared errors</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Maximize likelihood (MLE)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Distribution</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>None assumed</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Must specify (Normal, Poisson, Gamma, ...)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Link</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Always identity</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Identity, log, logit, inverse, ...</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Variance</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Constant</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Can depend on mean via <MathBlock math={"V(\\mu)"} /></td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Predictions</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Can be implausible</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--color-ink-soft)' }}>Constrained by distribution</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
