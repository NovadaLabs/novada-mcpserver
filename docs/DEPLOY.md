# Deploy — Novada Hosted MCP

> Audience: Novada ops + future maintainers. End users do **not** read this file.

---

## Prerequisites

**EN**

- Cloudflare account with Workers + KV access (Workers Paid plan recommended for >100k req/day).
- `wrangler` CLI installed: `npm i -g wrangler` (v3.80+).
- DNS control of `novada.com` (via Cloudflare).
- Access to the `Goldentrii/novada-mcp` GitHub repo (or wherever the Worker lives).

**中文**

- Cloudflare 账号，开通 Workers + KV（日请求 >10 万建议升级 Workers Paid）。
- `wrangler` CLI：`npm i -g wrangler`（v3.80+）。
- `novada.com` 域名在 Cloudflare 上的 DNS 管理权限。
- `Goldentrii/novada-mcp` GitHub 仓库的访问权限（或 Worker 实际所在仓库）。

---

## One-time setup

**EN**

```bash
# 1. Clone + install
git clone https://github.com/NovadaLabs/novada-mcp.git
cd novada-mcp/hosted/worker
npm install

# 2. Authenticate wrangler
wrangler login

# 3. Set upstream Novada API key secret
#    The worker proxies tool calls to the Novada upstream API and needs a valid
#    Novada API key. Set as a Worker secret (not a plain env var) so it never
#    lands in source. When prompted, paste the upstream Novada API key (the one
#    you'd use with `npx novada-mcp` locally). Verify with `wrangler secret list`.
wrangler secret put NOVADA_API_KEY

# 4. Create KV namespace for quota tracking
wrangler kv namespace create NOVADA_MCP_QUOTA
# → output ends with: id = "abc123def456..."
# Paste that id into wrangler.toml under [[kv_namespaces]]

# 5. First deploy (lands on a *.workers.dev subdomain)
wrangler deploy
# → e.g. https://novada-mcp-hosted.YOUR-CF-SUBDOMAIN.workers.dev

# 6. DNS: add CNAME on Cloudflare DNS for novada.com
#    Name:   mcp
#    Target: novada-mcp-hosted.YOUR-CF-SUBDOMAIN.workers.dev
#    Proxy:  ON (orange cloud)

# 7. Workers Routes: add a route binding
#    Cloudflare Dashboard → Workers & Pages → novada-mcp-hosted → Triggers → Add Route
#    Route:  mcp.novada.com/mcp*
#    Zone:   novada.com

# 8. Redeploy so the route picks up
wrangler deploy

# 9. Verify
curl 'https://mcp.novada.com/mcp?token=sk-eu-novada-test'
# expect: 401 invalid_token (since test token isn't valid) — confirms routing works
```

**中文**

```bash
# 1. 克隆 + 安装
git clone https://github.com/NovadaLabs/novada-mcp.git
cd novada-mcp/hosted/worker
npm install

# 2. wrangler 登录
wrangler login

# 3. 设置上游 Novada API key（Worker secret）
#    Worker 需要一个上游 Novada API key 把工具调用转给 Novada 后端。
#    用 Worker secret 存（不是普通环境变量，这样不会进源码）。
#    提示后粘 key（与本地 `npx novada-mcp` 使用的同一个）。
#    `wrangler secret list` 验证。
wrangler secret put NOVADA_API_KEY

# 4. 创建配额 KV 命名空间
wrangler kv namespace create NOVADA_MCP_QUOTA
# → 输出末尾会给出：id = "abc123def456..."
# 把这个 id 填进 wrangler.toml 的 [[kv_namespaces]]

# 5. 首次部署（部署到 *.workers.dev 子域）
wrangler deploy
# → 形如 https://novada-mcp-hosted.YOUR-CF-SUBDOMAIN.workers.dev

# 6. DNS：在 Cloudflare DNS 为 novada.com 添加 CNAME
#    Name:   mcp
#    Target: novada-mcp-hosted.YOUR-CF-SUBDOMAIN.workers.dev
#    Proxy:  开启（橙色云）

# 7. Workers Routes：添加路由绑定
#    Cloudflare 控制台 → Workers & Pages → novada-mcp-hosted → Triggers → Add Route
#    Route:  mcp.novada.com/mcp*
#    Zone:   novada.com

# 8. 重新部署，让 Route 生效
wrangler deploy

# 9. 验证
curl 'https://mcp.novada.com/mcp?token=sk-eu-novada-test'
# 期望：401 invalid_token（测试 token 当然无效）—— 证明路由已通
```

---

## Token rotation runbook (v0.2 — sub2api)

**EN —** Once sub2api is integrated, tokens are looked up live; no Worker redeploy needed when keys rotate. Procedure:

1. User regenerates key in `novada.com/dashboard`.
2. sub2api receives the rotation event and revokes the old token.
3. Worker sees `validateToken(old)` → 401 on next call.
4. End user updates their MCP client config with the new URL.

For emergency manual revocation (pre-sub2api):

```bash
wrangler kv key put --binding NOVADA_MCP_REVOKED "sk-eu-novada-LEAKED" "revoked"
```

**中文 —** sub2api 接入后，token 实时查询，旋转无需重新部署 Worker：

1. 用户在 `novada.com/dashboard` 重新生成 key。
2. sub2api 收到旋转事件，吊销旧 token。
3. Worker 下次调用 `validateToken(old)` 返回 401。
4. 终端用户在 MCP 客户端配置中替换为新 URL。

紧急手动吊销（sub2api 上线前）：

```bash
wrangler kv key put --binding NOVADA_MCP_REVOKED "sk-eu-novada-LEAKED" "revoked"
```

---

## Monitoring + alerting

**EN**

- **Dashboard:** Cloudflare → Workers & Pages → `novada-mcp-hosted` → **Metrics**.
  - Watch: request count, error rate, p95 CPU time.
- **Daily check (manual until automated):** KV usage / quota burn — `wrangler kv key list --binding NOVADA_MCP_QUOTA | wc -l` gives rough active-key count.
- **Alerts** — Cloudflare → **Notifications** → **Create**:
  - Alert if 5xx rate > 1% for 10 min (Workers HTTP error rate notification).
  - Alert if request rate drops > 80% vs trailing 24h (proxy for outage).
  - Channel: email `oncall@novada.com` + Slack `#mcp-ops`.

**中文**

- **看板：** Cloudflare → Workers & Pages → `novada-mcp-hosted` → **Metrics**。
  - 关注：请求量、错误率、p95 CPU 时间。
- **每日人工检查（自动化前）：** KV 用量 / 配额消耗 —— `wrangler kv key list --binding NOVADA_MCP_QUOTA | wc -l` 给出活跃 key 数量。
- **告警** —— Cloudflare → **Notifications** → **Create**：
  - 5xx 错误率 10 分钟内 > 1% 则报警。
  - 请求量比过去 24 小时下降 > 80% 则报警（间接代表故障）。
  - 渠道：邮件 `oncall@novada.com` + Slack `#mcp-ops`。

---

## Rollback

**EN**

```bash
# List recent deploys
wrangler deployments list

# Rollback to a specific deploy id
wrangler rollback <DEPLOYMENT_ID>
```

Rollback is atomic and propagates to all CF edge POPs within ~30 s.

**中文**

```bash
# 查看最近部署
wrangler deployments list

# 回滚到指定部署 id
wrangler rollback <DEPLOYMENT_ID>
```

回滚是原子操作，30 秒内推送到所有 CF 边缘节点。

---

## Cost

**EN**

- **Workers Free:** 100k requests / day. Sufficient for v0.1 beta.
- **Workers Paid ($5/mo):** 10M requests / month included, then $0.30 per million.
- **KV:** 100k reads/day + 1k writes/day free, then $0.50 / million reads.
- **Trigger to upgrade:** sustained > 3M req / month (~100k req/day average) → move to Workers Paid.

**中文**

- **Workers Free：** 每天 10 万请求。v0.1 公测够用。
- **Workers Paid（5 美元/月）：** 含 1000 万请求/月，超出 0.30 美元/百万。
- **KV：** 每天 10 万次读取 + 1 千次写入免费，超出 0.50 美元/百万读取。
- **升级触发：** 持续 > 300 万请求/月（日均 10 万）就切到 Workers Paid。

---

## Common ops tasks

**EN**

```bash
# Tail live logs
wrangler tail

# Inspect a quota counter
wrangler kv key get --binding NOVADA_MCP_QUOTA "sk-eu-novada-XXXX:2026-06"

# Manually grant extra calls to a user (subtract from counter)
wrangler kv key put --binding NOVADA_MCP_QUOTA "sk-eu-novada-XXXX:2026-06" "0"

# Force a redeploy (no code change)
wrangler deploy --compatibility-date $(date -u +%Y-%m-%d)
```

**中文**

```bash
# 查看实时日志
wrangler tail

# 查询某 key 当月计数
wrangler kv key get --binding NOVADA_MCP_QUOTA "sk-eu-novada-XXXX:2026-06"

# 手动给用户加额度（清零计数器）
wrangler kv key put --binding NOVADA_MCP_QUOTA "sk-eu-novada-XXXX:2026-06" "0"

# 强制重新部署（无代码改动）
wrangler deploy --compatibility-date $(date -u +%Y-%m-%d)
```
