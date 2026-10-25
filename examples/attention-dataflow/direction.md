# Attention proof: matching weights a blend

Learning question: how does a changed query alter the information returned?

Keep two position lanes, their keys and values, fixed color identity, common weight scale and one output. q=(2,0), K=[[1,0],[0,1]], V=[[2,0],[0,4]]. Compute scores=Kq/√2; stable softmax; output=Σwᵢvᵢ. Move through matching, normalization and weighted addition, then change only q to (0,2). Every intermediate query is recomputed through the whole operation. Never linearly interpolate output weights independently of scores.

Cue intervals: Compare→Scale reveals scores; Softmax→positive reveals weights; Multiply→add moves contributions into the sum; Switch→Recompute changes the query. Early weight bars are a reveal, not intermediate normalized distributions. Each final weight is positive and the pair sums to one. Output stays in the convex hull of values. Two-decimal display is approximate; retain full precision for computation. Dimension contract: q has 2 components, K is 2×2, V is 2×2, output has 2 components.

Reference read 2026-10-23: https://arxiv.org/html/1706.03762v7, section 3.2.1 equation (1). General formula from Vaswani et al.; numbers and artwork are original. No copied paper figures. This single unmasked head omits learned projections, training, residuals, multihead combination and token prediction. Attention weights alone do not establish causal importance or model understanding.

Changed question: q=(0,0) gives equal weights, output (1,2). Revision: edit QUERY, CHANGED, KEYS or VALUES in the readable module, and update narration/descriptions/questions where affected. Keep keys/values fixed when claiming only the query changes. Do not change hidden tensor sizes while retaining hardcoded dimension labels; extend and test layout or choose a specialist renderer.
