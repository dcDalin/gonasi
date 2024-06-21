import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';

type UserProfile = {
  username: string;
  avatarUrl: string;
};

interface AuthState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  profile: UserProfile | null;
}

const initialState: AuthState = {
  status: 'idle',
  error: null,
  profile: null,
};

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (session: Session, { rejectWithValue }) => {
    try {
      const {
        user: { id },
      } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error('Profile not found');
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileErrors(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<any>) => {
        const { username, avatar_url } = action.payload;

        return {
          ...state,
          status: 'succeeded',
          profile: {
            username: username ?? null,
            avatarUrl: avatar_url ?? null,
          },
        };
      })
      .addCase(getProfile.rejected, (state, action: PayloadAction<any>) => {
        supabase.auth.signOut();
        return {
          ...state,
          status: 'failed',
          error: action.payload,
        };
      });
  },
});

export const { resetProfileErrors } = profileSlice.actions;

export default profileSlice.reducer;
