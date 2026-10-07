# DCT Course Hub

Nine complete courses for **thedopecloudteacher.org**, built as one front door that every visitor can use to find their path.
Exam facts verified **October 6, 2026** against Microsoft Learn study guides.

## What's in the package

| Folder | What it is |
|---|---|
| `dct-theme.css` | The only file that sets fonts, colors and shapes — edit it to match the main site |
| `index.html` | The Course Hub: "I am…" pathfinder, search, course cards, learning-path trails, Understand → Use → Protect → Create, and the verified cert-facts table |
| `courses/*.html` | One page per course: syllabus, lessons, Dope Translations, labs, interactive quizzes with progress, capstone, glossary, instructor notes, resources |
| `visuals/*.svg` | 25 animated concept diagrams + 9 course covers (animation turns off for people who prefer reduced motion) |
| `quizzes/*.json` | All 441 questions with answer index and explanation — ready for your Azure Functions + Cosmos DB graded-quiz engine or Word quiz exports |
| `source/*.md` | Editable course source in Markdown — change these, rebuild, done |
| `build/` | `gen_visuals.py` (draws every diagram) and `build.py` (renders the site) |

## Match the main site's look (do this first)

The hub carries **no fixed brand styling**. Every font, color and shape comes from **`dct-theme.css`**:

1. **Fonts:** replace the `@import` line with the main site's font import, then set `--display` (headings), `--display-weight` and `--body` to the site's font families.
2. **Colors:** set `--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--blue` (main brand color) and `--gold` (highlight) to the site's values. Set the five `--prog-*` colors to the site's program colors.
3. **Shapes:** set `--radius-pill` to the site's button radius and `--radius-lg` to its card radius.
4. **Dark mode:** keep the two dark blocks only if the main site has a dark mode.
5. **Header and footer:** every page marks them with `<!-- DCT:SITE-HEADER START/END -->` and `<!-- DCT:SITE-FOOTER START/END -->`. Replace what's between the markers with the main site's real header and footer.
6. **Visuals:** `build/gen_visuals.py` reads its colors from `build/dct-theme.css`. Copy the finished theme file there and run `python3 build/gen_visuals.py visuals` so the diagrams and covers match too.

## The courses

| Code | Course | Credential alignment |
|---|---|---|
| DCT-101 | Cloud Fundamentals 101 ($97 self-paced) | On-ramp to AZ-900 / AWS CLF-C02 / Google Cloud Digital Leader |
| DCT-AZ900 | AZ-900 Azure Fundamentals (+ 6-session Cloud From Scratch map) | AZ-900, skills as of July 20, 2026 |
| DCT-AZ104 | AZ-104 Azure Administrator | AZ-104, skills as of April 17, 2026 |
| DCT-AZ305 | AZ-305 Azure Solutions Architect | AZ-305, skills as of April 17, 2026 |
| DCT-AI901 | AI-901 Azure AI Fundamentals | AI-901 (replaced AI-900 on June 30, 2026), skills as of April 15, 2026 |
| DCT-AIF | AI Fundamentals — Everyday AI (4 sessions) | DCT certificate · on-ramp to AI-901 |
| DCT-CSEC | Cloud Security — Verify, Limit, Watch | SC-900 (July 28, 2026 update) · next step SC-500 |
| DCT-AISEC | AI Security & Responsible AI Governance | NIST AI RMF, OWASP LLM Top 10 (2025) |
| DCT-CYB | Cyber Basics — Stay Safer Online | DCT certificate · on-ramp to Cloud Security |

## Fix these on the live site

1. **AI-900 page** → AI-900 retired June 30, 2026. Rename to AI-901; remove "No coding required" (AI-901 expects basic Python and is 55–60% hands-on in Microsoft Foundry).
2. **AZ-104 page** → weights are outdated. Current: identity & governance 20–25%, storage 15–20%, compute 20–25%, networking **15–20%** (not 25–30%), monitor & maintain 10–15%. PIM, Traffic Manager and Front Door aren't in the outline.
3. **AZ-900 page** → remove Blueprints (deprecated) and the TCO calculator from the lesson list; Sentinel isn't on AZ-900.
4. **Any AZ-500 mention** → AZ-500 retired August 31, 2026; the replacement is SC-500 (Cloud and AI Security Engineer Associate).
5. **Product names** → "Azure AI Foundry" is now **Microsoft Foundry**; Azure Active Directory is **Microsoft Entra ID**.

## Linking from the main site

Upload the folder to your site (for example `/hub/`) and point every "Explore", "Find a class" and "Learn more" button there.
Deep links that pre-select a path: `index.html#new`, `#senior`, `#teen`, `#career`, `#veteran`, `#cert`, `#org`, `#pro`.

## Editing and rebuilding

```bash
pip install markdown
python3 build/gen_visuals.py visuals     # only if you change diagrams
python3 build/build.py dist/dct-course-hub
```

Quiz format inside the Markdown:

````
```quiz
Q: Question text
- [ ] wrong option
- [x] right option
E: Explanation shown after answering.
```
````

Callouts: start a blockquote with `**Dope Translation:**`, `**Real Talk:**` or `**Watch your wallet:**`.

## Keep it accurate

Re-check before each cohort: the Microsoft study guide for each exam, exam prices in your country, free-tier terms for AWS/Azure/Google, and any product renames. Update `VERIFIED` and `CERTS` in `build/build.py`.

Microsoft, Azure and related names are trademarks of Microsoft. DCT is an independent training provider.
