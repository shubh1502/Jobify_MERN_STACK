import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import Logout from "./Logout";
import { useDashboardContext } from "../pages/DashboardLayout";
import ThemeButton from "./ThemeButton";

const NavBar = () => {
  const { toggleSideBar, logout, toggleTheme } = useDashboardContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashbaord</h4>
        </div>
        <div className="btn-container">
          <ThemeButton />
          <Logout />
        </div>
      </div>
    </Wrapper>
  );
};
export default NavBar;
