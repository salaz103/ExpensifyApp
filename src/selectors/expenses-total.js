
 export default (expenses)=>{
    const values= expenses.map((expense)=>{
        return expense.amount;
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const total= values.length>0 ?values.reduce(reducer):0;

    return total;
}

