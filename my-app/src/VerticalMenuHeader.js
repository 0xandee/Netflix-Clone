
import { useState } from 'react';
import './alert.scss';

const DrawerHeader = () => {
    const [isShown, setIsShown] = useState(true);
    function changeBackground(e) {
        e.target.style.background = 'red';
      }
    return (
        <div className='drawer-header' onMouseEnter={() => setIsShown(true)} 
        onMouseLeave={() => setIsShown(false)}>

            <img className='brand-logo' src='https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/logo.36f34a9f.svg' alt='logo'
            />
            <span className='brand-text'>Logo Branch</span>
        
                {isShown && (
                    <div>
                        I'll appear when you hover over the button.
                    </div>
                )}
           <button class="button">Click Me</button>


            <div >x
            </div>
        </div>

    );

}

export default DrawerHeader;
