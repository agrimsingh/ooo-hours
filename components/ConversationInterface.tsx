"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useEffect, useState, useRef } from "react";

interface ConversationInterfaceProps {
  agentId: string;
  agentName: string;
}

interface Message {
  role: "user" | "agent";
  text: string;
  timestamp: Date;
}

export default function ConversationInterface({
  agentId,
  agentName,
}: ConversationInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected");
      setIsTimerRunning(true);
    },
    onDisconnect: () => {
      console.log("Disconnected");
      setIsTimerRunning(false);
    },
    onMessage: (message) => {
      console.log("Message:", message);
      if (message.message) {
        setMessages((prev) => [
          ...prev,
          {
            role: message.source === "user" ? "user" : "agent",
            text: message.message,
            timestamp: new Date(),
          },
        ]);
      }
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: agentId,
      });
      setElapsedTime(0);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      alert(
        "Could not access microphone. Please allow microphone access and try again."
      );
    }
  }, [conversation, agentId]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isConnected = conversation.status === "connected";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#171717] border-b border-[#2a2a2a] p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">
              Office Hours with {agentName}
            </h1>
            <p className="text-sm text-foreground/60 capitalize">
              {conversation.status}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono">{formatTime(elapsedTime)}</div>
            <div className="text-xs text-foreground/60">
              {conversation.isSpeaking ? "Speaking..." : "Listening..."}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col">
        {/* Controls */}
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center flex-1 space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Ready to begin?</h2>
              <p className="text-foreground/70">
                Click start to begin your conversation with {agentName}
              </p>
            </div>
            <button
              onClick={startConversation}
              className="px-8 py-4 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors text-lg"
            >
              Start Conversation
            </button>
            <a
              href="/"
              className="text-sm text-foreground/60 hover:text-foreground"
            >
              ← Back to home
            </a>
          </div>
        ) : (
          <>
            {/* Transcript */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-6">
              {messages.length === 0 ? (
                <div className="text-center text-foreground/50 py-12">
                  Conversation started. Start speaking...
                </div>
              ) : (
                messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-foreground text-background"
                          : "bg-[#171717] border border-[#2a2a2a]"
                      }`}
                    >
                      <div className="text-xs opacity-60 mb-1">
                        {message.role === "user" ? "You" : agentName}
                      </div>
                      <div>{message.text}</div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Stop Button */}
            <div className="flex justify-center pb-4">
              <button
                onClick={stopConversation}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                End Conversation
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
