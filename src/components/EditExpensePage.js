import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';





export class EditExpensePage extends React.Component {

    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                {/* Editing the expense with ID of {props.match.params.id} */}
                <div className="content-container">
                    <ExpenseForm
                        //ESTE "EXPENSE" ES EL QUE ESTAMOS ENVIANDO PARA QUE LLENE LOS CAMPOS EN EL "FORM"    
                        expense={this.props.expense}
                        //ESTE "EXPENSE" ES EL QUE ESTA SUBIENDO, YA SEA CON INFORMACION NUEVA O SIN CAMBIOS 
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))

});


const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);