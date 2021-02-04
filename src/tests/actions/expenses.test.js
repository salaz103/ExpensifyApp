import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense,addExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

//WITH THIS WE CREATE A MOCK STORE, FAKE STORE SO WE CAN TRY OUR TESTS
const createMockStore = configureMockStore([thunk]);


test ('should setup remove expense action object',()=>{
    const action = removeExpense({id:'123abc'});

    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id:'123abc'
    });
});

test('should setup edit expense action object',()=>{

    const action= editExpense('abc123',{note:'testing note'});

    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id:'abc123',
        updates: {note:'testing note'}
    });

});


test('Should setup addExpense action object with provided values',()=>{
    const action= addExpense(expenses[2]);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:expenses[2]
    });
}); 


//WITH "done" WE ARE TELLING JEST THIS IS ASYNCHRONOUS TEST
test('Should add expense to database and store',(done)=>{
    const store= createMockStore({});
    const expenseData= {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});


test('Should add expense with defaults to database and store',(done)=>{
    const store= createMockStore({});
    const defaultexpense= {
        description: '',
        amount:0,
        note:'',
        createdAt:0
    };

    store.dispatch(startAddExpense({})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultexpense
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(defaultexpense);
        done();
    });
});

// test('Should setup addExpense action object with Default values',()=>{
//     const action = addExpense();

//     expect(action).toEqual({
//         type:'ADD_EXPENSE',
//         expense:{
//             id:expect.any(String),
//             description:'',
//             note:'',
//             amount:0,
//             createdAt:0
//         }
//     })
// });