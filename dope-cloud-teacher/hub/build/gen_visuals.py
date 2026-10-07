"""Generate DCT course diagrams and covers as animated, self-contained SVGs.

Every SVG carries its own light 'card' background so it reads in light and dark pages.
Animation: dashed 'flow' arrows and soft pulses; disabled under prefers-reduced-motion.
"""
import os, sys, html

OUT = sys.argv[1] if len(sys.argv) > 1 else "visuals"
os.makedirs(OUT, exist_ok=True)

# Colors and font come from dct-theme.css so the visuals match the site theme.
import re as _re
_THEME = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "dct-theme.css"), encoding="utf-8").read()
_LIGHT = _THEME[_THEME.index(":root{"):_THEME.index("}", _THEME.index(":root{"))]
_T = dict(_re.findall(r"--([a-z0-9-]+):\s*([^;]+);", _LIGHT))
INK = _T["ink"]; MUTED = _T["muted"]; LINE = _T["line"]; PAPER = "#ffffff"; SOFT = _T["surface-2"]
BLUE = _T["blue"]; GOLD = _T["gold"]; TEAL = _T["prog-security"]; PINK = _T["prog-ai"]; ORANGE = _T["prog-aisec"]
VIOLET = _T["prog-arch"]; CYAN = _T["prog-security"]; GREEN = _T["good"]; RED = _T["bad"]
FONT = _T["body"].replace('"', "'")

STYLE = f"""
<style>
 text{{font-family:{FONT};fill:{INK}}}
 .t{{font-size:15px;font-weight:600}} .s{{font-size:12px;fill:{MUTED}}} .h{{font-size:20px;font-weight:800}}
 .k{{font-size:11px;letter-spacing:1.5px;font-weight:700;fill:{MUTED}}} .w{{fill:#fff}}
 .flow{{stroke-dasharray:6 6;animation:dash 1.4s linear infinite}}
 .pulse{{animation:pulse 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}}
 @keyframes dash{{to{{stroke-dashoffset:-24}}}}
 @keyframes pulse{{0%,100%{{opacity:1;transform:scale(1)}}50%{{opacity:.75;transform:scale(1.04)}}}}
 @keyframes rise{{from{{opacity:.15;transform:translateY(6px)}}to{{opacity:1;transform:none}}}}
 @media (prefers-reduced-motion: reduce){{.flow,.pulse,.rise{{animation:none}}}}
</style>"""

def esc(s): return html.escape(str(s), quote=True)

def svg(name, w, h, body, title):
    doc = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
           f'role="img" aria-labelledby="t_{name}"><title id="t_{name}">{esc(title)}</title>{STYLE}'
           f'<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
           f'<path d="M0,0 L10,5 L0,10 z" fill="{MUTED}"/></marker></defs>'
           f'<rect x="0" y="0" width="{w}" height="{h}" rx="18" fill="{PAPER}"/>'
           f'<rect x="0.5" y="0.5" width="{w-1}" height="{h-1}" rx="18" fill="none" stroke="{LINE}"/>'
           f'{body}</svg>')
    with open(os.path.join(OUT, f"{name}.svg"), "w") as f:
        f.write(doc)

def txt(x, y, s, cls="t", anchor="middle", fill=None):
    lines = str(s).split("\n")
    f = f' style="fill:{fill}"' if fill else ""
    out = ""
    lh = 18 if cls in ("t",) else 15 if cls == "s" else 24
    y0 = y - (len(lines) - 1) * lh / 2
    for i, ln in enumerate(lines):
        out += f'<text x="{x}" y="{y0 + i*lh}" class="{cls}" text-anchor="{anchor}" dominant-baseline="middle"{f}>{esc(ln)}</text>'
    return out

def box(x, y, w, h, label, sub=None, fill=SOFT, stroke=LINE, tcolor=None, cls="", rx=12):
    c = f' class="{cls}"' if cls else ""
    out = f'<g{c}><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>'
    if sub:
        out += txt(x + w/2, y + h/2 - 9, label, "t", fill=tcolor) + txt(x + w/2, y + h/2 + 12, sub, "s", fill=tcolor and "#eaf0ff")
    else:
        out += txt(x + w/2, y + h/2, label, "t", fill=tcolor)
    return out + "</g>"

def arrow(x1, y1, x2, y2, color=MUTED, flow=True, label=None):
    out = f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="2" marker-end="url(#ah)"{" class=\"flow\"" if flow else ""}/>'
    if label:
        out += txt((x1+x2)/2, (y1+y2)/2 - 10, label, "s")
    return out

def heading(w, k, h):
    return txt(28, 34, k, "k", anchor="start") + txt(28, 60, h, "h", anchor="start")

# ---------------------------------------------------------------- diagrams

def service_models():
    W, H = 900, 520
    layers = ["Data & access", "Applications", "Runtime", "Operating system", "Virtualization", "Servers & storage", "Networking", "Datacenter"]
    cols = [("On-premises", 0), ("IaaS", 4), ("PaaS", 6), ("SaaS", 8)]  # number of bottom layers provider manages (SaaS keeps data with you)
    b = heading(W, "WHO MANAGES WHAT", "The pizza model, in cloud terms")
    cw, x0, y0, lh = 190, 60, 96, 44
    for ci, (name, prov) in enumerate(cols):
        x = x0 + ci * (cw + 18)
        b += txt(x + cw/2, y0, name, "t")
        for li, layer in enumerate(layers):
            from_bottom = len(layers) - 1 - li
            provider = from_bottom < prov and not (name == "SaaS" and li == 0)
            fill = BLUE if provider else SOFT
            b += f'<g style="animation-delay:{(ci*8+li)*0.03:.2f}s">'
            b += box(x, y0 + 20 + li * lh, cw, lh - 6, layer, fill=fill, stroke=BLUE if provider else LINE, tcolor="#fff" if provider else None, rx=8)
            b += '</g>'
    ly = y0 + 20 + len(layers) * lh + 12
    b += f'<rect x="60" y="{ly}" width="16" height="16" rx="4" fill="{BLUE}"/>' + txt(84, ly + 8, "Provider manages", "s", anchor="start")
    b += f'<rect x="230" y="{ly}" width="16" height="16" rx="4" fill="{SOFT}" stroke="{LINE}"/>' + txt(254, ly + 8, "You manage", "s", anchor="start")
    b += txt(620, ly + 8, "You always own your data, identities and access decisions.", "s")
    svg("service-models", W, H, b, "IaaS, PaaS and SaaS: which layers the provider manages versus you")

def shared_responsibility():
    W, H = 900, 400
    b = heading(W, "SHARED RESPONSIBILITY", "Provider secures the cloud. You secure what's in it.")
    rows = [("Data, devices, accounts & identities", "Always you", GOLD),
            ("Apps, OS, network controls, identity infrastructure", "Depends on IaaS / PaaS / SaaS", VIOLET),
            ("Physical hosts, network & datacenter", "Always the provider", BLUE)]
    for i, (a, c, col) in enumerate(rows):
        y = 100 + i * 92
        b += f'<g style="animation-delay:{i*0.15}s">'
        b += f'<rect x="40" y="{y}" width="820" height="76" rx="14" fill="{col}" opacity=".12"/>'
        b += f'<rect x="40" y="{y}" width="10" height="76" rx="5" fill="{col}"/>'
        b += txt(70, y + 28, a, "t", anchor="start") + txt(70, y + 52, c, "s", anchor="start")
        b += '</g>'
    b += f'<g class="pulse"><circle cx="800" cy="138" r="22" fill="{GOLD}"/>' + txt(800, 138, "YOU", "k", fill="#fff") + '</g>'
    svg("shared-responsibility", W, H, b, "Shared responsibility model: what the customer and the provider each secure")

def static_website():
    W, H = 900, 300
    b = heading(W, "BUILD 1", "How a static website is served from cloud storage")
    b += box(40, 120, 180, 90, "Your laptop", "index.html · 404.html")
    b += box(330, 110, 240, 110, "Storage account", "$web container · object storage", fill=BLUE, stroke=BLUE, tcolor="#fff", cls="pulse")
    b += box(680, 120, 180, 90, "Visitor's browser", "https://….web.core…")
    b += arrow(220, 165, 328, 165, label="upload")
    b += arrow(570, 165, 678, 165, label="public read (GET)")
    b += txt(450, 262, "Public read only. Nobody can change your files without your access.", "s")
    svg("static-website", W, H, b, "Static website flow from laptop to storage to browser")

def azure_hierarchy():
    W, H = 900, 470
    b = heading(W, "AZURE HIERARCHY", "Settings flow down. Billing stops at the subscription.")
    b += box(330, 90, 240, 60, "Management group", "policy + RBAC for many subs", fill=VIOLET, stroke=VIOLET, tcolor="#fff")
    subs = [(120, "Subscription: Prod"), (510, "Subscription: Dev")]
    for sx, sl in subs:
        b += arrow(450, 150, sx + 135, 188)
        b += box(sx, 190, 270, 56, sl, "billing + access boundary", fill=BLUE, stroke=BLUE, tcolor="#fff")
        for j, rg in enumerate(["rg-web", "rg-data"]):
            rx = sx + j * 140
            b += arrow(sx + 135, 246, rx + 65, 288)
            b += box(rx, 290, 130, 50, rg, "resource group", fill=TEAL, stroke=TEAL, tcolor="#fff")
            for k, r in enumerate(["VM" if j == 0 else "SQL", "Blob" if j else "Web"]):
                b += box(rx + k * 66, 370, 62, 40, r, rx=8)
                b += arrow(rx + 65, 340, rx + k*66 + 31, 368, flow=False)
    b += txt(450, 440, "Franchise HQ → each store → shelves → items", "s")
    svg("azure-hierarchy", W, H, b, "Management groups contain subscriptions, which contain resource groups and resources")

def vnet_basics():
    W, H = 900, 380
    b = heading(W, "NETWORKING", "A gated community with private roads")
    b += f'<rect x="40" y="90" width="520" height="250" rx="18" fill="{BLUE}" opacity=".08" stroke="{BLUE}" stroke-dasharray="6 6"/>'
    b += txt(60, 112, "VNet 10.10.0.0/16", "k", anchor="start", fill=BLUE)
    b += box(70, 135, 210, 90, "Subnet: web", "10.10.1.0/24 · NSG")
    b += box(320, 135, 210, 90, "Subnet: data", "10.10.2.0/24 · NSG")
    b += box(195, 250, 210, 70, "Private endpoint", "storage gets 10.10.2.5", fill=TEAL, stroke=TEAL, tcolor="#fff")
    b += arrow(280, 180, 318, 180)
    b += box(640, 95, 220, 60, "Other VNet", "peering")
    b += box(640, 175, 220, 60, "Office", "VPN Gateway (internet, encrypted)")
    b += box(640, 255, 220, 60, "Office / DC", "ExpressRoute (private)", fill=GOLD, stroke=GOLD)
    for y in (125, 205, 285):
        b += arrow(560, 215, 638, y)
    svg("vnet-basics", W, H, b, "Virtual network with subnets, private endpoint, peering, VPN and ExpressRoute")

def zero_trust():
    W, H = 900, 330
    b = heading(W, "ZERO TRUST", "Never trust, always verify")
    items = [("Verify explicitly", "identity · device · location · risk", BLUE),
             ("Least privilege", "just-in-time · just-enough", TEAL),
             ("Assume breach", "segment · encrypt · monitor", ORANGE)]
    for i, (t, s, c) in enumerate(items):
        x = 40 + i * 280
        b += f'<g style="animation-delay:{i*0.2}s">'
        b += f'<circle cx="{x+130}" cy="150" r="44" fill="{c}" class="pulse"/>' + txt(x + 130, 150, str(i+1), "h", fill="#fff")
        b += txt(x + 130, 230, t, "t") + txt(x + 130, 256, s, "s")
        b += '</g>'
    b += txt(450, 300, "Every door checks the wristband — not just the front door.", "s")
    svg("zero-trust", W, H, b, "Zero Trust principles: verify explicitly, least privilege, assume breach")

def arm_flow():
    W, H = 900, 300
    b = heading(W, "AZURE RESOURCE MANAGER", "Every request goes through the same front desk")
    tools = ["Portal", "CLI", "PowerShell", "Bicep / ARM", "SDKs"]
    for i, t in enumerate(tools):
        b += box(40, 90 + i * 40, 150, 32, t, rx=8)
        b += arrow(190, 106 + i * 40, 348, 175)
    b += box(350, 130, 200, 90, "Azure Resource Manager", "auth · RBAC · policy · locks", fill=VIOLET, stroke=VIOLET, tcolor="#fff", cls="pulse")
    b += arrow(550, 175, 660, 175)
    b += box(662, 120, 200, 110, "Resource providers", "Compute · Storage · Network …")
    svg("arm-flow", W, H, b, "Azure Resource Manager receives all requests from portal, CLI, PowerShell, templates and SDKs")

def az104_weights():
    W, H = 900, 360
    b = heading(W, "AZ-104 · SKILLS AS OF APRIL 17, 2026", "Where the exam points are")
    data = [("Identities & governance", 20, 25, VIOLET), ("Storage", 15, 20, TEAL), ("Compute", 20, 25, BLUE),
            ("Virtual networking", 15, 20, GOLD), ("Monitor & maintain", 10, 15, ORANGE)]
    x0, scale = 290, 17
    for i, (n, lo, hi, c) in enumerate(data):
        y = 100 + i * 46
        b += txt(270, y + 14, n, "t", anchor="end")
        b += f'<rect x="{x0}" y="{y}" width="{hi*scale}" height="28" rx="6" fill="{c}" opacity=".25"/>'
        b += f'<rect x="{x0}" y="{y}" width="{lo*scale}" height="28" rx="6" fill="{c}"/>'
        b += txt(x0 + hi*scale + 12, y + 14, f"{lo}–{hi}%", "t", anchor="start")
    for v in (0, 10, 20, 30):
        b += f'<line x1="{x0+v*scale}" y1="94" x2="{x0+v*scale}" y2="336" stroke="{LINE}"/>' + txt(x0 + v*scale, 346, f"{v}%", "s")
    svg("az104-weights", W, H, b, "AZ-104 exam domain weights as ranges")

def rbac_scope():
    W, H = 900, 340
    b = heading(W, "AZURE RBAC", "Who + what + where = access (and it flows down)")
    scopes = [("Management group", VIOLET), ("Subscription", BLUE), ("Resource group", TEAL), ("Resource", GOLD)]
    for i, (s, c) in enumerate(scopes):
        x = 40 + i * 50; y = 92 + i * 52; w = 820 - i * 100
        b += f'<rect x="{x}" y="{y}" width="{w}" height="{230 - i*52}" rx="14" fill="{c}" opacity=".10" stroke="{c}"/>'
        b += txt(x + 16, y + 20, s, "k", anchor="start", fill=c)
    b += box(560, 250, 260, 56, "Role assignment", "principal · role · scope", fill=INK, stroke=INK, tcolor="#fff", cls="pulse")
    svg("rbac-scope", W, H, b, "RBAC scopes nested from management group to resource with inheritance")

def hub_spoke():
    W, H = 900, 380
    b = heading(W, "TOPOLOGY", "Hub-and-spoke: shared services in the middle")
    b += f'<g class="pulse"><circle cx="450" cy="215" r="88" fill="{BLUE}"/></g>'
    b += txt(450, 195, "Hub VNet", "t", fill="#fff") + txt(450, 220, "Firewall · Bastion", "s", fill="#e8eeff") + txt(450, 240, "VPN / ExpressRoute", "s", fill="#e8eeff")
    spokes = [(150, 140, "Spoke: Web"), (150, 300, "Spoke: Data"), (750, 140, "Spoke: Apps"), (750, 300, "Spoke: Dev")]
    for x, y, l in spokes:
        b += arrow(450 + (x - 450) * 0.42, 215 + (y - 215) * 0.42, x + (60 if x < 450 else -60), y, label=None)
        b += box(x - 90 if x < 450 else x - 30, y - 30, 120, 60, l, "peered", rx=10)
    b += txt(450, 355, "Peering is non-transitive: spokes talk through the hub's firewall.", "s")
    svg("hub-spoke", W, H, b, "Hub and spoke network with shared firewall and gateways in the hub")

def monitor_flow():
    W, H = 900, 320
    b = heading(W, "WATCH ACTIVITY", "Signals in, decisions out")
    srcs = ["Metrics", "Activity log", "Resource logs", "Sign-in logs", "App telemetry"]
    for i, s in enumerate(srcs):
        b += box(40, 88 + i * 42, 160, 34, s, rx=8)
        b += arrow(200, 105 + i * 42, 330, 190)
    b += box(332, 140, 210, 100, "Log Analytics", "KQL · Sentinel · Insights", fill=TEAL, stroke=TEAL, tcolor="#fff", cls="pulse")
    outs = [("Alert rule", "condition"), ("Action group", "email · SMS · webhook"), ("Workbook / dashboard", "see it")]
    for i, (o, s) in enumerate(outs):
        b += arrow(542, 190, 640, 110 + i * 75)
        b += box(642, 84 + i * 75, 220, 54, o, s)
    svg("monitor-flow", W, H, b, "Monitoring data flowing into Log Analytics then alerts, action groups and dashboards")

def landing_zone():
    W, H = 900, 400
    b = heading(W, "CLOUD ADOPTION FRAMEWORK", "Azure landing zone management groups")
    b += box(340, 86, 220, 46, "Tenant root group", fill=INK, stroke=INK, tcolor="#fff")
    b += arrow(450, 132, 450, 158)
    b += box(340, 160, 220, 46, "Organization", fill=VIOLET, stroke=VIOLET, tcolor="#fff")
    kids = [("Platform", BLUE, ["Identity", "Management", "Connectivity"]), ("Landing zones", TEAL, ["Corp", "Online"]),
            ("Sandbox", GOLD, []), ("Decommissioned", MUTED, [])]
    for i, (k, c, subs) in enumerate(kids):
        x = 40 + i * 210
        b += arrow(450, 206, x + 95, 236)
        b += box(x, 238, 190, 44, k, fill=c, stroke=c, tcolor="#fff")
        for j, s in enumerate(subs):
            b += box(x + 10, 296 + j * 32, 170, 26, s, rx=6)
    svg("landing-zone", W, H, b, "CAF landing zone management group hierarchy")

def compute_decision():
    W, H = 900, 400
    b = heading(W, "ARCHITECT'S SHORTCUT", "Choosing Azure compute")
    qs = [("Need full OS control?", "VMs / VM Scale Sets"), ("Containers?", "Container Apps (or AKS for full K8s)"),
          ("Web app or API?", "App Service"), ("Event-driven, short code?", "Azure Functions"), ("Huge parallel batch?", "Azure Batch")]
    for i, (q, a) in enumerate(qs):
        y = 92 + i * 58
        b += box(60, y, 320, 44, q, rx=22)
        b += arrow(380, y + 22, 498, y + 22, label="yes")
        b += box(500, y, 340, 44, a, fill=BLUE if i % 2 == 0 else TEAL, stroke="none", tcolor="#fff")
        if i < len(qs) - 1:
            b += arrow(220, y + 44, 220, y + 56, flow=False)
    svg("compute-decision", W, H, b, "Decision tree for choosing Azure compute services")

def lb_choice():
    W, H = 900, 340
    b = heading(W, "TRAFFIC", "Which load balancer?")
    rows = [("Azure Load Balancer", "Layer 4 · regional · TCP/UDP"), ("Application Gateway + WAF", "Layer 7 · regional · path routing"),
            ("Azure Front Door", "Layer 7 · global · CDN + WAF"), ("Traffic Manager", "DNS · global · any protocol")]
    for i, (n, d) in enumerate(rows):
        x = 40 + (i % 2) * 420; y = 92 + (i // 2) * 110
        c = [BLUE, TEAL, VIOLET, GOLD][i]
        b += f'<rect x="{x}" y="{y}" width="400" height="90" rx="14" fill="{c}" opacity=".12"/>'
        b += f'<circle cx="{x+40}" cy="{y+45}" r="18" fill="{c}" class="pulse"/>'
        b += txt(x + 72, y + 34, n, "t", anchor="start") + txt(x + 72, y + 58, d, "s", anchor="start")
    svg("lb-choice", W, H, b, "Comparison of Azure Load Balancer, Application Gateway, Front Door and Traffic Manager")

def responsible_ai():
    W, H = 900, 380
    b = heading(W, "MICROSOFT RESPONSIBLE AI", "Six principles")
    ps = [("Fairness", BLUE), ("Reliability & safety", TEAL), ("Privacy & security", VIOLET),
          ("Inclusiveness", GOLD), ("Transparency", PINK), ("Accountability", ORANGE)]
    import math
    cx, cy, r = 450, 225, 120
    for i, (p, c) in enumerate(ps):
        a = -math.pi / 2 + i * 2 * math.pi / 6
        x, y = cx + math.cos(a) * 260, cy + math.sin(a) * 125
        b += f'<line x1="{cx}" y1="{cy}" x2="{x}" y2="{y}" stroke="{c}" stroke-width="2" class="flow"/>'
        b += box(x - 95, y - 22, 190, 44, p, fill=c, stroke=c, tcolor="#fff", rx=22)
    b += f'<circle cx="{cx}" cy="{cy}" r="58" fill="{INK}"/>' + txt(cx, cy - 9, "Trustworthy", "t", fill="#fff") + txt(cx, cy + 12, "AI", "t", fill="#fff")
    svg("responsible-ai", W, H, b, "Six Microsoft responsible AI principles around trustworthy AI")

def llm_flow():
    W, H = 900, 300
    b = heading(W, "HOW AI ANSWERS", "Predict the next piece, again and again")
    steps = [("Your prompt", "words in"), ("Tokens", "chopped into pieces"), ("Model", "patterns from training"),
             ("Next-token guess", "most likely piece"), ("Answer", "words out")]
    for i, (t, s) in enumerate(steps):
        x = 30 + i * 172
        fill = PINK if i == 2 else SOFT
        b += box(x, 120, 150, 80, t, s, fill=fill, stroke=PINK if i == 2 else LINE, tcolor="#fff" if i == 2 else None, cls="pulse" if i == 2 else "")
        if i < 4:
            b += arrow(x + 150, 160, x + 170, 160)
    b += f'<path d="M 677 205 C 677 250, 461 250, 461 205" fill="none" stroke="{PINK}" stroke-width="2" class="flow" marker-end="url(#ah)"/>'
    b += txt(569, 262, "repeat until done · grounding adds trusted facts", "s")
    svg("llm-flow", W, H, b, "How a language model generates an answer token by token")

def agent_loop():
    W, H = 900, 360
    b = heading(W, "AGENTS", "Think, act, check — with only the keys you allow")
    b += box(370, 140, 160, 80, "Agent", "model + instructions", fill=PINK, stroke=PINK, tcolor="#fff", cls="pulse")
    nodes = [(120, 110, "User goal"), (120, 250, "Reply"), (700, 90, "File search"), (700, 170, "Function / API"), (700, 250, "Code interpreter")]
    for x, y, l in nodes:
        b += box(x - 80, y - 24, 160, 48, l, rx=10)
    b += arrow(200, 110, 368, 165) + arrow(368, 200, 200, 250)
    for y in (90, 170, 250):
        b += arrow(530, 180, 618, y)
    b += box(440, 302, 420, 40, "Human approval before actions that send, buy or delete", fill=GOLD, stroke=GOLD, rx=10)
    svg("agent-loop", W, H, b, "An AI agent loop calling tools with human approval for consequential actions")

def recipe_prompt():
    W, H = 900, 300
    b = heading(W, "DCT PROMPT CARD", "R.E.C.I.P.E.")
    parts = [("R", "Role"), ("E", "Explain task"), ("C", "Context"), ("I", "Instructions"), ("P", "Presentation"), ("E", "Evaluate & edit")]
    cols = [BLUE, TEAL, VIOLET, GOLD, PINK, ORANGE]
    for i, (l, w) in enumerate(parts):
        x = 40 + i * 140
        b += f'<g style="animation-delay:{i*0.12}s"><rect x="{x}" y="100" width="124" height="150" rx="16" fill="{cols[i]}"/>'
        b += txt(x + 62, 155, l, "h", fill="#fff") + txt(x + 62, 205, w, "t", fill="#fff") + '</g>'
    svg("recipe-prompt", W, H, b, "The RECIPE prompt method: role, explain, context, instructions, presentation, evaluate")

def fact_check():
    W, H = 900, 280
    b = heading(W, "THE 2-MINUTE FACT CHECK", "Before you trust it, check it")
    steps = [("Stop", "Does it matter?"), ("Source", "Open the links yourself"), ("Second opinion", ".gov · bank · hospital"), ("Ask a human", "doctor · lawyer · banker")]
    for i, (t, s) in enumerate(steps):
        x = 40 + i * 212
        b += box(x, 110, 190, 100, t, s, fill=[RED, GOLD, BLUE, GREEN][i], stroke="none", tcolor="#fff")
        if i < 3:
            b += arrow(x + 190, 160, x + 210, 160)
    svg("fact-check", W, H, b, "Four-step two-minute fact check for AI answers")

def three_controls():
    W, H = 900, 300
    b = heading(W, "CLOUD SECURITY", "Three practical controls")
    items = [("01", "Verify sign-in", "MFA · passkeys · Conditional Access"), ("02", "Limit access", "least privilege · PIM · segmentation"), ("03", "Watch activity", "logs · alerts · secure score")]
    for i, (n, t, s) in enumerate(items):
        x = 40 + i * 280
        c = [BLUE, TEAL, ORANGE][i]
        b += f'<rect x="{x}" y="96" width="260" height="170" rx="18" fill="{c}" opacity=".1" stroke="{c}"/>'
        b += txt(x + 24, 130, n, "h", anchor="start", fill=c) + txt(x + 24, 175, t, "t", anchor="start") + txt(x + 24, 200, s, "s", anchor="start")
        b += f'<circle cx="{x+222}" cy="130" r="12" fill="{c}" class="pulse"/>'
    svg("three-controls", W, H, b, "Three cloud security controls: verify sign-in, limit access, watch activity")

def conditional_access():
    W, H = 900, 320
    b = heading(W, "CONDITIONAL ACCESS", "IF these signals… THEN this decision")
    sig = ["User / group", "App", "Location", "Device state", "Risk"]
    for i, s in enumerate(sig):
        b += box(40, 88 + i * 42, 170, 34, s, rx=8)
        b += arrow(210, 105 + i * 42, 360, 190)
    b += box(362, 145, 180, 90, "Policy engine", "evaluated at sign-in", fill=BLUE, stroke=BLUE, tcolor="#fff", cls="pulse")
    outs = [("Allow", GREEN), ("Require MFA / passkey", GOLD), ("Require compliant device", VIOLET), ("Block", RED)]
    for i, (o, c) in enumerate(outs):
        b += arrow(542, 190, 640, 100 + i * 58)
        b += box(642, 78 + i * 58, 220, 44, o, fill=c, stroke=c, tcolor="#fff")
    svg("conditional-access", W, H, b, "Conditional Access signals feeding a decision to allow, require MFA, require a compliant device or block")

def four_pillars():
    W, H = 900, 330
    b = heading(W, "DCT GOVERNING PRINCIPLE", "Four pillars in every program")
    ps = [("Governance", "who owns & approves"), ("Compliance", "rules that already apply"), ("Human oversight", "a person confirms"), ("Morale & trust", "people stay engaged")]
    b += f'<rect x="60" y="88" width="780" height="26" rx="8" fill="{INK}"/>' + txt(450, 101, "RESPONSIBLE USE OF CLOUD + AI", "k", fill="#fff")
    for i, (t, s) in enumerate(ps):
        x = 80 + i * 192
        c = [VIOLET, BLUE, PINK, GOLD][i]
        b += f'<g style="animation-delay:{i*0.15}s"><rect x="{x}" y="124" width="164" height="150" rx="10" fill="{c}"/>'
        b += txt(x + 82, 180, t, "t", fill="#fff") + txt(x + 82, 210, s, "s", fill="#fff") + '</g>'
    b += f'<rect x="60" y="284" width="780" height="20" rx="6" fill="{LINE}"/>' + txt(450, 294, "foundation: technical skill", "s")
    svg("four-pillars", W, H, b, "Four pillars: governance, compliance, human oversight, morale and trust")

def nist_ai_rmf():
    W, H = 900, 410
    b = heading(W, "NIST AI RMF 1.0", "Govern at the center; Map, Measure, Manage around it")
    b += f'<circle cx="450" cy="225" r="64" fill="{INK}" class="pulse"/>' + txt(450, 215, "GOVERN", "t", fill="#fff") + txt(450, 238, "culture · roles", "s", fill="#cfd8f5")
    for i, (t, s, c, x, y) in enumerate([("MAP", "context", BLUE, 200, 160), ("MEASURE", "test & track", TEAL, 700, 160), ("MANAGE", "act & monitor", ORANGE, 450, 330)]):
        b += f'<circle cx="{x}" cy="{y}" r="52" fill="{c}"/>' + txt(x, y - 8, t, "t", fill="#fff") + txt(x, y + 14, s, "s", fill="#fff")
    b += f'<path d="M 252 160 Q 450 90 648 160" fill="none" stroke="{MUTED}" stroke-width="2" class="flow" marker-end="url(#ah)"/>'
    b += f'<path d="M 690 210 Q 640 320 502 330" fill="none" stroke="{MUTED}" stroke-width="2" class="flow" marker-end="url(#ah)"/>'
    b += f'<path d="M 398 330 Q 240 320 205 212" fill="none" stroke="{MUTED}" stroke-width="2" class="flow" marker-end="url(#ah)"/>'
    svg("nist-ai-rmf", W, H, b, "NIST AI Risk Management Framework functions: govern, map, measure, manage")

def scam_formula():
    W, H = 900, 260
    b = heading(W, "SPOT THE TRICK", "The scam formula")
    parts = [("Urgency", "act now!", GOLD), ("Emotion", "fear · love · greed", PINK), ("Unusual payment", "gift cards · crypto · wires", VIOLET)]
    for i, (t, s, c) in enumerate(parts):
        x = 40 + i * 230
        b += box(x, 110, 190, 90, t, s, fill=c, stroke=c, tcolor="#fff")
        b += txt(x + 210, 155, "+" if i < 2 else "=", "h")
    b += f'<g class="pulse"><rect x="730" y="110" width="130" height="90" rx="14" fill="{RED}"/>' + txt(795, 155, "STOP", "h", fill="#fff") + '</g>'
    svg("scam-formula", W, H, b, "Scam formula: urgency plus emotion plus unusual payment equals stop")

def recovery_plan():
    W, H = 900, 300
    b = heading(W, "BOUNCE BACK", "If something already happened")
    steps = ["Stop &\nbreathe", "Call your\nbank", "Change\npasswords", "Freeze\ncredit", "Report", "Tell someone\nyou trust"]
    for i, s in enumerate(steps):
        x = 40 + i * 140
        c = [INK, BLUE, TEAL, VIOLET, ORANGE, GREEN][i]
        b += f'<circle cx="{x+60}" cy="140" r="26" fill="{c}"/>' + txt(x + 60, 140, str(i + 1), "t", fill="#fff")
        b += txt(x + 60, 210, s, "t")
        if i < 5:
            b += arrow(x + 88, 140, x + 172, 140)
    b += txt(450, 268, "ReportFraud.ftc.gov · IdentityTheft.gov · ic3.gov", "s")
    svg("recovery-plan", W, H, b, "Six recovery steps after a scam or hack")

# ---------------------------------------------------------------- covers

COVERS = [
    ("cover-cloud101", "DCT-101", "Cloud Fundamentals 101", "Self-paced starter", _T["prog-cloud"], "cloud"),
    ("cover-az900", "AZ-900", "Azure Fundamentals", "The language layer", _T["prog-cloud"], "grid"),
    ("cover-az104", "AZ-104", "Azure Administrator", "The operator layer", TEAL, "net"),
    ("cover-az305", "AZ-305", "Solutions Architect", "The decision layer", VIOLET, "blueprint"),
    ("cover-ai901", "AI-901", "Azure AI Fundamentals", "Build with Foundry", PINK, "neural"),
    ("cover-everyday-ai", "EVERYDAY AI", "AI Fundamentals", "Judgment intact", PINK, "spark"),
    ("cover-cloud-security", "CLOUD SEC", "Verify · Limit · Watch", "SC-900 prep", TEAL, "shield"),
    ("cover-ai-security", "AI GOV", "AI Security & Governance", "Human in the loop", ORANGE, "loop"),
    ("cover-cyber-basics", "CYBER", "Stay Safer Online", "For every age", TEAL, "lock"),
]

def motif(kind, c):
    import math, random
    random.seed(kind)
    out = ""
    if kind in ("cloud", "grid"):
        for i in range(9):
            for j in range(5):
                out += f'<circle cx="{420+i*48}" cy="{40+j*48}" r="{3+((i+j)%3)*3}" fill="#fff" opacity="{.15+((i*j)%4)*.1:.2f}"/>'
    elif kind == "net":
        pts = [(random.randint(400, 830), random.randint(30, 260)) for _ in range(14)]
        for a in pts:
            for bpt in pts:
                if a < bpt and abs(a[0]-bpt[0]) + abs(a[1]-bpt[1]) < 170:
                    out += f'<line x1="{a[0]}" y1="{a[1]}" x2="{bpt[0]}" y2="{bpt[1]}" stroke="#fff" opacity=".35" class="flow"/>'
        out += "".join(f'<circle cx="{x}" cy="{y}" r="6" fill="#fff" class="pulse"/>' for x, y in pts)
    elif kind == "blueprint":
        for i in range(0, 480, 24):
            out += f'<line x1="{400+i}" y1="0" x2="{400+i}" y2="300" stroke="#fff" opacity=".12"/>'
        for j in range(0, 300, 24):
            out += f'<line x1="400" y1="{j}" x2="880" y2="{j}" stroke="#fff" opacity=".12"/>'
        out += '<rect x="520" y="70" width="240" height="160" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/><rect x="560" y="110" width="70" height="50" fill="none" stroke="#fff" opacity=".8"/><rect x="650" y="110" width="70" height="80" fill="none" stroke="#fff" opacity=".8"/>'
    elif kind == "neural":
        layers = [3, 5, 5, 2]
        nodes = []
        for li, n in enumerate(layers):
            for k in range(n):
                nodes.append((480 + li * 110, 150 + (k - (n-1)/2) * 46, li))
        for a in nodes:
            for bpt in nodes:
                if bpt[2] == a[2] + 1:
                    out += f'<line x1="{a[0]}" y1="{a[1]}" x2="{bpt[0]}" y2="{bpt[1]}" stroke="#fff" opacity=".3"/>'
        out += "".join(f'<circle cx="{x}" cy="{y}" r="9" fill="#fff" class="pulse" style="animation-delay:{(i%5)*0.3}s"/>' for i, (x, y, _) in enumerate(nodes))
    elif kind == "spark":
        for i in range(12):
            a = i * math.pi / 6
            out += f'<line x1="650" y1="150" x2="{650+math.cos(a)*120:.0f}" y2="{150+math.sin(a)*120:.0f}" stroke="#fff" stroke-width="{3 if i%2 else 6}" stroke-linecap="round" opacity=".6"/>'
        out += '<circle cx="650" cy="150" r="34" fill="#fff" class="pulse"/>'
    elif kind == "shield":
        out += '<path d="M650 40 L760 80 L760 160 C760 220 700 255 650 270 C600 255 540 220 540 160 L540 80 Z" fill="none" stroke="#fff" stroke-width="5" opacity=".85"/>'
        out += '<path d="M600 155 L640 195 L710 120" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" class="flow"/>'
    elif kind == "loop":
        out += '<circle cx="650" cy="150" r="95" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="14 10" class="flow" opacity=".8"/>'
        for i, l in enumerate(["CHECK", "REVIEW", "DECIDE"]):
            a = -math.pi/2 + i * 2*math.pi/3
            x, y = 650 + math.cos(a)*95, 150 + math.sin(a)*95
            out += f'<circle cx="{x:.0f}" cy="{y:.0f}" r="26" fill="#fff"/><text x="{x:.0f}" y="{y+4:.0f}" text-anchor="middle" style="font-size:9px;font-weight:800;fill:{c}">{l}</text>'
    elif kind == "lock":
        out += '<rect x="590" y="130" width="120" height="100" rx="14" fill="none" stroke="#fff" stroke-width="6"/><path d="M615 130 V100 a35 35 0 0 1 70 0 V130" fill="none" stroke="#fff" stroke-width="6"/>'
        out += '<circle cx="650" cy="175" r="10" fill="#fff" class="pulse"/>'
    return out

def cover(name, code, title, sub, c, kind):
    W, H = 900, 300
    b = (f'<defs><linearGradient id="g_{name}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{INK}"/>'
         f'<stop offset="1" stop-color="{c}"/></linearGradient></defs>'
         f'<rect x="0" y="0" width="{W}" height="{H}" rx="18" fill="url(#g_{name})"/>')
    b += motif(kind, c)
    b += f'<rect x="40" y="44" width="{len(code)*11+28}" height="30" rx="15" fill="{c}"/>' + txt(54, 60, code, "k", anchor="start", fill="#fff")
    fs = min(40, int(720 / max(len(title), 1)))
    b += f'<text x="40" y="140" style="font-family:{FONT};font-size:{fs}px;font-weight:800;fill:#fff">{esc(title)}</text>'
    b += f'<text x="40" y="182" style="font-family:{FONT};font-size:18px;fill:#dbe4ff">{esc(sub)}</text>'
    b += f'<text x="40" y="258" style="font-family:{FONT};font-size:12px;letter-spacing:2px;font-weight:700;fill:#ffffffb3">THE DOPE CLOUD TEACHER</text>'
    svg(name, W, H, b, f"{title} course cover")

for fn in [service_models, shared_responsibility, static_website, azure_hierarchy, vnet_basics, zero_trust, arm_flow,
           az104_weights, rbac_scope, hub_spoke, monitor_flow, landing_zone, compute_decision, lb_choice, responsible_ai,
           llm_flow, agent_loop, recipe_prompt, fact_check, three_controls, conditional_access, four_pillars, nist_ai_rmf,
           scam_formula, recovery_plan]:
    fn()
for args in COVERS:
    cover(*args)
print("wrote", len(os.listdir(OUT)), "svgs to", OUT)
