export default function PageButton({
  title,
  onSendData,
}: {
  title: string;
  onSendData: (key: string) => void;
}) {
  return (
    <div
      onClick={() => onSendData(title)}
      className="shrink-0 cursor-pointer truncate rounded-md px-3 py-2 text-sm text-text-on-dark-muted transition-colors hover:bg-surface-raised hover:text-text-on-dark"
    >
      {title}
    </div>
  );
}
