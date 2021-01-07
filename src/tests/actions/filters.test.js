import moment from 'moment';
import {setStartDate,setEndDate,setTextFilter,sortByAmount,sortByDate} from '../../actions/filters';

test('Should generate setStartDate action object',()=>{

    const action= setStartDate(moment(0));
    expect(action).toEqual({
        type:'SET_START_DATE',
        start: moment(0)
    });
});


test('Should generate setEndDate action object',()=>{
    const action= setEndDate(moment(0));
    expect(action).toEqual({
        type:'SET_END_DATE',
        end: moment(0)
    });
});

test('Should generate setText action object',()=>{
    const text= 'Hello test';
    const action= setTextFilter(text);
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text
    });
});

test('Should generate setText default action object',()=>{
    const action= setTextFilter();
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:''
    });
});

test('Should generate sortByAmount action object',()=>{
    const action= sortByAmount();
    expect(action).toEqual({
        type:'SORT_BY_AMOUNT'
    });
});

test('Should generate sortByDate action object',()=>{
    const action= sortByDate();
    expect(action).toEqual({
        type:'SORT_BY_DATE'
    });
});