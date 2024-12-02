import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { MenuButton } from "./components/MenuButton";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <>
      <MenuButton></MenuButton>
      <Header />
      <Sidebar />
      <div className="mainbody">
        <ProfilePage />
      </div>
    </>
  );
}
export default App;
