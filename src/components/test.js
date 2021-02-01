import React, { Component } from "react";
import '../style/App.css'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default class Example extends Component {
    render() {
        return (
            <TransformWrapper>
                <TransformComponent>
                    <div>test</div>
                </TransformComponent>
            </TransformWrapper>
        );
    }
}