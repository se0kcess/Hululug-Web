import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/router';
import { GlobalStyles } from './styles/GlobalStyles';

function App(): ReactElement {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Router />
    </BrowserRouter>
  );
}

export default App;
