import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";

const Logout = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useDashboardContext();
  // console.log(user);
  return (
    <Wrapper>
      <button
        type="button"
        className="logout-btn btn"
        onClick={() => {
          setShowLogout(!showLogout);
        }}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}

        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "show-dropdown dropdown" : "dropdown"}>
        <button className="dropdown-btn" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </Wrapper>
  );
};
export default Logout;
