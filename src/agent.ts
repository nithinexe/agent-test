import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";
import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import * as dotenv from "dotenv";

dotenv.config();

export async function initializeAgent() {
  const llm = new ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0.7,
  });

  const agent = new SolanaAgentKit(process.env.SOLANA_PRIVATE_KEY!, process.env.RPC_URL!,{
    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
  });

  const tools = createSolanaTools(agent);
  const memory = new MemorySaver();
  const config = { configurable: { thread_id: "Solana Agent Kit!" } };

  return createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
  });
}

