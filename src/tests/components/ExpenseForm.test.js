import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';


test('Should render expense form correctly',()=>{
    const wrapper= shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

//SHOULD RENDER EXPENSE FORM WITH EXPENSE DATA

test('Should render ExpenseForm with Expense data',()=>{
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});