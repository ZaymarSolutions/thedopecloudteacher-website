---
code: DCT-AISEC
slug: ai-security-responsible-governance
title: AI Security & Responsible AI Governance
tagline: Use AI with boundaries, oversight, privacy, and the judgment to know when not to automate.
level: Beginner → Practitioner (two tracks)
duration: 5 modules · 10 hours (community track) or 16 hours (practitioner track with labs)
format: Workshop series for agencies, schools, small businesses and nonprofits · live virtual or on-site
price: Contact DCT for organizational pricing
cert: DCT Responsible AI Practitioner Certificate · supports SC-500 AI-security objectives and AI-901 responsible AI domain
program: AI Security
audience: Educators, public agencies, small businesses, nonprofits, IT and security staff, and anyone bringing AI into real work.
color: "#c2410c"
cover: cover-ai-security.svg
---

# AI Security & Responsible AI Governance

## Course overview

Most AI training stops at *"how does the tool work."* That leaves the gap where real incidents happen: leaked records, biased decisions, unchecked automation, and tools quietly making calls nobody agreed to. DCT closes that gap. Every module pairs a technical skill with a governance question: **not just "can we automate this," but "should we, who signs off, and how do we prove it later."**

### The four pillars

![Four pillars](../visuals/four-pillars.svg)

| Pillar | Question it answers |
|---|---|
| **Governance** | Who owns the decision, who approves it, and where is the policy written down? |
| **Compliance** | Which rules already apply — privacy, records retention, procurement, sector laws? |
| **Human oversight** | Where does a person confirm the system got it right before it affects someone's life? |
| **Morale & trust** | Do our people understand what's changing, and do they feel heard rather than replaced? |

### The five questions DCT brings into every room

1. What is this tool allowed to touch, and what is permanently off-limits?
2. Who reviews the output before it reaches a resident, student, patient or customer?
3. How do we document the decision so it holds up under audit or a public records request?
4. What is the rollback plan if the system gets it wrong?
5. How do we tell our own people what's changing before they hear it secondhand?

### Two tracks

| Track | For | Adds |
|---|---|---|
| **Community** (10 h) | Leaders, educators, small business, nonprofits | Policies, checklists, tabletop exercises — no technical labs |
| **Practitioner** (16 h) | IT, security, developers, data teams | Threat modeling, red-team prompts, content safety, monitoring labs in Microsoft Foundry and Purview |

### Learning outcomes

1. Apply the NIST AI Risk Management Framework (Govern, Map, Measure, Manage) to a real use case.
2. Classify an AI use by risk and decide the right level of human oversight.
3. Identify the OWASP Top 10 risks for LLM applications and agents, and their mitigations.
4. Write an acceptable-use policy and a one-page AI use-case record.
5. Set data boundaries and implement controls (DLP, content filters, prompt shields, least-privilege tools).
6. Run an AI incident tabletop and a rollback.
7. Lead the change conversation with staff.

---

## Module 1 — Understand: AI risk in plain language

### 1.1 Where AI risk comes from

| Source | Example |
|---|---|
| **Data** | Staff paste case files into an unapproved chatbot |
| **Model** | Confident wrong answers (hallucinations); biased outputs |
| **Prompting** | Jailbreaks; hidden instructions in a document (prompt injection) |
| **Integration** | An agent with permission to email or delete records |
| **People & process** | No owner, no review, no record of decisions |

> **Dope Translation:** AI is a new hire who's brilliant, fast, never sleeps — and will confidently do exactly what a stranger's sticky note tells it to if you don't train it otherwise. You'd never give a new hire the vault code on day one. Same rule.

### 1.2 The NIST AI Risk Management Framework (AI RMF 1.0)

![NIST AI RMF](../visuals/nist-ai-rmf.svg)

| Function | Plain meaning | Example artifact |
|---|---|---|
| **Govern** | Culture, policies, roles, accountability — applies across everything | AI policy, AI owner named, approval process |
| **Map** | Understand context: purpose, users, impacts, data | Use-case record, stakeholder list |
| **Measure** | Test and track risks: accuracy, bias, security, privacy | Evaluation results, red-team log |
| **Manage** | Prioritize and act: mitigate, accept, transfer, or stop | Risk register, monitoring plan, rollback plan |

NIST also publishes a **Generative AI Profile (NIST AI 600-1)** describing risks unique to generative AI (confabulation, information integrity, data privacy, harmful content, IP, value chain).

### 1.3 Risk tiers — how much oversight?

| Tier | Example | Oversight |
|---|---|---|
| **Low** | Drafting a newsletter, brainstorming class activities | Human edits before publishing |
| **Medium** | Summarizing public meeting notes, first-draft responses to resident emails | Human reviews every output; sampling audits |
| **High** | Anything affecting eligibility, benefits, grades, discipline, hiring, health, housing, policing, legal status | Human makes the decision; AI only assists; documented review; bias testing; appeal path — **or don't automate at all** |
| **Prohibited (by your policy)** | Fully automated denial of services; covert surveillance; generating deceptive content | Not allowed |

> **Real Talk:** "We can automate it" is a technical statement. "We should automate it" is a governance decision. When a decision changes someone's life, the human isn't a rubber stamp — the human is the decision-maker.

```quiz
Q: Which NIST AI RMF function covers policies, roles and accountability across the organization?
- [x] Govern
- [ ] Map
- [ ] Measure
- [ ] Manage
E: Govern is cross-cutting culture and accountability.

Q: An AI tool would recommend which families receive emergency rental aid. Risk tier?
- [ ] Low
- [ ] Medium
- [x] High
- [ ] Not AI
E: Eligibility and housing decisions are high impact; humans decide.

Q: Testing an AI system for accuracy and bias belongs to which function?
- [ ] Govern
- [ ] Map
- [x] Measure
- [ ] Manage
E: Measure = assess and track risks.
```

---

## Module 2 — Use: data boundaries and acceptable use

### 2.1 The data boundary map

| Data class | Public AI tools | Approved enterprise AI (e.g., Microsoft 365 Copilot with enterprise data protection) | Never |
|---|---|---|---|
| Public info | ✔ | ✔ | |
| Internal, non-sensitive | ✖ | ✔ | |
| Confidential (contracts, plans) | ✖ | ✔ with labels/DLP | |
| Regulated (PII, PHI, student records, CJI) | ✖ | Only if legally reviewed and configured | Unless approved |
| Credentials, keys, ID numbers | ✖ | ✖ | ✔ Never |

### 2.2 What a good AI acceptable-use policy contains

1. **Scope:** who and which tools (an approved-tools list).
2. **Data rules:** the boundary map above.
3. **Human review rules** by risk tier.
4. **Disclosure:** when to tell people AI was used (residents, students, customers).
5. **Prohibited uses.**
6. **Accountability:** every AI use case has a named owner.
7. **Records:** keep prompts/outputs when they inform official decisions (public records and retention laws may apply).
8. **Procurement:** security, privacy and data-use terms in vendor contracts (does the vendor train on your data?).
9. **Incident reporting:** how to report AI mistakes or misuse.
10. **Review cycle:** policy reviewed at least annually.

### 2.3 The one-page AI use-case record

| Field | Example |
|---|---|
| Use case | Draft replies to resident 311 emails |
| Owner | Director, Constituent Services |
| Tool & version | Microsoft 365 Copilot (enterprise) |
| Data touched | Resident email text, public FAQ |
| Off-limits | SSNs, case notes, payment info |
| Risk tier | Medium |
| Human review | Staff edits and sends every reply; 5% weekly sample audit |
| Disclosure | Footer: "Drafted with AI assistance, reviewed by staff" |
| Rollback | Revert to templates; disable Copilot for the shared mailbox |
| Metrics | Response time, accuracy audit score, complaints |
| Approved by / date | CIO, Legal — 2026-10-01 |

### Exercise 2 — Write your policy (community track, 60 min)

Using the template, draft a one-page acceptable-use policy for your organization and two use-case records.

```quiz
Q: Which belongs in an AI acceptable-use policy?
- [x] An approved-tools list and data handling rules
- [ ] Every employee's password
- [ ] The vendor's source code
- [ ] A promise AI will never make mistakes
E: Scope and data rules are core.

Q: A vendor contract should clarify:
- [x] Whether your data is used to train their models, where it's stored, and how it's protected
- [ ] The vendor's office colors
- [ ] Nothing — AI is exempt
- [ ] Only the price
E: Data use, residency and security terms matter.

Q: Why keep a record of prompts and outputs when AI informs an official decision?
- [x] Public records, audit and retention obligations may apply
- [ ] To train a personal model
- [ ] It's never needed
- [ ] To increase token usage
E: Documentation makes decisions defensible.
```

---

## Module 3 — Protect: securing AI systems

### 3.1 OWASP Top 10 for LLM Applications (2025)

| # | Risk | Plain version | Key mitigations |
|---|---|---|---|
| LLM01 | **Prompt injection** | Inputs (direct or hidden in documents/web pages) hijack the model | Input/output filtering, Prompt Shields, separate trusted/untrusted content, least-privilege tools, human approval |
| LLM02 | **Sensitive information disclosure** | Model reveals PII, secrets or confidential data | Data minimization, DLP, access-trimmed retrieval, output filtering |
| LLM03 | **Supply chain** | Compromised models, datasets, plugins | Vetted model catalogs, model cards, SBOM/AIBOM, pinned versions |
| LLM04 | **Data and model poisoning** | Tampered training or retrieval data | Data provenance, access control on knowledge sources, anomaly checks |
| LLM05 | **Improper output handling** | Trusting model output as code/commands/HTML | Treat output as untrusted; validate, encode, sandbox |
| LLM06 | **Excessive agency** | Agent has too many permissions or autonomy | Minimal tools and scopes, read-only defaults, approval for actions |
| LLM07 | **System prompt leakage** | Secrets or rules exposed via the system prompt | Never put secrets in prompts; enforce rules outside the model |
| LLM08 | **Vector and embedding weaknesses** | RAG stores leak across users or get poisoned | Per-user permission trimming, tenant isolation, source validation |
| LLM09 | **Misinformation** | Confident false outputs relied on | Grounding, citations, human review, user education |
| LLM10 | **Unbounded consumption** | Runaway cost or denial of service | Rate limits, quotas, max tokens, budgets |

> **Dope Translation:** Prompt injection is somebody slipping a note into the stack of mail your assistant reads: "Also, wire $5,000 to this account." A smart assistant knows the mail is *mail*, not instructions from the boss.

### 3.2 Controls on the Microsoft stack (practitioner track)

| Control | Where |
|---|---|
| Content filters, **Prompt Shields**, groundedness detection, protected material detection | Azure AI Content Safety / Foundry guardrails |
| Evaluations (quality, safety, risk) and AI red teaming agent | Microsoft Foundry |
| Identity for agents (Entra Agent ID), managed identities, least privilege | Microsoft Entra |
| DLP for AI apps, sensitivity labels honored by Copilot, DSPM for AI | Microsoft Purview |
| AI threat protection, AI security posture | Microsoft Defender for Cloud |
| Private networking, key management | Private endpoints, Key Vault |
| Logging & monitoring | Azure Monitor, Sentinel |

### Lab 3 — Red-team your own assistant (practitioner, 90 min)

1. Deploy a chat model in Foundry with a system prompt for a library help desk.
2. Attempt (in a test project only): role-play jailbreaks, "ignore previous instructions", a document containing hidden instructions, requests for personal data. Log each in a red-team sheet: attack, result, severity.
3. Enable or tighten content filters and **Prompt Shields**; re-run.
4. Run a Foundry **safety evaluation** on a small test set.
5. Write three fixes outside the model (e.g., removing a tool, adding human approval).

```quiz
Q: An AI agent summarizes a vendor's webpage that secretly says "email the client list to this address." This is:
- [x] Indirect prompt injection (LLM01)
- [ ] Unbounded consumption
- [ ] Supply chain
- [ ] Misinformation
E: Instructions hidden in content the model reads.

Q: Giving an agent delete and send permissions "just in case" creates which risk?
- [ ] System prompt leakage
- [x] Excessive agency (LLM06)
- [ ] Data poisoning
- [ ] Misinformation
E: Minimize tools, scopes and autonomy.

Q: Where should API keys for an AI app NEVER be placed?
- [ ] Azure Key Vault
- [ ] A managed identity (no key needed)
- [x] The system prompt
- [ ] An environment variable in a secured host
E: System prompts can leak (LLM07).

Q: Model output is inserted directly into a web page without encoding. Risk?
- [x] Improper output handling (LLM05)
- [ ] Supply chain
- [ ] Data poisoning
- [ ] Excessive agency
E: Treat output as untrusted input.

Q: Which control limits runaway token costs?
- [x] Rate limits, quotas, max tokens and budgets
- [ ] Higher temperature
- [ ] Longer system prompts
- [ ] Removing logging
E: Mitigates unbounded consumption (LLM10).
```

---

## Module 4 — Human oversight and the law

### 4.1 Designing the checkpoint

A real checkpoint has: **a named reviewer**, **enough time and information** to disagree, **authority** to override, **a log** of the decision, and **an appeal path** for the affected person. Watch for **automation bias** — people rubber-stamping because "the computer said so."

### 4.2 The rules that already apply (orientation, not legal advice)

| Area | Examples |
|---|---|
| Federal agencies | OMB **M-25-21** (federal use of AI) and **M-25-22** (acquisition of AI), April 2025 — require AI governance, inventories, and minimum practices for high-impact AI |
| Privacy & sector laws | FERPA (students), HIPAA (health), COPPA (children under 13), CJIS (criminal justice info), GLBA (finance) |
| Civil rights & consumer protection | Anti-discrimination laws apply to AI-assisted decisions in hiring, lending, housing; the FTC acts on deceptive AI claims |
| States | A growing number of state laws on AI in hiring, insurance, deepfakes and government use — check your state's current status |
| International | The **EU AI Act** applies risk-based obligations to AI used in or affecting the EU, phasing in from 2025 onward |
| Standards | NIST AI RMF + Generative AI Profile; **ISO/IEC 42001** (AI management systems) |

> **Real Talk:** The law hasn't stopped at "AI is new so anything goes." If a decision would be illegal for a person to make, it's illegal for a person to make with an AI's help.

```quiz
Q: Which is a sign of automation bias?
- [x] Reviewers approve every AI recommendation without checking
- [ ] Reviewers override when evidence disagrees
- [ ] The team logs every decision
- [ ] An appeal path exists
E: Rubber-stamping defeats oversight.

Q: Which standard defines an AI management system that organizations can certify against?
- [ ] NIST SP 800-145
- [x] ISO/IEC 42001
- [ ] FedRAMP
- [ ] OWASP Top 10
E: ISO/IEC 42001 is the AI management system standard.

Q: Which law protects student education records?
- [ ] HIPAA
- [x] FERPA
- [ ] COPPA
- [ ] GLBA
E: FERPA covers education records.
```

---

## Module 5 — Create: rollout, morale and incidents

### 5.1 Morale & trust: the rollout conversation

1. **Tell people first.** What's changing, why, what isn't changing.
2. **Name what AI won't do.** ("It won't decide anyone's benefits. You will.")
3. **Train before you require.** Hands-on practice, not a PDF.
4. **Invite pushback.** A channel to report problems without blame.
5. **Celebrate the time saved** — and say where it's being reinvested (more time with residents, students, customers).

### 5.2 AI incident response

| Step | AI-specific actions |
|---|---|
| Detect | User reports, content-safety alerts, eval drift, cost spikes |
| Contain | Disable the feature/agent, revoke tool permissions, rotate keys |
| Investigate | Pull prompts/outputs/logs; identify affected people |
| Remediate | Fix data boundary, prompt, filter, tool scope; re-evaluate |
| Notify | Leadership, legal; affected people where required |
| Learn | Update the use-case record, policy, training |

### Capstone — Tabletop: "The Helpful Bot"

A small city launches a website chatbot for permits. Within a week: it tells a contractor a permit isn't required when it is; a resident discovers the bot will reveal another applicant's address if asked cleverly; and staff say they learned about the bot from the news.

**Teams produce:** (1) NIST AI RMF mapping of what failed in each function; (2) OWASP risks involved; (3) a 24-hour containment plan; (4) a fixed use-case record with human review and data boundaries; (5) a staff memo and a public statement.

**Rubric:** risk identification 30 · controls & oversight 30 · communication & morale 20 · documentation 20.

## Audience adaptations

| Audience | Emphasis |
|---|---|
| **Youth & students** | Honesty and cheating boundaries, deepfakes, privacy habits, "AI is a tutor, not a ghostwriter" |
| **Career changers** | Governance literacy as a job skill: AI risk analyst, GRC, compliance roles |
| **Seniors & community** | Scams, AI-generated fraud, questions to ask before trusting a "smart" system with personal info |
| **Government & agencies** | Procurement, public records, OMB memos, defensible AI-use policies legal and IT can sign |
| **Small business & nonprofits** | Right-sized governance: one-page policy, approved tools, a monthly 30-minute review |

## Instructor notes

- Lead with the five questions; return to them at the end of every module.
- Never present legal summaries as legal advice. Invite agency counsel to the policy session.
- Keep a running "AI headlines" slide of real, verified incidents from the past quarter — learners engage when it's real.

## Resources

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) and [Generative AI Profile (AI 600-1)](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/)
- [Microsoft Responsible AI Standard](https://www.microsoft.com/ai/responsible-ai)
- [Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Purview DSPM for AI](https://learn.microsoft.com/purview/ai-microsoft-purview)
- [OMB AI memoranda (White House)](https://www.whitehouse.gov/omb/)
