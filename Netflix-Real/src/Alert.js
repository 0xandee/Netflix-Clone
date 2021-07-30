import { useState } from 'react';
import './alert.scss';
import classnames from 'classnames'

function AlertDismissibleExample() {
    const [show, setShow] = useState(false);

   
        return (
            <div className= {classnames({'alert': show===false},{'alert_clicked' : show===true } )} type='button' 
            onClick={() => setShow(!show)} >
                <div>
                    <span className='text danger'>
                        Dangers! 
                    </span>
                    <span className='text' >
                        This is a Danger alert — check it out!
                    </span>
                </div>
                <div className='button' type="button" onClick={() => setShow(false)} >x</div>
            </div>
        );
   
}

export default AlertDismissibleExample;
