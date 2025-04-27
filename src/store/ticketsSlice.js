import { createSlice } from '@reduxjs/toolkit';
import { addTickets } from './ticketActions';
import { fetchTickets } from './fetchTickets';

const initialState = {
  allTickets: [],
  visibleCount: 5,
  loading: false,
  error: null,
  allTicketsLoaded: false,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    increaseVisibleCount(state) {
      return {
        ...state,
        visibleCount: state.visibleCount + 5,
      };
    },
    setAllTicketsLoaded(state) {
      return {
        ...state,
        allTicketsLoaded: true,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchTickets.fulfilled, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(fetchTickets.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      .addCase(addTickets, (state, action) => {
        const existingTicketsMap = new Map(
          state.allTickets.map((ticket) => [JSON.stringify(ticket), ticket]),
        );

        action.payload.forEach((ticket) => {
          const key = JSON.stringify(ticket);
          if (!existingTicketsMap.has(key)) {
            existingTicketsMap.set(key, ticket);
          }
        });

        return {
          ...state,
          allTickets: Array.from(existingTicketsMap.values()),
        };
      });
  },
});

export const { increaseVisibleCount, setAllTicketsLoaded } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;
