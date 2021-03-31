import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

            //AQUI SE ESTA HACIENDO UN SPREAD (...) DEL OBJETO, PERO TAMBIEN SE PUEDE LLAMAR A "DISPATCH"
const ExpenseListItem= ({description,amount,createdAt,id})=>(
    <div>
    <Link to={`/edit/${id}`}>
    <h3>{description}</h3>
    </Link>
        <p>Amount: {numeral(amount/100).format('$0,0.00')}</p>
        <p>Created At: {moment(createdAt).format('MMMM Do, YYYY')}</p>
    </div>
);

export default ExpenseListItem;