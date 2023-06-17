import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { useAuth } from "hooks";
import { Role } from "types";
import { ProtectedRoute } from "./ProtectedRoute";
import { Absenta, Groups, Login, Noutati, Students } from "pages";
import { StudentAttendence } from "pages/StudentAttendence";

const Routes = () => {
  const { token, user } = useAuth();

  const routesForPublic = [
    {
      path: "/noutati",
      element: <Noutati />,
    },
    {
      path: "/absente",
      element: <StudentAttendence />,
    },
    {
      path: "/grupe/:id",
      element: <Students id={"1"} />,
    },
    {
      path: "/grupe",
      element: <Groups />,
    },
    {
      path: "/students/:id/absente",
      element: <Absenta id={"1"} />,
    },
  ];

  const routesForStudentsOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/noutati",
          element: <Noutati />,
        },
        {
          path: "/absente",
          element: <StudentAttendence />,
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
          path: "/grupe/:id",
          element: <Students id={"1"} />,
        },
        {
          path: "/students/:id/absente",
          element: <Absenta id={"1"} />,
        },
        {
          path: "/grupe",
          element: <Groups />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
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
