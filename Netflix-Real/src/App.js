import React from "react";
import { Provider } from 'react-redux';

import { store } from './services/redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WebRouter from "./router/Router";

export default function App() {
  return (
    /*eslint-disable */
    <Provider store={store}>
      <WebRouter />
      <ToastContainer />
    </Provider>
    /*eslint-enable */


  );
}
