import { createSlice } from '@reduxjs/toolkit';

const sortSlice = createSlice({
  name: 'sort',
  initialState: 'cheapest',
  reducers: {
    setSortType: (_, action) => action.payload,
  },
});

export const { setSortType } = sortSlice.actions;
export default sortSlice.reducer;
