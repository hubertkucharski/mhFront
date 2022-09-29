import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {User} from '../../../../week8.project.mh.back/src/user/user.entity';

export const validateCurrUserAsync = createAsyncThunk(
    'user/validate',
    async () => {
        try {
        const res = await fetch('http://localhost:3001/auth/check-user', {
            credentials: 'include',
        })
        const data = await res.json();
        if(res.status === 401) {
            return res.status
        }
        return data;
            }

        catch(e){
            console.log('Can not reach database.')
        }
    }
)

interface sliceState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: sliceState = {
    user: null,
    status: 'idle',
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(validateCurrUserAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(validateCurrUserAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload.user;
        })
        .addCase(validateCurrUserAsync.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export default userSlice.reducer;
