import { Provider } from "react-redux";
import { store } from "./redux/store";
import Table from "./components/Table";
import Header from "./layout/Header";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Table />
      </Provider>
    </>
  );
}

export default App;
