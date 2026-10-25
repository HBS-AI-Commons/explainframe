// One visual vocabulary and fixed dollar scale across the lesson.
// Intermediate values are illustration, not additional observed business periods.
export const BEFORE={revenue:100,costs:60};
export const AFTER={revenue:150,costs:120};
const clamp=t=>Math.max(0,Math.min(1,t));
const smooth=t=>{t=clamp(t);return t*t*(3-2*t);};
export function stateAt(id,time,cue){
  let revenue=BEFORE.revenue,costs=BEFORE.costs,phase='Baseline',transition=false,split=1;
  if(id==='mechanism'){
    const p=smooth((time-cue('Subtract'))/(cue('contribution')-cue('Subtract')));
    split=p;phase=p<1?'Separate costs':'Baseline';
  }else if(id==='compare'){
    const p=smooth((time-cue('After'))/(cue('fifty')-cue('After')));
    revenue+=p*(AFTER.revenue-BEFORE.revenue);costs+=p*(AFTER.costs-BEFORE.costs);
    phase=p===0?'Before':p===1?'After':'Before → after';transition=p>0&&p<1;
  }else if(id==='takeaway'){revenue=AFTER.revenue;costs=AFTER.costs;phase='After';}
  return {revenue,costs,contribution:revenue-costs,phase,transition,split};
}
export function render({ctx,body,palette,text,line,scene,time,cue,audit}){
  const s=stateAt(scene.id,time,cue),x=body.x,y=body.y,w=body.w,h=body.h;
  const scale=w/AFTER.revenue,barY=y+h*.18,barH=h*.19;
  // Round only displayed figures; derive the visible remainder from those figures too.
  const revenue=Math.round(s.revenue),costs=Math.round(s.costs),left=revenue-costs;
  const costColor=palette.primary,leftColor=palette.positive;
  const amount=n=>'$'+n;
  text(s.phase,x,y,45,{weight:650,color:palette.muted,label:'phase'});
  text('Revenue '+amount(revenue),x+w,y,48,{align:'right',weight:700,label:'revenue-total'});
  // Dashed end marker preserves the old scale; no auto-scaling during growth.
  ctx.save();ctx.setLineDash([9,7]);line(x+100*scale,barY-8,x+100*scale,barY+barH+12,palette.muted,2);ctx.restore();
  ctx.fillStyle=palette.line;ctx.fillRect(x,barY,s.revenue*scale,barH);
  ctx.fillStyle=costColor;ctx.fillRect(x,barY,s.costs*scale*s.split,barH);
  if(s.split===1){ctx.fillStyle=leftColor;ctx.fillRect(x+s.costs*scale,barY,s.contribution*scale,barH);}
  if(s.split===1&&s.costs>8)text(amount(costs),x+s.costs*scale/2,barY+barH*.22,48,{align:'center',color:palette.bg,weight:700,maxWidth:Math.max(25,s.costs*scale-12),label:'cost-value'});
  if(s.split===1)text(amount(left),x+(s.costs+s.contribution/2)*scale,barY+barH*.22,48,{align:'center',color:palette.bg,weight:700,maxWidth:Math.max(25,s.contribution*scale-12),label:'contribution-value'});
  if(scene.id==='compare'&&time>=cue('twenty')){const remainder=time>=cue('thirty');ctx.strokeStyle=palette.accent;ctx.lineWidth=4;ctx.strokeRect(x+(remainder?s.costs*scale:0),barY-6,(remainder?s.contribution:s.costs)*scale,barH+12);}
  // Stable labels remain readable even when the green portion narrows.
  text('Variable costs',x,barY+barH+20,45,{color:costColor,weight:700,maxWidth:w*.48,label:'cost-label'});
  text(s.split===1?'Contribution':'Remainder',x+w,barY+barH+20,45,{align:'right',color:s.split===1?leftColor:palette.muted,weight:700,maxWidth:w*.48,label:'contribution-label'});
  const ghostY=y+h*.68;
  text('Before: $100 − $60 = $40',x,ghostY-60,45,{color:palette.muted,label:'baseline-equation'});
  ctx.save();ctx.globalAlpha=.32;ctx.fillStyle=costColor;ctx.fillRect(x,ghostY,60*scale,18);ctx.fillStyle=leftColor;ctx.fillRect(x+60*scale,ghostY,40*scale,18);ctx.restore();
  const equation=s.split===1?amount(revenue)+' − '+amount(costs)+' = '+amount(left):'Revenue = costs + remainder';
  text(equation,x+w,y+h*.77,48,{align:'right',weight:700,maxWidth:w,label:'equation'});
  let note=s.transition?'Illustrative · fixed scale':'Same period · excludes fixed costs';
  if(scene.id==='takeaway')note=time>=cue('Contribution')?'Changes: +$50 − $60 = −$10':'Revenue +$50 · costs +$60';
  text(note,x,y+h*.97,45,{color:palette.muted,maxWidth:w,label:'mechanism-note'});
  // Nonvisual geometry receipt supports invariant checks, not learner scoring.
  audit.push({kind:'mechanism',...s,costWidth:s.costs*scale,contributionWidth:s.contribution*scale,revenueWidth:s.revenue*scale,dollarsPerPixel:1/scale,outside:false});
}
