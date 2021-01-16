import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render Expense summary with various expenses',()=>{
    const wrapper= shallow(<ExpensesSummary expenseCount={expenses} expenseTotal={1200}/>)
    expect(wrapper).toMatchSnapshot();
});

test('should render Expense summary with one expense',()=>{
    const wrapper= shallow(<ExpensesSummary expenseCount={[expenses[0]]} expenseTotal={235}/>)
    expect(wrapper).toMatchSnapshot();
});