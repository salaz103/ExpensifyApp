import {createStore} from 'redux';

//ACTION GENERATORS-- ARE FUNCTIONS THAT RETURN ACTION OBJECTS

//AQUI AL INCREMENT BY SE LE ESTA APLICANDO EL "DESTRUCTURING", SI NO VIENE UN OBJETO SE LE PONE UN OBJETO 
//VACIO POR DEFAULT, IGUALMENTE SI EN EL INCREMENT BY NO VIENE UN VALOR SE LE COLOCA COMO DEFAULT EL #1
const incrementCount=({incrementBy=1}={})=>({
    type: 'INCREMENT',
    incrementBy
});


const decrementCount =({decrementBy=1}={})=>({
    type: 'DECREMENT',
    decrementBy
});

const setCount =({set=1})=>({
    type: 'SET',
    set
});
        
const resetCount=()=>({
    type:'RESET'
});


//REDUCERS
//1. SON FUNCIONES PURAS, ES DECIR NO INTERACTUAN CON EL "EXTERIOR"
//2. NUNCA CAMBIAN EL ESTADO SI NO QUE REGRESAN UN OBJETO 
const countReducer=(state={count:0},action)=>{

    switch(action.type){
        case 'INCREMENT':
            return{
                count: state.count+ action.incrementBy
            };
        case 'DECREMENT':
            return{
                count: state.count-action.decrementBy
            };
        case 'SET':
            return{
                count: action.set
            };
        case 'RESET':
                return{
                    count: 0
                };
        default:
            return state;
    }
}


//AQUI CREAMOS LA STORE Y A ESTA SE LE PASA UNA FUNCION (REDUCERS)
// QUE EN ESTE CASO VA A SER EL "STATE", EN ESTE CASO EL STATE TIENE UN VALOR POR DEFAULT
const store = createStore(countReducer);

store.subscribe(()=>{
    console.log(store.getState());
});



//ACTIONS -- IS AN OBJECT THAT GETS SENT TO THE STORE
/*store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
});*/


//AQUI ESTAMOS LLAMANDO A LOS ACTIONS GENERATORS
store.dispatch(incrementCount());


store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch({
    type: 'DECREMENT',
    decrementBy: 2
});

store.dispatch(setCount({set:5}));