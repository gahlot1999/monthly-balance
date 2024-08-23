import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRequest } from '../../../utils/request';
import toast from 'react-hot-toast';

export function useDeleteMonthlyBalance() {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['monthlyBalance']);
      toast.success('Monthly balance deleted successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    deleteMonthlyBalance: mutate,
    isMonthlyBalanceDeleting: status === 'pending',
  };
}
