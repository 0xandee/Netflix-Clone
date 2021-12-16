import React from "react";
import CustomNotification from "./components/CustomNotification";
import { Provider } from 'react-redux';

import { store } from './services/redux/store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WebRouter from "./router/Router";

export default function App() {
  return (
    <Provider store={store}>
      <WebRouter />
      <ToastContainer />
    </Provider>

  

  );
}
