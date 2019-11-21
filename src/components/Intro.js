import React from 'react'
import logo from '../resources/asml-logo.png';
const Intro = () => (
    <div className="intro">
        <img src={logo} className="intro__logo" />
        <h1>Lithography system service and Service Action/Engineer overview</h1>
        <p>
            The below schedule shows how many engineers are at work at any given time interval.<br />
            Service Actions can be moved by dragging them from one time slot to the other. Service Actions can also be resized.
        </p>
        <p>Double click on a Service Action to specify the total of engineers needed.</p>
    </div>
);

export default Intro;
