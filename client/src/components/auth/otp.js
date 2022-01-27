import React, { useState } from "react";
import PropTypes from "prop-types";

import { setAlert } from "../../actions/alert";
import { verifyOTP } from "../../actions/auth";
import { connect } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { useHistory } from "react-router-dom";

const OTP = ({ temp, auth, setAlert, verifyOTP }) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        otp: "",
    });

    const { otp } = formData;
    const number = temp.number;

    //Set form data
    const onChange = (e) => setFormData({ [e.target.name]: e.target.value });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setAlert("Please enter a valid OTP", "danger");
        } else {
            verifyOTP({ otp, number });
            setAlert("Loading", "success");
            history.push("/dashboard");
        }
    };

    return (
        <section className="container">
            <div className="login_container">
                <div className="bold medium primary-color">
                    OTP Verification
                </div>
                <div className="x-small">An OTP has been sent</div>
                <form onSubmit={onSubmitHandler}>
                    <div className="input-field">
                        <input
                            type="text"
                            name="otp"
                            maxLength={6}
                            required={true}
                            onChange={(e) => onChange(e)}
                        />
                        <label>Enter OTP</label>
                        <span></span>
                    </div>
                    <button type="submit" className="btn-primary btn btn-large">
                        Verify {"&"} Proceed
                    </button>
                </form>
                <div className="xx-small light-grey">
                    There might be some delay in receiving the OTP due to heavy
                    traffic.
                </div>
            </div>
        </section>
    );
};

OTP.propTypes = {
    setAlert: PropTypes.func.isRequired,
    verifyOTP: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    temp: state.temp,
    auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, verifyOTP })(OTP);
