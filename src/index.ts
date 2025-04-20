#!/usr/bin/env node

import * as dotenv from "dotenv";
import { ACTIONS, EvmAgentKit, createMcpServer } from "evm-ai-kit";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express, { Request, Response } from "express";
import { Server as HTTPServer } from "http";

dotenv.config();

async function main() {
  const app = express();
  const port = process.env.PORT || 3000;

  let transport: SSEServerTransport | null = null;
  const agent = new EvmAgentKit(
    process.env.EVM_PRIVATE_KEY!,
    process.env.RPC_URL!,
    {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
      PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY || "",
      COINGECKO_PRO_API_KEY: process.env.COINGECKO_PRO_API_KEY || "",
    },
  );
  const server = createMcpServer({
    DEFILLAMA_GET_PROTOCOL_TVL: ACTIONS.DEFILLAMA_GET_PROTOCOL_TVL,
    DEFILLAMA_FETCH_PRICE: ACTIONS.DEFILLAMA_FETCH_PRICE
  }, agent, {
    name: "evm-mcp",
    version: "0.0.1"
  });

  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  app.get('/sse', (req: Request, res: Response) => {
    transport = new SSEServerTransport('/messages', res);
    server.connect(transport);
    res.write('data: SSE connection established\n\n');
  });

  app.post('/messages', (req: Request, res: Response) => {
    if (transport) {
      transport.handlePostMessage(req, res);
    } else {
      res.status(400).json({ error: "No active SSE connection" });
    }
  });

  // Store server instance and return it
  const httpServer = app.listen(port, () => {
    console.log(`EVM Agent MCP Server running.`);
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    httpServer.close(() => {
      console.log('HTTP server closed');
      server.close();
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    httpServer.close(() => {
      console.log('HTTP server closed');
      server.close();
      process.exit(0);
    });
  });

  return httpServer;
}

let httpServerInstance: HTTPServer;

main().then(instance => {
  httpServerInstance = instance;
}).catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});