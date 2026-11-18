(() => {
  'use strict';
  const API='https://energetic-endurance-production.up.railway.app/api';
  const $=id=>document.getElementById(id);
  const token=localStorage.getItem('dct_token');
  const cases=$('dct-admin-cases'), referrals=$('dct-admin-referrals'), notice=$('dct-admin-notice');
  const STATES=['New','Reviewing','Contacted','Scheduled','Proposal','On Hold','Closed'];
  const OWNER=['Founder review','Operations review','Learning support'];
  const REFERRALS=['New','Contacted','Scheduled','In Progress','Completed','Closed'];
  const node=(tag,className,text)=>{
    const n=document.createElement(tag);
    if(className)n.className=className;
    if(text!==undefined)n.textContent=text;
    return n;
  };
  const paragraph=(parent,label,value)=>{
    const p=node('p');
    const strong=node('strong','',label+': ');
    p.append(strong,document.createTextNode(value===null||value===undefined?'':String(value)));
    parent.append(p);
    return p;
  };
  const message=(m,error=false)=>{
    notice.textContent=m;notice.hidden=false;notice.classList.toggle('error',error);
  };
  const select=(options,value)=>{
    const s=node('select');
    options.forEach(v=>{const o=node('option','',v);o.value=v;s.append(o);});
    s.value=value||options[0];return s;
  };
  const field=(label,control,wide=false)=>{
    const wrapper=node('label',wide?'wide':'');
    wrapper.append(node('span','',label),control);return wrapper;
  };
  async function request(path,options={}) {
    const response=await fetch(API+path,{
      ...options,
      headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json',...(options.headers||{})},
      cache:'no-store'
    });
    const data=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(data.error||'Unable to complete request (HTTP '+response.status+').');
    return data;
  }
  function drawInquiry(record) {
    const card=node('article','case-card');
    card.append(node('h3','',record.category.toUpperCase()+' · '+record.name));
    card.append(node('p','case-meta',record.id+' · '+record.createdAt));
    paragraph(card,'Email',record.email);
    if(record.organization)paragraph(card,'Organization',record.organization);
    if(record.interest)paragraph(card,'Interest',record.interest);
    if(record.format)paragraph(card,'Preferred format',record.format);
    if(record.timing)paragraph(card,'Timing',record.timing);
    paragraph(card,'Request',record.message);
    paragraph(card,'Career coaching consent',record.careerConsent?'Yes — opt-in recorded; founder review required':'No');
    paragraph(card,'Receipt/owner alert',record.notification);
    const controls=node('div','case-controls');
    const stage=select(STATES,record.status),owner=select(OWNER,record.assignedOwner);
    const next=node('input');next.maxLength=240;next.value=record.nextAction||'';
    const due=node('input');due.type='date';due.value=record.dueDate||'';
    controls.append(field('Stage',stage),field('Review queue',owner),field('Next action',next,true),field('Due date',due));
    const save=node('button','', 'Save case update');save.type='button';
    const feedback=node('span','case-feedback','');
    save.addEventListener('click',async()=>{
      save.disabled=true;feedback.textContent='Saving…';
      try{
        await request('/admin/intake/inquiries/'+encodeURIComponent(record.id),{
          method:'PATCH',body:JSON.stringify({status:stage.value,assignedOwner:owner.value,nextAction:next.value,dueDate:due.value})
        });
        feedback.textContent='Saved';
      }catch(e){feedback.textContent='Could not save: '+e.message;}
      finally{save.disabled=false;}
    });
    card.append(controls,save,feedback);
    return card;
  }
  function drawReferral(record) {
    const card=node('article','case-card referral-card');
    card.append(node('h3','',record.name));
    card.append(node('p','case-meta','Consent recorded · '+record.consentedAt));
    paragraph(card,'Contact',record.email);
    paragraph(card,'Interest',record.interest);
    paragraph(card,'Inquiry reference',record.inquiryReference);
    const stage=select(REFERRALS,record.status),save=node('button','','Update referral');
    const feedback=node('span','case-feedback','');
    const controls=node('div','case-controls');controls.append(field('Restricted referral stage',stage));
    save.addEventListener('click',async()=>{
      save.disabled=true;feedback.textContent='Saving…';
      try{
        await request('/admin/intake/referrals/'+encodeURIComponent(record.id),{
          method:'PATCH',body:JSON.stringify({status:stage.value})
        });
        feedback.textContent='Saved. No email or record was automatically sent to Norine.';
      }catch(e){feedback.textContent=e.message;}
      finally{save.disabled=false;}
    });
    card.append(controls,save,feedback);
    return card;
  }
  async function load(){
    if(!token){
      message('Sign in with a founder-approved admin account to review DCT inquiries.',true);
      $('dct-admin-signin').hidden=false;return;
    }
    $('dct-admin-refresh').disabled=true;
    try {
      const me=await request('/auth/me');
      if(me.user?.role!=='admin')throw new Error('This account is not an authorized DCT administrator.');
      const query=new URLSearchParams({limit:'100'});
      if($('dct-filter-category').value)query.set('category',$('dct-filter-category').value);
      if($('dct-filter-status').value)query.set('status',$('dct-filter-status').value);
      const [inbox,coaching]=await Promise.all([
        request('/admin/intake/inquiries?'+query),
        request('/admin/intake/referrals')
      ]);
      cases.replaceChildren();
      if(!inbox.inquiries.length)cases.append(node('p','muted','No inquiries match these filters yet.'));
      inbox.inquiries.forEach(row=>cases.append(drawInquiry(row)));
      referrals.replaceChildren();
      if(!coaching.referrals.length)referrals.append(node('p','muted','No students have opted in yet.'));
      coaching.referrals.forEach(row=>referrals.append(drawReferral(row)));
      message(inbox.inquiries.length+' inquiry records loaded. Data remains accessible only to DCT administrators.');
    }catch(e){
      cases.replaceChildren();
      referrals.replaceChildren();
      message(e.message||'Could not load this private dashboard.',true);
      $('dct-admin-signin').hidden=false;
    }finally{$('dct-admin-refresh').disabled=false;}
  }
  $('dct-admin-refresh').addEventListener('click',load);
  $('dct-filter-category').addEventListener('change',load);
  $('dct-filter-status').addEventListener('change',load);
  void load();
})();