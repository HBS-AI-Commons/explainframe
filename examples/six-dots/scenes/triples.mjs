export function render({ctx,body,portrait,time,palette,text,card,line}){
  card(body.x,body.y,body.w,portrait?Math.max(body.h,body.h*.59+332):body.h);
  const triples=[];for(let a=0;a<6;a++)for(let b=a+1;b<6;b++)for(let c=b+1;c<6;c++)triples.push([a,b,c]);
  const chosen=triples[Math.floor(time/1.2)%triples.length];
  const cx=body.x+body.w*(portrait?.5:.25),cy=body.y+body.h*(portrait?.29:.47),r=Math.min(body.w*(portrait?.29:.17),portrait?Math.min(body.h*.16,body.h*.29-106):body.h*.25);
  const points=Array.from({length:6},(_,i)=>[cx+Math.sin(i*Math.PI/3)*r,cy-Math.cos(i*Math.PI/3)*r]);
  for(let j=0;j<3;j++)line(...points[chosen[j]],...points[chosen[(j+1)%3]],palette.accent,7);
  points.forEach(([x,y],i)=>{ctx.beginPath();ctx.arc(x,y,12,0,Math.PI*2);ctx.fillStyle=chosen.includes(i)?palette.accent:palette.primary;ctx.fill();const dx=Math.sin(i*Math.PI/3),dy=-Math.cos(i*Math.PI/3);text(String(i+1),x+dx*26,y+dy*26-(dy<-.25?51.75:dy>.25?0:25.875),45,{align:dx>.25?'left':dx<-.25?'right':'center',maxWidth:55,color:palette.muted});});
  const x=portrait?body.x+body.w/2:body.x+body.w*.73,y=body.y+body.h*(portrait?.59:.12),w=body.w*(portrait?.88:.44);
  text('6 × 5 × 4 = 120',x,y,45,{align:'center',maxWidth:w,color:palette.primary,weight:700});
  text('6 orders per triple',x,y+(70),45,{align:'center',maxWidth:w,color:palette.muted});
  const [a,b,c]=chosen.map(n=>n+1);text(`${a}${b}${c} · ${a}${c}${b} · ${b}${a}${c}\n${b}${c}${a} · ${c}${a}${b} · ${c}${b}${a}`,x,y+(135),45,{align:'center',maxWidth:w,color:palette.muted});
  text('120 ÷ 6 = 20 triples',x,y+(260),45,{align:'center',maxWidth:w,color:palette.accent,weight:750});
}
