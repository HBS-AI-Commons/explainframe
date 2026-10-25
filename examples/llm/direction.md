# Scene direction

Persistent identities and colors remain stable. Reveals follow measured narration cues. Each render is a pure function of time, including backward seeking.

## 1. Text becomes tokens
A prompt is split into illustrative token boxes, then represented by numeric vectors.
Cue: tokens.
Narration: A language model receives your prompt as tokens: pieces of text that can be words, parts of words, or punctuation. Each token becomes a list of numbers. Those numbers are the input to the model.

## 2. Context changes the representation
Connections from earlier tokens converge on the last position. Attention and other layers feed the prediction.
Cue: attention.
Narration: Inside the model, attention combines information from earlier tokens. Other layers transform the result. In the sentence, the cat sat on the, the model uses the preceding context to help predict what might come next.

## 3. Possible next tokens
Illustrative bars show mat 40%, floor 30%, and other 30%, summing to 100%.
Cue: probability.
Narration: The output is a probability distribution over possible next tokens. These numbers are a teaching example. Mat has forty percent, floor has thirty, and all other possibilities share the rest. A generation rule selects one token.

## 4. Append it. Repeat.
The mat token joins the input row; an arrow loops the extended sequence back into the model.
Cue: Suppose.
Narration: Suppose the selected token is mat. It joins the sequence. The model now predicts another token using the extended context. Repeating this process produces a sentence, a paragraph, or a much longer reply.

## 5. Training and answering differ
Training shows changing parameter blocks. Generation shows fixed blocks with growing context.
Cue: Training.
Narration: Training adjusts the model parameters using examples. During ordinary generation, those learned parameters stay fixed while the context grows. A convincing continuation can still be wrong. Web search and other tools add separate steps around this process.
## Opening title and introduction
The title names the topic first. The first diagram appears during the introduction, on the measured word video. The topic title stays visible. The reveal establishes the objects before the worked example.
Narration: What happens after you send a message to a language model? In this video, we’ll follow a short prompt through the model, see how it chooses the next piece of text, and watch that process repeat.

## Playback speed
The supplied speech runs at 1.3 times its previous speed using FFmpeg atempo, which preserves pitch. Word times, scene holds and reveal durations are scaled by 1/1.3. The source word timings came from the speech model; time scaling is not a new acoustic alignment.
