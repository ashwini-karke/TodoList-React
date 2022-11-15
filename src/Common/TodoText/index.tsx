import './styles.css'
export default function TodoText(props:{text:string}) {
    const {text}=props;
  return (
    <p>{text}</p>
  )
}
