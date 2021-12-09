import React, { Fragment, useEffect, useState } from "react";
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Input, InputGroup, Label, Row } from "reactstrap";
import { Controller } from "swiper";
import { countryListData } from "../../config/countryData";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/flatpickr.css';
import './style.scss'

const genderData = [
  { value: 0, label: 'Male' },
  { value: 1, label: 'Female' },
  { value: 2, label: 'Other' },
]

const GeneralProfile = () => {
  let avatar = 'https://occ-0-325-3996.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYnnca7HCf0z4YHtIK5R8MIGCeMyodAsxBYSBmMkYHqjSw46VWWyNQirfwxT-CkbxPkp-G84Wu-iOMwGG-r9QAs.png?r=f71'
  const [gender, setGender] = useState()
  const [dob, setDob] = useState(new Date())
  const [user, setUser] = useState({})

  const selectStyle = {
    control: base => ({
      ...base,
      height: 60,
      border: '1px solid gray'
    })
  };

  useEffect(async () => {
    try {
      // let responseData = await getMovieByID(props.id)
      // setMovie(responseData)
      // setPicker(responseData.premiere_time)     
      // setValueCountry(responseData.country)

    } catch (error) {
    }
  }, [])

  return (
    <div id='generalProfile'>
      <div className="general-profile">
        <img className="profile-avatar" style={{ borderRadius: '4px', }} src={avatar} alt="" />
        <Form >
          <Row className='mt-4'>
            <Col sm='6'>
              <FormGroup>
                <Label for='username'>Email</Label>
                <Input
                  name='email'
                  placeholder='Email'
                />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label for='username'>Name</Label>
                <Input
                  name='Name'
                  placeholder='Name'
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col sm='6'>
              <FormGroup>
                <Label for='username'>Email</Label>
                <Input
                  name='email'
                  placeholder='Email'

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
                  onChange={(prop) => setGender(prop)}
                  selectValue={gender}
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
                  id='dob-picker'
                  value={dob}
                  onChange={date => {
                    setDob(date)
                  }}
                />
              </Fragment>

            </Col>
            <Col sm='6'>
              <Label for='username'>Country</Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                defaultValue={countryListData[0]}
                isDisabled={false}
                isLoading={false}
                isClearable={false}
                isRtl={false}
                isSearchable={true}
                name="country"
                options={countryListData}
              />
            </Col>
          </Row>
          <Row className='mt-4' >
            <Col>
              <Button color="danger" className='mr-2'>
                Save Change
              </Button>
              <Button outline color="secondary">
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