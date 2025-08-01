import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSideBar, user } = useDashboardContext();
  // console.log(user);
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        if (user.user.role !== "admin" && path === "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSideBar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
