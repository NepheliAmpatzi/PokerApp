import React from 'react';
import '../.././src/App.css'

function Button(props){
    return ( 
        <button className={props.class} onClick={props.onClick} disabled={props.disableBtn}>{props.name}</button>
    );
}

export default Button;