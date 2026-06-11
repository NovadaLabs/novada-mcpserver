/**
 * Session-scoped in-process cache for extract results.
 * Prevents duplicate API calls when agents hit the same URL multiple times
 * within a research loop. Discards on process restart — correct scope for agents.
 *
 * TTL: 5 minutes. Key: url::renderMode.
 */
const TTL_MS = 5 * 60 * 1000;
const cache = new Map();
function cacheKey(url, renderMode) {
    return `${url}::${renderMode}`;
}
export function getCached(url, renderMode) {
    const key = cacheKey(url, renderMode);
    const entry = cache.get(key);
    if (!entry)
        return null;
    if (Date.now() - entry.ts > TTL_MS) {
        cache.delete(key);
        return null;
    }
    return entry.result;
}
export function setCached(url, renderMode, result) {
    const key = cacheKey(url, renderMode);
    cache.set(key, { result, ts: Date.now() });
    // Lazy eviction: prune expired entries when cache grows beyond 100
    if (cache.size > 100) {
        const now = Date.now();
        for (const [k, v] of cache) {
            if (now - v.ts > TTL_MS)
                cache.delete(k);
        }
    }
}
//# sourceMappingURL=session-cache.js.map