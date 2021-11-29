import React from "react";
import CustomNotification from "./components/CustomNotification";
import { Provider } from 'react-redux';
import WebRouter from "./Router";
import { store } from './services/redux/store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Provider store={store}>
      <WebRouter />
      <ToastContainer />
    </Provider>

  

  );
}
