import { SidebarComponent } from "../components/sidebar/sidebar-component.tsx";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCurrentUser } from "../store/userSlice";
import { fetchProjects } from "../store/projectSlice";
import "../styles/main-page.css";

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchCurrentUser());
        dispatch(fetchProjects());
    }, [dispatch]);

    const sidebarName = user.user?.username || "";

    return (
        <div className="main-page-root">
            <div className="main-page">
                <SidebarComponent name={sidebarName} />
                <div style={{ width: "1150px" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
