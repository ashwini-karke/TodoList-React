import Button from "../../Common/Button";
import "./styles.css";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import TodoItem from "../../Common/TodoItem";

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
    // Initial list
    {
      likeCnt: 5,
      dislikeCnt: 3,
      todoText: "This is an existing topic returned from the server (mocked)",
    },
  ];

  const [itemOffset, setItemOffset] = useState(0);
  const [list, setList] = useState(todoList);
  const [inputValue, setValue] = useState("");
  const [emptyErr, setErr] = useState("");

  function handleLike(e: any) {
    // Like button login

    const id = e.target.id.slice(4, 6);

    if (list[id].likeCnt === 0 || list[id].likeCnt === 5) {
      list[id].likeCnt += 1;
      if (list[id].dislikeCnt > 3) {
        list[id].dislikeCnt -= 1;
      }
      if (list[id].dislikeCnt === 1) {
        list[id].dislikeCnt -= 1;
      }
    } else if (list[id].likeCnt === 1 || list[id].likeCnt === 6) {
      list[id].likeCnt -= 1;
    }

    const sortedList = [...list].sort((a, b) => {
      return b.likeCnt - b.dislikeCnt - (a.likeCnt - a.dislikeCnt);
    });
    setList(sortedList);
  }

  function handleDislike(e: any) {
    // Dislike button logic
    const id = e.target.id.slice(4, 5);
    if (list[id].dislikeCnt === 0 || list[id].dislikeCnt === 3) {
      list[id].dislikeCnt += 1;
      if (list[id].likeCnt > 5) {
        list[id].likeCnt -= 1;
      }
      if (list[id].likeCnt === 1) {
        list[id].likeCnt -= 1;
      }
    } else if (list[id].dislikeCnt === 1 || list[id].dislikeCnt === 4) {
      list[id].dislikeCnt -= 1;
    }

    const sortedList = [...list].sort((a, b) => {
      return b.likeCnt - b.dislikeCnt - (a.likeCnt - a.dislikeCnt);
    });
    setList(sortedList);
  }

  const endOffset = itemOffset + itemsPerPage; // calc of no. of indexes per page  i.e 0-5, 5-10
  const currentItems = list.slice(itemOffset, endOffset); // storing that indexes in new variable
  const pageCount = Math.ceil(list.length / itemsPerPage); // no. of pages required

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % list.length; // setting indexes for per page
    setItemOffset(newOffset);
  };

  function Items({ currentItems }: { currentItems: Todo[] }) {
    // mapping the currentItems new array to the jsx
    return (
      <>
        {currentItems &&
          currentItems.map(
            (data: Todo, index: number): JSX.Element => (
              <TodoItem
                id={"todo" + (itemOffset + index)}
                handleLike={handleLike}
                handleDislike={handleDislike}
                likeCnt={data.likeCnt}
                dislikeCnt={data.dislikeCnt}
                todoText={data.todoText}
              />
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
      setErr("");
      setList((old) => [
        // Adding new todo to list
        ...old,
        { likeCnt: 0, dislikeCnt: 0, todoText: inputValue },
      ]);
      setValue("");
    } else {
      setErr("Please fill out this field");
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
      <Items currentItems={currentItems} />{" "}
      {/* Displaying the mapped currentItems component to UI pagewise*/}
      <div className="pagination-wrapper">
        {" "}
        {/* React Pagination component */}
        {list.length > 5 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="Previous"
          />
        )}
      </div>
    </div>
  );
}
