import React from 'react';
import {shallow} from 'enzyme';
import ExpenseListItem from '../../components/Expense';
import expenses from '../fixtures/expenses';


test('Should render ExpenseListItem',()=>{

    //FORMA 1
    /*const expense= {
        description: expenses[0].description,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        id: expenses[0].id
    }
    const wrapper= shallow(<ExpenseListItem expense={expense}/>);*/


    //FORMA 2 
    const wrapper= shallow(<ExpenseListItem {...expenses[0]}/>)
    expect(wrapper).toMatchSnapshot();
});