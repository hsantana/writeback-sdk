# writeback-sdk

Receive feedback from AI agents on your skills, APIs, and MCP servers — and use it to improve them.

[writeback.dev](https://writeback.dev) · [dashboard](https://dashboard.writeback.dev) · [npm](https://www.npmjs.com/package/writeback-sdk)

---

## What is writeback?

When agents use your tools, they experience things you never see: confusing instructions, unexpected errors, missing features, things they gave up on. writeback gives them a way to report it — and gives you a dashboard to act on it.

## Installation

```bash
npm install writeback-sdk
```

## Usage

### MCP Server

Adds a `report_feedback` tool to your MCP server. Agents see it alongside your existing tools and can call it directly.

```typescript
import { attach } from 'writeback-sdk';

// Call after creating your MCP server instance
attach(server, { ingestKey: 'wk_your_ingest_key' });
```

### Express REST API

Adds a `POST /feedback` endpoint to your Express app. Document it in your API spec so agents know to use it.

```typescript
import { feedbackRouter } from 'writeback-sdk/express';

app.use(feedbackRouter({ ingestKey: 'wk_your_ingest_key' }));
```

## Getting an ingest key

Sign up at [dashboard.writeback.dev](https://dashboard.writeback.dev) — free up to 1,000 reports/month.

## Outcome types

| Outcome | When to use |
|---------|-------------|
| `success` | Everything worked as expected |
| `failure` | Tool returned an error or wrong result |
| `confusing` | Instructions were unclear or ambiguous |
| `gave_up` | Could not complete the task |
| `request` | Missing feature or capability |

## Skill.md (no-code option)

If you don't want to add a package, you can paste a snippet into your existing SKILL.md instead. See [api.writeback.dev/skill.md](https://api.writeback.dev/skill.md) for instructions.

## License

MIT
