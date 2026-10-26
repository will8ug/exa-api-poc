#!/usr/bin/env node
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const client = new Client({ name: "exa-api-poc", version: "0.0.1" });
try {
  await client.connect(
    new StreamableHTTPClientTransport(new URL("https://mcp.exa.ai/mcp"))
  );

  // callTool's declared return also allows task-based results ({ toolResult }),
  // which have no `content`. Plain tools like web_search_exa are never task-based.
  const result = (await client.callTool({
    name: "web_search_exa",
    arguments: {
      query: "best blog posts about vector databases",
      numResults: 3,
    },
  }) as CallToolResult);

  for (const item of result.content) {
    if (item.type === "text") console.log(item.text);
  }
} finally {
  await client.close();
}
