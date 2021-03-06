import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import { sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {

    state = {
        calendarFocused: null
    };

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({
            calendarFocused
        }));
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onSortChange = (e) => {
        e.target.value === "date" ? this.props.sortByDate() : null;
        e.target.value === "amount" ? this.props.sortByAmount() : null;
    }

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input 
                        className="text-input" 
                        type="text"
                        placeholder="Search expenses" 
                        value={this.props.filters.text} 
                        onChange={this.onTextChange} />
                    </div>
                    <div className="input-group__item">
                        <select
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={this.onSortChange}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            startDateId="addExpense_start_date"
                            endDate={this.props.filters.endDate}
                            endDateId="addExpense_end_date"
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => { false }}
                        />
                    </div>
                </div>

            </div>

        );
    }

}


const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);