# Novada Hosted MCP

> **Status:** v0.1 — KR-5 (June 2026)
> **Endpoint:** `https://mcp.novada.com/mcp`
> **Free tier:** 5,000 calls / month / API key

---

## What is Novada Hosted MCP?

**EN —** A remote Model Context Protocol server that gives AI agents and chat apps instant access to Novada's web data tools (search, scrape, extract, crawl, map, browser, verify, research, 6 proxy types) via one URL.

**中文 —** 一个远程 Model Context Protocol 服务器，让 AI 智能体和聊天应用通过一个 URL 即可使用 Novada 的全套网页数据工具（搜索、抓取、提取、爬取、站点地图、无头浏览器、来源校验、深度研究、6 类代理）。

---

## Why hosted?

**EN**
- **Zero install for end users** — no Node, no Python, no local CLI. Add a URL, use the tools.
- **Better distribution** — listed in every MCP directory; one-click install in Cursor, Claude Desktop, etc.
- **Edge-fast** — Cloudflare Workers runs requests near the user.
- **Always latest** — no client upgrade required when we ship new tools.

**中文**
- **终端用户零安装** —— 不需要 Node、不需要 Python、不需要本地 CLI。填一个 URL 就能用。
- **分发更广** —— 进入所有 MCP 目录；在 Cursor / Claude Desktop 等客户端中一键安装。
- **边缘网络加速** —— Cloudflare Workers 在离用户最近的节点处理请求。
- **永远是最新版本** —— 我们上线新工具时客户端无需升级。

---

## Quick Start

**EN**

```text
URL:        https://mcp.novada.com/mcp?token=YOUR_API_KEY
Get a key:  https://www.novada.com/signup    (5000 free calls/mo)
Then add to your AI client → see INSTALL.md
```

**中文**

```text
URL:        https://mcp.novada.com/mcp?token=YOUR_API_KEY
获取 API Key:  https://www.novada.com/signup    （每月 5000 次免费调用）
然后在 AI 客户端中添加 → 见 INSTALL.md
```

---

## Tools exposed

**EN —** All 25 Novada web-data tools are available through the single endpoint:

| Tool        | What it does                                              |
|-------------|------------------------------------------------------------|
| `search`    | Web / SERP search across Google, Bing, Baidu, Naver, …     |
| `scrape`    | Render a single URL → markdown / HTML / screenshot         |
| `extract`   | Structured extraction with schema (JSON output)            |
| `crawl`     | Multi-page crawl of a site                                 |
| `map`       | Discover all URLs on a site (sitemap-style)                |
| `browser`   | Full headless browser session (click, fill, navigate)      |
| `verify`    | Source verification — check claim against live web         |
| `research`  | Multi-hop deep research with citations                     |
| `proxy`     | 6 proxy types — residential, datacenter, mobile, ISP, …    |

**中文 —** 25 个 Novada 网页数据工具全部通过单一端点提供：

| 工具        | 功能                                                       |
|-------------|------------------------------------------------------------|
| `search`    | 跨 Google / Bing / Baidu / Naver 的网页 / SERP 搜索        |
| `scrape`    | 单页渲染 → Markdown / HTML / 截图                          |
| `extract`   | 按 schema 结构化提取（JSON 输出）                          |
| `crawl`     | 多页站点爬取                                               |
| `map`       | 发现站点全部 URL（类似 sitemap）                            |
| `browser`   | 完整无头浏览器会话（点击、填表、跳转）                     |
| `verify`    | 来源校验 —— 用实时网页验证某条声明                         |
| `research`  | 多跳深度研究并附引用                                       |
| `proxy`     | 6 类代理 —— 住宅 / 数据中心 / 移动 / ISP / …               |

---

## Repo layout

```
hosted/
├── landing/     # install landing page (mcp.novada.com)
├── worker/      # Cloudflare Worker source (MCP server impl)
├── docs/        # ← you are here
└── scripts/     # utilities (token gen, KV inspection, deploy helpers)
```

**中文 —** 仓库目录结构

```
hosted/
├── landing/     # 安装引导落地页（mcp.novada.com）
├── worker/      # Cloudflare Worker 源码（MCP 服务端实现）
├── docs/        # ← 当前位置
└── scripts/     # 工具脚本（token 生成、KV 检查、部署辅助）
```

---

## Documentation

| File               | Audience               | Purpose                                  |
|--------------------|------------------------|------------------------------------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Engineers              | How the system works end-to-end          |
| [INSTALL.md](./INSTALL.md)           | **End users**          | Step-by-step setup for every MCP client  |
| [DEPLOY.md](./DEPLOY.md)             | Ops / maintainers      | First-time deploy + ongoing runbook      |
| [DIRECTORIES.md](./DIRECTORIES.md)   | Marketing / growth     | MCP-directory submission checklist       |

**中文 —** 文档导航

| 文件               | 读者               | 用途                                  |
|--------------------|--------------------|---------------------------------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 工程师             | 端到端系统设计                        |
| [INSTALL.md](./INSTALL.md)           | **终端用户**       | 每个 MCP 客户端的逐步安装指南         |
| [DEPLOY.md](./DEPLOY.md)             | 运维 / 维护人员    | 首次部署 + 长期运维手册               |
| [DIRECTORIES.md](./DIRECTORIES.md)   | 市场 / 增长        | MCP 目录提交清单                      |

---

## License & contact

**EN —** Source: MIT. Service: subject to Novada Terms (`novada.com/terms`). Contact: `support@novada.com`.

**中文 —** 源码：MIT 协议。服务遵循 Novada 服务条款（`novada.com/terms`）。联系方式：`support@novada.com`。
