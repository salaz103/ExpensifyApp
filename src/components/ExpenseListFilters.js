import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter} from '../actions/filters';
import {DateRangePicker} from 'react-dates';
import 'react-dates/initialize';
import {sortByDate,sortByAmount,setStartDate,setEndDate} from '../actions/filters';

class ExpenseListFilters extends React.Component{

    state={
        calendarFocused: null
    };

    onDatesChange=({startDate,endDate})=>{
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };

    onFocusChange=(calendarFocused)=>{
        this.setState(()=>({
            calendarFocused
        }));
    };

    render(){
        return(
            <div>
                <input type="text" value={this.props.filters.text} onChange={(e)=>{ this.props.dispatch(setTextFilter(e.target.value))}}/>
        
                <select 
                    value={this.props.filters.sortBy}
                    onChange={(e)=>{
                    e.target.value==="date"?this.props.dispatch(sortByDate()):null;
                    e.target.value==="amount"?this.props.dispatch(sortByAmount()):null;
                    }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId="addExpense_start_date"
                    endDate= {this.props.filters.endDate}
                    endDateId= "addExpense_end_date"
                    onDatesChange={this.onDatesChange}
                    focusedInput= {this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={()=>{false}}
                />
        
            </div>
        
        );
    }

}


const mapStateToProps= (state)=>{
    return{
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);