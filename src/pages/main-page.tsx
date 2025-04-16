import {SidebarComponent} from "../components/sidebar/sidebar-component.tsx";
import {Outlet} from "react-router-dom";
import '../styles/main-page.css'

export const MainPage = () => {
    return (
        <div className="main-page-root">
            <div className="main-page">
                <SidebarComponent/>
                <Outlet/>
            </div>

        </div>
    )
}
