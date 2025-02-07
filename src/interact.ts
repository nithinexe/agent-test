import { initializeAgent } from './agent';
import { HumanMessage } from '@langchain/core/messages';

async function runChat() {
  const agent = await initializeAgent();
  const config = { configurable: { thread_id: 'Solana Agent Kit!' } };

  // Example: Send a command to the agent
  const stream = await agent.stream(
    {
      messages: [new HumanMessage("Can you send 0.1 SOL to this address CztRNUjoAWDHpB1oNkGnQvry6SjAtoUR7hMSejDXV71i")],
    },
    config
  );

  // Handle the response
  for await (const chunk of stream) {
    if ('agent' in chunk) {
      console.log(chunk.agent.messages[0].content);
    } else if ('tools' in chunk) {
      console.log(chunk.tools.messages[0].content);
    }
    console.log('-------------------');
  }
}

runChat().catch(console.error);