import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

            //AQUI SE ESTA HACIENDO UN SPREAD (...) DEL OBJETO, PERO TAMBIEN SE PUEDE LLAMAR A "DISPATCH"
const ExpenseListItem= ({description,amount,createdAt,id})=>(
    <Link className="list-item" to={`/edit/${id}`}>
    <div>
    <h3 className="list-item__title">{description}</h3>
    <span className="list-item__subtitle">Created At: {moment(createdAt).format('MMMM Do, YYYY')}</span>
    </div>
    <h3 className="list-item__data">Amount: {numeral(amount/100).format('$0,0.00')}</h3>
    </Link>
);

export default ExpenseListItem;