import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './index.css'
import './styles/fonts.css';

import {BoardPage} from "./pages/board-page.tsx";
import {MainPage} from "./pages/main-page.tsx";
import {mockTasks} from "./mock/board-mock.ts";
import {TasksPage} from "./pages/tasks-page.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage/>}>
                    <Route index element={<Navigate to="board" />} />
                    <Route path='board' element={<BoardPage tasks={mockTasks}/>} />
                    <Route path='tasks' element={<TasksPage />} />
                    <Route path='review' element={<BoardPage tasks={mockTasks}/>} />
                    <Route path='settings' element={<BoardPage tasks={mockTasks}/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
