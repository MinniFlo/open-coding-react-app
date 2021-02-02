import React from "react";
import '../style/App.css'
import Draggable from 'react-draggable'

export default function Note(props) {
    return (
        <Draggable>
            <div className='Note'>{props.text}</div>
        </Draggable>

    );
}