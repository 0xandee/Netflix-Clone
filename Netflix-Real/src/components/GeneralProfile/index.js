import React, { Fragment, useEffect, useState } from "react";
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { countryListData } from "../../config/countryData";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/flatpickr.css';
import './style.scss'
import { getProfile, requestUpdateProfile } from "../../services/api/auth";
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";
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
          'Update Profile successfully!!'
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
          'Update profile failed! Please try again'
        }
      </span>
    </div>
  </Fragment>
)

const genderData = [
  { value: 0, label: 'Male' },
  { value: 1, label: 'Female' },
  { value: 2, label: 'Other' },
]

const GeneralProfile = () => {
  let avatar = 'https://occ-0-325-3996.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYnnca7HCf0z4YHtIK5R8MIGCeMyodAsxBYSBmMkYHqjSw46VWWyNQirfwxT-CkbxPkp-G84Wu-iOMwGG-r9QAs.png?r=f71'
  const [gender, setGender] = useState()
  const [dob, setDob] = useState(new Date())
  const [country, setValueCountry] = useState()
  const [email, setEmail] = useState()
  const [isChange, setIsChange] = useState(false)
  const history = useHistory();

  const notifySuccess = (data) => toast.success(<SuccessToast data={data} />, { hideProgressBar: true })
  const notifyError = (data) => toast.error(<ErrorToast data={data} />, { hideProgressBar: true })


  const selectStyle = {
    control: base => ({
      ...base,
      height: 50,
      border: '1px solid gray'
    })
  };

  const saveClicked = async () => {
    try {
      const response = await requestUpdateProfile({ email, country: country.value, dob: dob.toISOString().slice(0, 10), gender: gender.value },getToken())
      if (response.status === 200 ) {
        notifySuccess()
        setIsChange(false)
      }
      else {
        notifyError()
      }
    }
    catch (error) {
      notifyError()
    }
  }

  const cancelClicked = () => {
    try {
      history.push('/home')
    }
    catch (error) {

    }
  }


  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        let response = await getProfile(getToken())
        if (response.status === 200) {
          let data = await response.json()
          setEmail(data.email)
          setGender(genderData.find(option => option.value === data.gender))
          setDob(new Date(data.dob))
          setValueCountry(countryListData.find(option => option.value === data.country))
        }
        else if (response.status === 500) {
          history.push('/maintenance')
        }
  
      } catch (error) {
      //  history.push('/maintenance')
  
      }
    }
    fetchData();
   
  }, [])

  return (
    <div id='generalProfile'>
      <div className="general-profile">
        <img className="profile-avatar" style={{ borderRadius: '4px', }} src={avatar} alt="" />
        <Form >
          <Row className='mt-3'>
            <Col sm='6'>
              <FormGroup>
                <Label for='username'>Email</Label>
                <Input
                  name='email'
                  disabled
                  placeholder='Email'
                  value={email}
                  onChange={(e) => {
                    setIsChange(true)
                    setEmail(e.target.value)
                  }}
                  style={{ background: '#fff', border: '1px solid gray', height: '50px' }}
                />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label for='username'>Gender</Label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  placeholder='Gender'
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="country"
                  options={genderData}
                  onChange={(prop) => {
                    setIsChange(true)
                    setGender(prop)
                  }}
                  value={gender}
                  styles={selectStyle}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col sm='6'>
              <Fragment>
                <Label for='username'>Date of Birth</Label>
                <Flatpickr
                  className="form-control"
                  placeholder='Date of Birth'
                  id='dob-picker'
                  value={dob}
                  style={{ background: 'white', height: '50px', border: '1px solid gray' }}
                  onChange={date => {


                    setIsChange(true)
                    setDob(date[0])
                  }}
                />

              </Fragment>

            </Col>
            <Col sm='6'>
              <Label for='username'>Country</Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                placeholder='Country'
                isDisabled={false}
                isLoading={false}
                isClearable={false}
                isRtl={false}
                isSearchable={true}
                name="country"
                options={countryListData}
                onChange={(prop) => {
                  setIsChange(true)
                  setValueCountry(prop)
                }}
                value={country}
                styles={selectStyle}
              />
            </Col>
          </Row>
          <Row className='mt-4' >
            <Col>
              <Button color="danger" className='mr-2' disabled={!isChange} onClick={saveClicked} >
                Save Change
              </Button>
              <Button outline color="secondary" onClick={cancelClicked} >
                Cancel
              </Button>
            </Col>

          </Row>
        </Form>


      </div>
    </div>
  )
}

export default GeneralProfile