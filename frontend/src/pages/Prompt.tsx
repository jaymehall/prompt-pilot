import { useRef, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

export default function Prompt() {
  // State //
  const [systemInstruction, setSystemInstruction] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "GPT responses will show here..." },
  ]);

  // Refs //
  const outputRef = useRef<HTMLDivElement>(null);

  return (
    <PageWrapper>
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-100 tracking-tight mb-6">
        Prompt Lab
      </h1>

      <div className="flex flex-col md:flex-row gap-6 h-[80vh]">
        {/* Left Panel: System Instruction Input */}
        <div className="w-full md:w-1/2 bg-black/60 border border-zinc-800 rounded-xl p-4 shadow-inner">
          <div className="font-mono text-green-400 space-y-6">
            <div>
              <div className="whitespace-nowrap font-mono">
                <span className="text-gray-500">user@prompt-lab</span>
                <span className="text-blue-400">:~$</span>
                <span className="text-green-300 ml-2">System Instruction:</span>
              </div>

              <motion.textarea
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                value={systemInstruction}
                onChange={(e) => {
                  setSystemInstruction(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                placeholder="You are a helpful assistant..."
                className="w-full max-h-[70vh] overflow-auto bg-black border border-green-700 text-green-300 p-2 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400 custom-scroll"
              />
            </div>
          </div>
        </div>

        {/* Right Panel: GPT Chat Output */}
        <div className="w-full md:w-1/2 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex flex-col">
          <p className="text-blue-300 font-mono mb-2">Model Output</p>

          {/* Message Viewer */}
          <div
            ref={outputRef}
            className="flex-1 overflow-y-auto text-gray-300 font-mono text-sm space-y-2 scroll-output"
          >
            {messages.map((msg, i) => {
              if (
                i === 0 &&
                msg.content.includes("GPT responses will show here...") &&
                messages.length > 1
              ) {
                return null;
              }

              return (
                <div key={i}>
                  <span className="text-blue-400 font-bold mr-1">
                    {msg.role === "user" ? "You" : "GPT"}:
                  </span>
                  <span>{msg.content}</span>
                </div>
              );
            })}
          </div>

          {/* User Input Field  */}
          <div className="mt-4">
            <motion.textarea
              rows={1}
              placeholder="Type a message and press Enter..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const input = e.currentTarget.value.trim();
                  if (!input) return;

                  e.currentTarget.value = "";
                  e.currentTarget.style.height = "auto";

                  setMessages((prev) => [
                    ...prev,
                    { role: "user", content: input },
                  ]);

                  // Debug logs added here
                  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
                  console.log("Sending to /api/generate:", {
                    systemInstruction,
                    messages: [...messages, { role: "user", content: input }],
                    model: "gpt-3.5-turbo",
                  });

                  fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      systemInstruction,
                      messages: [...messages, { role: "user", content: input }],
                      model: "gpt-3.5-turbo",
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.message) {
                        const fullReply = data.message;
                        let currentText = "";
                        let i = 0;

                        const typingInterval = setInterval(() => {
                          currentText += fullReply[i];
                          i++;

                          setMessages((prev) => {
                            const updated = [...prev];
                            if (
                              updated[updated.length - 1]?.role === "assistant"
                            ) {
                              updated.pop();
                            }
                            return [
                              ...updated,
                              { role: "assistant", content: currentText },
                            ];
                          });

                          // Auto-scroll to bottom //
                          setTimeout(() => {
                            if (outputRef.current) {
                              outputRef.current.scrollTop =
                                outputRef.current.scrollHeight;
                            }
                          }, 0);

                          if (i >= fullReply.length) {
                            clearInterval(typingInterval);
                          }
                        }, 40);
                      } else {
                        setMessages((prev) => [
                          ...prev,
                          {
                            role: "assistant",
                            content: "Error: No response from model.",
                          },
                        ]);
                      }
                    })
                    .catch((err) => {
                      setMessages((prev) => [
                        ...prev,
                        {
                          role: "assistant",
                          content: `Error: ${err.message}`,
                        },
                      ]);
                    });
                }
              }}
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              className="w-full max-h-[200px] overflow-auto bg-zinc-900 border border-zinc-700 text-gray-100 p-2 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 rounded scroll-blue"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
