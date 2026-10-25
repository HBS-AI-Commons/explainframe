export function render({ctx,body,portrait,time,palette,text,card,line}){
  card(body.x,body.y,body.w,body.h);
  text('Start with 3 triangle choices.',body.x+body.w/2,body.y+22,45,{align:'center',maxWidth:body.w*.9,color:palette.muted});
  const selection=Math.floor(time/.8)%8,gap=body.w*.04,w=(body.w*.88-gap*2)/3,x0=body.x+body.w*.06,y=body.y+body.h*.22,h=body.h*.38;
  for(let i=0;i<3;i++){
    const on=Boolean(selection&(1<<i)),x=x0+i*(w+gap),cx=x+w/2;
    card(x,y,w,h,{fill:on?palette.card:palette.bg,border:on?palette.accent:palette.line});
    const r=Math.min(w*.30,h*.20),cy=y+h*.34,color=on?palette.accent:palette.line;
    line(cx,cy-r,cx-r,cy+r,color,6);line(cx-r,cy+r,cx+r,cy+r,color,6);line(cx+r,cy+r,cx,cy-r,color,6);
    text(on?'INCLUDE':'EXCLUDE',cx,y+h-64,45,{align:'center',maxWidth:w*.88,color:on?palette.accent:palette.muted,weight:700});
  }
  text('2 × 2 × 2 = 8 selections',body.x+body.w/2,body.y+body.h*.69,45,{align:'center',maxWidth:body.w*.9,color:palette.primary,weight:750});
  text('With all 20 triangles: 2²⁰',body.x+body.w/2,body.y+body.h*.85,45,{align:'center',maxWidth:body.w*.9,color:palette.accent});
}
