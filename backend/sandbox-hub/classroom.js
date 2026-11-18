(async()=>{
 const $=x=>document.getElementById(x),say=x=>$('message').textContent=x;
 const q=new URLSearchParams(location.search),slug=q.get('course'),session=q.get('session_id'),token=sessionStorage.getItem('dct_sandbox_token');
 if(!token){say('Sign in again on the sandbox enrollment page, then return to this URL.');return;}
 if(slug!=='cloud-fundamentals-101'){say('Unexpected course.');return;}
 const api=location.origin+'/api';
 const call=async(path,body)=>{
  const res=await fetch(api+path,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+token,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,cache:'no-store'});
  const d=await res.json().catch(()=>({}));
  if(!res.ok)throw Error(d.error||'HTTP '+res.status);return d;};
 try{
  if(session){
   say('Verifying your test Stripe payment…');
   const d=await call('/hub/confirm-checkout',{sessionId:session,courseId:slug});
   if(d.confirmed!==true || d.source!=='paid' || d.amountPaid!==25)throw Error('Sandbox payment verification failed.');
  }
  say('Payment confirmed or checking existing enrollment. Loading lesson content…');
  const d=await call('/hub/courses/'+slug+'/content');
  if(typeof d.html!=='string' || !d.html.includes('Sandbox'))throw Error('Classroom content was not available.');
  say('PASS: $25 sandbox payment confirmed and protected classroom content unlocked. No production transaction occurred.');
  const doc=new DOMParser().parseFromString(d.html,'text/html');
  const article=doc.querySelector('article');
  if(article)$('content').textContent=article.textContent;
 }catch(e){say('Test did not finish: '+e.message+' — No live payment was charged.');}
})();
