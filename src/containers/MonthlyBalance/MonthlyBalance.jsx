import { useGetMonthlyBalance } from './api/useGetMonthlyBalance';
import styles from './MonthlyBalance.module.css';

import Message from '../../components/Message/Message';
import { useNavigate } from 'react-router-dom';
import Add from '../../assets/icons/add.svg?react';

import { useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import MonthlyBalanceTable from './MonthlyBalanceTable';

function MonthlyBalance() {
  const navigate = useNavigate();
  const { isMonthlyBalanceLoading, monthlyBalance, error } =
    useGetMonthlyBalance();
  const [activeRow, setActiveRow] = useState({});
  return (
    <div className={styles.monthlyBalanceContainer}>
      <div className={styles.header}>
        <h2>Monthly Balance</h2>
        <button onClick={() => navigate('add')}>
          <Add />
        </button>
      </div>

      {isMonthlyBalanceLoading ? (
        <Spinner />
      ) : error ? (
        <Message>{error.message}</Message>
      ) : (
        <MonthlyBalanceTable
          data={monthlyBalance}
          setActiveRow={setActiveRow}
        />
      )}
    </div>
  );
}

export default MonthlyBalance;
