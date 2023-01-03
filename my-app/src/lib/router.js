import Login from "components/auth/Login";
import Register from "components/auth/Register";
import Dashboard from "components/dashboard";
import Layout from "components/layout";

import { createBrowserRouter } from "react-router-dom";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register"
//export const PROTECTED = "/protected"
export const DASHBOARD = "dashboard"

export const router = createBrowserRouter([
    {path: ROOT, element: "Public Root"},
    {path: LOGIN, element: <Login/>},
    {path: REGISTER, element: <Register/>},
    {path: DASHBOARD, element: <Dashboard/>
},
]);

