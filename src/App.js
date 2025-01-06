import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import TawkMessengerReactUmd from '@tawk.to/tawk-messenger-react';
import axios from 'axios';
import Routes from './Routes';
import store from './redux/store/index';
import { SET_AUTHENTICATED } from '../src/redux/types';
import { logoutUser } from '../src/redux/actions';
import { toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
// import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const token = localStorage.IdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/auth/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['token'] = token;
  }
}

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TawkMessengerReactUmd
        propertyId='65ae20320ff6374032c3348e'
        widgetId='1hko2rihp'
      />
      <Provider store={store}>
        <Routes />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
