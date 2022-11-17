import Button from "../Button";
import "./styles.css";
interface TodoItemProps {
  id: string;
  likeCnt: number;
  dislikeCnt: number;
  todoText: string;
  handleLike: (e: React.MouseEvent<HTMLElement>) => void;
  handleDislike: (e: React.MouseEvent<HTMLElement>) => void;
}
export default function TodoItem(props: TodoItemProps) {
  const { id, handleLike, handleDislike, likeCnt, dislikeCnt, todoText } =
    props;
  return (
    <div className="todo-item">
      <Button type="like" id={id} handleClick={handleLike} label={likeCnt} />
      <Button
        type="dislike"
        id={id}
        handleClick={handleDislike}
        label={dislikeCnt}
      />
      <p>{todoText}</p>
    </div>
  );
}
