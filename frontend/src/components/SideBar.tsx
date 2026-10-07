import { useState } from "react";

import PageButton from "./PageButton";

const MAX_TITLE_DISPLAY_LENGTH = 40;

export default function SideBar({
  chapters,
  onAddChapter,
  onSelectChapter,
}: {
  chapters: string[];
  onAddChapter: () => void;
  onSelectChapter: (key: string) => void;
}) {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("My Audiobook");
  const displayTitle =
    title.length > MAX_TITLE_DISPLAY_LENGTH
      ? `${title.slice(0, MAX_TITLE_DISPLAY_LENGTH).trimEnd()}…`
      : title;

  return (
    <aside className="flex gap-1 overflow-x-auto border-b border-border-dark bg-sidebar-bg p-3 md:w-56 md:shrink-0 md:flex-col md:overflow-x-visible md:overflow-y-auto md:border-b-0 md:border-r">
      {isEditingTitle ? (
        <input
          autoFocus
          type="text"
          value={title}
          className="w-full min-w-40 shrink-0 rounded-md border border-border-dark bg-surface-raised px-2 py-1.5 text-base font-semibold text-text-on-dark outline-none transition-shadow focus:ring-2 focus:ring-accent md:mb-2 md:min-w-0"
          onBlur={() => setIsEditingTitle(false)}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditingTitle(false);
            }
          }}
        />
      ) : (
        <h2
          onClick={() => setIsEditingTitle(true)}
          title={title}
          className="w-48 shrink-0 cursor-pointer wrap-break-word rounded-md border border-transparent px-2 py-1.5 text-base font-semibold text-text-on-dark transition-colors hover:border-border-dark hover:bg-surface-raised md:mb-2 md:w-auto"
        >
          {displayTitle}
        </h2>
      )}

      {chapters.map((key) => (
        <PageButton
          key={key}
          title={key}
          onSendData={() => onSelectChapter(key)}
        />
      ))}
      <button
        onClick={onAddChapter}
        className="inline-flex shrink-0 items-center gap-2 rounded-md border border-dashed border-border-dark px-3 py-2 text-left text-sm text-text-on-dark-subtle transition-colors hover:border-accent hover:text-accent md:mt-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add Chapter
      </button>
    </aside>
  );
}
