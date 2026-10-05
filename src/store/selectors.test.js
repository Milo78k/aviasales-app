/* eslint-env jest */
import { configureStore } from '@reduxjs/toolkit';
import { selectVisibleTickets } from './selectors';
import ticketsReducer from './ticketsSlice';
import { setAllTicketsLoaded } from './ticketActions';
import { fetchTickets } from './fetchTickets';

const ticket = (price, durations, stops = [[], []]) => ({
  price,
  segments: durations.map((duration, i) => ({ duration, stops: stops[i] })),
});
const state = (allTickets, filters = ['0'], sort = 'cheapest') => ({
  tickets: { allTickets, visibleCount: 5 },
  filters,
  sort,
});

test('fastest uses both segments and does not mutate the source list', () => {
  const tickets = [ticket(10, [10, 100]), ticket(20, [20, 20])];
  expect(selectVisibleTickets(state(tickets, ['0'], 'fastest'))[0].price).toBe(
    20,
  );
  expect(tickets[0].price).toBe(10);
});
test('clearing filters hides tickets and both legs must match', () => {
  const tickets = [ticket(10, [10, 10]), ticket(20, [10, 10], [[], ['X']])];
  expect(selectVisibleTickets(state(tickets, []))).toEqual([]);
  expect(selectVisibleTickets(state(tickets))).toHaveLength(1);
});
test('the shared completion action updates the loading-complete flag', () => {
  expect(
    ticketsReducer(undefined, setAllTicketsLoaded()).allTicketsLoaded,
  ).toBe(true);
});
test('an in-flight load prevents a second request', async () => {
  const originalFetch = global.fetch;
  global.fetch = jest.fn();
  const store = configureStore({
    reducer: { tickets: ticketsReducer },
    preloadedState: {
      tickets: {
        allTickets: [],
        visibleCount: 5,
        loading: true,
        allTicketsLoaded: false,
        error: null,
      },
    },
  });
  try {
    const result = await store.dispatch(fetchTickets());
    expect(result.meta.condition).toBe(true);
    expect(global.fetch).not.toHaveBeenCalled();
  } finally {
    global.fetch = originalFetch;
  }
});
