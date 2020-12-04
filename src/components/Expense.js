import React from 'react';
import { connect } from 'react-redux';
import {removeExpense} from '../actions/expenses';


            //AQUI SE ESTA HACIENDO UN SPREAD (...) DEL OBJETO, PERO TAMBIEN SE PUEDE LLAMAR A "DISPATCH"
const ExpenseListItem= ({description,amount,createdAt,dispatch,id})=>(
    <div>
    <h3>{description}</h3>
        <p>Amount: {amount}</p>
        <p>Created At: {createdAt}</p>
        <button onClick={(e)=>{dispatch(removeExpense({id}));}}>Remove</button>
    </div>
);

export default connect()(ExpenseListItem);