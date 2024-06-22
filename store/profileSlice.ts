import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';

type UserProfile = {
  username: string;
  avatarUrl: string;
  avatarHref: string | null;
  fullName: string;
};

type UpdateProfile = {
  session: Session | null;
  username: string;
  fullName: string;
  avatarUrl: string;
};

type GetProfilePayload = {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  avatarHref: string | null;
};

interface AuthState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  profile: UserProfile;
}

const initialState: AuthState = {
  status: 'idle',
  error: null,
  profile: {
    username: '',
    avatarUrl: '',
    fullName: '',
    avatarHref: null,
  },
};

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (session: Session | null, { rejectWithValue }) => {
    try {
      if (session) {
        const {
          user: { id },
        } = session;

        const { data, error } = await supabase
          .from('profiles')
          .select('username, full_name, avatar_url')
          .eq('id', id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (!data) {
          throw new Error('Profile not found');
        }

        const { data: storageData, error: storageError } =
          await supabase.storage
            .from('avatars')
            .download(data.avatar_url || '');

        if (storageError) {
          console.log('Storage error');
          return {
            ...data,
            avatarHref: null,
          };
        }

        const readFileAsDataURL = (
          file: Blob
        ): Promise<string | ArrayBuffer | null> => {
          return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = reject;
            fr.readAsDataURL(file);
          });
        };

        const avatarHref = await readFileAsDataURL(storageData);

        console.log('Profile found');
        return {
          ...data,
          avatarHref,
        };
      } else {
        throw new Error('Session not found');
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profile: UpdateProfile, { rejectWithValue }) => {
    try {
      if (profile.session) {
        console.log('****** session found');
        const {
          session: {
            user: { id },
          },
          username,
          fullName,
          avatarUrl,
        } = profile;

        const updates = {
          id,
          username,
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
          throw new Error(error.message);
        }

        return updates;
      } else {
        throw new Error('No session found');
      }
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
      .addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<GetProfilePayload>) => {
          console.log('******** payload: ', action.payload);
          const { username, avatar_url, full_name, avatarHref } =
            action.payload;

          return {
            ...state,
            status: 'succeeded',
            profile: {
              username: username ?? '',
              fullName: full_name ?? '',
              avatarUrl: avatar_url ?? '',
              avatarHref,
            },
          };
        }
      )
      .addCase(getProfile.rejected, (state, action: PayloadAction<any>) => {
        supabase.auth.signOut();
        return {
          ...state,
          status: 'failed',
          error: action.payload,
        };
      })
      .addCase(updateProfile.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<any>) => {
        const { username, fullName, avatarUrl } = action.payload;

        return {
          ...state,
          status: 'succeeded',
          profile: {
            username: username ?? '',
            fullName: fullName ?? '',
            avatarUrl: avatarUrl ?? '',
            avatarHref: null, // TODO: Look into this
          },
        };
      })
      .addCase(updateProfile.rejected, (state, action: PayloadAction<any>) => {
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
