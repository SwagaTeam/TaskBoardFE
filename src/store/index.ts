import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import projectReducer from "./projectSlice";
import boardReducer from "./boardSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectReducer,
        boards: boardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
