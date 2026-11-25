# DCT illustrated educator — character and editorial style guide

## Purpose
The illustrated educator is a recognizable creative representation of founder RoSeé Murphy. She adds teaching, encouragement and personality to The Dope Cloud TeacHer. She is not a chatbot, a substitute for actual instructor photographs, or documentary evidence of an event.

## Identity and visual direction
Maintain the recognizable golden locs, warm brown complexion, expressive angular glasses and smile of the approved character artwork. Vary hair styling, clothing, expressions, posture, environment and composition. Use warm editorial illustration, comics, caricature and occasional stylized portraits rather than repeating generic technology stock imagery. Preserve dignity and professional credibility. Use the official DCT logo file in final branded layouts; illustrated garment marks are artistic details and must not replace the official logo. Do not fabricate real facility photographs or partner endorsements.

## Character wardrobe and placements
| Look | Suggested placement | Purpose |
|---|---|---|
| Executive, tailored suit or blazer, locs up | Home, partnerships, corporate training, team | Leadership, trust and encouragement |
| Casual, cap and streetwear | Course hub, beginner AI, student learning | Welcoming, relatable guidance |
| Cloud architect, professional casual | Cloud Fundamentals, AZ-900, AZ-104, AZ-305 | Design, operations and practical cloud skills |
| Security professional, confident posture | Cloud Security, digital security | Account protection and least privilege |
| AI governance educator | AI Security, responsible AI, Wiki | Verification, privacy and responsible use |
| Neighborhood educator, sweater or updo | Local classes, senior learning, Cyber Basics | Patience, warmth and confidence |
| Creative instructor | Tech Talk, instructor recruitment, web-design content | Creativity and accessible explanations |
| Cyber detective | Scam awareness, digital safety, Tech Talk | Question suspicious claims and verify sources |
| Community visionary | Home and partnerships | Opportunity, access and sponsorship |

These are creative roles, not claims about additional staff or current course availability. Match character artwork to the actual course title; do not relabel existing courses to fit an illustration.

## Voice
Candid, witty, warm and professionally credible. Plain language first, correct technical vocabulary next. Encourage questions. Never shame beginners, promise certification or employment, invent affiliations or impersonate a live support agent.

## Approved-style examples
- Hold up! Did you enable MFA?
- Now, who told you the cloud was complicated? Start with one concept, then put it to work.
- Before you trust that AI answer, verify it. And keep private information out of your prompts.
- Look at you learning something new today! Try it, make a mistake, and try again.
- You belong in tech. You do not have to know everything to get started.
- Knowing technology is one skill. Making it understandable is another.
- Good technical documentation explains why, not just which button to click.
- Technology should open doors, not stand in front of them.

## Website behavior and technical implementation
The shared script is `dope-cloud-teacher/js/dct-character-tips.js`. Pages with the global UI loader receive it automatically; Local Classes and Practice Lab include it explicitly. Only allowlisted paths display tips, with a random initial message; other eligible pages show on approximately 72% of page loads. Homepage and course hub/catalog/programs always show a tip. No cookies, user tracking, timers, overlays, or surprise navigation are used by the character script. The page-flow aside includes keyboard-accessible Another tip and Hide tip controls. The image is decorative; the text and links remain meaningful without artwork. Do not show the feature on sign-in, enrollment, checkout or payment confirmation pages. Keep real facility and founder photographs intact. Student classroom tips belong after core content.

## Asset production and QA
Use individually exported, compressed WebP or PNG artwork for future releases, with enough visual margin for responsive crops. Preserve legibility of real HTML headings and official logo placement. Avoid invented certification titles, prices or provider endorsement. The current implementation reuses crops of the existing repository character art sheet; new standalone illustrations require asset upload and verification before replacing it. Confirm crop accuracy, file responses, mobile contrast, keyboard interaction, link destinations and deployment. Review factual tips whenever referenced guidance changes. Do not add new fees, tracking or dependencies solely for the character.
