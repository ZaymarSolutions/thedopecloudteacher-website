/* DCT illustrated educator: optional, in-flow, page-aware guidance. */
(function () {
  'use strict';
  if (window.__dctCharacterLoaded) return;
  window.__dctCharacterLoaded = true;
  const art = '/images/characters/dct-character-course-art.png';
  // Character-only crops of the existing approved 3x3 artwork.
  const looks = {
    executive: '282 8 220 320',
    casual: '797 8 222 320',
    security: '1305 8 220 320',
    governance: '280 351 220 320',
    community: '723 351 295 320',
    creative: '1304 351 220 320',
    cloud: '280 686 220 320',
    detective: '790 686 225 320',
    visionary: '1300 686 225 320'
  };
  // Content is a curated library, not individualized tracking or a chatbot.
  const tips = {
    welcome: [['executive','You belong in tech. You do not have to know everything to get started.','Find your starting point','/hub/index.html'],['casual','Now, who told you the cloud was complicated? Start with one concept, then put it to work.','Explore a free lesson','/hub/index.html'],['visionary','Technology should open doors, not stand in front of them.','Explore community programs','/partners.html']],
    courses: [['casual','Pick one skill. Practice it. Then come back for the next one.','Browse the courses','/hub/index.html#courses'],['cloud','Cloud computing is renting computing resources when you need them. Start with the basics.','Preview Cloud 101','/hub/courses/cloud-fundamentals-101.html'],['executive','A certificate is a milestone. Being able to explain what you learned is a skill.','Try a practice activity','/practice-lab.html']],
    cloud: [['cloud','Before you build, ask what problem you are solving and what it will cost.','Explore the Practice Lab','/practice-lab.html'],['executive','Assess. Design. Secure. Deploy. Validate. Good architecture starts with good questions.','Explore cloud learning','/hub/index.html']],
    ai: [['casual','Give AI a goal, useful context and a clear format. Then check the answer.','Practice with DCT','/practice-lab.html'],['governance','Before you trust that AI answer, verify it. And keep private information out of your prompts.','Read the AI security preview','/hub/courses/ai-security-responsible-governance.html']],
    security: [['security','Hold up! Did you enable MFA? A password alone is not enough for many accounts.','Explore security learning','/hub/courses/cloud-security.html'],['detective','A familiar logo is not proof a message is real. Open the official site yourself.','Learn about digital safety','/hub/courses/cyber-basics-stay-safer-online.html'],['governance','Give people and systems only the permissions they need. Review those permissions regularly.','Explore cloud security','/hub/courses/cloud-security.html']],
    community: [['community','There is no such thing as a silly technology question. Ask it!','Explore local learning','/local-classes.html'],['detective','Someone demanding an immediate payment? Stop and verify through a trusted number.','Explore online safety','/hub/courses/cyber-basics-stay-safer-online.html']],
    partners: [['executive','Start with the people you serve. We can shape the learning around their needs.','Explore partnership options','/partners.html'],['visionary','One funded classroom can open a door for someone who did not know where to begin.','Explore sponsorship','/partners.html#sponsorship']],
    teach: [['executive','Knowing technology is one skill. Making it understandable is another.','Explore instructor opportunities','/instructor-apply.html'],['creative','A good teacher helps learners practice, ask questions and try again.','Explore teaching opportunities','/instructor-apply.html']],
    lab: [['casual','Look at you learning something new today! Try it, make a mistake, and try again.','Explore more courses','/hub/index.html'],['cloud','Test in a safe environment. Check costs before creating cloud resources and clean up when done.','Explore Cloud 101','/hub/courses/cloud-fundamentals-101.html']],
    editorial: [['detective','Now, who told you that? Check the source before you share the story.','Explore Tech Talk','/blog.html'],['governance','Good technical documentation explains why, not just which button to click.','Explore the Wiki','/wiki.html'],['creative','A useful skill is one you can explain, practice and share.','Find a course','/hub/index.html']]
  };
  function context(path) {
    if (path === '/' || path === '/index.html') return 'welcome';
    if (['/courses.html','/hub/','/hub/index.html','/programs.html'].includes(path)) return 'courses';
    if (path === '/hub/classroom.html') return 'lab';
    if (path === '/practice-lab.html') return 'lab';
    if (['/partners.html','/corporate-training.html','/team.html'].includes(path)) return 'partners';
    if (path === '/local-classes.html') return 'community';
    if (path === '/instructor-apply.html') return 'teach';
    if (['/blog.html','/wiki.html','/learn-in-pictures.html'].includes(path)) return 'editorial';
    if (path.startsWith('/hub/courses/')) {
      const name=path.split('/').pop();
      if (/cyber-basics|senior/.test(name)) return 'community';
      if (/security|scam/.test(name)) return 'security';
      if (/ai-901|ai-fundamentals/.test(name)) return 'ai';
      if (/cloud-fundamentals|az-900|az-104|az-305/.test(name)) return 'cloud';
    }
    return null;
  }
  function start() {
    const path=location.pathname.toLowerCase(), group=context(path), main=document.querySelector('main');
    if (!group || !main || document.querySelector('[data-dct-character-tip]')) return;
    // Show on landing and course hub; occasionally elsewhere. No storage or timer.
    if (group !== 'welcome' && group !== 'courses' && Math.random() > 0.72) return;
    const list=tips[group]; let index=Math.floor(Math.random()*list.length);
    const css=document.createElement('style');
    css.textContent='.dct-character-tip{box-sizing:border-box;display:grid;grid-template-columns:minmax(96px,160px) minmax(0,1fr);align-items:center;gap:clamp(12px,3vw,24px);max-width:940px;width:calc(100% - 24px);margin:32px auto!important;padding:16px!important;background:#f1f7ff!important;border:1px solid #bfd6ed!important;border-radius:18px;color:#102743!important;box-shadow:0 8px 24px #1027430c;font-family:inherit}.dct-character-tip svg{display:block;width:100%;height:146px;border-radius:12px;overflow:hidden;background:#dbeafe}.dct-character-tip p{color:#183652!important;margin:4px 0 10px!important;line-height:1.5;font-size:1rem}.dct-character-tip .dct-tip-label{font-size:.75rem;font-weight:800;letter-spacing:.08em;color:#165b91!important;text-transform:uppercase}.dct-character-tip .dct-tip-actions{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px}.dct-character-tip a,.dct-character-tip button{color:#12487e!important;text-decoration:underline;font:inherit;font-weight:700;background:transparent!important;border:0!important;box-shadow:none!important;cursor:pointer;min-height:44px;padding:8px 0!important}.dct-character-tip a:focus-visible,.dct-character-tip button:focus-visible{outline:3px solid #1267cf;outline-offset:3px}.dct-character-tip .dct-tip-copy{min-width:0}@media(max-width:480px){.dct-character-tip{grid-template-columns:86px minmax(0,1fr);padding:12px!important;gap:12px}.dct-character-tip svg{height:112px}.dct-character-tip .dct-tip-actions{gap:0 12px}}';
    document.head.appendChild(css);
    const box=document.createElement('aside');box.className='dct-character-tip';box.dataset.dctCharacterTip='';box.setAttribute('aria-label','A tip from the illustrated DCT educator');
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.setAttribute('preserveAspectRatio','xMidYMid slice');
    const img=document.createElementNS('http://www.w3.org/2000/svg','image');img.setAttribute('href',art);img.setAttribute('width','1536');img.setAttribute('height','1024');svg.appendChild(img);
    const copy=document.createElement('div');copy.className='dct-tip-copy';
    const label=document.createElement('p');label.className='dct-tip-label';label.textContent='A little DCT wisdom';
    const quote=document.createElement('p');quote.setAttribute('aria-live','polite');
    const actions=document.createElement('div');actions.className='dct-tip-actions';
    const link=document.createElement('a'), next=document.createElement('button'), dismiss=document.createElement('button');
    next.type='button';next.textContent='Another tip';dismiss.type='button';dismiss.textContent='Hide tip';
    actions.append(link,next,dismiss);copy.append(label,quote,actions);box.append(svg,copy);
    function render(){const [look,message,cta,url]=list[index];svg.setAttribute('viewBox',looks[look]);quote.textContent=message;link.textContent=cta;link.href=url;}
    next.addEventListener('click',()=>{index=(index+1)%list.length;render();});
    dismiss.addEventListener('click',()=>{box.hidden=true;box.style.display='none';});
    render();main.appendChild(box);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
