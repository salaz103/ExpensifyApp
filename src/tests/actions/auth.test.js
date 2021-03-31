import {login,logout} from '../../actions/auth';

test('Should generate Login action object',()=>{
    const action= login('1234abcd');
    expect (action).toEqual({
        type:'LOGIN',
        uid:'1234abcd'
    });
});

test('Should generate Logout action object',()=>{
    const action= logout();
    expect (action).toEqual({
        type:'LOGOUT'
    });
});