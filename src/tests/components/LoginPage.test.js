import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from '../../components/LoginPage';


test('Should render LoginPage',()=>{
    const wrapper = shallow(<LoginPage startLogin={()=>{ }}/>);
    expect(wrapper).toMatchSnapshot();
});


test('Should call startLogin on button click',()=>{
    //WE WILL USE A SPY TO SIMULATE IF THE LOGIN BUTTON WAS SUCCESFULLY CALLLED
    const startLogin= jest.fn();
    const wrapper = shallow(<LoginPage startLogin= {startLogin}/>);
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
});