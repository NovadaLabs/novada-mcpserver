# Architecture — Novada Hosted MCP

> Audience: engineers maintaining or extending `mcp.novada.com`.

---

## 1. High-level diagram

**EN**

```
AI client (Claude Desktop / Cursor / Cline / Windsurf / VS Code)
     │
     │  Streamable HTTP  (POST + GET on /mcp)
     │  Auth: ?token=…  OR  Authorization: Bearer …
     ▼
Cloudflare Workers Edge  (mcp.novada.com)
     │
     ├─ Token validation   (stubbed → sub2api in v0.2)
     ├─ Quota check        (CF KV: 5000 calls/mo/key)
     ├─ Tool dispatch      (re-uses novada-mcp tool handlers)
     └─ Telemetry          → CF Analytics Engine
     │
     ▼
Novada upstream APIs  (api.novada.com — proxy network, scraper, SERP)
```

**中文**

```
AI 客户端（Claude Desktop / Cursor / Cline / Windsurf / VS Code）
     │
     │  Streamable HTTP（在 /mcp 上 POST + GET）
     │  鉴权：?token=…  或  Authorization: Bearer …
     ▼
Cloudflare Workers 边缘节点（mcp.novada.com）
     │
     ├─ Token 校验          （目前桩实现，v0.2 接入 sub2api）
     ├─ 配额检查            （CF KV：每个 key 每月 5000 次）
     ├─ 工具分发            （复用 novada-mcp 的工具处理器）
     └─ 遥测                → CF Analytics Engine
     │
     ▼
Novada 上游 API（api.novada.com —— 代理网络、Scraper、SERP）
```

---

## 2. Transport

**EN —** We implement **Streamable HTTP** per the MCP spec (revision March 2025).

- Single endpoint `/mcp` accepts:
  - `POST` for client → server JSON-RPC messages.
  - `GET` (with `Accept: text/event-stream`) for server → client streaming notifications.
- We do **not** implement legacy **HTTP+SSE** transport — it was deprecated in the March 2025 spec and most modern clients (Claude Desktop, Cursor, Claude Code CLI) ship Streamable HTTP support.
- We do **not** ship a **stdio** transport in this codebase — stdio is local-only and is covered by the separate `novada-mcp` npm package.

**中文 —** 按 MCP 规范（2025 年 3 月版）实现 **Streamable HTTP**：

- 单一端点 `/mcp`：
  - `POST`：客户端 → 服务端的 JSON-RPC 消息。
  - `GET`（`Accept: text/event-stream`）：服务端 → 客户端的流式通知。
- **不**实现旧的 HTTP+SSE 传输 —— 已在 3 月规范中弃用，主流客户端均已支持 Streamable HTTP。
- 这里**不**实现 stdio 传输 —— stdio 仅本地可用，由独立的 `novada-mcp` npm 包覆盖。

---

## 3. Authentication

**EN —** Dual-mode for parity with Tavily / BrightData hosted servers:

1. **URL query** — `https://mcp.novada.com/mcp?token=sk-eu-novada-…`
   Easiest copy-paste install for clients that don't expose a custom-header field.
2. **Bearer header** — `Authorization: Bearer sk-eu-novada-…`
   Preferred when the client supports it (no token in logs).

Both modes resolve to the same internal `validateToken(token)` call.

### Token format

```
sk-eu-novada-{32 random base62 chars}
```

- Prefix `sk-eu-novada-` distinguishes from `sk-eu-prismma-*` (Prismma EU Gateway uses the same prefix family but is a different product).
- Region tag `eu` reflects the primary issuance region; routing is global.

**中文 —** 双模式鉴权，对齐 Tavily / BrightData：

1. **URL query** —— `?token=sk-eu-novada-…`，便于一键复制安装。
2. **Bearer 请求头** —— `Authorization: Bearer sk-eu-novada-…`，客户端支持时优先。

Token 格式：`sk-eu-novada-` + 32 位 base62。前缀用于和 `sk-eu-prismma-*`（Prismma EU Gateway，另一款产品）区分。

---

## 4. Free quota model

**EN**

- **5,000 calls / month / key.**
- Counter stored in Cloudflare KV, keyed by `<token>:<YYYY-MM>`.
- Increment on every successful tool call (not on auth/list operations).
- TTL on each KV entry: 32 days (auto-purge previous month).
- Reset: implicit — the next month uses a new key.

**Pseudocode**

```text
key   = `${token}:${utcYearMonth()}`
count = (await KV.get(key)) ?? 0
IF count >= 5000:
  RETURN 429 with Retry-After = secondsUntilNextMonth()
await KV.put(key, count + 1, { expirationTtl: 60*60*24*32 })
```

**中文 —** 免费配额模型

- 每个 key 每月 **5000 次**调用。
- CF KV 存储计数器，key 为 `<token>:<YYYY-MM>`。
- 仅在工具调用成功时累加（鉴权 / list 操作不计）。
- 每条 KV 条目 TTL = 32 天（自动清理上月数据）。
- 重置：隐式，下个月使用新 key。

---

## 5. Deployment

**EN**

- **Runtime:** Cloudflare Workers (global edge, V8 isolates).
- **Domain:** `mcp.novada.com` via Cloudflare DNS + Workers Route.
- **Storage:** Cloudflare KV namespace `NOVADA_MCP_QUOTA`.
- **Telemetry:** Cloudflare Analytics Engine (request count, latency, error rate per tool).
- **CI:** GitHub Actions → `wrangler deploy` on push to `main`. (planned)

**中文**

- **运行时：** Cloudflare Workers（全球边缘，V8 isolates）。
- **域名：** `mcp.novada.com`（CF DNS + Workers Route）。
- **存储：** CF KV 命名空间 `NOVADA_MCP_QUOTA`。
- **遥测：** CF Analytics Engine（每个工具的请求量、延迟、错误率）。
- **CI：** GitHub Actions，推到 `main` 自动 `wrangler deploy`。（计划中）

---

## 6. Failure modes

**EN**

| Condition                       | Status | Response                                        |
|---------------------------------|--------|-------------------------------------------------|
| Missing / malformed token       | 401    | `{ "error": "invalid_token" }`                  |
| Quota exceeded                  | 429    | `Retry-After: <epoch seconds of next month>`    |
| Tool error (upstream 5xx etc.)  | 200    | JSON-RPC error wrapped in MCP response          |
| CF Worker CPU limit (50 ms)     | 5xx    | Logged + alert; client must retry               |
| Unknown tool name               | 200    | JSON-RPC `MethodNotFound` (-32601)              |
| Malformed JSON-RPC              | 400    | `{ "error": "invalid_request" }`                |

**中文 —** 故障模式

| 情况                       | 状态码 | 响应                                            |
|----------------------------|--------|-------------------------------------------------|
| Token 缺失或格式错误       | 401    | `{ "error": "invalid_token" }`                  |
| 超过配额                   | 429    | `Retry-After: <下月起始 epoch 秒>`              |
| 工具内部错误（上游 5xx）   | 200    | 在 MCP 响应中以 JSON-RPC error 形式返回         |
| Worker CPU 50 ms 超限      | 5xx    | 记日志 + 告警；客户端需重试                     |
| 未知工具名                 | 200    | JSON-RPC `MethodNotFound`（-32601）             |
| JSON-RPC 解析失败          | 400    | `{ "error": "invalid_request" }`                |

---

## 7. Roadmap — v0.2 and beyond

**EN**

- **sub2api billing integration** — replace stub token validator with real subscription lookup; paid tiers unlock higher quotas + premium proxy pools.
- **OAuth 2.1 + Dynamic Client Registration (DCR)** — required by Claude Desktop "Custom Connectors" UI. Issue access tokens scoped per workspace; refresh tokens; PKCE.
- **Per-tool quotas** — heavy tools (`browser`, `research`) cost more "units" than `search`.
- **Regional pinning** — `mcp.us.novada.com`, `mcp.eu.novada.com`, `mcp.cn.novada.com` for compliance.
- **Tool gating** — workspace admins disable specific tools (e.g. block `browser` in enterprise plan).

**中文 —** v0.2 及后续

- **sub2api 计费接入** —— 用真实订阅查询替换 token 桩；付费档解锁更高配额 + 高级代理池。
- **OAuth 2.1 + 动态客户端注册（DCR）** —— Claude Desktop "Custom Connectors" UI 需要。按 workspace 颁发 access token；refresh token；PKCE。
- **按工具配额** —— `browser` / `research` 等重工具消耗多个"配额单位"。
- **区域绑定** —— `mcp.us.novada.com` / `mcp.eu.novada.com` / `mcp.cn.novada.com`，满足合规需求。
- **工具开关** —— workspace 管理员可禁用特定工具（如企业版禁用 `browser`）。

---

## 8. Why this design

**EN**

- **Stateless Worker** keeps cold start < 10 ms; horizontally scales for free.
- **KV for quota** — eventually consistent is fine for monthly counters; replaces a heavier D1/SQL choice.
- **Single endpoint** matches MCP spec and avoids per-tool route explosion.
- **Reuse tool handlers** from `novada-mcp` npm package — single source of truth for tool schemas + business logic; the Worker is a thin transport adapter.

**中文 —** 设计动机

- **无状态 Worker** —— 冷启动 < 10 ms，水平扩展免费。
- **用 KV 存配额** —— 最终一致对月度计数足够，比 D1/SQL 更轻。
- **单一端点** —— 符合 MCP 规范，避免按工具拆路由。
- **复用工具处理器** —— 来自 `novada-mcp` npm 包，工具 schema 与业务逻辑只有一份；Worker 仅作传输适配。
