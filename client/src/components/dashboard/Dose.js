import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

const Dose = ({ name, details, member }) => {
    const history = useHistory();

    const unregistered = (
        <div className="dose_block">
            <div className="dose_details">
                <div className="dose_number medium">{name}</div>
            </div>
            <button
                className="btn btn-primary btn-small"
                onClick={() => {
                    console.log("pusshing", member);
                    history.push(
                        `/register-vaccination/member/${member._id}/dose/${
                            member.dose1.registered === false
                                ? "dose1"
                                : "dose2"
                        }`
                    );
                }}
            >
                Register
            </button>
        </div>
    );

    const registered = (
        <div className="dose_block">
            <div className="dose_details">
                <div className="dose_number medium">{name}</div>
                <div className="dose_name">{details.vaccineName}</div>
                <div className="dose_time green">
                    <span>{details.center}</span>{" "}
                    <span>
                        {moment.utc(details.date).format("DD MMM YYYY")}
                    </span>{" "}
                    <span>{details.timeSlot}</span>
                </div>
            </div>
        </div>
    );

    const taken = (
        <div className="dose_block">
            <div className="dose_details">
                <div className="dose_number medium">{name}</div>
                <div className="dose_name">{details.vaccineName}</div>
                <div className="dose_time green">
                    <span>{details.center}</span>{" "}
                    <span>
                        {moment.utc(details.date).format("DD MMM YYYY")}
                    </span>{" "}
                    <span>{details.timeSlot}</span>
                </div>
            </div>
            {/* <button className="btn btn-primary btn-small">
                <a href="!#">Download Certificate</a>
            </button> */}
        </div>
    );

    const getComponent = () => {
        if (details.taken) return taken;
        else if (details.registered) return registered;
        return unregistered;
    };

    return <>{getComponent()}</>;
};

export default Dose;
