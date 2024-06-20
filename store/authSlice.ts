import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session, User, WeakPassword } from '@supabase/supabase-js';
import { jwtDecode, JwtPayload } from 'jwt-decode';

import { supabase } from '@/lib/supabase';

interface AuthState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoggedIn: boolean;
  userRole: string | null;
}

const initialState: AuthState = {
  status: 'idle',
  error: null,
  isLoggedIn: false,
  userRole: null,
};

type SignUpCredentials = {
  email: string;
  password: string;
  options: {
    data: {
      username: string;
    };
  };
};

type LoginData = {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
};

interface GoJwtPayload extends JwtPayload {
  user_role?: string;
}

type LoginCredentials = { email: string; password: string };

export const usernameExists = createAsyncThunk(
  'auth/usernameExists',
  async (username: string, { rejectWithValue }) => {
    try {
      const { error, data } = await supabase
        .from('profiles')
        .select(`username`)
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

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const { error, data } =
        await supabase.auth.signInWithPassword(credentials);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signup',
  async (credentials: SignUpCredentials, { rejectWithValue }) => {
    try {
      const { error, data } = await supabase.auth.signUp(credentials);

      if (error) {
        console.log('Error is: ', error);
        throw new Error(error.message);
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const checkIsLoggedIn = createAsyncThunk(
  'auth/checkIsLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      const { error, data } = await supabase.auth.getSession();

      if (error) {
        throw new Error(error.message);
      }

      if (!data.session) {
        throw new Error('No session found');
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetErrors(state) {
      state.status = 'idle';
      state.error = null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userRole = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginData>) => {
          const { user_role }: GoJwtPayload = jwtDecode(
            action.payload.session.access_token
          );

          return {
            ...state,
            status: 'succeeded',
            isLoggedIn: true,
            userRole: user_role || '',
          };
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to login';
        state.isLoggedIn = false;
        state.userRole = null;
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.isLoggedIn = false;
        state.userRole = null;
      })
      .addCase(
        signUpUser.fulfilled,
        (state, action: PayloadAction<{ session: any }>) => {
          state.status = 'succeeded';
          state.isLoggedIn = false;
          state.userRole = null;
        }
      )
      .addCase(signUpUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to login';
        state.isLoggedIn = false;
        state.userRole = null;
      })
      .addCase(checkIsLoggedIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        checkIsLoggedIn.fulfilled,
        (state, action: PayloadAction<any>) => {
          const { user_role }: GoJwtPayload = jwtDecode(
            action.payload.access_token
          );

          return {
            ...state,
            status: 'succeeded',
            isLoggedIn: true,
            userRole: user_role || '',
          };
        }
      )
      .addCase(
        checkIsLoggedIn.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = 'failed';
          state.error = action.payload || 'Failed to login';
          state.isLoggedIn = false;
          state.userRole = null;
        }
      );
  },
});

export const { logout, resetErrors } = authSlice.actions;

export default authSlice.reducer;
