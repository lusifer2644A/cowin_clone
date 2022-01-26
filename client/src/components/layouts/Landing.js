import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Helpline from "./Helpline";

const Landing = () => {
    return (
        <Fragment>
            <div className="landing_area">
                <div className="landing_text">
                    <div className="xx-large bold">
                        "India is set to defeat Covid-19.Every Indian is making
                        it possible."
                    </div>
                    <div className="medium">- PM Narendra Modi</div>
                    <div className="flex-row">
                        <Link to="/auth">
                            <button className="btn btn-primary">
                                Book your slot
                            </button>
                        </Link>
                        <Link to="/auth">
                            <button className="btn btn-secondary">
                                Verify Certificate
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Helpline />
        </Fragment>
    );
};

export default Landing;
