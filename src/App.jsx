import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import LandingPage from './pages/LandingPage';
import MonthlyBalance from './pages/MonthlyBalancePage';
import MonthlyBalanceForm from './containers/MonthlyBalance/MonthlyBalanceForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          toastOptions={{
            style: {
              fontSize: '1.5rem',
            },
          }}
        />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/monthlyBalance' element={<MonthlyBalance />} />
          <Route
            path='/monthlyBalance/add'
            element={<MonthlyBalanceForm mode='add' />}
          />
          <Route
            path='/monthlyBalance/edit/:id'
            element={<MonthlyBalanceForm mode='edit' />}
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
