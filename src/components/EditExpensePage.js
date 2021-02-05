import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';





export class EditExpensePage extends React.Component {

    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                {/* Editing the expense with ID of {props.match.params.id} */}
                <ExpenseForm
                    //ESTE "EXPENSE" ES EL QUE ESTAMOS ENVIANDO PARA QUE LLENE LOS CAMPOS EN EL "FORM"    
                    expense={this.props.expense}
                    //ESTE "EXPENSE" ES EL QUE ESTA SUBIENDO, YA SEA CON INFORMACION NUEVA O SIN CAMBIOS 
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemove}>Remove</button>
            </div>
        );
    }

}

const mapDispatchToProps=(dispatch)=>({
    editExpense: (id,expense)=> dispatch(editExpense(id,expense)),
    startRemoveExpense: (data)=> dispatch(startRemoveExpense(data))

});


const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage);