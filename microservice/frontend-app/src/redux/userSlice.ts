import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user state
export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  target: string;
  preferableActivity: string;
  role: string;
  password?: string;
  profileImage?: File;
  selectedLanguage: string;
}

const initialState: UserState = {
  email: '',
  firstName: '',
  lastName: '',
  preferableActivity: '',
  target: '',
  role: '',
  password: '',
  selectedLanguage: 'en',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer; 