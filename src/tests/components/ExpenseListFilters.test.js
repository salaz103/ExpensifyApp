import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});


test('Should render expense list filters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should render expense list filters with alt data correctly ', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('Should handle text change', () => {
    const e = {
        target: {
            value: 'test text'
        }
    };
    wrapper.find('input').prop('onChange')(e);
    expect(setTextFilter).toHaveBeenLastCalledWith(e.target.value);
});


test('Should sortByDate', () => {
    const e = {
        target: {
            value: 'date'
        }
    }
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').prop('onChange')(e);
    expect(sortByDate).toHaveBeenCalled();
});

test('Should sortByAmount', () => {
    const e = {
        target: {
            value: 'amount'
        }
    }

    wrapper.find('select').prop('onChange')(e);
    expect(sortByAmount).toHaveBeenCalled();
});



test('Should handle date changes', () => {

    const dates = {
        startDate: moment(0),
        endDate: moment(0).add(5, 'days')
    };

    wrapper.find(DateRangePicker).prop('onDatesChange')(dates);
    expect(setStartDate).toHaveBeenLastCalledWith(dates.startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(dates.endDate);
});

test('Should handle date focus changes',()=>{
    const calendarFocused= 'endDate';
    wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});