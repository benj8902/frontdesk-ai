"use client";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    if(!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer ?? data.error);
    } catch {
      setAnswer("Couldn't reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold">Sunshine Pressure Washing</h1>
      <p className="mt-1 text-gray-500">Ask our front desk anything.</p>
      <form onSubmit={ask} className="mt-6 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Do you clean driveways in Largo?"
          className="flex-1 rounded border px-3 py-2"
        />
        <button disabled={loading} className="rounded bg-black px-4 py-2 text-white disabled:opacity-50">
          {loading ? "…" : "Ask"}
        </button>
      </form>
      {answer && <p className="mt-6 whitespace-pre-wrap rounded bg-gray-100 p-4 text-black">{answer}</p>}
    </main>
  );
};