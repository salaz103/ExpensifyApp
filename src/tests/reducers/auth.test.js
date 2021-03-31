import authReducer from '../../reducers/auth';

test('Should save uid in store when Login',()=>{
    const state= authReducer({},{type:'LOGIN',uid:'abcd1234'});
    expect(state.uid).toBe('abcd1234');
});

test('Should clean uid in store when Logout',()=>{
    //EN ESTA PRUEBA EL STATE SI TIENE UN UID YA DEFINIDO
    //POR QUE EL AUTH REDUCER LO QUE HARA SERA LIMPIAR ESE UID
    const state= authReducer({uid:'anything'},{type:'LOGOUT'});
    expect(state).toEqual({});
});