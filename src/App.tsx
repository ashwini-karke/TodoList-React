import "./App.css";
import PageContainer from "./Container/PageContainer";

function App() {
  return (
    <div className="App">
      <PageContainer itemsPerPage={5} />
    </div>
  );
}
export default App;
