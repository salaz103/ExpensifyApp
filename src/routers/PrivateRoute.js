import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated, 
    component:Component,
    ///ESTO ES EL OPERADOR REST, DONDE EN ESTA VARIABLE ESTA LO QUE NO SE HIZO DESTRUCTURING, ES DECIR
    //EN LA VARIABLE REST ESTA TODO A EXCEPCION DE "isAuthenticated y component"
    ...rest    
})=>(
    <Route {...rest} component={(props)=>(
        isAuthenticated ? (
            <div>
            <Header/>
            <Component {...props} />
            </div>
        ):(
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps=(state)=>({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);