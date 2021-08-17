import React from "react";
import CustomNotification from "./components/CustomNotification";
import { Provider } from 'react-redux';
import WebRouter from "./Router";
import { store } from './services/redux/store'
export default function App() {
  return (
    <Provider store={store}>
      <WebRouter />
    </Provider>

    // <div style={{ backgroundColor: "black" }}>
    //   <CustomNotification />
    // </div>

  );
}
