"use client";
import { useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const GREETING = "Hi! I'm the front desk for Sunshine Pressure Washing. What can I help you with?";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages(messages); // undo the failed message
        setInput(text);        // give it back so they can retry
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setMessages([...next, { role: "assistant", content: data.answer }]);
    } catch {
      setMessages(messages);
      setInput(text);
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex h-dvh max-w-xl flex-col p-4">
      <h1 className="text-2xl font-semibold">Sunshine Pressure Washing</h1>

      <div className="flex-1 space-y-3 overflow-y-auto py-4">
        <div className="flex justify-start">
          <p className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-2 text-black">{GREETING}</p>
        </div>

        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 ${
                m.role === "user" ? "bg-black text-white" : "bg-gray-100 text-black"
              }`}
            >
              {m.content}
            </p>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <p className="rounded-2xl bg-gray-100 px-4 py-2 text-gray-500">Typing…</p>
          </div>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder="Type your question…"
          className="flex-1 rounded border px-3 py-2 text-base"
        />
        <button
          disabled={loading || !input.trim()}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          Send
        </button>
      </form>
    </main>
  );
}