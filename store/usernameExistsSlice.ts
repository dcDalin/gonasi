import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { supabase } from '@/lib/supabase';

interface UsernameExistsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  username: boolean;
}

const initialState: UsernameExistsState = {
  status: 'idle',
  username: false,
};

export const checkUsernameExists = createAsyncThunk(
  'usernameExists/check',
  async (username: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const usernameExistsSlice = createSlice({
  name: 'usernameExists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUsernameExists.pending, (state) => {
        state.status = 'loading';
        state.username = false;
      })
      .addCase(checkUsernameExists.fulfilled, (state) => {
        console.log('Fullfilled &&&&&&&&&&&');
        state.status = 'succeeded';
        state.username = true;
      })
      .addCase(checkUsernameExists.rejected, (state) => {
        state.status = 'failed';
        state.username = false;
      });
  },
});

export default usernameExistsSlice.reducer;
