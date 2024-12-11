import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { MenuButton } from "./components/MenuButton";
//import NotificationPage from "./pages/NotificationPage";
import MyReservations from "./pages/MyReservations";

function App() {
  return (
    <>
      <MenuButton></MenuButton>
      <Header />
      <Sidebar />
      <div className="mainbody">
        <MyReservations />
      </div>
    </>
  );
}
export default App;
