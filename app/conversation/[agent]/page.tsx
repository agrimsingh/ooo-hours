import { notFound } from "next/navigation";
import ConversationInterface from "@/components/ConversationInterface";
import { getAgentConfig } from "@/lib/elevenlabs";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ agent: string }>;
}) {
  const { agent } = await params;
  const agentConfig = getAgentConfig(agent);

  if (!agentConfig) {
    notFound();
  }

  if (!agentConfig.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-red-500">
            Configuration Error
          </h1>
          <p className="text-foreground/70">
            Agent ID not configured. Please set up your environment variables.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <ConversationInterface
      agentId={agentConfig.id}
      agentName={agentConfig.name}
    />
  );
}
