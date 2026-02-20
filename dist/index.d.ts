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
export declare function attach(server: {
    tool: (name: string, schema: unknown, handler: (params: unknown) => Promise<unknown>) => void;
    name?: string;
}, options: WritebackOptions): void;
//# sourceMappingURL=index.d.ts.map