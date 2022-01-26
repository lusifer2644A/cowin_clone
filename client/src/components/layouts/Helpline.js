import React from "react";

const Helpline = () => {
    return (
        <div className="helpline_bar">
            <div>
                <i className="fas fa-phone-alt"></i>
                <span className="m">Support for COVID-19</span>
            </div>
            <div className="horizontal_line"></div>
            <div className="helpline_contact m-1">
                <div className="helpline_name">Health Ministry</div>
                <a className="helpline_number" href="tel:1075">
                    1075
                </a>
            </div>
            <div className="helpline_contact m-1">
                <div className="helpline_name">Child</div>
                <a className="helpline_number" href="tel:1098">
                    1098
                </a>
            </div>
            <div className="helpline_contact m-1">
                <div className="helpline_name">Mental Health</div>
                <a className="helpline_number" href="tel:08046110007">
                    08046110007
                </a>
            </div>
            <div className="helpline_contact m-1">
                <div className="helpline_name">Senior Citizens</div>
                <a className="helpline_number" href="tel:14567">
                    14567
                </a>
            </div>
            <div className="helpline_contact m-1">
                <div className="helpline_name">NCW</div>
                <a className="helpline_number" href="tel:7827170170">
                    7827170170
                </a>
            </div>
        </div>
    );
};

export default Helpline;
