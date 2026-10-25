# Geometry proof: a matrix is a rule for moving basis vectors

Learning question: where does a new vector land under this shear?

Keep the origin, coordinate scale, blue vector, gold right basis and green up basis. Start at the identity. Move the grid and all vectors with A(t)=[[1,t],[0,1]]. End at A=[[1,1],[0,1]]. Preserve A(t)v = v₁ A(t)e₁ + v₂ A(t)e₂ at every frame. The ghost grid/vector is the original, never rescaled. The displayed matrix is the current operation, not the final matrix during an unfinished move.

Bind `Shear` → `lands` and `Apply` → `result` to actual speech. Retain the endpoint for the remaining narration. The changed case begins with (1,2), keeping the same map; answer (3,2). The learner companion asks about (2,3), answer (5,3).

Reference read 2026-10-23: https://www.3blue1brown.com/lessons/linear-transformations/ (Matrices and basis/linear combination sections). The general teaching pattern is credited; no images, scripts, audio or animation code copied. This integer shear and drawings are authored here. It is a worked example, not a general linear-algebra proof.

Revision: change INPUT or CHANGED in the readable scene module, then update affected narration, descriptions and question answers. Regenerate only affected audio. Do not silently change the map while leaving the spoken result fixed.
