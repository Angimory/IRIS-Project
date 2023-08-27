import React, { Fragment } from "react";
import Animation from  '../heart.gif';
import '../App.css';
export const Loader = () =>(
    <Fragment>
        <div class = "heart-image">
            <img src={Animation} className="image"/>
        </div>
    </Fragment>
);
export default Loader;