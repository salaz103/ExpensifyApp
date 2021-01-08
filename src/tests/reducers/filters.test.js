import { TestScheduler } from 'jest';
import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('Should setup default filter values',()=>{
    const state= filtersReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual({
        text:'',
        sortBy:'date',
        startDate:moment().startOf('month'),
        endDate:moment().endOf('month')
    });
});


test('Should set sortBy to Amount',()=>{
    const state= filtersReducer(undefined,{type:'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('Should set sortBy to date',()=>{

    const currentState= {
        text:'',
        sortBy:'amount',
        startDate:undefined,
        endDate:undefined
    };

    const action= {type:'SORT_BY_DATE'};
    const state = filtersReducer(currentState,action);
    expect(state.sortBy).toBe('date');
});


test('Should set text filter',()=>{
    const text= 'text filter'
    const action = {type:'SET_TEXT_FILTER',text};
    const state= filtersReducer(undefined,action);
    expect(state.text).toBe(text);

});



test('Shoud set startDate filter',()=>{
    const startDate= moment(0).add(5,'days');
    const action = {type:'SET_START_DATE',start:startDate};
    const state= filtersReducer(undefined,action);
    expect(state.startDate).toBe(startDate);
});


test('Shoud set endDate filter',()=>{
    const endDate= moment(0).add(10,'days');
    const action = {type:'SET_END_DATE',end:endDate};
    const state= filtersReducer(undefined,action);
    expect(state.endDate).toBe(endDate);
});