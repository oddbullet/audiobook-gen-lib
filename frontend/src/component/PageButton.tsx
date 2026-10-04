export default function PageButton({
  title,
  onSendData,
}: {
  title: string;
  onSendData: (key: string) => void;
}) {
  return (
    <div onClick={() => onSendData(title)} className="">
      {title}
    </div>
  );
}
