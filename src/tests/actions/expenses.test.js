import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddExpense,
    addExpense, 
    editExpense, 
    removeExpense,
    setExpenses,
    startSetExpenses, 
    startRemoveExpense,
    startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

//WITH THIS WE CREATE A MOCK STORE, FAKE STORE SO WE CAN TRY OUR TESTS
const createMockStore = configureMockStore([thunk]);

const uid= 'thisismytestuid';
const defaultAuthState = {auth:{ uid } };

beforeEach((done)=>{
    const expensesData= {};
    expenses.forEach(({id,description,note,amount,createdAt})=>{
        expensesData[id] = {description,note,amount,createdAt}
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(()=> done());
});


test ('should setup remove expense action object',()=>{
    const action = removeExpense({id:'123abc'});

    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id:'123abc'
    });
});

test('Should remove expense from firebase',(done)=>{
    const store = createMockStore(defaultAuthState);
    const id= expenses[2].id; 
    store.dispatch(startRemoveExpense({id})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'REMOVE_EXPENSE',
            id
        });
        //VAMOS A HACER UN QUERY A LA BD DE PRUEBAS Y VAMOS A DEVOLVER EL PROMISE
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot)=>{
        //EL SNAPSHOT TENDRIA QUE TRAER EL VALOR DEL QUERY PERO COMO YA NO EXISTE, SERA NULL
        expect(snapshot.val()).toBeFalsy();
        done();
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

test('Should edit expenses from firebase',(done)=>{
    const store = createMockStore(defaultAuthState);
    const id= expenses[0].id;
    const updates= {
        note:'NOTE FOR GUM'
    };
    store.dispatch(startEditExpense(id,updates)).then(()=>{
        const actions= store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val().note).toBe(updates.note);
        done();
    });
})


test('Should setup addExpense action object with provided values',()=>{
    const action= addExpense(expenses[2]);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:expenses[2]
    });
}); 


//WITH "done" WE ARE TELLING JEST THIS IS ASYNCHRONOUS TEST
test('Should add expense to database and store',(done)=>{
    const store= createMockStore(defaultAuthState);
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});


test('Should add expense with defaults to database and store',(done)=>{
    const store= createMockStore(defaultAuthState);
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(defaultexpense);
        done();
    });
});

test('Should setup set expense action object with data',()=>{
    const action= setExpenses(expenses);
    expect(action).toEqual({
        type:'SET_EXPENSES',
        expenses
    });
});

test('Should fetch the expenses from Firebase',(done)=>{
    const store= createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(()=>{
        const actions= store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });

});

