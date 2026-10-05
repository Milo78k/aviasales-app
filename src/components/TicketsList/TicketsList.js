import React from 'react';
import { useSelector } from 'react-redux';
import { selectVisibleTickets } from '../../store/selectors';
import Loading from '../Loading';
import Ticket from '../Ticket';
import styles from './TicketsList.module.scss';

export default function TicketsList() {
  const visibleTickets = useSelector(selectVisibleTickets);
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);
  const allTicketsLoaded = useSelector(
    (state) => state.tickets.allTicketsLoaded,
  );

  if (error) return <p>Ошибка загрузки: {error}</p>;

  return (
    <div className={styles['tickets-list']}>
      {loading && !allTicketsLoaded && <Loading />}
      {allTicketsLoaded && visibleTickets.length === 0 && (
        <p>Нет доступных билетов.</p>
      )}
      {visibleTickets.map((ticket) => (
        <Ticket key={JSON.stringify(ticket)} ticket={ticket} />
      ))}
    </div>
  );
}
