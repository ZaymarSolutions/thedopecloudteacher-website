# DCT Agent Automation Guide

## What Was Added
- Custom agent: [.github/agents/dct-growth-operator.agent.md](.github/agents/dct-growth-operator.agent.md)
- Daily prompt: [.github/prompts/daily-growth-run.prompt.md](.github/prompts/daily-growth-run.prompt.md)
- Daily automation runner: [scripts/daily-growth-ops.cjs](scripts/daily-growth-ops.cjs)
- PowerShell wrapper: [scripts/run-daily-growth-ops.ps1](scripts/run-daily-growth-ops.ps1)
- Task scheduler installer: [scripts/install-daily-growth-task.ps1](scripts/install-daily-growth-task.ps1)

## What This Handles Daily
- QA scan (metadata gaps, analytics loader gaps, internal link issues)
- Content draft generation (blog, class update, product/service ideas, marketing copy)
- Daily report generation with actions to publish

## Where Outputs Go
- Daily report: [reports/daily-ops](reports/daily-ops)
- Daily drafts: [drafts](drafts)

## Run Manually Anytime
```powershell
./scripts/run-daily-growth-ops.ps1
```

## Scheduled Daily Run
Installed task name:
- DCT-Daily-Growth-Ops

Default run time:
- 07:30 local time

To reinstall at a different time:
```powershell
./scripts/install-daily-growth-task.ps1 -TaskName "DCT-Daily-Growth-Ops" -RunTime "08:15"
```

## Use the Agent in Chat
1. Open Copilot Chat in this workspace.
2. Select agent: DCT Growth Operator.
3. Run prompt: /Daily Growth Run
4. Optional argument examples:
- Gumroad conversion
- SEO cleanup
- AZ-900 promotion week

## Recommended Owner Review (5-10 minutes/day)
- Open the latest report in [reports/daily-ops](reports/daily-ops)
- Approve one draft for publish from [drafts](drafts)
- Approve one correction batch for site updates

## Important Limits
- Promotion posting to external platforms still needs your connected platform credentials and approvals.
- The automation generates high-quality drafts and action plans; publication can be semi-automated once API credentials are connected.
