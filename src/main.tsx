import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './index.css'

import {BoardPage} from "./pages/board-page.tsx";
import {MainPage} from "./pages/main-page.tsx";
import {mockTasks} from "./mock/tasks-mock.ts";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage/>}>
                    <Route index element={<Navigate to="board" />} />
                    <Route path='board' element={<BoardPage tasks={mockTasks}/>} />
                    <Route path='tasks' element={<BoardPage tasks={mockTasks}/>} />
                    <Route path='review' element={<BoardPage tasks={mockTasks}/>} />
                    <Route path='settings' element={<BoardPage tasks={mockTasks}/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
