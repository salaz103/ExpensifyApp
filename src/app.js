import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

console.log(store.getState());

store.dispatch(addExpense({description:'Water bill',amount:100,createdAt:1000}));
store.dispatch(addExpense({description:'Gas bill',amount:200,createdAt:1800}));
store.dispatch(setTextFilter('bill'));
const state= store.getState();
const expenses= getVisibleExpenses(state.expenses,state.filters);

console.log(expenses);

const jsx= (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx,document.getElementById('app'));


