import React from 'react';
import {connect} from 'react-redux';


const ExpenseList= (props)=>(
    <div>
        <h1>Expense List</h1>
        {props.expenses.length}
    </div>
);

const mapStatetoProps= (state)=>{
    return{
        expenses: state.expenses,
        filters: state.filters
    };
};

const ConnectedExpenseList= connect(mapStatetoProps)(ExpenseList);

export default ConnectedExpenseList;