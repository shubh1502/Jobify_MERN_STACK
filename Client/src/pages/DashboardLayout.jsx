import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallNavbar, BigNavbar, NavBar } from "../components/";
import { useState, useContext, createContext } from "react";
import customFetch from "../utils/customFetch";
const DashboardContext = createContext();
import { toast } from "react-toastify";
import { getDefaultTheme } from "../App"; // Import the function to get the default theme

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  // console.log(DashBoardContext);

  // const user = { name: "Shubham" };
  const user = useLoaderData();
  const navigate = useNavigate();

  const [showSideBar, setShowSideBar] = useState(false);
  const [isDark, setDark] = useState(getDefaultTheme());
  // console.log(showSideBar);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
    // console.log("toggleSideBar");
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setDark(newTheme);

    document.body.classList.toggle("dark-theme", newTheme);
    localStorage.setItem("DefaultTheme", newTheme);
  };

  const logout = async () => {
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
    navigate("/");
  };

  return (
    <DashboardContext.Provider
      value={{ user, isDark, showSideBar, toggleSideBar, toggleTheme, logout }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallNavbar />
          <BigNavbar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
