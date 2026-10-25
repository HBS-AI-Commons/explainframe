import {render as story} from './story.mjs';
export function render(a) {
 const {body:b,text,palette:p,scene,time,cue,ctx,line}=a;
 const topic=scene.visual.topic;
 const word=topic==='erdos-643'?'question':topic==='vietnamese-address'?'Imagine':'video';
 if(time<cue(word)) {
  scene.visual.lines.forEach((value,i)=>text(value,b.x+b.w/2,b.y+b.h*(.25+i*.3),62,{align:'center',maxWidth:b.w*.95,color:i?p.ink:p.primary}));
  return;
 }
 if(topic!=='vietnamese-address') {
  story({...a,scene:{...scene,visual:{topic,step:0,cue:word}}});
  return;
 }
 const x=f=>b.x+b.w*f,y=f=>b.y+b.h*f;
 for(const [fx,color,label] of [[.23,p.positive,'You'],[.77,p.primary,'Older friend']]) {
  ctx.fillStyle=color;ctx.beginPath();ctx.arc(x(fx),y(.13),28,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.roundRect(x(fx)-40,y(.13)+40,80,90,20);ctx.fill();
  text(label,x(fx),y(.49),56,{align:'center',maxWidth:b.w*.44,color});
 }
 line(x(.36),y(.28),x(.64),y(.28),p.accent,6);
 text('How do you address each other?',x(.5),y(.80),54,{align:'center',maxWidth:b.w*.95});
}
