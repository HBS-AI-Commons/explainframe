export const conventional = /^(feat|fix|chore|docs|test|refactor)(\([a-z0-9][a-z0-9/-]*\))?!?: \S.*$/;
export function aiIdentity(value){
  const name=value.split('<')[0].trim();
  return /^(?:claude(?: code| (?:opus|sonnet|haiku)(?: [\d.]+)?)?|codex|chatgpt|(?:github )?copilot|gemini|gpt(?:[-\d.]+)?|openai|anthropic|ai (?:assistant|agent))$/i.test(name)||/\[bot\]/i.test(name)||/<(?:noreply@anthropic\.com|(?:\d+\+)?(?:claude|codex|chatgpt)(?:\[bot\])?@users\.noreply\.github\.com)>/i.test(value);
}
export function messageProblems(message,{allowMerge=false,subject=true}={}){
  const problems=[],lines=message.replace(/\r/g,'').split('\n'),title=lines[0]??'';
  if(subject&&!conventional.test(title)&&!(allowMerge&&title.startsWith('Merge ')))problems.push('Use type(scope): description. Types: feat, fix, chore, docs, test, refactor.');
  for(const line of lines){
    const trailer=line.match(/^\s*(?:Co-authored-by|Assisted-by|Generated-by):\s*(.+)$/i);
    if(trailer&&aiIdentity(trailer[1]))problems.push('AI/bot attribution trailers are not allowed; preserve genuine human credit and upstream license notices.');
    if(/^\s*(?:🤖\s*)?(?:Generated|Created) (?:with|by)\s+(?:\[)?(?:Claude(?: Code)?|Codex|ChatGPT|GitHub Copilot)\b/i.test(line))problems.push('Remove the generated-with-AI footer.');
  }
  return [...new Set(problems)];
}
