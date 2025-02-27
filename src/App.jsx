import React from 'react';
import StepperComponent from './components/StepperComponent';
import { Provider } from 'react-redux';
import store from './redux/actions';
import { CssBaseline, Container } from '@mui/material';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <StepperComponent />
      </Container>
    </Provider>
  );
}

export default App;