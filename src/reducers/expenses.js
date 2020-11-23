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

export default expensesReducer;