# What happens between your prompt and the next token?

## From prompt to next token

What happens after you send a message to a language model? In this video, we’ll follow a short prompt through the model, see how it chooses the next piece of text, and watch that process repeat.

**Visual description:** The title first introduces the topic. During the spoken introduction, the words The cat sat appear as tokens, with illustrative numeric representations.

## Text becomes tokens

A language model receives your prompt as tokens: pieces of text that can be words, parts of words, or punctuation. Each token becomes a list of numbers. Those numbers are the input to the model.

**Visual description:** A prompt is split into illustrative token boxes, then represented by numeric vectors.

## Context changes the representation

Inside the model, attention combines information from earlier tokens. Other layers transform the result. In the sentence, the cat sat on the, the model uses the preceding context to help predict what might come next.

**Visual description:** Connections from earlier tokens converge on the last position. Attention and other layers feed the prediction.

## Possible next tokens

The output is a probability distribution over possible next tokens. These numbers are a teaching example. Mat has forty percent, floor has thirty, and all other possibilities share the rest. A generation rule selects one token.

**Visual description:** Illustrative bars show mat 40%, floor 30%, and other 30%, summing to 100%.

## Append it. Repeat.

Suppose the selected token is mat. It joins the sequence. The model now predicts another token using the extended context. Repeating this process produces a sentence, a paragraph, or a much longer reply.

**Visual description:** The mat token joins the input row; an arrow loops the extended sequence back into the model.

## Training and answering differ

Training adjusts the model parameters using examples. During ordinary generation, those learned parameters stay fixed while the context grows. A convincing continuation can still be wrong. Web search and other tools add separate steps around this process.

**Visual description:** Training shows changing parameter blocks. Generation shows fixed blocks with growing context.
