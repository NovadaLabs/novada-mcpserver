# MCP Directory Submissions

> Goal: get Novada Hosted MCP listed in every reputable MCP directory so AI agents and developers discover us by default.

---

## Submission template (paste this everywhere)

**EN**

```text
Name:        Novada MCP
URL:         https://mcp.novada.com/mcp
Tagline:     One server. Every web data tool. Zero install.
Description: Hosted MCP server giving AI agents instant access to Novada's
             web data stack: search, scrape, extract, crawl, map, headless
             browser, source verification, deep research, and 6 proxy types.
             5000 calls/month free.
GitHub:      https://github.com/NovadaLabs/novada-mcp
Install:     Add `https://mcp.novada.com/mcp?token=YOUR_KEY` to your MCP client.
Categories:  Web Scraping, Search, Proxy, Data Extraction, Research
Logo:        https://www.novada.com/images/header/header-logo1.svg
Contact:     support@novada.com
License:     MIT (source) / Novada ToS (service)
```

**中文 —** 提交模板（所有目录复用）

```text
名称：       Novada MCP
URL：        https://mcp.novada.com/mcp
一句话：     One server. Every web data tool. Zero install.
描述：       托管式 MCP 服务器，让 AI 智能体即刻使用 Novada 的全套网页数据
             工具栈：搜索、抓取、结构化提取、爬虫、站点地图、无头浏览器、
             来源校验、深度研究，以及 6 类代理。每月 5000 次免费调用。
GitHub：     https://github.com/NovadaLabs/novada-mcp
安装方式：   在 MCP 客户端中加入 `https://mcp.novada.com/mcp?token=YOUR_KEY`
分类：       Web Scraping, Search, Proxy, Data Extraction, Research
Logo：       https://www.novada.com/images/header/header-logo1.svg
联系方式：   support@novada.com
License：    MIT（源码）/ Novada ToS（服务）
```

Required common fields per directory:

- **Name**, **Tagline**, **Description (50–300 words)**, **GitHub URL**, **Install command/URL**, **At least 1 screenshot or logo**.

---

## Tracker

| #  | Directory                  | URL                                          | Method        | Status   | Submitted | Notes                                  |
|----|----------------------------|----------------------------------------------|---------------|----------|-----------|----------------------------------------|
| 1  | PulseMCP                   | https://www.pulsemcp.com/                    | Public form   | ☐ pending |          | High-traffic directory; review ~1 day  |
| 2  | Glama                      | https://glama.ai/mcp/servers                 | GitHub crawl  | ☐ pending |          | Auto-pulls from GitHub — verify        |
| 3  | mcpservers.org             | https://mcpservers.org/                      | GitHub PR     | ☐ pending |          | PR to their listing repo               |
| 4  | mcp.directory              | https://mcp.directory/                       | Public form   | ☐ pending |          |                                        |
| 5  | Claude Directory           | https://www.claudedirectory.org/             | Public form   | ☐ pending |          | Anthropic-aligned                      |
| 6  | awesome-mcp-servers        | https://github.com/punkpeye/awesome-mcp-servers | GitHub PR  | ☐ pending |          | The OG list                            |
| 7  | awesome-remote-mcp-servers | https://github.com/sylviangth/awesome-remote-mcp-servers | GitHub PR | ☐ pending | | Specifically for remote/hosted MCP     |

**EN —** Update `Status` to ☑ live and fill `Submitted` (YYYY-MM-DD) once each listing is confirmed visible.

**中文 —** 每完成一项，把 `Status` 改成 ☑ live，并在 `Submitted` 写上日期（YYYY-MM-DD）。

---

## Per-directory details

### 1. PulseMCP

**EN**
- URL: https://www.pulsemcp.com/
- Method: Submit form on the site (look for "Add server" / "Submit").
- Required fields: name, tagline, description, GitHub URL, screenshot, categories.
- Review SLA: typically ~24 h.

**中文**
- URL：https://www.pulsemcp.com/
- 方式：站内提交表单（找 "Add server" / "Submit"）。
- 必填：名称、Tagline、描述、GitHub URL、截图、分类。
- 审核周期：通常 24 小时左右。

---

### 2. Glama

**EN**
- URL: https://glama.ai/mcp/servers
- Method: Glama auto-discovers MCP servers from GitHub by scanning for the `mcp-server` topic + a `package.json` / config matching MCP shape. **Verify first** — they may also accept manual submission.
- Action: ensure the GitHub repo has topics `mcp`, `mcp-server`, `model-context-protocol`. Wait ~1 week for auto-pickup, then submit manually if not listed.

**中文**
- URL：https://glama.ai/mcp/servers
- 方式：Glama 通过扫描 GitHub `mcp-server` topic + 匹配 MCP 结构的 `package.json` / 配置自动收录。**先确认机制** —— 可能也接受人工提交。
- 动作：给 GitHub 仓库打上 `mcp` / `mcp-server` / `model-context-protocol` topic，等大约 1 周；未收录再手动提交。

---

### 3. mcpservers.org

**EN**
- URL: https://mcpservers.org/
- Method: GitHub PR to their listing repository (markdown table entry).
- Required: add a row in the appropriate category file. Include name, URL, short description, install command.

**中文**
- URL：https://mcpservers.org/
- 方式：向他们的列表仓库提 GitHub PR（在 markdown 表格中加一行）。
- 必填：分类文件里加一行，包含名称、URL、简短描述、安装命令。

---

### 4. mcp.directory

**EN**
- URL: https://mcp.directory/
- Method: Public submission form on the site.
- Required: name, description, GitHub, install method, categories, logo.

**中文**
- URL：https://mcp.directory/
- 方式：站内公开提交表单。
- 必填：名称、描述、GitHub、安装方式、分类、Logo。

---

### 5. Claude Directory

**EN**
- URL: https://www.claudedirectory.org/
- Method: Public submission form.
- Required: name, description, GitHub, screenshot. Emphasize Claude Desktop compatibility.
- Tip: link to our INSTALL.md section #1 (Claude Desktop) explicitly.

**中文**
- URL：https://www.claudedirectory.org/
- 方式：站内公开提交表单。
- 必填：名称、描述、GitHub、截图。强调与 Claude Desktop 的兼容性。
- 小技巧：明确链接到我们 INSTALL.md 第 1 节（Claude Desktop）。

---

### 6. awesome-mcp-servers (punkpeye)

**EN**
- URL: https://github.com/punkpeye/awesome-mcp-servers
- Method: Fork → add an entry under the right category (likely **Browser Automation** + **Search**) → PR.
- Format: `- [Novada MCP](https://github.com/NovadaLabs/novada-mcp) - Hosted MCP server: search, scrape, extract, crawl, map, headless browser, verify, research, 6 proxy types. 5000 calls/mo free.`

**中文**
- URL：https://github.com/punkpeye/awesome-mcp-servers
- 方式：Fork → 在合适分类（大概率是 **Browser Automation** + **Search**）下加一行 → 提 PR。
- 行格式：见上方 EN 示例。

---

### 7. awesome-remote-mcp-servers (sylviangth)

**EN**
- URL: https://github.com/sylviangth/awesome-remote-mcp-servers
- Method: GitHub PR. This list is **remote MCP-specific** — we are a perfect fit.
- Highlight: Streamable HTTP transport, zero install, hosted on Cloudflare Workers global edge.

**中文**
- URL：https://github.com/sylviangth/awesome-remote-mcp-servers
- 方式：GitHub PR。该列表**专收远程 MCP** —— 完美契合我们。
- 强调：Streamable HTTP 传输、零安装、托管在 Cloudflare Workers 全球边缘。

---

## Post-submission

**EN**

- Track inbound traffic per directory via UTM tags: append `?utm_source=<directory>` to the GitHub repo URL we submit.
- Weekly: spot-check that listings are still live; some directories occasionally re-validate URLs.
- When tools change materially (new tool added / removed), update each listing's description.

**中文**

- 提交时给 GitHub URL 加 UTM 标签：`?utm_source=<directory>`，便于按目录追踪流量。
- 每周巡检一次：确认列表仍在线；部分目录会定期重新验证 URL。
- 当工具集发生显著变化（新增/删除工具）时，更新每个目录中的描述。
