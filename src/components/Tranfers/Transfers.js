import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTransfer } from '../../store/filtersSlice';
import styles from './Transfers.module.scss';

const transferOptions = [
  { label: 'Все', value: 'all' },
  { label: 'Без пересадок', value: '0' },
  { label: '1 пересадка', value: '1' },
  { label: '2 пересадки', value: '2' },
  { label: '3 пересадки', value: '3' },
];

export default function Transfers() {
  const selected = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const isAllChecked = selected.length === 4;

  return (
    <div className={styles.transfers}>
      <h3 className={styles['transfers-header']}>Количество пересадок</h3>
      {transferOptions.map((option) => (
        <label key={option.value} className={styles['transfers-checkbox']}>
          <input
            type="checkbox"
            checked={
              option.value === 'all'
                ? isAllChecked
                : selected.includes(option.value)
            }
            onChange={() => dispatch(toggleTransfer(option.value))}
          />
          <span className={styles['custom-checkbox']} />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
