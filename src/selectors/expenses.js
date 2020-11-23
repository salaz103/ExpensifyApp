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

export default getVisibleExpenses;