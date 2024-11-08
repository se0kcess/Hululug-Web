import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import Router from '@/router';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyles />
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
