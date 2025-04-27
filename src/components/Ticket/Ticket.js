import React from 'react';
import { format, add } from 'date-fns';

import styles from './Ticket.module.scss';

export default function Ticket({ ticket }) {
  if (!ticket || !ticket.segments || !ticket.carrier || !ticket.price) {
    return <div>Некорректные данные</div>;
  }

  const formatTimeRange = (dateStr, duration) => {
    const departure = new Date(dateStr);
    const arrival = add(departure, { minutes: duration });

    return `${format(departure, 'HH:mm')} – ${format(arrival, 'HH:mm')}`;
  };

  const getStopWord = (count) => {
    if (count === 0) return 'Прямой рейс';
    if (count === 1) return '1 пересадка';
    if (count > 1 && count <= 4) return `${count} пересадки`;
    return `${count} пересадок`;
  };

  const getStopsList = (stops) => {
    if (!stops || stops.length === 0) return null;
    return stops.join(', ');
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.price}>{ticket.price} Р</span>
        <img
          src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
          alt={ticket.carrier}
          className={styles.logo}
        />
      </div>

      <div className={styles.wrapper}>
        {ticket.segments.map((segment) => (
          <div
            key={`${segment.origin}-${segment.destination}-${segment.date}`}
            className={styles.segment}
          >
            <div className={styles.column}>
              <div className={styles.label}>
                {segment.origin} – {segment.destination}
              </div>
              <div className={styles.value}>
                {formatTimeRange(segment.date, segment.duration)}
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.label}>В пути</div>
              <div className={styles.value}>
                {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.label}>
                {segment.stops && segment.stops.length > 0
                  ? getStopWord(segment.stops.length)
                  : 'Прямой рейс'}
              </div>
              <div className={styles.value}>
                {segment.stops && segment.stops.length > 0 && (
                  <div>{getStopsList(segment.stops)}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
