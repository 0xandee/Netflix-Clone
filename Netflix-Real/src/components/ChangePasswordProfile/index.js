import React, { Fragment, useState } from "react";
import { Button, Col, Form, FormGroup, Input, InputGroup, Label, Row } from "reactstrap";
import { countryListData } from "../../config/countryData";
import InputPasswordToggle from "../InputPassword";
import './style.scss'



const ChangePasswordProfile = () => {
  return (
    <div id="changePasswordProfile">
      <div className="change-password-profile">
        <Form >
          <Row className='mt-4'>
            <Col sm='6'>
              <InputPasswordToggle
                className='input-group-merge mb-2'
                label='Old Password'
                placeholder='Old Password'
                htmlFor='merge-password' />

            </Col>

          </Row>
          <Row className='mt-3'>
            <Col sm='6'>
              <InputPasswordToggle
                className='input-group-merge mb-2'
                label='New Password'
                placeholder='New Password'
                htmlFor='merge-password' />
            </Col>
            <Col sm='6'>
              <InputPasswordToggle
                className='input-group-merge mb-2'
                label='Confirm Password'
                placeholder='Confirm Password'
                htmlFor='merge-password' />
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

export default ChangePasswordProfile