interface Todo {
    likeCnt: number;
    dislikeCnt: number;
    todoText: string;
  }
  
export const addTodoAction=(data:Todo[])=>({
    type:"ADD_TODO",
    payload:data,   
});
