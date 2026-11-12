export default function PageButton({
  title,
  isActive = false,
  onSendData,
}: {
  title: string;
  isActive?: boolean;
  onSendData: (key: string) => void;
}) {
  return (
    <div
      onClick={() => onSendData(title)}
      className={`shrink-0 cursor-pointer truncate rounded-md px-3 py-2 text-sm transition-colors ${
        isActive
          ? "bg-selected-row-bg font-medium text-accent"
          : "text-text-on-dark-muted hover:bg-surface-raised hover:text-text-on-dark"
      }`}
    >
      {title}
    </div>
  );
}
