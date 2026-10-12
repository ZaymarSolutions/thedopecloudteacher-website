(function () {
  'use strict';
  const words = [
    ['Phishing','A message that tries to trick you into sharing information or opening something unsafe.','Like somebody wearing a fake uniform to get through your front door.','A text says your account closes in 10 minutes. What is your next move?',['Tap its link immediately','Open the official app yourself','Reply with your password'],1,'Pressure is a cue to pause. Check through the official app or a number you already trust.'],
    ['Multi-factor authentication','Signing in with more than one kind of proof that it is you.','A key plus a second check at the door.','Someone asks you to read them your sign-in code. What do you do?',['Keep the code to yourself','Share it if they sound professional','Post it so a friend can help'],0,'A sign-in code belongs to you. Someone asking for it may be trying to enter your account.'],
    ['Cloud','Computing services you use over a network instead of running everything on your own device.','Renting useful digital space and tools instead of building the whole workshop.','Your phone breaks. What helps you recover your photos?',['A photo of the phone','A cloud backup you can access','A brighter screen'],1,'A backup can help you recover files. Know your account details and check that the backup actually completed.'],
    ['Prompt','The instruction or question you give an AI tool.','Give directions like you want the driver to reach the right address.','Which instruction gives AI clearer direction?',['Do something good','Help','Explain cloud storage to a beginner in three short steps'],2,'Clear purpose, audience and format help the tool respond more usefully. Review the answer before using it.'],
    ['Passkey','A sign-in method using cryptographic keys, often unlocked with your device PIN, fingerprint or face.','Your device helps prove it is you without a password you have to type into the site.','Where should you set up a passkey?',['Through an unexpected text link','In the official service account settings','In a stranger’s shared document'],1,'Use the official service and learn its recovery options before changing how you sign in.'],
    ['Backup','An extra copy of information you can recover if the original is lost.','A spare key is useful only if you know where it is and it fits.','How do you know a backup can help?',['Check that you can restore a sample file','Assume the button did its job','Never look at it again'],0,'Check your backup and practice recovery with a non-sensitive file.'],
    ['Privacy','Having choices about who can see and use information about you.','You choose who gets invited into your personal business.','An app wants contacts it does not need. What can you do?',['Allow everything','Review and limit its permissions','Give it your bank PIN instead'],1,'Permissions are choices. Give an app the access it needs for the function you want.'],
    ['AI hallucination','An AI answer that sounds confident but contains invented or incorrect information.','A confident voice is not the same thing as a correct answer.','AI gives you a surprising fact. What next?',['Check a reliable original source','Trust its confidence','Share without reading'],0,'Verify important claims. AI can help you start, but it can also get things wrong.'],
    ['Software update','A newer version that can fix problems, add features or repair security weaknesses.','Maintenance for the tools you rely on.','Where is the safer place to find an update?',['A pop-up claiming you won a prize','Your device settings or official app store','An unknown attachment'],1,'Use official update settings and stores. Back up important information first.'],
    ['Encryption','Turning readable information into coded information that needs a key to read.','Putting the contents in a locked box rather than leaving them on the porch.','Does encryption mean every message is trustworthy?',['Yes, always','No—an encrypted message can still be a scam','Only if it has emojis'],1,'Encryption protects information in certain situations. You still need to check who is contacting you and what they ask.'],
    ['Digital footprint','The trail of information your online activities leave behind.','Your posts and clicks can leave tracks even after you move on.','Before sharing a photo of a document, what should you check?',['Only the lighting','Whether private details are visible','Whether it will get likes'],1,'Check names, addresses, account numbers and other private details before sharing.'],
    ['Access control','Rules about who can view, change or use a resource.','Everybody visiting the house does not need a key to every room.','A teammate only needs to read a file. What access fits?',['Full administrator access','View-only access','Your personal password'],1,'Give people the access their task needs, and review access when that task ends.'],
    ['Generative AI','AI that produces content such as text, images or audio from learned patterns.','A draft helper, with you still responsible for checking the work.','Which is a useful first task for AI?',['Draft an outline using non-sensitive information','Upload everybody’s private records','Let it make every decision'],0,'Start with a bounded task and review the result. Keep sensitive information out of tools you have not approved.'],
    ['Zero Trust','A security approach that checks access rather than automatically trusting a person or device because of where it is.','Knowing somebody’s name does not mean you hand them every key.','A request comes from inside your organization. Should access still be checked?',['Yes','No','Only on Mondays'],0,'Verify the request and give only the access needed. Familiarity alone is not enough.']
  ];
  const host = document.querySelector('#daily-tech-word');
  if (!host) return;
  const dateParts = new Intl.DateTimeFormat('en-US', {timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const pick = type => Number(dateParts.find(part => part.type === type).value);
  const parts = [pick('year'), pick('month'), pick('day')];
  const index = Math.floor(Date.UTC(parts[0],parts[1]-1,parts[2])/86400000) % words.length;
  const item = words[index];
  host.querySelector('[data-term]').textContent = item[0];
  host.querySelector('[data-definition]').textContent = item[1];
  host.querySelector('[data-example]').textContent = item[2];
  host.querySelector('[data-question]').textContent = item[3];
  const feedback = host.querySelector('[data-feedback]');
  const answers = host.querySelector('[data-answers]');
  item[4].forEach((answer,i) => {
    const button = document.createElement('button'); button.type='button';button.textContent=answer;
    button.addEventListener('click', () => {
      feedback.textContent = (i===item[5] ? 'That’s the move! ' : 'Good question. Here’s the safer move: ') + item[6];
      [...answers.children].forEach(b=>b.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');
    }); answers.appendChild(button);
  });
  host.querySelector('[data-share]').addEventListener('click',async () => {
    const text='Today’s DCT tech word: '+item[0]+' — '+item[1];
    try {
      if(navigator.share) await navigator.share({title:'Learn a tech word with DCT',text,url:'https://thedopecloudteacher.org/#daily-tech-word'});
      else if(navigator.clipboard) {await navigator.clipboard.writeText(text+' https://thedopecloudteacher.org/#daily-tech-word');feedback.textContent='Copied. Share a little knowledge with somebody.';}
      else feedback.textContent='Share this link: thedopecloudteacher.org/#daily-tech-word';
    } catch(error) {if(error.name!=='AbortError')feedback.textContent='Share this link: thedopecloudteacher.org/#daily-tech-word';}
  });
})();
