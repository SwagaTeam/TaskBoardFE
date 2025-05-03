import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './index.css'
import './styles/fonts.css';

import {BoardPage} from "./pages/board-page.tsx";
import {MainPage} from "./pages/main-page.tsx";
import {mockTasks} from "./mock/board-mock.ts";
import {TasksPage} from "./pages/tasks-page.tsx";
import {LoginPage} from "./pages/autorization/LoginPage.tsx";
import {RegisterPage} from "./pages/autorization/RegisterPage.tsx";
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
            <Routes>
                <Route index element={<Navigate to="login" />} />
                <Route path='login' element={<LoginPage/>} />
                <Route path='register' element={<RegisterPage/>} />


                <Route path='/home' element={<MainPage/>}>
                    <Route index element={<Navigate to="boards" />} />
                    <Route path='projects' element={<BoardPage tasks={mockTasks}/>} />
                    <Route path='boards' element={<BoardPage tasks={mockTasks}/>} />
                    <Route path='tasks' element={<TasksPage />} />
                    <Route path='settings' element={<BoardPage tasks={mockTasks}/>} />
                    <Route path='history' element={<BoardPage tasks={mockTasks}/>} />
                </Route>

            </Routes>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
)
