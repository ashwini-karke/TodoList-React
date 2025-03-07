import "./styles.css";

interface ButtonProps {
  btnClass?: string;
  label: string | number;
  id: string;
  key?: number;
  type?: string;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleKeypress?: (e: any) => void;
}

export default function Button(props: ButtonProps) {
  const { btnClass, label, id, type, handleClick, handleKeypress } = props;
  return (
    <button
      className={`${
        type === "like"
          ? "fa fa-thumbs-o-up"
          : type === "dislike"
          ? "fa fa-thumbs-o-down"
          : btnClass
      }`}
      id={id}
      onClick={handleClick}
      onKeyPress={handleKeypress}
    >
      {label}
    </button>
  );
}
