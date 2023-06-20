import React from "react";

import "./pageNot.css";
import NoPageFound from '../../assets/no-results.png';


const PageNot = () => {
    return (
        <div className="pageNotFound">
            <div className="bigText">404</div>
            <img src={NoPageFound} alt="" />
            <div className="smallText">Page not found!</div>
        </div>
    );
};

export default PageNot;