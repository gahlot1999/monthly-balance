import { useState } from 'react';
import { TextInput } from '../../components/Input/Input';
import styles from './MonthlyBalance.module.css';
import { formatInputCurrency } from '../../utils/helpers';
import { regex } from '../../utils/constants';
import { validateForm } from './helpers';
import { useAddEditMonthlyBalance } from './api/useAddEditMonthlyBalance';
import { urls } from '../../config/apiConfig';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function MonthlyBalanceForm(props) {
  const { mode } = props;
  const isAddForm = mode === 'add';

  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const { addEditMonthlyBalance, isMonthlyBalanceAddingUpdating } =
    useAddEditMonthlyBalance(isAddForm);
  const [formData, setFormData] = useState(
    isAddForm
      ? {
          monthYear: '',
          balance: '',
          postSalaryBalance: '',
          postDeductionBalance: '',
        }
      : {
          monthYear: state.monthYear,
          balance: formatInputCurrency(state.balance.toString()),
          postSalaryBalance: formatInputCurrency(
            state.postSalaryBalance.toString(),
          ),
          postDeductionBalance: formatInputCurrency(
            state.postDeductionBalance.toString(),
          ),
        },
  );

  function handleChange(e) {
    const value = regex.formInput.test(e.target.name)
      ? formatInputCurrency(e.target.value)
      : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  }

  function handleFormAction(e) {
    e.preventDefault();

    switch (e.target.type) {
      case 'reset':
        setFormData({
          monthYear: '',
          balance: '',
          postSalaryBalance: '',
          postDeductionBalance: '',
        });
        navigate('/monthlyBalance');
        break;
      case 'submit':
        {
          const isFormValid = validateForm(formData);
          if (isFormValid) {
            const url = isAddForm
              ? urls.addMonthlyBalance
              : `${urls.updateMonthlyBalance}/${id}`;
            addEditMonthlyBalance({
              url: url,
              data: {
                monthYear:
                  formData.monthYear.charAt(0).toUpperCase() +
                  formData.monthYear.slice(1),
                balance: parseInt(formData.balance.replace(/[^0-9]/g, '')),
                postSalaryBalance: parseInt(
                  formData.postSalaryBalance.replace(/[^0-9]/g, ''),
                ),
                postDeductionBalance: parseInt(
                  formData.postDeductionBalance.replace(/[^0-9]/g, ''),
                ),
              },
              additionalHeaders: null,
            });
          }
        }
        break;
    }
  }

  return (
    <div className={styles.monthlyBalanceFormContainer}>
      <form>
        <h2>{`${isAddForm ? 'Add' : 'Edit'} Monthly Balance`}</h2>
        <div className={styles.inputFields}>
          <TextInput
            label='Month'
            placeholder='Format: mmm-yyyy'
            name='monthYear'
            mandatory
            disabled={isMonthlyBalanceAddingUpdating}
            value={formData.monthYear}
            onChange={handleChange}
          />

          <TextInput
            label='Balance'
            placeholder='Enter current balance'
            name='balance'
            mandatory
            disabled={isMonthlyBalanceAddingUpdating}
            inputMode='numeric'
            value={formData.balance}
            onChange={handleChange}
          />

          <TextInput
            label='Post Salary Balance'
            placeholder='Enter post salary balance'
            name='postSalaryBalance'
            mandatory
            disabled={isMonthlyBalanceAddingUpdating}
            inputMode='numeric'
            value={formData.postSalaryBalance}
            onChange={handleChange}
          />

          <TextInput
            label='Post Deduction Balance'
            placeholder='Enter post deduction balance'
            name='postDeductionBalance'
            mandatory
            disabled={isMonthlyBalanceAddingUpdating}
            inputMode='numeric'
            value={formData.postDeductionBalance}
            onChange={handleChange}
          />
        </div>
        <div className={styles.btnGroup}>
          <button type='reset' onClick={handleFormAction}>
            Cancel
          </button>
          <button
            type='submit'
            onClick={handleFormAction}
            disabled={isMonthlyBalanceAddingUpdating}
          >
            {isAddForm
              ? isMonthlyBalanceAddingUpdating
                ? 'Saving'
                : 'Save'
              : isMonthlyBalanceAddingUpdating
              ? 'Editing'
              : 'Edit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MonthlyBalanceForm;
