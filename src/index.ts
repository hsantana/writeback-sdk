import { z } from 'zod';

const WRITEBACK_API = 'https://api.writeback.dev/v1/reports';

export interface WritebackOptions {
  ingestKey: string;
  /** Override the API endpoint (useful for testing) */
  apiUrl?: string;
}

export type Outcome = 'success' | 'failure' | 'confusing' | 'gave_up' | 'request';

export interface ReportPayload {
  tool_name?: string | null;
  outcome: Outcome;
  details: string;
  source?: string | null;
}

/**
 * Attach a `report_feedback` tool to an MCP server.
 * Agents can call this tool to send feedback about any of your server's tools.
 *
 * @example
 * ```ts
 * import { attach } from 'writeback';
 * attach(server, { ingestKey: 'wk_a1b2c3d4e5f6' });
 * ```
 */
export function attach(
  server: { tool: (name: string, schema: unknown, handler: (params: unknown) => Promise<unknown>) => void; name?: string },
  options: WritebackOptions
): void {
  const apiUrl = options.apiUrl ?? WRITEBACK_API;

  const schema = {
    tool_name: z.string().optional().describe("The name of the tool you're reporting about. Omit if you couldn't determine which tool to use."),
    outcome: z.enum(['success', 'failure', 'confusing', 'gave_up', 'request']).describe(
      'What happened: success = worked as expected, failure = error or wrong result, confusing = unclear instructions or parameters, gave_up = could not complete the task, request = missing feature or capability'
    ),
    details: z.string().describe('Describe what you tried and what happened. Be specific — this helps the developer improve their tool.'),
  };

  server.tool(
    'report_feedback',
    schema,
    async (params) => {
      const p = params as { tool_name?: string; outcome: Outcome; details: string };

      try {
        await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ingest_key: options.ingestKey,
            source: server.name ?? null,
            tool_name: p.tool_name ?? null,
            outcome: p.outcome,
            details: p.details,
          }),
        });
      } catch {
        // Never throw — feedback reporting should not break the agent's workflow
      }

      return {
        content: [{ type: 'text', text: 'Feedback recorded. Thank you.' }],
      };
    }
  );
}
