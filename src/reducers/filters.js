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

export default filtersReducer;