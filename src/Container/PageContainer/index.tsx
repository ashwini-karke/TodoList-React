import Button from "../../Common/Button";
import TodoText from "../../Common/TodoText";
import "./styles.css";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

interface Todo {
  likeCnt: number;
  dislikeCnt: number;
  todoText: string;
}

export default function PageContainer({
  itemsPerPage,
}: {
  itemsPerPage: number;
}) {
  const todoList: Todo[] = [
    {
      likeCnt: 5,
      dislikeCnt: 3,
      todoText: "This is an existing topic returned from the server (mocked)",
    },
  ];

  const [itemOffset, setItemOffset] = useState(0);
  const [list, setList] = useState(todoList);
  const [inputValue, setValue] = useState("");
  const [emptyErr,setErr]=useState('')

  function handleLike(e: any) {
    const id = e.target.id.slice(4, 6);
    console.log(id)
    if (
      (list[id].likeCnt === 0 && list[id].dislikeCnt === 0) ||
      (list[id].likeCnt === 5 && list[id].dislikeCnt === 3)
    ) {
      list[id].likeCnt += 1;
    } else if (
      (list[id].likeCnt === 1 && list[id].dislikeCnt === 0) ||
      (list[id].likeCnt === 6 && list[id].dislikeCnt === 3)
    ) {
      list[id].likeCnt -= 1;
    } else if (
      (list[id].likeCnt === 0 && list[id].dislikeCnt === 1) ||
      (list[id].likeCnt === 5 && list[id].dislikeCnt === 4)
    ) {
      list[id].likeCnt += 1;
      list[id].dislikeCnt -= 1;
    }

    const sortedList = [...list].sort((a, b) => {
      return b.likeCnt - a.likeCnt;
    });
    setList(sortedList);
  }

  function handleDislike(e: any) {
    const id = e.target.id.slice(4, 5);
    if (
      (list[id].likeCnt === 0 && list[id].dislikeCnt === 0) ||
      (list[id].likeCnt === 5 && list[id].dislikeCnt === 3)
    ) {
      list[id].dislikeCnt += 1;
    } else if (
      (list[id].likeCnt === 1 && list[id].dislikeCnt === 0) ||
      (list[id].likeCnt === 6 && list[id].dislikeCnt === 3)
    ) {
      list[id].dislikeCnt += 1;
      list[id].likeCnt -= 1;
    } else if (
      (list[id].likeCnt === 0 && list[id].dislikeCnt === 1) ||
      (list[id].likeCnt === 5 && list[id].dislikeCnt === 4)
    ) {
      list[id].dislikeCnt -= 1;
    }

    const sortedList = [...list].sort((a, b) => {
      return b.likeCnt - a.likeCnt;
    });
    setList(sortedList);
  }

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = list.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(list.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
  };

  function Items({ currentItems }: { currentItems: Todo[] }) {
    console.log(itemOffset)
    return (
      <>
        {currentItems &&
          currentItems.map(
            (data: Todo, index: number): JSX.Element => (
              <div key={index} className="todo-item">
                <Button
                  id={"todo" + (itemOffset + index)}
                  btnClass="fa fa-thumbs-o-up"
                  label={data.likeCnt}
                  handleClick={handleLike}
                />
                <Button
                  id={"todo" + (itemOffset + index)}
                  btnClass="fa fa-thumbs-o-down"
                  label={data.dislikeCnt}
                  handleClick={handleDislike}
                />
                <TodoText text={data.todoText} />
              </div>
            )
          )}
      </>
    );
  }

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit() {
    if (inputValue) {
      setErr('')
      setList((old) => [
        ...old,
        { likeCnt: 0, dislikeCnt: 0, todoText: inputValue },
      ]);
      setValue("");
    }
    else
    {
      setErr('Please fill out this field')
    }
  }

  return (
    <div className="page-conatiner">
      <div className="input-btn-container">
        <input value={inputValue} onChange={handleOnChangeInput} required />
        <Button
          id="btn"
          btnClass="submit"
          label="Submit"
          handleClick={handleSubmit}
        />

        {emptyErr && <p className="err-msg">{emptyErr}</p>}
        
      </div>

      <Items currentItems={currentItems} />

      <div className="pagination-wrapper">
        {list.length > 5 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="Previous"
            // renderOnZeroPageCount={null}
          />
        )}
      </div>
    </div>
  );
}
