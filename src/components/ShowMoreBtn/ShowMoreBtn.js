import React from 'react';
import styles from './ShowMoreBtn.module.scss';

export default function ShowMoreBtn({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={styles['show-more-btn']}>
      Показать ещё 5 билетов!
    </button>
  );
}
