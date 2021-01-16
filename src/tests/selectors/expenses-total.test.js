import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';


test('Should return 0 if no expenses',()=>{

    const result= selectExpensesTotal([]);
    expect(result).toEqual(0);

});

test('Should correctly add up a single expense',()=>{
    const result= selectExpensesTotal([expenses[0]]);
    expect(result).toEqual(195);
});


test('Should correctly add up multiple expenses',()=>{
    const result= selectExpensesTotal(expenses);
    expect(result).toEqual(114195);
});