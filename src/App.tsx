import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { MenuButton } from "./components/MenuButton";
import NotificationPage from "./pages/NotificationPage";

function App() {
  return (
    <>
      <MenuButton></MenuButton>
      <Header />
      <Sidebar />
      <div className="mainbody">
        <NotificationPage />
      </div>
    </>
  );
}
export default App;
