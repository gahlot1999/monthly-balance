import styles from './MonthlyBalance.module.css';
import '../../styles/table.css';
import { formatCurrency } from '../../utils/helpers';
import Edit from '../../assets/icons/edit.svg?react';
import Delete from '../../assets/icons/delete.svg?react';
import { useNavigate } from 'react-router-dom';
import { useDeleteMonthlyBalance } from './api/useDeleteMonthlyBalance';
import { urls } from '../../config/apiConfig';
import Spinner from '../../components/Spinner/Spinner';

function MonthlyBalanceTable(props) {
  const { data, setActiveRow } = props;
  const { deleteMonthlyBalance, isMonthlyBalanceDeleting } =
    useDeleteMonthlyBalance();
  const navigate = useNavigate();

  if (isMonthlyBalanceDeleting) return <Spinner />;
  return (
    <div className={`tableContainer ${styles.monthlyBalanceTableContainer}`}>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Balance</th>
            <th>Post Salary</th>
            <th>Post Expenses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((data) => (
            <tr key={data._id}>
              <td>{data.monthYear}</td>
              <td>{formatCurrency(data.balance)}</td>
              <td>{formatCurrency(data.postSalaryBalance)}</td>
              <td>{formatCurrency(data.postDeductionBalance)}</td>
              <td className='tableIconContainer'>
                <button
                  onClick={() => {
                    setActiveRow(data);
                    navigate(`/monthlyBalance/edit/${data._id}`, {
                      state: data,
                    });
                  }}
                >
                  <Edit />
                </button>
                <button
                  onClick={() => {
                    const response = confirm(
                      'Are you sure you want to delete?',
                    );
                    if (response)
                      deleteMonthlyBalance({
                        url: `${urls.deleteMonthlyBalance}/${data._id}`,
                        method: 'DELETE',
                      });
                  }}
                >
                  <Delete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyBalanceTable;
