import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../../../utils/request';
import { urls } from '../../../config/apiConfig';

export function useGetMonthlyBalance() {
  const {
    isLoading: isMonthlyBalanceLoading,
    data: monthlyBalance,
    error,
  } = useQuery({
    queryKey: ['monthlyBalance'],
    queryFn: () => getRequest({ url: urls.getMonthlyBalance }),
  });

  return { isMonthlyBalanceLoading, monthlyBalance, error };
}
