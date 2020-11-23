//Higher order component HOC - A component (HOC) that renders another component

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props)=>{

    return(
        <div>
            <h1>Info</h1>
            <p> The info is: {props.info}</p>
        </div>
    )
};

const withAdminWarning=(WrappedComponent)=>{
    return(props) =>(
        <div>
            {props.isAdmin && <p>This is private info, please don't share!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication= (WrappedComponent)=>{
    //ESTE RETURN ES EL HOC, POR QUE ESTE ES EL QUE CONTIENE A OTRO COMPONENTE
    return(props)=>(
        <div>
            {props.isAuthenticated ? 
            (<WrappedComponent {...props}/>):
            (<p>Please log in</p>)
            }
        </div>
    );
};

const AdminInfo= withAdminWarning(Info);
const AuthInfo= requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info="These are the details"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details"/>, document.getElementById('app'));