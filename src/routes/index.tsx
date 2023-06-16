import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { useAuth } from "hooks";
import { Role } from "types";
import { ProtectedRoute } from "./ProtectedRoute";

const Routes = () => {
  const { token, user } = useAuth();

  const routesForPublic = [
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  const routesForStudentsOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/absente",
          element: <div>Absente</div>,
        },
        {
          path: "/dashboard",
          element: <div>Dashboard</div>,
        },
      ],
    },
  ];

  const roleForAdminsProfsOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/students",
          element: <div>Studenti</div>,
        },
        {
          path: "/students/:id/absente",
          element: <div>Absente S</div>,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <div>Login</div>,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...(token && user && user.role === Role.STUDENT ? routesForStudentsOnly : []),
    ...(token && user && user.role !== Role.STUDENT ? roleForAdminsProfsOnly : []),
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
