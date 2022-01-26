import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { Redirect, useHistory } from "react-router-dom";

const Register = ({ setAlert, register }) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        number: "",
    });

    const { number } = formData;

    //Set form data
    const onChange = (e) => setFormData({ [e.target.name]: e.target.value });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (number.length !== 10) {
            setAlert("Enter a valid phone number", "danger");
        } else {
            register({ number });
            setAlert("OTP sent successfully", "success");
            return history.push("/otp");
        }
    };

    return (
        <section className="container">
            <div className="login_container">
                <div className="bold medium primary-color">
                    Register or Sign In for Vaccination
                </div>
                <div className="x-small">
                    An OTP will be sent to your mobile number for verification
                </div>
                <form onSubmit={onSubmitHandler}>
                    <div className="input-field">
                        <input
                            type="text"
                            name="number"
                            required={true}
                            onChange={(e) => onChange(e)}
                        />
                        <label>Enter your phone number</label>
                        <span></span>
                    </div>
                    <button type="submit" className="btn-primary btn btn-large">
                        Get OTP
                    </button>
                </form>
                <div className="xx-small light-grey">
                    By Sign In/Registration, I agree to the{" "}
                    <span className="primary-color underline">
                        Terms of Service
                    </span>{" "}
                    and
                    <span className="primary-color underline">
                        {" "}
                        Privacy Policy.
                    </span>
                </div>
            </div>
        </section>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
