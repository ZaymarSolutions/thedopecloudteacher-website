"""Build the DCT Course Hub: hub page, course pages, quiz JSON, and packaged site.

Usage: python3 build/build.py <out_dir>
"""
import glob, html, json, os, re, shutil, sys
import markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else os.path.join(ROOT, "dist", "dct-course-hub")
VERIFIED = "October 6, 2026"
CONTACT = "thedopecloudteacher@gmail.com"
SITE = "https://thedopecloudteacher.org"

# ------------------------------------------------------------------ parse content
def parse_front(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    meta = {}
    for line in m.group(1).splitlines():
        k, v = line.split(":", 1)
        meta[k.strip()] = v.strip().strip('"')
    return meta, text[m.end():]

QUIZ_RE = re.compile(r"```quiz\n(.*?)```", re.S)

def parse_quiz(block):
    qs, cur = [], None
    for raw in block.strip().splitlines():
        line = raw.rstrip()
        if line.startswith("Q: "):
            cur = {"q": line[3:], "options": [], "answer": None, "explain": ""}
            qs.append(cur)
        elif line.startswith("- [x] ") or line.startswith("- [ ] "):
            if line.startswith("- [x] "):
                cur["answer"] = len(cur["options"])
            cur["options"].append(line[6:])
        elif line.startswith("E: "):
            cur["explain"] = line[3:]
    for q in qs:
        assert q["answer"] is not None, f"No answer marked: {q['q']}"
        assert len(q["options"]) >= 2, q["q"]
    return qs

def load_courses():
    courses = []
    for path in sorted(glob.glob(os.path.join(ROOT, "content", "*.md"))):
        text = open(path, encoding="utf-8").read()
        meta, body = parse_front(text)
        quizzes = []
        def sub(m):
            qs = parse_quiz(m.group(1))
            idx = len(quizzes)
            quizzes.append(qs)
            return f'\n\n<div class="quiz" data-quiz="{idx}"></div>\n\n'
        body2 = QUIZ_RE.sub(sub, body)
        meta.update(source=os.path.basename(path), body=body2, quizzes=quizzes,
                    qcount=sum(len(q) for q in quizzes))
        courses.append(meta)
    return courses

COURSES = load_courses()
BY_SLUG = {c["slug"]: c for c in COURSES}

# ------------------------------------------------------------------ shared design
THEME_PATH = os.path.join(ROOT, "build", "dct-theme.css")
THEME_CSS = open(THEME_PATH, encoding="utf-8").read()
INLINE_THEME = "--inline-theme" in sys.argv
PROG_KEY = {"Cloud Fundamentals": "cloud", "Cloud Security": "security", "Cloud Architecture": "arch",
            "AI Fundamentals": "ai", "AI Security": "aisec"}
for _c in COURSES: _c["color"] = f"var(--prog-{PROG_KEY[_c['program']]})"

CSS = r"""
/* Layout concept: a community classroom wall — one bold display face for wayfinding, a hyperlegible body face for every age, program colors as trail markers. */
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.6}
a{color:var(--blue)} a:focus-visible,button:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid var(--focus);outline-offset:2px;border-radius:6px}
img{max-width:100%;height:auto}
.wrap{max-width:1180px;margin:0 auto;padding-inline:16px}
h1,h2,h3{text-wrap:balance;line-height:1.2}
.display{font-family:var(--display);letter-spacing:-.01em}
.eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--muted)}
.topbar{position:sticky;top:env(safe-area-inset-top,0px);z-index:20;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.topbar .wrap{display:flex;align-items:center;gap:16px;padding-block:10px;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink);font-weight:700}
.brand svg{flex:none}
.brand small{display:block;font-weight:400;color:var(--muted);font-size:12px;line-height:1}
.nav{margin-left:auto;display:flex;gap:4px;flex-wrap:wrap}
.nav a{padding:6px 12px;border-radius:var(--radius-pill);text-decoration:none;color:var(--ink);font-size:15px}
.nav a:hover{background:var(--surface-2)}
.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:var(--radius-pill);border:2px solid var(--ink);background:var(--ink);color:var(--bg);font:700 15px var(--body);text-decoration:none;cursor:pointer}
.btn.ghost{background:transparent;color:var(--ink)}
.chip{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:var(--radius-pill);font-size:13px;font-weight:700;background:var(--surface-2);color:var(--ink);border:1px solid var(--line)}
table{border-collapse:collapse;width:100%;font-size:15px}
th,td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-size:13px;letter-spacing:.04em;color:var(--muted);background:var(--surface-2)}
.tablewrap{overflow-x:auto;border:1px solid var(--line);border-radius:12px;margin:18px 0;background:var(--surface)}
.tablewrap table{margin:0}
.tablewrap tr:last-child td{border-bottom:none}
code{font-family:var(--mono);font-size:.88em;background:var(--surface-2);padding:2px 6px;border-radius:6px}
pre{position:relative;background:var(--code-bg);color:var(--code-fg);padding:18px;border-radius:12px;overflow-x:auto;font-size:14px;line-height:1.55}
pre code{background:none;padding:0;color:inherit;font-size:inherit}
.copy{position:absolute;top:8px;right:8px;font:600 12px var(--body);background:#26325a;color:#fff;border:0;border-radius:8px;padding:4px 10px;cursor:pointer}
footer{border-top:1px solid var(--line);margin-top:64px;padding-block:32px;color:var(--muted);font-size:15px}
footer .wrap{display:flex;gap:24px;flex-wrap:wrap;justify-content:space-between}
.sel{user-select:all;font-weight:700;color:var(--ink)}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
"""

HUB_CSS = r"""
.hero{padding-block:56px 32px}
.hero h1{font-family:var(--display);font-size:clamp(34px,6vw,64px);margin:12px 0 16px;font-weight:var(--display-weight)}
.hero h1 em{font-style:normal;color:var(--blue)}
.hero p.lead{font-size:20px;max-width:58ch;color:var(--muted);margin:0 0 24px}
.finder{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-lg);padding:22px;display:grid;gap:16px}
.finder label{font-weight:700}
.personas{display:flex;flex-wrap:wrap;gap:8px}
.persona{border:2px solid var(--line);background:var(--surface);color:var(--ink);border-radius:var(--radius-pill);padding:9px 16px;font:700 15px var(--body);cursor:pointer;transition:transform .15s,border-color .15s}
.persona:hover{transform:translateY(-1px);border-color:var(--blue)}
.persona[aria-pressed="true"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.search{display:flex;gap:10px;flex-wrap:wrap}
.search input{flex:1 1 260px;min-width:0;font:400 17px var(--body);padding:12px 16px;border-radius:12px;border:2px solid var(--line);background:var(--bg);color:var(--ink)}
.pathstrip{display:flex;flex-wrap:wrap;align-items:center;gap:8px;min-height:44px}
.pathstrip .step{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:12px;background:var(--surface-2);text-decoration:none;color:var(--ink);font-weight:700;border-left:5px solid var(--c)}
.pathstrip .arrow{color:var(--muted);font-weight:700}
.pathstrip .why{flex-basis:100%;color:var(--muted);font-size:15px;margin:0}
section{padding-block:36px;scroll-margin-top:70px}
section > .wrap > h2{font-family:var(--display);font-size:clamp(24px,3.4vw,34px);margin:6px 0 8px}
.sub{color:var(--muted);max-width:62ch;margin:0 0 22px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}
.card{display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden;text-decoration:none;color:var(--ink);transition:transform .18s,box-shadow .18s}
.card:hover{transform:translateY(-3px);box-shadow:0 14px 30px -18px rgba(11,21,48,.45)}
.card img{display:block;aspect-ratio:3/1;object-fit:cover;width:100%}
.card .body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:10px;flex:1}
.card h3{margin:0;font-size:20px}
.card p{margin:0;color:var(--muted);font-size:15px}
.card .meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto}
.card .prog{height:6px;border-radius:6px;background:var(--surface-2);overflow:hidden}
.card .prog span{display:block;height:100%;width:0;background:var(--c)}
.card[hidden]{display:none}
.empty{padding:24px;border:2px dashed var(--line);border-radius:16px;color:var(--muted)}
.lanes{display:grid;gap:14px}
.lane{display:grid;grid-template-columns:170px 1fr;gap:14px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-lg);padding:14px}
.lane h3{margin:0;font-size:17px}
.lane h3 small{display:block;color:var(--muted);font-weight:400;font-size:13px}
.track{display:flex;flex-wrap:wrap;align-items:center;gap:6px;min-width:0}
.node{display:inline-flex;flex-direction:column;padding:8px 12px;border-radius:12px;background:var(--surface-2);text-decoration:none;color:var(--ink);border-top:4px solid var(--c);font-weight:700;font-size:15px;line-height:1.25}
.node small{font-weight:400;color:var(--muted);font-size:12px}
.node.ext{border-top-style:dashed;opacity:.85}
.track .arr{color:var(--muted)}
@media (max-width:640px){.lane{grid-template-columns:1fr}}
.model{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;counter-reset:m}
.model div{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:18px}
.model b{font-family:var(--display);font-size:22px;display:block}
.model span{color:var(--muted);font-size:15px}
.status{font-weight:700;font-size:13px;padding:3px 9px;border-radius:var(--radius-pill);white-space:nowrap}
.status.ok{background:color-mix(in srgb,var(--good) 18%,transparent);color:var(--good)}
.status.ret{background:color-mix(in srgb,var(--bad) 16%,transparent);color:var(--bad)}
.verified{display:inline-flex;gap:8px;align-items:center;font-weight:700;color:var(--good)}
.sources{font-size:14px;color:var(--muted)}
"""

COURSE_CSS = r"""
.band{background:linear-gradient(120deg,var(--band-start),var(--c));color:#fff;padding-block:28px 32px}
.band .wrap{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:28px;align-items:center}
@media (max-width:820px){.band .wrap{grid-template-columns:1fr}.band img{display:none}}
.band a{color:#fff}
.band .crumbs{font-size:14px;opacity:.85}
.band h1{font-family:var(--display);font-size:clamp(28px,4.6vw,48px);margin:10px 0 8px;font-weight:var(--display-weight)}
.band p{font-size:19px;margin:0 0 16px;opacity:.92;max-width:52ch}
.band .chips{display:flex;flex-wrap:wrap;gap:8px}
.band .chip{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.25);color:#fff}
.band img{border-radius:16px;box-shadow:0 20px 40px -20px rgba(0,0,0,.6)}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:16px;overflow:hidden;margin-top:-1px}
.facts div{background:var(--surface);padding:14px 16px}
.facts dt{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:700}
.facts dd{margin:4px 0 0;font-weight:700}
.layout{display:grid;grid-template-columns:260px minmax(0,1fr);gap:40px;padding-block:32px}
@media (max-width:900px){.layout{grid-template-columns:1fr}}
.toc{position:sticky;top:calc(env(safe-area-inset-top,0px) + 76px);align-self:start;max-height:calc(100vh - 96px);overflow:auto;padding-right:6px}
@media (max-width:900px){.toc{position:static;max-height:none}}
.toc details{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:12px 14px}
.toc summary{font-weight:700;cursor:pointer}
.toc ol{list-style:none;margin:10px 0 0;padding:0;display:grid;gap:2px}
.toc a{display:block;padding:5px 8px;border-radius:8px;text-decoration:none;color:var(--muted);font-size:15px;line-height:1.35}
.toc a:hover,.toc a.on{background:var(--surface-2);color:var(--ink)}
.progress{margin:14px 0 4px}
.progress .bar{height:8px;background:var(--surface-2);border-radius:8px;overflow:hidden}
.progress .bar span{display:block;height:100%;width:0;background:var(--c);transition:width .4s}
.progress p{margin:6px 0 0;font-size:14px;color:var(--muted)}
.reset{background:none;border:0;color:var(--muted);text-decoration:underline;cursor:pointer;font:400 13px var(--body);padding:0}
.content{min-width:0;max-width:780px}
.content h1{display:none}
.content h2{font-family:var(--display);font-size:clamp(22px,3vw,30px);margin:56px 0 12px;padding-top:12px;border-top:4px solid var(--c);scroll-margin-top:80px}
.content h2:first-of-type{margin-top:0}
.content h3{font-size:21px;margin:32px 0 8px;scroll-margin-top:80px}
.content p,.content li{max-width:68ch}
.content blockquote{margin:22px 0;padding:16px 18px 16px 20px;border-radius:14px;background:var(--surface);border:1px solid var(--line);border-left:6px solid var(--muted)}
.content blockquote p{margin:.4em 0}
.content blockquote.dope{border-left-color:var(--gold);background:color-mix(in srgb,var(--gold) 9%,var(--surface))}
.content blockquote.dope::before{content:"Dope Translation";display:block;font:800 12px var(--display);letter-spacing:.08em;text-transform:uppercase;color:var(--gold-ink);margin-bottom:4px}
.content blockquote.real{border-left-color:var(--blue)}
.content blockquote.real::before{content:"Real Talk";display:block;font:800 12px var(--display);letter-spacing:.08em;text-transform:uppercase;color:var(--blue);margin-bottom:4px}
.content blockquote.wallet{border-left-color:var(--bad)}
.content blockquote.wallet::before{content:"Watch your wallet";display:block;font:800 12px var(--display);letter-spacing:.08em;text-transform:uppercase;color:var(--bad);margin-bottom:4px}
.content blockquote > p:first-child > strong:first-child{display:none}
.content img{display:block;margin:20px 0;border-radius:16px}
.content li.check{list-style:none;margin-left:-1.3em}
.content li.check input{width:18px;height:18px;margin-right:8px;vertical-align:-3px;accent-color:var(--c)}
.quiz{margin:28px 0;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden}
.quiz header{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 18px;background:var(--surface-2);font-weight:700;flex-wrap:wrap}
.quiz header .score{font-variant-numeric:tabular-nums;color:var(--muted);font-weight:400}
.q{padding:16px 18px;border-top:1px solid var(--line)}
.q:first-of-type{border-top:0}
.q p.stem{margin:0 0 10px;font-weight:700}
.opts{display:grid;gap:8px}
.opt{text-align:left;padding:10px 14px;border-radius:12px;border:2px solid var(--line);background:var(--bg);color:var(--ink);font:400 16px var(--body);cursor:pointer}
.opt:hover:not([disabled]){border-color:var(--c)}
.opt[disabled]{cursor:default}
.opt.right{border-color:var(--good);background:color-mix(in srgb,var(--good) 14%,var(--bg))}
.opt.wrong{border-color:var(--bad);background:color-mix(in srgb,var(--bad) 12%,var(--bg))}
.explain{margin:10px 0 0;font-size:15px;color:var(--muted)}
.explain b{color:var(--ink)}
.next{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:20px}
.next a{display:block;padding:16px;border-radius:14px;background:var(--surface);border:1px solid var(--line);border-top:5px solid var(--nc);text-decoration:none;color:var(--ink)}
.next a small{display:block;color:var(--muted)}
"""

LOGO = ('<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><rect width="34" height="34" rx="9" fill="#0b1530"/>'
        '<path d="M10 22h14a5 5 0 0 0 0-10 7 7 0 0 0-13.4 1.6A4.3 4.3 0 0 0 10 22z" fill="#2f6bff"/>'
        '<circle cx="24" cy="12" r="3" fill="#f2a900"/></svg>')

def topbar(prefix=""):
    return (f'<!-- DCT:SITE-HEADER START -->\n<header class="topbar"><div class="wrap"><a class="brand" href="{prefix}index.html">{LOGO}'
            f'<span>The Dope Cloud Teacher<small>Course Hub</small></span></a>'
            f'<nav class="nav" aria-label="Main"><a href="{prefix}index.html#find">Find your path</a><a href="{prefix}index.html#courses">Courses</a>'
            f'<a href="{prefix}index.html#paths">Learning paths</a><a href="{prefix}index.html#certs">Cert facts</a>'
            f'<a href="{SITE}" rel="noopener">thedopecloudteacher.org</a></nav></div></header>\n<!-- DCT:SITE-HEADER END -->')

def footer():
    return (f'<!-- DCT:SITE-FOOTER START -->\n<footer><div class="wrap"><div><b>The Dope Cloud Teacher</b><br>Understand · Use · Protect · Create<br>'
            f'Community-centered AI, cloud &amp; cybersecurity education in the DMV.</div>'
            f'<div>Questions? Email <span class="sel">{CONTACT}</span><br>Exam facts last verified {VERIFIED} against Microsoft Learn.<br>'
            f'Microsoft, Azure and related names are trademarks of Microsoft. DCT is an independent training provider.</div></div></footer>\n<!-- DCT:SITE-FOOTER END -->')

def doc(title, css, body, js, desc, prefix=""):
    theme = (f'<style>{THEME_CSS}</style>' if INLINE_THEME else f'<link rel="stylesheet" href="{prefix}dct-theme.css">')
    return (f'<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
            f'<title>{html.escape(title)}</title><meta name="description" content="{html.escape(desc)}">'
            f'<!-- DCT:THEME — fonts, colors and shapes live in dct-theme.css; set them to match the main site -->{theme}'
            f'<style>{CSS}{css}</style></head><body>{body}<script>{js}</script></body></html>\n')

# ------------------------------------------------------------------ paths & personas
PERSONAS = [
    ("new", "New to tech", ["cyber-basics-stay-safer-online", "ai-fundamentals-everyday-ai", "cloud-fundamentals-101", "az-900-azure-fundamentals"],
     "Start with safety and everyday AI, then make your first cloud build and earn AZ-900."),
    ("senior", "Senior or family", ["cyber-basics-stay-safer-online", "ai-fundamentals-everyday-ai", "cloud-fundamentals-101"],
     "Stop scams first, use AI with confidence, then see where your photos and accounts actually live."),
    ("teen", "Teen or student", ["ai-fundamentals-everyday-ai", "cloud-fundamentals-101", "az-900-azure-fundamentals", "ai-901-azure-ai-fundamentals"],
     "Use AI the right way, build a real website, and stack two Microsoft certifications before graduation."),
    ("career", "Career changer", ["cloud-fundamentals-101", "az-900-azure-fundamentals", "az-104-azure-administrator", "cloud-security"],
     "Portfolio build, first cert, then the admin cert that gets interviews — with security on top."),
    ("veteran", "Veteran", ["az-900-azure-fundamentals", "cloud-security", "az-104-azure-administrator", "az-305-azure-solutions-architect"],
     "Translate your service experience into cloud and security roles, from fundamentals to architect."),
    ("cert", "Cert chaser", ["az-900-azure-fundamentals", "ai-901-azure-ai-fundamentals", "cloud-security", "az-104-azure-administrator", "az-305-azure-solutions-architect"],
     "AZ-900 → AI-901 → SC-900 → AZ-104 → AZ-305. Every course is mapped to Microsoft's current skills outline."),
    ("org", "School, agency or business", ["ai-security-responsible-governance", "ai-fundamentals-everyday-ai", "cyber-basics-stay-safer-online", "cloud-security"],
     "Set AI policy and oversight first, then train staff on everyday AI and security habits."),
    ("pro", "IT or security pro", ["az-104-azure-administrator", "cloud-security", "az-305-azure-solutions-architect", "ai-security-responsible-governance"],
     "Operate, secure and design Azure — and govern the AI your organization is already using."),
]

LANES = [
    ("Cloud", "build & run Azure", ["cloud-fundamentals-101", "az-900-azure-fundamentals", "az-104-azure-administrator", "az-305-azure-solutions-architect"], None),
    ("AI", "use, build, govern", ["ai-fundamentals-everyday-ai", "ai-901-azure-ai-fundamentals", "ai-security-responsible-governance"], None),
    ("Security", "protect people & data", ["cyber-basics-stay-safer-online", "cloud-security"], ("SC-500", "Cloud & AI Security Engineer · next step")),
]

CERTS = [
    ("AZ-900", "Azure Fundamentals", "ok", "Active", "Skills as of July 20, 2026", "$99", "Doesn't expire", "https://learn.microsoft.com/credentials/certifications/resources/study-guides/az-900"),
    ("AI-901", "Azure AI Fundamentals", "ok", "Active", "Skills as of April 15, 2026 · 55–60% hands-on in Microsoft Foundry · expects basic Python", "$99", "Doesn't expire", "https://learn.microsoft.com/credentials/certifications/resources/study-guides/ai-901"),
    ("AI-900", "Azure AI Fundamentals (old)", "ret", "Retired June 30, 2026", "Replaced by AI-901. Earned AI-900 certifications remain valid.", "—", "—", "https://learn.microsoft.com/credentials/certifications/resources/study-guides/ai-901"),
    ("SC-900", "Security, Compliance & Identity Fundamentals", "ok", "Active", "Skills updated July 28, 2026", "$99", "Doesn't expire", "https://learn.microsoft.com/credentials/certifications/resources/study-guides/sc-900"),
    ("AZ-104", "Azure Administrator Associate", "ok", "Active", "Skills as of April 17, 2026 · identity & governance 20–25%, networking 15–20%", "$165", "Free annual renewal", "https://learn.microsoft.com/credentials/certifications/resources/study-guides/az-104"),
    ("AZ-305", "Azure Solutions Architect Expert", "ok", "Active", "Skills as of April 17, 2026 · Expert award requires AZ-104", "$165", "Free annual renewal", "https://learn.microsoft.com/credentials/certifications/resources/study-guides/az-305"),
    ("AZ-500", "Azure Security Engineer (old)", "ret", "Retired August 31, 2026", "Replaced by SC-500. Existing holders can't renew; they must pass SC-500.", "—", "—", "https://learn.microsoft.com/answers/questions/5953548/question-regarding-the-future-of-the-az-500-certif"),
    ("SC-500", "Cloud and AI Security Engineer Associate", "ok", "Active", "Replaces AZ-500 · identity, storage/networking, compute, security posture", "$165", "Free annual renewal", "https://learn.microsoft.com/credentials/certifications/resources/study-guides/sc-500"),
]

def c_color(slug): return BY_SLUG[slug]["color"]

# ------------------------------------------------------------------ hub page
HUB_JS = r"""
const PERSONAS = __PERSONAS__;
const COURSES = __COURSES__;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const store = { get(k){ try { return JSON.parse(localStorage.getItem(k)); } catch(e){ return null; } },
                set(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} } };
let active = null;
function render(){
  const q = $('#q').value.trim().toLowerCase();
  const allowed = active ? PERSONAS[active].courses : null;
  let shown = 0;
  $$('.card').forEach(card => {
    const c = COURSES[card.dataset.slug];
    const okP = !allowed || allowed.includes(card.dataset.slug);
    const okQ = !q || c.search.includes(q);
    card.hidden = !(okP && okQ); if(!card.hidden) shown++;
    if (allowed) card.style.order = okP ? allowed.indexOf(card.dataset.slug) : 99; else card.style.order = '';
  });
  $('#empty').hidden = shown > 0;
  $('#count').textContent = shown + (shown === 1 ? ' course' : ' courses');
  const strip = $('#pathstrip');
  if (!active){ strip.innerHTML = '<p class="why">Pick what fits you and we’ll line up the courses in the order that makes sense. Or search any topic: MFA, scams, Bicep, agents, budgets…</p>'; return; }
  const p = PERSONAS[active];
  strip.innerHTML = p.courses.map((s,i) => `${i? '<span class="arrow" aria-hidden="true">→</span>':''}<a class="step" style="--c:${COURSES[s].color}" href="courses/${s}.html">${i+1}. ${COURSES[s].short}</a>`).join('') + `<p class="why">${p.why}</p>`;
}
$$('.persona').forEach(b => b.addEventListener('click', () => {
  const key = b.dataset.p; active = active === key ? null : key;
  $$('.persona').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.p === active)));
  store.set('dct:persona', active); render();
}));
$('#q').addEventListener('input', render);
$('#clear').addEventListener('click', () => { $('#q').value=''; active=null; $$('.persona').forEach(x=>x.setAttribute('aria-pressed','false')); store.set('dct:persona',null); render(); });
const saved = store.get('dct:persona'); if (saved && PERSONAS[saved]) { active = saved; $(`.persona[data-p="${saved}"]`).setAttribute('aria-pressed','true'); }
const h = location.hash.slice(1); if (PERSONAS[h]) { active = h; $$('.persona').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.p === h))); }
$$('.card').forEach(card => {
  const c = COURSES[card.dataset.slug], done = store.get('dct:quiz:'+card.dataset.slug) || {};
  const right = Object.values(done).filter(v => v === true).length;
  if (right) { card.querySelector('.prog span').style.width = Math.round(100*right/c.q) + '%'; card.querySelector('.prog').title = right + ' of ' + c.q + ' questions correct'; }
});
render();
"""

def short_dur(d):
    return re.split(r"[(+·]", d)[0].strip().rstrip(",")

def strip_md(s): return re.sub(r"[`*_>#\[\]()|]", " ", s)

def hub():
    cards = ""
    for c in COURSES:
        cards += (f'<a class="card" data-slug="{c["slug"]}" href="courses/{c["slug"]}.html" style="--c:{c["color"]}">'
                  f'<img src="visuals/{c["cover"]}" alt="" width="900" height="300" loading="lazy">'
                  f'<div class="body"><span class="eyebrow">{html.escape(c["code"])} · {html.escape(c["program"])}</span>'
                  f'<h3>{html.escape(c["title"])}</h3><p>{html.escape(c["tagline"])}</p>'
                  f'<div class="meta"><span class="chip">{html.escape(c["level"])}</span><span class="chip">{html.escape(short_dur(c["duration"]))}</span>'
                  f'<span class="chip">{c["qcount"]} practice Qs</span></div>'
                  f'<div class="prog" aria-hidden="true"><span></span></div></div></a>')
    personas = "".join(f'<button class="persona" type="button" data-p="{k}" aria-pressed="false">{html.escape(l)}</button>' for k, l, _, _ in PERSONAS)
    lanes = ""
    for name, sub, slugs, ext in LANES:
        nodes = []
        for s in slugs:
            c = BY_SLUG[s]
            nodes.append(f'<a class="node" style="--c:{c["color"]}" href="courses/{s}.html">{html.escape(short_name(c))}<small>{html.escape(c["level"])}</small></a>')
        if ext:
            nodes.append(f'<span class="node ext" style="--c:var(--prog-security)">{ext[0]}<small>{ext[1]}</small></span>')
        lanes += (f'<div class="lane"><h3>{name}<small>{sub}</small></h3><div class="track">'
                  + '<span class="arr" aria-hidden="true">→</span>'.join(nodes) + '</div></div>')
    certrows = "".join(
        f'<tr><td><b>{code}</b><br><span class="sources">{html.escape(name)}</span></td>'
        f'<td><span class="status {cls}">{html.escape(st)}</span></td><td>{html.escape(note)}</td>'
        f'<td>{price}</td><td>{renew}</td><td><a href="{url}" rel="noopener">Official page</a></td></tr>'
        for code, name, cls, st, note, price, renew, url in CERTS)
    body = topbar() + f"""
<main>
<section class="hero" id="find"><div class="wrap">
  <span class="eyebrow">DCT Course Hub · AI, Cloud &amp; Cybersecurity</span>
  <h1>You belong in tech.<br><em>Let's find your starting point.</em></h1>
  <p class="lead">Nine complete courses, from stopping scams to designing Azure for a whole agency. Plain language first, the professional terms right after, and real practice every step.</p>
  <div class="finder">
    <label for="q">I am…</label>
    <div class="personas" role="group" aria-label="Choose who you are">{personas}</div>
    <div class="search"><input id="q" type="search" placeholder="Search a topic: MFA, scams, Bicep, agents, budgets, AZ-104…" aria-label="Search courses"><button class="btn ghost" id="clear" type="button">Show everything</button></div>
    <div class="pathstrip" id="pathstrip" aria-live="polite"></div>
  </div>
</div></section>

<section id="courses"><div class="wrap">
  <span class="eyebrow" id="count">9 courses</span>
  <h2>Courses</h2>
  <p class="sub">Every course has a syllabus, lessons with a Dope Translation, real scenarios, labs with cost and cleanup guardrails, quizzes with explanations, a capstone and instructor notes.</p>
  <div class="grid">{cards}</div>
  <p class="empty" id="empty" hidden>Nothing matches that yet. Try a broader word like "cloud", "AI" or "security", or press <b>Show everything</b>.</p>
</div></section>

<section id="paths"><div class="wrap">
  <span class="eyebrow">Learning paths</span>
  <h2>Three trails, one destination</h2>
  <p class="sub">Start on any trail. Each one stacks toward a Microsoft credential and a real job title.</p>
  <div class="lanes">{lanes}</div>
</div></section>

<section><div class="wrap">
  <span class="eyebrow">How every DCT course works</span>
  <h2>Understand → Use → Protect → Create</h2>
  <div class="model">
    <div><b>Understand</b><span>Plain language first, then the real term. You'll always know what the jargon means.</span></div>
    <div><b>Use</b><span>Hands-on from the first session, on your own phone, laptop or cloud account.</span></div>
    <div><b>Protect</b><span>Security, privacy and cost guardrails in every lab. Who can get in, what it costs, how to clean up.</span></div>
    <div><b>Create</b><span>Every course ends with something you built and can show.</span></div>
  </div>
</div></section>

<section id="certs"><div class="wrap">
  <span class="eyebrow verified">✓ Verified {VERIFIED}</span>
  <h2>Cert facts, kept current</h2>
  <p class="sub">Microsoft retires and replaces exams often. Here's where things stand, checked against Microsoft Learn. Prices are U.S. list prices and vary by country.</p>
  <div class="tablewrap"><table><thead><tr><th>Exam</th><th>Status</th><th>What to know</th><th>Price</th><th>Renewal</th><th>Source</th></tr></thead><tbody>{certrows}</tbody></table></div>
  <p class="sources">Also changed in 2026: AI-102 → AI-103 (June 30), AZ-204 → AI-200 (July 31). Always confirm on Microsoft Learn before you book.</p>
</div></section>
</main>""" + footer()
    personas_js = {k: {"label": l, "courses": cs, "why": w} for k, l, cs, w in PERSONAS}
    courses_js = {c["slug"]: {"short": short_name(c), "color": c["color"], "q": c["qcount"],
                              "search": strip_md(" ".join([c["title"], c["tagline"], c["code"], c["program"], c["audience"], c["cert"], c["body"]])).lower()}
                  for c in COURSES}
    js = HUB_JS.replace("__PERSONAS__", json.dumps(personas_js)).replace("__COURSES__", json.dumps(courses_js))
    return doc("DCT Course Hub", HUB_CSS, body, js,
               "Find your starting point: nine AI, cloud and cybersecurity courses from The Dope Cloud Teacher.")

def short_name(c):
    return {"cloud-fundamentals-101": "Cloud 101", "az-900-azure-fundamentals": "AZ-900", "az-104-azure-administrator": "AZ-104",
            "az-305-azure-solutions-architect": "AZ-305", "ai-901-azure-ai-fundamentals": "AI-901",
            "ai-fundamentals-everyday-ai": "Everyday AI", "cloud-security": "Cloud Security · SC-900",
            "ai-security-responsible-governance": "AI Security & Governance", "cyber-basics-stay-safer-online": "Cyber Basics"}[c["slug"]]

# ------------------------------------------------------------------ course pages
COURSE_JS = r"""
const QUIZZES = __QUIZZES__, SLUG = "__SLUG__", TOTAL = __TOTAL__;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const KEY = 'dct:quiz:' + SLUG;
const store = { get(k){ try { return JSON.parse(localStorage.getItem(k)); } catch(e){ return null; } },
                set(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} } };
let state = store.get(KEY) || {};
function progress(){
  const right = Object.values(state).filter(v => v === true).length;
  $('#pbar').style.width = (TOTAL ? Math.round(100*right/TOTAL) : 0) + '%';
  $('#ptext').textContent = `${right} of ${TOTAL} practice questions correct`;
}
function scoreOf(qi){ const qs = QUIZZES[qi]; let r=0,a=0; qs.forEach((_,i)=>{ const v=state[qi+'-'+i]; if(v!==undefined){a++; if(v===true) r++;} }); return `${r}/${qs.length} correct${a<qs.length?` · ${qs.length-a} to go`:''}`; }
function answer(qi, i, pick, wrapEl){
  const q = QUIZZES[qi][i], ok = pick === q.answer;
  if (state[qi+'-'+i] === undefined || ok) state[qi+'-'+i] = ok;
  store.set(KEY, state);
  wrapEl.querySelectorAll('.opt').forEach((b, j) => { b.disabled = true; if (j === q.answer) b.classList.add('right'); if (j === pick && !ok) b.classList.add('wrong'); });
  const ex = wrapEl.querySelector('.explain');
  ex.innerHTML = `<b>${ok ? 'Correct.' : 'Not quite.'}</b> ${q.explain} <button class="reset" type="button">Try again</button>`;
  ex.querySelector('.reset').onclick = () => { wrapEl.querySelectorAll('.opt').forEach(b=>{b.disabled=false;b.classList.remove('right','wrong')}); ex.textContent=''; };
  wrapEl.closest('.quiz').querySelector('.score').textContent = scoreOf(qi);
  progress();
}
$$('.quiz').forEach(el => {
  const qi = +el.dataset.quiz, qs = QUIZZES[qi];
  const title = qs.length >= 20 ? 'Practice exam' : 'Check yourself';
  el.innerHTML = `<header><span>${title} · ${qs.length} question${qs.length>1?'s':''}</span><span class="score"></span></header>` +
    qs.map((q,i) => `<div class="q" data-i="${i}"><p class="stem">${i+1}. ${q.q}</p><div class="opts">${q.options.map((o,j)=>`<button type="button" class="opt" data-j="${j}">${o}</button>`).join('')}</div><p class="explain" aria-live="polite"></p></div>`).join('');
  el.querySelector('.score').textContent = scoreOf(qi);
  el.querySelectorAll('.q').forEach(qel => {
    const i = +qel.dataset.i;
    qel.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => answer(qi, i, +b.dataset.j, qel)));
  });
});
$$('li.check input').forEach((cb, i) => { const k='dct:check:'+SLUG+':'+i; cb.checked = !!store.get(k); cb.addEventListener('change', () => store.set(k, cb.checked)); });
$$('pre').forEach(pre => { const b = document.createElement('button'); b.className='copy'; b.type='button'; b.textContent='Copy';
  b.onclick = async () => { const t = pre.querySelector('code').innerText; try { await navigator.clipboard.writeText(t); b.textContent='Copied'; } catch(e){ const r=document.createRange(); r.selectNodeContents(pre.querySelector('code')); const s=getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent='Selected — press Ctrl+C'; } setTimeout(()=>b.textContent='Copy',1800); };
  pre.appendChild(b); });
$('#resetp').addEventListener('click', () => { state = {}; store.set(KEY, state); location.reload(); });
const links = $$('.toc a'); const heads = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#'+e.target.id)); } }), {rootMargin:'-20% 0px -70% 0px'});
heads.forEach(h => io.observe(h));
progress();
"""

def callouts(htm):
    def rep(m):
        label = m.group(1).lower()
        cls = "dope" if label.startswith("dope") else "real" if label.startswith("real") else "wallet"
        return f'<blockquote class="{cls}">\n<p><strong>{m.group(1)}'
    return re.sub(r'<blockquote>\s*<p><strong>(Dope Translation[^<]*|Real Talk[^<]*|Watch your wallet[^<]*)', rep, htm)

def course_page(c, idx):
    md = markdown.Markdown(extensions=["tables", "fenced_code", "toc", "sane_lists"],
                           extension_configs={"toc": {"permalink": False}})
    htm = md.convert(c["body"])
    # visible "Dope Translation — the pizza model:" keeps its subtitle
    htm = re.sub(r'<p><strong>Dope Translation — ([^<]*)</strong>', r'<p><strong>Dope Translation</strong><em>\1</em>', htm)
    htm = callouts(htm)
    htm = re.sub(r"<table>", '<div class="tablewrap"><table>', htm).replace("</table>", "</table></div>")
    htm = re.sub(r"<li>\[ \] ", '<li class="check"><input type="checkbox" aria-label="Done"> ', htm)
    htm = re.sub(r'<a href="(https?://[^"]+)"', r'<a href="\1" rel="noopener"', htm)
    toc_items = [t for t in md.toc_tokens[0]["children"]] if md.toc_tokens and md.toc_tokens[0].get("children") else []
    toc = "".join(f'<li><a href="#{t["id"]}">{t["name"]}</a></li>' for t in toc_items)
    # next steps: next courses in the same lane, else first of others
    lane = next((l for l in LANES if c["slug"] in l[2]), None)
    nxt = []
    if lane:
        i = lane[2].index(c["slug"]); nxt = lane[2][i+1:i+3]
    for s in [x["slug"] for x in COURSES]:
        if len(nxt) >= 2: break
        if s != c["slug"] and s not in nxt: nxt.append(s)
    nexts = "".join(f'<a href="{s}.html" style="--nc:{BY_SLUG[s]["color"]}"><small>{html.escape(BY_SLUG[s]["code"])}</small><b>{html.escape(BY_SLUG[s]["title"])}</b><br><small>{html.escape(BY_SLUG[s]["tagline"])}</small></a>' for s in nxt)
    facts = "".join(f'<div><dt>{k}</dt><dd>{html.escape(c[v])}</dd></div>' for k, v in
                    [("Level", "level"), ("Time", "duration"), ("Format", "format"), ("Price", "price"), ("Credential", "cert")])
    body = topbar("../") + f"""
<div class="band" style="--c:{c['color']}"><div class="wrap">
  <div><div class="crumbs"><a href="../index.html#courses">All courses</a> · {html.escape(c['program'])}</div>
  <h1>{html.escape(c['title'])}</h1><p>{html.escape(c['tagline'])}</p>
  <div class="chips"><span class="chip">{html.escape(c['code'])}</span><span class="chip">{html.escape(c['level'])}</span><span class="chip">{c['qcount']} practice questions</span></div></div>
  <img src="../visuals/{c['cover']}" alt="" width="900" height="300">
</div></div>
<div class="wrap"><dl class="facts">{facts}</dl></div>
<div class="wrap layout" style="--c:{c['color']}">
  <aside class="toc"><details open><summary>Course outline</summary>
    <div class="progress"><div class="bar"><span id="pbar"></span></div><p id="ptext"></p><button class="reset" id="resetp" type="button">Reset my answers</button></div>
    <ol>{toc}</ol></details>
    <p class="sources" style="margin-top:12px">Audience: {html.escape(c['audience'])}</p></aside>
  <article class="content">{htm}
    <h2 id="next-steps">Keep going</h2><div class="next">{nexts}</div>
  </article>
</div>""" + footer()
    js = (COURSE_JS.replace("__QUIZZES__", json.dumps(c["quizzes"])).replace("__SLUG__", c["slug"])
          .replace("__TOTAL__", str(c["qcount"])))
    return doc(f"{c['title']} | DCT", COURSE_CSS, body, js, c["tagline"], prefix="../")

# ------------------------------------------------------------------ write
def main():
    if os.path.exists(OUT): shutil.rmtree(OUT)
    for d in ("courses", "visuals", "quizzes", "source"): os.makedirs(os.path.join(OUT, d))
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(hub())
    for i, c in enumerate(COURSES):
        open(os.path.join(OUT, "courses", c["slug"] + ".html"), "w", encoding="utf-8").write(course_page(c, i))
        json.dump({"course": c["code"], "title": c["title"], "slug": c["slug"], "verified": VERIFIED,
                   "quizzes": [{"index": qi, "questions": [{"id": f"{c['slug']}-{qi}-{n}", "prompt": q["q"], "options": q["options"],
                                                           "answer_index": q["answer"], "explanation": q["explain"]} for n, q in enumerate(qs)]}
                               for qi, qs in enumerate(c["quizzes"])]},
                  open(os.path.join(OUT, "quizzes", c["slug"] + ".json"), "w"), indent=2)
        shutil.copy(os.path.join(ROOT, "content", c["source"]), os.path.join(OUT, "source", c["source"]))
    for f in glob.glob(os.path.join(ROOT, "visuals", "*.svg")): shutil.copy(f, os.path.join(OUT, "visuals"))
    shutil.copy(THEME_PATH, os.path.join(OUT, "dct-theme.css"))
    tot = sum(c["qcount"] for c in COURSES)
    print(f"built {len(COURSES)} courses, {tot} quiz questions -> {OUT}")

if __name__ == "__main__":
    main()
