import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import { Button, Col, Form, Row } from "reactstrap";
import { requestChangePass } from "../../services/api/auth";
import InputPasswordToggle from "../InputPassword";
import './style.scss'
import { toast } from 'react-toastify'
import { getToken } from "../../services/function";

const SuccessToast = (props) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <h6 className='toast-title'>Success!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        {props.data != null ?
          props.data :
          'Change password successfully!!'
        }
      </span>
    </div>
  </Fragment>
)

const ErrorToast = (props) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <h6 className='toast-title'>Error!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        {props.data != null ?
          props.data :
          'Change password failed! Please try again'
        }
      </span>
    </div>
  </Fragment>
)


const ChangePasswordProfile = () => {
  const [isOldPassError, setIsOldPassError] = useState(false)
  const [isNewPassError, setIsNewPassError] = useState(false)
  const [isConfirmPassError, setIsConfirmPassError] = useState(false)
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [errorTextOldPassword, setErrorTextOldPassword] = useState('Wrong password')
  const [errorTextPassword, setErrorTextPassword] = useState('Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')
  const history = useHistory();

  const notifySuccess = (data) => toast.success(<SuccessToast data={data} />, { hideProgressBar: true })
  const notifyError = (data) => toast.error(<ErrorToast data={data} />, { hideProgressBar: true })


  const saveClicked = async () => {
    if (!newPass.match(confirmPass)) {
      setIsConfirmPassError(true)
    }
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (oldPass === "" || !oldPass.match(passw)) {
      setIsOldPassError(true)
      setErrorTextOldPassword('Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')
    }
    if (newPass === "" || !newPass.match(passw)) {
      setIsNewPassError(true)
      setErrorTextPassword('Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')
    }
    else {
      try {
        setIsConfirmPassError(false)
        setIsOldPassError(false)
        setIsNewPassError(false)
        const res = await requestChangePass(oldPass, newPass, getToken())
        if (res.status === 200) {
          notifySuccess()
        }
        else if (res.status === 500) {
          setIsOldPassError(true)
          setErrorTextOldPassword('Wrong password')
        }
        else {
          notifyError()
        }
      }
      catch (error) {
        notifyError()

      }
    }
  }

  const cancelClicked = () => {
    try {
      history.push('/home')
    }
    catch (error) {

    }
  }

  return (
    <div id="changePasswordProfile">
      <div className="change-password-profile">
        <Form >
          <Row className='mt-4'>
            <Col sm='6'>
              <InputPasswordToggle
                value={oldPass}
                onChange={e => setOldPass(e.target.value)}
                className='input-group-merge mb-2'
                label='Old Password'
                placeholder='Old Password'
                style={{ background: '#fff',  height: '50px' }}
                htmlFor='old-password' />
              <div className={`error-label ${isOldPassError && 'visible'}`}> {isOldPassError && errorTextOldPassword}</div>

            </Col>

          </Row>
          <Row className='mt-3'>
            <Col sm='6'>
              <InputPasswordToggle
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                className='input-group-merge mb-2'
                label='New Password'
                placeholder='New Password'
                style={{ background: '#fff', height: '50px' }}
                htmlFor='new-password' />
              <div className={`error-label ${isNewPassError && 'visible'}`}> {isNewPassError && errorTextPassword}</div>

            </Col>
            <Col sm='6'>
              <InputPasswordToggle
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                className='input-group-merge mb-2'
                label='Confirm Password'
                placeholder='Confirm Password'
                style={{ background: '#fff', height: '50px' }}
                htmlFor='confirm-password' />
              <div className={`error-label ${isConfirmPassError && 'visible'}`}> {isConfirmPassError && 'Password is not matched'}</div>

            </Col>
          </Row>

          <Row className='mt-4' >
            <Col>
              <Button color="danger" className='mr-2' onClick={saveClicked}>
                Save Change
              </Button>
              <Button outline color="secondary" onClick={cancelClicked}>
                Cancel
              </Button>
            </Col>

          </Row>
        </Form>


      </div>
    </div>
  )
}

export default ChangePasswordProfile