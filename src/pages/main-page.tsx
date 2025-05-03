import {SidebarComponent} from "../components/sidebar/sidebar-component.tsx";
import {Outlet} from "react-router-dom";
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { fetchCurrentUser } from '../store/userSlice';
import { useAppSelector } from '../store/hooks';
import '../styles/main-page.css'

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    return (
        <div className="main-page-root">
            <div className="main-page">
                <SidebarComponent name={user?.name || 'Без имени'} />
                <Outlet/>
            </div>
        </div>
    )
}
