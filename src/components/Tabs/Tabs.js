import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../store/sortSlice';
import styles from './Tabs.module.scss';

const tabs = [
  { value: 'cheapest', label: 'САМЫЙ ДЕШЕВЫЙ' },
  { value: 'fastest', label: 'САМЫЙ БЫСТРЫЙ' },
  { value: 'optimal', label: 'ОПТИМАЛЬНЫЙ' },
];

export default function Tabs() {
  const sortType = useSelector((state) => state.sort);
  const dispatch = useDispatch();

  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <button
          type="button"
          key={tab.value}
          className={`${styles['tabs-btn']} 
            ${sortType === tab.value ? styles['btn-active'] : ''} 
            ${index === 0 ? styles.first : ''} 
            ${index === tabs.length - 1 ? styles.last : ''}`}
          onClick={() => dispatch(setSortType(tab.value))}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
