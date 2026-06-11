/**
 * Session-scoped in-process cache for extract results.
 * Prevents duplicate API calls when agents hit the same URL multiple times
 * within a research loop. Discards on process restart — correct scope for agents.
 *
 * TTL: 5 minutes. Key: url::renderMode.
 */
export declare function getCached(url: string, renderMode: string): string | null;
export declare function setCached(url: string, renderMode: string, result: string): void;
//# sourceMappingURL=session-cache.d.ts.map