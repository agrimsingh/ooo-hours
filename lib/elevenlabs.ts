export const AGENTS = {
  brian: {
    id: process.env.NEXT_PUBLIC_BRIAN_AGENT_ID || "",
    name: "Brian",
    title: "Co-founder",
  },
  hsuken: {
    id: process.env.NEXT_PUBLIC_HSU_KEN_AGENT_ID || "",
    name: "Hsu Ken",
    title: "Co-founder",
  },
} as const;

export type AgentKey = keyof typeof AGENTS;

export function getAgentConfig(agent: string) {
  const agentKey = agent as AgentKey;
  return AGENTS[agentKey] || null;
}
