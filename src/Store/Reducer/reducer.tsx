const initialState = {
  initialData: [{
      likeCnt: 5,
      dislikeCnt: 3,
      todoText: "This is an existing topic returned from the server (mocked)",
  }]
}
const addTodoReducer = (
  state = initialState,
  action: { type: string; payload: unknown }
) => {
  switch (action.type) {
    case "ADD_TODO":
      // console.log("Payload",state.initialData);
      return {
        ...state,
        initialData: action.payload,
      };

    default:
      return state;
  }
};

export default addTodoReducer;
