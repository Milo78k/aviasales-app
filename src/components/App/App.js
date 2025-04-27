import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './App.module.scss';
import Tabs from '../Tabs';
import TicketsList from '../TicketsList';
import ShowMoreBtn from '../ShowMoreBtn';
import Header from '../Header';
import Transfers from '../Tranfers';
import { fetchTickets } from '../../store/fetchTickets';
import { increaseVisibleCount } from '../../store/ticketsSlice';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleShowMoreClick = () => {
    dispatch(increaseVisibleCount());
  };

  return (
    <>
      <Header />
      <div className={styles.app}>
        <aside className={styles.aside}>
          <Transfers />
        </aside>
        <main className={styles.main}>
          <Tabs />
          <TicketsList />
          <ShowMoreBtn onClick={handleShowMoreClick} />
        </main>
      </div>
    </>
  );
}
