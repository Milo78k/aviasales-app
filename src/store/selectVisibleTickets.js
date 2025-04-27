import { createSelector } from '@reduxjs/toolkit';

const filterByStops = (tickets, selectedStops) => {
  if (!selectedStops.length) return tickets;

  return tickets.filter((ticket) => {
    const [first, second] = ticket.segments;

    const firstStops = String(first.stops.length);
    const secondStops = String(second.stops.length);

    return (
      selectedStops.includes(firstStops) && selectedStops.includes(secondStops)
    );
  });
};

const sortTickets = (tickets, sortType) => {
  const sorted = [...tickets];
  if (sortType === 'cheapest') return sorted.sort((a, b) => a.price - b.price);
  if (sortType === 'fastest')
    return sorted.sort((a, b) => a.duration - b.duration);
  return sorted;
};

export const selectVisibleTickets = createSelector(
  (state) => state.tickets.allTickets,
  (state) => state.filters,
  (state) => state.sort,
  (state) => state.tickets.visibleCount,
  (tickets, stops, sortType, count) => {
    const filtered = filterByStops(tickets, stops);
    const sorted = sortTickets(filtered, sortType);
    return sorted.slice(0, count);
  },
);
