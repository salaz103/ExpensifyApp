import React from 'react';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';
import {EditExpensePage} from '../../components/EditExpensePage';


let editExpense, removeExpense, history, wrapper;


beforeEach(()=>{
    editExpense= jest.fn();
    removeExpense= jest.fn();
    history= {push: jest.fn()};
    wrapper= shallow(
    <EditExpensePage  
    editExpense={editExpense} 
    removeExpense={removeExpense} 
    history={history}
    expense= {expenses[2]}
    />
    );
});


//SHOULD RENDER EDITEXPENSE PAGE- SNAPSHOT
//SHOULD HANDLE EDIT EXPENSE - SPIES
//SHOUD HANDLE REMOVE EXPENSE - SPIES

test('Should render edit expense page correctly',()=>{
    expect(wrapper).toMatchSnapshot();
});

test('Should handle edit Expense',()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id,expenses[2]);
});

test('Should handle removeExpense',()=>{
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({
        id:expenses[2].id
    });
});