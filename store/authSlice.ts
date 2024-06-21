import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session, User, WeakPassword } from '@supabase/supabase-js';
import { jwtDecode, JwtPayload } from 'jwt-decode';

import { supabase } from '@/lib/supabase';

type UserProfile = {
  username: string;
  avatarUrl: string;
};

interface AuthState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoggedIn: boolean;
  userRole: string | null;
  session: Session | null;
  profile: UserProfile | null;
}

const initialState: AuthState = {
  status: 'idle',
  error: null,
  isLoggedIn: false,
  userRole: null,
  session: null,
  profile: null,
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

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (session: Session, { rejectWithValue }) => {
    try {
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserSession(state, action: PayloadAction<Session | null>) {
      if (action.payload) {
        const { user_role }: GoJwtPayload = jwtDecode(
          action.payload.access_token
        );

        if (user_role) {
          return {
            ...state,
            status: 'succeeded',
            isLoggedIn: true,
            userRole: user_role,
            session: action.payload,
          };
        } else {
          supabase.auth.signOut();
          return {
            ...state,
            status: 'failed',
            isLoggedIn: false,
            userRole: null,
            session: null,
          };
        }
      } else {
        supabase.auth.signOut();
        return {
          ...state,
          status: 'failed',
          isLoggedIn: false,
          userRole: null,
          session: null,
        };
      }
    },
    resetErrors(state) {
      state.status = 'idle';
      state.error = null;
    },
    logout(state) {
      supabase.auth.signOut();
      return {
        ...state,
        isLoggedIn: false,
        userRole: null,
        status: 'idle',
        error: null,
        session: null,
      };
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
          isLoggedIn: false,
          userRole: null,
          session: null,
          error: action.payload,
        };
      });
  },
});

export const { logout, resetErrors, updateUserSession } = authSlice.actions;

export default authSlice.reducer;
