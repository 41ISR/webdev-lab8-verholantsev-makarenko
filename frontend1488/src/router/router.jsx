import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Logout from "../pages/Logout";
import CreateItem from "../pages/CreateItem";
import ItemsList from "../pages/ItemsList";


export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: "true",
                    element: <ItemsList />
                },
                {
                    path:"/createitem",
                    element: <CreateItem  />
                },
            ]
        },
        {
            path:"/signup",
            element: <SignUp  />
        },
        {
            path:"/signin",
            element: <SignIn />
        },
        {
            path:"/logout",
            element: <Logout  />
        },
    ]
)