# Install — Novada Hosted MCP

> **EN —** Add Novada's full web-data toolset to your AI client in under 2 minutes. One URL, zero install.
>
> **中文 —** 不到 2 分钟，把 Novada 全套网页数据工具接入你的 AI 客户端。一个 URL，零安装。

---

## 0. Get an API key first

**EN**

1. Sign up at **https://www.novada.com/signup** (free).
2. Copy your API key from the dashboard. It looks like:
   ```
   sk-eu-novada-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
3. **Free tier:** 5,000 calls / month. No credit card required.

**中文**

1. 前往 **https://www.novada.com/signup** 免费注册。
2. 在控制台复制 API key，形如：
   ```
   sk-eu-novada-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
3. **免费额度：** 每月 5000 次调用，无需绑卡。

Throughout this guide, replace `YOUR_KEY` with your real key. 下文将 `YOUR_KEY` 替换为你的真实 key。

---

## 1. Claude Desktop  ⭐ recommended

**EN**

1. Open Claude Desktop → **Settings** (`⌘ ,` on macOS).
2. Sidebar → **Connectors**.
3. Click **Add Custom Connector**.
4. Fill in:
   - **Name:** `Novada`
   - **Remote MCP server URL:** `https://mcp.novada.com/mcp?token=YOUR_KEY`
5. Click **Add** → toggle the connector **On**.
6. **Restart** Claude Desktop.

**Verify it works**

In a new chat, type:

```
Search the web for "Y Combinator W26 batch"
```

You should see Claude invoke `novada__search` (tool-use UI block appears). If you don't see a tool call, see Troubleshooting below.

**中文**

1. 打开 Claude Desktop → **Settings**（macOS：`⌘ ,`）。
2. 侧边栏选 **Connectors**。
3. 点 **Add Custom Connector**。
4. 填入：
   - **Name：** `Novada`
   - **Remote MCP server URL：** `https://mcp.novada.com/mcp?token=YOUR_KEY`
5. 点 **Add** → 开启连接器。
6. **重启** Claude Desktop。

**验证可用**

在新对话中输入：

```
帮我搜索 "Y Combinator W26 batch"
```

应能看到 Claude 调用 `novada__search`（界面会出现工具调用块）。

---

## 2. Cursor

**EN**

### Option A — one-click

Click the install button on **https://mcp.novada.com** (the landing page). It uses Cursor's `cursor://anysphere.cursor-deeplink/mcp/install` deeplink.

### Option B — manual

1. Create / edit `~/.cursor/mcp.json` (global) **or** `.cursor/mcp.json` in your project.
2. Add:

```json
{
  "mcpServers": {
    "novada": {
      "url": "https://mcp.novada.com/mcp?token=YOUR_KEY"
    }
  }
}
```

3. Restart Cursor.
4. Open **Settings → MCP** and confirm `novada` is **green / connected**.

**Verify it works** — in the chat panel, ask: `Use novada to search "MCP spec changelog"`.

**中文**

### 方式 A — 一键安装

点击 **https://mcp.novada.com** 落地页上的安装按钮，会触发 Cursor 的 `cursor://anysphere.cursor-deeplink/mcp/install` 深链。

### 方式 B — 手动配置

1. 新建 / 编辑 `~/.cursor/mcp.json`（全局）或项目内 `.cursor/mcp.json`。
2. 加入：

```json
{
  "mcpServers": {
    "novada": {
      "url": "https://mcp.novada.com/mcp?token=YOUR_KEY"
    }
  }
}
```

3. 重启 Cursor。
4. 打开 **Settings → MCP**，确认 `novada` 显示**绿色 / 已连接**。

**验证可用** —— 在聊天面板输入：`用 novada 搜索 "MCP spec changelog"`。

---

## 3. Claude Code CLI

**EN**

```bash
claude mcp add --transport http novada \
  'https://mcp.novada.com/mcp?token=YOUR_KEY'
```

Then in any Claude Code session:

```bash
claude
> /mcp
```

You should see `novada` listed with all 25 tools.

**Verify it works**

```bash
claude -p "Use novada__search to search for 'OpenAI DevDay 2026'"
```

**中文**

```bash
claude mcp add --transport http novada \
  'https://mcp.novada.com/mcp?token=YOUR_KEY'
```

在 Claude Code 会话中：

```bash
claude
> /mcp
```

应能看到 `novada` 及其 25 个工具。

**验证可用**

```bash
claude -p "用 novada__search 搜索 'OpenAI DevDay 2026'"
```

---

## 4. Cline (VS Code extension)

**EN**

1. Open `~/.config/cline/config.json` (create if missing).
2. Add Novada under `mcpServers`:

```json
{
  "mcpServers": {
    "novada": {
      "type": "streamableHttp",
      "url": "https://mcp.novada.com/mcp?token=YOUR_KEY"
    }
  }
}
```

3. Reload VS Code (`⇧⌘P` → "Reload Window").
4. Open Cline panel → **MCP Servers** → confirm `novada` is connected.

**Verify it works** — in Cline, ask: `Search the web for the latest MCP spec via novada`.

**中文**

1. 打开 `~/.config/cline/config.json`（没有就新建）。
2. 在 `mcpServers` 下加入：

```json
{
  "mcpServers": {
    "novada": {
      "type": "streamableHttp",
      "url": "https://mcp.novada.com/mcp?token=YOUR_KEY"
    }
  }
}
```

3. 重载 VS Code（`⇧⌘P` → "Reload Window"）。
4. 打开 Cline 面板 → **MCP Servers** → 确认 `novada` 已连接。

**验证可用** —— 在 Cline 中输入：`用 novada 搜索最新的 MCP 规范`。

---

## 5. Windsurf

**EN**

1. Open **Cascade → Settings → MCP servers** (or edit `~/.codeium/windsurf/mcp_config.json`).
2. Add:

```json
{
  "mcpServers": {
    "novada": {
      "serverUrl": "https://mcp.novada.com/mcp?token=YOUR_KEY"
    }
  }
}
```

3. Save → click **Refresh** in the MCP panel.

**Verify it works** — ask Cascade: `Use novada to map the URLs on stripe.com/docs`.

**中文**

1. 打开 **Cascade → Settings → MCP servers**（或编辑 `~/.codeium/windsurf/mcp_config.json`）。
2. 加入：

```json
{
  "mcpServers": {
    "novada": {
      "serverUrl": "https://mcp.novada.com/mcp?token=YOUR_KEY"
    }
  }
}
```

3. 保存 → 在 MCP 面板点 **Refresh**。

**验证可用** —— 在 Cascade 中输入：`用 novada 把 stripe.com/docs 的所有 URL 列出来`。

---

## 6. Bonus — Custom / Other clients (`mcp-remote` adapter)

**EN**

For clients that only support **stdio** transport (e.g. older versions of various tools), use the `mcp-remote` adapter as a bridge:

```json
{
  "mcpServers": {
    "novada": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.novada.com/mcp?token=YOUR_KEY"
      ]
    }
  }
}
```

`mcp-remote` is a thin stdio ↔ Streamable HTTP bridge maintained by the MCP community.

**中文**

对于只支持 **stdio** 传输的客户端（部分老版本工具），可用 `mcp-remote` 适配器作桥接：

```json
{
  "mcpServers": {
    "novada": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.novada.com/mcp?token=YOUR_KEY"
      ]
    }
  }
}
```

`mcp-remote` 是 MCP 社区维护的 stdio ↔ Streamable HTTP 桥接器。

---

## Troubleshooting

**EN**

| Symptom                                   | Likely cause                                    | Fix                                                                 |
|-------------------------------------------|-------------------------------------------------|---------------------------------------------------------------------|
| **401 Unauthorized**                      | Token missing, typo, or revoked                 | Re-copy key from dashboard. Ensure prefix `sk-eu-novada-`.          |
| **429 Too Many Requests**                 | Free quota (5,000/mo) exhausted                 | Wait until 1st of next month, or upgrade plan.                      |
| **Connection refused / DNS error**        | URL typo, or firewall blocks `mcp.novada.com`   | Verify URL exactly. Try `curl https://mcp.novada.com/mcp` first.    |
| **"Tool not found" / no tools listed**    | Client too old (MCP < 1.0)                      | Update client to latest version. MCP 1.0+ required.                 |
| **Tool call hangs > 60s**                 | Heavy upstream (e.g. `research` on a big site)  | Increase client tool-call timeout. Or use lighter tool (`search`).  |
| **CORS error in browser-based client**    | Custom client not sending proper Origin         | Use Bearer header instead of `?token=` query.                       |

If none of the above helps, email `support@novada.com` with the exact error text and which client you use.

**中文**

| 现象                                       | 可能原因                              | 解决方法                                                             |
|--------------------------------------------|---------------------------------------|----------------------------------------------------------------------|
| **401 Unauthorized**                       | Token 缺失 / 拼错 / 已吊销            | 从控制台重新复制 key，确认以 `sk-eu-novada-` 开头。                  |
| **429 Too Many Requests**                  | 用完了 5000 次免费额度                | 等到下月 1 号，或升级套餐。                                          |
| **连接拒绝 / DNS 错误**                    | URL 拼错，或防火墙拦截                | 检查 URL；先用 `curl https://mcp.novada.com/mcp` 测试。              |
| **"找不到工具" / 工具列表为空**            | 客户端版本太旧（MCP < 1.0）           | 升级到最新版，需要 MCP 1.0+。                                        |
| **工具调用超过 60 秒不返回**               | 上游较重（如对大站点 `research`）     | 提高客户端工具超时，或换轻量工具（如 `search`）。                    |
| **浏览器端客户端报 CORS**                  | 自定义客户端 Origin 不规范            | 改用 Bearer 请求头代替 `?token=` 查询参数。                          |

仍未解决，请把完整报错和所用客户端发到 `support@novada.com`。
