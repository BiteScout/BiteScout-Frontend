import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { MenuButton } from "./components/MenuButton";

function App() {
  return (
    <>
      <MenuButton></MenuButton>
      <Header />
      <Sidebar />
      <div className="mainbody">
        <h1>SA</h1>
      </div>
    </>
  );
}
export default App;
