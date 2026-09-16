import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 px-6 text-slate-800">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
        Tailwind is set up
      </h1>
      <p className="text-slate-600">
        Edit{" "}
        <code className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-sm">
          src/App.tsx
        </code>{" "}
        and save to test HMR.
      </p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded-md border border-violet-500 bg-violet-50 px-4 py-2 font-medium text-violet-700 transition hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
      >
        Count is {count}
      </button>
    </main>
  );
}

export default App;
