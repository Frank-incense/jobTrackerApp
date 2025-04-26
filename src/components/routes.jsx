import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import JobBoard from "../pages/JobBoard/JobBoard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProfilePage from "../pages/UserProfile";
import Job from "./Job";
import ProtectedRoutes from "./ProtectedRoutes";

export const routes = [
  {
    path: "/",
    element: <ProtectedRoutes/>,
    errorElement: <ErrorPage />,
    children: [
        {
            path: "/",
            element: <App/>,
            children: [
                {
                    path: "/job-listing",
                    element: <JobBoard/>,
                    children: [

                    ]
                },
                {
                    path: "/user",
                    element: <ProfilePage/>,
                    children: [

                    ]
                },
                {
                    path: "/job/:id",
                    element: <Job/>,
                    children: [

                    ]
                },

            ]
        },
      ]
    },
    
    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorPage />,
        children: [

        ]
    },
    {
        path: "/register",
        element: <Register/>,
        errorElement: <ErrorPage />,
        children: [

        ]
    },

];
