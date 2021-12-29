import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { expect } from 'chai';
import { mount, render, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../services/redux/store'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom";
import Registration from './index';
Enzyme.configure({ adapter: new Adapter() });

describe('<Registration />', () => {
    let wrapper = mount(<BrowserRouter><Provider store={store}><Registration/></Provider></BrowserRouter>);
    it('Check if renders Registration UI correctly', () => {
        let bodyContent = wrapper.find('#registration-body');
        let nextButton = wrapper.find('#registration-next-button');

        expect(bodyContent).to.have.lengthOf(1);
        expect(nextButton).to.have.lengthOf(1);
    });

    it('Check if renders Next button clickable correctly', () => {
        let nextButton = wrapper.find('#registration-next-button');
        wrapper.find(nextButton).simulate('click');
        expect(wrapper.state('isNextClicked')).toBe(true);
    });
    
  });