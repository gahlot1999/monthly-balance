import { useMutation } from '@tanstack/react-query';
import { postRequest, putRequest } from '../../../utils/request';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useAddEditMonthlyBalance(isAddForm) {
  const navigate = useNavigate();
  const { status, mutate } = useMutation({
    mutationFn: isAddForm ? postRequest : putRequest,
    onSuccess: () => {
      toast.success(
        isAddForm ? 'Monthly balance edited' : 'Monthly balance updated',
      );
      navigate('/monthlyBalance');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    isMonthlyBalanceAddingUpdating: status === 'pending',
    addEditMonthlyBalance: mutate,
  };
}
