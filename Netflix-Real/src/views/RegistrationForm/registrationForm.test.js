import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { expect } from 'chai';
import { mount, render, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../services/redux/store'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom";
import RegistrationForm from './index';
Enzyme.configure({ adapter: new Adapter() });

describe('<RegistrationForm />', () => {
    let wrapper = mount(<BrowserRouter><Provider store={store}><RegistrationForm/></Provider></BrowserRouter>);
    
    it('Check if renders RegistrationForm UI correctly', () => {
        let emailInput = wrapper.find('#registration-email');
        let passwordInput = wrapper.find('#registration-password');
        let dobInput = wrapper.find('#dob-picker');
        let genderInput = wrapper.find('#gender-selector');
        let countryInput = wrapper.find('#country-selector');
        let nextButton = wrapper.find('#registration-next-button');
        let errorLabel = wrapper.find('.error-label');

        expect(emailInput).to.have.lengthOf(1);
        expect(passwordInput).to.have.lengthOf(1);
        expect(dobInput).to.have.lengthOf(1);
        expect(genderInput).to.have.lengthOf(1);
        expect(countryInput).to.have.lengthOf(1);
        expect(nextButton).to.have.lengthOf(1);
        expect(errorLabel).to.have.lengthOf(5);
    });

    it('Check if renders Next button clickable correctly', () => {
        let nextButton = wrapper.find('#registration-next-button');
        wrapper.find(nextButton).simulate('click');
        expect(wrapper.state('isNextClicked')).toBe(true);
    });

    it('Check if RegistrationForm can click next when input correctly', () => {
        let random_email = (Math.random() + 1).toString(36).substring(7) + '@gmail.com';
        let random_password = '123456aaaAAA';

        let emailInput = wrapper.find('#registration-email');
        let passwordInput = wrapper.find('#registration-password');
        let dobInput = wrapper.find('#dob-picker');
        let genderInput = wrapper.find('#gender-selector');
        let countryInput = wrapper.find('#country-selector');
        let nextButton = wrapper.find('#registration-next-button');
        let errorLabel = wrapper.find('.error-label');

        emailInput.at(0).simulate('change', { target: { value: random_email } });
        passwordInput.at(0).simulate('change', { target: { value: random_password } });
        dobInput.at(0).simulate('change', { target: { value: '2021-12-09' } });
        genderInput.at(0).simulate('change', { target: { value: 'Male' } });
        countryInput.at(0).simulate('change', { target: { value: 'Anguilla' } });
        nextButton.simulate('click');

        expect(wrapper.state('isSucess')).toBe(true);
    });


    it('Check if initial empty state RegistrationForm', () => {
        expect(wrapper.state('email')).toEqual('');
        expect(wrapper.state('password')).toEqual('');
    });
  });