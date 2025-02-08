import { Reducer, createSlice } from '@reduxjs/toolkit';

export interface ProgressBarStatePayload {
  progress: number | null;
  toggleProgressBar: boolean | null;
}

export const initialProgressBarState: ProgressBarStatePayload = {
  progress: 0,
  toggleProgressBar: true,
};

export const progressBarSlice = createSlice({
  name: 'progressBar',
  initialState: initialProgressBarState,
  reducers: {
    setProgress: (state, { payload }) => {
      state.progress = payload;
    },
    toggleProgressBar: (state, { payload }) => {
      state.toggleProgressBar = payload;
    },
  },
});

export const progressBarReducer = progressBarSlice.reducer as Reducer<ProgressBarStatePayload>;

export const { setProgress, toggleProgressBar } = progressBarSlice.actions;
