import React from 'react';
import logo from './Logo.svg';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" />
    </div>
  );
}
