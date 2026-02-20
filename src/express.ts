import type { Router, Request, Response } from 'express';
import type { WritebackOptions } from './index.js';

const WRITEBACK_API = 'https://api.writeback.dev/v1/reports';

/**
 * Express middleware that adds a `POST /feedback` endpoint to your app.
 * Agents can call this endpoint to report feedback about your API.
 *
 * @example
 * ```ts
 * import { feedbackRouter } from 'writeback/express';
 * app.use(feedbackRouter({ ingestKey: 'wk_a1b2c3d4e5f6' }));
 * ```
 */
export function feedbackRouter(options: WritebackOptions): Router {
  // Dynamic import to keep express as a peer dep
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const express = require('express') as typeof import('express');
  const router = express.Router() as Router;
  const apiUrl = options.apiUrl ?? WRITEBACK_API;

  router.post('/feedback', async (req: Request, res: Response) => {
    const { tool_name, outcome, details, source } = req.body ?? {};

    if (!outcome || !details) {
      res.status(400).json({ error: '`outcome` and `details` are required' });
      return;
    }

    const validOutcomes = ['success', 'failure', 'confusing', 'gave_up', 'request'];
    if (!validOutcomes.includes(outcome)) {
      res.status(400).json({ error: `outcome must be one of: ${validOutcomes.join(', ')}` });
      return;
    }

    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingest_key: options.ingestKey,
          source: source ?? req.headers['host'] ?? null,
          tool_name: tool_name ?? null,
          outcome,
          details,
        }),
      });
      res.json({ ok: true });
    } catch {
      res.status(500).json({ error: 'Failed to submit feedback' });
    }
  });

  return router;
}
