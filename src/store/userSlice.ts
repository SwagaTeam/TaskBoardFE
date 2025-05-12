import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
    id: number;
    username?: string;
    email: string;
    password?: string;
    imagePath?: string | null;
    salt?: string;
}

interface UserState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
};

export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
    'user/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('Токен не найден');
        }
        try {

            const currentResp = await fetch('/api/auth/current', {
                method: 'GET',
                headers: {
                    'accept': 'text/plain',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwianRpIjoiMjkzN2ExY2QtNzk2My00NGQ4LWE2MjItZDAzZTJlMGEyZjhmIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVVNFUiIsImV4cCI6MTc0NzA2NjAxNiwiaXNzIjoiVGFza0JvYXJkIiwiYXVkIjoiVGFza0JvYXJkQXVkaWVuY2UifQ.fclbuvlN2HBgNHXNqzJKXBDc8LbodR5Z0isrsR42iZI`,
                },
            });

            if (!currentResp.ok) {
                const errorText = await currentResp.text();
                return rejectWithValue(errorText || 'Ошибка при получении userId');
            }

            const currentData = await currentResp.json();
            const { userId } = currentData;
            if (!userId) {
                return rejectWithValue('userId не найден');
            }

            const userResp = await fetch(`/api/user/${userId}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwianRpIjoiMjkzN2ExY2QtNzk2My00NGQ4LWE2MjItZDAzZTJlMGEyZjhmIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVVNFUiIsImV4cCI6MTc0NzA2NjAxNiwiaXNzIjoiVGFza0JvYXJkIiwiYXVkIjoiVGFza0JvYXJkQXVkaWVuY2UifQ.fclbuvlN2HBgNHXNqzJKXBDc8LbodR5Z0isrsR42iZI`,
                },
            });

            if (!userResp.ok) {
                const errorText = await userResp.text();
                return rejectWithValue(errorText || 'Ошибка при получении пользователя');
            }

            const userData = await userResp.json();
            return userData as User;
        } catch (error: any) {
            return rejectWithValue(error?.message || 'Ошибка при fetch');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCurrentUser.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message || 'Ошибка';
            });
    },
});

export default userSlice.reducer;

