# KV cache: original one-layer proof

Learning question: which state survives an append, and which must be recomputed?

Fixed inputs already include position information. WQ, WK and WV are nonidentity 2×2 matrices in scenes/model.mjs. Four vectors are synthetic, not token meanings. Each append computes one new key and value, retains old pairs and recomputes attention. The query at position three is separately tested against a four-position cache with the future excluded before softmax.

The new pair moves into its stable slot. A scan indicates reuse; it is not a hardware trace. Weight bars share a common scale. Counts refer to vector projection operations and stored scalar values, never runtime speedup or real memory bytes.

Changing the first input invalidates its pair. One-layer rebuilding matches a fresh calculation; do not generalize one-entry repair to a multilayer transformer. A real prefix edit can change later hidden states and requires suffix invalidation across layers. Model, position settings and context must match for cache reuse.

Prediction scene conceals the answer through a 3.2-second post-speech hold. Caching is useful only after the reader understands the attention prerequisite.
