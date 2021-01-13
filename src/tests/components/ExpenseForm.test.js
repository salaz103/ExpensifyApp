import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

test('Should render expense form correctly',()=>{
    const wrapper= shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

//SHOULD RENDER EXPENSE FORM WITH EXPENSE DATA

test('Should render ExpenseForm with Expense data',()=>{
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});


test('Should render error for invalid form submission',()=>{
   const wrapper= shallow(<ExpenseForm/>);
   expect(wrapper).toMatchSnapshot();
   wrapper.find('form').simulate('submit',{
       preventDefault:()=>{}
   }); 

   expect(wrapper.state('error').length).toBeGreaterThan(0);
   expect(wrapper).toMatchSnapshot();
});


test('Should set Description on input change',()=>{
    const value= 'New Description';
    const wrapper= shallow(<ExpenseForm/>);
    wrapper.find('input').at(0).simulate('change',{
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
});


//SHOULD SET NOTE ON TEXTAREA CHANGE
test('Should set note onTextArea change',()=>{
    const value= 'New note change';
    const wrapper= shallow(<ExpenseForm/>);
    wrapper.find('textarea').simulate('change',{
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);
});


//SHOULD SET AMOUNT FOR VALID INPUT - 23.50
test('Should set amount for valid input',()=>{
    const value= '23.50';
    const wrapper= shallow(<ExpenseForm/>);
    wrapper.find('input').at(1).simulate('change',{
        target: {value}
    });
    expect(wrapper.state('amount')).toBe(value);
});



//SHOULD NOT SET AMOUNT FOR INVALID INPUT - 12.122
test('Should not set amount for invalid input',()=>{
    const value= '12.122';
    const wrapper= shallow(<ExpenseForm/>);
    wrapper.find('input').at(1).simulate('change',{
        target: {value}
    });
    expect(wrapper.state('amount')).toBe('');
});

test('Should call onSubmit prop for valid form submission',()=>{
    const onSubmitSpy= jest.fn();
    const wrapper= shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit',{
        preventDefault:()=>{}
    }); 
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description:expenses[0].description,
        amount:expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });

});


test('Should set new date onDateChange',()=>{
    const now= moment();
    const wrapper= shallow(<ExpenseForm />);
    wrapper.find(SingleDatePicker).prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now); 
});


test('Should set calendar focus on Change',()=>{
    const focused= true
    const wrapper= shallow(<ExpenseForm />);
    wrapper.find(SingleDatePicker).prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);
});

