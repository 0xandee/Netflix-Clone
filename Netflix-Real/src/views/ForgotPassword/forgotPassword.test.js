    import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { expect } from 'chai';
import { mount, render, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../services/redux/store'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom";
import ForgotPassword from './index';
Enzyme.configure({ adapter: new Adapter() });

describe('<ForgotPassword />', () => {
    let wrapper = mount(<BrowserRouter><Provider store={store}><ForgotPassword/></Provider></BrowserRouter>);
    
    it('Check if renders ForgotPassword UI correctly', () => {
        let emailInput = wrapper.find('#email-input');
        let nextButton = wrapper.find('#email-button');

        expect(emailInput).to.have.lengthOf(1);
        expect(nextButton).to.have.lengthOf(1);
    });

    it('Check if ForgotPassword can click email when input correctly', () => {
        let random_email = 'tatbinhlop91@gmail.com';
        let nextButton = wrapper.find('#email-button');
        let emailInput = wrapper.find('#registration-email');

        emailInput.at(0).simulate('change', { target: { value: random_email } });
        nextButton.simulate('click');
        expect(wrapper.state('isCheckOTP')).toBe(true);
    });


    it('Check if initial empty state RegistrationForm', () => {
        expect(wrapper.state('email')).toEqual('');
    });
  });