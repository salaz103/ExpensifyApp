import {createStore, combineReducers} from 'redux';
import uuid from 'uuid'; ///SIRVE PARA GENERAR ID'S UNICOS

//ADD_EXPENSE
const addExpense=(
    {
        //AQUI ESTAMOS PONIENDOLE VALORES POR DEFAULT POR SI NO LOS TRAJERA
        description= '', 
        note='',
        amount=0,
        createdAt=0
    }={} //AQUI SE ESTA MANDANDO UN OBJETO VACIO, EN CASO DE QUE EL OBJETO NO EXISTIERA
    )=>({
    type:'ADD_EXPENSE',
    expense:{
        ///LA FUNCION uuid ES PARA GENERAR UN ID UNICO
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE_EXPENSE
const removeExpense=({id}={})=>({
    type:'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
const editExpense=(id,updates)=>({
    type:'EDIT_EXPENSE',
    id,
    updates
});

///EXPENSES REDUCER
const expensesReducerDefaultState=[];

const expensesReducer=(state=expensesReducerDefaultState,action)=>{
    switch(action.type){
        case 'ADD_EXPENSE':
            //SE USO "concat" YA QUE ESTE REGRESA UN NUEVO ARREGLO
            // POR QUE SI SE HUBIERA USADO PUSH SE HUBIERA MODIFICADO
            //EL ESTADO, Y EL ESTADO NO DEBE CAMBIARSE
           //return state.concat(action.expense);
           //LOS 3 PUNTOS ... ES UNA FORMA DE EXPANDIR UN ARREGLO
           //ES UN OPERADOR DE EXPASION
           //ES IMPORTANTE RECORDAR QUE NO ESTAMOS CAMBIANDO EL STATE
           //SOLO ESTAMOS REGRESANDO UN ARREGLO PERO LO HACEMOS AL LEER EL "STATE"
           return [...state,action.expense]
        case 'REMOVE_EXPENSE':
            //filter NO CAMBIA EL ARREGLO, ESTE DEVUELVE UNO NUEVO, POR ESO SE UTILIZA
            //AQUI TAMBIEN SE HIZO UN "DESTRUCTURING" PARA RECIBIR EL ID EN LA FUNCION 
            //DEL FILTER
            return state.filter(({id})=> id !== action.id);
        case 'EDIT_EXPENSE':
            //MAP ES OTRA FUNCION QUE REGRESA UN NUEVO ARREGLO
            return state.map((expense)=>{
                if(expense.id===action.id){
                    //SI HAY UN GASTO IGUAL AL QUE QUEREMOS CAMBIAR, SE REGRESA UN NUEVO OBJETO
                    //AQUI UTILIZAMOS EL OPERADOR DE EXPANSION "..." PARA OBJETOS
                    return{
                        ...expense,
                        ...action.updates
                    }
                }else{
                    return expense;
                }
            })
        default:
            return state;
    }
};

//AQUI EMPIEZAN LOS ACTION GENERATORS PARA EL FILTERS REDUCER

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

//FILTERS REDUCER
const filtersReducerDefaultState={
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
}

const filtersReducer=(state=filtersReducerDefaultState,action)=>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                //PARA OBTENER EL TEXTO ENTRANTE NO SE UTILIZO ...action.text
                //POR QUE EN LA LLAMADA DE "SET_TEXT()" EL PARAMETRO QUE SE MANDO
                //FUE SOLO UN TEXTO '' Y NO UN OBJETO {}
                text:action.text
            }
        case 'SORT_BY_AMOUNT':
            return{
                ...state,
                sortBy:'amount'
            }
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return{
                ...state,
                startDate:action.start
            }
        case 'SET_END_DATE':
            return{
                ...state,
                endDate: action.end
            }
        default:
            return state;
    }
};

//timestamps
//33400,10,-200
//ESTOS SON CONTADOS EN MILISEGUNDOS, INVESTIGAR PARA RECORDAR

//GET VISIBLE EXPENSES
//EL 2DO PARAMETRO (FILTERS) ESTA SIENDO "DESTRUCTURING"
const getVisibleExpenses=(expenses,{ text,sortBy, startDate, endDate})=>{
    return expenses.filter((expense)=>{
        
        //EL PRIMERO SIEMPRE VA A DAR TRUE PARA "startDate" o "endDate" QUE NO SEAN NUMEROS,
        //SI DA TRUE EN LA PRIMERA CONDICION, DE IGUAL FORMA FILTRA EL OBJETO (EXPENSE)
        //SI EL "startDate" o "endDate" es undefined LO QUE VA A PASA ES QUE PRACTICAMENTE 
        //NO SE ESTA PONIENDO FILTROS Y POR ENDE ES QUE DA "true" Y CADA OBJETO ES OBTENIDO
        //POR QUE HAY QUE RECORDAR QUE ESTAMOS DENTRO DE LA FUNCION "filter" QUE REGRESA CADA OBJETO
        //SI SE RETORNA "true"
    ///--------------------------------------------------------------------------///
        //SI EL "startDate" o "endDate" ES UN NUMERO, EN LA PRIMERA CONDICION VA A DAR "false"
        //ENTONCES PASA A LA SEGUNDA Y EVALUA, SI EL GASTO FUE CREADO EN UNA FECHA MAYOR O IGUAL 
        //DEL FILTRO QUE SE ESTA PONIENDO "startDate" ENTONCES SE REGRESA "true"
        // Y SI EL GASTO FUE CREADO EN UNA FECHA MENOR O IGUAL QUE EL FILTRO QUE SE ESTA PONIENDO "endDate"
        //ENTONCES SE REGRESA "true".
        const startDateMatch= typeof startDate!=='number' || expense.createdAt>=startDate;
        const endDateMatch= typeof endDate!=='number' || expense.createdAt<=endDate;
        
        const st1=expense.description.toLowerCase();
        const st2= text.toLowerCase();
        const textMatch= st1.includes(st2);

        //POR ULTIMO, SI TODO DIO TRUE, SE RETORNA EL OBJETO QUE LA FUNCION "filter" ESTA LEYENDO
        //DEBIDO A QUE LA LOGICA DE TODO YA SE HIZO ARRIBA
        return startDateMatch && endDateMatch && textMatch;

        //ESTA FUNCION "sort" TIENE UNA FUNCION DE COMPARACION
    }).sort((a,b)=>{
        //SI SE ESTA ORDENANDO POR FECHA
        if(sortBy==='date'){
            //SI "a" TIENE QUE VENIR ANTES, SE PONE -1, PERO SI "b" tiene que venir antes se regresa un 1
            //AQUI LO QUE SE ESTA HACIENDO ES QUE SE ESTA ORDENANDO DESCENDENTEMENTE, ES DECIR CON LA FECHA
            //DE CREACION MÁS ANTIGUA, POR EJEMPLO:
            //SI LA CREACION DE "a" ES ANTES QUE LA CREACION DE "b", SE REGRESA UN 1, ES DECIR,
            //SE PONE A "b" PRIMERO, EN OTRAS PALABRAS, DE MAS RECIENTE A MAS ANTIGUA (descendente)
            return a.createdAt< b.createdAt? 1 :-1;
        }else if(sortBy==='amount'){
            ///ESTE TAMBIEN SE VA ORDENAR DE FORMA DESCENDENTE
            return a.amount < b.amount ? 1 :- 1;
        }
    });
};

//STORE CREATION
const store=createStore(
    combineReducers({
        expenses:expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=>{
    const state= store.getState();
    const visibleExpenses= getVisibleExpenses(state.expenses,state.filters);   
    console.log(visibleExpenses); 
});

//const expenseOne=store.dispatch(addExpense({description:'rent',amount:100,createdAt:-1000}));
const expenseTwo=store.dispatch(addExpense({description:'Coffe',amount:300,createdAt:1000}));

// store.dispatch(removeExpense({id:expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id,{amount:500}));


//store.dispatch(setTextFilter('ffe'));
// store.dispatch(setTextFilter());

//store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

store.dispatch(setStartDate(1001));
// store.dispatch(setStartDate());
//store.dispatch(setEndDate(0));

const demo={
    expenses:[{
        id:'asdf',
        description:'January rent',
        note:'This is the final payment',
        amount: 54500,
        createdAt:0
    }],
    filters:{
        text:'rent',
        sortBy:'amount',//date or amount
        startDate: undefined,
        endDate: undefined
    }
};


//ESTO ES UN EJEMPLO DEL OPERADOR DE EXPANSION PARA UN OBJETO
//Y COMO ES QUE ESTE TAMBIEN SE PUEDE SOBREESCRIBIR
//POR EJEMPLO EN LA EDAD, PRIMERO SE TIENE 27 AÑOS 
//PERO LUEGO SE SOBREESCRIBIO A 24 AÑOS
// const user={
//     name:'Yos',
//     age:27
// };

// console.log({
//     ...user,
//     location:'Guatemala',
//     age:24
// });