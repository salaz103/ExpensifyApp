//SET_TEXT
const setTextFilter=(text='')=>({
    type:'SET_TEXT_FILTER',
    text
});

//SORT BY AMOUNT
const sortByAmount=()=>({
    type:'SORT_BY_AMOUNT'
});

//SORT BY DATE
const sortByDate=()=>({
    type:'SORT_BY_DATE'
});

//SET START DATE
//AQUI NO LE PUSIMOS UN VALOR POR DEFECTO A "START", QUEREMOS QUE SEA UNDEFINED
//PERO SI NO SE LE PONE UN VALOR POR DEFECTO, EL VALOR POR DEFECTO ES UNDEFINED
const setStartDate=(start)=>({
    type:'SET_START_DATE',
    start
});

//SET END DATE
const setEndDate=(end)=>({
    type:'SET_END_DATE',
    end
});

export {setTextFilter,sortByAmount,sortByDate,setStartDate, setEndDate}