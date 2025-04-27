import { createSelector } from '@reduxjs/toolkit';

const filterByStops = (tickets, selectedStops = []) => {
  if (!selectedStops.length || selectedStops.includes('all')) return tickets;

  return tickets.filter((ticket) =>
    ticket.segments.every((segment) =>
      selectedStops.includes(String(segment.stops.length)),
    ),
  );
};

const sortTickets = (tickets, sortType) => {
  const sorted = [...tickets];
  if (sortType === 'cheapest') return sorted.sort((a, b) => a.price - b.price);
  if (sortType === 'fastest') {
    const getDuration = (ticket) =>
      ticket.segments[0].duration + ticket.segments[1].duration;
    return sorted.sort((a, b) => getDuration(a) - getDuration(b));
  }
  return sorted;
};

export const selectVisibleTickets = createSelector(
  (state) => state.tickets.allTickets,
  (state) => state.filters,
  (state) => state.sort,
  (state) => state.tickets.visibleCount,
  (allTickets, selectedStops, sortType, visibleCount) => {
    if (!allTickets.length) return [];

    const filteredTickets = filterByStops(allTickets, selectedStops);
    const sortedTickets = sortTickets(filteredTickets, sortType);

    return sortedTickets.slice(0, visibleCount);
  },
);
