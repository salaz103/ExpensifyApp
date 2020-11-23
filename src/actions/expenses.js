import {v1 as uuid} from 'uuid';

//ADD_EXPENSE
export const addExpense=(
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
export const removeExpense=({id}={})=>({
    type:'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
export const editExpense=(id,updates)=>({
    type:'EDIT_EXPENSE',
    id,
    updates
});

