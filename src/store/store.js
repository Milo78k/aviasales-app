import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import sortReducer from './sortSlice';
import ticketsReducer from './ticketsSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
    tickets: ticketsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
