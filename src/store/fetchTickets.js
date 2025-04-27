import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTickets, setAllTicketsLoaded } from './ticketActions';

const BASE_URL = 'https://aviasales-test-api.kata.academy';

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const fetchTicketBatch = async (searchId) => {
  const response = await fetch(`${BASE_URL}/tickets?searchId=${searchId}`);
  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }

  const data = await response.json();

  if (!('tickets' in data) || !('stop' in data)) {
    throw new Error('Некорректный формат ответа сервера');
  }

  return data;
};

const fetchAllTickets = async (searchId, dispatch) => {
  let errorRetries = 0;
  const MAX_ERROR_RETRIES = 10;

  const load = async () => {
    try {
      const batchData = await fetchTicketBatch(searchId);
      dispatch(addTickets(batchData.tickets));

      if (batchData.stop) {
        dispatch(setAllTicketsLoaded());
      } else {
        await load();
      }
    } catch (error) {
      if (error.message.includes('500') || error.message.includes('502')) {
        errorRetries += 1;
        if (errorRetries < MAX_ERROR_RETRIES) {
          await delay(200);
          await load();
        } else {
          throw new Error('Превышено количество попыток загрузки');
        }
      } else {
        throw new Error('Критическая ошибка при загрузке билетов');
      }
    }
  };

  await load();
};

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/search`);
      if (!response.ok) {
        throw new Error('Ошибка получения searchId');
      }
      const { searchId } = await response.json();
      await fetchAllTickets(searchId, dispatch);
      return undefined;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
