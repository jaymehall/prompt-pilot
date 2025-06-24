import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

export default function Prompt() {
  const [systemInstruction, setSystemInstruction] = useState("");

  const [messages, setMessages] = useState([
    { role: "assistant", content: "GPT responses will show here..." },
  ]);

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-gray-100 tracking-tight mb-6">
        Prompt Lab
      </h1>

      <div className="flex flex-col md:flex-row gap-6 h-[80vh]">
        {/* Left Panel: Terminal-style prompt input */}
        <div className="w-full md:w-1/2 bg-black/60 border border-zinc-800 rounded-xl p-4 shadow-inner">
          <div className="font-mono text-green-400 space-y-6">
            {/* System Instruction Input */}
            <div>
              <div>
                <span className="text-gray-500">user@prompt-lab</span>:
                <span className="text-blue-400">~</span>$
                <span className="ml-2">System Instruction:</span>
              </div>
              <textarea
                value={systemInstruction}
                onChange={(e) => setSystemInstruction(e.target.value)}
                placeholder="You are a helpful assistant..."
                className="w-full mt-2 bg-black border border-green-700 text-green-300 p-2 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Right Panel: Terminal-style GPT message viewer */}
        <div className="w-full md:w-1/2 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex flex-col">
          <p className="text-blue-300 font-mono mb-2">Model Output</p>

          {/* Messages display */}
          <div className="flex-1 overflow-y-auto text-gray-300 font-mono text-sm space-y-2">
            {messages.map((msg, i) => (
              <div key={i}>
                <span className="text-blue-400 font-bold mr-1">
                  {msg.role === "user" ? "You" : "GPT"}:
                </span>
                <span>{msg.content}</span>
              </div>
            ))}
          </div>

          {/* Input box */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Type a message and press Enter..."
              className="w-full bg-zinc-900 border border-zinc-700 text-gray-100 p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const input = e.currentTarget.value.trim();
                  if (!input) return;
                  setMessages((prev) => [
                    ...prev,
                    { role: "user", content: input },
                  ]);
                  setTimeout(() => {
                    setMessages((prev) => [
                      ...prev,
                      {
                        role: "assistant",
                        content: "This is a simulated GPT reply.",
                      },
                    ]);
                  }, 1000);

                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
