import React from "react";
import './style.scss';
import { Footer, NavigationBar } from "../../components";

const MyPlaylistPage = () => {

  return (
    <div id='errorPage' >
      <div className="error-page overflow-x-hidden bg-black"  >
        <NavigationBar />
        <div className='body-content d-flex justify-content-center align-items-center flex-column'>
          <div style={{ color: 'white', fontWeight: "bold", fontSize: '128px' }} >
            404
          </div>
          <div style={{ color: 'white', fontWeight: "bold", fontSize: '64px', textAlign:'center' }} >
            Woops. Look like this page doesn't exist.
          </div>

        </div>
        <Footer />

      </div>
    </div>
  );
};

export default MyPlaylistPage;