import type { Router } from 'express';
import type { WritebackOptions } from './index.js';
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
export declare function feedbackRouter(options: WritebackOptions): Router;
//# sourceMappingURL=express.d.ts.map