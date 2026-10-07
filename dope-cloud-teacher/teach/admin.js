(async()=>{
 const api='https://energetic-endurance-production.up.railway.app/api';const status=document.getElementById('admin-status');const token=localStorage.getItem('dct_token');
 if(!token){status.textContent='Sign in with an existing administrator account. Private content and readiness records are not available without administrator authorization.';return;}
 const headers={'Content-Type':'application/json',Authorization:`Bearer ${token}`};
 try{const r=await fetch(`${api}/admin/instructors/readiness`,{headers,cache:'no-store'});if(!r.ok){status.textContent=r.status===403?'This account is not authorized for administrator access.':'Administrator service unavailable. Please contact DCT support.';return;}
 const data=await r.json();status.textContent='Administrator access verified.';document.getElementById('admin-tools').hidden=false;
 const queue=document.getElementById('review-queue');
 if(!data.records.length)queue.textContent='No preparation checklists have been submitted yet.';
 for(const record of data.records){const card=document.createElement('section');card.className='prep-block';const title=document.createElement('h3');title.textContent=record.name;const description=document.createElement('p');description.textContent=`${record.email} · ${record.status}`;card.append(title,description);
 if(record.status==='pending_review'){
 const checks=[['practiceReviewed','I reviewed the practice lesson and required revisions.'],['documentsReviewed','I reviewed the appropriate documents through our private personnel process.'],['agreementConfirmed','The written work agreement is confirmed.']];const inputs={};
 for(const [id,text] of checks){const label=document.createElement('label');label.className='prep-check';const cb=document.createElement('input');cb.type='checkbox';inputs[id]=cb;label.append(cb,document.createTextNode(text));card.append(label);}
 const approve=document.createElement('button');approve.type='button';approve.textContent='Record reviewer approval';const result=document.createElement('p');result.setAttribute('role','status');
 approve.onclick=async()=>{if(!Object.values(inputs).every(c=>c.checked)){result.textContent='Complete the three reviews before recording an approval.';return;}approve.disabled=true;try{const r=await fetch(`${api}/admin/instructors/${encodeURIComponent(record.user_id)}/approve`,{method:'POST',headers,body:JSON.stringify({practiceReviewed:true,documentsReviewed:true,agreementConfirmed:true})});if(!r.ok)throw new Error();result.textContent='Reviewer approval recorded. Confirm the teaching assignment and schedule separately.';}catch(_){result.textContent='Approval was not recorded. Please try again.';approve.disabled=false;}};card.append(approve,result);}
 queue.append(card);}
 document.getElementById('import-courses').onclick=async()=>{
 const output=document.getElementById('import-result');const file=document.getElementById('course-import').files[0];if(!file){output.textContent='Select the extracted private course JSON file first.';return;}
 if(file.size>4000000){output.textContent='This file is too large for the course bundle.';return;}
 const button=document.getElementById('import-courses');button.disabled=true;
 try{const courses=JSON.parse(await file.text());if(!Array.isArray(courses)||courses.length!==9||new Set(courses.map(c=>c.slug)).size!==9)throw new Error();let count=0;for(const course of courses){output.textContent=`Importing course ${count+1} of 9…`;const r=await fetch(`${api}/admin/hub/import`,{method:'POST',headers,body:JSON.stringify(course)});if(!r.ok)throw new Error();count++;}output.textContent='All nine courses were imported into private storage. Checkout remains closed until delivery and payment verification are confirmed.';}
 catch(_){output.textContent='Import did not finish. Some earlier courses may have been saved; repeating the validated import updates them safely.';}finally{button.disabled=false;}
 };
 }catch(_){status.textContent='Administrator service could not be reached. No private files or records were loaded.';}
})();
