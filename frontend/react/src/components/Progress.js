import React, { Fragment, useCallback, useEffect, useState } from "react";


const Progress = (props) => {
    console.log(props);
    return(
        <Fragment>
            <div className="progress mt-5">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{width: "25%"}}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax={props.user.page_target}></div>
            </div>            
        </Fragment>
    )
};

export default Progress;
