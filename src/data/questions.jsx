import MathBlock from '../components/MathBlock'
import TreeDiagram from '../components/TreeDiagram'

export const questions = [

  // ──────────────────────────────────────────────────────────────────
  //  NON-LIFE INSURANCE — EXERCISES
  // ──────────────────────────────────────────────────────────────────

  {
    id: 'nl-ex-1',
    topicId: 'compound-distributions',
    type: 'exercise',
    source: 'Non-Life Q1',
    title: 'Why S = 0 when N = 0',
    difficulty: 1,
    points: null,
    prompt: () => (
      <p>A compound distribution is represented by <MathBlock math={"S = X_1 + X_2 + \\cdots + X_N"} />, where both <MathBlock math={"X_i"} /> and <MathBlock math={"N"} /> are random variables. Explain why <MathBlock math={"S = 0"} /> if <MathBlock math={"N = 0"} />.</p>
    ),
    solution: () => (
      <div>
        <p>A compound distribution <MathBlock math={"S"} /> is the sum over a random number of random variables, where <MathBlock math={"N"} /> denotes how many variables should be summed. If <MathBlock math={"N = 0"} />, there are no random variables over which the sum should be taken. In that case, the "sum" is defined to be zero.</p>
        <p style={{ marginTop: '0.5rem' }}>Intuitively: if there are no claims (<MathBlock math={"N = 0"} />), the total loss is zero.</p>
      </div>
    ),
  },

  {
    id: 'nl-ex-2',
    topicId: 'compound-distributions',
    type: 'exercise',
    source: 'Non-Life Q2',
    title: 'Derive E(S) and Var(S)',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>Consider a compound distribution <MathBlock math={"S = X_1 + X_2 + \\cdots + X_N"} />. Derive the expected value of <MathBlock math={"S"} /> using the law of total expectation, and the variance of <MathBlock math={"S"} /> using the law of total variance.</p>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>Expected value:</strong></p>
        <MathBlock math={"\\text{E}[S] = \\text{E}[\\text{E}[S|N]] = \\text{E}_N[N \\cdot \\text{E}[X]] = \\text{E}[N] \\cdot \\text{E}[X]"} display />
        <p><strong>Variance</strong> (using the law of total variance):</p>
        <MathBlock math={"\\text{Var}(S) = \\text{E}[\\text{Var}(S|N)] + \\text{Var}[\\text{E}(S|N)]"} display />
        <MathBlock math={"= \\text{E}[N \\cdot \\text{Var}(X)] + \\text{Var}[N \\cdot \\text{E}(X)]"} display />
        <MathBlock math={"= \\text{E}[N] \\cdot \\text{Var}(X) + \\text{E}[X]^2 \\cdot \\text{Var}(N)"} display />
      </div>
    ),
  },

  {
    id: 'nl-ex-5',
    topicId: 'compound-distributions',
    type: 'exercise',
    source: 'Non-Life Q5',
    title: 'Poisson vs Binomial: 90th Percentile',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>Consider a compound distribution <MathBlock math={"S = X_1 + \\cdots + X_N"} />. The claim size <MathBlock math={"X_i"} /> follows a Normal distribution with mean 100 and standard deviation 10.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>Derive E(S) and Var(S) under the assumption that <MathBlock math={"N \\sim \\text{Poisson}(\\lambda = 1000 \\cdot 0.1)"} />, and derive the 90th percentile of <MathBlock math={"S"} /> using a Normal approximation.</li>
          <li>Do the same assuming <MathBlock math={"N \\sim \\text{Binomial}(n = 1000, p = 0.1)"} />. Explain the difference.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a) Poisson case:</strong> <MathBlock math={"\\text{E}(N) = \\lambda = 100"} />, <MathBlock math={"\\text{Var}(N) = \\lambda = 100"} /></p>
        <MathBlock math={"\\text{E}(S) = \\text{E}[N] \\cdot \\text{E}[X] = 100 \\cdot 100 = 10{,}000"} display />
        <MathBlock math={"\\text{Var}(S) = \\text{E}[N]\\text{Var}(X) + \\text{E}[X]^2\\text{Var}(N) = 100 \\times 100 + 100^2 \\times 100 = 1{,}010{,}000"} display />
        <p>90th percentile (<MathBlock math={"\\sigma = \\sqrt{1{,}010{,}000} \\approx 1005"} />):</p>
        <MathBlock math={"q_S(0.9) = 10{,}000 + 1.28 \\times 1005 = 11{,}286"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(b) Binomial case:</strong> <MathBlock math={"\\text{E}(N) = np = 100"} />, <MathBlock math={"\\text{Var}(N) = np(1-p) = 90"} /></p>
        <MathBlock math={"\\text{Var}(S) = 100 \\times 100 + 100^2 \\times 90 = 910{,}000, \\quad \\sigma \\approx 954"} display />
        <MathBlock math={"q_S(0.9) = 10{,}000 + 1.28 \\times 954 = 11{,}221"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>Difference:</strong> The Binomial quantile is lower because <MathBlock math={"\\text{Var}(N_{\\text{Bin}}) = 90 < 100 = \\text{Var}(N_{\\text{Poi}})"} />. The Binomial has less uncertainty in the number of claims, leading to less overall uncertainty in <MathBlock math={"S"} />.</p>
      </div>
    ),
  },

  {
    id: 'nl-ex-6',
    topicId: 'glms',
    type: 'exercise',
    source: 'Non-Life Q6',
    title: 'OLS vs GLMs',
    difficulty: 1,
    points: null,
    prompt: () => (
      <p>Describe in your own words the most important similarity and difference between using <em>ordinary least squares</em> and <em>generalized linear models</em> for regression purposes.</p>
    ),
    solution: () => (
      <div>
        <p><strong>Similarity:</strong> Both approaches aim to find a relationship between observations <MathBlock math={"y_i"} /> and explanatory variables <MathBlock math={"x_{ij}"} />.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>Difference:</strong> OLS estimates parameters by minimizing squared errors, with no distributional assumptions. GLMs estimate parameters by maximizing the probability of having observed the data (MLE), requiring you to specify a distribution and link function.</p>
        <p style={{ marginTop: '0.5rem' }}>OLS can produce implausible results (e.g., negative fitted values for counts), while GLMs constrain estimates to be plausible by construction.</p>
      </div>
    ),
  },

  {
    id: 'nl-ex-7',
    topicId: 'glms',
    type: 'exercise',
    source: 'Non-Life Q7',
    title: 'Poisson with Exposure: MLE',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>Consider a random variable <MathBlock math={"Y_i"} /> with observations <MathBlock math={"y_i"} /> for <MathBlock math={"i = 1, \\ldots, n"} /> with corresponding weights (exposures) <MathBlock math={"w_i"} />. If we assume that <MathBlock math={"Y_i \\sim \\text{Poisson}(\\lambda \\cdot w_i)"} />, write down the likelihood function as a function of <MathBlock math={"\\lambda"} /> and find the MLE for <MathBlock math={"\\lambda"} />.</p>
      </div>
    ),
    solution: () => (
      <div>
        <p>The pdf is <MathBlock math={"f_Y(y) = e^{-\\lambda w_i} \\cdot \\frac{(\\lambda w_i)^{y_i}}{y_i!}"} />. The log-likelihood is:</p>
        <MathBlock math={"\\ln \\mathcal{L}(\\lambda | \\vec{y}, \\vec{w}) = \\sum_{i=1}^{n} \\left(-\\lambda w_i + y_i \\ln(\\lambda w_i) - \\ln(y_i!)\\right)"} display />
        <p>Taking the derivative with respect to <MathBlock math={"\\lambda"} /> and setting it to zero:</p>
        <MathBlock math={"\\frac{d}{d\\lambda} \\ln \\mathcal{L} = \\sum_{i=1}^{n} \\left(-w_i + \\frac{y_i}{\\lambda}\\right) = 0"} display />
        <MathBlock math={"\\Rightarrow \\hat{\\lambda} = \\frac{\\sum_{i=1}^{n} y_i}{\\sum_{i=1}^{n} w_i}"} display />
        <p>The MLE is the total number of claims divided by the total exposure.</p>
      </div>
    ),
  },

  {
    id: 'nl-ex-8',
    topicId: 'glms',
    type: 'exercise',
    source: 'Non-Life Q8',
    title: 'Poisson GLM Setup',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>Suppose we have observations <MathBlock math={"y_i"} /> and risk factors <MathBlock math={"x_{ji}"} /> for <MathBlock math={"i = 1, \\ldots, n"} /> and <MathBlock math={"j = 1, \\ldots, p"} />. We believe the observations originate from a Poisson distribution, and we want to find the relationship between <MathBlock math={"y_i"} /> and <MathBlock math={"x_{ji}"} /> using a GLM.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>What is the linear predictor for this problem?</li>
          <li>Which link function would you use to link the linear predictor to the mean of the Poisson distribution, and why?</li>
          <li>Using the previous two answers, define the complete statistical model.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> The linear predictor is <MathBlock math={"\\eta_i = \\sum_{j=1}^{p} \\beta_j x_{ji} = \\vec{\\beta} \\cdot \\vec{x}_i"} />.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>(b)</strong> The log-link, because the mean of a Poisson must be strictly positive. With <MathBlock math={"\\eta_i = \\ln(\\text{mean})"} />, we get <MathBlock math={"\\text{mean} = \\exp(\\eta_i) > 0"} /> always.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>(c)</strong> <MathBlock math={"Y_i \\sim \\text{Poisson}\\left(\\lambda_i = \\exp\\left[\\sum_{j=1}^{p} \\beta_j x_{ji}\\right]\\right)"} display /></p>
      </div>
    ),
  },

  {
    id: 'nl-ex-10',
    topicId: 'glms',
    type: 'exercise',
    source: 'Non-Life Q10',
    title: 'Bernoulli GLM for Policy Lapse',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>We want to analyze the probability <MathBlock math={"p_i"} /> that someone lapses (terminates) their policy. Observations <MathBlock math={"y_i \\in \\{0, 1\\}"} /> indicate whether policyholder <MathBlock math={"i"} /> lapsed. Suppose there are no risk factors available.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>Which distribution would you use to model the lapse probabilities?</li>
          <li>Write down the likelihood function and find the MLE for the lapse probability <MathBlock math={"p"} />.</li>
        </ol>
        <p style={{ marginTop: '0.5rem' }}>Now suppose <MathBlock math={"p_i"} /> depends on age (<MathBlock math={"x_{1i}"} />) and policy duration (<MathBlock math={"x_{2i}"} />).</p>
        <ol className="sg-list" start={3} style={{ listStyleType: 'lower-alpha' }}>
          <li>What is the linear predictor?</li>
          <li>What problem arises if we use the identity link function?</li>
          <li>The logit link <MathBlock math={"\\eta = \\text{logit}(p) = \\ln(p/(1-p))"} /> is typically used instead. What advantage does it have?</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> The Bernoulli distribution, since observations are 0 or 1.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>(b)</strong> <MathBlock math={"\\mathcal{L}(p|\\vec{y}) = \\prod_{i=1}^{n} p^{y_i}(1-p)^{1-y_i}"} /></p>
        <MathBlock math={"\\ln \\mathcal{L} = \\sum_{i=1}^{n} \\left[y_i \\ln p + (1-y_i) \\ln(1-p)\\right]"} display />
        <p>Setting the derivative to zero: <MathBlock math={"\\hat{p} = \\sum y_i / n"} /></p>
        <p style={{ marginTop: '0.5rem' }}><strong>(c)</strong> <MathBlock math={"\\eta_i = \\beta_0 + \\beta_1 x_{1i} + \\beta_2 x_{2i}"} /></p>
        <p style={{ marginTop: '0.5rem' }}><strong>(d)</strong> With the identity link, <MathBlock math={"p = \\eta_i = \\beta_0 + \\beta_1 x_{1i} + \\beta_2 x_{2i}"} />. This is not guaranteed to satisfy <MathBlock math={"0 \\leq p \\leq 1"} />, so we could get non-sensible probabilities.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>(e)</strong> The logit link gives <MathBlock math={"p = \\exp(\\eta)/(1 + \\exp(\\eta))"} />. As <MathBlock math={"\\eta \\to -\\infty"} />, <MathBlock math={"p \\to 0"} />; as <MathBlock math={"\\eta \\to +\\infty"} />, <MathBlock math={"p \\to 1"} />. So the logit link ensures <MathBlock math={"p \\in [0, 1]"} /> for any linear predictor value.</p>
      </div>
    ),
  },

  {
    id: 'nl-ex-11',
    topicId: 'insurance-pricing',
    type: 'exercise',
    source: 'Non-Life Q11',
    title: 'Force of Mortality Estimation',
    difficulty: 3,
    points: null,
    prompt: () => (
      <div>
        <p>A portfolio of <MathBlock math={"n = 10{,}000"} /> individuals aged exactly <MathBlock math={"x"} /> is observed for one year. At the end of the year, 160 have died (<MathBlock math={"\\sum \\delta_i = 160"} />).</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>Using a Bernoulli model, write down the log-likelihood for <MathBlock math={"q_x"} /> and find the MLE.</li>
          <li>Now assume everyone who dies does so at the very end of the year, so the survival probability is <MathBlock math={"p_x = \\exp(-\\mu_x)"} /> and the death probability is <MathBlock math={"p_x \\cdot \\mu_x = \\exp(-\\mu_x) \\cdot \\mu_x"} />. Write the log-likelihood for <MathBlock math={"\\mu_x"} /> and find the MLE.</li>
          <li>Now assume people die halfway through the year, so each individual has exposure <MathBlock math={"\\tau_i \\in (0, 1]"} />. With <MathBlock math={"e = \\sum \\tau_i"} /> and <MathBlock math={"d = \\sum \\delta_i"} />, show that the log-likelihood is proportional to a Poisson likelihood and find <MathBlock math={"\\hat{\\mu}_x"} />.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> <MathBlock math={"\\ln \\mathcal{L}(q_x | \\vec{\\delta}) = \\sum_{i=1}^{n} [\\delta_i \\ln q_x + (1-\\delta_i) \\ln(1-q_x)]"} /></p>
        <MathBlock math={"\\hat{q}_x = \\frac{\\sum \\delta_i}{n} = \\frac{160}{10{,}000} = 0.016"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(b)</strong> Each individual contributes <MathBlock math={"\\exp(-\\mu_x) \\cdot \\mu_x^{\\delta_i}"} /> to the likelihood:</p>
        <MathBlock math={"\\ln \\mathcal{L} = \\sum_{i=1}^{n} (-\\mu_x + \\delta_i \\ln \\mu_x)"} display />
        <MathBlock math={"\\hat{\\mu}_x = \\frac{\\sum \\delta_i}{n} = \\frac{160}{10{,}000} = 0.016"} display />
        <p>Note: the one-year mortality probability from this is <MathBlock math={"q_x = 1 - e^{-0.016} = 0.01587"} />, slightly different from part (a).</p>

        <p style={{ marginTop: '0.75rem' }}><strong>(c)</strong> With individual exposures <MathBlock math={"\\tau_i"} /> (people who die halfway have <MathBlock math={"\\tau_i \\approx 0.5"} />):</p>
        <MathBlock math={"\\mathcal{L}(\\mu_x) = \\prod_{i=1}^{n} \\exp[-\\tau_i \\mu_x] \\cdot \\mu_x^{\\delta_i} = \\exp[-e \\cdot \\mu_x] \\cdot \\mu_x^d"} display />
        <p>This is proportional to a Poisson likelihood. Setting the derivative to zero:</p>
        <MathBlock math={"\\hat{\\mu}_x = \\frac{d}{e} = \\frac{160}{10{,}000 - \\tfrac{1}{2} \\cdot 160} = \\frac{160}{9{,}920} = 0.01613"} display />
      </div>
    ),
  },

  {
    id: 'nl-ex-9',
    topicId: 'glms',
    type: 'exercise',
    source: 'Non-Life Q9',
    title: 'Variance Functions',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>An advantage of GLMs is that the variance may depend on the mean. For these distributions within the GLM framework, specify the variance as the product of the dispersion parameter <MathBlock math={"\\psi_i"} /> and the variance function <MathBlock math={"V(\\mu_i)"} />:</p>
        <ul className="sg-list">
          <li><MathBlock math={"N(\\mu_i, \\psi_i)"} /> with <MathBlock math={"Y_i \\in \\mathbb{R}"} /></li>
          <li><MathBlock math={"\\text{Poisson}(\\mu_i)"} /> with <MathBlock math={"Y_i \\in \\mathbb{N}^0"} /></li>
          <li><MathBlock math={"\\text{Gamma}(\\alpha, \\beta)"} /> with <MathBlock math={"\\alpha = 1/\\psi_i"} />, <MathBlock math={"\\beta = 1/(\\psi_i \\mu_i)"} /></li>
        </ul>
        <p>What can you conclude about the different variance functions?</p>
      </div>
    ),
    solution: () => (
      <div>
        <ul className="sg-list">
          <li><strong>Normal:</strong> <MathBlock math={"\\text{Var}(Y_i) = \\sigma^2 = \\psi_i"} />, so <MathBlock math={"V(\\mu_i) = 1"} />. The variance is independent of the mean.</li>
          <li><strong>Poisson:</strong> <MathBlock math={"\\text{Var}(Y_i) = \\mu_i"} />, so <MathBlock math={"V(\\mu_i) = \\mu_i"} /> and <MathBlock math={"\\psi = 1"} />. The variance equals the mean.</li>
          <li><strong>Gamma:</strong> <MathBlock math={"\\text{Var}(Y_i) = \\psi_i \\mu_i^2"} />, so <MathBlock math={"V(\\mu_i) = \\mu_i^2"} />. The variance is proportional to the square of the mean.</li>
        </ul>
        <p style={{ marginTop: '0.5rem' }}>Different distributions imply different relationships between mean and variance. When investigating datasets in practice, it is important to check which distribution fits the data best.</p>
      </div>
    ),
  },

  // ──────────────────────────────────────────────────────────────────
  //  LIFE INSURANCE — EXERCISES
  // ──────────────────────────────────────────────────────────────────

  {
    id: 'li-ex-1',
    topicId: 'cash-flows-discounting',
    type: 'exercise',
    source: 'Life Q1',
    title: 'Present Value Calculation',
    difficulty: 1,
    points: null,
    prompt: () => (
      <p>At <MathBlock math={"t = 15"} /> a nominal payment of <MathBlock math={"\\text{€}15{,}000"} /> has to be made. Given a fixed interest rate of 2%, what is the present value of this payment?</p>
    ),
    solution: () => (
      <div>
        <MathBlock math={"\\text{PV} = 15{,}000 \\cdot 1.02^{-15} = 15{,}000 \\cdot 0.7430 = 11{,}145"} display />
      </div>
    ),
  },

  {
    id: 'li-ex-2',
    topicId: 'cash-flows-discounting',
    type: 'exercise',
    source: 'Life Q2',
    title: 'Compound Interest',
    difficulty: 1,
    points: null,
    prompt: () => (
      <div>
        <p>Suppose we have 100 at the bank at <MathBlock math={"t = 0"} />, and each year we earn an interest rate of <MathBlock math={"r = 2\\%"} />. What is the amount at the bank at <MathBlock math={"t = 10"} />? What happens to the interest earned if the interest rate is doubled?</p>
      </div>
    ),
    solution: () => (
      <div>
        <p>At <MathBlock math={"r = 2\\%"} />: <MathBlock math={"100 \\cdot (1.02)^{10} = 121.90"} />. Interest earned: <MathBlock math={"21.90"} />.</p>
        <p style={{ marginTop: '0.5rem' }}>At <MathBlock math={"r = 4\\%"} />: <MathBlock math={"100 \\cdot (1.04)^{10} = 148.02"} />. Interest earned: <MathBlock math={"48.02"} />.</p>
        <p style={{ marginTop: '0.5rem' }}>The interest <strong>more than doubles</strong> (48.02 vs. 21.90) due to compounding: interest is earned on previously accumulated interest, and this effect is amplified at higher rates.</p>
      </div>
    ),
  },

  {
    id: 'li-ex-3',
    topicId: 'cash-flows-discounting',
    type: 'exercise',
    source: 'Life Q3',
    title: 'Double Rate, Halve Capital',
    difficulty: 1,
    points: null,
    prompt: () => (
      <div>
        <p>What is the impact on the value at <MathBlock math={"t = 10"} /> if the interest rate is doubled and the starting capital at <MathBlock math={"t = 0"} /> is divided by two?</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>The new closing value is always larger than the old closing value.</li>
          <li>The new closing value is always smaller than the old closing value.</li>
          <li>The new closing value is always equal to the old closing value.</li>
          <li>This depends on the interest rate.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>Answer: (d).</strong> For starting capital <MathBlock math={"2x"} /> and rate <MathBlock math={"\\frac{1}{2}r"} />, the end value is <MathBlock math={"2x(1 + \\tfrac{1}{2}r)^{10}"} />. Halving the capital and doubling the rate gives <MathBlock math={"x(1 + r)^{10}"} />.</p>
        <p style={{ marginTop: '0.5rem' }}>Setting them equal: <MathBlock math={"2(1 + \\tfrac{r}{2})^{10} = (1+r)^{10}"} />, which solves to <MathBlock math={"r \\approx 0.155"} />.</p>
        <p>For <MathBlock math={"r < 15.5\\%"} />: halving capital and doubling rate gives <em>less</em>. For <MathBlock math={"r > 15.5\\%"} />: it gives <em>more</em>.</p>
      </div>
    ),
  },

  {
    id: 'li-ex-4',
    topicId: 'cash-flows-discounting',
    type: 'exercise',
    source: 'Life Q4',
    title: 'Annuity Loan: Total Interest',
    difficulty: 1,
    points: null,
    prompt: () => (
      <div>
        <p>Andrew borrows <MathBlock math={"\\text{€}6{,}000"} />. This is an annuity loan: every year he redeems a fixed part of the initial loan, and interest is paid over the outstanding loan at the beginning of that year. The maturity is 6 years at <MathBlock math={"5\\%"} /> interest. What can you say about the total interest paid?</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>Less than <MathBlock math={"\\text{€}1{,}800"} /></li>
          <li>Exactly <MathBlock math={"\\text{€}1{,}800"} /></li>
          <li>More than <MathBlock math={"\\text{€}1{,}800"} /></li>
          <li>Cannot be determined</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>Answer: (a).</strong> If the loan stayed at <MathBlock math={"\\text{€}6{,}000"} /> for all 6 years, total interest would be <MathBlock math={"6 \\times 5\\% \\times 6{,}000 = 1{,}800"} />. However, since part of the principal is repaid each year, the outstanding balance <em>decreases</em> over time. Year 1 interest is <MathBlock math={"5\\% \\times 6{,}000 = 300"} />, but in year 2 only <MathBlock math={"5{,}000"} /> is outstanding, so interest is less than 300, and so on. Total interest is therefore less than <MathBlock math={"\\text{€}1{,}800"} />.</p>
      </div>
    ),
  },

  {
    id: 'li-ex-5',
    topicId: 'life-tables-mortality',
    type: 'exercise',
    source: 'Life Q5',
    title: 'One-Year Survival Probability',
    difficulty: 1,
    points: null,
    prompt: () => (
      <div>
        <p>Suppose the one-year mortality rate at age <MathBlock math={"x"} /> is given by <MathBlock math={"q_x = x/100"} />. What is the one-year survival probability for a 60 year old person?</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>0.04</li>
          <li>0.39</li>
          <li>0.40</li>
          <li>0.60</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>Answer: (c).</strong> <MathBlock math={"q_{60} = 60/100 = 0.6"} />, so the survival probability is <MathBlock math={"p_{60} = 1 - q_{60} = 0.4"} />.</p>
      </div>
    ),
  },

  {
    id: 'li-ex-6',
    topicId: 'life-tables-mortality',
    type: 'exercise',
    source: 'Life Q6',
    title: 'Life Table: Two-Year Mortality',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>We are given a small piece of a life table:</p>
        <div className="my-3 overflow-x-auto rounded-lg" style={{ background: 'rgba(196,181,253,0.04)', border: '1px solid var(--border)' }}>
          <table className="w-full text-sm" style={{ color: 'var(--color-ink)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="px-4 py-2 text-left" style={{ color: 'var(--color-ink-faint)' }}>x</th>
                <th className="px-4 py-2 text-right" style={{ color: 'var(--color-ink-faint)' }}><MathBlock math={"\\ell_x^{\\text{Female}}"} /></th>
              </tr>
            </thead>
            <tbody>
              {[['32', '9,923,679'], ['33', '9,918,048'], ['34', '9,911,963']].map(([age, lx], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-2">{age}</td>
                  <td className="px-4 py-2 text-right">{lx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>What is the probability that a 32 year old woman dies in the coming two years?</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>0.000567</li>
          <li>0.000944</li>
          <li>0.001181</li>
          <li>0.001675</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>Answer: (c).</strong></p>
        <MathBlock math={"{}_{2}q_{32} = 1 - {}_{2}p_{32} = 1 - \\frac{\\ell_{34}}{\\ell_{32}} = 1 - \\frac{9{,}911{,}963}{9{,}923{,}679} = 0.001181"} display />
      </div>
    ),
  },

  {
    id: 'li-ex-7',
    topicId: 'life-tables-mortality',
    type: 'exercise',
    source: 'Life Q7',
    title: 'Chained Survival Probability',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>Suppose the one-year mortality rate at age <MathBlock math={"x"} /> is given by <MathBlock math={"q_x = x/100"} />. What is the probability that an 18 year old dies at the age of 20?</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>0.133</li>
          <li>0.162</li>
          <li>0.180</li>
          <li>We do not have sufficient information.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>Answer: (a).</strong> The 18-year-old must survive to age 19, then survive to age 20, then die at age 20:</p>
        <MathBlock math={"{}_{2}p_{18} \\cdot q_{20} = p_{18} \\cdot p_{19} \\cdot q_{20} = (1 - q_{18})(1 - q_{19}) \\cdot q_{20}"} display />
        <MathBlock math={"= (1 - 0.18)(1 - 0.19) \\cdot 0.20 = 0.82 \\times 0.81 \\times 0.20 = 0.13284"} display />
      </div>
    ),
  },

  {
    id: 'li-ex-8',
    topicId: 'life-tables-mortality',
    type: 'exercise',
    source: 'Life Q8',
    title: 'Curtate Life Expectancy Proof',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>Verify the equality for the curtate future lifetime expectation by filling in the intermediate steps:</p>
        <MathBlock math={"e_x = \\text{E}[K(x)] = \\sum_{k=0}^{\\infty} k \\cdot {}_{k}p_x \\cdot q_{x+k} = (\\cdots) = \\sum_{k=1}^{\\infty} {}_{k}p_x"} display />
      </div>
    ),
    solution: () => (
      <div>
        <MathBlock math={"e_x = \\sum_{k=0}^{\\infty} k \\cdot {}_{k}p_x \\cdot q_{x+k} = \\sum_{k=0}^{\\infty} k \\cdot {}_{k}p_x \\cdot (1 - p_{x+k})"} display />
        <MathBlock math={"= \\sum_{k=0}^{\\infty} k \\cdot {}_{k}p_x - \\sum_{k=0}^{\\infty} k \\cdot {}_{k+1}p_x"} display />
        <p>Re-index the second sum by substituting <MathBlock math={"k = m - 1"} />:</p>
        <MathBlock math={"= \\sum_{k=1}^{\\infty} k \\cdot {}_{k}p_x - \\sum_{m=1}^{\\infty} (m-1) \\cdot {}_{m}p_x = \\sum_{k=1}^{\\infty} [k - (k-1)] \\cdot {}_{k}p_x = \\sum_{k=1}^{\\infty} {}_{k}p_x"} display />
      </div>
    ),
  },

  {
    id: 'li-ex-9',
    topicId: 'actuarial-pv',
    type: 'exercise',
    source: 'Life Q9',
    title: 'Term Insurance APV Derivation',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>We are given mortality rates <MathBlock math={"q_x"} /> for <MathBlock math={"x = 0, \\ldots, \\omega - 1"} /> and constant interest rate <MathBlock math={"i"} />. Consider an insurance product that pays a benefit <MathBlock math={"c"} /> at the end of the year of death. Give an expression (in terms of a summation) for the actuarial present value of this product for a person aged <MathBlock math={"x"} />.</p>
        <p style={{ marginTop: '0.5rem' }}><em>Hint: write out the first two or three terms, then generalize.</em></p>
      </div>
    ),
    solution: () => (
      <div>
        <p>The first few possible cash flows:</p>
        <ul className="sg-list">
          <li>Dies in year 1: benefit <MathBlock math={"c"} /> at <MathBlock math={"t=1"} />, contribution <MathBlock math={"c \\cdot v(1) \\cdot q_x"} /></li>
          <li>Dies in year 2: contribution <MathBlock math={"c \\cdot v(2) \\cdot {}_1p_x \\cdot q_{x+1}"} /></li>
          <li>Dies in year 3: contribution <MathBlock math={"c \\cdot v(3) \\cdot {}_2p_x \\cdot q_{x+2}"} /></li>
        </ul>
        <p style={{ marginTop: '0.5rem' }}>The general term for death in year <MathBlock math={"j+1"} /> is <MathBlock math={"c \\cdot v(j+1) \\cdot {}_jp_x \\cdot q_{x+j}"} />. Summing:</p>
        <MathBlock math={"\\text{APV} = c \\cdot \\sum_{j=0}^{\\omega - x - 1} v(j+1) \\cdot {}_jp_x \\cdot q_{x+j}"} display />
      </div>
    ),
  },

  {
    id: 'li-ex-10',
    topicId: 'pensions',
    type: 'exercise',
    source: 'Life Q10',
    title: 'Cross-Subsidization in Life Insurance',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>A life insurer has 1,000 one-year term life policies with benefit <MathBlock math={"\\text{€}50{,}000"} />: 750 healthy insureds (<MathBlock math={"q_x = 0.001"} />) and 250 unhealthy insureds (<MathBlock math={"q_x = 0.005"} />). A uniform premium of <MathBlock math={"\\text{€}200"} /> is charged. Interest rate is 0%.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>What is the expected profit on the healthy insureds?</li>
          <li>What is the break-even premium?</li>
          <li>At the break-even premium, what is the subsidizing solidarity from healthy to unhealthy?</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> Premium income: <MathBlock math={"750 \\times 200 = 150{,}000"} />. Expected claims: <MathBlock math={"750 \\times 0.001 \\times 50{,}000 = 37{,}500"} />. Profit: <MathBlock math={"150{,}000 - 37{,}500 = \\textbf{112{,}500}"} />.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>(b)</strong> Total expected deaths: <MathBlock math={"750 \\times 0.001 + 250 \\times 0.005 = 2"} />. Total expected claims: <MathBlock math={"2 \\times 50{,}000 = 100{,}000"} />. Break-even premium: <MathBlock math={"100{,}000 / 1{,}000 = \\textbf{€100}"} />.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>(c)</strong> Fair premium for healthy: <MathBlock math={"0.001 \\times 50{,}000 = 50"} />. Fair premium for unhealthy: <MathBlock math={"0.005 \\times 50{,}000 = 250"} />. At the break-even premium of <MathBlock math={"\\text{€}100"} />, healthy people overpay by <MathBlock math={"\\text{€}50"} /> each. Total subsidy: <MathBlock math={"750 \\times 50 = \\textbf{€37{,}500}"} />.</p>
      </div>
    ),
  },

  // ──────────────────────────────────────────────────────────────────
  //  OPTION PRICING — EXERCISES
  // ──────────────────────────────────────────────────────────────────

  {
    id: 'op-ex-2',
    topicId: 'binomial-pricing',
    type: 'exercise',
    source: 'Options Q2',
    title: 'Replicating Portfolio: Find the Option Price',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>Bond <MathBlock math={"B = 50"} /> paying 52.5 in both states. Stock <MathBlock math={"S = 80"} />, going to 105 (up) or 65 (down). A call option with strike <MathBlock math={"K = 95"} /> has payoff 10 (up) and 0 (down). Find <MathBlock math={"\\phi"} /> (stocks), <MathBlock math={"\\psi"} /> (bonds), and the option price <MathBlock math={"c"} />.</p>
      </div>
    ),
    solution: () => (
      <div>
        <p>System of equations:</p>
        <MathBlock math={"\\psi \\times 52.5 + \\phi \\times 105 = 10 \\quad \\text{(up)}"} display />
        <MathBlock math={"\\psi \\times 52.5 + \\phi \\times 65 = 0 \\quad \\text{(down)}"} display />
        <p>Subtracting: <MathBlock math={"\\phi \\times 40 = 10"} />, so <MathBlock math={"\\phi = 1/4"} />.</p>
        <p>From the down equation: <MathBlock math={"\\psi = -\\phi \\times 65 / 52.5 = -13/42"} />.</p>
        <MathBlock math={"c = \\psi \\times 50 + \\phi \\times 80 = -\\frac{13}{42} \\times 50 + \\frac{1}{4} \\times 80 \\approx 4.52"} display />
      </div>
    ),
  },

  {
    id: 'op-ex-4',
    topicId: 'financial-instruments',
    type: 'exercise',
    source: 'Options Q4',
    title: 'Replicating a Future Contract',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>Bond <MathBlock math={"B = 100"} /> paying 104 in both states. Stock <MathBlock math={"S = 100"} />, going to 120 (up) or 90 (down). A future contract with strike <MathBlock math={"K = 100"} /> has payoff <MathBlock math={"S - K"} />: that's 20 (up) or <MathBlock math={"-10"} /> (down).</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>Draw the binomial trees for the bond, stock, and future.</li>
          <li>Find <MathBlock math={"\\phi"} /> and <MathBlock math={"\\psi"} /> that replicate the future, and compute its fair price <MathBlock math={"f"} />.</li>
          <li>Compare the payoff of the call option (<MathBlock math={"K = 100"} />) with the future. Which is worth more?</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> Binomial trees:</p>
        <div className="my-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          <TreeDiagram title="Bond" levels={[['100'], ['104', '104']]} />
          <TreeDiagram title="Stock" levels={[['100'], ['120', '90']]} />
          <TreeDiagram title="Future (K=100)" levels={[['f'], ['20', '−10']]} />
        </div>

        <p style={{ marginTop: '0.75rem' }}><strong>(b)</strong> Replication: <MathBlock math={"\\phi \\times 120 + \\psi \\times 104 = 20"} /> and <MathBlock math={"\\phi \\times 90 + \\psi \\times 104 = -10"} />.</p>
        <p>Subtracting: <MathBlock math={"30\\phi = 30"} />, so <MathBlock math={"\\phi = 1"} />. Then <MathBlock math={"\\psi = -100/104"} />.</p>
        <MathBlock math={"f = 1 \\times 100 + (-100/104) \\times 100 \\approx 3.85"} display />
        <p style={{ marginTop: '0.5rem' }}><strong>(c)</strong> The call option payoff is <MathBlock math={"\\max\\{S - K, 0\\}"} />: 20 (up) or 0 (down). The future payoff is <MathBlock math={"S - K"} />: 20 (up) or <MathBlock math={"-10"} /> (down). In the up-scenario they're identical, but in the down-scenario the future has a negative payoff while the call has zero. Therefore the call option is worth <em>more</em> than the future.</p>
      </div>
    ),
  },

  {
    id: 'op-ex-5',
    topicId: 'binomial-pricing',
    type: 'exercise',
    source: 'Options Q5',
    title: 'Deriving the Risk-Neutral Probability',
    difficulty: 2,
    points: null,
    prompt: () => (
      <div>
        <p>The risk-neutral pricing formula <MathBlock math={"C = \\frac{1}{1+r}[q C_u + (1-q) C_d]"} /> should hold for all contracts in the market.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>Apply this formula to the stock (which is worth <MathBlock math={"S"} /> today and <MathBlock math={"uS"} /> or <MathBlock math={"dS"} /> next period) and the bond. Show that the equations are consistent.</li>
          <li>Use the stock equation to derive <MathBlock math={"q = (1 + r - d)/(u - d)"} />.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> For the stock: <MathBlock math={"S = \\frac{1}{1+r}[q \\cdot uS + (1-q) \\cdot dS]"} />, which simplifies to <MathBlock math={"1+r = qu + (1-q)d"} />.</p>
        <p>For the bond: <MathBlock math={"1 = \\frac{1}{1+r}[q(1+r) + (1-q)(1+r)] = 1"} /> — always true.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>(b)</strong> From the stock equation:</p>
        <MathBlock math={"1 + r = qu + (1-q)d = qu + d - qd = d + q(u - d)"} display />
        <MathBlock math={"\\Rightarrow q = \\frac{1 + r - d}{u - d}"} display />
      </div>
    ),
  },

  {
    id: 'op-ex-3',
    topicId: 'european-american',
    type: 'exercise',
    source: 'Options Q3',
    title: 'Three-State Model: Replicating a Put',
    difficulty: 3,
    points: null,
    prompt: () => (
      <div>
        <p>Consider a model with three states (up, middle, down). Bond <MathBlock math={"B = 100"} /> paying 100 in all states. Stock <MathBlock math={"S = 100"} /> going to 110, 100, or 90. Call option <MathBlock math={"C = 3"} /> with strike 100: payoff 10, 0, 0. Put option with strike 100: payoff 0, 0, 10.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>Draw the binomial trees for all four instruments.</li>
          <li>Find a combination of bonds, stocks, and calls that replicates the put. What is the put price?</li>
          <li>Find risk-neutral probabilities <MathBlock math={"q^{\\text{up}}, q^{\\text{mid}}, q^{\\text{down}}"} />.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> Trees for all four instruments (three states: up, mid, down):</p>
        <div className="my-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          <TreeDiagram title="Bond" levels={[['100'], ['100', '100', '100']]} />
          <TreeDiagram title="Stock" levels={[['100'], ['110', '100', '90']]} />
          <TreeDiagram title="Call (K=100)" levels={[['3'], ['10', '0', '0']]} />
          <TreeDiagram title="Put (K=100)" levels={[['?'], ['0', '0', '10']]} />
        </div>

        <p style={{ marginTop: '0.75rem' }}><strong>(b)</strong> We need <MathBlock math={"a"} /> bonds, <MathBlock math={"b"} /> stocks, <MathBlock math={"c"} /> calls such that:</p>
        <MathBlock math={"100a + 110b + 10c = 0 \\quad \\text{(up)}"} display />
        <MathBlock math={"100a + 100b + 0c = 0 \\quad \\text{(mid)}"} display />
        <MathBlock math={"100a + 90b + 0c = 10 \\quad \\text{(down)}"} display />
        <p>From the middle equation: <MathBlock math={"a = -b"} />. Substituting into the down equation: <MathBlock math={"-100b + 90b = 10"} />, so <MathBlock math={"b = -1"} /> and <MathBlock math={"a = 1"} />. From the up equation: <MathBlock math={"100 - 110 + 10c = 0"} />, so <MathBlock math={"c = 1"} />.</p>
        <p>Put price: <MathBlock math={"P = 1 \\times 100 + (-1) \\times 100 + 1 \\times 3 = \\textbf{3}"} /></p>

        <p style={{ marginTop: '0.75rem' }}><strong>(c)</strong> Risk-neutral probabilities must satisfy three pricing equations (with <MathBlock math={"r = 0"} /> since the bond pays 100):</p>
        <MathBlock math={"q^{\\text{up}} + q^{\\text{mid}} + q^{\\text{down}} = 1 \\quad \\text{(bond)}"} display />
        <MathBlock math={"110q^{\\text{up}} + 100q^{\\text{mid}} + 90q^{\\text{down}} = 100 \\quad \\text{(stock)}"} display />
        <MathBlock math={"10q^{\\text{up}} + 0 + 0 = 3 \\quad \\text{(call)}"} display />
        <p>From the call equation: <MathBlock math={"q^{\\text{up}} = 0.3"} />. From the stock equation: <MathBlock math={"100q^{\\text{mid}} + 90q^{\\text{down}} = 67"} />. Combined with <MathBlock math={"q^{\\text{mid}} + q^{\\text{down}} = 0.7"} />:</p>
        <MathBlock math={"q^{\\text{down}} = 0.3, \\quad q^{\\text{mid}} = 0.4"} display />
        <p>Verification: put price = <MathBlock math={"0 + 0 + 0.3 \\times 10 = 3"} /> ✓</p>
      </div>
    ),
  },

  {
    id: 'op-ex-8',
    topicId: 'european-american',
    type: 'exercise',
    source: 'Options Q8',
    title: 'American vs European Put Option',
    difficulty: 3,
    points: null,
    prompt: () => (
      <div>
        <p>Consider a multi-period binomial tree for pricing a put option with strike <MathBlock math={"K"} />.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li>Explain the difference between pricing an American and European put option on a binomial tree. Write down the relevant formulas for each.</li>
          <li>Using a 4-period tree (spreadsheet provided), compute the price of an American put with <MathBlock math={"K = 100"} />, <MathBlock math={"S = 100"} />, <MathBlock math={"\\sigma = 0.2"} />, <MathBlock math={"r = 3\\%"} />, <MathBlock math={"T = 1"} />.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> At maturity, both have the same payoff: <MathBlock math={"\\max\\{K - S, 0\\}"} />.</p>
        <p style={{ marginTop: '0.5rem' }}>Before maturity:</p>
        <ul className="sg-list">
          <li><strong>European:</strong> cannot be exercised, so <MathBlock math={"P^{\\text{Eur}} = \\exp(-r\\Delta t)(qP_u + (1-q)P_d)"} /> (continuation value only).</li>
          <li><strong>American:</strong> can be exercised at any time, so <MathBlock math={"P^{\\text{Am}} = \\max\\{K - S, \\; \\exp(-r\\Delta t)(qP_u + (1-q)P_d)\\}"} /> (maximum of exercise value and continuation value).</li>
        </ul>
        <p style={{ marginTop: '0.5rem' }}><strong>(b)</strong> The payoffs at maturity (starting from most upward): <MathBlock math={"\\{0, 0, 0, 5.06, 14.43, 22.88\\}"} />. Working backward with early exercise, the final put price is approximately <MathBlock math={"\\textbf{4.17}"} />. Note that early exercise occurs at some lower nodes of the tree.</p>
      </div>
    ),
  },

  // ──────────────────────────────────────────────────────────────────
  //  EXAM 2021 — January 29, 2021
  // ──────────────────────────────────────────────────────────────────

  {
    id: 'exam-2021-q1',
    topicId: 'compound-distributions',
    type: 'exam',
    source: 'Exam 2021 Q1',
    title: 'DriveSafe: Compound Distributions [20 pts]',
    difficulty: 3,
    points: 20,
    prompt: () => (
      <div>
        <p>Insurance company <strong>DriveSafe</strong> has 10,000 policies. Policyholders file on average 0.4 claims per year, so <MathBlock math={"N \\sim \\text{Poisson}(\\lambda = 4{,}000)"} />. Claim sizes <MathBlock math={"X_i \\sim N(\\mu = 60, \\sigma^2 = 20^2)"} />. Total loss <MathBlock math={"S = X_1 + \\cdots + X_N"} />.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li><strong>[8 pts]</strong> Derive <MathBlock math={"\\text{E}(S)"} /> and <MathBlock math={"\\text{Var}(S)"} /> by working out <MathBlock math={"\\text{E}[\\text{E}(S|N)]"} /> and <MathBlock math={"\\text{E}[\\text{Var}(S|N)] + \\text{Var}[\\text{E}(S|N)]"} />.</li>
          <li><strong>[6 pts]</strong> Using <MathBlock math={"\\text{E}(S) = 240{,}000"} /> and <MathBlock math={"\\text{Var}(S) = 4{,}000^2"} />, find the capital needed at 97.5% confidence using a Normal approximation. (<MathBlock math={"\\Phi^{-1}(0.975) = 1.96"} />)</li>
          <li><strong>[6 pts]</strong> Now each claim has a retention of <MathBlock math={"\\text{€}10"} /> (policyholder pays the first 10). The Normal approximation no longer applies. Which other method can analyze the distribution of the total loss <MathBlock math={"\\tilde{S}"} />?</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong></p>
        <MathBlock math={"\\text{E}[S] = \\text{E}[\\text{E}[S|N]] = \\text{E}[N \\cdot \\text{E}[X]] = \\text{E}[N] \\cdot \\text{E}[X] = 4{,}000 \\times 60 = 240{,}000"} display />
        <MathBlock math={"\\text{Var}(S) = \\text{E}[N] \\cdot \\text{Var}(X) + \\text{E}[X]^2 \\cdot \\text{Var}(N)"} display />
        <MathBlock math={"= 4{,}000 \\times 400 + 3{,}600 \\times 4{,}000 = 1{,}600{,}000 + 14{,}400{,}000 = 16{,}000{,}000 = 4{,}000^2"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(b)</strong></p>
        <MathBlock math={"q_S(0.975) = \\text{E}(S) + \\sqrt{\\text{Var}(S)} \\cdot \\Phi^{-1}(0.975) = 240{,}000 + 4{,}000 \\times 1.96 = 247{,}840"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(c)</strong> <strong>Monte Carlo simulation.</strong> For each scenario <MathBlock math={"i"} />: (1) sample <MathBlock math={"N_i"} /> from Poisson, (2) for each of the <MathBlock math={"N_i"} /> claims, sample claim size <MathBlock math={"X_{j,i}"} />, (3) compute adjusted claim <MathBlock math={"\\tilde{X}_{j,i} = \\max\\{0, X_{j,i} - 10\\}"} />, (4) compute total <MathBlock math={"\\tilde{S}_i = \\sum \\tilde{X}_{j,i}"} />. Repeat 10,000+ times to approximate the distribution.</p>
      </div>
    ),
  },

  {
    id: 'exam-2021-q2',
    topicId: 'pensions',
    type: 'exam',
    source: 'Exam 2021 Q2',
    title: 'Life Insurance: Pensions [20 pts]',
    difficulty: 3,
    points: 20,
    prompt: () => (
      <div>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li><strong>[6 pts]</strong> Paul is 20 and expects to retire at 70. He wants an annual pension benefit of 30,000. Which expression represents the APV of his pension benefits?
            <div style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
              <div>(i) <MathBlock math={"30{,}000 \\cdot \\sum_{j=0}^{\\infty} v(j) \\cdot {}_{j}p_{20} \\cdot q_{20+j}"} /></div>
              <div>(ii) <MathBlock math={"30{,}000 \\cdot \\sum_{j=0}^{\\infty} v(j) \\cdot {}_{50+j}p_{20}"} /></div>
              <div>(iii) <MathBlock math={"30{,}000 \\cdot \\sum_{j=0}^{\\infty} v(j) \\cdot {}_{j}p_{20}"} /></div>
              <div>(iv) <MathBlock math={"30{,}000 \\cdot \\sum_{j=50}^{\\infty} v(j) \\cdot {}_{j}p_{20}"} /></div>
            </div>
          </li>
          <li><strong>[6 pts]</strong> Heather has saved for a pension of <MathBlock math={"\\text{€}25{,}000"} />/year at 2% interest. The APV of <MathBlock math={"\\text{€}1"} /> annual pension benefit at retirement was 19.5. Now the insurer uses 1.5%, making the APV 22.5. What pension benefit can she expect?</li>
          <li><strong>[8 pts]</strong> Rahul retires next year with an annual pension of <MathBlock math={"\\text{€}40{,}000"} />. He wants to switch to a high-low construction: <MathBlock math={"b_H"} /> for the first 15 years, then <MathBlock math={"b_L = b_H - 10{,}000"} /> thereafter. The PV of <MathBlock math={"\\text{€}1"} /> for the first 15 years is 13.8, and for the years thereafter is 6.5. Find <MathBlock math={"b_H"} /> and <MathBlock math={"b_L"} />.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a) Answer: (iv).</strong> The pension is a deferred annuity starting at age 70 (i.e., after 50 years). The APV sums from <MathBlock math={"j = 50"} /> onwards, with each payment discounted by <MathBlock math={"v(j)"} /> and weighted by the survival probability <MathBlock math={"{}_{j}p_{20}"} />.</p>

        <p style={{ marginTop: '0.75rem' }}><strong>(b)</strong> The pot of money available at retirement: <MathBlock math={"25{,}000 \\times 19.5 = 487{,}500"} />. With the new APV of 22.5:</p>
        <MathBlock math={"b = 487{,}500 / 22.5 = \\textbf{€21{,}666.67}"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(c)</strong> Lifelong annuity value: <MathBlock math={"a = 13.8 + 6.5 = 20.3"} />. Total PV of current benefits: <MathBlock math={"40{,}000 \\times 20.3 = 812{,}000"} />.</p>
        <p>Equivalence: <MathBlock math={"13.8 \\cdot b_H + 6.5 \\cdot (b_H - 10{,}000) = 812{,}000"} /></p>
        <MathBlock math={"20.3 \\cdot b_H - 65{,}000 = 812{,}000 \\quad \\Rightarrow \\quad b_H = 877{,}000 / 20.3 = \\textbf{€43{,}201.97}"} display />
        <MathBlock math={"b_L = 43{,}201.97 - 10{,}000 = \\textbf{€33{,}201.97}"} display />
      </div>
    ),
  },

  {
    id: 'exam-2021-q3',
    topicId: 'binomial-pricing',
    type: 'exam',
    source: 'Exam 2021 Q3',
    title: 'Derivatives: Finding the Risk-Free Rate [20 pts]',
    difficulty: 3,
    points: 20,
    prompt: () => (
      <div>
        <p>A stock currently worth 100 will be worth 125 (up) or 95 (down) in one year. A call option with strike 120 has a current price of 1. Find a portfolio of <MathBlock math={"\\phi"} /> stocks and <MathBlock math={"\\psi"} /> calls that replicates a riskless bond paying 1 in both states. Use this to determine the risk-free interest rate.</p>
      </div>
    ),
    solution: () => (
      <div>
        <p>The call pays <MathBlock math={"\\max\\{125-120, 0\\} = 5"} /> (up) and <MathBlock math={"0"} /> (down). We need:</p>
        <MathBlock math={"\\phi \\times 125 + \\psi \\times 5 = 1 \\quad \\text{(up)}"} display />
        <MathBlock math={"\\phi \\times 95 + \\psi \\times 0 = 1 \\quad \\text{(down)}"} display />
        <p>From the second equation: <MathBlock math={"\\phi = 1/95"} />. Substituting: <MathBlock math={"125/95 + 5\\psi = 1"} />, so <MathBlock math={"\\psi = -6/95"} />.</p>
        <p style={{ marginTop: '0.5rem' }}>The replicating portfolio costs:</p>
        <MathBlock math={"\\phi \\times 100 + \\psi \\times 1 = \\frac{100}{95} + \\frac{-6}{95} = \\frac{94}{95}"} display />
        <p>This portfolio pays 1 in both states, so it acts as a bond. The price of this bond is <MathBlock math={"(1+r)^{-1} = 94/95"} />:</p>
        <MathBlock math={"1 + r = \\frac{95}{94} \\quad \\Rightarrow \\quad r = \\frac{1}{94} \\approx \\textbf{1.064\\%}"} display />
      </div>
    ),
  },

  {
    id: 'exam-2021-q4',
    topicId: 'glms',
    type: 'exam',
    source: 'Exam 2021 Q4',
    title: 'NoClaims: Poisson GLM [20 pts]',
    difficulty: 3,
    points: 20,
    prompt: () => (
      <div>
        <p>Insurance company <strong>NoClaims</strong> has claims data with policyholder age <MathBlock math={"x_i"} />, exposure (years in force) <MathBlock math={"w_i"} />, and observed claims <MathBlock math={"y_i"} />.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li><strong>[7 pts]</strong> Assume <MathBlock math={"Y_i \\sim \\text{Poisson}(\\lambda)"} /> (no risk factors). Write down the log-likelihood and find the MLE for <MathBlock math={"\\lambda"} />.</li>
          <li><strong>[6 pts]</strong> Now include exposure: <MathBlock math={"Y_i \\sim \\text{Poisson}(\\lambda w_i)"} />. Write the log-likelihood and find the MLE for <MathBlock math={"\\lambda"} />.</li>
          <li><strong>[7 pts]</strong> We estimate a Poisson GLM with age (<MathBlock math={"x_1"} />) and gender (<MathBlock math={"x_2"} />, 1 = female) using R:</li>
        </ol>
        <div className="my-2 rounded-lg p-3" style={{ background: 'rgba(196,181,253,0.04)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-ink)' }}>
          <pre style={{ margin: 0 }}>{`glm(y ~ 1 + x1 + x2 + offset(log(w)),
    family = poisson(link = log))

Coefficients:
(Intercept)      x1       x2
  -3.42965  0.01357  0.02415`}</pre>
        </div>
        <p>What is the relative difference in expected annual claim frequency between males and females?</p>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> <MathBlock math={"\\ln \\mathcal{L}(\\lambda) = \\sum_{i=1}^{n} (-\\lambda + y_i \\ln \\lambda - \\ln(y_i!))"} /></p>
        <MathBlock math={"\\frac{d}{d\\lambda} \\ln \\mathcal{L} = \\sum (-1 + y_i/\\lambda) = 0 \\quad \\Rightarrow \\quad \\hat{\\lambda} = \\frac{\\sum y_i}{n}"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(b)</strong> With exposure: <MathBlock math={"\\ln \\mathcal{L}(\\lambda) = \\sum_{i=1}^{n} (-\\lambda w_i + y_i \\ln(\\lambda w_i) - \\ln(y_i!))"} /></p>
        <MathBlock math={"\\frac{d}{d\\lambda} \\ln \\mathcal{L} = \\sum (-w_i + y_i/\\lambda) = 0 \\quad \\Rightarrow \\quad \\hat{\\lambda} = \\frac{\\sum y_i}{\\sum w_i}"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(c)</strong> The model is <MathBlock math={"\\ln(\\lambda_i) = \\beta_0 + \\beta_1 x_{1i} + \\beta_2 x_{2i} + \\ln(w_i)"} />. The relative difference between females (<MathBlock math={"x_2 = 1"} />) and males (<MathBlock math={"x_2 = 0"} />):</p>
        <MathBlock math={"\\frac{\\lambda_{\\text{female}}}{\\lambda_{\\text{male}}} = \\exp(\\hat{\\beta}_2) = \\exp(0.02415) = 1.0244"} display />
        <p>Females claim <strong>2.44% more frequently</strong> than males.</p>
      </div>
    ),
  },

  // ──────────────────────────────────────────────────────────────────
  //  RESIT 2020 — January 31, 2020
  // ──────────────────────────────────────────────────────────────────

  {
    id: 'exam-2020-q1a',
    topicId: 'glms',
    type: 'exam',
    source: 'Resit 2020 Q1a',
    title: 'Binomial MLE for Claim Probability [15 pts]',
    difficulty: 2,
    points: 15,
    prompt: () => (
      <div>
        <p>Policyholders <MathBlock math={"i = 1, \\ldots, I"} /> have been observed for <MathBlock math={"x_i"} /> years. Each year they can file a claim with probability <MathBlock math={"p"} />. So <MathBlock math={"Y_i \\sim \\text{Binomial}(x_i, p)"} /> and we observe <MathBlock math={"y_i"} /> claims.</p>
        <p>Write down the log-likelihood function and find the MLE for <MathBlock math={"p"} />.</p>
        <p style={{ marginTop: '0.5rem' }}><em>NB: for a Binomial(n, p), the pdf is <MathBlock math={"\\binom{n}{x} p^x (1-p)^{n-x}"} />.</em></p>
      </div>
    ),
    solution: () => (
      <div>
        <MathBlock math={"\\ln \\mathcal{L}(p | \\vec{y}, \\vec{x}) = \\sum_{i=1}^{I} \\left[\\ln \\binom{x_i}{y_i} + y_i \\ln p + (x_i - y_i) \\ln(1-p)\\right]"} display />
        <p>Taking the derivative and setting to zero:</p>
        <MathBlock math={"\\frac{d}{dp} \\ln \\mathcal{L} = \\sum \\frac{y_i}{p} - \\frac{x_i - y_i}{1-p} = 0"} display />
        <MathBlock math={"\\hat{p} = \\frac{\\sum_{i=1}^{I} y_i}{\\sum_{i=1}^{I} x_i}"} display />
        <p>The MLE is the total number of claims divided by the total person-years of observation.</p>
      </div>
    ),
  },

  {
    id: 'exam-2020-q1b',
    topicId: 'compound-distributions',
    type: 'exam',
    source: 'Resit 2020 Q1b',
    title: 'Compound Distribution: Percentile [15 pts]',
    difficulty: 2,
    points: 15,
    prompt: () => (
      <div>
        <p>Consider <MathBlock math={"S = X_1 + \\cdots + X_N"} /> where all <MathBlock math={"X_i"} /> have mean 1000 and standard deviation 20.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-roman' }}>
          <li>If <MathBlock math={"N \\sim \\text{Poisson}(\\lambda = 10)"} />, compute E(S) and Var(S), and estimate the 90th percentile using a Normal approximation. (<MathBlock math={"\\Phi^{-1}(0.90) = 1.28"} />)</li>
          <li>If <MathBlock math={"N \\sim \\text{Binomial}(n = 1000, p = 0.1)"} />, compute E(S) and Var(S), and the 90th percentile. Explain the difference.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(i) Poisson:</strong> <MathBlock math={"\\text{E}(N) = \\text{Var}(N) = \\lambda = 10"} /></p>
        <MathBlock math={"\\text{E}(S) = 10 \\times 1000 = 10{,}000"} display />
        <MathBlock math={"\\text{Var}(S) = \\text{E}[N]\\text{Var}(X) + \\text{E}[X]^2\\text{Var}(N) = 10 \\times 400 + 1{,}000{,}000 \\times 10 = 10{,}004{,}000"} display />
        <MathBlock math={"q_{0.9} = 10{,}000 + 1.28 \\times \\sqrt{10{,}004{,}000} = 10{,}000 + 1.28 \\times 3{,}163 = \\textbf{14{,}049}"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(ii) Binomial:</strong> <MathBlock math={"\\text{E}(N) = np = 100"} />, <MathBlock math={"\\text{Var}(N) = np(1-p) = 90"} /></p>
        <MathBlock math={"\\text{E}(S) = 100 \\times 1000 = 100{,}000"} display />
        <MathBlock math={"\\text{Var}(S) = 100 \\times 400 + 1{,}000{,}000 \\times 90 = 90{,}040{,}000"} display />
        <MathBlock math={"q_{0.9} = 100{,}000 + 1.28 \\times 9{,}491 = \\textbf{112{,}148}"} display />
        <p><strong>Note:</strong> The Poisson and Binomial versions have different <MathBlock math={"\\text{E}(N)"} /> here (10 vs 100), so the comparison is about the distributional assumption given the same setup parameters. When <MathBlock math={"\\text{E}(N)"} /> is the same, the Binomial gives a lower quantile because <MathBlock math={"\\text{Var}(N_{\\text{Bin}}) = np(1-p) < np = \\text{Var}(N_{\\text{Poi}})"} />.</p>
      </div>
    ),
  },

  {
    id: 'exam-2020-q1c',
    topicId: 'glms',
    type: 'exam',
    source: 'Resit 2020 Q1c-d',
    title: 'Poisson GLM with Age and Gender [20 pts]',
    difficulty: 3,
    points: 20,
    prompt: () => (
      <div>
        <p>For policyholders <MathBlock math={"i = 1, \\ldots, I"} />, we observe exposure <MathBlock math={"w_i"} />, age <MathBlock math={"x_{1i}"} />, gender <MathBlock math={"x_{2i}"} /> (1 = female, 0 = male), and claim count <MathBlock math={"y_i"} />.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha', start: 3 }}>
          <li><strong>[10 pts]</strong> Assume <MathBlock math={"Y_i \\sim \\text{Poisson}"} /> with annual claim frequency depending on age and gender (non-negative). Define the complete statistical model.</li>
          <li><strong>[10 pts]</strong> The estimated model gives: Intercept = −3.42965, <MathBlock math={"x_1"} /> = 0.01357, <MathBlock math={"x_2"} /> = 0.02415. What is the relative difference in expected annual claim frequency between males and females?</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(c)</strong> <MathBlock math={"Y_i \\sim \\text{Poisson}(w_i \\cdot \\exp[\\beta_0 + \\beta_1 x_{1i} + \\beta_2 x_{2i}])"} /></p>
        <p>Equivalently: <MathBlock math={"\\ln(\\lambda_i) = \\beta_0 + \\beta_1 x_{1i} + \\beta_2 x_{2i} + \\ln(w_i)"} /> where <MathBlock math={"\\ln(w_i)"} /> is the offset term.</p>

        <p style={{ marginTop: '0.75rem' }}><strong>(d)</strong> <MathBlock math={"\\lambda_{\\text{female}} / \\lambda_{\\text{male}} = \\exp(\\hat{\\beta}_2) = \\exp(0.02415) = 1.0244"} /></p>
        <p>Females claim <strong>2.44% more frequently</strong> than males.</p>
      </div>
    ),
  },

  {
    id: 'exam-2020-q2',
    topicId: 'pensions',
    type: 'exam',
    source: 'Resit 2020 Q2',
    title: 'Life Insurance: Annuities & Pensions [30 pts]',
    difficulty: 3,
    points: 30,
    prompt: () => (
      <div>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li><strong>[10 pts]</strong> For someone aged <MathBlock math={"x < x_r"} />, identify each expression as a deferred, temporary, or lifelong annuity:
            <div style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
              <div>(i) <MathBlock math={"\\sum_{j=x_r}^{\\infty} v(j-x) \\cdot {}_{j-x}p_x"} /></div>
              <div>(ii) <MathBlock math={"\\sum_{j=0}^{x_r - x - 1} v(j) \\cdot {}_{j}p_x"} /></div>
              <div>(iii) <MathBlock math={"\\sum_{j=0}^{\\infty} v(j) \\cdot {}_{j}p_x"} /></div>
            </div>
          </li>
          <li><strong>[10 pts]</strong> Penelope (age 40, retirement age 65): lifelong annuity value = 35, deferred annuity value = 12.5. She wants <MathBlock math={"\\text{€}15{,}000"} />/year pension. What annual premium?</li>
          <li><strong>[10 pts]</strong> Abraham retires next year with <MathBlock math={"\\text{€}30{,}000"} />/year pension. He switches to high-low: <MathBlock math={"b_H"} /> for first 10 years, <MathBlock math={"b_L = b_H - 10{,}000"} /> after. PV of 1 unit for first 10 years = 9, for years after = 6.5. Find <MathBlock math={"b_H"} /> and <MathBlock math={"b_L"} />.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> (i) <strong>Deferred annuity</strong> — starts at retirement. (ii) <strong>Temporary annuity</strong> — first <MathBlock math={"x_r - x"} /> years. (iii) <strong>Lifelong annuity</strong>.</p>

        <p style={{ marginTop: '0.75rem' }}><strong>(b)</strong> PV of desired benefits: <MathBlock math={"15{,}000 \\times 12.5 = 187{,}500"} />. Temporary annuity (premium period): <MathBlock math={"35 - 12.5 = 22.5"} />. Annual premium: <MathBlock math={"187{,}500 / 22.5 = \\textbf{€8{,}333.33}"} /></p>

        <p style={{ marginTop: '0.75rem' }}><strong>(c)</strong> Lifelong annuity: <MathBlock math={"9 + 6.5 = 15.5"} />. Total PV: <MathBlock math={"30{,}000 \\times 15.5 = 465{,}000"} />.</p>
        <MathBlock math={"9 \\cdot b_H + 6.5 \\cdot (b_H - 10{,}000) = 465{,}000"} display />
        <MathBlock math={"15.5 \\cdot b_H = 530{,}000 \\quad \\Rightarrow \\quad b_H = \\textbf{€34{,}193.55}"} display />
        <MathBlock math={"b_L = 34{,}193.55 - 10{,}000 = \\textbf{€24{,}193.55}"} display />
      </div>
    ),
  },

  // ──────────────────────────────────────────────────────────────────
  //  RESIT 2019 — July 12, 2019
  // ──────────────────────────────────────────────────────────────────

  {
    id: 'exam-2019-q1a',
    topicId: 'cash-flows-discounting',
    type: 'exam',
    source: 'Resit 2019 Q1a',
    title: 'Cash Flow Exchange: PV Comparison [7 pts]',
    difficulty: 2,
    points: 7,
    prompt: () => (
      <div>
        <p>Harry and Susan agree to exchange cash flows. Susan pays Harry 100 now, and Harry pays back 50, 25, 15, and 10 in the coming years. The cash flow vector is <MathBlock math={"\\mathbf{c} = (100, -50, -25, -15, -10)"} />. Interest rate is 5%.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-roman' }}>
          <li>Calculate the present value of these cash flows.</li>
          <li>Based on the present value, who is better off: Harry or Susan?</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <MathBlock math={"\\text{PV} = \\sum_{t=0}^{4} v(t) \\cdot c(t+1) = 100 - \\frac{50}{1.05} - \\frac{25}{1.05^2} - \\frac{15}{1.05^3} - \\frac{10}{1.05^4} = 8.52"} display />
        <p><strong>Harry is better off.</strong> He receives 100 now (worth 100) but pays back cash flows with a present value of only 91.48. The PV of 8.52 represents Harry's net gain.</p>
      </div>
    ),
  },

  {
    id: 'exam-2019-q1b',
    topicId: 'life-tables-mortality',
    type: 'exam',
    source: 'Resit 2019 Q1b',
    title: 'Mortality Calculations [8 pts]',
    difficulty: 2,
    points: 8,
    prompt: () => (
      <div>
        <p>Suppose the one-year mortality rate for an individual aged <MathBlock math={"x"} /> is <MathBlock math={"q_x = x/1000"} />. Calculate:</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-roman' }}>
          <li>The probability that someone of age <MathBlock math={"x = 60"} /> will survive the next three years.</li>
          <li>The probability that someone of age <MathBlock math={"x = 70"} /> will survive one year and die in the following year.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(i)</strong></p>
        <MathBlock math={"{}_{3}p_{60} = p_{60} \\cdot p_{61} \\cdot p_{62} = (1 - 0.060)(1 - 0.061)(1 - 0.062)"} display />
        <MathBlock math={"= 0.940 \\times 0.939 \\times 0.938 = \\textbf{0.8279}"} display />

        <p style={{ marginTop: '0.5rem' }}><strong>(ii)</strong></p>
        <MathBlock math={"{}_1p_{70} \\cdot q_{71} = (1 - q_{70}) \\cdot q_{71} = (1 - 0.070) \\cdot 0.071 = 0.930 \\times 0.071 = \\textbf{0.0660}"} display />
      </div>
    ),
  },

  {
    id: 'exam-2019-q1c',
    topicId: 'pensions',
    type: 'exam',
    source: 'Resit 2019 Q1c',
    title: 'Jack\'s High-Low Pension [10 pts]',
    difficulty: 3,
    points: 10,
    prompt: () => (
      <div>
        <p>Jack is retired at age <MathBlock math={"x"} />, receiving <MathBlock math={"\\text{€}30{,}000"} />/year. He wants to switch to high-low: <MathBlock math={"b_H"} /> for the first 5 years, <MathBlock math={"b_L"} /> thereafter. He has decided <MathBlock math={"b_H = 50{,}000"} />. The PV of a <MathBlock math={"\\text{€}1"} /> lifelong annual pension is <MathBlock math={"a = 25"} />, and <MathBlock math={"\\sum_{k=0}^{4} v(k) \\cdot {}_{k}p_x = 4.5"} />.</p>
        <p>What is <MathBlock math={"b_L"} />?</p>
      </div>
    ),
    solution: () => (
      <div>
        <p>Total PV of current benefits: <MathBlock math={"a \\cdot b = 25 \\times 30{,}000 = 750{,}000"} /></p>
        <p>Define <MathBlock math={"a_H = 4.5"} /> (PV of first 5 years) and <MathBlock math={"a_L = 25 - 4.5 = 20.5"} /> (PV of years thereafter).</p>
        <p>Equivalence: <MathBlock math={"a_H \\cdot b_H + a_L \\cdot b_L = a \\cdot b"} /></p>
        <MathBlock math={"b_L = \\frac{a \\cdot b - a_H \\cdot b_H}{a_L} = \\frac{750{,}000 - 4.5 \\times 50{,}000}{20.5} = \\frac{525{,}000}{20.5} = \\textbf{€25{,}609.76}"} display />
      </div>
    ),
  },

  {
    id: 'exam-2019-q2',
    topicId: 'glms',
    type: 'exam',
    source: 'Resit 2019 Q2',
    title: 'Bernoulli MLE & Poisson GLM [25 pts]',
    difficulty: 3,
    points: 25,
    prompt: () => (
      <div>
        <p>We observe binary outcomes <MathBlock math={"y_i \\in \\{0, 1\\}"} /> (salary increase or not) for <MathBlock math={"n"} /> individuals.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li><strong>[10 pts]</strong> Assuming all individuals have the same probability <MathBlock math={"p"} />, write the statistical model, likelihood, and find the MLE for <MathBlock math={"p"} />.</li>
        </ol>
        <p style={{ marginTop: '0.5rem' }}>Now consider claims data with variables: Claims<MathBlock math={"_i"} />, Age<MathBlock math={"_i"} />, Expo<MathBlock math={"_i"} />. The Poisson GLM output:</p>
        <div className="my-2 rounded-lg p-3" style={{ background: 'rgba(196,181,253,0.04)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-ink)' }}>
          <pre style={{ margin: 0 }}>{`glm(Claims ~ 1 + Age + offset(log(Expo)),
    family=poisson(link=log))

            Estimate  Std.Error  z value  Pr(>|z|)
(Intercept) -4.0348   0.0186    -216.459  < 2e-16 ***
Age          0.0513   0.1268     0.405    0.685`}</pre>
        </div>
        <ol className="sg-list" start={2} style={{ listStyleType: 'lower-alpha' }}>
          <li><strong>[5 pts]</strong> Define the statistical model for this regression.</li>
          <li><strong>[5 pts]</strong> What is the relative difference in expected annual claim frequency between a policyholder aged 80 and one aged 40?</li>
          <li><strong>[5 pts]</strong> What can you conclude from the estimated parameters and standard errors?</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> Model: <MathBlock math={"Y_i \\sim \\text{Bernoulli}(p)"} />. Likelihood: <MathBlock math={"\\mathcal{L}(p) = \\prod p^{y_i}(1-p)^{1-y_i}"} /></p>
        <MathBlock math={"\\ln \\mathcal{L} = \\sum [y_i \\ln p + (1-y_i)\\ln(1-p)]"} display />
        <MathBlock math={"\\hat{p} = \\sum y_i / n"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(b)</strong> <MathBlock math={"\\text{Claims}_i \\sim \\text{Poisson}(\\lambda_i)"} /> with <MathBlock math={"\\ln \\lambda_i = \\beta_0 + \\beta_1 \\cdot \\text{Age}_i + \\ln(\\text{Expo}_i)"} /></p>

        <p style={{ marginTop: '0.75rem' }}><strong>(c)</strong></p>
        <MathBlock math={"\\frac{\\lambda_{80}}{\\lambda_{40}} = \\exp[0.0513 \\cdot (80 - 40)] = \\exp(2.052) = \\textbf{7.78}"} display />
        <p>Alternatively: <MathBlock math={"\\lambda_{80} = \\exp(-4.0348 + 0.0513 \\times 80) = 0.1072"} /> and <MathBlock math={"\\lambda_{40} = \\exp(-4.0348 + 0.0513 \\times 40) = 0.01377"} />. Ratio: <MathBlock math={"7.78"} />.</p>

        <p style={{ marginTop: '0.75rem' }}><strong>(d)</strong> The Age coefficient (0.0513) has a z-value of only 0.405, with p-value 0.685. This is far from significant. The age effect is highly doubtful; it would be better to exclude Age from the model.</p>
      </div>
    ),
  },

  {
    id: 'exam-2019-q3',
    topicId: 'compound-distributions',
    type: 'exam',
    source: 'Resit 2019 Q3',
    title: 'Markov\'s Inequality & Law of Large Numbers [25 pts]',
    difficulty: 3,
    points: 25,
    prompt: () => (
      <div>
        <p>Let <MathBlock math={"X_1, X_2, \\ldots"} /> be i.i.d. with <MathBlock math={"\\text{E}[X_k] = 0"} /> and <MathBlock math={"\\text{Var}[X_k] = \\sigma^2 > 0"} />.</p>
        <p><strong>Markov's inequality:</strong> For non-negative <MathBlock math={"Z"} /> with finite expectation and <MathBlock math={"\\varepsilon > 0"} />: <MathBlock math={"\\mathbb{P}[Z \\geq \\varepsilon] \\leq \\text{E}[Z] / \\varepsilon"} />.</p>
        <ol className="sg-list" style={{ listStyleType: 'lower-alpha' }}>
          <li><strong>[7 pts]</strong> Apply Markov's inequality to the risk <MathBlock math={"(X_1)^2"} />. Your answer should feature <MathBlock math={"\\sigma^2"} />.</li>
          <li><strong>[6 pts]</strong> Use (a) to derive an upper bound on <MathBlock math={"\\mathbb{P}[|X_1| \\geq \\sqrt{\\varepsilon}]"} />.</li>
          <li><strong>[6 pts]</strong> Give expressions for <MathBlock math={"\\text{Var}[\\bar{X}_n]"} /> and <MathBlock math={"\\text{Var}[S_n]"} /> where <MathBlock math={"\\bar{X}_n = \\frac{1}{n}\\sum X_i"} /> and <MathBlock math={"S_n = \\sum X_i"} />. What are their limits as <MathBlock math={"n \\to \\infty"} />?</li>
          <li><strong>[6 pts]</strong> Provide an upper bound on <MathBlock math={"\\mathbb{P}[|\\bar{X}_n| \\geq \\bar{\\ell}]"} /> for <MathBlock math={"\\bar{\\ell} > 0"} />, and analyze the limit as <MathBlock math={"n \\to \\infty"} />.</li>
        </ol>
      </div>
    ),
    solution: () => (
      <div>
        <p><strong>(a)</strong> Since <MathBlock math={"\\text{E}(X_1) = 0"} />, <MathBlock math={"\\text{E}[(X_1)^2] = \\text{Var}(X_1) = \\sigma^2"} />. Applying Markov:</p>
        <MathBlock math={"\\mathbb{P}[(X_1)^2 \\geq \\varepsilon] \\leq \\frac{\\sigma^2}{\\varepsilon}"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(b)</strong> Note <MathBlock math={"(X_1)^2 \\geq \\varepsilon \\iff |X_1| \\geq \\sqrt{\\varepsilon}"} />, so:</p>
        <MathBlock math={"\\mathbb{P}[|X_1| \\geq \\sqrt{\\varepsilon}] = \\mathbb{P}[(X_1)^2 \\geq \\varepsilon] \\leq \\frac{\\sigma^2}{\\varepsilon}"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(c)</strong></p>
        <MathBlock math={"\\text{Var}[\\bar{X}_n] = \\frac{1}{n^2} \\sum \\text{Var}(X_i) = \\frac{\\sigma^2}{n} \\to 0"} display />
        <MathBlock math={"\\text{Var}[S_n] = n\\sigma^2 \\to \\infty"} display />

        <p style={{ marginTop: '0.75rem' }}><strong>(d)</strong> Using the result from (b) with <MathBlock math={"\\bar{X}_n"} /> (which has variance <MathBlock math={"\\sigma^2/n"} />) and substituting <MathBlock math={"\\sqrt{\\varepsilon} = \\bar{\\ell}"} />:</p>
        <MathBlock math={"\\mathbb{P}[|\\bar{X}_n| \\geq \\bar{\\ell}] \\leq \\frac{\\sigma^2}{n \\bar{\\ell}^2}"} display />
        <p>As <MathBlock math={"n \\to \\infty"} />, this bound goes to zero. The probability that the average deviates from the mean converges to zero — this is the <strong>Weak Law of Large Numbers</strong>.</p>
      </div>
    ),
  },

  {
    id: 'exam-2019-q4',
    topicId: 'binomial-pricing',
    type: 'exam',
    source: 'Resit 2019 Q4',
    title: 'Why Don\'t Real Probabilities Matter? [15 pts]',
    difficulty: 2,
    points: 15,
    prompt: () => (
      <div>
        <p>The payoff of a call option increases with the stock price at maturity. However, the price of the call can be calculated on a binomial tree without knowing the probabilities of the stock going up or down. Explain why this is the case.</p>
      </div>
    ),
    solution: () => (
      <div>
        <p>Two equivalent explanations (either suffices):</p>
        <ol className="sg-list">
          <li><strong>Risk-neutral pricing:</strong> The option price depends on the risk-neutral probability <MathBlock math={"q = (1+r-d)/(u-d)"} />, which is determined entirely by <MathBlock math={"u"} />, <MathBlock math={"d"} />, and <MathBlock math={"r"} /> — not the real-world probability <MathBlock math={"p"} />.</li>
          <li><strong>Replicating portfolio:</strong> The option price equals the cost of a replicating portfolio of stocks and bonds. The replication conditions must hold in <em>every</em> scenario, regardless of how likely each scenario is. Since the portfolio matches the option payoff in all states, the price is independent of state probabilities.</li>
        </ol>
      </div>
    ),
  },

  {
    id: 'exam-2020-q3',
    topicId: 'binomial-pricing',
    type: 'exam',
    source: 'Resit 2020 Q3',
    title: 'Arbitrage Detection [20 pts]',
    difficulty: 3,
    points: 20,
    prompt: () => (
      <div>
        <p>A stock <MathBlock math={"S = 100"} /> goes to 130 (up) or 90 (down). A bond <MathBlock math={"B = 100"} /> pays 100 in both states (interest rate = 0%). A call option on the stock with strike <MathBlock math={"K = 90"} /> has a market price of <MathBlock math={"\\text{€}15"} />.</p>
        <p>Show that there is an arbitrage opportunity in this market.</p>
        <p><em>Hint: find a portfolio of <MathBlock math={"\\phi"} /> stocks and <MathBlock math={"\\psi"} /> bonds that replicates the call, and compare the replicating price with the market price.</em></p>
      </div>
    ),
    solution: () => (
      <div>
        <p>Call payoffs: <MathBlock math={"\\max\\{130-90, 0\\} = 40"} /> (up), <MathBlock math={"\\max\\{90-90, 0\\} = 0"} /> (down).</p>
        <p>Replication system:</p>
        <MathBlock math={"\\phi \\times 130 + \\psi \\times 100 = 40 \\quad \\text{(up)}"} display />
        <MathBlock math={"\\phi \\times 90 + \\psi \\times 100 = 0 \\quad \\text{(down)}"} display />
        <p>Subtracting: <MathBlock math={"40\\phi = 40"} />, so <MathBlock math={"\\phi = 1"} />. Then <MathBlock math={"\\psi = -90/100 = -9/10"} />.</p>
        <p>Fair call price:</p>
        <MathBlock math={"C = \\phi \\times 100 + \\psi \\times 100 = 100 - 90 = \\textbf{10}"} display />
        <p>The market price is 15, but the fair (no-arbitrage) price is 10. <strong>Arbitrage:</strong> sell the call at 15 and buy the replicating portfolio at 10, netting an immediate profit of <MathBlock math={"\\textbf{€5}"} /> with zero risk.</p>
      </div>
    ),
  },

]
