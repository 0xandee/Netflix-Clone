import React from "react";
import './style.scss';

import Wrench from '../../assets/Images/wrench.png'

const MaintenancePage = (props) => {

  return (
    <div id='maintenancePage' >
      <div className="maintenance-page overflow-x-hidden bg-black"  >
        <div className=' d-flex justify-content-center align-items-center flex-column ' style={{height: '100vh', width: '100vw'}}>
          <div style={{ color: 'white', fontWeight: "bold", }} >
            <img src={Wrench} alt='maintenance-icon' style={{height:'20vh'}}/>
          </div>
          <div className='mt-5' style={{ color: 'white', fontWeight: "bold", fontSize: '64px', textAlign: 'center' }} >
           SORRY BUT WE 'RE DOWN FOR MAINTENANCE
          </div>
          <div className='mt-4' style={{ color: 'white', fontWeight: "bold", fontSize: '24px', textAlign: 'center' }} >
            This page is undergoing maintenance and will be back soon.
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default MaintenancePage;