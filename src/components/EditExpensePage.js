import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense,removeExpense} from '../actions/expenses';

const EditExpensePage=(props)=>{
    //console.log(props.expense);
    return(
        <div>
            {/* Editing the expense with ID of {props.match.params.id} */}
            <ExpenseForm 
                //ESTE "EXPENSE" ES EL QUE ESTAMOS ENVIANDO PARA QUE LLENE LOS CAMPOS EN EL "FORM"    
                expense= {props.expense}
                //ESTE "EXPENSE" ES EL QUE ESTA SUBIENDO, YA SEA CON INFORMACION NUEVA O SIN CAMBIOS 
                onSubmit={(expense)=>{
                    props.dispatch(editExpense(props.expense.id,expense));
                    props.history.push('/');
                    //console.log('updated',expense);
                }}
            />
            <button onClick={
                (e)=>{
                    props.dispatch(removeExpense({id:props.expense.id}));
                    props.history.push('/')
                } 
                }
                >Remove</button>
        </div>
    );
};

const mapStateToProps=(state,props)=>{
   return{
         expense: state.expenses.find((expense)=>{
         return expense.id===props.match.params.id;     
       })
   } 
};

export default connect(mapStateToProps)(EditExpensePage);