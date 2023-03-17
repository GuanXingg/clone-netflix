import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios';
import authApi from './authApi';
import { AuthErrorState, AuthResponseState, SubmitValues, UserInfoProps } from './interface';

interface AuthState {
  loading: boolean;
  data: any;
  err: AuthErrorState | null | unknown;
}

const initialState: AuthState = {
  loading: false,
  data: JSON.parse(localStorage.getItem('user') || '{}'),
  err: null,
};

export const authAsyncRegister = createAsyncThunk(
  'auth/register',
  async (data: SubmitValues, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res: AxiosResponse = await authApi.register(data);
      const resData: AuthResponseState = {
        status: res.status,
        data: res.data,
      };
      return fulfillWithValue(resData);
    } catch (error: any) {
      const err = error as AxiosError;
      const errData: AuthErrorState = {
        code: err.code,
        status: err.response?.status,
        name: err.name,
        message: err.message,
        data: err.response?.data,
      };
      return rejectWithValue(errData);
    }
  }
);

// export const authAsyncUpdateInfo = createAsyncThunk(
//   'auth/updateInfo',
//   async (data: UserInfoProps, { fulfillWithValue, rejectWithValue }) => {
//     const res: AxiosResponse = await authApi.updateInfo(data);

//   }
// );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(authAsyncRegister.pending, (state) => {
      localStorage.removeItem('user');

      state.loading = true;
      state.data = {};
      state.err = null;
    });
    builder.addCase(authAsyncRegister.fulfilled, (state, action) => {
      const { data } = action.payload;
      const userInfo = {
        ...data,
        exp: Date.now() * 1000000,
      };

      localStorage.setItem('user', JSON.stringify(userInfo));

      state.loading = false;
      state.data = userInfo;
      state.err = null;
    });
    builder.addCase(authAsyncRegister.rejected, (state, action) => {
      state.loading = false;
      state.data = {};
      state.err = action.payload;
    });
  },
});

export default authSlice.reducer;
