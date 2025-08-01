import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";

const ThemeButton = () => {
  const { isDark, toggleTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleTheme}>
      {isDark ? (
        <BsFillMoonFill className="toggle-icon" />
      ) : (
        <BsFillSunFill className="toggle-icon" />
      )}
    </Wrapper>
  );
};
export default ThemeButton;
