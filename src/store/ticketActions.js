import { createAction } from '@reduxjs/toolkit';

export const addTickets = createAction('tickets/addTickets');
export const increaseVisibleCount = createAction(
  'tickets/increaseVisibleCount',
);
export const setAllTicketsLoaded = createAction('tickets/setAllTicketsLoaded');
