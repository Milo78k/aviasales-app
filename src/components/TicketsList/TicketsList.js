import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../../store/fetchTickets';
import { selectVisibleTickets } from '../../store/selectors';
import Loading from '../Loading';
import Ticket from '../Ticket';
import styles from './TicketsList.module.scss';

export default function TicketsList() {
  const dispatch = useDispatch();

  const visibleTickets = useSelector(selectVisibleTickets);
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);
  const allTicketsLoaded = useSelector(
    (state) => state.tickets.allTicketsLoaded,
  );

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  if (error) return <p>Ошибка загрузки: {error}</p>;

  return (
    <div className={styles['tickets-list']}>
      {loading && !allTicketsLoaded && <Loading />}
      {allTicketsLoaded && visibleTickets.length === 0 && (
        <p>Нет доступных билетов.</p>
      )}
      {visibleTickets.map((ticket) => (
        <Ticket key={uuidv4()} ticket={ticket} />
      ))}
    </div>
  );
}
