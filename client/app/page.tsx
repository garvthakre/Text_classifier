"use client";

import { useState } from "react";

type Category = "accident" | "business" | "entertainment" | "political" | "sports" | null;

interface CategoryMeta {
  label: string;
  hindi: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
  dot: string;
}

const CATEGORIES: Record<Exclude<Category, null>, CategoryMeta> = {
  accident: {
    label: "Accident",
    hindi: "दुर्घटना",
    borderColor: "border-rose-500",
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-700",
    dot: "bg-rose-500",
  },
  business: {
    label: "Business",
    hindi: "व्यापार",
    borderColor: "border-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    dot: "bg-blue-500",
  },
  entertainment: {
    label: "Entertainment",
    hindi: "मनोरंजन",
    borderColor: "border-violet-500",
    bgColor: "bg-violet-50",
    textColor: "text-violet-700",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-700",
    dot: "bg-violet-500",
  },
  political: {
    label: "Political",
    hindi: "राजनीतिक",
    borderColor: "border-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    dot: "bg-amber-500",
  },
  sports: {
    label: "Sports",
    hindi: "खेल",
    borderColor: "border-emerald-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    dot: "bg-emerald-500",
  },
};

const ALL_CATEGORIES = Object.keys(CATEGORIES) as Exclude<Category, null>[];

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Category>(null);
  const [loading, setLoading] = useState(false);

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const handleClassify = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);

    // TODO: Replace this mock with real API call
    // const response = await fetch("/api/classify", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ text }),
    // });
    // const data = await response.json();
    // setResult(data.category);

    await new Promise((res) => setTimeout(res, 1200));
    const random = ALL_CATEGORIES[Math.floor(Math.random() * ALL_CATEGORIES.length)];
    setResult(random);
    setLoading(false);
  };

  const handleClear = () => {
    setText("");
    setResult(null);
  };

  const meta = result ? CATEGORIES[result] : null;

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">हि</span>
            </div>
            <span className="text-zinc-900 font-semibold text-lg tracking-tight">
              Hindi Text Classifier
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full font-mono">
              IndicBERT · Stacking Model
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">
            Hindi News Classification
          </h1>
          <p className="text-zinc-500 text-base">
            Paste any Hindi news article to identify its category instantly.
          </p>
        </div>
      </section>

      {/* Main Tool */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Input Panel */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
            <div className="px-6 pt-6 pb-3 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 font-mono mb-0.5">इनपुट</p>
                <h2 className="text-sm font-semibold text-zinc-700">Input Text</h2>
              </div>
              {text && (
                <button
                  onClick={handleClear}
                  className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex-1 p-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="यहाँ हिंदी समाचार पेस्ट करें..."
                className="w-full h-64 resize-none text-sm text-zinc-800 placeholder-zinc-300 bg-zinc-50 rounded-xl border border-zinc-200 p-4 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
              />
            </div>

            <div className="px-6 pb-6 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
              <button
                onClick={handleClassify}
                disabled={!text.trim() || loading}
                className="bg-zinc-900 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Classifying..." : "Classify →"}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
            <div className="px-6 pt-6 pb-3 border-b border-zinc-100">
              <p className="text-xs text-zinc-400 font-mono mb-0.5">आउटपुट</p>
              <h2 className="text-sm font-semibold text-zinc-700">Result</h2>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
              {/* Idle state */}
              {!result && !loading && (
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 border-2 border-dashed border-zinc-300 flex items-center justify-center">
                    <span className="text-zinc-400 text-2xl">?</span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Results will appear here
                  </p>
                  <p className="text-xs text-zinc-300">
                    Enter Hindi text and click Classify
                  </p>
                </div>
              )}

              {/* Loading state */}
              {loading && (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 bg-zinc-300 rounded-full animate-bounce" />
                    <span className="w-2.5 h-2.5 bg-zinc-400 rounded-full animate-bounce delay-100" />
                    <span className="w-2.5 h-2.5 bg-zinc-500 rounded-full animate-bounce delay-200" />
                  </div>
                  <p className="text-sm text-zinc-400">Analyzing text...</p>
                </div>
              )}

              {/* Result state */}
              {result && meta && (
                <div className={`w-full rounded-2xl border-l-4 ${meta.borderColor} ${meta.bgColor} p-6 flex flex-col gap-3`}>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${meta.textColor} opacity-70`}>
                    Predicted Category
                  </span>
                  <div className="flex items-end gap-3">
                    <span className={`text-4xl font-bold tracking-tight ${meta.textColor}`}>
                      {meta.label}
                    </span>
                    <span className={`text-xl font-medium mb-0.5 ${meta.textColor} opacity-60`}>
                      {meta.hindi}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 mt-1`}>
                    <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                    <span className={`text-xs ${meta.textColor} opacity-70`}>
                      IndicBERT + Stacking Classifier
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Category legend */}
            <div className="px-6 pb-6">
              <p className="text-xs text-zinc-400 mb-3 font-medium">Categories</p>
              <div className="flex flex-wrap gap-2">
                {ALL_CATEGORIES.map((cat) => (
                  <span
                    key={cat}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${CATEGORIES[cat].badgeBg} ${CATEGORIES[cat].badgeText}`}
                  >
                    {CATEGORIES[cat].label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info strip */}
        <div className="mt-6 bg-white rounded-2xl border border-zinc-200 px-6 py-4 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-zinc-500">Model: <span className="font-semibold text-zinc-700">Indic Sentence BERT NLI</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs text-zinc-500">Classifier: <span className="font-semibold text-zinc-700">SVM + LR Stacking</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            <span className="text-xs text-zinc-500">Features: <span className="font-semibold text-zinc-700">Autoencoder (768-dim)</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs text-zinc-500">Classes: <span className="font-semibold text-zinc-700">5 News Categories</span></span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            Hindi Text Classifier · Powered by IndicBERT + Stacking Classifier
          </span>
          <a
            href="#"
            className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </footer>
    </div>
  );
}