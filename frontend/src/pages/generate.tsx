import { useRef } from "react";

export default function Generate_Page() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = async () => {
    const text = textareaRef.current?.value;

    try {
      await fetch("http://localhost:8000/api/v1/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text }),
      });

      if (textareaRef.current) {
        textareaRef.current.value = "";
      }
    } catch (err) {
      console.error("Could not generate audio");
    }
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-8">
      <textarea
        ref={textareaRef}
        placeholder="Paste or type the text you want turned into audio..."
        className="min-h-56 w-full resize-y rounded-md border border-border-dark bg-surface-raised p-3 text-[15px] text-text-on-dark placeholder-text-on-dark-subtle outline-none transition-shadow focus:ring-2 focus:ring-accent"
      ></textarea>
      <button
        onClick={handleClick}
        type="button"
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-text shadow-[0_4px_14px_-2px_rgba(201,138,79,0.5)] transition-colors hover:bg-accent-hover"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
          <path d="M19 11a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 6 6.93V20H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.07A7 7 0 0 0 19 11Z" />
        </svg>
        Generate Audio
      </button>
    </div>
  );
}
