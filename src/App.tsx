import "./App.css";
import PageContainer from "./Container/PageContainer";

interface Todo {
  likeCnt: number;
  dislikeCnt: number;
  todoText: string;
}


function App() {
  return (
    <div className="App">
     <PageContainer itemsPerPage={5} />
    </div>
  );
}

export default App;
