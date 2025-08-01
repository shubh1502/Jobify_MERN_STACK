import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";

import Logo from "./Logo";
const SmallNavbar = () => {
  const { toggleSideBar, showSideBar } = useDashboardContext();
  //   console.log(showSideBar);
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {links.map((link) => {
              const { text, path, icon } = link;
              return (
                <NavLink
                  to={path}
                  key={text}
                  className="nav-link"
                  onClick={toggleSideBar}
                  end
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallNavbar;
