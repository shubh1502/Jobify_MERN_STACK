import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Stats,
  AllJobs,
  Profile,
  Admin,
  AddJob,
  EditJob,
} from "./pages";

import { actions as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { loader as DashboardLoader } from "./pages/DashboardLayout";
import { action as AddJobAction } from "./pages/AddJob";
import { loader as AllJobLoader } from "./pages/AllJobs";
import { loader as EditJobLoader } from "./pages/EditJob";
import { action as EditJobAction } from "./pages/EditJob";
import { action as DeleteAction } from "./pages/DeleteJob";
import { loader as AdminLoader } from "./pages/Admin";
import { action as ProfileAction } from "./pages/Profile";
import { loader as StatsLoader } from "./pages/Stats";

export const getDefaultTheme = () => {
  const newTheme = localStorage.getItem("DefaultTheme") === 'true';

  document.body.classList.toggle("dark-theme", newTheme);
  return newTheme;
};

getDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/register",
        element: <Register />,
        action: RegisterAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: LoginAction,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        loader: DashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: AddJobAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: StatsLoader,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: AllJobLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: ProfileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: AdminLoader,
          },
          {
            path: "edit-jobs/:id",
            element: <EditJob />,
            loader: EditJobLoader,
            action: EditJobAction,
          },
          {
            path: "delete-jobs/:id",
            action: DeleteAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
