import Wrapper from "../assets/wrappers/BigSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import NavLinks from "./NavLinks";
import Logo from "./Logo";

const BigNavbar = () => {
  const { showSideBar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container" : "show-sidebar sidebar-container"
        }
      >
        <header>
          <Logo />
        </header>
        <NavLinks isBigSidebar />
      </div>
    </Wrapper>
  );
};
export default BigNavbar;
