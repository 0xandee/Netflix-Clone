import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { expect } from 'chai';
import { mount, render, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../services/redux/store'
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import ReactDOM from "react-dom";
import SignIn from '.';
Enzyme.configure({ adapter: new Adapter() });

describe('<SignIn />', () => {
    const wrapper = mount(<BrowserRouter><Provider store={store}><SignIn/></Provider></BrowserRouter>);

    it('Check if renders Sign In UI correctly', () => {
        let signInDiv = wrapper.find('#signIn');
        let usernameInput = wrapper.find('#sign-in-username');
        let passwordInput = wrapper.find('#sign-in-password');
        let signInButton = wrapper.find('.sign-in__body__content__main__button-sign-in');
        let forgotpasswordButton = wrapper.find('#sign-in-forgot-password-button');
        let signUpButton = wrapper.find('#sign-in-sign-up-button');

        expect(signInDiv).to.have.lengthOf(1);
        expect(usernameInput).to.have.lengthOf(1);
        expect(passwordInput).to.have.lengthOf(1);
        expect(signInButton).to.have.lengthOf(1);
        expect(forgotpasswordButton).to.have.lengthOf(1);
        expect(signUpButton).to.have.lengthOf(1);
    });

    it('Check username input',() => {
        let usernameInput = wrapper.find('#sign-in-username');
        usernameInput.at(0).simulate('change', { target: { value: 'tatbinhlop91@gmail.com' } });
        expect(usernameInput.get(0).value).equal('tatbinhlop91@gmail.com');
    })

    it('Check password input',()=>{
        let passwordInput = wrapper.find('#sign-in-password');
        passwordInput.at(0).simulate('change', { target: { value: '123456' } });
        expect(passwordInput.get(0).value).equal('tatbinhlop91@gmail.com');
    })

    it('Check login with right data',()=>{
        let usernameInput = wrapper.find('#sign-in-username');
        let passwordInput = wrapper.find('#sign-in-password');

        usernameInput.at(0).simulate('change', { target: { value: 'tatbinhlop91@gmail.com' } });
        passwordInput.at(0).simulate('change', { target: { value: '123456' } });

        wrapper.find('.sign-in__body__content__main__button-sign-in').simulate('click');
        expect(wrapper.state('isLogined')).equal(true);
        expect(wrapper.state('isReceivedCookie')).equal(true);
    })

    it('Check login with wrong data',()=>{
        wrapper.find('#sign-in-username').simulate('change', {target: {name: 'username', value: 'wrongusername@gmail.com'}});
        wrapper.find('#sign-in-password').simulate('change', {target: {name: 'password', value: 'wrongpassword'}});
        wrapper.find('.sign-in__body__content__main__button-sign-in').simulate('click');
        expect(wrapper.state('isLogined')).toBe(false);
    })

    it('Check initial empty state of username & password input', ()=> {
        expect(wrapper.state('username')).toEqual('');
        expect(wrapper.state('password')).toEqual('');
    });
  });