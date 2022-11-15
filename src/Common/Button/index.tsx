import './styles.css'

interface ButtonProps{
    btnClass:string;
    label:string | number;
    id:string;
    handleClick: (e: React.MouseEvent<HTMLElement>) => void;
    handleKeypress?:(e: any) => void
}

export default function Button(props:ButtonProps) {
    const {btnClass,label,id,handleClick,handleKeypress}=props;
  return (
    <button className={btnClass} id={id} onClick={handleClick} onKeyPress={handleKeypress}>{label}</button>
  )
}
