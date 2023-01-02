import { useAuth } from "components/hooks/auth";
import Navbar from "components/navbar";
import { LOGIN } from "lib/router";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
    const { pathname } = useLocation();
    const  navigate = useNavigate();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (pathname.startsWith("/protected") && !user) {
            navigate(LOGIN);
        }
    }, [pathname, user]);

    if (isLoading) return "Loading...";

    return (
        <>
            <Navbar/>
            This is the child: <Outlet />
        </>
    )
}